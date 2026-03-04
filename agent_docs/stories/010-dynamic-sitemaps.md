# Story-010: Dynamic Sitemap Generation

## Metadata
- **Epic**: Foundation (SEO)
- **Estimate**: 3 hours
- **Actual Time**: 1 hour
- **Status**: [x] Implemented

## Description
As a Site Administrator, I want the platform to automatically generate an XML sitemap of all published content so that search engines can immediately discover new articles, attractions, and products without manual intervention.

## User Acceptance Criteria (UAC)
- [ ] Navigating to `/sitemap.xml` in the browser returns a valid XML sitemap.
- [ ] The sitemap includes the static homepage `/`.
- [ ] The sitemap includes dynamically generated URLs for all published `Attractions` (`/attractions/[slug]`).
- [ ] The sitemap includes dynamically generated URLs for all published `Articles` (`/news/[slug]`).
- [ ] Draft content in Strapi does NOT appear in the sitemap.

## Technical Acceptance Criteria (TAC)
- [ ] Implemented via `pages/sitemap.xml.js` in Next.js using `getServerSideProps`.
- [ ] Fetching logic aggregates data from multiple Strapi endpoints.
- [ ] The response Content-Type is set explicitly to `text/xml`.

## Technical Notes
- Follow `ADR-003-dynamic-sitemap`.
- Ensure standard sitemap XML formatting (e.g., `<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">`).
- Make sure to prefix paths with the frontend base URL (likely `process.env.NEXT_PUBLIC_FRONTEND_URL` or derived differently if needed).

## Definition of Done
- [ ] Code reviewed and passes linting.
- [ ] Manual verification of `/sitemap.xml` in the browser.
