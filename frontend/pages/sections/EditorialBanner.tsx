import React, { useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';

const EditorialBanner: React.FC = () => {
    const videoRef = useRef<HTMLVideoElement>(null);

    useEffect(() => {
        const observer = new IntersectionObserver(
            (entries) => {
                entries.forEach((entry) => {
                    if (entry.isIntersecting) {
                        videoRef.current?.play().catch(() => {});
                    } else {
                        videoRef.current?.pause();
                    }
                });
            },
            { threshold: 0.1 }
        );

        if (videoRef.current) {
            observer.observe(videoRef.current);
        }

        return () => {
            if (videoRef.current) {
                observer.unobserve(videoRef.current);
            }
        };
    }, []);

    return (
        <section style={{ 
            display: 'flex', 
            flexDirection: 'row', 
            height: '85vh', 
            minHeight: '600px', 
            width: '100%', 
            position: 'relative',
            backgroundColor: '#F9F5EE' // Ivory base
        }}>
            
            {/* Left Column: Ivory Editorial Text Panel */}
            <div style={{ 
                flex: '1 1 50%', 
                height: '100%', 
                backgroundColor: '#F9F5EE', // Premium Ivory
                display: 'flex', 
                flexDirection: 'column', 
                justifyContent: 'center', 
                padding: '0 max(60px, 6vw)',
                boxSizing: 'border-box'
            }}>
                <div style={{ maxWidth: '460px' }}>
                    {/* Brand Identifier */}
                    <span style={{ 
                        display: 'block',
                        fontSize: '11px', 
                        fontWeight: 500, 
                        textTransform: 'uppercase', 
                        letterSpacing: '0.25em', 
                        color: '#706B63', 
                        marginBottom: '32px' 
                    }}>
                        The TANVO Experience
                    </span>

                    {/* Editorial Main Title */}
                    <h2 className="font-sans" style={{ 
                        fontSize: 'clamp(32px, 3.5vw, 44px)', 
                        fontWeight: 300, 
                        color: '#1C1B1A', 
                        lineHeight: 1.2, 
                        letterSpacing: '-0.01em', 
                        marginBottom: '28px' 
                    }}>
                        Beyond A Saree
                    </h2>

                    {/* Prose Narrative Structure */}
                    <div style={{ 
                        fontSize: '15px', 
                        lineHeight: '1.8', 
                        color: '#4A4640', 
                        fontWeight: 300, 
                        letterSpacing: '0.01em',
                        marginBottom: '48px' 
                    }}>
                        <p style={{ margin: '0 0 8px 0' }}>A piece of heritage.</p>
                        <p style={{ margin: '0 0 8px 0' }}>A story of craftsmanship.</p>
                        <p style={{ margin: '0' }}>A connection between artisan and wearer.</p>
                    </div>

                    {/* Minimalist Editorial Action Element */}
                    <div>
                        <Link 
                            to="/shop" 
                            style={{ 
                                display: 'inline-flex', 
                                alignItems: 'center', 
                                gap: '12px',
                                fontSize: '13px',
                                fontWeight: 500,
                                textTransform: 'uppercase',
                                letterSpacing: '0.15em',
                                color: '#1C1B1A',
                                textDecoration: 'none',
                                borderBottom: '1px solid #1C1B1A',
                                paddingBottom: '6px',
                                transition: 'opacity 0.3s ease',
                                borderRadius: '0px' 
                            }}
                            onMouseEnter={(e) => e.currentTarget.style.opacity = '0.7'}
                            onMouseLeave={(e) => e.currentTarget.style.opacity = '1'}
                        >
                            Explore the Collection <ArrowRight size={15} strokeWidth={1.5} />
                        </Link>
                    </div>
                </div>
            </div>

            {/* Right Column: Visual Canvas */}
            <div style={{ 
                position: 'relative', 
                flex: '1 1 50%', 
                height: '100%', 
                overflow: 'hidden',
                display: 'block'
            }}>
                <video
                    ref={videoRef}
                    muted
                    loop
                    playsInline
                    style={{
                        width: '100%',
                        height: '100%',
                        objectFit: 'cover',
                        position: 'absolute',
                        top: 0,
                        left: 0,
                    }}
                >
                    <source src="/A_cinematic_couture_beauty_fil.mp4" type="video/mp4" />
                    Your browser does not support the video tag.
                </video>
                
                {/* Subtle, soft vignette overlay to give the video an editorial tone */}
                <div style={{
                    position: 'absolute',
                    inset: 0,
                    background: 'rgba(0, 0, 0, 0.04)',
                }} />
            </div>

            {/* Bottom Gradient Overlay */}
            <div style={{
                position: 'absolute',
                bottom: 0,
                left: 0,
                right: 0,
                height: 'clamp(120px, 15vw, 180px)',
                background: 'linear-gradient(to top, #F8EDED 0%, rgba(248, 237, 237, 0) 100%)',
                pointerEvents: 'none',
                zIndex: 10
            }} />

        </section>
    );
};

export default EditorialBanner;