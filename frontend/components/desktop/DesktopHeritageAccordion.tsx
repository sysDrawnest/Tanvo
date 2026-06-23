import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronDown, MapPin, Sparkles, Leaf, RotateCcw, Shield } from 'lucide-react';
import { Product } from '../../hooks/useProductDetail';

interface Props { product: Product }

const items = [
  {
    id: 'origin',
    title: 'Origin & Region',
    icon: MapPin,
    render: (p: Product) => (
      <div className="grid grid-cols-2 gap-8">
        <div className="space-y-3 text-sm text-[#0D0B0A]/75 leading-relaxed">
          <p><strong className="text-[#0D0B0A]">Weaving Cluster:</strong> {p.weaverInfo?.location || 'Odisha Heritage Cluster'}</p>
          <p>This masterwork originates from the handloom belts of Odisha — historic weaving zones producing {p.weave} textiles using techniques dating back centuries.</p>
        </div>
        <div className="p-4 bg-[#C9A84C]/5 border border-[#C9A84C]/15 rounded-[2px] text-xs space-y-2">
          <p className="font-bold tracking-widest uppercase text-[#C9A84C] text-[10px]">Authenticity Seal</p>
          <p className="text-[#0D0B0A]/70">GI-tagged Odisha Handloom</p>
          <p className="text-[#0D0B0A]/70">Direct artisan provenance</p>
          <p className="text-[#0D0B0A]/70">Handloom Mark certified</p>
        </div>
      </div>
    ),
  },
  {
    id: 'craftsmanship',
    title: 'Artisan Craftsmanship',
    icon: Sparkles,
    render: (p: Product) => (
      <div className="grid grid-cols-2 gap-8 text-sm text-[#0D0B0A]/75 leading-relaxed">
        <div className="space-y-3">
          <p><strong className="text-[#0D0B0A]">Technique:</strong> {p.weave}</p>
          <p>Every warp and weft is hand-knotted and woven on traditional pit looms. From yarn spinning to intricate tie-and-dye, each saree takes weeks of dedicated artisan effort.</p>
        </div>
        <div className="space-y-3">
          {p.weaverInfo?.generation && (
            <p className="text-xs italic text-[#C9A84C]">Crafted by a {p.weaverInfo.generation} weaving family.</p>
          )}
          <p>The {p.weave} pattern requires tying individual threads before dyeing — a process demanding precision that machines cannot replicate.</p>
        </div>
      </div>
    ),
  },
  {
    id: 'process',
    title: 'Weaving Process',
    icon: Sparkles,
    render: (p: Product) => (
      <div className="grid grid-cols-4 gap-4">
        {[
          { step: '01', title: 'Thread Preparation', desc: 'Raw silk or cotton yarns are washed and stretched' },
          { step: '02', title: 'Tie & Dye', desc: 'Threads are resistance-tied and dipped in natural dyes' },
          { step: '03', title: 'Loom Setting', desc: 'Dyed threads are arranged on traditional pit looms' },
          { step: '04', title: 'Hand Weaving', desc: `Each ${p.name.split(' ')[0]} saree takes ${p.fabric?.toLowerCase().includes('silk') ? '18-21' : '8-12'} days to complete` },
        ].map(({ step, title, desc }) => (
          <div key={step} className="border-t border-[#0D0B0A]/10 pt-4">
            <p className="text-2xl font-display text-[#C9A84C]/40 mb-2">{step}</p>
            <p className="text-xs font-bold text-[#0D0B0A] tracking-wider uppercase mb-1">{title}</p>
            <p className="text-xs text-[#0D0B0A]/60 leading-relaxed">{desc}</p>
          </div>
        ))}
      </div>
    ),
  },
  {
    id: 'care',
    title: 'Care Guide',
    icon: Leaf,
    render: (p: Product) => (
      <div className="grid grid-cols-2 gap-8 text-sm">
        <div className="space-y-2 text-[#0D0B0A]/75">
          <p className="mb-3">{p.careInstructions || 'Dry clean only for first wash. Store in muslin cloth away from direct sunlight.'}</p>
          {['Dry clean recommended for first wash', 'Store in soft muslin or cotton wrap', 'Avoid metal hangers — refold periodically', 'Iron at low heat under a cotton layer'].map(t => (
            <div key={t} className="flex items-start gap-2">
              <div className="w-1 h-1 rounded-full bg-[#C9A84C] mt-2 shrink-0" />
              <span>{t}</span>
            </div>
          ))}
        </div>
        <div className="space-y-2 text-[#0D0B0A]/75">
          {['Keep away from direct sunlight when storing', 'Use neem sachets to prevent moth damage', 'Air out periodically in shade', 'Zari threads: wipe gently with soft dry cloth'].map(t => (
            <div key={t} className="flex items-start gap-2">
              <div className="w-1 h-1 rounded-full bg-[#C9A84C] mt-2 shrink-0" />
              <span>{t}</span>
            </div>
          ))}
        </div>
      </div>
    ),
  },
  {
    id: 'returns',
    title: 'Authenticity Protection & Returns',
    icon: Shield,
    render: () => (
      <div className="grid grid-cols-2 gap-8 text-sm text-[#0D0B0A]/75 leading-relaxed">
        <div className="space-y-3">
          <p><strong className="text-[#0D0B0A]">7-Day Return Policy:</strong> All untouched sarees with original tags and weaver seals may be returned within 7 days of delivery.</p>
          <p>Returns are processed within 3-5 business days. Refunds are issued to the original payment method.</p>
        </div>
        <div className="space-y-3">
          <p><strong className="text-[#0D0B0A]">Authenticity:</strong> Each TANVO piece ships with a handloom authenticity certificate and QR-verified artisan seal.</p>
          <p>In case of suspected counterfeit, contact our heritage team within 30 days of purchase for a full investigation and resolution.</p>
        </div>
      </div>
    ),
  },
];

export const DesktopHeritageAccordion: React.FC<Props> = ({ product }) => {
  const [open, setOpen] = useState<string | null>(null);
  const toggle = (id: string) => setOpen(open === id ? null : id);

  return (
    <section className="w-full bg-[#F9F5EE]">
      <div className="max-w-7xl mx-auto px-8 xl:px-16 py-20">
        <div className="mb-12">
          <p className="text-[10px] font-bold tracking-[0.3em] text-[#C9A84C] uppercase mb-3">The Art of Making</p>
          <h2 className="text-4xl font-display font-medium text-[#0D0B0A]">From Loom To Legacy</h2>
          <div className="mt-4 w-12 h-px bg-[#C9A84C]" />
        </div>

        <div className="divide-y divide-[#0D0B0A]/8">
          {items.map(({ id, title, icon: Icon, render }) => (
            <div key={id}>
              <button
                onClick={() => toggle(id)}
                className="w-full flex items-center justify-between py-5 text-left group"
              >
                <div className="flex items-center gap-4">
                  <Icon size={16} className="text-[#C9A84C]" />
                  <span className="font-display font-medium text-lg text-[#0D0B0A] group-hover:text-[#780000] transition-colors">
                    {title}
                  </span>
                </div>
                <motion.div animate={{ rotate: open === id ? 45 : 0 }} transition={{ duration: 0.2 }}>
                  <ChevronDown size={18} className="text-[#0D0B0A]/40 group-hover:text-[#780000] transition-colors" />
                </motion.div>
              </button>
              <AnimatePresence initial={false}>
                {open === id && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.3, ease: 'easeInOut' }}
                    className="overflow-hidden"
                  >
                    <div className="pb-8 pt-2">
                      {render(product)}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
