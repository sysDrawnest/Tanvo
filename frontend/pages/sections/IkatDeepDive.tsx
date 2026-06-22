import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowUpRight } from 'lucide-react';
import img from '../../public/Ikat Detail.png';

const IkatDeepDive: React.FC = () => {
    return (
        <section className="relative overflow-hidden" style={{ background: 'var(--ink)' }}>
            <div className="grid grid-cols-1 lg:grid-cols-2 min-h-[85vh]">

                {/* Image side */}
                <div className="img-zoom relative overflow-hidden min-h-[400px] lg:min-h-[500px]">
                    <img
                        src={img}
                        alt="Ikat Detail"
                        className="absolute inset-0 w-full h-full object-cover opacity-70"
                    />

                    {/* Hotspot 1 */}
                    <div className="absolute top-[32%] right-[28%] z-10">
                        <div className="hotspot-pulse relative w-7 h-7 rounded-full flex items-center justify-center cursor-pointer group" style={{ background: 'var(--gold)' }}>
                            <span style={{ fontFamily: 'Montserrat, sans-serif', fontSize: 9, fontWeight: 700, color: 'var(--ink)' }}>1</span>
                            <div className="absolute top-9 right-0 md:left-1/2 md:-translate-x-1/2 md:right-auto lg:right-0 lg:left-auto lg:translate-x-0 w-[180px] md:w-[220px] p-4 pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-20" style={{ background: '#F5F0E8' }}>
                                <p style={{ fontSize: 9, fontWeight: 700, color: 'var(--red)', letterSpacing: '0.15em', textTransform: 'uppercase', marginBottom: 6 }}>Double Ikat</p>
                                <p style={{ fontSize: 10, color: 'var(--ink)', lineHeight: 1.6 }}>Both warp and weft tied and dyed before weaving — the rarest technique.</p>
                            </div>
                        </div>
                    </div>

                    {/* Hotspot 2 */}
                    <div className="absolute top-[58%] right-[18%] z-10">
                        <div className="hotspot-pulse relative w-7 h-7 rounded-full flex items-center justify-center cursor-pointer" style={{ background: 'var(--gold)' }}>
                            <span style={{ fontFamily: 'Montserrat, sans-serif', fontSize: 9, fontWeight: 700, color: 'var(--ink)' }}>2</span>
                        </div>
                    </div>
                </div>

                {/* Text side */}
                <div className="flex flex-col justify-center p-8 sm:p-12 lg:p-20 border-t lg:border-t-0 lg:border-l" style={{ borderColor: 'rgba(201,168,76,0.15)' }}>
                    <p className="section-label mb-6 lg:mb-8 text-xs lg:text-sm">The Art of Ikat</p>
                    <h2 className="font-display font-light text-[#F5F0E8] leading-[1.1] mb-6 lg:mb-8 text-4xl sm:text-5xl lg:text-[clamp(40px,4vw,64px)]">
                        Every Thread<br />Tells a<br /><em className="not-italic" style={{ color: 'var(--gold)' }}>Sacred Story</em>
                    </h2>
                    <div className="w-12 h-px mb-6 lg:mb-8" style={{ background: 'var(--gold)' }} />
                    <p className="text-[13px] leading-loose mb-10 lg:mb-12 max-w-[400px]" style={{ color: 'rgba(245,240,232,0.55)' }}>
                        A 7th-generation craft where every thread is meticulously tied and dyed by hand before a single pass of the shuttle. Motifs inspired by the Konark Sun Temple and Lord Jagannath rituals are encoded into each weave.
                    </p>
                    <Link to="/story" className="btn-gold self-start inline-flex items-center gap-2">Learn More <ArrowUpRight size={14} /></Link>
                </div>

            </div>
        </section>
    );
};

export default IkatDeepDive;
