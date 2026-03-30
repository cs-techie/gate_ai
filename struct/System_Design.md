# System Design — GATEXpress AI

## 1. Overview

GATEXpress AI is a cloud-hosted web application for GATE exam preparation.

The system provides:

- Mock test platform
- Admin-controlled test management
- Study material viewer
- Result tracking
- Secure authentication
- Scalable backend
- Future AI integration

The system is designed using modular backend architecture and must support cloud deployment.

---

## 2. Design Goals

- Scalable
- Secure
- Modular
- Cloud deployable
- Easy to maintain
- Supports future AI features
- Supports multiple users

---

## 3. High Level Design

User (Browser)
    |
Frontend
    |
Nginx
    |
FastAPI Backend
    |
PostgreSQL
    |
File Storage

Components:

Frontend → UI
Backend → API logic
Database → Data
Storage → Files
Server → Hosting

---

## 4. Component Design

### 4.1 Frontend

Responsibilities:

- UI rendering
- API calls
- Token storage
- Navigation

Tech:

- React / HTML / JS

---

### 4.2 Backend

Responsibilities:

- API handling
- Auth validation
- Business logic
- Database operations
- File handling

Tech:

- FastAPI
- SQLAlchemy
- JWT

Modules:

Auth
Test
Question
Result
Material
Admin
Profile

---

### 4.3 Database

Responsibilities:

- Store users
- Store tests
- Store questions
- Store results
- Store materials

DB:

PostgreSQL

Tables:

Users
Tests
Questions
Results
Materials

---

### 4.4 File Storage

Used for:

- PDF materials
- Images

Path:

uploads/materials/

Rules:

- Validate file type
- Limit size
- Secure folder

---

### 4.5 Reverse Proxy

Used for:

- Route requests
- SSL
- Security
- Static files

Tool:

Nginx

---

### 4.6 Server Runtime

Backend runs with:

Uvicorn / Gunicorn

---

### 4.7 Cloud Server

System must support:

- VPS
- AWS
- GCP
- Azure

Server contains:

Backend
Database
Storage
Nginx

---

## 5. Request Flow

Login

Client
→ Frontend
→ Backend
→ Database
→ Backend
→ Frontend

Test submit

Client
→ Backend
→ Calculate score
→ Save result
→ Response

Material upload

Admin
→ Backend
→ Save file
→ Save DB record

---

## 6. Backend Design Pattern

Router
→ Service
→ Model
→ Database

Example

auth_router
→ auth_service
→ user_model
→ database

Benefits:

- Clean code
- Easy to scale
- Easy to debug

---

## 7. Authentication Design

Method:

JWT

Flow:

Login
→ verify password
→ create token
→ send token

Request
→ send token
→ verify
→ allow / deny

Roles:

student
admin

Admin routes protected.

---

## 8. Test System Design

Test
→ contains questions

User
→ takes test

Result
→ saved in DB

Flow:

Get test
→ show questions
→ submit answers
→ calculate score
→ save result

---

## 9. Material System Design

Admin uploads PDF

Backend saves file

DB stores file path

Student views file

Path:

uploads/materials/

---

## 10. Security Design

- Hash passwords
- JWT required
- Role check
- Validate input
- Validate files
- Protect admin routes
- Limit upload size
- Hide secrets

---

## 11. Deployment Design

Production

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

Optional Docker

docker
 ├ backend
 ├ postgres
 └ nginx

---

## 12. Scaling Design

Future scaling:

Separate servers

Frontend server
Backend server
Database server
Storage server

Possible upgrades:

Load balancer
Redis cache
CDN
AI service

---

## 13. Future AI Design

AI features:

Question generator
Doubt solver
Performance analysis

Design rule:

AI must be separate service.

Example:

Backend
 |
AI API
 |
Model server

---

## 14. Development Workflow

PRD
→ TRD
→ Architecture
→ System Design
→ MVP doc
→ Coding
→ Testing
→ Cloud deploy

Tools:

Cursor
Claude
Antigravity
GitHub

---

## 15. Design Principles

- Keep modules separate
- Keep API clean
- Validate everything
- Avoid tight coupling
- Design for scaling
- Design for cloud