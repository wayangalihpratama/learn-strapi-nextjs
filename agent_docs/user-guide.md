# User Guide: Digital Tourism Hub Admin

Welcome to your Digital Tourism Hub. This guide will help you manage your village's digital presence.

## 🎨 Branding Your Village
Go to the **Global Settings** single type in the Strapi Admin:
1.  **Site Name**: Enter your village name (e.g., "Batuan Village").
2.  **Primary Color**: Choose a hex code for your main brand color (default: `#1A1A1A`).
3.  **Secondary Color**: Choose a hex code for accents (default: `#D4AF37`).
4.  **Logo**: Upload your village crest or logo.

## 🏺 Adding Attractions
Go to the **Attractions** collection:
1.  Create a new entry.
2.  Add a name, description, and high-quality images.
3.  Select a **Category** (Nature, Culture, etc.).
4.  Optionally add opening hours and entry fees.

## 🛍️ Managing the Marketplace
Go to the **Market Pieces** collection:
1.  Add new products from local artisans.
2.  **Price**: Enter the amount in IDR.
3.  **Inquiry Link**: Enter the seller's WhatsApp number (country code prefix, e.g., `62812...`).
4.  **Availability**: Toggle off if the item is sold out.

## 🔄 Updating Content
The site uses **Incremental Static Regeneration**. Changes made in Strapi will automatically appear on the website within **60 seconds**.

## 🌱 Automated Seeding
The project includes an **automatic seeding mechanism** for development:
- Every time the Strapi server starts, it checks for existing content.
- If data is missing (e.g., fresh database), it automatically populates the CMS with **Batuan Village** example content, including high-resolution AI-generated assets.
- This ensures a consistent ready-to-use development environment.
