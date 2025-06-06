from flask import Flask
from flask_sqlalchemy import SQLAlchemy
from config import Config
import psycopg2
from psycopg2 import OperationalError

def reset_database():
    try:
        # Connect to PostgreSQL
        conn = psycopg2.connect(
            dbname="postgres",  # Connect to default database
            user="postgres",
            password="qwe123",
            host="localhost",
            port="5432"
        )
        conn.autocommit = True
        cur = conn.cursor()
        
        # Drop existing database if exists
        cur.execute("""
            SELECT pg_terminate_backend(pg_stat_activity.pid)
            FROM pg_stat_activity
            WHERE pg_stat_activity.datname = 'car_salon'
            AND pid <> pg_backend_pid();
        """)
        cur.execute("DROP DATABASE IF EXISTS car_salon")
        
        # Create new database
        cur.execute("CREATE DATABASE car_salon")
        print("✅ Ma'lumotlar bazasi qayta yaratildi!")
        
        cur.close()
        conn.close()
        
        # Initialize Flask app and create tables
        app = Flask(__name__)
        app.config.from_object(Config)
        db = SQLAlchemy(app)
        
        with app.app_context():
            db.create_all()
            print("✅ Jadvallar yaratildi!")
            
    except Exception as e:
        print("❌ Xatolik:", str(e))

if __name__ == "__main__":
    print("Ma'lumotlar bazasini qayta yaratish...")
    reset_database() 