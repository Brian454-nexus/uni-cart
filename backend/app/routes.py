from flask import Blueprint, jsonify, current_app, request
from flask_jwt_extended import jwt_required, get_jwt_identity
from .schemas import UserSchema, ProductSchema, CategorySchema, TransactionSchema
from .services import *
from .utils import validate_input, rate_limit
from werkzeug.utils import secure_filename
from .models import LikedProduct, Message, Product, Category
from .schemas import LikedProductSchema, MessageSchema
from . import socketio
from .extensions import db
from flask_socketio import emit, join_room
from sqlalchemy import or_, and_
import requests

auth_bp = Blueprint('auth', __name__)
users_bp = Blueprint('users', __name__)
products_bp = Blueprint('products', __name__)
categories_bp = Blueprint('categories', __name__)
transactions_bp = Blueprint('transactions', __name__)
payments_bp = Blueprint('payments', __name__)
root_bp = Blueprint('root', __name__)

@auth_bp.route('/auth/health', methods=['GET'])
def health():
    return jsonify({'status': 'ok'}), 200

@root_bp.route('/health', methods=['GET'])
def root_health():
    return jsonify({'status': 'ok', 'app': 'unicart-backend'}), 200

# AUTH ENDPOINTS
@auth_bp.route('/auth/register', methods=['POST'])
def register():
    data = request.get_json()
    result = register_user(data)
    if result['success']:
        return jsonify(result), 201
    return jsonify(result), 400

@auth_bp.route('/auth/login', methods=['POST'])
def login():
    data = request.get_json()
    result = login_user(data)
    if result['success']:
        return jsonify(result), 200
    return jsonify(result), 401

@auth_bp.route('/auth/refresh', methods=['POST'])
@jwt_required(refresh=True)
def refresh():
    user_id = get_jwt_identity()
    result = refresh_token(user_id)
    return jsonify(result), 200

@auth_bp.route('/auth/logout', methods=['POST'])
@jwt_required()
def logout():
    jti = get_jwt()['jti']
    result = logout_user(jti)
    return jsonify(result), 200

@auth_bp.route('/auth/password-reset', methods=['POST'])
def password_reset():
    data = request.get_json()
    result = send_password_reset_email(data)
    return jsonify(result), 200

@auth_bp.route('/auth/password-reset/confirm', methods=['POST'])
def password_reset_confirm():
    data = request.get_json()
    result = reset_password(data)
    return jsonify(result), 200

# USER ENDPOINTS
@users_bp.route('/users/profile', methods=['GET'])
@jwt_required()
def get_profile():
    user_id = get_jwt_identity()
    result = get_user_profile(user_id)
    return jsonify(result), 200

@users_bp.route('/users/profile', methods=['PUT'])
@jwt_required()
def update_profile():
    user_id = get_jwt_identity()
    data = request.get_json()
    result = update_user_profile(user_id, data)
    return jsonify(result), 200

@users_bp.route('/users/avatar', methods=['POST'])
@jwt_required()
def upload_avatar_route():
    user_id = get_jwt_identity()
    if 'avatar' not in request.files:
        return jsonify({'success': False, 'msg': 'No file uploaded'}), 400
    file = request.files['avatar']
    result = upload_avatar(user_id, file)
    return jsonify(result), 200

@users_bp.route('/liked-products', methods=['GET'])
@jwt_required()
def get_liked_products():
    user_id = get_jwt_identity()
    liked = LikedProduct.query.filter_by(user_id=user_id).all()
    return jsonify(LikedProductSchema(many=True).dump(liked)), 200

@users_bp.route('/liked-products', methods=['POST'])
@jwt_required()
def like_product():
    user_id = get_jwt_identity()
    data = request.get_json()
    liked = LikedProduct(user_id=user_id, product_id=data['product_id'])
    db.session.add(liked)
    db.session.commit()
    return jsonify({'success': True}), 201

@users_bp.route('/liked-products/<int:product_id>', methods=['DELETE'])
@jwt_required()
def unlike_product(product_id):
    user_id = get_jwt_identity()
    liked = LikedProduct.query.filter_by(user_id=user_id, product_id=product_id).first()
    if liked:
        db.session.delete(liked)
        db.session.commit()
    return jsonify({'success': True}), 200

# PRODUCT ENDPOINTS
@products_bp.route('/products', methods=['GET'])
def list_products():
   
    return jsonify(result), 200

@products_bp.route('/products', methods=['POST'])
@jwt_required()
def create_product_route():
    user_id = get_jwt_identity()
    data = request.form.to_dict()
    files = request.files.getlist('images')
    result = create_product(data, user_id, files)
    return jsonify(result), 201

@products_bp.route('/products/<int:product_id>', methods=['PUT'])
@jwt_required()
def update_product_route(product_id):
    user_id = get_jwt_identity()
    data = request.get_json()
    result = update_product(product_id, data, user_id)
    return jsonify(result), 200

@products_bp.route('/products/<int:product_id>', methods=['DELETE'])
@jwt_required()
def delete_product_route(product_id):
    user_id = get_jwt_identity()
    result = delete_product(product_id, user_id)
    return jsonify(result), 200

@products_bp.route('/products/search', methods=['GET'])
def search_products():
    query = request.args.get('q', '')
    products = Product.query.join(Category).filter(
        or_(Product.title.ilike(f'%{query}%'),
            Category.name.ilike(f'%{query}%'))
    ).all()
    return jsonify(ProductSchema(many=True).dump(products)), 200

@products_bp.route('/products/category/<int:category_id>', methods=['GET'])
def products_by_category(category_id):
    result = get_products({'category_id': category_id})
    return jsonify(result), 200

@products_bp.route('/products/<int:product_id>/view', methods=['POST'])
def track_view(product_id):
    result = increment_product_view(product_id)
    return jsonify(result), 200

# CATEGORY ENDPOINTS
@categories_bp.route('/categories', methods=['GET'])
def list_categories():
    result = get_categories()
    return jsonify(result), 200

# TRANSACTION ENDPOINTS
@transactions_bp.route('/transactions', methods=['POST'])
@jwt_required()
def create_transaction_route():
    user_id = get_jwt_identity()
    data = request.get_json()
    result = create_transaction(data, user_id)
    return jsonify(result), 201

@transactions_bp.route('/transactions/user', methods=['GET'])
@jwt_required()
def user_transactions():
    user_id = get_jwt_identity()
    result = get_user_transactions(user_id)
    return jsonify(result), 200

# PAYMENT ENDPOINTS
@payments_bp.route('/payments/flutterwave/webhook', methods=['POST'])
def flutterwave_webhook():
    data = request.get_json()
    result = process_flutterwave_webhook(data)
    return jsonify(result), 200

@payments_bp.route('/payments/refund', methods=['POST'])
@jwt_required()
def refund():
    data = request.get_json()
    result = refund_transaction(data)
    return jsonify(result), 200

@payments_bp.route('/paystack/verify', methods=['POST'])
def paystack_verify():
    data = request.get_json()
    reference = data.get('reference')
    if not reference:
        return jsonify({'success': False, 'msg': 'Missing reference'}), 400
    secret_key = current_app.config['PAYSTACK_SECRET_KEY']
    headers = {
        'Authorization': f'Bearer {secret_key}',
        'Content-Type': 'application/json',
    }
    url = f'https://api.paystack.co/transaction/verify/{reference}'
    resp = requests.get(url, headers=headers)
    if resp.status_code == 200 and resp.json().get('data', {}).get('status') == 'success':
        return jsonify({'success': True, 'msg': 'Payment verified', 'data': resp.json()['data']}), 200
    return jsonify({'success': False, 'msg': 'Payment verification failed', 'data': resp.json()}), 400

# SOCKETIO MESSAGING NAMESPACE
@socketio.on('join', namespace='/api/messages')
def on_join(data):
    room = f"{data['product_id']}_{min(data['sender_id'], data['receiver_id'])}_{max(data['sender_id'], data['receiver_id'])}"
    join_room(room)

@socketio.on('send_message', namespace='/api/messages')
def handle_message(data):
    msg = Message(
        sender_id=data['sender_id'],
        receiver_id=data['receiver_id'],
        product_id=data['product_id'],
        message=data['message']
    )
    db.session.add(msg)
    db.session.commit()
    room = f"{data['product_id']}_{min(data['sender_id'], data['receiver_id'])}_{max(data['sender_id'], data['receiver_id'])}"
    emit('receive_message', MessageSchema().dump(msg), room=room)

@socketio.on('get_history', namespace='/api/messages')
def get_history(data):
    msgs = Message.query.filter_by(product_id=data['product_id']).filter(
        or_(
            and_(Message.sender_id==data['sender_id'], Message.receiver_id==data['receiver_id']),
            and_(Message.sender_id==data['receiver_id'], Message.receiver_id==data['sender_id'])
        )
    ).order_by(Message.timestamp).all()
    emit('history', MessageSchema(many=True).dump(msgs))

# More endpoints will be added to each blueprint in their respective modules
