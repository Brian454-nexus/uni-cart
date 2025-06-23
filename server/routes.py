from flask import Blueprint, request, jsonify
from models import db, TradeOffer, Item, User
from sqlalchemy import and_
from datetime import datetime

trade_offers = Blueprint('trade_offers', __name__)

@trade_offers.route('/api/offers', methods=['POST'])
def create_offer():
    data = request.get_json()
    
    # Validate required fields
    required_fields = ['item_id', 'offer_user_id', 'offer_price']
    if not all(field in data for field in required_fields):
        return jsonify({'error': 'Missing required fields'}), 400
        
    # Check if item exists and is not owned by the offering user
    item = Item.query.get(data['item_id'])
    if not item:
        return jsonify({'error': 'Item not found'}), 404
    if item.seller_id == data['offer_user_id']:
        return jsonify({'error': 'Cannot make offer on your own item'}), 400
        
    new_offer = TradeOffer(
        item_id=data['item_id'],
        offer_user_id=data['offer_user_id'],
        message=data.get('message', ''),
        offer_price=data['offer_price'],
        status='pending'
    )
    
    try:
        db.session.add(new_offer)
        db.session.commit()
        return jsonify({
            'id': new_offer.id,
            'status': new_offer.status,
            'created_at': new_offer.created_at.isoformat()
        }), 201
    except Exception as e:
        db.session.rollback()
        return jsonify({'error': str(e)}), 500

@trade_offers.route('/api/offers/user/<int:user_id>', methods=['GET'])
def get_user_offers(user_id):
    # Get both sent and received offers
    sent_offers = TradeOffer.query.filter_by(offer_user_id=user_id).all()
    received_offers = TradeOffer.query\
        .join(Item)\
        .filter(Item.seller_id == user_id)\
        .all()
    
    return jsonify({
        'sent_offers': [{
            'id': offer.id,
            'item_id': offer.item_id,
            'message': offer.message,
            'offer_price': str(offer.offer_price),
            'status': offer.status,
            'created_at': offer.created_at.isoformat()
        } for offer in sent_offers],
        'received_offers': [{
            'id': offer.id,
            'item_id': offer.item_id,
            'offer_user_id': offer.offer_user_id,
            'message': offer.message,
            'offer_price': str(offer.offer_price),
            'status': offer.status,
            'created_at': offer.created_at.isoformat()
        } for offer in received_offers]
    })

@trade_offers.route('/api/offers/<int:offer_id>', methods=['PATCH'])
def update_offer_status(offer_id):
    data = request.get_json()
    
    if 'status' not in data:
        return jsonify({'error': 'Status is required'}), 400
        
    if data['status'] not in ['pending', 'accepted', 'rejected']:
        return jsonify({'error': 'Invalid status'}), 400
        
    offer = TradeOffer.query.get(offer_id)
    if not offer:
        return jsonify({'error': 'Offer not found'}), 404
        
    # Verify the item still belongs to the current user
    item = Item.query.get(offer.item_id)
    if not item:
        return jsonify({'error': 'Associated item not found'}), 404
        
    try:
        offer.status = data['status']
        offer.updated_at = datetime.utcnow()
        db.session.commit()
        return jsonify({
            'id': offer.id,
            'status': offer.status,
            'updated_at': offer.updated_at.isoformat()
        })
    except Exception as e:
        db.session.rollback()
        return jsonify({'error': str(e)}), 500

@trade_offers.route('/api/offers/<int:offer_id>', methods=['DELETE'])
def delete_offer(offer_id):
    offer = TradeOffer.query.get(offer_id)
    if not offer:
        return jsonify({'error': 'Offer not found'}), 404
        
    if offer.status != 'pending':
        return jsonify({'error': 'Can only delete pending offers'}), 400
        
    try:
        db.session.delete(offer)
        db.session.commit()
        return '', 204
    except Exception as e:
        db.session.rollback()
        return jsonify({'error': str(e)}), 500
