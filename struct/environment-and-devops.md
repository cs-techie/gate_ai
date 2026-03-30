# Environment and DevOps

This document captures recommended environment setup, secrets management, CI/CD, and deployment notes for GATEXpress AI.

## 1. Environments

- local: developer machines
- staging: pre-production environment
- production: live environment

## 2. Configuration and Secrets

- Use environment variables for secrets (DATABASE_URL, JWT_SECRET, S3 creds)
- Do not check secrets into source control
- Use a secrets manager in production (AWS Secrets Manager, Azure Key Vault)

## 3. Local Setup (developer)

- Python 3.10+ virtualenv
- Install backend deps: pip install -r requirements.txt
- Run DB locally (Postgres)
- Run backend: uvicorn app.main:app --reload

## 4. CI/CD Recommendations

- Use GitHub Actions
- Steps:
  - Lint (flake8/black)
  - Unit tests
  - Build Docker image
  - Push image on merge to main
  - Deploy to staging and production with manual approvals

## 5. Docker and Orchestration

- Provide Dockerfile for backend and frontend
- For MVP, single VM with docker-compose is acceptable
- For production, consider Kubernetes or managed container service

## 6. Backups and Monitoring

- Automated DB backups daily
- Retention policy for backups (30 days)
- Monitoring: metrics, logs, alerts
- Use health checks for readiness and liveness

## 7. Rollback and Recovery

- Keep prior docker image tags to enable rollback
- Database migrations should be reversible or feature-flagged

## 8. Security

- Use TLS for all endpoints
- Keep JWT secrets rotated periodically
- Scan images for vulnerabilities before deploy

---

Last updated: 2026-03-01
