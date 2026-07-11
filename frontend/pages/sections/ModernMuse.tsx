import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';

const ModernMuse: React.FC = () => {
    return (
        <section className="relative w-full overflow-visible z-10">
            {/* Main Outer Box with Background Image */}
            <div className="relative w-full h-[600px] md:h-[80vh] lg:h-[90vh] min-h-[550px] max-h-[950px] overflow-hidden bg-[#0A0A0A]">
                
                {/* Full Width Hero Image Background */}
                <div className="absolute inset-0 w-full h-full overflow-hidden">
                    <motion.img 
                        initial={{ scale: 1.15, opacity: 0 }}
                        whileInView={{ scale: 1, opacity: 1 }}
                        transition={{ duration: 2.2, ease: [0.16, 1, 0.3, 1] }}
                        viewport={{ once: true }}
                        alt="TANVO Modern Muse Editorial" 
                        className="w-full h-full object-cover object-center md:object-[center_35%]" 
                        src="/IMG202606240805.jpeg" 
                    />
                    
                    {/* Bottom black gradient overlay */}
                    <div className="absolute inset-x-0 bottom-0 h-1/2 bg-gradient-to-t from-black/90 to-transparent"></div>
                </div>

                {/* Left-Aligned Frosted Glass Panel Container */}
                <div className="absolute top-1/2 left-[5%] md:left-[8%] lg:left-[12%] transform -translate-y-1/2 w-[90%] max-w-[540px] z-20">
                    <motion.div 
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.2, duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
                        viewport={{ once: true }}
                        className="relative w-full bg-black/20 backdrop-blur-md border border-white/10 rounded-[32px] p-8 sm:p-10 md:p-12 lg:p-14 text-center shadow-[0_25px_60px_-15px_rgba(0,0,0,0.35)] flex flex-col items-center justify-center"
                    >
                        {/* Brand Label */}
                        <span className="font-sans text-[10px] md:text-xs tracking-[0.4em] uppercase text-white/80 mb-4 md:mb-6 block font-light">
                            TANVO PRESENTS
                        </span>

                        {/* Heading - Elegant Serif Stacked Title */}
                        <h2 className="font-serif text-4xl sm:text-5xl md:text-6xl lg:text-7xl leading-[1.08] mb-6 text-white tracking-tight uppercase">
                            THE MODERN
                            <br />
                            MUSE
                        </h2>

                        {/* Description */}
                        <p className="font-sans text-xs md:text-sm lg:text-base text-white/95 max-w-lg mx-auto leading-relaxed font-light">
                            Where heritage weaving meets contemporary elegance.
                            <br className="hidden sm:block" />
                            A curated dialogue between ancestral craft and modern silhouette.
                        </p>

                        {/* Overflowing CTA Button positioned absolute on the bottom edge */}
                        <div className="absolute bottom-[-24px] left-1/2 transform -translate-x-1/2 z-30">
                            <Link 
                                to="/shop?style=Modern,Designer"
                                className="group relative inline-flex items-center gap-2 px-8 py-3.5 bg-[#5A040B] border border-white/10 text-white font-sans text-xs uppercase tracking-[0.2em] font-semibold rounded-[4px] shadow-[0_12px_30px_rgba(90,4,11,0.4)] transition-all duration-300 hover:bg-[#72050E] hover:shadow-2xl active:scale-95 whitespace-nowrap"
                            >
                                <span className="relative z-10 flex items-center gap-2">
                                    Explore Collection 
                                    <span className="text-[13px] group-hover:translate-x-1 transition-transform duration-300">→</span>
                                    {/* Traditional Spool SVG Icon */}
                                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="w-3.5 h-3.5 inline-block text-[#C9A84C] group-hover:rotate-12 transition-transform duration-300">
                                        <path d="M7 4h10M9 4v2m6-2v2" />
                                        <rect x="8" y="6" width="8" height="12" rx="1" fill="currentColor" opacity="0.3" stroke="currentColor" />
                                        <path d="M8 8h8M8 11h8M8 14h8" />
                                        <path d="M7 20h10M9 18v2m6-2v2" />
                                    </svg>
                                </span>
                            </Link>
                        </div>
                    </motion.div>
                </div>

                {/* Floating Brand Aesthetic Details (Middle Right) */}
                <motion.div 
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 0.5 }}
                    transition={{ delay: 0.6, duration: 1 }}
                    viewport={{ once: true }}
                    className="absolute right-6 md:right-12 top-1/4 flex flex-col items-center gap-4 z-10 hidden md:flex"
                >
                    <div className="w-px h-16 bg-white/20"></div>
                    <p className="font-sans text-white/50 text-[9px] md:text-[10px] tracking-[0.5em] uppercase [writing-mode:vertical-lr] font-light">
                        TRADITION | CRAFT | SOUL
                    </p>
                </motion.div>

                {/* Est. 2024 Cursive Signature (Bottom Right) */}
                <motion.div 
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 0.85 }}
                    transition={{ delay: 0.8, duration: 1.2 }}
                    viewport={{ once: true }}
                    className="absolute bottom-6 md:bottom-12 right-6 md:right-12 z-10"
                >
                    <p 
                        className="text-[32px] md:text-[40px] lg:text-[48px] text-[#EDE3D0] font-light leading-none select-none"
                        style={{ fontFamily: "'Pinyon Script', cursive" }}
                    >
                        Est. 2024
                    </p>
                </motion.div>

                {/* Faint Branding Details (Bottom Left) */}
                <motion.div 
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 0.2 }}
                    transition={{ delay: 1, duration: 1.2 }}
                    viewport={{ once: true }}
                    className="absolute bottom-6 md:bottom-12 left-6 md:left-12 z-10 flex flex-col items-center gap-3"
                >
                    <div className="w-px h-12 bg-white/15"></div>
                    <p className="font-sans text-white/30 text-[8px] tracking-[0.3em] uppercase [writing-mode:vertical-lr] font-light">
                        EST. 2024
                </p>
                </motion.div>
            </div>
        </section>
    );
};

export default ModernMuse;