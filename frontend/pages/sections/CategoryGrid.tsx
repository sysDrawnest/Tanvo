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
        .cg2-section {
          padding: clamp(64px, 9vw, 120px) clamp(20px, 6vw, 88px);
          background: #F9F5EE;
          position: relative;
          overflow: hidden;
        }
        /* Warm radial glow, top-right */
        .cg2-section::after {
          content: '';
          position: absolute;
          top: -80px; right: -80px;
          width: 480px; height: 480px;
          border-radius: 50%;
          background: radial-gradient(circle, rgba(181,80,43,0.06) 0%, transparent 70%);
          pointer-events: none;
        }

        /* ── HEADER ── */
        .cg2-header {
          display: flex;
          justify-content: space-between;
          align-items: flex-end;
          margin-bottom: clamp(36px, 5vw, 60px);
          flex-wrap: wrap;
          gap: 20px;
          position: relative;
          z-index: 1;
        }
        .cg2-eyebrow {
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
        .cg2-eyebrow::before {
          content: '';
          width: 24px; height: 1px;
          background: #B5502B;
          display: block;
        }
        .cg2-title {
          font-family: 'Playfair Display', Georgia, serif;
          font-size: clamp(40px, 5.5vw, 72px);
          font-weight: 400;
          color: #1C1612;
          line-height: 0.94;
          letter-spacing: -0.02em;
        }
        .cg2-title em {
          font-style: italic;
          color: #B5502B;
        }
        .cg2-cta {
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
          transition: color 0.35s ease, border-color 0.35s ease;
          white-space: nowrap;
        }
        .cg2-cta::before {
          content: '';
          position: absolute; inset: 0;
          background: #1C1612;
          transform: scaleX(0);
          transform-origin: left;
          transition: transform 0.4s cubic-bezier(0.76,0,0.24,1);
        }
        .cg2-cta:hover::before { transform: scaleX(1); }
        .cg2-cta:hover { color: #F9F5EE; }
        .cg2-cta span { position: relative; z-index: 1; display: flex; align-items: center; gap: 8px; }

        /* ── GRID ── */
        .cg2-grid {
          display: grid;
          grid-template-columns: 1.15fr 0.85fr 1fr;
          grid-template-rows: auto auto;
          gap: 4px;
          position: relative;
          z-index: 1;
        }

        /* ── CARD ── */
        .cg2-card {
          display: block;
          position: relative;
          overflow: hidden;
          background: #EDE3D0;
          text-decoration: none;
          opacity: 0;
          transform: translateY(24px);
          transition:
            opacity 0.72s cubic-bezier(0.25,0.46,0.45,0.94),
            transform 0.72s cubic-bezier(0.25,0.46,0.45,0.94),
            box-shadow 0.4s ease;
        }
        .cg2-card.vis { opacity: 1; transform: translateY(0); }
        .cg2-card:nth-child(1) { transition-delay: 0.04s; aspect-ratio: 3/4; }
        .cg2-card:nth-child(2) { transition-delay: 0.13s; aspect-ratio: 4/5; align-self: end; }
        .cg2-card:nth-child(3) { transition-delay: 0.08s; grid-row: 1/3; }
        .cg2-card:nth-child(4) { transition-delay: 0.20s; aspect-ratio: 4/3; }
        .cg2-card:nth-child(5) { transition-delay: 0.26s; aspect-ratio: 4/3; }
        .cg2-card:nth-child(6) { display: none; }

        .cg2-card:hover {
          box-shadow: 0 16px 48px rgba(28,22,18,0.13);
          z-index: 2;
        }

        /* Image */
        .cg2-img {
          width: 100%; height: 100%;
          object-fit: cover;
          display: block;
          opacity: 0.86;
          transition: transform 0.85s cubic-bezier(0.25,0.46,0.45,0.94), opacity 0.5s ease;
          transform: scale(1.05);
        }
        .cg2-card:hover .cg2-img, 
        .cg2-card:hover .cg2-img img { transform: scale(1.0); opacity: 0.94; }

        .cg2-img-strip {
             width: 100%; height: 100%;
             display: block;
        }
        .cg2-img-strip img {
            width: 100%; height: 100%;
            object-fit: cover;
            opacity: 0.78;
            transition: transform 0.85s ease, opacity 0.5s ease;
            transform: scale(1.04);
        }
        .cg2-strip:hover .cg2-img-strip img { opacity: 0.9; transform: scale(1.0); }

        /* Gradient — warm, not cold */
        .cg2-veil {
          position: absolute; inset: 0;
          background: linear-gradient(
            165deg,
            rgba(249,245,238,0) 45%,
            rgba(28,22,18,0.62) 100%
          );
          transition: background 0.45s ease;
        }
        .cg2-card:hover .cg2-veil {
          background: linear-gradient(
            165deg,
            rgba(249,245,238,0) 35%,
            rgba(28,22,18,0.76) 100%
          );
        }

        /* Terracotta top-border reveal */
        .cg2-line {
          position: absolute;
          top: 0; left: 0; right: 0;
          height: 2px;
          background: #B5502B;
          transform: scaleX(0);
          transform-origin: left;
          transition: transform 0.5s cubic-bezier(0.25,0.46,0.45,0.94);
        }
        .cg2-card:hover .cg2-line { transform: scaleX(1); }

        /* Arrow badge */
        .cg2-badge {
          position: absolute;
          top: 14px; right: 14px;
          width: 34px; height: 34px;
          background: #F9F5EE;
          display: flex;
          align-items: center;
          justify-content: center;
          color: #1C1612;
          opacity: 0;
          transform: translateY(-8px) scale(0.85);
          transition: opacity 0.35s ease 0.05s, transform 0.35s cubic-bezier(0.25,0.46,0.45,0.94) 0.05s;
        }
        .cg2-card:hover .cg2-badge { opacity: 1; transform: translateY(0) scale(1); }

        /* Text */
        .cg2-txt {
          position: absolute;
          bottom: 0; left: 0; right: 0;
          padding: clamp(14px, 2vw, 22px);
          transform: translateY(5px);
          transition: transform 0.5s cubic-bezier(0.25,0.46,0.45,0.94);
        }
        .cg2-card:hover .cg2-txt { transform: translateY(0); }

        .cg2-num {
          display: block;
          font-family: 'DM Sans', sans-serif;
          font-size: 9px;
          letter-spacing: 0.3em;
          color: #B5502B;
          margin-bottom: 5px;
        }
        .cg2-name {
          font-family: 'Playfair Display', Georgia, serif;
          font-size: clamp(20px, 2.4vw, 30px);
          font-weight: 400;
          color: #F9F5EE;
          line-height: 1.05;
          margin-bottom: 4px;
        }
        .cg2-sub {
          font-family: 'DM Sans', sans-serif;
          font-size: 8px;
          letter-spacing: 0.2em;
          text-transform: uppercase;
          color: rgba(249,245,238,0.5);
        }

        /* ── STRIP (6th, desktop) ── */
        .cg2-strip {
          margin-top: 4px;
          position: relative;
          overflow: hidden;
          height: 150px;
          background: #EDE3D0;
          display: block;
          text-decoration: none;
          opacity: 0;
          transform: translateY(16px);
          transition: opacity 0.7s ease 0.3s, transform 0.7s ease 0.3s, box-shadow 0.4s ease;
        }
        .cg2-strip.vis { opacity: 1; transform: translateY(0); }
        .cg2-strip:hover { box-shadow: 0 8px 36px rgba(28,22,18,0.13); }
        .cg2-strip .cg2-veil {
          background: linear-gradient(to right, rgba(28,22,18,0.65) 0%, rgba(28,22,18,0.08) 60%);
        }
        .cg2-strip .cg2-line { transition: transform 0.5s ease; }
        .cg2-strip:hover .cg2-line { transform: scaleX(1); }
        .cg2-strip-inner {
          position: absolute;
          left: 22px; top: 50%;
          transform: translateY(-50%);
        }

        /* ── MOBILE ── */
        @media (max-width: 768px) {
          .cg2-grid {
            grid-template-columns: 1fr 1fr;
            grid-template-rows: auto;
            gap: 3px;
          }
          .cg2-card:nth-child(1) { aspect-ratio: 3/4; }
          .cg2-card:nth-child(2) { aspect-ratio: 3/4; align-self: auto; }
          .cg2-card:nth-child(3) { grid-column: 1/-1; grid-row: auto; aspect-ratio: 16/9; }
          .cg2-card:nth-child(4) { aspect-ratio: 3/4; }
          .cg2-card:nth-child(5) { aspect-ratio: 3/4; }
          .cg2-card:nth-child(6) { display: block; grid-column: 1/-1; aspect-ratio: 16/9; }
          .cg2-strip { display: none; }
          .cg2-badge { display: none; }
        }
        @media (max-width: 460px) {
          .cg2-grid { grid-template-columns: 1fr; }
          .cg2-card:nth-child(n) {
            aspect-ratio: 4/3 !important;
            grid-column: auto !important;
            grid-row: auto !important;
          }
        }
      `}</style>

      <section className="cg2-section" ref={sectionRef}>
        <div className="cg2-header">
          <div>
            <p className="cg2-eyebrow">Explore By Weave</p>
            <h2 className="cg2-title">Six Ancient<br /><em>Traditions</em></h2>
          </div>
          <Link to="/shop" className="cg2-cta">
            <span>View All Collections <ArrowUpRight size={13} /></span>
          </Link>
        </div>

        <div className="cg2-grid">
          {categories.slice(0, 5).map((cat, i) => (
            <Link key={i} to={`/shop?weave=${cat.slug}`} className={`cg2-card${visible ? ' vis' : ''}`}>
              <picture className="cg2-img">
                <source media="(max-width: 768px)" srcSet={cat.mobileImage} />
                <img src={cat.image} alt={cat.label} />
              </picture>
              <div className="cg2-veil" />
              <div className="cg2-line" />
              <div className="cg2-badge"><ArrowUpRight size={14} /></div>
              <div className="cg2-txt">
                <span className="cg2-num">{cat.num}</span>
                <h3 className="cg2-name">{cat.label}</h3>
                <p className="cg2-sub">{cat.sub}</p>
              </div>
            </Link>
          ))}
          {/* 6th — mobile only */}
          <Link to={`/shop?weave=${categories[5].slug}`} className={`cg2-card${visible ? ' vis' : ''}`}>
            <picture className="cg2-img">
              <source media="(max-width: 768px)" srcSet={categories[5].mobileImage} />
              <img src={categories[5].image} alt={categories[5].label} />
            </picture>
            <div className="cg2-veil" />
            <div className="cg2-line" />
            <div className="cg2-txt">
              <span className="cg2-num">{categories[5].num}</span>
              <h3 className="cg2-name">{categories[5].label}</h3>
              <p className="cg2-sub">{categories[5].sub}</p>
            </div>
          </Link>
        </div>

        {/* 6th — desktop strip */}
        <Link to={`/shop?weave=${categories[5].slug}`} className={`cg2-strip${visible ? ' vis' : ''}`}>
          <picture className="cg2-img-strip">
            <source media="(max-width: 768px)" srcSet={categories[5].mobileImage} />
            <img src={categories[5].image} alt={categories[5].label} />
          </picture>
          <div className="cg2-veil" />
          <div className="cg2-line" />
          <div className="cg2-strip-inner">
            <span className="cg2-num">{categories[5].num}</span>
            <h3 className="cg2-name">{categories[5].label}</h3>
            <p className="cg2-sub">{categories[5].sub}</p>
          </div>
        </Link>
      </section>
    </>
  );
};

export default CategoryGrid;