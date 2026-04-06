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
    { name: 'Keonjhar', artisans: 45, specialty: 'Sambalpuri Ikat', color: '#B43F3F', coordinates: { top: '35%', left: '45%' } },
    { name: 'Mayurbhanj', artisans: 38, specialty: 'Tussar Silk', color: '#FF8225', coordinates: { top: '25%', left: '55%' } },
    { name: 'Balasore', artisans: 32, specialty: 'Cotton Ikat', color: '#FF8225', coordinates: { top: '30%', left: '75%' } },
    { name: 'Bargarh', artisans: 45, specialty: 'Sambalpuri Silk', color: '#B43F3F', coordinates: { top: '50%', left: '25%' } },
    { name: 'Nuapatna', artisans: 32, specialty: 'Khandua Silk', color: '#FF8225', coordinates: { top: '55%', left: '40%' } },
    { name: 'Sonepur', artisans: 28, specialty: 'Ikat Cotton', color: '#FF8225', coordinates: { top: '60%', left: '30%' } },
    { name: 'Cuttack', artisans: 22, specialty: 'Bomkai', color: '#B43F3F', coordinates: { top: '45%', left: '50%' } },
    { name: 'Berhampur', artisans: 35, specialty: 'Silk Sarees', color: '#B43F3F', coordinates: { top: '75%', left: '45%' } },
    { name: 'Puri', artisans: 18, specialty: 'Khandua', color: '#FF8225', coordinates: { top: '60%', left: '55%' } },
    { name: 'Dhenkanal', artisans: 25, specialty: 'Cotton', color: '#FF8225', coordinates: { top: '45%', left: '40%' } }
  ];

  // Featured clusters (Keonjhar, Mayurbhanj, Balasore)
  const featuredClusters = weavingClusters.filter(c =>
    ['Keonjhar', 'Mayurbhanj', 'Balasore'].includes(c.name)
  );

  return (
    <div className="min-h-screen bg-[#F8EDED] pb-16 md:pb-24 relative overflow-hidden">
      {/* Textile overlay */}
      <div
        className="fixed inset-0 pointer-events-none"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='40' height='40' viewBox='0 0 40 40' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M0 0h40v2H0V0zm0 4h40v2H0V4zm0 4h40v2H0V8zm0 4h40v2H0v-2zm0 4h40v2H0v-2zm0 4h40v2H0v-2zm0 4h40v2H0v-2zm0 4h40v2H0v-2zm0 4h40v2H0v-2zm0 4h40v2H0v-2z' fill='%23B43F3F' fill-opacity='0.02' fill-rule='evenodd'/%3E%3C/svg%3E")`,
          opacity: 0.5,
        }}
      />

      {/* Decorative thread lines */}
      <div className="absolute top-40 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-[#B43F3F]/20 to-transparent"></div>
      <div className="absolute bottom-40 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-[#FF8225]/20 to-transparent"></div>

      {/* Background decorative elements */}
      <div className="absolute -top-20 -left-20 w-64 h-64 bg-gradient-to-br from-[#B43F3F]/5 to-transparent rounded-full blur-3xl" />
      <div className="absolute -bottom-20 -right-20 w-80 h-80 bg-gradient-to-tl from-[#FF8225]/5 to-transparent rounded-full blur-3xl" />

      {/* Hero Section */}
      <section className="container mx-auto px-4 pt-24 md:pt-32 mb-24 md:mb-40 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center max-w-7xl mx-auto">
          {/* Left Column: Content */}
          <div className="lg:col-span-7 space-y-8">
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-[#FF8225]/10 rounded-full border border-[#FF8225]/20 mb-2">
              <Gem className="w-4 h-4 text-[#FF8225]" />
              <span className="text-[#FF8225] font-medium uppercase tracking-[0.2em] text-xs">700 Years of Heritage</span>
            </div>

            <h1 className="text-4xl md:text-6xl lg:text-7xl font-display font-medium tracking-tight leading-[1.1] text-[#173B45]">
              Bridging<br />
              <span className="text-[#B43F3F] italic">Tradition & Trend</span>
            </h1>

            <p className="text-base md:text-lg text-[#173B45]/70 leading-relaxed max-w-2xl">
              We don't just sell sarees — we connect you with the 700-year-old legacy of
              <span className="font-medium text-[#B43F3F]"> Odisha's master artisans</span>.
              Your trusted platform for authentic, handcrafted heritage, direct from the loom to your wardrobe.
            </p>

            <div className="flex flex-wrap gap-4 items-center">
              <Link
                to="/shop"
                className="group px-8 py-4 bg-[#B43F3F] text-[#F8EDED] rounded-lg font-medium hover:bg-[#FF8225] transition-all duration-300 flex items-center gap-2 shadow-lg shadow-[#B43F3F]/20"
              >
                Explore Collection
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </Link>
              <Link
                to="/weavers"
                className="px-8 py-4 border-2 border-[#173B45]/10 text-[#173B45] rounded-lg font-medium hover:bg-[#173B45] hover:text-[#F8EDED] transition-all duration-300"
              >
                Meet Our Artisans
              </Link>
            </div>

            {/* Stats Grid */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8 pt-8 border-t border-[#173B45]/5">
              {[
                { label: 'Artisan Families', value: '200+', icon: Users },
                { label: 'Weaving Clusters', value: '28', icon: MapPin },
                { label: 'Years of Legacy', value: '700+', icon: Clock },
                { label: 'Happy Clients', value: '15K+', icon: Heart }
              ].map((stat, index) => (
                <div key={index} className="space-y-1">
                  <div className="text-2xl md:text-3xl font-display font-medium text-[#173B45]">{stat.value}</div>
                  <div className="text-[10px] text-[#173B45]/60 uppercase tracking-widest font-bold">{stat.label}</div>
                </div>
              ))}
            </div>
          </div>

          {/* Right Column: Visual */}
          <div className="lg:col-span-5 relative">
            <div className="relative group">
              {/* Decorative Background Blob */}
              <div className="absolute -inset-10 bg-[#FF8225]/5 rounded-full blur-3xl group-hover:bg-[#FF8225]/10 transition-colors duration-700"></div>

              <img
                src="/about.png"
                alt="Representative Heritage of Odisha"
                className="relative w-full h-auto drop-shadow-2xl hover:scale-[1.02] transition-transform duration-700"
              />

              {/* Floating Badge */}
              <div className="absolute -bottom-6 -left-6 bg-white p-4 rounded-xl shadow-xl border border-[#B43F3F]/5 hidden md:block">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-[#F8EDED] rounded-full flex items-center justify-center">
                    <Award className="w-5 h-5 text-[#B43F3F]" />
                  </div>
                  <div>
                    <p className="text-[10px] uppercase tracking-widest text-stone-400 font-bold">Authenticated</p>
                    <p className="text-sm font-medium text-[#173B45]">Handloom Heritage</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Artisan Network Map Section */}
      <section className="w-full py-16 md:py-24 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-[#FF8225]/10 rounded-full mb-4">
              <MapPin className="w-4 h-4 text-[#FF8225]" />
              <span className="text-[#FF8225] font-medium uppercase tracking-[0.2em] text-xs">Our Roots</span>
            </div>
            <h2 className="text-3xl md:text-4xl font-display font-medium text-[#173B45] mb-3">
              Artisan Network
            </h2>
            <p className="text-sm md:text-base text-[#173B45]/70 max-w-2xl mx-auto">
              We work with <span className="font-medium text-[#B43F3F]">28 weaving clusters</span> across Odisha,
              supporting over <span className="font-medium text-[#FF8225]">200 artisan families</span>.
            </p>
          </div>

          {/* Featured Clusters */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-12">
            {featuredClusters.map((cluster, index) => (
              <div
                key={index}
                className="bg-white p-6 rounded-xl shadow-md hover:shadow-lg transition-all duration-300 hover:-translate-y-1 border-l-4 relative overflow-hidden group"
                style={{ borderLeftColor: cluster.color }}
              >
                <div className="absolute top-0 right-0 w-24 h-24 opacity-5 group-hover:opacity-10 transition-opacity">
                  <MapPin className="w-full h-full" />
                </div>
                <h3 className="text-xl font-display font-medium text-[#173B45] mb-1">{cluster.name}</h3>
                <p className="text-xs text-[#173B45]/60 mb-3">{cluster.specialty}</p>
                <div className="flex items-center justify-between">
                  <div>
                    <span className="text-xl font-medium text-[#B43F3F]">{cluster.artisans}</span>
                    <span className="text-xs text-[#173B45]/50 ml-1">artisans</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <Droplet className="w-3 h-3 text-blue-400" />
                    <Wind className="w-3 h-3 text-green-400" />
                    <Sun className="w-3 h-3 text-yellow-400" />
                  </div>
                </div>
                <div className="mt-3 pt-3 border-t border-[#B43F3F]/10">
                  <Link
                    to={`/shop?cluster=${cluster.name.toLowerCase()}`}
                    className="text-xs font-medium text-[#FF8225] hover:text-[#B43F3F] transition-colors flex items-center gap-1"
                  >
                    View Collection <ArrowRight className="w-3 h-3" />
                  </Link>
                </div>
              </div>
            ))}
          </div>

          {/* Map Container */}
          <div className="relative max-w-4xl mx-auto">
            <div className="bg-[#F8EDED] rounded-xl md:rounded-2xl p-4 md:p-6 shadow-lg border border-[#B43F3F]/10">
              {/* Map Legend */}
              <div className="flex flex-wrap items-center justify-center gap-4 mb-4">
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 bg-[#B43F3F] rounded-full"></div>
                  <span className="text-xs text-[#173B45]/70">Primary Clusters</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 bg-[#FF8225] rounded-full"></div>
                  <span className="text-xs text-[#173B45]/70">Secondary Clusters</span>
                </div>
              </div>

              {/* Map Visualization with Actual Odisha Map */}
              <div className="relative aspect-[4/3] w-full bg-gradient-to-b from-[#E8D5B5] to-[#D9C8A8] rounded-lg overflow-hidden border border-[#B43F3F]/20">
                {/* Odisha Map SVG */}
                <img
                  src={OdishaMap}
                  alt="Odisha Map with Weaving Clusters"
                  className="w-full h-full object-contain opacity-80"
                />

                {/* Grid overlay for reference */}
                <div className="absolute inset-0 grid grid-cols-6 grid-rows-6 pointer-events-none">
                  {Array.from({ length: 36 }).map((_, i) => (
                    <div key={i} className="border border-[#B43F3F]/5"></div>
                  ))}
                </div>

                {/* Rivers */}
                <div className="absolute top-1/3 left-0 w-full h-0.5 bg-blue-300/30 transform -rotate-6 pointer-events-none"></div>
                <div className="absolute bottom-1/3 left-0 w-full h-0.5 bg-blue-300/30 transform rotate-12 pointer-events-none"></div>

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
                    {/* Pulse Effect */}
                    <div
                      className="absolute inset-0 rounded-full animate-ping"
                      style={{
                        backgroundColor: cluster.color,
                        width: '24px',
                        height: '24px',
                        opacity: '0.2'
                      }}
                    />

                    {/* Main Marker */}
                    <div
                      className="relative w-4 h-4 rounded-full border-2 border-white hover:scale-150 transition-all duration-300 shadow-md"
                      style={{ backgroundColor: cluster.color }}
                    >
                      {/* Tooltip */}
                      <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none z-20">
                        <div className="bg-[#173B45] text-[#F8EDED] text-[10px] p-2 rounded-lg whitespace-nowrap shadow-lg">
                          <p className="font-medium">{cluster.name}</p>
                          <p className="text-[8px] opacity-75">{cluster.artisans} artisans</p>
                        </div>
                      </div>
                    </div>

                    {/* Label */}
                    <span className="absolute top-4 left-1/2 transform -translate-x-1/2 text-[8px] font-medium text-[#173B45] whitespace-nowrap opacity-70 group-hover:opacity-100 transition-opacity bg-white/80 px-1 rounded">
                      {cluster.name}
                    </span>
                  </div>
                ))}
              </div>

              {/* Map Stats */}
              <div className="mt-4 grid grid-cols-3 gap-4">
                {featuredClusters.map((cluster, index) => (
                  <div key={index} className="text-center">
                    <div className="text-sm font-medium text-[#B43F3F]">{cluster.artisans}</div>
                    <div className="text-[10px] text-[#173B45]/60">{cluster.name}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Our Role Section */}
      <section className="w-full py-16 md:py-24">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-display font-medium text-[#173B45] mb-4">
              We Don't Just Sell, We
              <span className="text-[#FF8225]"> Connect</span>
            </h2>
            <p className="text-sm md:text-base text-[#173B45]/70">
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
              <div key={index} className="bg-white p-6 rounded-xl shadow-md hover:shadow-lg transition-all duration-300 hover:-translate-y-1 border border-[#B43F3F]/10 group">
                <div className="w-12 h-12 bg-[#F8EDED] rounded-lg flex items-center justify-center mb-4 text-[#B43F3F] group-hover:scale-110 transition-transform duration-300 border border-[#B43F3F]/10">
                  {item.icon}
                </div>
                <h3 className="text-lg font-display font-medium text-[#173B45] mb-2">{item.title}</h3>
                <p className="text-sm text-[#173B45]/70">{item.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Philosophy Section */}
      <section className="w-full py-16 md:py-24 bg-white">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center max-w-5xl mx-auto">
            {/* Image */}
            <div className="relative group">
              <div className="absolute -inset-2 bg-gradient-to-r from-[#B43F3F] to-[#FF8225] rounded-2xl blur-lg opacity-30 group-hover:opacity-50 transition-opacity duration-500" />
              <div className="relative aspect-[4/5] rounded-xl overflow-hidden shadow-lg">
                <img
                  src="https://images.unsplash.com/photo-1544441893-675973e31985?q=80&w=1200"
                  alt="Master weaver at work"
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#173B45]/70 via-transparent to-transparent" />
                <div className="absolute bottom-4 left-4 text-[#F8EDED]">
                  <p className="text-xs font-light mb-1">Master Weaver • 4th Generation</p>
                  <p className="text-sm font-display font-medium">"Every thread tells a story"</p>
                </div>
              </div>
            </div>

            {/* Content */}
            <div className="space-y-6">
              <div className="inline-flex items-center gap-2 px-4 py-2 bg-[#FF8225]/10 rounded-full">
                <Sparkles className="w-4 h-4 text-[#FF8225]" />
                <span className="text-[#FF8225] font-medium uppercase tracking-[0.2em] text-xs">The Art of Precision</span>
              </div>

              <h2 className="text-3xl md:text-4xl font-display font-medium text-[#173B45] leading-tight">
                Where mathematics
                <span className="text-[#B43F3F]"> meets magic.</span>
              </h2>

              <p className="text-sm md:text-base text-[#173B45]/70 leading-relaxed">
                Every Ikat saree begins as a complex mathematical equation.
                <span className="font-medium text-[#173B45]"> Master weavers calculate the exact tension of thousands of threads</span>
                to ensure the tied dyes align perfectly during the weaving process.
              </p>

              {/* Feature grid */}
              <div className="grid grid-cols-2 gap-4">
                {[
                  { icon: <Droplet className="w-4 h-4" />, title: "Natural Dyes", color: "blue" },
                  { icon: <Feather className="w-4 h-4" />, title: "Pure Materials", color: "green" },
                  { icon: <Sun className="w-4 h-4" />, title: "Solar Energy", color: "yellow" },
                  { icon: <Shield className="w-4 h-4" />, title: "GI Certified", color: "red" }
                ].map((feature, index) => (
                  <div key={index} className="flex items-start gap-2">
                    <div className={`w-8 h-8 bg-[#F8EDED] rounded-lg flex items-center justify-center text-[#B43F3F]`}>
                      {feature.icon}
                    </div>
                    <div>
                      <p className="text-xs font-medium text-[#173B45]">{feature.title}</p>
                    </div>
                  </div>
                ))}
              </div>

              {/* Sustainability badge */}
              <div className="flex items-center gap-3 p-4 bg-green-50 rounded-lg border border-green-100">
                <Leaf className="w-5 h-5 text-green-600" />
                <div>
                  <p className="text-xs font-medium text-[#173B45]">100% Sustainable Practice</p>
                  <p className="text-[10px] text-[#173B45]/60">Solar-powered looms and rainwater harvesting</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <FounderSection />

      {/* New Call to Action for Journal */}
      <section className="container mx-auto px-4 mt-12 md:mt-24 mb-24 text-center">
        <div className="max-w-2xl mx-auto space-y-8">
          <h2 className="font-serif text-3xl md:text-5xl text-tanvoDark">Want to learn more about our process?</h2>
          <p className="text-gray-500">Dive into the mathematical precision of the loom and the heritage of Odisha's weavers.</p>
          <Link to="/journal" className="inline-flex items-center gap-3 px-10 py-4 border border-tanvoDark text-tanvoDark uppercase text-xs tracking-widest hover:bg-tanvoDark hover:text-white transition-all duration-500">
            Explore Craft Chronicles <ArrowRight size={14} />
          </Link>
        </div>
      </section>

      {/* Existing Footer Call to Action */}
      <section className="container mx-auto px-4 mt-12 md:mt-16">
        <div className="bg-gradient-to-r from-[#173B45] to-[#0f2a33] rounded-xl md:rounded-2xl p-8 md:p-12 text-center text-[#F8EDED] relative overflow-hidden">
          <div className="absolute top-0 right-0 w-48 h-48 bg-[#B43F3F]/20 rounded-full blur-3xl -mr-16 -mt-16"></div>
          <div className="absolute bottom-0 left-0 w-32 h-32 bg-[#FF8225]/20 rounded-full blur-2xl -ml-16 -mb-16"></div>

          <h2 className="text-2xl md:text-3xl font-display font-medium mb-3 relative z-10">
            Join the <span className="text-[#FF8225]">Heritage</span> Movement
          </h2>
          <p className="text-sm text-[#F8EDED]/70 mb-6 max-w-lg mx-auto relative z-10">
            Be part of our journey to preserve Odisha's rich handloom tradition.
            Every purchase directly supports an artisan family.
          </p>
          <div className="flex flex-wrap gap-3 justify-center relative z-10">
            <Link
              to="/shop"
              className="px-5 py-2.5 bg-[#FF8225] text-[#F8EDED] rounded-lg font-medium text-sm hover:bg-[#B43F3F] transition-all duration-300"
            >
              Shop Now
            </Link>
            <Link
              to="/contact"
              className="px-5 py-2.5 border border-[#F8EDED]/20 text-[#F8EDED] rounded-lg font-medium text-sm hover:bg-[#F8EDED]/10 transition-all duration-300"
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