import React, { useState, useEffect, useMemo } from 'react';
import { useSearchParams } from "react-router-dom";
import { SlidersHorizontal, ChevronDown, Grid, List, X, Search } from 'lucide-react';
import { Category } from '../types';
import ProductCard from '../components/ProductCard';
import { useStore } from '../context/StoreContext';
import API from '../services/api';

interface Product {
  _id: string;
  name: string;
  description: string;
  price: number;
  originalPrice?: number;
  category: string;
  subCategory: string;
  weave: string;
  fabric: string;
  images: Array<{ url: string; isPrimary: boolean }>;
  stock: number;
  colors?: string[];
  sizes?: string[];
  ratings: number;
  numReviews: number;
  isBestSeller?: boolean;
  isNewArrival?: boolean;
}

const Shop: React.FC = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [showMobileFilters, setShowMobileFilters] = useState(false);
  const [sortBy, setSortBy] = useState('newest');
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [totalCount, setTotalCount] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  const { fetchProducts: fetchStoreProducts } = useStore();

  const activeCategory = searchParams.get('category');
  const activeWeave = searchParams.get('weave');
  const activeFabric = searchParams.get('fabric');
  const activePriceRange = searchParams.get('price');
  const searchQuery = searchParams.get('q');
  const activeSort = searchParams.get('sort') || 'newest';

  const categories = Object.values(Category);
  const weaves = ['Sambalpuri', 'Bomkai', 'Ikat', 'Khandua', 'Pasapali', 'Sonepuri'];
  const fabrics = ['Silk', 'Cotton', 'Tussar', 'Matka', 'Linen', 'Muslin'];

  const priceRanges = [
    { label: 'Under ₹5,000', min: 0, max: 5000 },
    { label: '₹5,000 - ₹10,000', min: 5000, max: 10000 },
    { label: '₹10,000 - ₹20,000', min: 10000, max: 20000 },
    { label: 'Over ₹20,000', min: 20000, max: 1000000 },
  ];

  // Fetch products from API
  useEffect(() => {
    fetchProducts();
  }, [searchParams, sortBy, currentPage]);

  const fetchProducts = async () => {
    setLoading(true);
    try {
      // Build query parameters
      const params: any = {
        page: currentPage,
        limit: 12,
        sort: sortBy
      };

      if (searchQuery) params.search = searchQuery;
      if (activeCategory) params.category = activeCategory;
      if (activeWeave) params.weave = activeWeave;
      if (activeFabric) params.fabric = activeFabric;
      
      if (activePriceRange) {
        const range = priceRanges.find(r => r.label === activePriceRange);
        if (range) {
          params.minPrice = range.min;
          params.maxPrice = range.max;
        }
      }

      const { data } = await API.get('/products', { params });
      setProducts(data.products);
      setTotalCount(data.total);
      setTotalPages(data.pages);
    } catch (error) {
      console.error('Error fetching products:', error);
    } finally {
      setLoading(false);
    }
  };

  const updateFilter = (key: string, value: string | null) => {
    if (value === null) {
      searchParams.delete(key);
    } else {
      searchParams.set(key, value);
    }
    setSearchParams(searchParams);
    setCurrentPage(1); // Reset to first page on filter change
  };

  const clearFilters = () => {
    setSearchParams({});
    setCurrentPage(1);
  };

  const handleSortChange = (value: string) => {
    setSortBy(value);
    setCurrentPage(1);
  };

  // Get active filter count
  const activeFilterCount = [
    activeCategory, activeWeave, activeFabric, activePriceRange, searchQuery
  ].filter(Boolean).length;

  return (
    <div className="max-w-7xl mx-auto px-4 py-16">
      <div className="flex flex-col md:flex-row gap-12">
        {/* Desktop Sidebar Filters */}
        <aside className="hidden md:block w-72 shrink-0">
          <div className="sticky top-32 space-y-12">
            <div>
              <div className="flex justify-between items-center mb-8 pb-4 border-b border-gray-100">
                <h3 className="font-serif text-2xl font-bold">Filters</h3>
                {activeFilterCount > 0 && (
                  <button 
                    onClick={clearFilters} 
                    className="text-[10px] text-[#C40C0C] font-black uppercase tracking-widest border-b border-[#C40C0C]"
                  >
                    Clear All ({activeFilterCount})
                  </button>
                )}
              </div>
              
              <div className="space-y-10">
                {/* Search in Shop */}
                <div>
                  <h4 className="text-[10px] uppercase tracking-[0.2em] font-black text-slate-400 mb-4">Search Within</h4>
                  <div className="relative">
                    <input 
                      type="text" 
                      placeholder="e.g. Ikat, Silk..."
                      defaultValue={searchQuery || ''}
                      onBlur={(e) => {
                        if (e.target.value) updateFilter('q', e.target.value);
                        else updateFilter('q', null);
                      }}
                      onKeyDown={(e) => {
                        if (e.key === 'Enter') {
                          if (e.currentTarget.value) updateFilter('q', e.currentTarget.value);
                          else updateFilter('q', null);
                        }
                      }}
                      className="w-full border border-gray-200 rounded-xl px-4 py-3 pl-10 text-sm focus:border-[#C40C0C] focus:ring-2 focus:ring-[#C40C0C]/20 transition-all" 
                    />
                    <Search className="absolute left-3.5 top-3.5 h-4 w-4 text-gray-400" />
                  </div>
                </div>

                {/* Category Filter */}
                <div>
                  <h4 className="text-[10px] uppercase tracking-[0.2em] font-black text-slate-400 mb-4">Collections</h4>
                  <div className="space-y-2 max-h-60 overflow-y-auto custom-scrollbar pr-2">
                    <button 
                      onClick={() => updateFilter('category', null)}
                      className={`w-full text-left px-4 py-2.5 rounded-xl text-sm transition-all ${
                        !activeCategory ? 'bg-[#C40C0C] text-white font-bold shadow-lg' : 'text-slate-600 hover:bg-gray-50'
                      }`}
                    >
                      Show All Collections
                    </button>
                    {categories.map(cat => (
                      <button 
                        key={cat}
                        onClick={() => updateFilter('category', cat)}
                        className={`w-full text-left px-4 py-2.5 rounded-xl text-sm transition-all ${
                          activeCategory === cat ? 'bg-[#C40C0C] text-white font-bold shadow-lg' : 'text-slate-600 hover:bg-gray-50 hover:translate-x-1'
                        }`}
                      >
                        {cat}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Weave Filter */}
                <div>
                  <h4 className="text-[10px] uppercase tracking-[0.2em] font-black text-slate-400 mb-4">Weave Type</h4>
                  <div className="space-y-2">
                    {weaves.map(weave => (
                      <button 
                        key={weave}
                        onClick={() => updateFilter('weave', activeWeave === weave ? null : weave)}
                        className={`w-full text-left px-4 py-2.5 rounded-xl text-sm transition-all ${
                          activeWeave === weave ? 'bg-[#C40C0C] text-white font-bold shadow-lg' : 'text-slate-600 hover:bg-gray-50'
                        }`}
                      >
                        {weave}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Fabric Filter */}
                <div>
                  <h4 className="text-[10px] uppercase tracking-[0.2em] font-black text-slate-400 mb-4">Fabric</h4>
                  <div className="space-y-2">
                    {fabrics.map(fabric => (
                      <button 
                        key={fabric}
                        onClick={() => updateFilter('fabric', activeFabric === fabric ? null : fabric)}
                        className={`w-full text-left px-4 py-2.5 rounded-xl text-sm transition-all ${
                          activeFabric === fabric ? 'bg-[#C40C0C] text-white font-bold shadow-lg' : 'text-slate-600 hover:bg-gray-50'
                        }`}
                      >
                        {fabric}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Price Filter */}
                <div>
                  <h4 className="text-[10px] uppercase tracking-[0.2em] font-black text-slate-400 mb-4">Price Range</h4>
                  <div className="space-y-3">
                    {priceRanges.map(range => (
                      <label key={range.label} className={`flex items-center gap-3 p-3 rounded-xl border transition-all cursor-pointer group ${
                        activePriceRange === range.label ? 'border-[#C40C0C] bg-[#C40C0C]/5' : 'border-gray-100 hover:border-gray-200'
                      }`}>
                        <input 
                          type="checkbox" 
                          checked={activePriceRange === range.label}
                          onChange={() => updateFilter('price', activePriceRange === range.label ? null : range.label)}
                          className="w-4 h-4 accent-[#C40C0C]"
                        />
                        <span className={`text-sm font-bold ${
                          activePriceRange === range.label ? 'text-[#C40C0C]' : 'text-slate-600 group-hover:text-slate-900'
                        }`}>
                          {range.label}
                        </span>
                      </label>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            {/* Artisan Banner */}
            <div className="bg-slate-900 rounded-3xl p-8 text-white relative overflow-hidden">
              <div className="absolute top-0 right-0 w-24 h-24 bg-[#FF6500]/20 rounded-full blur-2xl -mr-10 -mt-10"></div>
              <h5 className="font-serif text-xl font-bold mb-4 relative z-10">Artisan Direct</h5>
              <p className="text-xs text-slate-400 font-medium mb-6 relative z-10">Every purchase directly supports our weaver clusters in Bargarh and Nuapatna.</p>
              <button className="text-[10px] font-black uppercase tracking-widest text-[#F6CE71] border-b border-[#F6CE71] relative z-10">
                Learn About Our Impact
              </button>
            </div>
          </div>
        </aside>

        {/* Main Content */}
        <main className="flex-1">
          {/* Header Controls */}
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-12 gap-6 pb-8 border-b border-gray-100">
            <div>
              <h1 className="text-4xl font-serif font-bold text-slate-900 leading-tight">
                {activeCategory || 'Our Masterpieces'}
              </h1>
              <p className="text-slate-400 text-sm font-bold mt-2 uppercase tracking-widest">
                Showing {products.length} of {totalCount} Authenticated Pieces
              </p>
            </div>

            <div className="flex items-center gap-4 w-full sm:w-auto">
              <div className="flex items-center gap-3 bg-gray-50 px-5 py-3 rounded-2xl border border-gray-100 text-sm font-bold text-slate-600 w-full sm:w-auto">
                <span className="text-slate-400 whitespace-nowrap">Sort:</span>
                <select 
                  value={sortBy} 
                  onChange={(e) => handleSortChange(e.target.value)}
                  className="bg-transparent outline-none cursor-pointer text-slate-900"
                >
                  <option value="newest">Latest Collections</option>
                  <option value="popular">Bestsellers</option>
                  <option value="price-asc">Price: Low to High</option>
                  <option value="price-desc">Price: High to Low</option>
                </select>
              </div>
              <button 
                className="md:hidden flex items-center justify-center gap-2 bg-white border-2 border-[#C40C0C] text-[#C40C0C] px-5 py-3 rounded-full font-bold text-sm hover:bg-[#C40C0C] hover:text-white transition-all w-full"
                onClick={() => setShowMobileFilters(true)}
              >
                <SlidersHorizontal size={18} /> Filters ({activeFilterCount})
              </button>
            </div>
          </div>

          {/* Applied Filters Tags */}
          {activeFilterCount > 0 && (
            <div className="flex flex-wrap gap-3 mb-12">
              {searchQuery && (
                <span className="bg-slate-900 text-white px-4 py-2 text-xs font-bold rounded-full flex items-center gap-3 shadow-lg">
                  Search: "{searchQuery}"
                  <X size={14} className="cursor-pointer hover:text-[#F6CE71] transition-colors" 
                    onClick={() => { updateFilter('q', null); }} 
                  />
                </span>
              )}
              {activeCategory && (
                <span className="bg-[#C40C0C] text-white px-4 py-2 text-xs font-bold rounded-full flex items-center gap-3 shadow-lg">
                  {activeCategory}
                  <X size={14} className="cursor-pointer hover:text-[#F6CE71] transition-colors" 
                    onClick={() => updateFilter('category', null)} 
                  />
                </span>
              )}
              {activeWeave && (
                <span className="bg-[#FF6500] text-white px-4 py-2 text-xs font-bold rounded-full flex items-center gap-3 shadow-lg">
                  {activeWeave}
                  <X size={14} className="cursor-pointer hover:text-[#F6CE71] transition-colors" 
                    onClick={() => updateFilter('weave', null)} 
                  />
                </span>
              )}
              {activeFabric && (
                <span className="bg-[#CC561E] text-white px-4 py-2 text-xs font-bold rounded-full flex items-center gap-3 shadow-lg">
                  {activeFabric}
                  <X size={14} className="cursor-pointer hover:text-[#F6CE71] transition-colors" 
                    onClick={() => updateFilter('fabric', null)} 
                  />
                </span>
              )}
              {activePriceRange && (
                <span className="bg-[#F6CE71] text-[#CC561E] px-4 py-2 text-xs font-bold rounded-full flex items-center gap-3 shadow-lg">
                  {activePriceRange}
                  <X size={14} className="cursor-pointer hover:text-[#C40C0C] transition-colors" 
                    onClick={() => updateFilter('price', null)} 
                  />
                </span>
              )}
            </div>
          )}

          {/* Loading State */}
          {loading ? (
            <div className="flex justify-center items-center py-32">
              <div className="w-12 h-12 border-4 border-[#C40C0C] border-t-transparent rounded-full animate-spin"></div>
            </div>
          ) : (
            <>
              {/* Product Grid */}
              {products.length > 0 ? (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-x-6 gap-y-12">
                  {products.map(product => (
                    <ProductCard key={product._id} product={product} />
                  ))}
                </div>
              ) : (
                <div className="py-32 text-center bg-gray-50 rounded-[3rem] border border-dashed border-gray-200">
                  <div className="mb-6 flex justify-center">
                    <div className="p-8 bg-white rounded-full shadow-xl">
                      <Search size={48} className="text-slate-300" />
                    </div>
                  </div>
                  <h3 className="text-2xl font-serif font-bold text-slate-800 mb-3">No matches found</h3>
                  <p className="text-slate-500 max-w-xs mx-auto mb-10 font-medium">
                    Try adjusting your filters or search terms to find your perfect weave.
                  </p>
                  <button onClick={clearFilters} className="bg-[#C40C0C] text-white px-8 py-4 rounded-full font-bold text-sm hover:bg-[#FF6500] transition-all">
                    Reset All Filters
                  </button>
                </div>
              )}

              {/* Pagination */}
              {totalPages > 1 && (
                <div className="flex justify-center mt-16 gap-2">
                  <button
                    onClick={() => setCurrentPage(p => Math.max(1, p - 1))}
                    disabled={currentPage === 1}
                    className="px-6 py-3 border border-gray-200 rounded-xl disabled:opacity-50 hover:border-[#C40C0C] transition-all"
                  >
                    Previous
                  </button>
                  <span className="px-6 py-3 bg-gray-50 rounded-xl font-bold">
                    Page {currentPage} of {totalPages}
                  </span>
                  <button
                    onClick={() => setCurrentPage(p => Math.min(totalPages, p + 1))}
                    disabled={currentPage === totalPages}
                    className="px-6 py-3 border border-gray-200 rounded-xl disabled:opacity-50 hover:border-[#C40C0C] transition-all"
                  >
                    Next
                  </button>
                </div>
              )}
            </>
          )}
        </main>
      </div>

      {/* Mobile Filter Modal */}
      {showMobileFilters && (
        <div className="fixed inset-0 z-[100] bg-slate-900/60 backdrop-blur-sm md:hidden animate-fadeIn">
          <div className="absolute right-0 top-0 h-full w-4/5 bg-white p-8 shadow-2xl overflow-y-auto custom-scrollbar animate-slideInRight">
            <div className="flex justify-between items-center mb-10">
              <h2 className="text-3xl font-serif font-bold">Filters</h2>
              <button onClick={() => setShowMobileFilters(false)} className="p-2 bg-gray-100 rounded-full">
                <X size={24} />
              </button>
            </div>
            
            <div className="space-y-12">
              {/* Categories */}
              <div>
                <h4 className="text-[10px] uppercase tracking-[0.2em] font-black text-slate-400 mb-6">Collections</h4>
                <div className="grid grid-cols-1 gap-3">
                  {categories.map(cat => (
                    <button 
                      key={cat}
                      onClick={() => { updateFilter('category', cat); setShowMobileFilters(false); }}
                      className={`px-5 py-4 text-left text-sm font-bold border rounded-2xl transition-all ${
                        activeCategory === cat ? 'border-[#C40C0C] bg-[#C40C0C] text-white shadow-xl' : 'border-gray-100 text-slate-600'
                      }`}
                    >
                      {cat}
                    </button>
                  ))}
                </div>
              </div>

              {/* Weaves */}
              <div>
                <h4 className="text-[10px] uppercase tracking-[0.2em] font-black text-slate-400 mb-6">Weave Type</h4>
                <div className="grid grid-cols-1 gap-3">
                  {weaves.map(weave => (
                    <button 
                      key={weave}
                      onClick={() => { updateFilter('weave', weave); setShowMobileFilters(false); }}
                      className={`px-5 py-4 text-left text-sm font-bold border rounded-2xl transition-all ${
                        activeWeave === weave ? 'border-[#C40C0C] bg-[#C40C0C] text-white shadow-xl' : 'border-gray-100 text-slate-600'
                      }`}
                    >
                      {weave}
                    </button>
                  ))}
                </div>
              </div>

              {/* Fabrics */}
              <div>
                <h4 className="text-[10px] uppercase tracking-[0.2em] font-black text-slate-400 mb-6">Fabric</h4>
                <div className="grid grid-cols-1 gap-3">
                  {fabrics.map(fabric => (
                    <button 
                      key={fabric}
                      onClick={() => { updateFilter('fabric', fabric); setShowMobileFilters(false); }}
                      className={`px-5 py-4 text-left text-sm font-bold border rounded-2xl transition-all ${
                        activeFabric === fabric ? 'border-[#C40C0C] bg-[#C40C0C] text-white shadow-xl' : 'border-gray-100 text-slate-600'
                      }`}
                    >
                      {fabric}
                    </button>
                  ))}
                </div>
              </div>

              {/* Price Ranges */}
              <div>
                <h4 className="text-[10px] uppercase tracking-[0.2em] font-black text-slate-400 mb-6">Price Range</h4>
                <div className="grid grid-cols-1 gap-3">
                  {priceRanges.map(range => (
                    <button 
                      key={range.label}
                      onClick={() => { updateFilter('price', range.label); setShowMobileFilters(false); }}
                      className={`px-5 py-4 text-left text-sm font-bold border rounded-2xl transition-all ${
                        activePriceRange === range.label ? 'border-[#C40C0C] bg-[#C40C0C] text-white shadow-xl' : 'border-gray-100 text-slate-600'
                      }`}
                    >
                      {range.label}
                    </button>
                  ))}
                </div>
              </div>

              {/* Action Buttons */}
              <div className="pt-8 flex flex-col gap-4">
                <button 
                  onClick={clearFilters}
                  className="w-full py-5 border-2 border-slate-900 rounded-full font-black uppercase tracking-widest text-xs"
                >
                  Clear All Filters
                </button>
                <button 
                  onClick={() => setShowMobileFilters(false)}
                  className="w-full py-5 bg-[#C40C0C] text-white rounded-full font-black uppercase tracking-widest text-xs shadow-xl hover:bg-[#FF6500] transition-all"
                >
                  Show Results
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Shop;