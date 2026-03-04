# Story-001: Global Branding Configuration

## Description
As a **Village Admin**, I want to configure the global look and feel (site name, logo, primary colors) in the CMS so that the frontend stays automatically aligned with our village identity.

## User Acceptance Criteria (UAC)
- [ ] Admin can edit `siteName`, `siteDescription`, `primaryColor`, and `secondaryColor` in Strapi.
- [ ] Primary color selection uses a color picker or Hex format.
- [ ] Logo upload is reflected across the entire site.

## Technical Acceptance Criteria (TAC)
- [ ] Create `Global` Single Type in Strapi.
- [ ] Frontend `layout.tsx` fetches the Global data.
- [ ] Injected colors are mapped to CSS variables (`--primary`, `--secondary`).
- [ ] Revalidation (ISR) occurs on change.

## Estimates
- Story Points: 3
- Estimated Time: 2h
