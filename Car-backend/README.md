# Car Dealership Backend

This is the backend API for the car dealership application built with Flask.

## Setup

1. Create a virtual environment:
```bash
python -m venv venv
```

2. Activate the virtual environment:
- Windows:
```bash
venv\Scripts\activate
```
- Unix/MacOS:
```bash
source venv/bin/activate
```

3. Install dependencies:
```bash
pip install -r requirements.txt
```

4. Set up environment variables:
- Copy `.env.example` to `.env`
- Update the values in `.env` with your configuration

5. Initialize the database:
```bash
flask db init
flask db migrate
flask db upgrade
```

6. Run the application:
```bash
flask run
```

## API Endpoints

### Authentication
- POST `/api/auth/register` - Register a new user
- POST `/api/auth/login` - Login user

### Cars
- GET `/api/cars` - Get all cars
- GET `/api/cars/<id>` - Get car details
- POST `/api/cars` - Create new car (admin only)
- PUT `/api/cars/<id>` - Update car (admin only)
- DELETE `/api/cars/<id>` - Delete car (admin only)

### Orders
- GET `/api/orders` - Get all orders (admin) or user orders
- GET `/api/orders/<id>` - Get order details
- POST `/api/orders` - Create new order
- PUT `/api/orders/<id>/status` - Update order status (admin only)

### Users
- GET `/api/users/profile` - Get user profile
- PUT `/api/users/profile` - Update user profile
- GET `/api/users/admin/users` - Get all users (admin only)
- PUT `/api/users/admin/users/<id>` - Update user (admin only)

## Database Models

### User
- id (Integer, Primary Key)
- username (String, Unique)
- email (String, Unique)
- password_hash (String)
- is_admin (Boolean)
- created_at (DateTime)

### Car
- id (Integer, Primary Key)
- name (String)
- brand (String)
- model (String)
- year (Integer)
- price (Float)
- description (Text)
- image_url (String)
- category_id (Integer, Foreign Key)
- is_available (Boolean)
- created_at (DateTime)

### Order
- id (Integer, Primary Key)
- user_id (Integer, Foreign Key)
- car_id (Integer, Foreign Key)
- order_date (DateTime)
- status (String)
- total_amount (Float)
- payment_status (String)

### Category
- id (Integer, Primary Key)
- name (String)
- description (Text) 