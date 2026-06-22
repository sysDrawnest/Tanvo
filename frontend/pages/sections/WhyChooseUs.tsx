import React from 'react';
import { motion } from 'framer-motion';
import { ShieldCheck, Tag, Award, Heart } from 'lucide-react';

const reasons = [
    {
        icon: ShieldCheck,
        title: 'Direct from Weavers',
        desc: 'Bypassing middlemen to bring you authentic handloom straight from the master artisans of Odisha.',
        color: '#C9A84C'
    },
    {
        icon: Tag,
        title: '30% Cheaper than Retail',
        desc: 'Direct sourcing allows us to offer premium heritage wear at honest, fair-trade prices.',
        color: '#8B0000'
    },
    {
        icon: Award,
        title: 'GI Certified Fabrics',
        desc: 'Each piece comes with the assurance of Geographical Indication tags, preserving heritage authenticity.',
        color: '#006400'
    },
    {
        icon: Heart,
        title: 'Authentic Handloom',
        desc: '100% genuine Sambalpuri, Bomkai, and Ikat weaves, crafted with generations of soul.',
        color: '#4B0082'
    }
];

const WhyChooseUs: React.FC = () => {
    return (
        <section style={{ padding: '100px max(48px, 6vw)', background: '#FDFCF9' }}>
            <div style={{ maxWidth: 1200, margin: '0 auto' }}>
                <div style={{ textAlign: 'center', marginBottom: 64 }}>
                    <p className="section-label" style={{ color: 'var(--gold)', letterSpacing: '0.3em', textTransform: 'uppercase', fontSize: 10, fontWeight: 700, marginBottom: 16 }}>The TANVO Promise</p>
                    <h2 style={{ fontFamily: 'Cormorant Garamond, serif', fontSize: 'clamp(40px, 5vw, 64px)', fontWeight: 300, color: 'var(--ink)' }}>
                        Why Choose <span style={{ color: 'var(--gold)', fontStyle: 'italic' }}>TANVO</span>
                    </h2>
                </div>

                <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 md:gap-10">
                    {reasons.map((item, idx) => (
                        <motion.div
                            key={idx}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ delay: idx * 0.1 }}
                            viewport={{ once: true }}
                            className="p-4 md:p-10 bg-white border border-[rgba(201,168,76,0.1)] text-center transition-all duration-300"
                            style={{
                                border: '1px solid rgba(201,168,76,0.1)',
                                textAlign: 'center',
                                transition: 'all 0.3s ease'
                            }}
                            onMouseEnter={(e) => {
                                e.currentTarget.style.borderColor = 'var(--gold)';
                                e.currentTarget.style.transform = 'translateY(-10px)';
                                e.currentTarget.style.boxShadow = '0 20px 40px rgba(201,168,76,0.08)';
                            }}
                            onMouseLeave={(e) => {
                                e.currentTarget.style.borderColor = 'rgba(201,168,76,0.1)';
                                e.currentTarget.style.transform = 'translateY(0)';
                                e.currentTarget.style.boxShadow = 'none';
                            }}
                        >
                            <div style={{
                                width: 48, height: 48, borderRadius: '50%',
                                background: `${item.color}10`, color: item.color,
                                display: 'flex', alignItems: 'center', justifyContent: 'center',
                                margin: '0 auto 16px'
                            }}>
                                <item.icon className="w-6 h-6 md:w-8 md:h-8" />
                            </div>
                            <h3 className="font-display text-lg md:text-2xl mb-2 md:mb-4" style={{ color: 'var(--ink)' }}>{item.title}</h3>
                            <p className="font-sans-custom text-[11px] md:text-sm leading-relaxed" style={{ color: 'rgba(13,11,10,0.6)' }}>{item.desc}</p>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default WhyChooseUs;
