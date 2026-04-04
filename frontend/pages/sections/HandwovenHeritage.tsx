import React from 'react';
import { Link } from 'react-router-dom';

const HandwovenHeritage: React.FC = () => {
    return (
        <section className="relative overflow-hidden" style={{ backgroundImage: 'radial-gradient(circle at 2px 2px, rgba(147, 39, 42, 0.03) 1px, transparent 0)', backgroundSize: '24px 24px' }}>
            <div className="flex flex-col md:flex-row min-h-[870px]">
                {/* Left Content Side */}
                <div className="w-full md:w-1/2 flex flex-col justify-center px-8 md:px-24 py-16 md:py-24 z-10">
                    <div className="max-w-xl space-y-8">
                        <h1 className="text-4xl md:text-6xl font-headline font-bold text-on-background leading-tight">
                            Every Saree is Handwoven, Not Manufactured
                        </h1>
                        <p className="text-xl md:text-2xl font-body font-light text-on-surface-variant leading-relaxed italic">
                            Crafted by skilled artisans across Odisha, each Tanvo piece carries generations of tradition, patience, and human touch — no machines, no shortcuts.
                        </p>
                        <div className="h-px w-24 bg-primary/20"></div>
                        <p className="text-base text-on-surface-variant leading-relaxed">
                            Our sarees are woven thread by thread using traditional techniques like Sambalpuri Ikat, Bomkai, and Khandua. Each piece takes days — sometimes weeks — to complete, making every saree unique.
                        </p>
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-y-6 gap-x-8 py-4">
                            <div className="flex items-start gap-3">
                                <span className="material-symbols-outlined text-secondary" style={{ fontVariationSettings: "'FILL' 1" }}>check_circle</span>
                                <span className="text-sm font-label uppercase tracking-widest text-on-surface">100% Handmade by Master Weavers</span>
                            </div>
                            <div className="flex items-start gap-3">
                                <span className="material-symbols-outlined text-secondary" style={{ fontVariationSettings: "'FILL' 1" }}>verified</span>
                                <span className="text-sm font-label uppercase tracking-widest text-on-surface">GI Certified Authentic Handloom</span>
                            </div>
                            <div className="flex items-start gap-3">
                                <span className="material-symbols-outlined text-secondary" style={{ fontVariationSettings: "'FILL' 1" }}>groups</span>
                                <span className="text-sm font-label uppercase tracking-widest text-on-surface">Supports 7th Generation Artisan Families</span>
                            </div>
                            <div className="flex items-start gap-3">
                                <span className="material-symbols-outlined text-secondary" style={{ fontVariationSettings: "'FILL' 1" }}>eco</span>
                                <span className="text-sm font-label uppercase tracking-widest text-on-surface">No Mass Production</span>
                            </div>
                        </div>
                        <div className="pt-6">
                            <Link to="/shop" className="group relative px-10 py-5 bg-on-background text-white rounded-lg overflow-hidden transition-all duration-500 hover:shadow-2xl hover:shadow-primary/20 inline-block">
                                <span className="relative z-10 font-label uppercase tracking-[0.15em] text-sm font-semibold">Explore Handwoven Collection</span>
                                <div className="absolute inset-0 bg-primary translate-y-full group-hover:translate-y-0 transition-transform duration-500 ease-out"></div>
                            </Link>
                        </div>
                    </div>
                </div>
                {/* Right Image Side */}
                <div className="w-full md:w-1/2 relative min-h-[500px] md:min-h-full">
                    <img alt="Traditional Weaver" className="absolute inset-0 w-full h-full object-cover" data-alt="Close-up of an elderly Indian artisan weaving silk on a traditional wooden handloom, warm morning sunlight highlighting fine threads and complex textures" src="https://lh3.googleusercontent.com/aida-public/AB6AXuCdg7Ev_2hzinZ3ELEiaInm85FF5cZlgC3vjDdz0dNR_5uT4IiQNlFThWx02_8d06i2loTg_isOhanjJ-XgBXwD-7k3DYSXsQ0sK299Dac6LbvjJmC1kxyaGNcHjfKqM2ha6jBHoYHFtoC01UMM9aZuUX9eFXnAZmP-cpSPrKM2hmNjOcawJFf_SRb7nmoR1VqIFZtR3wRMta_51owM7im8pFVUJIkDcyqlH5ayYK0PtWIo3z1HxUK-4v3km41dOKv787phEhTaww" />
                    {/* Decorative Element */}
                    <div className="absolute top-12 left-12 p-6 bg-surface/90 backdrop-blur-md hidden lg:block max-w-xs border-l-4 border-primary">
                        <p className="font-headline italic text-on-surface leading-snug">
                            "The rhythm of the loom is the heartbeat of our village. Every thread we cross is a story we preserve."
                        </p>
                        <p className="mt-2 text-xs font-label uppercase tracking-widest text-secondary">— S. Mahapatra, Master Weaver</p>
                    </div>
                </div>
            </div>
            {/* Process Strip */}
            <div className="bg-surface-container py-12 px-8 md:px-24">
                <div className="max-w-[1440px] mx-auto">
                    <div className="flex flex-row md:flex-row justify-between items-center gap-8 md:gap-12 relative overflow-x-auto pb-4 scrollbar-hide">
                        {/* Connecting Line (Desktop) */}
                        <div className="absolute top-[1.35rem] left-0 w-full h-px bg-outline-variant/30 hidden md:block"></div>
                        <div className="absolute top-[1.35rem] left-0 w-1/3 h-px bg-primary hidden md:block"></div>
                        {/* Step 1 */}
                        <div className="flex flex-row md:flex-col items-center md:items-start relative z-10 group cursor-default flex-shrink-0 gap-3 md:gap-0">
                            <div className="w-10 h-10 md:w-12 md:h-12 rounded-full bg-primary flex items-center justify-center text-white md:mb-4 transition-transform group-hover:scale-110">
                                <span className="material-symbols-outlined text-sm md:text-base" style={{ fontVariationSettings: "'FILL' 1" }}>palette</span>
                            </div>
                            <div className="flex flex-col">
                                <span className="text-[10px] md:text-xs font-label uppercase tracking-[0.1rem] md:tracking-[0.2em] text-primary font-bold whitespace-nowrap">Thread Dyeing</span>
                                <p className="text-[0.65rem] text-on-surface-variant mt-1 hidden md:block">Organic pigments &amp; sun drying</p>
                            </div>
                        </div>
                        {/* Step 2 */}
                        <div className="flex flex-row md:flex-col items-center md:items-start relative z-10 group cursor-default flex-shrink-0 gap-3 md:gap-0">
                            <div className="w-10 h-10 md:w-12 md:h-12 rounded-full bg-surface-container-highest border-2 border-primary/20 flex items-center justify-center text-on-surface md:mb-4 group-hover:border-primary transition-all">
                                <span className="material-symbols-outlined text-sm md:text-base">settings_suggest</span>
                            </div>
                            <div className="flex flex-col">
                                <span className="text-[10px] md:text-xs font-label uppercase tracking-[0.1rem] md:tracking-[0.2em] text-on-surface opacity-80 whitespace-nowrap">Handloom Setup</span>
                                <p className="text-[0.65rem] text-on-surface-variant mt-1 hidden md:block">Drafting the warp patterns</p>
                            </div>
                        </div>
                        {/* Step 3 */}
                        <div className="flex flex-row md:flex-col items-center md:items-start relative z-10 group cursor-default flex-shrink-0 gap-3 md:gap-0">
                            <div className="w-10 h-10 md:w-12 md:h-12 rounded-full bg-surface-container-highest border-2 border-primary/20 flex items-center justify-center text-on-surface md:mb-4 group-hover:border-primary transition-all">
                                <span className="material-symbols-outlined text-sm md:text-base">gesture</span>
                            </div>
                            <div className="flex flex-col">
                                <span className="text-[10px] md:text-xs font-label uppercase tracking-[0.1rem] md:tracking-[0.2em] text-on-surface opacity-80 whitespace-nowrap">Weaving</span>
                                <p className="text-[0.65rem] text-on-surface-variant mt-1 hidden md:block">Intricate weft insertion</p>
                            </div>
                        </div>
                        {/* Step 4 */}
                        <div className="flex flex-row md:flex-col items-center md:items-start relative z-10 group cursor-default flex-shrink-0 gap-3 md:gap-0">
                            <div className="w-10 h-10 md:w-12 md:h-12 rounded-full bg-surface-container-highest border-2 border-primary/20 flex items-center justify-center text-on-surface md:mb-4 group-hover:border-primary transition-all">
                                <span className="material-symbols-outlined text-sm md:text-base">auto_awesome</span>
                            </div>
                            <div className="flex flex-col">
                                <span className="text-[10px] md:text-xs font-label uppercase tracking-[0.1rem] md:tracking-[0.2em] text-on-surface opacity-80 whitespace-nowrap">Finished Saree</span>
                                <p className="text-[0.65rem] text-on-surface-variant mt-1 hidden md:block">A masterpiece is ready</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default HandwovenHeritage;
