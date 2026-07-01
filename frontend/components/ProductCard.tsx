import React, { useState } from 'react';
import { Link } from "react-router-dom";
import { Heart, ShoppingBag } from 'lucide-react';
import { useStore } from '../context/StoreContext';

interface ProductCardProps {
  product: any;
  inverse?: boolean;
}

const ProductCard: React.FC<ProductCardProps> = ({ product, inverse = false }) => {
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
          margin-bottom: 14px;
        }

        .pc-img {
          width: 100%;
          height: 100%;
          object-fit: cover;
          object-position: center top;
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
          top: 10px;
          left: 10px;
          display: flex;
          flex-direction: column;
          gap: 4px;
          z-index: 2;
        }
        .pc-badge-tag {
          display: inline-block;
          font-family: 'Cinzel', serif;
          font-size: 7px;
          font-weight: 500;
          letter-spacing: 0.25em;
          text-transform: uppercase;
          padding: 4px 8px;
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
          bottom: 12px;
          right: 12px;
          display: flex;
          flex-direction: column;
          gap: 6px;
          z-index: 2;
          opacity: 0;
          transform: translateY(6px);
          transition: opacity 0.35s ease, transform 0.35s ease;
        }
        .pc-wrap:hover .pc-actions { opacity: 1; transform: translateY(0); }

        .pc-action-btn {
          width: 32px;
          height: 32px;
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
          transform: scale(1.08);
        }
        .pc-action-btn:hover svg { color: var(--ivory) !important; }
        .pc-action-btn.wishlisted { background: var(--terra); border-color: var(--terra); }
        .pc-action-btn.wishlisted svg { color: var(--ivory) !important; }

        /* Info area */
        .pc-info {
          display: flex;
          justify-content: space-between;
          align-items: flex-start;
          gap: 8px;
        }
        .pc-name-wrap {
          flex: 1;
          min-width: 0;
        }
        .pc-weave {
          font-family: 'Cinzel', serif;
          font-size: 7.5px;
          font-weight: 500;
          letter-spacing: 0.28em;
          text-transform: uppercase;
          color: var(--terra);
          margin-bottom: 4px;
          display: block;
        }
        .pc-name {
          font-family: 'Cormorant Garamond', serif;
          font-size: clamp(15px, 1.5vw, 20px);
          font-weight: 400;
          color: var(--pc-text-primary);
          line-height: 1.2;
          text-decoration: none;
          transition: color 0.3s ease;
          display: block;
        }
        .pc-wrap:hover .pc-name { color: var(--terra); }

        .pc-price-wrap {
          text-align: right;
          flex-shrink: 0;
          display: flex;
          flex-direction: column;
          align-items: flex-end;
          gap: 2px;
        }
        .pc-price {
          font-family: 'Inter', sans-serif;
          font-size: clamp(15px, 1.5vw, 17px);
          font-weight: 700;
          color: var(--pc-text-primary);
          display: block;
          letter-spacing: 0.02em;
        }
        .pc-price-original {
          font-family: 'Inter', sans-serif;
          font-size: 12px;
          font-weight: 500;
          color: var(--pc-text-muted);
          text-decoration: line-through;
          display: block;
        }

        .pc-rating-wrap {
          display: flex;
          align-items: center;
          gap: 4px;
          margin-top: 4px;
        }
        .pc-rating-val {
          font-family: 'Raleway', sans-serif;
          font-size: 10px;
          font-weight: 500;
          color: var(--stone);
        }

        /* ── Mobile Optimization (2-column Boutique layout) ── */
        @media (max-width: 640px) {
          .pc-img-frame {
            aspect-ratio: 2/3 !important;
            margin-bottom: 8px !important;
          }
          .pc-img {
            object-position: center top !important;
          }
          .pc-weave {
            font-size: 7px !important;
            letter-spacing: 0.15em !important;
            margin-bottom: 2px !important;
          }
          .pc-name {
            font-size: 13.5px !important;
            line-height: 1.25 !important;
            display: -webkit-box !important;
            -webkit-line-clamp: 2 !important;
            -webkit-box-orient: vertical !important;
            overflow: hidden !important;
          }
          .pc-price {
            font-size: 14px !important;
          }
          .pc-price-original {
            font-size: 11px !important;
            margin-top: 0 !important;
          }
          .pc-info {
            flex-direction: column !important;
            gap: 2px !important;
            align-items: flex-start !important;
          }
          .pc-price-wrap {
            text-align: left !important;
            margin-top: 3px !important;
            flex-direction: row !important;
            align-items: baseline !important;
            gap: 6px !important;
          }
          .pc-badge {
            top: 8px !important;
            left: 8px !important;
            gap: 3px !important;
          }
          .pc-badge-tag {
            font-size: 6px !important;
            padding: 3px 6px !important;
            letter-spacing: 0.15em !important;
          }
          .pc-actions {
            opacity: 1 !important;
            transform: translateY(0) !important;
            bottom: 8px !important;
            right: 8px !important;
            gap: 5px !important;
          }
          .pc-action-btn {
            width: 28px !important;
            height: 28px !important;
            background: rgba(249, 245, 238, 0.95) !important;
          }
          .pc-action-btn svg {
            width: 12px !important;
            height: 12px !important;
          }
          .pc-rating-wrap {
            margin-top: 2px !important;
          }
          .pc-rating-val {
            font-size: 9px !important;
          }
        }
      `}</style>

      <div className="pc-wrap" style={{ '--pc-text-primary': inverse ? 'var(--ivory)' : 'var(--ink)', '--pc-text-muted': inverse ? 'rgba(255,255,255,0.6)' : 'var(--stone)' } as React.CSSProperties}>
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

            {/* Rating */}
            {(product.ratings || product.rating || product.averageRating) && (
              <div className="pc-rating-wrap">
                <svg
                  className="w-3 h-3 text-[#C9A84C] fill-current"
                  viewBox="0 0 20 20"
                  style={{ display: 'inline-block' }}
                >
                  <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                </svg>
                <span className="pc-rating-val">
                  {Number(product.ratings || product.rating || product.averageRating).toFixed(1)}
                  {typeof (product.numReviews || product.reviewsCount) === 'number' && ` (${product.numReviews || product.reviewsCount})`}
                </span>
              </div>
            )}
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