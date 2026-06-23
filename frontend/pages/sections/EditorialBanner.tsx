import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';

const EditorialBanner: React.FC = () => {
    return (
        <section style={{ 
            display: 'flex', 
            flexDirection: 'row', 
            height: '85vh', 
            minHeight: '600px', 
            width: '100%', 
            overflow: 'hidden',
            backgroundColor: '#F9F6F0' // Ivory base
        }}>
            
            {/* Left Column: Visual Canvas */}
            <div style={{ 
                position: 'relative', 
                flex: '1 1 50%', 
                height: '100%', 
                overflow: 'hidden',
                display: 'block'
            }}>
                <video
                    autoPlay
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
                    <source src="/EditorialBanner.mp4" type="video/mp4" />
                    Your browser does not support the video tag.
                </video>
                
                {/* Subtle, soft vignette overlay to give the video an editorial tone */}
                <div style={{
                    position: 'absolute',
                    inset: 0,
                    background: 'rgba(0, 0, 0, 0.04)',
                }} />
            </div>

            {/* Right Column: Ivory Editorial Text Panel */}
            <div style={{ 
                flex: '1 1 50%', 
                height: '100%', 
                backgroundColor: '#F9F6F0', // Premium Ivory
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
                                borderRadius: '0px' // Refined rectangular design accentuation
                            }}
                            onMouseEnter={(e) => e.currentTarget.style.opacity = '0.7'}
                            onMouseLeave={(e) => e.currentTarget.style.opacity = '1'}
                        >
                            Explore the Collection <ArrowRight size={15} strokeWidth={1.5} />
                        </Link>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default EditorialBanner;