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
import ProductsGrid from './sections/ProductsGrid';
import IkatDeepDive from './sections/IkatDeepDive';
import InstagramSection from './sections/InstagramSection';
import TrustBar from './sections/TrustBar';
import WhyChooseUs from './sections/WhyChooseUs';
import TrustSignals from './sections/TrustSignals';
import WhatsAppOrder from '../components/WhatsAppOrder';
import RegisterModal from '../components/RegisterModal';
import Preloader from '../components/Preloader';

// ── New Components ──
import HandwovenHeritage from './sections/HandwovenHeritage';
import DrapedEveryMoment from './sections/DrapedEveryMoment';
import BrandStorySection from './sections/BrandStorySection';
import MensTraditionalAttireBanner from './sections/MensTraditionalAttireBanner';
import ModernMuse from './sections/ModernMuse';
import VideoBanner from './sections/VideoBanner';
import { HERO_SLIDES } from '../constants';

const Home: React.FC = () => {
  const { products, fetchProducts, loading } = useStore();
  const [newArrivals, setNewArrivals] = useState<any[]>([]);
  const [bestsellers, setBestsellers] = useState<any[]>([]);
  const [isPreloading, setIsPreloading] = useState(true);

  useEffect(() => {
    fetchProducts({ limit: 12, sort: '-createdAt' });
  }, []);

  useEffect(() => {
    if (products.length > 0) {
      setNewArrivals(products.slice(0, 4));
      setBestsellers(products.filter((p: any) => p.isBestSeller).slice(0, 4));
    }
  }, [products]);

  // Preloader Logic
  useEffect(() => {
    let isMounted = true;
    
    const preloadAssets = async () => {
      try {
        const fontPromise = document.fonts ? document.fonts.ready : Promise.resolve();
        
        const isMobile = window.innerWidth <= 768;
        const heroUrl = isMobile ? HERO_SLIDES[0].mobile : HERO_SLIDES[0].desktop;
        
        const heroPromise = new Promise((resolve) => {
          const img = new Image();
          img.src = heroUrl;
          img.onload = resolve;
          img.onerror = resolve; // Continue even if image fails
        });

        // Timeout promise of 2000ms
        const timeoutPromise = new Promise(resolve => setTimeout(resolve, 2000));
        
        // Wait for either assets to load or timeout to occur
        await Promise.race([
          Promise.all([fontPromise, heroPromise]), 
          timeoutPromise
        ]);
        
      } catch (e) {
        console.error("Preloading error", e);
      } finally {
        if (isMounted) {
          setIsPreloading(false);
        }
      }
    };

    preloadAssets();

    return () => { isMounted = false; };
  }, []);

  return (
    <div className="bg-tanvoBg overflow-x-hidden relative font-sans">
      <Preloader isLoading={isPreloading} />

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
            background="#F9F5EE"
          />
        )}

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

        <VideoBanner />
        <CategoryGrid />
        <HandwovenHeritage />

        {/* Curated Selection */}
        <ProductsGrid
          products={products.slice(0, 4)}
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