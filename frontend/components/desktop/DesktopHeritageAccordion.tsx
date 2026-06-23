import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronDown, MapPin, Sparkles, Leaf, RotateCcw, Shield } from 'lucide-react';
import { Product } from '../../hooks/useProductDetail';

interface Props { product: Product }

const items = [
  {
    id: 'origin',
    title: 'Origin & Heritage',
    icon: MapPin,
    render: (p: Product) => (
      <div className="grid grid-cols-2 gap-8">
        <div className="space-y-3 text-sm text-[#0D0B0A]/75 leading-relaxed">
          <p><strong className="text-[#0D0B0A]">Weaving Hub:</strong> {p.weaverInfo?.location || 'Odisha Heritage Cluster'}</p>
          <p>This masterwork originates from the rich handloom belts of Odisha, a region celebrated globally for its ancient tie-and-dye heritage. The {p.weave} weave features historic motifs that carry the cultural identity and folklore of the region.</p>
        </div>
        <div className="p-4 bg-[#C9A84C]/5 border border-[#C9A84C]/15 rounded-[2px] text-xs space-y-2">
          <p className="font-bold tracking-widest uppercase text-[#C9A84C] text-[10px]">GI Heritage Details</p>
          <p className="text-[#0D0B0A]/70">Odisha Handloom Geographical Indication</p>
          <p className="text-[#0D0B0A]/70">Preserving centuries-old loom techniques</p>
          <p className="text-[#0D0B0A]/70">Direct provenance from weaving clusters</p>
        </div>
      </div>
    ),
  },
  {
    id: 'technique',
    title: 'The Craft Technique',
    icon: Sparkles,
    render: (p: Product) => (
      <div className="space-y-6">
        <div className="grid grid-cols-2 gap-8 text-sm text-[#0D0B0A]/75 leading-relaxed">
          <div className="space-y-3">
            <p><strong className="text-[#0D0B0A]">Method:</strong> {p.weave} on Traditional Pit Looms</p>
            <p>The intricate Ikat tie-and-dye process demands exceptional mathematical precision. Artisans resist-dye the yarns prior to weaving, aligning them perfectly on the loom to reveal complex patterns.</p>
          </div>
          <div className="space-y-3">
             <p><strong className="text-[#0D0B0A]">Time & Effort:</strong> Human-Made Precision</p>
             <p>A single saree requires the dedicated effort of an entire artisan family over several weeks, encompassing yarn preparation, tying, multiple dyeing cycles, and meticulous hand-weaving.</p>
          </div>
        </div>
        
        <div className="grid grid-cols-4 gap-4 mt-6">
          {[
            { step: '01', title: 'Yarn Prep', desc: 'Washing and stretching raw silk or cotton' },
            { step: '02', title: 'Tie & Dye', desc: 'Precision resistance-tying and natural dyeing' },
            { step: '03', title: 'Loom Setup', desc: 'Arranging the dyed threads to form the pattern' },
            { step: '04', title: 'Weaving', desc: 'Hand-knotted on traditional pit looms' },
          ].map(({ step, title, desc }) => (
            <div key={step} className="border-t border-[#0D0B0A]/10 pt-4">
              <p className="text-2xl font-display text-[#C9A84C]/40 mb-2">{step}</p>
              <p className="text-[10px] font-bold text-[#0D0B0A] tracking-wider uppercase mb-1">{title}</p>
              <p className="text-xs text-[#0D0B0A]/60 leading-relaxed">{desc}</p>
            </div>
          ))}
        </div>
      </div>
    ),
  },
  {
    id: 'care',
    title: 'Preservation Guide',
    icon: Leaf,
    render: (p: Product) => (
      <div className="grid grid-cols-2 gap-8 text-sm">
        <div className="space-y-2 text-[#0D0B0A]/75">
          <p className="mb-3 font-medium text-[#0D0B0A]">To preserve the luxury texture and structural integrity of the weave:</p>
          {['Dry clean exclusively for the first three washes', 'Store wrapped gently inside soft, unbleached muslin cloth', 'Refold periodically to prevent permanent crease wear'].map(t => (
            <div key={t} className="flex items-start gap-2">
              <div className="w-1 h-1 rounded-full bg-[#C9A84C] mt-2 shrink-0" />
              <span>{t}</span>
            </div>
          ))}
        </div>
        <div className="space-y-2 text-[#0D0B0A]/75">
          <p className="mb-3 font-medium text-[#0D0B0A]">Long-term maintenance:</p>
          {['Avoid hanging on metal hangers to prevent sagging', 'Keep away from direct sunlight when storing or drying', 'Use neem sachets to naturally deter moths'].map(t => (
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
    id: 'protection',
    title: 'Authenticity & Protection',
    icon: Shield,
    render: () => (
      <div className="grid grid-cols-2 gap-8 text-sm text-[#0D0B0A]/75 leading-relaxed">
        <div className="space-y-3">
          <p><strong className="text-[#0D0B0A]">Artisan Verification:</strong> Each TANVO piece ships with a handloom authenticity certificate and a unique weaver seal verifying its origin.</p>
          <p>We guarantee 100% genuine handloom sourcing directly from the artisan clusters, entirely eliminating power-loom imitations.</p>
        </div>
        <div className="space-y-3">
          <p><strong className="text-[#0D0B0A]">Return Protection:</strong> Enjoy a worry-free experience with our 7-Day Return Policy on all untouched sarees.</p>
          <p>Products must be returned in their original condition with the authenticity tags and weaver seals intact to qualify for a full refund.</p>
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
          <p className="text-[10px] font-bold tracking-[0.3em] text-[#C9A84C] uppercase mb-3">Heritage Craft</p>
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
