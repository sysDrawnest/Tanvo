import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Heart, Share2, Search, ChevronLeft, ChevronRight, X } from 'lucide-react';
import { Product } from '../../hooks/useProductDetail';

interface Props {
  product: Product;
  selectedImage: number;
  setSelectedImage: (i: number) => void;
  isWishlisted: boolean;
  toggleWishlist: (id: string) => void;
  showShareMenu: boolean;
  setShowShareMenu: (v: boolean) => void;
  handleShare: (platform: string) => void;
  isFullscreenGallery: boolean;
  setIsFullscreenGallery: (v: boolean) => void;
}

const SHARE_PLATFORMS = [
  { name: 'WhatsApp', icon: '📱' },
  { name: 'Facebook', icon: '📘' },
  { name: 'Pinterest', icon: '📌' },
  { name: 'Email', icon: '✉️' },
];

export const DesktopGallery: React.FC<Props> = ({
  product, selectedImage, setSelectedImage,
  isWishlisted, toggleWishlist,
  showShareMenu, setShowShareMenu, handleShare,
  isFullscreenGallery, setIsFullscreenGallery,
}) => {
  const prev = () => setSelectedImage(selectedImage > 0 ? selectedImage - 1 : product.images.length - 1);
  const next = () => setSelectedImage(selectedImage < product.images.length - 1 ? selectedImage + 1 : 0);

  return (
    <>
      {/* Fullscreen overlay */}
      <AnimatePresence>
        {isFullscreenGallery && (
          <motion.div
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-[#0D0B0A]/96 flex items-center justify-center"
            onClick={() => setIsFullscreenGallery(false)}
          >
            <button className="absolute top-5 right-5 text-[#F9F5EE] hover:text-[#C9A84C] transition-colors" onClick={() => setIsFullscreenGallery(false)}>
              <X size={30} />
            </button>
            <div className="relative max-w-4xl w-full mx-8" onClick={e => e.stopPropagation()}>
              <img src={product.images[selectedImage]?.url} alt={product.name} className="w-full max-h-[85vh] object-contain" />
              {product.images.length > 1 && (
                <>
                  <button onClick={prev} className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-12 p-2 bg-white/10 hover:bg-[#C9A84C] rounded-[2px] transition-colors"><ChevronLeft className="text-white" size={22} /></button>
                  <button onClick={next} className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-12 p-2 bg-white/10 hover:bg-[#C9A84C] rounded-[2px] transition-colors"><ChevronRight className="text-white" size={22} /></button>
                </>
              )}
              <div className="absolute bottom-4 left-1/2 -translate-x-1/2 text-xs text-white/60 tracking-widest">{selectedImage + 1} / {product.images.length}</div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Sticky gallery container */}
      <div className="sticky top-24 flex gap-3">
        {/* Vertical thumbnails */}
        {product.images.length > 1 && (
          <div className="flex flex-col gap-2 w-16 shrink-0">
            {product.images.map((img, i) => (
              <button
                key={i}
                onClick={() => setSelectedImage(i)}
                className={`aspect-square rounded-[2px] overflow-hidden border-2 transition-all duration-200 ${
                  selectedImage === i ? 'border-[#C9A84C]' : 'border-transparent hover:border-[#0D0B0A]/30'
                }`}
              >
                <img src={img.url} alt={`View ${i + 1}`} className="w-full h-full object-cover" />
              </button>
            ))}
          </div>
        )}

        {/* Main image */}
        <div className="flex-1 relative">
          <div
            className="relative aspect-[4/5] bg-white overflow-hidden cursor-zoom-in rounded-[4px] border border-[#0D0B0A]/8 group"
            onClick={() => setIsFullscreenGallery(true)}
          >
            <motion.img
              key={selectedImage}
              initial={{ opacity: 0, scale: 1.02 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.4 }}
              src={product.images[selectedImage]?.url}
              alt={product.name}
              className="w-full h-full object-cover group-hover:scale-[1.04] transition-transform duration-700"
            />

            {/* Badges */}
            <div className="absolute top-4 left-4 flex flex-col gap-1.5 z-10">
              <span className="px-2.5 py-1 bg-[#0D0B0A] text-[#F9F5EE] text-[9px] font-bold tracking-widest uppercase rounded-[2px] border border-[#C9A84C]/30">HANDWOVEN</span>
              <span className="px-2.5 py-1 bg-white text-[#0D0B0A] text-[9px] font-bold tracking-widest uppercase rounded-[2px] border border-[#0D0B0A]/15">ARTISAN VERIFIED</span>
              {(product.isBestSeller || product.stock <= 3) && (
                <span className="px-2.5 py-1 bg-[#C9A84C] text-[#0D0B0A] text-[9px] font-bold tracking-widest uppercase rounded-[2px]">LIMITED PIECE</span>
              )}
            </div>

            {/* Action buttons */}
            <div className="absolute top-4 right-4 flex flex-col gap-2 z-10">
              <motion.button
                whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}
                onClick={e => { e.stopPropagation(); toggleWishlist(product._id); }}
                className={`p-2.5 rounded-[2px] shadow-sm transition-all ${isWishlisted ? 'bg-[#0D0B0A] text-[#F9F5EE]' : 'bg-white text-[#0D0B0A] hover:text-[#C9A84C]'}`}
              >
                <Heart size={18} fill={isWishlisted ? 'currentColor' : 'none'} />
              </motion.button>

              <div className="relative">
                <motion.button
                  whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}
                  onClick={e => { e.stopPropagation(); setShowShareMenu(!showShareMenu); }}
                  className="p-2.5 bg-white text-[#0D0B0A] rounded-[2px] shadow-sm hover:text-[#C9A84C] transition-all"
                >
                  <Share2 size={18} />
                </motion.button>
                <AnimatePresence>
                  {showShareMenu && (
                    <motion.div
                      initial={{ opacity: 0, y: -8 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -8 }}
                      className="absolute top-12 right-0 bg-white border border-[#0D0B0A]/10 rounded-[2px] shadow-xl p-3 w-44 z-20"
                      onClick={e => e.stopPropagation()}
                    >
                      <p className="text-[10px] font-bold tracking-widest uppercase text-[#0D0B0A]/60 mb-2">Share</p>
                      {SHARE_PLATFORMS.map(p => (
                        <button key={p.name} onClick={() => handleShare(p.name)} className="w-full flex items-center gap-2 px-2 py-1.5 text-xs hover:bg-[#F9F5EE] rounded-[2px] text-[#0D0B0A] transition-colors">
                          <span>{p.icon}</span><span className="font-medium">{p.name}</span>
                        </button>
                      ))}
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </div>

            {/* Zoom hint */}
            <div className="absolute bottom-3 right-3 bg-[#0D0B0A]/80 text-[#F9F5EE] text-[9px] font-bold tracking-widest uppercase px-2.5 py-1.5 rounded-[2px] flex items-center gap-1.5">
              <Search size={10} className="text-[#C9A84C]" /> Inspect
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
