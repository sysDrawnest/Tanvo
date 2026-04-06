import React from "react";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";

const ZariDetail: React.FC = () => {
    return (
        <section className="max-w-7xl mx-auto px-6 py-32 grid grid-cols-1 md:grid-cols-12 gap-16 items-center overflow-hidden">
            <motion.div
                initial={{ opacity: 0, x: -30 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8 }}
                viewport={{ once: true }}
                className="md:col-span-5 order-2 md:order-1"
            >
                <div className="bg-[#f0eee9] p-12 rounded-lg relative">
                    {/* Decorative element */}
                    <div className="absolute top-0 right-0 w-24 h-24 border-t border-r border-[#C9A84C]/20 rounded-tr-lg"></div>

                    <span className="font-sans text-[10px] tracking-[0.2em] uppercase text-[#C9A84C] font-bold mb-6 block">Detail & Contrast</span>
                    <h3 className="font-serif text-3xl md:text-4xl mb-6 text-[#1a120b] leading-tight">Zari Work & Pure Silk</h3>
                    <p className="font-sans text-[13px] text-stone-500 mb-8 leading-relaxed">
                        The interplay of light on raw silk threads creates a visual symphony. Our weavers manipulate the shuttle with rhythmic precision, ensuring every inch of the fabric is a masterpiece of tactile luxury.
                    </p>
                    <motion.button
                        whileHover={{ x: 5 }}
                        className="group flex items-center gap-3 font-sans text-[10px] tracking-widest uppercase text-[#1a120b] font-bold border-b border-[#C9A84C] pb-1"
                    >
                        Explore Craftsmanship
                        <ArrowRight className="w-4 h-4 text-[#C9A84C] group-hover:translate-x-1 transition-transform" />
                    </motion.button>
                </div>
            </motion.div>

            <motion.div
                initial={{ opacity: 0, x: 30 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8 }}
                viewport={{ once: true }}
                className="md:col-span-7 order-1 md:order-2 flex justify-end"
            >
                <div className="relative w-full md:w-4/5 aspect-[4/5] rounded-sm overflow-hidden shadow-2xl">
                    <img
                        alt="Artisan hands working on a traditional wooden loom"
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-1000"
                        src="https://lh3.googleusercontent.com/aida-public/AB6AXuCiBZeKIjQ3VdxfauRPimArcGBoNWUKnemccHI-pDghg2wrdAy0K-LkE8BBC2CofP-OUNi6-tN3lb9we2RXHvq0tFSMiHIVmYlRtcVhXz9IuwKy8oI4r5PgKGBx9-EsulMA9pufAQJy4E_0zTw4gF7V8eh7QU4GwMgez-_y9hCQSKldbAtJ6WbPosmJo_pJSd9CWSqFYagEaGvAqr0sNkwqRGgnsySD53MjoijWSK0dWmcbftGaB74udlaLAowOEL33qan2ZZWrYA"
                    />
                </div>
            </motion.div>
        </section>
    );
};

export default ZariDetail;
