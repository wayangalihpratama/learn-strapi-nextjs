---
name: debugging-protocol
description: Systematic protocol for debugging common issues in the Strapi-NextJS stack.
---

# Debugging Protocol

Follow these steps when encountering issues in the Strapi-NextJS stack.

## 1. Check Service Status & Connectivity

```bash
./dc.sh ps
```
Ensure all services (`backend`, `frontend`, `db`) are `running`.

**Connectivity Check (Docker Hub):**
If `docker compose up` fails with a timeout while pulling images:
```bash
curl -I https://registry-1.docker.io/v2/
```
If this fails or times out, the issue is likely your network or a transient Docker Hub outage.

## 2. Inspect Logs

- **Backend (Strapi)**: `./dc.sh logs backend`
- **Frontend (Next.js)**: `./dc.sh logs frontend`
- **Database**: `./dc.sh logs db`

Look for database connection errors, Strapi startup failures, or Next.js build errors.

## 3. Diagnose Common Issues

### Database Connection
- If Strapi fails to start, verify that the `db` service is healthy and the `.env` credentials match the Postgres setup.

### Next.js Data Fetching
- Ensure `NEXT_PUBLIC_STRAPI_API_URL` is correctly set and the backend is reachable from the frontend container.

### Config-Sync Failures
- If schemas are not syncing, check `./dc.sh exec backend npm run config-sync export/import` for errors.

## 4. Run Tests

```bash
./dc.sh exec backend npm test
./dc.sh exec frontend npm test
```
Run tests to isolate the component failing.
