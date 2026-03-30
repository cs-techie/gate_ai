# Architecture — GATEXpress AI

## 1. Overview

GATEXpress AI is a cloud-hosted web platform for GATE exam preparation.

The system provides:

- Mock test platform
- Admin-controlled test management
- Study material viewer
- Score tracking
- Secure authentication
- Scalable backend
- Future AI integration

Architecture is designed for startup-level deployment with cloud hosting.

---

## 2. High Level Architecture

User (Browser)
    |
Frontend (React / HTML / JS)
    |
Nginx (Reverse Proxy)
    |
FastAPI Backend
    |
PostgreSQL Database
    |
File Storage (Server / Cloud)

---

## 3. Architecture Type

- REST API
- Modular backend
- JWT authentication
- Role-based access
- Cloud deployable
- Scalable design

---

## 4. Technology Stack

Frontend
- React / HTML / CSS / JS

Backend
- FastAPI

Database
- PostgreSQL

ORM
- SQLAlchemy

Authentication
- JWT

Password hashing
- bcrypt

File storage
- uploads/materials/

Version control
- GitHub

AI coding tools
- Cursor
- Antigravity
- Claude

Reverse proxy
- Nginx

Server runtime
- Uvicorn / Gunicorn

Cloud hosting
- AWS / GCP / Azure / VPS

Container (optional)
- Docker

---

## 5. Backend Structure

backend/

app/
│
├── main.py
├── config.py
├── database.py
│
├── models/
├── schemas/
├── routers/
├── services/
├── utils/
└── uploads/

Modules:

- Auth module
- Test module
- Question module
- Result module
- Material module
- Admin module
- Profile module

---

## 6. Request Flow

Client
→ Router
→ Service
→ Model
→ Database
→ Response

---

## 7. User Roles

Student
- Take test
- View materials
- View results
- View profile

Admin
- Create test
- Add questions
- Upload material
- View results

Admin cannot delete students.

---

## 8. Database Tables

Users
Tests
Questions
Results
Materials

Relations

User → Results
Test → Questions
Test → Results

---

## 9. File Storage

Stored in:

uploads/materials/

Allowed files:

pdf
jpg
png

Validation required.

---

## 10. Authentication Flow

Login
→ verify password
→ create JWT
→ send token

Request
→ send token
→ verify token
→ allow / deny

Header:

Authorization: Bearer <token>

Roles:

student
admin

---

## 11. Cloud Deployment

Production architecture:

User
 |
Internet
 |
Cloud Server
 |
Nginx
 |
FastAPI
 |
PostgreSQL
 |
File Storage

Optional Docker:

docker
 ├ backend
 ├ frontend
 ├ postgres
 └ nginx

---

## 12. Development Workflow

Idea
→ PRD
→ TRD
→ Architecture.md
→ Cursor / Claude
→ Code
→ GitHub
→ Docker
→ Cloud deploy

---

## 13. Future Architecture

Planned features:

- AI question generator
- AI doubt solver
- Performance analytics
- Leaderboard
- Charts
- Recommendation system

Architecture must remain modular.