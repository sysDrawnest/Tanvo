import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';

const ModernMuse: React.FC = () => {
    return (
        <section className="container mx-auto px-4 py-16 md:py-24 flex justify-center">
            <div className="relative w-full max-w-[1100px] aspect-[4/5] md:aspect-[16/9] bg-[#F9F5EE] border border-[#C9A84C] shadow-2xl overflow-hidden">
                
                {/* Hero Image Background */}
                <div className="absolute inset-0 w-full h-full overflow-hidden bg-black">
                    <motion.img 
                        initial={{ scale: 1.1, opacity: 0 }}
                        whileInView={{ scale: 1, opacity: 1 }}
                        transition={{ duration: 1.8, ease: [0.16, 1, 0.3, 1] }}
                        viewport={{ once: true }}
                        alt="TANVO Modern Muse Editorial" 
                        className="w-full h-full object-cover object-[center_30%]" 
                        src="/IMG202606240805.jpeg" 
                    />
                    {/* Dark Overlay for Text Legibility (Editorial Gradient) */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent md:bg-gradient-to-tr md:from-black/70 md:via-black/20 md:to-transparent"></div>
                </div>

                {/* Content Overlay (Bottom-Left) */}
                <div className="absolute bottom-0 left-0 p-6 md:p-16 max-w-xl text-white">
                    <div className="flex flex-col space-y-4 md:space-y-6">
                        
                        {/* Brand Label */}
                        <motion.div 
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.2, duration: 1, ease: [0.16, 1, 0.3, 1] }}
                            viewport={{ once: true }}
                        >
                            <span className="font-sans text-xs tracking-[0.3em] uppercase text-white/80">
                                TANVO PRESENTS
                            </span>
                        </motion.div>

                        {/* Heading */}
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.4, duration: 1, ease: [0.16, 1, 0.3, 1] }}
                            viewport={{ once: true }}
                        >
                            <h2 className="font-serif text-4xl md:text-[64px] leading-none mb-4 text-white drop-shadow-md">
                                THE MODERN MUSE
                            </h2>
                            <p className="font-sans text-sm md:text-lg text-white/90 max-w-md leading-relaxed drop-shadow-sm">
                                Where heritage weaving meets contemporary elegance. A curated dialogue between ancestral craft and modern silhouette.
                            </p>
                        </motion.div>

                        {/* CTA Button */}
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.6, duration: 1, ease: [0.16, 1, 0.3, 1] }}
                            viewport={{ once: true }}
                            className="pt-2 md:pt-4"
                        >
                            <Link 
                                to="/shop?style=Modern,Designer"
                                className="group relative inline-flex px-8 md:px-10 py-4 md:py-5 bg-[#780000] text-white font-sans text-xs md:text-sm uppercase tracking-widest rounded-[4px] overflow-hidden transition-all duration-500 hover:bg-[#4f0000] hover:shadow-xl active:scale-95"
                            >
                                <span className="relative z-10">EXPLORE COLLECTION</span>
                                <div className="absolute inset-0 w-0 bg-black/10 group-hover:w-full transition-all duration-500"></div>
                            </Link>
                        </motion.div>
                    </div>
                </div>

                {/* Floating Brand Aesthetic Detail */}
                <motion.div 
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 0.4 }}
                    transition={{ delay: 0.8, duration: 1 }}
                    viewport={{ once: true }}
                    className="absolute bottom-8 right-8 md:right-12 hidden md:block"
                >
                    <p className="font-serif text-white text-xs md:text-sm tracking-[0.5em] uppercase [writing-mode:vertical-lr]">HERITAGE HOUSE</p>
                </motion.div>
            </div>
        </section>
    );
};

export default ModernMuse;
