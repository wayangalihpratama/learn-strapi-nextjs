# Story-008: Village Articles and News System

## Metadata
- **Epic**: Community Hub
- **Estimate**: 5 pts
- **Actual Time**: 3 hours
- **Status**: [x] Complete

## Description
As a Village Contributor, I want to publish news, cultural stories, and event updates with rich text and images so that travelers can stay informed and engaged with the community.

## User Acceptance Criteria (UAC)
- [x] Visitors can view a grid of published news articles at `/news`.
- [x] Visitors can read a full article with rich typography and inline images at `/news/[slug]`.
- [x] Admins can manage articles in Strapi, assigning titles, banners, authors, and categories.

## Technical Acceptance Criteria (TAC)
- [x] Strapi `Article` Collection Type is created with Rich Text (Blocks) support.
- [x] Next.js frontend fetches and renders the articles using `@strapi/blocks-react-renderer`.
- [x] Next.js generates static paths for the dynamic route `[slug].js` using ISR (Incremental Static Regeneration).
