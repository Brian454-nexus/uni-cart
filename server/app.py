from flask import Flask
from flask_cors import CORS
from flask_jwt_extended import JWTManager
from .config import Config
from .models import db, bcrypt
from .routes import auth_bp

app = Flask(__name__)
app.config.from_object(Config)

# Initialize extensions
CORS(app)
db.init_app(app)
bcrypt.init_app(app)
jwt = JWTManager(app)

# Register blueprints
app.register_blueprint(auth_bp)

@app.route('/')
def index():
    return {'message': 'Welcome to UniCart API'}

if __name__ == '__main__':
    app.run(debug=True)