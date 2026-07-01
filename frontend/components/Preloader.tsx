import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface PreloaderProps {
  isLoading: boolean;
}

const Preloader: React.FC<PreloaderProps> = ({ isLoading }) => {
  return (
    <AnimatePresence>
      {isLoading && (
        <motion.div
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.8, ease: 'easeInOut' }}
          className="fixed inset-0 z-[100] flex flex-col items-center justify-center bg-[#F9F5EE]"
        >
          {/* Logo and Tagline container */}
          <div className="flex flex-col items-center mb-12">
            <h1 className="text-4xl md:text-5xl font-serif text-[#0D0B0A] tracking-[0.2em] uppercase">
              Tanvo
            </h1>
            <p className="text-[10px] md:text-xs font-sans tracking-[0.3em] uppercase text-[#0D0B0A] opacity-60 mt-4">
              Heritage Woven in Silk
            </p>
          </div>

          {/* Progress Line */}
          <div className="w-48 h-[1px] bg-[#E2D9C8] relative overflow-hidden">
             <motion.div
                initial={{ x: '-100%' }}
                animate={{ x: '100%' }}
                transition={{
                  repeat: Infinity,
                  duration: 1.5,
                  ease: 'easeInOut',
                }}
                className="absolute inset-0 bg-[#C9A84C]"
             />
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default Preloader;
