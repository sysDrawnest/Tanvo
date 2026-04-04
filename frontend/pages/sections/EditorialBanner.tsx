import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowUpRight } from 'lucide-react';

const EditorialBanner: React.FC = () => {
    return (
        <section style={{ position: 'relative', height: '80vh', overflow: 'hidden' }}>
            <img
                src="/EditorialBanner.png"
                alt="Heritage Meets Modern"
                style={{
                    width: '100%',
                    height: '100%',
                    objectFit: 'cover',
                    // Removed filter that was causing brightness/sepia effect
                    // Image now displays as-is with original colors and opacity
                }}
            />

            <div style={{ position: 'absolute', inset: 0, display: 'flex', alignItems: 'center', padding: '0 max(60px, 8vw)', zIndex: 5 }}>
                <div style={{ maxWidth: 560 }}>
                    <p className="section-label" style={{ color: 'var(--gold)', marginBottom: 24 }}>Editorial · SS 2025</p>
                    <h2 className="font-display" style={{ fontSize: 'clamp(40px, 6vw, 80px)', fontWeight: 300, color: '#F5F0E8', lineHeight: 1, letterSpacing: '-0.01em', marginBottom: 24 }}>
                        Heritage<br /><em style={{ color: 'var(--gold)' }}>Meets</em> Modern
                    </h2>
                    <p style={{ color: 'rgba(245,240,232,0.65)', fontSize: 13, lineHeight: 1.8, marginBottom: 36, maxWidth: 380 }}>
                        Traditional weaves reimagined for contemporary lives. Wear your culture, carry your story.
                    </p>
                    <Link to="/shop" className="btn-gold">Shop Now <ArrowUpRight size={14} /></Link>
                </div>
            </div>

            {/* Right vertical label */}
            <div style={{ position: 'absolute', right: 32, top: '50%', transform: 'translateY(-50%)', zIndex: 10 }}>
                <p className="vertical-text section-label" style={{ color: 'rgba(201,168,76,0.5)' }}>Handwoven Heritage</p>
            </div>
        </section>
    );
};

export default EditorialBanner;