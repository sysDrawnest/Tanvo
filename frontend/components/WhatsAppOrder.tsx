import React from 'react';
import { motion } from 'framer-motion';

const WhatsAppOrder: React.FC = () => {
  const handleWhatsAppClick = () => {
    const defaultMessage = "Namaste! 🙏 I'd love to find the perfect saree for my special occasion. Can you please help me with a personal consultation?";
    const encodedMessage = encodeURIComponent(defaultMessage);
    const yourNumber = "919876543210";
    window.open(`https://wa.me/${yourNumber}?text=${encodedMessage}`, '_blank');
  };

  const handleConsultation = (occasion: string) => {
    const messages = {
      wedding: "Namaste! 🙏 I'm getting married and need a premium bridal saree. Can you help me find the perfect one?",
      engagement: "Namaste! 🙏 I'm looking for an engagement saree. I'd love your expert guidance.",
      festivals: "Namaste! 🙏 I need a beautiful saree for an upcoming festival celebration.",
      gifting: "Namaste! 🙏 I'm looking to gift a handloom saree. Can you help me choose something special?"
    };

    const encodedMessage = encodeURIComponent(messages[occasion as keyof typeof messages]);
    const yourNumber = "919876543210";
    window.open(`https://wa.me/${yourNumber}?text=${encodedMessage}`, '_blank');
  };

  return (
    <section className="relative overflow-hidden py-20 lg:py-28" style={{ background: '#F9F5EE' }}>
      <div className="container mx-auto px-6 lg:px-16 max-w-[1400px]">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center min-h-[600px]">
          
          {/* Left Side - Image */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="relative order-2 lg:order-1"
          >
            <div className="relative overflow-hidden bg-[#F9F5EE] aspect-[3/4] max-h-[700px] group">
              <img
                src="/saree-consultation-hero.jpg"
                alt="TANVO Saree Consultation"
                className="w-full h-full object-cover object-[center_30%] transition-transform duration-700 ease-out group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-[#F9F5EE]/20 pointer-events-none" />
              
              {/* Decorative corner */}
              <div className="absolute bottom-5 right-5 w-16 h-16 border-r border-b border-[#C9A84C]/40 pointer-events-none" />
            </div>

            <div className="flex items-center gap-4 mt-6">
              <span className="w-8 h-[1px] bg-[#0D0B0A]/30" />
              <span className="font-sans text-[10px] tracking-[0.3em] text-[#0D0B0A]/40 uppercase">
                HANDLOOM HERITAGE · EST. 2020
              </span>
            </div>
          </motion.div>

          {/* Right Side - Content */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            viewport={{ once: true }}
            className="flex flex-col items-start gap-8 order-1 lg:order-2"
          >
            <div className="flex items-center gap-4">
              <span className="w-8 h-[1px] bg-[#C9A84C]" />
              <span className="font-sans text-[11px] tracking-[0.3em] font-medium text-[#C9A84C] uppercase">
                PERSONAL SAREE CONSULTATION
              </span>
            </div>

            <h2 className="font-display text-4xl md:text-5xl lg:text-6xl text-[#0D0B0A] leading-tight font-light tracking-tight">
              Find the Saree<br />
              <span className="font-normal text-[#1C1612] relative inline-block mt-2">
                That Tells Your Story
                <span className="absolute bottom-1 left-0 right-0 h-[1px] bg-[#C9A84C]/40" />
              </span>
            </h2>

            <p className="font-sans text-base md:text-lg text-[#0D0B0A]/70 font-light leading-relaxed max-w-md">
              Our stylists help you choose the perfect saree for weddings, celebrations, gifting, and special occasions.
            </p>

            <div className="flex flex-wrap items-center gap-3">
              {['wedding', 'engagement', 'festivals', 'gifting'].map((type, index) => (
                <React.Fragment key={type}>
                  <button
                    onClick={() => handleConsultation(type)}
                    className="font-sans text-sm text-[#0D0B0A]/60 hover:text-[#1C1612] transition-colors capitalize relative group pb-1"
                  >
                    {type}
                    <span className="absolute bottom-0 left-0 right-0 h-[1px] bg-[#C9A84C] scale-x-0 group-hover:scale-x-100 transition-transform origin-left" />
                  </button>
                  {index < 3 && <span className="text-[#0D0B0A]/20 text-xs">·</span>}
                </React.Fragment>
              ))}
            </div>

            <motion.button
              onClick={handleWhatsAppClick}
              whileHover={{ y: -2 }}
              whileTap={{ y: 0 }}
              className="group relative inline-flex items-center gap-4 bg-[#1C1612] text-[#F9F5EE] px-8 py-4 font-sans text-sm font-medium tracking-widest uppercase overflow-hidden"
            >
              <div className="absolute inset-0 bg-[#0D0B0A] -translate-x-full group-hover:translate-x-0 transition-transform duration-500 ease-out" />
              <span className="relative z-10">Chat with TANVO Stylist</span>
              <span className="relative z-10 text-lg group-hover:translate-x-1 transition-transform">→</span>
            </motion.button>

            <div className="flex flex-wrap items-center gap-3 mt-2">
              <span className="font-sans text-xs text-[#0D0B0A]/50 tracking-wide">Personal guidance</span>
              <span className="text-[#0D0B0A]/20 text-[10px]">•</span>
              <span className="font-sans text-xs text-[#0D0B0A]/50 tracking-wide">Authentic handloom</span>
              <span className="text-[#0D0B0A]/20 text-[10px]">•</span>
              <span className="font-sans text-xs text-[#0D0B0A]/50 tracking-wide">Direct support</span>
            </div>

            <div className="flex items-center gap-3 pt-4 border-t border-[#0D0B0A]/10 w-full max-w-sm">
              <span className="text-[#C9A84C] text-sm">✦</span>
              <span className="font-sans text-xs italic text-[#0D0B0A]/50 tracking-wide">
                Trusted by families choosing handcrafted heritage sarees
              </span>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default WhatsAppOrder;