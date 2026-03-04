# PRD: Digital Tourism Hub (Template)

## 1. Introduction
This PRD defines a scalable, content-driven tourism platform template. The goal is to provide a "Business in a Box" for villages to digitize their culture, attractions, and products with zero additional code changes.

## 2. User Personas (Generic)
### 2.1 The Remote Traveler
- **Pain Point**: Lack of reliable, high-quality information about rural destinations.
- **Need**: Stunning visuals, clear maps, and direct inquiry channels.

### 2.2 The Local Merchant
- **Pain Point**: Limited reach for local goods (handicrafts, agriculture).
- **Need**: A digital storefront to showcase products and receive inquiries.

## 3. Functional Requirements
### 3.1 Content Management (Strapi)
- **[MUST]** Define `Attraction` Collection Type (Name, Slug, Description, Images, Category, Location).
- **[MUST]** Define `Product` Collection Type (Name, Price, Description, Images, Inquiry Link).
- **[MUST]** Define `Article` Collection Type (Title, Content, Author, Banner Image).
- **[SHOULD]** Implement a `Global` Single Type for site metadata (Logo, Village Name, Footer).

### 3.2 Frontend (Next.js)
- **[MUST]** Home Page with Dynamic Zones (Hero, Featured Attractions, Recent News).
- **[MUST]** Dynamic Listing & Detail pages for Attractions.
- **[MUST]** Product Catalog grid with "Inquiry" CTA (link to WhatsApp/Form).
- **[SHOULD]** SEO optimization for all dynamic routes.

## 4. Non-Functional Requirements
- **Responsive Design**: Must work flawlessly on mobile (primary device for travelers).
- **Security**: Basic Strapi API key protection for fetching data.
- **Speed**: Page load under 1.5s for static content.

## 5. Success Criteria (UAC)
1.  Admin can add a new Attraction in Strapi and see it appear on the site without a rebuild (ISR).
2.  Users can filter attractions by category (e.g., Nature, Culture).
3.  Clicking "Inquiry" on a product opens a direct communication channel.
