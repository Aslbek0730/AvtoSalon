from flask import Flask, current_app
from flask_sqlalchemy import SQLAlchemy
from flask_migrate import Migrate
from flask_cors import CORS
from config import Config
import os

app = Flask(__name__)
app.config.from_object(Config)

# Extensiyani boshlash
db = SQLAlchemy(app)
migrate = Migrate(app, db)
CORS(app, resources={r"/api/*": {"origins": "http://localhost:5173"}}, supports_credentials=True)

# Agar mavjud bo'lmasa, yuklash uchun papkani yaratish
if not os.path.exists(app.config['UPLOAD_FOLDER']):
    os.makedirs(app.config['UPLOAD_FOLDER'])

# Modelni import qilish
from models import User, Car, CarImage, Order, Installment, Payment

# Ro'yxatdan otish
from routes.auth_routes import auth_bp
from routes.car_routes import car_bp
from routes.order_routes import order_bp
from routes.admin_routes import admin_bp

app.register_blueprint(auth_bp, url_prefix='/api/auth')
app.register_blueprint(car_bp, url_prefix='/api/cars')
app.register_blueprint(order_bp, url_prefix='/api/orders')
app.register_blueprint(admin_bp, url_prefix='/api/admin')

@app.route('/')
def index():
    return {'message': 'Welcome to Car Salon API'}

@app.errorhandler(404)
def not_found(error):
    return {'error': 'Not found'}, 404

@app.errorhandler(500)
def internal_error(error):
    return {'error': 'Internal server error'}, 500

if __name__ == '__main__':
    app.run(debug=True)