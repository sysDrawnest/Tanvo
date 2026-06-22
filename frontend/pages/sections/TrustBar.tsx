import React from 'react';

const trustItems = [
    { icon: '✓', title: '100% Authentic', sub: 'Direct from Loom' },
    { icon: '⟶', title: 'Global Shipping', sub: 'Fast & Insured' },
    { icon: '◈', title: 'Premium Fabrics', sub: 'Hand-picked' },
    { icon: '↺', title: '7-Day Returns', sub: 'Hassle Free' },
];

const TrustBar: React.FC = () => {
    return (
        <div style={{ background: 'var(--gold)', padding: '0 max(48px, 6vw)' }}>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))', borderTop: '1px solid rgba(13,11,10,0.15)' }}>
                {trustItems.map((item, i) => (
                    <div key={i} style={{ padding: '32px 24px', textAlign: 'center', borderRight: i < trustItems.length - 1 ? '1px solid rgba(13,11,10,0.15)' : 'none' }}>
                        <span style={{ fontFamily: 'Montserrat, sans-serif', fontSize: 18, color: 'var(--ink)', display: 'block', marginBottom: 8 }}>{item.icon}</span>
                        <p style={{ fontFamily: 'Montserrat, sans-serif', fontSize: 9, fontWeight: 700, color: 'var(--ink)', letterSpacing: '0.15em', textTransform: 'uppercase', marginBottom: 4 }}>{item.title}</p>
                        <p style={{ fontFamily: 'Montserrat, sans-serif', fontSize: 8, color: 'rgba(13,11,10,0.6)', letterSpacing: '0.1em' }}>{item.sub}</p>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default TrustBar;
