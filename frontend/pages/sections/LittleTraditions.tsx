import React, { useRef, useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion, useScroll, useTransform } from 'framer-motion';

const LittleTraditions: React.FC = () => {
  const containerRef = useRef<HTMLElement>(null);
  const [isDesktop, setIsDesktop] = useState(false);

  // Monitor window resize to safely toggle parallax on desktop
  useEffect(() => {
    const handleResize = () => setIsDesktop(window.innerWidth >= 1024);
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"]
  });

  // Parallax offsets for left and right columns
  const yLeft = useTransform(scrollYProgress, [0, 1], [-40, 40]);
  const yRight = useTransform(scrollYProgress, [0, 1], [40, -40]);

  // Container reveal variants
  const sectionVariants = {
    hidden: {},
    visible: {
      transition: {
        staggerChildren: 0.15
      }
    }
  };

  const centerContentVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 1.2,
        ease: [0.16, 1, 0.3, 1]
      }
    }
  };

  const imageLeftVariants = {
    hidden: { opacity: 0, x: -50 },
    visible: {
      opacity: 1,
      x: 0,
      transition: {
        duration: 1.2,
        ease: [0.16, 1, 0.3, 1]
      }
    }
  };

  const imageRightVariants = {
    hidden: { opacity: 0, x: 50 },
    visible: {
      opacity: 1,
      x: 0,
      transition: {
        duration: 1.2,
        ease: [0.16, 1, 0.3, 1]
      }
    }
  };

  const gridBackgroundStyle = {
    background: `
      linear-gradient(90deg, rgba(201, 168, 76, 0.03) 1px, transparent 1px) 0 0 / 24px 24px,
      linear-gradient(rgba(201, 168, 76, 0.03) 1px, transparent 1px) 0 0 / 24px 24px,
      #F9F5EE
    `
  };

  return (
    <motion.section
      ref={containerRef}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.2 }}
      variants={sectionVariants}
      style={gridBackgroundStyle}
      className="relative overflow-hidden py-16 lg:py-0 w-full"
    >
      {/* Soft textile overlay grain */}
      <div className="absolute inset-0 pointer-events-none opacity-[0.015] bg-[radial-gradient(#000_1px,transparent_1px)] [background-size:16px_16px]" />

      <div className="max-w-[1600px] mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col lg:flex-row items-stretch min-h-[600px] lg:min-h-[850px] relative">
          
          {/* LEFT COLUMN: Girl Portrait */}
          <motion.div
            variants={imageLeftVariants}
            className="w-full lg:w-[35%] h-[500px] sm:h-[600px] lg:h-auto overflow-hidden relative group self-center lg:self-stretch my-6 lg:my-12 shadow-2xl lg:shadow-none"
          >
            <div className="w-full h-full overflow-hidden relative">
              <motion.img
                style={{ y: isDesktop ? yLeft : 0, scale: 1.12 }}
                whileHover={{ scale: 1.16 }}
                transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
                src="/kids_campaign_girl.png"
                alt="Girls Heritage Collection Portrait"
                className="w-full h-full object-cover object-center absolute inset-0"
              />
              {/* Soft vignetting & edge blend to center */}
              <div className="absolute inset-0 bg-gradient-to-t from-[#0d0b0a]/30 via-transparent to-transparent" />
              <div className="absolute top-0 right-0 bottom-0 w-32 bg-gradient-to-l from-[#F9F5EE] to-transparent pointer-events-none hidden lg:block z-10" />
            </div>
          </motion.div>

          {/* LEFT DIVIDER */}
          <div className="hidden lg:block w-[1px] bg-gradient-to-b from-transparent via-[#C9A84C]/20 to-transparent self-stretch my-12" />

          {/* CENTER COLUMN: Editorial Storytelling */}
          <motion.div
            variants={centerContentVariants}
            className="w-full lg:w-[30%] flex flex-col justify-center items-center text-center py-16 px-6 sm:px-12 lg:px-8 z-20"
          >
            {/* Heritage graphic accent */}
            <svg className="w-8 h-8 text-[#C9A84C] opacity-75 mb-6" viewBox="0 0 100 100" fill="none" stroke="currentColor" strokeWidth="1.5">
              <circle cx="50" cy="50" r="10" />
              <circle cx="50" cy="50" r="25" strokeDasharray="3 3" />
              <path d="M50 5 L50 95 M5 50 L95 50 M18 18 L82 82 M18 82 L82 18" opacity="0.4" />
              <polygon points="50,15 54,35 74,35 58,47 64,67 50,55 36,67 42,47 26,35 46,35" fill="none" />
            </svg>

            <span className="text-[10px] sm:text-[11px] tracking-[0.4em] text-[#C9A84C] font-medium uppercase block mb-4">
              TANVO PRESENTS
            </span>

            <h2 className="font-serif text-4xl sm:text-5xl lg:text-[54px] text-[#0D0B0A] font-light leading-tight mb-6">
              Little <em>Traditions</em>
            </h2>

            <div className="w-8 h-[1px] bg-[#C9A84C]/45 my-4" />

            <p className="text-xs sm:text-sm text-[#595550] leading-relaxed font-light font-sans max-w-[320px] mb-8">
              "Some traditions are too beautiful to wait for adulthood. Thoughtfully handcrafted for little boys and girls, every piece celebrates festivals, family, and the timeless elegance of Indian heritage."
            </p>

            {/* Primary CTA */}
            <Link
              to="/shop?category=Kids+Collection"
              className="group inline-flex flex-col items-center mb-6"
            >
              <span className="text-xs font-semibold tracking-widest uppercase text-[#0D0B0A] hover:text-[#C9A84C] transition-colors duration-300 flex items-center gap-2">
                Explore Collection 
                <span className="inline-block transition-transform duration-300 group-hover:translate-x-1">→</span>
              </span>
              <span className="h-[1px] bg-[#C9A84C]/50 w-full mt-2 transition-all duration-300 group-hover:bg-[#C9A84C] group-hover:w-[120%]" />
            </Link>

            {/* Secondary CTA */}
            <Link
              to="/shop"
              className="text-[10px] tracking-[0.2em] uppercase text-[#595550] hover:text-[#C9A84C] transition-colors duration-300 mt-2 border-b border-dashed border-[#595550]/30 hover:border-[#C9A84C] pb-0.5"
            >
              View Family Collection
            </Link>
          </motion.div>

          {/* RIGHT DIVIDER */}
          <div className="hidden lg:block w-[1px] bg-gradient-to-b from-transparent via-[#C9A84C]/20 to-transparent self-stretch my-12" />

          {/* RIGHT COLUMN: Boy Portrait */}
          <motion.div
            variants={imageRightVariants}
            className="w-full lg:w-[35%] h-[500px] sm:h-[600px] lg:h-auto overflow-hidden relative group self-center lg:self-stretch my-6 lg:my-12 shadow-2xl lg:shadow-none"
          >
            <div className="w-full h-full overflow-hidden relative">
              <motion.img
                style={{ y: isDesktop ? yRight : 0, scale: 1.12 }}
                whileHover={{ scale: 1.16 }}
                transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
                src="/kids_campaign_boy.png"
                alt="Boys Heritage Collection Portrait"
                className="w-full h-full object-cover object-center absolute inset-0"
              />
              {/* Soft vignetting & edge blend to center */}
              <div className="absolute inset-0 bg-gradient-to-t from-[#0d0b0a]/30 via-transparent to-transparent" />
              <div className="absolute top-0 left-0 bottom-0 w-32 bg-gradient-to-r from-[#F9F5EE] to-transparent pointer-events-none hidden lg:block z-10" />
            </div>
          </motion.div>

        </div>
      </div>
    </motion.section>
  );
};

export default LittleTraditions;
