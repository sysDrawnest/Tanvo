import React from 'react';
import { Link } from 'react-router-dom';
import { motion, useScroll, useTransform } from 'framer-motion';
import { MapPin, ArrowRight, Sun, Shield } from 'lucide-react';
import OdishaMap from '../src/assets/odisha-map.svg';

const About: React.FC = () => {
  // Key weaving clusters data (kept from old design)
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

  const { scrollY } = useScroll();
  const y1 = useTransform(scrollY, [0, 1000], [0, 400]);
  const scale1 = useTransform(scrollY, [0, 1000], [1.05, 1.15]);

  return (
    <div className="antialiased overflow-x-hidden bg-tanvo-raw-cotton text-on-surface">
      <main>
        {/* Cinematic Hero */}
        <section className="relative h-screen w-full flex items-center overflow-hidden">
          <motion.div 
            style={{ y: y1, scale: scale1 }}
            className="absolute inset-0 z-0 scale-105" 
            id="hero-image-container"
          >
            <img 
              alt="TANVO Heritage Campaign" 
              className="w-full h-full object-cover brightness-95" 
              src="https://lh3.googleusercontent.com/aida/AP1WRLsY7Ye6A9VJaIW_RQmF8RgvP4TmbHYkgBed2onDE4ylAg8M100UuDD1XkcuJN8HIw20y_3C8iaQUxZLFLOMYz3TSKHza04wbqnWl7JU-ycd_QmNH32ejvvAphNTmseh6Mp1lAY16iR1kvIMPiKnUQM1ZAtX1uJ4mLmlLlle_CGUXvPMNjy-KyFcU5d0CTi7HNYUpz0NmQJLicsCqcRyX7jVxNvvWlTWeychnw-BE39ICoUJpbJIEvE7X68"
            />
            <div className="absolute inset-0 bg-gradient-to-b from-transparent to-black/40"></div>
          </motion.div>
          
          <div className="relative z-10 w-full px-margin-edge max-w-container-max mx-auto">
            <div className="max-w-4xl space-y-6">
              <motion.span 
                initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }} viewport={{ once: true }}
                className="font-label-sm text-label-sm text-white/80 tracking-[0.3em] uppercase block"
              >
                Est. 13th Century Legacy
              </motion.span>
              <motion.h1 
                initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, delay: 0.1 }} viewport={{ once: true }}
                className="font-display-xl text-display-xl text-white leading-none"
              >
                A 700-Year Dialogue<br/>
                <span className="italic font-normal">in Every Thread.</span>
              </motion.h1>
              <motion.div 
                initial={{ opacity: 0, width: 0 }} whileInView={{ opacity: 1, width: 128 }} transition={{ duration: 0.8, delay: 0.2 }} viewport={{ once: true }}
                className="h-[1px] bg-white/40"
              ></motion.div>
            </div>
          </div>
          
          <motion.div 
            initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} transition={{ duration: 0.8, delay: 0.4 }} viewport={{ once: true }}
            className="absolute bottom-12 right-margin-edge flex items-center space-x-4 text-white/60"
          >
            <span className="font-label-sm text-[10px] tracking-widest uppercase">Scroll to Discover</span>
            <div className="w-px h-12 bg-white/30 animate-pulse"></div>
          </motion.div>
        </section>

        {/* The Heritage Mission */}
        <section className="py-section-gap px-margin-edge bg-tanvo-raw-cotton">
          <div className="max-w-container-max mx-auto">
            <div className="grid grid-cols-1 md:grid-cols-12 gap-gutter items-start">
              <motion.div 
                initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }} viewport={{ once: true }}
                className="md:col-span-4"
              >
                <h2 className="font-label-sm text-label-sm text-tanvo-madder-red uppercase tracking-[0.2em] mb-8">The Ethos</h2>
                <p className="font-headline-md text-headline-md leading-snug">
                  We do not sell garments.<br/>
                  We preserve narratives.
                </p>
              </motion.div>
              <motion.div 
                initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, delay: 0.2 }} viewport={{ once: true }}
                className="md:col-span-7 md:col-start-6"
              >
                <div className="space-y-12">
                  <p className="font-body-lg text-body-lg text-on-surface-variant max-w-2xl">
                    TANVO was born from a singular necessity: to bridge the vast silence between the master weaver and the global aesthete. We are a Heritage House dedicated to the rare, the authentic, and the meticulously slow craftsmanship of Odisha. 
                  </p>
                  <blockquote className="border-l-2 border-tanvo-madder-red pl-12 py-4">
                    <p className="font-headline-md text-headline-md italic font-normal text-on-surface mb-6">
                      "When I sit at the loom, I am talking to my ancestors. The Ikat patterns are the grammar of our history; I am simply the scribe."
                    </p>
                    <footer className="font-label-sm text-label-sm tracking-widest text-tanvo-madder-red uppercase">— Shri K. Meher, Master Weaver, Nuapatna</footer>
                  </blockquote>
                </div>
              </motion.div>
            </div>
          </div>
        </section>

        {/* Clusters of Excellence gallery */}
        <section className="py-section-gap bg-tanvo-raw-cotton overflow-hidden">
          <motion.div 
            initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }} viewport={{ once: true }}
            className="px-margin-edge max-w-container-max mx-auto mb-16"
          >
            <h2 className="font-headline-lg text-headline-lg mb-4">Clusters of Excellence</h2>
            <div className="h-[1px] w-full bg-outline-variant"></div>
          </motion.div>
          <div className="flex space-x-12 px-margin-edge overflow-x-auto pb-12 snap-x snap-mandatory scrollbar-hide">
            {/* Cluster 1: Keonjhar */}
            <motion.div 
              initial={{ opacity: 0, x: 20 }} whileInView={{ opacity: 1, x: 0 }} transition={{ duration: 0.8 }} viewport={{ once: true }}
              className="flex-shrink-0 w-[450px] snap-center group"
            >
              <div className="relative aspect-[3/4] overflow-hidden mb-6">
                <img alt="Keonjhar Weaving Detail" className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110" src="https://lh3.googleusercontent.com/aida/AP1WRLuedn3VD7opGOwZITn8HAnf2Ti73hM5pl2NYOW91XvoQTi-us6URbSg8m-k1Zl58Ta8fBTfPYDeQsDYulr_Wu19UpwtrITvHWlTPC455xjR9wWeo9AhXyVSgcPi_lGjkoJrz4TGVhdtc9uR_aWf_Md2iXwW3Az5rLcwTXoStlrNEu53UaVaruGpEIviDD_Gv0tElLuNXmbfD8l-sh0MAlIulh9fAryrA6ABsrf3c4ywM48oPow2GZa5Lk4"/>
                <div className="absolute inset-0 bg-black/10 group-hover:bg-transparent transition-colors duration-500"></div>
              </div>
              <div className="space-y-2">
                <div className="flex justify-between items-baseline">
                  <h3 className="font-headline-md text-headline-md">Keonjhar</h3>
                  <span className="font-label-sm text-label-sm text-tanvo-madder-red">120 ARTISANS</span>
                </div>
                <p className="font-body-md text-body-md text-on-surface-variant">The heart of Tussar silk. Where every filament is drawn by hand, capturing the raw texture of the forest.</p>
              </div>
            </motion.div>
            
            {/* Cluster 2: Mayurbhanj */}
            <motion.div 
              initial={{ opacity: 0, x: 20 }} whileInView={{ opacity: 1, x: 0 }} transition={{ duration: 0.8, delay: 0.2 }} viewport={{ once: true }}
              className="flex-shrink-0 w-[450px] snap-center group"
            >
              <div className="relative aspect-[3/4] overflow-hidden mb-6">
                <img alt="Mayurbhanj Motif" className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110" src="https://lh3.googleusercontent.com/aida/AP1WRLvRctWwEqPdxACUC-Eypp5c5OtYgKUbuf8j1ydaYvhN5TbX8SljRY0TDKA5-DM51y2RB-e8l_wofDAQwn9uUzeGp67SLQva7JZ1IFGuYfLI0JwS9-zEEP4kYiL_fWNlD3_CRbHJ4nj-jQGKcY6qqCxJg1ZZxPt_Cf6umYrG8E5phrsEMlAuVapdMpqh_2AE9Q6gmqlFx1JQmCIsQnJVxpjKpyMzcLOT2nRpsiRZLoVc6C9ZamCDdBOT1N0N"/>
                <div className="absolute inset-0 bg-black/10 group-hover:bg-transparent transition-colors duration-500"></div>
              </div>
              <div className="space-y-2">
                <div className="flex justify-between items-baseline">
                  <h3 className="font-headline-md text-headline-md">Mayurbhanj</h3>
                  <span className="font-label-sm text-label-sm text-tanvo-madder-red">85 ARTISANS</span>
                </div>
                <p className="font-body-md text-body-md text-on-surface-variant">Famed for the 'Temple Border' geometry. A sacred symmetry passed through ten generations of weaving families.</p>
              </div>
            </motion.div>

            {/* Cluster 3: Nuapatna */}
            <motion.div 
              initial={{ opacity: 0, x: 20 }} whileInView={{ opacity: 1, x: 0 }} transition={{ duration: 0.8, delay: 0.4 }} viewport={{ once: true }}
              className="flex-shrink-0 w-[450px] snap-center group"
            >
              <div className="relative aspect-[3/4] overflow-hidden mb-6 bg-surface-container-highest">
                <div className="w-full h-full flex items-center justify-center p-8">
                  <img alt="Nuapatna Silhouette" className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110 opacity-60" src="https://lh3.googleusercontent.com/aida/AP1WRLsY7Ye6A9VJaIW_RQmF8RgvP4TmbHYkgBed2onDE4ylAg8M100UuDD1XkcuJN8HIw20y_3C8iaQUxZLFLOMYz3TSKHza04wbqnWl7JU-ycd_QmNH32ejvvAphNTmseh6Mp1lAY16iR1kvIMPiKnUQM1ZAtX1uJ4mLmlLlle_CGUXvPMNjy-KyFcU5d0CTi7HNYUpz0NmQJLicsCqcRyX7jVxNvvWlTWeychnw-BE39ICoUJpbJIEvE7X68"/>
                </div>
                <div className="absolute inset-0 bg-black/20 group-hover:bg-black/10 transition-colors duration-500"></div>
              </div>
              <div className="space-y-2">
                <div className="flex justify-between items-baseline">
                  <h3 className="font-headline-md text-headline-md">Nuapatna</h3>
                  <span className="font-label-sm text-label-sm text-tanvo-madder-red">210 ARTISANS</span>
                </div>
                <p className="font-body-md text-body-md text-on-surface-variant">The epicenter of single-ikat mastery. Mathematical precision meets liquid-like silk drapes.</p>
              </div>
            </motion.div>
          </div>
        </section>

        {/* OLD ODISHA MAP SECTION INJECTED HERE */}
        <section className="w-full py-section-gap px-margin-edge bg-surface-container-highest">
          <div className="container mx-auto max-w-container-max">
            <motion.div 
              initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }} viewport={{ once: true }}
              className="text-center mb-16"
            >
              <div className="inline-flex items-center gap-2 px-4 py-2 bg-tanvo-madder-red/10 rounded-sm mb-4">
                <MapPin className="w-4 h-4 text-tanvo-madder-red" />
                <span className="text-tanvo-madder-red font-label-sm text-label-sm uppercase tracking-[0.2em]">Our Roots</span>
              </div>
              <h2 className="font-headline-lg text-headline-lg text-on-surface mb-3">
                Artisan Network
              </h2>
              <p className="font-body-md text-body-md text-on-surface-variant max-w-2xl mx-auto">
                We work with <span className="font-medium text-tanvo-madder-red">28 weaving clusters</span> across Odisha,
                supporting over <span className="font-medium text-[#FF8225]">200 artisan families</span>.
              </p>
            </motion.div>

            {/* Map Container */}
            <motion.div 
              initial={{ opacity: 0, scale: 0.95 }} whileInView={{ opacity: 1, scale: 1 }} transition={{ duration: 0.8 }} viewport={{ once: true }}
              className="relative max-w-4xl mx-auto"
            >
              <div className="bg-tanvo-raw-cotton rounded p-4 md:p-6 shadow-xl border border-tanvo-madder-red/10">
                {/* Map Legend */}
                <div className="flex flex-wrap items-center justify-center gap-4 mb-4">
                  <div className="flex items-center gap-2">
                    <div className="w-3 h-3 bg-[#B43F3F] rounded-full"></div>
                    <span className="text-xs text-on-surface-variant">Primary Clusters</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-3 h-3 bg-[#FF8225] rounded-full"></div>
                    <span className="text-xs text-on-surface-variant">Secondary Clusters</span>
                  </div>
                </div>

                {/* Map Visualization */}
                <div className="relative aspect-[4/3] w-full bg-gradient-to-b from-[#E8D5B5] to-[#D9C8A8] rounded-sm overflow-hidden border border-tanvo-madder-red/20">
                  <img
                    src={OdishaMap}
                    alt="Odisha Map with Weaving Clusters"
                    className="w-full h-full object-contain opacity-80"
                  />

                  {/* Grid overlay for reference */}
                  <div className="absolute inset-0 grid grid-cols-6 grid-rows-6 pointer-events-none">
                    {Array.from({ length: 36 }).map((_, i) => (
                      <div key={i} className="border border-tanvo-madder-red/5"></div>
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
                      <div
                        className="absolute inset-0 rounded-full animate-ping"
                        style={{ backgroundColor: cluster.color, width: '24px', height: '24px', opacity: '0.2' }}
                      />
                      <div
                        className="relative w-4 h-4 rounded-full border-2 border-white hover:scale-150 transition-all duration-300 shadow-md"
                        style={{ backgroundColor: cluster.color }}
                      >
                        <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none z-20">
                          <div className="bg-[#173B45] text-[#F8EDED] text-[10px] p-2 rounded-sm whitespace-nowrap shadow-lg">
                            <p className="font-medium">{cluster.name}</p>
                            <p className="text-[8px] opacity-75">{cluster.artisans} artisans</p>
                          </div>
                        </div>
                      </div>
                      <span className="absolute top-4 left-1/2 transform -translate-x-1/2 text-[8px] font-medium text-[#173B45] whitespace-nowrap opacity-70 group-hover:opacity-100 transition-opacity bg-white/80 px-1 rounded-sm">
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
                      <div className="text-[10px] text-on-surface-variant/60">{cluster.name}</div>
                    </div>
                  ))}
                </div>
              </div>
            </motion.div>
          </div>
        </section>

        {/* The Mathematics of the Loom */}
        <section className="bg-tanvo-charcoal py-section-gap px-margin-edge text-white">
          <div className="max-w-container-max mx-auto">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-24 items-center">
              <motion.div 
                initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }} viewport={{ once: true }}
              >
                <h2 className="font-label-sm text-label-sm text-white/50 tracking-[0.3em] uppercase mb-8">The Process</h2>
                <h3 className="font-display-xl text-headline-lg leading-tight mb-12">The Mathematics of <br/><span className="italic font-normal">the Loom.</span></h3>
                <div className="space-y-12">
                  <div className="flex space-x-8 items-start group">
                    <span className="font-headline-md text-headline-md text-tanvo-madder-red opacity-50 group-hover:opacity-100 transition-opacity">01.</span>
                    <div>
                      <h4 className="font-headline-md text-headline-md text-white mb-4">Dyed to Defy</h4>
                      <p className="font-body-md text-body-md text-white/60">Unlike printed fabrics, our yarns are tied and dyed before they ever touch the loom. It is a game of memory and precision.</p>
                    </div>
                  </div>
                  <div className="flex space-x-8 items-start group">
                    <span className="font-headline-md text-headline-md text-tanvo-madder-red opacity-50 group-hover:opacity-100 transition-opacity">02.</span>
                    <div>
                      <h4 className="font-headline-md text-headline-md text-white mb-4">The Loom Cadence</h4>
                      <p className="font-body-md text-body-md text-white/60">A single saree requires up to 45 days of weaving. Each throw of the shuttle must align with sub-millimeter accuracy to create the signature blur of Ikat.</p>
                    </div>
                  </div>
                  <div className="pt-8">
                    <Link to="/journal" className="inline-flex items-center space-x-4 group">
                      <span className="font-label-sm text-label-sm tracking-widest uppercase border-b border-white/20 pb-1 group-hover:border-tanvo-madder-red transition-colors">Trace Your Piece</span>
                      <ArrowRight className="group-hover:translate-x-2 transition-transform w-5 h-5" />
                    </Link>
                  </div>
                </div>
              </motion.div>
              <motion.div 
                initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, delay: 0.3 }} viewport={{ once: true }}
                className="relative"
              >
                <div className="aspect-square border border-white/10 p-12">
                  <img alt="Ikat Detail Charcoal" className="w-full h-full object-cover grayscale brightness-75 hover:grayscale-0 transition-all duration-1000" src="https://lh3.googleusercontent.com/aida/AP1WRLuedn3VD7opGOwZITn8HAnf2Ti73hM5pl2NYOW91XvoQTi-us6URbSg8m-k1Zl58Ta8fBTfPYDeQsDYulr_Wu19UpwtrITvHWlTPC455xjR9wWeo9AhXyVSgcPi_lGjkoJrz4TGVhdtc9uR_aWf_Md2iXwW3Az5rLcwTXoStlrNEu53UaVaruGpEIviDD_Gv0tElLuNXmbfD8l-sh0MAlIulh9fAryrA6ABsrf3c4ywM48oPow2GZa5Lk4"/>
                </div>
                <div className="absolute -bottom-12 -left-12 bg-tanvo-madder-red p-12 hidden lg:block">
                  <p className="font-label-sm text-white text-[10px] uppercase leading-relaxed tracking-widest">
                    4,500 TIED NODES<br/>
                    12 NATURAL DYES<br/>
                    45 DAYS OF LABOR
                  </p>
                </div>
              </motion.div>
            </div>
          </div>
        </section>

        {/* Sustainability & Ethics */}
        <section className="py-section-gap px-margin-edge bg-tanvo-raw-cotton">
          <motion.div 
            initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }} viewport={{ once: true }}
            className="max-w-container-max mx-auto text-center"
          >
            <h2 className="font-label-sm text-label-sm text-tanvo-madder-red tracking-[0.3em] uppercase mb-16">The Covenant</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-16">
              <div className="space-y-6 flex flex-col items-center">
                <Sun className="w-12 h-12 text-tanvo-madder-red" />
                <h4 className="font-headline-md text-headline-md">Zero-Carbon Looms</h4>
                <p className="font-body-md text-body-md text-on-surface-variant max-w-xs mx-auto">100% human-powered. Our looms consume zero electricity, relying on the rhythmic energy of the artisan.</p>
              </div>
              <div className="space-y-6 flex flex-col items-center">
                <Shield className="w-12 h-12 text-tanvo-madder-red" />
                <h4 className="font-headline-md text-headline-md">GI Tag Protection</h4>
                <p className="font-body-md text-body-md text-on-surface-variant max-w-xs mx-auto">We fight for intellectual property. Every TANVO piece is authenticated under the Geographical Indication registry.</p>
              </div>
              <div className="space-y-6 flex flex-col items-center">
                <div className="w-12 h-12 text-tanvo-madder-red flex items-center justify-center">
                  <span className="text-4xl">₹</span>
                </div>
                <h4 className="font-headline-md text-headline-md">Fair Direct Wages</h4>
                <p className="font-body-md text-body-md text-on-surface-variant max-w-xs mx-auto">Eliminating the middleman. 75% of every purchase goes directly back into the cluster's welfare fund.</p>
              </div>
            </div>
          </motion.div>
        </section>

        {/* Final CTA */}
        <section className="relative py-section-gap px-margin-edge bg-white overflow-hidden">
          <div className="absolute inset-0 opacity-5">
            <div className="w-full h-full bg-repeat scale-150" style={{ backgroundImage: "url('https://lh3.googleusercontent.com/aida-public/AB6AXuArCzVY4-L1w2KkaD6wD4DbN4LqtPiq6gD_2I-isLaNpDmTcNYW27bSQ5F3_4dyHdDVQEna7-WfAFPBxowxmLi1CNyQYV0-jk3I7yx6zbBV1k_tAzsfepl96qry5avhMLts_AoHeLYKjTZiiBGaQ35U_A-5ELDnhNPwNvSwggRVBQFJBwTTh6iuMcsZzf93JfoqbtbYnMcJgiASXqsX36AyU2kPxs8Ax4f-9q9KQogb9xqneqcPxpWQghTjn2qc2tyVVRLD2PRvpM_A')" }}></div>
          </div>
          <motion.div 
            initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }} viewport={{ once: true }}
            className="relative z-10 max-w-4xl mx-auto text-center"
          >
            <h2 className="font-display-xl text-headline-lg mb-8 italic">Become a Custodian.</h2>
            <p className="font-body-lg text-body-lg text-on-surface-variant mb-12">
              Heritage is not a museum piece; it is a living, breathing economy. By choosing TANVO, you are not just buying a saree—you are sustaining a lineage.
            </p>
            <div className="flex flex-col md:flex-row items-center justify-center space-y-6 md:space-y-0 md:space-x-8">
              <Link to="/register" className="bg-tanvo-madder-red text-white px-12 py-5 font-label-sm text-label-sm uppercase tracking-[0.2em] hover:bg-black transition-all duration-500 w-full md:w-auto text-center">
                Join the Preservation
              </Link>
              <Link to="/shop" className="font-label-sm text-label-sm text-tanvo-madder-red uppercase tracking-[0.2em] border-b border-transparent hover:border-tanvo-madder-red transition-all duration-300">
                View the Collection
              </Link>
            </div>
          </motion.div>
        </section>
      </main>
    </div>
  );
};

export default About;