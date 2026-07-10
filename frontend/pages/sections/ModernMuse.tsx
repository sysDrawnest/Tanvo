import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';

const ModernMuse: React.FC = () => {
  return (
    <section
      className="relative overflow-hidden"
      style={{
        minHeight: '520px',
        height: 'clamp(480px, 55vw, 640px)',
        background: '#1a0e08',
      }}
    >
      {/* ── Background: woman's photo ── */}
      <div className="absolute inset-0">
        <motion.img
          src="/IMG202606240805.jpeg"
          alt="TANVO Modern Muse Editorial"
          className="w-full h-full"
          style={{ objectFit: 'cover', objectPosition: 'center 20%' }}
          initial={{ scale: 1.08, opacity: 0 }}
          whileInView={{ scale: 1, opacity: 1 }}
          transition={{ duration: 2.2, ease: [0.16, 1, 0.3, 1] }}
          viewport={{ once: true }}
        />

        {/* Bottom-up dark vignette for card legibility */}
        <div
          className="absolute inset-0"
          style={{
            background:
              'linear-gradient(to top, rgba(10,6,3,0.82) 0%, rgba(10,6,3,0.45) 40%, rgba(10,6,3,0.1) 70%, transparent 100%)',
          }}
        />
        {/* Left-side soft fade */}
        <div
          className="absolute inset-0"
          style={{
            background:
              'linear-gradient(to right, rgba(10,6,3,0.35) 0%, transparent 50%)',
          }}
        />
      </div>

      {/* ── Floating silk fabric (top-left, decorative) ── */}
      <div
        className="absolute pointer-events-none"
        style={{
          bottom: '-5%',
          left: '-5%',
          width: '55%',
          zIndex: 3,
          opacity: 0.65,
          transform: 'rotate(8deg) scaleX(-1)',
          mixBlendMode: 'screen',
        }}
      >
        <motion.img
          src="/flowing-silk-fabric.png"
          alt=""
          aria-hidden="true"
          className="w-full"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 0.65 }}
          transition={{ delay: 0.4, duration: 1.2 }}
          viewport={{ once: true }}
          style={{ filter: 'saturate(1.15) brightness(1.05)' }}
        />
      </div>

      {/* ── Main content ── */}
      <div className="absolute inset-0 flex items-end justify-center" style={{ zIndex: 10 }}>
        <div
          className="w-full"
          style={{ padding: 'clamp(24px, 5vw, 60px) clamp(20px, 6vw, 80px) clamp(32px, 5vw, 64px)' }}
        >
          <div className="flex flex-col items-center">

            {/* ── Glassmorphism editorial card ── */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 1.0, ease: [0.16, 1, 0.3, 1] }}
              viewport={{ once: true }}
              style={{
                background: 'rgba(14, 8, 4, 0.52)',
                backdropFilter: 'blur(20px)',
                WebkitBackdropFilter: 'blur(20px)',
                border: '1px solid rgba(255, 255, 255, 0.1)',
                borderRadius: '12px',
                padding: 'clamp(28px, 3.5vw, 48px) clamp(32px, 5vw, 72px)',
                maxWidth: '560px',
                width: '100%',
                textAlign: 'center',
                marginBottom: '24px',
              }}
            >
              {/* Eyebrow */}
              <motion.p
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2, duration: 0.8 }}
                viewport={{ once: true }}
                style={{
                  fontFamily: "'Inter', sans-serif",
                  fontSize: '10px',
                  fontWeight: 600,
                  letterSpacing: '0.3em',
                  textTransform: 'uppercase',
                  color: 'rgba(240, 224, 200, 0.65)',
                  marginBottom: '16px',
                }}
              >
                Tanvo Presents
              </motion.p>

              {/* Main heading */}
              <motion.h2
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.35, duration: 1.0 }}
                viewport={{ once: true }}
                style={{
                  fontFamily: "'Playfair Display', serif",
                  fontSize: 'clamp(38px, 6vw, 80px)',
                  fontWeight: 500,
                  color: '#FFFFFF',
                  lineHeight: 1.0,
                  letterSpacing: '0.01em',
                  textTransform: 'uppercase',
                  marginBottom: '18px',
                  textShadow: '0 2px 24px rgba(0,0,0,0.45)',
                }}
              >
                The Modern<br />Muse
              </motion.h2>

              {/* Description */}
              <motion.p
                initial={{ opacity: 0, y: 12 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5, duration: 0.9 }}
                viewport={{ once: true }}
                style={{
                  fontFamily: "'Raleway', sans-serif",
                  fontSize: 'clamp(12px, 1.5vw, 15px)',
                  fontWeight: 300,
                  color: 'rgba(240, 224, 200, 0.82)',
                  lineHeight: 1.65,
                  marginBottom: '28px',
                  maxWidth: '420px',
                  marginLeft: 'auto',
                  marginRight: 'auto',
                }}
              >
                Where heritage weaving meets contemporary elegance.
                <br className="hidden sm:block" />
                A curated dialogue between ancestral craft and modern silhouette.
              </motion.p>

              {/* CTA button */}
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.65, duration: 0.8 }}
                viewport={{ once: true }}
                className="flex justify-center"
              >
                <Link
                  to="/shop?style=Modern,Designer"
                  className="group relative inline-flex items-center gap-2 overflow-hidden"
                  style={{
                    background: '#780000',
                    color: '#FFFFFF',
                    fontFamily: "'Inter', sans-serif",
                    fontSize: '11px',
                    fontWeight: 600,
                    letterSpacing: '0.2em',
                    textTransform: 'uppercase',
                    padding: '14px 28px',
                    borderRadius: '6px',
                    textDecoration: 'none',
                    transition: 'background 0.35s ease, box-shadow 0.35s ease',
                    boxShadow: '0 4px 20px rgba(120, 0, 0, 0.4)',
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.background = '#5a0000';
                    e.currentTarget.style.boxShadow = '0 6px 28px rgba(120,0,0,0.55)';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.background = '#780000';
                    e.currentTarget.style.boxShadow = '0 4px 20px rgba(120,0,0,0.4)';
                  }}
                >
                  {/* Shine sweep */}
                  <span
                    className="absolute inset-0 -translate-x-full group-hover:translate-x-full"
                    style={{
                      background: 'linear-gradient(90deg, transparent, rgba(255,255,255,0.12), transparent)',
                      transform: 'skewX(-12deg)',
                      transition: 'transform 0.6s ease',
                    }}
                  />
                  <span className="relative z-10">Explore Collection</span>
                  <ArrowRight
                    size={14}
                    className="relative z-10 group-hover:translate-x-1 transition-transform duration-300"
                  />
                </Link>
              </motion.div>
            </motion.div>
          </div>
        </div>
      </div>

      {/* ── Right edge: vertical brand tagline ── */}
      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ delay: 0.8, duration: 1 }}
        viewport={{ once: true }}
        className="absolute hidden lg:flex items-center"
        style={{
          right: '20px',
          top: '50%',
          transform: 'translateY(-50%)',
          zIndex: 20,
        }}
      >
        <p
          style={{
            fontFamily: "'Cinzel', serif",
            fontSize: '9px',
            fontWeight: 500,
            letterSpacing: '0.35em',
            textTransform: 'uppercase',
            color: 'rgba(240, 224, 200, 0.45)',
            writingMode: 'vertical-lr',
            transform: 'rotate(180deg)',
          }}
        >
          Tradition · Craft · Soul
        </p>
      </motion.div>

      {/* ── Bottom-right: "Est. 2024" script ── */}
      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ delay: 1.0, duration: 1 }}
        viewport={{ once: true }}
        className="absolute hidden sm:block"
        style={{
          bottom: 'clamp(16px, 2.5vw, 28px)',
          right: 'clamp(36px, 4vw, 56px)',
          zIndex: 20,
        }}
      >
        <span
          style={{
            fontFamily: "'Playfair Display', serif",
            fontStyle: 'italic',
            fontSize: 'clamp(18px, 2vw, 26px)',
            fontWeight: 400,
            color: 'rgba(240, 224, 200, 0.5)',
            letterSpacing: '0.02em',
          }}
        >
          Est. 2024
        </span>
      </motion.div>
    </section>
  );
};

export default ModernMuse;