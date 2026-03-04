## ADR-002: SEO Component Strategy
- **Status**: Accepted
- **Context**: The Digital Tourism Hub needs a robust way for non-technical admins to manage SEO metadata (Titles, Descriptions, OpenGraph Images) for both static/singleton pages (e.g., Homepage) and dynamic pages (e.g., Article, Attraction, Product). We need a scalable solution that doesn't clutter every collection type with raw fields, while also ensuring the Next.js frontend can dependably resolve metadata for any route.
- **Decision**: We will utilize a shared, reusable Strapi Component named `shared.seo`.
    1. This component will encapsulate fields like `metaTitle`, `metaDescription`, and `shareImage`.
    2. It will be attached directly to the `Global` single type (acting as the ultimate fallback) and to all relevant page-generating collection/single types (`Homepage`, `Attraction`, `Product`, `Article`).
    3. The Next.js frontend `Layout` and `getStaticProps` functions will implement a cascading resolution strategy: if the specific entity has a `seo` component defined, it will override the global fallback.
- **Alternatives Considered**:
    - **Raw Fields**: Adding `seoTitle`, `seoDesc` text fields directly to every model. *Rejected* because it leads to schema duplication and makes it harder to standardize GraphQL/REST queries on the frontend.
    - **Dedicated SEO Plugin**: Using a Strapi SEO plugin. *Rejected* because relying heavily on third-party plugins increases the long-term maintenance burden for a white-label template, especially regarding compatibility with major Strapi version upgrades (v5+).
- **Consequences**:
    - **Pros**: Clean, centralized schema. The frontend can write a single, reusable SEO tag generator function that expects a specific data shape.
    - **Cons**: Requires standardizing the generic GraphQL/REST API population logic to always include `populate[seo][populate]=*` for every page fetch.
