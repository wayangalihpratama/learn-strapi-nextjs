# Story-002: Attractions Directory (Generic Entity)

## Description
As a **Remote Traveler**, I want to browse a list of village attractions (landmarks, nature, culture) so that I can plan my visit.

## User Acceptance Criteria (UAC)
- [x] Visitors see a grid of all attractions on the homepage or dedicated listing page.
- [x] Each attraction card shows a thumbnail, name, and category.
- [x] Clicking a card leads to a detailed page with full description and location.

## Technical Acceptance Criteria (TAC)
- [x] Create `Attraction` Collection Type in Strapi.
- [x] Implement `generateStaticParams` in Next.js for dynamic detail routes.
- [x] Use `next/image` for optimized thumbnails.
- [x] Component: `AttractionCard` (Generic).

## Estimates
- Story Points: 5
- Estimated Time: 4h
