# Feature: 005 - Multi-Village (Multi-Tenancy) Support

## Overview
Currently, the platform assumes it is hosting data for a single village. To scale the "Business in a Box" model, the platform needs to support managing multiple villages from a single Strapi backend, allowing the frontend to dynamically load content based on the village being queried (e.g., via subdomains or route parameters).

## User Stories Mapping
(To be defined in Phase 5 Plan)

## Requirements
- **Functional**:
  - **Data Isolation**: Create a `Village` Collection Type (Name, Slug, Branding Colors, Logo).
  - **Namespace Relations**: Add a one-to-many relationship from `Village` to `Attraction`, `Product`, and `Article`.
  - **Frontend Routing**: Refactor the Next.js app to use path-based tenant routing: `/[village-slug]`.
  - **Global Settings Migration**: Move the attributes from the `Global` single-type directly into the `Village` collection type to support per-village branding.
- **Non-Functional**:
  - **Scalability**: The database queries must efficiently filter content by the requested village slug.
  - **Security**: Prevent data bleeding between villages on the frontend.

## Constraints
- This introduces a major structural change to the database. Needs careful data migration planning if existing content exists.
- The Strapi Admin panel UI must be intuitive enough for a "Super Admin" to manage all villages, while potentially limiting "Village Admins" to their own data via Strapi RBAC (if using Strapi Enterprise/custom roles).
