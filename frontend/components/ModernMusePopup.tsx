import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X } from 'lucide-react';
import { Link } from 'react-router-dom';

const ModernMusePopup: React.FC = () => {
    const [isOpen, setIsOpen] = useState(false);

    useEffect(() => {
        // Check if the popup has been shown today
        const hasSeenPopup = localStorage.getItem('tanvo_modern_muse_popup');
        
        if (!hasSeenPopup) {
            // Delay the popup by 3 seconds
            const timer = setTimeout(() => {
                setIsOpen(true);
            }, 3000);

            return () => clearTimeout(timer);
        }
    }, []);

    const handleClose = () => {
        setIsOpen(false);
        // Set item in local storage so it doesn't show again
        // You could store a timestamp here to expire it after 24 hours
        localStorage.setItem('tanvo_modern_muse_popup', 'true');
    };

    return (
        <AnimatePresence>
            {isOpen && (
                <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-black/60 backdrop-blur-sm font-sans">
                    {/* Modal Container */}
                    <motion.div
                        initial={{ opacity: 0, scale: 0.95, y: 20 }}
                        animate={{ opacity: 1, scale: 1, y: 0 }}
                        exit={{ opacity: 0, scale: 0.95, y: 20 }}
                        transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }} // smooth spring
                        className="relative w-full max-w-4xl bg-[#FCFAF5] rounded-sm shadow-2xl flex flex-col md:flex-row overflow-hidden max-h-[90vh]"
                        style={{ boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.5)' }}
                    >
                        {/* Close Button */}
                        <button
                            onClick={handleClose}
                            className="absolute top-4 right-4 z-10 p-2 text-gray-500 hover:text-gray-900 transition-colors"
                            aria-label="Close popup"
                        >
                            <X size={20} strokeWidth={1.5} />
                        </button>

                        {/* Left Side: Image (Inset with padding) */}
                        <div className="w-full md:w-1/2 p-4 md:p-6 pb-0 md:pb-6 h-64 md:h-[600px]">
                            <img
                                src="/IMG202606241417.jpeg"
                                alt="The Modern Muse"
                                className="w-full h-full object-cover object-top"
                            />
                        </div>

                        {/* Right Side: Content */}
                        <div className="w-full md:w-1/2 p-8 md:p-12 flex flex-col justify-center">
                            <span className="text-[10px] sm:text-xs tracking-[0.2em] uppercase text-gray-600 mb-4 font-semibold">
                                NEW COLLECTION
                            </span>
                            
                            <h2 className="text-4xl sm:text-5xl lg:text-[56px] font-serif text-[#1C1612] leading-[1.1] mb-6">
                                THE MODERN<br />MUSE
                            </h2>
                            
                            <p className="text-base sm:text-lg text-[#333333] mb-6 leading-relaxed">
                                Where timeless Indian craftsmanship meets contemporary elegance.
                            </p>
                            
                            <p className="text-sm text-gray-600 mb-10 leading-relaxed max-w-md">
                                Discover sarees designed for weddings, celebrations and moments that deserve something extraordinary.
                            </p>
                            
                            <div className="flex flex-col items-center sm:items-start gap-4">
                                <Link
                                    to="/shop?style=Modern,Designer"
                                    onClick={handleClose}
                                    className="w-full text-center bg-[#6B1515] text-[#F9F5EE] px-8 py-4 text-sm font-semibold tracking-wider transition-all duration-300 hover:bg-[#8A1D1D] hover:shadow-lg uppercase rounded-sm"
                                >
                                    EXPLORE COLLECTION
                                </Link>
                                
                                <button
                                    onClick={handleClose}
                                    className="text-sm text-gray-600 underline underline-offset-4 hover:text-gray-900 transition-colors mt-2"
                                >
                                    Continue Browsing
                                </button>
                            </div>
                        </div>
                    </motion.div>
                </div>
            )}
        </AnimatePresence>
    );
};

export default ModernMusePopup;
