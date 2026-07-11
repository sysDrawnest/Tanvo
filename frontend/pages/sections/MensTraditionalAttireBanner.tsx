import React from 'react';
import { Link } from 'react-router-dom';

const NewArrivalsBanner: React.FC = () => {
    return (
        <section className="relative w-full bg-[#F9F5EE] px-4 md:px-12 lg:px-16 py-12 md:py-20 lg:py-24 z-20">
            {/* Main Rounded Box Card */}
            <div className="relative w-full max-w-7xl mx-auto rounded-[32px] overflow-visible min-h-[480px] sm:min-h-[520px] md:min-h-[580px] lg:min-h-[640px] shadow-[0_25px_60px_-15px_rgba(0,0,0,0.2)] bg-[#0F0D0C]">
                
                {/* Full background image of the groom */}
                <div className="absolute inset-0 w-full h-full rounded-[32px] overflow-hidden">
                    <img
                        src="/Mens Collection Banner.png"
                        alt="Men's Traditional Handloom Collection"
                        className="w-full h-full object-cover object-[80%_top] md:object-[68%_25%]"
                    />
                    {/* Soft dark vignetting to enhance text readability and depth */}
                    <div className="absolute inset-0 bg-gradient-to-r from-black/45 via-black/10 to-transparent"></div>
                </div>

                {/* Left Aligned Glassmorphic Panel */}
                <div className="absolute inset-4 sm:inset-6 md:inset-auto md:top-8 md:bottom-8 md:left-8 lg:top-12 lg:bottom-12 lg:left-12 md:w-[48%] lg:w-[42%] bg-white/10 backdrop-blur-xl border border-white/20 shadow-2xl rounded-[24px] p-6 sm:p-8 lg:p-12 flex flex-col justify-between z-10">
                    
                    {/* Header Label */}
                    <div>
                        <span className="text-[10px] sm:text-[11px] tracking-[4px] text-white/70 font-light uppercase block">
                            Handloom Collection
                        </span>
                        
                        {/* Title - Large Elegant Serif */}
                        <h2 className="font-serif text-4xl sm:text-5xl md:text-5xl lg:text-6xl xl:text-7xl text-white tracking-tight leading-[1.05] mt-4 mb-2">
                            Men's
                            <br />
                            Traditional
                        </h2>
                    </div>
                    
                    {/* Bottom half text and CTA */}
                    <div>
                        <p className="text-white/80 text-xs sm:text-sm font-light max-w-xs leading-relaxed mb-6 sm:mb-8">
                            Discover the latest masterpieces from our looms.
                        </p>

                        <Link
                            to="/shop?sort=-createdAt"
                            className="inline-block border border-[#C9A84C]/60 text-[#C9A84C] px-8 py-3 text-[11px] font-semibold tracking-widest rounded-full uppercase bg-transparent transition-all duration-300 hover:bg-[#C9A84C] hover:border-[#C9A84C] hover:text-[#0F0D0C] hover:scale-105"
                        >
                            Shop Now
                        </Link>
                    </div>
                </div>
            </div>

            {/* 2x2 Thumbnail Grid Overlay - moved up slightly and given rounded inner images */}
            <div className="absolute bottom-[20px] sm:bottom-[40px] md:bottom-[60px] right-[4%] sm:right-[6%] md:right-[8%] lg:right-[10%] w-[160px] sm:w-[220px] md:w-[280px] lg:w-[340px] xl:w-[360px] z-30 pointer-events-none transition-transform duration-500 hover:scale-[1.03]">
                <div className="grid grid-cols-2 gap-2 sm:gap-3 w-full h-auto drop-shadow-[0_20px_40px_rgba(0,0,0,0.15)] rounded-2xl bg-white/10 p-2 backdrop-blur-md border border-white/20">
                    <img
                        src="/Handloom_shuttle_holding_silk_thread_202607111256.jpeg"
                        alt="The Loom Journey"
                        className="w-full aspect-square object-cover rounded-xl"
                    />
                    <img
                        src="/Wooden_spool_copper_silk_thread_202607111256.jpeg"
                        alt="Silk Thread Spool"
                        className="w-full aspect-square object-cover rounded-xl"
                    />
                    <img
                        src="/Men's_Nehru_vest_jacket_details_202607111256.jpeg"
                        alt="Men's Indigo Vest Collar"
                        className="w-full aspect-square object-cover rounded-xl"
                    />
                    <img
                        src="/Woman_wearing_silk_saree_2K_202607111256.jpeg"
                        alt="Peach Saree Drape"
                        className="w-full aspect-square object-cover rounded-xl"
                    />
                </div>
            </div>
        </section>
    );
};

export default NewArrivalsBanner;