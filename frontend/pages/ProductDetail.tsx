import React, { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import {
  Heart, Share2, Star, Truck, Shield, Award,
  ChevronLeft, ChevronRight, Plus, Minus,
  Check, Clock, MapPin, Package, MessageCircle,
  Zap, Leaf, Gem, Sparkles, Info, RotateCcw,
  ThumbsUp, Camera, User, Calendar, ShoppingBag,
  Search, Ruler, Lock, Users,
  ChevronDown, ChevronUp, X, Phone, Mail, Facebook, Instagram, Twitter
} from 'lucide-react';
import { useStore } from '../context/StoreContext';
import API from '../services/api';
import { motion, AnimatePresence } from 'framer-motion';
import { useSwipeable } from 'react-swipeable';
import { Helmet } from 'react-helmet-async';
import { ProductHeritageAccordion } from '../components/ProductHeritageAccordion';
import { useProductDetail } from '../hooks/useProductDetail';
import { ProductDetailDesktop } from './ProductDetailDesktop';

interface Product {
  _id: string;
  name: string;
  description: string;
  shortDescription?: string;
  price: number;
  originalPrice?: number;
  category: string;
  subCategory: string;
  weave: string;
  fabric: string;
  images: Array<{ url: string; publicId: string; isPrimary: boolean }>;
  stock: number;
  colors?: string[];
  sizes?: string[];
  length?: string;
  blousePiece: boolean;
  careInstructions?: string;
  isFeatured: boolean;
  isBestSeller: boolean;
  isNewArrival: boolean;
  ratings: number;
  numReviews: number;
  tags?: string[];
  weaverInfo?: {
    name: string;
    generation: string;
    location: string;
    story: string;
  };
}

interface Review {
  _id: string;
  user: {
    _id: string;
    name: string;
    profileImage?: string;
  };
  rating: number;
  title?: string;
  comment: string;
  images?: Array<{ url: string }>;
  isVerifiedPurchase: boolean;
  helpful: string[];
  createdAt: string;
}

// Custom hook for responsive design
const useResponsive = () => {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  return { isMobile };
};

const ProductDetail: React.FC = () => {
  const ctx = useProductDetail();
  const {
    id, product, loading, quantity, setQuantity,
    selectedImage, setSelectedImage, activeTab, setActiveTab,
    pincode, setPincode, deliveryCheck,
    selectedColor, setSelectedColor, selectedSize, setSelectedSize,
    showShareMenu, setShowShareMenu, isStickyCart,
    isFullscreenGallery, setIsFullscreenGallery,
    showBackToTop, reviews, relatedProducts,
    loadingReviews, hasMoreReviews,
    showAuthMessage, setShowAuthMessage,
    showReviewForm, setShowReviewForm,
    newRating, setNewRating, newTitle, setNewTitle, newComment, setNewComment,
    submittingReview, reviewError, reviewSuccess,
    isWishlisted, isAuthenticated, toggleWishlist,
    handleAddToCart, handleBuyNow, handlePincodeCheck,
    handleShare, handleReviewSubmit, handleLoadMoreReviews,
    swipeHandlers, scrollToTop, formatDate, getCraftTime,
  } = ctx;
  const { isMobile } = useResponsive();




  if (loading) {
    return (
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="min-h-screen pt-32 pb-24 flex items-center justify-center bg-[#F9F5EE]"
      >
        <div className="text-center font-sans">
          <div className="relative">
            <div className="w-16 h-16 border-2 border-[#C9A84C] border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="w-1.5 h-1.5 bg-[#0D0B0A] rounded-full"></div>
            </div>
          </div>
          <p className="font-medium text-xs tracking-widest uppercase text-[#0D0B0A]/70">
            Curation is loading...
          </p>
        </div>
      </motion.div>
    );
  }

  if (!product) {
    return (
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="min-h-screen pt-32 pb-24 bg-[#F9F5EE] flex items-center"
      >
        <div className="container mx-auto px-4 text-center font-sans">
          <h1 className="text-2xl sm:text-3xl font-display font-medium mb-4 text-[#0D0B0A]">
            Heirloom Not Found
          </h1>
          <p className="mb-8 text-[#0D0B0A]/60 text-sm">
            The saree you are looking for has been woven into another collection.
          </p>
          <Link to="/shop" className="inline-block px-8 py-4 bg-[#0D0B0A] text-[#F9F5EE] rounded-[2px] font-semibold text-xs tracking-widest uppercase hover:bg-[#C9A84C] transition-all">
            Browse All Weaves
          </Link>
        </div>
      </motion.div>
    );
  }

  return (
    <>
      {/* ── DESKTOP LAYOUT (lg+) ── */}
      <div className="hidden lg:block">
        <ProductDetailDesktop ctx={ctx} />
      </div>

      {/* ── MOBILE / TABLET LAYOUT (<lg) ── */}
      <div className="lg:hidden">
      <Helmet>
        <title>{`${product.name} - Odisha Handloom Heritage | TANVO`}</title>
        <meta name="description" content={product.shortDescription || product.description.slice(0, 160)} />
        <meta property="og:title" content={`${product.name} | TANVO`} />
        <meta property="og:description" content={product.shortDescription || product.description.slice(0, 160)} />
        <meta property="og:image" content={product.images[0]?.url} />
        <meta property="og:type" content="product" />
        <script type="application/ld+json">
          {JSON.stringify({
            "@context": "https://schema.org/",
            "@type": "Product",
            "name": product.name,
            "image": product.images.map(img => img.url),
            "description": product.description,
            "sku": product._id,
            "brand": {
              "@type": "Brand",
              "name": "TANVO"
            },
            "offers": {
              "@type": "Offer",
              "url": window.location.href,
              "priceCurrency": "INR",
              "price": product.price,
              "availability": product.stock > 0 ? "https://schema.org/InStock" : "https://schema.org/OutOfStock",
              "itemCondition": "https://schema.org/NewCondition"
            }
          })}
        </script>
      </Helmet>

      <div className="min-h-screen bg-[#F9F5EE]">
      {/* Textile overlay */}
      <div
        className="fixed inset-0 pointer-events-none z-0"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='40' height='40' viewBox='0 0 40 40' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M0 0h40v2H0V0zm0 4h40v2H0V4zm0 4h40v2H0V8zm0 4h40v2H0v-2zm0 4h40v2H0v-2zm0 4h40v2H0v-2zm0 4h40v2H0v-2zm0 4h40v2H0v-2zm0 4h40v2H0v-2zm0 4h40v2H0v-2z' fill='%230D0B0A' fill-opacity='0.02' fill-rule='evenodd'/%3E%3C/svg%3E")`,
          opacity: 0.5,
        }}
      />

      {/* Back to Top Button */}
      <AnimatePresence>
        {showBackToTop && (
          <motion.button
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.8 }}
            onClick={scrollToTop}
            className="fixed bottom-24 right-4 z-50 p-3 bg-[#0D0B0A] text-[#F9F5EE] rounded-[2px] shadow-lg hover:bg-[#C9A84C] transition-colors"
          >
            <ChevronUp size={20} />
          </motion.button>
        )}
      </AnimatePresence>

      {/* Fullscreen Gallery */}
      <AnimatePresence>
        {isFullscreenGallery && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-[#0D0B0A]/95 backdrop-blur-lg flex items-center justify-center"
            onClick={() => setIsFullscreenGallery(false)}
          >
            <button
              className="absolute top-4 right-4 text-[#F9F5EE] hover:text-[#C9A84C] z-10"
              onClick={() => setIsFullscreenGallery(false)}
            >
              <X size={32} />
            </button>

            <div className="relative w-full max-w-4xl mx-4">
              <img
                src={product.images[selectedImage]?.url}
                alt={product.name}
                className="w-full h-auto max-h-[80vh] object-contain"
              />

              {/* Navigation Arrows */}
              {product.images.length > 1 && (
                <>
                  <button
                    className="absolute left-4 top-1/2 transform -translate-y-1/2 p-2 bg-[#F9F5EE]/20 backdrop-blur-sm rounded-[2px] hover:bg-[#C9A84C] transition-colors"
                    onClick={(e) => {
                      e.stopPropagation();
                      setSelectedImage(prev => prev > 0 ? prev - 1 : product.images.length - 1);
                    }}
                  >
                    <ChevronLeft className="text-[#F9F5EE]" size={24} />
                  </button>

                  <button
                    className="absolute right-4 top-1/2 transform -translate-y-1/2 p-2 bg-[#F9F5EE]/20 backdrop-blur-sm rounded-[2px] hover:bg-[#C9A84C] transition-colors"
                    onClick={(e) => {
                      e.stopPropagation();
                      setSelectedImage(prev => prev < product.images.length - 1 ? prev + 1 : 0);
                    }}
                  >
                    <ChevronRight className="text-[#F9F5EE]" size={24} />
                  </button>
                </>
              )}

              {/* Image counter */}
              <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 bg-[#0D0B0A] text-[#F9F5EE] text-xs px-3 py-1.5 rounded-[2px]">
                {selectedImage + 1} / {product.images.length}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Auth Message Modal */}
      <AnimatePresence>
        {showAuthMessage && (
          <div className="fixed inset-0 z-[60] flex items-center justify-center p-4 sm:p-6">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="absolute inset-0 bg-[#0D0B0A]/60 backdrop-blur-sm"
              onClick={() => setShowAuthMessage(false)}
            />
            <motion.div
              initial={{ scale: 0.9, opacity: 0, y: 20 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.9, opacity: 0, y: 20 }}
              className="relative bg-[#F9F5EE] max-w-md w-full p-8 rounded-[4px] shadow-2xl border border-[#0D0B0A]/10 text-center font-sans"
            >
              <div className="w-12 h-12 bg-[#C9A84C]/10 rounded-[2px] flex items-center justify-center mx-auto mb-6 text-[#C9A84C]">
                <Lock className="w-6 h-6" />
              </div>
              <h2 className="text-xl font-display font-medium text-[#0D0B0A] mb-3">
                Collector Account Required
              </h2>
              <p className="text-[#0D0B0A]/70 text-sm mb-6 leading-relaxed">
                To purchase this handwoven masterpiece, please sign in or register your collector profile.
              </p>
              <div className="flex flex-col gap-3">
                <Link
                  to={`/auth?redirect=${encodeURIComponent(window.location.pathname + window.location.search)}`}
                  className="w-full py-3.5 bg-[#0D0B0A] text-[#F9F5EE] font-semibold text-xs tracking-widest uppercase rounded-[2px] hover:bg-[#C9A84C] transition-all border border-[#0D0B0A] hover:border-[#C9A84C] shadow-lg shadow-[#0D0B0A]/10"
                >
                  Sign In / Register
                </Link>
                <button
                  onClick={() => setShowAuthMessage(false)}
                  className="w-full py-3 text-xs font-semibold tracking-wider text-[#0D0B0A]/60 uppercase hover:text-[#0D0B0A] transition-colors"
                >
                  Continue Browsing
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8 pt-32 max-w-7xl relative z-10">
        {/* Breadcrumb */}
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="flex items-center gap-2 text-[11px] font-semibold tracking-wider uppercase font-sans mb-6 overflow-x-auto pb-2 scrollbar-hide text-[#0D0B0A]/60"
        >
          <Link to="/" className="hover:text-[#C9A84C] whitespace-nowrap">Home</Link>
          <span>/</span>
          <Link to="/shop" className="hover:text-[#C9A84C] whitespace-nowrap">Shop</Link>
          <span>/</span>
          <Link to={`/shop?category=${product.category}`} className="hover:text-[#C9A84C] whitespace-nowrap">{product.category}</Link>
          <span>/</span>
          <span className="font-semibold text-[#0D0B0A] truncate">
            {product.name}
          </span>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 lg:gap-12 xl:gap-16">
          {/* Left Column - Images */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            className="space-y-4"
          >
            {/* Main Image */}
            <div
              {...swipeHandlers}
              className="relative aspect-[4/5] bg-white rounded-[4px] overflow-hidden group cursor-zoom-in border border-[#0D0B0A]/10"
              onClick={() => setIsFullscreenGallery(true)}
            >
              <motion.img
                key={selectedImage}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.3 }}
                src={product.images[selectedImage]?.url}
                alt={product.name}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
              />

              {/* Luxury Story Badges */}
              <div className="absolute top-3 left-3 sm:top-4 sm:left-4 flex flex-col gap-1.5 font-sans z-10">
                <motion.span
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  className="px-2.5 py-1 bg-[#0D0B0A] text-[#F9F5EE] text-[9px] font-semibold tracking-widest uppercase rounded-[2px] shadow-sm border border-[#C9A84C]/30"
                >
                  HANDWOVEN
                </motion.span>
                <motion.span
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.1 }}
                  className="px-2.5 py-1 bg-[#F9F5EE] text-[#0D0B0A] text-[9px] font-semibold tracking-widest uppercase rounded-[2px] shadow-sm border border-[#0D0B0A]/10"
                >
                  ARTISAN VERIFIED
                </motion.span>
                {(product.isBestSeller || product.stock <= 3) && (
                  <motion.span
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.2 }}
                    className="px-2.5 py-1 bg-[#C9A84C] text-[#0D0B0A] text-[9px] font-semibold tracking-widest uppercase rounded-[2px] shadow-sm"
                  >
                    LIMITED PIECE
                  </motion.span>
                )}
              </div>

              {/* Wishlist & Share */}
              <div className="absolute top-3 right-3 sm:top-4 sm:right-4 flex flex-col gap-2 z-10">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={(e) => {
                    e.stopPropagation();
                    toggleWishlist(product._id);
                  }}
                  className={`p-2.5 rounded-[2px] shadow-md transition-all duration-300 ${isWishlisted
                    ? 'bg-[#0D0B0A] text-[#F9F5EE]'
                    : 'bg-white text-[#0D0B0A] hover:text-[#C9A84C]'
                    }`}
                >
                  <Heart size={isMobile ? 18 : 20} fill={isWishlisted ? "currentColor" : "none"} />
                </motion.button>

                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={(e) => {
                    e.stopPropagation();
                    setShowShareMenu(!showShareMenu);
                  }}
                  className="p-2.5 bg-white text-[#0D0B0A] rounded-[2px] shadow-md hover:text-[#C9A84C] transition-all duration-300 relative"
                >
                  <Share2 size={isMobile ? 18 : 20} />

                  <AnimatePresence>
                    {showShareMenu && (
                      <motion.div
                        initial={{ opacity: 0, y: -10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -10 }}
                        className="absolute top-12 right-0 rounded-[2px] shadow-2xl p-4 w-48 z-20 bg-white border border-[#0D0B0A]/10 text-left"
                        onClick={(e) => e.stopPropagation()}
                      >
                        <p className="text-xs font-semibold tracking-wider uppercase mb-3 text-[#0D0B0A]">
                          Share Piece
                        </p>
                        <div className="space-y-1.5 font-sans">
                          {[
                            { name: 'WhatsApp', icon: '📱', color: '#25D366' },
                            { name: 'Facebook', icon: '📘', color: '#1877F2' },
                            { name: 'Pinterest', icon: '📌', color: '#E60023' },
                            { name: 'Email', icon: '✉️', color: '#0D0B0A' }
                          ].map((platform) => (
                            <button
                              key={platform.name}
                              onClick={() => handleShare(platform.name)}
                              className="w-full flex items-center gap-3 px-2 py-1.5 text-xs rounded-[2px] hover:bg-[#F9F5EE] text-[#0D0B0A] transition-colors"
                            >
                              <span>{platform.icon}</span>
                              <span className="font-medium">{platform.name}</span>
                            </button>
                          ))}
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </motion.button>
              </div>

              {/* Image Counter (Mobile) */}
              <div className="absolute bottom-3 left-1/2 transform -translate-x-1/2 bg-[#0D0B0A]/85 backdrop-blur-sm text-[#F9F5EE] text-[10px] font-semibold tracking-widest uppercase px-3 py-1.5 rounded-[2px] lg:hidden">
                {selectedImage + 1} / {product.images.length}
              </div>

              {/* Zoom Indicator (Desktop) */}
              <div className="absolute bottom-4 right-4 bg-[#0D0B0A]/85 backdrop-blur-sm text-[#F9F5EE] text-[10px] font-semibold tracking-widest uppercase px-3 py-1.5 rounded-[2px] hidden lg:block">
                <span className="flex items-center gap-1.5">
                  <Search size={12} className="text-[#C9A84C]" /> Click to Inspect
                </span>
              </div>
            </div>

            {/* Thumbnails */}
            {product.images.length > 1 && (
              <div className="grid grid-cols-5 gap-2 overflow-x-auto pb-2">
                {product.images.map((img, index) => (
                  <motion.button
                    key={index}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => setSelectedImage(index)}
                    className={`aspect-square rounded-[2px] overflow-hidden border transition-all duration-300 ${selectedImage === index
                      ? 'border-[#C9A84C] ring-1 ring-[#C9A84C] shadow-md scale-105'
                      : 'border-transparent hover:border-[#0D0B0A]'
                      }`}
                  >
                    <img
                      src={img.url}
                      alt={`${product.name} - View ${index + 1}`}
                      className="w-full h-full object-cover"
                    />
                  </motion.button>
                ))}
              </div>
            )}
          </motion.div>

          {/* Right Column - Product Info */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            className="space-y-5 sm:space-y-6 lg:space-y-8"
          >
            {/* Title & Rating */}
            <div>
              <div className="text-[11px] font-bold tracking-widest text-[#C9A84C] uppercase mb-1 font-sans">
                {product.weave}
              </div>

              <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-display font-medium mb-3 text-[#0D0B0A] leading-tight">
                {product.name}
              </h1>

              {/* Rating */}
              <div className="flex items-center gap-3 text-xs mb-4">
                <div className="flex items-center gap-0.5">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      size={14}
                      className={`${i < Math.floor(product.ratings)
                        ? 'text-[#C9A84C] fill-current'
                        : 'text-[#0D0B0A]/10'
                        }`}
                    />
                  ))}
                </div>
                <span className="text-[#0D0B0A]/70 font-sans">
                  {product.ratings.toFixed(1)} <span className="mx-1">|</span> {product.numReviews} collectors
                </span>
              </div>
              
              {/* Origin tag */}
              <div className="flex items-center gap-1.5 text-xs text-[#0D0B0A]/60 font-sans mb-1">
                <MapPin size={12} className="text-[#C9A84C]" />
                <span>Handwoven in {product.weaverInfo?.location || 'Odisha, India'}</span>
              </div>
            </div>

            {/* Price Box */}
            <div className="py-4 border-y border-[#0D0B0A]/10 space-y-3 font-sans">
              <div className="flex items-baseline gap-3">
                <span className="text-2xl sm:text-3xl font-medium text-[#0D0B0A]">
                  ₹{product.price.toLocaleString()}
                </span>
                {product.originalPrice && (
                  <span className="text-sm sm:text-base line-through text-[#0D0B0A]/40">
                    ₹{product.originalPrice.toLocaleString()}
                  </span>
                )}
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 pt-1">
                {[
                  'Artisan verified',
                  'Handloom authenticity',
                  'Free insured delivery'
                ].map((item, idx) => (
                  <div key={idx} className="flex items-center gap-1.5 text-[11px] text-[#0D0B0A]/70 uppercase tracking-wide font-semibold">
                    <Check size={12} className="text-[#C9A84C]" />
                    <span>{item}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* TANVO Authenticity Promise */}
            <div className="p-5 rounded-[4px] border border-[#0D0B0A]/10 bg-white/70 backdrop-blur-sm shadow-sm space-y-4">
              <div className="flex items-center gap-2 border-b border-[#0D0B0A]/10 pb-2">
                <Award className="w-5 h-5 text-[#C9A84C]" />
                <h3 className="font-display font-medium text-base text-[#0D0B0A]">
                  TANVO Authenticity Promise
                </h3>
              </div>
              <div className="grid grid-cols-2 gap-3 text-[11px] font-sans">
                <div className="flex items-center gap-2 text-[#0D0B0A]/80 font-medium">
                  <div className="w-1.5 h-1.5 rounded-full bg-[#C9A84C]"></div>
                  <span>Handloom Certified</span>
                </div>
                <div className="flex items-center gap-2 text-[#0D0B0A]/80 font-medium">
                  <div className="w-1.5 h-1.5 rounded-full bg-[#C9A84C]"></div>
                  <span>Artisan Verified</span>
                </div>
                <div className="flex items-center gap-2 text-[#0D0B0A]/80 font-medium">
                  <div className="w-1.5 h-1.5 rounded-full bg-[#C9A84C]"></div>
                  <span>Fabric: {product.fabric}</span>
                </div>
                <div className="flex items-center gap-2 text-[#0D0B0A]/80 font-medium">
                  <div className="w-1.5 h-1.5 rounded-full bg-[#C9A84C]"></div>
                  <span>Weave: {product.weave}</span>
                </div>
              </div>
              <p className="text-xs text-[#0D0B0A]/70 italic leading-relaxed pt-1 font-serif">
                "We guarantee this saree is a genuine hand-spun, hand-woven Indian masterpiece. We work directly with artisan families, paying fair wages and ensuring their ancestral craft lives on."
              </p>
            </div>

            {/* Craft Details Box */}
            <div className="p-5 rounded-[4px] border border-[#0D0B0A]/10 bg-[#F9F5EE]/40 space-y-4 font-sans">
              <h3 className="text-[10px] font-bold tracking-widest text-[#0D0B0A] uppercase">
                CRAFT DETAILS
              </h3>
              <div className="grid grid-cols-2 gap-y-3 gap-x-4 text-xs">
                <div>
                  <span className="text-[#0D0B0A]/50 block text-[10px] tracking-wider uppercase font-semibold">Weave</span>
                  <span className="font-semibold text-[#0D0B0A]">{product.weave}</span>
                </div>
                <div>
                  <span className="text-[#0D0B0A]/50 block text-[10px] tracking-wider uppercase font-semibold">Fabric</span>
                  <span className="font-semibold text-[#0D0B0A]">{product.fabric}</span>
                </div>
                <div>
                  <span className="text-[#0D0B0A]/50 block text-[10px] tracking-wider uppercase font-semibold">Origin</span>
                  <span className="font-semibold text-[#0D0B0A]">{product.weaverInfo?.location || 'Odisha, India'}</span>
                </div>
                <div>
                  <span className="text-[#0D0B0A]/50 block text-[10px] tracking-wider uppercase font-semibold">Craft Time</span>
                  <span className="font-semibold text-[#0D0B0A]">{getCraftTime()}</span>
                </div>
              </div>
            </div>

            {/* Stock Status */}
            <div className="flex items-center gap-2 font-sans text-xs">
              <div className={`w-2.5 h-2.5 rounded-full ${product.stock > 5 ? 'bg-green-600' : 'bg-[#C9A84C]'
                } animate-pulse`}></div>
              <span className="font-semibold uppercase tracking-wider text-[#0D0B0A]/85">
                {product.stock > 5
                  ? 'Ready for dispatch'
                  : product.stock > 0
                    ? `Only ${product.stock} pieces left in archive`
                    : 'Out of Stock'
                }
              </span>
            </div>

            {/* Weaver Story Card */}
            {product.weaverInfo && (
              <motion.div
                whileHover={{ scale: 1.01 }}
                className="p-5 rounded-[4px] border border-[#C9A84C]/20 bg-gradient-to-r from-[#C9A84C]/5 to-transparent space-y-3"
              >
                <div className="flex items-start justify-between font-sans">
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 bg-[#0D0B0A] text-[#F9F5EE] rounded-full flex items-center justify-center font-display font-medium text-lg shadow-inner">
                      {product.weaverInfo.name.charAt(0)}
                    </div>
                    <div>
                      <h4 className="font-display font-medium text-base text-[#0D0B0A]">
                        {product.weaverInfo.name}
                      </h4>
                      <p className="text-xs text-[#0D0B0A]/60">
                        {product.weaverInfo.location} • {product.weaverInfo.generation} Weaver
                      </p>
                    </div>
                  </div>
                  <span className="px-2.5 py-1 text-[10px] font-semibold tracking-wider uppercase rounded-[2px] bg-[#C9A84C]/15 text-[#C9A84C]">
                    Heritage Master
                  </span>
                </div>
                <p className="text-xs text-[#0D0B0A]/80 leading-relaxed font-sans">
                  {product.weaverInfo.story || `This saree was hand-guided on a traditional pit loom by ${product.weaverInfo.name}, preserving the heritage weave legacy of ${product.weaverInfo.location}.`}
                </p>
                <div className="pt-1 flex justify-end font-sans">
                  <Link to={`/weavers/${encodeURIComponent(product.weaverInfo.name)}`} className="text-xs font-bold text-[#C9A84C] hover:text-[#0D0B0A] transition-colors uppercase tracking-widest">
                    Meet the Weaver →
                  </Link>
                </div>
              </motion.div>
            )}

            {/* Color Selection */}
            {product.colors && product.colors.length > 0 && (
              <div className="space-y-3 font-sans">
                <p className="text-xs font-semibold uppercase tracking-wider text-[#0D0B0A]">
                  Color: <span className="font-bold text-[#C9A84C] ml-1">
                    {selectedColor || 'Select'}
                  </span>
                </p>
                <div className="flex flex-wrap gap-2.5">
                  {product.colors.map((color: string) => (
                    <motion.button
                      key={color}
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={() => setSelectedColor(color)}
                      className="group relative"
                    >
                      <div className={`w-8 h-8 rounded-[4px] border transition-all duration-300 ${selectedColor === color
                        ? 'border-[#C9A84C] ring-1 ring-[#C9A84C]'
                        : 'border-[#0D0B0A]/20 hover:border-[#C9A84C]'
                        }`}>
                        <div
                          className="w-full h-full rounded-[2px]"
                          style={{
                            backgroundColor: color.toLowerCase()
                          }}
                        />
                      </div>
                      <span className="absolute -bottom-6 left-1/2 transform -translate-x-1/2 text-[9px] whitespace-nowrap text-[#0D0B0A]/70 opacity-0 group-hover:opacity-100 transition-opacity duration-300 uppercase tracking-widest font-semibold">
                        {color}
                      </span>
                    </motion.button>
                  ))}
                </div>
              </div>
            )}

            {/* Size Selection */}
            {product.sizes && product.sizes.length > 0 && (
              <div className="space-y-3 font-sans">
                <p className="text-xs font-semibold uppercase tracking-wider text-[#0D0B0A]">
                  Size: <span className="font-bold text-[#C9A84C] ml-1">
                    {selectedSize || 'Select'}
                  </span>
                </p>
                <div className="flex flex-wrap gap-2.5">
                  {product.sizes.map((size: string) => (
                    <motion.button
                      key={size}
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      onClick={() => setSelectedSize(size)}
                      className={`px-4 py-2 rounded-[2px] border text-xs font-semibold tracking-wider uppercase transition-all duration-300 ${selectedSize === size
                        ? 'border-[#0D0B0A] bg-[#0D0B0A] text-[#F9F5EE]'
                        : 'border-[#0D0B0A]/20 hover:border-[#C9A84C] text-[#0D0B0A]'
                        }`}
                    >
                      {size}
                    </motion.button>
                  ))}
                </div>
              </div>
            )}

            {/* Heirloom Narrative & Wear Moments */}
            <div className="space-y-4 border-t border-[#0D0B0A]/10 pt-4">
              <div className="space-y-1">
                <h4 className="text-[10px] font-bold tracking-widest text-[#C9A84C] uppercase font-sans">
                  The Heirloom Value
                </h4>
                <p className="text-xs text-[#0D0B0A]/80 leading-relaxed font-serif italic">
                  A rare piece from Odisha's weaving tradition. Each thread is tied, dyed, and woven by hand, creating a pattern that cannot be exactly repeated.
                </p>
              </div>

              <div className="space-y-1.5">
                <h4 className="text-[10px] font-bold tracking-widest text-[#0D0B0A]/50 uppercase font-sans">
                  Perfect For
                </h4>
                <div className="flex flex-wrap gap-2 pt-1 font-sans">
                  {['Wedding Ceremonies', 'Festive Celebrations', 'Heritage Receptions', 'Thoughtful Gifting'].map((occ) => (
                    <span key={occ} className="px-2.5 py-1 bg-[#0D0B0A]/5 text-[#0D0B0A]/80 text-[10px] font-semibold tracking-wider uppercase rounded-[2px]">
                      {occ}
                    </span>
                  ))}
                </div>
              </div>
            </div>

            {/* Quantity & Add to Cart */}
            <div className="space-y-4 font-sans pt-2">
              <div className="flex items-center gap-4">
                <span className="text-xs font-semibold text-[#0D0B0A] uppercase tracking-wider">
                  Quantity:
                </span>
                <div className="flex items-center border border-[#0D0B0A]/20 rounded-[2px] bg-white overflow-hidden">
                  <button
                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                    className="w-10 h-10 flex items-center justify-center hover:bg-[#0D0B0A]/5 transition-colors"
                    disabled={quantity <= 1}
                  >
                    <Minus size={14} className={quantity <= 1 ? 'text-[#0D0B0A]/20' : 'text-[#0D0B0A]'} />
                  </button>
                  <span className="w-12 text-center font-medium text-[#0D0B0A]">
                    {quantity}
                  </span>
                  <button
                    onClick={() => setQuantity(Math.min(product.stock, quantity + 1))}
                    className="w-10 h-10 flex items-center justify-center hover:bg-[#0D0B0A]/5 transition-colors"
                    disabled={quantity >= product.stock}
                  >
                    <Plus size={14} className={quantity >= product.stock ? 'text-[#0D0B0A]/20' : 'text-[#0D0B0A]'} />
                  </button>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
                <motion.button
                  whileHover={{ scale: 1.01 }}
                  whileTap={{ scale: 0.99 }}
                  onClick={handleAddToCart}
                  disabled={product.stock === 0}
                  className="group py-4 font-semibold text-xs tracking-widest uppercase rounded-[2px] transition-all duration-300 flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed bg-white border border-[#0D0B0A] text-[#0D0B0A] hover:bg-[#0D0B0A] hover:text-[#F9F5EE]"
                >
                  <ShoppingBag size={14} />
                  Add to Bag
                </motion.button>
                <motion.button
                  whileHover={{ scale: 1.01 }}
                  whileTap={{ scale: 0.99 }}
                  onClick={handleBuyNow}
                  disabled={product.stock === 0}
                  className="py-4 bg-[#0D0B0A] text-[#F9F5EE] border border-[#0D0B0A] font-semibold text-xs tracking-widest uppercase rounded-[2px] hover:bg-[#C9A84C] hover:border-[#C9A84C] transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed shadow-sm"
                >
                  Buy It Now
                </motion.button>
              </div>
            </div>

            {/* Delivery Check */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="p-5 rounded-[4px] border border-[#0D0B0A]/10 bg-white"
            >
              <div className="flex items-center gap-2 mb-4 font-sans">
                <MapPin className="w-4 h-4 text-[#C9A84C]" />
                <h3 className="font-semibold text-xs tracking-wider text-[#0D0B0A] uppercase">
                  Check Delivery Serviceability
                </h3>
              </div>

              <div className="flex flex-col sm:flex-row gap-2 font-sans">
                <input
                  type="text"
                  value={pincode}
                  onChange={(e) => setPincode(e.target.value.replace(/\D/g, '').slice(0, 6))}
                  placeholder="Enter 6-digit PIN code"
                  className="flex-1 px-4 py-3 border border-[#0D0B0A]/20 rounded-[2px] focus:border-[#C9A84C] focus:ring-1 focus:ring-[#C9A84C] transition-all bg-white text-[#0D0B0A] placeholder-[#0D0B0A]/30 text-sm"
                />
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={handlePincodeCheck}
                  className="px-6 py-3 bg-[#0D0B0A] text-[#F9F5EE] font-semibold text-xs tracking-widest uppercase rounded-[2px] hover:bg-[#C9A84C] transition-all"
                >
                  Check
                </motion.button>
              </div>

              <AnimatePresence>
                {deliveryCheck && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: 'auto' }}
                    exit={{ opacity: 0, height: 0 }}
                    className={`mt-4 p-4 rounded-[2px] font-sans text-xs ${deliveryCheck.available
                      ? 'bg-green-50/50 text-green-800 border border-green-200'
                      : 'bg-orange-50/50 text-orange-850 border border-orange-200'
                      }`}
                  >
                    <div className="flex items-start gap-3">
                      <Truck className="w-4 h-4 shrink-0 mt-0.5" />
                      <div>
                        {deliveryCheck.available ? (
                          <>
                            <p className="font-semibold">Serviceable. Delivery estimated {deliveryCheck.date}.</p>
                            <p className="text-[10px] opacity-80 mt-0.5">Free fully-insured shipping on orders above ₹5,000.</p>
                          </>
                        ) : (
                          <>
                            <p className="font-semibold">Delivery unavailable at this PIN code.</p>
                            <p className="text-[10px] opacity-80 mt-0.5">Please contact concierge support for alternate options.</p>
                          </>
                        )}
                      </div>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>

            {/* Trust Badges */}
            <div className="grid grid-cols-3 gap-3 p-4 sm:p-5 rounded-[4px] border border-[#0D0B0A]/10 bg-white font-sans">
              <div className="text-center">
                <Shield className="w-5 h-5 mx-auto mb-2 text-[#C9A84C]" />
                <p className="text-[10px] font-semibold tracking-wider uppercase text-[#0D0B0A]">
                  Certified Pure
                </p>
              </div>
              <div className="text-center">
                <Lock className="w-5 h-5 mx-auto mb-2 text-[#C9A84C]" />
                <p className="text-[10px] font-semibold tracking-wider uppercase text-[#0D0B0A]">
                  Secure Curation
                </p>
              </div>
              <div className="text-center">
                <Users className="w-5 h-5 mx-auto mb-2 text-[#C9A84C]" />
                <p className="text-[10px] font-semibold tracking-wider uppercase text-[#0D0B0A]">
                  Artisan Direct
                </p>
              </div>
            </div>

            {/* Concierge & Support Quick Actions */}
            <div className="grid grid-cols-2 gap-3 font-sans">
              <motion.button
                whileHover={{ scale: 1.01 }}
                whileTap={{ scale: 0.99 }}
                className="flex items-center justify-center gap-2 py-3 border border-[#0D0B0A]/10 rounded-[2px] text-[#0D0B0A] hover:border-[#C9A84C] hover:bg-[#C9A84C]/5 transition-all bg-white text-xs font-semibold tracking-wider uppercase"
              >
                <MessageCircle className="w-4 h-4 text-[#C9A84C]" />
                <span>Chat Concierge</span>
              </motion.button>
              <motion.button
                whileHover={{ scale: 1.01 }}
                whileTap={{ scale: 0.99 }}
                className="flex items-center justify-center gap-2 py-3 border border-[#0D0B0A]/10 rounded-[2px] text-[#0D0B0A] hover:border-[#0D0B0A] hover:bg-[#0D0B0A]/5 transition-all bg-white text-xs font-semibold tracking-wider uppercase"
              >
                <RotateCcw className="w-4 h-4 text-[#C9A84C]" />
                <span>7-Day Return Rule</span>
              </motion.button>
            </div>

            {/* Heritage Details Accordion */}
            <ProductHeritageAccordion product={product} />
          </motion.div>
        </div>

        {/* Tabs Section */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="mt-12 sm:mt-16 lg:mt-20 font-sans"
        >
          {/* Desktop Tabs */}
          <div className="border-b border-[#0D0B0A]/10">
            <div className="flex gap-8 overflow-x-auto pb-1">
              {[
                { id: 'description', label: 'Description' },
                { id: 'specifications', label: 'Specifications' },
                { id: 'care', label: 'Care Instructions' },
                { id: 'reviews', label: `Reviews (${product.numReviews})` }
              ].map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`pb-4 px-2 font-medium text-sm transition-all duration-300 relative whitespace-nowrap ${activeTab === tab.id
                    ? 'text-[#0D0B0A] font-semibold'
                    : 'text-[#0D0B0A]/50 hover:text-[#0D0B0A]'
                    }`}
                >
                  {tab.label}
                  {activeTab === tab.id && (
                    <motion.div
                      layoutId="activeTab"
                      className="absolute bottom-0 left-0 w-full h-0.5 bg-[#C9A84C]"
                    />
                  )}
                </button>
              ))}
            </div>
          </div>

          <div className="py-8">
            <AnimatePresence mode="wait">
              <motion.div
                key={activeTab}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.3 }}
              >
                {activeTab === 'description' && (
                  <div className="prose max-w-none">
                    <p className="leading-relaxed text-sm sm:text-base text-[#0D0B0A]/85 font-serif">
                      {product.description}
                    </p>
                    {product.tags && product.tags.length > 0 && (
                      <div className="mt-6 flex flex-wrap gap-2">
                        {product.tags.map(tag => (
                          <span key={tag} className="px-3 py-1 bg-[#0D0B0A]/5 text-[#0D0B0A]/85 text-xs rounded-[2px] font-sans font-medium">
                            #{tag}
                          </span>
                        ))}
                      </div>
                    )}
                    <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div className="p-6 rounded-[4px] bg-white border border-[#0D0B0A]/10">
                        <h4 className="font-display font-medium text-base mb-3 text-[#0D0B0A]">
                          Weaving Technique
                        </h4>
                        <p className="text-xs sm:text-sm text-[#0D0B0A]/70 leading-relaxed font-sans">
                          Handwoven using traditional {product.weave} technique, passed down through generations of master weavers.
                        </p>
                      </div>
                      <div className="p-6 rounded-[4px] bg-white border border-[#0D0B0A]/10">
                        <h4 className="font-display font-medium text-base mb-3 text-[#0D0B0A]">
                          Design Inspiration
                        </h4>
                        <p className="text-xs sm:text-sm text-[#0D0B0A]/70 leading-relaxed font-sans">
                          Inspired by ancient temple motifs and traditional patterns, each piece tells a unique story.
                        </p>
                      </div>
                    </div>
                  </div>
                )}

                {activeTab === 'specifications' && (
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-8 text-sm">
                    <div className="space-y-4">
                      <h3 className="font-display font-medium text-lg text-[#0D0B0A]">
                        Product Details
                      </h3>
                      <div className="space-y-3 font-sans">
                        {[
                          { label: 'Fabric', value: product.fabric },
                          { label: 'Weave Type', value: product.weave },
                          { label: 'Length', value: product.length || '6.3 Meters' },
                          { label: 'Blouse Piece', value: product.blousePiece ? 'Included' : 'Separate' },
                          { label: 'Category', value: product.category },
                          { label: 'Sub Category', value: product.subCategory },
                          { label: 'Border', value: 'Traditional temple design' },
                          { label: 'Pallu', value: 'Intricate ikat pattern' },
                          { label: 'Weight', value: 'Approx. 450-500 gms' },
                          { label: 'Country', value: 'India (Odisha)' }
                        ].map((item, idx) => (
                          <div key={idx} className="flex justify-between py-2 border-b border-[#0D0B0A]/10">
                            <span className="text-[#0D0B0A]/60">
                              {item.label}
                            </span>
                            <span className="font-semibold text-[#0D0B0A]">
                              {item.value}
                            </span>
                          </div>
                        ))}
                      </div>
                    </div>
                    <div className="space-y-4 font-sans">
                      <h3 className="font-display font-medium text-lg text-[#0D0B0A]">
                        Shipping Info
                      </h3>
                      <div className="space-y-3">
                        {[
                          { icon: Truck, text: 'Free shipping on orders above ₹5,000' },
                          { icon: Clock, text: 'Delivery in 3-5 business days' },
                          { icon: RotateCcw, text: '7-day easy returns' },
                          { icon: Shield, text: '100% authentic handloom guarantee' }
                        ].map((item, idx) => (
                          <div key={idx} className="flex items-start gap-3">
                            <item.icon className="w-4 h-4 shrink-0 text-[#C9A84C] mt-0.5" />
                            <span className="text-[#0D0B0A]/70 text-sm">
                              {item.text}
                            </span>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                )}

                {activeTab === 'care' && (
                  <div className="max-w-3xl font-sans">
                    <div className="p-8 rounded-[4px] border border-[#0D0B0A]/10 bg-white">
                      <h3 className="font-display font-medium text-lg mb-6 flex items-center gap-2 text-[#0D0B0A]">
                        <Leaf className="w-5 h-5 text-[#C9A84C]" />
                        Care Instructions
                      </h3>
                      <p className="mb-6 text-sm text-[#0D0B0A]/80 leading-relaxed font-sans">
                        {product.careInstructions || 'Dry clean only for first wash. Store in muslin cloth. Keep away from direct sunlight.'}
                      </p>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-sm font-sans">
                        {[
                          'Dry clean only for first wash',
                          'Store in muslin cloth',
                          'Keep away from direct sunlight',
                          'Do not use bleach',
                          'Iron while slightly damp',
                          'Use neem leaves to prevent pests'
                        ].map((tip, idx) => (
                          <div key={idx} className="flex items-start gap-2">
                            <Check className="w-4 h-4 text-[#C9A84C] shrink-0 mt-0.5" />
                            <span className="text-[#0D0B0A]/70">
                              {tip}
                            </span>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                )}

                {activeTab === 'reviews' && (
                  <div className="space-y-8 font-sans">
                    {/* Rating Summary */}
                    <div className="flex flex-col sm:flex-row items-start gap-8">
                      <div className="text-center sm:text-left">
                        <div className="text-5xl sm:text-6xl font-display font-semibold text-[#0D0B0A]">
                          {product.ratings.toFixed(1)}
                        </div>
                        <div className="flex items-center gap-1 mt-2 justify-center sm:justify-start">
                          {[...Array(5)].map((_, i) => (
                            <Star key={i} size={16} className={
                              i < Math.floor(product.ratings)
                                ? 'text-[#C9A84C] fill-current'
                                : 'text-[#0D0B0A]/15'
                            } />
                          ))}
                        </div>
                        <p className="text-xs mt-2 text-[#0D0B0A]/60">
                          Based on {product.numReviews} reviews
                        </p>
                      </div>

                      <div className="flex-1 w-full">
                        {[5, 4, 3, 2, 1].map((rating) => {
                          const percentage = Math.floor(Math.random() * 100);
                          return (
                            <div key={rating} className="flex items-center gap-3 mb-2">
                              <span className="text-xs w-8 text-[#0D0B0A]/60">
                                {rating} ★
                              </span>
                              <div className="flex-1 h-2 rounded-[2px] overflow-hidden bg-[#0D0B0A]/5">
                                <div
                                  className="h-full bg-gradient-to-r from-[#0D0B0A] to-[#C9A84C]"
                                  style={{ width: `${percentage}%` }}
                                />
                              </div>
                              <span className="text-xs text-[#0D0B0A]/50 w-8 text-right">
                                {percentage}%
                              </span>
                            </div>
                          );
                        })}
                      </div>

                      {isAuthenticated ? (
                        <motion.button
                          whileHover={{ scale: 1.02 }}
                          whileTap={{ scale: 0.98 }}
                          onClick={() => setShowReviewForm(!showReviewForm)}
                          className="px-6 py-3 bg-[#0D0B0A] text-[#F9F5EE] font-semibold text-xs tracking-widest uppercase rounded-[2px] hover:bg-[#C9A84C] transition-all whitespace-nowrap"
                        >
                          {showReviewForm ? 'Cancel' : 'Write a Review'}
                        </motion.button>
                      ) : (
                        <Link
                          to="/auth"
                          className="px-6 py-3 border border-[#0D0B0A] text-[#0D0B0A] font-semibold text-xs tracking-widest uppercase rounded-[2px] hover:bg-[#0D0B0A] hover:text-[#F9F5EE] transition-all whitespace-nowrap"
                        >
                          Sign in to write a review
                        </Link>
                      )}
                    </div>

                    <AnimatePresence>
                      {showReviewForm && (
                        <motion.form
                          initial={{ opacity: 0, height: 0 }}
                          animate={{ opacity: 1, height: 'auto' }}
                          exit={{ opacity: 0, height: 0 }}
                          onSubmit={handleReviewSubmit}
                          className="bg-white p-6 rounded-[4px] border border-[#0D0B0A]/10 space-y-4"
                        >
                          <h4 className="font-display font-medium text-lg text-[#0D0B0A]">
                            Write Your Review
                          </h4>
                          {reviewError && (
                            <div className="p-3 bg-red-50 text-red-700 border border-red-200 rounded-[2px] text-xs">
                              {reviewError}
                            </div>
                          )}
                          {reviewSuccess && (
                            <div className="p-3 bg-green-50 text-green-700 border border-green-200 rounded-[2px] text-xs">
                              Thank you! Your review has been submitted successfully.
                            </div>
                          )}
                          
                          <div className="space-y-2">
                            <label className="text-xs font-semibold tracking-wider uppercase text-[#0D0B0A] block">
                              Rating
                            </label>
                            <div className="flex gap-1">
                              {[1, 2, 3, 4, 5].map((star) => (
                                <button
                                  type="button"
                                  key={star}
                                  onClick={() => setNewRating(star)}
                                  className="text-[#C9A84C]"
                                >
                                  <Star
                                    size={24}
                                    fill={star <= newRating ? '#C9A84C' : 'none'}
                                  />
                                </button>
                              ))}
                            </div>
                          </div>

                          <div className="space-y-2">
                            <label htmlFor="review-title" className="text-xs font-semibold tracking-wider uppercase text-[#0D0B0A] block">
                              Review Summary
                            </label>
                            <input
                              id="review-title"
                              type="text"
                              value={newTitle}
                              onChange={(e) => setNewTitle(e.target.value)}
                              placeholder="e.g. Magnificent Drape and Luster"
                              className="w-full px-4 py-2 text-sm border border-[#0D0B0A]/20 rounded-[2px] bg-white text-[#0D0B0A]"
                            />
                          </div>

                          <div className="space-y-2">
                            <label htmlFor="review-comment" className="text-xs font-semibold tracking-wider uppercase text-[#0D0B0A] block">
                              Review Details *
                            </label>
                            <textarea
                              id="review-comment"
                              rows={4}
                              value={newComment}
                              onChange={(e) => setNewComment(e.target.value)}
                              placeholder="How is the texture, the weight, the weaving detail, and the drape?"
                              required
                              className="w-full px-4 py-2 text-sm border border-[#0D0B0A]/20 rounded-[2px] bg-white text-[#0D0B0A]"
                            />
                          </div>

                          <div className="flex gap-3">
                            <button
                              type="submit"
                              disabled={submittingReview}
                              className="px-6 py-3 bg-[#0D0B0A] text-[#F9F5EE] font-semibold text-xs tracking-widest uppercase rounded-[2px] hover:bg-[#C9A84C] transition-colors disabled:opacity-50"
                            >
                              {submittingReview ? 'Submitting...' : 'Submit Review'}
                            </button>
                            <button
                              type="button"
                              onClick={() => setShowReviewForm(false)}
                              className="px-6 py-3 border border-[#0D0B0A]/20 text-[#0D0B0A] font-semibold text-xs tracking-widest uppercase rounded-[2px] hover:bg-white hover:text-[#0D0B0A] transition-all"
                            >
                              Cancel
                            </button>
                          </div>
                        </motion.form>
                      )}
                    </AnimatePresence>

                    {/* Reviews List */}
                    {loadingReviews ? (
                      <div className="flex justify-center py-12">
                        <div className="relative">
                          <div className="w-10 h-10 border-2 border-[#0D0B0A] border-t-transparent rounded-full animate-spin"></div>
                          <div className="absolute inset-0 flex items-center justify-center">
                            <div className="w-1.5 h-1.5 bg-[#C9A84C] rounded-full"></div>
                          </div>
                        </div>
                      </div>
                    ) : reviews.length > 0 ? (
                      <div className="space-y-6">
                        {reviews.map((review, idx) => (
                          <motion.div
                            key={review._id}
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: idx * 0.1 }}
                            className="border border-[#0D0B0A]/10 rounded-[4px] p-6 hover:shadow-md transition-all bg-white"
                          >
                            <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-4 mb-4">
                              <div className="flex items-start gap-3">
                                <div className="w-10 h-10 bg-[#0D0B0A] rounded-full flex items-center justify-center text-[#F9F5EE] font-medium text-sm">
                                  {review.user.name.charAt(0)}
                                </div>
                                <div>
                                  <p className="font-semibold text-sm text-[#0D0B0A]">
                                    {review.user.name}
                                  </p>
                                  <div className="flex flex-wrap items-center gap-2 text-xs">
                                    <div className="flex">
                                      {[...Array(5)].map((_, i) => (
                                        <Star key={i} size={12} className={
                                          i < review.rating
                                            ? 'text-[#C9A84C] fill-current'
                                            : 'text-[#0D0B0A]/10'
                                        } />
                                      ))}
                                    </div>
                                    <span className="text-[10px] text-[#0D0B0A]/50 font-medium">
                                      {formatDate(review.createdAt)}
                                    </span>
                                    {review.isVerifiedPurchase && (
                                      <span className="text-[9px] bg-[#C9A84C]/10 text-[#C9A84C] border border-[#C9A84C]/20 px-2 py-0.5 rounded-[2px] uppercase font-semibold">
                                        Verified Buyer
                                      </span>
                                    )}
                                  </div>
                                </div>
                              </div>
                            </div>

                            {review.title && (
                              <h4 className="font-semibold text-sm text-[#0D0B0A] mb-2">{review.title}</h4>
                            )}

                            <p className="mb-4 text-xs sm:text-sm text-[#0D0B0A]/70 leading-relaxed font-sans">
                              {review.comment}
                            </p>

                            {review.images && review.images.length > 0 && (
                              <div className="flex gap-2 mb-4">
                                {review.images.map((img, imgIdx) => (
                                  <img key={imgIdx} src={img.url} alt="Collector Note Detail" className="w-16 h-16 object-cover rounded-[2px] cursor-pointer hover:opacity-80 transition-opacity" />
                                ))}
                              </div>
                            )}

                            <div className="flex items-center gap-4 text-xs font-sans">
                              <button className="flex items-center gap-1 text-[#0D0B0A]/60 hover:text-[#C9A84C] transition-colors font-medium">
                                <ThumbsUp size={12} />
                                <span>Helpful ({review.helpful?.length || 0})</span>
                              </button>
                              <button className="text-[#0D0B0A]/60 hover:text-[#C9A84C] transition-colors font-medium">
                                Report
                              </button>
                            </div>
                          </motion.div>
                        ))}
                      </div>
                    ) : (
                      <div className="text-center py-12 bg-white rounded-[4px] border border-[#0D0B0A]/10">
                        <p className="text-[#0D0B0A]/60 text-sm">No notes available yet. Be the first to share your notes on this piece!</p>
                      </div>
                    )}

                    {/* Load More */}
                    {hasMoreReviews && (
                      <div className="text-center">
                        <motion.button
                          whileHover={{ scale: 1.02 }}
                          whileTap={{ scale: 0.98 }}
                          onClick={handleLoadMoreReviews}
                          disabled={loadingReviews}
                          className="px-8 py-3 border border-[#0D0B0A] text-[#0D0B0A] font-semibold text-xs tracking-widest uppercase rounded-[2px] hover:bg-[#0D0B0A] hover:text-[#F9F5EE] transition-all disabled:opacity-50"
                        >
                          {loadingReviews ? 'Loading...' : 'Load More Notes'}
                        </motion.button>
                      </div>
                    )}
                  </div>
                )}
              </motion.div>
            </AnimatePresence>
          </div>
        </motion.div>

        {/* Complete The Heritage Collection */}
        {relatedProducts.length > 0 && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.6 }}
            className="mt-12 sm:mt-16 lg:mt-20 font-sans"
          >
            <h2 className="text-xl sm:text-2xl lg:text-3xl font-display font-medium mb-4 sm:mb-6 lg:mb-8 flex items-center gap-2 text-[#0D0B0A]">
              <Sparkles className="w-5 h-5 sm:w-6 sm:h-6 text-[#C9A84C]" />
              Complete The Heritage Collection
            </h2>

            <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4 lg:gap-6">
              {relatedProducts.map((product, idx) => (
                <motion.div
                  key={product._id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.7 + idx * 0.1 }}
                >
                  <Link to={`/product/${product._id}`} className="group block">
                    <div className="rounded-[4px] overflow-hidden shadow-sm hover:shadow-md hover:-translate-y-1 transition-all duration-500 border border-[#0D0B0A]/10 bg-white">
                      <div className="relative aspect-[3/4] overflow-hidden">
                        <img
                          src={product.images[0]?.url}
                          alt={product.name}
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                        />
                        {product.isBestSeller && (
                          <div className="absolute top-2 left-2 px-2 py-1 bg-[#0D0B0A] text-[#F9F5EE] text-[9px] font-semibold tracking-widest uppercase rounded-[2px] border border-[#C9A84C]/30 z-10">
                            ARCHIVED
                          </div>
                        )}
                      </div>
                      <div className="p-3 sm:p-4">
                        <div className="text-[10px] font-bold tracking-widest text-[#C9A84C] uppercase mb-1">
                          {product.weave}
                        </div>
                        <h3 className="font-serif text-sm group-hover:text-[#C9A84C] transition-colors line-clamp-2 mb-2 text-[#0D0B0A] min-h-[40px]">
                          {product.name}
                        </h3>
                        <div className="flex items-center gap-1 mb-2">
                          <Star size={10} className="text-[#C9A84C] fill-current" />
                          <span className="text-xs font-semibold text-[#0D0B0A]">
                            {product.ratings.toFixed(1)}
                          </span>
                          <span className="text-[10px] text-[#0D0B0A]/50">
                            ({product.numReviews})
                          </span>
                        </div>
                        <div className="flex items-center gap-2">
                          <span className="text-sm font-semibold text-[#0D0B0A]">
                            ₹{product.price.toLocaleString()}
                          </span>
                          {product.originalPrice && (
                            <span className="text-[10px] line-through text-[#0D0B0A]/40 font-medium">
                              ₹{product.originalPrice.toLocaleString()}
                            </span>
                          )}
                        </div>
                      </div>
                    </div>
                  </Link>
                </motion.div>
              ))}
            </div>
          </motion.div>
        )}
      </div>

      {/* Sticky Mobile Cart */}
      <AnimatePresence>
        {isMobile && isStickyCart && (
          <motion.div
            initial={{ y: 100 }}
            animate={{ y: 0 }}
            exit={{ y: 100 }}
            className="fixed bottom-0 left-0 right-0 p-4 border-t border-[#0D0B0A]/10 z-40 bg-white shadow-lg font-sans"
          >
            <div className="flex items-center justify-between gap-4">
              <div>
                <span className="text-lg font-bold text-[#0D0B0A]">
                  ₹{product.price.toLocaleString()}
                </span>
                <p className="text-[9px] text-[#0D0B0A]/60 tracking-wider uppercase font-semibold">
                  Handwoven • Secure Delivery
                </p>
              </div>
              <div className="flex gap-2">
                <button
                  onClick={() => toggleWishlist(product._id)}
                  className={`p-3 rounded-[2px] transition-all border ${isWishlisted
                    ? 'bg-[#0D0B0A] border-[#0D0B0A] text-[#F9F5EE]'
                    : 'bg-[#F9F5EE] border-[#0D0B0A]/20 text-[#0D0B0A]'
                    }`}
                >
                  <Heart size={18} fill={isWishlisted ? "currentColor" : "none"} />
                </button>
                <button
                  onClick={handleAddToCart}
                  className="px-6 py-3 bg-[#0D0B0A] text-[#F9F5EE] font-semibold text-xs tracking-widest uppercase rounded-[2px] hover:bg-[#C9A84C] transition-all"
                >
                  Add to Bag
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
    </div>{/* end lg:hidden mobile wrapper */}
    </>
  );
};

export default ProductDetail;