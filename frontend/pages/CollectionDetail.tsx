import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { Grid, List, Sparkles, Filter, ChevronRight } from 'lucide-react';
import API from '../services/api';
import ProductCard from '../components/ProductCard';

interface Collection {
  _id: string;
  name: string;
  slug: string;
  description: string;
  bannerImage: string;
  type: 'manual' | 'automatic';
  seo?: {
    title?: string;
    description?: string;
  };
}

export const CollectionDetail: React.FC = () => {
  const { slug } = useParams<{ slug: string }>();
  const [collection, setCollection] = useState<Collection | null>(null);
  const [products, setProducts] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    if (slug) {
      fetchCollectionDetails();
    }
  }, [slug]);

  const fetchCollectionDetails = async () => {
    try {
      setLoading(true);
      setError('');
      const { data } = await API.get(`/collections/${slug}`);
      if (data.success) {
        setCollection(data.data.collection);
        setProducts(data.data.products);
      } else {
        setError('Failed to load collection');
      }
    } catch (err: any) {
      console.error('Error fetching collection:', err);
      setError(err.response?.data?.message || 'Collection not found');
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen pt-32 pb-24 flex items-center justify-center bg-[#F8EDED]">
        <div className="text-center space-y-4">
          <div className="w-16 h-16 border-4 border-[#B43F3F] border-t-transparent rounded-full animate-spin mx-auto"></div>
          <p className="font-display font-medium text-[#173B45]">Curating heritage items...</p>
        </div>
      </div>
    );
  }

  if (error || !collection) {
    return (
      <div className="min-h-screen pt-32 pb-24 flex items-center justify-center bg-[#F8EDED]">
        <div className="text-center max-w-md p-6 bg-white rounded-3xl border border-[#B43F3F]/10 shadow-sm space-y-4">
          <h2 className="text-2xl font-display font-medium text-[#B43F3F]">Collection Not Found</h2>
          <p className="text-[#173B45]/70">{error || 'The requested collection could not be loaded.'}</p>
          <Link
            to="/shop"
            className="inline-block px-6 py-3 bg-[#B43F3F] text-[#F8EDED] rounded-xl hover:bg-[#FF8225] transition-colors"
          >
            Explore Store
          </Link>
        </div>
      </div>
    );
  }

  return (
    <>
      <Helmet>
        <title>{collection.seo?.title || `${collection.name} - Odisha Handloom Heritage | TANVO`}</title>
        <meta name="description" content={collection.seo?.description || collection.description} />
        <meta property="og:title" content={collection.seo?.title || collection.name} />
        <meta property="og:description" content={collection.seo?.description || collection.description} />
        <meta property="og:image" content={collection.bannerImage} />
        <meta property="og:type" content="website" />
      </Helmet>

      <div className="min-h-screen bg-[#F8EDED]/40 pt-20">
        {/* Hero Banner Section */}
        <div className="relative h-[250px] sm:h-[350px] md:h-[400px] overflow-hidden">
          <img
            src={collection.bannerImage}
            alt={collection.name}
            className="w-full h-full object-cover brightness-[0.75] transition-all duration-700"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent flex flex-col justify-end p-6 sm:p-12 md:p-16">
            <div className="max-w-4xl space-y-3">
              <nav className="flex items-center gap-1.5 text-xs sm:text-sm text-white/80 mb-2">
                <Link to="/" className="hover:text-[#FF8225] transition-colors">Home</Link>
                <ChevronRight size={12} />
                <span className="text-white font-medium">{collection.name}</span>
              </nav>
              <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-display font-medium text-[#F8EDED] tracking-wide">
                {collection.name}
              </h1>
              <p className="text-sm sm:text-base md:text-lg text-[#F8EDED]/90 max-w-2xl leading-relaxed">
                {collection.description}
              </p>
            </div>
          </div>
        </div>

        {/* Collection Story Card */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
          <div className="bg-white p-6 sm:p-8 rounded-3xl border border-[#B43F3F]/10 shadow-sm mb-12 flex flex-col sm:flex-row gap-6 items-center justify-between">
            <div className="flex items-center gap-4">
              <div className="p-3 bg-[#B43F3F]/10 text-[#B43F3F] rounded-2xl">
                <Sparkles size={28} />
              </div>
              <div>
                <h3 className="font-display font-medium text-lg text-[#173B45]">Artisan-Direct Handlooms</h3>
                <p className="text-sm text-[#173B45]/70 max-w-xl">
                  Each product in this collection has been direct-sourced from regional weaver cooperatives, ensuring authentic craftsmanship and fair compensation.
                </p>
              </div>
            </div>
            <div className="flex items-center gap-2 px-4 py-2 rounded-full bg-[#FF8225]/10 text-[#FF8225] text-xs font-semibold uppercase tracking-wider">
              {products.length} Masterpieces
            </div>
          </div>

          {/* Product Grid */}
          {products.length === 0 ? (
            <div className="text-center py-20 bg-white rounded-3xl border border-[#B43F3F]/10 shadow-sm space-y-4">
              <p className="text-[#173B45]/60 text-lg">No products found matching this collection's criteria.</p>
              <Link
                to="/shop"
                className="inline-block px-6 py-3 bg-[#B43F3F] text-[#F8EDED] rounded-xl hover:bg-[#FF8225] transition-colors"
              >
                Browse All Products
              </Link>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-x-6 gap-y-10">
              {products.map((product) => (
                <ProductCard key={product._id} product={product} />
              ))}
            </div>
          )}
        </div>
      </div>
    </>
  );
};
export default CollectionDetail;
