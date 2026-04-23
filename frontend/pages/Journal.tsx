import React, { useRef, useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Play, X, ArrowRight, Pause } from 'lucide-react';
import { STORIES } from '../constants';

// --- Sub-Components ---

const BrandStory: React.FC = () => {
    return (
        <section className="py-24 bg-tanvoBg overflow-hidden" data-purpose="brand-story">
            <div className="grid grid-cols-12 gap-12 max-w-7xl mx-auto px-6">
                <div className="col-span-12 md:col-span-6 flex flex-col justify-center order-2 md:order-1">
                    <h3 className="font-serif text-4xl md:text-6xl mb-8 leading-tight">Every thread carries a story...</h3>
                    <p className="text-lg leading-relaxed text-gray-700 mb-8 italic">
                        "In the villages of Western Odisha, the loom is not a machine; it is a heartbeat. For generations, TANVO has collaborated with these master artisans to bring you silhouettes that marry heritage with a contemporary edge."
                    </p>
                    <div className="flex items-center gap-4">
                        <div className="h-[1px] w-20 bg-tanvoDark"></div>
                        <span className="uppercase tracking-widest text-xs font-bold">Our Heritage</span>
                    </div>
                </div>
                <div className="col-span-12 md:col-span-6 order-1 md:order-2">
                    <img
                        alt="Artisan at Loom"
                        className="w-full h-[600px] object-cover grayscale hover:grayscale-0 transition-all duration-1000 shadow-2xl"
                        src="https://lh3.googleusercontent.com/aida-public/AB6AXuBMXt9Io2S7X4SGZH2DbYMp9o9WhY9owGrCx3i_Iwunmx3Cel5Dm1uEXWD-NigHqb2DNXmdxU87ulXEFtPmwxNKAMPV5uRzaiXi9Q_ZX5k6ldL0zCJ-XtF6AO3SQyCfJoHfZxhr7yUW9pOP7e262tfAHvCMRu84KGy8lO9Kr__Vk6wXoR6TvGXIpY6iH-ZMr-kVE7tTdIuURofBOJ6amFYrSsTtgNTs_IEnsGkNm6ixACk_rMfKB15K7ni4JV7vQxrsAclaAe-jVQ"
                    />
                </div>
            </div>
        </section>
    );
};

const FabricShowcase: React.FC = () => {
    const [isOpen, setIsOpen] = useState(false);

    return (
        <section className="relative w-full">
            <div className="max-w-7xl mx-auto px-6 py-20 text-center">
                <motion.span
                    initial={{ opacity: 0, y: 10 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="font-sans text-[0.6875rem] tracking-[0.3em] uppercase text-[#C9A84C] mb-4 block font-bold"
                >
                    Artisanal Heritage
                </motion.span>
                <motion.h1
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.1 }}
                    viewport={{ once: true }}
                    className="font-serif text-4xl md:text-5xl text-[#1a120b] tracking-tight mb-8"
                >
                    The Art of the Weave
                </motion.h1>
                <motion.p
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    transition={{ delay: 0.2 }}
                    viewport={{ once: true }}
                    className="max-w-2xl mx-auto font-sans text-stone-500 leading-relaxed italic"
                >
                    Experience the rhythmic pulse of the handloom. Each thread tells a story of patience, a legacy of precision, and the timeless elegance of Tanvo.
                </motion.p>
            </div>

            <div className="relative w-full px-4 md:px-12 lg:px-20 mb-32">
                <motion.div
                    initial={{ opacity: 0, scale: 0.98 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.8 }}
                    viewport={{ once: true }}
                    className="relative group cursor-pointer overflow-hidden rounded-sm shadow-2xl aspect-[21/9] w-full bg-stone-100"
                    onClick={() => setIsOpen(true)}
                >
                    <img
                        alt="Macro detail of gold zari embroidery"
                        className="w-full h-full object-cover brightness-75 group-hover:scale-105 transition-transform duration-1000"
                        src="https://lh3.googleusercontent.com/aida-public/AB6AXuBuHun6wMNCczDv63AuwYtYlMO4tQ6iIGiRoMnAg9NNNZ9GDMFH5xm4mxB8LFbyeX-lHABXCJTNqPTnwo-yHXkDpYInU_h0kpuMB523hNR0KwN1oaEXppE5oNH2FIKZ7hMJRMVtvlDOnzl7PJNmO9yxnBOMeC-IDnV0u5WAPEsqwSfPdCpj1rm988L3ozmi8tQOTWv2QUsLc836btTo_D_jDXK8UDUQovldRHZbsoIrhkZR3jJfSu0LDElveBkLSMTyftathm6FaQ"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent"></div>
                    <div className="absolute inset-0 flex items-center justify-center">
                        <div className="relative">
                            <motion.div animate={{ scale: [1, 1.2, 1] }} transition={{ repeat: Infinity, duration: 2 }} className="absolute inset-0 rounded-full bg-[#C9A84C]/30"></motion.div>
                            <div className="relative z-10 w-20 h-20 flex items-center justify-center rounded-full bg-white/90 border border-[#C9A84C]/20 shadow-xl group-hover:bg-[#C9A84C] transition-colors duration-500">
                                <Play className="w-8 h-8 text-[#C9A84C] group-hover:text-white fill-current transition-colors ml-1" />
                            </div>
                        </div>
                    </div>
                    <div className="absolute bottom-12 left-12">
                        <h2 className="font-serif text-3xl md:text-4xl text-white mb-2 italic">Fabric in Motion</h2>
                        <div className="flex items-center gap-4 text-white/80 uppercase text-[10px] font-bold tracking-widest">
                            <span className="h-[1px] w-12 bg-[#C9A84C]"></span>
                            A film by Tanvo Atelier
                        </div>
                    </div>
                </motion.div>
            </div>

            <AnimatePresence>
                {isOpen && (
                    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="fixed inset-0 z-[100] flex items-center justify-center p-4 md:p-12 bg-black/90 backdrop-blur-sm" onClick={() => setIsOpen(false)}>
                        <motion.div initial={{ scale: 0.9, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} exit={{ scale: 0.9, opacity: 0 }} className="relative w-full max-w-6xl aspect-video bg-black rounded-lg overflow-hidden shadow-2xl" onClick={(e) => e.stopPropagation()}>
                            <video className="w-full h-full object-contain" controls autoPlay src="/EditorialBanner.mp4" />
                            <button className="absolute top-6 right-6 text-white/70 hover:text-white transition-colors" onClick={() => setIsOpen(false)}>
                                <X className="w-8 h-8" />
                            </button>
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>
        </section>
    );
};

const WeaveAnatomy: React.FC = () => {
    const sectionRef = useRef<HTMLElement>(null);
    const [visible, setVisible] = useState(false);

    useEffect(() => {
        const observer = new IntersectionObserver(([entry]) => { if (entry.isIntersecting) setVisible(true); }, { threshold: 0.1 });
        if (sectionRef.current) observer.observe(sectionRef.current);
        return () => observer.disconnect();
    }, []);

    const anatomyPoints = [
        { title: 'The Border (Dhadhi)', desc: 'Distinctive temple borders or "Rudraksha" patterns that define the architectural strength of a Sambalpuri saree.' },
        { title: 'The Body (Anga)', desc: 'Woven with Mercerized cotton or Mulberry silk, featuring timeless motifs of conch shells, wheels, and flowering creepers.' },
        { title: 'Sustainable Dyeing', desc: 'Naturally derived pigments and skin-friendly dyes preserve both the earth and the artisan. Zero synthetic mordants.' }
    ];

    return (
        <section ref={sectionRef} style={{ background: '#fbf9f4', padding: 'clamp(80px,10vw,140px) clamp(20px,6vw,96px)', position: 'relative', overflow: 'hidden' }}>
            <div style={{ maxWidth: 1400, margin: '0 auto' }}>
                <div style={{ marginBottom: 'clamp(52px,7vw,96px)', display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', flexWrap: 'wrap', gap: 24 }}>
                    <div>
                        <p className="section-label" style={{ marginBottom: 20 }}>Technical Artistry</p>
                        <h2 style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: 'clamp(36px,4.5vw,64px)', fontWeight: 300, color: '#1a120b', margin: 0, lineHeight: 1.1 }}>
                            Anatomy of a<br /><em style={{ fontStyle: 'italic', color: '#93272a' }}>Master-Weave</em>
                        </h2>
                    </div>
                </div>

                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: 'clamp(40px,6vw,96px)', alignItems: 'center' }}>
                    <motion.div initial={{ opacity: 0, x: -20 }} animate={visible ? { opacity: 1, x: 0 } : {}} transition={{ duration: 0.8 }}>
                        <img alt="Ikat Detail" src="/Ikat Detail.png" style={{ width: '100%', boxShadow: '0 24px 64px rgba(0,0,0,0.1)' }} />
                    </motion.div>

                    <div style={{ display: 'flex', flexDirection: 'column', gap: 'clamp(28px,3vw,44px)' }}>
                        {anatomyPoints.map((pt, i) => (
                            <motion.div key={i} initial={{ opacity: 0, x: 20 }} animate={visible ? { opacity: 1, x: 0 } : {}} transition={{ duration: 0.6, delay: 0.2 + i * 0.1 }} style={{ borderLeft: '2px solid #93272a', paddingLeft: 24 }}>
                                <h4 style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: 'clamp(18px,2vw,24px)', color: '#1a120b', marginBottom: 10 }}>{pt.title}</h4>
                                <p style={{ fontFamily: "'Raleway', sans-serif", fontSize: 12, color: 'rgba(26,18,11,0.6)', lineHeight: 1.8 }}>{pt.desc}</p>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
};

const ZariDetail: React.FC = () => {
    return (
        <section className="max-w-7xl mx-auto px-6 py-32 grid grid-cols-1 md:grid-cols-12 gap-16 items-center">
            <motion.div initial={{ opacity: 0, x: -30 }} whileInView={{ opacity: 1, x: 0 }} transition={{ duration: 0.8 }} viewport={{ once: true }} className="md:col-span-5 order-2 md:order-1">
                <div className="bg-[#f0eee9] p-12 rounded-lg relative">
                    <span className="font-sans text-[10px] tracking-[0.2em] uppercase text-[#C9A84C] font-bold mb-6 block">Detail & Contrast</span>
                    <h3 className="font-serif text-3xl md:text-4xl mb-6 text-[#1a120b] leading-tight">Zari Work & Pure Silk</h3>
                    <p className="font-sans text-[13px] text-stone-500 mb-8 leading-relaxed">
                        The interplay of light on raw silk threads creates a visual symphony. Our weavers manipulate the shuttle with rhythmic precision, ensuring every inch of the fabric is a masterpiece of tactile luxury.
                    </p>
                    <motion.button whileHover={{ x: 5 }} className="group flex items-center gap-3 font-sans text-[10px] tracking-widest uppercase text-[#1a120b] font-bold border-b border-[#C9A84C] pb-1">
                        Explore Craftsmanship
                        <ArrowRight className="w-4 h-4 text-[#C9A84C] group-hover:translate-x-1 transition-transform" />
                    </motion.button>
                </div>
            </motion.div>
            <motion.div initial={{ opacity: 0, x: 30 }} whileInView={{ opacity: 1, x: 0 }} transition={{ duration: 0.8 }} viewport={{ once: true }} className="md:col-span-7 order-1 md:order-2 flex justify-end">
                <img alt="Artisan hands" className="w-full md:w-4/5 aspect-[4/5] object-cover shadow-2xl" src="https://lh3.googleusercontent.com/aida-public/AB6AXuCiBZeKIjQ3VdxfauRPimArcGBoNWUKnemccHI-pDghg2wrdAy0K-LkE8BBC2CofP-OUNi6-tN3lb9we2RXHvq0tFSMiHIVmYlRtcVhXz9IuwKy8oI4r5PgKGBx9-EsulMA9pufAQJy4E_0zTw4gF7V8eh7QU4GwMgez-_y9hCQSKldbAtJ6WbPosmJo_pJSd9CWSqFYagEaGvAqr0sNkwqRGgnsySD53MjoijWSK0dWmcbftGaB74udlaLAowOEL33qan2ZZWrYA" />
            </motion.div>
        </section>
    );
};

const StoriesSection: React.FC = () => {
    const storyRefs = useRef<(HTMLDivElement | null)[]>([]);

    useEffect(() => {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach((entry) => {
                const target = entry.target as HTMLElement;
                if (entry.isIntersecting) {
                    target.style.opacity = '1';
                    target.style.transform = 'translateY(0)';
                }
            });
        }, { threshold: 0.15 });
        storyRefs.current.forEach((ref) => { if (ref) observer.observe(ref); });
        return () => observer.disconnect();
    }, []);

    return (
        <section className="py-24 px-4 md:px-[5%]" style={{ background: '#fdfcf9' }}>
            <div style={{ textAlign: 'center', marginBottom: 64 }}>
                <p className="section-label" style={{ marginBottom: 16, color: '#C9A84C', letterSpacing: '0.3em', textTransform: 'uppercase', fontSize: '11px', fontWeight: 600 }}>Authentic Connections</p>
                <h2 className="font-serif" style={{ fontSize: 'clamp(36px, 5vw, 64px)', fontWeight: 400, color: '#1a120b', lineHeight: 1.1, marginBottom: 24 }}>
                    Real Stories. Real People.<br />
                    <span style={{ color: '#C9A84C', fontStyle: 'italic' }}>Real Handloom.</span>
                </h2>
                <div style={{ width: 60, height: 2, background: '#C9A84C', margin: '0 auto', opacity: 0.3 }}></div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 md:gap-12 max-w-7xl mx-auto">
                {STORIES.map((story, idx) => (
                    <div key={story.id} ref={(el) => { storyRefs.current[idx] = el; }} style={{ opacity: 0, transform: 'translateY(40px)', transition: 'all 0.8s ease' }}>
                        <div style={{ aspectRatio: '16/10', overflow: 'hidden', marginBottom: 16, position: 'relative' }}>
                            <img src={story.img} alt={story.title} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                        </div>
                        <h3 className="font-serif text-2xl mb-3">{story.title}</h3>
                        <p className="text-stone-500 text-sm italic mb-4">"{story.excerpt}"</p>
                        <p className="text-[#C9A84C] text-[10px] font-bold tracking-widest uppercase">— {story.name}</p>
                    </div>
                ))}
            </div>
        </section>
    );
};

// --- Main Page Component ---

const Journal: React.FC = () => {
    return (
        <div className="bg-[#fbf9f4] min-h-screen pt-20">
            <header className="py-24 px-6 text-center bg-white border-b border-gray-100">
                <span className="text-tanvoPrimary uppercase tracking-[0.4em] text-xs font-bold mb-4 block">The Weaver's Diary</span>
                <h1 className="font-serif text-5xl md:text-7xl text-tanvoDark leading-tight">Craft Chronicles</h1>
                <p className="mt-8 text-gray-500 max-w-2xl mx-auto italic font-sans text-sm md:text-base">
                    Exploring the intersections of ancient heritage, mathematical precision, and modern design narratives.
                </p>
            </header>

            <main>
                <BrandStory />
                <FabricShowcase />
                <WeaveAnatomy />
                <ZariDetail />
                <StoriesSection />

                <section className="py-24 px-6 bg-white">
                    <div className="max-w-3xl mx-auto text-center font-sans">
                        <h2 className="font-serif text-3xl mb-8">More stories unfolding soon...</h2>
                        <div className="flex justify-center gap-4">
                            <div className="w-2 h-2 rounded-full bg-tanvoPrimary"></div>
                            <div className="w-2 h-2 rounded-full bg-tanvoPrimary opacity-50"></div>
                            <div className="w-2 h-2 rounded-full bg-tanvoPrimary opacity-20"></div>
                        </div>
                    </div>
                </section>
            </main>
        </div>
    );
};

export default Journal;
