import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowUpRight } from 'lucide-react';

const EditorialBanner: React.FC = () => {
    return (
        <section style={{ position: 'relative', height: '85vh', minHeight: '600px', overflow: 'hidden' }}>
            {/* Background Video */}
            <video
                autoPlay
                muted
                loop
                playsInline
                style={{
                    width: '100%',
                    height: '100%',
                    objectFit: 'cover',
                    position: 'absolute',
                    top: 0,
                    left: 0,
                    zIndex: 1,
                }}
            >
                <source src="/saree quality 2.mp4" type="video/mp4" />
                Your browser does not support the video tag.
            </video>

            {/* Dark Overlay for better contrast */}
            <div style={{
                position: 'absolute',
                inset: 0,
                background: 'linear-gradient(to right, rgba(10, 10, 10, 0.8) 0%, rgba(10, 10, 10, 0.3) 50%, rgba(10, 10, 10, 0.1) 100%)',
                zIndex: 2
            }} />

            <div style={{ position: 'absolute', inset: 0, display: 'flex', alignItems: 'center', padding: '0 max(60px, 8vw)', zIndex: 5 }}>
                <div style={{ maxWidth: 640 }}>
                    <p className="section-label" style={{ color: 'var(--gold)', marginBottom: 24, letterSpacing: '0.2em' }}>
                        THE ART OF CRAFT
                    </p>
                    <h2 className="font-display" style={{ fontSize: 'clamp(40px, 6vw, 72px)', fontWeight: 300, color: '#F5F0E8', lineHeight: 1.1, letterSpacing: '-0.02em', marginBottom: 24 }}>
                        A Legacy of<br />
                        <em style={{ color: 'var(--gold)', fontStyle: 'italic' }}>Pure</em> Quality
                    </h2>
                    <p style={{ color: 'rgba(245,240,232,0.8)', fontSize: 'clamp(14px, 1.5vw, 16px)', lineHeight: 1.8, marginBottom: 40, maxWidth: 480 }}>
                        Witness the intricate dance of threads. Every weave at Tanvo is a testament to timeless patience and extraordinary skill, crafted from the finest natural fibers.
                    </p>
                    <div style={{ display: 'flex', gap: 24, alignItems: 'center' }}>
                        <Link to="/shop" className="btn-gold" style={{ display: 'inline-flex', alignItems: 'center', gap: 8 }}>
                            Explore Collection <ArrowUpRight size={16} />
                        </Link>
                        <Link to="/about" style={{ color: '#F5F0E8', textDecoration: 'none', fontSize: 14, fontWeight: 500, letterSpacing: '0.1em', display: 'inline-flex', alignItems: 'center', gap: 4, borderBottom: '1px solid var(--gold)', paddingBottom: 4 }}>
                            Our Craftsmanship
                        </Link>
                    </div>
                </div>
            </div>

            {/* Floating Quality Indicator */}
            <div style={{ position: 'absolute', right: 40, bottom: 40, zIndex: 10, display: 'flex', flexDirection: 'column', alignItems: 'flex-end' }}>
                <div style={{ width: 1, height: 60, background: 'var(--gold)', marginBottom: 20 }}></div>
                <p className="vertical-text section-label" style={{ color: 'var(--gold)', opacity: 0.8, writingMode: 'vertical-rl', margin: 0 }}>
                    100% HANDWOVEN HERITAGE
                </p>
            </div>
        </section>
    );
};

export default EditorialBanner;
