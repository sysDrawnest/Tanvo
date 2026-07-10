import React from 'react';
import { motion } from 'framer-motion';

const HeritageCuratedTransition: React.FC = () => {
  return (
    <section className="relative w-full h-[140px] md:h-[180px] bg-gradient-to-b from-[#FFFFFF] via-[#F9F5EE] to-[#0D0B0A] flex flex-col justify-center items-center overflow-hidden select-none">
      {/* Subtle weave/textile pattern overlay at ~3% opacity */}
      <div 
        className="absolute inset-0 pointer-events-none opacity-[0.03] z-0" 
        style={{ 
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='40' height='40' viewBox='0 0 40 40' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M0 0h40v2H0V0zm0 4h40v2H0V4zm0 4h40v2H0V8zm0 4h40v2H0v-2zm0 4h40v2H0v-2zm0 4h40v2H0v-2zm0 4h40v2H0v-2zm0 4h40v2H0v-2zm0 4h40v2H0v-2zm0 4h40v2H0v-2z' fill='%23B5502B' fill-opacity='1' fill-rule='evenodd'/%3E%3C/svg%3E")`,
          backgroundSize: '40px 40px'
        }} 
      />

      {/* Content Container */}
      <div className="relative z-10 flex flex-col items-center text-center px-4">
        {/* Tiny uppercase label */}
        <motion.span
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 0.6, y: 0 }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          viewport={{ once: true, margin: "-30px" }}
          className="font-sans text-[8px] md:text-[9px] font-bold tracking-[0.35em] text-[#1C1612] uppercase mb-2 md:mb-3"
        >
          FROM THE LOOM
        </motion.span>

        {/* Thin gold divider line with vertical whitespace */}
        <motion.div
          initial={{ opacity: 0, scaleX: 0 }}
          whileInView={{ opacity: 0.4, scaleX: 1 }}
          transition={{ duration: 1, delay: 0.15, ease: [0.16, 1, 0.3, 1] }}
          viewport={{ once: true, margin: "-30px" }}
          className="w-12 md:w-16 h-[1px] bg-[#C9A84C] mb-3 md:mb-4 origin-center"
        />

        {/* Centered elegant editorial line */}
        <motion.p
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 0.9, y: 0 }}
          transition={{ duration: 0.8, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
          viewport={{ once: true, margin: "-30px" }}
          className="font-display font-light italic text-base md:text-xl text-[#1C1612] tracking-wide"
        >
          "Crafted by Hands. Curated for You."
        </motion.p>
      </div>
    </section>
  );
};

export default HeritageCuratedTransition;
