# TANVO Product Detail Page: Current Design & Content Map

This document outlines the current visual architecture, content sections, design motifs, and interactive behaviors of the TANVO Product Detail page, as implemented in `frontend/pages/ProductDetail.tsx`.

---

## 1. Visual & Design Theme

*   **Background Surfaces**: The main page container utilizes a soft pinkish-cream background color (`#F8EDED`).
*   **Textile Grid Overlay**: A persistent background tile overlay using a repeating vertical/horizontal SVG line pattern in `#B43F3F` at `2%` opacity, giving it a subtle handloom grid texture.
*   **Typography**:
    *   **Serif Fonts**: Primary titles use the display serif font family (`font-display`).
    *   **Sans-Serif Fonts**: Body copy, tables, specifications, and small badges use system sans-serif fonts.
*   **Color Accents**:
    *   **Primary Crimson**: `#B43F3F` (used for primary buttons, prices, categories, and main borders).
    *   **Secondary Orange**: `#FF8225` (used for secondary buttons, scroll-to-top buttons, percent off badges, star ratings, and tab outlines).
    *   **Dark Slate Blue/Teal**: `#173B45` (used for main title texts, body labels, and spinner states).
    *   **Muted Cream Overlay**: `#F8EDED` (used for borders, input placeholders, and inactive badge pills).
*   **Corner Radii**:
    *   Most components (containers, thumbnails, panels, input fields, custom forms) utilize rounded corners (`rounded-xl` / `rounded-2xl` / `rounded-3xl` equivalent to `12px` to `24px` radius).
    *   Pills and quick badges utilize a fully rounded style (`rounded-full`).

---

## 2. Page Hierarchy & Components

The page is built using a structured grid (`grid-cols-1 lg:grid-cols-2` on larger screens) flanked by header breadcrumbs and a bottom related items section:

### A. Navigation & Header
*   **Breadcrumb Bar**: Left-aligned list displaying `Home / Shop / [Category] / [Product Name]` in muted teal text, allowing easy upward navigation.
*   **Page Metadata**: Injects SEO title tags, meta descriptions, open graph tags (OG image, title, description), and a JSON-LD structured schema payload for search engine indexers.

### B. Left Column: Image Curation
*   **Main Media Display**:
    *   High-fidelity image canvas (`aspect-[4/5]`) featuring the selected image with a hover zoom effect (`scale-105` transition).
    *   *Badges Overlay*: Floating pills on the top-left showing campaign contexts like `Best Seller`, `[Percentage] OFF`, and `New Arrival`.
    *   *Action Overlays*: Floating circular buttons on the top-right for toggling the wishlist item (`Heart`) and opening the sharing sheet (`Share2` with WhatsApp, Facebook, Pinterest, and Email links).
    *   *Interactives*: Swipe-to-change triggers for mobile devices and a "Click to zoom" indicator for desktops.
*   **Thumbnails Grid**:
    *   A horizontal grid of 5 aspect-ratio square buttons displaying alternative views of the product. The active photo is highlighted with a gold border (`#FF8225`).

### C. Right Column: Product Narrative
*   **Category Pills**: Displays the category, weave style, and fabric in separate color-themed background pills.
*   **Main Title & Reviews Summary**: Displays the bold product name alongside a 5-star rating preview highlighting verified review counts.
*   **Price Panel**: Showcases the final product price in large crimson text (`#B43F3F`), showing crossed-out original prices and computed savings badges.
*   **Authenticity Promise Box**:
    *   A bordered panel stating *"TANVO Authenticity Promise"* with checklist indicators: *Handloom Certified*, *Artisan Verified*, *Fabric type*, and *Weave type*.
    *   Features a reassuring quotation guaranteeing direct weaver connection and fair wages.
*   **Inventory Indicator**: A pulsing status dot showing color-coded stock alerts (*In Stock* in green, *Only X left!* in orange, or *Out of Stock*).
*   **Color & Size Pickers**:
    *   Color swatches rendered as circular buttons with colored inner nodes.
    *   Size boxes rendered as rectangular tags with hover state changes.
*   **Feature Badges Grid**: Two columns showing fabric detail with a *Gem* icon and saree length details (plus blouse status) with a *Ruler* icon.
*   **Weaver Master Story Card**:
    *   Includes a circular initial avatar, weaver name, regional weaving cluster, and generation index.
    *   Presents a personal story paragraph about the artisan, alongside a link to *"Meet the Weaver →"*.
*   **Quantity Picker & Action Buttons**:
    *   Fully functional quantity selector (`Plus`/`Minus` counter).
    *   Two prominent action buttons: **Add to Cart** (crimson-bordered button that fills on hover) and **Buy It Now** (solid crimson call to action).
*   **Delivery Serviceability Checker**:
    *   An input box to enter a 6-digit PIN code to check shipping serviceability via API.
    *   Displays service availability status and estimated delivery times (ETD).
*   **Help & Policy Quick-links**:
    *   Two-column quick-action buttons: *Chat with Weaver* (linking to WhatsApp/support) and *7-Day Returns*.

---

## 3. Product Heritage Accordion

Located directly under the helper links, this custom component (`ProductHeritageAccordion.tsx`) breaks down high-intent luxury queries into expandable, elegant cards:
1.  **Origin & Heritage Location**: Outlines the exact weaving hub location (e.g., Sambalpur, Bomkai) and regional background.
2.  **Artisan Craftsmanship**: Explains the Pit loom technique, dye processes, and human time investment.
3.  **Care & Maintenance Guide**: Step-by-step luxury maintenance rules (dry cleaning recommendations, storage in muslin fabric, folding practices).
4.  **Returns & Authenticity Protection**: Highlights the 7-day return policy requirements and verification seals.

---

## 4. Lower-Page Detailed Content Tabs

A horizontal tab navigation block allowing users to toggle between detailed sub-pages:
*   **Description Tab**: Injects the long-form product description, custom hashtags, and detailed blocks on weaving techniques and design inspirations.
*   **Specifications Tab**: Lists a structured 10-row property table (Fabric, Weave Type, Length, Blouse Piece, Category, Border, Pallu, Weight, Country) side-by-side with courier details.
*   **Care Instructions Tab**: Displays a green *Leaf* icon layout showing dry cleaning rules and storage tips.
*   **Reviews Tab**:
    *   Displays rating metrics (average score, bar chart showing star-percentage breakdowns).
    *   Provides an interactive **Write a Review** form (rating slider, title input, comment text area).
    *   Renders a verified customer comment feed with thumbnails and thumbs-up helpfulness flags.

---

## 5. Related Items Curation

*   **You May Also Like Grid**: A 4-column product grid featuring related sarees. Each card includes hover lift animations (`-translate-y-2`), aspect-ratio product images, seller flags, title, rating summary, and pricing details.

---

## 6. Sticky Mobile Drawer

*   **Floating Bar**: When a mobile user scrolls past the main buy button, a sticky bottom bar slide-animates into view showing the price, a wishlist button, and a quick **Add to Cart** action.
