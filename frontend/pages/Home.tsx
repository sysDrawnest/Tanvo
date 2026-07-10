import React, { useEffect, useState } from 'react';
import API from '../services/api';
import { Product } from '../types';

// ── Section Components ──
import HeroSection from './sections/HeroSection';
import MarqueeTicker from './sections/MarqueeTicker';
import PillarsSection from './sections/PillarsSection';
import EditorialBanner from './sections/EditorialBanner';
import CategoryGrid from './sections/CategoryGrid';
import ProductsGrid from './sections/ProductsGrid';

import InstagramSection from './sections/InstagramSection';
import TrustBar from './sections/TrustBar';
import WhyChooseUs from './sections/WhyChooseUs';
import TrustSignals from './sections/TrustSignals';
import WhatsAppOrder from '../components/WhatsAppOrder';

// ── New Components ──
import HandwovenHeritage from './sections/HandwovenHeritage';
import DrapedEveryMoment from './sections/DrapedEveryMoment';
import BrandStorySection from './sections/BrandStorySection';
import MensTraditionalAttireBanner from './sections/MensTraditionalAttireBanner';
import ModernMuse from './sections/ModernMuse';
import VideoBanner from './sections/VideoBanner';
import HeritageCuratedTransition from './sections/HeritageCuratedTransition';

const Home: React.FC = () => {
  const [newArrivals, setNewArrivals] = useState<any[]>([]);
  const [bestsellers, setBestsellers] = useState<any[]>([]);
  const [curated, setCurated] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Two focused fetches instead of one big one
    setLoading(true);
    Promise.all([
      API.get('/products?limit=4&sort=-createdAt'),
      API.get('/products?limit=4&isBestSeller=true'),
      API.get('/products?limit=4') // fallback for curated
    ])
    .then(([newRes, bestRes, curatedRes]) => {
      setNewArrivals(newRes.data.products || []);
      setBestsellers(bestRes.data.products || []);
      setCurated(curatedRes.data.products || []);
    })
    .catch(console.error)
    .finally(() => setLoading(false));
  }, []);

  return (
    <div className="bg-tanvoBg overflow-x-hidden relative font-sans">
      {/* textile overlay */}
      <div className="fixed inset-0 pointer-events-none opacity-50 z-1" style={{ backgroundImage: `url("data:image/svg+xml,%3Csvg width='40' height='40' viewBox='0 0 40 40' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M0 0h40v2H0V0zm0 4h40v2H0V4zm0 4h40v2H0V8zm0 4h40v2H0v-2zm0 4h40v2H0v-2zm0 4h40v2H0v-2zm0 4h40v2H0v-2zm0 4h40v2H0v-2zm0 4h40v2H0v-2zm0 4h40v2H0v-2z' fill='%23B43F3F' fill-opacity='0.02' fill-rule='evenodd'/%3E%3C/svg%3E")` }} />

      <div className="relative z-10">
        <HeroSection />

        <ProductsGrid
          products={bestsellers}
          loading={loading && bestsellers.length === 0}
          label="Most Loved"
          title="Bestsellers"
          viewAllLink="/shop?isBestSeller=true"
          viewAllText="All Bestsellers"
          background="#F9F5EE"
        />

        <VideoBanner />

        <MarqueeTicker />
        <PillarsSection />

        <ProductsGrid
          products={newArrivals}
          loading={loading && newArrivals.length === 0}
          label="Just Arrived"
          title="New"
          titleEm="Arrivals"
          viewAllLink="/shop?sort=-createdAt"
          viewAllText="View Newest Drops"
          background="transparent"
        />


        <CategoryGrid />
        <HandwovenHeritage />
        <HeritageCuratedTransition />

        <ProductsGrid
          products={curated}
          loading={loading && curated.length === 0}
          label="Direct from the Loom"
          title="Curated"
          titleEm="Selection"
          viewAllLink="/shop"
          viewAllText="Explore All Sarees"
          background="#0D0B0A"
          inverse={true}
        />

        <EditorialBanner />

        <MensTraditionalAttireBanner />
        <ModernMuse />
        <DrapedEveryMoment />
        <WhyChooseUs />
        <TrustSignals />
        <BrandStorySection />

        <WhatsAppOrder />
        
        <InstagramSection
          handle="@Tanvo"
          profileUrl="https://instagram.com"
        />
        
        <TrustBar />
      </div>
    </div>
  );
};

export default Home;