import React from 'react';

const VideoBanner: React.FC = () => {
    return (
        <section 
            className="relative w-full overflow-hidden"
            style={{ 
                height: '60vh', 
                minHeight: '400px', 
                maxHeight: '700px',
            }}
        >
            {/* Video Background */}
            <video
                autoPlay
                muted
                loop
                playsInline
                className="w-full h-full object-cover"
                style={{
                    filter: 'brightness(0.5) saturate(1.1)',
                }}
            >
                <source src="/Woman_wearing_silk_saree_202606221155.mp4" type="video/mp4" />
                Your browser does not support the video tag.
            </video>

            {/* Gradient Overlay - Adds depth and luxury feel */}
            <div className="absolute inset-0 bg-gradient-to-b from-black/30 via-black/20 to-black/50"></div>

            {/* Gold Accent Overlay - Subtle glow effect */}
            <div className="absolute inset-0 bg-gradient-to-t from-[#C9A84C]/5 via-transparent to-[#C9A84C]/5"></div>

            {/* Decorative Gold Line - Left */}
            <div className="absolute left-0 top-1/2 -translate-y-1/2 w-1 h-24 bg-gradient-to-b from-transparent via-[#C9A84C] to-transparent opacity-60 hidden lg:block"></div>

            {/* Decorative Gold Line - Right */}
            <div className="absolute right-0 top-1/2 -translate-y-1/2 w-1 h-24 bg-gradient-to-b from-transparent via-[#C9A84C] to-transparent opacity-60 hidden lg:block"></div>

            {/* Decorative Corner Elements */}
            <div className="absolute top-8 left-8 w-12 h-12 border-t-2 border-l-2 border-[#C9A84C]/30 hidden lg:block"></div>
            <div className="absolute top-8 right-8 w-12 h-12 border-t-2 border-r-2 border-[#C9A84C]/30 hidden lg:block"></div>
            <div className="absolute bottom-8 left-8 w-12 h-12 border-b-2 border-l-2 border-[#C9A84C]/30 hidden lg:block"></div>
            <div className="absolute bottom-8 right-8 w-12 h-12 border-b-2 border-r-2 border-[#C9A84C]/30 hidden lg:block"></div>

            {/* Content Overlay */}
            <div className="absolute inset-0 flex flex-col items-center justify-center px-4 md:px-8">
                {/* Gold Accent Line Above */}
                <div className="flex items-center gap-3 mb-4 md:mb-6">
                    <div className="w-8 md:w-16 h-px bg-[#C9A84C]"></div>
                    <span className="text-[8px] md:text-[10px] font-label uppercase tracking-[0.3em] text-[#C9A84C] font-bold">
                        Since 1952
                    </span>
                    <div className="w-8 md:w-16 h-px bg-[#C9A84C]"></div>
                </div>

                {/* Main Heading */}
                <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-7xl font-serif font-bold text-white text-center leading-[1.1] tracking-tight max-w-4xl">
                    Where Tradition Meets
                    <span className="relative inline-block mx-2 md:mx-3">
                        <span className="text-[#C9A84C]">Modern Luxury</span>
                        {/* Underline accent */}
                        <span className="absolute -bottom-2 left-0 w-full h-[2px] bg-gradient-to-r from-transparent via-[#C9A84C] to-transparent"></span>
                    </span>
                </h1>

                {/* Subtitle - Optional decorative text */}
                <p className="text-xs sm:text-sm md:text-base lg:text-lg text-white/70 font-light mt-4 md:mt-6 tracking-[0.15em] max-w-2xl text-center font-body hidden sm:block">
                    Handwoven Masterpieces · Artisan Crafted · Timeless Elegance
                </p>

                {/* Gold Accent Line Below */}
                <div className="mt-6 md:mt-8 flex items-center gap-3">
                    <div className="w-12 md:w-20 h-px bg-gradient-to-r from-transparent to-[#C9A84C]/60"></div>
                    <span className="material-symbols-outlined text-[#C9A84C] text-xl md:text-2xl" style={{ fontVariationSettings: "'FILL' 1" }}>
                        stars
                    </span>
                    <div className="w-12 md:w-20 h-px bg-gradient-to-l from-transparent to-[#C9A84C]/60"></div>
                </div>

                {/* Decorative floating gold particles - Desktop only */}
                <div className="absolute inset-0 pointer-events-none hidden lg:block">
                    <div className="absolute top-1/4 left-1/4 w-1 h-1 rounded-full bg-[#C9A84C]/40 animate-pulse"></div>
                    <div className="absolute top-1/3 right-1/4 w-1.5 h-1.5 rounded-full bg-[#C9A84C]/30 animate-pulse delay-700"></div>
                    <div className="absolute bottom-1/3 left-1/3 w-1 h-1 rounded-full bg-[#C9A84C]/30 animate-pulse delay-500"></div>
                    <div className="absolute bottom-1/4 right-1/3 w-1.5 h-1.5 rounded-full bg-[#C9A84C]/40 animate-pulse delay-1000"></div>
                </div>
            </div>

            {/* Optional: Play/Pause Button Overlay - Minimal */}
            <button 
                className="absolute bottom-6 right-6 md:bottom-8 md:right-8 text-white/40 hover:text-white/80 transition-colors duration-300"
                aria-label="Toggle video playback"
                onClick={(e) => {
                    const video = e.currentTarget.closest('section')?.querySelector('video');
                    if (video) {
                        if (video.paused) {
                            video.play();
                            e.currentTarget.innerHTML = `
                                <span class="material-symbols-outlined text-xl">pause</span>
                            `;
                        } else {
                            video.pause();
                            e.currentTarget.innerHTML = `
                                <span class="material-symbols-outlined text-xl">play_arrow</span>
                            `;
                        }
                    }
                }}
            >
                <span className="material-symbols-outlined text-xl">pause</span>
            </button>
        </section>
    );
};

export default VideoBanner;