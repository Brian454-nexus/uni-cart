from flask import Blueprint, request, jsonify, abort
from .models import db, Item

items_bp = Blueprint('items', __name__, url_prefix='/api/items')

# GET all items
@items_bp.route('/', methods=['GET'])
def get_items():
    items = Item.query.all()
    return jsonify([item.to_dict() for item in items]), 200

# POST new item
@items_bp.route('/', methods=['POST'])
def create_item():
    data = request.get_json()
    required_fields = ['title', 'description', 'image_url', 'condition', 'price', 'status', 'user_id']
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
        user_id=data['user_id']
    )
    db.session.add(item)
    db.session.commit()
    return jsonify(item.to_dict()), 201

# PUT update item
@items_bp.route('/<int:item_id>', methods=['PUT'])
def update_item(item_id):
    item = Item.query.get_or_404(item_id)
    data = request.get_json()
    for field in ['title', 'description', 'image_url', 'condition', 'price', 'status']:
        if field in data:
            setattr(item, field, data[field])
    db.session.commit()
    return jsonify(item.to_dict()), 200

# DELETE item
@items_bp.route('/<int:item_id>', methods=['DELETE'])
def delete_item(item_id):
    item = Item.query.get_or_404(item_id)
    db.session.delete(item)
    db.session.commit()
    return jsonify({'message': 'Item deleted'}), 200
