# Story-009: Strapi SEO Component & Integration

## Metadata
- **Epic**: Foundation (SEO)
- **Estimate**: 4 hours
- **Actual Time**: 2 hours
- **Status**: [x] Implemented

## Description
As a Content Admin, I want to manage SEO metadata (title, description, image) globally and customize it per page, so that search engines display accurate and engaging snippets for every page of the digital tourism hub.

## User Acceptance Criteria (UAC)
- [ ] Admin can define Global SEO metadata (Title, Description, Share Image) in the Strapi `Global` Single Type.
- [ ] Admin can define page-specific SEO metadata on `Homepage` (Single Type), `Attraction` (Collection), `Product` (Collection), and `Article` (Collection).
- [ ] Visitors inspecting the `<head>` of any page see the page-specific metadata if it exists, otherwise they see the global metadata.
- [ ] `<meta property="og:image">` tags render correctly based on Strapi image data.

## Technical Acceptance Criteria (TAC)
- [ ] A Strapi Component `shared.seo` is created with fields: `metaTitle` (string), `metaDescription` (text), `shareImage` (media).
- [ ] The `shared.seo` component is added to `Global`, `Homepage`, `Article`, `Attraction`, `Product` schemas.
- [ ] The Next.js frontend implements a reusable `<Seo>` component that consumes this data and injects it into `next/head`.
- [ ] The Next.js data fetching utilities are updated to populate the `seo` component and its `shareImage` relationship.

## Technical Notes
- Follow `ADR-002-seo-component-strategy`.
- Update the `fetchFromStrapi` calls to handle nested population for `seo.shareImage`.

## Definition of Done
- [ ] Unit tests passing (if applicable).
- [ ] Code reviewed and passes linting.
- [ ] Verified via Next.js dev server inspecting the DOM.
