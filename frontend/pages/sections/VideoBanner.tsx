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
            {/* Video Background */}
            <video
                ref={videoRef}
                autoPlay
                muted
                loop
                playsInline
                className="w-full h-full object-cover"
                style={{
                    objectPosition: 'center 25%',
                    // Increased brightness from 0.45 to 0.85 for better clarity
                    filter: 'brightness(0.85) saturate(1.1)', 
                }}
            >
                <source src="/Woman_wearing_silk_saree_202606221155.mp4" type="video/mp4" />
                Your browser does not support the video tag.
            </video>

            {/* 
               Adjusted Gradient Overlay:
               Reduced intensity from black/60 to black/30 to ensure the video 
               pops while still providing enough contrast for the white text.
            */}
            <div className="absolute inset-0 bg-gradient-to-b from-black/20 via-transparent to-black/30"></div>

            {/* Content Overlay */}
            <div className="absolute inset-0 flex flex-col items-center justify-center px-4 md:px-8">
                <h1 className="text-base sm:text-xl md:text-3xl lg:text-4xl font-sans font-light tracking-[0.15em] text-white text-center uppercase whitespace-nowrap drop-shadow-lg">
                    Timeless Heritage. <span className="text-[#C9A84C] font-normal">Modern Elegance.</span>
                </h1>
            </div>

            {/* Play/Pause Button */}
            <button 
                className="absolute bottom-6 right-6 md:bottom-8 md:right-8 text-white/60 hover:text-white transition-colors duration-300 z-20"
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