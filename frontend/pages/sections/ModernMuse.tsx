import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';

const ModernMuse: React.FC = () => {
    return (
        <section className="w-full bg-[#F9F5EE] py-16 md:py-24">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex flex-col lg:flex-row items-center justify-between max-w-7xl mx-auto">
                    
                    {/* Left Content */}
                    <motion.div 
                        initial={{ opacity: 0, x: -20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true, margin: "-100px" }}
                        transition={{ duration: 0.8, ease: "easeOut" }}
                        className="w-full lg:w-5/12 mb-12 lg:mb-0 pr-0 lg:pr-12 flex flex-col justify-center"
                    >
                        <div className="mb-6 flex items-center gap-3">
                            <span className="w-8 h-[1px] bg-[#173B45]"></span>
                            <span className="font-sans text-xs tracking-[0.2em] uppercase text-[#173B45] font-semibold">The Contemporary Edit</span>
                        </div>
                        
                        <h2 className="text-4xl md:text-5xl lg:text-6xl font-serif text-[#173B45] mb-6 leading-[1.1] tracking-tight">
                            The Modern Muse
                        </h2>
                        
                        <p className="text-lg md:text-xl text-[#173B45]/70 font-sans mb-8 leading-relaxed max-w-lg">
                            Contemporary silhouettes, timeless Indian drapes. Sarees designed for modern celebrations—where heritage meets effortless elegance.
                        </p>
                        
                        <div className="flex items-center gap-6">
                            <Link 
                                to="/shop?style=Modern,Designer"
                                className="group inline-flex items-center gap-3 bg-[#173B45] text-[#F9F5EE] px-8 py-4 text-sm font-semibold tracking-wider transition-all duration-300 hover:bg-[#B43F3F] hover:shadow-lg uppercase"
                            >
                                Explore Collection
                                <ArrowRight size={16} className="transform group-hover:translate-x-1 transition-transform" />
                            </Link>
                        </div>
                    </motion.div>

                    {/* Right Image */}
                    <motion.div 
                        initial={{ opacity: 0, scale: 0.95 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        viewport={{ once: true, margin: "-100px" }}
                        transition={{ duration: 1, ease: "easeOut" }}
                        className="w-full lg:w-7/12"
                    >
                        <div className="relative aspect-[4/5] md:aspect-[16/10] lg:aspect-[4/5] overflow-hidden shadow-2xl">
                            {/* We use a placeholder here as requested, or the user can swap it. The user specified "large model image", so we use the default placeholder which handles sizing well. */}
                            <img 
                                src="https://images.unsplash.com/photo-1610030469983-98e550d6193c?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1500&q=80" 
                                alt="Modern Muse Saree Collection" 
                                className="w-full h-full object-cover object-top hover:scale-105 transition-transform duration-[2s]"
                            />
                            {/* Decorative overlay border to give a luxury print feel */}
                            <div className="absolute inset-4 border border-[#F9F5EE]/30 pointer-events-none"></div>
                        </div>
                    </motion.div>
                </div>
            </div>
        </section>
    );
};

export default ModernMuse;
