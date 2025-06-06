from flask import Blueprint, request, jsonify, session, current_app
from models import Car, db, User
from werkzeug.utils import secure_filename
import os
from routes.auth_routes import login_required
from sqlalchemy import or_

car_bp = Blueprint('car', __name__)

def allowed_file(filename):
    ALLOWED_EXTENSIONS = {'png', 'jpg', 'jpeg', 'gif', 'webp'}
    return '.' in filename and filename.rsplit('.', 1)[1].lower() in ALLOWED_EXTENSIONS

@car_bp.route('/', methods=['GET'])
def get_cars():
    # Get filter parameters
    brand = request.args.get('brand')
    min_price = request.args.get('min_price')
    max_price = request.args.get('max_price')
    min_year = request.args.get('min_year')
    max_year = request.args.get('max_year')
    search = request.args.get('search')
    installment = request.args.get('installment')
    
    # Start with base query
    query = Car.query
    
    # Apply filters
    if brand:
        query = query.filter(Car.brand == brand)
    if min_price:
        query = query.filter(Car.price >= float(min_price))
    if max_price:
        query = query.filter(Car.price <= float(max_price))
    if min_year:
        query = query.filter(Car.year >= int(min_year))
    if max_year:
        query = query.filter(Car.year <= int(max_year))
    if installment == 'true':
        query = query.filter(Car.is_installment_available == True)
    if search:
        search_term = f"%{search}%"
        query = query.filter(
            or_(
                Car.name.ilike(search_term),
                Car.brand.ilike(search_term),
                Car.model.ilike(search_term),
                Car.description.ilike(search_term)
            )
        )
    
    cars = query.all()
    return jsonify([{
        'id': car.id,
        'name': car.name,
        'brand': car.brand,
        'model': car.model,
        'year': car.year,
        'price': car.price,
        'discount_price': car.discount_price,
        'description': car.description,
        'image_url': car.image_url,
        'engine': car.engine,
        'is_available': car.is_available,
        'is_installment_available': car.is_installment_available
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
        'discount_price': car.discount_price,
        'description': car.description,
        'image_url': car.image_url,
        'engine': car.engine,
        'is_available': car.is_available,
        'is_installment_available': car.is_installment_available
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
        image_path = os.path.join(current_app.config['UPLOAD_FOLDER'], filename)
        image.save(image_path)
        image_url = f'/uploads/{filename}'
    else:
        image_url = None
    
    car = Car(
        name=data['name'],
        brand=data['brand'],
        model=data['model'],
        year=int(data['year']),
        price=float(data['price']),
        discount_price=float(data['discount_price']) if data.get('discount_price') else None,
        description=data['description'],
        image_url=image_url,
        engine=data.get('engine'),
        is_available=True,
        is_installment_available=data.get('is_installment_available', 'false').lower() == 'true'
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
        image_path = os.path.join(current_app.config['UPLOAD_FOLDER'], filename)
        image.save(image_path)
        car.image_url = f'/uploads/{filename}'
    
    car.name = data.get('name', car.name)
    car.brand = data.get('brand', car.brand)
    car.model = data.get('model', car.model)
    car.year = int(data.get('year', car.year))
    car.price = float(data.get('price', car.price))
    car.discount_price = float(data.get('discount_price')) if data.get('discount_price') else None
    car.description = data.get('description', car.description)
    car.engine = data.get('engine', car.engine)
    car.is_available = data.get('is_available', car.is_available)
    car.is_installment_available = data.get('is_installment_available', car.is_installment_available)
    
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

@car_bp.route('/brands', methods=['GET'])
def get_brands():
    brands = db.session.query(Car.brand).distinct().all()
    return jsonify([brand[0] for brand in brands])