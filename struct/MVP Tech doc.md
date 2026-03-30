# MVP Technical Document — GATEXpress AI

## 1. Purpose

This document defines the technical scope of Version 1 (MVP) of GATEXpress AI.

The goal of MVP is to build a working cloud-hosted platform with:

- Authentication
- Mock test system
- Admin test creation
- Result tracking
- Material viewer

AI features are NOT included in MVP.

MVP must be stable, secure, and deployable on cloud.

---

## 2. MVP Goals

MVP must support:

- Student login/signup
- Admin login
- Create test
- Take test
- Submit test
- Score calculation
- Upload materials
- View materials
- Cloud deployment

MVP must NOT include:

- AI features
- Leaderboard
- Charts
- Analytics
- Recommendation system

These will be in future versions.

---

## 3. MVP Architecture

User (Browser)
    |
Frontend
    |
Nginx
    |
FastAPI
    |
PostgreSQL
    |
File Storage

Architecture type:

- REST API
- Modular backend
- JWT authentication
- Role based access

---

## 4. Tech Stack (MVP)

Frontend
- React / HTML / CSS / JS

Backend
- FastAPI

Database
- PostgreSQL

ORM
- SQLAlchemy

Auth
- JWT

Password hashing
- bcrypt

Storage
- uploads/materials/

Reverse proxy
- Nginx

Runtime
- Uvicorn / Gunicorn

Cloud
- VPS / AWS / GCP / Azure

Version control
- GitHub

Tools
- Cursor
- Antigravity
- Claude

Optional
- Docker

---

## 5. MVP Features

### 5.1 Authentication

- Signup
- Login
- Logout
- JWT token
- Role check

Roles:

student
admin

---

### 5.2 Student Features

Student can:

- Login
- View dashboard
- View tests
- Take test
- Submit test
- View result
- View materials
- View profile

---

### 5.3 Admin Features

Admin can:

- Login
- Create test
- Add questions
- Upload materials
- View results

Admin cannot delete users.

---

### 5.4 Test System

Test list
Start test
Timer
MCQ questions
Submit
Score calculate
Save result

---

### 5.5 Material Viewer

Upload PDF
View PDF
List materials
Filter by subject

Files stored in:

uploads/materials/

---

## 6. Backend Modules

Auth module
Test module
Question module
Result module
Material module
Admin module
Profile module

---

## 7. Database Tables

Users
Tests
Questions
Results
Materials

Relations:

User → Results
Test → Questions
Test → Results

---

## 8. API Scope (MVP)

Auth

POST /auth/signup  
POST /auth/login  
GET /auth/me  

Tests

GET /tests  
POST /tests  
GET /tests/{id}  

Questions

POST /questions  
GET /questions/{test_id}  

Results

POST /results  
GET /results/{user_id}  

Materials

GET /materials  
POST /materials  

Admin

POST /admin/create-test  
POST /admin/add-question  
POST /admin/upload-material  

---

## 9. Security Rules (MVP)

- Hash passwords
- Use JWT
- Validate inputs
- Protect admin routes
- Validate file uploads
- No plain passwords
- No open endpoints

---

## 10. Deployment Plan (MVP)

Cloud server required.

Production:

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
File storage

Optional Docker:

docker
 ├ backend
 ├ postgres
 └ nginx

---

## 11. Development Workflow

PRD
→ TRD
→ Architecture.md
→ MVP_Tech_Doc.md
→ Coding
→ Testing
→ Cloud deploy

Workflow:

Write feature
→ Claude generate code
→ Edit in Cursor
→ Test
→ Commit GitHub
→ Deploy

---

## 12. Future Versions

V2

- Charts
- Profile improvements
- UI improvements

V3

- AI question generator
- AI doubt solver
- Analytics
- Leaderboard
- Recommendations

Architecture must support future expansion.