import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';

const BrandStorySection: React.FC = () => {
    return (
        <section className="relative w-full h-[80vh] min-h-[600px] overflow-hidden bg-[#0D0B0A] flex items-center">
            {/* Autoplay Background Video */}
            <video
                autoPlay
                muted
                loop
                playsInline
                className="absolute inset-0 w-full h-full object-cover opacity-80"
            >
                <source src="/VID02606251815.mp4" type="video/mp4" />
            </video>

            {/* Lighter dark overlays - just enough for text readability */}
            <div className="absolute inset-0 bg-gradient-to-t md:bg-gradient-to-r from-[#0D0B0A]/50 via-[#0D0B0A]/20 to-transparent" />
            <div className="absolute inset-0 bg-[#0D0B0A]/5" />

            {/* Content Container */}
            <div className="relative z-10 max-w-[1400px] w-full mx-auto px-8 md:px-16 flex flex-col justify-center h-full text-center md:text-left items-center md:items-start">
                <motion.span 
                    initial={{ opacity: 0, y: 15 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: "-100px" }}
                    transition={{ duration: 0.8 }}
                    className="block mb-4 md:mb-6 tracking-[0.25em] uppercase text-[#C9A84C] text-[10px] md:text-xs font-semibold"
                    style={{ fontFamily: "'Inter', sans-serif" }}
                >
                    THE TANVO STORY
                </motion.span>

                <motion.h2 
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: "-100px" }}
                    transition={{ delay: 0.2, duration: 1 }}
                    className="text-[#F9F5EE] text-4xl md:text-5xl lg:text-[64px] mb-6 font-light leading-[1.1]"
                    style={{ fontFamily: "'Playfair Display', serif" }}
                >
                    The Real Stories<br />
                    Behind Our Brand
                </motion.h2>

                <motion.p 
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: "-100px" }}
                    transition={{ delay: 0.4, duration: 1 }}
                    className="text-[#F9F5EE] text-sm md:text-base leading-relaxed mb-10 max-w-sm md:max-w-md"
                    style={{ fontFamily: "'Raleway', sans-serif" }}
                >
                    Every saree carries the hands, heritage, and patience of the artisans who create it.
                </motion.p>

                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: "-100px" }}
                    transition={{ delay: 0.6, duration: 1 }}
                >
                    <Link 
                        to="/story"
                        className="inline-block border border-[#C9A84C] text-[#F9F5EE] px-8 py-4 text-[11px] md:text-xs tracking-[0.15em] uppercase transition-all duration-500 hover:bg-[#780000] hover:border-[#780000]"
                        style={{ fontFamily: "'Inter', sans-serif" }}
                    >
                        Discover Our Heritage
                    </Link>
                </motion.div>
            </div>
        </section>
    );
};

export default BrandStorySection;