import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';

const JournalHint: React.FC = () => {
    return (
        <section 
            className="w-full py-20 md:py-32 border-y border-[#F0EAE1]"
            style={{ backgroundColor: '#F9F6F0' }} // Premium Ivory background
            data-purpose="journal-hint"
        >
            <div className="max-w-7xl mx-auto px-6 md:px-12 lg:px-16">
                {/* Responsive Split Grid Layout */}
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-start">
                    
                    {/* Left Column: Context and Title Narrative */}
                    <div className="lg:col-span-7 flex flex-col items-start">
                        <span className="text-[11px] font-medium uppercase tracking-[0.25em] text-[#706B63] mb-6 md:mb-8 block">
                            Recommended Reading
                        </span>
                        
                        <h2 className="font-sans text-3xl md:text-5xl lg:text-6xl font-light text-[#1C1B1A] leading-[1.15] tracking-tight mb-8 max-w-2xl">
                            The Real Stories <br className="hidden sm:inline" /> 
                            <span className="font-normal italic text-[#780000]">Behind Our Brand</span>
                        </h2>

                        <p className="text-[#4A4640] text-sm md:text-base font-light leading-[1.8] tracking-wide max-w-xl mb-10 md:mb-12">
                            Dive deeper into the mathematical precision of the loom, the 700-year legacy of Odisha's weavers, and our vision for modern heritage.
                        </p>

                        {/* Fine Minimalist Action Element */}
                        <div>
                            <Link
                                to="/journal"
                                className="inline-flex items-center gap-4 text-[13px] font-medium uppercase tracking-[0.2em] text-[#1C1B1A] border-b border-[#1C1B1A] pb-2 transition-all duration-300 hover:opacity-60"
                                style={{ borderRadius: '0px' }}
                            >
                                Explore the Chronicles <ArrowRight size={15} strokeWidth={1.2} />
                            </Link>
                        </div>
                    </div>

                    {/* Right Column: Architectural Typographic Anchor (Hidden on Mobile, Clean Accent on Desktop) */}
                    <div className="hidden lg:flex lg:col-span-5 h-full flex-col justify-between items-end self-stretch pt-2">
                        <div className="w-[1px] h-20 bg-[#706B63]/30"></div>
                        <div className="text-right">
                            <p 
                                className="text-[10px] uppercase tracking-[0.3em] text-[#706B63]/60 [writing-mode:vertical-rl] rotate-180 inline-block origin-center pt-4"
                                style={{ letterSpacing: '0.4em' }}
                            >
                                Volume I — Heritage Archives
                            </p>
                        </div>
                    </div>

                </div>
            </div>
        </section>
    );
};

export default JournalHint;