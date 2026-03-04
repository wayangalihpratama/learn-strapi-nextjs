# Feature: Batuan Village Content Generation

## 📖 Description
Populate the Digital Tourism Hub with authentic content from Batuan Village (The Village of Arts) based on research findings. This involves creating initial entries for Attractions, Market Pieces, and Articles/Events to serve as a production-ready example.

## 🎯 Goals
- Showcase Batuan Village's unique heritage (Ancient Temple, Painting Style, Gambuh Dance).
- Provide a realistic data set for frontend development and testing.
- Demonstrate the modular content capabilities of the platform.

## 📝 Requirements

### 1. Attraction: Pura Puseh Batuan
- **Name**: Pura Puseh Batuan
- **Description**: Nearly 1,000-year-old ancient temple (founded 1022 AD) featuring intricate stone carvings and traditional palm fiber (ijuk) roofs.
- **Category**: Culture
- **Location**: Batuan, Sukawati, Gianyar, Bali
- **Opening Hours**: 09:00 - 18:00
- **Price Entry**: 30000
- **Image**: `pura_puseh_batuan_1772626981806.png`

### 2. Market Piece: Batuan Style Painting
- **Title**: Authentic Batuan Style Painting
- **Description**: Dense and meticulous detail depicting mythological scenes. A quintessential example of the "Village of Arts" heritage.
- **Price**: 5000000
- **Seller Name**: Batuan Artists Collective
- **Inquiry Link**: https://wa.me/6281234567890
- **Image**: `batuan_painting_1772627001135.png`

### 3. Article (Event): Gambuh Dance Performance
- **Title**: The Sacred Gambuh Dance of Batuan
- **Category**: Event
- **Content**: The Gambuh dance is believed to be the oldest Balinese dance form, dating back to the 15th century. It is a national treasure that is rare and highly valued for its cultural depth.
- **Author**: Page (Tech Writer)
- **Banner**: `gambuh_dance_1772627018022.png`

## ✅ User Acceptance Criteria (UAC)
- [ ] Strapi contains at least 1 entry for `Attraction` (Pura Puseh Batuan).
- [ ] Strapi contains at least 1 entry for `Market Piece` (Batuan Style Painting).
- [ ] Strapi contains at least 1 entry for `Article` (Gambuh Dance Performance).
- [ ] All entries have required fields populated.
- [ ] Frontend successfully fetches and displays these entries (if implemented).

## 🛠️ Technical Acceptance Criteria (TAC)
- [ ] Content generation is reproducible (e.g., via seed script or manual entry documentation).
- [ ] Images are provided via placeholder URLs or generated assets if available.
- [ ] Slugs are correctly generated for all entries.
- [ ] SEO components are initialized with basic metadata.
