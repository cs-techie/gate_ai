# Product Requirements GATEXpress AI

## 1. Purpose

This document lists the product-level requirements for GATEXpress AI. It captures high-level functional and non-functional requirements to guide implementation of the MVP and subsequent versions.

## 2. Scope

- MVP (V1): authentication, mock-test system, admin test creation, result tracking, material viewer, cloud deploy.
- V2+: analytics, charts, profile improvements, UI polish.
- V3+: AI question generator, doubt solver, recommendations.

## 3. Stakeholders

- Students (primary users)
- Admins / Content creators
- Product owner
- Engineering team
- DevOps team

## 4. Functional Requirements

FR-01: User signup, login, logout (JWT)
FR-02: Student dashboard with test list and recent scores
FR-03: Admin panel to create tests and add questions
FR-04: Support MCQ-based timed tests with submit and scoring
FR-05: Persist results and display history
FR-06: Upload, list, and view study materials (PDF/image)
FR-07: Role-based access control (student, admin)

## 5. Non-Functional Requirements

NFR-01: Secure authentication and password hashing
NFR-02: Input validation on all endpoints
NFR-03: File upload validation and size limits
NFR-04: Response latency: API median < 200ms for common endpoints (target)
NFR-05: Scalable design to support horizontal scaling
NFR-06: Audit logs for admin actions (create test, upload material)

## 6. Constraints and Assumptions

- MVP will not include AI features.
- Persistent storage uses PostgreSQL.
- Files stored on server or cloud object storage behind access controls.

## 7. Acceptance Criteria

- All FRs implemented and covered by integration tests.
- Security checks: hashed passwords, JWT verification, role checks.
- Documentation (API, architecture, deployment) published in repository.

## 8. Metrics to measure success

- Number of tests taken per day
- Average test completion rate
- Error rate (4xx/5xx)
- Deployment success rate and mean time to restore

---

Last updated: 2026-03-01
