# Story: 011 - Seeding Infrastructure

## 📖 Description
Establish the data structure and service skeleton for seeding Batuan Village content.

## ✅ User Acceptance Criteria (UAC)
- [ ] A `data.json` file exists in `backend/src/api/seed/` with correct schemas for Attraction, Market Piece, and Article.
- [ ] A `seeder.js` utility exists with a `seed()` function.

## 🛠️ Technical Acceptance Criteria (TAC)
- [ ] The `seed()` function includes an idempotency check (only runs if collection is empty).
- [ ] JSON data follows the Strapi v5 schema exactly.
- [ ] Estimated time: 1h
- [ ] Actual time: 0h
