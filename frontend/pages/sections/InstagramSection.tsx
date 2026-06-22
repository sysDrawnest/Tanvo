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
        <section style={{ background: 'var(--ink)', padding: '100px max(48px, 6vw)' }}>
            <div style={{ textAlign: 'center', marginBottom: 64 }}>
                <p className="section-label" style={{ marginBottom: 16 }}>Community</p>
                <h2 className="font-display" style={{ fontSize: 'clamp(28px, 4vw, 52px)', fontWeight: 300, color: '#F5F0E8', lineHeight: 1.1 }}>
                    Wear it · Share it<br /><em style={{ color: 'var(--gold)' }}>{handle}</em>
                </h2>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(6, 1fr)', gap: 2, marginBottom: 48 }}>
                {feed.map(item => (
                    <a
                        key={item.id}
                        href={item.link}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="img-zoom"
                        style={{ position: 'relative', aspectRatio: '1', display: 'block', overflow: 'hidden', background: '#111' }}
                    >
                        <img src={item.image} alt="Instagram" style={{ width: '100%', height: '100%', objectFit: 'cover', opacity: 0.75, transition: 'opacity 0.4s' }} />
                        <div
                            style={{ position: 'absolute', inset: 0, background: 'rgba(201,168,76,0.25)', opacity: 0, transition: 'opacity 0.4s', display: 'flex', alignItems: 'center', justifyContent: 'center' }}
                            onMouseEnter={e => ((e.currentTarget as HTMLDivElement).style.opacity = '1')}
                            onMouseLeave={e => ((e.currentTarget as HTMLDivElement).style.opacity = '0')}
                        >
                            <Instagram size={20} style={{ color: '#F5F0E8' }} />
                        </div>
                    </a>
                ))}
            </div>

            <div style={{ textAlign: 'center' }}>
                <a href={profileUrl} target="_blank" rel="noopener noreferrer" className="btn-outline-gold">
                    Follow on Instagram <ArrowUpRight size={14} />
                </a>
            </div>
        </section>
    );
};

export default InstagramSection;
