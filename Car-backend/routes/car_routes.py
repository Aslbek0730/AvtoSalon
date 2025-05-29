from flask import Blueprint, request, jsonify, session, current_app
from models import Car, db, User
from werkzeug.utils import secure_filename
import os
from routes.auth_routes import login_required

car_bp = Blueprint('car', __name__)

def allowed_file(filename):
    return '.' in filename and filename.rsplit('.', 1)[1].lower() in {'png', 'jpg', 'jpeg', 'gif'}

@car_bp.route('/', methods=['GET'])
def get_cars():
    cars = Car.query.all()
    return jsonify([{
        'id': car.id,
        'name': car.name,
        'brand': car.brand,
        'model': car.model,
        'year': car.year,
        'price': car.price,
        'description': car.description,
        'image_url': car.image_url,
        'is_available': car.is_available
    } for car in cars])

@car_bp.route('/<int:car_id>', methods=['GET'])
def get_car(car_id):
    car = Car.query.get_or_404(car_id)
    return jsonify({
        'id': car.id,
        'name': car.name,
        'brand': car.brand,
        'model': car.model,
        'year': car.year,
        'price': car.price,
        'description': car.description,
        'image_url': car.image_url,
        'is_available': car.is_available
    })

@car_bp.route('/', methods=['POST'])
@login_required
def create_car():
    if 'user_id' not in session:
        return jsonify({'error': 'Unauthorized'}), 401
        
    user = User.query.get(session['user_id'])
    if not user.is_admin:
        return jsonify({'error': 'Unauthorized'}), 403
    
    data = request.form
    image = request.files.get('image')
    
    if image and allowed_file(image.filename):
        filename = secure_filename(image.filename)
        image.save(os.path.join(current_app.config['UPLOAD_FOLDER'], filename))
        image_url = f'/uploads/{filename}'
    else:
        image_url = None
    
    car = Car(
        name=data['name'],
        brand=data['brand'],
        model=data['model'],
        year=int(data['year']),
        price=float(data['price']),
        description=data['description'],
        image_url=image_url,
        is_available=True
    )
    
    db.session.add(car)
    db.session.commit()
    
    return jsonify({'message': 'Car created successfully', 'id': car.id}), 201

@car_bp.route('/<int:car_id>', methods=['PUT'])
@login_required
def update_car(car_id):
    if 'user_id' not in session:
        return jsonify({'error': 'Unauthorized'}), 401
        
    user = User.query.get(session['user_id'])
    if not user.is_admin:
        return jsonify({'error': 'Unauthorized'}), 403
    
    car = Car.query.get_or_404(car_id)
    data = request.form
    image = request.files.get('image')
    
    if image and allowed_file(image.filename):
        filename = secure_filename(image.filename)
        image.save(os.path.join(current_app.config['UPLOAD_FOLDER'], filename))
        car.image_url = f'/uploads/{filename}'
    
    car.name = data.get('name', car.name)
    car.brand = data.get('brand', car.brand)
    car.model = data.get('model', car.model)
    car.year = int(data.get('year', car.year))
    car.price = float(data.get('price', car.price))
    car.description = data.get('description', car.description)
    car.is_available = data.get('is_available', car.is_available)
    
    db.session.commit()
    return jsonify({'message': 'Car updated successfully'})

@car_bp.route('/<int:car_id>', methods=['DELETE'])
@login_required
def delete_car(car_id):
    if 'user_id' not in session:
        return jsonify({'error': 'Unauthorized'}), 401
        
    user = User.query.get(session['user_id'])
    if not user.is_admin:
        return jsonify({'error': 'Unauthorized'}), 403
    
    car = Car.query.get_or_404(car_id)
    db.session.delete(car)
    db.session.commit()
    
    return jsonify({'message': 'Car deleted successfully'})