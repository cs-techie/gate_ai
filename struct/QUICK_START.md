# 🚀 QUICK START GUIDE

**GATEXpress AI - GATE Exam Preparation Platform**

---

## ⚡ INSTANT ACCESS

### Open Application NOW
```
👉 http://localhost:3000
```

### Login Credentials
```
Email:    admin@gatexpress.com
Password: admin123
```

---

## 📊 SERVERS STATUS

### ✅ Frontend - RUNNING
```
URL:      http://localhost:3000
Status:   ✅ OPERATIONAL
Tech:     React 18.2.0 + Vite 5.1.0
```

### ✅ Backend - RUNNING
```
URL:      http://localhost:8001
Status:   ✅ OPERATIONAL
Docs:     http://localhost:8001/docs
Tech:     FastAPI + Uvicorn
```

### ✅ Database - CONNECTED
```
Type:     SQLite (gatexpress.db)
Status:   ✅ OPERATIONAL
ORM:      SQLAlchemy 2.0.25
```

---

## 🎯 MAIN FEATURES

✅ **User Authentication** - Secure login/signup with JWT  
✅ **Mock Tests** - Create and take exams  
✅ **Study Materials** - Upload and access resources  
✅ **Results Dashboard** - Track scores and progress  
✅ **Admin Panel** - Manage tests and users  
✅ **AI Study Planner** - Adaptive study schedules  
✅ **AI Doubt Solver** - Get help with questions  
✅ **AI Roadmap** - Personalized learning paths  

---

## 🔗 IMPORTANT LINKS

| Purpose | URL |
|---------|-----|
| App | http://localhost:3000 |
| API Docs | http://localhost:8001/docs |
| ReDoc | http://localhost:8001/redoc |

---

## 💻 DEVELOPER COMMANDS

### Terminal 1: Frontend (Already Running)
```bash
cd packages/frontend
npm run dev
# Open http://localhost:3000
```

### Terminal 2: Backend (Already Running)
```bash
cd packages/backend
set PYTHONPATH=%cd%
python -m uvicorn app.main:app --reload --port 8001
# Access http://localhost:8001/docs
```

---

## 📋 QUICK WORKFLOW

### As Student
1. Login → Dashboard → Take Test → View Results → Access Materials

### As Admin
1. Login → Admin Panel → Create Test → Add Questions → Manage Users

---

## 🛠️ TECH STACK AT A GLANCE

```
Frontend:  React 18 | Vite 5 | Tailwind CSS | Axios
Backend:   FastAPI | Uvicorn | SQLAlchemy | Pydantic
Database:  SQLite (Dev) / PostgreSQL (Prod)
Auth:      JWT | bcrypt
```

---

## ✨ WHAT'S WORKING NOW

- ✅ User Registration & Login
- ✅ Test Management (Create, Take, Review)
- ✅ Question Management
- ✅ Results Tracking
- ✅ Material Upload/Download
- ✅ Admin Dashboard
- ✅ AI Features (Study Planner, Doubt Solver, etc.)
- ✅ Real-time Hot Reload (Frontend & Backend)
- ✅ Full API Documentation

---

## 🐛 NEED HELP?

### Issue: Can't access application
**Solution**: Ensure both servers running, clear browser cache

### Issue: Backend API error
**Solution**: Check http://localhost:8001/docs for API status

### Issue: Database error
**Solution**: Verify gatexpress.db exists, restart servers

---

## 📚 DOCUMENTATION

- **README.md** - Project overview
- **Architecture.md** - System design
- **TECH_STACK.md** - Technology details
- **api-contracts.md** - API documentation

---

## 🎉 STATUS: READY TO USE!

Both servers are **running perfectly**. 

Open http://localhost:3000 and start using the application! 🚀

---

**Last Updated**: April 6, 2026  
**Status**: ✅ PRODUCTION READY
