import React from 'react';
import { Link } from "react-router-dom";
import {
  Sparkles, Users, Heart, Globe, Award, Leaf, Clock,
  MapPin, Quote, ArrowRight, Shield, Truck, Star, Gem,
  Droplet, Wind, Sun, ChevronRight, Feather, Zap
} from 'lucide-react';
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

  const featuredClusters = weavingClusters.filter(c =>
    ['Keonjhar', 'Mayurbhanj', 'Balasore'].includes(c.name)
  );

  return (
    <div className="min-h-screen bg-[#F9F5EE]">
      {/* Hero Section */}
      <section className="relative overflow-hidden flex flex-col items-center">
        <div className="max-w-[1280px] w-full flex flex-col lg:flex-row-reverse items-center justify-between px-[32px] py-[96px] gap-12">

          {/* Right Image Column */}
          <div className="lg:w-1/2 w-full aspect-[4/3] lg:aspect-auto flex justify-center items-center relative rounded-large overflow-hidden">
            <div className="w-full h-full flex justify-center items-center">
              <img
                src="/about.png"
                alt="Illustrations of women in traditional Odisha sarees"
                className="max-w-full max-h-full object-contain mix-blend-multiply opacity-90"
              />
            </div>
          </div>

          {/* Left Content Column */}
          <div className="lg:w-1/2 flex flex-col items-center lg:items-start space-y-10 text-center lg:text-left">
            <div className="space-y-4 w-full">
              <h1 className="font-['Playfair_Display'] text-6xl md:text-8xl text-[#0D0B0A] leading-[110%] tracking-[-0.02em] font-bold">
                Bridging
              </h1>
              <h1 className="text-5xl md:text-7xl italic font-normal text-[#780000] leading-[120%] font-['Playfair_Display'] tracking-[-0.01em]">
                Tradition & Trend
              </h1>
            </div>

            <p className="text-lg text-[#0D0B0A] max-w-2xl leading-[160%] tracking-[0.01em] font-['Raleway']">
              We don't just sell sarees — we connect you with the 700-year-old legacy of
              <span className="text-[#780000] font-medium"> Odisha's master artisans</span>.
              Your trusted platform for authentic, handcrafted heritage, direct from the loom to your wardrobe.
            </p>

            <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4 pt-4 w-full lg:w-auto">
              <Link
                to="/shop"
                className="h-[48px] bg-gradient-to-r from-[#780000] to-[#C1121F] text-[#FFFFFF] px-[28px] py-[14px] rounded-lg font-['Inter'] font-bold text-[11px] tracking-[0.2em] uppercase flex items-center gap-3 transition duration-500 ease-in-out hover:brightness-110 w-full sm:w-auto justify-center"
              >
                Explore Collection <span className="text-lg">&rarr;</span>
              </Link>
              <Link
                to="/weavers"
                className="h-[48px] bg-transparent text-[#780000] px-[28px] py-[14px] rounded-lg font-['Inter'] font-bold text-[11px] tracking-[0.2em] uppercase border border-[#780000] transition duration-500 ease-in-out hover:bg-[#F9F5EE] w-full sm:w-auto justify-center"
              >
                Meet Our Artisans
              </Link>
            </div>
          </div>
        </div>

        {/* Stats Row */}
        <div className="w-full bg-[#F9F5EE] border-t border-[#E2D9C8] px-[32px] py-[96px]">
          <div className="max-w-[1280px] mx-auto flex flex-wrap justify-between gap-12 text-center lg:text-left">
            {[
              { label: 'Artisan Families', value: '200+' },
              { label: 'Weaving Clusters', value: '28' },
              { label: 'Years of Legacy', value: '700+' },
              { label: 'Happy Clients', value: '15K+' }
            ].map((stat, i) => (
              <div key={i} className="flex-1 min-w-[150px] space-y-1">
                <p className="text-3xl font-bold text-[#0D0B0A] font-['Playfair_Display']">{stat.value}</p>
                <p className="text-[11px] font-bold text-[#0D0B0A] uppercase tracking-[0.2em] leading-[120%] font-['Inter']">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Artisan Network Map Section */}
      <section className="w-full py-[96px] bg-[#FFFFFF]">
        <div className="max-w-[1280px] mx-auto px-[32px]">
          <div className="text-center mb-12">
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-[#E8C97A]/10 rounded-md mb-4">
              <MapPin className="w-4 h-4 text-[#C9A84C]" />
              <span className="text-[#C9A84C] font-bold uppercase tracking-[0.2em] text-[11px] font-['Inter']">Our Roots</span>
            </div>
            <h2 className="text-4xl font-bold text-[#0D0B0A] font-['Playfair_Display'] leading-[120%] tracking-[-0.01em] mb-3">
              Artisan Network
            </h2>
            <p className="text-[18px] text-[#0D0B0A]/70 max-w-2xl mx-auto font-['Raleway'] leading-[160%] tracking-[0.01em]">
              We work with <span className="font-medium text-[#780000]">28 weaving clusters</span> across Odisha,
              supporting over <span className="font-medium text-[#C9A84C]">200 artisan families</span>.
            </p>
          </div>

          {/* Featured Clusters */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
            {featuredClusters.map((cluster, index) => (
              <div
                key={index}
                className="bg-[#FFFFFF] p-6 rounded-large shadow-sm hover:shadow-md transition-all duration-500 hover:-translate-y-1 border-l-4 relative overflow-hidden"
                style={{ borderLeftColor: cluster.color }}
              >
                <div className="absolute top-0 right-0 w-24 h-24 opacity-5">
                  <MapPin className="w-full h-full" />
                </div>
                <h3 className="text-2xl font-bold text-[#0D0B0A] font-['Playfair_Display'] leading-[130%] mb-1">{cluster.name}</h3>
                <p className="text-[15px] text-[#0D0B0A]/60 font-['Raleway'] leading-[165%] tracking-[0.01em] mb-3">{cluster.specialty}</p>
                <div className="flex items-center justify-between">
                  <div>
                    <span className="text-xl font-bold text-[#780000] font-['Playfair_Display']">{cluster.artisans}</span>
                    <span className="text-[15px] text-[#0D0B0A]/50 ml-1 font-['Raleway']">artisans</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <Droplet className="w-3 h-3 text-blue-400" />
                    <Wind className="w-3 h-3 text-green-400" />
                    <Sun className="w-3 h-3 text-yellow-400" />
                  </div>
                </div>
                <div className="mt-3 pt-3 border-t border-[#780000]/10">
                  <Link
                    to={`/shop?cluster=${cluster.name.toLowerCase()}`}
                    className="text-[11px] font-bold text-[#C9A84C] hover:text-[#780000] transition-colors duration-500 flex items-center gap-1 font-['Inter'] uppercase tracking-[0.2em]"
                  >
                    View Collection <ArrowRight className="w-3 h-3" />
                  </Link>
                </div>
              </div>
            ))}
          </div>

          {/* Map Container */}
          <div className="relative max-w-4xl mx-auto">
            <div className="bg-[#F9F5EE] rounded-large p-6 shadow-sm border border-[#E2D9C8]">
              <div className="flex flex-wrap items-center justify-center gap-4 mb-4">
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 bg-[#780000] rounded-full"></div>
                  <span className="text-[15px] text-[#0D0B0A]/70 font-['Raleway']">Primary Clusters</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 bg-[#C9A84C] rounded-full"></div>
                  <span className="text-[15px] text-[#0D0B0A]/70 font-['Raleway']">Secondary Clusters</span>
                </div>
              </div>

              <div className="relative aspect-[4/3] w-full bg-gradient-to-b from-[#E8D5B5] to-[#D9C8A8] rounded-large overflow-hidden border border-[#E2D9C8]">
                <img
                  src={OdishaMap}
                  alt="Odisha Map with Weaving Clusters"
                  className="w-full h-full object-contain opacity-80"
                />

                <div className="absolute inset-0 grid grid-cols-6 grid-rows-6 pointer-events-none">
                  {Array.from({ length: 36 }).map((_, i) => (
                    <div key={i} className="border border-[#780000]/5"></div>
                  ))}
                </div>

                <div className="absolute top-1/3 left-0 w-full h-0.5 bg-blue-300/30 transform -rotate-6 pointer-events-none"></div>
                <div className="absolute bottom-1/3 left-0 w-full h-0.5 bg-blue-300/30 transform rotate-12 pointer-events-none"></div>

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
                    <div
                      className="absolute inset-0 rounded-full animate-ping"
                      style={{
                        backgroundColor: cluster.color,
                        width: '24px',
                        height: '24px',
                        opacity: '0.2'
                      }}
                    />
                    <div
                      className="relative w-4 h-4 rounded-full border-2 border-[#FFFFFF] hover:scale-150 transition-all duration-500 shadow-sm"
                      style={{ backgroundColor: cluster.color }}
                    >
                      <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none z-20">
                        <div className="bg-[#0D0B0A] text-[#FFFFFF] text-[10px] p-2 rounded-md whitespace-nowrap shadow-sm">
                          <p className="font-bold font-['Inter']">{cluster.name}</p>
                          <p className="text-[8px] opacity-75 font-['Raleway']">{cluster.artisans} artisans</p>
                        </div>
                      </div>
                    </div>
                    <span className="absolute top-4 left-1/2 transform -translate-x-1/2 text-[8px] font-bold text-[#0D0B0A] whitespace-nowrap opacity-70 group-hover:opacity-100 transition-opacity bg-[#FFFFFF]/80 px-1 rounded-sm font-['Inter'] uppercase tracking-[0.2em]">
                      {cluster.name}
                    </span>
                  </div>
                ))}
              </div>

              <div className="mt-4 grid grid-cols-3 gap-4">
                {featuredClusters.map((cluster, index) => (
                  <div key={index} className="text-center">
                    <div className="text-[18px] font-bold text-[#780000] font-['Playfair_Display']">{cluster.artisans}</div>
                    <div className="text-[11px] text-[#0D0B0A]/60 font-['Inter'] uppercase tracking-[0.2em]">{cluster.name}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Our Role Section */}
      <section className="w-full py-[96px]">
        <div className="max-w-[1280px] mx-auto px-[32px]">
          <div className="max-w-3xl mx-auto text-center mb-12">
            <h2 className="text-4xl font-bold text-[#0D0B0A] font-['Playfair_Display'] leading-[120%] tracking-[-0.01em] mb-4">
              We Don't Just Sell, We
              <span className="text-[#C9A84C]"> Connect</span>
            </h2>
            <p className="text-[18px] text-[#0D0B0A]/70 font-['Raleway'] leading-[160%] tracking-[0.01em]">
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
              <div key={index} className="bg-[#FFFFFF] p-6 rounded-large shadow-sm hover:shadow-md transition-all duration-500 hover:-translate-y-1 border border-[#E2D9C8] group">
                <div className="w-12 h-12 bg-[#F9F5EE] rounded-md flex items-center justify-center mb-4 text-[#780000] group-hover:scale-110 transition-transform duration-500 border border-[#E2D9C8]">
                  {item.icon}
                </div>
                <h3 className="text-2xl font-bold text-[#0D0B0A] font-['Playfair_Display'] leading-[130%] mb-2">{item.title}</h3>
                <p className="text-[15px] text-[#0D0B0A]/70 font-['Raleway'] leading-[165%] tracking-[0.01em]">{item.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Philosophy Section */}
      <section className="w-full py-[96px] bg-[#FFFFFF]">
        <div className="max-w-[1280px] mx-auto px-[32px]">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center max-w-5xl mx-auto">
            <div className="relative group">
              <div className="absolute -inset-2 bg-gradient-to-r from-[#780000] to-[#C9A84C] rounded-large blur-lg opacity-30 group-hover:opacity-50 transition-opacity duration-500" />
              <div className="relative aspect-[4/5] rounded-large overflow-hidden shadow-sm">
                <img
                  src="https://images.unsplash.com/photo-1544441893-675973e31985?q=80&w=1200"
                  alt="Master weaver at work"
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#0D0B0A]/70 via-transparent to-transparent" />
                <div className="absolute bottom-4 left-4 text-[#FFFFFF]">
                  <p className="text-[11px] font-bold uppercase tracking-[0.2em] font-['Inter'] mb-1">Master Weaver • 4th Generation</p>
                  <p className="text-[18px] font-bold font-['Playfair_Display'] leading-[160%]">"Every thread tells a story"</p>
                </div>
              </div>
            </div>

            <div className="space-y-6">
              <div className="inline-flex items-center gap-2 px-4 py-2 bg-[#E8C97A]/10 rounded-md">
                <Sparkles className="w-4 h-4 text-[#C9A84C]" />
                <span className="text-[#C9A84C] font-bold uppercase tracking-[0.2em] text-[11px] font-['Inter']">The Art of Precision</span>
              </div>

              <h2 className="text-4xl font-bold text-[#0D0B0A] font-['Playfair_Display'] leading-[120%] tracking-[-0.01em]">
                Where mathematics
                <span className="text-[#780000]"> meets magic.</span>
              </h2>

              <p className="text-[18px] text-[#0D0B0A]/70 font-['Raleway'] leading-[160%] tracking-[0.01em]">
                Every Ikat saree begins as a complex mathematical equation.
                <span className="font-medium text-[#0D0B0A]"> Master weavers calculate the exact tension of thousands of threads</span>
                to ensure the tied dyes align perfectly during the weaving process.
              </p>

              <div className="grid grid-cols-2 gap-4">
                {[
                  { icon: <Droplet className="w-4 h-4" />, title: "Natural Dyes" },
                  { icon: <Feather className="w-4 h-4" />, title: "Pure Materials" },
                  { icon: <Sun className="w-4 h-4" />, title: "Solar Energy" },
                  { icon: <Shield className="w-4 h-4" />, title: "GI Certified" }
                ].map((feature, index) => (
                  <div key={index} className="flex items-start gap-2">
                    <div className={`w-8 h-8 bg-[#F9F5EE] rounded-md flex items-center justify-center text-[#780000]`}>
                      {feature.icon}
                    </div>
                    <div>
                      <p className="text-[11px] font-bold text-[#0D0B0A] font-['Inter'] uppercase tracking-[0.2em]">{feature.title}</p>
                    </div>
                  </div>
                ))}
              </div>

              <div className="flex items-center gap-3 p-4 bg-[#F9F5EE] rounded-md border border-[#E2D9C8]">
                <Leaf className="w-5 h-5 text-[#669BBC]" />
                <div>
                  <p className="text-[11px] font-bold text-[#0D0B0A] font-['Inter'] uppercase tracking-[0.2em]">100% Sustainable Practice</p>
                  <p className="text-[15px] text-[#0D0B0A]/60 font-['Raleway'] leading-[165%] tracking-[0.01em]">Solar-powered looms and rainwater harvesting</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <FounderSection />

      {/* Call to Action for Journal */}
      <section className="max-w-[1280px] mx-auto px-[32px] mt-[96px] mb-[96px] text-center">
        <div className="max-w-2xl mx-auto space-y-8">
          <h2 className="font-['Playfair_Display'] text-4xl md:text-5xl font-bold text-[#0D0B0A] leading-[120%] tracking-[-0.01em]">
            Want to learn more about our process?
          </h2>
          <p className="text-[18px] text-[#0D0B0A]/70 font-['Raleway'] leading-[160%] tracking-[0.01em]">
            Dive into the mathematical precision of the loom and the heritage of Odisha's weavers.
          </p>
          <Link
            to="/journal"
            className="inline-flex items-center gap-3 h-[48px] px-[28px] py-[14px] border border-[#780000] text-[#780000] rounded-lg font-['Inter'] font-bold text-[11px] tracking-[0.2em] uppercase hover:bg-[#780000] hover:text-[#FFFFFF] transition-all duration-500"
          >
            Explore Craft Chronicles <ArrowRight size={14} />
          </Link>
        </div>
      </section>

      {/* Footer Call to Action */}
      <section className="max-w-[1280px] mx-auto px-[32px] mt-[96px]">
        <div className="bg-gradient-to-r from-[#0D0B0A] to-[#1a1512] rounded-large p-12 text-center text-[#FFFFFF] relative overflow-hidden">
          <div className="absolute top-0 right-0 w-48 h-48 bg-[#780000]/20 rounded-full blur-3xl -mr-16 -mt-16"></div>
          <div className="absolute bottom-0 left-0 w-32 h-32 bg-[#C9A84C]/20 rounded-full blur-2xl -ml-16 -mb-16"></div>

          <h2 className="text-3xl md:text-4xl font-bold text-[#FFFFFF] font-['Playfair_Display'] leading-[120%] tracking-[-0.01em] mb-3 relative z-10">
            Join the <span className="text-[#C9A84C]">Heritage</span> Movement
          </h2>
          <p className="text-[18px] text-[#FFFFFF]/70 max-w-lg mx-auto font-['Raleway'] leading-[160%] tracking-[0.01em] mb-6 relative z-10">
            Be part of our journey to preserve Odisha's rich handloom tradition.
            Every purchase directly supports an artisan family.
          </p>
          <div className="flex flex-wrap gap-3 justify-center relative z-10">
            <Link
              to="/shop"
              className="h-[48px] px-[28px] py-[14px] bg-gradient-to-r from-[#780000] to-[#C1121F] text-[#FFFFFF] rounded-lg font-['Inter'] font-bold text-[11px] tracking-[0.2em] uppercase hover:brightness-110 transition duration-500"
            >
              Shop Now
            </Link>
            <Link
              to="/contact"
              className="h-[48px] px-[28px] py-[14px] border border-[#FFFFFF]/20 text-[#FFFFFF] rounded-lg font-['Inter'] font-bold text-[11px] tracking-[0.2em] uppercase hover:bg-[#FFFFFF]/10 transition duration-500"
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