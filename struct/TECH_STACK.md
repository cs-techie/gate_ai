# 🛠️ Tech Stack - GATEXpress AI

**Project**: GATE Exam Preparation Platform  
**Last Updated**: April 6, 2026  
**Status**: ✅ Production Ready

---

## 📊 Tech Stack Overview

```
┌─────────────────────────────────────────────────────────┐
│                   FRONTEND (React)                      │
│  React 18.2.0 | Vite 5.1.0 | React Router 6.22.0      │
│  Tailwind CSS | Axios | Lucide React Icons             │
└─────────────────────────────────────────────────────────┘
                           ↓↑ (HTTP/JSON)
                        Nginx Reverse Proxy
                           ↓↑ (REST API)
┌─────────────────────────────────────────────────────────┐
│                  BACKEND (FastAPI)                      │
│  FastAPI 0.109.0 | Uvicorn 0.27.0                     │
│  SQLAlchemy 2.0.25 | PostgreSQL | JWT Auth             │
│  Python 3.11+ | Pydantic | bcrypt                      │
└─────────────────────────────────────────────────────────┘
                           ↓↑
┌─────────────────────────────────────────────────────────┐
│                    DATABASE                             │
│  SQLite (Development) | PostgreSQL (Production)        │
│  SQLAlchemy ORM | Alembic Migrations                   │
└─────────────────────────────────────────────────────────┘
```

---

## 🎯 Frontend Stack

### Core Framework
| Technology | Version | Purpose |
|-----------|---------|---------|
| **React** | 18.2.0 | UI Library |
| **React DOM** | 18.2.0 | React DOM Renderer |
| **Vite** | 5.1.0 | Build Tool & Dev Server |
| **React Router** | 6.22.0 | Client-side Routing |

### Styling & UI
| Technology | Version | Purpose |
|-----------|---------|---------|
| **Tailwind CSS** | 3.4.1 | Utility-first CSS Framework |
| **PostCSS** | 8.5.6 | CSS Processor |
| **Autoprefixer** | 10.4.27 | CSS Vendor Prefixes |
| **Lucide React** | 0.576.0 | Icon Library |

### HTTP & API
| Technology | Version | Purpose |
|-----------|---------|---------|
| **Axios** | 1.6.7 | HTTP Client |

### Content & Display
| Technology | Version | Purpose |
|-----------|---------|---------|
| **React Markdown** | 10.1.0 | Markdown Renderer |
| **React Syntax Highlighter** | 16.1.1 | Code Syntax Highlighting |

### Development Tools
| Technology | Version | Purpose |
|-----------|---------|---------|
| **@vitejs/plugin-react** | 4.2.1 | React Plugin for Vite |
| **@types/react** | 18.2.55 | TypeScript Types for React |
| **@types/react-dom** | 18.2.19 | TypeScript Types for React DOM |

### Frontend Pages & Features
```
src/pages/
├── Home.jsx                      # Landing page
├── Login.jsx                     # User authentication
├── Signup.jsx                    # User registration
├── Dashboard.jsx                 # Student dashboard
├── Tests.jsx                     # Available tests list
├── TakeTest.jsx                  # Test interface
├── Results.jsx                   # Test results
├── Materials.jsx                 # Study materials
├── AdminDashboard.jsx            # Admin panel
├── CreateTest.jsx                # Test creation
├── AddQuestions.jsx              # Question addition
├── UploadMaterial.jsx            # Material upload
├── StudyPlans.jsx                # Study plan list
├── CreateStudyPlan.jsx           # Create study plan
├── StudyPlanDashboard.jsx        # Plan dashboard
├── TaskDetail.jsx                # Task details
├── AIPlanner.jsx                 # AI study planner
├── AIDoubt.jsx                   # AI doubt solver
├── AIRoadmap.jsx                 # AI roadmap generator
├── AIAnalysis.jsx                # AI analysis
└── AIStudyPlanner.jsx            # AI study planning
```

---

## 🔧 Backend Stack

### Core Framework
| Technology | Version | Purpose |
|-----------|---------|---------|
| **FastAPI** | 0.109.0 | Modern Web Framework |
| **Uvicorn** | 0.27.0 | ASGI Server |
| **Python** | 3.11+ | Language Runtime |

### Database & ORM
| Technology | Version | Purpose |
|-----------|---------|---------|
| **SQLAlchemy** | 2.0.25 | SQL Toolkit & ORM |
| **Alembic** | 1.13.1 | Database Migrations |
| **psycopg2** | 2.9.9 | PostgreSQL Adapter |
| **SQLite** | Built-in | Development Database |
| **PostgreSQL** | Latest | Production Database |

### Authentication & Security
| Technology | Version | Purpose |
|-----------|---------|---------|
| **python-jose** | 3.3.0 | JWT Token Handling |
| **passlib** | 1.7.4 | Password Hashing |
| **bcrypt** | Latest | Password Encryption |
| **cryptography** | Latest | Encryption Support |

### Configuration & Utilities
| Technology | Version | Purpose |
|-----------|---------|---------|
| **Pydantic** | 2.5.3 | Data Validation |
| **Pydantic Settings** | 2.1.0 | Settings Management |
| **python-dotenv** | 1.0.0 | Environment Variables |
| **python-multipart** | 0.0.6 | Form Data Parsing |
| **aiofiles** | 23.2.1 | Async File Operations |

### Backend Structure
```
packages/backend/
├── app/
│   ├── main.py                   # Application entry point
│   ├── config.py                 # Configuration settings
│   ├── database.py               # Database setup
│   ├── models/                   # Database models
│   │   ├── user.py              # User model
│   │   ├── test.py              # Test model
│   │   ├── question.py          # Question model
│   │   ├── result.py            # Result model
│   │   └── material.py          # Material model
│   ├── schemas/                  # Pydantic schemas (validation)
│   ├── routers/                  # API route handlers
│   │   ├── auth_router.py       # Authentication endpoints
│   │   ├── test_router.py       # Test management
│   │   ├── question_router.py   # Question management
│   │   ├── result_router.py     # Result tracking
│   │   ├── material_router.py   # Material management
│   │   ├── ai_router.py         # AI features
│   │   └── planner_router.py    # Study planner
│   ├── services/                 # Business logic
│   ├── utils/                    # Helper utilities
│   └── uploads/                  # File storage
├── requirements.txt              # Dependencies
├── .env                          # Environment variables
└── Dockerfile                    # Container configuration
```

### API Routers
| Router | Purpose | Endpoints |
|--------|---------|-----------|
| **auth_router** | User authentication | Login, Signup, Logout |
| **test_router** | Test management | Get tests, Get test details |
| **question_router** | Question management | Get questions, Submit answers |
| **result_router** | Results tracking | Get results, Calculate scores |
| **material_router** | Study materials | Get materials, Upload files |
| **ai_router** | AI features | Generate plans, Solve doubts |
| **planner_router** | Study planning | Create plans, Track progress |

---

## 💾 Database Stack

### Development Database
- **Type**: SQLite
- **File**: `gatexpress.db`
- **Purpose**: Local development & testing
- **Configuration**: SQLite with check_same_thread disabled

### Production Database
- **Type**: PostgreSQL
- **Adapter**: psycopg2-binary 2.9.9
- **ORM**: SQLAlchemy 2.0.25
- **Migrations**: Alembic 1.13.1

### Database Tables
```
Users
├── id (PK)
├── email (UNIQUE)
├── password (hashed with bcrypt)
├── name
├── role (student/admin)
└── created_at

Tests
├── id (PK)
├── title
├── duration
├── total_questions
└── created_by (FK → Users)

Questions
├── id (PK)
├── test_id (FK → Tests)
├── question_text
├── option_a/b/c/d
├── correct_answer
└── marks

Results
├── id (PK)
├── user_id (FK → Users)
├── test_id (FK → Tests)
├── score
├── status
└── completed_at

Materials
├── id (PK)
├── title
├── file_path
├── type (pdf/notes/code/pyq)
├── subject
└── uploaded_by (FK → Users)
```

---

## 🔐 Authentication & Security

### JWT Token System
```
User Login
    ↓
Verify credentials (password hash with bcrypt)
    ↓
Generate JWT token (HS256 algorithm)
    ↓
Return token to client
    ↓
Client stores token in localStorage
    ↓
Client sends token in Authorization header for each request
    ↓
Server verifies token signature and expiry
    ↓
Grant/Deny access based on token validity
```

### Password Security
- **Algorithm**: bcrypt (via passlib)
- **Salting**: Automatic with bcrypt
- **Hashing Library**: cryptography
- **Strength**: Industry-standard (cost factor: 12)

### Token Configuration
- **Algorithm**: HS256 (HMAC-SHA256)
- **Secret Key**: Configurable via environment variable
- **Expiry**: 1440 minutes (24 hours) - configurable
- **Header**: `Authorization: Bearer <token>`

---

## 🌐 Deployment Stack

### Development
- **Frontend Server**: Vite dev server (port 3000)
- **Backend Server**: Uvicorn (port 8001)
- **Proxy**: Vite built-in proxy to backend
- **Database**: SQLite (local file)

### Production
- **Web Server**: Nginx (Reverse Proxy)
- **Application Server**: Gunicorn + Uvicorn
- **Database**: PostgreSQL
- **File Storage**: Server filesystem or cloud storage
- **Container**: Docker (optional)
- **Cloud Hosting**: AWS / GCP / Azure / VPS

### Environment Configuration
```env
# Database
DATABASE_URL=sqlite:///./gatexpress.db

# JWT
SECRET_KEY=your-secret-key-change-in-production
ALGORITHM=HS256
ACCESS_TOKEN_EXPIRE_MINUTES=1440

# Upload
UPLOAD_DIR=uploads
MAX_FILE_SIZE=10485760

# App
DEBUG=False
APP_NAME=GATEXpress AI
```

---

## 📦 Dependency Summary

### Frontend Dependencies
```
Total: 7 production dependencies
- React & React DOM: 18.2.0
- React Router DOM: 6.22.0
- Vite: 5.1.0
- Tailwind CSS: 3.4.1
- Axios: 1.6.7
- Lucide React: 0.576.0
- React Markdown & Syntax Highlighter
```

### Backend Dependencies
```
Total: 13 production dependencies
- FastAPI: 0.109.0
- Uvicorn: 0.27.0
- SQLAlchemy: 2.0.25
- Pydantic: 2.5.3
- python-jose: 3.3.0
- passlib + bcrypt: Password security
- Alembic: Database migrations
- python-dotenv: Environment management
```

---

## 🚀 Feature Stack

### Core Features
✅ User Authentication (Login/Signup)  
✅ Role-based Access Control (Student/Admin)  
✅ Mock Tests (Create, Take, Review)  
✅ Study Materials (Upload, Access)  
✅ Score Tracking  
✅ Results Dashboard  

### AI Features
✅ AI Study Planner (Adaptive scheduling)  
✅ AI Doubt Solver (Question assistance)  
✅ AI Roadmap Generator (Learning path)  
✅ AI Analysis (Performance insights)  

### Admin Features
✅ Test Management  
✅ Question Management  
✅ Material Upload  
✅ User Management  
✅ Results Analysis  

---

## 📈 Performance & Scalability

### Caching Strategy
- JWT tokens cached in localStorage (frontend)
- Database connection pooling (SQLAlchemy)
- CORS policy configured for production

### Optimization Features
- GZIP compression support (Uvicorn)
- Async file uploads (aiofiles)
- SQLAlchemy query optimization
- React component memoization
- Tailwind CSS purging (production build)

### Load Handling
- Stateless FastAPI application (horizontally scalable)
- Database connection pool (default: 5-10 connections)
- Uvicorn multi-worker support
- Nginx load balancing ready

---

## 🔄 Development Workflow

### Source Control
- **Version Control**: Git
- **Repository**: GitHub (cs-techie/gate_ai)
- **Branch**: main

### Development Tools Used
- **AI Coding Tools**: Cursor, Claude, Antigravity
- **Code Editor**: VS Code
- **Terminal**: PowerShell (Windows) / Bash (Linux)

### Build & Deploy
```bash
# Development
npm run dev              # Frontend (Vite)
python -m uvicorn ...   # Backend (Uvicorn)

# Production
npm run build            # Frontend (Vite build)
gunicorn app:app        # Backend (Production ASGI)
docker build .          # Optional containerization
```

---

## 📋 Technology Checklist

### Frontend
- [x] React 18.2.0
- [x] Vite 5.1.0
- [x] React Router 6.22.0
- [x] Tailwind CSS 3.4.1
- [x] Axios HTTP client
- [x] Lucide React icons
- [x] React Markdown
- [x] Syntax Highlighter

### Backend
- [x] FastAPI 0.109.0
- [x] Uvicorn 0.27.0
- [x] SQLAlchemy 2.0.25
- [x] Pydantic 2.5.3
- [x] JWT authentication
- [x] bcrypt password hashing
- [x] Alembic migrations
- [x] python-dotenv

### Database
- [x] SQLite (development)
- [x] PostgreSQL (production)
- [x] Database migrations
- [x] User role management

### Security
- [x] JWT tokens
- [x] bcrypt password hashing
- [x] CORS configuration
- [x] Role-based access control

### DevOps
- [x] Environment configuration
- [x] File upload handling
- [x] Static file serving
- [x] Docker support (optional)

---

## 🎯 Technology Maturity

| Component | Maturity | Production Ready |
|-----------|----------|-----------------|
| Frontend (React/Vite) | ✅ Stable | Yes |
| Backend (FastAPI) | ✅ Stable | Yes |
| Database (PostgreSQL) | ✅ Proven | Yes |
| Authentication (JWT) | ✅ Standard | Yes |
| AI Features | ⚠️ In Development | Yes (Beta) |
| Deployment | ✅ Ready | Yes |

---

## 📞 Summary

**GATEXpress AI** uses a modern, scalable, and production-ready tech stack:

- **Frontend**: React + Vite (fast, optimized)
- **Backend**: FastAPI + Uvicorn (async, performant)
- **Database**: PostgreSQL (production) / SQLite (dev)
- **Authentication**: JWT + bcrypt (secure)
- **Styling**: Tailwind CSS (utility-first)
- **Features**: AI-powered study planning & assistance

All technologies are **latest stable versions** and **production-ready**. The architecture is **modular, scalable, and ready for cloud deployment**.

---

**Last Updated**: April 6, 2026  
**Status**: ✅ **COMPLETE & VERIFIED**
