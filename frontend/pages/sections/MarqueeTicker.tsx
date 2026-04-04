import React from 'react';

const MarqueeTicker: React.FC = () => {
    return (
        <div style={{ background: 'var(--gold)', padding: '14px 0', overflow: 'hidden' }}>
            <div className="marquee-inner" style={{ display: 'flex', whiteSpace: 'nowrap', width: 'max-content' }}>
                {Array(6).fill('✦  Handwoven Sarees  ✦  GI Tagged Heritage  ✦  Direct from Master Weavers  ✦  Sambalpuri · Bomkai · Ikat  ').map((t, i) => (
                    <span key={i} style={{
                        fontFamily: 'Montserrat, sans-serif',
                        fontSize: 9,
                        fontWeight: 700,
                        letterSpacing: '0.2em',
                        color: 'var(--ink)',
                        paddingRight: 40,
                    }}>{t}</span>
                ))}
            </div>
        </div>
    );
};

export default MarqueeTicker;
