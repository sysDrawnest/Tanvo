import React, { useEffect, useState } from 'react';
import { useStore } from '../context/StoreContext';
import { Product } from '../types';
import { motion } from 'framer-motion';

// ── Section Components ──
import HeroSection from './sections/HeroSection';
import MarqueeTicker from './sections/MarqueeTicker';
import PillarsSection from './sections/PillarsSection';
import EditorialBanner from './sections/EditorialBanner';
import CategoryGrid from './sections/CategoryGrid';
import DualFeatureSection from './sections/DualFeatureSection';
import ProductsGrid from './sections/ProductsGrid';
import IkatDeepDive from './sections/IkatDeepDive';
import MasterWeaverSection from './sections/MasterWeaverSection';
import InstagramSection from './sections/InstagramSection';
import TrustBar from './sections/TrustBar';
import WhyChooseUs from './sections/WhyChooseUs';
import TrustSignals from './sections/TrustSignals';
import WhatsAppOrder from '../components/WhatsAppOrder';
import RegisterModal from '../components/RegisterModal';

// ── New Components ──
import HandwovenHeritage from './sections/HandwovenHeritage';
import LearningSection from './sections/LearningSection';
import JournalHint from './sections/JournalHint';
import NewArrivalsBanner from './sections/NewArrivalsBanner';

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
        <HeroSection />

        {bestsellers.length > 0 && (
          <ProductsGrid
            products={bestsellers}
            label="Most Loved"
            title="Bestsellers"
            viewAllLink="/shop?isBestSeller=true"
            viewAllText="All Bestsellers"
            background="#F5E5E5"
          />
        )}

        <HandwovenHeritage />

        {/* Sarees directly after hero for buying */}
        <ProductsGrid
          products={products.slice(0, 8)}
          label="Direct from the Loom"
          title="Curated"
          titleEm="Selection"
          viewAllLink="/shop"
          viewAllText="Explore All Sarees"
          background="white"
        />

        <MarqueeTicker />
        <PillarsSection />

        {/* New Arrivals Section */}
        <ProductsGrid
          products={newArrivals}
          label="Just Arrived"
          title="New"
          titleEm="Arrivals"
          viewAllLink="/shop?sort=-createdAt"
          viewAllText="View Newest Drops"
          background="transparent"
        />

        <IkatDeepDive />

        <EditorialBanner />
        <CategoryGrid />
        <WhyChooseUs />
        <NewArrivalsBanner />

        <DualFeatureSection
          bestseller={bestsellers[0]}
          newArrival={newArrivals[0]}
        />

        <TrustSignals />
        <MasterWeaverSection />
        <JournalHint />
        <LearningSection />

        <InstagramSection
          handle="@Tanvo"
          profileUrl="https://instagram.com"
        />
        <WhatsAppOrder />
        <TrustBar />
      </div>
    </div>
  );
};

export default Home;