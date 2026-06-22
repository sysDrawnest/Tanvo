import React from 'react';

const VideoBanner: React.FC = () => {
    return (
        <section className="relative w-full h-[60vh] min-h-[450px] max-h-[700px] overflow-hidden bg-[#1A110F]">
            {/* Video Background */}
            <video
                autoPlay
                muted
                loop
                playsInline
                className="absolute inset-0 w-full h-full object-cover opacity-90"
                style={{ filter: 'brightness(0.85) contrast(1.05) saturate(1.1)' }}
            >
                <source src="/Woman_wearing_silk_saree_202606221155.mp4" type="video/mp4" />
                Your browser does not support the video tag.
            </video>

            {/* Gradient Overlays for Depth */}
            <div className="absolute inset-0 bg-gradient-to-t from-[#1A110F]/90 via-[#1A110F]/30 to-transparent"></div>
            <div className="absolute inset-0 bg-gradient-to-b from-[#1A110F]/40 via-transparent to-transparent"></div>
            
            {/* Subtle Gold Pattern Overlay */}
            <div 
                className="absolute inset-0 opacity-10"
                style={{
                    backgroundImage: 'radial-gradient(circle at 30% 40%, #C9A84C 1px, transparent 1px)',
                    backgroundSize: '60px 60px',
                }}
            ></div>

            {/* Decorative Gold Lines - Left */}
            <div className="absolute left-8 md:left-16 top-1/2 -translate-y-1/2 flex flex-col items-center gap-4 z-10">
                <div className="w-px h-16 md:h-24 bg-gradient-to-b from-[#C9A84C] to-transparent"></div>
                <div className="w-2 h-2 rounded-full bg-[#C9A84C]"></div>
                <div className="w-px h-16 md:h-24 bg-gradient-to-t from-[#C9A84C] to-transparent"></div>
            </div>

            {/* Decorative Gold Lines - Right */}
            <div className="absolute right-8 md:right-16 top-1/2 -translate-y-1/2 flex flex-col items-center gap-4 z-10">
                <div className="w-px h-16 md:h-24 bg-gradient-to-b from-[#C9A84C] to-transparent"></div>
                <div className="w-2 h-2 rounded-full bg-[#C9A84C]"></div>
                <div className="w-px h-16 md:h-24 bg-gradient-to-t from-[#C9A84C] to-transparent"></div>
            </div>

            {/* Content Overlay */}
            <div className="absolute inset-0 flex flex-col items-center justify-center z-10 px-6 text-center">
                {/* Gold Accent */}
                <div className="flex items-center gap-4 mb-6">
                    <div className="w-12 h-px bg-[#C9A84C]"></div>
                    <span className="text-[10px] font-label uppercase tracking-[0.3em] text-[#C9A84C] font-bold">
                        The Art of Elegance
                    </span>
                    <div className="w-12 h-px bg-[#C9A84C]"></div>
                </div>

                {/* Main Heading */}
                <h1 className="text-3xl md:text-5xl lg:text-6xl font-serif font-bold text-white leading-[1.1] max-w-4xl tracking-tight">
                    Where Tradition Meets
                    <span className="block text-[#C9A84C] mt-1">Modern Luxury</span>
                </h1>

                {/* Subtitle */}
                <p className="text-sm md:text-base lg:text-lg text-white/70 font-light max-w-xl mt-4 font-body">
                    Each Tanvo saree is a masterpiece of handwoven artistry, 
                    crafted with love by master weavers of Odisha
                </p>

                {/* Floating Indicators */}
                <div className="flex items-center gap-3 mt-8">
                    <span className="w-2 h-2 rounded-full bg-[#C9A84C] animate-pulse"></span>
                    <span className="text-[9px] font-label uppercase tracking-[0.2em] text-white/50">
                        Handcrafted · Sustainable · Heritage
                    </span>
                    <span className="w-2 h-2 rounded-full bg-[#C9A84C] animate-pulse delay-150"></span>
                </div>

            </div>

            {/* Bottom Gradient Border */}
            <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[#C9A84C] to-transparent opacity-50"></div>
        </section>
    );
};

export default VideoBanner; 