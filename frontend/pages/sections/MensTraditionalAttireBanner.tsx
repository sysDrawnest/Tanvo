import React from 'react';
import { Link } from 'react-router-dom';

const NewArrivalsBanner: React.FC = () => {
    return (
        <section className="relative w-full bg-[#F9F5EE] px-0 md:px-12 lg:px-16 py-12 md:py-20 lg:py-24 z-20">
            {/* Main Box Card */}
            <div className="relative w-full max-w-7xl mx-auto rounded-none overflow-hidden md:overflow-visible min-h-0 md:min-h-[580px] lg:min-h-[640px] shadow-[0_25px_60px_-15px_rgba(0,0,0,0.2)] bg-[#0F0D0C] flex flex-col md:block">
                
                {/* Background image of the groom */}
                <div className="relative w-full h-[320px] sm:h-[400px] md:absolute md:inset-0 md:h-full rounded-none overflow-hidden">
                    <img
                        src="/Mens Collection Banner.png"
                        alt="Men's Traditional Handloom Collection"
                        className="w-full h-full object-cover object-[80%_top] md:object-[68%_25%]"
                    />
                    {/* Soft dark vignetting to enhance text readability and depth */}
                    <div className="absolute inset-0 bg-gradient-to-b from-black/20 via-black/10 to-black/60 md:bg-gradient-to-r md:from-black/45 md:via-black/10 md:to-transparent"></div>
                </div>

                {/* Left Aligned Glassmorphic Panel */}
                <div className="relative md:absolute md:top-8 md:bottom-8 md:left-8 lg:top-12 lg:bottom-12 lg:left-12 md:w-[48%] lg:w-[42%] bg-black/40 md:bg-black/25 backdrop-blur-md border border-white/10 rounded-none p-6 sm:p-8 lg:p-12 flex flex-col justify-between z-10">
                    
                    {/* Header Label */}
                    <div>
                        <span className="text-[10px] sm:text-[11px] tracking-[4px] text-white/70 font-light uppercase block">
                            Handloom Collection
                        </span>
                        
                        {/* Title - Large Elegant Serif */}
                        <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl text-white tracking-tight leading-[1.05] mt-4 mb-2">
                            Men's
                            <br />
                            Traditional
                        </h2>
                    </div>
                    
                    {/* Bottom half text and CTA */}
                    <div className="mt-8 md:mt-0">
                        <p className="text-white/80 text-xs sm:text-sm font-light max-w-xs leading-relaxed mb-6 sm:mb-8">
                            Discover the latest masterpieces from our looms.
                        </p>

                        <Link
                            to="/shop?sort=-createdAt"
                            className="inline-block border border-[#C9A84C]/60 text-[#C9A84C] px-8 py-3 text-[11px] font-semibold tracking-widest rounded-none uppercase bg-transparent transition-all duration-300 hover:bg-[#C9A84C] hover:border-[#C9A84C] hover:text-[#0F0D0C] hover:scale-105"
                        >
                            Shop Now
                        </Link>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default NewArrivalsBanner;