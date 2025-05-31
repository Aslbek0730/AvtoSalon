from flask import Blueprint, request, jsonify, make_response
from werkzeug.security import generate_password_hash, check_password_hash
from models import db, User
from functools import wraps
import jwt
from datetime import datetime, timedelta
import os

auth_bp = Blueprint('auth', __name__)

def login_required(f):
    @wraps(f)
    def decorated(*args, **kwargs):
        token = request.cookies.get('token')
        if not token:
            return jsonify({'message': 'Login required'}), 401
        try:
            data = jwt.decode(token, os.getenv('JWT_SECRET_KEY'), algorithms=["HS256"])
            current_user = User.query.get(data['user_id'])
            if not current_user:
                return jsonify({'message': 'Invalid token'}), 401
        except:
            return jsonify({'message': 'Invalid token'}), 401
        return f(*args, **kwargs)
    return decorated

@auth_bp.route('/register', methods=['POST'])
def register():
    data = request.get_json()
    
    if User.query.filter_by(email=data['email']).first():
        return jsonify({'message': 'Email already exists'}), 400
        
    hashed_password = generate_password_hash(data['password'])
    new_user = User(
        username=data['username'],
        email=data['email'],
        password=hashed_password,
        role='user'
    )
    
    db.session.add(new_user)
    db.session.commit()
    
    # Create JWT token
    token = jwt.encode({
        'user_id': new_user.id,
        'exp': datetime.utcnow() + timedelta(days=1)
    }, os.getenv('JWT_SECRET_KEY'))
    
    response = make_response(jsonify({
        'message': 'User registered successfully',
        'user': {
            'id': new_user.id,
            'username': new_user.username,
            'email': new_user.email,
            'role': new_user.role
        }
    }))
    
    # Set cookie with proper settings
    response.set_cookie(
        'token',
        token,
        httponly=True,
        secure=False,  # Development uchun false
        samesite='Lax',
        max_age=86400,  # 1 day
        path='/'
    )
    return response, 201

@auth_bp.route('/login', methods=['POST'])
def login():
    data = request.get_json()
    
    user = User.query.filter_by(email=data['email']).first()
    if not user or not check_password_hash(user.password, data['password']):
        return jsonify({'message': 'Invalid email or password'}), 401
    
    # Create JWT token
    token = jwt.encode({
        'user_id': user.id,
        'exp': datetime.utcnow() + timedelta(days=1)
    }, os.getenv('JWT_SECRET_KEY'))
    
    response = make_response(jsonify({
        'message': 'Login successful',
        'user': {
            'id': user.id,
            'username': user.username,
            'email': user.email,
            'role': user.role
        }
    }))
    
    # Set cookie with proper settings
    response.set_cookie(
        'token',
        token,
        httponly=True,
        secure=False,  # Development uchun false
        samesite='Lax',
        max_age=86400,  # 1 day
        path='/'
    )
    return response

@auth_bp.route('/logout', methods=['POST'])
def logout():
    response = make_response(jsonify({'message': 'Logout successful'}))
    response.delete_cookie('token')
    return response

@auth_bp.route('/me', methods=['GET'])
@login_required
def get_current_user():
    token = request.cookies.get('token')
    try:
        data = jwt.decode(token, os.getenv('JWT_SECRET_KEY'), algorithms=["HS256"])
        user = User.query.get(data['user_id'])
        
        if not user:
            return jsonify({'message': 'User not found'}), 404
            
        return jsonify({
            'id': user.id,
            'username': user.username,
            'email': user.email,
            'role': user.role
        })
    except:
        return jsonify({'message': 'Invalid token'}), 401 