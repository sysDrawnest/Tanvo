import React, { useEffect, useState } from 'react';
import { useStore } from '../context/StoreContext';
import { Product } from '../types';
import { motion } from 'framer-motion';

// ── Section Components ──
import HeroSection from './sections/HeroSection';
import MarqueeTicker from './sections/MarqueeTicker';
import EditorialBanner from './sections/EditorialBanner';
import CategoryGrid from './sections/CategoryGrid';
import ProductsGrid from './sections/ProductsGrid';
import IkatDeepDive from './sections/IkatDeepDive';
import MasterWeaverSection from './sections/MasterWeaverSection';
import InstagramSection from './sections/InstagramSection';
import TrustBar from './sections/TrustBar';
import WhatsAppOrder from '../components/WhatsAppOrder';

// ── New Components ──
import HandwovenHeritage from './sections/HandwovenHeritage';

const Home: React.FC = () => {
  const { products, fetchProducts, loading } = useStore();
  const [newArrivals, setNewArrivals] = useState<any[]>([]);
  const [bestsellers, setBestsellers] = useState<any[]>([]);

  useEffect(() => {
    fetchProducts({ limit: 12, sort: '-createdAt' });
  }, []);

  useEffect(() => {
    if (products.length > 0) {
      setNewArrivals(products.slice(0, 4));
      setBestsellers(products.filter((p: any) => p.isBestSeller).slice(0, 4));
    }
  }, [products]);

  if (loading && products.length === 0) {
    return (
      <div className="bg-tanvoBg min-h-screen flex items-center justify-center relative">
        <div className="absolute inset-0 pointer-events-none opacity-50" style={{ backgroundImage: `url("data:image/svg+xml,%3Csvg width='40' height='40' viewBox='0 0 40 40' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M0 0h40v2H0V0zm0 4h40v2H0V4zm0 4h40v2H0V8zm0 4h40v2H0v-2zm0 4h40v2H0v-2zm0 4h40v2H0v-2zm0 4h40v2H0v-2zm0 4h40v2H0v-2zm0 4h40v2H0v-2zm0 4h40v2H0v-2z' fill='%23B43F3F' fill-opacity='0.02' fill-rule='evenodd'/%3E%3C/svg%3E")` }} />
        <div className="text-center relative z-10">
          <div className="w-10 h-10 border-2 border-tanvoPrimary border-t-tanvoAccent rounded-full animate-spin mx-auto mb-6" />
          <p className="font-sans text-[10px] tracking-[0.3em] uppercase text-tanvoDark opacity-70">Weaving your experience</p>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-tanvoBg overflow-x-hidden relative font-sans">
      {/* textile overlay */}
      <div className="fixed inset-0 pointer-events-none opacity-50 z-1" style={{ backgroundImage: `url("data:image/svg+xml,%3Csvg width='40' height='40' viewBox='0 0 40 40' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M0 0h40v2H0V0zm0 4h40v2H0V4zm0 4h40v2H0V8zm0 4h40v2H0v-2zm0 4h40v2H0v-2zm0 4h40v2H0v-2zm0 4h40v2H0v-2zm0 4h40v2H0v-2zm0 4h40v2H0v-2zm0 4h40v2H0v-2z' fill='%23B43F3F' fill-opacity='0.02' fill-rule='evenodd'/%3E%3C/svg%3E")` }} />

      <div className="relative z-10">
        {/* 1. Hero Banner */}
        <HeroSection />

        {/* 2. Ribbon Ticker */}
        <MarqueeTicker />

        {/* 3. Bestsellers (Asymmetric grid layout, Warm Ivory background) */}
        {bestsellers.length > 0 && (
          <ProductsGrid
            products={bestsellers}
            label="Most Loved"
            title="Bestsellers"
            viewAllLink="/shop?isBestSeller=true"
            viewAllText="All Bestsellers"
            background="var(--ivory)"
            layout="asymmetric"
          />
        )}

        {/* 4. Value proposition banner */}
        <HandwovenHeritage />

        {/* 5. Weave traditions categories */}
        <CategoryGrid />

        {/* 6. Curated Selection (Classic grid layout, white background) */}
        <ProductsGrid
          products={products.slice(0, 8)}
          label="Direct from the Loom"
          title="Curated"
          titleEm="Selection"
          viewAllLink="/shop"
          viewAllText="Explore All Sarees"
          background="white"
          layout="classic"
        />

        {/* 7. Interactive Hotspot Deep Dive (Dark Charcoal background) */}
        <IkatDeepDive />

        {/* 8. Editorial video banner */}
        <EditorialBanner />

        {/* 9. Weaver legacy and statistics */}
        <MasterWeaverSection />

        {/* 10. Instagram Feed */}
        <InstagramSection
          handle="@Tanvo"
          profileUrl="https://instagram.com"
        />

        {/* Floating WhatsApp Action */}
        <WhatsAppOrder />

        {/* 11. Trust footer ribbon */}
        <TrustBar />
      </div>
    </div>
  );
};

export default Home;