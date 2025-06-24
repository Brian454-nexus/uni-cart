from flask import Blueprint, request, jsonify, abort
from flask_jwt_extended import create_access_token, jwt_required, get_jwt_identity
from .models import db, User, Category, Item
from datetime import datetime

auth_bp = Blueprint('auth', __name__, url_prefix='/api')
items_bp = Blueprint('items', __name__, url_prefix='/api/items')

@auth_bp.route('/signup', methods=['POST'])
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

@auth_bp.route('/login', methods=['POST'])
def login():
    data = request.get_json()
    email = data.get('email')
    password = data.get('password')
    user = User.query.filter_by(email=email).first()
    if user and user.check_password(password):
        access_token = create_access_token(identity=user.id)
        return jsonify({'user': user.as_dict(), 'access_token': access_token}), 200
    return jsonify({'error': 'Invalid credentials'}), 401

@auth_bp.route('/me', methods=['GET'])
@jwt_required()
def me():
    user_id = get_jwt_identity()
    user = User.query.get(user_id)
    if not user:
        return jsonify({'error': 'User not found'}), 404
    return jsonify({'user': user.as_dict()}), 200

@items_bp.route('/categories', methods=['GET'])
def get_categories():
    categories = Category.query.all()
    return jsonify([{'id': c.id, 'name': c.name} for c in categories]), 200

@items_bp.route('/', methods=['GET'])
def get_items():
    category_id = request.args.get('category_id')
    if category_id:
        try:
            category_id = int(category_id)
            items = Item.query.filter_by(category_id=category_id).all()
        except ValueError:
            return jsonify({'error': 'Invalid category_id'}), 400
    else:
        items = Item.query.all()
    return jsonify([item.to_dict() for item in items]), 200

@items_bp.route('/', methods=['POST'])
@jwt_required()
def create_item():
    user_id = get_jwt_identity()
    user = User.query.get(user_id)
    if not user:
        return jsonify({'error': 'User not found'}), 404
    
    data = request.get_json()
    required_fields = ['title', 'description', 'image_url', 'condition', 'price', 'status']
    if not all(field in data for field in required_fields):
        return jsonify({'error': 'Missing required fields'}), 400
    try:
        price = float(data['price'])
        if price <= 0:
            raise ValueError
    except Exception:
        return jsonify({'error': 'Price must be a positive number'}), 400
    
    item = Item(
        title=data['title'],
        description=data['description'],
        image_url=data['image_url'],
        condition=data['condition'],
        price=price,
        status=data['status'],
        user_id=user_id,
        category_id=data.get('category_id')
    )
    db.session.add(item)
    db.session.commit()
    return jsonify(item.to_dict()), 201

@items_bp.route('/<int:item_id>', methods=['PUT'])
@jwt_required()
def update_item(item_id):
    user_id = get_jwt_identity()
    item = Item.query.get_or_404(item_id)
    if item.user_id != user_id:
        return jsonify({'error': 'Unauthorized to update this item'}), 403
    
    data = request.get_json()
    for field in ['title', 'description', 'image_url', 'condition', 'price', 'status', 'category_id']:
        if field in data:
            if field == 'price':
                try:
                    price = float(data['price'])
                    if price <= 0:
                        raise ValueError
                    setattr(item, field, price)
                except Exception:
                    return jsonify({'error': 'Price must be a positive number'}), 400
            else:
                setattr(item, field, data[field])
    db.session.commit()
    return jsonify(item.to_dict()), 200

@items_bp.route('/<int:item_id>', methods=['DELETE'])
@jwt_required()
def delete_item(item_id):
    user_id = get_jwt_identity()
    item = Item.query.get_or_404(item_id)
    if item.user_id != user_id:
        return jsonify({'error': 'Unauthorized to delete this item'}), 403
    
    db.session.delete(item)
    db.session.commit()
    return jsonify({'message': 'Item deleted'}), 200