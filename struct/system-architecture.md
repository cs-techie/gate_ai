# System Architecture

This document describes the physical and logical architecture for GATEXpress AI and recommended deployment topology.

## 1. High-Level Components

- Client (Browser)
- Frontend (React)
- Reverse Proxy (Nginx)
- Backend API (FastAPI)
- Database (PostgreSQL)
- File Storage (local or object store)
- Optional AI Service (separate microservice)

## 2. Logical Layers

- Presentation: React app
- API: FastAPI REST endpoints
- Business: Services and domain logic
- Persistence: PostgreSQL and file storage
- Infrastructure: Nginx, system monitoring, backups

## 3. Deployment Topology (single-server MVP)

Single VM (MVP):
- Nginx (reverse proxy + static)
- Uvicorn / Gunicorn hosting FastAPI
- PostgreSQL running locally or managed service
- File uploads stored on disk (uploads/)

## 4. Production Topology (recommended)

- Load balancer / reverse proxy
- Multiple backend instances behind the load balancer
- Managed PostgreSQL (RDS / Cloud SQL)
- Object storage for files (S3 / GCS)
- CDN for static frontend assets
- Monitoring (Prometheus / Grafana) and logging (ELK or managed)

## 5. Networking and Security

- TLS termination at Nginx or load balancer
- Use secure environment variables for secrets
- Database access restricted by IP and credentials
- JWT for API authentication
- Role-based access for admin endpoints

## 6. Backup and Recovery

- Daily DB backups with point-in-time recovery (if available)
- File storage backups or use durable object storage
- Test restore plan documented and rehearsed

## 7. Observability

- Request metrics (latency, throughput)
- Error logging with context
- Health endpoints for readiness and liveness

## 8. Scaling Strategy

- Start single instance for MVP
- Add load balancer and horizontal scale for backend
- Move DB to managed service and scale read replicas if needed
- Use cache (Redis) for frequent reads (future)

---

Last updated: 2026-03-01
