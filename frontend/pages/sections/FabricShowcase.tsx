import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Play, X, ArrowRight } from "lucide-react";

const FabricShowcase: React.FC = () => {
    const [isOpen, setIsOpen] = useState(false);

    return (
        <section className="relative w-full">
            {/* Hero Header */}
            <div className="max-w-7xl mx-auto px-6 py-20 text-center">
                <motion.span
                    initial={{ opacity: 0, y: 10 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="font-sans text-[0.6875rem] tracking-[0.3em] uppercase text-[#C9A84C] mb-4 block font-bold"
                >
                    Artisanal Heritage
                </motion.span>
                <motion.h1
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.1 }}
                    viewport={{ once: true }}
                    className="font-serif text-5xl md:text-7xl text-[#1a120b] tracking-tight mb-8"
                >
                    The Art of the Weave
                </motion.h1>
                <motion.p
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    transition={{ delay: 0.2 }}
                    viewport={{ once: true }}
                    className="max-w-2xl mx-auto font-sans text-stone-500 leading-relaxed italic"
                >
                    Experience the rhythmic pulse of the handloom. Each thread tells a story of patience, a legacy of precision, and the timeless elegance of Tanvo.
                </motion.p>
            </div>

            {/* Video Showcase Section */}
            <div className="relative w-full px-4 md:px-12 lg:px-20 mb-32">
                <motion.div
                    initial={{ opacity: 0, scale: 0.98 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.8 }}
                    viewport={{ once: true }}
                    className="relative group cursor-pointer overflow-hidden rounded-sm shadow-2xl aspect-[21/9] w-full bg-stone-100"
                    onClick={() => setIsOpen(true)}
                >
                    {/* Cinematic Video Thumbnail */}
                    <img
                        alt="Macro detail of gold zari embroidery"
                        className="w-full h-full object-cover brightness-75 group-hover:scale-105 transition-transform duration-1000"
                        src="https://lh3.googleusercontent.com/aida-public/AB6AXuBuHun6wMNCczDv63AuwYtYlMO4tQ6iIGiRoMnAg9NNNZ9GDMFH5xm4mxB8LFbyeX-lHABXCJTNqPTnwo-yHXkDpYInU_h0kpuMB523hNR0KwN1oaEXppE5oNH2FIKZ7hMJRMVtvlDOnzl7PJNmO9yxnBOMeC-IDnV0u5WAPEsqwSfPdCpj1rm988L3ozmi8tQOTWv2QUsLc836btTo_D_jDXK8UDUQovldRHZbsoIrhkZR3jJfSu0LDElveBkLSMTyftathm6FaQ"
                    />

                    {/* Overlay Gradient */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent"></div>

                    {/* Centered Play Button */}
                    <div className="absolute inset-0 flex items-center justify-center">
                        <div className="relative">
                            <motion.div
                                animate={{ scale: [1, 1.2, 1] }}
                                transition={{ repeat: Infinity, duration: 2 }}
                                className="absolute inset-0 rounded-full bg-[#C9A84C]/30"
                            ></motion.div>
                            <div className="relative z-10 w-20 h-20 flex items-center justify-center rounded-full bg-white/90 border border-[#C9A84C]/20 shadow-xl group-hover:bg-[#C9A84C] transition-colors duration-500">
                                <Play className="w-8 h-8 text-[#C9A84C] group-hover:text-white fill-current transition-colors ml-1" />
                            </div>
                        </div>
                    </div>

                    {/* Captions */}
                    <div className="absolute bottom-12 left-12">
                        <h2 className="font-serif text-3xl md:text-4xl text-white mb-2 italic">Fabric in Motion</h2>
                        <div className="flex items-center gap-4">
                            <span className="h-[1px] w-12 bg-[#C9A84C]"></span>
                            <p className="font-sans text-white/80 tracking-widest uppercase text-[10px] font-bold">A film by Tanvo Atelier</p>
                        </div>
                    </div>
                </motion.div>
            </div>

            {/* Video Modal */}
            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="fixed inset-0 z-[100] flex items-center justify-center p-4 md:p-12 bg-black/90 backdrop-blur-sm"
                        onClick={() => setIsOpen(false)}
                    >
                        <motion.div
                            initial={{ scale: 0.9, opacity: 0 }}
                            animate={{ scale: 1, opacity: 1 }}
                            exit={{ scale: 0.9, opacity: 0 }}
                            className="relative w-full max-w-6xl aspect-video bg-black rounded-lg overflow-hidden shadow-2xl"
                            onClick={(e) => e.stopPropagation()}
                        >
                            <video
                                className="w-full h-full object-contain"
                                controls
                                autoPlay
                                src="/EditorialBanner.mp4" // Fallback video for demo
                            />
                            <button
                                className="absolute top-6 right-6 text-white/70 hover:text-white transition-colors"
                                onClick={() => setIsOpen(false)}
                            >
                                <X className="w-8 h-8" />
                            </button>
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>
        </section>
    );
};

export default FabricShowcase;
