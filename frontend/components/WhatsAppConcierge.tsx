import React from 'react';
import { motion } from 'framer-motion';

const WHATSAPP_NUMBER = "919876543210"; // Replace with real number

interface WhatsAppConciergeProps {
  productName?: string;
  productPrice?: number;
  productURL?: string;
  variant?: 'button' | 'outline';
  size?: 'sm' | 'md' | 'lg';
  label?: string;
  className?: string;
}

const WhatsAppConcierge: React.FC<WhatsAppConciergeProps> = ({
  productName,
  productPrice,
  productURL,
  variant = 'button',
  size = 'md',
  label = 'Order via WhatsApp',
  className = ''
}) => {
  const buildMessage = () => {
    if (productName) {
      return `Hi TANVO,

I want to buy:

🧵 *${productName}*

${productPrice ? `Price: ₹${productPrice.toLocaleString('en-IN')}` : ''}
${productURL ? `Product link: ${productURL}` : ''}

Please assist me.`;
    }
    return `Namaste! 🙏 I am interested in buying a saree from TANVO. Please assist me.`;
  };

  const handleClick = () => {
    const encoded = encodeURIComponent(buildMessage());
    window.open(`https://wa.me/${WHATSAPP_NUMBER}?text=${encoded}`, '_blank');
  };

  const sizeClasses = {
    sm: 'text-xs px-4 py-2.5 gap-2',
    md: 'text-sm px-6 py-3 gap-2.5',
    lg: 'text-sm px-8 py-4 gap-3'
  };

  if (variant === 'outline') {
    return (
      <motion.button
        onClick={handleClick}
        whileHover={{ y: -1 }}
        whileTap={{ scale: 0.98 }}
        className={`group relative inline-flex items-center justify-center font-medium tracking-wider border border-[#1A6634] text-[#1A6634] bg-transparent hover:bg-[#1A6634] hover:text-white transition-all duration-300 rounded-sm ${sizeClasses[size]} ${className}`}
      >
        {/* WhatsApp icon */}
        <svg viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4 flex-shrink-0">
          <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z" />
          <path d="M12 0C5.373 0 0 5.373 0 12c0 2.123.558 4.115 1.532 5.842L0 24l6.334-1.51A11.938 11.938 0 0012 24c6.627 0 12-5.373 12-12S18.627 0 12 0zm0 21.818a9.818 9.818 0 01-5.006-1.369l-.36-.214-3.732.979.999-3.641-.235-.374A9.818 9.818 0 1112 21.818z" />
        </svg>
        <span>{label}</span>
      </motion.button>
    );
  }

  return (
    <motion.button
      onClick={handleClick}
      whileHover={{ y: -1 }}
      whileTap={{ scale: 0.98 }}
      className={`group relative inline-flex items-center justify-center font-medium tracking-wider bg-[#1A6634] text-white hover:bg-[#145228] transition-all duration-300 rounded-sm overflow-hidden ${sizeClasses[size]} ${className}`}
    >
      {/* Subtle shine sweep */}
      <span className="absolute inset-0 -translate-x-full group-hover:translate-x-full bg-white/10 skew-x-12 transition-transform duration-700 ease-out" />
      {/* WhatsApp icon */}
      <svg viewBox="0 0 24 24" fill="currentColor" className="relative z-10 w-4 h-4 flex-shrink-0">
        <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z" />
        <path d="M12 0C5.373 0 0 5.373 0 12c0 2.123.558 4.115 1.532 5.842L0 24l6.334-1.51A11.938 11.938 0 0012 24c6.627 0 12-5.373 12-12S18.627 0 12 0zm0 21.818a9.818 9.818 0 01-5.006-1.369l-.36-.214-3.732.979.999-3.641-.235-.374A9.818 9.818 0 1112 21.818z" />
      </svg>
      <span className="relative z-10">{label}</span>
    </motion.button>
  );
};

export default WhatsAppConcierge;
