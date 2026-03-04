# Story: 013 - Batuan Content Bootstrap

## 📖 Description
Integrate the seeding service into the Strapi `bootstrap` lifecycle and verify the content is live.

## ✅ User Acceptance Criteria (UAC)
- [x] Starting the Strapi server triggers the seeding process if the database is empty.
- [x] All three Batuan content entries (Pura Puseh, Painting, Gambuh) are created and published.
- [x] Frontend can fetch these entries via the API.

## 🛠️ Technical Acceptance Criteria (TAC)
- [x] Ensure `draftAndPublish` is handled (entries should be published).
- [x] Log success/failure in the terminal during bootstrap.
- [x] Estimated time: 1h
- [x] Actual time: 1.5h
