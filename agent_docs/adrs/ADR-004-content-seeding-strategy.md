# ADR-004: Content Seeding Strategy

## Status
Proposed

## Context
We need to populate the Strapi CMS with "Batuan Village" example content (Attractions, Market Pieces, Articles) to serve as a production-ready template. This content includes text, metadata, and local image files.

## Decision
We will implement an automated seeding mechanism within the Strapi `bootstrap` function (`backend/src/index.js`).

### Key Implementation Details:
1.  **Idempotency**: The seeding logic will only execute if the target collection is empty (e.g., `count() === 0`).
2.  **Asset Handling**: Since the content requires images, the seeder will look for images in a temporary directory or specified path, upload them to the Strapi Media Library using the `strapi.plugins.upload.services.upload.upload` service, and link them to the created entries.
3.  **Data Structure**: Seed data will be structured in a JSON format matching the Strapi Content Type schemas.
4.  **Separation of Concerns**: Seeding logic will be encapsulated in a helper utility to keep `src/index.js` clean.

## Consequences
- **Pros**: Ensures every developer (and potentially production) starts with a rich dataset. Reproducible and consistent.
- **Cons**: Slightly increases first-time startup time. Requires careful handling of image paths.
