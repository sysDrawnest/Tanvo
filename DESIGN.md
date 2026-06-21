---

```yaml
name: TANVO
colors:
  background: "#F9F5EE"
  on-background: "#0D0B0A"
  surface: "#FFFFFF"
  on-surface: "#0D0B0A"
  primary: "#780000"
  on-primary: "#FFFFFF"
  primary-container: "#C1121F"
  on-primary-container: "#FFFFFF"
  secondary: "#C9A84C"
  on-secondary: "#0D0B0A"
  secondary-container: "#E8C97A"
  on-secondary-container: "#0D0B0A"
  tertiary: "#669BBC"
  on-tertiary: "#FFFFFF"
  outline: "#E2D9C8"
  outline-variant: "#D2C7B1"
typography:
  display-xl:
    fontFamily: Playfair Display
    fontSize: 72px
    fontWeight: "700"
    lineHeight: 110%
    letterSpacing: -0.02em
  headline-lg:
    fontFamily: Playfair Display
    fontSize: 40px
    fontWeight: "700"
    lineHeight: 120%
    letterSpacing: -0.01em
  headline-md:
    fontFamily: Playfair Display
    fontSize: 28px
    fontWeight: "700"
    lineHeight: 130%
    letterSpacing: 0em
  body-lg:
    fontFamily: Raleway
    fontSize: 18px
    fontWeight: "400"
    lineHeight: 160%
    letterSpacing: 0.01em
  body-md:
    fontFamily: Raleway
    fontSize: 15px
    fontWeight: "400"
    lineHeight: 165%
    letterSpacing: 0.01em
  label-sm:
    fontFamily: Inter
    fontSize: 11px
    fontWeight: "700"
    lineHeight: 120%
    letterSpacing: 0.2em
spacing:
  unit: 8px
  container-max: 1280px
  gutter: 24px
  margin-edge: 32px
  section-gap: 96px

```

---

# TANVO — Brand Design System & UI Instructions

This document defines the foundational design tokens, styling rules, and visual guidelines for the **TANVO** premium heritage e-commerce platform. Use these rules to generate and edit consistent, editorial-grade layouts.

---

## 1. Visual Theme & Brand Persona

- **Brand Essence**: Premium Indian heritage, luxury handlooms (Odisha weaves), storytelling, and craftsmanship trust.
- **Aesthetic Tone**: Luxury fashion house interface, editorial, archival, refined, and sophisticated.
- **Background Mood**: Off-white, soft raw-cotton tones instead of stark cold white or dark gray.
- **Structural Philosophy**: Refined rectangular structures with subtle, disciplined corner radii (4px to 12px) to evoke an elite heritage editorial feel. Avoid playful, app-like, or overly rounded UI layouts.

---

## 2. Color Palette (Design Tokens)

The colors are selected to match traditional natural dyes (madder red, indigo, turmeric, and brass/gold thread work).

- **Traditional Madder Red (`#780000`)**: Primary brand color, headers, primary buttons, logo.
- **Vibrant Vermilion (`#C1121F`)**: CTA accents, secondary buttons, active highlights.
- **Heritage Brass Gold (`#C9A84C`)**: Premium highlights, badges, borders, checkout items, buttons.
- **Champagne Gold (`#E8C97A`)**: Soft gold hover gradients, light borders.
- **Raw Cotton Background (`#F9F5EE`)**: Soft, warm background tint for the entire website.
- **Mineral Charcoal (`#0D0B0A`)**: Text headings, deep labels, primary readability.
- **Heritage Indigo (`#669BBC`)**: Accent blue-indigo for secondary tags, banners.
- **Pristine White (`#FFFFFF`)**: Used only for component cards, dialogs, and panels to pop.

---

## 3. Typography

Elegant editorial serif headings paired with clean geometric body text.

- **Primary Headings (`h1`, `h2`, `h3`, `h4`, `h5`, `h6`)**:
- **Font Family**: `'Playfair Display', serif`
- **Weights**: `700` (Bold)
- **Style**: Editorial, sophisticated, high-end luxury.

- **Body & UI Text**:
- **Font Family**: `'Raleway', 'Inter', sans-serif`
- **Weights**: `400` (Regular), `500` (Medium), `700` (Bold)
- **Style**: Balanced spacing, highly readable, contemporary.

- **Labels & Accents**:
- **Style**: Uppercase, tracked out (`tracking-widest` or `tracking-[0.2em]`), bold, small size (e.g., `text-[10px]` or `text-xs`).

---

## 4. Corner Radius & Shape Tokens

TANVO implements an architectural, structured geometry. Avoid excessive rounded corners, pill shapes, or heavy glassmorphic styles.

- **Product & Content Cards**: `rounded-xl` (Subtle 12px radius max for a clean, structural outline).
- **Category Grids**: `rounded-md` to `rounded-xl` (Geometric discipline).
- **Input Fields & Form Elements**: `rounded-md` (Slight 4px–6px curve for crisp, premium data entries).
- **Modals & Overlays**: `rounded-xl` with thin geometric frames.

---

## 5. Buttons

TANVO uses refined luxury button shapes that emulate high-fashion digital lookbooks rather than mainstream utility applications.

### Primary Buttons

- **Structure**: Elegant rectangular structure, medium height.
- **Border Radius**: 4px to 8px (`rounded-sm` to `rounded-md`).
- **Typography**: Uppercase typography with wide letter spacing (`tracking-[0.2em]`).
- **Background**: Gradient from `#780000` to `#C1121F`.
- **Text Color**: `#FFFFFF`
- **Hover State**: Subtle brightness increase with a slow, deliberate transition.

### Secondary Buttons

- **Structure**: Minimal luxury appearance, rectangular shape.
- **Border Radius**: 4px to 8px.
- **Background**: Transparent background.
- **Border**: Thin 1px solid `#780000` border.
- **Text Color**: `#780000`

### Explicitly Avoid

- Pill-shaped buttons (`rounded-full`).
- Overly rounded, playful UI components.
- Casual, mobile-first app-like button heights and shapes.

---

## 6. Shadows, Elevation, & Borders

- **Borders over Blurs**: Favor crisp, thin borders (`border-outline` or `border-outline-variant`) and flat structural separations over heavy glassmorphism.
- **Soft Shadows**:
- **Base**: Flat or ultra-subtle, soft minimalist drop shadows (`shadow-sm` or low-opacity `shadow-md`).
- **Hover**: Subtle, sharp lift (`-translate-y-1`) with high duration transitions (`duration-500`) to sustain an elite, slow-paced luxury atmosphere.

---

## 7. Layout & UI Components

### A. Cards & Grids

- **Product Card**: White background, `rounded-xl` (subtle 12px radius), thin structural borders, soft shadows. Hover state transforms with a elegant frame lift and clean internal image zoom scale (`hover:scale-105` with `duration-500`).
- **Weaver Card**: Framed like a gallery painting. Clear grid lines, raw canvas text blocks, localized typography badges, and an integrated artisan provenance block.

### B. Forms & Inputs

- **Input Fields**: Off-white/cream backgrounds, `rounded-md`, clean thin borders. Focused state swaps the frame color to a sharp `#780000` or `#C1121F` minimal highlight.

---

## 8. Instructions for Stitch AI Generator

1. **Strict Color & Shape Compliance**: Do not use generic bright accents or rounded pill structures. All button shapes must abide by the 4px–8px luxury rectangular constraint. Cards must never exceed a 12px radius (`rounded-xl`).
2. **Typography Consistency**: Every header requires `Playfair Display` serif styling. Action components, buttons, and system tags must feature tracked-out, capitalized `Raleway`/`Inter` labels.
3. **High-End Animation Pace**: Micro-animations must feel grand and slow (`duration-500` or higher). Avoid quick, snappy, or bouncy application transitions.
4. **Premium Storytelling Focus**: Dedicate structural grid space to heritage metadata: "Weaver Story", "Weave Origin", and clean, rectangular "Artisan Badges".
