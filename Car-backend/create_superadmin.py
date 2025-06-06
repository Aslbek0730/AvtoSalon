from app import create_app
from models import db, User
from werkzeug.security import generate_password_hash

def create_superadmin():
    app = create_app()
    with app.app_context():
        # Check if superadmin already exists
        superadmin = User.query.filter_by(email='superadmin@example.com').first()
        if superadmin:
            print('Superadmin already exists!')
            return

        # Create superadmin
        superadmin = User(
            username='superadmin',
            email='superadmin@example.com',
            password=generate_password_hash('superadmin123'),
            role='admin',
            is_admin=True
        )
        
        db.session.add(superadmin)
        db.session.commit()
        print('Superadmin created successfully!')
        print('Email: superadmin@example.com')
        print('Password: superadmin123')

if __name__ == '__main__':
    create_superadmin() 