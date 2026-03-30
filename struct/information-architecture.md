# Information Architecture

This document describes the information organization and navigation model for GATEXpress AI.

## 1. Content Types

- User (student, admin)
- Test
- Question
- Result
- Material
- Profile

## 2. Navigation Structure

Public:
- Home
- Login
- Signup

Student (after login):
- Dashboard (overview, upcoming tests, recent scores)
- Tests (list)
- Take Test (test runner)
- Results (history, details)
- Materials (browse, view)
- Profile (edit)

Admin (after login):
- Admin Dashboard
- Create Test
- Add Questions
- Upload Material
- View Results

## 3. Data Relationships

- User 1 - N Results
- Test 1 - N Questions
- Test 1 - N Results
- Material may be linked to subject or topic

## 4. Common API Shapes

User (response):
- id, name, email, role, created_at

Test (response):
- id, title, subject, duration, created_by, created_at

Question (response):
- id, test_id, question, option1..option4 (no answer on normal get)

Result (response):
- id, user_id, test_id, score, total, date

Material (response):
- id, subject, title, file_url, uploaded_by, uploaded_at

## 5. URL and Routing Conventions

- RESTful resources:
  - /auth/*
  - /tests
  - /questions
  - /results
  - /materials
  - /admin/*

## 6. Search and Filters

- Tests: filter by subject, difficulty (future)
- Materials: filter by subject, topic, uploaded_at
- Results: filter by date range

## 7. Accessibility and UX Considerations

- Keep pages keyboard navigable
- Use semantic HTML for content
- Provide clear error messages and validation states
- Provide responsive layout for mobile/desktop

---

Last updated: 2026-03-01
