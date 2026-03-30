1. 📌 Product Name

GATEXpress AI

2. 🎯 Product Goal

GATEXpress AI is a cloud-hosted web platform designed to help students prepare for the GATE examination by providing mock tests, study materials, performance tracking, and admin-controlled test management.

The platform will be built as a startup-level scalable system using modern backend architecture and cloud deployment.

The system should allow:

Students to practice mock tests

Admin to create and manage tests

Students to track performance

Materials to be viewed online

Secure authentication system

Cloud hosting support

Future AI integration

Future versions will include AI-based features such as:

AI question generator

AI doubt solver

Performance analytics

Smart recommendations

3. 👥 User Roles
3.1 Student

Students can:

Register / Login

View dashboard

Take mock tests

View results

View materials

View profile

Track performance history

3.2 Admin

Admin can:

Login

Create tests

Add questions

Upload materials

View student results

Manage tests

Restrictions:

Admin cannot delete students

Admin only controls test content

4. ⚙️ Core Features
4.1 Authentication System

Signup

Login

Logout

JWT session handling

Role-based access

Secure password hashing

4.2 Student Dashboard

Welcome message

Available tests

Recent scores

Materials section

Profile access

4.3 Mock Test System

Test list

Start test

Timer

Multiple-choice questions

Submit test

Score calculation

Result page

Score saved in database

4.4 Admin Panel

Create test

Add questions

View tests

Upload materials

View results

Restrictions:

No delete student option

4.5 Material Viewer

Subject list

Topic list

PDF viewer

File download / view

4.6 Profile System

Name

Email

Test history

Scores list

5. 📄 Required Pages
Public Pages

Home

Login

Signup

Student Pages

Dashboard

Mock Test Page

Result Page

Materials Page

Profile Page

Admin Pages

Admin Login

Admin Dashboard

Create Test Page

Add Question Page

Upload Material Page

Results Page

6. 🧠 System Architecture Modules

The system will be divided into modules.

Main layers:

Frontend

Backend

Database

Storage

Cloud server

Modules:

Auth module

Test module

Question module

Result module

Material module

Admin module

Profile module

7. 🗄 Database Tables
Users

id

name

email

password

role

created_at

Tests

id

title

subject

duration

created_by

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

8. 🛠 Technology Stack

Frontend

React / HTML / CSS / JS

Backend

FastAPI

Database

PostgreSQL

Authentication

JWT

Password hashing

bcrypt

File storage

Local / Cloud storage

Version control

GitHub

AI coding tools

Cursor

Antigravity

Claude

Deployment

Cloud server (AWS / VPS / GCP / Azure)

Containerization (optional)

Docker

Reverse proxy (production)

Nginx

9. 🔄 System Flow
Student Flow

User
→ Login
→ Dashboard
→ Select test
→ Take test
→ Submit
→ Score saved
→ View result

Admin Flow

Admin
→ Login
→ Admin dashboard
→ Create test
→ Add questions
→ Upload material
→ View results

System Flow

Frontend
→ Backend API
→ Database
→ Response
→ Frontend

10. ☁️ Hosting Requirement

The system must support cloud deployment.

Requirements:

Cloud server hosting

Secure API access

Database on server

File storage support

Multi-user support

Scalable architecture

11. 🚀 Future Features

AI question generator

AI doubt solver

Leaderboard

Performance chart

Difficulty levels

Analytics

Recommendation system

12. 📌 Version Plan
Version 1 (MVP)

Login / Signup

Mock test

Admin create test

Result system

Material viewer

Cloud deploy

Version 2

Profile page

Charts

UI improvements

Better dashboard

Version 3

AI features

Smart tests

Analytics

Recommendation system