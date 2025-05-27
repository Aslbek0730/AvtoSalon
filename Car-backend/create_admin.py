from app import app, db
from models import User

def create_admin():
    with app.app_context():
        # Admin foydalanuvchi mavjudligini tekshirish
        admin = User.query.filter_by(username='admin').first()
        if not admin:
            admin = User(
                username='admin',
                email='admin@example.com',
                is_admin=True
            )
            admin.set_password('admin123')  # Admin parolini o'zgartiring
            db.session.add(admin)
            db.session.commit()
            print("Admin foydalanuvchi yaratildi!")
        else:
            print("Admin foydalanuvchi allaqachon mavjud!")

if __name__ == '__main__':
    create_admin() 