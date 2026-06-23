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
      className="w-full bg-[#0D0B0A] text-[#F9F5EE] relative overflow-hidden"
    >
      {/* Textile grid overlay */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23C9A84C' fill-opacity='0.04'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
        }}
      />

      <div className="max-w-7xl mx-auto px-8 xl:px-16 py-20 xl:py-28 relative z-10">
        {/* Section label */}
        <div className="mb-14">
          <p className="text-[10px] font-bold tracking-[0.3em] text-[#C9A84C] uppercase mb-3">Heritage Artisan</p>
          <h2 className="text-4xl xl:text-5xl font-display font-medium text-[#F9F5EE] leading-tight">
            The Story Behind<br />The Thread
          </h2>
          <div className="mt-4 w-12 h-px bg-[#C9A84C]" />
        </div>

        <div className="grid grid-cols-[1fr_2fr] gap-20 items-start">
          {/* Left — Weaver identity */}
          <div className="space-y-6">
            {/* Avatar */}
            <div className="w-24 h-24 rounded-full bg-[#C9A84C]/15 border border-[#C9A84C]/30 flex items-center justify-center">
              <span className="text-4xl font-display font-medium text-[#C9A84C]">
                {product.weaverInfo.name.charAt(0)}
              </span>
            </div>

            <div>
              <h3 className="text-xl font-display font-medium text-[#F9F5EE] mb-1">
                {product.weaverInfo.name}
              </h3>
              <p className="text-[#C9A84C] text-xs font-semibold tracking-wider uppercase mb-3">
                {product.weaverInfo.generation} Generation Weaver
              </p>
              <p className="text-[#F9F5EE]/50 text-xs tracking-wider">{product.weaverInfo.location}</p>
            </div>

            {/* Metadata chips */}
            <div className="space-y-2">
              {[
                ['Weave', product.weave],
                ['Craft', 'Hand-knotted Ikat'],
                ['Heritage', 'GI Certified'],
              ].map(([k, v]) => (
                <div key={k} className="flex justify-between py-2 border-b border-[#F9F5EE]/8 text-xs">
                  <span className="text-[#F9F5EE]/40 tracking-wider">{k}</span>
                  <span className="font-semibold text-[#F9F5EE]/80">{v}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Right — Story text */}
          <div className="space-y-6">
            <p className="text-lg xl:text-xl font-serif text-[#F9F5EE]/90 leading-relaxed italic">
              "{product.weaverInfo.story ||
                `This ${product.weave} saree was born from generations of preserved knowledge — where thread by thread, motif by motif, an entire cultural identity is woven into cloth. ${product.weaverInfo.name} and their family have dedicated their lives to this living art form, transforming raw yarn into heirloom textiles that outlast generations.`}"
            </p>

            <div className="grid grid-cols-3 gap-6 pt-4">
              {[
                { number: '3rd', label: 'Generation' },
                { number: '21+', label: 'Days to weave' },
                { number: '100%', label: 'Hand-knotted' },
              ].map(({ number, label }) => (
                <div key={label} className="border-l border-[#C9A84C]/30 pl-4">
                  <p className="text-2xl font-display font-medium text-[#C9A84C]">{number}</p>
                  <p className="text-[10px] font-bold tracking-widest uppercase text-[#F9F5EE]/40 mt-1">{label}</p>
                </div>
              ))}
            </div>

            <div className="pt-2">
              <p className="text-xs font-bold tracking-widest uppercase text-[#C9A84C] cursor-pointer hover:text-[#F9F5EE] transition-colors">
                Read the full heritage story →
              </p>
            </div>
          </div>
        </div>
      </div>
    </motion.section>
  );
};
