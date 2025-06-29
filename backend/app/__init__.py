from flask import Flask
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
from .extensions import db  # import db from extensions

# Extensions
ma = Marshmallow()
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

    # Import socketio handlers after app and socketio are ready
    from . import socketio_handlers

    # --- GLOBAL ERROR HANDLERS FOR JSON RESPONSES ---
    @app.errorhandler(400)
    def bad_request(e):
        return {'success': False, 'message': 'Bad request', 'error': str(e)}, 400

    @app.errorhandler(404)
    def not_found(e):
        return {'success': False, 'message': 'Not found', 'error': str(e)}, 404

    @app.errorhandler(405)
    def method_not_allowed(e):
        return {'success': False, 'message': 'Method not allowed', 'error': str(e)}, 405

    @app.errorhandler(500)
    def internal_error(e):
        return {'success': False, 'message': 'Internal server error', 'error': str(e)}, 500

    @app.errorhandler(Exception)
    def handle_exception(e):
        # For any uncaught exception, return JSON
        return {'success': False, 'message': 'An error occurred', 'error': str(e)}, 500

    return app
