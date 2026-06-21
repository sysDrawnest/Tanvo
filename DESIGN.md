---
name: TANVO
colors:
  background: '#F9F5EE'
  on-background: '#0D0B0A'
  surface: '#FFFFFF'
  on-surface: '#0D0B0A'
  primary: '#780000'
  on-primary: '#FFFFFF'
  primary-container: '#C1121F'
  on-primary-container: '#FFFFFF'
  secondary: '#C9A84C'
  on-secondary: '#0D0B0A'
  secondary-container: '#E8C97A'
  on-secondary-container: '#0D0B0A'
  tertiary: '#669BBC'
  on-tertiary: '#FFFFFF'
  outline: '#E2D9C8'
  outline-variant: '#D2C7B1'
typography:
  display-xl:
    fontFamily: Playfair Display
    fontSize: 72px
    fontWeight: '700'
    lineHeight: 110%
    letterSpacing: -0.02em
  headline-lg:
    fontFamily: Playfair Display
    fontSize: 40px
    fontWeight: '700'
    lineHeight: 120%
    letterSpacing: -0.01em
  headline-md:
    fontFamily: Playfair Display
    fontSize: 28px
    fontWeight: '700'
    lineHeight: 130%
    letterSpacing: 0em
  body-lg:
    fontFamily: Raleway
    fontSize: 18px
    fontWeight: '400'
    lineHeight: 160%
    letterSpacing: 0.01em
  body-md:
    fontFamily: Raleway
    fontSize: 15px
    fontWeight: '400'
    lineHeight: 165%
    letterSpacing: 0.01em
  label-sm:
    fontFamily: Inter
    fontSize: 11px
    fontWeight: '700'
    lineHeight: 120%
    letterSpacing: 0.2em
spacing:
  unit: 8px
  container-max: 1280px
  gutter: 24px
  margin-edge: 32px
  section-gap: 96px
---

# TANVO — Brand Design System & UI Instructions

This document defines the foundational design tokens, styling rules, and visual guidelines for the **TANVO** premium heritage e-commerce platform. Use these rules to generate and edit consistent, editorial-grade layouts.

---

## 1. Visual Theme & Brand Persona

*   **Brand Essence**: Premium Indian heritage, luxury handlooms (Odisha weaves), storytelling, and craftsmanship trust.
*   **Aesthetic Tone**: Warm, organic, editorial, artisanal, and refined.
*   **Background Mood**: Off-white, soft raw-cotton tones instead of stark cold white or dark gray.

---

## 2. Color Palette (Design Tokens)

The colors are selected to match traditional natural dyes (madder red, indigo, turmeric, and brass/gold thread work).

*   **Traditional Madder Red (`#780000`)**: Primary brand color, headers, primary buttons, logo.
*   **Vibrant Vermilion (`#C1121F`)**: CTA accents, secondary buttons, active highlights.
*   **Heritage Brass Gold (`#C9A84C`)**: Premium highlights, badges, borders, checkout items, buttons.
*   **Champagne Gold (`#E8C97A`)**: Soft gold hover gradients, light borders.
*   **Raw Cotton Background (`#F9F5EE`)**: Soft, warm background tint for the entire website.
*   **Mineral Charcoal (`#0D0B0A`)**: Text headings, deep labels, primary readability.
*   **Heritage Indigo (`#669BBC`)**: Accent blue-indigo for secondary tags, banners.
*   **Pristine White (`#FFFFFF`)**: Used only for component cards, dialogs, and panels to pop.

---

## 3. Typography

Elegant editorial serif headings paired with clean geometric body text.

*   **Primary Headings (`h1`, `h2`, `h3`, `h4`, `h5`, `h6`)**:
    *   **Font Family**: `'Playfair Display', serif`
    *   **Weights**: `700` (Bold)
    *   **Style**: Editorial, sophisticated, high-end luxury.
*   **Body & UI Text**:
    *   **Font Family**: `'Raleway', 'Inter', sans-serif`
    *   **Weights**: `400` (Regular), `500` (Medium), `700` (Bold)
    *   **Style**: Balanced spacing, highly readable, contemporary.
*   **Labels & Accents**:
    *   **Style**: Uppercase, tracked out (`tracking-widest` or `tracking-[0.2em]`), bold, small size (e.g., `text-[10px]` or `text-xs`).

---

## 4. Corner Radius & Shape Tokens

TANVO blends organic rounded styles with clean modern structures.

*   **Buttons (CTAs)**: `rounded-full` (Pill shapes feel tactile and soft).
*   **Product Cards**: `rounded-3xl` (Large, smooth, modern organic shape).
*   **Category Grids**: `rounded-2xl` (Medium roundness for visual rhythm).
*   **Input Fields & Badges**: `rounded-xl` (Clean, structured curves for forms).
*   **Modals & Drawers**: `rounded-2xl` or `rounded-t-3xl` for bottom sheets.

---

## 5. Shadows, Elevation, & Blurs

*   **Tac-Tile Shadows**:
    *   **Glow Shadow**: `0 10px 40px -10px rgba(120, 0, 0, 0.3)` (`shadow-glow`)
    *   **Elevation**: `shadow-lg` for cards, upgrading to `shadow-2xl` on hover with dynamic transition (`duration-500`).
*   **Glassmorphism**:
    *   **Navbar / Overlays**: `background: rgba(255, 255, 255, 0.95); backdrop-filter: blur(10px);`

---

## 6. Layout & UI Components

### A. Buttons
*   **Primary**: Gradient from `#780000` to `#C1121F` with white text, pill-shaped, uppercase, tracked-out label.
*   **Secondary**: `#780000` border, white background (or transparent), red text, pill-shaped.
*   **Accent/Gold**: `#C9A84C` base or text, champagne gradients on hover.

### B. Cards & Grids
*   **Product Card**: White background, `rounded-3xl`, light gray border, subtle shadow. Hover state transforms with a slight lift (`-translate-y-2`) and image zoom scale (`hover:scale-110` with `duration-500`).
*   **Weaver Card**: Warm heritage styling, incorporating natural canvas shades, weaver location badges, and an authenticity story block.

### C. Forms & Inputs
*   **Input Fields**: Off-white/slate backgrounds, `rounded-xl`, focused state features a `#C1121F`/`#780000` colored border glow.

---

## 7. Instructions for Stitch AI Generator

1.  **Strict Color Compliance**: Do not use generic bright blue (`#0000FF`), generic red (`#FF0000`), or stark black. All red tones must map to `#780000` or `#C1121F`. All backgrounds should default to `#F9F5EE` rather than pure white, reserving pure white for card container shapes.
2.  **Typography Consistency**: Ensure that every header has the `Playfair Display` serif styling, and all interactive links/labels feature tracked-out capitalizations using `Raleway`/`Inter`.
3.  **Visual Animation Vibe**: Ensure smooth transition classes are attached to interactive elements (`transition-all duration-300` or `duration-500` for cards/carousels). Include micro-animations like `animate-pulse-gentle` or `animate-float` where appropriate.
4.  **Premium Storytelling Focus**: Whenever generating product details or collections, reserve prominent layout blocks for "Weaver Story", "Weave Origin", and "Artisan Badges".
