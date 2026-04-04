import React, { useEffect, useRef } from 'react';
import { STORIES } from '../../constants';

interface Story {
    id: number;
    title: string;
    img: string;
    name: string;
    cat: string;
    excerpt: string;
}

interface StoriesSectionProps {
    stories?: Story[];
}

const StoriesSection: React.FC<StoriesSectionProps> = ({ stories = STORIES }) => {
    const storyRefs = useRef<(HTMLDivElement | null)[]>([]);

    useEffect(() => {
        const observer = new IntersectionObserver(
            (entries) => {
                entries.forEach((entry) => {
                    if (entry.isIntersecting) entry.target.classList.add('visible');
                });
            },
            { threshold: 0.15 }
        );
        storyRefs.current.forEach((ref) => { if (ref) observer.observe(ref); });
        return () => observer.disconnect();
    }, []);

    return (
        <section className="py-12 md:py-24 px-4 md:px-[max(48px,6vw)]" style={{ background: 'var(--cream)' }}>
            <div style={{ textAlign: 'center', marginBottom: 48 }}>
                <p className="section-label" style={{ marginBottom: 12 }}>Customer Chronicles</p>
                <h2 className="font-display" style={{ fontSize: 'clamp(32px, 4.5vw, 60px)', fontWeight: 300, color: 'var(--ink)', lineHeight: 1.1 }}>
                    The Real Stories<br /><em>Behind Our Brand</em>
                </h2>
            </div>

            <div className="grid grid-cols-2 lg:grid-cols-3 gap-6 md:gap-12">
                {stories.map((story, idx) => (
                    <div
                        key={story.id}
                        ref={(el) => { storyRefs.current[idx] = el; }}
                        className="story-card card-hover"
                        style={{ opacity: 0, transform: 'translateY(40px)', cursor: 'pointer' }}
                    >
                        <div className="img-zoom" style={{ aspectRatio: '16/10', overflow: 'hidden', marginBottom: 16, position: 'relative' }}>
                            <img src={story.img} alt={story.title} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                            <div style={{ position: 'absolute', top: 12, left: 12 }}>
                                <span style={{ background: 'var(--gold)', color: 'var(--ink)', padding: '3px 8px', fontFamily: 'Montserrat, sans-serif', fontSize: 6, fontWeight: 700, letterSpacing: '0.1em', textTransform: 'uppercase' }}>
                                    {story.cat}
                                </span>
                            </div>
                        </div>
                        <h3 className="font-display text-lg md:text-2xl mb-2 md:mb-3" style={{ fontWeight: 400, color: 'var(--ink)', lineHeight: 1.2 }}>{story.title}</h3>
                        <p className="font-sans-custom text-[10px] md:text-xs leading-relaxed mb-3 md:mb-4 italic" style={{ color: 'rgba(13,11,10,0.55)' }}>"{story.excerpt}"</p>
                        <p className="font-sans-custom text-[7px] md:text-[8px] font-bold tracking-[0.2em] uppercase" style={{ color: 'var(--gold)' }}>— {story.name}</p>
                    </div>
                ))}
            </div>
        </section>
    );
};

export default StoriesSection;
