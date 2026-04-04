import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowUpRight } from 'lucide-react';

interface DualFeatureSectionProps {
    bestseller?: { images?: { url: string }[] };
    newArrival?: { images?: { url: string }[] };
}

const DualFeatureSection: React.FC<DualFeatureSectionProps> = ({ bestseller, newArrival }) => {
    return (
        <section style={{ background: 'var(--ink)', padding: '100px max(48px, 6vw)' }}>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 2 }}>

                {/* Bestsellers */}
                <div style={{ position: 'relative' }}>
                    <div className="img-zoom" style={{ aspectRatio: '3/4', overflow: 'hidden', background: '#111', position: 'relative' }}>
                        <img
                            src={bestseller?.images?.[0]?.url || 'https://images.unsplash.com/photo-1610030469983-98e550d6193c?q=80&w=1200'}
                            alt="Bestsellers"
                            style={{ width: '100%', height: '100%', objectFit: 'cover', opacity: 0.8 }}
                        />
                        <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to top, var(--ink) 0%, transparent 60%)' }} />
                    </div>
                    <div style={{ padding: '36px 0 0' }}>
                        <p className="section-label" style={{ marginBottom: 12 }}>Most Loved</p>
                        <h3 className="font-display" style={{ fontSize: 'clamp(28px, 3.5vw, 48px)', fontWeight: 300, color: '#F5F0E8', marginBottom: 20, lineHeight: 1.1 }}>
                            Bestsellers<br /><em>Collection</em>
                        </h3>
                        <Link to="/shop?isBestSeller=true" className="btn-outline-gold">Explore <ArrowUpRight size={12} /></Link>
                    </div>
                </div>

                {/* New Arrivals — offset */}
                <div style={{ paddingTop: 80 }}>
                    <div className="img-zoom" style={{ aspectRatio: '3/4', overflow: 'hidden', background: '#111', position: 'relative' }}>
                        <img
                            src={newArrival?.images?.[0]?.url || 'https://images.unsplash.com/photo-1617627143750-d86bc21e42bb?q=80&w=1200'}
                            alt="New Arrival"
                            style={{ width: '100%', height: '100%', objectFit: 'cover', opacity: 0.8 }}
                        />
                        <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to top, var(--ink) 0%, transparent 60%)' }} />
                    </div>
                    <div style={{ padding: '36px 0 0' }}>
                        <p className="section-label" style={{ marginBottom: 12 }}>Fresh from the Loom</p>
                        <h3 className="font-display" style={{ fontSize: 'clamp(28px, 3.5vw, 48px)', fontWeight: 300, color: '#F5F0E8', marginBottom: 20, lineHeight: 1.1 }}>
                            New Arrivals<br /><em>Season</em>
                        </h3>
                        <Link to="/shop?isNewArrival=true" className="btn-gold">Discover New <ArrowUpRight size={12} /></Link>
                    </div>
                </div>

            </div>
        </section>
    );
};

export default DualFeatureSection;
