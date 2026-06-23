import React from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Star, Check, ThumbsUp, Truck, RotateCcw, Shield, Clock } from 'lucide-react';
import { Product, Review } from '../../hooks/useProductDetail';

interface Props {
  product: Product;
  activeTab: string;
  setActiveTab: (t: string) => void;
  reviews: Review[];
  loadingReviews: boolean;
  hasMoreReviews: boolean;
  handleLoadMoreReviews: () => void;
  showReviewForm: boolean;
  setShowReviewForm: (v: boolean) => void;
  newRating: number;
  setNewRating: (r: number) => void;
  newTitle: string;
  setNewTitle: (t: string) => void;
  newComment: string;
  setNewComment: (c: string) => void;
  submittingReview: boolean;
  reviewError: string;
  reviewSuccess: boolean;
  handleReviewSubmit: (e: React.FormEvent) => void;
  isAuthenticated: boolean;
  formatDate: (d: string) => string;
}

const TABS = [
  { id: 'description', label: 'The Saree' },
  { id: 'specifications', label: 'Specifications' },
  { id: 'care', label: 'Care Guide' },
  { id: 'reviews', label: 'Reviews' },
];

export const DesktopTabs: React.FC<Props> = ({
  product, activeTab, setActiveTab,
  reviews, loadingReviews, hasMoreReviews, handleLoadMoreReviews,
  showReviewForm, setShowReviewForm,
  newRating, setNewRating, newTitle, setNewTitle, newComment, setNewComment,
  submittingReview, reviewError, reviewSuccess, handleReviewSubmit,
  isAuthenticated, formatDate,
}) => {
  return (
    <section className="w-full bg-white border-t border-[#0D0B0A]/8">
      <div className="max-w-7xl mx-auto px-8 xl:px-16 py-20">
        {/* Tab navigation */}
        <div className="flex items-end gap-10 border-b border-[#0D0B0A]/8 mb-14">
          {TABS.map(tab => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`pb-4 text-sm font-semibold tracking-wider uppercase relative transition-colors ${
                activeTab === tab.id ? 'text-[#0D0B0A]' : 'text-[#0D0B0A]/35 hover:text-[#0D0B0A]/70'
              }`}
            >
              {tab.label}
              {activeTab === tab.id && (
                <motion.div layoutId="desktopTab" className="absolute bottom-0 left-0 w-full h-[1.5px] bg-[#780000]" />
              )}
            </button>
          ))}
        </div>

        <AnimatePresence mode="wait">
          <motion.div
            key={activeTab}
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.25 }}
          >
            {/* THE SAREE */}
            {activeTab === 'description' && (
              <div className="grid grid-cols-[2fr_1fr] gap-16">
                <div className="space-y-6">
                  <p className="text-base text-[#0D0B0A]/80 leading-relaxed font-serif">{product.description}</p>
                  <div className="grid grid-cols-2 gap-6 mt-4">
                    <div className="p-6 border border-[#0D0B0A]/8 rounded-[2px]">
                      <h4 className="font-display font-medium text-[#0D0B0A] mb-3">Weaving Tradition</h4>
                      <p className="text-sm text-[#0D0B0A]/65 leading-relaxed">Handwoven using {product.weave} technique, passed through generations of master artisans in Odisha's weaving districts.</p>
                    </div>
                    <div className="p-6 border border-[#0D0B0A]/8 rounded-[2px]">
                      <h4 className="font-display font-medium text-[#0D0B0A] mb-3">Design Heritage</h4>
                      <p className="text-sm text-[#0D0B0A]/65 leading-relaxed">Inspired by ancient temple motifs and the natural landscapes of Odisha. Each pattern is a cultural manuscript.</p>
                    </div>
                  </div>
                  {product.tags && product.tags.length > 0 && (
                    <div className="flex flex-wrap gap-2 pt-2">
                      {product.tags.map(tag => (
                        <span key={tag} className="px-3 py-1 bg-[#0D0B0A]/5 text-[#0D0B0A]/70 text-xs font-medium rounded-[2px]">#{tag}</span>
                      ))}
                    </div>
                  )}
                </div>
                {/* Occasion sidebar */}
                <div className="space-y-4">
                  <p className="text-[10px] font-bold tracking-widest uppercase text-[#0D0B0A]/40">Perfect For</p>
                  {['Wedding Ceremonies', 'Festive Celebrations', 'Heritage Receptions', 'Thoughtful Gifting', 'Everyday Elegance'].map(occ => (
                    <div key={occ} className="flex items-center gap-3 py-2 border-b border-[#0D0B0A]/6">
                      <div className="w-1 h-1 rounded-full bg-[#C9A84C]" />
                      <span className="text-sm text-[#0D0B0A]/70 font-medium">{occ}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* CRAFTSMANSHIP / SPECS */}
            {activeTab === 'specifications' && (
              <div className="grid grid-cols-2 gap-16">
                <div className="space-y-4">
                  <h3 className="font-display font-medium text-xl text-[#0D0B0A] mb-6">Product Details</h3>
                  {[
                    ['Fabric', product.fabric], ['Weave Type', product.weave],
                    ['Length', product.length || '6.3 Metres'], ['Blouse Piece', product.blousePiece ? 'Included' : 'Separate'],
                    ['Category', product.category], ['Border', 'Traditional temple design'],
                    ['Pallu', 'Intricate ikat motif'], ['Estimated Weight', '450–500 gms'],
                    ['Country of Origin', 'India (Odisha)'],
                  ].map(([k, v]) => (
                    <div key={k} className="flex justify-between py-2 border-b border-[#0D0B0A]/6 text-sm">
                      <span className="text-[#0D0B0A]/50">{k}</span>
                      <span className="font-semibold text-[#0D0B0A]">{v}</span>
                    </div>
                  ))}
                </div>
                <div className="space-y-6">
                  <h3 className="font-display font-medium text-xl text-[#0D0B0A] mb-6">Shipping & Service</h3>
                  {[
                    { icon: Truck, text: 'Free insured shipping above ₹5,000' },
                    { icon: Clock, text: 'Delivery in 3–5 business days' },
                    { icon: RotateCcw, text: '7-day hassle-free returns' },
                    { icon: Shield, text: '100% handloom authenticity guarantee' },
                  ].map(({ icon: Icon, text }) => (
                    <div key={text} className="flex items-start gap-4">
                      <Icon size={16} className="text-[#C9A84C] shrink-0 mt-0.5" />
                      <span className="text-sm text-[#0D0B0A]/70">{text}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* CARE GUIDE */}
            {activeTab === 'care' && (
              <div className="max-w-3xl space-y-8">
                <p className="text-base font-serif text-[#0D0B0A]/80 leading-relaxed">
                  {product.careInstructions || 'To preserve the longevity of your handloom saree, dry clean only for the first wash. Store in soft muslin cloth away from moisture and sunlight.'}
                </p>
                <div className="grid grid-cols-2 gap-4">
                  {['Dry clean for first wash', 'Store in muslin cloth', 'Away from direct sunlight', 'No bleach or harsh chemicals', 'Iron at low heat under cotton cloth', 'Use neem sachets for storage'].map(tip => (
                    <div key={tip} className="flex items-start gap-3">
                      <Check size={13} className="text-[#C9A84C] shrink-0 mt-0.5" />
                      <span className="text-sm text-[#0D0B0A]/70">{tip}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* REVIEWS */}
            {activeTab === 'reviews' && (
              <div className="space-y-10">
                {/* Summary row */}
                <div className="flex items-start gap-16">
                  <div className="shrink-0">
                    <div className="text-6xl font-display font-semibold text-[#0D0B0A]">{product.ratings.toFixed(1)}</div>
                    <div className="flex gap-0.5 mt-2">
                      {[...Array(5)].map((_, i) => (
                        <Star key={i} size={14} className={i < Math.floor(product.ratings) ? 'text-[#C9A84C] fill-current' : 'text-[#0D0B0A]/10'} />
                      ))}
                    </div>
                    <p className="text-xs mt-2 text-[#0D0B0A]/45">{product.numReviews} reviews</p>
                  </div>

                  <div className="flex-1 max-w-xs space-y-2">
                    {[5, 4, 3, 2, 1].map(r => {
                      const pct = Math.floor(Math.random() * 100);
                      return (
                        <div key={r} className="flex items-center gap-3">
                          <span className="text-xs text-[#0D0B0A]/40 w-6">{r}★</span>
                          <div className="flex-1 h-1.5 bg-[#0D0B0A]/6 rounded-full overflow-hidden">
                            <div className="h-full bg-[#C9A84C]" style={{ width: `${pct}%` }} />
                          </div>
                          <span className="text-xs text-[#0D0B0A]/35 w-8 text-right">{pct}%</span>
                        </div>
                      );
                    })}
                  </div>

                  <div className="ml-auto">
                    {isAuthenticated ? (
                      <button
                        onClick={() => setShowReviewForm(!showReviewForm)}
                        className="px-6 py-3 bg-[#0D0B0A] text-[#F9F5EE] text-xs font-bold tracking-widest uppercase rounded-[3px] hover:bg-[#780000] transition-colors"
                      >
                        {showReviewForm ? 'Cancel' : 'Write a Review'}
                      </button>
                    ) : (
                      <Link to="/auth" className="px-6 py-3 border border-[#0D0B0A] text-[#0D0B0A] text-xs font-bold tracking-widest uppercase rounded-[3px] hover:bg-[#0D0B0A] hover:text-[#F9F5EE] transition-colors inline-block">
                        Sign In to Write a Review
                      </Link>
                    )}
                  </div>
                </div>

                {/* Review form */}
                <AnimatePresence>
                  {showReviewForm && (
                    <motion.form
                      initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: 'auto' }} exit={{ opacity: 0, height: 0 }}
                      onSubmit={handleReviewSubmit}
                      className="border border-[#0D0B0A]/10 rounded-[4px] p-8 space-y-5 bg-[#F9F5EE]"
                    >
                      <h4 className="font-display font-medium text-xl text-[#0D0B0A]">Your Review</h4>
                      {reviewError && <p className="text-xs text-red-700 bg-red-50 border border-red-200 p-3 rounded-[2px]">{reviewError}</p>}
                      {reviewSuccess && <p className="text-xs text-green-700 bg-green-50 border border-green-200 p-3 rounded-[2px]">Review submitted successfully.</p>}
                      <div>
                        <p className="text-[10px] font-bold tracking-widest uppercase text-[#0D0B0A] mb-2">Rating</p>
                        <div className="flex gap-1">
                          {[1,2,3,4,5].map(s => (
                            <button type="button" key={s} onClick={() => setNewRating(s)}>
                              <Star size={22} className="text-[#C9A84C]" fill={s <= newRating ? '#C9A84C' : 'none'} />
                            </button>
                          ))}
                        </div>
                      </div>
                      <input type="text" value={newTitle} onChange={e => setNewTitle(e.target.value)} placeholder="Review title (e.g. Magnificent weave and drape)" className="w-full px-4 py-3 text-sm border border-[#0D0B0A]/15 rounded-[2px] bg-white" />
                      <textarea rows={4} value={newComment} onChange={e => setNewComment(e.target.value)} placeholder="Describe your experience — the fabric, drape, and craftsmanship..." required className="w-full px-4 py-3 text-sm border border-[#0D0B0A]/15 rounded-[2px] bg-white resize-none" />
                      <div className="flex gap-3">
                        <button type="submit" disabled={submittingReview} className="px-7 py-3 bg-[#780000] text-[#F9F5EE] text-xs font-bold tracking-widest uppercase rounded-[3px] hover:bg-[#5a0000] transition-colors disabled:opacity-50">
                          {submittingReview ? 'Submitting...' : 'Submit Review'}
                        </button>
                        <button type="button" onClick={() => setShowReviewForm(false)} className="px-7 py-3 border border-[#0D0B0A]/20 text-[#0D0B0A] text-xs font-bold tracking-widest uppercase rounded-[3px] hover:bg-white transition-colors">
                          Cancel
                        </button>
                      </div>
                    </motion.form>
                  )}
                </AnimatePresence>

                {/* Reviews list */}
                {loadingReviews ? (
                  <div className="py-16 flex justify-center">
                    <div className="w-8 h-8 border-2 border-[#C9A84C] border-t-transparent rounded-full animate-spin" />
                  </div>
                ) : reviews.length > 0 ? (
                  <div className="space-y-8">
                    {reviews.map((r, idx) => (
                      <motion.div key={r._id} initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: idx * 0.07 }} className="grid grid-cols-[180px_1fr] gap-10 py-8 border-t border-[#0D0B0A]/6">
                        <div className="space-y-2">
                          <div className="w-10 h-10 bg-[#0D0B0A] rounded-full flex items-center justify-center text-[#F9F5EE] font-medium text-sm">{r.user.name.charAt(0)}</div>
                          <p className="text-sm font-semibold text-[#0D0B0A]">{r.user.name}</p>
                          <div className="flex gap-0.5">
                            {[...Array(5)].map((_, i) => <Star key={i} size={11} className={i < r.rating ? 'text-[#C9A84C] fill-current' : 'text-[#0D0B0A]/10'} />)}
                          </div>
                          <p className="text-[10px] text-[#0D0B0A]/40">{formatDate(r.createdAt)}</p>
                          {r.isVerifiedPurchase && (
                            <span className="text-[9px] bg-[#C9A84C]/10 text-[#C9A84C] border border-[#C9A84C]/20 px-2 py-0.5 rounded-[2px] uppercase font-bold inline-block">Verified</span>
                          )}
                        </div>
                        <div>
                          {r.title && <h5 className="font-semibold text-[#0D0B0A] mb-2">{r.title}</h5>}
                          <p className="text-sm text-[#0D0B0A]/70 leading-relaxed mb-4">{r.comment}</p>
                          <button className="flex items-center gap-1.5 text-xs text-[#0D0B0A]/40 hover:text-[#C9A84C] transition-colors">
                            <ThumbsUp size={12} /> Helpful ({r.helpful?.length || 0})
                          </button>
                        </div>
                      </motion.div>
                    ))}
                  </div>
                ) : (
                  <p className="text-center py-16 text-sm text-[#0D0B0A]/40">No reviews yet. Be the first.</p>
                )}

                {hasMoreReviews && (
                  <div className="text-center pt-4">
                    <button onClick={handleLoadMoreReviews} disabled={loadingReviews} className="px-8 py-3 border border-[#0D0B0A]/20 text-[#0D0B0A] text-xs font-bold tracking-widest uppercase rounded-[3px] hover:bg-[#0D0B0A] hover:text-[#F9F5EE] transition-colors disabled:opacity-40">
                      Load More Reviews
                    </button>
                  </div>
                )}
              </div>
            )}
          </motion.div>
        </AnimatePresence>
      </div>
    </section>
  );
};
