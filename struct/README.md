# GATEXpress AI - GATE Exam Preparation Platform

A full-stack web application for GATE exam preparation with mock tests, study materials, and progress tracking.

## 🚀 Features

### Student Features
- 📝 Take timed mock tests
- 📊 Track test results and progress
- 📚 Access study materials
- 👤 User profile and dashboard

### Admin Features
- ✏️ Create and manage tests
- ❓ Add questions with multiple choice options
- 📤 Upload study materials (PDF, images)
- 📈 View all student results

## 🛠️ Tech Stack

### Backend
- **FastAPI** - Modern Python web framework
- **PostgreSQL** - Database
- **SQLAlchemy** - ORM
- **JWT** - Authentication
- **bcrypt** - Password hashing

### Frontend
- **React 18** - UI library
- **React Router** - Navigation
- **Axios** - HTTP client
- **Vite** - Build tool

## 📁 Project Structure

```
struct/
├── packages/
│   ├── backend/
│   │   ├── app/
│   │   │   ├── models/      # Database models
│   │   │   ├── schemas/     # Pydantic schemas
│   │   │   ├── routers/     # API routes
│   │   │   ├── services/    # Business logic
│   │   │   ├── utils/       # Utilities
│   │   │   ├── main.py      # App entry point
│   │   │   ├── config.py    # Configuration
│   │   │   └── database.py  # DB connection
│   │   ├── requirements.txt
│   │   └── Dockerfile
│   │
│   └── frontend/
│       ├── src/
│       │   ├── components/  # React components
│       │   ├── pages/       # Page components
│       │   ├── api.js       # API client
│       │   ├── AuthContext.jsx
│       │   └── App.jsx
│       ├── package.json
│       └── Dockerfile
│
├── docker-compose.yml
└── README.md
```

## 🚀 Quick Start

### Option 1: Docker (Recommended)

```bash
# Clone and navigate to the project
cd struct

# Start all services
docker-compose up --build

# Access the application
# Frontend: http://localhost:3000
# Backend API: http://localhost:8000
# API Docs: http://localhost:8000/docs
```

### Option 2: Manual Setup

#### Backend

```bash
cd packages/backend

# Create virtual environment
python -m venv venv
venv\Scripts\activate  # Windows
# source venv/bin/activate  # Linux/Mac

# Install dependencies
pip install -r requirements.txt

# Set up environment variables
copy .env.example .env
# Edit .env with your database credentials

# Run the server
uvicorn app.main:app --reload
```

#### Frontend

```bash
cd packages/frontend

# Install dependencies
npm install

# Run development server
npm run dev
```

## 📡 API Endpoints

### Authentication
- `POST /api/auth/signup` - Register new user
- `POST /api/auth/login` - Login and get token
- `GET /api/auth/me` - Get current user

### Tests
- `GET /api/tests` - List all tests
- `POST /api/tests` - Create test (admin)
- `GET /api/tests/{id}` - Get test with questions

### Questions
- `POST /api/questions` - Add question (admin)
- `GET /api/questions/{test_id}` - Get questions for test

### Results
- `POST /api/results` - Submit test answers
- `GET /api/results/me` - Get my results
- `GET /api/results/all` - Get all results (admin)

### Materials
- `GET /api/materials` - List materials
- `POST /api/materials` - Upload material (admin)

## 🔐 User Roles

### Student (default)
- Can sign up and log in
- Can take tests
- Can view materials
- Can see own results

### Admin
- All student permissions
- Can create tests
- Can add questions
- Can upload materials
- Can view all results

## 🎯 Creating an Admin User

After starting the application, you can create an admin user by:

1. Sign up as a normal user
2. Connect to the database and update the role:

```sql
UPDATE users SET role = 'admin' WHERE email = 'your-email@example.com';
```

## 📝 Environment Variables

Create a `.env` file in the backend directory:

```env
DATABASE_URL=postgresql://postgres:postgres@localhost:5432/gatexpress
SECRET_KEY=your-super-secret-key-change-in-production
ACCESS_TOKEN_EXPIRE_MINUTES=1440
UPLOAD_DIR=uploads
```

## 🧪 Development

### API Documentation
Once the backend is running, access:
- Swagger UI: http://localhost:8000/docs
- ReDoc: http://localhost:8000/redoc

### Database Migrations
The app auto-creates tables on startup. For production, consider using Alembic for migrations.

## 📄 License

MIT License

## 🤝 Contributing

1. Fork the repository
2. Create your feature branch
3. Commit your changes
4. Push to the branch
5. Open a Pull Request
