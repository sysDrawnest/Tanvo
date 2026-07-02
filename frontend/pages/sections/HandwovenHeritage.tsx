import React from 'react';
import { Link } from 'react-router-dom';

const HandwovenHeritage: React.FC = () => {
    return (
        <section className="bg-white py-10 md:py-14 overflow-hidden selection:bg-[#780000] selection:text-white">
            <div className="max-w-[1440px] mx-auto px-6 md:px-12 flex flex-col items-center text-center">
                
                {/* Title */}
                <h2 className="font-headline font-normal text-4xl md:text-6xl lg:text-[5rem] tracking-tight text-[#0D0B0A] uppercase mb-6 md:mb-8 w-full" style={{ lineHeight: '0.95' }}>
                    <span className="block">EVERY THREAD</span>
                    <span className="block text-[#780000] italic font-serif">CARRIES A STORY</span>
                </h2>

                {/* Hero Image with Stats Overlay */}
                <div className="w-full max-w-7xl relative group mb-8 md:mb-10">
                    <div className="w-full h-[240px] md:h-[340px] lg:h-[420px] overflow-hidden bg-[#F9F5EE] relative">
                        <img 
                            src="/Master_weaver_creating_Sambalpur…_2K_202607021325.jpeg" 
                            alt="Master Weaver"
                            className="w-full h-full object-cover object-center transform transition-transform duration-[1.5s] ease-out group-hover:scale-105"
                        />
                        {/* Stats Strip Overlay */}
                        <div className="absolute bottom-0 left-0 right-0 bg-white/85 backdrop-blur-md border-t border-[#0D0B0A]/10 py-3 md:py-4">
                            <div className="grid grid-cols-4 divide-x divide-[#0D0B0A]/10">
                                <div className="flex flex-col items-center justify-center px-1">
                                    <span className="font-label text-[9px] md:text-xs uppercase tracking-[0.2em] text-[#0D0B0A] font-bold text-center">15 Days</span>
                                </div>
                                <div className="flex flex-col items-center justify-center px-1">
                                    <span className="font-label text-[9px] md:text-xs uppercase tracking-[0.2em] text-[#0D0B0A] font-bold text-center">7 Gen</span>
                                </div>
                                <div className="flex flex-col items-center justify-center px-1">
                                    <span className="font-label text-[9px] md:text-xs uppercase tracking-[0.2em] text-[#0D0B0A] font-bold text-center">100% Hand</span>
                                </div>
                                <div className="flex flex-col items-center justify-center px-1">
                                    <span className="font-label text-[9px] md:text-xs uppercase tracking-[0.2em] text-[#0D0B0A] font-bold text-center">GI Cert.</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Quote / Subtext */}
                <div className="max-w-4xl mx-auto px-4 mb-6 md:mb-10">
                    <p className="font-serif text-xl md:text-3xl lg:text-4xl text-[#0D0B0A] leading-[1.3]">
                        "Handwoven over 15 days by artisans whose families have woven for seven generations."
                    </p>
                </div>

                {/* CTA */}
                <Link to="/about" className="group flex items-center justify-center gap-4 text-[#0D0B0A] hover:text-[#780000] transition-colors duration-300 mt-2">
                    <span className="font-label text-xs md:text-sm uppercase tracking-[0.2em] font-bold">Discover the Craft</span>
                    <span className="material-symbols-outlined transform transition-transform duration-300 group-hover:translate-x-2">arrow_right_alt</span>
                </Link>

            </div>
        </section>
    );
};

export default HandwovenHeritage;
