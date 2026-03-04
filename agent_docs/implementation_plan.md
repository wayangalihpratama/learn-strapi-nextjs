# Implementation Plan: Digital Tourism Hub (White-label Template)

This plan outlines the steps to build a generic, theme-able tourism platform using Strapi v5 and Next.js 14, using Batuan Village as the initial content example.

## Proposed Changes

### 🔧 Strapi Backend (Schema Design)
*   **[NEW] Global Settings (Single Type)**:
    *   `siteName`: String
    *   `siteDescription`: Text
    *   `logo`: Media
    *   `primaryColor`: Color (Hex)
    *   `secondaryColor`: Color (Hex)
    *   `footerContact`: Component (Phone, Email, WhatsApp)
*   **[NEW] Attraction (Collection Type)**:
    *   `name`, `slug`, `description`, `images`, `category` (Enum), `location` (String/Link).
*   **[NEW] Listing (Collection Type)**:
    *   `title`, `price`, `description`, `images`, `sellerName`, `inquiryLink`.
*   **[NEW] Event (Collection Type)**:
    *   `title`, `date`, `description`, `images`, `isSacred` (Boolean).

### 🎨 Next.js Frontend (Components & Data)
*   **[MODIFY] `frontend/app/layout.tsx`**: Add a context provider or top-level fetch to inject Strapi colors into CSS Variables.
*   **[NEW] `frontend/components/ui/BrandedButton.tsx`**: A button that uses `--primary-color`.
*   **[NEW] `frontend/components/sections/DynamicHero.tsx`**: A hero section that adapts its text/bg based on `Global` settings.
*   **[NEW] `frontend/app/page.tsx`**: Implementation of the homepage using ISR (`revalidate: 3600`).

## Verification Plan

### Automated Tests (Vitest)
1.  **Component Rendering**: Ensure `BrandedButton` correctly applies CSS variables.
    *   `npm run test frontend`
2.  **API Integration**: Mock Strapi response and ensure `layout` correctly sets CSS variables in the DOM.
    *   `npm run test frontend/__tests__/layout.test.tsx`

### Manual Verification
1.  **Branding Swap**:
    *   Change the `primaryColor` in Strapi to RED.
    *   Refresh the Next.js site and verify the Hero button turns RED.
2.  **Content Dynamicity**:
    *   Add a new "Event" in Strapi for Batuan (e.g., "Full Moon Ceremony").
    *   Verify it appears in the Event section without a code rebuild.
3.  **Respective Design**:
    *   Resize browser to mobile width and verify the marketplace grid collapses correctly.
