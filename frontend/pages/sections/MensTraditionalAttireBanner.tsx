import React from 'react';
import { Link } from 'react-router-dom';

// ── Thumbnail detail shots (replace with final photography assets) ──
// See image-prompts.md for generation instructions.
const THUMBNAILS = [
  { src: '/mens-thumbnails-grid.png', alt: 'Handloom weave close-up',    style: { objectPosition: '0% 0%',   objectFit: 'cover' as const } },
  { src: '/mens-thumbnails-grid.png', alt: 'Silk thread roll',            style: { objectPosition: '100% 0%',  objectFit: 'cover' as const } },
  { src: '/mens-thumbnails-grid.png', alt: 'Garment fabric detail',       style: { objectPosition: '0% 100%', objectFit: 'cover' as const } },
  { src: '/mens-thumbnails-grid.png', alt: 'Draped silk fabric detail',   style: { objectPosition: '100% 100%', objectFit: 'cover' as const } },
];

const MensTraditionalAttireBanner: React.FC = () => {
  return (
    <section
      className="relative overflow-hidden"
      style={{
        background: '#1a0e08',
        minHeight: '580px',
        height: 'clamp(520px, 60vw, 680px)',
      }}
    >
      {/* ── Background: Man's portrait (right-anchored) ── */}
      <div className="absolute inset-0">
        <img
          src="/Mens Collection Banner.png"
          alt="Men's Traditional Collection"
          className="absolute top-0 right-0 h-full"
          style={{
            width: '68%',
            objectFit: 'cover',
            objectPosition: 'center top',
          }}
        />
        {/* Left fade so the glass card reads cleanly */}
        <div
          className="absolute inset-0"
          style={{
            background:
              'linear-gradient(to right, rgba(18,10,5,1) 20%, rgba(18,10,5,0.72) 48%, rgba(18,10,5,0.1) 75%, transparent 100%)',
          }}
        />
        {/* Subtle top/bottom vignette */}
        <div
          className="absolute inset-0"
          style={{
            background:
              'linear-gradient(to bottom, rgba(18,10,5,0.5) 0%, transparent 25%, transparent 70%, rgba(18,10,5,0.6) 100%)',
          }}
        />
      </div>

      {/* ── Floating silk fabric (decorative placeholder) ── */}
      <div
        className="absolute pointer-events-none"
        style={{
          bottom: '-8%',
          left: '12%',
          width: '72%',
          zIndex: 3,
          opacity: 0.78,
          transform: 'rotate(-3deg)',
          mixBlendMode: 'screen',
        }}
      >
        <img
          src="/flowing-silk-fabric.png"
          alt=""
          aria-hidden="true"
          className="w-full"
          style={{ filter: 'saturate(1.2) brightness(1.05)' }}
        />
      </div>

      {/* ── Main content layer ── */}
      <div
        className="relative h-full flex items-center"
        style={{ zIndex: 10, padding: '0 clamp(24px, 5vw, 80px)' }}
      >
        {/* ── LEFT: Glassmorphism editorial card ── */}
        <div
          className="flex-shrink-0"
          style={{
            background: 'rgba(14, 9, 5, 0.68)',
            backdropFilter: 'blur(18px)',
            WebkitBackdropFilter: 'blur(18px)',
            border: '1px solid rgba(255, 255, 255, 0.1)',
            borderRadius: '12px',
            padding: 'clamp(28px, 3.5vw, 44px) clamp(24px, 3vw, 40px)',
            maxWidth: '420px',
            width: '100%',
          }}
        >
          {/* Eyebrow label */}
          <p
            style={{
              fontFamily: "'Inter', sans-serif",
              fontSize: '10px',
              fontWeight: 600,
              letterSpacing: '0.28em',
              textTransform: 'uppercase',
              color: 'rgba(245, 236, 220, 0.55)',
              marginBottom: '18px',
            }}
          >
            Handloom Collection
          </p>

          {/* Main heading */}
          <h2
            style={{
              fontFamily: "'Playfair Display', serif",
              fontSize: 'clamp(42px, 5.5vw, 74px)',
              fontWeight: 400,
              color: '#F5ECD8',
              lineHeight: 1.0,
              letterSpacing: '-0.025em',
              marginBottom: '18px',
            }}
          >
            Men's<br />Traditional
          </h2>

          {/* Description */}
          <p
            style={{
              fontFamily: "'Raleway', sans-serif",
              fontSize: '13px',
              fontWeight: 300,
              color: 'rgba(240, 228, 210, 0.65)',
              lineHeight: 1.65,
              marginBottom: '32px',
              maxWidth: '260px',
            }}
          >
            Discover the latest masterpieces from our looms.
          </p>

          {/* CTA */}
          <Link
            to="/shop?sort=-createdAt"
            className="group"
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '10px',
              border: '1px solid rgba(240, 228, 210, 0.5)',
              color: '#F5ECD8',
              fontFamily: "'Inter', sans-serif",
              fontSize: '10px',
              fontWeight: 600,
              letterSpacing: '0.22em',
              textTransform: 'uppercase',
              padding: '12px 24px',
              textDecoration: 'none',
              borderRadius: '6px',
              transition: 'all 0.35s ease',
              background: 'transparent',
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.background = 'rgba(240, 228, 210, 0.92)';
              e.currentTarget.style.color = '#1a0e08';
              e.currentTarget.style.borderColor = 'rgba(240, 228, 210, 0.92)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.background = 'transparent';
              e.currentTarget.style.color = '#F5ECD8';
              e.currentTarget.style.borderColor = 'rgba(240, 228, 210, 0.5)';
            }}
          >
            Shop Now
          </Link>
        </div>
      </div>

      {/* ── RIGHT: 2×2 thumbnail grid (bottom-right corner) ── */}
      <div
        className="absolute"
        style={{
          bottom: 'clamp(16px, 3vw, 28px)',
          right: 'clamp(16px, 3vw, 28px)',
          zIndex: 20,
          display: 'grid',
          gridTemplateColumns: '1fr 1fr',
          gap: '6px',
          width: 'clamp(180px, 20vw, 234px)',
        }}
      >
        {THUMBNAILS.map((thumb, i) => (
          <div
            key={i}
            style={{
              width: '100%',
              aspectRatio: '1 / 1',
              overflow: 'hidden',
              borderRadius: '5px',
              background: '#2a1508',
              boxShadow: '0 4px 16px rgba(0,0,0,0.5)',
            }}
          >
            <img
              src={thumb.src}
              alt={thumb.alt}
              style={{
                width: '200%',       /* show only one quadrant of the grid image */
                height: '200%',
                ...thumb.style,
              }}
            />
          </div>
        ))}
      </div>

      {/* ── Responsive styles ── */}
      <style>{`
        @media (max-width: 640px) {
          .mens-banner-card {
            max-width: 100% !important;
            border-radius: 10px !important;
          }
        }
      `}</style>
    </section>
  );
};

export default MensTraditionalAttireBanner;