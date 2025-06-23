from flask import Flask
from flask_migrate import Migrate
from flask_cors import CORS
from models import db
from routes import trade_offers

app = Flask(__name__)
CORS(app)

# Database configuration
app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///unicart.db'
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False

# Initialize extensions
db.init_app(app)
migrate = Migrate(app, db)

# Register blueprints
app.register_blueprint(trade_offers)

if __name__ == '__main__':
    app.run(debug=True)
