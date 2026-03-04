# Sprint 3 Plan: Modular Page Builder & Articles

**Status**: [x] Completed
**Sprint Goal**: Implement a modular content architecture using Strapi Dynamic Zones and Blocks, and introduce a rich-text capable Article system.

## Included Stories
1. **[x] [Story-007] Modular Homepage via Dynamic Zones** (5 pts)
2. **[x] [Story-008] Village Articles and News System** (5 pts)

## Technical Tasks
- [x] Configure `sections.hero`, `sections.info-block`, and `sections.featured-grid` components in Strapi.
- [x] Migrate `Homepage` single-type to use a `blocks` Dynamic Zone.
- [x] Create `Article` collection type with `@strapi/blocks` support.
- [x] Implement frontend `BlockRenderer` utility.
- [x] Create generic frontend blocks (`HeroBlock`, `InfoBlock`, `FeaturedGridBlock`).
- [x] Build News Listing `/news` and News Detail `/news/[slug]` pages.
- [x] Ensure fallback/defensive rendering if portal data is missing.

## Definition of Done
- [x] Code passes all linting.
- [x] Strapi configurations synced.
- [x] Defensive rendering verified.
- [x] Walkthrough created.
