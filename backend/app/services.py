# Service layer for business logic

# Auth services
def register_user(data):
    # Validate input
    if not is_university_email(data.get('email', '')):
        return {'success': False, 'msg': 'Invalid university email'}
    if User.query.filter_by(email=data['email']).first():
        return {'success': False, 'msg': 'Email already registered'}
    user = User(
        name=data['name'],
        email=data['email'],
        university=data['university'],
        phone=data.get('phone'),
        password_hash=hash_password(data['password'])
    )
    db.session.add(user)
    db.session.commit()
    # TODO: Send verification email
    return {'success': True, 'msg': 'Registered. Please verify your email.'}

def login_user(data):
    user = User.query.filter_by(email=data['email']).first()
    if not user or not verify_password(data['password'], user.password_hash):
        return {'success': False, 'msg': 'Invalid credentials'}
    if not user.verified:
        return {'success': False, 'msg': 'Email not verified'}
    access_token = create_access_token(identity=user.id)
    refresh_token = create_refresh_token(identity=user.id)
    return {'success': True, 'access_token': access_token, 'refresh_token': refresh_token}

def refresh_token(user_id):
    access_token = create_access_token(identity=user_id)
    return {'access_token': access_token}

def logout_user(jti):
    # Add token to blocklist
    token = TokenBlocklist(jti=jti, user_id=get_jwt_identity(), created_at=datetime.datetime.utcnow(), expires=datetime.datetime.utcnow() + datetime.timedelta(days=1), revoked=True)
    db.session.add(token)
    db.session.commit()
    return {'msg': 'Logged out'}

def send_password_reset_email(data):
    user = User.query.filter_by(email=data['email']).first()
    if not user:
        return {'success': False, 'msg': 'User not found'}
    # TODO: Generate token and send email (Celery)
    return {'success': True, 'msg': 'Password reset email sent'}

def reset_password(data):
    # TODO: Validate token, set new password
    return {'success': True, 'msg': 'Password reset successful'}

# User services
def get_user_profile(user_id):
    user = User.query.get(user_id)
    return UserSchema().dump(user)

def update_user_profile(user_id, data):
    user = User.query.get(user_id)
    for k, v in data.items():
        if hasattr(user, k):
            setattr(user, k, v)
    db.session.commit()
    return UserSchema().dump(user)

def upload_avatar(user_id, file):
    if not is_valid_image(file):
        return {'success': False, 'msg': 'Invalid image'}
    filename = f"avatars/{uuid.uuid4()}_{secure_filename(file.filename)}"
    s3 = boto3.client('s3')
    s3.upload_fileobj(file, current_app.config['AWS_S3_BUCKET'], filename, ExtraArgs={'ACL': 'public-read'})
    url = f"https://{current_app.config['AWS_S3_BUCKET']}.s3.amazonaws.com/{filename}"
    user = User.query.get(user_id)
    user.avatar_url = url
    db.session.commit()
    return {'success': True, 'avatar_url': url}

# Product services
def create_product(data, user_id, files):
    images = []
    s3 = boto3.client('s3')
    for file in files:
        if is_valid_image(file):
            filename = f"products/{uuid.uuid4()}_{secure_filename(file.filename)}"
            s3.upload_fileobj(file, current_app.config['AWS_S3_BUCKET'], filename, ExtraArgs={'ACL': 'public-read'})
            url = f"https://{current_app.config['AWS_S3_BUCKET']}.s3.amazonaws.com/{filename}"
            images.append(url)
    product = Product(
        title=data['title'],
        description=data['description'],
        price=data['price'],
        condition=data['condition'],
        category_id=data['category_id'],
        seller_id=user_id,
        images=images,
        location=data.get('location'),
        featured=data.get('featured', False),
        status='active'
    )
    db.session.add(product)
    db.session.commit()
    return ProductSchema().dump(product)

def get_products(filters):
    query = Product.query
    if 'category_id' in filters:
        query = query.filter_by(category_id=filters['category_id'])
    if 'status' in filters:
        query = query.filter_by(status=filters['status'])
    if 'featured' in filters:
        query = query.filter_by(featured=filters['featured'])
    products = query.all()
    return ProductSchema(many=True).dump(products)

def update_product(product_id, data, user_id):
    product = Product.query.get(product_id)
    if product.seller_id != user_id:
        return {'success': False, 'msg': 'Unauthorized'}
    for k, v in data.items():
        if hasattr(product, k):
            setattr(product, k, v)
    db.session.commit()
    return ProductSchema().dump(product)

def delete_product(product_id, user_id):
    product = Product.query.get(product_id)
    if product.seller_id != user_id:
        return {'success': False, 'msg': 'Unauthorized'}
    db.session.delete(product)
    db.session.commit()
    return {'success': True, 'msg': 'Product deleted'}

def search_products_service(query):
    products = Product.query.filter(or_(Product.title.ilike(f'%{query}%'), Product.description.ilike(f'%{query}%'))).all()
    return ProductSchema(many=True).dump(products)

def increment_product_view(product_id):
    product = Product.query.get(product_id)
    product.views += 1
    db.session.commit()
    return {'success': True, 'views': product.views}

# Category services
def get_categories():
    categories = Category.query.all()
    return CategorySchema(many=True).dump(categories)

# Transaction services
def create_transaction(data, user_id):
    product = Product.query.get(data['product_id'])
    if not product or product.status != 'active':
        return {'success': False, 'msg': 'Product not available'}
    transaction = Transaction(
        product_id=product.id,
        buyer_id=user_id,
        seller_id=product.seller_id,
        amount=product.price,
        status='pending'
    )
    db.session.add(transaction)
    db.session.commit()
    # TODO: Initiate Flutterwave payment
    return TransactionSchema().dump(transaction)

def get_user_transactions(user_id):
    txs = Transaction.query.filter_by(buyer_id=user_id).all()
    return TransactionSchema(many=True).dump(txs)

# Payment services
def process_flutterwave_webhook(data):
    # TODO: Validate webhook, update transaction status
    return {'success': True, 'msg': 'Webhook processed'}

def refund_transaction(data):
    # TODO: Integrate with Flutterwave for refund
    return {'success': True, 'msg': 'Refund processed'}

# Email services
def send_verification_email(user):
    # TODO: Send verification email (Celery)
    pass

def send_password_reset_email(user):
    # TODO: Send password reset email (Celery)
    pass

# Image upload/optimization
def upload_image_to_s3(file):
    # TODO: Upload and optimize image, return CDN-ready URL
    pass
