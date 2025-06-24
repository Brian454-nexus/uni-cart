from flask_sqlalchemy import SQLAlchemy
from flask_bcrypt import Bcrypt
from datetime import datetime

db = SQLAlchemy()
bcrypt = Bcrypt()

class User(db.Model):
    __tablename__ = 'users'
    id = db.Column(db.Integer, primary_key=True)
    username = db.Column(db.String(80), unique=True, nullable=False)
    email = db.Column(db.String(120), unique=True, nullable=False)
    password_digest = db.Column(db.String(128), nullable=False)  # Using password_digest for consistency
    is_volunteer = db.Column(db.Boolean, default=False)
    created_at = db.Column(db.DateTime, default=datetime.utcnow)
    items = db.relationship('Item', backref='owner', lazy=True)
    offers = db.relationship('TradeOffer', backref='offer_user', lazy=True)

    def set_password(self, password):
        self.password_digest = bcrypt.generate_password_hash(password).decode('utf-8')

    def check_password(self, password):
        return bcrypt.check_password_hash(self.password_digest, password)

    def as_dict(self):
        return {
            'id': self.id,
            'username': self.username,
            'email': self.email,
            'is_volunteer': self.is_volunteer,
            'created_at': self.created_at.isoformat()
        }

class Category(db.Model):
    __tablename__ = 'categories'
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(80), nullable=False, unique=True)
    items = db.relationship('Item', backref='category', lazy=True)

class Item(db.Model):
    __tablename__ = 'items'
    id = db.Column(db.Integer, primary_key=True)
    title = db.Column(db.String(120), nullable=False)  # Using title from feat/item-crud
    description = db.Column(db.Text, nullable=True)  # nullable=True from main
    image_url = db.Column(db.String(255), nullable=False)  # From feat/item-crud
    condition = db.Column(db.String(50), nullable=False)  # From feat/item-crud
    price = db.Column(db.Numeric(10, 2), nullable=False)  # Using Numeric from main for precision
    status = db.Column(db.String(50), nullable=False)  # From feat/item-crud
    user_id = db.Column(db.Integer, db.ForeignKey('users.id'), nullable=False)  # Consistent with both
    category_id = db.Column(db.Integer, db.ForeignKey('categories.id'), nullable=True)  # From main
    offers = db.relationship('TradeOffer', backref='item', lazy=True)  # From main

    def to_dict(self):
        return {
            'id': self.id,
            'title': self.title,
            'description': self.description,
            'image_url': self.image_url,
            'condition': self.condition,
            'price': float(self.price),  # Convert Numeric to float for serialization
            'status': self.status,
            'user_id': self.user_id,
            'category_id': self.category_id
        }

class TradeOffer(db.Model):
    __tablename__ = 'trade_offers'
    id = db.Column(db.Integer, primary_key=True)
    item_id = db.Column(db.Integer, db.ForeignKey('items.id'), nullable=False)
    offer_user_id = db.Column(db.Integer, db.ForeignKey('users.id'), nullable=False)
    message = db.Column(db.Text, nullable=True)
    offer_price = db.Column(db.Numeric(10, 2), nullable=False)
    status = db.Column(db.String(20), nullable=False, default='pending')
    timestamp = db.Column(db.DateTime, default=datetime.utcnow)
    
    __table_args__ = (db.UniqueConstraint('item_id', 'offer_user_id', name='unique_offer_per_user_per_item'),)
