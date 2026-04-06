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

                        {/* Annotation: Pallu */}
                        <div
                            style={{
                                position: 'absolute', top: '22%', left: '28%',
                                width: 14, height: 14, borderRadius: '50%',
                                background: 'var(--terra)',
                                cursor: 'pointer',
                                zIndex: 4,
                            }}
                            className="hotspot-pulse group"
                        >
                            <div style={{
                                position: 'absolute', left: 24, top: -8,
                                width: 180,
                                background: 'var(--ivory)',
                                padding: '12px 14px',
                                boxShadow: '0 8px 32px rgba(28,22,18,0.12)',
                                borderLeft: '2px solid var(--terra)',
                                opacity: 0,
                                transition: 'opacity 0.3s ease',
                                pointerEvents: 'none',
                                zIndex: 20,
                            }}
                                className="pallu-tip"
                            >
                                <p style={{ fontFamily: "'Cinzel',serif", fontSize: 8, letterSpacing: '0.2em', color: 'var(--terra)', marginBottom: 4 }}>THE PALLU</p>
                                <p style={{ fontFamily: "'Raleway',sans-serif", fontSize: 11, fontWeight: 300, color: 'var(--ink-muted)', lineHeight: 1.6 }}>The decorative end-piece featuring intricate floral & shell motifs.</p>
                            </div>
                        </div>

                        {/* Annotation: Ikat */}
                        <div
                            style={{
                                position: 'absolute', bottom: '38%', right: '12%',
                                width: 14, height: 14, borderRadius: '50%',
                                background: 'var(--terra)',
                                cursor: 'pointer',
                                zIndex: 4,
                            }}
                            className="hotspot-pulse group"
                        >
                            <div style={{
                                position: 'absolute', right: 24, top: -8,
                                width: 180,
                                background: 'var(--ivory)',
                                padding: '12px 14px',
                                boxShadow: '0 8px 32px rgba(28,22,18,0.12)',
                                borderRight: '2px solid var(--terra)',
                                textAlign: 'right',
                                opacity: 0,
                                transition: 'opacity 0.3s ease',
                                pointerEvents: 'none',
                                zIndex: 20,
                            }}
                                className="ikat-tip"
                            >
                                <p style={{ fontFamily: "'Cinzel',serif", fontSize: 8, letterSpacing: '0.2em', color: 'var(--terra)', marginBottom: 4 }}>IKAT PATTERN</p>
                                <p style={{ fontFamily: "'Raleway',sans-serif", fontSize: 11, fontWeight: 300, color: 'var(--ink-muted)', lineHeight: 1.6 }}>Double-ikat where both warp and weft are resist-dyed simultaneously.</p>
                            </div>
                        </div>
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
                .hotspot-pulse:hover .pallu-tip,
                .hotspot-pulse:hover .ikat-tip { opacity: 1 !important; }

                @keyframes waHotspot {
                    0%,100% { opacity: 0.5; transform: scale(1); }
                    50% { opacity: 0; transform: scale(1.8); }
                }
                .hotspot-pulse::before {
                    content: '';
                    position: absolute;
                    inset: -6px;
                    border-radius: 50%;
                    border: 1px solid var(--terra);
                    animation: waHotspot 2s ease infinite;
                }

                @media (max-width: 768px) {
                    .wa-grid { grid-template-columns: 1fr !important; }
                }
            `}</style>
        </section>
    );
};

export default WeaveAnatomy;
