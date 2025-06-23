from flask_sqlalchemy import SQLAlchemy
from datetime import datetime
from sqlalchemy.sql import func
from decimal import Decimal

db = SQLAlchemy()

class User(db.Model):
    __tablename__ = 'users'
    
    id = db.Column(db.Integer, primary_key=True)
    username = db.Column(db.String(80), unique=True, nullable=False)
    email = db.Column(db.String(120), unique=True, nullable=False)
    password_hash = db.Column(db.String(128), nullable=False)
    created_at = db.Column(db.DateTime, server_default=func.now())
    
    # Relationships
    items = db.relationship('Item', backref='seller', lazy=True)
    sent_offers = db.relationship('TradeOffer', foreign_keys='TradeOffer.offer_user_id', backref='offerer', lazy=True)
    received_offers = db.relationship('TradeOffer', secondary='items', 
                                    primaryjoin='User.id==Item.seller_id',
                                    secondaryjoin='Item.id==TradeOffer.item_id',
                                    backref='receiver', lazy=True)

class Item(db.Model):
    __tablename__ = 'items'
    
    id = db.Column(db.Integer, primary_key=True)
    title = db.Column(db.String(100), nullable=False)
    description = db.Column(db.Text)
    price = db.Column(db.Numeric(10, 2), nullable=False)
    condition = db.Column(db.String(50))
    seller_id = db.Column(db.Integer, db.ForeignKey('users.id'), nullable=False)
    created_at = db.Column(db.DateTime, server_default=func.now())
    
    # Relationships
    trade_offers = db.relationship('TradeOffer', backref='item', lazy=True)

class TradeOffer(db.Model):
    __tablename__ = 'trade_offers'
    
    id = db.Column(db.Integer, primary_key=True)
    item_id = db.Column(db.Integer, db.ForeignKey('items.id'), nullable=False)
    offer_user_id = db.Column(db.Integer, db.ForeignKey('users.id'), nullable=False)
    message = db.Column(db.Text)
    offer_price = db.Column(db.Numeric(10, 2), nullable=False)
    status = db.Column(db.String(20), default='pending')  # pending/accepted/rejected
    created_at = db.Column(db.DateTime, server_default=func.now())
    updated_at = db.Column(db.DateTime, onupdate=func.now())

    __table_args__ = (
        db.CheckConstraint(
            status.in_(['pending', 'accepted', 'rejected']),
            name='valid_status'
        ),
    )
