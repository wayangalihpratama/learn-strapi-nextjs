# Story: 011 - Seeding Infrastructure

## 📖 Description
Establish the data structure and service skeleton for seeding Batuan Village content.

## ✅ User Acceptance Criteria (UAC)
- [x] A `data.json` file exists in `backend/src/api/seed/` with correct schemas for Attraction, Market Piece, and Article.
- [x] A `seeder.js` utility exists with a `seed()` function.

## 🛠️ Technical Acceptance Criteria (TAC)
- [x] The `seed()` function includes an idempotency check (only runs if collection is empty).
- [x] JSON data follows the Strapi v5 schema exactly.
- [x] Estimated time: 1h
- [x] Actual time: 1h
