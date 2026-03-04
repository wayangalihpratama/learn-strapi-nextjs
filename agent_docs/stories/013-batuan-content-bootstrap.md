# Story: 013 - Batuan Content Bootstrap

## 📖 Description
Integrate the seeding service into the Strapi `bootstrap` lifecycle and verify the content is live.

## ✅ User Acceptance Criteria (UAC)
- [ ] Starting the Strapi server triggers the seeding process if the database is empty.
- [ ] All three Batuan content entries (Pura Puseh, Painting, Gambuh) are created and published.
- [ ] Frontend can fetch these entries via the API.

## 🛠️ Technical Acceptance Criteria (TAC)
- [ ] Ensure `draftAndPublish` is handled (entries should be published).
- [ ] Log success/failure in the terminal during bootstrap.
- [ ] Estimated time: 1h
- [ ] Actual time: 0h
