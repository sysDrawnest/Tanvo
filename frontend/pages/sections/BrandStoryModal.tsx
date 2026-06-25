import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X } from 'lucide-react';
import { Link } from 'react-router-dom';

const BrandStoryModal: React.FC = () => {
    const [isOpen, setIsOpen] = useState(false);

    // Trigger modal automatically after 2 seconds for dramatic entry
    useEffect(() => {
        const timer = setTimeout(() => {
            setIsOpen(true);
        }, 2000);
        return () => clearTimeout(timer);
    }, []);

    return (
        <AnimatePresence>
            {isOpen && (
                <div className="fixed inset-0 z-50 flex items-center justify-center p-0 md:p-8">
                    {/* Dark backdrop overlay */}
                    <motion.div 
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.8 }}
                        className="absolute inset-0 bg-[#0D0B0A]/80 backdrop-blur-sm"
                        onClick={() => setIsOpen(false)}
                    />

                    {/* Modal Container */}
                    <motion.div 
                        initial={{ opacity: 0, scale: 0.98, y: 20 }}
                        animate={{ opacity: 1, scale: 1, y: 0 }}
                        exit={{ opacity: 0, scale: 0.98, y: 10 }}
                        transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
                        className="relative w-full h-full md:w-[80vw] md:h-[70vh] max-w-[1200px] overflow-hidden bg-[#0D0B0A] shadow-2xl flex items-center"
                    >
                        {/* Autoplay Background Video */}
                        <video
                            autoPlay
                            muted
                            loop
                            playsInline
                            className="absolute inset-0 w-full h-full object-cover opacity-40 mix-blend-screen"
                        >
                            {/* Assuming a video exists. Using a placeholder or existing video format */}
                            <source src="/saree_making.mp4" type="video/mp4" />
                            <img src="https://picsum.photos/id/1011/1200/800" alt="Weaving" className="w-full h-full object-cover opacity-50" />
                        </video>

                        {/* Subtle dark overlays for text readability */}
                        <div className="absolute inset-0 bg-gradient-to-t md:bg-gradient-to-r from-[#0D0B0A]/95 via-[#0D0B0A]/70 to-transparent" />
                        <div className="absolute inset-0 bg-[#0D0B0A]/20" />

                        {/* Close Button */}
                        <button 
                            onClick={() => setIsOpen(false)}
                            className="absolute top-6 right-6 md:top-8 md:right-8 z-20 p-2 text-white/40 hover:text-white transition-colors duration-300"
                        >
                            <X size={32} strokeWidth={1} />
                        </button>

                        {/* Content */}
                        <div className="relative z-10 px-8 py-16 md:px-24 md:py-0 max-w-xl flex flex-col justify-end md:justify-center h-full w-full items-center text-center md:items-start md:text-left">
                            <motion.span 
                                initial={{ opacity: 0, y: 15 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: 0.4, duration: 0.8 }}
                                className="block mb-4 md:mb-6 tracking-[0.25em] uppercase text-[#C9A84C] text-[10px] md:text-xs font-semibold"
                                style={{ fontFamily: "'Inter', sans-serif" }}
                            >
                                THE TANVO STORY
                            </motion.span>

                            <motion.h2 
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: 0.6, duration: 1 }}
                                className="text-[#F9F5EE] text-4xl md:text-5xl lg:text-[64px] mb-6 font-light leading-[1.1]"
                                style={{ fontFamily: "'Playfair Display', serif" }}
                            >
                                The Real Stories<br />
                                Behind Our Brand
                            </motion.h2>

                            <motion.p 
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: 0.8, duration: 1 }}
                                className="text-[#F9F5EE]/80 text-sm md:text-base leading-relaxed mb-10 max-w-sm md:max-w-md"
                                style={{ fontFamily: "'Raleway', sans-serif" }}
                            >
                                Every saree carries the hands, heritage, and patience of the artisans who create it.
                            </motion.p>

                            <motion.div
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: 1, duration: 1 }}
                            >
                                <Link 
                                    to="/story"
                                    className="inline-block border border-[#C9A84C] text-[#F9F5EE] px-8 py-4 text-[11px] md:text-xs tracking-[0.15em] uppercase transition-all duration-500 hover:bg-[#780000] hover:border-[#780000]"
                                    style={{ fontFamily: "'Inter', sans-serif" }}
                                    onClick={() => setIsOpen(false)}
                                >
                                    Discover Our Heritage
                                </Link>
                            </motion.div>
                        </div>
                    </motion.div>
                </div>
            )}
        </AnimatePresence>
    );
};

export default BrandStoryModal;