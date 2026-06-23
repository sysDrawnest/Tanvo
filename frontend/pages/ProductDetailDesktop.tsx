import React from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronUp, Star, Sparkles, Lock } from 'lucide-react';
import { useProductDetail } from '../hooks/useProductDetail';
import { DesktopGallery } from '../components/desktop/DesktopGallery';
import { DesktopPurchasePanel } from '../components/desktop/DesktopPurchasePanel';
import { DesktopWeaverStory } from '../components/desktop/DesktopWeaverStory';
import { DesktopHeritageAccordion } from '../components/desktop/DesktopHeritageAccordion';
import { DesktopTabs } from '../components/desktop/DesktopTabs';

interface Props {
  ctx: ReturnType<typeof useProductDetail>;
}

export const ProductDetailDesktop: React.FC<Props> = ({ ctx }) => {
  const {
    product, selectedImage, setSelectedImage,
    isWishlisted, toggleWishlist,
    showShareMenu, setShowShareMenu, handleShare,
    isFullscreenGallery, setIsFullscreenGallery,
    quantity, setQuantity,
    selectedColor, setSelectedColor,
    selectedSize, setSelectedSize,
    pincode, setPincode, deliveryCheck,
    handleAddToCart, handleBuyNow, handlePincodeCheck,
    getCraftTime,
    activeTab, setActiveTab,
    reviews, loadingReviews, hasMoreReviews, handleLoadMoreReviews,
    showReviewForm, setShowReviewForm,
    newRating, setNewRating, newTitle, setNewTitle, newComment, setNewComment,
    submittingReview, reviewError, reviewSuccess, handleReviewSubmit,
    isAuthenticated, formatDate,
    relatedProducts,
    showBackToTop, scrollToTop,
    showAuthMessage, setShowAuthMessage,
  } = ctx;

  if (!product) return null;

  return (
    <div className="min-h-screen bg-[#F9F5EE]">
      {/* Textile overlay */}
      <div
        className="fixed inset-0 pointer-events-none z-0 opacity-40"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='40' height='40' viewBox='0 0 40 40' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M0 0h40v2H0V0zm0 8h40v2H0V8zm0 8h40v2H0v-2zm0 8h40v2H0v-2zm0 8h40v2H0v-2z' fill='%230D0B0A' fill-opacity='0.018' fill-rule='evenodd'/%3E%3C/svg%3E")`,
        }}
      />

      {/* Back to top */}
      <AnimatePresence>
        {showBackToTop && (
          <motion.button
            initial={{ opacity: 0, scale: 0.8 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0.8 }}
            onClick={scrollToTop}
            className="fixed bottom-8 right-8 z-50 p-3 bg-[#0D0B0A] text-[#F9F5EE] rounded-[2px] shadow-lg hover:bg-[#C9A84C] hover:text-[#0D0B0A] transition-colors"
          >
            <ChevronUp size={18} />
          </motion.button>
        )}
      </AnimatePresence>

      {/* Auth modal */}
      <AnimatePresence>
        {showAuthMessage && (
          <div className="fixed inset-0 z-[60] flex items-center justify-center">
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="absolute inset-0 bg-[#0D0B0A]/60 backdrop-blur-sm" onClick={() => setShowAuthMessage(false)} />
            <motion.div initial={{ scale: 0.92, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} exit={{ scale: 0.92, opacity: 0 }} className="relative bg-[#F9F5EE] max-w-md w-full mx-8 p-10 rounded-[4px] shadow-2xl border border-[#0D0B0A]/10 text-center">
              <div className="w-14 h-14 bg-[#C9A84C]/10 rounded-[2px] flex items-center justify-center mx-auto mb-6 text-[#C9A84C]">
                <Lock size={24} />
              </div>
              <h2 className="text-2xl font-display font-medium text-[#0D0B0A] mb-3">Collector Account Required</h2>
              <p className="text-[#0D0B0A]/60 text-sm mb-8 leading-relaxed">To purchase this handwoven masterpiece, please sign in or create your collector profile.</p>
              <div className="flex flex-col gap-3">
                <Link to={`/auth?redirect=${encodeURIComponent(window.location.pathname)}`} className="w-full py-4 bg-[#780000] text-[#F9F5EE] font-semibold text-xs tracking-widest uppercase rounded-[3px] hover:bg-[#5a0000] transition-colors shadow-sm">
                  Sign In / Register
                </Link>
                <button onClick={() => setShowAuthMessage(false)} className="text-xs text-[#0D0B0A]/40 hover:text-[#0D0B0A] uppercase tracking-widest font-semibold transition-colors py-2">
                  Continue Browsing
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* ── HERO SECTION ── */}
      <div className="relative z-10">
        <div className="max-w-7xl mx-auto px-8 xl:px-16 pt-28 pb-16">
          {/* Breadcrumb */}
          <motion.div
            initial={{ opacity: 0, y: -8 }} animate={{ opacity: 1, y: 0 }}
            className="flex items-center gap-2 text-[10px] font-bold tracking-[0.2em] uppercase text-[#0D0B0A]/40 mb-10"
          >
            <Link to="/" className="hover:text-[#C9A84C] transition-colors">Home</Link>
            <span>/</span>
            <Link to="/shop" className="hover:text-[#C9A84C] transition-colors">Shop</Link>
            <span>/</span>
            <Link to={`/shop?category=${product.category}`} className="hover:text-[#C9A84C] transition-colors">{product.category}</Link>
            <span>/</span>
            <span className="text-[#0D0B0A]/70 truncate max-w-xs">{product.name}</span>
          </motion.div>

          {/* Two-column hero: 55 / 45 */}
          <div className="grid grid-cols-[55fr_45fr] gap-16 xl:gap-20 items-start">
            {/* LEFT — sticky gallery */}
            <motion.div initial={{ opacity: 0, x: -16 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.6 }}>
              <DesktopGallery
                product={product}
                selectedImage={selectedImage}
                setSelectedImage={setSelectedImage}
                isWishlisted={isWishlisted}
                toggleWishlist={toggleWishlist}
                showShareMenu={showShareMenu}
                setShowShareMenu={setShowShareMenu}
                handleShare={handleShare}
                isFullscreenGallery={isFullscreenGallery}
                setIsFullscreenGallery={setIsFullscreenGallery}
              />
            </motion.div>

            {/* RIGHT — purchase panel */}
            <motion.div initial={{ opacity: 0, x: 16 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.6, delay: 0.1 }}>
              <DesktopPurchasePanel
                product={product}
                quantity={quantity}
                setQuantity={setQuantity}
                selectedColor={selectedColor}
                setSelectedColor={setSelectedColor}
                selectedSize={selectedSize}
                setSelectedSize={setSelectedSize}
                pincode={pincode}
                setPincode={setPincode}
                deliveryCheck={deliveryCheck}
                handleAddToCart={handleAddToCart}
                handleBuyNow={handleBuyNow}
                handlePincodeCheck={handlePincodeCheck}
                getCraftTime={getCraftTime}
              />
            </motion.div>
          </div>
        </div>
      </div>

      {/* ── FULL-WIDTH WEAVER STORY ── */}
      <DesktopWeaverStory product={product} />

      {/* ── HERITAGE ACCORDION ── */}
      <DesktopHeritageAccordion product={product} />

      {/* ── EDITORIAL TABS ── */}
      <DesktopTabs
        product={product}
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        reviews={reviews}
        loadingReviews={loadingReviews}
        hasMoreReviews={hasMoreReviews}
        handleLoadMoreReviews={handleLoadMoreReviews}
        showReviewForm={showReviewForm}
        setShowReviewForm={setShowReviewForm}
        newRating={newRating}
        setNewRating={setNewRating}
        newTitle={newTitle}
        setNewTitle={setNewTitle}
        newComment={newComment}
        setNewComment={setNewComment}
        submittingReview={submittingReview}
        reviewError={reviewError}
        reviewSuccess={reviewSuccess}
        handleReviewSubmit={handleReviewSubmit}
        isAuthenticated={isAuthenticated}
        formatDate={formatDate}
      />

      {/* ── RELATED PRODUCTS ── */}
      {relatedProducts.length > 0 && (
        <section className="bg-[#F9F5EE] border-t border-[#0D0B0A]/6">
          <div className="max-w-7xl mx-auto px-8 xl:px-16 py-20">
            <div className="mb-12">
              <p className="text-[10px] font-bold tracking-[0.3em] text-[#C9A84C] uppercase mb-3">Continue The Journey</p>
              <h2 className="text-4xl font-display font-medium text-[#0D0B0A] flex items-center gap-3">
                Complete The Heritage Collection
                <Sparkles size={20} className="text-[#C9A84C]" />
              </h2>
            </div>

            <div className="grid grid-cols-4 gap-6 xl:gap-8">
              {relatedProducts.slice(0, 4).map((rp, idx) => (
                <motion.div
                  key={rp._id}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: idx * 0.08 }}
                >
                  <Link to={`/product/${rp._id}`} className="group block">
                    <div className="border border-[#0D0B0A]/8 rounded-[4px] overflow-hidden bg-white hover:shadow-lg transition-all duration-500 hover:-translate-y-1">
                      <div className="relative aspect-[3/4] overflow-hidden">
                        <img
                          src={rp.images[0]?.url} alt={rp.name}
                          className="w-full h-full object-cover group-hover:scale-[1.05] transition-transform duration-700"
                        />
                        {rp.isBestSeller && (
                          <span className="absolute top-3 left-3 px-2 py-1 bg-[#0D0B0A] text-[#F9F5EE] text-[9px] font-bold tracking-widest uppercase rounded-[2px] border border-[#C9A84C]/30">ARCHIVED</span>
                        )}
                      </div>
                      <div className="p-4">
                        <p className="text-[9px] font-bold tracking-widest text-[#C9A84C] uppercase mb-1">{rp.weave}</p>
                        <h3 className="font-serif text-sm text-[#0D0B0A] group-hover:text-[#780000] transition-colors line-clamp-2 mb-2 min-h-[40px]">{rp.name}</h3>
                        <div className="flex items-center gap-1 mb-2">
                          <Star size={10} className="text-[#C9A84C] fill-current" />
                          <span className="text-xs font-semibold text-[#0D0B0A]">{rp.ratings.toFixed(1)}</span>
                          <span className="text-[10px] text-[#0D0B0A]/40">({rp.numReviews})</span>
                        </div>
                        <div className="flex items-baseline gap-2">
                          <span className="text-sm font-bold text-[#0D0B0A]">₹{rp.price.toLocaleString()}</span>
                          {rp.originalPrice && <span className="text-[10px] line-through text-[#0D0B0A]/30">₹{rp.originalPrice.toLocaleString()}</span>}
                        </div>
                      </div>
                    </div>
                  </Link>
                </motion.div>
              ))}
            </div>
          </div>
        </section>
      )}
    </div>
  );
};
