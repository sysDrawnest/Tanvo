import React, { useRef, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowUpRight, Play } from 'lucide-react';

const MasterWeaverSection: React.FC = () => {
    const [visible, setVisible] = useState(false);
    const sectionRef = useRef<HTMLElement>(null);

    useEffect(() => {
        const observer = new IntersectionObserver(
            ([entry]) => { if (entry.isIntersecting) setVisible(true); },
            { threshold: 0.1 }
        );
        if (sectionRef.current) observer.observe(sectionRef.current);
        return () => observer.disconnect();
    }, []);

    return (
        <section
            ref={sectionRef}
            style={{
                background: 'var(--ink)',
                padding: 'clamp(80px,10vw,140px) clamp(20px,6vw,96px)',
                position: 'relative',
                overflow: 'hidden',
            }}
        >
            {/* Faint textile weave pattern on dark bg */}
            <div style={{
                position: 'absolute', inset: 0,
                backgroundImage: "url(\"data:image/svg+xml,%3Csvg width='40' height='40' viewBox='0 0 40 40' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M0 0h40v2H0V0zm0 8h40v2H0V8zm0 16h40v2H0v-2zm0 8h40v2H0v-2z' fill='%23F9F5EE' fill-opacity='0.025' fill-rule='evenodd'/%3E%3C/svg%3E\")",
                pointerEvents: 'none',
            }} />

            <div style={{ maxWidth: 1400, margin: '0 auto', position: 'relative' }}>
                <div style={{
                    display: 'grid',
                    gridTemplateColumns: '1fr 1fr',
                    gap: 'clamp(40px,6vw,100px)',
                    alignItems: 'center',
                }}>
                    {/* Text side */}
                    <div
                        style={{
                            opacity: visible ? 1 : 0,
                            transform: visible ? 'translateX(0)' : 'translateX(-32px)',
                            transition: 'opacity 0.9s ease, transform 0.9s cubic-bezier(0.25,0.46,0.45,0.94)',
                        }}
                    >
                        <p style={{
                            fontFamily: "'Cinzel', serif",
                            fontSize: 9,
                            fontWeight: 500,
                            letterSpacing: '0.35em',
                            textTransform: 'uppercase',
                            color: 'var(--terra)',
                            marginBottom: 24,
                            display: 'flex',
                            alignItems: 'center',
                            gap: 12,
                        }}>
                            <span style={{ display: 'inline-block', width: 28, height: 1, background: 'var(--terra)', flexShrink: 0 }} />
                            Meet the Makers
                        </p>

                        <h2 style={{
                            fontFamily: "'Cormorant Garamond', serif",
                            fontSize: 'clamp(40px,5vw,72px)',
                            fontWeight: 300,
                            lineHeight: 0.95,
                            letterSpacing: '-0.02em',
                            color: 'var(--ivory)',
                            marginBottom: 24,
                        }}>
                            Master Weavers<br />
                            <em style={{ fontStyle: 'italic', color: 'var(--terra)' }}>Preserving</em><br />
                            Living Heritage
                        </h2>

                        <p style={{
                            fontFamily: "'Cormorant Garamond', serif",
                            fontSize: 18,
                            fontStyle: 'italic',
                            fontWeight: 400,
                            color: 'rgba(249,245,238,0.45)',
                            marginBottom: 32,
                            lineHeight: 1.5,
                        }}>
                            "Every thread carries a story…"
                        </p>

                        <div style={{ width: 40, height: 1, background: 'var(--terra)', marginBottom: 32, opacity: 0.6 }} />

                        <p style={{
                            fontFamily: "'Raleway', sans-serif",
                            fontSize: 13,
                            fontWeight: 300,
                            color: 'rgba(249,245,238,0.5)',
                            lineHeight: 1.9,
                            marginBottom: 40,
                            maxWidth: 440,
                        }}>
                            Each saree takes 15–20 days to complete. Our weavers spend months calculating dye ratios and loom setups before a single thread is laid — delivering mathematical perfection in silk and cotton.
                        </p>

                        <Link
                            to="/about"
                            style={{
                                display: 'inline-flex',
                                alignItems: 'center',
                                gap: 10,
                                padding: '14px 36px',
                                border: '1px solid rgba(181,80,43,0.5)',
                                fontFamily: "'Cinzel', serif",
                                fontSize: 9,
                                fontWeight: 500,
                                letterSpacing: '0.28em',
                                textTransform: 'uppercase',
                                color: 'var(--terra)',
                                textDecoration: 'none',
                                position: 'relative',
                                overflow: 'hidden',
                                transition: 'color 0.4s ease, border-color 0.4s ease',
                            }}
                            onMouseEnter={e => {
                                (e.currentTarget as HTMLAnchorElement).style.color = 'var(--ink)';
                                (e.currentTarget as HTMLAnchorElement).style.background = 'var(--terra)';
                                (e.currentTarget as HTMLAnchorElement).style.borderColor = 'var(--terra)';
                            }}
                            onMouseLeave={e => {
                                (e.currentTarget as HTMLAnchorElement).style.color = 'var(--terra)';
                                (e.currentTarget as HTMLAnchorElement).style.background = 'transparent';
                                (e.currentTarget as HTMLAnchorElement).style.borderColor = 'rgba(181,80,43,0.5)';
                            }}
                        >
                            Meet the Artisans <ArrowUpRight size={13} />
                        </Link>
                    </div>

                    {/* Image / video side */}
                    <div
                        style={{
                            position: 'relative',
                            aspectRatio: '4/3',
                            overflow: 'hidden',
                            opacity: visible ? 1 : 0,
                            transform: visible ? 'translateX(0)' : 'translateX(32px)',
                            transition: 'opacity 0.9s ease 0.15s, transform 0.9s cubic-bezier(0.25,0.46,0.45,0.94) 0.15s',
                        }}
                    >
                        <img
                            src="/sambalpuri_ikat.png"
                            alt="Weaving Legacy"
                            style={{
                                width: '100%', height: '100%',
                                objectFit: 'cover',
                                display: 'block',
                                filter: 'brightness(0.7)',
                                transition: 'transform 1.1s ease',
                            }}
                            onMouseEnter={e => ((e.currentTarget as HTMLImageElement).style.transform = 'scale(1.04)')}
                            onMouseLeave={e => ((e.currentTarget as HTMLImageElement).style.transform = 'scale(1)')}
                        />

                        {/* Gradient overlay */}
                        <div style={{
                            position: 'absolute', inset: 0,
                            background: 'linear-gradient(160deg,rgba(28,22,18,0.1) 0%,rgba(28,22,18,0.5) 100%)',
                        }} />

                        {/* Play button */}
                        <div style={{
                            position: 'absolute', inset: 0,
                            display: 'flex', alignItems: 'center', justifyContent: 'center',
                        }}>
                            <button style={{
                                width: 72, height: 72,
                                borderRadius: '50%',
                                background: 'rgba(249,245,238,0.08)',
                                backdropFilter: 'blur(8px)',
                                border: '1px solid rgba(249,245,238,0.2)',
                                display: 'flex', alignItems: 'center', justifyContent: 'center',
                                cursor: 'pointer',
                                transition: 'background 0.3s ease, transform 0.3s ease',
                            }}
                                onMouseEnter={e => {
                                    (e.currentTarget as HTMLButtonElement).style.background = 'rgba(181,80,43,0.7)';
                                    (e.currentTarget as HTMLButtonElement).style.transform = 'scale(1.1)';
                                }}
                                onMouseLeave={e => {
                                    (e.currentTarget as HTMLButtonElement).style.background = 'rgba(249,245,238,0.08)';
                                    (e.currentTarget as HTMLButtonElement).style.transform = 'scale(1)';
                                }}
                            >
                                <Play size={22} fill="var(--ivory)" style={{ color: 'var(--ivory)', marginLeft: 3 }} />
                            </button>
                        </div>

                        {/* Corner accents */}
                        <div style={{ position: 'absolute', top: 16, left: 16, width: 24, height: 24, borderTop: '1px solid rgba(181,80,43,0.6)', borderLeft: '1px solid rgba(181,80,43,0.6)' }} />
                        <div style={{ position: 'absolute', bottom: 16, right: 16, width: 24, height: 24, borderBottom: '1px solid rgba(181,80,43,0.6)', borderRight: '1px solid rgba(181,80,43,0.6)' }} />
                    </div>
                </div>
            </div>

            <style>{`
                @media (max-width: 768px) {
                    .mws-grid { grid-template-columns: 1fr !important; }
                }
            `}</style>
        </section>
    );
};

export default MasterWeaverSection;
