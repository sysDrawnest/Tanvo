import React, { useRef, useState } from 'react';

const VideoBanner: React.FC = () => {
    const videoRef = useRef<HTMLVideoElement>(null);
    const [isPlaying, setIsPlaying] = useState(true);

    const togglePlay = () => {
        if (videoRef.current) {
            if (isPlaying) {
                videoRef.current.pause();
            } else {
                videoRef.current.play();
            }
            setIsPlaying(!isPlaying);
        }
    };

    return (
        <section 
            className="relative w-full overflow-hidden"
            style={{ 
                height: '70vh', 
                minHeight: '500px', 
                maxHeight: '800px',
            }}
        >
            {/* Video Background - Adjusted object-position to show model's head */}
            <video
                ref={videoRef}
                autoPlay
                muted
                loop
                playsInline
                className="w-full h-full object-cover"
                style={{
                    objectPosition: 'center 25%', // Shifts video up to show the head
                    filter: 'brightness(0.45) saturate(1.1)',
                }}
            >
                <source src="/Woman_wearing_silk_saree_202606221155.mp4" type="video/mp4" />
                Your browser does not support the video tag.
            </video>

            {/* Gradient Overlay - Adds depth and luxury feel */}
            <div className="absolute inset-0 bg-gradient-to-b from-black/30 via-black/20 to-black/60"></div>

            {/* Content Overlay - Centered Text Only */}
            <div className="absolute inset-0 flex flex-col items-center justify-center px-4 md:px-8">
                {/* 
                    TEXT STYLING - These lines control the appearance:
                    
                    Line 1 (text size): 
                    "text-2xl sm:text-3xl md:text-4xl lg:text-5xl"
                    - text-2xl: mobile size
                    - sm:text-3xl: small tablet
                    - md:text-4xl: medium tablet/desktop
                    - lg:text-5xl: large desktop
                    
                    Line 2 (font family):
                    "font-['Raleway']" - Changed from font-serif to Raleway
                    
                    Line 3 (color and spacing):
                    "text-white text-center leading-[1.2] tracking-wider"
                    - text-white: white color
                    - text-center: centered
                    - leading-[1.2]: line height
                    - tracking-wider: letter spacing
                */}
                <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-['Raleway'] font-light text-white text-center leading-[1.2] tracking-wider max-w-6xl whitespace-nowrap">
                    Where Tradition Meets <span className="text-[#C9A84C] font-medium">Modern Luxury</span>
                </h1>
            </div>

            {/* Optional: Play/Pause Button Overlay - Minimal */}
            <button 
                className="absolute bottom-6 right-6 md:bottom-8 md:right-8 text-white/40 hover:text-white/80 transition-colors duration-300 z-20"
                aria-label="Toggle video playback"
                onClick={togglePlay}
            >
                <span className="material-symbols-outlined text-xl">
                    {isPlaying ? 'pause' : 'play_arrow'}
                </span>
            </button>
        </section>
    );
};

export default VideoBanner;