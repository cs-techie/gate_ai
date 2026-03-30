# Monorepo Structure

This document suggests a monorepo layout for GATEXpress AI if the project grows to include multiple services or packages.

## 1. Top-level layout

/
- packages/
  - backend/ (FastAPI app)
  - frontend/ (React app)
  - ai-service/ (future microservice)
  - shared/ (shared types, design system)
- infra/ (deployment manifests, k8s, terraform)
- scripts/ (helper scripts)
- docs/ (product docs)

## 2. Backend package structure

packages/backend/
- app/
- tests/
- requirements.txt
- Dockerfile
- alembic/

## 3. Frontend package structure

packages/frontend/
- src/
- public/
- package.json
- Dockerfile

## 4. Shared package

packages/shared/
- types/ (openapi clients, shared DTOs)
- components/ (react design tokens)

## 5. Tooling

- Linting and formatting at repo root (prettier, eslint, black)
- CI pipelines to run tests for changed packages only
- Versioning: independent (per-package) or unified (repo-level)

## 6. CI/CD Recommendations

- Use GitHub Actions or similar
- Build and test changed packages
- Publish backend docker image on merge to main
- Deploy infra from infra/ using IaC

---

Last updated: 2026-03-01
