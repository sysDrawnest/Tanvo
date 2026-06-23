import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { MapPin, Sparkles, Leaf, RotateCcw, ChevronDown } from 'lucide-react';
import { Product } from '../types';

interface ProductHeritageAccordionProps {
  product: Product;
}

interface AccordionItem {
  id: string;
  title: string;
  icon: React.ComponentType<any>;
  content: React.ReactNode;
}

export const ProductHeritageAccordion: React.FC<ProductHeritageAccordionProps> = ({ product }) => {
  const [openSection, setOpenSection] = useState<string | null>('origin');

  const toggleSection = (sectionId: string) => {
    setOpenSection(openSection === sectionId ? null : sectionId);
  };

  const sections: AccordionItem[] = [
    {
      id: 'origin',
      title: 'Origin & Heritage',
      icon: MapPin,
      content: (
        <div className="space-y-3 text-sm text-[#0D0B0A]/80 leading-relaxed font-sans">
          <p>
            <strong>Weaving Hub:</strong> {product.weaverInfo?.location || 'Odisha Heritage Cluster'}
          </p>
          <p>
            This masterwork originates from the rich handloom belts of Odisha, a region celebrated globally for its ancient tie-and-dye heritage. The {product.weave || 'Traditional'} weave features historic motifs that carry the cultural identity and folklore of the region.
          </p>
          <div className="mt-2 p-3 bg-[#C9A84C]/5 rounded-[2px] border border-[#C9A84C]/20 flex items-center gap-2">
            <span className="text-xs font-semibold text-[#C9A84C] tracking-wide uppercase">GI Heritage Details Guaranteed</span>
          </div>
        </div>
      ),
    },
    {
      id: 'technique',
      title: 'The Craft Technique',
      icon: Sparkles,
      content: (
        <div className="space-y-3 text-sm text-[#0D0B0A]/80 leading-relaxed font-sans">
          <p>
            <strong>Method:</strong> {product.weave} on Traditional Pit Looms
          </p>
          <p>
            The intricate Ikat tie-and-dye process demands exceptional mathematical precision. Artisans resist-dye the yarns prior to weaving, aligning them perfectly on the loom to reveal complex patterns.
          </p>
          <p className="text-xs italic text-[#C9A84C]">
            A single saree requires the dedicated effort of an entire artisan family over several weeks.
          </p>
        </div>
      ),
    },
    {
      id: 'care',
      title: 'Preservation Guide',
      icon: Leaf,
      content: (
        <div className="space-y-2 text-sm text-[#0D0B0A]/80 leading-relaxed font-sans">
          <p className="font-medium text-[#0D0B0A]">To preserve the luxury texture and structural integrity of the weave:</p>
          <ul className="list-disc pl-5 space-y-1">
            <li>Dry clean exclusively for the first three washes.</li>
            <li>Store wrapped gently inside soft, unbleached muslin cloth.</li>
            <li>Avoid hanging on metal hangers to prevent sagging.</li>
            <li>Use neem sachets to naturally deter moths.</li>
          </ul>
        </div>
      ),
    },
    {
      id: 'protection',
      title: 'Authenticity & Protection',
      icon: RotateCcw,
      content: (
        <div className="space-y-2 text-sm text-[#0D0B0A]/80 leading-relaxed font-sans">
          <p>
            Each TANVO piece ships with a handloom authenticity certificate and a unique weaver seal verifying its origin.
          </p>
          <p>
            Enjoy a worry-free experience with our <strong>7-Day Return Policy</strong> on all untouched sarees with original tags intact.
          </p>
        </div>
      ),
    },
  ];

  return (
    <div className="space-y-3 mt-6">
      {sections.map((section) => {
        const IconComponent = section.icon;
        const isOpen = openSection === section.id;

        return (
          <div
            key={section.id}
            className="border border-[#0D0B0A]/10 rounded-[4px] overflow-hidden bg-white hover:border-[#C9A84C]/30 transition-all duration-300 shadow-sm"
          >
            <button
              onClick={() => toggleSection(section.id)}
              className="w-full flex items-center justify-between p-4 text-left transition-colors hover:bg-[#F9F5EE]"
            >
              <div className="flex items-center gap-3">
                <div className="p-2 bg-[#C9A84C]/10 rounded-[2px] text-[#C9A84C]">
                  <IconComponent size={18} />
                </div>
                <span className="font-display font-medium text-[#0D0B0A] text-sm sm:text-base">
                  {section.title}
                </span>
              </div>
              <motion.div
                animate={{ rotate: isOpen ? 180 : 0 }}
                transition={{ duration: 0.2 }}
                className="text-[#0D0B0A]/60"
              >
                <ChevronDown size={18} />
              </motion.div>
            </button>

            <AnimatePresence initial={false}>
              {isOpen && (
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: 'auto', opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.25, ease: 'easeInOut' }}
                >
                  <div className="px-6 pb-6 pt-2 border-t border-[#0D0B0A]/5 bg-[#F9F5EE]/40">
                    {section.content}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        );
      })}
    </div>
  );
};
