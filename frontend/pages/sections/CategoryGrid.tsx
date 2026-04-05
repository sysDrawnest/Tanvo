// import React, { useRef, useEffect, useState } from 'react';
// import { Link } from 'react-router-dom';
// import { ArrowUpRight } from 'lucide-react';

// const categories = [
//     { label: 'Sambalpuri', sub: 'GI Tagged', slug: 'Sambalpuri', num: '01', image: '/Sambalpuri saree.png' },
//     { label: 'Bomkai', sub: 'Temple Weave', slug: 'Bomkai', num: '02', image: '/Bomkai saree.png' },
//     { label: 'Ikat', sub: 'Tie & Dye', slug: 'Ikat', num: '03', image: '/Ikat saree.png' },
//     { label: 'Silk', sub: 'Pure Mulberry', slug: 'Silk', num: '04', image: '/silk saree.png' },
//     { label: 'Cotton', sub: 'Handspun', slug: 'Cotton', num: '05', image: '/cotton saree.png' },
//     { label: 'Khandua', sub: 'Sacred Weave', slug: 'Khandua', num: '06', image: '/Khandua saree.png' },
// ];

// const CategoryGrid: React.FC = () => {
//     const [hoveredIdx, setHoveredIdx] = useState<number | null>(null);
//     const [visible, setVisible] = useState(false);
//     const sectionRef = useRef<HTMLElement>(null);

//     useEffect(() => {
//         const observer = new IntersectionObserver(
//             ([entry]) => { if (entry.isIntersecting) setVisible(true); },
//             { threshold: 0.1 }
//         );
//         if (sectionRef.current) observer.observe(sectionRef.current);
//         return () => observer.disconnect();
//     }, []);

//     return (
//         <>
//             <style>{`
//                 .cg-section {
//                     padding: clamp(80px, 10vw, 140px) clamp(20px, 6vw, 96px);
//                     background: var(--ivory);
//                     position: relative;
//                     overflow: hidden;
//                 }

//                 .cg-topline {
//                     width: 100%;
//                     height: 1px;
//                     background: linear-gradient(90deg, transparent, var(--ivory-deep), transparent);
//                     margin-bottom: clamp(48px, 6vw, 80px);
//                 }

//                 .cg-header {
//                     display: flex;
//                     justify-content: space-between;
//                     align-items: flex-end;
//                     margin-bottom: clamp(48px, 6vw, 80px);
//                     flex-wrap: wrap;
//                     gap: 24px;
//                 }

//                 .cg-title {
//                     font-family: 'Cormorant Garamond', serif;
//                     font-size: clamp(44px, 5.5vw, 80px);
//                     font-weight: 300;
//                     color: var(--ink);
//                     line-height: 0.95;
//                     letter-spacing: -0.02em;
//                     margin: 0;
//                 }
//                 .cg-title em {
//                     font-style: italic;
//                     color: var(--terra);
//                 }

//                 .cg-view-all {
//                     display: inline-flex;
//                     align-items: center;
//                     gap: 10px;
//                     font-family: 'Cinzel', serif;
//                     font-size: 9px;
//                     letter-spacing: 0.28em;
//                     text-transform: uppercase;
//                     color: var(--ink);
//                     text-decoration: none;
//                     border: 1px solid rgba(28,22,18,0.25);
//                     padding: 13px 26px;
//                     position: relative;
//                     overflow: hidden;
//                     transition: color 0.4s ease, border-color 0.4s ease;
//                     white-space: nowrap;
//                 }
//                 .cg-view-all::before {
//                     content: '';
//                     position: absolute;
//                     inset: 0;
//                     background: var(--ink);
//                     transform: scaleX(0);
//                     transform-origin: left;
//                     transition: transform 0.4s cubic-bezier(0.76, 0, 0.24, 1);
//                 }
//                 .cg-view-all:hover::before { transform: scaleX(1); }
//                 .cg-view-all:hover { color: var(--ivory); border-color: var(--ink); }
//                 .cg-view-all span { position: relative; z-index: 1; display: flex; align-items: center; gap: 10px; }

//                 .cg-grid {
//                     display: grid;
//                     grid-template-columns: 1.2fr 0.9fr 1fr;
//                     grid-template-rows: auto auto;
//                     gap: 3px;
//                 }

//                 .cg-item {
//                     position: relative;
//                     display: block;
//                     overflow: hidden;
//                     text-decoration: none;
//                     cursor: pointer;
//                     background: var(--ivory-deep);
//                 }

//                 .cg-item:nth-child(1) { aspect-ratio: 3/4; }
//                 .cg-item:nth-child(2) { aspect-ratio: 4/5; align-self: end; }
//                 .cg-item:nth-child(3) { aspect-ratio: 2/3; grid-row: 1 / 3; align-self: stretch; }
//                 .cg-item:nth-child(4) { aspect-ratio: 4/3; }
//                 .cg-item:nth-child(5) { aspect-ratio: 4/3; }
//                 .cg-item:nth-child(6) { display: none; }

//                 .cg-item img {
//                     width: 100%;
//                     height: 100%;
//                     object-fit: cover;
//                     display: block;
//                     opacity: 0.82;
//                     transition: transform 0.9s cubic-bezier(0.25, 0.46, 0.45, 0.94), opacity 0.6s ease;
//                     transform: scale(1.03);
//                 }
//                 .cg-item:hover img {
//                     opacity: 0.95;
//                     transform: scale(1.0);
//                 }

//                 .cg-overlay {
//                     position: absolute;
//                     inset: 0;
//                     background: linear-gradient(
//                         160deg,
//                         rgba(28,22,18,0.0) 0%,
//                         rgba(28,22,18,0.0) 40%,
//                         rgba(28,22,18,0.65) 100%
//                     );
//                     transition: opacity 0.5s ease;
//                 }

//                 .cg-corner {
//                     position: absolute;
//                     top: 16px; right: 16px;
//                     width: 18px; height: 18px;
//                     border-top: 1px solid rgba(249,245,238,0.7);
//                     border-right: 1px solid rgba(249,245,238,0.7);
//                     opacity: 0;
//                     transform: scale(0.6) translate(4px, -4px);
//                     transition: opacity 0.4s ease 0.1s, transform 0.4s ease 0.1s;
//                 }
//                 .cg-item:hover .cg-corner { opacity: 1; transform: scale(1) translate(0,0); }

//                 .cg-text {
//                     position: absolute;
//                     bottom: 0; left: 0; right: 0;
//                     padding: clamp(14px, 2.5vw, 24px);
//                     transform: translateY(5px);
//                     transition: transform 0.5s cubic-bezier(0.25, 0.46, 0.45, 0.94);
//                 }
//                 .cg-item:hover .cg-text { transform: translateY(0); }

//                 .cg-num {
//                     font-family: 'Cinzel', serif;
//                     font-size: 8px;
//                     color: rgba(249,245,238,0.6);
//                     letter-spacing: 0.3em;
//                     margin-bottom: 6px;
//                     display: block;
//                 }
//                 .cg-label {
//                     font-family: 'Cormorant Garamond', serif;
//                     font-size: clamp(20px, 2.5vw, 32px);
//                     font-weight: 400;
//                     color: var(--ivory);
//                     line-height: 1;
//                     margin-bottom: 4px;
//                 }
//                 .cg-sub {
//                     font-family: 'Raleway', sans-serif;
//                     font-size: 8px;
//                     color: rgba(249,245,238,0.45);
//                     letter-spacing: 0.2em;
//                     text-transform: uppercase;
//                     font-weight: 300;
//                 }

//                 .cg-shine {
//                     position: absolute; inset: 0;
//                     background: linear-gradient(105deg, transparent 35%, rgba(255,255,255,0.06) 50%, transparent 65%);
//                     transform: translateX(-100%);
//                     transition: transform 0s;
//                 }
//                 .cg-item:hover .cg-shine {
//                     transform: translateX(100%);
//                     transition: transform 0.8s ease;
//                 }

//                 .cg-item {
//                     opacity: 0;
//                     transform: translateY(20px);
//                     transition:
//                         opacity 0.7s ease,
//                         transform 0.7s cubic-bezier(0.25, 0.46, 0.45, 0.94),
//                         box-shadow 0.4s ease;
//                 }
//                 .cg-item.visible {
//                     opacity: 1;
//                     transform: translateY(0);
//                 }
//                 .cg-item:hover {
//                     box-shadow: 0 8px 40px rgba(28,22,18,0.25);
//                     z-index: 2;
//                 }
//                 .cg-item:nth-child(1) { transition-delay: 0.05s; }
//                 .cg-item:nth-child(2) { transition-delay: 0.15s; }
//                 .cg-item:nth-child(3) { transition-delay: 0.1s; }
//                 .cg-item:nth-child(4) { transition-delay: 0.2s; }
//                 .cg-item:nth-child(5) { transition-delay: 0.25s; }
//                 .cg-item:nth-child(6) { transition-delay: 0.3s; }

//                 .cg-sixth-strip {
//                     margin-top: 3px;
//                     position: relative;
//                     display: flex;
//                     align-items: center;
//                     gap: 3px;
//                 }
//                 .cg-sixth-card {
//                     flex: 1;
//                     height: 148px;
//                     position: relative;
//                     overflow: hidden;
//                     display: block;
//                     text-decoration: none;
//                     background: var(--ivory-deep);
//                     opacity: 0;
//                     transform: translateY(20px);
//                     transition: opacity 0.7s ease 0.3s, transform 0.7s cubic-bezier(0.25,0.46,0.45,0.94) 0.3s, box-shadow 0.4s ease;
//                 }
//                 .cg-sixth-card.visible { opacity: 1; transform: translateY(0); }
//                 .cg-sixth-card img {
//                     width: 100%; height: 100%;
//                     object-fit: cover; opacity: 0.75;
//                     transition: transform 0.9s ease, opacity 0.5s ease;
//                     transform: scale(1.04);
//                 }
//                 .cg-sixth-card:hover img { opacity: 0.9; transform: scale(1.0); }
//                 .cg-sixth-card:hover { box-shadow: 0 8px 40px rgba(28,22,18,0.2); }
//                 .cg-sixth-overlay {
//                     position: absolute; inset: 0;
//                     background: linear-gradient(to right, rgba(28,22,18,0.65) 0%, rgba(28,22,18,0.1) 100%);
//                 }
//                 .cg-sixth-text { position: absolute; left: 22px; top: 50%; transform: translateY(-50%); }

//                 @media (max-width: 768px) {
//                     .cg-grid {
//                         grid-template-columns: 1fr 1fr;
//                         grid-template-rows: auto;
//                         gap: 3px;
//                     }
//                     .cg-item:nth-child(1) { aspect-ratio: 3/4; }
//                     .cg-item:nth-child(2) { aspect-ratio: 3/4; align-self: auto; }
//                     .cg-item:nth-child(3) { grid-column: 1 / -1; grid-row: auto; aspect-ratio: 16/9; }
//                     .cg-item:nth-child(4) { aspect-ratio: 3/4; }
//                     .cg-item:nth-child(5) { aspect-ratio: 3/4; }
//                     .cg-item:nth-child(6) { display: block; grid-column: 1 / -1; aspect-ratio: 16/9; }
//                     .cg-sixth-strip { display: none; }
//                 }

//                 @media (max-width: 480px) {
//                     .cg-grid { grid-template-columns: 1fr; }
//                     .cg-item:nth-child(n) { aspect-ratio: 4/3 !important; grid-column: auto !important; grid-row: auto !important; }
//                 }
//             `}</style>

//             <section className="cg-section" ref={sectionRef}>
//                 <div className="cg-topline" />

//                 <div className="cg-header">
//                     <div>
//                         <p className="section-label" style={{ marginBottom: 18 }}>Explore By Weave</p>
//                         <h2 className="cg-title">
//                             Six Ancient<br /><em>Traditions</em>
//                         </h2>
//                     </div>
//                     <Link to="/shop" className="cg-view-all">
//                         <span>View All Collections <ArrowUpRight size={13} /></span>
//                     </Link>
//                 </div>

//                 {/* Main 5-cell grid */}
//                 <div className="cg-grid">
//                     {categories.slice(0, 5).map((cat, idx) => (
//                         <Link
//                             key={idx}
//                             to={`/shop?weave=${cat.slug}`}
//                             className={`cg-item${visible ? ' visible' : ''}`}
//                             onMouseEnter={() => setHoveredIdx(idx)}
//                             onMouseLeave={() => setHoveredIdx(null)}
//                         >
//                             <img src={cat.image} alt={cat.label} />
//                             <div className="cg-overlay" />
//                             <div className="cg-shine" />
//                             <div className="cg-corner" />
//                             <div className="cg-text">
//                                 <span className="cg-num">{cat.num}</span>
//                                 <h3 className="cg-label">{cat.label}</h3>
//                                 <p className="cg-sub">{cat.sub}</p>
//                             </div>
//                         </Link>
//                     ))}

//                     {/* 6th visible only on mobile */}
//                     <Link
//                         to={`/shop?weave=${categories[5].slug}`}
//                         className={`cg-item${visible ? ' visible' : ''}`}
//                     >
//                         <img src={categories[5].image} alt={categories[5].label} />
//                         <div className="cg-overlay" />
//                         <div className="cg-shine" />
//                         <div className="cg-text">
//                             <span className="cg-num">{categories[5].num}</span>
//                             <h3 className="cg-label">{categories[5].label}</h3>
//                             <p className="cg-sub">{categories[5].sub}</p>
//                         </div>
//                     </Link>
//                 </div>

//                 {/* 6th as wide strip on desktop */}
//                 <div className="cg-sixth-strip">
//                     <Link
//                         to={`/shop?weave=${categories[5].slug}`}
//                         className={`cg-sixth-card${visible ? ' visible' : ''}`}
//                     >
//                         <img src={categories[5].image} alt={categories[5].label} />
//                         <div className="cg-sixth-overlay" />
//                         <div className="cg-sixth-text">
//                             <span className="cg-num">{categories[5].num}</span>
//                             <h3 className="cg-label" style={{ fontSize: 'clamp(18px,2vw,26px)' }}>{categories[5].label}</h3>
//                             <p className="cg-sub">{categories[5].sub}</p>
//                         </div>
//                     </Link>
//                 </div>
//             </section>
//         </>
//     );
// };

// export default CategoryGrid;

import React, { useRef, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowUpRight } from 'lucide-react';

const categories = [
  {
    label: 'Sambalpuri',
    sub: 'GI Tagged',
    slug: 'Sambalpuri',
    num: '01',
    image: '/Sambalpuri saree.png',
    mobileImage: '/Sambalpuri-mobile.png'
  },
  {
    label: 'Bomkai',
    sub: 'Temple Weave',
    slug: 'Bomkai',
    num: '02',
    image: '/Bomkai saree.png',
    mobileImage: '/Bomkai-mobile.png'
  },
  {
    label: 'Ikat',
    sub: 'Tie & Dye',
    slug: 'Ikat',
    num: '03',
    image: '/Ikat saree.png',
    mobileImage: '/Ikat-mobile.png'
  },
  {
    label: 'Silk',
    sub: 'Pure Mulberry',
    slug: 'Silk',
    num: '04',
    image: '/silk saree.png',
    mobileImage: '/silk-mobile.png'
  },
  {
    label: 'Cotton',
    sub: 'Handspun',
    slug: 'Cotton',
    num: '05',
    image: '/cotton saree.png',
    mobileImage: '/cotton-mobile.png'
  },
  {
    label: 'Khandua',
    sub: 'Sacred Weave',
    slug: 'Khandua',
    num: '06',
    image: '/Khandua saree.png',
    mobileImage: '/Khandua-mobile.png'
  },
];

const CategoryGrid: React.FC = () => {
  const [visible, setVisible] = useState(false);
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const io = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) setVisible(true); },
      { threshold: 0.08 }
    );
    if (sectionRef.current) io.observe(sectionRef.current);
    return () => io.disconnect();
  }, []);

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,400;0,500;1,400&family=DM+Sans:wght@300;400;500&display=swap');

        /* ── SECTION ── */
        .cg-section {
          padding: clamp(64px, 9vw, 120px) clamp(20px, 6vw, 88px);
          background: #F9F5EE;
          position: relative;
          overflow: hidden;
        }

        /* ── HEADER ── */
        .cg-header {
          display: flex;
          justify-content: space-between;
          align-items: flex-end;
          margin-bottom: clamp(36px, 5vw, 60px);
          flex-wrap: wrap;
          gap: 20px;
        }
        .cg-eyebrow {
          display: flex;
          align-items: center;
          gap: 10px;
          font-family: 'DM Sans', sans-serif;
          font-size: 10px;
          font-weight: 500;
          letter-spacing: 0.25em;
          text-transform: uppercase;
          color: #B5502B;
          margin-bottom: 14px;
        }
        .cg-eyebrow::before {
          content: '';
          width: 24px; height: 1px;
          background: #B5502B;
          display: block;
        }
        .cg-title {
          font-family: 'Playfair Display', Georgia, serif;
          font-size: clamp(40px, 5.5vw, 72px);
          font-weight: 400;
          color: #1C1612;
          line-height: 0.94;
          letter-spacing: -0.02em;
        }
        .cg-title em {
          font-style: italic;
          color: #B5502B;
        }
        .cg-cta {
          display: inline-flex;
          align-items: center;
          gap: 8px;
          font-family: 'DM Sans', sans-serif;
          font-size: 10px;
          font-weight: 500;
          letter-spacing: 0.2em;
          text-transform: uppercase;
          color: #1C1612;
          padding: 13px 26px;
          border: 1px solid #1C1612;
          position: relative;
          overflow: hidden;
          transition: color 0.35s ease;
          white-space: nowrap;
          text-decoration: none;
        }
        .cg-cta::before {
          content: '';
          position: absolute; inset: 0;
          background: #1C1612;
          transform: scaleX(0);
          transform-origin: left;
          transition: transform 0.4s cubic-bezier(0.76,0,0.24,1);
        }
        .cg-cta:hover::before { transform: scaleX(1); }
        .cg-cta:hover { color: #F9F5EE; }
        .cg-cta span { position: relative; z-index: 1; display: flex; align-items: center; gap: 8px; }

        /* ─────────────────────────────────────────
           DESKTOP GRID  (≥ 1025px)
           Layout:
             [ hero tall ] [ col2 top ] [ col3 top  ]
             [ hero tall ] [ col2 bot ] [ col3 bot  ]
             [      banner — full width             ]
        ───────────────────────────────────────── */
        .cg-grid {
          display: grid;
          grid-template-columns: 1.2fr 0.9fr 0.9fr;
          grid-template-rows: 1fr 1fr auto;
          gap: 6px;
        }

        /* card 1 — hero, spans 2 rows */
        .cg-card-1 { grid-column: 1; grid-row: 1 / 3; }
        /* cards 2–5 fill the 2×2 right block */
        .cg-card-2 { grid-column: 2; grid-row: 1; }
        .cg-card-3 { grid-column: 3; grid-row: 1; }
        .cg-card-4 { grid-column: 2; grid-row: 2; }
        .cg-card-5 { grid-column: 3; grid-row: 2; }
        /* card 6 — wide banner */
        .cg-card-6 { grid-column: 1 / -1; grid-row: 3; height: 160px; }

        /* shared card base */
        .cg-card {
          display: block;
          position: relative;
          overflow: hidden;
          background: #EDE3D0;
          text-decoration: none;
          opacity: 0;
          transform: translateY(20px);
          transition:
            opacity 0.7s cubic-bezier(0.25,0.46,0.45,0.94),
            transform 0.7s cubic-bezier(0.25,0.46,0.45,0.94),
            box-shadow 0.35s ease;
        }
        .cg-card.vis { opacity: 1; transform: translateY(0); }

        .cg-card-1 { transition-delay: 0.04s; }
        .cg-card-2 { transition-delay: 0.10s; }
        .cg-card-3 { transition-delay: 0.16s; }
        .cg-card-4 { transition-delay: 0.22s; }
        .cg-card-5 { transition-delay: 0.28s; }
        .cg-card-6 { transition-delay: 0.34s; }

        .cg-card:hover { box-shadow: 0 14px 44px rgba(28,22,18,0.14); z-index: 2; }

        /* aspect ratios for desktop */
        @media (min-width: 1025px) {
          .cg-card-1 { aspect-ratio: unset; } /* height comes from grid rows */
          .cg-card-2,
          .cg-card-3,
          .cg-card-4,
          .cg-card-5 { aspect-ratio: 4/3; }
        }

        /* ── IMAGES ── */
        /* 
          The trick: we use two <img> tags per card.
          .cg-img-desk  — shown on desktop, hidden on mobile
          .cg-img-mob   — shown on mobile, hidden on desktop
          This is more reliable than <picture> + srcSet which can be
          overridden by browser caching or DPR decisions.
        */
        .cg-img-desk,
        .cg-img-mob {
          position: absolute;
          inset: 0;
          width: 100%; height: 100%;
          object-fit: cover;
          transition: transform 0.85s cubic-bezier(0.25,0.46,0.45,0.94), opacity 0.5s ease;
          transform: scale(1.05);
          opacity: 0.82;
        }
        /* desktop: show desk image, hide mobile image */
        @media (min-width: 769px) {
          .cg-img-desk { display: block; }
          .cg-img-mob  { display: none; }
        }
        /* mobile: show mobile image, hide desktop image */
        @media (max-width: 768px) {
          .cg-img-desk { display: none; }
          .cg-img-mob  { display: block; }
        }
        .cg-card:hover .cg-img-desk,
        .cg-card:hover .cg-img-mob {
          transform: scale(1.0);
          opacity: 0.92;
        }

        /* ── OVERLAY ── */
        .cg-veil {
          position: absolute; inset: 0;
          background: linear-gradient(
            160deg,
            rgba(249,245,238,0) 40%,
            rgba(28,22,18,0.65) 100%
          );
          transition: background 0.4s ease;
        }
        /* banner card gets a side-gradient */
        .cg-card-6 .cg-veil {
          background: linear-gradient(
            to right,
            rgba(28,22,18,0.70) 0%,
            rgba(28,22,18,0.10) 55%
          );
        }
        .cg-card:hover .cg-veil {
          background: linear-gradient(
            160deg,
            rgba(249,245,238,0) 28%,
            rgba(28,22,18,0.80) 100%
          );
        }
        .cg-card-6:hover .cg-veil {
          background: linear-gradient(
            to right,
            rgba(28,22,18,0.82) 0%,
            rgba(28,22,18,0.18) 55%
          );
        }

        /* terracotta top-border reveal */
        .cg-line {
          position: absolute;
          top: 0; left: 0; right: 0;
          height: 2px;
          background: #B5502B;
          transform: scaleX(0);
          transform-origin: left;
          transition: transform 0.5s cubic-bezier(0.25,0.46,0.45,0.94);
        }
        .cg-card:hover .cg-line { transform: scaleX(1); }

        /* arrow badge */
        .cg-badge {
          position: absolute;
          top: 14px; right: 14px;
          width: 32px; height: 32px;
          background: #F9F5EE;
          display: flex;
          align-items: center;
          justify-content: center;
          color: #1C1612;
          opacity: 0;
          transform: translateY(-8px) scale(0.85);
          transition: opacity 0.3s ease 0.05s, transform 0.3s cubic-bezier(0.25,0.46,0.45,0.94) 0.05s;
        }
        .cg-card:hover .cg-badge { opacity: 1; transform: translateY(0) scale(1); }

        /* ── TEXT ── */
        .cg-txt {
          position: absolute;
          bottom: 0; left: 0; right: 0;
          padding: clamp(14px, 2vw, 22px);
          transform: translateY(4px);
          transition: transform 0.45s cubic-bezier(0.25,0.46,0.45,0.94);
        }
        /* banner text sits on the left, vertically centred */
        .cg-card-6 .cg-txt {
          top: 0;
          display: flex;
          flex-direction: column;
          justify-content: center;
          padding: clamp(16px, 3vw, 32px);
          transform: none;
        }
        .cg-card:hover .cg-txt { transform: translateY(0); }
        .cg-card-6:hover .cg-txt { transform: none; }

        .cg-num {
          display: block;
          font-family: 'DM Sans', sans-serif;
          font-size: 9px;
          letter-spacing: 0.3em;
          color: #B5502B;
          margin-bottom: 5px;
        }
        .cg-name {
          font-family: 'Playfair Display', Georgia, serif;
          font-size: clamp(18px, 2.2vw, 28px);
          font-weight: 400;
          color: #F9F5EE;
          line-height: 1.05;
          margin: 0 0 4px;
        }
        .cg-sub {
          font-family: 'DM Sans', sans-serif;
          font-size: 8px;
          letter-spacing: 0.2em;
          text-transform: uppercase;
          color: rgba(249,245,238,0.5);
          margin: 0;
        }

        /* ─────────────────────────────────────────
           TABLET  (768px – 1024px)
           2-column, each card equal
        ───────────────────────────────────────── */
        @media (max-width: 1024px) and (min-width: 769px) {
          .cg-grid {
            grid-template-columns: 1fr 1fr;
            grid-template-rows: none;
            gap: 5px;
          }
          .cg-card-1,
          .cg-card-2,
          .cg-card-3,
          .cg-card-4,
          .cg-card-5 {
            grid-column: auto;
            grid-row: auto;
            aspect-ratio: 4/5;
          }
          /* card 6 banner spans full width */
          .cg-card-6 {
            grid-column: 1 / -1;
            grid-row: auto;
            height: 140px;
          }
          .cg-badge { display: none; }
        }

        /* ─────────────────────────────────────────
           MOBILE  (≤ 768px)
           2-column grid, card 6 full-width at bottom
        ───────────────────────────────────────── */
        @media (max-width: 768px) {
          .cg-section {
            padding: 48px 16px;
          }
          .cg-grid {
            grid-template-columns: 1fr 1fr;
            grid-template-rows: none;
            gap: 4px;
          }
          .cg-card-1,
          .cg-card-2,
          .cg-card-3,
          .cg-card-4,
          .cg-card-5 {
            grid-column: auto;
            grid-row: auto;
            aspect-ratio: 3/4;
          }
          .cg-card-6 {
            grid-column: 1 / -1;
            grid-row: auto;
            height: 130px;
          }
          .cg-badge { display: none; }
          .cg-name { font-size: 18px; }
        }

        @media (max-width: 400px) {
          .cg-card-1,
          .cg-card-2,
          .cg-card-3,
          .cg-card-4,
          .cg-card-5 { aspect-ratio: 3/4; }
          .cg-card-6 { height: 110px; }
        }
      `}</style>

      <section className="cg-section" ref={sectionRef}>
        <div className="cg-header">
          <div>
            <p className="cg-eyebrow">Explore By Weave</p>
            <h2 className="cg-title">Six Ancient<br /><em>Traditions</em></h2>
          </div>
          <Link to="/shop" className="cg-cta">
            <span>View All Collections <ArrowUpRight size={13} /></span>
          </Link>
        </div>

        <div className="cg-grid">
          {categories.map((cat, i) => (
            <Link
              key={i}
              to={`/shop?weave=${cat.slug}`}
              className={`cg-card cg-card-${i + 1}${visible ? ' vis' : ''}`}
            >
              {/* Desktop image — hidden on mobile via CSS */}
              <img
                className="cg-img-desk"
                src={cat.image}
                alt={cat.label}
                loading={i === 0 ? 'eager' : 'lazy'}
              />
              {/* Mobile image — hidden on desktop via CSS */}
              <img
                className="cg-img-mob"
                src={cat.mobileImage}
                alt={cat.label}
                loading="lazy"
              />

              <div className="cg-veil" />
              <div className="cg-line" />
              <div className="cg-badge"><ArrowUpRight size={13} /></div>

              <div className="cg-txt">
                <span className="cg-num">{cat.num}</span>
                <h3 className="cg-name">{cat.label}</h3>
                <p className="cg-sub">{cat.sub}</p>
              </div>
            </Link>
          ))}
        </div>
      </section>
    </>
  );
};

export default CategoryGrid;