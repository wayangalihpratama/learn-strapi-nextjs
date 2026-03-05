# Story: 013 - Batuan Content Bootstrap

## 📖 Description
Integrate the seeding service into the Strapi `bootstrap` lifecycle and verify the content is live. This includes aligning media fields with Strapi v5 Dynamic Zones and implementing deduplication.

## ✅ User Acceptance Criteria (UAC)
- [x] Starting the Strapi server triggers the seeding process if the database is empty.
- [x] All three Batuan content entries (Pura Puseh, Painting, Gambuh) are created and published.
- [x] Frontend can fetch these entries via the API.
- [x] Media fields are correctly linked to components in Dynamic Zones.

## 🛠️ Technical Acceptance Criteria (TAC)
- [x] Ensure `draftAndPublish` is handled (entries should be published).
- [x] Log success/failure in the terminal during bootstrap.
- [x] Estimated time: 1h
- [x] Actual time: 1.5h
