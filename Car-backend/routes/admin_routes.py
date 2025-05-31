from flask import Blueprint, request, jsonify, session
from models import User, Car, Order, db
from datetime import datetime
from routes.auth_routes import login_required

admin_bp = Blueprint('admin', __name__, url_prefix='/api/admin')

def admin_required(f):
    @login_required
    def decorated(*args, **kwargs):
        if 'user_id' not in session:
            return jsonify({'error': 'Unauthorized'}), 401
            
        user = User.query.get(session['user_id'])
        if not user.is_admin:
            return jsonify({'error': 'Admin access required'}), 403
            
        return f(*args, **kwargs)
    decorated.__name__ = f.__name__
    return decorated

# Dashboard statistikasi
@admin_bp.route('/dashboard', methods=['GET'])
@admin_required
def get_dashboard():
    total_users = User.query.count()
    total_cars = Car.query.count()
    total_orders = Order.query.count()
    pending_orders = Order.query.filter_by(status='pending').count()
    
    return jsonify({
        'total_users': total_users,
        'total_cars': total_cars,
        'total_orders': total_orders,
        'pending_orders': pending_orders
    })

# Foydalanuvchi boshqarish
@admin_bp.route('/users', methods=['GET'])
@admin_required
def get_users():
    users = User.query.all()
    return jsonify([{
        'id': user.id,
        'username': user.username,
        'email': user.email,
        'role': user.role,
        'is_admin': user.is_admin,
        'created_at': user.created_at.isoformat()
    } for user in users])

@admin_bp.route('/users/<int:user_id>', methods=['PUT'])
@admin_required
def update_user(user_id):
    user = User.query.get_or_404(user_id)
    data = request.get_json()
    
    if 'role' in data:
        user.role = data['role']
    if 'is_admin' in data:
        user.is_admin = data['is_admin']
    
    db.session.commit()
    return jsonify({'message': 'User updated successfully'})

@admin_bp.route('/users/<int:user_id>', methods=['DELETE'])
@admin_required
def delete_user(user_id):
    user = User.query.get_or_404(user_id)
    db.session.delete(user)
    db.session.commit()
    return jsonify({'message': 'User deleted successfully'})

# Mashina boshqarish
@admin_bp.route('/cars', methods=['GET'])
@admin_required
def get_all_cars():
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

@admin_bp.route('/cars', methods=['POST'])
@admin_required
def create_car():
    data = request.get_json()
    
    car = Car(
        name=data['name'],
        brand=data['brand'],
        model=data['model'],
        year=data['year'],
        price=data['price'],
        description=data.get('description'),
        image_url=data.get('image_url'),
        is_available=True
    )
    
    db.session.add(car)
    db.session.commit()
    
    return jsonify({
        'message': 'Car created successfully',
        'car': {
            'id': car.id,
            'name': car.name,
            'brand': car.brand,
            'model': car.model,
            'year': car.year,
            'price': car.price,
            'description': car.description,
            'image_url': car.image_url,
            'is_available': car.is_available
        }
    }), 201

@admin_bp.route('/cars/<int:car_id>', methods=['PUT'])
@admin_required
def update_car(car_id):
    car = Car.query.get_or_404(car_id)
    data = request.get_json()
    
    car.name = data.get('name', car.name)
    car.brand = data.get('brand', car.brand)
    car.model = data.get('model', car.model)
    car.year = data.get('year', car.year)
    car.price = data.get('price', car.price)
    car.description = data.get('description', car.description)
    car.image_url = data.get('image_url', car.image_url)
    car.is_available = data.get('is_available', car.is_available)
    
    db.session.commit()
    return jsonify({'message': 'Car updated successfully'})

@admin_bp.route('/cars/<int:car_id>', methods=['DELETE'])
@admin_required
def delete_car(car_id):
    car = Car.query.get_or_404(car_id)
    db.session.delete(car)
    db.session.commit()
    return jsonify({'message': 'Car deleted successfully'})

# Buyurtma boshqarish
@admin_bp.route('/orders', methods=['GET'])
@admin_required
def get_orders():
    orders = Order.query.all()
    return jsonify([{
        'id': order.id,
        'user_id': order.user_id,
        'car_id': order.car_id,
        'status': order.status,
        'created_at': order.created_at.isoformat(),
        'updated_at': order.updated_at.isoformat(),
        'user': {
            'id': order.user.id,
            'username': order.user.username,
            'email': order.user.email
        },
        'car': {
            'id': order.car.id,
            'name': order.car.name,
            'brand': order.car.brand,
            'model': order.car.model,
            'price': order.car.price
        }
    } for order in orders])

@admin_bp.route('/orders/<int:order_id>', methods=['PUT'])
@admin_required
def update_order(order_id):
    order = Order.query.get_or_404(order_id)
    data = request.get_json()
    
    if 'status' in data:
        order.status = data['status']
        if data['status'] == 'rejected':
            order.car.is_available = True
    
    db.session.commit()
    return jsonify({'message': 'Order updated successfully'})

# Hisobotlar
@admin_bp.route('/reports/sales', methods=['GET'])
@admin_required
def get_sales_report():
    start_date = request.args.get('start_date')
    end_date = request.args.get('end_date')
    
    query = Order.query
    
    if start_date:
        query = query.filter(Order.order_date >= datetime.fromisoformat(start_date))
    if end_date:
        query = query.filter(Order.order_date <= datetime.fromisoformat(end_date))
    
    orders = query.all()
    
    total_sales = sum(order.total_amount for order in orders)
    total_orders = len(orders)
    
    return jsonify({
        'total_sales': total_sales,
        'total_orders': total_orders,
        'orders': [{
            'id': order.id,
            'user': {
                'id': order.user.id,
                'username': order.user.username
            },
            'car': {
                'id': order.car.id,
                'name': order.car.name,
                'brand': order.car.brand,
                'model': order.car.model
            },
            'order_date': order.order_date.isoformat(),
            'status': order.status,
            'total_amount': order.total_amount,
            'payment_status': order.payment_status
        } for order in orders]
    }) 