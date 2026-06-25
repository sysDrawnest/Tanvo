import React, { useRef, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

const JournalHint: React.FC = () => {
    const sectionRef = useRef<HTMLElement>(null);
    const [visible, setVisible] = useState(false);

    useEffect(() => {
        const observer = new IntersectionObserver(
            ([entry]) => { if (entry.isIntersecting) setVisible(true); },
            { threshold: 0.2 }
        );
        if (sectionRef.current) observer.observe(sectionRef.current);
        return () => observer.disconnect();
    }, []);

    return (
        <section
            ref={sectionRef}
            className="flex items-center justify-center overflow-hidden"
            style={{ 
                backgroundColor: '#0D0B0A', 
                padding: '8vw 0', // Padding top/bottom. 0 padding on sides for mobile full width
            }}
            data-purpose="journal-hint-modal"
        >
            <div
                className="relative w-full max-w-[700px] border-y md:border border-[rgba(201,168,76,0.15)] bg-[#0D0B0A]"
                style={{
                    opacity: visible ? 1 : 0,
                    transform: visible ? 'translateY(0)' : 'translateY(30px)',
                    transition: 'opacity 700ms ease-out, transform 700ms ease-out',
                    boxShadow: '0 20px 40px rgba(0,0,0,0.4)',
                }}
            >
                {/* Content Padding Wrapper */}
                <div className="p-10 md:p-16 flex flex-col items-center text-center">
                    
                    {/* Top Label */}
                    <span
                        className="mb-8 block"
                        style={{
                            fontFamily: "'Inter', sans-serif",
                            fontSize: '10px',
                            fontWeight: 600,
                            letterSpacing: '0.25em',
                            textTransform: 'uppercase',
                            color: '#C9A84C',
                        }}
                    >
                        THE TANVO CHRONICLES
                    </span>

                    {/* Divider */}
                    <div className="w-10 h-[1px] bg-[rgba(201,168,76,0.3)] mb-10" />

                    {/* Heading */}
                    <h2
                        className="mb-8"
                        style={{
                            fontFamily: "'Playfair Display', serif",
                            fontSize: 'clamp(26px, 5vw, 42px)',
                            fontWeight: 400,
                            lineHeight: 1.3,
                            letterSpacing: '0.02em',
                            color: '#F9F5EE',
                        }}
                    >
                        THE REAL STORIES<br />BEHIND TANVO
                    </h2>

                    {/* Body */}
                    <div style={{ maxWidth: '440px' }}>
                        <p
                            className="mb-5"
                            style={{
                                fontFamily: "'Raleway', sans-serif",
                                fontSize: '14px',
                                lineHeight: 1.8,
                                color: 'rgba(249,245,238,0.65)',
                            }}
                        >
                            TANVO was born from a respect for the hands, traditions, and stories behind every handwoven saree.
                        </p>
                        <p
                            className="mb-10"
                            style={{
                                fontFamily: "'Raleway', sans-serif",
                                fontSize: '14px',
                                lineHeight: 1.8,
                                color: 'rgba(249,245,238,0.65)',
                            }}
                        >
                            Every thread carries the patience of artisans, the heritage of Odisha's weaving communities, and generations of craftsmanship preserved through time.
                        </p>
                    </div>

                    {/* Divider */}
                    <div className="w-10 h-[1px] bg-[rgba(201,168,76,0.3)] mb-10" />

                    {/* CTA */}
                    <Link
                        to="/journal"
                        className="group transition-colors duration-500 hover:bg-[#780000] hover:border-[#780000] inline-flex items-center justify-center"
                        style={{
                            border: '1px solid rgba(201,168,76,0.4)',
                            padding: '16px 36px',
                            fontFamily: "'Inter', sans-serif",
                            fontSize: '11px',
                            fontWeight: 500,
                            letterSpacing: '0.15em',
                            textTransform: 'uppercase',
                            color: '#F9F5EE',
                            textDecoration: 'none',
                            background: 'transparent',
                        }}
                    >
                        Explore Our Heritage <span className="ml-2 font-serif text-[14px]">→</span>
                    </Link>

                    {/* Closing Line */}
                    <span
                        className="mt-12 block"
                        style={{
                            fontFamily: "'Playfair Display', serif",
                            fontSize: '12px',
                            fontStyle: 'italic',
                            color: 'rgba(249,245,238,0.3)',
                            letterSpacing: '0.05em'
                        }}
                    >
                        Handwoven. Authentic. Timeless.
                    </span>

                </div>
            </div>
        </section>
    );
};

export default JournalHint;