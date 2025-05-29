from flask import Blueprint, request, jsonify, session
from models import db, Order, Car, User
from routes.auth_routes import login_required

order_bp = Blueprint('order', __name__)

@order_bp.route('/', methods=['GET'])
@login_required
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
        'user_id': order.user_id,
        'car_id': order.car_id,
        'status': order.status,
        'created_at': order.created_at.isoformat(),
        'updated_at': order.updated_at.isoformat(),
        'car': {
            'id': order.car.id,
            'name': order.car.name,
            'brand': order.car.brand,
            'model': order.car.model,
            'price': order.car.price,
            'image_url': order.car.image_url
        } if order.car else None
    } for order in orders])

@order_bp.route('/<int:order_id>', methods=['GET'])
@login_required
def get_order(order_id):
    if 'user_id' not in session:
        return jsonify({'error': 'Unauthorized'}), 401
        
    user = User.query.get(session['user_id'])
    order = Order.query.get_or_404(order_id)
    
    if not user.is_admin and order.user_id != session['user_id']:
        return jsonify({'error': 'Unauthorized'}), 403
    
    return jsonify({
        'id': order.id,
        'user_id': order.user_id,
        'car_id': order.car_id,
        'status': order.status,
        'created_at': order.created_at.isoformat(),
        'updated_at': order.updated_at.isoformat(),
        'car': {
            'id': order.car.id,
            'name': order.car.name,
            'brand': order.car.brand,
            'model': order.car.model,
            'price': order.car.price,
            'image_url': order.car.image_url
        } if order.car else None
    })

@order_bp.route('/', methods=['POST'])
@login_required
def create_order():
    if 'user_id' not in session:
        return jsonify({'error': 'Unauthorized'}), 401
    
    data = request.get_json()
    car = Car.query.get_or_404(data['car_id'])
    
    if not car.is_available:
        return jsonify({'error': 'Car is not available'}), 400
    
    order = Order(
        user_id=session['user_id'],
        car_id=car.id,
        status='pending'
    )
    
    db.session.add(order)
    db.session.commit()
    
    return jsonify({
        'message': 'Order created successfully',
        'order': {
            'id': order.id,
            'user_id': order.user_id,
            'car_id': order.car_id,
            'status': order.status,
            'created_at': order.created_at.isoformat()
        }
    }), 201

@order_bp.route('/<int:order_id>', methods=['PUT'])
@login_required
def update_order(order_id):
    if 'user_id' not in session:
        return jsonify({'error': 'Unauthorized'}), 401
        
    user = User.query.get(session['user_id'])
    order = Order.query.get_or_404(order_id)
    
    if not user.is_admin and order.user_id != session['user_id']:
        return jsonify({'error': 'Unauthorized'}), 403
    
    data = request.get_json()
    if 'status' in data:
        if user.is_admin:
            order.status = data['status']
        elif data['status'] == 'cancelled' and order.status == 'pending':
            order.status = 'cancelled'
        else:
            return jsonify({'error': 'Cannot update status'}), 403
    
    db.session.commit()
    return jsonify({'message': 'Order updated successfully'})

@order_bp.route('/<int:order_id>', methods=['DELETE'])
@login_required
def delete_order(order_id):
    if 'user_id' not in session:
        return jsonify({'error': 'Unauthorized'}), 401
        
    user = User.query.get(session['user_id'])
    order = Order.query.get_or_404(order_id)
    
    if not user.is_admin and order.user_id != session['user_id']:
        return jsonify({'error': 'Unauthorized'}), 403
    
    if order.status != 'pending':
        return jsonify({'error': 'Cannot delete non-pending order'}), 400
    
    db.session.delete(order)
    db.session.commit()
    
    return jsonify({'message': 'Order deleted successfully'})