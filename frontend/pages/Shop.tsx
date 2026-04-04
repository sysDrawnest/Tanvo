import React, { useState, useEffect, useRef } from 'react';
import { useSearchParams } from "react-router-dom";
import { ChevronDown, X } from 'lucide-react';
import { Category } from '../types';
import ProductCard from '../components/ProductCard';
import { useStore } from '../context/StoreContext';
import API from '../services/api';
import { motion, AnimatePresence } from 'framer-motion';

const Shop: React.FC = () => {
  const { fetchProducts: fetchStoreProducts } = useStore();
  const [searchParams, setSearchParams] = useSearchParams();
  const [sortBy, setSortBy] = useState('newest');
  const [products, setProducts] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [totalCount, setTotalCount] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [activeOpenFilter, setActiveOpenFilter] = useState<string | null>(null);

  const activeCategory = searchParams.get('category');
  const activeWeave = searchParams.get('weave');
  const activeFabric = searchParams.get('fabric');
  const activePriceRange = searchParams.get('price');
  const maxPriceParam = searchParams.get('maxPrice');
  const isPremiumParam = searchParams.get('isPremium');
  const searchQuery = searchParams.get('q');

  const categories = Object.values(Category);
  const weaves = ['Sambalpuri', 'Bomkai', 'Ikat', 'Khandua', 'Pasapali', 'Sonepuri'];
  const fabrics = ['Silk', 'Cotton', 'Tussar', 'Matka', 'Linen', 'Muslin'];
  const priceRanges = [
    { label: 'Under ₹5,000', min: 0, max: 5000 },
    { label: '₹5,000 – ₹10,000', min: 5000, max: 10000 },
    { label: '₹10,000 – ₹20,000', min: 10000, max: 20000 },
    { label: 'Over ₹20,000', min: 20000, max: 1000000 },
  ];

  const sortParam = searchParams.get('sort');

  useEffect(() => {
    if (sortParam) {
      setSortBy(sortParam);
    }
  }, [sortParam]);

  useEffect(() => {
    fetchProducts();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [searchParams, sortBy, currentPage]);

  // Close dropdowns on outside click
  useEffect(() => {
    const handler = () => setActiveOpenFilter(null);
    if (activeOpenFilter) window.addEventListener('click', handler);
    return () => window.removeEventListener('click', handler);
  }, [activeOpenFilter]);

  const fetchProducts = async () => {
    setLoading(true);
    try {
      const params: Record<string, any> = {
        page: currentPage,
        limit: 12,
        sort: sortBy,
      };
      if (searchQuery) params.search = searchQuery;
      if (activeCategory) params.category = activeCategory;
      if (activeWeave) params.weave = activeWeave;
      if (activeFabric) params.fabric = activeFabric;
      if (maxPriceParam) params.maxPrice = Number(maxPriceParam);
      if (isPremiumParam) params.isPremium = isPremiumParam === 'true';
      if (activePriceRange) {
        const range = priceRanges.find(r => r.label === activePriceRange);
        if (range) {
          params.minPrice = range.min;
          params.maxPrice = range.max;
        }
      }
      const { data } = await API.get('/products', { params });
      setProducts(data.products || []);
      setTotalCount(data.total || 0);
      setTotalPages(data.pages || 1);
    } catch (error) {
      console.error('Error fetching products:', error);
      setProducts([]);
    } finally {
      setLoading(false);
    }
  };

  const updateFilter = (key: string, value: string | null) => {
    const next = new URLSearchParams(searchParams);
    if (value === null) next.delete(key);
    else next.set(key, value);
    setSearchParams(next);
    setCurrentPage(1);
    setActiveOpenFilter(null);
  };

  const clearFilters = () => {
    setSearchParams({});
    setCurrentPage(1);
  };

  const activeFilterCount = [activeCategory, activeWeave, activeFabric, activePriceRange, searchQuery, maxPriceParam, isPremiumParam].filter(Boolean).length;

  // ─── Filter Dropdown ───────────────────────────────────────────────────────
  const FilterDropdown = ({
    label, options, activeValue, paramKey,
  }: { label: string; options: string[]; activeValue: string | null; paramKey: string }) => {
    const isOpen = activeOpenFilter === paramKey;
    return (
      <div className="shop-filter-wrap" style={{ position: 'relative' }}>
        <button
          className={`shop-filter-btn${isOpen ? ' open' : ''}${activeValue ? ' active' : ''}`}
          onClick={(e) => { e.stopPropagation(); setActiveOpenFilter(isOpen ? null : paramKey); }}
        >
          <span className="shop-filter-label">
            {label}
            {activeValue && <span className="shop-filter-active-val"> · {activeValue}</span>}
          </span>
          <ChevronDown size={11} className={`shop-filter-chevron${isOpen ? ' rotated' : ''}`} />
        </button>
        <AnimatePresence>
          {isOpen && (
            <>
              <div style={{ position: 'fixed', inset: 0, zIndex: 40 }} onClick={() => setActiveOpenFilter(null)} />
              <motion.div
                className="shop-filter-menu"
                initial={{ opacity: 0, y: 8, scale: 0.97 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: 8, scale: 0.97 }}
                transition={{ duration: 0.22, ease: [0.25, 0.46, 0.45, 0.94] }}
                onClick={(e) => e.stopPropagation()}
              >
                <button
                  className={`shop-menu-item${!activeValue ? ' selected' : ''}`}
                  onClick={() => updateFilter(paramKey, null)}
                >
                  All {label}s
                </button>
                {options.map(opt => (
                  <button
                    key={opt}
                    className={`shop-menu-item${activeValue === opt ? ' selected' : ''}`}
                    onClick={() => updateFilter(paramKey, opt)}
                  >
                    {opt}
                  </button>
                ))}
              </motion.div>
            </>
          )}
        </AnimatePresence>
      </div>
    );
  };

  const viewedCount = Math.min(products.length, totalCount);
  const progressPct = totalCount > 0 ? (viewedCount / totalCount) * 100 : 0;

  return (
    <>
      <style>{`
        /* ── GLOBAL PAGE ── */
        .shop-page {
          min-height: 100vh;
          background: var(--ivory);
          padding-top: 0;
          padding-bottom: 120px;
        }

        /* ── HERO ── */
        .shop-hero {
          position: relative;
          width: 100%;
          height: clamp(320px, 45vw, 580px);
          overflow: hidden;
        }
        .shop-hero img {
          width: 100%;
          height: 100%;
          object-fit: cover;
          object-position: center;
          display: block;
          filter: brightness(0.72);
        }
        .shop-hero-overlay {
          position: absolute;
          inset: 0;
          background: linear-gradient(
            180deg,
            rgba(28,22,18,0.1) 0%,
            rgba(28,22,18,0.0) 40%,
            rgba(28,22,18,0.82) 100%
          );
        }
        .shop-hero-text {
          position: absolute;
          bottom: clamp(32px, 5vw, 64px);
          left: clamp(20px, 6vw, 96px);
        }
        .shop-hero-eyebrow {
          font-family: 'Cinzel', serif;
          font-size: 9px;
          letter-spacing: 0.35em;
          color: var(--terra);
          text-transform: uppercase;
          margin-bottom: 14px;
          display: flex;
          align-items: center;
          gap: 12px;
        }
        .shop-hero-eyebrow::before {
          content: '';
          display: inline-block;
          width: 28px;
          height: 1px;
          background: var(--terra);
        }
        .shop-hero-title {
          font-family: 'Cormorant Garamond', serif;
          font-size: clamp(52px, 7vw, 100px);
          font-weight: 300;
          color: var(--ivory);
          line-height: 0.9;
          letter-spacing: -0.02em;
        }
        .shop-hero-title em { font-style: italic; color: var(--terra); }

        .shop-hero-count {
          position: absolute;
          bottom: clamp(32px, 5vw, 64px);
          right: clamp(20px, 6vw, 96px);
          text-align: right;
        }
        .shop-hero-count-label {
          font-family: 'Cinzel', serif;
          font-size: 8px;
          letter-spacing: 0.3em;
          color: rgba(249,245,238,0.5);
          text-transform: uppercase;
          display: block;
          margin-bottom: 6px;
        }
        .shop-hero-count-num {
          font-family: 'Cormorant Garamond', serif;
          font-size: clamp(28px, 3.5vw, 48px);
          font-weight: 300;
          font-style: italic;
          color: var(--ivory);
        }

        /* ── MAIN CONTENT ── */
        .shop-main {
          max-width: 1600px;
          margin: 0 auto;
          padding: 0 clamp(20px, 6vw, 96px);
        }

        /* ── STICKY FILTER BAR ── */
        .shop-filter-bar {
          position: sticky;
          top: 72px;
          z-index: 40;
          background: rgba(249,245,238,0.97);
          backdrop-filter: blur(12px);
          border-bottom: 1px solid var(--ivory-deep);
          padding: 18px 0;
          margin: 0 calc(-1 * clamp(20px, 6vw, 96px));
          padding-left: clamp(20px, 6vw, 96px);
          padding-right: clamp(20px, 6vw, 96px);
        }
        .shop-filter-inner {
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: 16px;
          flex-wrap: wrap;
        }
        .shop-filter-group {
          display: flex;
          align-items: center;
          gap: 10px;
          overflow-x: auto;
          scrollbar-width: none;
          flex-wrap: nowrap;
        }
        .shop-filter-group::-webkit-scrollbar { display: none; }

        .shop-filter-btn {
          display: inline-flex;
          align-items: center;
          gap: 8px;
          padding: 10px 20px;
          background: transparent;
          border: 1px solid var(--ivory-deep);
          color: var(--ink-muted);
          cursor: pointer;
          white-space: nowrap;
          transition: all 0.3s ease;
          font-family: 'Cinzel', serif;
          font-size: 11px;
          letter-spacing: 0.15em;
          text-transform: uppercase;
        }
        .shop-filter-btn:hover, .shop-filter-btn.open {
          border-color: var(--terra);
          color: var(--terra);
        }
        .shop-filter-btn.active {
          border-color: var(--terra);
          background: var(--terra-dim);
          color: var(--terra);
        }
        .shop-filter-active-val {
          opacity: 0.75;
          font-size: 10px;
        }
        .shop-filter-chevron {
          transition: transform 0.3s ease;
          opacity: 0.6;
        }
        .shop-filter-chevron.rotated { transform: rotate(180deg); opacity: 1; }

        /* Divider */
        .shop-filter-divider {
          width: 1px;
          height: 18px;
          background: var(--stone);
          opacity: 0.3;
          flex-shrink: 0;
        }

        /* Reset btn */
        .shop-reset-btn {
          background: none;
          border: none;
          font-family: 'Cinzel', serif;
          font-size: 11px;
          letter-spacing: 0.15em;
          text-transform: uppercase;
          color: var(--stone);
          cursor: pointer;
          padding: 4px 6px;
          transition: color 0.3s ease;
          white-space: nowrap;
        }
        .shop-reset-btn:hover { color: var(--terra); }

        /* Sort select */
        .shop-sort-wrap {
          display: flex;
          align-items: center;
          gap: 10px;
          border-bottom: 1px solid var(--ivory-deep);
          padding-bottom: 4px;
        }
        .shop-sort-label {
          font-family: 'Cinzel', serif;
          font-size: 11px;
          letter-spacing: 0.15em;
          text-transform: uppercase;
          color: var(--stone);
          white-space: nowrap;
        }
        .shop-sort-select {
          background: transparent;
          border: none;
          color: var(--ink);
          font-family: 'Cormorant Garamond', serif;
          font-size: 15px;
          font-style: italic;
          font-weight: 300;
          cursor: pointer;
          padding-right: 4px;
          outline: none;
          appearance: none;
        }
        .shop-sort-select option { background: var(--ivory-warm); color: var(--ink); }

        /* Dropdown menu */
        .shop-filter-menu {
          position: absolute;
          top: calc(100% + 8px);
          left: 0;
          min-width: 200px;
          background: var(--ivory);
          border: 1px solid var(--ivory-deep);
          padding: 8px;
          z-index: 50;
          box-shadow: 0 16px 48px rgba(28,22,18,0.12);
        }
        .shop-menu-item {
          display: block;
          width: 100%;
          text-align: left;
          padding: 12px 16px;
          font-family: 'Cinzel', serif;
          font-size: 11px;
          letter-spacing: 0.15em;
          text-transform: uppercase;
          color: var(--ink-muted);
          background: transparent;
          border: none;
          cursor: pointer;
          transition: all 0.25s ease;
        }
        .shop-menu-item:hover { color: var(--terra); background: var(--terra-dim); }
        .shop-menu-item.selected { color: var(--terra); }
        .shop-menu-item.selected::before {
          content: '—  ';
          opacity: 0.7;
        }

        /* Active filters row */
        .shop-active-tags {
          display: flex;
          align-items: center;
          gap: 8px;
          padding: 12px 0 0;
          flex-wrap: wrap;
        }
        .shop-tag {
          display: inline-flex;
          align-items: center;
          gap: 6px;
          padding: 6px 14px;
          border: 1px solid rgba(181,80,43,0.3);
          font-family: 'Cinzel', serif;
          font-size: 10px;
          letter-spacing: 0.15em;
          text-transform: uppercase;
          color: var(--terra);
          background: var(--terra-dim);
        }
        .shop-tag-x {
          background: none;
          border: none;
          color: var(--terra);
          cursor: pointer;
          padding: 0;
          line-height: 1;
          opacity: 0.6;
          transition: opacity 0.2s;
        }
        .shop-tag-x:hover { opacity: 1; }

        /* ── TOP DIVIDER LINE ── */
        .shop-divider {
          width: 100%;
          height: 1px;
          background: linear-gradient(90deg, transparent, var(--ivory-deep), transparent);
          margin: clamp(40px, 5vw, 64px) 0;
        }

        /* ── PRODUCT GRID ── */
        .shop-grid {
          display: grid;
          grid-template-columns: repeat(4, 1fr);
          gap: clamp(24px, 3vw, 48px) clamp(16px, 2.5vw, 36px);
        }
        @media (max-width: 1200px) { .shop-grid { grid-template-columns: repeat(3, 1fr); } }
        @media (max-width: 768px) { .shop-grid { grid-template-columns: repeat(2, 1fr); } }
        @media (max-width: 400px) { .shop-grid { grid-template-columns: 1fr; } }

        /* ── LOADING ── */
        .shop-loading {
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          padding: 140px 0;
          gap: 20px;
        }
        .shop-loading-bar {
          width: 48px;
          height: 1px;
          background: var(--terra);
          animation: shop-pulse 1.4s ease-in-out infinite;
        }
        @keyframes shop-pulse {
          0%, 100% { opacity: 0.3; transform: scaleX(0.6); }
          50% { opacity: 1; transform: scaleX(1); }
        }
        .shop-loading-text {
          font-family: 'Cinzel', serif;
          font-size: 8px;
          letter-spacing: 0.35em;
          text-transform: uppercase;
          color: var(--stone);
        }

        /* Skeleton cards */
        .shop-skeleton-grid {
          display: grid;
          grid-template-columns: repeat(4, 1fr);
          gap: clamp(24px, 3vw, 48px) clamp(16px, 2.5vw, 36px);
        }
        @media (max-width: 1200px) { .shop-skeleton-grid { grid-template-columns: repeat(3, 1fr); } }
        @media (max-width: 768px) { .shop-skeleton-grid { grid-template-columns: repeat(2, 1fr); } }
        .shop-skeleton-card { opacity: 0; animation: shop-fadein 0.4s ease forwards; }
        .shop-skeleton-card:nth-child(1) { animation-delay: 0s; }
        .shop-skeleton-card:nth-child(2) { animation-delay: 0.08s; }
        .shop-skeleton-card:nth-child(3) { animation-delay: 0.16s; }
        .shop-skeleton-card:nth-child(4) { animation-delay: 0.24s; }
        @keyframes shop-fadein { to { opacity: 1; } }
        .shop-skeleton-img {
          aspect-ratio: 3/4;
          background: linear-gradient(105deg, var(--ivory-deep) 30%, var(--ivory-warm) 50%, var(--ivory-deep) 70%);
          background-size: 200% 100%;
          animation: shop-shimmer 1.8s infinite;
          margin-bottom: 14px;
        }
        @keyframes shop-shimmer {
          0% { background-position: 200% 0; }
          100% { background-position: -200% 0; }
        }
        .shop-skeleton-line {
          height: 8px;
          background: var(--ivory-deep);
          margin-bottom: 8px;
          animation: shop-shimmer 1.8s infinite;
          background-size: 200% 100%;
        }
        .shop-skeleton-line.short { width: 55%; }

        /* ── PAGINATION ── */
        .shop-pagination {
          margin-top: clamp(64px, 8vw, 100px);
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 20px;
        }
        .shop-progress-track {
          width: 200px;
          height: 1px;
          background: var(--ivory-deep);
          position: relative;
        }
        .shop-progress-fill {
          position: absolute;
          top: 0;
          left: 0;
          height: 100%;
          background: var(--terra);
          transition: width 0.6s cubic-bezier(0.25, 0.46, 0.45, 0.94);
        }
        .shop-pagination-text {
          font-family: 'Cinzel', serif;
          font-size: 8px;
          letter-spacing: 0.28em;
          text-transform: uppercase;
          color: var(--stone);
        }
        .shop-load-more {
          position: relative;
          overflow: hidden;
          padding: 16px 52px;
          background: transparent;
          border: 1px solid rgba(28,22,18,0.25);
          font-family: 'Cinzel', serif;
          font-size: 12px;
          font-weight: 500;
          letter-spacing: 0.2em;
          text-transform: uppercase;
          color: var(--ink);
          cursor: pointer;
          transition: color 0.4s ease, border-color 0.4s ease;
          margin-top: 8px;
        }
        .shop-load-more::before {
          content: '';
          position: absolute;
          inset: 0;
          background: var(--ink);
          transform: scaleX(0);
          transform-origin: left;
          transition: transform 0.4s cubic-bezier(0.76, 0, 0.24, 1);
        }
        .shop-load-more:hover::before { transform: scaleX(1); }
        .shop-load-more:hover { color: var(--ivory); border-color: var(--ink); }
        .shop-load-more span { position: relative; z-index: 1; }

        /* ── EMPTY STATE ── */
        .shop-empty {
          padding: 120px 0;
          text-align: center;
        }
        .shop-empty-line {
          width: 48px;
          height: 1px;
          background: var(--ivory-deep);
          margin: 0 auto 32px;
        }
        .shop-empty-title {
          font-family: 'Cormorant Garamond', serif;
          font-size: clamp(28px, 3vw, 42px);
          font-weight: 300;
          font-style: italic;
          color: var(--stone);
          margin-bottom: 28px;
        }
        .shop-empty-btn {
          padding: 14px 44px;
          background: transparent;
          border: 1px solid rgba(28,22,18,0.25);
          font-family: 'Cinzel', serif;
          font-size: 11px;
          letter-spacing: 0.15em;
          text-transform: uppercase;
          color: var(--ink);
          cursor: pointer;
          transition: all 0.3s ease;
        }
        .shop-empty-btn:hover {
          background: var(--ivory-warm);
        }

        /* ── MOBILE ── */
        @media (max-width: 768px) {
          .shop-hero-count { display: none; }
          .shop-filter-inner { flex-direction: column; align-items: flex-start; gap: 12px; }
          .shop-sort-wrap { align-self: flex-end; }
          .shop-filter-group { width: 100%; }
        }
      `}</style>

      <div className="shop-page">
        {/* ── HERO ── */}
        <div className="shop-hero">
          <img src="/shop_hero.png" alt="Artisanal handloom heritage" />
          <div className="shop-hero-overlay" />
          <div className="shop-hero-text">
            <p className="shop-hero-eyebrow">The Archive</p>
            <h1 className="shop-hero-title">
              The<br /><em>Collection</em>
            </h1>
          </div>
          {!loading && (
            <div className="shop-hero-count">
              <span className="shop-hero-count-label">Total Curated</span>
              <span className="shop-hero-count-num">{totalCount} Pieces</span>
            </div>
          )}
        </div>

        <div className="shop-main">
          {/* ── FILTER BAR ── */}
          <div className="shop-filter-bar">
            <div className="shop-filter-inner">
              <div className="shop-filter-group">
                <FilterDropdown label="Category" options={categories} activeValue={activeCategory} paramKey="category" />
                <FilterDropdown label="Weave" options={weaves} activeValue={activeWeave} paramKey="weave" />
                <FilterDropdown label="Fabric" options={fabrics} activeValue={activeFabric} paramKey="fabric" />
                <FilterDropdown label="Price" options={priceRanges.map(r => r.label)} activeValue={activePriceRange} paramKey="price" />
                {activeFilterCount > 0 && (
                  <>
                    <div className="shop-filter-divider" />
                    <button className="shop-reset-btn" onClick={clearFilters}>
                      Clear ({activeFilterCount})
                    </button>
                  </>
                )}
              </div>
              <div className="shop-sort-wrap">
                <span className="shop-sort-label">Sort</span>
                <select
                  className="shop-sort-select"
                  value={sortBy}
                  onChange={(e) => { setSortBy(e.target.value); setCurrentPage(1); }}
                >
                  <option value="newest">Newest Arrivals</option>
                  <option value="popular">Bestsellers</option>
                  <option value="price-asc">Price: Low to High</option>
                  <option value="price-desc">Price: High to Low</option>
                </select>
              </div>
            </div>

            {/* Active filter tags */}
            {activeFilterCount > 0 && (
              <div className="shop-active-tags">
                {activeCategory && (
                  <span className="shop-tag">
                    {activeCategory}
                    <button className="shop-tag-x" onClick={() => updateFilter('category', null)}><X size={9} /></button>
                  </span>
                )}
                {activeWeave && (
                  <span className="shop-tag">
                    {activeWeave}
                    <button className="shop-tag-x" onClick={() => updateFilter('weave', null)}><X size={9} /></button>
                  </span>
                )}
                {activeFabric && (
                  <span className="shop-tag">
                    {activeFabric}
                    <button className="shop-tag-x" onClick={() => updateFilter('fabric', null)}><X size={9} /></button>
                  </span>
                )}
                {activePriceRange && (
                  <span className="shop-tag">
                    {activePriceRange}
                    <button className="shop-tag-x" onClick={() => updateFilter('price', null)}><X size={9} /></button>
                  </span>
                )}
                {searchQuery && (
                  <span className="shop-tag">
                    "{searchQuery}"
                    <button className="shop-tag-x" onClick={() => updateFilter('q', null)}><X size={9} /></button>
                  </span>
                )}
              </div>
            )}
          </div>

          <div className="shop-divider" />

          {/* ── CONTENT ── */}
          {loading ? (
            <div className="shop-skeleton-grid">
              {Array.from({ length: 8 }).map((_, i) => (
                <div key={i} className="shop-skeleton-card" style={{ animationDelay: `${i * 0.07}s` }}>
                  <div className="shop-skeleton-img" />
                  <div className="shop-skeleton-line" style={{ width: '70%' }} />
                  <div className="shop-skeleton-line short" />
                </div>
              ))}
            </div>
          ) : products.length > 0 ? (
            <>
              <div className="shop-grid">
                {products.map((product, index) => (
                  <motion.div
                    key={product._id || product.id}
                    initial={{ opacity: 0, y: 28 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: '-60px' }}
                    transition={{
                      duration: 0.6,
                      delay: (index % 4) * 0.09,
                      ease: [0.25, 0.46, 0.45, 0.94],
                    }}
                  >
                    <ProductCard product={product} />
                  </motion.div>
                ))}
              </div>

              {/* Pagination */}
              <div className="shop-pagination">
                <div className="shop-progress-track">
                  <div className="shop-progress-fill" style={{ width: `${progressPct}%` }} />
                </div>
                <p className="shop-pagination-text">
                  Viewing {viewedCount} of {totalCount} pieces
                </p>
                {currentPage < totalPages && (
                  <button
                    className="shop-load-more"
                    onClick={() => setCurrentPage(prev => prev + 1)}
                  >
                    <span>Discover More</span>
                  </button>
                )}
              </div>
            </>
          ) : (
            <div className="shop-empty">
              <div className="shop-empty-line" />
              <p className="shop-empty-title">No threads matched your search.</p>
              <button className="shop-empty-btn" onClick={clearFilters}>
                View All Works
              </button>
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default Shop;