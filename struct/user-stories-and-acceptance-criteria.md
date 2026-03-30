# User Stories and Acceptance Criteria

This document collects prioritized user stories for GATEXpress AI and their acceptance criteria. Stories are organized by role.

## Student Stories

US-01: As a student, I want to sign up and log in so I can access practice tests.
Acceptance:
- POST /auth/signup creates a user and returns 201.
- POST /auth/login returns a JWT on valid credentials.

US-02: As a student, I want to view available tests so I can pick one to take.
Acceptance:
- GET /tests returns a list of tests with id, title, subject, and duration.

US-03: As a student, I want to take a timed MCQ test so I can simulate the exam.
Acceptance:
- GET /tests/{id} returns questions (without correct answers).
- Timer enforcement on frontend; backend allows submit within test duration.

US-04: As a student, I want to view my test results and history so I can track progress.
Acceptance:
- GET /results/{user_id} returns a paginated list of past results with score and date.

US-05: As a student, I want to view study materials so I can review topics.
Acceptance:
- GET /materials lists materials with subject, title, and file_url.
- GET /materials/{id} returns file or stream with proper headers.

## Admin Stories

US-A1: As an admin, I want to create tests so I can publish practice material.
Acceptance:
- POST /admin/create-test creates a test record with title, subject, duration and returns 201.

US-A2: As an admin, I want to add questions to a test so students can take them.
Acceptance:
- POST /admin/add-question accepts question, options, and answer; stores correct answer securely.

US-A3: As an admin, I want to upload materials so students can access study files.
Acceptance:
- POST /admin/upload-material accepts files (pdf/jpg/png), validates size/type, stores file and DB record.

## Cross-cutting Stories

US-C1: As a system, I must authenticate API requests to protect data.
Acceptance:
- All protected endpoints return 401 when token missing or invalid.

US-C2: As a system, I must validate inputs to prevent invalid data and security issues.
Acceptance:
- Invalid payloads return 400 with clear error messages.

## Prioritization

Must-have for MVP: US-01, US-02, US-03, US-04, US-A1, US-A2, US-A3, US-C1, US-C2

Nice-to-have for V2: Leaderboard, Charts, Profile improvements

---

Last updated: 2026-03-01
