# ADR-005: Strapi v5 Media Population and Seeder Alignment

## Status
Accepted

## Context
Strapi v5 introduced a "shallow" population by default and changed the Document Service lifecycle. Previous data fetching (`populate=true`) no longer returned media fields or nested components in Dynamic Zones. Additionally, components in Dynamic Zones require explicit `on` operator population for nested fields.

## Decision
1. **Frontend**: Use deep population (`populate=*`) for collection types and explicit `on` operator syntax for Dynamic Zones in `next/link` fetching logic.
2. **Backend Seeder**:
   - Explicitly map media fields to component-specific attributes (e.g., `background` for Hero).
   - Implement media deduplication using `strapi.db.query` to prevent asset proliferation on server restarts.
   - Use `findFirst()` for single types to ensure consistent state detection.

## Consequences
- Slightly larger JSON payloads due to `populate=*`.
- More robust and idempotent seeding process.
- Consistent image rendering across all device types and routes.
