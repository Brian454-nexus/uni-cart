from flask import Blueprint, jsonify, request
from models import db, Category, Item

api = Blueprint('api', __name__)

@api.route('/categories', methods=['GET'])
def get_categories():
    categories = Category.query.all()
    return jsonify([{'id': c.id, 'name': c.name} for c in categories])

@api.route('/items', methods=['GET'])
def get_items():
    category_id = request.args.get('category_id')
    min_price = request.args.get('min_price', type=float)
    max_price = request.args.get('max_price', type=float)
    query = Item.query
    if category_id:
        query = query.filter_by(category_id=category_id)
    if min_price is not None:
        query = query.filter(Item.price >= min_price)
    if max_price is not None:
        query = query.filter(Item.price <= max_price)
    items = query.all()
    return jsonify([
        {
            'id': i.id,
            'name': i.name,
            'description': i.description,
            'price': i.price,
            'category_id': i.category_id
        } for i in items
    ])