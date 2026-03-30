# Testing Strategy

This document defines the testing approach for GATEXpress AI across unit, integration, and E2E tests.

## 1. Testing Goals

- Ensure correctness of core flows (auth, test-taking, scoring)
- Prevent regressions with CI
- Provide confidence for deployments

## 2. Test Types

- Unit tests: business logic (scoring, hashing, validation)
- Integration tests: API endpoints with test database
- End-to-end (E2E): simulate user flows (signup -> take test -> view result) using Playwright or Cypress (frontend)
- Security tests: basic checks for unauthenticated access to protected endpoints

## 3. Tools

- Python: pytest, requests, httpx
- Frontend E2E: Playwright or Cypress (optional for MVP)
- Lint: flake8, black

## 4. Coverage Targets

- Unit test coverage target: 70%+ for backend core logic

## 5. Test Data and Fixtures

- Use fixture factories to create users, tests, and questions
- Use a disposable test database (SQLite in-memory or PostgreSQL test instance)

## 6. CI Integration

- Run unit and integration tests on every pull request
- Fail builds on test failures or lint errors

## 7. Smoke Tests (pre-deploy)

- Health endpoint reachable
- Auth login works
- Create test (admin) and student take test flow

---

Last updated: 2026-03-01
