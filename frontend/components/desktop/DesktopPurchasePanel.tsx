import React from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Star, MapPin, Check, Plus, Minus, ShoppingBag, Truck, Lock, MessageCircle, RotateCcw, Shield, Users } from 'lucide-react';
import { Product } from '../../hooks/useProductDetail';

interface Props {
  product: Product;
  quantity: number;
  setQuantity: (q: number) => void;
  selectedColor: string;
  setSelectedColor: (c: string) => void;
  selectedSize: string;
  setSelectedSize: (s: string) => void;
  pincode: string;
  setPincode: (p: string) => void;
  deliveryCheck: null | { available: boolean; date: string };
  handleAddToCart: () => void;
  handleBuyNow: () => void;
  handlePincodeCheck: () => void;
  getCraftTime: () => string;
}

export const DesktopPurchasePanel: React.FC<Props> = ({
  product, quantity, setQuantity,
  selectedColor, setSelectedColor,
  selectedSize, setSelectedSize,
  pincode, setPincode, deliveryCheck,
  handleAddToCart, handleBuyNow, handlePincodeCheck,
  getCraftTime,
}) => {
  return (
    <div className="space-y-6">
      {/* Category + Weave label */}
      <div>
        <p className="text-[10px] font-bold tracking-[0.25em] text-[#0D0B0A]/40 uppercase mb-0.5">
          {product.category} · Odisha Handloom
        </p>
        <p className="text-[11px] font-bold tracking-[0.2em] text-[#C9A84C] uppercase">
          {product.weave}
        </p>
      </div>

      {/* Title */}
      <h1 className="text-4xl xl:text-5xl font-display font-medium text-[#0D0B0A] leading-[1.15] -mt-1">
        {product.name}
      </h1>

      {/* Rating + Origin */}
      <div className="flex items-center gap-4 text-xs font-sans">
        <div className="flex items-center gap-1">
          {[...Array(5)].map((_, i) => (
            <Star key={i} size={13} className={i < Math.floor(product.ratings) ? 'text-[#C9A84C] fill-current' : 'text-[#0D0B0A]/10'} />
          ))}
        </div>
        <span className="text-[#0D0B0A]/60">
          {product.ratings.toFixed(1)} · {product.numReviews} collectors
        </span>
        <span className="text-[#0D0B0A]/20">|</span>
        <span className="flex items-center gap-1 text-[#0D0B0A]/50">
          <MapPin size={11} className="text-[#C9A84C]" />
          {product.weaverInfo?.location || 'Odisha, India'}
        </span>
      </div>

      {/* Price */}
      <div className="py-5 border-y border-[#0D0B0A]/8">
        <div className="flex items-baseline gap-3 mb-3">
          <span className="text-3xl font-medium text-[#0D0B0A]">₹{product.price.toLocaleString()}</span>
          {product.originalPrice && (
            <span className="text-sm line-through text-[#0D0B0A]/35">₹{product.originalPrice.toLocaleString()}</span>
          )}
        </div>
        <div className="flex flex-col gap-1.5">
          {['Handwoven by verified artisan', 'GI heritage weave certified', `Pure ${product.fabric} authenticity`].map(item => (
            <div key={item} className="flex items-center gap-2 text-[11px] text-[#0D0B0A]/65 font-sans">
              <Check size={11} className="text-[#C9A84C] shrink-0" />{item}
            </div>
          ))}
        </div>
      </div>

      {/* Color selector */}
      {product.colors && product.colors.length > 0 && (
        <div className="space-y-2">
          <p className="text-[10px] font-bold tracking-widest uppercase text-[#0D0B0A]">
            Colour: <span className="text-[#C9A84C]">{selectedColor}</span>
          </p>
          <div className="flex gap-2">
            {product.colors.map(c => (
              <button
                key={c}
                onClick={() => setSelectedColor(c)}
                title={c}
                className={`w-7 h-7 rounded-[3px] border-2 transition-all ${selectedColor === c ? 'border-[#C9A84C] ring-1 ring-[#C9A84C]' : 'border-[#0D0B0A]/15 hover:border-[#C9A84C]'}`}
                style={{ backgroundColor: c.toLowerCase() }}
              />
            ))}
          </div>
        </div>
      )}

      {/* Size selector */}
      {product.sizes && product.sizes.length > 0 && (
        <div className="space-y-2">
          <p className="text-[10px] font-bold tracking-widest uppercase text-[#0D0B0A]">Size</p>
          <div className="flex gap-2 flex-wrap">
            {product.sizes.map(s => (
              <button
                key={s}
                onClick={() => setSelectedSize(s)}
                className={`px-4 py-2 text-xs font-semibold tracking-wider uppercase rounded-[2px] border transition-all ${
                  selectedSize === s ? 'bg-[#0D0B0A] text-[#F9F5EE] border-[#0D0B0A]' : 'border-[#0D0B0A]/20 text-[#0D0B0A] hover:border-[#C9A84C]'
                }`}
              >{s}</button>
            ))}
          </div>
        </div>
      )}

      {/* Quantity */}
      <div className="flex items-center gap-4">
        <p className="text-[10px] font-bold tracking-widest uppercase text-[#0D0B0A]">Qty</p>
        <div className="flex items-center border border-[#0D0B0A]/15 rounded-[2px] overflow-hidden">
          <button onClick={() => setQuantity(Math.max(1, quantity - 1))} className="w-9 h-9 flex items-center justify-center hover:bg-[#0D0B0A]/5 transition-colors disabled:opacity-30" disabled={quantity <= 1}>
            <Minus size={13} />
          </button>
          <span className="w-10 text-center text-sm font-medium text-[#0D0B0A]">{quantity}</span>
          <button onClick={() => setQuantity(Math.min(product.stock, quantity + 1))} className="w-9 h-9 flex items-center justify-center hover:bg-[#0D0B0A]/5 transition-colors disabled:opacity-30" disabled={quantity >= product.stock}>
            <Plus size={13} />
          </button>
        </div>
        {/* Stock indicator */}
        <span className={`text-[10px] font-bold tracking-wider uppercase ${product.stock <= 5 ? 'text-amber-600' : 'text-green-700'}`}>
          {product.stock <= 5 ? `Only ${product.stock} left` : 'Ready to ship'}
        </span>
      </div>

      {/* CTA buttons */}
      <div className="flex gap-3 pt-1">
        <motion.button
          whileHover={{ scale: 1.005 }} whileTap={{ scale: 0.995 }}
          onClick={handleAddToCart}
          disabled={product.stock === 0}
          className="flex-1 py-4 bg-[#780000] text-[#F9F5EE] font-semibold text-xs tracking-[0.18em] uppercase rounded-[4px] hover:bg-[#5a0000] transition-colors disabled:opacity-40 flex items-center justify-center gap-2 shadow-sm shadow-[#780000]/20"
        >
          <ShoppingBag size={14} /> Add to Bag
        </motion.button>
        <motion.button
          whileHover={{ scale: 1.005 }} whileTap={{ scale: 0.995 }}
          onClick={handleBuyNow}
          disabled={product.stock === 0}
          className="flex-1 py-4 border border-[#780000] text-[#780000] font-semibold text-xs tracking-[0.18em] uppercase rounded-[4px] hover:bg-[#780000] hover:text-[#F9F5EE] transition-colors disabled:opacity-40"
        >
          Buy It Now
        </motion.button>
      </div>

      {/* WhatsApp concierge */}
      <a
        href={`https://wa.me/?text=${encodeURIComponent(`Hi, I have a query about ${product.name} on TANVO.`)}`}
        target="_blank" rel="noopener noreferrer"
        className="flex items-center justify-center gap-2 w-full py-3 border border-[#0D0B0A]/10 rounded-[3px] text-xs font-semibold tracking-wider text-[#0D0B0A]/70 hover:border-[#C9A84C] hover:text-[#0D0B0A] transition-all bg-white"
      >
        <MessageCircle size={14} className="text-green-600" /> WhatsApp Concierge
      </a>

      {/* Delivery checker */}
      <div className="p-4 bg-white border border-[#0D0B0A]/8 rounded-[4px] space-y-3">
        <p className="text-[10px] font-bold tracking-widest uppercase text-[#0D0B0A]">Check Delivery</p>
        <div className="flex gap-2">
          <input
            type="text"
            value={pincode}
            onChange={e => setPincode(e.target.value.replace(/\D/g, '').slice(0, 6))}
            placeholder="Enter PIN code"
            className="flex-1 px-3 py-2 text-sm border border-[#0D0B0A]/15 rounded-[2px] bg-[#F9F5EE] text-[#0D0B0A] placeholder-[#0D0B0A]/30 focus:border-[#C9A84C] focus:outline-none"
          />
          <button onClick={handlePincodeCheck} className="px-4 py-2 bg-[#0D0B0A] text-[#F9F5EE] text-xs font-bold tracking-widest uppercase rounded-[2px] hover:bg-[#C9A84C] hover:text-[#0D0B0A] transition-colors">
            Check
          </button>
        </div>
        <AnimatePresence>
          {deliveryCheck && (
            <motion.div
              initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: 'auto' }} exit={{ opacity: 0, height: 0 }}
              className={`flex items-start gap-2 text-xs p-3 rounded-[2px] ${deliveryCheck.available ? 'bg-green-50 text-green-800 border border-green-100' : 'bg-orange-50 text-orange-800 border border-orange-100'}`}
            >
              <Truck size={13} className="shrink-0 mt-0.5" />
              {deliveryCheck.available
                ? <span>Serviceable · Estimated delivery <strong>{deliveryCheck.date}</strong>. Free insured shipping on orders above ₹5,000.</span>
                : <span>Not serviceable at this PIN. Contact our concierge for alternatives.</span>
              }
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Trust micro-badges */}
      <div className="grid grid-cols-3 gap-2">
        {[
          { icon: Shield, label: 'Certified Pure' },
          { icon: Lock, label: 'Secure Checkout' },
          { icon: RotateCcw, label: '7-Day Returns' },
        ].map(({ icon: Icon, label }) => (
          <div key={label} className="flex flex-col items-center gap-1.5 py-3 border border-[#0D0B0A]/8 rounded-[3px] bg-white">
            <Icon size={15} className="text-[#C9A84C]" />
            <p className="text-[9px] font-bold tracking-wider uppercase text-[#0D0B0A]/60">{label}</p>
          </div>
        ))}
      </div>

      {/* Craft quick specs */}
      <div className="grid grid-cols-2 gap-x-6 gap-y-3 p-4 border border-[#0D0B0A]/8 rounded-[3px] bg-white">
        {[
          ['Weave', product.weave],
          ['Fabric', product.fabric],
          ['Origin', product.weaverInfo?.location || 'Odisha'],
          ['Craft Time', getCraftTime()],
          ['Length', product.length || '6.3 m'],
          ['Blouse', product.blousePiece ? 'Included' : 'Separate'],
        ].map(([k, v]) => (
          <div key={k}>
            <p className="text-[9px] font-bold tracking-widest uppercase text-[#0D0B0A]/35 mb-0.5">{k}</p>
            <p className="text-xs font-semibold text-[#0D0B0A]">{v}</p>
          </div>
        ))}
      </div>
    </div>
  );
};
