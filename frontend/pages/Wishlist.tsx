import React, { useState, useEffect } from 'react';
import { Link } from "react-router-dom";
import { Heart, ShoppingBag, Trash2, ArrowRight, ShoppingCart } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useStore } from '../context/StoreContext';
import API from '../services/api';

interface WishlistProduct {
  _id: string;
  name: string;
  price: number;
  originalPrice?: number;
  images: Array<{ url: string; isPrimary: boolean }>;
  category: string;
  weave: string;
  fabric: string;
  ratings: number;
  numReviews: number;
  isBestSeller?: boolean;
  stock: number;
}

const Wishlist: React.FC = () => {
  const { wishlist, toggleWishlist, addToCart, isAuthenticated } = useStore();
  const [products, setProducts] = useState<WishlistProduct[]>([]);
  const [loading, setLoading] = useState(true);
  const [movingToCart, setMovingToCart] = useState<string | null>(null);

  // Fetch wishlist products
  useEffect(() => {
    if (isAuthenticated && wishlist.length > 0) {
      fetchWishlistProducts();
    } else {
      setProducts([]);
      setLoading(false);
    }
  }, [wishlist, isAuthenticated]);

  const fetchWishlistProducts = async () => {
    try {
      setLoading(true);
      // Fetch all products in wishlist
      const productPromises = wishlist.map(id => 
        API.get(`/products/${id}`).then(res => res.data)
      );
      
      const results = await Promise.all(productPromises);
      setProducts(results);
    } catch (error) {
      console.error('Error fetching wishlist products:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleRemoveFromWishlist = async (productId: string) => {
    await toggleWishlist(productId);
    // Update local state
    setProducts(prev => prev.filter(p => p._id !== productId));
  };

  const handleMoveToCart = async (product: WishlistProduct) => {
    if (product.stock <= 0) {
      alert('Sorry, this product is out of stock');
      return;
    }

    setMovingToCart(product._id);
    try {
      await addToCart(product._id, 1);
      // Optionally remove from wishlist after adding to cart
      // await handleRemoveFromWishlist(product._id);
      
      // Show success message
      const toast = document.createElement('div');
      toast.className = 'fixed top-24 right-4 bg-green-500 text-white px-6 py-3 rounded-lg shadow-lg z-50 animate-slideIn';
      toast.textContent = 'Added to cart successfully!';
      document.body.appendChild(toast);
      setTimeout(() => toast.remove(), 3000);
    } catch (error) {
      console.error('Error adding to cart:', error);
    } finally {
      setMovingToCart(null);
    }
  };

  const handleAddAllToCart = async () => {
    const inStockProducts = products.filter(p => p.stock > 0);
    
    if (inStockProducts.length === 0) {
      alert('No items in stock to add to cart');
      return;
    }

    try {
      for (const product of inStockProducts) {
        await addToCart(product._id, 1);
      }
      
      // Show success message
      const toast = document.createElement('div');
      toast.className = 'fixed top-24 right-4 bg-green-500 text-white px-6 py-3 rounded-lg shadow-lg z-50 animate-slideIn';
      toast.textContent = `Added ${inStockProducts.length} items to cart!`;
      document.body.appendChild(toast);
      setTimeout(() => toast.remove(), 3000);
    } catch (error) {
      console.error('Error adding all to cart:', error);
    }
  };

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0
    }).format(price);
  };

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-white pt-32 pb-24">
        <div className="container-custom">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="py-32 text-center"
          >
            <div className="mb-10 flex justify-center">
              <div className="p-12 bg-gray-50 rounded-full relative">
                <Heart size={64} className="text-slate-200" strokeWidth={1} />
              </div>
            </div>
            <h2 className="text-4xl font-serif font-bold mb-4">Login to view your wishlist</h2>
            <p className="text-slate-500 max-w-sm mx-auto mb-10 font-medium">
              Please login to access your saved items and personalized collections.
            </p>
            <Link 
              to="/auth" 
              className="btn-primary !px-12 !py-5 shadow-2xl inline-flex items-center gap-3"
            >
              Login Now <ArrowRight size={16} />
            </Link>
          </motion.div>
        </div>
      </div>
    );
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-white pt-32 pb-24">
        <div className="container-custom">
          <div className="flex justify-center items-center py-32">
            <div className="w-16 h-16 border-4 border-[#C40C0C] border-t-transparent rounded-full animate-spin"></div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white pt-32 pb-24">
      <div className="container-custom">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-16 gap-6">
          <motion.div 
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="space-y-4"
          >
            <p className="text-[#C40C0C] font-black uppercase tracking-[0.3em] text-xs">Your Curated Collection</p>
            <h1 className="text-5xl md:text-7xl lg:text-8xl font-serif font-bold tracking-tight">Wishlist</h1>
          </motion.div>
          
          <motion.div 
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            className="flex items-center gap-4"
          >
            <span className="text-slate-400 font-bold uppercase tracking-widest text-xs">
              {products.length} {products.length === 1 ? 'Item' : 'Items'} Saved
            </span>
            {products.length > 0 && (
              <button
                onClick={handleAddAllToCart}
                className="px-6 py-3 bg-black text-white text-xs font-black uppercase tracking-widest hover:bg-[#C40C0C] transition-colors rounded-full"
              >
                Add All to Cart
              </button>
            )}
          </motion.div>
        </div>

        <AnimatePresence mode="wait">
          {products.length > 0 ? (
            <motion.div 
              key="list"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-x-6 gap-y-16"
            >
              {products.map((product) => (
                <motion.div 
                  key={product._id}
                  layout
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  className="relative group"
                >
                  <Link to={`/product/${product._id}`} className="block">
                    <div className="relative aspect-[3/4] overflow-hidden bg-gray-100 mb-4">
                      <img 
                        src={product.images[0]?.url} 
                        alt={product.name}
                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                      />
                      {product.isBestSeller && (
                        <span className="absolute top-3 left-3 px-2 py-1 bg-gradient-to-r from-[#C40C0C] to-[#FF6500] text-white text-[10px] font-bold rounded-full">
                          Best Seller
                        </span>
                      )}
                      {product.stock <= 0 && (
                        <span className="absolute top-3 right-3 px-2 py-1 bg-black/80 text-white text-[10px] font-bold rounded-full">
                          Out of Stock
                        </span>
                      )}
                    </div>
                    
                    <h3 className="font-bold text-gray-900 mb-1 line-clamp-2 group-hover:text-[#C40C0C] transition-colors">
                      {product.name}
                    </h3>
                    
                    <div className="flex items-center gap-2 mb-2">
                      <span className="text-sm font-bold text-gray-900">
                        {formatPrice(product.price)}
                      </span>
                      {product.originalPrice && (
                        <span className="text-xs line-through text-gray-400">
                          {formatPrice(product.originalPrice)}
                        </span>
                      )}
                    </div>

                    <div className="flex items-center gap-1 mb-3">
                      <div className="flex">
                        {[...Array(5)].map((_, i) => (
                          <svg
                            key={i}
                            className={`w-3 h-3 ${
                              i < Math.floor(product.ratings)
                                ? 'text-[#F6CE71]'
                                : 'text-gray-300'
                            }`}
                            fill="currentColor"
                            viewBox="0 0 20 20"
                          >
                            <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                          </svg>
                        ))}
                      </div>
                      <span className="text-xs text-gray-500">
                        ({product.numReviews})
                      </span>
                    </div>

                    <p className="text-xs text-gray-500 mb-3">
                      {product.weave} • {product.fabric}
                    </p>
                  </Link>

                  <div className="flex items-center gap-2">
                    <button 
                      onClick={() => handleMoveToCart(product)}
                      disabled={movingToCart === product._id || product.stock <= 0}
                      className="flex-1 py-3 bg-black text-white text-[10px] font-black uppercase tracking-widest hover:bg-[#C40C0C] transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                    >
                      {movingToCart === product._id ? (
                        <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                      ) : (
                        <>
                          <ShoppingCart size={14} />
                          {product.stock > 0 ? 'Move to Cart' : 'Out of Stock'}
                        </>
                      )}
                    </button>
                    
                    <button 
                      onClick={() => handleRemoveFromWishlist(product._id)}
                      className="w-12 h-12 bg-gray-100 rounded-full flex items-center justify-center text-gray-500 hover:text-red-600 hover:bg-red-50 transition-colors"
                      title="Remove from Wishlist"
                    >
                      <Trash2 size={16} />
                    </button>
                  </div>
                </motion.div>
              ))}
            </motion.div>
          ) : (
            <motion.div 
              key="empty"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="py-32 text-center"
            >
              <div className="mb-10 flex justify-center">
                <div className="p-12 bg-gray-50 rounded-full relative">
                  <Heart size={64} className="text-slate-200" strokeWidth={1} />
                  <div className="absolute inset-0 flex items-center justify-center animate-pulse">
                    <Heart size={32} className="text-[#C40C0C]/20" strokeWidth={1} />
                  </div>
                </div>
              </div>
              <h2 className="text-4xl font-serif font-bold mb-4">Your wishlist is empty</h2>
              <p className="text-slate-500 max-w-sm mx-auto mb-10 font-medium">
                Save your favorite handloom masterpieces to your wishlist and revisit them anytime.
              </p>
              <Link 
                to="/shop" 
                className="btn-primary !px-12 !py-5 shadow-2xl inline-flex items-center gap-3"
              >
                Explore Collections <ArrowRight size={16} />
              </Link>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Style Tip */}
        {products.length > 0 && (
          <motion.div 
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="mt-32 p-12 bg-gray-50 rounded-[3rem] text-center"
          >
            <p className="text-xs font-black uppercase tracking-[0.4em] text-[#C40C0C] mb-4">Pro Tip</p>
            <h3 className="text-3xl font-serif font-bold mb-6 italic">"A handloom saree is an investment in art."</h3>
            <p className="text-slate-500 max-w-xl mx-auto font-medium">
              Every item in your wishlist supports a master weaver's legacy. Consider completing your selection while these limited-edition weaves are still in stock.
            </p>
            
            {/* Quick Stats */}
            <div className="grid grid-cols-3 gap-8 mt-12 max-w-2xl mx-auto">
              <div>
                <p className="text-2xl font-bold text-gray-900">
                  {products.reduce((acc, p) => acc + (p.stock > 0 ? 1 : 0), 0)}
                </p>
                <p className="text-xs text-gray-500 uppercase tracking-widest">In Stock</p>
              </div>
              <div>
                <p className="text-2xl font-bold text-gray-900">
                  {products.reduce((acc, p) => acc + p.price, 0).toLocaleString()}
                </p>
                <p className="text-xs text-gray-500 uppercase tracking-widest">Total Value</p>
              </div>
              <div>
                <p className="text-2xl font-bold text-gray-900">
                  {products.filter(p => p.isBestSeller).length}
                </p>
                <p className="text-xs text-gray-500 uppercase tracking-widest">Best Sellers</p>
              </div>
            </div>
          </motion.div>
        )}
      </div>
    </div>
  );
};

export default Wishlist;