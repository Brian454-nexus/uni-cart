from flask import Blueprint, request, jsonify
from flask_jwt_extended import create_access_token, jwt_required, get_jwt_identity
from .models import db, User, Category, Item
from datetime import datetime

auth_bp = Blueprint('auth', __name__)
api = Blueprint('api', __name__)

@auth_bp.route('/api/signup', methods=['POST'])
def signup():
    data = request.get_json()
    username = data.get('username')
    email = data.get('email')
    password = data.get('password')
    is_volunteer = data.get('is_volunteer', False)

    if not username or not email or not password:
        return jsonify({'error': 'Missing required fields'}), 400
    if len(password) < 6:
        return jsonify({'error': 'Password must be at least 6 characters'}), 400
    if User.query.filter((User.username == username) | (User.email == email)).first():
        return jsonify({'error': 'Username or email already exists'}), 400

    user = User(username=username, email=email, is_volunteer=is_volunteer)
    user.set_password(password)
    db.session.add(user)
    db.session.commit()
    access_token = create_access_token(identity=user.id)
    return jsonify({'user': user.as_dict(), 'access_token': access_token}), 201

@auth_bp.route('/api/login', methods=['POST'])
def login():
    data = request.get_json()
    email = data.get('email')
    password = data.get('password')
    user = User.query.filter_by(email=email).first()
    if user and user.check_password(password):
        access_token = create_access_token(identity=user.id)
        return jsonify({'user': user.as_dict(), 'access_token': access_token}), 200
    return jsonify({'error': 'Invalid credentials'}), 401

@auth_bp.route('/api/me', methods=['GET'])
@jwt_required()
def me():
    user_id = get_jwt_identity()
    user = User.query.get(user_id)
    if not user:
        return jsonify({'error': 'User not found'}), 404
    return jsonify({'user': user.as_dict()}), 200

@api.route('/categories', methods=['GET'])
def get_categories():
    categories = Category.query.all()
    return jsonify([{'id': c.id, 'name': c.name} for c in categories])

@api.route('/items', methods=['GET'])
def get_items():
    category_id = request.args.get('category_id')
    if category_id:
        items = Item.query.filter_by(category_id=category_id).all()
    else:
        items = Item.query.all()
    return jsonify([{
        'id': i.id,
        'name': i.name,
        'description': i.description,
        'price': i.price,
        'category_id': i.category_id
    } for i in items])