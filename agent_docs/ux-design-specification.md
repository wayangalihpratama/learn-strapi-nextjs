# UX Design Specification: Digital Tourism Hub

## 🎨 Design Vision: "The Modern Gateway"
The design follows a **minimal, clean, and modern** aesthetic. It prioritizes **high legibility, ample whitespace, and immersive imagery**. The goal is to create a premium, calm, and efficient experience for discovery and booking.

## 🌈 Color Palette
- **Pure White (#FFFFFF)**: Main background for a clean, airy feel.
- **Slate Black (#121212)**: For high-contrast typography and primary actions.
- **Mist Grey (#F8F9FA)**: Subtle background for secondary sections and cards.
- **Sky Accent (#007AFF)**: A vibrant, modern blue for key calls to action and active states.

## 🖋️ Typography
- **Heading Serif (Cormorant Garamond / Playfair)**: For hero headlines, adding a touch of elegance and editorial style.
- **Body Sans-Serif (Inter / Geist)**: For clean, modern readability across all UI elements.

## 🧱 Interaction Patterns
1.  **Immersive Hero Transitions**: Smooth fade-in animations for high-quality destination imagery.
2.  **Glassmorphism Effects**: Subtle background blurs on navigation bars and floating cards.
3.  **Modern Micro-animations**: Hover states with slight scaling and shadow transitions for an interactive feel.
4.  **Sticky Minimalist Navigation**: A clean, shadow-based sticky header that reveals or hides based on scroll direction.

## 📱 User Journey Map (The Modern Explorer)
1.  **Landing**: Captured by a high-definition hero visual and a clean search/call-to-action.
2.  **Discovery**: Seamlessly scrolls through curated destination cards with prominent imagery and clear pricing.
3.  **Detail**: Views immersive content with minimal distractions; clean booking forms and interactive galleries.
4.  **Conversion**: Frictionless booking flow with clear, modern progress indicators and high-contrast buttons.

## 📐 Responsiveness & Mobile Standards
1.  **Mobile-First Grid**: Use a flexible 12-column grid that collapses to 4 columns on mobile.
2.  **Adaptive Imagery**: Hero images must use `object-fit: cover` and provide optimized versions for mobile.
3.  **Touch Targets**: Buttons and interactive elements must have a minimum height of 44px for mobile accessibility.
4.  **Fluid Typography**: Use `clamp()` or relative units (rem/vw) to ensure headlines scale gracefully across screen sizes.

## 🖼️ SEO & OpenGraph Visuals
1. **Dynamic Sharing Context**: Every page should have a high-quality preview image (`og:image`). The Global setting provides a branded fallback, but specific attractions and articles must prioritize their own cover images.
2. **Aspect Ratios**: Ensure 1200x630 resolution for all OpenGraph share images. Add placeholder/fallback graphics that incorporate the village's identity.
3. **Alt Text Enforcement**: Ensure images rendered natively via `next/image` have meaningful `alt` text mapped directly from the Strapi media library captions or alternative text fields.
