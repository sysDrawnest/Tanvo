import React, { useState } from 'react';
import { Link } from "react-router-dom";
import { ArrowRight, MapPin } from 'lucide-react';
import { motion } from 'framer-motion';

// Import the SVG file
import OdishaMap from '../src/assets/odisha-map.svg';
import Footer from '../components/Footer';

const About: React.FC = () => {
  // Key weaving clusters data
  const weavingClusters = [
    { 
      name: 'Bargarh', 
      specialty: 'Sambalpuri Ikat', 
      history: '200+ years of resist dye tradition.',
      color: '#B43F3F', 
      coordinates: { top: '50%', left: '25%' } 
    },
    { 
      name: 'Nuapatna', 
      specialty: 'Khandua Silk', 
      history: 'The sacred weave offered to Lord Jagannath.',
      color: '#1A6634', 
      coordinates: { top: '55%', left: '40%' } 
    },
    { 
      name: 'Keonjhar', 
      specialty: 'Tussar Silk', 
      history: 'Wild silk woven with tribal motifs.',
      color: '#C9A84C', 
      coordinates: { top: '35%', left: '45%' } 
    },
    { 
      name: 'Berhampur', 
      specialty: 'Phoda Kumbha', 
      history: 'Known for its heavy silk and temple borders.',
      color: '#0D0B0A', 
      coordinates: { top: '75%', left: '45%' } 
    }
  ];

  const [activeCluster, setActiveCluster] = useState(weavingClusters[0]);

  return (
    <div className="bg-[#F9F5EE] overflow-hidden">
      
      {/* 1. Cinematic Hero */}
      <section className="relative w-full h-[90vh] min-h-[600px] flex items-center justify-center overflow-hidden">
        <div 
          className="absolute inset-0 z-0 bg-cover bg-center"
          style={{ backgroundImage: `url('/shop_hero.jpeg')` }}
        />
        <div className="absolute inset-0 z-10 bg-black/50" />
        
        <div className="relative z-20 text-center px-6 max-w-4xl mx-auto flex flex-col items-center">
          <motion.span 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-white/70 tracking-[0.3em] uppercase text-xs font-sans mb-6 block"
          >
            The Tanvo Story
          </motion.span>
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="font-display text-4xl md:text-6xl lg:text-7xl text-white font-light leading-tight mb-8"
          >
            Every thread <br />
            <span className="italic text-[#C9A84C]">carries a legacy.</span>
          </motion.h1>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="text-white/80 font-sans text-lg max-w-xl mx-auto font-light leading-relaxed mb-12"
          >
            TANVO preserves Odisha's living handloom heritage, bringing centuries of master craftsmanship to the modern wardrobe.
          </motion.p>
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.6 }}
            className="flex flex-col sm:flex-row gap-6"
          >
            <Link to="#loom-to-legacy" className="text-white font-sans text-xs tracking-[0.2em] uppercase border-b border-white/30 pb-2 hover:border-white transition-colors">
              Explore Our Story
            </Link>
          </motion.div>
        </div>
      </section>

      {/* 2. From Loom To Legacy */}
      <section id="loom-to-legacy" className="py-24 md:py-40 px-6 max-w-[1400px] mx-auto">
        <div className="text-center mb-24 md:mb-40">
          <h2 className="font-display text-3xl md:text-5xl text-[#0D0B0A] font-light mb-6">From Loom to Legacy</h2>
          <div className="w-12 h-[1px] bg-[#1A6634] mx-auto" />
        </div>

        <div className="space-y-32 md:space-y-48">
          {/* 01. The Weaver */}
          <div className="flex flex-col md:flex-row items-center gap-12 md:gap-24">
            <div className="w-full md:w-1/2 space-y-6 order-2 md:order-1">
              <span className="text-[#1A6634] font-sans text-xs tracking-[0.3em]">01 / THE WEAVER</span>
              <h3 className="font-display text-3xl md:text-4xl text-[#0D0B0A] leading-tight">
                The hands that <br /> shape history.
              </h3>
              <p className="font-sans text-[#0D0B0A]/60 font-light leading-relaxed max-w-md">
                In the heart of Odisha, weaving is not a profession—it is a spiritual practice passed down through generations. Our master weavers spend weeks, sometimes months, breathing life into a single six-yard canvas, preserving techniques that defy modern mechanization.
              </p>
            </div>
            <div className="w-full md:w-1/2 order-1 md:order-2">
              <img src="/About Master Weaver.jpeg" alt="Master Weaver" className="w-full h-auto object-cover aspect-[4/5]" />
            </div>
          </div>

          {/* 02. The Craft */}
          <div className="flex flex-col md:flex-row items-center gap-12 md:gap-24">
            <div className="w-full md:w-1/2">
              <img src="/macro close-up of a premium silk saree fabric.png" alt="Premium Silk Fabric" className="w-full h-auto object-cover aspect-[4/5]" />
            </div>
            <div className="w-full md:w-1/2 space-y-6">
              <span className="text-[#1A6634] font-sans text-xs tracking-[0.3em]">02 / THE CRAFT</span>
              <h3 className="font-display text-3xl md:text-4xl text-[#0D0B0A] leading-tight">
                A language written <br /> in threads.
              </h3>
              <p className="font-sans text-[#0D0B0A]/60 font-light leading-relaxed max-w-md">
                Every motif—the temple border, the conch shell, the lotus—tells a story drawn from folklore, nature, and the Jagannath culture. It is an intricate poetry woven directly into the fabric, requiring mathematical precision and profound artistic vision.
              </p>
            </div>
          </div>

          {/* 03. The Journey */}
          <div className="flex flex-col md:flex-row items-center gap-12 md:gap-24">
            <div className="w-full md:w-1/2 space-y-6 order-2 md:order-1">
              <span className="text-[#1A6634] font-sans text-xs tracking-[0.3em]">03 / THE JOURNEY</span>
              <h3 className="font-display text-3xl md:text-4xl text-[#0D0B0A] leading-tight">
                From their home <br /> to your heritage.
              </h3>
              <p className="font-sans text-[#0D0B0A]/60 font-light leading-relaxed max-w-md">
                We bridge the gap between the rural loom and the global wardrobe. By eliminating intermediaries, we ensure our weavers receive the true value of their art, and you receive an authentic heirloom that will stand the test of time.
              </p>
            </div>
            <div className="w-full md:w-1/2 order-1 md:order-2">
              <img src="/Odisha to World Story.jpeg" alt="Saree Journey" className="w-full h-auto object-cover aspect-[4/5]" />
            </div>
          </div>
        </div>
      </section>

      {/* 3. The Land Behind The Loom (Map) */}
      <section className="py-24 bg-[#0D0B0A] text-[#F9F5EE]">
        <div className="max-w-[1400px] mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="font-display text-3xl md:text-5xl font-light mb-6">The Land Behind The Loom</h2>
            <p className="font-sans text-white/50 text-sm tracking-wide max-w-xl mx-auto">
              Explore the rich geography of Odisha's weaving clusters.
            </p>
          </div>

          <div className="flex flex-col lg:flex-row items-center justify-between gap-12">
            
            {/* Interactive Story Panel */}
            <div className="w-full lg:w-1/3 space-y-8">
              <div className="p-8 border border-white/10 relative">
                <MapPin className="text-[#C9A84C] mb-6 w-8 h-8" />
                <h3 className="font-display text-3xl mb-2">{activeCluster.name}</h3>
                <p className="font-sans text-xs tracking-[0.2em] text-white/50 uppercase mb-6">{activeCluster.specialty}</p>
                <p className="font-sans text-white/70 font-light leading-relaxed">
                  {activeCluster.history}
                </p>
              </div>
            </div>

            {/* Map */}
            <div className="w-full lg:w-2/3 relative aspect-[4/3] max-w-2xl mx-auto">
              <img
                src={OdishaMap}
                alt="Odisha Map with Weaving Clusters"
                className="w-full h-full object-contain opacity-40 filter invert"
              />
              
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
                  onMouseEnter={() => setActiveCluster(cluster)}
                >
                  {/* Pulse Effect */}
                  <div
                    className="absolute inset-0 rounded-full animate-ping"
                    style={{
                      backgroundColor: cluster.color,
                      width: '24px',
                      height: '24px',
                      opacity: activeCluster.name === cluster.name ? '0.4' : '0'
                    }}
                  />
                  {/* Main Marker */}
                  <div
                    className={`relative w-4 h-4 rounded-full border border-[#0D0B0A] transition-all duration-300 ${activeCluster.name === cluster.name ? 'scale-150' : 'scale-100 opacity-60'}`}
                    style={{ backgroundColor: cluster.color }}
                  />
                  {/* Label */}
                  <span className={`absolute top-6 left-1/2 transform -translate-x-1/2 text-[10px] font-sans tracking-widest whitespace-nowrap transition-opacity ${activeCluster.name === cluster.name ? 'opacity-100 text-white' : 'opacity-0'}`}>
                    {cluster.name}
                  </span>
                </div>
              ))}
            </div>

          </div>
        </div>
      </section>

      {/* 4. The Mathematics of Ikat */}
      <section className="py-24 md:py-0 w-full flex flex-col md:flex-row items-stretch">
        <div className="w-full md:w-1/2 bg-[#1A6634]">
          <img src="/Ikat Detail.png" alt="Ikat Detail" className="w-full h-full object-cover min-h-[500px]" />
        </div>
        <div className="w-full md:w-1/2 bg-[#F9F5EE] p-12 md:p-24 flex flex-col justify-center">
          <span className="text-[#1A6634] font-sans text-xs tracking-[0.3em] mb-6 block">THE PROCESS</span>
          <h2 className="font-display text-4xl md:text-5xl text-[#0D0B0A] font-light mb-12">The Mathematics of Ikat</h2>
          
          <div className="space-y-8">
            <div>
              <h4 className="font-display text-xl text-[#0D0B0A] mb-2">Thread Calculation</h4>
              <p className="font-sans text-[#0D0B0A]/60 font-light text-sm">Every pattern is calculated mentally before a single thread is dyed. The master weaver visualizes the final saree within the raw yarn.</p>
            </div>
            <div className="h-[1px] w-full bg-[#0D0B0A]/10" />
            
            <div>
              <h4 className="font-display text-xl text-[#0D0B0A] mb-2">Resist Dyeing</h4>
              <p className="font-sans text-[#0D0B0A]/60 font-light text-sm">Threads are meticulously tied and dyed multiple times to create the precise colors required for the intricate motifs.</p>
            </div>
            <div className="h-[1px] w-full bg-[#0D0B0A]/10" />
            
            <div>
              <h4 className="font-display text-xl text-[#0D0B0A] mb-2">The Weave</h4>
              <p className="font-sans text-[#0D0B0A]/60 font-light text-sm">On the loom, the dyed threads align perfectly as if by magic, revealing the complex patterns pixel by pixel with each pass of the shuttle.</p>
            </div>
          </div>
        </div>
      </section>

      {/* 5. Founder Story */}
      <section className="py-24 md:py-40 px-6 max-w-[1400px] mx-auto text-center">
        <div className="max-w-3xl mx-auto">
          <div className="w-32 h-32 md:w-48 md:h-48 mx-auto mb-10 overflow-hidden rounded-full">
            <img src="/Woman wearing saree in office.jpeg" alt="Founder" className="w-full h-full object-cover" />
          </div>
          <h2 className="font-display text-2xl md:text-4xl text-[#0D0B0A] font-light leading-snug mb-8">
            "We started TANVO to ensure that the stories woven into these six yards of silk do not disappear into history, but continue to be worn, celebrated, and passed down."
          </h2>
          <p className="font-sans text-sm tracking-[0.2em] text-[#0D0B0A]/50 uppercase">
            — The Founder
          </p>
        </div>
      </section>

    </div>
  );
};

export default About;