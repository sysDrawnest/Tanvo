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
      title: 'Origin & Heritage Location',
      icon: MapPin,
      content: (
        <div className="space-y-3 text-sm text-[#173B45]/80">
          <p>
            <strong>Weaving Hub:</strong> {product.weaverInfo?.location || 'Odisha Heritage Cluster'}
          </p>
          <p>
            This masterwork originates from the rich handloom belts of Odisha, India. The {product.weave || 'Traditional'} weave features historic motifs crafted using techniques dating back centuries, reflecting the soul of regional craftsmanship.
          </p>
          <div className="mt-2 p-3 bg-[#B43F3F]/5 rounded-xl border border-[#B43F3F]/10 flex items-center gap-2">
            <span className="text-xs font-semibold text-[#B43F3F]">Authentic Odisha Handloom Guaranteed</span>
          </div>
        </div>
      ),
    },
    {
      id: 'craftsmanship',
      title: 'Artisan Craftsmanship',
      icon: Sparkles,
      content: (
        <div className="space-y-3 text-sm text-[#173B45]/80">
          <p>
            <strong>Weave Technique:</strong> {product.weave}
          </p>
          <p>
            Every warp and weft of this saree has been meticulously hand-knotted and woven on traditional pit looms by skilled artisans. From raw yarn spinning to intricate tie-and-dye patterns, the process takes weeks of dedicated human effort.
          </p>
          {product.weaverInfo?.generation && (
            <p className="text-xs italic text-[#B43F3F]">
              Woven by a {product.weaverInfo.generation} artisan family preservation group.
            </p>
          )}
        </div>
      ),
    },
    {
      id: 'care',
      title: 'Care & Maintenance Guide',
      icon: Leaf,
      content: (
        <div className="space-y-2 text-sm text-[#173B45]/80">
          <p className="font-medium text-[#173B45]">To preserve the luxury texture and gold/silver thread shine:</p>
          <ul className="list-disc pl-5 space-y-1">
            <li>{product.careInstructions || 'Dry clean recommended for the first wash to lock colors.'}</li>
            <li>Always store wrapped gently inside a soft muslin or cotton cloth.</li>
            <li>Avoid hanging on metal hangers; refold periodically to prevent crease wear.</li>
            <li>Iron on low-medium heat under a protective cotton layer.</li>
          </ul>
        </div>
      ),
    },
    {
      id: 'returns',
      title: 'Returns & Authenticity Protection',
      icon: RotateCcw,
      content: (
        <div className="space-y-2 text-sm text-[#173B45]/80">
          <p>
            We take pride in our heritage curation. We offer a **7-Day Return Policy** on all untouched handloom sarees with original product tags and weaver seals intact.
          </p>
          <p>
            To prevent transit damage, please return the product in its original luxury cardboard protective casing.
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
            className="border border-[#B43F3F]/10 rounded-2xl overflow-hidden bg-white hover:border-[#B43F3F]/20 transition-all duration-300 shadow-sm"
          >
            <button
              onClick={() => toggleSection(section.id)}
              className="w-full flex items-center justify-between p-4 text-left transition-colors hover:bg-[#F8EDED]/40"
            >
              <div className="flex items-center gap-3">
                <div className="p-2 bg-[#B43F3F]/10 rounded-lg text-[#B43F3F]">
                  <IconComponent size={18} />
                </div>
                <span className="font-display font-medium text-[#173B45] text-sm sm:text-base">
                  {section.title}
                </span>
              </div>
              <motion.div
                animate={{ rotate: isOpen ? 180 : 0 }}
                transition={{ duration: 0.2 }}
                className="text-[#173B45]/60"
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
                  <div className="px-6 pb-6 pt-2 border-t border-[#B43F3F]/5 bg-[#F8EDED]/10">
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
