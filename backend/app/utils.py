import re
from werkzeug.security import generate_password_hash, check_password_hash
from flask_limiter import Limiter
from flask_limiter.util import get_remote_address
from marshmallow import ValidationError
from PIL import Image
import io

# Input validation
def validate_input(data, schema):
    try:
        return schema.load(data)
    except ValidationError as err:
        return {'success': False, 'msg': err.messages}

# University email validation
def is_university_email(email):
    # TODO: Validate email domain against allowed universities
    return re.match(r"^[\w\.-]+@([\w\-]+\.)?ac\.ke$", email) is not None

# Password hashing
def hash_password(password):
    return generate_password_hash(password)

def verify_password(password, hash):
    return check_password_hash(hash, password)

# Image validation
def is_valid_image(file):
    allowed_types = ['image/jpeg', 'image/png', 'image/jpg']
    max_size = 5 * 1024 * 1024  # 5MB
    if file.content_type not in allowed_types:
        return False
    file.seek(0, io.SEEK_END)
    size = file.tell()
    file.seek(0)
    if size > max_size:
        return False
    try:
        img = Image.open(file)
        img.verify()
        file.seek(0)
        return True
    except Exception:
        return False

# Rate limiting (Flask-Limiter)
limiter = Limiter(key_func=get_remote_address)

def rate_limit():
    return limiter.limit("5/minute")

# Error handling helper
def error_response(msg, code=400):
    return {'success': False, 'msg': msg}, code
