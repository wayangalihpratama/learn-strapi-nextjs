# Feature: Tourism Village Foundation (Template v1)

## 📖 Description
This feature establishes the core data models and landing page skeleton for any tourism village. It uses generic naming conventions to allow for immediate rebranding via the CMS.

## 📝 Requirements
1.  **Strapi Content Types (Generic)**:
    *   **Attraction**: `name`, `slug`, `description`, `images`, `category_type`, `location_data`.
    *   **MarketPiece (Product)**: `title`, `provider_name`, `price`, `description`, `images`, `inquiry_link`.
    *   **Event (Performance/News)**: `title`, `event_type`, `date`, `description`, `images`.
2.  **Next.js Components (Modular)**:
    *   `TemplateHero`: Customizable hero with branding colors and images.
    *   `EntityGrid`: A reusable grid component for attractions or products.
    *   `InfoShowcase`: A layout for historical context or specific landmarks.

## ✅ User Acceptance Criteria (UAC)
- [ ] Admin can redefine the "Village Brand" (logo, name) in a Single Type.
- [ ] Users can browse a list of attractions filtered by custom "Category Types".
- [ ] Users can see an event calendar for upcoming local happenings.
- [ ] Clicking "Inquiry" triggers a configurable action (WhatsApp/Email).

## 🛠️ Technical Acceptance Criteria (TAC)
- [ ] No hard-coded village names in the frontend code.
- [ ] Use CSS Variables for primary/secondary colors, driven by Strapi data.
- [ ] Implementation of `Layout` wrapper that consumes "Global" site settings.
- [ ] Batuan Village implementation serves as the production-ready example (default content).
