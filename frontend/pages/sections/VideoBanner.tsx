import React from 'react';

const VideoBanner: React.FC = () => {
    return (
        <section style={{ width: '100%', height: '40vh', minHeight: '300px', maxHeight: '450px', overflow: 'hidden', position: 'relative' }}>
            <video
                autoPlay
                muted
                loop
                playsInline
                style={{
                    width: '100%',
                    height: '100%',
                    objectFit: 'cover',
                }}
            >
                <source src="/Woman_wearing_silk_saree_202606221155.mp4" type="video/mp4" />
                Your browser does not support the video tag.
            </video>
        </section>
    );
};

export default VideoBanner;
