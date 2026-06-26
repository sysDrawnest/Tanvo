import React from 'react';
import { Link } from "react-router-dom";
import {
  Sparkles, Users, Heart, Globe, Award, Leaf, Clock,
  MapPin, Quote, ArrowRight, Shield, Truck, Star, Gem,
  Droplet, Wind, Sun, ChevronRight, Feather, Zap
} from 'lucide-react';

// Import the SVG file
import OdishaMap from '../src/assets/odisha-map.svg';
import FounderSection from './sections/FounderSection';

const About: React.FC = () => {
  // Key weaving clusters data
  const weavingClusters = [
    { name: 'Keonjhar', artisans: 45, specialty: 'Sambalpuri Ikat', color: '#780000', coordinates: { top: '35%', left: '45%' } },
    { name: 'Mayurbhanj', artisans: 38, specialty: 'Tussar Silk', color: '#C9A84C', coordinates: { top: '25%', left: '55%' } },
    { name: 'Balasore', artisans: 32, specialty: 'Cotton Ikat', color: '#C9A84C', coordinates: { top: '30%', left: '75%' } },
    { name: 'Bargarh', artisans: 45, specialty: 'Sambalpuri Silk', color: '#780000', coordinates: { top: '50%', left: '25%' } },
    { name: 'Nuapatna', artisans: 32, specialty: 'Khandua Silk', color: '#C9A84C', coordinates: { top: '55%', left: '40%' } },
    { name: 'Sonepur', artisans: 28, specialty: 'Ikat Cotton', color: '#C9A84C', coordinates: { top: '60%', left: '30%' } },
    { name: 'Cuttack', artisans: 22, specialty: 'Bomkai', color: '#780000', coordinates: { top: '45%', left: '50%' } },
    { name: 'Berhampur', artisans: 35, specialty: 'Silk Sarees', color: '#780000', coordinates: { top: '75%', left: '45%' } },
    { name: 'Puri', artisans: 18, specialty: 'Khandua', color: '#C9A84C', coordinates: { top: '60%', left: '55%' } },
    { name: 'Dhenkanal', artisans: 25, specialty: 'Cotton', color: '#C9A84C', coordinates: { top: '45%', left: '40%' } }
  ];

  // Featured clusters (Keonjhar, Mayurbhanj, Balasore)
  const featuredClusters = weavingClusters.filter(c =>
    ['Keonjhar', 'Mayurbhanj', 'Balasore'].includes(c.name)
  );

  return (
    <div className="min-h-screen bg-[#F9F5EE]">
      {/* Hero Section */}
      <section className="relative overflow-hidden flex flex-col items-center">
        <div className="max-w-[1280px] w-full flex flex-col lg:flex-row-reverse items-center justify-between px-8 py-12 lg:py-20 gap-12 lg:gap-16">

          {/* Right Image Column (Top on mobile) */}
          <div className="lg:w-1/2 w-full aspect-[4/3] lg:aspect-auto flex justify-center items-center relative">
            <div className="w-full h-full flex justify-center items-center">
              <img
                src="/about.png"
                alt="Illustrations of women in traditional Odisha sarees"
                className="max-w-full max-h-full object-contain opacity-90 lg:max-h-none lg:opacity-100 transition-transform duration-1000"
              />
            </div>

            {/* Decorative plus elements - refined */}
            <div className="absolute top-10 right-10 text-2xl text-[#D2C7B1] font-serif font-light">+</div>
            <div className="absolute bottom-10 left-1/4 text-2xl text-[#D2C7B1] font-serif font-light">+</div>
            <div className="absolute top-1/2 left-10 text-2xl text-[#D2C7B1] font-serif font-light">+</div>
          </div>

          {/* Left Content Column (Bottom on mobile) */}
          <div className="lg:w-1/2 flex flex-col items-center lg:items-start space-y-10 text-center lg:text-left">
            <div className="space-y-3 w-full">
              <h1 className="font-serif text-6xl md:text-8xl text-[#0D0B0A] leading-[1.1] font-bold tracking-[-0.02em]">Bridging</h1>
              <h1 className="text-5xl md:text-7xl italic font-normal text-[#780000] leading-[1.1] font-serif">Tradition & Trend</h1>
            </div>

            <p className="text-lg text-[#0D0B0A]/80 max-w-2xl leading-[1.6] font-['Raleway'] tracking-[0.01em]">
              We don't just sell sarees — we connect you with the 700-year-old legacy of
              <span className="text-[#780000] font-medium"> Odisha's master artisans</span>.
              Your trusted platform for authentic, handcrafted heritage, direct from the loom to your wardrobe.
            </p>

            <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4 pt-4 w-full lg:w-auto">
              <Link
                to="/shop"
                className="bg-[#780000] text-white px-7 py-[14px] min-h-[48px] font-['Inter'] text-[11px] font-bold tracking-[0.2em] uppercase flex items-center gap-3 transition-all duration-500 hover:brightness-110 w-full sm:w-auto justify-center"
                style={{ borderRadius: '8px' }}
              >
                Explore Collection <span className="text-lg font-normal tracking-normal">→</span>
              </Link>
              <Link
                to="/weavers"
                className="bg-transparent text-[#780000] px-7 py-[14px] min-h-[48px] font-['Inter'] text-[11px] font-bold tracking-[0.2em] uppercase border border-[#780000] transition-all duration-500 hover:bg-[#780000]/5 w-full sm:w-auto justify-center"
                style={{ borderRadius: '8px' }}
              >
                Meet Our Artisans
              </Link>
            </div>
          </div>
        </div>

        {/* Stats Row - Full Width Bar */}
        <div className="w-full bg-[#F9F5EE] border-t border-[#E2D9C8] px-8 py-12">
          <div className="max-w-[1280px] mx-auto flex flex-wrap justify-between gap-12 text-center lg:text-left">
            {[
              { label: 'Artisan Families', value: '200+' },
              { label: 'Weaving Clusters', value: '28' },
              { label: 'Years of Legacy', value: '700+' },
              { label: 'Happy Clients', value: '15K+' }
            ].map((stat, i) => (
              <div key={i} className="flex-1 min-w-[150px] space-y-1">
                <p className="text-3xl font-medium text-[#0D0B0A] font-['Raleway']">{stat.value}</p>
                <p className="text-[11px] font-bold text-[#0D0B0A]/60 uppercase tracking-[0.2em] font-['Inter'] leading-none">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Artisan Network Map Section */}
      <section className="w-full py-16 md:py-24 bg-white">
        <div className="max-w-[1280px] mx-auto px-8">
          <div className="text-center mb-12">
            <div className="inline-flex items-center gap-2 px-4 py-2 border border-[#780000]/20 mb-4" style={{ borderRadius: '6px' }}>
              <MapPin className="w-4 h-4 text-[#780000]" />
              <span className="text-[#780000] font-['Inter'] font-bold uppercase tracking-[0.2em] text-[11px]">Our Roots</span>
            </div>
            <h2 className="font-serif text-4xl md:text-5xl font-bold text-[#0D0B0A] mb-3 tracking-[-0.01em]">
              Artisan Network
            </h2>
            <p className="text-base text-[#0D0B0A]/70 max-w-2xl mx-auto font-['Raleway'] leading-[1.65] tracking-[0.01em]">
              We work with <span className="font-medium text-[#780000]">28 weaving clusters</span> across Odisha,
              supporting over <span className="font-medium text-[#C9A84C]">200 artisan families</span>.
            </p>
          </div>

          {/* Featured Clusters - Refined with sharp geometry */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
            {featuredClusters.map((cluster, index) => (
              <div
                key={index}
                className="bg-white p-6 border border-[#E2D9C8] transition-all duration-500 hover:-translate-y-1 relative overflow-hidden"
                style={{ borderRadius: '12px' }}
              >
                <div className="absolute top-0 right-0 w-24 h-24 opacity-5">
                  <MapPin className="w-full h-full" />
                </div>
                <div className="w-12 h-0.5 bg-[#780000] mb-4"></div>
                <h3 className="font-serif text-xl font-bold text-[#0D0B0A] mb-1">{cluster.name}</h3>
                <p className="text-xs text-[#0D0B0A]/60 font-['Raleway'] tracking-[0.01em] mb-3">{cluster.specialty}</p>
                <div className="flex items-center justify-between">
                  <div>
                    <span className="text-xl font-medium text-[#780000] font-['Raleway']">{cluster.artisans}</span>
                    <span className="text-xs text-[#0D0B0A]/50 ml-1 font-['Raleway']">artisans</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Droplet className="w-3 h-3 text-[#669BBC]" />
                    <Wind className="w-3 h-3 text-[#780000]" />
                    <Sun className="w-3 h-3 text-[#C9A84C]" />
                  </div>
                </div>
                <div className="mt-4 pt-4 border-t border-[#E2D9C8]">
                  <Link
                    to={`/shop?cluster=${cluster.name.toLowerCase()}`}
                    className="text-xs font-['Inter'] font-bold text-[#C9A84C] uppercase tracking-[0.2em] hover:text-[#780000] transition-colors duration-300 flex items-center gap-2"
                  >
                    View Collection <ArrowRight className="w-3 h-3" />
                  </Link>
                </div>
              </div>
            ))}
          </div>

          {/* Map Container - Refined with sharp edges */}
          <div className="relative max-w-4xl mx-auto">
            <div className="bg-[#F9F5EE] p-6 border border-[#E2D9C8]" style={{ borderRadius: '12px' }}>
              {/* Map Legend */}
              <div className="flex flex-wrap items-center justify-center gap-6 mb-6">
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 bg-[#780000]"></div>
                  <span className="text-xs text-[#0D0B0A]/70 font-['Raleway']">Primary Clusters</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 bg-[#C9A84C]"></div>
                  <span className="text-xs text-[#0D0B0A]/70 font-['Raleway']">Secondary Clusters</span>
                </div>
              </div>

              {/* Map Visualization with Actual Odisha Map */}
              <div className="relative aspect-[4/3] w-full bg-[#E8D5B5] overflow-hidden border border-[#E2D9C8]" style={{ borderRadius: '8px' }}>
                {/* Odisha Map SVG */}
                <img
                  src={OdishaMap}
                  alt="Odisha Map with Weaving Clusters"
                  className="w-full h-full object-contain opacity-80"
                />

                {/* Grid overlay for reference - subtle */}
                <div className="absolute inset-0 grid grid-cols-6 grid-rows-6 pointer-events-none">
                  {Array.from({ length: 36 }).map((_, i) => (
                    <div key={i} className="border border-[#780000]/5"></div>
                  ))}
                </div>

                {/* Rivers */}
                <div className="absolute top-1/3 left-0 w-full h-px bg-[#669BBC]/20 transform -rotate-6 pointer-events-none"></div>
                <div className="absolute bottom-1/3 left-0 w-full h-px bg-[#669BBC]/20 transform rotate-12 pointer-events-none"></div>

                {/* Cluster Markers */}
                {weavingClusters.map((cluster, index) => (
                  <div
                    key={index}
                    className="absolute group cursor-pointer z-10"
                    style={{
                      top: cluster.coordinates.top,
                      left: cluster.coordinates.left,
                      transform: 'translate(-50%, -50%)'
                    }}
                  >
                    {/* Pulse Effect - subtle */}
                    <div
                      className="absolute inset-0 animate-ping"
                      style={{
                        backgroundColor: cluster.color,
                        width: '20px',
                        height: '20px',
                        opacity: '0.15',
                        borderRadius: '0'
                      }}
                    />

                    {/* Main Marker - square for heritage feel */}
                    <div
                      className="relative w-4 h-4 border border-white hover:scale-150 transition-all duration-500 shadow-md"
                      style={{ 
                        backgroundColor: cluster.color,
                        borderRadius: '2px'
                      }}
                    >
                      {/* Tooltip */}
                      <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none z-20">
                        <div className="bg-[#0D0B0A] text-[#F9F5EE] text-[10px] p-3 whitespace-nowrap shadow-lg" style={{ borderRadius: '6px' }}>
                          <p className="font-['Inter'] font-bold tracking-[0.1em]">{cluster.name}</p>
                          <p className="text-[8px] opacity-75 font-['Raleway']">{cluster.artisans} artisans</p>
                        </div>
                      </div>
                    </div>

                    {/* Label */}
                    <span className="absolute top-5 left-1/2 transform -translate-x-1/2 text-[8px] font-['Inter'] font-bold text-[#0D0B0A] whitespace-nowrap opacity-70 group-hover:opacity-100 transition-opacity bg-[#F9F5EE]/90 px-2 py-0.5 tracking-[0.1em]">
                      {cluster.name}
                    </span>
                  </div>
                ))}
              </div>

              {/* Map Stats */}
              <div className="mt-6 grid grid-cols-3 gap-6">
                {featuredClusters.map((cluster, index) => (
                  <div key={index} className="text-center">
                    <div className="text-sm font-['Raleway'] font-medium text-[#780000]">{cluster.artisans}</div>
                    <div className="text-[10px] text-[#0D0B0A]/60 font-['Raleway']">{cluster.name}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Our Role Section */}
      <section className="w-full py-16 md:py-24 bg-[#F9F5EE]">
        <div className="max-w-[1280px] mx-auto px-8">
          <div className="max-w-3xl mx-auto text-center mb-16">
            <h2 className="font-serif text-4xl md:text-5xl font-bold text-[#0D0B0A] mb-4 tracking-[-0.01em]">
              We Don't Just Sell, We
              <span className="text-[#C9A84C]"> Connect</span>
            </h2>
            <p className="text-base text-[#0D0B0A]/70 font-['Raleway'] leading-[1.65] tracking-[0.01em]">
              Think of us as the bridge between the skilled hands of Odisha and your wardrobe.
              We handle the logistics, quality checks, and global reach — so artisans can focus on their craft.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-5xl mx-auto">
            {[
              {
                icon: <Gem className="w-6 h-6" />,
                title: "Curated Selection",
                description: "We personally visit 28 weaving clusters to handpick only the finest pieces."
              },
              {
                icon: <Shield className="w-6 h-6" />,
                title: "Authenticity Guaranteed",
                description: "Every product comes with GI certification and weaver's signature."
              },
              {
                icon: <Globe className="w-6 h-6" />,
                title: "Global Reach",
                description: "From Odisha villages to your doorstep anywhere in the world."
              }
            ].map((item, index) => (
              <div 
                key={index} 
                className="bg-white p-8 border border-[#E2D9C8] transition-all duration-500 hover:-translate-y-1 group"
                style={{ borderRadius: '12px' }}
              >
                <div className="w-12 h-12 bg-[#F9F5EE] flex items-center justify-center mb-4 text-[#780000] border border-[#E2D9C8]" style={{ borderRadius: '6px' }}>
                  {item.icon}
                </div>
                <h3 className="font-serif text-xl font-bold text-[#0D0B0A] mb-2">{item.title}</h3>
                <p className="text-sm text-[#0D0B0A]/70 font-['Raleway'] leading-[1.65] tracking-[0.01em]">{item.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Philosophy Section */}
      <section className="w-full py-16 md:py-24 bg-white">
        <div className="max-w-[1280px] mx-auto px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center max-w-5xl mx-auto">
            {/* Image */}
            <div className="relative group">
              <div className="absolute -inset-2 border border-[#780000]/10" style={{ borderRadius: '12px' }} />
              <div className="relative aspect-[4/5] overflow-hidden shadow-lg border border-[#E2D9C8]" style={{ borderRadius: '8px' }}>
                <img
                  src="https://images.unsplash.com/photo-1544441893-675973e31985?q=80&w=1200"
                  alt="Master weaver at work"
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#0D0B0A]/70 via-transparent to-transparent" />
                <div className="absolute bottom-6 left-6 text-[#F9F5EE]">
                  <p className="text-[11px] font-['Inter'] font-bold tracking-[0.2em] uppercase opacity-80 mb-1">Master Weaver • 4th Generation</p>
                  <p className="font-serif text-lg font-bold italic">"Every thread tells a story"</p>
                </div>
              </div>
            </div>

            {/* Content */}
            <div className="space-y-8">
              <div>
                <div className="inline-flex items-center gap-2 px-4 py-2 border border-[#C9A84C]/30 mb-4" style={{ borderRadius: '6px' }}>
                  <Sparkles className="w-4 h-4 text-[#C9A84C]" />
                  <span className="text-[#C9A84C] font-['Inter'] font-bold uppercase tracking-[0.2em] text-[11px]">The Art of Precision</span>
                </div>

                <h2 className="font-serif text-4xl md:text-5xl font-bold text-[#0D0B0A] leading-[1.1] tracking-[-0.01em]">
                  Where mathematics
                  <span className="text-[#780000]"> meets magic.</span>
                </h2>
              </div>

              <p className="text-base text-[#0D0B0A]/70 font-['Raleway'] leading-[1.65] tracking-[0.01em]">
                Every Ikat saree begins as a complex mathematical equation.
                <span className="font-medium text-[#0D0B0A]"> Master weavers calculate the exact tension of thousands of threads</span>
                to ensure the tied dyes align perfectly during the weaving process.
              </p>

              {/* Feature grid - refined */}
              <div className="grid grid-cols-2 gap-4">
                {[
                  { icon: <Droplet className="w-4 h-4" />, title: "Natural Dyes", color: "#669BBC" },
                  { icon: <Feather className="w-4 h-4" />, title: "Pure Materials", color: "#780000" },
                  { icon: <Sun className="w-4 h-4" />, title: "Solar Energy", color: "#C9A84C" },
                  { icon: <Shield className="w-4 h-4" />, title: "GI Certified", color: "#780000" }
                ].map((feature, index) => (
                  <div key={index} className="flex items-center gap-3">
                    <div className="w-9 h-9 bg-[#F9F5EE] flex items-center justify-center border border-[#E2D9C8]" style={{ borderRadius: '6px' }}>
                      <div style={{ color: feature.color }}>{feature.icon}</div>
                    </div>
                    <div>
                      <p className="text-xs font-['Inter'] font-bold text-[#0D0B0A] tracking-[0.1em] uppercase">{feature.title}</p>
                    </div>
                  </div>
                ))}
              </div>

              {/* Sustainability badge - refined */}
              <div className="flex items-center gap-4 p-4 border border-[#780000]/10 bg-[#F9F5EE]" style={{ borderRadius: '8px' }}>
                <Leaf className="w-5 h-5 text-[#780000]" />
                <div>
                  <p className="text-xs font-['Inter'] font-bold text-[#0D0B0A] tracking-[0.1em] uppercase">100% Sustainable Practice</p>
                  <p className="text-xs text-[#0D0B0A]/60 font-['Raleway']">Solar-powered looms and rainwater harvesting</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <FounderSection />

      {/* New Call to Action for Journal */}
      <section className="max-w-[1280px] mx-auto px-8 mt-16 md:mt-24 mb-24 text-center">
        <div className="max-w-2xl mx-auto space-y-8">
          <h2 className="font-serif text-3xl md:text-5xl font-bold text-[#0D0B0A] tracking-[-0.01em]">Want to learn more about our process?</h2>
          <p className="text-base text-[#0D0B0A]/60 font-['Raleway'] leading-[1.65]">Dive into the mathematical precision of the loom and the heritage of Odisha's weavers.</p>
          <Link 
            to="/journal" 
            className="inline-flex items-center gap-3 px-7 py-[14px] min-h-[48px] border border-[#0D0B0A] text-[#0D0B0A] font-['Inter'] text-[11px] font-bold uppercase tracking-[0.2em] transition-all duration-500 hover:bg-[#0D0B0A] hover:text-white"
            style={{ borderRadius: '8px' }}
          >
            Explore Craft Chronicles <ArrowRight size={14} />
          </Link>
        </div>
      </section>

      {/* Footer Call to Action - Refined */}
      <section className="max-w-[1280px] mx-auto px-8 mt-12 md:mt-16">
        <div className="bg-[#0D0B0A] p-10 md:p-14 text-center text-[#F9F5EE] relative overflow-hidden border border-[#E2D9C8]" style={{ borderRadius: '12px' }}>
          <div className="absolute top-0 right-0 w-48 h-48 bg-[#780000]/10 -mr-16 -mt-16"></div>
          <div className="absolute bottom-0 left-0 w-32 h-32 bg-[#C9A84C]/5 -ml-16 -mb-16"></div>

          <h2 className="font-serif text-3xl md:text-4xl font-bold mb-3 relative z-10 tracking-[-0.01em]">
            Join the <span className="text-[#C9A84C]">Heritage</span> Movement
          </h2>
          <p className="text-sm text-[#F9F5EE]/70 mb-8 max-w-lg mx-auto relative z-10 font-['Raleway'] leading-[1.65]">
            Be part of our journey to preserve Odisha's rich handloom tradition.
            Every purchase directly supports an artisan family.
          </p>
          <div className="flex flex-wrap gap-4 justify-center relative z-10">
            <Link
              to="/shop"
              className="px-7 py-[14px] min-h-[48px] bg-[#780000] text-[#F9F5EE] font-['Inter'] text-[11px] font-bold uppercase tracking-[0.2em] transition-all duration-500 hover:brightness-110"
              style={{ borderRadius: '8px' }}
            >
              Shop Now
            </Link>
            <Link
              to="/contact"
              className="px-7 py-[14px] min-h-[48px] border border-[#F9F5EE]/30 text-[#F9F5EE] font-['Inter'] text-[11px] font-bold uppercase tracking-[0.2em] transition-all duration-500 hover:bg-[#F9F5EE]/10"
              style={{ borderRadius: '8px' }}
            >
              Partner With Us
            </Link>
          </div>
        </div>
      </section>

    </div>
  );
};

export default About;