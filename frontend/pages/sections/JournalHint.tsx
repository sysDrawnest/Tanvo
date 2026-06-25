import React, { useRef, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowUpRight } from 'lucide-react';

const articles = [
    {
        issue: '01',
        tag: 'Craft',
        title: 'The mathematics of the loom',
        excerpt: 'How Sambalpuri weavers calculate ikat resist patterns using a system that predates modern algebra by four centuries.',
        readTime: '6 min read',
    },
    {
        issue: '02',
        tag: 'Heritage',
        title: 'Seven hundred years of silk',
        excerpt: 'Tracing the unbroken lineage of Odisha\'s weaving clusters from the Ganga dynasty courts to the present-day loom shed.',
        readTime: '9 min read',
    },
    {
        issue: '03',
        tag: 'Process',
        title: 'Why a single saree takes three weeks',
        excerpt: 'A step-by-step look at resist-dyeing, warping, and hand-shuttle weaving — and the irreducible human time each stage demands.',
        readTime: '7 min read',
    },
];

const JournalHint: React.FC = () => {
    const sectionRef = useRef<HTMLElement>(null);
    const [visible, setVisible] = useState(false);

    useEffect(() => {
        const observer = new IntersectionObserver(
            ([entry]) => { if (entry.isIntersecting) setVisible(true); },
            { threshold: 0.15 }
        );
        if (sectionRef.current) observer.observe(sectionRef.current);
        return () => observer.disconnect();
    }, []);

    return (
        <section
            ref={sectionRef}
            className="relative overflow-hidden"
            style={{ backgroundColor: '#0D0B0A' }}
            data-purpose="journal-hint"
        >
            {/* Subtle textile grid overlay */}
            <div
                aria-hidden="true"
                className="pointer-events-none absolute inset-0"
                style={{
                    backgroundImage: `
                        linear-gradient(rgba(201,168,76,0.04) 1px, transparent 1px),
                        linear-gradient(90deg, rgba(201,168,76,0.04) 1px, transparent 1px)
                    `,
                    backgroundSize: '48px 48px',
                }}
            />

            <div className="relative max-w-[1280px] mx-auto px-8">
                {/* Top rule */}
                <div
                    className="transition-all duration-700 ease-out origin-left"
                    style={{
                        height: '1px',
                        backgroundColor: 'rgba(201,168,76,0.25)',
                        transform: visible ? 'scaleX(1)' : 'scaleX(0)',
                    }}
                />

                <div className="grid grid-cols-1 lg:grid-cols-[1fr_1.6fr] gap-0">

                    {/* ── Left column: editorial header ── */}
                    <div
                        className="py-16 lg:py-24 lg:pr-16 flex flex-col justify-between"
                        style={{ borderRight: '1px solid rgba(201,168,76,0.15)' }}
                    >
                        <div>
                            <span
                                className="block mb-6"
                                style={{
                                    fontFamily: "'Inter', sans-serif",
                                    fontSize: '10px',
                                    fontWeight: 700,
                                    letterSpacing: '0.2em',
                                    textTransform: 'uppercase',
                                    color: '#C9A84C',
                                    opacity: visible ? 1 : 0,
                                    transform: visible ? 'translateY(0)' : 'translateY(12px)',
                                    transition: 'opacity 600ms ease 200ms, transform 600ms ease 200ms',
                                }}
                            >
                                The TANVO Chronicles
                            </span>

                            <h2
                                style={{
                                    fontFamily: "'Playfair Display', serif",
                                    fontSize: 'clamp(36px, 4vw, 56px)',
                                    fontWeight: 700,
                                    lineHeight: 1.1,
                                    letterSpacing: '-0.02em',
                                    color: '#F9F5EE',
                                    opacity: visible ? 1 : 0,
                                    transform: visible ? 'translateY(0)' : 'translateY(16px)',
                                    transition: 'opacity 700ms ease 300ms, transform 700ms ease 300ms',
                                }}
                            >
                                The real <br />
                                <span style={{ color: '#C9A84C', fontStyle: 'italic' }}>
                                    stories
                                </span>
                                <br /> behind <br /> our brand
                            </h2>
                        </div>

                        <div
                            style={{
                                opacity: visible ? 1 : 0,
                                transform: visible ? 'translateY(0)' : 'translateY(12px)',
                                transition: 'opacity 700ms ease 500ms, transform 700ms ease 500ms',
                            }}
                        >
                            <p
                                className="mb-8"
                                style={{
                                    fontFamily: "'Raleway', sans-serif",
                                    fontSize: '14px',
                                    lineHeight: 1.75,
                                    color: 'rgba(249,245,238,0.5)',
                                    maxWidth: '320px',
                                }}
                            >
                                Long-form writing on craft, heritage, and the quiet precision that goes into every saree we carry.
                            </p>

                            <Link
                                to="/journal"
                                className="inline-flex items-center gap-3 group"
                                style={{
                                    fontFamily: "'Inter', sans-serif",
                                    fontSize: '11px',
                                    fontWeight: 700,
                                    letterSpacing: '0.2em',
                                    textTransform: 'uppercase',
                                    color: '#F9F5EE',
                                    textDecoration: 'none',
                                }}
                            >
                                <span
                                    style={{
                                        display: 'inline-flex',
                                        alignItems: 'center',
                                        justifyContent: 'center',
                                        width: '40px',
                                        height: '40px',
                                        borderRadius: '8px',
                                        border: '1px solid rgba(249,245,238,0.25)',
                                        transition: 'background 500ms ease, border-color 500ms ease',
                                    }}
                                    className="group-hover:bg-[#780000] group-hover:border-[#780000]"
                                >
                                    <ArrowUpRight size={15} />
                                </span>
                                Explore the chronicles
                            </Link>
                        </div>
                    </div>

                    {/* ── Right column: article list ── */}
                    <div className="py-16 lg:py-24 lg:pl-16 flex flex-col justify-center gap-0">
                        {articles.map((article, i) => (
                            <Link
                                key={article.issue}
                                to="/journal"
                                className="group block"
                                style={{
                                    textDecoration: 'none',
                                    borderBottom: i < articles.length - 1
                                        ? '1px solid rgba(201,168,76,0.12)'
                                        : 'none',
                                    padding: '28px 0',
                                    opacity: visible ? 1 : 0,
                                    transform: visible ? 'translateX(0)' : 'translateX(24px)',
                                    transition: `opacity 600ms ease ${400 + i * 120}ms, transform 600ms ease ${400 + i * 120}ms`,
                                }}
                            >
                                <div className="flex items-start justify-between gap-6">
                                    <div className="flex items-start gap-6 flex-1 min-w-0">
                                        {/* Issue number */}
                                        <span
                                            aria-hidden="true"
                                            style={{
                                                fontFamily: "'Playfair Display', serif",
                                                fontSize: '11px',
                                                fontWeight: 700,
                                                letterSpacing: '0.1em',
                                                color: 'rgba(201,168,76,0.4)',
                                                paddingTop: '3px',
                                                flexShrink: 0,
                                                transition: 'color 400ms ease',
                                            }}
                                            className="group-hover:text-[#C9A84C]"
                                        >
                                            {article.issue}
                                        </span>

                                        <div className="flex-1 min-w-0">
                                            {/* Tag pill */}
                                            <span
                                                className="inline-block mb-2"
                                                style={{
                                                    fontFamily: "'Inter', sans-serif",
                                                    fontSize: '9px',
                                                    fontWeight: 700,
                                                    letterSpacing: '0.18em',
                                                    textTransform: 'uppercase',
                                                    color: 'rgba(249,245,238,0.4)',
                                                    border: '1px solid rgba(249,245,238,0.12)',
                                                    borderRadius: '4px',
                                                    padding: '3px 8px',
                                                }}
                                            >
                                                {article.tag}
                                            </span>

                                            <h3
                                                className="mb-2"
                                                style={{
                                                    fontFamily: "'Playfair Display', serif",
                                                    fontSize: '19px',
                                                    fontWeight: 700,
                                                    letterSpacing: '-0.01em',
                                                    lineHeight: 1.25,
                                                    color: '#F9F5EE',
                                                    transition: 'color 400ms ease',
                                                }}
                                            >
                                                {article.title}
                                            </h3>

                                            <p
                                                style={{
                                                    fontFamily: "'Raleway', sans-serif",
                                                    fontSize: '13px',
                                                    lineHeight: 1.65,
                                                    color: 'rgba(249,245,238,0.45)',
                                                    maxWidth: '460px',
                                                    margin: 0,
                                                    transition: 'color 400ms ease',
                                                }}
                                                className="group-hover:text-[rgba(249,245,238,0.7)]"
                                            >
                                                {article.excerpt}
                                            </p>
                                        </div>
                                    </div>

                                    {/* Read time + arrow */}
                                    <div
                                        className="flex flex-col items-end gap-3 flex-shrink-0 pt-1"
                                    >
                                        <span
                                            style={{
                                                fontFamily: "'Inter', sans-serif",
                                                fontSize: '10px',
                                                fontWeight: 700,
                                                letterSpacing: '0.1em',
                                                textTransform: 'uppercase',
                                                color: 'rgba(249,245,238,0.3)',
                                                whiteSpace: 'nowrap',
                                            }}
                                        >
                                            {article.readTime}
                                        </span>
                                        <span
                                            style={{
                                                display: 'inline-flex',
                                                alignItems: 'center',
                                                justifyContent: 'center',
                                                width: '32px',
                                                height: '32px',
                                                borderRadius: '8px',
                                                border: '1px solid rgba(249,245,238,0.1)',
                                                color: 'rgba(249,245,238,0.3)',
                                                opacity: 0,
                                                transform: 'translateX(-6px)',
                                                transition: 'opacity 400ms ease, transform 400ms ease, background 400ms ease',
                                            }}
                                            className="group-hover:!opacity-100 group-hover:!translate-x-0 group-hover:bg-[#780000] group-hover:border-[#780000] group-hover:text-white"
                                        >
                                            <ArrowUpRight size={14} />
                                        </span>
                                    </div>
                                </div>
                            </Link>
                        ))}
                    </div>
                </div>

                {/* Bottom rule */}
                <div
                    style={{
                        height: '1px',
                        backgroundColor: 'rgba(201,168,76,0.25)',
                        transition: 'transform 700ms ease 800ms',
                        transformOrigin: 'right',
                        transform: visible ? 'scaleX(1)' : 'scaleX(0)',
                    }}
                />
            </div>
        </section>
    );
};

export default JournalHint;