# Story-006: Responsive Component Library Update

## Description
As a **Mobile Traveler**, I want the UI components (buttons, cards, banners) to be easy to interact with on my touch device so that I can browse the village portal without frustration.

## User Acceptance Criteria (UAC)
- [x] All interactive elements (buttons, links) have a minimum touch target of 44x44px.
- [x] `BrandedButton` styles are updated for minimal 'Sleek Light' aesthetic.
- [x] `Card` components use responsive padding and fluid typography.
- [x] Navigation menu transforms into a functional mobile-friendly drawer/sandwich menu.

## Technical Acceptance Criteria (TAC)
- [x] Update `BrandedButton.js` with new variants and sizes.
- [x] Refactor `AttractionCard` and `MarketCard` to use CSS Grid/Flex for responsiveness.
- [x] Implement fluid typography utils in `tailwind.config.js` or global CSS.

## Estimates
- Story Points: 5
- Estimated Time: 4h
