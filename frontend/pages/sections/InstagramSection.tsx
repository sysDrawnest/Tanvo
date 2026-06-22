import React, { useState } from 'react';
import { Instagram, ArrowUpRight } from 'lucide-react';

interface InstagramPost {
    id: number;
    image: string;
    link: string;
}

interface InstagramSectionProps {
    posts?: InstagramPost[];
    handle?: string;
    profileUrl?: string;
}

const InstagramSection: React.FC<InstagramSectionProps> = ({
    posts,
    handle = '#Tanvo',
    profileUrl = 'https://instagram.com',
}) => {
    const [feed] = useState<InstagramPost[]>(
        posts ||
        [1, 2, 3, 4, 5, 6].map(i => ({
            id: i,
            image: `https://picsum.photos/seed/insta${i}x/600/600`,
            link: profileUrl,
        }))
    );

    return (
        <section style={{ background: 'var(--ivory)', padding: '100px max(48px, 6vw)', borderTop: '1px solid var(--ivory-deep)' }}>
            <div style={{ textAlign: 'center', marginBottom: 64 }}>
                <p className="section-label" style={{ marginBottom: 16 }}>Community</p>
                <h2 className="font-display" style={{ fontSize: 'clamp(28px, 4vw, 52px)', fontWeight: 300, color: 'var(--ink)', lineHeight: 1.1 }}>
                    Wear it · Share it<br /><em style={{ color: 'var(--terra)' }}>{handle}</em>
                </h2>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-2" style={{ marginBottom: 48 }}>
                {feed.map(item => (
                    <a
                        key={item.id}
                        href={item.link}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="img-zoom"
                        style={{ position: 'relative', aspectRatio: '1', display: 'block', overflow: 'hidden', background: 'var(--ivory-warm)' }}
                    >
                        <img src={item.image} alt="Instagram" style={{ width: '100%', height: '100%', objectFit: 'cover', opacity: 0.95, transition: 'opacity 0.4s' }} />
                        <div
                            style={{ position: 'absolute', inset: 0, background: 'rgba(181,80,43,0.15)', opacity: 0, transition: 'opacity 0.4s', display: 'flex', alignItems: 'center', justifyContent: 'center' }}
                            onMouseEnter={e => ((e.currentTarget as HTMLDivElement).style.opacity = '1')}
                            onMouseLeave={e => ((e.currentTarget as HTMLDivElement).style.opacity = '0')}
                        >
                            <Instagram size={20} style={{ color: '#FFFFFF' }} />
                        </div>
                    </a>
                ))}
            </div>

            <div style={{ textAlign: 'center' }}>
                <a href={profileUrl} target="_blank" rel="noopener noreferrer" className="btn-outline-gold" style={{ display: 'inline-flex', alignItems: 'center', gap: 8, padding: '14px 28px', fontSize: '11px', letterSpacing: '0.15em', fontFamily: 'Montserrat, sans-serif' }}>
                    Follow on Instagram <ArrowUpRight size={14} />
                </a>
            </div>
        </section>
    );
};

export default InstagramSection;
