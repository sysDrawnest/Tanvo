import React, { useState } from 'react';
import { Link } from "react-router-dom";
import { Heart, ShoppingBag, Eye } from 'lucide-react';
import { Product } from '../types';
import { useStore } from '../context/StoreContext';

interface ProductCardProps {
  product: any; // Use any temporarily to avoid type errors
}

const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  const { addToCart, wishlist, toggleWishlist } = useStore();
  const [isHovered, setIsHovered] = useState(false);
  
  // Handle both _id (from backend) and id (from mock data)
  const productId = product._id || product.id;
  const isWishlisted = wishlist.includes(productId);
  
  // Handle images array (could be array of strings or array of objects)
  const productImage = Array.isArray(product.images) 
    ? (typeof product.images[0] === 'string' 
        ? product.images[0] 
        : product.images[0]?.url || 'https://via.placeholder.com/400')
    : 'https://via.placeholder.com/400';
  
  const discountPercentage = product.originalPrice && product.originalPrice > product.price
    ? Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)
    : 0;

  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault();
    addToCart(productId, 1);
  };

  const handleToggleWishlist = (e: React.MouseEvent) => {
    e.preventDefault();
    toggleWishlist(productId);
  };

  return (
    <div 
      className="group relative"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className="flex flex-col bg-white overflow-hidden transition-all duration-300">
        {/* Image Container */}
        <div className="relative aspect-[3/4] overflow-hidden bg-gray-50">
          <Link to={`/product/${productId}`} className="block h-full">
            <img 
              src={productImage} 
              alt={product.name} 
              className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
            />
          </Link>

          {/* Badges */}
          <div className="absolute top-4 left-4 z-10 flex flex-col gap-2">
            {product.isHot && (
              <div className="bg-black text-white text-[10px] px-2.5 py-1 font-black uppercase tracking-widest rounded-sm shadow-sm">
                Hot
              </div>
            )}
            {product.isBestSeller && (
              <div className="bg-[#C40C0C] text-white text-[10px] px-2.5 py-1 font-black uppercase tracking-widest rounded-sm shadow-sm">
                Best Seller
              </div>
            )}
            {discountPercentage > 0 && (
              <div className="bg-[#FF6500] text-white text-[10px] px-2.5 py-1 font-black uppercase tracking-widest rounded-sm shadow-sm">
                -{discountPercentage}%
              </div>
            )}
          </div>

          {/* Action Overlay */}
          <div className={`absolute bottom-6 left-1/2 -translate-x-1/2 flex items-center gap-3 transition-all duration-500 ${
            isHovered ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
          }`}>
            <button 
              onClick={handleToggleWishlist}
              className={`w-10 h-10 rounded-full bg-white flex items-center justify-center shadow-xl hover:bg-[#C40C0C] hover:text-white transition-all ${
                isWishlisted ? 'text-[#C40C0C]' : 'text-gray-900'
              }`}
            >
              <Heart size={18} fill={isWishlisted ? "currentColor" : "none"} />
            </button>
            <button 
              onClick={handleAddToCart}
              className="w-10 h-10 rounded-full bg-white text-gray-900 flex items-center justify-center shadow-xl hover:bg-[#C40C0C] hover:text-white transition-all"
            >
              <ShoppingBag size={18} />
            </button>
            <Link 
              to={`/product/${productId}`}
              className="w-10 h-10 rounded-full bg-white text-gray-900 flex items-center justify-center shadow-xl hover:bg-[#C40C0C] hover:text-white transition-all"
            >
              <Eye size={18} />
            </Link>
          </div>
        </div>

        {/* Content */}
        <div className="pt-4 pb-2">
          <Link to={`/product/${productId}`}>
            <h3 className="text-sm font-medium text-gray-800 hover:text-[#C40C0C] transition-colors truncate mb-1">
              {product.name}
            </h3>
          </Link>
          <div className="flex items-center gap-3">
            <span className="text-base font-bold text-gray-900">
              ₹{product.price?.toLocaleString()}
            </span>
            {product.originalPrice && product.originalPrice > product.price && (
              <span className="text-xs text-gray-400 line-through font-medium">
                ₹{product.originalPrice.toLocaleString()}
              </span>
            )}
          </div>
          
          {/* Ratings */}
          {product.ratings && (
            <div className="flex items-center gap-1 mt-2">
              <div className="flex">
                {[...Array(5)].map((_, i) => (
                  <svg
                    key={i}
                    className={`w-3 h-3 ${
                      i < Math.floor(product.ratings) 
                        ? 'text-[#F6CE71] fill-current' 
                        : 'text-gray-300 fill-current'
                    }`}
                    viewBox="0 0 24 24"
                  >
                    <path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z" />
                  </svg>
                ))}
              </div>
              <span className="text-xs text-gray-500">
                ({product.numReviews || 0})
              </span>
            </div>
          )}
          
          {/* Weaver Info (optional) */}
          {product.weaverInfo?.name && (
            <p className="text-[10px] text-gray-400 mt-2 font-medium">
              By {product.weaverInfo.name}
            </p>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProductCard;