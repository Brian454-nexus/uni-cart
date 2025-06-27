from flask import Flask
from flask_sqlalchemy import SQLAlchemy
from flask_jwt_extended import JWTManager
from flask_migrate import Migrate
from flask_marshmallow import Marshmallow
from flask_cors import CORS
from celery import Celery
from redis import Redis
from .config import Config
from .routes import auth_bp, users_bp, products_bp, categories_bp, transactions_bp, payments_bp, root_bp
from flasgger import Swagger
from flask_socketio import SocketIO

# Extensions
ma = Marshmallow()
db = SQLAlchemy()
jwt = JWTManager()
migrate = Migrate()
celery = Celery(__name__)
redis_client = Redis()
socketio = SocketIO(async_mode='eventlet', cors_allowed_origins='*')


def create_app(config_class=Config):
    app = Flask(__name__)
    app.config.from_object(config_class)

    # Init extensions
    db.init_app(app)
    ma.init_app(app)
    jwt.init_app(app)
    migrate.init_app(app, db)
    CORS(app)
    Swagger(app)
    socketio.init_app(app)

    # Celery config
    celery.conf.update(app.config)

    # Register blueprints here (to be added)
    app.register_blueprint(auth_bp)
    app.register_blueprint(users_bp)
    app.register_blueprint(products_bp)
    app.register_blueprint(categories_bp)
    app.register_blueprint(transactions_bp)
    app.register_blueprint(payments_bp)
    app.register_blueprint(root_bp)

    return app
