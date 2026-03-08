import React, { useState, useEffect, useRef } from 'react';
import { Link } from "react-router-dom";
import { ChevronRight, Play, Instagram, ShieldCheck, Truck, Zap, RotateCcw } from 'lucide-react';
import { HERO_IMAGES, STORIES } from '../constants';
import ProductCard from '../components/ProductCard';
import { useStore } from '../context/StoreContext';
import API from '../services/api';

interface Story {
  id: number;
  title: string;
  img: string;
  name: string;
  cat: string;
  excerpt: string;
}

const Home: React.FC = () => {
  const { products, fetchProducts, loading } = useStore();
  const [currentHero, setCurrentHero] = useState(0);
  const [newArrivals, setNewArrivals] = useState<any[]>([]);
  const [bestsellers, setBestsellers] = useState<any[]>([]);
  const [featuredStories, setFeaturedStories] = useState<Story[]>(STORIES);
  const storyRefs = useRef<(HTMLDivElement | null)[]>([]);

  // Fetch real products from API
  useEffect(() => {
    fetchProducts({ limit: 8, sort: '-createdAt' });
  }, []);

  // Set new arrivals and bestsellers when products change
  useEffect(() => {
    if (products.length > 0) {
      // Get latest 4 products as new arrivals
      setNewArrivals(products.slice(0, 4));
      // Get bestsellers (products marked as isBestSeller)
      setBestsellers(products.filter(p => p.isBestSeller).slice(0, 4));
    }
  }, [products]);

  // Hero Slider logic
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentHero((prev) => (prev + 1) % HERO_IMAGES.length);
    }, 5000);
    return () => clearInterval(timer);
  }, []);

  // Intersection Observer for stories
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('opacity-100', 'translate-x-0');
            entry.target.classList.remove('opacity-0', '-translate-x-12');
          }
        });
      },
      { threshold: 0.2 }
    );

    storyRefs.current.forEach((ref) => {
      if (ref) observer.observe(ref);
    });

    return () => observer.disconnect();
  }, []);

  // Fetch Instagram feed (you can implement this later)
  const [instagramFeed, setInstagramFeed] = useState<any[]>([]);
  
  useEffect(() => {
    // This would be replaced with actual Instagram API call
    const mockInstaFeed = [1, 2, 3, 4, 5].map(i => ({
      id: i,
      image: `https://picsum.photos/seed/insta${i}/500/500`,
      link: 'https://instagram.com'
    }));
    setInstagramFeed(mockInstaFeed);
  }, []);

  const categories = [
    { label: 'Sambalpuri', icon: '🧵', slug: 'Sambalpuri' },
    { label: 'Bomkai', icon: '🎨', slug: 'Bomkai' },
    { label: 'Ikat', icon: '🔷', slug: 'Ikat' },
    { label: 'Silk', icon: '✨', slug: 'Silk' },
    { label: 'Cotton', icon: '🌾', slug: 'Cotton' },
    { label: 'Khandua', icon: '🕉️', slug: 'Khandua' },
  ];

  const features = [
    { icon: <ShieldCheck className="text-[#C40C0C]" size={32} />, title: '100% Authentic', desc: 'Direct from Loom' },
    { icon: <Truck className="text-[#FF6500]" size={32} />, title: 'Global Shipping', desc: 'Fast & Secure' },
    { icon: <Zap className="text-[#CC561E]" size={32} />, title: 'Premium Fabrics', desc: 'Hand-picked' },
    { icon: <RotateCcw className="text-[#F6CE71]" size={32} />, title: '7-Day Policy', desc: 'Easy Returns' },
  ];

  if (loading && products.length === 0) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="w-16 h-16 border-4 border-[#C40C0C] border-t-transparent rounded-full animate-spin"></div>
      </div>
    );
  }

  return (
    <div className="bg-white overflow-x-hidden">
      {/* 1. PIXEL-PERFECT HERO SLIDER */}
      <section className="relative h-screen w-full overflow-hidden flex items-start pt-32 sm:pt-48">
        <div className="absolute inset-0 z-0 bg-black/30 transition-opacity duration-1000" />
        
        {/* Background Slider */}
        {HERO_IMAGES.map((img, idx) => (
          <img 
            key={idx}
            src={img} 
            alt={`Heritage Slide ${idx + 1}`} 
            className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-1000 ${currentHero === idx ? 'opacity-100' : 'opacity-0'}`}
          />
        ))}

        {/* Content Container */}
        <div className="container-custom relative z-20">
          <div className="max-w-2xl text-white space-y-6 sm:space-y-8">
            <div className="inline-block px-4 py-1.5 bg-[#F6CE71]/20 backdrop-blur-md border border-[#F6CE71]/30 rounded-full animate-fadeIn">
              <span className="text-[#F6CE71] font-black tracking-[0.3em] uppercase text-[10px] sm:text-xs">
                Direct from the Loom • Authentic GI Heritage
              </span>
            </div>
            <h1 className="text-5xl sm:text-7xl md:text-9xl font-serif font-bold leading-[0.9] tracking-tighter drop-shadow-2xl">
              Handwoven <br/>with Love <br/><span className="italic text-[#F6CE71]">in Odisha</span>
            </h1>
            <p className="text-base sm:text-lg md:text-xl font-medium max-w-lg opacity-90 leading-relaxed drop-shadow-md">
              Discover authentic Sambalpuri, Bomkai, and Ikat sarees directly from master weavers. Each piece tells a story of 7 generations of craftsmanship.
            </p>
            <div className="flex items-center gap-6 pt-4">
              <Link to="/shop" className="btn-primary !px-10 sm:!px-12 !py-4 sm:!py-5 shadow-2xl hover:scale-105 active:scale-95 transition-all">
                Explore Collection
              </Link>
            </div>
          </div>
        </div>

        {/* Slider Indicators */}
        <div className="absolute bottom-12 left-1/2 -translate-x-1/2 flex gap-4 z-30">
          {HERO_IMAGES.map((_, idx) => (
            <button 
              key={idx}
              onClick={() => setCurrentHero(idx)}
              className={`h-1.5 transition-all duration-500 rounded-full ${currentHero === idx ? 'w-12 bg-[#F6CE71]' : 'w-6 bg-white/40'}`}
            />
          ))}
        </div>
      </section>

      {/* 2. CATEGORY ICON STRIP */}
      <section className="py-12 sm:py-20 border-b border-gray-50">
        <div className="container-custom">
          <div className="flex justify-between items-center overflow-x-auto gap-10 sm:gap-12 no-scrollbar pb-6 px-2">
            {categories.map((cat, idx) => (
              <Link key={idx} to={`/shop?weave=${cat.slug}`} className="flex flex-col items-center gap-4 group min-w-[70px] shrink-0">
                <div className="w-14 h-14 sm:w-16 sm:h-16 rounded-full bg-gray-50 flex items-center justify-center text-2xl group-hover:bg-[#F6CE71]/20 transition-all duration-500 border border-gray-100">
                  <span className="text-2xl">{cat.icon}</span>
                </div>
                <span className="text-[10px] sm:text-[11px] font-black uppercase tracking-widest text-slate-500 group-hover:text-[#C40C0C]">
                  {cat.label}
                </span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* 3. STREET STYLE BANNER */}
      <section className="w-full section-padding px-4 sm:px-12">
        <div className="relative h-[400px] sm:h-[500px] overflow-hidden group">
          <img 
            src="https://images.unsplash.com/photo-1610030469668-935142b9cdd0?auto=format&fit=crop&q=80&w=2000" 
            className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-[2000ms]" 
            alt="Artisanal Style"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-black/50 via-black/20 to-transparent flex items-center px-8 sm:px-24">
            <div className="max-w-md text-white space-y-6">
              <h2 className="text-4xl sm:text-6xl font-serif font-bold leading-tight">Heritage <br/>Meets Modern</h2>
              <p className="text-sm sm:text-lg opacity-80 font-medium">Traditional weaves reimagined for contemporary style. Wear your culture with pride.</p>
              <Link to="/shop" className="btn-primary !bg-[#C40C0C] !text-white !py-4 hover:!bg-[#FF6500]">Shop Now</Link>
            </div>
          </div>
        </div>
      </section>

      {/* 4. DUAL TRENDING SECTION */}
      <section className="container-custom section-padding">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 sm:gap-24 items-start">
          <div className="space-y-8 flex flex-col items-center md:items-start text-center md:text-left">
            <div className="aspect-[4/5] w-full bg-gray-50 overflow-hidden relative group">
              <img 
                src={bestsellers[0]?.images[0]?.url || "https://images.unsplash.com/photo-1610030469983-98e550d6193c?q=80&w=1200"} 
                alt="Bestsellers" 
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
              />
            </div>
            <div className="space-y-3">
              <p className="text-slate-400 font-bold uppercase tracking-[0.2em] text-xs">Bestsellers</p>
              <h3 className="text-3xl sm:text-4xl font-serif font-bold">Most Loved</h3>
              <Link to="/shop?isBestSeller=true" className="btn-primary !py-2.5 !px-8 !text-[10px] !bg-[#C40C0C]">
                View All
              </Link>
            </div>
          </div>
          <div className="md:pt-24 space-y-8 flex flex-col items-center md:items-start text-center md:text-left">
            <div className="space-y-3 order-2 md:order-1 mt-8 md:mt-0">
              <p className="text-slate-400 font-bold uppercase tracking-[0.2em] text-xs">New Arrival</p>
              <h3 className="text-3xl sm:text-4xl font-serif font-bold">Fresh from the Loom</h3>
              <Link to="/shop?isNewArrival=true" className="btn-primary !py-2.5 !px-8 !text-[10px] !bg-[#C40C0C]">
                Explore New
              </Link>
            </div>
            <div className="aspect-[4/5] w-full bg-gray-50 overflow-hidden group order-1 md:order-2">
              <img 
                src={newArrivals[0]?.images[0]?.url || "https://images.unsplash.com/photo-1617627143750-d86bc21e42bb?q=80&w=1200"} 
                alt="New Arrival" 
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
              />
            </div>
          </div>
        </div>
      </section>

      {/* 5. NEW ARRIVALS GRID */}
      <section className="container-custom section-padding">
        <div className="text-center mb-16">
          <h2 className="text-4xl sm:text-5xl font-serif font-bold">New Arrivals</h2>
          <div className="w-24 h-1 bg-[#C40C0C] mx-auto mt-6" />
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-x-8 gap-y-12">
          {newArrivals.map(product => (
            <ProductCard key={product._id} product={product} />
          ))}
          {newArrivals.length === 0 && (
            <div className="col-span-4 text-center py-12 text-gray-500">
              No new arrivals yet. Check back soon!
            </div>
          )}
        </div>
      </section>

      {/* 6. BESTSELLERS SECTION */}
      {bestsellers.length > 0 && (
        <section className="container-custom section-padding bg-gray-50">
          <div className="text-center mb-16">
            <h2 className="text-4xl sm:text-5xl font-serif font-bold">Bestsellers</h2>
            <div className="w-24 h-1 bg-[#FF6500] mx-auto mt-6" />
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-x-8 gap-y-12">
            {bestsellers.map(product => (
              <ProductCard key={product._id} product={product} />
            ))}
          </div>
        </section>
      )}

      {/* 7. ANATOMY OF A MASTER-WEAVE */}
      <section className="w-full bg-gray-100 overflow-hidden">
        <div className="relative h-[600px] sm:h-[800px] w-full group">
          <img 
            src="https://images.unsplash.com/photo-1544441892-0b61833534b8?q=80&w=2500" 
            className="w-full h-full object-cover" 
            alt="Ikat Detail"
          />
          <div className="absolute inset-0 bg-black/30" />
          
          <div className="absolute inset-y-0 left-0 flex items-center px-8 sm:px-24 w-full md:w-1/2">
            <div className="text-white space-y-8 animate-fadeIn">
              <h2 className="text-5xl sm:text-7xl font-serif font-bold leading-tight">The Art of <br/>Ikat Weaving</h2>
              <p className="text-lg sm:text-xl font-medium opacity-80 italic">A 7th-generation craft where every thread is tied and dyed by hand before weaving.</p>
              <Link to="/story" className="btn-primary !bg-[#C40C0C] hover:!bg-[#FF6500] !px-10">Learn More</Link>
            </div>
          </div>

          {/* Hotspots */}
          <div className="absolute top-[30%] right-[30%] group cursor-pointer z-30">
            <div className="w-8 h-8 bg-[#C40C0C] rounded-full flex items-center justify-center text-white font-bold animate-pulse shadow-glow">1</div>
            <div className="absolute top-10 right-0 bg-white p-4 rounded-xl shadow-2xl opacity-0 group-hover:opacity-100 transition-all duration-300 w-64 translate-x-12">
              <h4 className="text-xs font-black uppercase text-[#C40C0C] mb-1">Double Ikat</h4>
              <p className="text-[10px] text-slate-600 leading-relaxed">The rarest form of weaving where both warp and weft are tied and dyed before weaving.</p>
            </div>
          </div>
          <div className="absolute top-[55%] right-[20%] group cursor-pointer z-30">
            <div className="w-8 h-8 bg-[#C40C0C] rounded-full flex items-center justify-center text-white font-bold animate-pulse shadow-glow">2</div>
            <div className="absolute top-10 right-0 bg-white p-4 rounded-xl shadow-2xl opacity-0 group-hover:opacity-100 transition-all duration-300 w-64 translate-x-12">
              <h4 className="text-xs font-black uppercase text-[#C40C0C] mb-1">Sacred Symbols</h4>
              <p className="text-[10px] text-slate-600 leading-relaxed">Hand-woven motifs inspired by the Konark Sun Temple and Lord Jagannath rituals.</p>
            </div>
          </div>
        </div>
      </section>

      {/* 8. LEGACY TEAM SECTION */}
      <section className="container-custom section-padding">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <div className="space-y-8 order-2 lg:order-1">
            <h2 className="text-5xl sm:text-6xl font-serif font-bold leading-tight">Master Weavers <br/>Preserving a <br/>7th Generation Art</h2>
            <p className="text-lg text-gray-500 font-medium leading-relaxed">Each saree takes 15-20 days to complete, with master weavers spending months calculating dye ratios and loom setups to deliver perfection.</p>
            <Link to="/about" className="btn-primary !bg-[#C40C0C] !px-12">Meet the Artisans</Link>
          </div>
          <div className="relative group order-1 lg:order-2">
            <div className="aspect-video rounded-[0rem] overflow-hidden shadow-2xl">
              <img 
                src="https://images.unsplash.com/photo-1544441893-675973e31985?auto=format&fit=crop&q=80&w=1200" 
                alt="Weaving Legacy" 
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-black/20 flex items-center justify-center">
                <div className="w-20 h-20 bg-white rounded-full flex items-center justify-center text-[#C40C0C] hover:scale-110 transition-transform cursor-pointer shadow-2xl">
                  <Play size={28} fill="currentColor" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 9. REAL STORIES */}
      <section className="container-custom section-padding">
        <div className="text-center mb-16">
          <h2 className="text-4xl sm:text-5xl font-serif font-bold">The real stories <br/>behind our brand.</h2>
          <div className="w-24 h-1 bg-gray-100 mx-auto mt-8" />
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 sm:gap-16">
          {featuredStories.map((story, idx) => (
            <div 
              key={story.id}
              ref={(el) => { storyRefs.current[idx] = el; }}
              className="opacity-0 -translate-x-12 transition-all duration-1000 group cursor-pointer"
            >
              <div className="aspect-[16/10] overflow-hidden mb-6 relative">
                <img src={story.img} alt={story.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" />
                <div className="absolute top-4 left-4 flex gap-2">
                  <span className="bg-black text-white px-2.5 py-1 text-[8px] font-black uppercase tracking-widest">{story.cat}</span>
                  <span className="bg-white text-black px-2.5 py-1 text-[8px] font-black uppercase tracking-widest">Customer Story</span>
                </div>
              </div>
              <h3 className="text-2xl sm:text-3xl font-serif font-bold group-hover:text-[#C40C0C] transition-colors mb-2 leading-tight">{story.title}</h3>
              <p className="text-slate-500 text-sm font-medium mb-4 line-clamp-2 italic">"{story.excerpt}"</p>
              <p className="text-slate-400 text-[10px] font-black uppercase tracking-widest">— {story.name}</p>
            </div>
          ))}
        </div>
      </section>

      {/* 10. INSTAGRAM & BADGES */}
      <section className="bg-gray-50 py-20">
        <div className="container-custom">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-12 mb-24">
            {features.map((item, idx) => (
              <div key={idx} className="flex flex-col items-center text-center space-y-3">
                {item.icon}
                <h4 className="font-bold text-gray-900 text-xs uppercase tracking-widest">{item.title}</h4>
                <p className="text-[10px] text-gray-400 font-black uppercase tracking-widest">{item.desc}</p>
              </div>
            ))}
          </div>

          <div className="text-center">
            <h2 className="text-3xl font-serif font-bold mb-10">Express yourself with <span className="text-[#C40C0C]">#Syssaree</span> <br/>on instagram</h2>
            <div className="grid grid-cols-2 sm:grid-cols-5 gap-4">
              {instagramFeed.map(item => (
                <a 
                  key={item.id} 
                  href={item.link} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="relative aspect-square bg-gray-200 overflow-hidden group cursor-pointer block"
                >
                  <img src={item.image} alt="Instagram" className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" />
                  <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                    <Instagram className="text-white" size={24} />
                  </div>
                </a>
              ))}
            </div>
            <a 
              href="https://instagram.com" 
              target="_blank" 
              rel="noopener noreferrer"
              className="inline-block mt-10 text-[10px] font-black uppercase tracking-[0.3em] border-b-2 border-black pb-1 hover:text-[#C40C0C] hover:border-[#C40C0C] transition-all"
            >
              Follow us on Instagram
            </a>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;