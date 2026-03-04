# Feature: Modular Content & Articles (Sprint 3)

## 🎯 Goal
Enable a "Page Builder" experience using Strapi Dynamic Zones so that admins can manage every piece of text, button label, and section layout without developer intervention. Also, implement the Article/News system.

## 👥 Personas
- **Village Admin (John)**: Wants to change "Find My Journey" to "Explore Batuan" without asking a developer.
- **Local Storyteller**: Wants to publish articles about village history.

## 📋 Requirements

### 1. Modular Page Builder (Strapi & Next.js)
- **[MUST]** Refactor `Homepage` to use a `Content` Dynamic Zone.
- **[MUST]** Create Components:
    - `HeroSection`: Managed Title, Subtitle, CTA Text, Background.
    - `InfoBlock`: Side-by-side text and image for "About Us" or "History".
    - `FeaturedGrid`: Dynamic selection of Attractions or Products mentioned in the grid.
- **[SHOULD]** Support "Testimonial" and "CTA Banner" components.

### 2. Articles System
- **[MUST]** Create `Article` Collection Type (Title, Content, Author, Banner, PublishDate).
- **[MUST]** Article Listing Page Grid.
- **[MUST]** Dynamic Article Detail Page with Rich Text support.

## ✅ User Acceptance Criteria (UAC)
- [ ] Admin can change a button label in Strapi and see it update instantly on the site.
- [ ] Admin can add a new "Info Block" section to the homepage via the CMS.
- [ ] Visitors can read articles with formatted text and images.
- [ ] The "Featured Destinations" section on the homepage can be toggled on/off via the Dynamic Zone.

## 🛠️ Technical Acceptance Criteria (TAC)
- [ ] Use Strapi **Components** for each UI section.
- [ ] Use a **Dynamic Zone** named `layout` or `blocks` in the Homepage single type.
- [ ] Frontend: Implement a `BlockRenderer` system to map Strapi components to Next.js components.
- [ ] Use Strapi's `blocks` field (Rich Text) for article content.
