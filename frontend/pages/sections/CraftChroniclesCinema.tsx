import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Play, ArrowRight, X, Sparkles } from 'lucide-react';

const CraftChroniclesCinema: React.FC = () => {
    const [isModalOpen, setIsModalOpen] = useState(false);

    return (
        <div className="bg-[#fbf9f4] text-[#1b1c19] font-sans antialiased overflow-hidden">
            {/* Hero Section */}
            <section className="max-w-7xl mx-auto px-6 py-20 text-center">
                <motion.span
                    initial={{ opacity: 0, y: 10 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="block text-[10px] tracking-[0.3em] uppercase text-[#775a19] font-semibold mb-6"
                >
                    Artisanal Heritage
                </motion.span>
                <motion.h1
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.1 }}
                    viewport={{ once: true }}
                    className="font-serif text-5xl md:text-8xl text-[#1b1c19] tracking-tight mb-10 leading-[0.9]"
                >
                    The Art of the Weave
                </motion.h1>
                <motion.p
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.2 }}
                    viewport={{ once: true }}
                    className="max-w-2xl mx-auto text-lg text-[#504f4f] leading-relaxed font-light"
                >
                    Experience the rhythmic pulse of the handloom. Each thread tells a story of patience,
                    a legacy of precision, and the timeless elegance of Tanvo.
                </motion.p>
            </section>

            {/* Video Showcase Section */}
            <section className="relative w-full px-4 md:px-12 lg:px-20 mb-32">
                <motion.div
                    initial={{ opacity: 0, scale: 0.98 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.8 }}
                    viewport={{ once: true }}
                    className="relative group cursor-pointer overflow-hidden rounded-2xl shadow-2xl aspect-[21/9] w-full bg-[#e4e2dd]"
                    onClick={() => setIsModalOpen(true)}
                >
                    {/* Cinematic Video Thumbnail */}
                    <img
                        alt="Intricate handwoven silk fabric detail"
                        className="w-full h-full object-cover brightness-75 group-hover:scale-105 transition-transform duration-[1500ms] ease-out"
                        src="https://lh3.googleusercontent.com/aida-public/AB6AXuBuHun6wMNCczDv63AuwYtYlMO4tQ6iIGiRoMnAg9NNNZ9GDMFH5xm4mxB8LFbyeX-lHABXCJTNqPTnwo-yHXkDpYInU_h0kpuMB523hNR0KwN1oaEXppE5oNH2FIKZ7hMJRMVtvlDOnzl7PJNmO9yxnBOMeC-IDnV0u5WAPEsqwSfPdCpj1rm988L3ozmi8tQOTWv2QUsLc836btTo_D_jDXK8UDUQovldRHZbsoIrhkZR3jJfSu0LDElveBkLSMTyftathm6FaQ"
                    />

                    {/* Overlay Gradients */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-black/20"></div>

                    {/* Play Button */}
                    <div className="absolute inset-0 flex items-center justify-center">
                        <div className="relative">
                            <div className="absolute inset-0 rounded-full bg-[#775a19]/20 scale-150 animate-ping"></div>
                            <div className="relative z-10 w-24 h-24 flex items-center justify-center rounded-full bg-white/95 border border-[#775a19]/20 shadow-xl group-hover:bg-[#93272a] group-hover:border-transparent transition-all duration-500">
                                <Play className="w-8 h-8 text-[#775a19] group-hover:text-white transition-colors ml-1 fill-current" />
                            </div>
                        </div>
                    </div>

                    {/* Captions */}
                    <div className="absolute bottom-10 left-10 text-white">
                        <motion.h2 className="font-serif text-3xl md:text-5xl italic mb-3">Fabric in Motion</motion.h2>
                        <div className="flex items-center gap-4">
                            <div className="h-[1px] w-12 bg-[#775a19]"></div>
                            <p className="text-[10px] tracking-[0.3em] uppercase text-white/80 font-bold">A film by Tanvo Atelier</p>
                        </div>
                    </div>
                </motion.div>
            </section>

            {/* Editorial detail section */}
            <section className="max-w-7xl mx-auto px-6 mb-40 grid grid-cols-1 md:grid-cols-12 gap-16 items-center">
                <motion.div
                    initial={{ opacity: 0, x: -30 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    className="md:col-span-5 order-2 md:order-1"
                >
                    <div className="bg-[#f5f3ee] p-12 md:p-16 relative">
                        <div className="absolute top-0 right-0 p-4">
                            <Sparkles className="w-6 h-6 text-[#775a19]/20" />
                        </div>
                        <h3 className="font-serif text-3xl mb-8 text-[#1b1c19]">Zari Work & Pure Silk</h3>
                        <p className="text-[#504f4f] mb-10 leading-[1.8] font-light text-lg">
                            The interplay of light on raw silk threads creates a visual symphony.
                            Our weavers manipulate the shuttle with rhythmic precision,
                            ensuring every inch of the fabric is a masterpiece of tactile luxury.
                        </p>
                        <button className="group flex items-center gap-4 text-[10px] tracking-[0.3em] uppercase text-[#775a19] font-bold">
                            Explore Craftsmanship
                            <ArrowRight className="w-4 h-4 group-hover:translate-x-2 transition-transform" />
                        </button>
                    </div>
                </motion.div>
                <motion.div
                    initial={{ opacity: 0, scale: 0.95 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    className="md:col-span-7 order-1 md:order-2 flex justify-end"
                >
                    <div className="relative w-full md:w-[90%] aspect-[4/5] overflow-hidden shadow-2xl">
                        <img
                            alt="Artisan hands on wooden loom"
                            className="w-full h-full object-cover"
                            src="https://lh3.googleusercontent.com/aida-public/AB6AXuCiBZeKIjQ3VdxfauRPimArcGBoNWUKnemccHI-pDghg2wrdAy0K-LkE8BBC2CofP-OUNi6-tN3lb9we2RXHvq0tFSMiHIVmYlRtcVhXz9IuwKy8oI4r5PgKGBx9-EsulMA9pufAQJy4E_0zTw4gF7V8eh7QU4GwMgez-_y9hCQSKldbAtJ6WbPosmJo_pJSd9CWSqFYagEaGvAqr0sNkwqRGgnsySD53MjoijWSK0dWmcbftGaB74udlaLAowOEL33qan2ZZWrYA"
                        />
                    </div>
                </motion.div>
            </section>

            {/* Video Modal */}
            <AnimatePresence>
                {isModalOpen && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="fixed inset-0 z-[100] flex items-center justify-center p-4 md:p-12 bg-black/95 backdrop-blur-3xl"
                    >
                        <button
                            onClick={() => setIsModalOpen(false)}
                            className="absolute top-8 right-8 text-white/50 hover:text-white transition-colors z-50 p-4"
                        >
                            <X className="w-8 h-8" />
                        </button>

                        <motion.div
                            initial={{ scale: 0.9, opacity: 0 }}
                            animate={{ scale: 1, opacity: 1 }}
                            exit={{ scale: 0.9, opacity: 0 }}
                            className="relative w-full max-w-6xl aspect-video bg-black shadow-2xl overflow-hidden"
                        >
                            {/* In a real scenario, this would be an iframe or video tag */}
                            <img
                                src="https://lh3.googleusercontent.com/aida-public/AB6AXuBhZW2c9PrSwvtbxneTAQNFJ7VZEGHXBhdtO7rpJZzpJhH3VG7IWN_SaSW-7hTUmTV8RkjtpolRlFhSUxKisvEgcUXhe4NBeyXOZTYRTRIQExr6zknwcIs-n8Ie7MM_0_EPtF0xZy4d9vaJ4_3zxAPP_f0J_PinpywZ11nxpYyCws1Kw01KTmo5C-G7UIqbdhf3Yd49tmFLzaePzMkEapdBdnDdKRsWPVGqtguNEZWBXMaQNl1yIYk_hOqvyxD8IVr3o6l0zluSTQ"
                                className="w-full h-full object-cover opacity-80"
                                alt="Cinematic video coverage"
                            />
                            <div className="absolute inset-0 flex items-center justify-center">
                                <p className="text-white text-xl font-serif italic tracking-wider">The Digital Atelier: Legacy Reimagined</p>
                            </div>
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
};

export default CraftChroniclesCinema;
