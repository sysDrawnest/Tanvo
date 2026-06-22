import React from 'react';

/**
 * GlobalStyles — inject once at the root layout or App.tsx.
 * Luxury warm ivory palette with terracotta accents.
 */
const GlobalStyles: React.FC = () => (
  <style>{`
    @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;0,500;0,600;1,300;1,400;1,500&family=Cinzel:wght@400;500;600&family=Raleway:wght@200;300;400;500;600&family=EB+Garamond:ital,wght@0,400;0,500;1,400&display=swap');

    :root {
      /* ── Ivory Luxury Palette ── */
      --ivory:       #F9F5EE;   /* Page background */
      --ivory-warm:  #F4EDE0;   /* Card surfaces, product tiles */
      --ivory-deep:  #EDE3D0;   /* Borders, skeletons, separators */
      --ink:         #1C1612;   /* Primary text */
      --ink-muted:   #7A6A58;   /* Captions, metadata */
      --terra:       #B5502B;   /* Terracotta accent */
      --terra-light: #D4714A;   /* Lighter terra for hover */
      --terra-dim:   rgba(181,80,43,0.12); /* Soft terra fill */
      --stone:       #B5A898;   /* Dividers, placeholders */

      /* Legacy aliases for backward compat */
      --brand-bg:        var(--ivory);
      --brand-primary:   var(--terra);
      --brand-secondary: var(--terra-light);
      --brand-accent:    var(--ink);
      --bg-main:         var(--ivory);
      --bg-card:         var(--ivory-warm);
      --text-primary:    var(--ink);
      --text-muted:      var(--ink-muted);
      --text-light:      var(--ivory);
      --gold:            var(--terra);
      --gold-light:      var(--terra-light);
      --cream:           var(--ivory);
      --ink-legacy:      var(--ink);
    }

    /* ── Base ── */
    *, *::before, *::after { box-sizing: border-box; }

    html { scroll-behavior: smooth; }

    body {
      background: var(--ivory);
      color: var(--ink);
      font-family: 'Raleway', sans-serif;
      -webkit-font-smoothing: antialiased;
      -moz-osx-font-smoothing: grayscale;
    }

    /* ── Typography Utilities ── */
    .font-display  { font-family: 'Cormorant Garamond', serif; }
    .font-cinzel   { font-family: 'Cinzel', serif; }
    .font-raleway  { font-family: 'Raleway', sans-serif; }
    .font-garamond { font-family: 'EB Garamond', serif; }

    /* Section eyebrow label */
    .section-label {
      font-family: 'Cinzel', serif;
      font-size: 9px;
      font-weight: 500;
      letter-spacing: 0.35em;
      text-transform: uppercase;
      color: var(--terra);
      display: inline-flex;
      align-items: center;
      gap: 12px;
    }
    .section-label::before {
      content: '';
      display: inline-block;
      width: 28px;
      height: 1px;
      background: var(--terra);
      flex-shrink: 0;
    }

    .section-title {
      font-family: 'Cormorant Garamond', serif;
      font-size: clamp(36px, 5vw, 72px);
      font-weight: 300;
      line-height: 0.95;
      letter-spacing: -0.02em;
      color: var(--ink);
    }
    .section-title em {
      font-style: italic;
      color: var(--terra);
    }

    /* ── Luxury Divider ── */
    .luxury-divider {
      width: 100%;
      height: 1px;
      background: linear-gradient(90deg, transparent, var(--ivory-deep), transparent);
      margin: clamp(40px, 5vw, 80px) 0;
    }
    .luxury-divider-terra {
      width: 100%;
      height: 1px;
      background: linear-gradient(90deg, transparent, rgba(181,80,43,0.3), transparent);
      margin: clamp(40px, 5vw, 80px) 0;
    }

    /* ── Keyframes ── */
    @keyframes fadeUp {
      from { opacity: 0; transform: translateY(32px); }
      to   { opacity: 1; transform: translateY(0); }
    }
    @keyframes fadeIn {
      from { opacity: 0; }
      to   { opacity: 1; }
    }
    @keyframes fadeInScale {
      from { opacity: 0; transform: scale(0.98); }
      to   { opacity: 1; transform: scale(1); }
    }
    @keyframes revealLine {
      from { width: 0; }
      to   { width: 100%; }
    }
    @keyframes scrollBounce {
      0%, 100% { transform: translateY(0); }
      50%       { transform: translateY(8px); }
    }
    @keyframes marquee {
      from { transform: translateX(0); }
      to   { transform: translateX(-50%); }
    }
    @keyframes shimmer {
      0%   { background-position: 200% center; }
      100% { background-position: -200% center; }
    }
    @keyframes terraPulse {
      0%,100% { opacity: 0.6; transform: scale(1); }
      50%      { opacity: 0; transform: scale(1.5); }
    }
    @keyframes grain {
      0%,100% { transform: translate(0,0); }
      10%      { transform: translate(-2%,-3%); }
      30%      { transform: translate(3%,2%); }
      50%      { transform: translate(-1%,4%); }
      70%      { transform: translate(2%,-1%); }
      90%      { transform: translate(-3%,1%); }
    }

    /* ── Animation utilities ── */
    .anim-fade-up  { animation: fadeUp 0.9s ease forwards; }
    .anim-fade-in  { animation: fadeIn 1.1s ease forwards; }
    .anim-scale-in { animation: fadeInScale 1s cubic-bezier(0.4,0,0.2,1) forwards; }
    .anim-delay-1  { animation-delay: 0.15s; opacity: 0; }
    .anim-delay-2  { animation-delay: 0.35s; opacity: 0; }
    .anim-delay-3  { animation-delay: 0.55s; opacity: 0; }
    .anim-delay-4  { animation-delay: 0.75s; opacity: 0; }
    .scroll-bounce { animation: scrollBounce 1.8s ease-in-out infinite; }
    .marquee-inner { animation: marquee 28s linear infinite; }

    /* ── Grain overlay ── */
    .grain-overlay::before {
      content: '';
      position: absolute;
      inset: -200%;
      width: 400%; height: 400%;
      background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)' opacity='0.04'/%3E%3C/svg%3E");
      animation: grain 7s steps(1) infinite;
      pointer-events: none;
      z-index: 1;
    }

    /* ── Buttons ── */
    .btn-primary {
      display: inline-flex;
      align-items: center;
      gap: 10px;
      padding: 15px 40px;
      background: var(--ink);
      color: var(--ivory);
      font-family: 'Cinzel', serif;
      font-size: 9px;
      font-weight: 500;
      letter-spacing: 0.28em;
      text-transform: uppercase;
      border: none;
      cursor: pointer;
      text-decoration: none;
      position: relative;
      overflow: hidden;
      transition: color 0.4s ease;
    }
    .btn-primary::before {
      content: '';
      position: absolute;
      inset: 0;
      background: var(--terra);
      transform: scaleX(0);
      transform-origin: left;
      transition: transform 0.4s cubic-bezier(0.76,0,0.24,1);
    }
    .btn-primary:hover::before { transform: scaleX(1); }
    .btn-primary span, .btn-primary > * { position: relative; z-index: 1; }

    .btn-outline {
      display: inline-flex;
      align-items: center;
      gap: 10px;
      padding: 14px 39px;
      background: transparent;
      color: var(--ink);
      font-family: 'Cinzel', serif;
      font-size: 9px;
      font-weight: 500;
      letter-spacing: 0.28em;
      text-transform: uppercase;
      border: 1px solid rgba(28,22,18,0.3);
      cursor: pointer;
      text-decoration: none;
      position: relative;
      overflow: hidden;
      transition: color 0.4s ease, border-color 0.4s ease;
    }
    .btn-outline::before {
      content: '';
      position: absolute;
      inset: 0;
      background: var(--ink);
      transform: scaleX(0);
      transform-origin: left;
      transition: transform 0.4s cubic-bezier(0.76,0,0.24,1);
    }
    .btn-outline:hover { color: var(--ivory); border-color: var(--ink); }
    .btn-outline:hover::before { transform: scaleX(1); }
    .btn-outline span, .btn-outline > * { position: relative; z-index: 1; }

    .btn-outline-gold {
      display: inline-flex;
      align-items: center;
      gap: 10px;
      padding: 12px 28px;
      background: transparent;
      color: var(--terra);
      font-family: 'Cinzel', serif;
      font-size: 8px;
      font-weight: 500;
      letter-spacing: 0.25em;
      text-transform: uppercase;
      border: 1px solid rgba(181,80,43,0.4);
      cursor: pointer;
      text-decoration: none;
      transition: all 0.35s ease;
    }
    .btn-outline-gold:hover {
      background: var(--terra);
      color: var(--ivory);
      border-color: var(--terra);
    }

    /* ── Labels & text ── */
    .shimmer-text {
      background: linear-gradient(
        90deg,
        var(--ink-muted) 0%,
        var(--terra) 50%,
        var(--ink-muted) 100%
      );
      background-size: 200% auto;
      color: transparent;
      background-clip: text;
      -webkit-background-clip: text;
      -webkit-text-fill-color: transparent;
      animation: shimmer 3s infinite linear;
    }

    .vertical-text {
      writing-mode: vertical-rl;
      text-orientation: mixed;
      transform: rotate(180deg);
      font-family: 'Cinzel', serif;
      font-size: 8px;
      letter-spacing: 0.3em;
      color: var(--stone);
      text-transform: uppercase;
    }

    /* ── Card & Hover Effects ── */
    .card-hover {
      transition: transform 0.6s cubic-bezier(0.4,0,0.2,1), box-shadow 0.6s ease;
    }
    .card-hover:hover {
      transform: translateY(-6px);
      box-shadow: 0 24px 48px rgba(28,22,18,0.08);
    }

    .img-zoom { overflow: hidden; }
    .img-zoom img {
      transition: transform 1.2s cubic-bezier(0.4,0,0.2,1);
    }
    .img-zoom:hover img { transform: scale(1.06); }

    .border-hover { position: relative; }
    .border-hover::after {
      content: '';
      position: absolute;
      inset: 0;
      border: 1px solid var(--terra);
      opacity: 0;
      transition: opacity 0.4s ease;
      pointer-events: none;
    }
    .border-hover:hover::after { opacity: 1; }

    /* ── Textile texture ── */
    .textile-overlay {
      background-image: url("data:image/svg+xml,%3Csvg width='40' height='40' viewBox='0 0 40 40' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M0 0h40v2H0V0zm0 4h40v2H0V4zm0 4h40v2H0V8zm0 4h40v2H0v-2zm0 4h40v2H0v-2zm0 4h40v2H0v-2zm0 4h40v2H0v-2zm0 4h40v2H0v-2zm0 4h40v2H0v-2zm0 4h40v2H0v-2z' fill='%23B5502B' fill-opacity='0.025' fill-rule='evenodd'/%3E%3C/svg%3E");
    }

    .thread-divider { position: relative; }
    .thread-divider::after {
      content: '';
      position: absolute;
      bottom: 0; left: 0; right: 0;
      height: 1px;
      background: linear-gradient(90deg, transparent 0%, var(--ivory-deep) 50%, transparent 100%);
    }

    /* ── Story cards ── */
    .story-card { transition: all 0.7s cubic-bezier(0.4,0,0.2,1); }
    .story-card.visible { opacity: 1 !important; transform: translateY(0) !important; }

    /* ── Hotspot pulse ── */
    .hotspot-pulse { position: relative; }
    .hotspot-pulse::before {
      content: '';
      position: absolute;
      inset: -8px;
      border-radius: 50%;
      border: 1px solid var(--terra);
      animation: terraPulse 2s ease infinite;
    }

    /* ── Grid pattern ── */
    .grid-pattern {
      background-image:
        linear-gradient(rgba(181,80,43,0.04) 1px, transparent 1px),
        linear-gradient(90deg, rgba(181,80,43,0.04) 1px, transparent 1px);
      background-size: 40px 40px;
    }

    /* ── Scrollbar ── */
    ::-webkit-scrollbar { width: 3px; }
    ::-webkit-scrollbar-track { background: var(--ivory-deep); }
    ::-webkit-scrollbar-thumb { background: var(--stone); border-radius: 2px; }
    ::-webkit-scrollbar-thumb:hover { background: var(--terra); }

    .no-scrollbar::-webkit-scrollbar { display: none; }
    .no-scrollbar { -ms-overflow-style: none; scrollbar-width: none; }

    /* ── Selection ── */
    ::selection  { background: var(--terra); color: var(--ivory); }
    ::-moz-selection { background: var(--terra); color: var(--ivory); }

    /* ── Skeleton ── */
    .skeleton {
      background: linear-gradient(
        90deg,
        var(--ivory-deep) 25%,
        var(--ivory-warm) 50%,
        var(--ivory-deep) 75%
      );
      background-size: 200% 100%;
      animation: shimmer 1.6s infinite;
    }

    /* ── Container ── */
    .container-tanvo {
      max-width: 1440px;
      margin: 0 auto;
      padding: 0 clamp(20px, 5vw, 80px);
    }

    /* ── Focus ── */
    *:focus-visible {
      outline: 2px solid var(--terra);
      outline-offset: 2px;
    }

    /* ── Cinematic hero overlay ── */
    .cinematic-overlay {
      position: absolute;
      inset: 0;
      background: linear-gradient(
        180deg,
        rgba(249,245,238,0.05) 0%,
        rgba(249,245,238,0.0) 50%,
        rgba(249,245,238,0.9) 100%
      );
      pointer-events: none;
    }

    /* Soft shadow utility */
    .shadow-luxury {
      box-shadow: 0 2px 0 var(--ivory-deep), 0 24px 64px rgba(28,22,18,0.06);
    }
  `}</style>
);

export default GlobalStyles;