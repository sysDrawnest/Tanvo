# TANVO Homepage UI Specification & Layout Document

This document provides a comprehensive structural and visual breakdown of the current **TANVO Homepage** (`Home.tsx`). The homepage has been designed to project a premium, heritage-driven digital experience combining the elements of Aesop-inspired quiet luxury, Hermès-style craftsmanship storytelling, and modern fashion editorial design.

---

## Global Design System & Token Integration

- **Primary Background**: Warm Ivory (`#F9F5EE` / `var(--cream)` / `var(--ivory)`)
- **Contrast / Dark Accent**: Deep Charcoal / Ink (`#1C1612` / `var(--ink)`)
- **Heritage / Earthy Accent**: Terracotta / Madder Red (`#B5502B` / `var(--terra)`)
- **Luxury Accents**: Soft Gold (`#C9A84C` / `var(--gold)`)
- **Typography**:
  - _Display / Headers_: Playfair Display / Cormorant Garamond (refined serifs)
  - _System / UI_: DM Sans / Montserrat / Helvetica Neue (clean sans-serifs)
  - _Body_: Raleway / sans-serif (legible, high-quality)
- **Texture Overlays**: A subtle fixed vector grid pattern simulating textile warp and weft lines spans across the page with low opacity (`0.02` to `0.5`).

---

## Complete Section-by-Section Breakdown

### 1. Hero Section (`HeroSection.tsx`)

- **Purpose**: Immediate premium branding & sensory introduction.
- **Layout**: Full-bleed responsive header (minimum 100vh height).
- **Visual Assets**:
  - Macro image background (`/luxury_saree_macro.png`).
  - Dark gradient overlay (`linear-gradient(180deg, rgba(10,10,10,0.1) 0%, rgba(10,10,10,0.85) 100%)`).
- **Key Contents**:
  - Top Bar: Minimalist uppercase "Tanvo" (Left) and "Fine Silks" (Right).
  - Headline: _"The silent poetry of pure silk"_ set in a lightweight display serif font with gold italics.
  - Support copy explaining fine silk and artisan values.
- **Interactions**:
  - Gold-underlined link: _"Discover the Collection"_, transitions to gold text color on hover.
  - Minimalist scroll line indicator on bottom right.

---

### 2. Bestsellers Grid (`ProductsGrid.tsx`)

- **Purpose**: Display top-performing heritage products on a soft, warm background.
- **Background**: Soft Warm Pink/Red (`#F5E5E5`).
- **Layout**: Left-aligned headline block paired with a right-aligned "All Bestsellers" collection CTA. The products are displayed in a responsive grid (`grid-cols-2` on mobile, scaling up to `lg:grid-cols-4` on desktop).
- **Key Contents**:
  - Section label eyebrow: "Most Loved".
  - Headline: "Bestsellers" (Cinzel/serif display style).
  - 4 Product Cards (`ProductCard.tsx`).
- **Interactions**: Hover scaling and elevation on individual product cards; border color fade-in on the "All Bestsellers" link.

---

### 3. Handwoven Heritage Section (`HandwovenHeritage.tsx`)

- **Purpose**: Reassure buyer trust by highlighting the pure handmade nature of the brand.
- **Background**: Warm Ivory (`#F9F5EE`).
- **Layout**: Side-by-side flex/grid block.
  - _Desktop height_: Height-constrained to 580px–640px to prevent excessive vertical spacing.
  - _Mobile behavior_: Stacked vertically, image constrained to 320px width to avoid viewport overflow.
- **Key Contents**:
  - Visual banner highlighting handloom artisan tools or weaves.
  - Artisan verification checklist with customized checklist checkmark icons.
  - Hero copy: _"Every Saree is Handwoven, Not Manufactured — Crafted by skilled artisans across Odisha, each Tanvo piece carries generations of tradition."_
- **Interactions**: Large call-to-action button "Explore the Collections".

---

### 4. Curated Selection Grid (`ProductsGrid.tsx`)

- **Purpose**: Primary storefront landing catalog grid.
- **Background**: Clean White (`#FFFFFF`).
- **Layout**: Responsive 4-column product showcase containing the top 8 main items.
- **Key Contents**:
  - Label: "Direct from the Loom".
  - Headline: "Curated _Selection_".
  - 8 Product Cards.
  - Link: "Explore All Sarees" with a black underline.

---

### 5. Marquee Ticker (`MarqueeTicker.tsx`)

- **Purpose**: Infinite horizontal typographic ribbon communicating primary brand pillars.
- **Background**: Solid Gold (`var(--gold)`).
- **Layout**: Full-width scrolling text container.
- **Key Contents**:
  - Repeating text ticker: `✦ Handwoven Sarees ✦ GI Tagged Heritage ✦ Direct from Master Weavers ✦ Sambalpuri · Bomkai · Ikat`.
- **Styling**: 9px bold Montserrat uppercase font with heavy letter-spacing (`0.2em`).

---

### 6. Brand Pillars Section (`PillarsSection.tsx`)

- **Purpose**: Infographic breakdown of the brand's heritage metrics.
- **Background**: Deep Charcoal/Ink (`var(--ink)`).
- **Layout**: Responsive grid (2-column on mobile, 4-column on desktop) framed with a subtle gold border (`rgba(237,227,208,0.1)`).
- **Key Contents**:
  - **7+ Generations** of master craft
  - **15 Days** per single saree
  - **200+ Weavers** in our collective
  - **100% Authentic** GI certified
- **Typography**: Terracotta values (`var(--terra)`), Cinzel labels in ivory, and Raleway sub-captions.

---

### 7. New Arrivals Grid (`ProductsGrid.tsx`)

- **Purpose**: Highlight the latest drops directly from the loom.
- **Background**: Transparent.
- **Layout**: Responsive 4-column grid.
- **Key Contents**:
  - Label: "Just Arrived".
  - Headline: "New _Arrivals_".
  - 4 Product Cards.
  - Link: "View Newest Drops".

---

### 8. Ikat Deep Dive (`IkatDeepDive.tsx`)

- **Purpose**: Interactive education on the complex double tie-and-dye weaving technique.
- **Background**: Ink Black (`var(--ink)`).
- **Layout**: Two-column vertical split (Media visual left, story typography right).
- **Key Contents**:
  - Left Column: Detailed visual of Ikat weave layout (`/Ikat Detail.png`) containing interactive numeric hotspots.
    - _Hotspot 1_: Renders a floating tooltip box describing _Double Ikat_ tie-and-dye warp/weft complexity on hover.
    - _Hotspot 2_: Highlights secondary weave details.
  - Right Column: Typography header: _"Every Thread Tells a Sacred Story"_, and historical context detailing Lord Jagannath rituals & Konark temple motifs.
- **Interactions**: Interactive hotspot pulses and hover states; CTA button "Learn More".

---

### 9. Editorial Banner (`EditorialBanner.tsx`)

- **Purpose**: Cinematic cinematic break displaying raw action and craftsmanship.
- **Layout**: Full-width container (85vh height, minimum 600px).
- **Visual Assets**:
  - Background loop video (`/EditorialBanner.mp4`).
  - Subtle left-weighted linear overlay.
- **Key Contents**:
  - Headline: _"A Legacy of Pure Quality"_.
  - Body text highlighting pure natural fibers and time-intensive production.
  - Side-aligned vertical text badge: _"100% HANDWOVEN HERITAGE"_.
- **Interactions**: Gold CTA button "Explore Collection" + border-underlined text link "Our Craftsmanship".

---

### 10. Weave Traditions Category Grid (`CategoryGrid.tsx`)

- **Purpose**: Quick access to products filtered by regional weaving traditions.
- **Background**: Warm Ivory (`#F9F5EE`).
- **Layout**: Custom multi-aspect ratio grid.
  - _Desktop Layout_: Elegant top header banner dedicated to "Fancy" contemporary sarees, followed by a 3-column asymmetric layout showcasing the 6 main regional classes.
  - _Mobile/Tablet Layout_: Simplified grid card structure preventing complex layout breakages.
- **Key Categories**:
  - 01 Sambalpuri (GI Tagged)
  - 02 Bomkai (Temple Weave)
  - 03 Ikat (Tie & Dye)
  - 04 Silk (Pure Mulberry)
  - 05 Cotton (Handspun)
  - 06 Fancy (For Modern Girls)
  - 07 Khandua (Sacred Weave)
- **Interactions**: Image zooming on hover, top terracotta lines sliding open, and floating arrow icons fade-in.

---

### 11. Why Choose Us (`WhyChooseUs.tsx`)

- **Purpose**: Bulletproof trust builder highlighting customer benefits.
- **Background**: Off-White (`#FDFCF9`).
- **Layout**: 4-column card grid.
- **Key Contents**:
  - Direct from Weavers (bypass middle-men)
  - 30% Cheaper than Retail (direct sourcing pricing)
  - GI Certified Fabrics (certified authenticity tags)
  - Authentic Handloom (100% genuine Sambalpuri/Bomkai)
- **Interactions**: Interactive cards elevating by `-10px` on hover and adding warm drop shadows.

---

### 12. New Arrivals Campaign Banner (`NewArrivalsBanner.tsx`)

- **Purpose**: Promotional block highlighting seasonal collection releases.
- **Background**: Muted gray container block (`#D1D1D4`).
- **Layout**: Asymmetrical horizontal row.
  - _Left side_: Outlined campaign image (`/new_arrivals.png`) resting on a dark base.
  - _Right side_: High-contrast campaign title `#NewArrivals` and custom red CTA action block.
- **Key Contents**:
  - Hero CTA text: "Shop Now" styled on a bold vermilion red background (`#FF4D55`).

---

### 13. Dual Feature Section (`DualFeatureSection.tsx`)

- **Purpose**: Curated side-by-side spotlight on the two main catalog branches.
- **Background**: Ink Black (`var(--ink)`).
- **Layout**: Split 2-column layout. The right column ("New Arrivals") is offset vertically with top padding to create a modern layout flow.
- **Key Contents**:
  - Left Card: "Bestsellers Collection" showcasing the top-liked item.
  - Right Card: "New Arrivals Season" showcasing the newest catalog addition.

---

### 14. Trust Signals (`TrustSignals.tsx`)

- **Purpose**: Immersive customer verification and assurance.
- **Background**: Deep Warm Charcoal (`#0f0a06`).
- **Layout**: 3-column media card grid.
- **Key Contents**:
  - _Loom Process Card_: Integrates behind-the-scenes video documentation (`/saree quality 2.mp4`).
  - _Customer Stories Card_: Displays user photos and testimonials.
  - _Premium Packaging Card_: Highlights sustainable custom boxing.
- **Interactions**: Media hover plays (video card auto-plays video on card hover), and a horizontal row of badge metrics highlighting direct policies (Authenticity, Free Shipping, 24/7 Support).

---

### 15. Master Weaver Section (`MasterWeaverSection.tsx`)

- **Purpose**: Dedicated artist feature card for deep-heritage storytelling.
- **Background**: Deepest Charcoal (`#0D0B0A`).
- **Layout**: Asymmetric text vs image layout with massive transparent watermarked "LEGACY" backdrop typography.
- **Key Contents**:
  - Artisan profile copy explaining the mathematical dye ratio planning.
  - Portrait image overlay (`/sambalpuri_ikat.png`) surrounded by a floating gold border.
- **Interactions**: Overlaid interactive play button widget ("View the Process") to launch custom video logs.

---

### 16. Journal Hint (`JournalHint.tsx`)

- **Purpose**: Drive engagement to editorial blog content.
- **Background**: Clean White (`#FFFFFF`).
- **Layout**: Center-aligned typography container.
- **Key Contents**:
  - Headline: _"The Real Stories Behind Our Brand"_.
  - CTA Link: "Explore the Chronicles" button.

---

### 17. Learning Section (`LearningSection.tsx`)

- **Purpose**: Educational guide showing regional fabric variants.
- **Background**: Clean White (`#FFFFFF`).
- **Layout**: 4-column vertical card display with staggered columns.
- **Key Contents**:
  - Saree drape styling cards for: Banarasi Silk, Sambalpuri Ikat, Designer Fancy, and Pure Tussar Silk.

---

### 18. Instagram Section (`InstagramSection.tsx`)

- **Purpose**: Integrate social proof and brand lifestyle.
- **Background**: Ink Black (`var(--ink)`).
- **Layout**: 6-column full-width image feed.
- **Key Contents**:
  - Community images showing sarees worn in real-world contexts.
  - Follow button linking to the `@Tanvo` Instagram profile.

---

### 19. Trust Bar (`TrustBar.tsx`)

- **Purpose**: Final micro-commitment reminder before the site footer.
- **Background**: Gold (`var(--gold)`).
- **Layout**: Multi-column banner with thin borders separating the items.
- **Key Contents**:
  - _100% Authentic_ (Direct from Loom)
  - _Global Shipping_ (Fast & Insured)
  - _Premium Fabrics_ (Hand-picked)
  - _7-Day Returns_ (Hassle Free)
