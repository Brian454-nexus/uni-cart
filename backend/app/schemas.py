from marshmallow_sqlalchemy import SQLAlchemyAutoSchema, auto_field
from .models import User, Product, Category, Transaction, TokenBlocklist, Message, LikedProduct

class UserSchema(SQLAlchemyAutoSchema):
    class Meta:
        model = User
        load_instance = True
        include_fk = True
    id = auto_field()
    name = auto_field()
    email = auto_field()
    phone = auto_field()
    university = auto_field()
    avatar_url = auto_field()
    created_at = auto_field()
    verified = auto_field()

class CategorySchema(SQLAlchemyAutoSchema):
    class Meta:
        model = Category
        load_instance = True
    id = auto_field()
    name = auto_field()
    description = auto_field()

class ProductSchema(SQLAlchemyAutoSchema):
    class Meta:
        model = Product
        load_instance = True
        include_fk = True
    id = auto_field()
    title = auto_field()
    description = auto_field()
    price = auto_field()
    condition = auto_field()
    category_id = auto_field()
    seller_id = auto_field()
    images = auto_field()
    location = auto_field()
    created_at = auto_field()
    featured = auto_field()
    status = auto_field()
    views = auto_field()

class TransactionSchema(SQLAlchemyAutoSchema):
    class Meta:
        model = Transaction
        load_instance = True
        include_fk = True
    id = auto_field()
    product_id = auto_field()
    buyer_id = auto_field()
    seller_id = auto_field()
    amount = auto_field()
    status = auto_field()
    created_at = auto_field()

class TokenBlocklistSchema(SQLAlchemyAutoSchema):
    class Meta:
        model = TokenBlocklist
        load_instance = True
        include_fk = True
    id = auto_field()
    jti = auto_field()
    user_id = auto_field()
    created_at = auto_field()
    expires = auto_field()
    revoked = auto_field()

class MessageSchema(SQLAlchemyAutoSchema):
    class Meta:
        model = Message
        load_instance = True
        include_fk = True
    id = auto_field()
    sender_id = auto_field()
    receiver_id = auto_field()
    product_id = auto_field()
    message = auto_field()
    timestamp = auto_field()

class LikedProductSchema(SQLAlchemyAutoSchema):
    class Meta:
        model = LikedProduct
        load_instance = True
        include_fk = True
    id = auto_field()
    user_id = auto_field()
    product_id = auto_field()
    created_at = auto_field()
