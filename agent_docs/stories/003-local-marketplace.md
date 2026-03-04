# Story-003: Local Marketplace (MarketPiece)

## Description
As a **Local Merchant**, I want to list my products so that visitors can inquire about buying them directly from me.

## User Acceptance Criteria (UAC)
- [x] Visitors see a list of local products (handicrafts, agriculture).
- [x] Clicking "Inquiry" on a product opens a direct WhatsApp link with pre-filled text.
- [x] Verified local badge is visible on each product.

## Technical Acceptance Criteria (TAC)
- [x] Create `MarketPiece` Collection Type in Strapi.
- [x] Helper function to generate WhatsApp links from inquiry link data.
- [x] Component: `MarketGrid` (reusing Generic Entity Grid patterns).

## Estimates
- Story Points: 5
- Estimated Time: 3h
