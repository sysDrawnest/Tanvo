import React from 'react';

const pillars = [
    { num: '7+', label: 'Generations', sub: 'of master craft' },
    { num: '15', label: 'Days', sub: 'per single saree' },
    { num: '200+', label: 'Weavers', sub: 'in our collective' },
    { num: '100%', label: 'Authentic', sub: 'GI certified' },
];

const PillarsSection: React.FC = () => {
    return (
        <section style={{ background: 'var(--ink)' }} className="py-12 md:py-24 px-6">
            <div className="max-w-7xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-0 border-y" style={{ borderColor: 'rgba(237,227,208,0.1)' }}>
                {pillars.map((p, i) => (
                    <div key={i} className={`py-8 md:py-12 px-4 text-center ${i < 3 ? 'md:border-r' : ''}`} style={{ borderColor: 'rgba(237,227,208,0.05)' }}>
                        <p className="font-serif text-4xl md:text-5xl mb-2" style={{ color: 'var(--terra)' }}>{p.num}</p>
                        <p className="font-sans text-[10px] md:text-xs font-bold uppercase tracking-[0.2em] mb-1" style={{ color: 'var(--ivory)', fontFamily: "'Cinzel', serif" }}>{p.label}</p>
                        <p className="font-sans text-[9px] md:text-[11px] tracking-wider capitalize" style={{ color: 'rgba(249,245,238,0.4)', fontFamily: "'Raleway', sans-serif" }}>{p.sub}</p>
                    </div>
                ))}
            </div>
        </section>
    );
};

export default PillarsSection;
