import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';

const ModernMuse: React.FC = () => {
    return (
        <section style={{ position: 'relative', width: '100%', overflow: 'hidden', minHeight: '620px' }}>

            {/* Background: Full-bleed woman portrait */}
            <div style={{ position: 'absolute', inset: 0 }}>
                <motion.img
                    initial={{ scale: 1.12, opacity: 0 }}
                    whileInView={{ scale: 1, opacity: 1 }}
                    transition={{ duration: 2, ease: [0.16, 1, 0.3, 1] }}
                    viewport={{ once: true }}
                    src="/IMG202606240805.jpeg"
                    alt="TANVO Modern Muse"
                    style={{ width: '100%', height: '100%', objectFit: 'cover', objectPosition: 'center' }}
                />
                {/* Gradient overlays */}
                <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to top, rgba(0,0,0,0.75) 0%, rgba(0,0,0,0.3) 50%, rgba(0,0,0,0.1) 100%)' }} />
                <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to right, rgba(0,0,0,0.15) 0%, transparent 60%)' }} />
            </div>

            {/* Right: Vertical brand text */}
            <motion.div
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                transition={{ delay: 0.9, duration: 1 }}
                viewport={{ once: true }}
                style={{
                    position: 'absolute',
                    top: '50%',
                    right: '28px',
                    transform: 'translateY(-50%)',
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    gap: '8px',
                    zIndex: 20,
                }}
                className="hidden-mobile-muse"
            >
                <div style={{ width: '1px', height: '48px', background: 'rgba(255,255,255,0.25)' }} />
                <p style={{
                    fontFamily: "'Playfair Display', serif",
                    fontSize: '9px',
                    letterSpacing: '0.45em',
                    textTransform: 'uppercase',
                    color: 'rgba(255,255,255,0.55)',
                    writingMode: 'vertical-lr',
                }}>
                    MOTION | CRAFT | SOUL
                </p>
                <div style={{ width: '1px', height: '48px', background: 'rgba(255,255,255,0.25)' }} />
            </motion.div>

            {/* Bottom-right: Est. 2024 script */}
            <motion.div
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                transition={{ delay: 1.1, duration: 1 }}
                viewport={{ once: true }}
                style={{
                    position: 'absolute',
                    bottom: '32px',
                    right: '56px',
                    zIndex: 20,
                }}
                className="hidden-mobile-muse"
            >
                <span style={{
                    fontFamily: "'Playfair Display', serif",
                    fontStyle: 'italic',
                    fontSize: '22px',
                    fontWeight: 400,
                    color: 'rgba(255,255,255,0.6)',
                    letterSpacing: '0.02em',
                }}>
                    Est. 2024
                </span>
            </motion.div>

            {/* Center: Glassmorphism content card */}
            <div style={{
                position: 'relative',
                zIndex: 10,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                minHeight: '620px',
                padding: '60px 24px',
            }}>
                <div style={{ maxWidth: '640px', width: '100%', textAlign: 'center' }}>

                    {/* Glass Card */}
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.2, duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
                        viewport={{ once: true }}
                        style={{
                            padding: '44px 48px 40px',
                            borderRadius: '16px',
                            background: 'rgba(20, 14, 10, 0.45)',
                            backdropFilter: 'blur(20px)',
                            WebkitBackdropFilter: 'blur(20px)',
                            border: '1px solid rgba(255,255,255,0.12)',
                            marginBottom: '28px',
                        }}
                    >
                        {/* Label */}
                        <motion.span
                            initial={{ opacity: 0, y: 12 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.3, duration: 0.8 }}
                            viewport={{ once: true }}
                            style={{
                                display: 'block',
                                fontFamily: "'Raleway', sans-serif",
                                fontSize: '10px',
                                fontWeight: 600,
                                letterSpacing: '0.35em',
                                textTransform: 'uppercase',
                                color: 'rgba(255,255,255,0.65)',
                                marginBottom: '20px',
                            }}
                        >
                            TANVO PRESENTS
                        </motion.span>

                        {/* Main heading */}
                        <motion.h2
                            initial={{ opacity: 0, y: 16 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.42, duration: 0.9 }}
                            viewport={{ once: true }}
                            style={{
                                fontFamily: "'Playfair Display', serif",
                                fontSize: 'clamp(46px, 8vw, 88px)',
                                fontWeight: 700,
                                color: '#FFFFFF',
                                lineHeight: 1.0,
                                letterSpacing: '-0.01em',
                                textTransform: 'uppercase',
                                margin: '0 0 22px 0',
                            }}
                        >
                            THE MODERN<br />MUSE
                        </motion.h2>

                        {/* Description */}
                        <motion.p
                            initial={{ opacity: 0, y: 12 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.54, duration: 0.9 }}
                            viewport={{ once: true }}
                            style={{
                                fontFamily: "'Raleway', sans-serif",
                                fontSize: '14px',
                                fontWeight: 300,
                                color: 'rgba(255,255,255,0.82)',
                                lineHeight: 1.65,
                                margin: 0,
                            }}
                        >
                            Where heritage weaving meets contemporary elegance.{' '}
                            <br className="hidden-mobile-muse" />
                            A curated dialogue between ancestral craft and modern silhouette.
                        </motion.p>
                    </motion.div>

                    {/* CTA Button — outside glass card */}
                    <motion.div
                        initial={{ opacity: 0, y: 14 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.66, duration: 0.9 }}
                        viewport={{ once: true }}
                    >
                        <Link
                            to="/shop?style=Modern,Designer"
                            className="modern-muse-cta"
                            style={{
                                display: 'inline-flex',
                                alignItems: 'center',
                                gap: '10px',
                                fontFamily: "'Raleway', sans-serif",
                                fontSize: '11px',
                                fontWeight: 700,
                                letterSpacing: '0.22em',
                                textTransform: 'uppercase',
                                color: '#FFFFFF',
                                background: '#780000',
                                padding: '16px 36px',
                                borderRadius: '4px',
                                textDecoration: 'none',
                                transition: 'background 0.3s ease, transform 0.2s ease',
                                position: 'relative',
                                overflow: 'hidden',
                            }}
                            onMouseEnter={e => {
                                (e.currentTarget as HTMLAnchorElement).style.background = '#5a0000';
                                (e.currentTarget as HTMLAnchorElement).style.transform = 'translateY(-2px)';
                            }}
                            onMouseLeave={e => {
                                (e.currentTarget as HTMLAnchorElement).style.background = '#780000';
                                (e.currentTarget as HTMLAnchorElement).style.transform = 'translateY(0)';
                            }}
                        >
                            <span>Explore Collection</span>
                            <ArrowRight size={15} strokeWidth={2} />
                            <span style={{ fontSize: '14px', marginLeft: '-4px' }}>🪔</span>
                        </Link>
                    </motion.div>
                </div>
            </div>

            <style>{`
                @media (max-width: 640px) {
                    .hidden-mobile-muse { display: none !important; }
                }
            `}</style>
        </section>
    );
};

export default ModernMuse;