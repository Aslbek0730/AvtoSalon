from flask import Flask
from flask_sqlalchemy import SQLAlchemy
from config import Config
import psycopg2
from psycopg2 import OperationalError

def test_postgres_connection():
    try:
        # Try direct connection using psycopg2
        conn = psycopg2.connect(
            dbname="car_salon",
            user="postgres",
            password="qwe123",
            host="localhost",
            port="5432"
        )
        print("✅ PostgreSQL bilan to'g'ri ulanish muvaffaqiyatli!")
        
        # Test database tables
        cur = conn.cursor()
        cur.execute("""
            SELECT table_name 
            FROM information_schema.tables 
            WHERE table_schema = 'public'
        """)
        tables = cur.fetchall()
        print("\nMavjud jadvallar:")
        for table in tables:
            print(f"- {table[0]}")
            
        cur.close()
        conn.close()
        
    except OperationalError as e:
        print("❌ PostgreSQL bilan ulanishda xatolik:", str(e))
        print("\nTekshirish kerak bo'lgan narsalar:")
        print("1. PostgreSQL server ishlayaptimi?")
        print("2. Ma'lumotlar bazasi yaratilganmi?")
        print("3. Foydalanuvchi va parol to'g'rimi?")
        print("4. Port 5432 ochiqmi?")

def test_flask_sqlalchemy():
    try:
        app = Flask(__name__)
        app.config.from_object(Config)
        db = SQLAlchemy(app)
        
        with app.app_context():
            # Test database connection
            db.engine.connect()
            print("\n✅ Flask-SQLAlchemy orqali ulanish muvaffaqiyatli!")
            
            # Test models
            from models import User, Car, Order
            print("\nModellar mavjud:")
            print("- User")
            print("- Car")
            print("- Order")
            
    except Exception as e:
        print("\n❌ Flask-SQLAlchemy bilan ulanishda xatolik:", str(e))

if __name__ == "__main__":
    print("PostgreSQL ulanishini tekshirish...\n")
    test_postgres_connection()
    print("\nFlask-SQLAlchemy ulanishini tekshirish...")
    test_flask_sqlalchemy() 