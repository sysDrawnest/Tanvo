# TANVO Homepage Content & UI Specification

This document serves as the absolute visual and code structure map for the **TANVO Homepage** (`Home.tsx`). It outlines every section, its corresponding React component filename, its design aesthetics, content details, and interactive capabilities in their exact render order.

---

## Global Design Guidelines

*   **Palette**: Calm Luxury & Heritage Handloom
    *   *Primary background*: Warm Ivory (`#F9F5EE`)
    *   *Alternative light background*: Clean White (`#FFFFFF`)
    *   *Alternative dark/ink background*: Deep Obsidian/Charcoal (`#0D0B0A` / `#1C1612`)
    *   *Earthy/Heritage accent*: Terracotta (`#B5502B` / `#780000` / `#C1121F`)
    *   *Luxury accent*: Soft Muted Gold (`#C9A84C`)
*   **Typography**:
    *   *Display Serif*: Playfair Display / Cormorant Garamond (Used for headlines)
    *   *System Sans*: DM Sans / Montserrat / Helvetica Neue (Used for labels, CTA text, and metadata)
    *   *Body*: Raleway (Clean, highly legible)
*   **Textile Grid Overlay**: A subtle grid pattern representing the warp-and-weft texture of handloom fabrics lies softly over the entire layout at `0.02` to `0.05` opacity.

---

## Active Section Map & Design Specifications (Render Order)

### 1. Hero Section
*   **Filename**: `frontend/pages/sections/HeroSection.tsx`
*   **UI/Design Description**:
    *   Full-viewport, high-impact immersive layout.
    *   Features an auto-slideshow image carousel with responsive images mapped for PC and Mobile layouts.
    *   The slide sequence is configured as:
        - Slide 1: Primary luxury banner image (current default).
        - Slide 2: `A_cinematic_luxury_202604051034.png` (PC) / `Whisk_ec4d14e37ea16d380e848126b16a158ddr.png` (Mobile).
    *   Images are carefully positioned to prevent cropping and header/navbar overlaps.
    *   Left-side top "Tanvo" brand wordmark overlay has been removed to preserve spacing.
    *   The "Buy 1 Get 1" announcement banner at the top of the navbar is temporarily commented out.
    *   Includes a "Join the Tanvo Circle" registration modal with a 4-second auto-trigger timer.
*   **Content**: 
    *   Main Headline: *"The silent poetry of pure silk"* (set in a light serif with custom gold italics).
    *   Supporting description emphasizing authentic handlooms.
*   **Interactions**:
    *   Gold-underlined text link "Discover the Collection" with smooth hover color changes.
    *   Dynamic scroll indicator on the bottom right.

---

### 2. Bestsellers Product Grid
*   **Filename**: `frontend/pages/sections/ProductsGrid.tsx`
*   **UI/Design Description**:
    *   Set against the unified Warm Ivory (`#F9F5EE`) background.
    *   Header utilizes asymmetric spacing: Left-aligned display title and right-aligned "All Bestsellers" text link with a thin underline.
    *   Flexible product card system layout (2-columns on mobile, scaling up to 4-columns on desktop).
*   **Content**:
    *   Label: "Most Loved"
    *   Title: "Bestsellers"
    *   Dynamic listing of the top 4 products marked with `isBestSeller`.
    *   Redirection link: `/shop?isBestSeller=true`
*   **Interactions**: Hover scale-up and subtle drop shadow elevation on individual product cards.

---

### 3. Atmospheric Video Loop Banner
*   **Filename**: `frontend/pages/sections/VideoBanner.tsx`
*   **UI/Design Description**:
    *   Full-width, immersive video section with a cinematic `16:9` aspect ratio.
    *   Provides a visual breathing space/pacing break directly after the Bestsellers grid.
    *   Features a slow-motion video close-up of a shuttle moving through a loom (`/Woman_wearing_silk_saree_202606221155.mp4`).
*   **Content**: 
    *   Headline: *"Timeless Heritage. Modern Elegance."* overlay in white and gold text.
    *   Play/Pause control button.

---

### 4. Infinitely Moving Marquee Ticker
*   **Filename**: `frontend/pages/sections/MarqueeTicker.tsx`
*   **UI/Design Description**:
    *   Full-bleed horizontal bar in solid gold background (`#C9A84C`).
    *   Infinite loop CSS translation animation.
*   **Content**: 
    *   Text: `✦ Handwoven Sarees ✦ GI Tagged Heritage ✦ Direct from Master Weavers ✦ Sambalpuri · Bomkai · Ikat` in a bold, small (9px), high-letterspaced uppercase Montserrat font.

---

### 5. Brand Metrics & Pillars
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

### 6. New Arrivals Grid
*   **Filename**: `frontend/pages/sections/ProductsGrid.tsx`
*   **UI/Design Description**:
    *   Transparent background.
    *   Responsive 4-column display showcasing the newest 4 catalog additions.
*   **Content**:
    *   Label: "Just Arrived"
    *   Title: "New Arrivals"
    *   CTA Link: "View Newest Drops" (redirects to `/shop?sort=-createdAt`)

---

### 7. Weave Traditions Category Grid
*   **Filename**: `frontend/pages/sections/CategoryGrid.tsx`
*   **UI/Design Description**:
    *   Warm Ivory (`#F9F5EE`) background.
    *   Custom layout: features a broad wide banner at the top for modern "Fancy" collections, followed by an asymmetric 3-column traditional block grid.
*   **Content**:
    *   Navigates direct into categories: Sambalpuri, Bomkai, Ikat, Silk, Cotton, Fancy, Khandua.
*   **Interactions**: Hovering over any card smoothly scales the background image, slides open a terracotta top border line, and reveals an arrow link.

---

### 8. Handwoven Heritage Story
*   **Filename**: `frontend/pages/sections/HandwovenHeritage.tsx`
*   **UI/Design Description**:
    *   Side-by-side editorial row layout.
    *   Desktop height is locked strictly to `580px`–`640px` to eliminate empty vertical space and keep rhythm.
    *   Mobile layout stacks vertically and caps the image width at `320px` to prevent layout breaking.
    *   Includes a bottom "Process Strip" outlining the steps of production.
*   **Content**:
    *   Main statement: *"Every Saree is Handwoven, Not Manufactured"*
    *   Artisan certification checklists (100% Handmade by Master Weavers, GI Certified Authentic Handloom, Supports 7th Gen Artisans, No Mass Production) accompanied by custom icon badges.
    *   Process Steps:
        1. Thread Dyeing (Organic pigments & sun drying)
        2. Handloom Setup (Drafting the warp patterns)
        3. Weaving (Intricate weft insertion)
        4. Finished Saree (A masterpiece is ready)
*   **Interactions**: Clean "Explore Handwoven Collection" button.

---

### 9. Curated Selection Grid
*   **Filename**: `frontend/pages/sections/ProductsGrid.tsx`
*   **UI/Design Description**:
    *   Immersive dark Obsidian/Charcoal backdrop (`#0D0B0A` background) with `inverse={true}` styling.
    *   Displays 4 handpicked sarees from the catalog with high contrast.
*   **Content**:
    *   Label: "Direct from the Loom"
    *   Title: "Curated Selection"
    *   CTA Link: "Explore All Sarees" (White underline)

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

### 11. Men's Traditional Attire Campaign Banner
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

### 12. Modern Muse
*   **Filename**: `frontend/pages/sections/ModernMuse.tsx`
*   **UI/Design Description**:
    *   Full-width edge-to-edge section (or container-bound on large screens) set on a clean Warm Ivory (`#F9F5EE`) background.
    *   Features a large-scale, cinematic fashion editorial image (`/IMG202606240805.jpeg`) with a dark gradient overlay.
    *   Content overlay positioned at the bottom-left.
*   **Content**:
    *   Brand Label: *"TANVO PRESENTS"*
    *   Headline: *"THE MODERN MUSE"*
    *   Description: *"Where heritage weaving meets contemporary elegance. A curated dialogue between ancestral craft and modern silhouette."*
    *   Floating detail: *"HERITAGE HOUSE"* (vertical text on the right)
*   **Interactions**: Framer Motion scroll-reveal animations for text fading up and image scaling from 1.1 to 1.0 smoothly. CTA button features a left-to-right dark hover sweep.

---

### 13. Draped For Every Moment (The Art of Occasion)
*   **Filename**: `frontend/pages/sections/DrapedEveryMoment.tsx`
*   **UI/Design Description**:
    *   Asymmetric, staggered vertical cards with 9:16 aspect ratios.
*   **Content**:
    *   Occasions and specific asset images:
        - Wedding: `/The Art of Occasion Wedding .jpeg`
        - Ring Ceremony: `/The Art of Occasion Ring Ceremony .jpeg`
        - Celebration / Daily Use: `/The Art of Occasion Daily Use .jpeg`
        - Effortless Grace: `/The Art of Occasion Efferlatly garce .jpeg`
*   **Interactions**: 
    - Hovering on a card zooms the image, fades in the detailed description, and reveals the occasion details.
    - Clicking on a card navigates to `/shop` with the respective `occasion` parameter (e.g. `?occasion=wedding`, `?occasion=ring-ceremony`, `?occasion=celebration`, `?occasion=effortless-grace`) to trigger dynamic shop filtering.

---

### 14. "Why Choose Us" Trust Grid
*   **Filename**: `frontend/pages/sections/WhyChooseUs.tsx`
*   **UI/Design Description**:
    *   Clean white background.
    *   4-column cards framed with light gold borders.
*   **Content**:
    *   Features: Direct from Weavers, 30% Cheaper than Retail, GI Certified Fabrics, Authentic Handloom.
*   **Interactions**: Cards lift up by `10px` on hover and gain a soft drop shadow.

---

### 15. Trust Signals Media Showcase
*   **Filename**: `frontend/pages/sections/TrustSignals.tsx`
*   **UI/Design Description**:
    *   Solid ink backdrop background (`#0D0B0A`).
    *   3-column card grid containing multimedia content with subtle `2px` rounded borders.
*   **Content**:
    *   Headline: *"The Story Behind Every Saree"* (Subheading: *"Worn Across Generations"*)
    *   Teaser Panels:
        1. *The Loom Journey* (video loop of `/saree quality 2.mp4` showing raw dye processing)
        2. *The Weaver Stories* (meet the artisan families)
        3. *Authenticity Promise* (verifiable credentials and certification checks)
*   **Interactions**:
    *   Hovering over cards scales background assets and launches the video loops.
    *   Play button replaced with a highly editorial `WATCH STORY` text action.
    *   Features a bottom row of four micro-verification badges (Authenticity Guaranteed, Free Shipping Worldwide, 24/7 Customer Support, Handcrafted with Love).

---

### 16. Brand Story Section
*   **Filename**: `frontend/pages/sections/BrandStorySection.tsx`
*   **UI/Design Description**:
    *   Full-width editorial segment with a low-opacity autoplay video background (`/VID02606251815.mp4`).
    *   Left-oriented dark gradient overlay for optimal readability.
*   **Content**:
    *   Label: *"THE TANVO STORY"*
    *   Headline: *"The Real Stories Behind Our Brand"*
    *   Description: *"Every saree carries the hands, heritage, and patience of the artisans who create it."*
    *   CTA Button: "Discover Our Heritage" linking to `/story`.
*   **Interactions**: Button border and background transition to deep red (`#780000`) on hover.

---

### 17. Premium WhatsApp Commerce Section
*   **Filename**: `frontend/components/WhatsAppOrder.tsx`
*   **UI/Design Description**:
    *   Immersive two-column layout with a decorative corner photo panel on the left and a rich typography panel on the right.
*   **Content**:
    *   Heading: *"Buy Directly on WhatsApp"*
    *   Value points: Perfect for a simple, personal experience. Buy by sending a screenshot, sharing delivery address, and confirming on chat/call.
*   **Interactions**:
    *   "Buy on WhatsApp" button opens a direct, pre-filled WhatsApp ordering conversation.
    *   Bottom labels guide non-technical customers through a simple 3-step order flow: "1. Send Screenshot", "2. Share Address", "3. Buy on Call or Chat".

---

### 18. Instagram Social Grid
*   **Filename**: `frontend/pages/sections/InstagramSection.tsx`
*   **UI/Design Description**:
    *   Full-width 6-column image strip with dark overlays.
*   **Content**:
    *   Showcases social photos tagged with `#Tanvo`.
*   **Interactions**: Hovering reveals a transparent gold tint overlay and the Instagram icon.

---

### 19. Trust Bar
*   **Filename**: `frontend/pages/sections/TrustBar.tsx`
*   **UI/Design Description**:
    *   Horizontal gold strip right above the site footer divided into 4 columns by fine borders.
*   **Content**:
    *   Brief icons and guarantees: 100% Authentic, Global Shipping, Premium Fabrics, 7-Day Returns.

---

## Draft & Inactive Sections (Not Rendered in Home.tsx)

### A. Interactive Ikat Deep-Dive
*   **Filename**: `frontend/pages/sections/IkatDeepDive.tsx`
*   **Status**: Inactive (Completely un-imported and removed from `Home.tsx`)
*   **UI/Design Description**:
    *   Dark, heritage-focused split panel (`#1C1612` background).
    *   *Left side*: Detail image of an Ikat weave with floating numerical hotspots.
    *   *Right side*: High-end vertical typography detailing double-Ikat techniques and historical references.
*   **Interactions**:
    *   Hovering over hotspot circles (`1` and `2`) pops up elegant detail boxes describing the tie-and-dye warp/weft preparation.
    *   "Learn More" arrow link.

---

### B. Journal Hint (The TANVO Chronicles)
*   **Filename**: `frontend/pages/sections/JournalHint.tsx`
*   **Status**: Inactive (Not imported in `Home.tsx`)
*   **UI/Design Description**:
    *   Magazine-inspired split layout on a solid ink backdrop (`#0D0B0A`).
    *   *Left Column*: Immersive masthead block showing the issue tags, title, sub-summary, and CTA button.
    *   *Right Column*: Teaser index showcasing three active article rows separated by thin gold rules.
    *   Features a delicate gold crosshatch textile grid overlay (`#C9A84C`) at `0.04` opacity.
*   **Content**:
    *   Headline: *"The real stories behind our brand"*
    *   Teasers:
        1. *Craft*: "The mathematics of the loom" (Sambalpuri resist pattern geometry)
        2. *Heritage*: "Seven hundred years of silk" (historical court lineages)
        3. *Process*: "Why a single saree takes three weeks" (time investment breakdowns)
*   **Interactions**:
    *   Uses native `IntersectionObserver` to trigger clean scroll entry animations: left column fades up, right column articles slide in with staggered delays (400ms, 520ms, 640ms).
    *   Hovering on any article row triggers a sliding red (`#780000`) arrow button that glides in smoothly from the left.

---

### C. Heritage Meets Modern
*   **Filename**: `frontend/pages/sections/HeritageModern.tsx`
*   **Status**: Inactive (Not imported in `Home.tsx`)
*   **UI/Design Description**:
    *   Two-column philosophy grid.
    *   *Left side*: Grayscale-to-color transition image (`Heritage Meets Modern.png`) with an absolute positioned banner on the bottom-right.
    *   *Right side*: Text explaining the brand vision, featuring a Cormorant Garamond serif header.
*   **Content**:
    *   Title: "Heritage Meets Modern"
    *   Quote: *"We believe that tradition is not about preserving ashes, but about keeping the fire of craft alive in modern silhouettes."*
    *   CTA Button: "Read Our Vision"

---

### D. Six Ancient Traditions
*   **Filename**: `frontend/pages/sections/SixTraditions.tsx`
*   **Status**: Inactive (Not imported in `Home.tsx`)
*   **UI/Design Description**:
    *   Curated legacy overview on a Warm Ivory (`var(--ivory)`) background with a textile mesh grain overlay.
    *   Displays a structured grid of six traditions with large numbered indexes (`01` through `06`).
*   **Content**:
    *   Covers: Sambalpuri Ikat, Bomkai Silk, Khandua Patta, Kotpad Weave, Dongria Kondh, and Berhampuri Patta.
*   **Interactions**: Smooth staggered scroll-reveals using `IntersectionObserver`. Hovering over numbers highlights them in terracotta.
