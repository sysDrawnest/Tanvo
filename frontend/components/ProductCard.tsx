import React, { useState } from 'react';
import { Link } from "react-router-dom";
import { Heart, ShoppingBag } from 'lucide-react';
import { useStore } from '../context/StoreContext';

interface ProductCardProps {
  product: any;
}

const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  const { addToCart, wishlist, toggleWishlist } = useStore();
  const [imageLoaded, setImageLoaded] = useState(false);

  const productId = product._id || product.id;
  const isWishlisted = wishlist.includes(productId);

  const productImage = Array.isArray(product.images)
    ? (typeof product.images[0] === 'string'
      ? product.images[0]
      : product.images[0]?.url || '')
    : '';

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
    <>
      <style>{`
        .pc-wrap {
          position: relative;
          cursor: pointer;
        }

        /* ── Image frame ── */
        .pc-img-frame {
          position: relative;
          aspect-ratio: 3/4;
          overflow: hidden;
          background: var(--ivory-deep);
          margin-bottom: 20px;
        }

        .pc-img {
          width: 100%;
          height: 100%;
          object-fit: cover;
          display: block;
          transition: transform 1.1s cubic-bezier(0.25,0.46,0.45,0.94), opacity 0.5s ease;
          transform: scale(1.04);
        }
        .pc-img.loaded { opacity: 1; }
        .pc-img:not(.loaded) { opacity: 0; }
        .pc-wrap:hover .pc-img { transform: scale(1.0); }

        /* Skeleton shimmer */
        .pc-skeleton {
          position: absolute;
          inset: 0;
          background: linear-gradient(105deg, var(--ivory-deep) 30%, var(--ivory-warm) 50%, var(--ivory-deep) 70%);
          background-size: 200% 100%;
          animation: pcShimmer 1.8s infinite;
        }
        @keyframes pcShimmer {
          0%   { background-position: 200% 0; }
          100% { background-position: -200% 0; }
        }

        /* Cinematic overlay on hover */
        .pc-overlay {
          position: absolute;
          inset: 0;
          background: linear-gradient(
            160deg,
            rgba(249,245,238,0) 0%,
            rgba(249,245,238,0) 55%,
            rgba(249,245,238,0.6) 100%
          );
          opacity: 0;
          transition: opacity 0.5s ease;
          pointer-events: none;
        }
        .pc-wrap:hover .pc-overlay { opacity: 1; }

        /* Corner accent */
        .pc-corner-tl, .pc-corner-br {
          position: absolute;
          width: 16px;
          height: 16px;
          opacity: 0;
          transition: opacity 0.4s ease 0.05s, transform 0.4s ease 0.05s;
        }
        .pc-corner-tl {
          top: 12px; left: 12px;
          border-top: 1px solid var(--terra);
          border-left: 1px solid var(--terra);
          transform: translate(-4px,-4px);
        }
        .pc-corner-br {
          bottom: 12px; right: 12px;
          border-bottom: 1px solid var(--terra);
          border-right: 1px solid var(--terra);
          transform: translate(4px,4px);
        }
        .pc-wrap:hover .pc-corner-tl { opacity: 1; transform: translate(0,0); }
        .pc-wrap:hover .pc-corner-br { opacity: 1; transform: translate(0,0); }

        /* Badges */
        .pc-badge {
          position: absolute;
          top: 14px;
          left: 14px;
          display: flex;
          flex-direction: column;
          gap: 6px;
          z-index: 2;
        }
        .pc-badge-tag {
          display: inline-block;
          font-family: 'Cinzel', serif;
          font-size: 7px;
          font-weight: 500;
          letter-spacing: 0.25em;
          text-transform: uppercase;
          padding: 5px 10px;
          background: var(--ink);
          color: var(--ivory);
        }
        .pc-badge-tag.terra {
          background: var(--terra);
          color: var(--ivory);
        }
        .pc-badge-tag.sale {
          background: var(--ivory-warm);
          color: var(--terra);
          border: 1px solid var(--terra);
        }

        /* Quick actions */
        .pc-actions {
          position: absolute;
          bottom: 14px;
          right: 14px;
          display: flex;
          flex-direction: column;
          gap: 8px;
          z-index: 2;
          opacity: 0;
          transform: translateY(8px);
          transition: opacity 0.35s ease, transform 0.35s ease;
        }
        .pc-wrap:hover .pc-actions { opacity: 1; transform: translateY(0); }

        .pc-action-btn {
          width: 36px;
          height: 36px;
          background: rgba(249,245,238,0.92);
          backdrop-filter: blur(6px);
          border: 1px solid var(--ivory-deep);
          display: flex;
          align-items: center;
          justify-content: center;
          cursor: pointer;
          transition: background 0.25s ease, border-color 0.25s ease, transform 0.25s ease;
        }
        .pc-action-btn:hover {
          background: var(--ink);
          border-color: var(--ink);
          transform: scale(1.1);
        }
        .pc-action-btn:hover svg { color: var(--ivory) !important; }
        .pc-action-btn.wishlisted { background: var(--terra); border-color: var(--terra); }
        .pc-action-btn.wishlisted svg { color: var(--ivory) !important; }

        /* Info area */
        .pc-info {
          display: flex;
          justify-content: space-between;
          align-items: flex-start;
          gap: 12px;
        }
        .pc-name-wrap {}
        .pc-weave {
          font-family: 'Cinzel', serif;
          font-size: 7.5px;
          font-weight: 500;
          letter-spacing: 0.28em;
          text-transform: uppercase;
          color: var(--terra);
          margin-bottom: 6px;
          display: block;
        }
        .pc-name {
          font-family: 'Cormorant Garamond', serif;
          font-size: clamp(17px, 1.6vw, 22px);
          font-weight: 400;
          color: var(--ink);
          line-height: 1.15;
          text-decoration: none;
          transition: color 0.3s ease;
          display: block;
        }
        .pc-wrap:hover .pc-name { color: var(--terra); }

        .pc-price-wrap { text-align: right; flex-shrink: 0; }
        .pc-price {
          font-family: 'Cormorant Garamond', serif;
          font-size: clamp(17px, 1.6vw, 21px);
          font-weight: 400;
          font-style: italic;
          color: var(--ink);
          display: block;
        }
        .pc-price-original {
          font-family: 'Raleway', sans-serif;
          font-size: 10px;
          font-weight: 400;
          color: var(--stone);
          text-decoration: line-through;
          display: block;
          margin-top: 2px;
        }
      `}</style>

      <div className="pc-wrap">
        <div className="pc-img-frame">
          <Link to={`/product/${productId}`} className="block w-full h-full">
            {!imageLoaded && <div className="pc-skeleton" />}
            <img
              src={productImage}
              alt={product.name}
              onLoad={() => setImageLoaded(true)}
              className={`pc-img ${imageLoaded ? 'loaded' : ''}`}
            />
          </Link>

          {/* Cinematic overlay */}
          <div className="pc-overlay" />

          {/* Corner accents */}
          <div className="pc-corner-tl" />
          <div className="pc-corner-br" />

          {/* Badges */}
          <div className="pc-badge">
            {product.isHot && (
              <span className="pc-badge-tag terra">New</span>
            )}
            {product.isBestSeller && (
              <span className="pc-badge-tag">Bestseller</span>
            )}
            {discountPercentage > 0 && (
              <span className="pc-badge-tag sale">−{discountPercentage}%</span>
            )}
          </div>

          {/* Actions */}
          <div className="pc-actions">
            <button
              onClick={handleToggleWishlist}
              className={`pc-action-btn ${isWishlisted ? 'wishlisted' : ''}`}
              aria-label="Wishlist"
            >
              <Heart
                size={15}
                fill={isWishlisted ? 'currentColor' : 'none'}
                style={{ color: isWishlisted ? 'var(--ivory)' : 'var(--ink)' }}
              />
            </button>
            <button
              onClick={handleAddToCart}
              className="pc-action-btn"
              aria-label="Add to cart"
            >
              <ShoppingBag size={15} style={{ color: 'var(--ink)' }} />
            </button>
          </div>
        </div>

        {/* Product info */}
        <div className="pc-info">
          <div className="pc-name-wrap">
            <span className="pc-weave">{product.weave || product.category}</span>
            <Link to={`/product/${productId}`} className="pc-name">
              {product.name}
            </Link>
          </div>
          <div className="pc-price-wrap">
            <span className="pc-price">₹{product.price?.toLocaleString()}</span>
            {product.originalPrice && product.originalPrice > product.price && (
              <span className="pc-price-original">₹{product.originalPrice?.toLocaleString()}</span>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default ProductCard;