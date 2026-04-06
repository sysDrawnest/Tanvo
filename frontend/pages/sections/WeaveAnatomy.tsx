import React, { useRef, useEffect, useState } from 'react';

const anatomyPoints = [
    {
        title: 'The Border (Dhadhi)',
        desc: 'Distinctive temple borders or "Rudraksha" patterns that define the architectural strength of a Sambalpuri saree.',
    },
    {
        title: 'The Body (Anga)',
        desc: 'Woven with Mercerized cotton or Mulberry silk, featuring timeless motifs of conch shells, wheels, and flowering creepers.',
    },
    {
        title: 'Sustainable Dyeing',
        desc: 'Naturally derived pigments and skin-friendly dyes preserve both the earth and the artisan. Zero synthetic mordants.',
    },
];

const WeaveAnatomy: React.FC = () => {
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
            data-purpose="weave-anatomy"
            style={{
                background: 'var(--ivory-warm)',
                padding: 'clamp(80px,10vw,140px) clamp(20px,6vw,96px)',
                position: 'relative',
                overflow: 'hidden',
            }}
        >
            <div style={{ maxWidth: 1400, margin: '0 auto', position: 'relative' }}>
                {/* Header */}
                <div style={{ marginBottom: 'clamp(52px,7vw,96px)', display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', flexWrap: 'wrap', gap: 24 }}>
                    <div>
                        <p className="section-label" style={{ marginBottom: 20 }}>Technical Artistry</p>
                        <h2 style={{
                            fontFamily: "'Cormorant Garamond', serif",
                            fontSize: 'clamp(36px,4.5vw,64px)',
                            fontWeight: 300,
                            lineHeight: 0.95,
                            letterSpacing: '-0.02em',
                            color: 'var(--ink)',
                            margin: 0,
                        }}>
                            Anatomy of a<br /><em style={{ fontStyle: 'italic', color: 'var(--terra)' }}>Master-Weave</em>
                        </h2>
                    </div>
                </div>

                {/* Horizontal rule */}
                <div style={{ width: '100%', height: 1, background: 'linear-gradient(90deg,transparent,var(--ivory-deep),transparent)', marginBottom: 'clamp(40px,5vw,72px)' }} />

                {/* Two-column layout */}
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 'clamp(40px,6vw,96px)', alignItems: 'center' }}>

                    {/* Image with hotspot markers */}
                    <div
                        style={{
                            position: 'relative',
                            opacity: visible ? 1 : 0,
                            transform: visible ? 'translateX(0)' : 'translateX(-24px)',
                            transition: 'opacity 0.85s ease, transform 0.85s cubic-bezier(0.25,0.46,0.45,0.94)',
                        }}
                    >
                        <img
                            alt="Sambalpuri Ikat Detail"
                            src="/Ikat Detail.png"
                            style={{
                                width: '100%',
                                height: 'auto',
                                display: 'block',
                                boxShadow: '0 24px 64px rgba(28,22,18,0.1)',
                            }}
                        />

                        <img
                            alt="Sambalpuri Ikat Detail"
                            src="/Ikat Detail.png"
                            style={{
                                width: '100%',
                                height: 'auto',
                                display: 'block',
                                boxShadow: '0 24px 64px rgba(28,22,18,0.1)',
                            }}
                        />
                    </div>

                    {/* Detail cards */}
                    <div
                        style={{
                            display: 'flex',
                            flexDirection: 'column',
                            gap: 'clamp(28px,3vw,44px)',
                            opacity: visible ? 1 : 0,
                            transform: visible ? 'translateX(0)' : 'translateX(24px)',
                            transition: 'opacity 0.85s ease 0.15s, transform 0.85s cubic-bezier(0.25,0.46,0.45,0.94) 0.15s',
                        }}
                    >
                        {anatomyPoints.map((pt, i) => (
                            <div
                                key={i}
                                style={{
                                    borderLeft: '2px solid var(--terra)',
                                    paddingLeft: 24,
                                    opacity: visible ? 1 : 0,
                                    transition: `opacity 0.7s ease ${0.2 + i * 0.15}s`,
                                }}
                            >
                                <h4 style={{
                                    fontFamily: "'Cormorant Garamond', serif",
                                    fontSize: 'clamp(18px,2vw,24px)',
                                    fontWeight: 400,
                                    color: 'var(--ink)',
                                    marginBottom: 10,
                                    lineHeight: 1.1,
                                }}>
                                    {pt.title}
                                </h4>
                                <p style={{
                                    fontFamily: "'Raleway', sans-serif",
                                    fontSize: 12,
                                    fontWeight: 300,
                                    color: 'var(--ink-muted)',
                                    lineHeight: 1.8,
                                    margin: 0,
                                }}>
                                    {pt.desc}
                                </p>
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            <style>{`
                @media (max-width: 768px) {
                    .wa-grid { grid-template-columns: 1fr !important; }
                }
            `}</style>
        </section>
    );
};

export default WeaveAnatomy;
