# Story-007: Modular Homepage via Dynamic Zones

## Metadata
- **Epic**: Foundation
- **Estimate**: 5 pts
- **Actual Time**: 4 hours
- **Status**: [x] Complete

## Description
As a Content Admin, I want to construct the homepage using modular blocks (Hero, Info, Feature Grid) so that I have complete control over the layout and content hierarchy without needing a developer to change code.

## User Acceptance Criteria (UAC)
- [x] Admin can add, remove, and reorder distinct sections on the homepage from the Strapi Admin panel.
- [x] The frontend renders the exact sequence of blocks defined in the Strapi `Homepage` single type.

## Technical Acceptance Criteria (TAC)
- [x] Strapi components `sections.hero`, `sections.info-block`, and `sections.featured-grid` are created.
- [x] A frontend `BlockRenderer` component maps the Strapi `__component` field to Next.js React components.
