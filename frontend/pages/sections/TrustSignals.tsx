import React, { useRef, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Play, Star, Box, Image as ImageIcon, Pause } from 'lucide-react';

const trustSections = [
    {
        icon: Play,
        title: 'Loom Process',
        desc: 'Watch our master weavers bring threads to life in the traditional handloom process.',
        badge: 'Video',
        videoSrc: '/saree quality 2.mp4'
    },
    {
        icon: ImageIcon,
        title: 'Customer Stories',
        desc: 'Real photos from our TANVO family worldwide celebrating heritage.',
        badge: 'Gallery',
        img: 'https://images.unsplash.com/photo-1610030469668-935142b9cdd0?w=800'
    },
    {
        icon: Box,
        title: 'Premium Packaging',
        desc: 'Every saree is packed with love in eco-friendly, heritage-inspired packaging.',
        badge: 'Packaging',
        img: 'https://images.unsplash.com/photo-1617627143750-d86bc21e42bb?w=800'
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
        if (item.videoSrc && videoRef.current) {
            videoRef.current.play().catch(() => { });
            setIsPlaying(true);
        }
    };

    const handleMouseLeave = () => {
        setIsHovered(false);
        if (item.videoSrc && videoRef.current) {
            videoRef.current.pause();
            setIsPlaying(false);
        }
    };

    return (
        <motion.div
            initial={{ opacity: 0, translateY: 30 }}
            whileInView={{ opacity: 1, translateY: 0 }}
            transition={{ delay: idx * 0.1, duration: 0.6 }}
            viewport={{ once: true }}
            style={{ position: 'relative', overflow: 'hidden', height: 'clamp(400px, 60vh, 550px)', cursor: 'pointer' }}
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
            onClick={togglePlay}
        >
            {/* Background Media */}
            <div style={{ width: '100%', height: '100%', position: 'relative', background: '#1C1612' }}>
                {item.img && (
                    <img
                        src={item.img}
                        alt={item.title}
                        style={{
                            width: '100%',
                            height: '100%',
                            objectFit: 'cover',
                            transition: 'transform 0.8s cubic-bezier(0.165, 0.84, 0.44, 1)',
                            transform: isHovered ? 'scale(1.1)' : 'scale(1)',
                            opacity: isPlaying ? 0 : 1,
                        }}
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
                        }}
                    />
                )}
            </div>

            {/* Content Overlay */}
            <div className="overlay" style={{
                position: 'absolute',
                inset: 0,
                background: isHovered || isPlaying ? 'rgba(13,11,10,0.3)' : 'rgba(13,11,10,0.6)',
                transition: 'background 0.4s ease',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'flex-end',
                padding: 'clamp(24px, 5vw, 40px)',
                zIndex: 2,
            }}>
                <span style={{
                    display: 'inline-block', padding: '4px 12px', background: 'var(--gold)',
                    color: 'var(--ink)', fontSize: 'clamp(8px, 1.5vw, 9px)', fontWeight: 700, letterSpacing: '0.1em',
                    textTransform: 'uppercase', marginBottom: 20, width: 'fit-content'
                }}>
                    {item.badge}
                </span>
                <h3 style={{ fontFamily: 'Cormorant Garamond, serif', fontSize: 'clamp(24px, 4vw, 32px)', color: '#FFFFFF', marginBottom: 12, lineHeight: 1.1 }}>{item.title}</h3>
                <p style={{ fontFamily: 'Montserrat, sans-serif', fontSize: 'clamp(12px, 1.3vw, 13px)', color: 'rgba(255,255,255,0.7)', lineHeight: 1.6, marginBottom: 28, maxWidth: '90%' }}>{item.desc}</p>

                <div style={{
                    width: 48, height: 48, borderRadius: '50%', border: '1px solid rgba(255,255,255,0.3)',
                    display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#FFFFFF',
                    background: isHovered || isPlaying ? 'rgba(201, 168, 76, 0.9)' : 'transparent',
                    borderColor: isHovered || isPlaying ? 'var(--gold)' : 'rgba(255,255,255,0.3)',
                    transition: 'all 0.3s ease',
                }}>
                    <AnimatePresence mode="wait">
                        {isPlaying ? (
                            <motion.div
                                key="pause"
                                initial={{ opacity: 0, scale: 0.5 }}
                                animate={{ opacity: 1, scale: 1 }}
                                exit={{ opacity: 0, scale: 0.5 }}
                            >
                                <Pause size={18} />
                            </motion.div>
                        ) : (
                            <motion.div
                                key="play"
                                initial={{ opacity: 0, scale: 0.5 }}
                                animate={{ opacity: 1, scale: 1 }}
                                exit={{ opacity: 0, scale: 0.5 }}
                            >
                                <item.icon size={18} />
                            </motion.div>
                        )}
                    </AnimatePresence>
                </div>
            </div>
        </motion.div>
    );
};

const TrustSignals: React.FC = () => {
    return (
        <section style={{ padding: 'clamp(60px, 10vw, 120px) 0', background: 'var(--ink)' }}>
            <div style={{ maxWidth: 1400, margin: '0 auto', padding: '0 clamp(24px, 6vw, 80px)' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', marginBottom: 'clamp(40px, 8vw, 64px)', flexWrap: 'wrap', gap: 32 }}>
                    <div style={{ maxWidth: 640 }}>
                        <p className="section-label" style={{ color: 'var(--gold)', letterSpacing: '0.3em', textTransform: 'uppercase', fontSize: 10, fontWeight: 700, marginBottom: 16 }}>Building Confidence</p>
                        <h2 style={{ fontFamily: 'Cormorant Garamond, serif', fontSize: 'clamp(36px, 5vw, 64px)', fontWeight: 300, color: '#FFFFFF', lineHeight: 1 }}>
                            Transparency in <span style={{ color: 'var(--gold)', fontStyle: 'italic' }}>Every Thread</span>
                        </h2>
                    </div>
                    <p style={{ color: 'rgba(255,255,255,0.5)', maxWidth: 440, fontFamily: 'Montserrat, sans-serif', fontSize: 'clamp(13px, 1.5vw, 14px)', lineHeight: 1.8 }}>
                        We believe in honest craftsmanship. Explore our process, meet our community, and see the care behind every shipment.
                    </p>
                </div>

                <div style={{
                    display: 'grid',
                    gridTemplateColumns: 'repeat(auto-fit, minmax(clamp(280px, 30vw, 400px), 1fr))',
                    gap: 'clamp(16px, 3vw, 32px)'
                }}>
                    {trustSections.map((item, idx) => (
                        <TrustCard key={idx} item={item} idx={idx} />
                    ))}
                </div>
            </div>
        </section>
    );
};


export default TrustSignals;

