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
import { TanvoStoryAccordion } from '../components/TanvoStoryAccordion';

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
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { addToCart, wishlist, toggleWishlist, isAuthenticated } = useStore();
  const { isMobile } = useResponsive();

  const [product, setProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState(true);
  const [quantity, setQuantity] = useState(1);
  const [selectedImage, setSelectedImage] = useState(0);
  const [activeTab, setActiveTab] = useState('description');
  const [pincode, setPincode] = useState('');
  const [deliveryCheck, setDeliveryCheck] = useState<null | { available: boolean; date: string }>(null);
  const [selectedColor, setSelectedColor] = useState('');
  const [selectedSize, setSelectedSize] = useState('');
  const [showShareMenu, setShowShareMenu] = useState(false);
  const [isStickyCart, setIsStickyCart] = useState(false);
  const [isFullscreenGallery, setIsFullscreenGallery] = useState(false);
  const [showBackToTop, setShowBackToTop] = useState(false);
  const [reviews, setReviews] = useState<Review[]>([]);
  const [relatedProducts, setRelatedProducts] = useState<Product[]>([]);
  const [loadingReviews, setLoadingReviews] = useState(false);
  const [reviewPage, setReviewPage] = useState(1);
  const [hasMoreReviews, setHasMoreReviews] = useState(true);
  const [showAuthMessage, setShowAuthMessage] = useState(false);
  const [showReviewForm, setShowReviewForm] = useState(false);
  const [newRating, setNewRating] = useState(5);
  const [newTitle, setNewTitle] = useState('');
  const [newComment, setNewComment] = useState('');
  const [submittingReview, setSubmittingReview] = useState(false);
  const [reviewError, setReviewError] = useState('');
  const [reviewSuccess, setReviewSuccess] = useState(false);
  const [authExpanded, setAuthExpanded] = useState(false);

  const handleReviewSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (newComment.trim().length < 5) {
      setReviewError('Review comment must be at least 5 characters long');
      return;
    }
    try {
      setSubmittingReview(true);
      setReviewError('');
      await API.post(`/products/${id}/reviews`, {
        rating: newRating,
        title: newTitle,
        comment: newComment
      });
      setReviewSuccess(true);
      setNewRating(5);
      setNewTitle('');
      setNewComment('');
      setShowReviewForm(false);
      fetchReviews(1);
    } catch (error: any) {
      console.error('Error submitting review:', error);
      setReviewError(error.response?.data?.message || 'Failed to submit review. You may have already reviewed this product.');
    } finally {
      setSubmittingReview(false);
    }
  };

  const isWishlisted = product ? wishlist.includes(product._id) : false;

  // Fetch product data
  useEffect(() => {
    if (id) {
      fetchProduct();
    }
  }, [id]);

  // Fetch reviews when tab changes or page changes
  useEffect(() => {
    if (activeTab === 'reviews' && product) {
      fetchReviews(1);
    }
  }, [activeTab, product]);

  const fetchProduct = async () => {
    try {
      setLoading(true);
      const { data } = await API.get(`/products/${id}`);
      setProduct(data);
      setRelatedProducts(data.relatedProducts || []);

      // Set default color if available
      if (data.colors && data.colors.length > 0) {
        setSelectedColor(data.colors[0]);
      }

      // Set default size if available
      if (data.sizes && data.sizes.length > 0) {
        setSelectedSize(data.sizes[0]);
      }
    } catch (error) {
      console.error('Error fetching product:', error);
    } finally {
      setLoading(false);
    }
  };

  const fetchReviews = async (page: number) => {
    try {
      setLoadingReviews(true);
      const { data } = await API.get(`/products/${id}/reviews?page=${page}&limit=5`);

      if (page === 1) {
        setReviews(data.reviews);
      } else {
        setReviews(prev => [...prev, ...data.reviews]);
      }

      setHasMoreReviews(data.hasMore);
      setReviewPage(page);
    } catch (error) {
      console.error('Error fetching reviews:', error);
    } finally {
      setLoadingReviews(false);
    }
  };

  const handleAddToCart = () => {
    if (!product) return;

    addToCart(
      product._id,
      quantity,
      selectedColor || undefined,
      selectedSize || undefined
    );
  };

  const handleBuyNow = () => {
    if (!product) return;

    if (!isAuthenticated) {
      setShowAuthMessage(true);
      return;
    }

    // Add to cart and go to checkout
    addToCart(product._id, quantity, selectedColor || undefined, selectedSize || undefined);
    navigate('/checkout');
  };

  const handlePincodeCheck = async () => {
    if (pincode.length === 6) {
      try {
        setDeliveryCheck(null);
        const { data } = await API.post('/orders/check-serviceability', {
          pincode,
          weight: 0.5 // Default weight
        });

        if (data.status === 200 && data.data && data.data.available_courier_companies_count > 0) {
          const deliveryDate = new Date();
          // Find the ETD from the first available courier
          const etd = data.data.available_courier_companies[0]?.etd || '3-7 days';

          setDeliveryCheck({
            available: true,
            date: etd.includes('-') ? etd : `by ${etd}`
          });
        } else {
          setDeliveryCheck({
            available: false,
            date: ''
          });
        }
      } catch (error) {
        console.error('Error checking delivery:', error);
        setDeliveryCheck({
          available: false,
          date: ''
        });
      }
    }
  };

  const handleShare = (platform: string) => {
    const url = window.location.href;
    const text = `Check out this handwoven masterpiece from TANVO: ${product?.name}`;

    const shareUrls: Record<string, string> = {
      WhatsApp: `https://wa.me/?text=${encodeURIComponent(text + ' ' + url)}`,
      Facebook: `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}`,
      Pinterest: `https://pinterest.com/pin/create/button/?url=${encodeURIComponent(url)}&description=${encodeURIComponent(text)}`,
      Email: `mailto:?subject=${encodeURIComponent(text)}&body=${encodeURIComponent(url)}`
    };

    window.open(shareUrls[platform], '_blank');
    setShowShareMenu(false);
  };

  const handleLoadMoreReviews = () => {
    fetchReviews(reviewPage + 1);
  };

  // Swipe handlers for mobile
  const swipeHandlers = useSwipeable({
    onSwipedLeft: () => {
      if (selectedImage < (product?.images?.length || 1) - 1) {
        setSelectedImage(prev => prev + 1);
      }
    },
    onSwipedRight: () => {
      if (selectedImage > 0) {
        setSelectedImage(prev => prev - 1);
      }
    },
    trackMouse: true
  });

  // Scroll effects
  useEffect(() => {
    const handleScroll = () => {
      setIsStickyCart(window.scrollY > 400);
      setShowBackToTop(window.scrollY > 600);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-IN', {
      day: 'numeric',
      month: 'short',
      year: 'numeric'
    });
  };

  if (loading) {
    return (
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="min-h-screen pt-28 pb-24 flex items-center justify-center bg-[#F9F5EE]"
      >
        <div className="text-center">
          <div className="relative">
            <div className="w-20 h-20 border-4 border-[#780000] border-t-transparent rounded animate-spin mx-auto mb-4"></div>
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="w-2 h-2 bg-[#C9A84C] rounded"></div>
            </div>
          </div>
          <p className="font-medium text-[#0D0B0A]">
            Weaving your product details...
          </p>
        </div>
      </motion.div>
    );
  }

  const renderDescriptionTab = () => (
    <div className="prose max-w-none">
      <p className="leading-relaxed text-base sm:text-lg text-[#0D0B0A]/80">
        {product.description}
      </p>
      {product.tags && product.tags.length > 0 && (
        <div className="mt-6 flex flex-wrap gap-2">
          {product.tags.map(tag => (
            <span key={tag} className="px-3 py-1 bg-[#F9F5EE] text-[#0D0B0A] text-xs rounded border border-[#E2D9C8]">
              #{tag}
            </span>
          ))}
        </div>
      )}
      <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="p-6 rounded-sm bg-white border border-[#E2D9C8]">
          <h4 className="font-display font-medium mb-3 text-[#0D0B0A]">
            Weaving Technique
          </h4>
          <p className="text-sm text-[#0D0B0A]/70">
            Handwoven using traditional {product.weave} technique, passed down through generations of master weavers.
          </p>
        </div>
        <div className="p-6 rounded-sm bg-white border border-[#E2D9C8]">
          <h4 className="font-display font-medium mb-3 text-[#0D0B0A]">
            Design Inspiration
          </h4>
          <p className="text-sm text-[#0D0B0A]/70">
            Inspired by ancient temple motifs and traditional patterns, each piece tells a unique story.
          </p>
        </div>
      </div>
    </div>
  );

  const renderSpecificationsTab = () => (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
      <div className="space-y-4">
        <h3 className="font-display font-medium text-xl text-[#0D0B0A]">
          Product Details
        </h3>
        <div className="space-y-3">
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
            <div key={idx} className="flex justify-between py-2 border-b border-[#E2D9C8]">
              <span className="text-[#0D0B0A]/60">
                {item.label}
              </span>
              <span className="font-medium text-[#0D0B0A]">
                {item.value}
              </span>
            </div>
          ))}
        </div>
      </div>
      <div className="space-y-4">
        <h3 className="font-display font-medium text-xl text-[#0D0B0A]">
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
              <item.icon className="w-5 h-5 shrink-0 text-[#780000]" />
              <span className="text-[#0D0B0A]/70">
                {item.text}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );

  const renderCareTab = () => (
    <div className="max-w-3xl">
      <div className="p-6 sm:p-8 rounded-sm border border-[#E2D9C8] bg-white">
        <h3 className="font-display font-medium text-xl mb-6 flex items-center gap-2 text-[#0D0B0A]">
          <Leaf className="w-6 h-6 text-green-600" />
          Care Instructions
        </h3>
        <p className="mb-6 text-[#0D0B0A]/80">
          {product.careInstructions || 'Dry clean only for first wash. Store in muslin cloth. Keep away from direct sunlight.'}
        </p>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {[
            'Dry clean only for first wash',
            'Store in muslin cloth',
            'Keep away from direct sunlight',
            'Do not use bleach',
            'Iron while slightly damp',
            'Use neem leaves to prevent pests'
          ].map((tip, idx) => (
            <div key={idx} className="flex items-start gap-2">
              <Check className="w-4 h-4 text-green-600 shrink-0 mt-0.5" />
              <span className="text-sm text-[#0D0B0A]/70">
                {tip}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );

  const renderReviewsTab = () => (
    <div className="space-y-8">
      {/* Rating Summary */}
      <div className="flex flex-col sm:flex-row items-start gap-8">
        <div className="text-center sm:text-left">
          <div className="text-5xl sm:text-6xl font-display font-medium text-[#780000]">
            {product.ratings.toFixed(1)}
          </div>
          <div className="flex items-center gap-1 mt-2 justify-center sm:justify-start">
            {[...Array(5)].map((_, i) => (
              <Star key={i} size={16} className={
                i < Math.floor(product.ratings)
                  ? 'text-[#C9A84C] fill-current'
                  : 'text-[#0D0B0A]/20'
              } />
            ))}
          </div>
          <p className="text-sm mt-2 text-[#0D0B0A]/60">
            Based on {product.numReviews} reviews
          </p>
        </div>

        <div className="flex-1 w-full">
          {[5, 4, 3, 2, 1].map((rating) => {
            const percentage = Math.floor(Math.random() * 100);
            return (
              <div key={rating} className="flex items-center gap-3 mb-2">
                <span className="text-sm w-8 text-[#0D0B0A]/70">
                  {rating} ★
                </span>
                <div className="flex-1 h-2 rounded overflow-hidden bg-[#F9F5EE] border border-[#E2D9C8]">
                  <div
                    className="h-full bg-[#780000]"
                    style={{ width: `${percentage}%` }}
                  />
                </div>
                <span className="text-sm text-[#0D0B0A]/60">
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
            className="px-6 py-3 bg-[#0D0B0A] text-[#F9F5EE] rounded-sm hover:bg-[#780000] transition-all whitespace-nowrap"
            style={{ fontFamily: 'Raleway, sans-serif', fontSize: 12, letterSpacing: '0.08em', textTransform: 'uppercase' }}
          >
            {showReviewForm ? 'Cancel Review' : 'Write a Review'}
          </motion.button>
        ) : (
          <Link
            to="/auth"
            className="px-6 py-3 border border-[#0D0B0A] text-[#0D0B0A] rounded-sm hover:bg-[#0D0B0A] hover:text-[#F9F5EE] transition-all whitespace-nowrap"
            style={{ fontFamily: 'Raleway, sans-serif', fontSize: 12, letterSpacing: '0.08em', textTransform: 'uppercase' }}
          >
            Login to Review
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
            className="bg-[#F9F5EE]/30 p-6 rounded border border-[#E2D9C8] space-y-4"
          >
            <h4 className="font-display font-medium text-lg text-[#0D0B0A]">
              Share Your Experience
            </h4>
            {reviewError && (
              <div className="p-3 bg-red-50 text-red-600 rounded-sm text-sm">
                {reviewError}
              </div>
            )}
            {reviewSuccess && (
              <div className="p-3 bg-green-50 text-green-600 rounded-sm text-sm">
                Thank you! Your review has been submitted and is pending verification.
              </div>
            )}
            
            <div className="space-y-2">
              <label className="text-sm font-medium text-[#0D0B0A] block">
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
              <label htmlFor="review-title" className="text-sm font-medium text-[#0D0B0A] block">
                Review Title
              </label>
              <input
                id="review-title"
                type="text"
                value={newTitle}
                onChange={(e) => setNewTitle(e.target.value)}
                placeholder="Summarize your experience"
                className="w-full px-4 py-2 border border-[#E2D9C8] rounded-sm bg-white text-[#0D0B0A] outline-none focus:border-[#780000]"
                style={{ fontFamily: 'Raleway, sans-serif' }}
              />
            </div>

            <div className="space-y-2">
              <label htmlFor="review-comment" className="text-sm font-medium text-[#0D0B0A] block">
                Review Content *
              </label>
              <textarea
                id="review-comment"
                rows={4}
                value={newComment}
                onChange={(e) => setNewComment(e.target.value)}
                placeholder="What did you love? How was the texture, fabric, and drape?"
                required
                className="w-full px-4 py-2 border border-[#E2D9C8] rounded-sm bg-white text-[#0D0B0A] outline-none focus:border-[#780000]"
                style={{ fontFamily: 'Raleway, sans-serif' }}
              />
            </div>

            <div className="flex gap-3">
              <button
                type="submit"
                disabled={submittingReview}
                className="px-6 py-3 bg-[#780000] text-[#F9F5EE] font-medium rounded-sm hover:bg-[#0D0B0A] transition-colors disabled:opacity-50"
                style={{ fontFamily: 'Raleway, sans-serif', fontSize: 11, letterSpacing: '0.08em', textTransform: 'uppercase' }}
              >
                {submittingReview ? 'Submitting...' : 'Submit Review'}
              </button>
              <button
                type="button"
                onClick={() => setShowReviewForm(false)}
                className="px-6 py-3 border border-[#E2D9C8] text-[#0D0B0A] font-medium rounded-sm hover:bg-white hover:text-[#780000] transition-all"
                style={{ fontFamily: 'Raleway, sans-serif', fontSize: 11, letterSpacing: '0.08em', textTransform: 'uppercase' }}
              >
                Cancel
              </button>
            </div>
          </motion.form>
        )}
      </AnimatePresence>

      {/* Customer Reviews */}
      {loadingReviews ? (
        <div className="flex justify-center py-12">
          <div className="relative">
            <div className="w-10 h-10 border-4 border-[#780000] border-t-transparent rounded animate-spin"></div>
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="w-2 h-2 bg-[#C9A84C] rounded"></div>
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
              className="border border-[#E2D9C8] rounded p-6 hover:shadow-lg transition-all bg-white"
            >
              <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-4 mb-4">
                <div className="flex items-start gap-3">
                  <div className="w-10 h-10 bg-[#0D0B0A] rounded flex items-center justify-center text-[#F9F5EE] font-medium">
                    {review.user.name.charAt(0)}
                  </div>
                  <div>
                    <p className="font-medium text-[#0D0B0A]">
                      {review.user.name}
                    </p>
                    <div className="flex flex-wrap items-center gap-2 text-sm">
                      <div className="flex">
                        {[...Array(5)].map((_, i) => (
                          <Star key={i} size={12} className={
                            i < review.rating
                              ? 'text-[#C9A84C] fill-current'
                              : 'text-[#0D0B0A]/20'
                          } />
                        ))}
                      </div>
                      <span className="text-xs text-[#0D0B0A]/60">
                        {formatDate(review.createdAt)}
                      </span>
                    </div>
                  </div>
                </div>
                {review.isVerifiedPurchase && (
                  <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded text-xs font-medium bg-green-50 text-green-800 border border-green-200">
                    <Check size={12} /> Verified Purchase
                  </span>
                )}
              </div>

              {review.title && (
                <h5 className="font-display font-medium text-base mb-2 text-[#0D0B0A]">
                  {review.title}
                </h5>
              )}
              <p className="text-sm text-[#0D0B0A]/80 leading-relaxed">
                {review.comment}
              </p>
            </motion.div>
          ))}
        </div>
      ) : (
        <div className="text-center py-12 border border-dashed border-[#E2D9C8] rounded-sm">
          <p className="text-sm text-[#0D0B0A]/60 mb-2">No reviews yet.</p>
          <p className="text-xs text-[#0D0B0A]/40">Be the first to share your experience with this saree.</p>
        </div>
      )}

      {/* Pagination */}
      {reviews.length > 0 && hasMoreReviews && (
        <div className="flex justify-center mt-8">
          <motion.button
            whileTap={{ scale: 0.98 }}
            onClick={handleLoadMoreReviews}
            disabled={loadingReviews}
            className="px-8 py-3 border-2 border-[#0D0B0A] text-[#0D0B0A] font-medium rounded-sm hover:bg-[#0D0B0A] hover:text-[#F9F5EE] transition-all disabled:opacity-50"
            style={{ fontFamily: 'Raleway, sans-serif', fontSize: 11, letterSpacing: '0.08em', textTransform: 'uppercase' }}
          >
            {loadingReviews ? 'Loading...' : 'Load More Reviews'}
          </motion.button>
        </div>
      )}
    </div>
  );

  if (!product) {
    return (
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="min-h-screen pt-28 pb-24 bg-[#F9F5EE]"
      >
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-3xl sm:text-4xl font-display font-medium mb-4 text-[#0D0B0A]">
            Product Not Found
          </h1>
          <p className="mb-8 text-[#0D0B0A]/70">
            The saree you're looking for has been woven into another collection.
          </p>
          <Link to="/shop" className="inline-block px-8 py-4 bg-[#780000] text-[#F9F5EE] rounded-sm font-medium hover:bg-[#C9A84C] transition-all">
            Continue Shopping
          </Link>
        </div>
      </motion.div>
    );
  }

  return (
    <>
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
        className="fixed inset-0 pointer-events-none"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='40' height='40' viewBox='0 0 40 40' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M0 0h40v2H0V0zm0 4h40v2H0V4zm0 4h40v2H0V8zm0 4h40v2H0v-2zm0 4h40v2H0v-2zm0 4h40v2H0v-2zm0 4h40v2H0v-2zm0 4h40v2H0v-2zm0 4h40v2H0v-2zm0 4h40v2H0v-2z' fill='%23B43F3F' fill-opacity='0.02' fill-rule='evenodd'/%3E%3C/svg%3E")`,
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
            className="fixed bottom-24 right-4 z-50 p-3 bg-[#C9A84C] text-[#F9F5EE] rounded shadow-lg hover:bg-[#780000] transition-colors"
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
                    className="absolute left-4 top-1/2 transform -translate-y-1/2 p-2 bg-[#F9F5EE]/20 backdrop-blur-sm rounded hover:bg-[#C9A84C] transition-colors"
                    onClick={(e) => {
                      e.stopPropagation();
                      setSelectedImage(prev => prev > 0 ? prev - 1 : product.images.length - 1);
                    }}
                  >
                    <ChevronLeft className="text-[#F9F5EE]" size={24} />
                  </button>

                  <button
                    className="absolute right-4 top-1/2 transform -translate-y-1/2 p-2 bg-[#F9F5EE]/20 backdrop-blur-sm rounded hover:bg-[#C9A84C] transition-colors"
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
              <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 bg-[#0D0B0A] text-[#F9F5EE] text-xs px-3 py-1.5 rounded">
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
              className="relative bg-[#F9F5EE] max-w-md w-full p-8 rounded shadow-2xl border border-[#780000]/10 text-center"
            >
              <div className="w-16 h-16 bg-[#780000]/10 rounded flex items-center justify-center mx-auto mb-6">
                <Lock className="text-[#780000] w-8 h-8" />
              </div>
              <h2 className="text-2xl font-display font-medium text-[#0D0B0A] mb-4">
                Login Required
              </h2>
              <p className="text-[#0D0B0A]/70 mb-8">
                To purchase this handwoven masterpiece, please sign in or create an account.
              </p>
              <div className="flex flex-col gap-3">
                <Link
                  to={`/auth?redirect=${encodeURIComponent(window.location.pathname + window.location.search)}`}
                  className="w-full py-4 bg-[#780000] text-[#F9F5EE] font-medium rounded-sm hover:bg-[#C9A84C] transition-all shadow-lg shadow-[#780000]/20"
                >
                  Sign In / Register
                </Link>
                <button
                  onClick={() => setShowAuthMessage(false)}
                  className="w-full py-4 text-[#0D0B0A]/60 font-medium hover:text-[#0D0B0A] transition-colors"
                >
                  Continue Browsing
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 pt-28 pb-16 max-w-7xl relative z-10">
        {/* Breadcrumb */}
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="flex items-center gap-2 text-sm mb-6 overflow-x-auto pb-2 scrollbar-hide text-[#0D0B0A]/60"
        >
          <Link to="/" className="hover:text-[#780000] whitespace-nowrap">Home</Link>
          <span>/</span>
          <Link to="/shop" className="hover:text-[#780000] whitespace-nowrap">Shop</Link>
          <span>/</span>
          <Link to={`/shop?category=${product.category}`} className="hover:text-[#780000] whitespace-nowrap">{product.category}</Link>
          <span>/</span>
          <span className="font-medium truncate text-[#0D0B0A]">
            {product.name}
          </span>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-[45%_1fr] gap-8 lg:gap-14 items-start">
          {/* Left Column - Sticky Gallery */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            className="space-y-3 lg:sticky lg:top-[120px] lg:self-start"
          >
            {/* Main Image */}
            <div
              {...swipeHandlers}
              className="relative aspect-[4/5] bg-white rounded-sm sm:rounded lg:rounded-3xl overflow-hidden group cursor-zoom-in border border-[#780000]/10"
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

              {/* Badges */}
              <div className="absolute top-3 left-3 sm:top-4 sm:left-4 flex flex-col gap-2">
                {product.isBestSeller && (
                  <motion.span
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ type: "spring", stiffness: 500, delay: 0.2 }}
                    className="px-3 py-1.5 bg-[#780000] text-[#F9F5EE] text-xs font-medium rounded shadow-lg"
                  >
                    Best Seller
                  </motion.span>
                )}
                {product.originalPrice && (
                  <motion.span
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ type: "spring", stiffness: 500, delay: 0.3 }}
                    className="px-3 py-1.5 bg-[#C9A84C] text-[#F9F5EE] text-xs font-medium rounded shadow-lg"
                  >
                    {Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)}% OFF
                  </motion.span>
                )}
                {product.isNewArrival && (
                  <motion.span
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ type: "spring", stiffness: 500, delay: 0.4 }}
                    className="px-3 py-1.5 bg-[#0D0B0A] text-[#F9F5EE] text-xs font-medium rounded shadow-lg"
                  >
                    New Arrival
                  </motion.span>
                )}
              </div>

              {/* Wishlist & Share */}
              <div className="absolute top-3 right-3 sm:top-4 sm:right-4 flex flex-col gap-2">
                <motion.button
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  onClick={(e) => {
                    e.stopPropagation();
                    toggleWishlist(product._id);
                  }}
                  className={`p-2 sm:p-3 rounded shadow-lg transition-all duration-300 ${isWishlisted
                    ? 'bg-[#780000] text-[#F9F5EE]'
                    : 'bg-white text-[#0D0B0A] hover:text-[#780000]'
                    }`}
                >
                  <Heart size={isMobile ? 18 : 20} fill={isWishlisted ? "currentColor" : "none"} />
                </motion.button>

                <motion.button
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  onClick={(e) => {
                    e.stopPropagation();
                    setShowShareMenu(!showShareMenu);
                  }}
                  className="p-2 sm:p-3 bg-white text-[#0D0B0A] rounded shadow-lg hover:text-[#C9A84C] transition-all duration-300 relative"
                >
                  <Share2 size={isMobile ? 18 : 20} />

                  <AnimatePresence>
                    {showShareMenu && (
                      <motion.div
                        initial={{ opacity: 0, y: -10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -10 }}
                        className="absolute top-12 right-0 rounded shadow-2xl p-4 w-48 z-20 bg-white border border-[#780000]/10"
                        onClick={(e) => e.stopPropagation()}
                      >
                        <p className="text-sm font-medium mb-3 text-[#0D0B0A]">
                          Share this masterpiece
                        </p>
                        <div className="space-y-2">
                          {[
                            { name: 'WhatsApp', icon: '📱', color: '#25D366' },
                            { name: 'Facebook', icon: '📘', color: '#1877F2' },
                            { name: 'Pinterest', icon: '📌', color: '#E60023' },
                            { name: 'Email', icon: '✉️', color: '#780000' }
                          ].map((platform) => (
                            <button
                              key={platform.name}
                              onClick={() => handleShare(platform.name)}
                              className="w-full flex items-center gap-3 px-3 py-2 text-sm rounded-lg hover:bg-[#F9F5EE] text-[#0D0B0A] transition-colors"
                            >
                              <span>{platform.icon}</span>
                              <span>{platform.name}</span>
                            </button>
                          ))}
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </motion.button>
              </div>

              {/* Image Counter (Mobile) */}
              <div className="absolute bottom-3 left-1/2 transform -translate-x-1/2 bg-[#0D0B0A]/80 backdrop-blur-sm text-[#F9F5EE] text-xs px-3 py-1.5 rounded lg:hidden">
                {selectedImage + 1} / {product.images.length}
              </div>

              {/* Zoom Indicator (Desktop) */}
              <div className="absolute bottom-4 right-4 bg-[#0D0B0A]/80 backdrop-blur-sm text-[#F9F5EE] text-xs px-3 py-2 rounded hidden lg:block">
                <span className="flex items-center gap-1">
                  <Search className="w-3 h-3" /> Click to zoom
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
                    className={`aspect-square rounded-lg sm:rounded-sm overflow-hidden border-2 transition-all duration-300 ${selectedImage === index
                      ? 'border-[#C9A84C] shadow-lg scale-105'
                      : 'border-transparent hover:border-[#780000]'
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


          {/* ── Right Column: Purchase Panel ── */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            className="space-y-6 pb-10"
          >
            {/* 1. PRODUCT IDENTITY */}
            <div>
              <p style={{ fontFamily: 'Raleway, sans-serif', fontSize: 10, fontWeight: 700, letterSpacing: '0.2em', textTransform: 'uppercase', color: '#C9A84C', marginBottom: 10 }}>
                {product.weave} · {product.fabric}
              </p>
              <h1 style={{ fontFamily: 'Playfair Display, serif', fontSize: isMobile ? 26 : 34, fontWeight: 500, color: '#0D0B0A', lineHeight: 1.25, marginBottom: 12 }}>
                {product.name}
              </h1>
              {(product.shortDescription || product.description) && (
                <p style={{ fontFamily: 'Raleway, sans-serif', fontSize: 14, color: 'rgba(13,11,10,0.6)', lineHeight: 1.7 }}>
                  {product.shortDescription || product.description.slice(0, 130)}
                </p>
              )}
            </div>

            {/* Divider */}
            <div style={{ height: 1, background: '#E2D9C8' }} />

            {/* 2. RATING + TRUST */}
            <div className="flex flex-wrap items-center gap-4">
              <div className="flex items-center gap-2">
                <div className="flex gap-0.5">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} size={13} style={{ color: '#C9A84C', fill: i < Math.floor(product.ratings) ? '#C9A84C' : 'none' }} />
                  ))}
                </div>
                <button
                  onClick={() => setActiveTab('reviews')}
                  style={{ fontFamily: 'Raleway, sans-serif', fontSize: 12, color: 'rgba(13,11,10,0.55)', letterSpacing: '0.03em' }}
                >
                  {product.ratings.toFixed(1)} ({product.numReviews} verified)
                </button>
              </div>
              <div style={{ fontFamily: 'Raleway, sans-serif', fontSize: 11, color: 'rgba(13,11,10,0.45)', letterSpacing: '0.05em', display: 'flex', gap: 12 }}>
                <span>✓ Authentic Handloom</span>
                <span style={{ color: '#E2D9C8' }}>|</span>
                <span>✓ Artisan Verified</span>
              </div>
            </div>

            {/* 3. PRICE */}
            <div style={{ padding: '16px 20px', background: '#fff', border: '1px solid #E2D9C8', borderRadius: 4 }}>
              <div className="flex flex-wrap items-baseline gap-3 mb-2">
                <span style={{ fontFamily: 'Playfair Display, serif', fontSize: 32, fontWeight: 600, color: '#780000' }}>
                  ₹{product.price.toLocaleString()}
                </span>
                {product.originalPrice && (
                  <>
                    <span style={{ fontSize: 16, textDecoration: 'line-through', color: 'rgba(13,11,10,0.3)' }}>
                      ₹{product.originalPrice.toLocaleString()}
                    </span>
                    <span style={{ background: '#C9A84C', color: '#0D0B0A', fontSize: 10, fontWeight: 700, padding: '2px 8px', borderRadius: 2, letterSpacing: '0.08em' }}>
                      SAVE {Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)}%
                    </span>
                  </>
                )}
              </div>
              <p style={{ fontFamily: 'Raleway, sans-serif', fontSize: 11, color: 'rgba(13,11,10,0.45)', letterSpacing: '0.04em' }}>
                ✓ Free Shipping above ₹5,000 · All taxes included
              </p>
            </div>

            {/* 4. AUTHENTICITY PROMISE (compact) */}
            <div style={{ border: '1px solid #E2D9C8', padding: '14px 18px', borderRadius: 4 }}>
              <div className="flex items-center justify-between mb-3">
                <p style={{ fontFamily: 'Raleway, sans-serif', fontSize: 9, fontWeight: 700, letterSpacing: '0.2em', textTransform: 'uppercase', color: '#780000' }}>
                  TANVO Authenticity
                </p>
                <button
                  onClick={() => setAuthExpanded(!authExpanded)}
                  style={{ fontFamily: 'Raleway, sans-serif', fontSize: 11, color: '#C9A84C', background: 'none', border: 'none', cursor: 'pointer', letterSpacing: '0.04em' }}
                >
                  {authExpanded ? 'Close ↑' : 'Know the story →'}
                </button>
              </div>
              <div className="grid grid-cols-2 gap-y-2 gap-x-4">
                {['Handwoven by verified artisans', 'Genuine Odisha handloom', 'Premium natural fabric', 'Direct artisan sourcing'].map(t => (
                  <div key={t} className="flex items-center gap-1.5" style={{ fontFamily: 'Raleway, sans-serif', fontSize: 11, color: 'rgba(13,11,10,0.6)' }}>
                    <Check size={10} style={{ color: '#C9A84C', flexShrink: 0 }} />{t}
                  </div>
                ))}
              </div>
              <AnimatePresence>
                {authExpanded && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.25 }}
                    style={{ overflow: 'hidden' }}
                  >
                    <p style={{ fontFamily: 'Raleway, sans-serif', fontSize: 12, fontStyle: 'italic', color: 'rgba(13,11,10,0.55)', lineHeight: 1.7, marginTop: 12, paddingTop: 12, borderTop: '1px solid #E2D9C8' }}>
                      "We guarantee this saree is a genuine hand-spun, hand-woven Indian masterpiece. We work directly with artisan families, paying fair wages and ensuring their ancestral craft lives on."
                    </p>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* 5. PRODUCT SELECTIONS */}
            <div className="space-y-5">
              {/* Stock status */}
              <div className="flex items-center gap-2">
                <div className={`w-2 h-2 rounded-full ${product.stock > 5 ? 'bg-green-500 animate-pulse' : product.stock > 0 ? 'bg-amber-500 animate-pulse' : 'bg-red-500'}`} />
                <span style={{ fontFamily: 'Raleway, sans-serif', fontSize: 11, fontWeight: 600, letterSpacing: '0.08em', color: '#0D0B0A' }}>
                  {product.stock > 5 ? 'In Stock' : product.stock > 0 ? `Only ${product.stock} pieces left` : 'Out of Stock'}
                </span>
              </div>

              {/* Colours */}
              {product.colors && product.colors.length > 0 && (
                <div>
                  <p style={{ fontFamily: 'Raleway, sans-serif', fontSize: 11, fontWeight: 600, letterSpacing: '0.1em', textTransform: 'uppercase', color: '#0D0B0A', marginBottom: 10 }}>
                    Colour: <span style={{ color: '#780000', fontWeight: 400, textTransform: 'none' }}>{selectedColor}</span>
                  </p>
                  <div className="flex gap-2.5 flex-wrap">
                    {product.colors.map(c => (
                      <button
                        key={c} onClick={() => setSelectedColor(c)} title={c}
                        style={{ width: 34, height: 34, background: c.toLowerCase(), border: `2px solid ${selectedColor === c ? '#780000' : '#E2D9C8'}`, borderRadius: 2, outline: selectedColor === c ? '1px solid #780000' : 'none', outlineOffset: 2, transition: 'all 0.2s', cursor: 'pointer' }}
                      />
                    ))}
                  </div>
                </div>
              )}

              {/* Sizes */}
              {product.sizes && product.sizes.length > 0 && (
                <div>
                  <p style={{ fontFamily: 'Raleway, sans-serif', fontSize: 11, fontWeight: 600, letterSpacing: '0.1em', textTransform: 'uppercase', color: '#0D0B0A', marginBottom: 10 }}>
                    Size: <span style={{ color: '#780000', fontWeight: 400, textTransform: 'none' }}>{selectedSize}</span>
                  </p>
                  <div className="flex gap-2 flex-wrap">
                    {product.sizes.map(s => (
                      <button
                        key={s} onClick={() => setSelectedSize(s)}
                        style={{ padding: '8px 16px', fontFamily: 'Raleway, sans-serif', fontSize: 11, letterSpacing: '0.06em', border: `1px solid ${selectedSize === s ? '#780000' : '#E2D9C8'}`, background: selectedSize === s ? '#780000' : 'transparent', color: selectedSize === s ? '#F9F5EE' : '#0D0B0A', borderRadius: 2, cursor: 'pointer', transition: 'all 0.2s' }}
                      >
                        {s}
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {/* Quantity */}
              <div>
                <p style={{ fontFamily: 'Raleway, sans-serif', fontSize: 11, fontWeight: 600, letterSpacing: '0.1em', textTransform: 'uppercase', color: '#0D0B0A', marginBottom: 10 }}>Quantity</p>
                <div className="inline-flex items-center" style={{ border: '1px solid #E2D9C8', borderRadius: 4 }}>
                  <button
                    onClick={() => setQuantity(Math.max(1, quantity - 1))} disabled={quantity <= 1}
                    className="w-11 h-11 flex items-center justify-center hover:bg-gray-50 disabled:opacity-30 transition-colors"
                    style={{ borderRight: '1px solid #E2D9C8' }}
                  >
                    <Minus size={13} style={{ color: '#0D0B0A' }} />
                  </button>
                  <span style={{ width: 44, textAlign: 'center', fontFamily: 'Raleway, sans-serif', fontSize: 14, fontWeight: 600, color: '#0D0B0A' }}>
                    {quantity}
                  </span>
                  <button
                    onClick={() => setQuantity(Math.min(product.stock, quantity + 1))} disabled={quantity >= product.stock}
                    className="w-11 h-11 flex items-center justify-center hover:bg-gray-50 disabled:opacity-30 transition-colors"
                    style={{ borderLeft: '1px solid #E2D9C8' }}
                  >
                    <Plus size={13} style={{ color: '#0D0B0A' }} />
                  </button>
                </div>
              </div>
            </div>

            {/* 6. PURCHASE ACTIONS */}
            <div className="space-y-3">
              {/* Micro trust row */}
              <div style={{ fontFamily: 'Raleway, sans-serif', fontSize: 10, color: 'rgba(13,11,10,0.4)', letterSpacing: '0.06em', display: 'flex', flexWrap: 'wrap', gap: '4px 20px' }}>
                <span>✓ Handwoven Odisha Heritage</span>
                <span>✓ Verified Artisan</span>
                <span>✓ 7-Day Returns</span>
              </div>

              {/* ADD TO CART */}
              <motion.button
                whileTap={{ scale: 0.99 }}
                onClick={handleAddToCart}
                disabled={product.stock === 0}
                className="w-full py-4 font-semibold tracking-widest uppercase text-sm transition-all disabled:opacity-40 group"
                style={{ fontFamily: 'Raleway, sans-serif', letterSpacing: '0.15em', background: 'transparent', border: '1.5px solid #0D0B0A', color: '#0D0B0A', borderRadius: 4 }}
                onMouseEnter={e => { const t = e.currentTarget; t.style.background = '#0D0B0A'; t.style.color = '#F9F5EE'; }}
                onMouseLeave={e => { const t = e.currentTarget; t.style.background = 'transparent'; t.style.color = '#0D0B0A'; }}
              >
                Add to Cart
              </motion.button>

              {/* BUY NOW */}
              <motion.button
                whileTap={{ scale: 0.99 }}
                onClick={handleBuyNow}
                disabled={product.stock === 0}
                className="w-full py-4 font-semibold tracking-widest uppercase text-sm transition-all disabled:opacity-40"
                style={{ fontFamily: 'Raleway, sans-serif', letterSpacing: '0.15em', background: '#780000', border: '1.5px solid #780000', color: '#F9F5EE', borderRadius: 4 }}
                onMouseEnter={e => { const t = e.currentTarget; t.style.background = '#0D0B0A'; t.style.borderColor = '#0D0B0A'; }}
                onMouseLeave={e => { const t = e.currentTarget; t.style.background = '#780000'; t.style.borderColor = '#780000'; }}
              >
                Buy Now
              </motion.button>

              {/* Helper links */}
              <div className="flex gap-6 justify-center pt-1">
                <button className="flex items-center gap-1.5 transition-opacity hover:opacity-70"
                  style={{ fontFamily: 'Raleway, sans-serif', fontSize: 11, color: 'rgba(13,11,10,0.5)', background: 'none', border: 'none', cursor: 'pointer', letterSpacing: '0.04em' }}>
                  <MessageCircle size={12} /> Chat with Weaver
                </button>
                <button className="flex items-center gap-1.5 transition-opacity hover:opacity-70"
                  style={{ fontFamily: 'Raleway, sans-serif', fontSize: 11, color: 'rgba(13,11,10,0.5)', background: 'none', border: 'none', cursor: 'pointer', letterSpacing: '0.04em' }}>
                  <RotateCcw size={12} /> 7-Day Returns
                </button>
              </div>
            </div>

            {/* Divider */}
            <div style={{ height: 1, background: '#E2D9C8' }} />

            {/* 7. DELIVERY CHECK */}
            <div>
              <p style={{ fontFamily: 'Raleway, sans-serif', fontSize: 10, fontWeight: 700, letterSpacing: '0.18em', textTransform: 'uppercase', color: '#0D0B0A', marginBottom: 12 }}>
                Check Delivery
              </p>
              <div className="flex gap-2">
                <input
                  type="text"
                  value={pincode}
                  onChange={e => setPincode(e.target.value.replace(/\D/g, '').slice(0, 6))}
                  placeholder="Enter 6-digit PIN code"
                  className="flex-1 px-4 py-3 text-sm outline-none transition-all"
                  style={{ border: '1px solid #E2D9C8', background: '#fff', color: '#0D0B0A', fontFamily: 'Raleway, sans-serif', borderRadius: 4 }}
                  onFocus={e => { e.target.style.borderColor = '#780000'; }}
                  onBlur={e => { e.target.style.borderColor = '#E2D9C8'; }}
                />
                <motion.button
                  whileTap={{ scale: 0.98 }}
                  onClick={handlePincodeCheck}
                  style={{ padding: '0 20px', background: '#0D0B0A', color: '#F9F5EE', fontFamily: 'Raleway, sans-serif', fontSize: 10, fontWeight: 700, letterSpacing: '0.15em', textTransform: 'uppercase', border: 'none', borderRadius: 4, cursor: 'pointer', flexShrink: 0 }}
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
                    className="mt-3 px-4 py-3 text-xs flex items-start gap-2"
                    style={{ background: deliveryCheck.available ? '#f0fdf4' : '#fff7ed', border: `1px solid ${deliveryCheck.available ? '#86efac' : '#fed7aa'}`, borderRadius: 4 }}
                  >
                    <Truck size={12} style={{ color: deliveryCheck.available ? '#16a34a' : '#ea580c', flexShrink: 0, marginTop: 1 }} />
                    <div style={{ fontFamily: 'Raleway, sans-serif', color: deliveryCheck.available ? '#15803d' : '#c2410c' }}>
                      {deliveryCheck.available ? (
                        <>
                          <p style={{ fontWeight: 600 }}>Available — arrives {deliveryCheck.date}</p>
                          <p style={{ opacity: 0.7, marginTop: 2 }}>Free shipping on orders above ₹5,000</p>
                        </>
                      ) : (
                        <>
                          <p style={{ fontWeight: 600 }}>Not serviceable at this PIN</p>
                          <p style={{ opacity: 0.7, marginTop: 2 }}>Try nearby areas or contact support</p>
                        </>
                      )}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* 8. THE TANVO STORY */}
            <TanvoStoryAccordion product={product} />
          </motion.div>

        </div>

        {/* Tabs Section */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="mt-12 sm:mt-16 lg:mt-20 border-t border-[#E2D9C8] pt-12"
        >
          {isMobile ? (
            /* Mobile Accordion Style Tabs */
            <div className="space-y-2">
              {[
                { id: 'description', label: 'Description', content: renderDescriptionTab() },
                { id: 'specifications', label: 'Specifications', content: renderSpecificationsTab() },
                { id: 'care', label: 'Care Instructions', content: renderCareTab() },
                { id: 'reviews', label: `Reviews (${product.numReviews})`, content: renderReviewsTab() }
              ].map((tab) => {
                const isOpen = activeTab === tab.id;
                return (
                  <div key={tab.id} className="border-b border-[#E2D9C8] last:border-b-0">
                    <button
                      onClick={() => setActiveTab(isOpen ? '' : tab.id)}
                      className="w-full flex justify-between items-center py-4 text-left transition-colors duration-200"
                      style={{
                        fontFamily: 'Playfair Display, serif',
                        fontSize: 16,
                        fontWeight: 500,
                        color: '#0D0B0A',
                        background: 'none',
                        border: 'none'
                      }}
                    >
                      <span className={isOpen ? 'text-[#780000]' : 'text-[#0D0B0A]'}>{tab.label}</span>
                      <ChevronDown
                        size={18}
                        className={`transition-transform duration-300 ${isOpen ? 'rotate-180 text-[#C9A84C]' : 'text-[#0D0B0A]/40'}`}
                      />
                    </button>
                    <AnimatePresence initial={false}>
                      {isOpen && (
                        <motion.div
                          initial={{ height: 0, opacity: 0 }}
                          animate={{ height: 'auto', opacity: 1 }}
                          exit={{ height: 0, opacity: 0 }}
                          transition={{ duration: 0.25, ease: 'easeInOut' }}
                          className="overflow-hidden pb-6"
                        >
                          {tab.content}
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                );
              })}
            </div>
          ) : (
            /* Desktop Elegant Editorial Tabs */
            <>
              <div className="border-b border-[#E2D9C8]">
                <div className="flex gap-10 pb-0">
                  {[
                    { id: 'description', label: 'Description' },
                    { id: 'specifications', label: 'Specifications' },
                    { id: 'care', label: 'Care Instructions' },
                    { id: 'reviews', label: `Reviews (${product.numReviews})` }
                  ].map((tab) => (
                    <button
                      key={tab.id}
                      onClick={() => setActiveTab(tab.id)}
                      className="pb-4 px-1 font-semibold transition-all duration-300 relative whitespace-nowrap"
                      style={{
                        fontFamily: 'Raleway, sans-serif',
                        fontSize: 12,
                        letterSpacing: '0.12em',
                        textTransform: 'uppercase',
                        color: activeTab === tab.id ? '#0D0B0A' : 'rgba(13,11,10,0.4)',
                        background: 'none',
                        border: 'none',
                        cursor: 'pointer'
                      }}
                    >
                      {tab.label}
                      {activeTab === tab.id && (
                        <motion.div
                          layoutId="activeTabUnderline"
                          className="absolute bottom-0 left-0 w-full h-0.5 bg-[#C9A84C]"
                        />
                      )}
                    </button>
                  ))}
                </div>
              </div>

              <div className="py-10">
                <AnimatePresence mode="wait">
                  <motion.div
                    key={activeTab}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    transition={{ duration: 0.3 }}
                  >
                    {activeTab === 'description' && renderDescriptionTab()}
                    {activeTab === 'specifications' && renderSpecificationsTab()}
                    {activeTab === 'care' && renderCareTab()}
                    {activeTab === 'reviews' && renderReviewsTab()}
                  </motion.div>
                </AnimatePresence>
              </div>
            </>
          )}
        </motion.div>

        {/* Complete Your Collection Section */}
        {relatedProducts.length > 0 && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.6 }}
            className="mt-16 sm:mt-24 border-t border-[#C9A84C]/30 pt-16"
          >
            <h2 
              className="text-xl sm:text-2xl lg:text-3xl font-medium mb-6 sm:mb-8 lg:mb-10 text-[#0D0B0A]"
              style={{ fontFamily: 'Playfair Display, serif', letterSpacing: '0.02em' }}
            >
              Complete Your Collection
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
                    <div className="rounded-sm overflow-hidden shadow-md hover:shadow-xl transition-all duration-500 hover:-translate-y-2 border border-[#E2D9C8] hover:border-[#C9A84C] bg-white">
                      <div className="relative aspect-[3/4] overflow-hidden">
                        <img
                          src={product.images[0]?.url}
                          alt={product.name}
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                        />
                        {product.isBestSeller && (
                          <div 
                            className="absolute top-2 left-2 px-2 py-0.5 bg-[#780000] text-[#F9F5EE] text-[9px] font-semibold tracking-wider uppercase rounded-sm"
                            style={{ fontFamily: 'Raleway, sans-serif' }}
                          >
                            Best Seller
                          </div>
                        )}
                      </div>
                      <div className="p-2 sm:p-3 lg:p-4">
                        <h3 
                          className="font-medium text-xs sm:text-sm lg:text-base group-hover:text-[#780000] transition-colors line-clamp-2 mb-1 sm:mb-2 text-[#0D0B0A]"
                          style={{ fontFamily: 'Raleway, sans-serif', fontWeight: 600 }}
                        >
                          {product.name}
                        </h3>
                        <div className="flex items-center gap-1 mb-1 sm:mb-2">
                          <Star size={10} className="text-[#C9A84C] fill-current" />
                          <span className="text-xs font-semibold text-[#0D0B0A]">
                            {product.ratings.toFixed(1)}
                          </span>
                          <span className="text-[10px] text-[#0D0B0A]/60">
                            ({product.numReviews})
                          </span>
                        </div>
                        <div className="flex items-center gap-1 sm:gap-2">
                          <span className="text-sm sm:text-base lg:text-lg font-semibold text-[#780000]">
                            ₹{product.price.toLocaleString()}
                          </span>
                          {product.originalPrice && (
                            <span className="text-[10px] sm:text-xs line-through text-[#0D0B0A]/40">
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
            className="fixed bottom-0 left-0 right-0 p-4 border-t border-[#780000]/10 z-40 bg-white shadow-lg"
          >
            <div className="flex items-center justify-between gap-4">
              <div>
                <span className="text-lg font-medium text-[#780000]">
                  ₹{product.price.toLocaleString()}
                </span>
                {product.originalPrice && (
                  <span className="text-sm line-through ml-2 text-[#0D0B0A]/40">
                    ₹{product.originalPrice.toLocaleString()}
                  </span>
                )}
              </div>
              <div className="flex gap-2">
                <button
                  onClick={() => toggleWishlist(product._id)}
                  className={`p-3 rounded transition-all ${isWishlisted
                    ? 'bg-[#780000] text-[#F9F5EE]'
                    : 'bg-[#F9F5EE] text-[#0D0B0A]'
                    }`}
                >
                  <Heart size={18} fill={isWishlisted ? "currentColor" : "none"} />
                </button>
                <button
                  onClick={handleAddToCart}
                  className="px-6 py-3 bg-[#780000] text-[#F9F5EE] font-medium rounded hover:bg-[#C9A84C] transition-all"
                >
                  Add to Cart
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
    </>
  );
};

export default ProductDetail;