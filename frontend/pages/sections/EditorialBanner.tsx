import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowUpRight } from 'lucide-react';

const EditorialBanner: React.FC = () => {
    return (
        <section style={{ 
            position: 'relative', 
            height: '85vh', 
            minHeight: '600px', 
            overflow: 'hidden',
            display: 'flex',
            backgroundColor: '#F5F0E8'
        }}>
            {/* Left Side - Video */}
            <div style={{ 
                flex: 1, 
                position: 'relative',
                overflow: 'hidden'
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

                {/* Subtle overlay on video */}
                <div style={{
                    position: 'absolute',
                    inset: 0,
                    background: 'linear-gradient(to right, rgba(10, 10, 10, 0.2) 0%, transparent 70%)',
                    zIndex: 2
                }} />
            </div>

            {/* Right Side - Text Panel */}
            <div style={{
                flex: 1,
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'center',
                padding: '60px 80px',
                backgroundColor: '#F5F0E8',
                position: 'relative',
            }}>
                {/* Subtle decorative element */}
                <div style={{
                    position: 'absolute',
                    top: 40,
                    right: 40,
                    width: 40,
                    height: 1,
                    backgroundColor: 'rgba(0,0,0,0.15)'
                }} />
                
                <div style={{ maxWidth: 460 }}>
                    {/* Brand tag */}
                    <p style={{
                        fontFamily: '"Playfair Display", "Times New Roman", serif',
                        fontSize: '11px',
                        letterSpacing: '4px',
                        textTransform: 'uppercase',
                        color: 'rgba(0,0,0,0.4)',
                        marginBottom: 32,
                        fontWeight: 400,
                    }}>
                        The TANVO Experience
                    </p>

                    {/* Main heading */}
                    <h2 style={{
                        fontFamily: '"Playfair Display", "Times New Roman", serif',
                        fontSize: 'clamp(48px, 5vw, 72px)',
                        fontWeight: 300,
                        color: '#1A1A1A',
                        lineHeight: 1.05,
                        letterSpacing: '-0.03em',
                        marginBottom: 32,
                    }}>
                        Beyond A Saree
                    </h2>

                    {/* Descriptive text */}
                    <div style={{
                        fontFamily: '"Inter", -apple-system, sans-serif',
                        fontSize: 'clamp(15px, 1.2vw, 18px)',
                        fontWeight: 300,
                        color: 'rgba(26, 26, 26, 0.75)',
                        lineHeight: 1.8,
                        marginBottom: 48,
                        maxWidth: 380,
                    }}>
                        <p style={{ marginBottom: 8 }}>A piece of heritage.</p>
                        <p style={{ marginBottom: 8 }}>A story of craftsmanship.</p>
                        <p>A connection between artisan and wearer.</p>
                    </div>

                    {/* CTA Button */}
                    <Link 
                        to="/shop" 
                        style={{
                            display: 'inline-flex',
                            alignItems: 'center',
                            gap: 12,
                            fontFamily: '"Inter", -apple-system, sans-serif',
                            fontSize: '13px',
                            letterSpacing: '2px',
                            textTransform: 'uppercase',
                            color: '#1A1A1A',
                            textDecoration: 'none',
                            borderBottom: '1px solid rgba(26, 26, 26, 0.2)',
                            paddingBottom: 12,
                            transition: 'all 0.3s ease',
                        }}
                        onMouseEnter={(e) => {
                            e.currentTarget.style.borderBottomColor = '#1A1A1A';
                            e.currentTarget.style.gap = '16px';
                        }}
                        onMouseLeave={(e) => {
                            e.currentTarget.style.borderBottomColor = 'rgba(26, 26, 26, 0.2)';
                            e.currentTarget.style.gap = '12px';
                        }}
                    >
                        Explore the Collection
                        <ArrowUpRight size={16} strokeWidth={1.5} />
                    </Link>
                </div>

                {/* Bottom decoration */}
                <div style={{
                    position: 'absolute',
                    bottom: 40,
                    left: 80,
                    width: 30,
                    height: 1,
                    backgroundColor: 'rgba(0,0,0,0.1)'
                }} />
            </div>
        </section>
    );
};

export default EditorialBanner;