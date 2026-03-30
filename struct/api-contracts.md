# API Contracts

This document lists API endpoints, expected requests and responses for GATEXpress AI (MVP).

Base URL: /api (example)

## Auth

POST /auth/signup
Request: { name, email, password }
Response: 201 { id, name, email, role }

POST /auth/login
Request: { email, password }
Response: 200 { access_token, token_type: "bearer" }

GET /auth/me
Headers: Authorization: Bearer <token>
Response: 200 { id, name, email, role }

## Tests

GET /tests
Query: ?subject=&page=&limit=
Response: 200 [{ id, title, subject, duration_minutes }]

POST /tests  (admin)
Request: { title, subject, duration_minutes }
Response: 201 { id, title, subject, duration_minutes }

GET /tests/{id}
Response: 200 { id, title, subject, duration_minutes, questions: [...] }

## Questions

POST /questions  (admin)
Request: { test_id, question, option1..option4, answer }
Response: 201 { id, test_id }

GET /questions/{test_id}
Response: 200 [{ id, question, option1..option4 }]

## Results

POST /results
Request: { user_id, test_id, answers: [{ question_id, answer }], time_taken }
Response: 201 { id, user_id, test_id, score, total }

GET /results/{user_id}
Response: 200 [{ id, test_id, score, total, taken_at }]

## Materials

GET /materials
Response: 200 [{ id, subject, title, file_url }]

POST /materials  (admin)
Request: multipart/form-data { subject, title, file }
Response: 201 { id, subject, title, file_url }

## Admin

POST /admin/create-test  (admin)
POST /admin/add-question  (admin)
POST /admin/upload-material  (admin)

## Errors

Standard error response:
{ code: <http-status>, message: "<short description>", details?: {...} }

---

Last updated: 2026-03-01
