import React from 'react';
import { Link } from 'react-router-dom';

const HandwovenHeritage: React.FC = () => {
    return (
        <section className="relative overflow-hidden bg-[#F9F5EE]" style={{ backgroundImage: 'radial-gradient(circle at 2px 2px, rgba(120, 0, 0, 0.02) 1px, transparent 0)', backgroundSize: '24px 24px' }}>
            <div className="flex flex-col md:flex-row min-h-[580px] lg:min-h-[640px]">
                {/* Left Content Side */}
                <div className="w-full md:w-1/2 flex flex-col justify-center px-6 md:px-16 py-12 md:py-16 z-10">
                    <div className="max-w-xl space-y-6">
                        <h1 className="text-3xl md:text-5xl font-headline font-bold text-[#0D0B0A] leading-tight font-serif">
                            Every Saree is Handwoven, Not Manufactured
                        </h1>
                        <p className="text-lg md:text-xl font-body font-light text-[#59413d] leading-relaxed italic">
                            Crafted by skilled artisans across Odisha, each Tanvo piece carries generations of tradition, patience, and human touch — no machines, no shortcuts.
                        </p>
                        <div className="h-px w-20 bg-[#780000]/20"></div>
                        <p className="text-sm md:text-base text-[#59413d]/90 leading-relaxed font-body">
                            Our sarees are woven thread by thread using traditional techniques like Sambalpuri Ikat, Bomkai, and Khandua. Each piece takes days — sometimes weeks — to complete, making every saree unique.
                        </p>
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-y-4 gap-x-6 py-2">
                            <div className="flex items-center gap-3">
                                <span className="material-symbols-outlined text-[#C9A84C] shrink-0" style={{ fontVariationSettings: "'FILL' 1" }}>check_circle</span>
                                <span className="text-xs font-label uppercase tracking-widest text-[#0D0B0A] font-bold">100% Handmade by Master Weavers</span>
                            </div>
                            <div className="flex items-center gap-3">
                                <span className="material-symbols-outlined text-[#C9A84C] shrink-0" style={{ fontVariationSettings: "'FILL' 1" }}>verified</span>
                                <span className="text-xs font-label uppercase tracking-widest text-[#0D0B0A] font-bold">GI Certified Authentic Handloom</span>
                            </div>
                            <div className="flex items-center gap-3">
                                <span className="material-symbols-outlined text-[#C9A84C] shrink-0" style={{ fontVariationSettings: "'FILL' 1" }}>groups</span>
                                <span className="text-xs font-label uppercase tracking-widest text-[#0D0B0A] font-bold">Supports 7th Gen Artisans</span>
                            </div>
                            <div className="flex items-center gap-3">
                                <span className="material-symbols-outlined text-[#C9A84C] shrink-0" style={{ fontVariationSettings: "'FILL' 1" }}>eco</span>
                                <span className="text-xs font-label uppercase tracking-widest text-[#0D0B0A] font-bold">No Mass Production</span>
                            </div>
                        </div>
                        <div className="pt-4">
                            <Link to="/shop" className="group relative px-7 py-3.5 bg-gradient-to-r from-[#780000] to-[#C1121F] text-white font-label text-xs rounded-lg overflow-hidden transition-all duration-500 hover:shadow-lg hover:shadow-[#780000]/10 inline-flex items-center justify-center uppercase tracking-[0.2em] font-bold h-[48px]">
                                <span className="relative z-10 font-label uppercase tracking-[0.2em] text-[11px] font-bold">Explore Handwoven Collection</span>
                                <div className="absolute inset-0 bg-[#780000] translate-y-full group-hover:translate-y-0 transition-transform duration-500 ease-out"></div>
                            </Link>
                        </div>
                    </div>
                </div>
                {/* Right Image Side */}
                <div className="w-full md:w-1/2 relative min-h-[320px] md:min-h-full">
                    <img alt="Traditional Weaver" className="absolute inset-0 w-full h-full object-cover" data-alt="Close-up of an elderly Indian artisan weaving silk on a traditional wooden handloom, warm morning sunlight highlighting fine threads and complex textures" src="https://lh3.googleusercontent.com/aida-public/AB6AXuCdg7Ev_2hzinZ3ELEiaInm85FF5cZlgC3vjDdz0dNR_5uT4IiQNlFThWx02_8d06i2loTg_isOhanjJ-XgBXwD-7k3DYSXsQ0sK299Dac6LbvjJmC1kxyaGNcHjfKqM2ha6jBHoYHFtoC01UMM9aZuUX9eFXnAZmP-cpSPrKM2hmNjOcawJFf_SRb7nmoR1VqIFZtR3wRMta_51owM7im8pFVUJIkDcyqlH5ayYK0PtWIo3z1HxUK-4v3km41dOKv787phEhTaww" />
                    {/* Decorative Element */}
                    <div className="absolute bottom-12 left-12 p-6 bg-white rounded-xl shadow-lg hidden lg:block max-w-xs border-l-4 border-[#780000]">
                        <p className="font-headline italic text-[#0D0B0A] leading-relaxed text-sm font-serif">
                            "The rhythm of the loom is the heartbeat of our village. Every thread we cross is a story we preserve."
                        </p>
                        <p className="mt-2 text-[10px] font-label uppercase tracking-[0.2em] text-[#C9A84C] font-bold">— S. Mahapatra, Master Weaver</p>
                    </div>
                </div>
            </div>
            {/* Process Strip */}
            <div className="bg-[#FAF6F0] border-t border-[#E2D9C8]/40 py-8 px-6 md:px-16">
                <div className="max-w-[1440px] mx-auto">
                    <div className="flex flex-row justify-between items-center gap-8 md:gap-12 relative overflow-x-auto pb-4 scrollbar-hide">
                        {/* Connecting Line (Desktop) */}
                        <div className="absolute top-[1.35rem] left-0 w-full h-px bg-[#E2D9C8]/40 hidden md:block"></div>
                        <div className="absolute top-[1.35rem] left-0 w-1/3 h-px bg-[#780000] hidden md:block"></div>
                        {/* Step 1 */}
                        <div className="flex flex-row md:flex-col items-center md:items-start relative z-10 group cursor-default flex-shrink-0 gap-3 md:gap-0">
                            <div className="w-10 h-10 md:w-12 md:h-12 rounded-full bg-[#780000] flex items-center justify-center text-white md:mb-3 transition-transform group-hover:scale-110">
                                <span className="material-symbols-outlined text-sm md:text-base" style={{ fontVariationSettings: "'FILL' 1" }}>palette</span>
                            </div>
                            <div className="flex flex-col">
                                <span className="text-[10px] md:text-xs font-label uppercase tracking-[0.15em] text-[#780000] font-bold whitespace-nowrap">Thread Dyeing</span>
                                <p className="text-[11px] text-[#59413d]/70 mt-0.5 hidden md:block font-body-md">Organic pigments &amp; sun drying</p>
                            </div>
                        </div>
                        {/* Step 2 */}
                        <div className="flex flex-row md:flex-col items-center md:items-start relative z-10 group cursor-default flex-shrink-0 gap-3 md:gap-0">
                            <div className="w-10 h-10 md:w-12 md:h-12 rounded-full bg-white border-2 border-[#E2D9C8] flex items-center justify-center text-[#59413d] md:mb-3 group-hover:border-[#780000] transition-all">
                                <span className="material-symbols-outlined text-sm md:text-base">settings_suggest</span>
                            </div>
                            <div className="flex flex-col">
                                <span className="text-[10px] md:text-xs font-label uppercase tracking-[0.15em] text-[#59413d] font-bold whitespace-nowrap">Handloom Setup</span>
                                <p className="text-[11px] text-[#59413d]/70 mt-0.5 hidden md:block font-body-md">Drafting the warp patterns</p>
                            </div>
                        </div>
                        {/* Step 3 */}
                        <div className="flex flex-row md:flex-col items-center md:items-start relative z-10 group cursor-default flex-shrink-0 gap-3 md:gap-0">
                            <div className="w-10 h-10 md:w-12 md:h-12 rounded-full bg-white border-2 border-[#E2D9C8] flex items-center justify-center text-[#59413d] md:mb-3 group-hover:border-[#780000] transition-all">
                                <span className="material-symbols-outlined text-sm md:text-base">gesture</span>
                            </div>
                            <div className="flex flex-col">
                                <span className="text-[10px] md:text-xs font-label uppercase tracking-[0.15em] text-[#59413d] font-bold whitespace-nowrap">Weaving</span>
                                <p className="text-[11px] text-[#59413d]/70 mt-0.5 hidden md:block font-body-md">Intricate weft insertion</p>
                            </div>
                        </div>
                        {/* Step 4 */}
                        <div className="flex flex-row md:flex-col items-center md:items-start relative z-10 group cursor-default flex-shrink-0 gap-3 md:gap-0">
                            <div className="w-10 h-10 md:w-12 md:h-12 rounded-full bg-white border-2 border-[#E2D9C8] flex items-center justify-center text-[#59413d] md:mb-3 group-hover:border-[#780000] transition-all">
                                <span className="material-symbols-outlined text-sm md:text-base">auto_awesome</span>
                            </div>
                            <div className="flex flex-col">
                                <span className="text-[10px] md:text-xs font-label uppercase tracking-[0.15em] text-[#59413d] font-bold whitespace-nowrap">Finished Saree</span>
                                <p className="text-[11px] text-[#59413d]/70 mt-0.5 hidden md:block font-body-md">A masterpiece is ready</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default HandwovenHeritage;
