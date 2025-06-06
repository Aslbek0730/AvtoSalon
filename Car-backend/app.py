from flask import Flask
from flask_cors import CORS
from models import db
from routes.car_routes import car_bp
from routes.auth_routes import auth_bp
from routes.user_routes import user_bp
from routes.admin_routes import admin_bp
from routes.order_routes import order_bp
import os

def create_app():
    app = Flask(__name__)
    
    # Configure CORS
    CORS(app, 
         supports_credentials=True, 
         origins=['https://car-salon-eosin.vercel.app', 'http://localhost:3000'],
         allow_headers=['Content-Type', 'Authorization', 'Accept'],
         expose_headers=['Content-Type', 'Authorization'],
         methods=['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
         max_age=3600,
         send_wildcard=False)
    
    # Configure database
    app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///cars.db'
    app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
    app.config['SECRET_KEY'] = os.environ.get('SECRET_KEY', 'your-secret-key')
    app.config['UPLOAD_FOLDER'] = os.path.join(os.path.dirname(os.path.abspath(__file__)), 'uploads')
    
    # Ensure upload folder exists
    os.makedirs(app.config['UPLOAD_FOLDER'], exist_ok=True)
    
    # Initialize database
    db.init_app(app)
    
    # Register blueprints
    app.register_blueprint(car_bp, url_prefix='/api/cars')
    app.register_blueprint(auth_bp, url_prefix='/api/auth')
    app.register_blueprint(user_bp, url_prefix='/api/users')
    app.register_blueprint(admin_bp, url_prefix='/api/admin')
    app.register_blueprint(order_bp, url_prefix='/api/orders')
    
    # Create database tables
    with app.app_context():
        db.create_all()
    
    return app

if __name__ == '__main__':
    app = create_app()
    app.run(debug=True, host='0.0.0.0', port=5000)