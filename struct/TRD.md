1. Project Name

GATEXpress AI

2. Purpose

This document defines the technical requirements for the GATEXpress AI platform.

GATEXpress AI is a cloud-hosted web application that provides:

Mock test system for GATE preparation

Admin-controlled test management

Study material viewer

Score tracking

Secure authentication

Scalable backend architecture

Future AI integration support

The system must support multiple users and be deployable on cloud infrastructure.

3. System Architecture

Architecture type:

REST API

Modular backend

Role-based authentication

Cloud deployment ready

Scalable design

High-level architecture:

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

Request flow:

Client → Router → Service → Model → Database → Response
4. Technology Stack

Frontend

React / HTML / CSS / JavaScript

Backend

FastAPI

Database

PostgreSQL

ORM

SQLAlchemy

Authentication

JWT

Password hashing

bcrypt

File storage

Local storage / Cloud storage

Version control

GitHub

AI coding tools

Cursor

Antigravity

Claude

Containerization

Docker (recommended)

Reverse proxy

Nginx

Cloud hosting

AWS / GCP / Azure / VPS

Server runtime

Uvicorn / Gunicorn

5. Backend Architecture

Backend must follow modular structure.

backend/
│
├── app/
│
│   ├── main.py
│   ├── config.py
│   ├── database.py
│
│   ├── models/
│   ├── schemas/
│   ├── routers/
│   ├── services/
│   ├── utils/
│   └── uploads/

Detailed structure:

app/
 ├── models/
 │   user_model.py
 │   test_model.py
 │   question_model.py
 │   result_model.py
 │   material_model.py
 │
 ├── schemas/
 │   user_schema.py
 │   test_schema.py
 │   question_schema.py
 │   result_schema.py
 │   material_schema.py
 │
 ├── routers/
 │   auth_router.py
 │   test_router.py
 │   question_router.py
 │   result_router.py
 │   material_router.py
 │   admin_router.py
 │
 ├── services/
 │   auth_service.py
 │   test_service.py
 │   question_service.py
 │   result_service.py
 │   material_service.py
 │
 ├── utils/
 │   jwt.py
 │   hashing.py
 │   validator.py
 │
 └── uploads/
     materials/
6. Database Design
Users
id
name
email
password
role
created_at

Roles:

student
admin
Tests
id
title
subject
duration
created_by
created_at
Questions
id
test_id
question
option1
option2
option3
option4
answer
Results
id
user_id
test_id
score
total
date
Materials
id
subject
title
file_path
uploaded_by

Stored in:

uploads/materials/
7. Authentication Design

Method:

JWT

Flow:

Login
→ verify password
→ create token
→ send token

Request
→ send token
→ verify token
→ allow

Header:

Authorization: Bearer <token>

Role check required for:

admin routes

create test

upload material

8. API Design
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
GET /admin/results
9. File Storage Design

Files stored on server:

uploads/materials/

Allowed files:

pdf
jpg
png

Validation required.

10. Security Requirements

Password hashing required

JWT required

Role validation required

Input validation required

File validation required

No open admin routes

No plain passwords

Protect upload folder

11. Cloud Deployment Architecture

Production deployment:

User
 |
Internet
 |
Cloud Server
 |
Nginx
 |
FastAPI (Gunicorn/Uvicorn)
 |
PostgreSQL
 |
File Storage

Optional Docker:

Docker
 ├ backend
 ├ frontend
 ├ postgres
 └ nginx
12. Development Workflow
Idea
→ PRD
→ TRD
→ Architecture
→ Cursor / Claude
→ Code
→ GitHub
→ Docker
→ Cloud deploy

Workflow:

Write feature

Generate code using Claude

Edit in Cursor

Test locally

Commit to GitHub

Deploy to cloud

13. Future Technical Features

AI API

Performance analytics

Leaderboard

Smart test generator

AI doubt solver

Difficulty levels

Charts

14. Version Plan
V1

Auth

Mock test

Admin test

Result

Materials

Cloud deploy

V2

Profile

Charts

Better UI

V3

AI features

Analytics

Recommendation system