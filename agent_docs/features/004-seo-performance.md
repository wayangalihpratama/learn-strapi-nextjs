# Feature: 004 - SEO & Performance Optimization

## Overview
As a tourism platform, discoverability is critical. The "Digital Tourism Hub" needs to be highly optimized for Search Engines (SEO) and perform exceptionally well (Lighthouse score > 90) to ensure travelers can easily find village attractions via Google.

## User Stories Mapping
(To be defined in Phase 5 Plan)

## Requirements
- **Functional**:
  - Global SEO Settings: Add default `metaTitle`, `metaDescription`, and `shareImage` to the Strapi `Global` single type.
  - Page-Level SEO: Create a `shared.seo` Component in Strapi. Apply it to `Homepage`, `Attraction`, `Product`, and `Article`.
  - Dynamic Sitemap: Implement `pages/sitemap.xml.js` to dynamically fetch slugs from Strapi and generate the sitemap.
  - Layout Integration: The Next.js `Layout` component must dynamically merge Page-Level SEO with Global Fallbacks using `next/head`.
- **Non-Functional**:
  - **Performance**: Optimize images using Next/Image with proper sizing/WebP formats.
  - **Performance**: Achieve a Google Lighthouse performance, accessibility, and SEO score of 90+.
  - **Caching**: Ensure effective use of Next.js ISR/SSG to deliver pages instantly.

## Constraints
- Must not negatively impact the existing BlockRenderer architecture.
- Must remain easily manageable by non-technical village admins in Strapi.
