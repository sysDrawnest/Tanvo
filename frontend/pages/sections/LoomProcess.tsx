import React from 'react';

const LoomProcess: React.FC = () => {
    return (
        <section style={{
            background: '#0D0B0A',
            padding: 'clamp(80px, 10vw, 140px) 20px',
            color: '#F5F0E8'
        }}>
            <div style={{ maxWidth: 1200, margin: '0 auto', textAlign: 'center' }}>
                <p style={{
                    fontFamily: "'Cinzel', serif",
                    fontSize: 11,
                    letterSpacing: '0.4em',
                    color: 'var(--gold)',
                    textTransform: 'uppercase',
                    marginBottom: 24
                }}>
                    Handloom Artisanship
                </p>
                <h2 style={{
                    fontFamily: "'Cormorant Garamond', serif",
                    fontSize: 'clamp(40px, 5vw, 64px)',
                    fontWeight: 300,
                    marginBottom: 24,
                    lineHeight: 1.1
                }}>
                    Loom Process
                </h2>
                <p style={{
                    fontFamily: "'Raleway', sans-serif",
                    fontSize: 'clamp(15px, 1.5vw, 18px)',
                    color: 'rgba(245, 240, 232, 0.65)',
                    maxWidth: 700,
                    margin: '0 auto 60px',
                    lineHeight: 1.8
                }}>
                    Watch our master weavers bring threads to life in the traditional handloom process.
                </p>

                {/* Video Player Container */}
                <div style={{
                    position: 'relative',
                    width: '100%',
                    maxWidth: '1000px',
                    margin: '0 auto',
                    aspectRatio: '16/9',
                    background: '#000',
                    boxShadow: '0 30px 60px rgba(0,0,0,0.5)',
                    overflow: 'hidden',
                    borderRadius: '4px',
                    border: '1px solid rgba(201, 168, 76, 0.2)'
                }}>
                    <video
                        controls
                        style={{ width: '100%', height: '100%', display: 'block' }}
                        poster="/EditorialBanner.png" // Using existing image as poster
                    >
                        <source src="/saree quality 2.mp4" type="video/mp4" />
                        Your browser does not support the video tag.
                    </video>
                </div>
            </div>
        </section>
    );
};

export default LoomProcess;
