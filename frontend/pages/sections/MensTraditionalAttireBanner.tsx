import React from 'react';
import { Link } from 'react-router-dom';

const MensTraditionalAttireBanner: React.FC = () => {
    return (
        <section
            style={{
                position: 'relative',
                width: '100%',
                minHeight: '680px',
                overflow: 'hidden',
                backgroundColor: '#C4A882',
            }}
        >
            {/* Full-bleed flowing silk background */}
            <div style={{ position: 'absolute', inset: 0 }}>
                <img
                    src="/mens-silk-bg.jpeg"
                    alt=""
                    style={{ width: '100%', height: '100%', objectFit: 'cover', objectPosition: 'center' }}
                />
                <div style={{ position: 'absolute', inset: 0, background: 'rgba(0,0,0,0.08)' }} />
            </div>

            {/* Content Grid */}
            <div
                style={{
                    position: 'relative',
                    zIndex: 10,
                    display: 'flex',
                    alignItems: 'stretch',
                    width: '100%',
                    minHeight: '680px',
                    padding: '48px 48px 48px 56px',
                    boxSizing: 'border-box',
                    gap: '32px',
                }}
                className="mens-banner-inner"
            >
                {/* LEFT: Glassmorphism Card */}
                <div
                    style={{
                        flex: '0 0 42%',
                        maxWidth: '460px',
                        display: 'flex',
                        alignItems: 'center',
                    }}
                >
                    <div
                        style={{
                            width: '100%',
                            padding: '44px 40px',
                            borderRadius: '20px',
                            background: 'rgba(255, 255, 255, 0.13)',
                            backdropFilter: 'blur(28px)',
                            WebkitBackdropFilter: 'blur(28px)',
                            border: '1px solid rgba(255, 255, 255, 0.22)',
                            boxShadow: '0 8px 40px rgba(0, 0, 0, 0.12)',
                            boxSizing: 'border-box',
                        }}
                    >
                        {/* Eyebrow */}
                        <span
                            style={{
                                display: 'block',
                                fontFamily: "'Raleway', sans-serif",
                                fontSize: '10px',
                                fontWeight: 600,
                                letterSpacing: '0.3em',
                                textTransform: 'uppercase',
                                color: 'rgba(255,255,255,0.72)',
                                marginBottom: '22px',
                            }}
                        >
                            Handloom Collection
                        </span>

                        {/* Heading */}
                        <h2
                            style={{
                                fontFamily: "'Playfair Display', serif",
                                fontSize: 'clamp(42px, 5vw, 68px)',
                                fontWeight: 400,
                                color: '#FFFFFF',
                                lineHeight: 1.08,
                                letterSpacing: '-0.01em',
                                margin: '0 0 20px 0',
                            }}
                        >
                            Men's<br />Traditional
                        </h2>

                        {/* Description */}
                        <p
                            style={{
                                fontFamily: "'Raleway', sans-serif",
                                fontSize: '13px',
                                fontWeight: 300,
                                color: 'rgba(255,255,255,0.78)',
                                lineHeight: 1.7,
                                margin: '0 0 36px 0',
                                maxWidth: '270px',
                            }}
                        >
                            Discover the latest masterpieces from our looms.
                        </p>

                        {/* CTA */}
                        <Link
                            to="/shop?sort=-createdAt"
                            className="mens-shop-btn"
                            style={{
                                display: 'inline-block',
                                fontFamily: "'Raleway', sans-serif",
                                fontSize: '11px',
                                fontWeight: 700,
                                letterSpacing: '0.22em',
                                textTransform: 'uppercase',
                                color: '#FFFFFF',
                                border: '1.5px solid rgba(255,255,255,0.75)',
                                borderRadius: '100px',
                                padding: '13px 34px',
                                textDecoration: 'none',
                                transition: 'all 0.3s ease',
                            }}
                            onMouseEnter={e => {
                                const el = e.currentTarget as HTMLAnchorElement;
                                el.style.background = '#FFFFFF';
                                el.style.color = '#1B2B3A';
                                el.style.borderColor = '#FFFFFF';
                            }}
                            onMouseLeave={e => {
                                const el = e.currentTarget as HTMLAnchorElement;
                                el.style.background = 'transparent';
                                el.style.color = '#FFFFFF';
                                el.style.borderColor = 'rgba(255,255,255,0.75)';
                            }}
                        >
                            Shop Now
                        </Link>
                    </div>
                </div>

                {/* RIGHT: Portrait + 2×2 Grid */}
                <div
                    style={{
                        flex: 1,
                        display: 'flex',
                        alignItems: 'flex-start',
                        gap: '10px',
                        minHeight: '580px',
                    }}
                >
                    {/* Main Portrait */}
                    <div
                        style={{
                            flex: '0 0 56%',
                            height: '100%',
                            minHeight: '560px',
                            borderRadius: '18px',
                            overflow: 'hidden',
                        }}
                    >
                        <img
                            src="/mens-hero-portrait.jpeg"
                            alt="Men's Traditional Collection"
                            style={{
                                width: '100%',
                                height: '100%',
                                objectFit: 'cover',
                                objectPosition: 'top center',
                                display: 'block',
                            }}
                        />
                    </div>

                    {/* 2×2 Fabric Grid */}
                    <div
                        style={{
                            flex: 1,
                            display: 'grid',
                            gridTemplateColumns: '1fr 1fr',
                            gridTemplateRows: '1fr 1fr',
                            gap: '10px',
                            height: '100%',
                            minHeight: '560px',
                        }}
                    >
                        {[
                            { src: '/mens-loom-craft.jpeg',  alt: 'Handloom weaving close-up' },
                            { src: '/mens-fabric-roll.jpeg', alt: 'Rolled silk fabric' },
                            { src: '/mens-fabric-blue.jpeg', alt: 'Blue ikat fabric' },
                            { src: '/mens-fabric-pink.jpeg', alt: 'Draped pink silk' },
                        ].map((img, idx) => (
                            <div
                                key={idx}
                                style={{
                                    borderRadius: '14px',
                                    overflow: 'hidden',
                                    background: '#b8a090',
                                }}
                            >
                                <img
                                    src={img.src}
                                    alt={img.alt}
                                    style={{
                                        width: '100%',
                                        height: '100%',
                                        objectFit: 'cover',
                                        display: 'block',
                                        transition: 'transform 0.6s ease',
                                    }}
                                    onMouseEnter={e => { (e.currentTarget as HTMLImageElement).style.transform = 'scale(1.06)'; }}
                                    onMouseLeave={e => { (e.currentTarget as HTMLImageElement).style.transform = 'scale(1)'; }}
                                />
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            {/* Responsive overrides */}
            <style>{`
                @media (max-width: 900px) {
                    .mens-banner-inner {
                        flex-direction: column !important;
                        padding: 32px 24px !important;
                    }
                    .mens-banner-inner > div:first-child {
                        flex: unset !important;
                        max-width: 100% !important;
                    }
                }
                @media (max-width: 600px) {
                    .mens-banner-inner > div:last-child {
                        flex-direction: column !important;
                        min-height: unset !important;
                    }
                    .mens-banner-inner > div:last-child > div:first-child {
                        min-height: 320px !important;
                    }
                }
            `}</style>
        </section>
    );
};

export default MensTraditionalAttireBanner;