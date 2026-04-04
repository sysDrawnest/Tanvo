import React, { useRef, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowUpRight } from 'lucide-react';

const traditions = [
    { id: '01', name: 'Sambalpuri Ikat', desc: 'Tie-dyed warp and weft, where resist-dyeing creates mirror-perfect patterns across each thread.' },
    { id: '02', name: 'Bomkai Silk', desc: 'Inspired by the folk lore of Ganjam — temple motifs rendered in pure mulberry silk.' },
    { id: '03', name: 'Khandua Patta', desc: 'The holy silk offered to Lord Jagannath. Every motif carries centuries of devotion.' },
    { id: '04', name: 'Kotpad Weave', desc: 'Natural dyes from the Aul tree roots, yielding rich maroon and clay tones that never fade.' },
    { id: '05', name: 'Dongria Kondh', desc: 'Geometric motifs from the Niyamgiri hills, each pattern carrying tribal identity.' },
    { id: '06', name: 'Berhampuri Patta', desc: 'Temple borders with a heavy silk body — the queen of Odishan textile arts.' },
];

const SixTraditions: React.FC = () => {
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
            data-purpose="six-traditions"
            style={{
                padding: 'clamp(80px,10vw,140px) clamp(20px,6vw,96px)',
                background: 'var(--ivory)',
                position: 'relative',
                overflow: 'hidden',
            }}
        >
            {/* Subtle mesh grain */}
            <div style={{
                position: 'absolute', inset: 0,
                backgroundImage: "url(\"data:image/svg+xml,%3Csvg width='40' height='40' viewBox='0 0 40 40' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M0 0h40v2H0V0zm0 8h40v2H0V8zm0 16h40v2H0v-2zm0 8h40v2H0v-2z' fill='%23B5502B' fill-opacity='0.02' fill-rule='evenodd'/%3E%3C/svg%3E\")",
                pointerEvents: 'none',
            }} />

            <div style={{ maxWidth: 1400, margin: '0 auto', position: 'relative' }}>
                {/* Header */}
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', marginBottom: 'clamp(52px,7vw,96px)', flexWrap: 'wrap', gap: 24 }}>
                    <div>
                        <p className="section-label" style={{ marginBottom: 20 }}>Curated Legacy</p>
                        <h2 style={{
                            fontFamily: "'Cormorant Garamond', serif",
                            fontSize: 'clamp(40px,5vw,72px)',
                            fontWeight: 300,
                            lineHeight: 0.95,
                            letterSpacing: '-0.02em',
                            color: 'var(--ink)',
                            margin: 0,
                        }}>
                            Six Ancient<br /><em style={{ fontStyle: 'italic', color: 'var(--terra)' }}>Traditions</em>
                        </h2>
                    </div>
                    <Link
                        to="/shop"
                        className="btn-outline-gold"
                        style={{ display: 'inline-flex', alignItems: 'center', gap: 8 }}
                    >
                        Explore All <ArrowUpRight size={13} />
                    </Link>
                </div>

                {/* Top rule */}
                <div style={{
                    width: '100%', height: 1,
                    background: 'linear-gradient(90deg,transparent,var(--ivory-deep),transparent)',
                    marginBottom: 'clamp(40px,5vw,72px)',
                }} />

                {/* Grid */}
                <div style={{
                    display: 'grid',
                    gridTemplateColumns: 'repeat(auto-fit,minmax(280px,1fr))',
                    gap: 'clamp(32px,4vw,56px) clamp(24px,4vw,48px)',
                }}>
                    {traditions.map((t, idx) => (
                        <div
                            key={t.id}
                            style={{
                                opacity: visible ? 1 : 0,
                                transform: visible ? 'translateY(0)' : 'translateY(28px)',
                                transition: `opacity 0.7s ease ${idx * 0.1}s, transform 0.7s cubic-bezier(0.25,0.46,0.45,0.94) ${idx * 0.1}s`,
                                cursor: 'pointer',
                            }}
                        >
                            {/* Number */}
                            <span style={{
                                display: 'block',
                                fontFamily: "'Cormorant Garamond', serif",
                                fontSize: 'clamp(48px,6vw,80px)',
                                fontWeight: 300,
                                lineHeight: 1,
                                color: 'var(--ivory-deep)',
                                letterSpacing: '-0.03em',
                                marginBottom: 8,
                                transition: 'color 0.4s ease',
                            }}
                                onMouseEnter={e => (e.currentTarget.style.color = 'var(--terra)')}
                                onMouseLeave={e => (e.currentTarget.style.color = 'var(--ivory-deep)')}
                            >
                                {t.id}
                            </span>

                            {/* Divider line */}
                            <div style={{ width: 32, height: 1, background: 'var(--stone)', marginBottom: 16 }} />

                            <h4 style={{
                                fontFamily: "'Cormorant Garamond', serif",
                                fontSize: 'clamp(20px,2vw,26px)',
                                fontWeight: 400,
                                color: 'var(--ink)',
                                marginBottom: 12,
                                lineHeight: 1.1,
                            }}>
                                {t.name}
                            </h4>
                            <p style={{
                                fontFamily: "'Raleway', sans-serif",
                                fontSize: 12,
                                fontWeight: 300,
                                color: 'var(--ink-muted)',
                                lineHeight: 1.8,
                                margin: 0,
                            }}>
                                {t.desc}
                            </p>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default SixTraditions;
