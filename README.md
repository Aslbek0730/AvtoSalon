# AvtoSalon - Avtomobil Savdo Platformasi

Bu loyiha avtomobil savdo platformasi bo'lib, frontend va backend qismlaridan iborat.

## Loyiha Tuzilishi

```
AvtoSalon/
├── Car-front/          # Frontend qismi (React)
└── Car-backend/        # Backend qismi (Flask)
```

## Backend Qismi

### Asosiy Fayllar

1. `app.py` - Asosiy ilova fayli
   - Flask ilovasini yaratish
   - CORS sozlamalari
   - Ma'lumotlar bazasi konfiguratsiyasi
   - Blueprint'larni ro'yxatdan o'tkazish

2. `config.py` - Konfiguratsiya fayli
   - SECRET_KEY - JWT tokenlar uchun maxfiy kalit
   - SQLALCHEMY_DATABASE_URI - PostgreSQL ma'lumotlar bazasi ulanishi
   - UPLOAD_FOLDER - Rasmlar uchun papka

3. `models.py` - Ma'lumotlar bazasi modellari
   - User - Foydalanuvchilar modeli
   - Car - Avtomobillar modeli
   - Order - Buyurtmalar modeli

### API Endpointlar

#### Autentifikatsiya (auth_routes.py)

1. `/api/auth/register` (POST)
   - Yangi foydalanuvchi ro'yxatdan o'tkazish
   - Parametrlar: username, email, password
   - Javob: 201 Created yoki 400 Bad Request

2. `/api/auth/login` (POST)
   - Foydalanuvchi tizimga kirish
   - Parametrlar: username, password
   - Javob: 200 OK (token cookie bilan) yoki 401 Unauthorized

3. `/api/auth/logout` (POST)
   - Tizimdan chiqish
   - Javob: 200 OK

4. `/api/auth/me` (GET)
   - Joriy foydalanuvchi ma'lumotlarini olish
   - Javob: 200 OK (foydalanuvchi ma'lumotlari) yoki 401 Unauthorized

#### Avtomobillar (car_routes.py)

1. `/api/cars` (GET)
   - Barcha avtomobillarni olish
   - Javob: 200 OK (avtomobillar ro'yxati)

2. `/api/cars/<id>` (GET)
   - Bitta avtomobil ma'lumotlarini olish
   - Javob: 200 OK (avtomobil ma'lumotlari)

3. `/api/cars/trending` (GET)
   - Trenddagi avtomobillarni olish
   - Javob: 200 OK (trenddagi avtomobillar)

4. `/api/cars/discounted` (GET)
   - Chegirmadagi avtomobillarni olish
   - Javob: 200 OK (chegirmadagi avtomobillar)

#### Buyurtmalar (order_routes.py)

1. `/api/orders` (POST)
   - Yangi buyurtma yaratish
   - Parametrlar: car_id
   - Javob: 201 Created

2. `/api/orders` (GET)
   - Foydalanuvchining buyurtmalarini olish
   - Javob: 200 OK (buyurtmalar ro'yxati)

#### Admin Panel (admin_routes.py)

1. `/api/admin/dashboard` (GET)
   - Admin panel statistikasini olish
   - Javob: 200 OK (statistika ma'lumotlari)

2. `/api/admin/users` (GET)
   - Barcha foydalanuvchilarni olish
   - Javob: 200 OK (foydalanuvchilar ro'yxati)

3. `/api/admin/users/<id>/role` (PUT)
   - Foydalanuvchi rolini o'zgartirish
   - Parametrlar: role
   - Javob: 200 OK

4. `/api/admin/orders` (GET)
   - Barcha buyurtmalarni olish
   - Javob: 200 OK (buyurtmalar ro'yxati)

5. `/api/admin/orders/<id>/status` (PUT)
   - Buyurtma holatini o'zgartirish
   - Parametrlar: status
   - Javob: 200 OK

## Frontend Qismi

### Asosiy Komponentlar

1. `App.jsx` - Asosiy ilova komponenti
   - Routing konfiguratsiyasi
   - Asosiy layout

2. `AuthContext.jsx` - Autentifikatsiya konteksti
   - Foydalanuvchi holatini boshqarish
   - Login/Register/Logout funksiyalari

3. `Navbar.jsx` - Navigatsiya paneli
   - Sayt navigatsiyasi
   - Autentifikatsiya holatiga qarab menyu

### API Xizmatlari

1. `api.js` - API so'rovlari
   - Autentifikatsiya so'rovlari
   - Avtomobillar so'rovlari
   - Buyurtmalar so'rovlari
   - Admin panel so'rovlari

## O'rnatish va Ishlatish

### Backend

```bash
cd Car-backend
pip install -r requirements.txt
python app.py
```

### Frontend

```bash
cd Car-front
npm install
npm run dev
```

## Xavfsizlik

1. JWT tokenlar orqali autentifikatsiya
2. Parollar hash'lanadi
3. CORS sozlamalari
4. Admin panel himoyalangan

## Texnologiyalar

- Backend: Flask, SQLAlchemy, PostgreSQL
- Frontend: React, React Router, Tailwind CSS
- Autentifikatsiya: JWT
- Ma'lumotlar bazasi: PostgreSQL