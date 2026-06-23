import React, { useRef, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Play, Star, Box, Image as ImageIcon, Pause, Shield, Truck, Users, Award } from 'lucide-react';

const trustSections = [
    {
        icon: Play,
        title: 'The Loom Journey',
        desc: 'Follow the making of a TANVO saree — from silk threads and natural dyes to the hands of Odisha master weavers.',
        badge: 'Behind The Craft',
        videoSrc: '/saree quality 2.mp4',
        stats: 'Handwoven Heritage',
        color: '#C9A84C'
    },
    {
        icon: Users,
        title: 'The Weaver Stories',
        desc: 'Meet the artisans, families, and generations preserving Odisha’s timeless weaving traditions.',
        badge: 'Meet The Makers',
        img: '/weaver-story.png',
        stats: 'Generations Of Craft',
        color: '#C9A84C'
    },
    {
        icon: Shield,
        title: 'Authenticity Promise',
        desc: 'Every creation carries details about its weave, origin, fabric, and craftsmanship.',
        badge: 'Certified Heritage',
        img: '/certificate.png',
        stats: 'Craft You Can Trust',
        color: '#C9A84C'
    }
];

const TrustCard: React.FC<{ item: any, idx: number }> = ({ item, idx }) => {
    const videoRef = useRef<HTMLVideoElement>(null);
    const [isHovered, setIsHovered] = useState(false);
    const [isPlaying, setIsPlaying] = useState(false);

    const togglePlay = () => {
        if (item.videoSrc && videoRef.current) {
            if (videoRef.current.paused) {
                videoRef.current.play().catch(() => { });
                setIsPlaying(true);
            } else {
                videoRef.current.pause();
                setIsPlaying(false);
            }
        }
    };

    const handleMouseEnter = () => {
        setIsHovered(true);
        if (item.videoSrc && videoRef.current && !isPlaying) {
            videoRef.current.play().catch(() => { });
            setIsPlaying(true);
        }
    };

    const handleMouseLeave = () => {
        setIsHovered(false);
        if (item.videoSrc && videoRef.current && isPlaying) {
            videoRef.current.pause();
            setIsPlaying(false);
        }
    };

    return (
        <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: idx * 0.15, duration: 0.7, ease: [0.25, 0.1, 0.25, 1] }}
            viewport={{ once: true, margin: "-50px" }}
            className="trust-card"
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
            onClick={togglePlay}
            style={{
                position: 'relative',
                overflow: 'hidden',
                borderRadius: '2px',
                cursor: 'pointer',
                height: '480px',
                boxShadow: '0 20px 40px -12px rgba(0,0,0,0.3)',
                transition: 'transform 0.3s ease, box-shadow 0.3s ease',
            }}
            whileHover={{
                transform: 'translateY(-8px)',
                boxShadow: '0 30px 50px -15px rgba(0,0,0,0.4)',
            }}
        >
            {/* Background Media */}
            <div style={{
                width: '100%',
                height: '100%',
                position: 'relative',
                background: '#1a120b',
                overflow: 'hidden',
            }}>
                {/* Decorative gradient overlay */}
                <div style={{
                    position: 'absolute',
                    top: 0,
                    left: 0,
                    right: 0,
                    height: '40%',
                    background: 'linear-gradient(180deg, rgba(0,0,0,0.4) 0%, rgba(0,0,0,0) 100%)',
                    zIndex: 1,
                    pointerEvents: 'none',
                }} />

                {item.img && (
                    <motion.img
                        src={item.img}
                        alt={item.title}
                        style={{
                            width: '100%',
                            height: '100%',
                            objectFit: 'cover',
                            transition: 'transform 0.8s cubic-bezier(0.33, 1, 0.68, 1)',
                        }}
                        animate={{
                            scale: isHovered ? 1.08 : 1,
                        }}
                        transition={{ duration: 0.8, ease: [0.33, 1, 0.68, 1] }}
                    />
                )}

                {item.videoSrc && (
                    <video
                        ref={videoRef}
                        src={`${item.videoSrc}#t=0.001`}
                        muted
                        loop
                        playsInline
                        preload="metadata"
                        style={{
                            position: 'absolute',
                            top: 0,
                            left: 0,
                            width: '100%',
                            height: '100%',
                            objectFit: 'cover',
                            transition: 'opacity 0.4s ease',
                            opacity: isPlaying ? 1 : 0.95,
                        }}
                    />
                )}

                {/* Content Overlay */}
                <motion.div
                    className="card-overlay"
                    style={{
                        position: 'absolute',
                        inset: 0,
                        background: `linear-gradient(180deg, rgba(0,0,0,0.2) 0%, rgba(0,0,0,0.75) 100%)`,
                        transition: 'background 0.4s ease',
                        display: 'flex',
                        flexDirection: 'column',
                        justifyContent: 'flex-end',
                        padding: '28px',
                        zIndex: 2,
                    }}
                    animate={{
                        background: (isHovered || isPlaying)
                            ? `linear-gradient(180deg, rgba(0,0,0,0.15) 0%, rgba(0,0,0,0.85) 100%)`
                            : `linear-gradient(180deg, rgba(0,0,0,0.3) 0%, rgba(0,0,0,0.7) 100%)`,
                    }}
                >
                    {/* Badge */}
                    <motion.div
                        initial={{ opacity: 0, x: -20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        transition={{ delay: idx * 0.1 + 0.2 }}
                        style={{
                            display: 'inline-flex',
                            alignItems: 'center',
                            gap: '8px',
                            padding: '6px 16px',
                            background: item.color,
                            color: '#1a1a1a',
                            fontSize: '11px',
                            fontWeight: 700,
                            letterSpacing: '0.1em',
                            textTransform: 'uppercase',
                            marginBottom: 20,
                            width: 'fit-content',
                            borderRadius: '2px',
                        }}
                    >
                        <span>✦</span>
                        {item.badge}
                    </motion.div>

                    {/* Title */}
                    <motion.h3
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ delay: idx * 0.1 + 0.3 }}
                        style={{
                            fontFamily: "'Playfair Display', serif",
                            fontSize: '32px',
                            fontWeight: 500,
                            color: '#FFFFFF',
                            marginBottom: 12,
                            lineHeight: 1.2,
                            letterSpacing: '-0.02em',
                        }}
                    >
                        {item.title}
                    </motion.h3>

                    {/* Description */}
                    <motion.p
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ delay: idx * 0.1 + 0.4 }}
                        style={{
                            fontFamily: "'Raleway', sans-serif",
                            fontSize: '13px',
                            color: 'rgba(255,255,255,0.75)',
                            lineHeight: 1.6,
                            marginBottom: 24,
                            maxWidth: '100%',
                        }}
                    >
                        {item.desc}
                    </motion.p>

                    {/* Stats Row */}
                    {item.stats && (
                        <motion.div
                            initial={{ opacity: 0 }}
                            whileInView={{ opacity: 1 }}
                            transition={{ delay: idx * 0.1 + 0.5 }}
                            style={{
                                display: 'flex',
                                alignItems: 'center',
                                gap: '8px',
                                marginBottom: 20,
                                fontSize: '12px',
                                color: item.color,
                                fontWeight: 500,
                                letterSpacing: '0.5px',
                            }}
                        >
                            <Award size={14} />
                            <span>{item.stats}</span>
                        </motion.div>
                    )}

                    {/* Editorial Play Button */}
                    <motion.div
                        initial={{ opacity: 0, y: 10 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ delay: idx * 0.1 + 0.6 }}
                        style={{
                            display: 'flex',
                            alignItems: 'center',
                            gap: '12px',
                            cursor: 'pointer',
                        }}
                    >
                        <div style={{
                            width: 40,
                            height: 40,
                            borderRadius: '2px',
                            border: `1.5px solid ${item.color}`,
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            color: '#FFFFFF',
                            background: (isHovered || isPlaying) ? item.color : 'rgba(0,0,0,0.3)',
                            backdropFilter: 'blur(8px)',
                            transition: 'all 0.3s ease',
                        }}>
                            {isPlaying ? <Pause size={14} fill="white" /> : <item.icon size={14} fill="white" />}
                        </div>
                        <span style={{
                            fontFamily: "'Raleway', sans-serif",
                            fontSize: '11px',
                            fontWeight: 700,
                            letterSpacing: '0.2em',
                            color: '#FFFFFF',
                            textTransform: 'uppercase',
                        }}>
                            {isPlaying ? 'PAUSE STORY' : 'WATCH STORY'}
                        </span>
                    </motion.div>
                </motion.div>
            </div>
        </motion.div>
    );
};

const TrustSignals: React.FC = () => {
    return (
        <section className="trust-signals-section" style={{
            padding: '80px 0',
            background: '#0f0a06',
            position: 'relative',
            overflow: 'hidden',
        }}>
            {/* Background Texture */}
            <div style={{
                position: 'absolute',
                top: 0,
                left: 0,
                right: 0,
                bottom: 0,
                backgroundImage: `radial-gradient(circle at 20% 40%, rgba(201, 168, 76, 0.03) 0%, transparent 50%)`,
                pointerEvents: 'none',
            }} />

            <div style={{
                maxWidth: 1400,
                margin: '0 auto',
                padding: '0 5%',
            }}>
                {/* Section Header */}
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6 }}
                    viewport={{ once: true }}
                    style={{
                        display: 'flex',
                        justifyContent: 'space-between',
                        alignItems: 'flex-end',
                        flexWrap: 'wrap',
                        gap: '32px',
                        marginBottom: '64px',
                    }}
                >
                    <div style={{ maxWidth: 640 }}>
                        <motion.p
                            initial={{ opacity: 0 }}
                            whileInView={{ opacity: 1 }}
                            transition={{ delay: 0.1 }}
                            style={{
                                color: '#C9A84C',
                                letterSpacing: '0.3em',
                                textTransform: 'uppercase',
                                fontSize: '11px',
                                fontWeight: 600,
                                marginBottom: 16,
                            }}
                        >
                            Worn Across Generations
                        </motion.p>
                        <motion.h2
                            initial={{ opacity: 0 }}
                            whileInView={{ opacity: 1 }}
                            transition={{ delay: 0.2 }}
                            style={{
                                fontFamily: "'Playfair Display', serif",
                                fontSize: 'clamp(40px, 6vw, 64px)',
                                fontWeight: 400,
                                color: '#FFFFFF',
                                lineHeight: 1.1,
                            }}
                        >
                            The Story Behind{' '}
                            <span style={{
                                color: '#C9A84C',
                                fontStyle: 'italic',
                                position: 'relative',
                                display: 'inline-block',
                            }}>
                                Every Saree
                                <span style={{
                                    position: 'absolute',
                                    bottom: 8,
                                    left: 0,
                                    right: 0,
                                    height: '2px',
                                    background: '#C9A84C',
                                    opacity: 0.3,
                                }} />
                            </span>
                        </motion.h2>
                    </div>

                    <motion.p
                        initial={{ opacity: 0, x: 20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.3 }}
                        style={{
                            color: 'rgba(255,255,255,0.6)',
                            maxWidth: 420,
                            fontFamily: "'Raleway', sans-serif",
                            fontSize: '14px',
                            lineHeight: 1.7,
                        }}
                    >
                        We believe in honest craftsmanship. Explore our process, meet our community, and see the care behind every shipment.
                    </motion.p>
                </motion.div>

                {/* Responsive Grid - 3 side by side on desktop, 1 per row on mobile */}
                <div className="trust-grid" style={{
                    display: 'grid',
                    gridTemplateColumns: 'repeat(3, 1fr)',
                    gap: '28px',
                }}>
                    {trustSections.map((item, idx) => (
                        <TrustCard key={idx} item={item} idx={idx} />
                    ))}
                </div>

                {/* Trust Badges Row */}
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.4, duration: 0.6 }}
                    viewport={{ once: true }}
                    style={{
                        display: 'flex',
                        justifyContent: 'center',
                        flexWrap: 'wrap',
                        gap: 'clamp(20px, 4vw, 60px)',
                        marginTop: '70px',
                        paddingTop: '40px',
                        borderTop: '1px solid rgba(201, 168, 76, 0.15)',
                    }}
                >
                    {[
                        { icon: Shield, text: 'Authenticity Guaranteed' },
                        { icon: Truck, text: 'Free Shipping Worldwide' },
                        { icon: Users, text: '24/7 Customer Support' },
                        { icon: Award, text: 'Handcrafted with Love' },
                    ].map((badge, i) => (
                        <motion.div
                            key={i}
                            initial={{ opacity: 0, scale: 0.9 }}
                            whileInView={{ opacity: 1, scale: 1 }}
                            transition={{ delay: 0.5 + i * 0.05 }}
                            viewport={{ once: true }}
                            whileHover={{ y: -3 }}
                            style={{
                                display: 'flex',
                                alignItems: 'center',
                                gap: '12px',
                                color: 'rgba(255,255,255,0.7)',
                                fontSize: '13px',
                                fontWeight: 500,
                                fontFamily: "'Raleway', sans-serif",
                                letterSpacing: '0.5px',
                            }}
                        >
                            <div style={{
                                width: 36,
                                height: 36,
                                borderRadius: '2px',
                                background: 'rgba(201, 168, 76, 0.1)',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                color: '#C9A84C',
                            }}>
                                <badge.icon size={18} />
                            </div>
                            <span>{badge.text}</span>
                        </motion.div>
                    ))}
                </motion.div>
            </div>

            {/* Responsive Styles */}
            <style>{`
                @media (max-width: 1024px) {
                    .trust-grid {
                        grid-template-columns: repeat(2, 1fr) !important;
                        gap: 24px !important;
                    }
                }
                
                @media (max-width: 768px) {
                    .trust-signals-section {
                        padding: 60px 0 !important;
                    }
                    
                    .trust-grid {
                        grid-template-columns: 1fr !important;
                        gap: 24px !important;
                    }
                    
                    .trust-card {
                        height: 440px !important;
                    }
                }
                
                @media (max-width: 480px) {
                    .trust-card {
                        height: 400px !important;
                    }
                }
                
                /* Smooth scroll behavior */
                .trust-signals-section {
                    scroll-margin-top: 80px;
                }
                
                /* Card inner elements transition */
                .trust-card * {
                    transition: all 0.3s ease;
                }
            `}</style>
        </section>
    );
};

export default TrustSignals;