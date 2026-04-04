import React from 'react';
import img from '../../public/Heritage Meets Modern.png';

const HeritageModern: React.FC = () => {
    return (
        <section className="py-24" style={{ background: 'var(--ivory)' }} data-purpose="heritage-modern">
            <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 md:grid-cols-2 gap-16 items-center">
                <div className="relative group">
                    <div className="absolute -inset-4 rounded-2xl -z-10 group-hover:scale-105 transition-transform duration-700" style={{ background: 'var(--ivory-warm)' }}></div>
                    <img
                        src={img}
                        alt="Heritage meets Modern"
                        className="w-full h-[500px] object-cover shadow-2xl grayscale hover:grayscale-0 transition-all duration-1000"
                    />
                    <div className="absolute bottom-6 right-6 p-4 shadow-xl" style={{ background: 'var(--ivory)' }}>
                        <p className="text-lg italic" style={{ fontFamily: "'Cormorant Garamond', serif", color: 'var(--terra)' }}>Ancient Craft.</p>
                        <p className="text-[10px] uppercase tracking-widest" style={{ fontFamily: "'Cinzel', serif", color: 'var(--ink)' }}>Modern Silhouette.</p>
                    </div>
                </div>
                <div className="space-y-8">
                    <span className="uppercase tracking-[0.4em] text-xs font-bold" style={{ fontFamily: "'Cinzel', serif", color: 'var(--terra)' }}>The Philosophy</span>
                    <h2 className="text-5xl md:text-7xl leading-tight" style={{ fontFamily: "'Cormorant Garamond', serif", color: 'var(--ink)' }}>
                        Heritage <br /> <span className="italic" style={{ color: 'var(--stone)' }}>Meets</span> Modern
                    </h2>
                    <p className="text-lg leading-relaxed italic" style={{ fontFamily: "'Raleway', sans-serif", color: 'var(--ink-muted)' }}>
                        "We believe that tradition is not about preserving ashes, but about keeping the fire of craft alive in modern silhouettes."
                    </p>
                    <div className="space-y-4">
                        <p className="text-sm leading-loose" style={{ fontFamily: "'Raleway', sans-serif", color: 'var(--ink-muted)' }}>
                            TANVO reinterprets 700-year-old Ikat weaving techniques for the contemporary connoisseur. Each piece is a bridge between the mathematical precision of the loom and the fluidity of modern style.
                        </p>
                    </div>
                    <div className="pt-4">
                        <button
                            className="px-10 py-4 border uppercase tracking-[0.3em] font-medium transition-all duration-500"
                            style={{
                                fontFamily: "'Cinzel', serif",
                                fontSize: '11px',
                                borderColor: 'var(--ink)',
                                color: 'var(--ink)'
                            }}
                            onMouseEnter={(e) => {
                                e.currentTarget.style.background = 'var(--terra)';
                                e.currentTarget.style.color = 'var(--ivory)';
                                e.currentTarget.style.borderColor = 'var(--terra)';
                            }}
                            onMouseLeave={(e) => {
                                e.currentTarget.style.background = 'transparent';
                                e.currentTarget.style.color = 'var(--ink)';
                                e.currentTarget.style.borderColor = 'var(--ink)';
                            }}
                        >
                            Read Our Vision
                        </button>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default HeritageModern;
