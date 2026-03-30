# Engineering Scope Definition

This document defines what the engineering team will deliver for the GATEXpress AI project for the MVP and near-term roadmap.

## 1. In-scope (MVP)

- Implement FastAPI backend with modular routers and services
- Implement PostgreSQL schema and migrations
- Implement JWT-based auth with hashed passwords
- Implement test runner and scoring
- Implement admin endpoints for test and material management
- Implement file upload handling and storage
- Provide basic React frontend skeleton and pages (if frontend in scope)
- Provide CI pipeline for tests and linting
- Provide deployment manifests or Dockerfiles for MVP

## 2. Out-of-scope (MVP)

- AI services (question generator, doubt solver)
- Advanced analytics and charts
- Leaderboard and social features
- Multi-region deployments and autoscaling (unless requested)

## 3. Quality Expectations

- Unit tests for core logic (scoring, auth)
- Integration tests for critical flows (signup, login, test submit)
- Basic linting and formatting (black, isort, flake8 for Python)
- Security review for auth and uploads

## 4. Deliverables

- Working backend with documented APIs
- Database migrations
- Sample data and seed scripts
- README with local development steps
- CI configured for main branch

## 5. Team Responsibilities

- Backend: API, DB, auth, scoring, file handling
- Frontend: UI pages, token handling, test runner
- DevOps: deployment scripts, monitoring, backups

---

Last updated: 2026-03-01
