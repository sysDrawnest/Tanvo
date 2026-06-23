import React from 'react';
import { motion } from 'framer-motion';
import { Product } from '../../hooks/useProductDetail';

interface Props {
  product: Product;
}

export const DesktopWeaverStory: React.FC<Props> = ({ product }) => {
  if (!product.weaverInfo) return null;

  return (
    <motion.section
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true, margin: '-80px' }}
      transition={{ duration: 0.8 }}
      className="w-full bg-[#0D0B0A] text-[#F9F5EE] relative overflow-hidden py-16 xl:py-24 border-y border-[#C9A84C]/10"
    >
      <div className="max-w-4xl mx-auto px-8 relative z-10 text-center space-y-8">
        <p className="text-[10px] font-bold tracking-[0.3em] text-[#C9A84C] uppercase">The Story Behind The Thread</p>
        
        <p className="text-xl xl:text-3xl font-serif text-[#F9F5EE]/90 leading-relaxed italic">
          "{product.weaverInfo.story ||
            `This ${product.weave} saree was born from generations of preserved knowledge — where thread by thread, motif by motif, an entire cultural identity is woven into cloth. ${product.weaverInfo.name} and their family have dedicated their lives to this living art form, transforming raw yarn into heirloom textiles.`}"
        </p>

        <div className="flex items-center justify-center gap-4 pt-6">
          <div className="w-12 h-12 rounded-full bg-[#C9A84C]/15 border border-[#C9A84C]/30 flex items-center justify-center">
            <span className="text-lg font-display font-medium text-[#C9A84C]">
              {product.weaverInfo.name.charAt(0)}
            </span>
          </div>
          <div className="text-left">
            <h3 className="text-base font-display font-medium text-[#F9F5EE]">
              {product.weaverInfo.name}
            </h3>
            <p className="text-[#C9A84C] text-[10px] font-semibold tracking-wider uppercase mt-1">
              {product.weaverInfo.generation} Generation Weaver • {product.weaverInfo.location}
            </p>
          </div>
        </div>
      </div>
    </motion.section>
  );
};
