import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useSwipeable } from 'react-swipeable';
import { useStore } from '../context/StoreContext';
import API from '../services/api';

export interface Product {
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

export interface Review {
  _id: string;
  user: { _id: string; name: string; profileImage?: string };
  rating: number;
  title?: string;
  comment: string;
  images?: Array<{ url: string }>;
  isVerifiedPurchase: boolean;
  helpful: string[];
  createdAt: string;
}

export function useProductDetail() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { addToCart, wishlist, toggleWishlist, isAuthenticated } = useStore();

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

  const isWishlisted = product ? wishlist.includes(product._id) : false;

  useEffect(() => {
    if (id) fetchProduct();
  }, [id]);

  useEffect(() => {
    if (activeTab === 'reviews' && product) fetchReviews(1);
  }, [activeTab, product]);

  useEffect(() => {
    const handleScroll = () => {
      setIsStickyCart(window.scrollY > 400);
      setShowBackToTop(window.scrollY > 600);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const fetchProduct = async () => {
    try {
      setLoading(true);
      const { data } = await API.get(`/products/${id}`);
      setProduct(data);
      setRelatedProducts(data.relatedProducts || []);
      if (data.colors?.length > 0) setSelectedColor(data.colors[0]);
      if (data.sizes?.length > 0) setSelectedSize(data.sizes[0]);
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
      if (page === 1) setReviews(data.reviews);
      else setReviews(prev => [...prev, ...data.reviews]);
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
    addToCart(product._id, quantity, selectedColor || undefined, selectedSize || undefined);
  };

  const handleBuyNow = () => {
    if (!product) return;
    if (!isAuthenticated) { setShowAuthMessage(true); return; }
    addToCart(product._id, quantity, selectedColor || undefined, selectedSize || undefined);
    navigate('/checkout');
  };

  const handlePincodeCheck = async () => {
    if (pincode.length !== 6) return;
    try {
      setDeliveryCheck(null);
      const { data } = await API.post('/orders/check-serviceability', { pincode, weight: 0.5 });
      if (data.status === 200 && data.data?.available_courier_companies_count > 0) {
        const etd = data.data.available_courier_companies[0]?.etd || '3-7 days';
        setDeliveryCheck({ available: true, date: etd.includes('-') ? etd : `by ${etd}` });
      } else {
        setDeliveryCheck({ available: false, date: '' });
      }
    } catch {
      setDeliveryCheck({ available: false, date: '' });
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

  const handleReviewSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (newComment.trim().length < 5) { setReviewError('Review must be at least 5 characters'); return; }
    try {
      setSubmittingReview(true);
      setReviewError('');
      await API.post(`/products/${id}/reviews`, { rating: newRating, title: newTitle, comment: newComment });
      setReviewSuccess(true);
      setNewRating(5); setNewTitle(''); setNewComment('');
      setShowReviewForm(false);
      fetchReviews(1);
    } catch (error: any) {
      setReviewError(error.response?.data?.message || 'Failed to submit review.');
    } finally {
      setSubmittingReview(false);
    }
  };

  const swipeHandlers = useSwipeable({
    onSwipedLeft: () => { if (selectedImage < (product?.images?.length || 1) - 1) setSelectedImage(p => p + 1); },
    onSwipedRight: () => { if (selectedImage > 0) setSelectedImage(p => p - 1); },
    trackMouse: true,
  });

  const scrollToTop = () => window.scrollTo({ top: 0, behavior: 'smooth' });
  const formatDate = (d: string) => new Date(d).toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' });

  const getCraftTime = () => {
    if (!product) return '18-21 Days';
    const w = product.weave.toLowerCase();
    const f = product.fabric.toLowerCase();
    if (w.includes('ikat') || w.includes('bomkai') || w.includes('sambalpuri')) return '18-21 Days';
    if (f.includes('silk') || w.includes('jacquard')) return '15-18 Days';
    if (f.includes('cotton')) return '8-12 Days';
    return '14-16 Days';
  };

  return {
    id, product, loading, quantity, setQuantity,
    selectedImage, setSelectedImage,
    activeTab, setActiveTab,
    pincode, setPincode, deliveryCheck,
    selectedColor, setSelectedColor,
    selectedSize, setSelectedSize,
    showShareMenu, setShowShareMenu,
    isStickyCart, isFullscreenGallery, setIsFullscreenGallery,
    showBackToTop, reviews, relatedProducts,
    loadingReviews, hasMoreReviews,
    showAuthMessage, setShowAuthMessage,
    showReviewForm, setShowReviewForm,
    newRating, setNewRating,
    newTitle, setNewTitle,
    newComment, setNewComment,
    submittingReview, reviewError, reviewSuccess,
    isWishlisted, isAuthenticated,
    toggleWishlist,
    handleAddToCart, handleBuyNow, handlePincodeCheck,
    handleShare, handleReviewSubmit,
    handleLoadMoreReviews: () => fetchReviews(reviewPage + 1),
    swipeHandlers, scrollToTop, formatDate, getCraftTime,
  };
}
