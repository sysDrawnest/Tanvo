import React, { useRef, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowUpRight, Play } from 'lucide-react';

const MasterWeaverSection: React.FC = () => {
    const [visible, setVisible] = useState(false);
    const sectionRef = useRef<HTMLElement>(null);

    useEffect(() => {
        const observer = new IntersectionObserver(
            ([entry]) => { if (entry.isIntersecting) setVisible(true); },
            { threshold: 0.2 }
        );
        if (sectionRef.current) observer.observe(sectionRef.current);
        return () => observer.disconnect();
    }, []);

    return (
        <section
            ref={sectionRef}
            style={{
                background: '#0D0B0A', // Deeper black for luxury feel
                padding: 'clamp(100px, 12vw, 180px) 0',
                position: 'relative',
                overflow: 'hidden',
                color: '#F5F0E8',
            }}
        >
            {/* Artistic Background Label */}
            <div style={{
                position: 'absolute',
                top: '10%',
                left: '5%',
                fontSize: 'clamp(80px, 15vw, 240px)',
                fontWeight: 900,
                color: 'rgba(245, 240, 232, 0.02)',
                lineHeight: 0.8,
                pointerEvents: 'none',
                fontFamily: "'Cinzel', serif",
                zIndex: 0,
            }}>
                LEGACY
            </div>

            <div style={{ maxWidth: 1400, margin: '0 auto', padding: '0 clamp(40px, 8vw, 100px)', position: 'relative', zIndex: 1 }}>
                <div style={{
                    display: 'flex',
                    flexDirection: 'row',
                    flexWrap: 'wrap',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    gap: '60px',
                }}>
                    {/* Text Container */}
                    <div style={{
                        flex: '1 1 480px',
                        opacity: visible ? 1 : 0,
                        transform: visible ? 'translateY(0)' : 'translateY(40px)',
                        transition: 'opacity 1s ease, transform 1s cubic-bezier(0.2, 0, 0.2, 1)',
                    }}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: 16, marginBottom: 32 }}>
                            <span style={{ height: 1, width: 40, background: 'var(--gold)' }} />
                            <p style={{
                                fontFamily: "'Cinzel', serif",
                                fontSize: 11,
                                letterSpacing: '0.4em',
                                color: 'var(--gold)',
                                textTransform: 'uppercase',
                                margin: 0,
                            }}>
                                Meet the Makers
                            </p>
                        </div>

                        <h2 style={{
                            fontFamily: "'Cormorant Garamond', serif",
                            fontSize: 'clamp(48px, 6vw, 84px)',
                            fontWeight: 300,
                            lineHeight: 0.9,
                            letterSpacing: '-0.03em',
                            marginBottom: 20,
                        }}>
                            Master Weavers<br />
                            <span style={{ color: 'var(--gold)', fontStyle: 'italic', display: 'block', marginTop: 10 }}>Preserving</span>
                            Living Heritage
                        </h2>

                        <p style={{
                            fontFamily: "'Cormorant Garamond', serif",
                            fontSize: 'clamp(20px, 2vw, 24px)',
                            fontStyle: 'italic',
                            color: 'rgba(245, 240, 232, 0.6)',
                            marginBottom: 48,
                            lineHeight: 1.4,
                        }}>
                            "Every thread carries a story…"
                        </p>

                        <div style={{ maxWidth: 460, marginBottom: 56 }}>
                            <p style={{
                                fontFamily: "'Raleway', sans-serif",
                                fontSize: 'clamp(14px, 1.2vw, 15px)',
                                color: 'rgba(245, 240, 232, 0.5)',
                                lineHeight: 1.9,
                                letterSpacing: '0.01em',
                            }}>
                                Each saree takes 15–20 days to complete. Our weavers spend months calculating dye ratios and loom setups before a single thread is laid — delivering mathematical perfection in silk and cotton.
                            </p>
                        </div>

                        <div style={{ display: 'flex', alignItems: 'center', gap: 40 }}>
                            <Link
                                to="/about"
                                className="btn-gold"
                                style={{
                                    padding: '16px 44px',
                                    fontSize: 11,
                                    letterSpacing: '0.2em',
                                    display: 'inline-flex',
                                    alignItems: 'center',
                                    gap: 12,
                                }}
                            >
                                Meet the Artisans <ArrowUpRight size={16} />
                            </Link>

                            <p style={{
                                fontFamily: "'Cinzel', serif",
                                fontSize: 10,
                                letterSpacing: '0.3em',
                                color: 'rgba(245, 240, 232, 0.4)',
                                textTransform: 'uppercase',
                                margin: 0,
                                borderBottom: '1px solid rgba(245, 240, 232, 0.1)',
                                paddingBottom: 4,
                            }}>
                                Weaving Legacy
                            </p>
                        </div>
                    </div>

                    {/* Image Composition */}
                    <div style={{
                        flex: '1 1 500px',
                        position: 'relative',
                        zIndex: 2,
                        opacity: visible ? 1 : 0,
                        transform: visible ? 'translateX(0)' : 'translateX(40px)',
                        transition: 'opacity 1.2s ease 0.2s, transform 1.2s cubic-bezier(0.2, 0, 0.2, 1) 0.2s',
                    }}>
                        <div style={{
                            position: 'relative',
                            width: '90%',
                            aspectRatio: '1/1.1',
                            margin: '0 auto',
                        }}>
                            {/* Texture Box Behind Image */}
                            <div style={{
                                position: 'absolute',
                                top: '-40px',
                                right: '-40px',
                                width: '60%',
                                height: '60%',
                                border: '1px solid rgba(201, 168, 76, 0.2)',
                                zIndex: -1,
                            }} />

                            <img
                                src="/sambalpuri_ikat.png"
                                alt="Masterful Craftsmanship"
                                style={{
                                    width: '100%',
                                    height: '100%',
                                    objectFit: 'cover',
                                    boxShadow: '0 40px 100px rgba(0,0,0,0.5)',
                                    display: 'block',
                                    filter: 'grayscale(20%) contrast(1.1)',
                                }}
                            />

                            {/* Overlaid Play Interaction */}
                            <div style={{
                                position: 'absolute',
                                bottom: '40px',
                                left: '-30px',
                                background: 'white',
                                padding: '24px',
                                display: 'flex',
                                alignItems: 'center',
                                gap: 20,
                                boxShadow: '0 20px 40px rgba(0,0,0,0.3)',
                                cursor: 'pointer',
                            }}>
                                <div style={{
                                    width: 50,
                                    height: 50,
                                    borderRadius: '50%',
                                    background: 'var(--gold)',
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    color: 'white',
                                }}>
                                    <Play size={20} fill="white" style={{ marginLeft: 3 }} />
                                </div>
                                <p style={{
                                    color: '#0D0B0A',
                                    fontFamily: "'Cinzel', serif",
                                    fontSize: 10,
                                    letterSpacing: '0.2em',
                                    fontWeight: 700,
                                    textTransform: 'uppercase',
                                    margin: 0,
                                }}>View the Process</p>
                            </div>
                        </div>

                        {/* Floating Text Detail */}
                        <div style={{
                            position: 'absolute',
                            top: '20%',
                            right: '-20px',
                            writingMode: 'vertical-rl',
                            fontSize: 10,
                            fontFamily: "'Cinzel', serif",
                            letterSpacing: '0.5em',
                            color: 'rgba(245, 240, 232, 0.2)',
                            textTransform: 'uppercase',
                        }}>
                            HANDCRAFTED PERFECTION
                        </div>
                    </div>
                </div>
            </div>

            <style>{`
                @media (max-width: 991px) {
                    .redesign-grid { flex-direction: column !important; }
                }
            `}</style>
        </section>
    );
};

export default MasterWeaverSection;

