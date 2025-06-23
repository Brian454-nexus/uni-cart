from flask import Blueprint, request, jsonify
from server.models import db, User, Item, TradeOffer
from sqlalchemy.exc import IntegrityError
from datetime import datetime

bp = Blueprint('routes', __name__)

@bp.route('/offers', methods=['POST'])
def create_offer():
    data = request.json
    try:
        offer = TradeOffer(
            item_id=data['item_id'],
            offer_user_id=data['offer_user_id'],
            message=data.get('message', ''),
            offer_price=data['offer_price'],
            status='pending',
            timestamp=datetime.utcnow()
        )
        db.session.add(offer)
        db.session.commit()
        return jsonify({'message': 'Offer created', 'offer_id': offer.id}), 201
    except IntegrityError:
        db.session.rollback()
        return jsonify({'error': 'Offer already exists for this user and item'}), 400
    except Exception as e:
        db.session.rollback()
        return jsonify({'error': str(e)}), 400

@bp.route('/offers/user/<int:user_id>', methods=['GET'])
def get_offers_by_user(user_id):
    offers = TradeOffer.query.filter_by(offer_user_id=user_id).all()
    return jsonify([
        {
            'id': o.id,
            'item_id': o.item_id,
            'message': o.message,
            'offer_price': float(o.offer_price),
            'status': o.status,
            'timestamp': o.timestamp.isoformat()
        } for o in offers
    ])

@bp.route('/offers/<int:offer_id>/status', methods=['PATCH'])
def update_offer_status(offer_id):
    data = request.json
    offer = TradeOffer.query.get_or_404(offer_id)
    if data.get('status') not in ['pending', 'accepted', 'rejected']:
        return jsonify({'error': 'Invalid status'}), 400
    offer.status = data['status']
    db.session.commit()
    return jsonify({'message': 'Status updated'})

@bp.route('/offers/<int:offer_id>', methods=['DELETE'])
def delete_offer(offer_id):
    offer = TradeOffer.query.get_or_404(offer_id)
    db.session.delete(offer)
    db.session.commit()
    return jsonify({'message': 'Offer deleted'})
