# TANVO Homepage Content & UI Specification

This document serves as the absolute visual and code structure map for the **TANVO Homepage** (`Home.tsx`). It outlines every section, its corresponding React component filename, its design aesthetics, content details, and interactive capabilities.

---

## Global Design Guidelines
*   **Palette**: Calm Luxury & Heritage Handloom
    *   *Primary background*: Warm Ivory (`#F9F5EE`)
    *   *Alternative light background*: Clean White (`#FFFFFF`)
    *   *Contrast / Dark Accent*: Deep Charcoal / Ink (`#1C1612`)
    *   *Earthy / Heritage Accent*: Terracotta (`#B5502B`)
    *   *Luxury accent*: Soft Muted Gold (`#C9A84C`)
*   **Typography**:
    *   *Display Serif*: Playfair Display / Cormorant Garamond (Used for headlines)
    *   *System Sans*: DM Sans / Montserrat / Helvetica Neue (Used for labels, CTA text, and metadata)
    *   *Body*: Raleway (Clean, highly legible)
*   **Textile Grid Overlay**: A subtle grid pattern representing the warp-and-weft texture of handloom fabrics lies softly over the entire layout at `0.02` to `0.05` opacity.

---

## Section Map & Design Specifications

### 1. Hero Section
*   **Filename**: `frontend/pages/sections/HeroSection.tsx`
*   **UI/Design Description**:
    *   Full-viewport, high-impact immersive layout.
    *   Uses a macro close-up of a luxurious raw silk saree weave (`/luxury_saree_macro.png`) as a background image.
    *   Features a dark gradient overlay that fades into deep black at the bottom to secure text readability.
    *   Top navigation overlays displaying the "Tanvo" wordmark in a thin serif layout.
*   **Content**: 
    *   Main Headline: *"The silent poetry of pure silk"* (set in a light serif with custom gold italics).
    *   Supporting description emphasizing authentic handlooms.
*   **Interactions**:
    *   Gold-underlined text link "Discover the Collection" with smooth hover color changes.
    *   Dynamic scroll indicator on the bottom right.

---

### 2. Atmospheric Video Loop Banner
*   **Filename**: `frontend/pages/sections/VideoBanner.tsx`
*   **UI/Design Description**:
    *   Full-width, low-height video strip (`40vh` height, capped between `300px` and `450px`).
    *   Designed as a visual breathing space/pacing break directly after the high-energy hero section.
    *   Features a slow-motion video close-up of a shuttle moving through a loom (`/saree quality 2.mp4`).
*   **Content**: No text or overlays; purely ambient motion loop.

---

### 3. Bestsellers Product Grid
*   **Filename**: `frontend/pages/sections/ProductsGrid.tsx`
*   **UI/Design Description**:
    *   Set against the unified Warm Ivory (`#F9F5EE`) background.
    *   Header utilizes asymmetric spacing: Left-aligned display title and right-aligned "All Bestsellers" text link with a thin underline.
    *   Flexible product card system layout (2-columns on mobile, scaling up to 4-columns on desktop).
*   **Content**:
    *   Label: "Most Loved"
    *   Title: "Bestsellers"
    *   Dynamic listing of the top 4 products marked with `isBestSeller`.
*   **Interactions**: Hover scale-up and subtle drop shadow elevation on individual product cards.

---

### 4. Handwoven Heritage Story
*   **Filename**: `frontend/pages/sections/HandwovenHeritage.tsx`
*   **UI/Design Description**:
    *   Side-by-side editorial row layout.
    *   Desktop height is locked strictly to `580px`–`640px` to eliminate empty vertical space and keep rhythm.
    *   Mobile layout stacks vertically and caps the image width at `320px` to prevent layout breaking.
*   **Content**:
    *   Main statement: *"Every Saree is Handwoven, Not Manufactured..."*
    *   Artisan certification checklists (e.g. 100% Handmade by Master Weavers, GI Certified Authentic) accompanied by custom icon badges.
*   **Interactions**: Clean "Explore the Collections" button.

---

### 5. Curated Selection Grid
*   **Filename**: `frontend/pages/sections/ProductsGrid.tsx`
*   **UI/Design Description**:
    *   Clean White (`#FFFFFF`) background.
    *   Displays 4 handpicked sarees immediately available in the catalog.
*   **Content**:
    *   Label: "Direct from the Loom"
    *   Title: "Curated Selection"
    *   CTA Link: "Explore All Sarees" (Black underline)

---

### 6. Infinitely Moving Marquee Ticker
*   **Filename**: `frontend/pages/sections/MarqueeTicker.tsx`
*   **UI/Design Description**:
    *   Full-bleed horizontal bar in solid gold background (`#C9A84C`).
    *   Infinite loop CSS translation animation.
*   **Content**: 
    *   Text: `✦ Handwoven Sarees ✦ GI Tagged Heritage ✦ Direct from Master Weavers ✦ Sambalpuri · Bomkai · Ikat` in a bold, small (9px), high-letterspaced uppercase Montserrat font.

---

### 7. Brand Metrics & Pillars
*   **Filename**: `frontend/pages/sections/PillarsSection.tsx`
*   **UI/Design Description**:
    *   Rich deep charcoal background (`#1C1612`).
    *   4-column grid boxed within thin gold borders (`rgba(237,227,208,0.1)`).
*   **Content**:
    *   **7+ Generations** of master craft
    *   **15 Days** per single saree
    *   **200+ Weavers** in our collective
    *   **100% Authentic** GI certified
*   **Typography**: Terracotta values (`#B5502B`), ivory labels, and lightweight gray subheadings.

---

### 8. New Arrivals Grid
*   **Filename**: `frontend/pages/sections/ProductsGrid.tsx`
*   **UI/Design Description**:
    *   Transparent background.
    *   Responsive 4-column display showcasing the newest 4 catalog additions.
*   **Content**:
    *   Label: "Just Arrived"
    *   Title: "New Arrivals"
    *   CTA Link: "View Newest Drops"

---

### 9. Interactive Ikat Deep-Dive
*   **Filename**: `frontend/pages/sections/IkatDeepDive.tsx`
*   **UI/Design Description**:
    *   Dark, heritage-focused split panel (`#1C1612` background).
    *   *Left side*: Detail image of an Ikat weave with floating numerical hotspots.
    *   *Right side*: High-end vertical typography detailing double-Ikat techniques and historical references.
*   **Interactions**:
    *   Hovering over hotspot circles (`1` and `2`) pops up elegant detail boxes describing the tie-and-dye warp/weft preparation.
    *   "Learn More" arrow link.

---

### 10. Ambient Editorial Video Banner
*   **Filename**: `frontend/pages/sections/EditorialBanner.tsx`
*   **UI/Design Description**:
    *   Cinematic video background (`/EditorialBanner.mp4`) with a left-oriented dark gradient overlay for optimal text contrast.
    *   Refined and clean typography overlay.
*   **Content**:
    *   Headline: *"See our collection"* in a large display serif font.
    *   "Explore Collection" button with an arrow icon.
    *   Vertical side banner text: *"100% HANDWOVEN HERITAGE"* anchored next to a gold separator line.

---

### 11. Weave Traditions Category Grid
*   **Filename**: `frontend/pages/sections/CategoryGrid.tsx`
*   **UI/Design Description**:
    *   Warm Ivory (`#F9F5EE`) background.
    *   Custom layout: features a broad wide banner at the top for modern "Fancy" collections, followed by an asymmetric 3-column traditional block grid.
*   **Content**:
    *   Navigates direct into categories: Sambalpuri, Bomkai, Ikat, Silk, Cotton, Fancy, Khandua.
*   **Interactions**: Hovering over any card smoothly scales the background image, slides open a terracotta top border line, and reveals an arrow link.

---

### 12. "Why Choose Us" Trust Grid
*   **Filename**: `frontend/pages/sections/WhyChooseUs.tsx`
*   **UI/Design Description**:
    *   Clean white background.
    *   4-column cards framed with light gold borders.
*   **Content**:
    *   Features: Direct from Weavers, 30% Cheaper than Retail, GI Certified Fabrics, Authentic Handloom.
*   **Interactions**: Cards lift up by `10px` on hover and gain a soft drop shadow.

---

### 13. Men's Traditional Attire Campaign Banner
*   **Filename**: `frontend/pages/sections/MensTraditionalAttireBanner.tsx`
*   **UI/Design Description**:
    *   Asymmetrical horizontal container set on a clean Warm Ivory (`#F9F5EE`) background.
    *   Left side holds the campaign photo (`/new_arrivals.png`) over a transparent background frame.
    *   Right side holds the bold, high-contrast headline.
*   **Content**:
    *   Headline: `#NewArrivals`
    *   CTA Button: "Shop Now" styled as a solid charcoal black block (`#1C1612`) with white text.
*   **Interactions**: Button background changes to gray (`#333333`) on hover; image zooms slightly when hovering anywhere on the banner.

---

### 14. Trust Signals Media Showcase
*   **Filename**: `frontend/pages/sections/TrustSignals.tsx`
*   **UI/Design Description**:
    *   Deep warm charcoal background (`#0f0a06`).
    *   3-column card grid containing multimedia content.
*   **Content**:
    *   *Loom Process Card*: Loops `/saree quality 2.mp4`.
    *   *Customer Stories Card*: Shows customer photo mocks.
    *   *Premium Packaging Card*: Illustrates sustainable boxed wrapping.
*   **Interactions**:
    *   Hovering over the Loom Process card starts auto-playing the video.
    *   Clicking on cards reveals custom play/pause overlays.
    *   Features a bottom row of four micro-verification badges (Authenticity, Free Shipping, 24/7 Support, Handcrafted with Love).

---

### 15. Journal Hint
*   **Filename**: `frontend/pages/sections/JournalHint.tsx`
*   **UI/Design Description**:
    *   Clean white backdrop with centered, minimalist layout.
*   **Content**:
    *   Headline: *"Recommended Reading: The Real Stories Behind Our Brand"*
    *   CTA Link: "Explore the Chronicles"

---

### 16. Draped For Every Moment (The Art of Occasion)
*   **Filename**: `frontend/pages/sections/DrapedEveryMoment.tsx`
*   **UI/Design Description**:
    *   Asymmetric, staggered vertical cards with 9:16 aspect ratios.
*   **Content**:
    *   Occasions: Wedding Elegance (Bridal Collection), Golden Beginnings (Celebration), Effortless Grace (Daily Heritage), A Gift Of Tradition (Thoughtful Gifts).
*   **Interactions**: Hovering on a card zooms the image, fades in the detailed description, and reveals the occasion details.

---

### 17. Instagram Social Grid
*   **Filename**: `frontend/pages/sections/InstagramSection.tsx`
*   **UI/Design Description**:
    *   Full-width 6-column image strip with dark overlays.
*   **Content**:
    *   Showcases social photos tagged with `#Tanvo`.
*   **Interactions**: Hovering reveals a transparent gold tint overlay and the Instagram icon.

---

### 18. Premium WhatsApp Commerce Section
*   **Filename**: `frontend/components/WhatsAppOrder.tsx`
*   **UI/Design Description**:
    *   Centered, spacious single-column layouts over a premium soft red-cream backdrop.
    *   Uses a classic highlight badge and a premium dark-gradient pill background containing the WhatsApp logo.
*   **Content**:
    *   Heading: *"Connect with Our Master Weavers"*
    *   Value points: Direct weaver chat, customized recommendations, and bridal styling assistance.
*   **Interactions**:
    *   "Chat with Artisan" opens a direct, pre-filled WhatsApp conversation.
    *   Bottom row outlines trust stats (e.g. 20 min average response time, 7th Gen weaver families).

---

### 19. Trust Bar
*   **Filename**: `frontend/pages/sections/TrustBar.tsx`
*   **UI/Design Description**:
    *   Horizontal gold strip right above the site footer divided into 4 columns by fine borders.
*   **Content**:
    *   Brief icons and guarantees: 100% Authentic, Global Shipping, Premium Fabrics, 7-Day Returns.
