from flask import Blueprint, request, jsonify, session
from models import Order, Car, User, db

bp = Blueprint('orders', __name__, url_prefix='/api/orders')

@bp.route('/', methods=['GET'])
def get_orders():
    if 'user_id' not in session:
        return jsonify({'error': 'Unauthorized'}), 401
        
    user = User.query.get(session['user_id'])
    
    if user.is_admin:
        orders = Order.query.all()
    else:
        orders = Order.query.filter_by(user_id=session['user_id']).all()
    
    return jsonify([{
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
    } for order in orders])

@bp.route('/<int:order_id>', methods=['GET'])
def get_order(order_id):
    if 'user_id' not in session:
        return jsonify({'error': 'Unauthorized'}), 401
        
    user = User.query.get(session['user_id'])
    
    order = Order.query.get_or_404(order_id)
    
    if not user.is_admin and order.user_id != session['user_id']:
        return jsonify({'error': 'Unauthorized'}), 403
    
    return jsonify({
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
    })

@bp.route('/', methods=['POST'])
def create_order():
    if 'user_id' not in session:
        return jsonify({'error': 'Unauthorized'}), 401
        
    data = request.get_json()
    
    car = Car.query.get_or_404(data['car_id'])
    
    if not car.is_available:
        return jsonify({'error': 'Car is not available'}), 400
    
    order = Order(
        user_id=session['user_id'],
        car_id=data['car_id'],
        total_amount=car.price
    )
    
    car.is_available = False
    db.session.add(order)
    db.session.commit()
    
    return jsonify({'message': 'Order created successfully', 'id': order.id}), 201

@bp.route('/<int:order_id>/status', methods=['PUT'])
def update_order_status(order_id):
    if 'user_id' not in session:
        return jsonify({'error': 'Unauthorized'}), 401
        
    user = User.query.get(session['user_id'])
    
    if not user.is_admin:
        return jsonify({'error': 'Unauthorized'}), 403
    
    order = Order.query.get_or_404(order_id)
    data = request.get_json()
    
    order.status = data['status']
    if data['status'] == 'rejected':
        order.car.is_available = True
    
    db.session.commit()
    return jsonify({'message': 'Order status updated successfully'})