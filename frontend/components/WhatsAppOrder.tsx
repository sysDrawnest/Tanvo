import React from 'react';
import { motion } from 'framer-motion';
import WhatsAppConcierge from './WhatsAppConcierge';

const WHATSAPP_NUMBER = "919876543210";

const WhatsAppOrder: React.FC = () => {
  const handleOccasionClick = (occasion: string) => {
    const messages: Record<string, string> = {
      wedding: `Hi TANVO,\n\nI am looking for a *Wedding Saree*.\n\nPlease share your best collections for wedding ceremonies. I'd like to see options, prices, and delivery details.\n\nThank you.`,
      engagement: `Hi TANVO,\n\nI am looking for an *Engagement / Ring Ceremony Saree*.\n\nPlease share suitable options. I'd like to know price, fabric, and delivery time.\n\nThank you.`,
      festivals: `Hi TANVO,\n\nI am looking for a *Festive Saree* for an upcoming celebration.\n\nPlease suggest some handloom options. I'd love to see photos and prices.\n\nThank you.`,
      gifting: `Hi TANVO,\n\nI am looking for a *Handloom Saree for Gifting*.\n\nCould you please suggest beautiful options with gift packaging? I'd like to know price, delivery, and customization options.\n\nThank you.`
    };
    const encoded = encodeURIComponent(messages[occasion]);
    window.open(`https://wa.me/${WHATSAPP_NUMBER}?text=${encoded}`, '_blank');
  };

  return (
    <section
      className="relative overflow-hidden py-20 lg:py-28"
      style={{ background: '#F9F5EE' }}
    >
      <div className="container mx-auto px-6 lg:px-16 max-w-[1400px]">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center min-h-[580px]">

          {/* Left - Image Panel */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="relative order-2 lg:order-1"
          >
            <div className="relative overflow-hidden bg-[#F9F5EE] aspect-[3/4] max-h-[680px] group">
              <img
                src="/Indian bride wearing silk saree.jpeg"
                alt="TANVO WhatsApp Order"
                className="w-full h-full object-cover object-[center_25%] transition-transform duration-700 ease-out group-hover:scale-105"
                onError={(e) => {
                  (e.target as HTMLImageElement).src = '/Sambalpuri saree.png';
                }}
              />
              {/* Gradient overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-[#1A6634]/30 via-transparent to-transparent pointer-events-none" />

              {/* Badge */}
              <div className="absolute bottom-6 left-6 bg-[#1A6634] text-white px-4 py-2 flex items-center gap-2">
                <svg viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4 flex-shrink-0">
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z" />
                  <path d="M12 0C5.373 0 0 5.373 0 12c0 2.123.558 4.115 1.532 5.842L0 24l6.334-1.51A11.938 11.938 0 0012 24c6.627 0 12-5.373 12-12S18.627 0 12 0zm0 21.818a9.818 9.818 0 01-5.006-1.369l-.36-.214-3.732.979.999-3.641-.235-.374A9.818 9.818 0 1112 21.818z" />
                </svg>
                <span className="text-xs font-medium tracking-wider">Personal Assistance</span>
              </div>

              {/* Corner accent */}
              <div className="absolute bottom-5 right-5 w-14 h-14 border-r border-b border-[#C9A84C]/50 pointer-events-none" />
            </div>

            <div className="flex items-center gap-4 mt-5">
              <span className="w-8 h-[1px] bg-[#0D0B0A]/30" />
              <span className="font-sans text-[10px] tracking-[0.3em] text-[#0D0B0A]/40 uppercase">
                Handloom Heritage · Est. 2020
              </span>
            </div>
          </motion.div>

          {/* Right - Content Panel */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            viewport={{ once: true }}
            className="flex flex-col items-start gap-7 order-1 lg:order-2"
          >
            {/* Eyebrow */}
            <div className="flex items-center gap-4">
              <span className="w-8 h-[1px] bg-[#1A6634]" />
              <span className="font-sans text-[11px] tracking-[0.3em] font-medium text-[#1A6634] uppercase">
                TANVO CONCIERGE
              </span>
            </div>

            {/* Headline */}
            <h2 className="font-display text-4xl md:text-5xl lg:text-[52px] text-[#0D0B0A] leading-tight font-light tracking-tight">
              Order Directly<br />
              <span className="relative inline-block mt-1">
                <span className="font-normal italic text-[#1A6634]">via WhatsApp</span>
                <span className="absolute bottom-0 left-0 right-0 h-[1px] bg-[#1A6634]/30" />
              </span>
            </h2>

            {/* Description */}
            <p className="font-sans text-base text-[#0D0B0A]/65 font-light leading-relaxed max-w-md">
              For traditional buyers and high-value purchases — simply message us. Share a screenshot, your address, and ask any questions. We'll handle the rest personally, over chat or a call.
            </p>

            {/* 3-Step Flow */}
            <div className="flex flex-col gap-3 w-full max-w-sm">
              {[
                { step: '01', text: 'Send a screenshot or product name' },
                { step: '02', text: 'Share your delivery address' },
                { step: '03', text: 'Confirm via chat or call · Pay COD or online' }
              ].map(({ step, text }) => (
                <div key={step} className="flex items-start gap-4 group">
                  <span className="font-sans text-[10px] font-medium tracking-[0.2em] text-[#1A6634]/60 pt-0.5 w-6 flex-shrink-0">
                    {step}
                  </span>
                  <span className="font-sans text-sm text-[#0D0B0A]/60 font-light leading-snug">
                    {text}
                  </span>
                </div>
              ))}
            </div>

            {/* Occasion chips */}
            <div className="flex flex-wrap items-center gap-2.5">
              {['wedding', 'engagement', 'festivals', 'gifting'].map((type, index, arr) => (
                <React.Fragment key={type}>
                  <button
                    onClick={() => handleOccasionClick(type)}
                    className="font-sans text-xs text-[#0D0B0A]/55 hover:text-[#1A6634] transition-colors capitalize relative group pb-0.5"
                  >
                    {type.charAt(0).toUpperCase() + type.slice(1)}
                    <span className="absolute bottom-0 left-0 right-0 h-[1px] bg-[#1A6634] scale-x-0 group-hover:scale-x-100 transition-transform origin-left" />
                  </button>
                  {index < arr.length - 1 && <span className="text-[#0D0B0A]/20 text-[10px]">·</span>}
                </React.Fragment>
              ))}
            </div>

            {/* CTA */}
            <WhatsAppConcierge size="lg" label="Order via WhatsApp" className="w-full sm:w-auto" />

            {/* Trust line */}
            <div className="flex items-center gap-3 pt-3 border-t border-[#0D0B0A]/8 w-full max-w-sm">
              <span className="text-[#C9A84C] text-sm">✦</span>
              <span className="font-sans text-xs italic text-[#0D0B0A]/45 tracking-wide">
                Trusted by families choosing heritage handloom for special occasions
              </span>
            </div>
          </motion.div>

        </div>
      </div>
    </section>
  );
};

export default WhatsAppOrder;