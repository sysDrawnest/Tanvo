import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowUpRight, Star, Sparkles, ChevronRight } from 'lucide-react';

const NewArrivalsBanner: React.FC = () => {
    const [isHovered, setIsHovered] = useState(false);

    return (
        <section className="container mx-auto px-4 py-12 md:py-20">
            <div className="bg-[#F9F5EE] w-full max-w-7xl mx-auto overflow-hidden shadow-sm relative group">

                {/* Decorative Line */}
                <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-[#1B2B3A] via-[#1B2B3A]/30 to-transparent"></div>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-0 min-h-[500px]">

                    {/* Left - Content Column */}
                    <div className="order-2 lg:order-1 p-10 md:p-14 lg:p-16 flex flex-col justify-center relative">

                        {/* Subtle background pattern */}
                        <div className="absolute top-10 right-10 opacity-5">
                            <div className="grid grid-cols-3 gap-2">
                                {[...Array(9)].map((_, i) => (
                                    <div key={i} className="w-2 h-2 bg-[#1B2B3A] rounded-full"></div>
                                ))}
                            </div>
                        </div>

                        {/* Badge */}
                        <div className="inline-flex items-center gap-2 bg-[#1B2B3A]/10 px-4 py-2 rounded-full mb-6 w-fit">
                            <Sparkles size={14} className="text-[#1B2B3A]" />
                            <span className="text-[10px] md:text-xs font-medium tracking-[0.15em] uppercase text-[#1B2B3A]">
                                New Collection 2026
                            </span>
                        </div>

                        {/* Heading with accent */}
                        <div className="mb-4">
                            <span className="text-5xl md:text-6xl lg:text-7xl font-light text-[#1B2B3A] leading-[0.9] block">
                                Mens
                            </span>
                            <h2 className="font-serif text-4xl md:text-5xl lg:text-6xl text-[#1B2B3A] tracking-tight leading-[1.1]">
                                Traditional Attire
                            </h2>
                        </div>

                        {/* Decorative divider */}
                        <div className="w-16 h-0.5 bg-[#1B2B3A]/30 mb-6"></div>

                        {/* Description */}
                        <p className="text-[#333333] text-sm md:text-base leading-relaxed max-w-md font-sans mb-8">
                            Experience the latest masterpieces from our looms. Discover fresh patterns,
                            vibrant natural dyes, and the unparalleled touch of authentic Odisha heritage,
                            handpicked for the contemporary soul.
                        </p>

                        {/* CTA Button with hover effect */}
                        <div className="flex flex-wrap items-center gap-4">
                            <Link
                                to="/shop?sort=-createdAt"
                                className="group relative overflow-hidden bg-[#1C1612] text-[#F9F5EE] px-10 py-4 text-sm font-semibold tracking-wider transition-all duration-500 uppercase flex items-center gap-3"
                                onMouseEnter={() => setIsHovered(true)}
                                onMouseLeave={() => setIsHovered(false)}
                            >
                                <span className="relative z-10">Explore New Arrivals</span>
                                <ArrowUpRight 
                                    size={16} 
                                    className={`relative z-10 transition-transform duration-500 ${isHovered ? 'translate-x-1 -translate-y-1' : ''}`} 
                                />
                                <span className="absolute inset-0 bg-[#333333] transform translate-x-full group-hover:translate-x-0 transition-transform duration-500"></span>
                            </Link>

                            {/* Quick link */}
                            <Link
                                to="/shop"
                                className="text-[#1B2B3A]/60 hover:text-[#1B2B3A] text-xs font-medium tracking-wide uppercase transition-colors flex items-center gap-1"
                            >
                                View All
                                <ChevronRight size={14} />
                            </Link>
                        </div>

                        {/* Social Proof */}
                        <div className="flex items-center gap-6 mt-8 pt-6 border-t border-[#1B2B3A]/10">
                            <div className="flex items-center gap-2">
                                <div className="flex">
                                    {[...Array(5)].map((_, i) => (
                                        <Star key={i} size={12} className="text-[#1B2B3A] fill-[#1B2B3A] opacity-60" />
                                    ))}
                                </div>
                                <span className="text-xs text-[#333333]/60">(2.3k+ reviews)</span>
                            </div>
                            <div className="w-px h-6 bg-[#1B2B3A]/20"></div>
                            <span className="text-xs text-[#333333]/60 font-medium">Handloom Certified</span>
                        </div>
                    </div>

                    {/* Right - Image Column */}
                    <div className="order-1 lg:order-2 relative bg-[#1B2B3A]/5 overflow-hidden min-h-[350px] md:min-h-[450px] lg:min-h-full flex items-center justify-center p-8">

                        {/* Decorative ring */}
                        <div className="absolute inset-0 flex items-center justify-center">
                            <div className="w-[90%] h-[90%] rounded-full border border-[#1B2B3A]/5"></div>
                        </div>
                        <div className="absolute inset-0 flex items-center justify-center">
                            <div className="w-[70%] h-[70%] rounded-full border border-[#1B2B3A]/5"></div>
                        </div>

                        {/* Floating elements */}
                        <div className="absolute top-8 right-8 w-20 h-20 bg-[#1B2B3A]/5 rounded-full blur-3xl"></div>
                        <div className="absolute bottom-8 left-8 w-32 h-32 bg-[#1B2B3A]/5 rounded-full blur-3xl"></div>

                        {/* Image with elegant frame */}
                        <div className="relative z-10 w-full max-w-md mx-auto">
                            <div className="absolute -inset-4 bg-gradient-to-br from-[#1B2B3A]/10 via-transparent to-[#1B2B3A]/5 rounded-2xl"></div>
                            <img
                                src="/Man wearing handloom kurta .jpeg"
                                alt="New Arrivals Artisans"
                                className="relative w-full h-auto object-cover max-h-[400px] lg:max-h-[500px] rounded-xl shadow-2xl transform transition-all duration-700 hover:scale-105 hover:shadow-3xl"
                            />

                            {/* Image badge */}
                            <div className="absolute -bottom-2 -right-2 bg-[#F9F5EE] px-4 py-2 rounded-lg shadow-lg border border-[#1B2B3A]/10">
                                <div className="flex items-center gap-2">
                                    <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                                    <span className="text-[10px] font-medium text-[#1B2B3A] tracking-wide uppercase">
                                        Limited Edition
                                    </span>
                                </div>
                            </div>

                            {/* Top-right badge */}
                            <div className="absolute -top-3 -right-3 bg-[#1B2B3A] text-[#F9F5EE] px-3 py-1 rounded-full text-[10px] font-semibold tracking-wider uppercase shadow-lg">
                                New
                            </div>
                        </div>

                        {/* Overlay gradient for text contrast */}
                        <div className="absolute inset-0 bg-gradient-to-t from-[#F9F5EE] via-transparent to-transparent opacity-0 lg:opacity-100"></div>
                    </div>

                </div>

                {/* Bottom Decorative Element */}
                <div className="absolute bottom-0 right-0 w-32 h-32 border-r-2 border-b-2 border-[#1B2B3A]/5 rounded-br-3xl"></div>
            </div>
        </section>
    );
};

export default NewArrivalsBanner;