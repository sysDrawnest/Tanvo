import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';

const ModernMuse: React.FC = () => {
    return (
        <section className="w-full my-8 md:my-16">
            <div className="relative w-full h-[600px] md:h-[85vh] min-h-[500px] max-h-[900px] bg-[#F9F5EE] overflow-hidden">
                
                {/* Full Width Hero Image Background */}
                <div className="absolute inset-0 w-full h-full overflow-hidden">
                    <motion.img 
                        initial={{ scale: 1.15, opacity: 0 }}
                        whileInView={{ scale: 1, opacity: 1 }}
                        transition={{ duration: 2, ease: [0.16, 1, 0.3, 1] }}
                        viewport={{ once: true }}
                        alt="TANVO Modern Muse Editorial" 
                        className="w-full h-full object-cover object-center" 
                        src="/IMG202606240805.jpeg" 
                    />
                    
                    {/* Sophisticated Gradient Overlay for Full Width Impact */}
                    <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-black/80"></div>
                    <div className="absolute inset-0 bg-gradient-to-r from-black/20 to-transparent"></div>
                </div>

                {/* Content Overlay - Centered Bottom with Full Width */}
                <div className="absolute bottom-0 left-0 right-0 p-6 md:p-16 lg:p-20 text-white">
                    <div className="max-w-4xl mx-auto">
                        <div className="flex flex-col space-y-4 md:space-y-6">
                            
                            {/* Brand Label - Centered */}
                            <motion.div 
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                transition={{ delay: 0.2, duration: 1, ease: [0.16, 1, 0.3, 1] }}
                                viewport={{ once: true }}
                                className="flex justify-center"
                            >
                                <span className="font-sans text-xs tracking-[0.3em] uppercase text-white/80">
                                    TANVO PRESENTS
                                </span>
                            </motion.div>

                            {/* Heading - Centered */}
                            <motion.div
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                transition={{ delay: 0.4, duration: 1, ease: [0.16, 1, 0.3, 1] }}
                                viewport={{ once: true }}
                                className="text-center"
                            >
                                <h2 className="font-serif text-4xl md:text-6xl lg:text-7xl xl:text-8xl leading-[1.05] mb-4 text-white drop-shadow-2xl">
                                    THE MODERN MUSE
                                </h2>
                                <p className="font-sans text-sm md:text-base lg:text-lg text-white/90 max-w-2xl mx-auto leading-relaxed drop-shadow-lg">
                                    Where heritage weaving meets contemporary elegance. 
                                    <br className="hidden sm:block" />
                                    A curated dialogue between ancestral craft and modern silhouette.
                                </p>
                            </motion.div>

                            {/* CTA Button - Centered */}
                            <motion.div
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                transition={{ delay: 0.6, duration: 1, ease: [0.16, 1, 0.3, 1] }}
                                viewport={{ once: true }}
                                className="flex justify-center pt-2 md:pt-4"
                            >
                                <Link 
                                    to="/shop?style=Modern,Designer"
                                    className="group relative inline-flex items-center gap-2 px-8 md:px-10 py-4 md:py-5 bg-[#780000] text-white font-sans text-xs md:text-sm uppercase tracking-widest rounded-[4px] overflow-hidden transition-all duration-500 hover:bg-[#4f0000] hover:shadow-2xl active:scale-95"
                                >
                                    <span className="relative z-10">Explore Collection</span>
                                    <ArrowRight size={16} className="relative z-10 group-hover:translate-x-1 transition-transform duration-300" />
                                    <div className="absolute inset-0 w-0 bg-white/10 group-hover:w-full transition-all duration-500"></div>
                                </Link>
                            </motion.div>
                        </div>
                    </div>
                </div>

                {/* Floating Brand Aesthetic Details */}
                <motion.div 
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 0.3 }}
                    transition={{ delay: 0.8, duration: 1 }}
                    viewport={{ once: true }}
                    className="absolute top-8 right-8 md:right-12 hidden lg:block"
                >
                    <p className="font-serif text-white text-[10px] tracking-[0.5em] uppercase [writing-mode:vertical-lr] opacity-60">
                        HERITAGE · CRAFT · SOUL
                    </p>
                </motion.div>

                <motion.div 
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 0.2 }}
                    transition={{ delay: 1, duration: 1 }}
                    viewport={{ once: true }}
                    className="absolute bottom-8 left-8 md:left-12 hidden lg:block"
                >
                    <div className="w-px h-12 bg-white/40 mx-auto"></div>
                    <p className="font-serif text-white text-[10px] tracking-[0.3em] uppercase mt-2 opacity-60">
                        EST. 2024
                    </p>
                </motion.div>

                {/* Scroll Indicator */}
                <motion.div 
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 0.4, y: 0 }}
                    transition={{ delay: 1.5, duration: 1, repeat: Infinity, repeatType: "reverse" }}
                    className="absolute bottom-8 left-1/2 transform -translate-x-1/2 hidden md:block"
                >
                    <div className="flex flex-col items-center gap-2">
                        <span className="text-[8px] tracking-[0.3em] uppercase text-white/40">Scroll</span>
                        <div className="w-px h-8 bg-white/20"></div>
                    </div>
                </motion.div>
            </div>
        </section>
    );
};

export default ModernMuse;