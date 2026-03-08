import React, { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { 
  Heart, Share2, Star, Truck, Shield, Award, 
  ChevronLeft, ChevronRight, Plus, Minus, 
  Check, Clock, MapPin, Package, MessageCircle,
  Zap, Leaf, Gem, Sparkles, Info, RotateCcw,
  ThumbsUp, Camera, User, Calendar, ShoppingBag,
  Search, Ruler, Lock, Users,
  ChevronDown, ChevronUp, X
} from 'lucide-react';
import { useStore } from '../context/StoreContext';
import API from '../services/api';
import { motion, AnimatePresence } from 'framer-motion';
import { useSwipeable } from 'react-swipeable';

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
    
    // Add to cart and go to checkout
    addToCart(product._id, quantity, selectedColor || undefined, selectedSize || undefined);
    navigate('/checkout');
  };

  const handlePincodeCheck = async () => {
    if (pincode.length === 6) {
      try {
        // This would be a real API call in production
        // const { data } = await API.post('/delivery/check', { pincode, productId: id });
        
        // Mock for now
        const available = ['751012', '751024', '700001', '110001'].includes(pincode);
        const deliveryDate = new Date();
        deliveryDate.setDate(deliveryDate.getDate() + (available ? 3 : 7));
        
        setDeliveryCheck({
          available,
          date: deliveryDate.toLocaleDateString('en-IN', { 
            day: 'numeric', 
            month: 'short', 
            year: 'numeric' 
          })
        });
      } catch (error) {
        console.error('Error checking delivery:', error);
      }
    }
  };

  const handleShare = (platform: string) => {
    const url = window.location.href;
    const text = `Check out this product: ${product?.name}`;
    
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
        className="min-h-screen pt-32 pb-24 flex items-center justify-center bg-white"
      >
        <div className="text-center">
          <div className="w-20 h-20 border-4 border-[#C40C0C] border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="font-medium text-gray-600">
            Weaving your product details...
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
        className="min-h-screen pt-32 pb-24 bg-white"
      >
        <div className="container-custom px-4 text-center">
          <h1 className="text-3xl sm:text-4xl font-serif font-bold mb-4 text-gray-900">
            Product Not Found
          </h1>
          <p className="mb-8 text-gray-600">
            The saree you're looking for has been woven into another collection.
          </p>
          <Link to="/shop" className="inline-block px-8 py-4 bg-[#C40C0C] text-white font-bold rounded-full hover:bg-[#FF6500] transition-colors">
            Continue Shopping
          </Link>
        </div>
      </motion.div>
    );
  }

  return (
    <div className="min-h-screen bg-white">
      {/* Back to Top Button */}
      <AnimatePresence>
        {showBackToTop && (
          <motion.button
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.8 }}
            onClick={scrollToTop}
            className="fixed bottom-24 right-4 z-50 p-3 bg-[#C40C0C] text-white rounded-full shadow-lg hover:bg-[#FF6500] transition-colors"
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
            className="fixed inset-0 z-50 bg-black/95 flex items-center justify-center"
            onClick={() => setIsFullscreenGallery(false)}
          >
            <button 
              className="absolute top-4 right-4 text-white hover:text-gray-300 z-10"
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
                    className="absolute left-4 top-1/2 transform -translate-y-1/2 p-2 bg-white/20 rounded-full hover:bg-white/30 transition-colors"
                    onClick={(e) => {
                      e.stopPropagation();
                      setSelectedImage(prev => prev > 0 ? prev - 1 : product.images.length - 1);
                    }}
                  >
                    <ChevronLeft className="text-white" size={24} />
                  </button>
                  
                  <button 
                    className="absolute right-4 top-1/2 transform -translate-y-1/2 p-2 bg-white/20 rounded-full hover:bg-white/30 transition-colors"
                    onClick={(e) => {
                      e.stopPropagation();
                      setSelectedImage(prev => prev < product.images.length - 1 ? prev + 1 : 0);
                    }}
                  >
                    <ChevronRight className="text-white" size={24} />
                  </button>
                </>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <div className="container-custom px-4 sm:px-6 lg:px-8 py-8 pt-32">
        {/* Breadcrumb */}
        <motion.div 
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="flex items-center gap-2 text-sm mb-6 overflow-x-auto pb-2 scrollbar-hide text-gray-500"
        >
          <Link to="/" className="hover:text-[#C40C0C] whitespace-nowrap">Home</Link>
          <span>/</span>
          <Link to="/shop" className="hover:text-[#C40C0C] whitespace-nowrap">Shop</Link>
          <span>/</span>
          <Link to={`/shop?category=${product.category}`} className="hover:text-[#C40C0C] whitespace-nowrap">{product.category}</Link>
          <span>/</span>
          <span className="font-medium truncate text-gray-900">
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
              className="relative aspect-[4/5] bg-gray-100 rounded-xl sm:rounded-2xl lg:rounded-3xl overflow-hidden group cursor-zoom-in"
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
                    className="px-2 py-1 sm:px-4 sm:py-2 bg-gradient-to-r from-[#C40C0C] to-[#FF6500] text-white text-xs sm:text-sm font-bold rounded-full shadow-lg"
                  >
                    ⚡ Best Seller
                  </motion.span>
                )}
                {product.originalPrice && (
                  <motion.span 
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ type: "spring", stiffness: 500, delay: 0.3 }}
                    className="px-2 py-1 sm:px-4 sm:py-2 bg-[#F6CE71] text-[#CC561E] text-xs sm:text-sm font-bold rounded-full shadow-lg"
                  >
                    🔥 {Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)}% OFF
                  </motion.span>
                )}
                {product.isNewArrival && (
                  <motion.span 
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ type: "spring", stiffness: 500, delay: 0.4 }}
                    className="px-2 py-1 sm:px-4 sm:py-2 bg-green-500 text-white text-xs sm:text-sm font-bold rounded-full shadow-lg"
                  >
                    ✨ New Arrival
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
                  className={`p-2 sm:p-3 rounded-full shadow-lg transition-all duration-300 ${
                    isWishlisted 
                      ? 'bg-[#C40C0C] text-white' 
                      : 'bg-white text-gray-700 hover:bg-[#F6CE71]'
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
                  className="p-2 sm:p-3 bg-white text-gray-700 rounded-full shadow-lg hover:bg-[#F6CE71] transition-all duration-300 relative"
                >
                  <Share2 size={isMobile ? 18 : 20} />
                  
                  <AnimatePresence>
                    {showShareMenu && (
                      <motion.div 
                        initial={{ opacity: 0, y: -10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -10 }}
                        className="absolute top-12 right-0 rounded-2xl shadow-2xl p-4 w-48 z-20 bg-white"
                        onClick={(e) => e.stopPropagation()}
                      >
                        <p className="text-sm font-bold mb-2 text-gray-700">
                          Share this product
                        </p>
                        <div className="space-y-2">
                          {['WhatsApp', 'Facebook', 'Pinterest', 'Email'].map(platform => (
                            <button 
                              key={platform} 
                              onClick={() => handleShare(platform)}
                              className="w-full text-left px-3 py-2 text-sm rounded-lg hover:bg-gray-50 text-gray-600 transition-colors"
                            >
                              {platform}
                            </button>
                          ))}
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </motion.button>
              </div>

              {/* Image Counter (Mobile) */}
              <div className="absolute bottom-3 left-1/2 transform -translate-x-1/2 bg-black/50 backdrop-blur-sm text-white text-xs px-3 py-1.5 rounded-full lg:hidden">
                {selectedImage + 1} / {product.images.length}
              </div>

              {/* Zoom Indicator (Desktop) */}
              <div className="absolute bottom-4 right-4 bg-black/50 backdrop-blur-sm text-white text-xs px-3 py-2 rounded-full hidden lg:block">
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
                    className={`aspect-square rounded-lg sm:rounded-xl overflow-hidden border-2 transition-all duration-300 ${
                      selectedImage === index 
                        ? 'border-[#C40C0C] shadow-lg scale-105' 
                        : 'border-transparent hover:border-[#F6CE71]'
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
              <div className="flex flex-wrap items-center gap-2 mb-3">
                <span className="px-3 py-1 text-xs font-bold rounded-full bg-[#F6CE71]/20 text-[#CC561E]">
                  {product.category}
                </span>
                <span className="px-3 py-1 text-xs font-bold rounded-full bg-[#C40C0C]/10 text-[#C40C0C]">
                  {product.weave}
                </span>
                <span className="px-3 py-1 text-xs font-bold rounded-full bg-blue-100 text-blue-800">
                  {product.fabric}
                </span>
              </div>
              
              <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-serif font-bold mb-4 text-gray-900">
                {product.name}
              </h1>
              
              {/* Rating */}
              <div className="flex flex-wrap items-center gap-4">
                <div className="flex items-center gap-1">
                  {[...Array(5)].map((_, i) => (
                    <Star 
                      key={i} 
                      size={isMobile ? 16 : 18} 
                      className={`${i < Math.floor(product.ratings) ? 'text-[#F6CE71] fill-current' : 'text-gray-300'}`}
                    />
                  ))}
                </div>
                <span className="text-sm text-gray-600">
                  <span className="font-bold text-gray-900">
                    {product.ratings.toFixed(1)}
                  </span> 
                  <span className="mx-1">·</span>
                  <button 
                    onClick={() => setActiveTab('reviews')}
                    className="hover:underline text-[#C40C0C]"
                  >
                    {product.numReviews} verified reviews
                  </button>
                </span>
              </div>
            </div>

            {/* Price */}
            <div className="flex flex-wrap items-baseline gap-4">
              <span className="text-3xl sm:text-4xl font-bold text-gray-900">
                ₹{product.price.toLocaleString()}
              </span>
              {product.originalPrice && (
                <>
                  <span className="text-lg sm:text-xl line-through text-gray-400">
                    ₹{product.originalPrice.toLocaleString()}
                  </span>
                  <span className="px-3 py-1 bg-green-100 text-green-700 text-sm font-bold rounded-full">
                    Save ₹{(product.originalPrice - product.price).toLocaleString()}
                  </span>
                </>
              )}
            </div>

            {/* Stock Status */}
            <div className="flex items-center gap-2">
              <div className={`w-3 h-3 rounded-full ${product.stock > 5 ? 'bg-green-500' : 'bg-orange-500'} animate-pulse`}></div>
              <span className="text-sm font-medium text-gray-700">
                {product.stock > 5 
                  ? 'In Stock' 
                  : product.stock > 0 
                    ? `Only ${product.stock} units left!` 
                    : 'Out of Stock'
                }
              </span>
            </div>

            {/* Color Selection */}
            {product.colors && product.colors.length > 0 && (
              <div className="space-y-3">
                <p className="text-sm font-medium text-gray-700">
                  Color: <span className="text-gray-900 font-bold">
                    {selectedColor || 'Select'}
                  </span>
                </p>
                <div className="flex flex-wrap gap-3">
                  {product.colors.map((color: string) => (
                    <motion.button
                      key={color}
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={() => setSelectedColor(color)}
                      className="group relative"
                    >
                      <div className={`w-10 h-10 sm:w-12 sm:h-12 rounded-full border-2 transition-all duration-300 ${
                        selectedColor === color 
                          ? 'border-[#C40C0C] scale-110' 
                          : 'border-gray-200 hover:border-[#F6CE71]'
                      }`}>
                        <div className="w-full h-full rounded-full" style={{ backgroundColor: color.toLowerCase() }} />
                      </div>
                      <span className="absolute -bottom-6 left-1/2 transform -translate-x-1/2 text-xs whitespace-nowrap text-gray-500 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                        {color}
                      </span>
                    </motion.button>
                  ))}
                </div>
              </div>
            )}

            {/* Size Selection */}
            {product.sizes && product.sizes.length > 0 && (
              <div className="space-y-3">
                <p className="text-sm font-medium text-gray-700">
                  Size: <span className="text-gray-900 font-bold">
                    {selectedSize || 'Select'}
                  </span>
                </p>
                <div className="flex flex-wrap gap-3">
                  {product.sizes.map((size: string) => (
                    <motion.button
                      key={size}
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={() => setSelectedSize(size)}
                      className={`px-4 py-2 rounded-lg border-2 transition-all duration-300 ${
                        selectedSize === size 
                          ? 'border-[#C40C0C] bg-[#C40C0C] text-white' 
                          : 'border-gray-200 hover:border-[#F6CE71] text-gray-700'
                      }`}
                    >
                      {size}
                    </motion.button>
                  ))}
                </div>
              </div>
            )}

            {/* Key Features Grid */}
            <div className="grid grid-cols-2 gap-3 sm:gap-4">
              <div className="flex items-start gap-3 p-3 sm:p-4 rounded-xl bg-gray-50">
                <Gem className="w-4 h-4 sm:w-5 sm:h-5 text-[#C40C0C] shrink-0" />
                <div>
                  <p className="text-xs sm:text-sm font-bold text-gray-900">
                    {product.fabric}
                  </p>
                  <p className="text-xs text-gray-500">
                    Premium Quality
                  </p>
                </div>
              </div>
              <div className="flex items-start gap-3 p-3 sm:p-4 rounded-xl bg-gray-50">
                <Ruler className="w-4 h-4 sm:w-5 sm:h-5 text-[#FF6500] shrink-0" />
                <div>
                  <p className="text-xs sm:text-sm font-bold text-gray-900">
                    {product.length || '6.3 Meters'}
                  </p>
                  <p className="text-xs text-gray-500">
                    {product.blousePiece ? 'Includes Blouse' : 'Blouse Separate'}
                  </p>
                </div>
              </div>
            </div>

            {/* Quantity & Add to Cart */}
            <div className="space-y-4">
              <div className="flex flex-col sm:flex-row sm:items-center gap-4">
                <span className="text-sm font-medium text-gray-700">
                  Quantity:
                </span>
                <div className="flex items-center border border-gray-200 rounded-full w-full sm:w-auto">
                  <motion.button 
                    whileTap={{ scale: 0.9 }}
                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                    className="w-12 h-12 flex items-center justify-center rounded-l-full hover:bg-gray-50 transition-colors"
                    disabled={quantity <= 1}
                  >
                    <Minus size={16} className={quantity <= 1 ? 'text-gray-300' : 'text-gray-700'} />
                  </motion.button>
                  <span className="w-16 text-center font-bold text-lg text-gray-900">
                    {quantity}
                  </span>
                  <motion.button 
                    whileTap={{ scale: 0.9 }}
                    onClick={() => setQuantity(Math.min(product.stock, quantity + 1))}
                    className="w-12 h-12 flex items-center justify-center rounded-r-full hover:bg-gray-50 transition-colors"
                    disabled={quantity >= product.stock}
                  >
                    <Plus size={16} className={quantity >= product.stock ? 'text-gray-300' : 'text-gray-700'} />
                  </motion.button>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <motion.button 
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={handleAddToCart}
                  disabled={product.stock === 0}
                  className="group py-3 sm:py-4 bg-gradient-to-r from-[#C40C0C] to-[#FF6500] text-white font-bold rounded-full hover:shadow-xl transition-all duration-300 flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  <ShoppingBag className="w-4 h-4 sm:w-5 sm:h-5" />
                  Add to Cart
                </motion.button>
                <motion.button 
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={handleBuyNow}
                  disabled={product.stock === 0}
                  className="py-3 sm:py-4 border-2 border-[#C40C0C] text-[#C40C0C] font-bold rounded-full hover:bg-[#C40C0C] hover:text-white transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
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
              className="p-5 sm:p-6 rounded-xl sm:rounded-2xl border border-gray-200 bg-gray-50"
            >
              <div className="flex items-center gap-2 mb-4">
                <MapPin className="w-5 h-5 text-[#C40C0C]" />
                <h3 className="font-serif font-bold text-lg text-gray-900">
                  Check Delivery
                </h3>
              </div>
              
              <div className="flex flex-col sm:flex-row gap-2">
                <input
                  type="text"
                  value={pincode}
                  onChange={(e) => setPincode(e.target.value.replace(/\D/g, '').slice(0, 6))}
                  placeholder="Enter PIN code"
                  className="flex-1 px-4 py-3 border border-gray-200 rounded-xl focus:border-[#FF6500] focus:ring-2 focus:ring-[#FF6500]/20 transition-all bg-white text-gray-900 placeholder-gray-400"
                />
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={handlePincodeCheck}
                  className="px-6 py-3 bg-[#C40C0C] text-white font-bold rounded-xl hover:bg-[#FF6500] transition-colors"
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
                    className={`mt-4 p-4 rounded-xl ${
                      deliveryCheck.available 
                        ? 'bg-green-50 text-green-700'
                        : 'bg-orange-50 text-orange-700'
                    }`}
                  >
                    <div className="flex items-start gap-3">
                      <Truck className="w-5 h-5 shrink-0 mt-0.5" />
                      <div>
                        {deliveryCheck.available ? (
                          <>
                            <p className="font-bold">Available! Get it by {deliveryCheck.date}</p>
                            <p className="text-sm mt-1">Free shipping on orders above ₹5000</p>
                          </>
                        ) : (
                          <>
                            <p className="font-bold">Not available at this PIN code</p>
                            <p className="text-sm mt-1">Try nearby areas or contact support</p>
                          </>
                        )}
                      </div>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>

            {/* Trust Badges */}
            <div className="grid grid-cols-3 gap-3 p-4 sm:p-6 rounded-xl sm:rounded-2xl border border-gray-200 bg-white">
              <div className="text-center">
                <Shield className="w-5 h-5 sm:w-6 sm:h-6 mx-auto mb-2 text-[#C40C0C]" />
                <p className="text-[10px] sm:text-xs font-bold text-gray-700">
                  Handloom Certified
                </p>
              </div>
              <div className="text-center">
                <Lock className="w-5 h-5 sm:w-6 sm:h-6 mx-auto mb-2 text-[#FF6500]" />
                <p className="text-[10px] sm:text-xs font-bold text-gray-700">
                  Secure Payments
                </p>
              </div>
              <div className="text-center">
                <Users className="w-5 h-5 sm:w-6 sm:h-6 mx-auto mb-2 text-[#CC561E]" />
                <p className="text-[10px] sm:text-xs font-bold text-gray-700">
                  Artisan Direct
                </p>
              </div>
            </div>

            {/* Seller Info */}
            {product.weaverInfo && (
              <motion.div 
                whileHover={{ scale: 1.02 }}
                className="flex items-center justify-between p-4 sm:p-6 rounded-xl sm:rounded-2xl border border-gray-200 bg-gradient-to-r from-[#F6CE71]/10 to-transparent"
              >
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 sm:w-12 sm:h-12 bg-gradient-to-br from-[#C40C0C] to-[#FF6500] rounded-full flex items-center justify-center text-white font-bold">
                    {product.weaverInfo.name.charAt(0)}
                  </div>
                  <div>
                    <p className="font-bold text-sm sm:text-base text-gray-900">
                      {product.weaverInfo.name}
                    </p>
                    <p className="text-xs text-gray-500">
                      {product.weaverInfo.generation} • {product.weaverInfo.location}
                    </p>
                  </div>
                </div>
                <Link to={`/weavers/${product.weaverInfo.name}`} className="text-xs sm:text-sm text-[#C40C0C] hover:underline">
                  View Profile →
                </Link>
              </motion.div>
            )}

            {/* Need Help */}
            <div className="grid grid-cols-2 gap-3">
              <motion.button 
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="flex items-center justify-center gap-2 py-3 border border-gray-200 rounded-xl text-gray-600 hover:border-[#C40C0C] hover:bg-[#C40C0C]/5 transition-all"
              >
                <MessageCircle className="w-4 h-4" />
                <span className="text-xs sm:text-sm font-medium">Chat</span>
              </motion.button>
              <motion.button 
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="flex items-center justify-center gap-2 py-3 border border-gray-200 rounded-xl text-gray-600 hover:border-[#C40C0C] hover:bg-[#C40C0C]/5 transition-all"
              >
                <RotateCcw className="w-4 h-4" />
                <span className="text-xs sm:text-sm font-medium">Returns</span>
              </motion.button>
            </div>
          </motion.div>
        </div>

        {/* Tabs Section */}
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="mt-12 sm:mt-16 lg:mt-20"
        >
          {/* Mobile Accordion */}
          {isMobile ? (
            <div className="space-y-3">
              {[
                { id: 'description', label: 'Description', icon: Info },
                { id: 'specifications', label: 'Specifications', icon: Package },
                { id: 'care', label: 'Care Instructions', icon: Leaf },
                { id: 'reviews', label: `Reviews (${product.numReviews})`, icon: Star }
              ].map((tab) => (
                <div key={tab.id} className="border border-gray-200 rounded-xl overflow-hidden bg-white">
                  <button
                    onClick={() => setActiveTab(activeTab === tab.id ? '' : tab.id)}
                    className={`w-full flex items-center justify-between p-4 transition-colors ${
                      activeTab === tab.id ? 'bg-gray-50' : ''
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <tab.icon className={`w-5 h-5 ${
                        activeTab === tab.id ? 'text-[#C40C0C]' : 'text-gray-500'
                      }`} />
                      <span className={`font-medium ${
                        activeTab === tab.id ? 'text-gray-900' : 'text-gray-600'
                      }`}>
                        {tab.label}
                      </span>
                    </div>
                    {activeTab === tab.id ? <ChevronUp size={20} className="text-gray-500" /> : <ChevronDown size={20} className="text-gray-500" />}
                  </button>
                  
                  <AnimatePresence>
                    {activeTab === tab.id && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: 'auto', opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.3 }}
                        className="border-t border-gray-200 overflow-hidden"
                      >
                        <div className="p-4">
                          {tab.id === 'description' && (
                            <div>
                              <p className="text-gray-700 leading-relaxed">
                                {product.description}
                              </p>
                              {product.shortDescription && (
                                <p className="text-gray-500 text-sm mt-4 italic">
                                  {product.shortDescription}
                                </p>
                              )}
                            </div>
                          )}
                          {tab.id === 'specifications' && (
                            <div className="space-y-2">
                              {[
                                { label: 'Fabric', value: product.fabric },
                                { label: 'Weave', value: product.weave },
                                { label: 'Length', value: product.length || '6.3 Meters' },
                                { label: 'Blouse', value: product.blousePiece ? 'Included' : 'Separate' },
                                { label: 'Category', value: product.category },
                                { label: 'Sub Category', value: product.subCategory },
                              ].map((item, idx) => (
                                <div key={idx} className="flex justify-between py-2 border-b border-gray-100">
                                  <span className="text-gray-600">
                                    {item.label}
                                  </span>
                                  <span className="font-medium text-gray-900">
                                    {item.value}
                                  </span>
                                </div>
                              ))}
                            </div>
                          )}
                          {tab.id === 'care' && (
                            <p className="text-gray-700">
                              {product.careInstructions || 'Dry clean only. Store in muslin cloth. Keep away from direct sunlight.'}
                            </p>
                          )}
                          {tab.id === 'reviews' && (
                            <div className="space-y-4">
                              {loadingReviews ? (
                                <div className="flex justify-center py-8">
                                  <div className="w-8 h-8 border-4 border-[#C40C0C] border-t-transparent rounded-full animate-spin"></div>
                                </div>
                              ) : reviews.length > 0 ? (
                                <>
                                  {reviews.slice(0, 2).map(review => (
                                    <div key={review._id} className="border-b border-gray-100 pb-4">
                                      <div className="flex items-center gap-2 mb-2">
                                        <div className="w-8 h-8 bg-gradient-to-br from-[#C40C0C] to-[#FF6500] rounded-full flex items-center justify-center text-white font-bold text-sm">
                                          {review.user.name.charAt(0)}
                                        </div>
                                        <div>
                                          <p className="font-bold text-sm text-gray-900">
                                            {review.user.name}
                                          </p>
                                          <div className="flex items-center gap-1">
                                            {[...Array(5)].map((_, i) => (
                                              <Star key={i} size={12} className={i < review.rating ? 'text-[#F6CE71] fill-current' : 'text-gray-300'} />
                                            ))}
                                          </div>
                                        </div>
                                      </div>
                                      <p className="text-sm text-gray-600">
                                        {review.comment}
                                      </p>
                                      <p className="text-xs text-gray-400 mt-2">
                                        {formatDate(review.createdAt)}
                                      </p>
                                    </div>
                                  ))}
                                  {reviews.length < product.numReviews && (
                                    <button 
                                      onClick={handleLoadMoreReviews}
                                      className="w-full py-2 text-sm font-medium border border-gray-200 rounded-lg text-gray-600 hover:bg-gray-50 transition-colors"
                                    >
                                      Load More Reviews
                                    </button>
                                  )}
                                </>
                              ) : (
                                <p className="text-center text-gray-500 py-4">
                                  No reviews yet. Be the first to review this product!
                                </p>
                              )}
                              
                              {isAuthenticated && (
                                <button className="w-full py-2 bg-[#C40C0C] text-white rounded-lg hover:bg-[#FF6500] transition-colors">
                                  Write a Review
                                </button>
                              )}
                            </div>
                          )}
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              ))}
            </div>
          ) : (
            /* Desktop Tabs */
            <>
              <div className="border-b border-gray-200">
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
                      className={`pb-4 px-2 font-medium transition-all duration-300 relative whitespace-nowrap ${
                        activeTab === tab.id 
                          ? 'text-[#C40C0C]'
                          : 'text-gray-500 hover:text-gray-700'
                      }`}
                    >
                      {tab.label}
                      {activeTab === tab.id && (
                        <motion.div 
                          layoutId="activeTab"
                          className="absolute bottom-0 left-0 w-full h-0.5 bg-gradient-to-r from-[#C40C0C] to-[#FF6500]" 
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
                        <p className="leading-relaxed text-base sm:text-lg text-gray-700">
                          {product.description}
                        </p>
                        {product.tags && product.tags.length > 0 && (
                          <div className="mt-6 flex flex-wrap gap-2">
                            {product.tags.map(tag => (
                              <span key={tag} className="px-3 py-1 bg-gray-100 text-gray-600 text-xs rounded-full">
                                #{tag}
                              </span>
                            ))}
                          </div>
                        )}
                        <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-6">
                          <div className="p-6 rounded-xl bg-gray-50">
                            <h4 className="font-serif font-bold mb-3 text-gray-900">
                              Weaving Technique
                            </h4>
                            <p className="text-sm text-gray-600">
                              Handwoven using traditional {product.weave} technique, passed down through 7 generations of master weavers.
                            </p>
                          </div>
                          <div className="p-6 rounded-xl bg-gray-50">
                            <h4 className="font-serif font-bold mb-3 text-gray-900">
                              Design Inspiration
                            </h4>
                            <p className="text-sm text-gray-600">
                              Inspired by ancient Odisha temples and traditional motifs, each piece tells a unique story of our rich cultural heritage.
                            </p>
                          </div>
                        </div>
                      </div>
                    )}

                    {activeTab === 'specifications' && (
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                        <div className="space-y-4">
                          <h3 className="font-serif font-bold text-xl text-gray-900">
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
                              <div key={idx} className="flex justify-between py-2 border-b border-gray-100">
                                <span className="text-gray-600">
                                  {item.label}
                                </span>
                                <span className="font-medium text-gray-900">
                                  {item.value}
                                </span>
                              </div>
                            ))}
                          </div>
                        </div>
                        <div className="space-y-4">
                          <h3 className="font-serif font-bold text-xl text-gray-900">
                            Shipping Info
                          </h3>
                          <div className="space-y-3">
                            {[
                              { icon: Truck, text: 'Free shipping on orders above ₹5000' },
                              { icon: Clock, text: 'Delivery in 3-5 business days' },
                              { icon: RotateCcw, text: '7-day easy returns' },
                              { icon: Shield, text: '100% authentic handloom guarantee' }
                            ].map((item, idx) => (
                              <div key={idx} className="flex items-start gap-3">
                                <item.icon className="w-5 h-5 shrink-0 text-[#C40C0C]" />
                                <span className="text-gray-600">
                                  {item.text}
                                </span>
                              </div>
                            ))}
                          </div>
                        </div>
                      </div>
                    )}

                    {activeTab === 'care' && (
                      <div className="max-w-3xl">
                        <div className="p-8 rounded-2xl border border-gray-200 bg-gradient-to-br from-blue-50 to-white">
                          <h3 className="font-serif font-bold text-xl mb-6 flex items-center gap-2 text-gray-900">
                            <Leaf className="w-6 h-6 text-green-600" />
                            Care Instructions
                          </h3>
                          <p className="mb-6 text-gray-700">
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
                                <span className="text-sm text-gray-600">
                                  {tip}
                                </span>
                              </div>
                            ))}
                          </div>
                        </div>
                      </div>
                    )}

                    {activeTab === 'reviews' && (
                      <div className="space-y-8">
                        {/* Rating Summary */}
                        <div className="flex flex-col sm:flex-row items-start gap-8">
                          <div className="text-center sm:text-left">
                            <div className="text-5xl sm:text-6xl font-serif font-bold text-[#C40C0C]">
                              {product.ratings.toFixed(1)}
                            </div>
                            <div className="flex items-center gap-1 mt-2 justify-center sm:justify-start">
                              {[...Array(5)].map((_, i) => (
                                <Star key={i} size={16} className={i < Math.floor(product.ratings) ? 'text-[#F6CE71] fill-current' : 'text-gray-300'} />
                              ))}
                            </div>
                            <p className="text-sm mt-2 text-gray-500">
                              Based on {product.numReviews} reviews
                            </p>
                          </div>
                          
                          <div className="flex-1 w-full">
                            {[5,4,3,2,1].map((rating) => {
                              // Calculate percentage for each rating (mock data for now)
                              const percentage = Math.floor(Math.random() * 100);
                              return (
                                <div key={rating} className="flex items-center gap-3 mb-2">
                                  <span className="text-sm w-8 text-gray-600">
                                    {rating} ★
                                  </span>
                                  <div className="flex-1 h-2 rounded-full overflow-hidden bg-gray-100">
                                    <div 
                                      className="h-full bg-gradient-to-r from-[#F6CE71] to-[#FF6500]"
                                      style={{ width: `${percentage}%` }}
                                    />
                                  </div>
                                  <span className="text-sm text-gray-500">
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
                              className="px-6 py-3 bg-[#C40C0C] text-white rounded-full hover:shadow-lg transition-all whitespace-nowrap"
                            >
                              Write a Review
                            </motion.button>
                          ) : (
                            <Link
                              to="/auth"
                              className="px-6 py-3 border-2 border-[#C40C0C] text-[#C40C0C] rounded-full hover:bg-[#C40C0C] hover:text-white transition-all whitespace-nowrap"
                            >
                              Login to Review
                            </Link>
                          )}
                        </div>

                        {/* Customer Reviews */}
                        {loadingReviews ? (
                          <div className="flex justify-center py-12">
                            <div className="w-10 h-10 border-4 border-[#C40C0C] border-t-transparent rounded-full animate-spin"></div>
                          </div>
                        ) : reviews.length > 0 ? (
                          <div className="space-y-6">
                            {reviews.map((review, idx) => (
                              <motion.div 
                                key={review._id}
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: idx * 0.1 }}
                                className="border border-gray-200 rounded-2xl p-6 hover:shadow-lg transition-all bg-white"
                              >
                                <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-4 mb-4">
                                  <div className="flex items-start gap-3">
                                    <div className="w-10 h-10 bg-gradient-to-br from-[#C40C0C] to-[#FF6500] rounded-full flex items-center justify-center text-white font-bold">
                                      {review.user.name.charAt(0)}
                                    </div>
                                    <div>
                                      <p className="font-bold text-gray-900">
                                        {review.user.name}
                                      </p>
                                      <div className="flex flex-wrap items-center gap-2 text-sm">
                                        <div className="flex">
                                          {[...Array(5)].map((_, i) => (
                                            <Star key={i} size={12} className={i < review.rating ? 'text-[#F6CE71] fill-current' : 'text-gray-300'} />
                                          ))}
                                        </div>
                                        <span className="text-xs text-gray-500">
                                          {formatDate(review.createdAt)}
                                        </span>
                                        {review.isVerifiedPurchase && (
                                          <span className="text-xs bg-green-100 text-green-700 px-2 py-0.5 rounded-full">
                                            Verified Purchase
                                          </span>
                                        )}
                                      </div>
                                    </div>
                                  </div>
                                </div>
                                
                                {review.title && (
                                  <h4 className="font-bold text-gray-900 mb-2">{review.title}</h4>
                                )}
                                
                                <p className="mb-4 text-gray-700">
                                  {review.comment}
                                </p>
                                
                                {review.images && review.images.length > 0 && (
                                  <div className="flex gap-2 mb-4">
                                    {review.images.map((img, imgIdx) => (
                                      <img key={imgIdx} src={img.url} alt="Review" className="w-16 h-16 object-cover rounded-lg cursor-pointer hover:opacity-80 transition-opacity" />
                                    ))}
                                  </div>
                                )}
                                
                                <div className="flex items-center gap-4">
                                  <button className="flex items-center gap-1 text-sm text-gray-500 hover:text-[#C40C0C] transition-colors">
                                    <ThumbsUp size={14} />
                                    <span>Helpful ({review.helpful?.length || 0})</span>
                                  </button>
                                  <button className="text-sm text-gray-500 hover:text-[#C40C0C] transition-colors">
                                    Report
                                  </button>
                                </div>
                              </motion.div>
                            ))}
                          </div>
                        ) : (
                          <div className="text-center py-12 bg-gray-50 rounded-2xl">
                            <p className="text-gray-500">No reviews yet. Be the first to review this product!</p>
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
                              className="px-8 py-3 border-2 border-[#C40C0C] text-[#C40C0C] font-bold rounded-full hover:bg-[#C40C0C] hover:text-white transition-all disabled:opacity-50"
                            >
                              {loadingReviews ? 'Loading...' : 'Load More Reviews'}
                            </motion.button>
                          </div>
                        )}
                      </div>
                    )}
                  </motion.div>
                </AnimatePresence>
              </div>
            </>
          )}
        </motion.div>

        {/* You May Also Like */}
        {relatedProducts.length > 0 && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.6 }}
            className="mt-12 sm:mt-16 lg:mt-20"
          >
            <h2 className="text-xl sm:text-2xl lg:text-3xl font-serif font-bold mb-4 sm:mb-6 lg:mb-8 flex items-center gap-2 text-gray-900">
              <Sparkles className="w-5 h-5 sm:w-6 sm:h-6 text-[#F6CE71]" />
              You May Also Like
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
                    <div className="rounded-xl sm:rounded-2xl overflow-hidden shadow-md hover:shadow-xl transition-all duration-500 hover:-translate-y-2 border border-gray-200 bg-white">
                      <div className="relative aspect-[3/4] overflow-hidden">
                        <img 
                          src={product.images[0]?.url} 
                          alt={product.name}
                          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                        />
                        {product.isBestSeller && (
                          <div className="absolute top-2 left-2 px-2 py-1 bg-gradient-to-r from-[#C40C0C] to-[#FF6500] text-white text-[10px] sm:text-xs font-bold rounded-full">
                            Best Seller
                          </div>
                        )}
                      </div>
                      <div className="p-2 sm:p-3 lg:p-4">
                        <h3 className="font-medium text-xs sm:text-sm lg:text-base group-hover:text-[#C40C0C] transition-colors line-clamp-2 mb-1 sm:mb-2 text-gray-900">
                          {product.name}
                        </h3>
                        <div className="flex items-center gap-1 mb-1 sm:mb-2">
                          <Star size={10} className="text-[#F6CE71] fill-current" />
                          <span className="text-xs sm:text-sm font-bold text-gray-900">
                            {product.ratings.toFixed(1)}
                          </span>
                          <span className="text-[10px] sm:text-xs text-gray-500">
                            ({product.numReviews})
                          </span>
                        </div>
                        <div className="flex items-center gap-1 sm:gap-2">
                          <span className="text-sm sm:text-base lg:text-lg font-bold text-[#C40C0C]">
                            ₹{product.price.toLocaleString()}
                          </span>
                          {product.originalPrice && (
                            <span className="text-[10px] sm:text-xs line-through text-gray-400">
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
            className="fixed bottom-0 left-0 right-0 p-4 border-t border-gray-200 z-40 bg-white shadow-lg"
          >
            <div className="flex items-center justify-between gap-4">
              <div>
                <span className="text-lg font-bold text-gray-900">
                  ₹{product.price.toLocaleString()}
                </span>
                {product.originalPrice && (
                  <span className="text-sm line-through ml-2 text-gray-400">
                    ₹{product.originalPrice.toLocaleString()}
                  </span>
                )}
              </div>
              <div className="flex gap-2">
                <button 
                  onClick={() => toggleWishlist(product._id)}
                  className={`p-3 rounded-full transition-all ${
                    isWishlisted 
                      ? 'bg-[#C40C0C] text-white' 
                      : 'bg-gray-100 text-gray-600'
                  }`}
                >
                  <Heart size={18} fill={isWishlisted ? "currentColor" : "none"} />
                </button>
                <button 
                  onClick={handleAddToCart}
                  className="px-6 py-3 bg-gradient-to-r from-[#C40C0C] to-[#FF6500] text-white font-bold rounded-full"
                >
                  Add to Cart
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default ProductDetail;