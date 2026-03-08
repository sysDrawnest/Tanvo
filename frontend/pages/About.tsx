// import React, { useEffect, useRef } from 'react';
// import { Link } from "react-router-dom";
// import { 
//   Sparkles, Users, Heart, Globe, Award, Leaf, 
//   Clock, Droplets, Feather, Sun, Moon, Star,
//   ArrowRight, Quote, Eye, Shield, Zap
// } from 'lucide-react';

// const About: React.FC = () => {
//   const sectionRef = useRef<HTMLDivElement>(null);

//   useEffect(() => {
//     const observer = new IntersectionObserver(
//       (entries) => {
//         entries.forEach((entry) => {
//           if (entry.isIntersecting) {
//             entry.target.classList.add('opacity-100', 'translate-y-0');
//           }
//         });
//       },
//       { threshold: 0.1 }
//     );

//     document.querySelectorAll('.animate-on-scroll').forEach((el) => {
//       observer.observe(el);
//     });

//     return () => observer.disconnect();
//   }, []);

//   return (
//     <div className="bg-gradient-to-b from-white via-[#F6CE71]/5 to-white pt-32 pb-24 overflow-hidden">
//       {/* Background decorative elements */}
//       <div className="fixed inset-0 pointer-events-none">
//         <div className="absolute top-40 left-10 w-72 h-72 bg-gradient-to-br from-[#C40C0C]/5 to-[#FF6500]/5 rounded-full blur-3xl animate-pulse-gentle" />
//         <div className="absolute bottom-40 right-10 w-96 h-96 bg-gradient-to-tl from-[#F6CE71]/10 to-[#CC561E]/10 rounded-full blur-3xl animate-pulse-gentle animation-delay-200" />
//       </div>

//       {/* Hero Section */}
//       <section className="container-custom relative mb-32">
//         <div className="max-w-6xl mx-auto">
//           {/* Floating elements */}
//           <div className="absolute -top-20 left-0 w-40 h-40 bg-[#F6CE71]/20 rounded-full blur-2xl animate-float" />
//           <div className="absolute bottom-20 right-0 w-60 h-60 bg-[#C40C0C]/10 rounded-full blur-2xl animate-float animation-delay-200" />
          
//           <div className="relative space-y-8 text-center lg:text-left">
//             <div className="inline-flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-[#C40C0C]/10 to-[#FF6500]/10 rounded-full border border-[#FF6500]/20 backdrop-blur-sm animate-fadeIn">
//               <Sparkles className="w-4 h-4 text-[#C40C0C]" />
//               <span className="text-[#C40C0C] font-black uppercase tracking-[0.3em] text-xs">700 Years of Heritage</span>
//             </div>
            
//             <h1 className="text-7xl md:text-9xl font-serif font-bold tracking-tight leading-[0.85]">
//               <span className="bg-gradient-to-r from-[#C40C0C] via-[#FF6500] to-[#CC561E] bg-clip-text text-transparent animate-gradient">
//                 Woven in
//               </span>
//               <br />
//               <span className="relative">
//                 Time
//                 <div className="absolute -bottom-4 left-0 w-full h-2 bg-gradient-to-r from-[#F6CE71] to-transparent rounded-full" />
//               </span>
//             </h1>
            
//             <p className="text-2xl md:text-3xl text-gray-600 font-light leading-relaxed max-w-3xl mx-auto lg:mx-0">
//               Where ancient looms whisper stories of generations,
//               <span className="text-[#C40C0C] font-medium"> and each thread carries the soul of Odisha.</span>
//             </p>

//             <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start pt-8">
//               <Link 
//                 to="/shop" 
//                 className="group relative px-8 py-4 bg-gradient-to-r from-[#C40C0C] to-[#FF6500] text-white font-bold rounded-full overflow-hidden hover:shadow-2xl hover:scale-105 transition-all duration-300"
//               >
//                 <span className="relative z-10 flex items-center gap-2">
//                   Explore Our Legacy
//                   <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
//                 </span>
//                 <div className="absolute inset-0 bg-gradient-to-r from-[#FF6500] to-[#C40C0C] opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
//               </Link>
              
//               <Link 
//                 to="/weavers" 
//                 className="px-8 py-4 border-2 border-[#C40C0C] text-[#C40C0C] font-bold rounded-full hover:bg-[#C40C0C] hover:text-white transition-all duration-300 hover:shadow-xl"
//               >
//                 Meet the Artisans
//               </Link>
//             </div>
//           </div>

//           {/* Stats Banner */}
//           <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mt-24 p-8 bg-white/80 backdrop-blur-sm rounded-3xl shadow-xl border border-gray-100">
//             {[
//               { value: '700+', label: 'Years of Legacy', icon: Clock },
//               { value: '200+', label: 'Master Weavers', icon: Users },
//               { value: '5000+', label: 'Unique Designs', icon: Eye },
//               { value: '50+', label: 'Global Awards', icon: Award }
//             ].map((stat, index) => (
//               <div key={index} className="text-center group">
//                 <div className="w-12 h-12 mx-auto mb-3 bg-gradient-to-br from-[#F6CE71]/20 to-[#FF6500]/20 rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
//                   <stat.icon className="w-5 h-5 text-[#C40C0C]" />
//                 </div>
//                 <div className="text-3xl font-serif font-bold text-gray-900">{stat.value}</div>
//                 <div className="text-xs text-gray-500 uppercase tracking-wider mt-1">{stat.label}</div>
//               </div>
//             ))}
//           </div>
//         </div>
//       </section>

//       {/* Philosophy Section */}
//       <section className="w-full py-32 bg-gradient-to-b from-gray-50 to-white relative overflow-hidden">
//         <div className="absolute inset-0 opacity-5">
//           <div className="absolute top-0 left-0 w-full h-full" style={{
//             backgroundImage: 'radial-gradient(circle at 2px 2px, #C40C0C 1px, transparent 0)',
//             backgroundSize: '40px 40px'
//           }} />
//         </div>

//         <div className="container-custom relative">
//           <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
//             {/* Image with decorative frame */}
//             <div className="relative group animate-on-scroll opacity-0 translate-y-10 transition-all duration-700">
//               <div className="absolute -inset-4 bg-gradient-to-r from-[#C40C0C] to-[#FF6500] rounded-[3.5rem] blur-2xl opacity-30 group-hover:opacity-50 transition-opacity duration-500" />
//               <div className="relative aspect-[4/5] rounded-[3rem] overflow-hidden shadow-2xl">
//                 <img 
//                   src="https://images.unsplash.com/photo-1544441893-675973e31985?q=80&w=1200" 
//                   alt="Master weaver at work" 
//                   className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
//                 />
//                 <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent" />
                
//                 {/* Overlay text */}
//                 <div className="absolute bottom-8 left-8 text-white">
//                   <p className="text-sm font-light mb-2">Master Weaver • 4th Generation</p>
//                   <p className="text-2xl font-serif font-bold">"Every thread tells a story"</p>
//                 </div>
//               </div>
              
//               {/* Floating badge */}
//               <div className="absolute -bottom-4 -right-4 bg-white rounded-2xl shadow-2xl p-4 border border-gray-100">
//                 <div className="flex items-center gap-3">
//                   <div className="w-12 h-12 bg-gradient-to-br from-[#F6CE71] to-[#FF6500] rounded-xl flex items-center justify-center">
//                     <Zap className="w-6 h-6 text-white" />
//                   </div>
//                   <div>
//                     <p className="text-xs text-gray-500">Traditional</p>
//                     <p className="font-bold text-gray-900">Ikat Technique</p>
//                   </div>
//                 </div>
//               </div>
//             </div>

//             {/* Content */}
//             <div className="space-y-12 animate-on-scroll opacity-0 translate-y-10 transition-all duration-700 delay-200">
//               <div className="space-y-6">
//                 <div className="inline-flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-[#C40C0C]/10 to-[#FF6500]/10 rounded-full">
//                   <Sparkles className="w-4 h-4 text-[#C40C0C]" />
//                   <span className="text-[#C40C0C] font-black uppercase tracking-[0.2em] text-xs">The Art of Precision</span>
//                 </div>
                
//                 <h2 className="text-5xl md:text-6xl font-serif font-bold leading-tight">
//                   Where mathematics
//                   <br />
//                   <span className="text-[#C40C0C]">meets magic.</span>
//                 </h2>
                
//                 <p className="text-xl text-gray-600 leading-relaxed font-light">
//                   Every Ikat saree begins as a complex mathematical equation. 
//                   <span className="font-medium text-gray-900"> Master weavers calculate the exact tension of thousands of threads</span> 
//                   to ensure the tied dyes align perfectly during the weaving process.
//                 </p>
//               </div>

//               {/* Feature grid */}
//               <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
//                 {[
//                   {
//                     icon: <Droplets className="w-6 h-6" />,
//                     title: "Natural Dyes",
//                     desc: "Colors derived from indigo, turmeric, and madder root, processed traditionally."
//                   },
//                   {
//                     icon: <Feather className="w-6 h-6" />,
//                     title: "Pure Materials",
//                     desc: "Only the finest mulberry silk and long-staple cotton enter our looms."
//                   },
//                   {
//                     icon: <Sun className="w-6 h-6" />,
//                     title: "Solar Energy",
//                     desc: "Our dyeing process harnesses the Odisha sun, reducing carbon footprint."
//                   },
//                   {
//                     icon: <Shield className="w-6 h-6" />,
//                     title: "GI Certified",
//                     desc: "Geographical Indication tag ensures authentic Sambalpuri heritage."
//                   }
//                 ].map((feature, index) => (
//                   <div key={index} className="group p-6 bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-500 hover:-translate-y-2 border border-gray-100">
//                     <div className="w-12 h-12 bg-gradient-to-br from-[#F6CE71]/20 to-[#FF6500]/20 rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300">
//                       <div className="text-[#C40C0C]">{feature.icon}</div>
//                     </div>
//                     <h4 className="text-lg font-serif font-bold mb-2">{feature.title}</h4>
//                     <p className="text-sm text-gray-500 leading-relaxed">{feature.desc}</p>
//                   </div>
//                 ))}
//               </div>

//               {/* Sustainability badge */}
//               <div className="flex items-center gap-4 p-6 bg-gradient-to-r from-green-50 to-emerald-50 rounded-2xl border border-green-100">
//                 <Leaf className="w-8 h-8 text-green-600" />
//                 <div>
//                   <p className="font-bold text-gray-900">100% Sustainable Practice</p>
//                   <p className="text-sm text-gray-600">Our weaving centers run on solar power and harvested rainwater.</p>
//                 </div>
//               </div>
//             </div>
//           </div>
//         </div>
//       </section>

//       {/* Legacy Timeline */}
//       <section className="container-custom py-32">
//         <div className="text-center mb-20">
//           <h2 className="text-5xl md:text-6xl font-serif font-bold mb-6">
//             Threads of 
//             <span className="bg-gradient-to-r from-[#C40C0C] to-[#FF6500] bg-clip-text text-transparent"> Time</span>
//           </h2>
//           <p className="text-xl text-gray-600 max-w-2xl mx-auto">
//             Seven centuries of weaving wisdom, passed down through generations
//           </p>
//         </div>

//         <div className="relative max-w-4xl mx-auto">
//           {/* Timeline line */}
//           <div className="absolute left-1/2 transform -translate-x-1/2 w-0.5 h-full bg-gradient-to-b from-[#F6CE71] via-[#C40C0C] to-[#FF6500]" />

//           {[
//             { year: '1320', title: 'Origins of Ikat', desc: 'The Bandha technique emerges in Western Odisha', icon: Sun },
//             { year: '1700', title: 'Royal Patronage', desc: 'Sambalpuri weaves gain favor in princely courts', icon: Award },
//             { year: '1954', title: 'National Recognition', desc: 'Awarded President\'s Medal for craftsmanship', icon: Star },
//             { year: '2024', title: 'Global Renaissance', desc: 'Traditional motifs reinterpreted for modern aesthetics', icon: Globe }
//           ].map((item, index) => (
//             <div key={index} className={`relative flex items-center mb-16 ${index % 2 === 0 ? 'flex-row' : 'flex-row-reverse'}`}>
//               <div className="w-1/2 px-8">
//                 <div className={`bg-white p-8 rounded-2xl shadow-xl hover:shadow-2xl transition-all duration-500 border border-gray-100 ${index % 2 === 0 ? 'text-right' : 'text-left'}`}>
//                   <div className="text-4xl font-serif font-bold text-[#C40C0C] mb-2">{item.year}</div>
//                   <h3 className="text-xl font-serif font-bold mb-2">{item.title}</h3>
//                   <p className="text-gray-600">{item.desc}</p>
//                 </div>
//               </div>
              
//               <div className="absolute left-1/2 transform -translate-x-1/2 w-12 h-12 bg-white rounded-full border-4 border-[#C40C0C] flex items-center justify-center z-10">
//                 <item.icon className="w-5 h-5 text-[#C40C0C]" />
//               </div>
//             </div>
//           ))}
//         </div>
//       </section>

//       {/* Founder Spotlight */}
//       <section className="relative py-32 overflow-hidden">
//         <div className="absolute inset-0">
//           <div className="absolute inset-0 bg-gradient-to-r from-[#C40C0C] to-[#FF6500] opacity-95" />
//           <div className="absolute inset-0" style={{
//             backgroundImage: 'url("data:image/svg+xml,%3Csvg width="60" height="60" viewBox="0 0 60 60" xmlns="http://www.w3.org/2000/svg"%3E%3Cg fill="none" fill-rule="evenodd"%3E%3Cg fill="%23ffffff" fill-opacity="0.05"%3E%3Cpath d="M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z"/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")',
//           }} />
//         </div>

//         <div className="container-custom relative z-10">
//           <div className="max-w-6xl mx-auto bg-white/10 backdrop-blur-lg rounded-[4rem] p-16 border border-white/20 shadow-2xl">
//             <div className="grid grid-cols-1 md:grid-cols-2 gap-16 items-center">
//               {/* Portrait with halo effect */}
//               <div className="relative group">
//                 <div className="absolute -inset-4 bg-gradient-to-r from-[#F6CE71] to-white rounded-full blur-2xl opacity-50 group-hover:opacity-75 transition-opacity duration-500" />
//                 <div className="relative w-80 h-80 mx-auto rounded-full overflow-hidden border-4 border-white/30 shadow-2xl">
//                   <img 
//                     src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=500" 
//                     alt="Mr. SYS" 
//                     className="w-full h-full object-cover grayscale hover:grayscale-0 transition-all duration-700"
//                   />
//                 </div>
                
//                 {/* Floating quote */}
//                 <div className="absolute -bottom-4 -right-4 bg-white rounded-2xl p-4 shadow-2xl animate-float">
//                   <Quote className="w-8 h-8 text-[#C40C0C]" />
//                 </div>
//               </div>

//               {/* Content */}
//               <div className="text-white space-y-8">
//                 <div className="inline-flex items-center gap-2 px-4 py-2 bg-white/20 rounded-full backdrop-blur-sm">
//                   <Award className="w-4 h-4" />
//                   <span className="text-sm font-bold uppercase tracking-wider">Founder & Visionary</span>
//                 </div>

//                 <h3 className="text-6xl font-serif font-bold">Mr. SYS</h3>
                
//                 <div className="relative">
//                   <Quote className="absolute -left-4 -top-4 w-12 h-12 text-white/20" />
//                   <p className="text-2xl italic font-light leading-relaxed pl-8">
//                     "Our mission is to translate the silent language of the loom into a global fashion narrative. 
//                     <span className="text-[#F6CE71]"> We aren't preserving history; we're wearing it into the future."</span>
//                   </p>
//                 </div>

//                 <div className="flex gap-6 pt-6">
//                   <Link 
//                     to="/contact" 
//                     className="group px-8 py-4 bg-white text-[#C40C0C] font-bold rounded-full hover:shadow-2xl hover:scale-105 transition-all duration-300 flex items-center gap-2"
//                   >
//                     Connect Directly
//                     <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
//                   </Link>
                  
//                   <Link 
//                     to="/weavers" 
//                     className="px-8 py-4 border-2 border-white text-white font-bold rounded-full hover:bg-white hover:text-[#C40C0C] transition-all duration-300"
//                   >
//                     Meet the Team
//                   </Link>
//                 </div>
//               </div>
//             </div>
//           </div>
//         </div>
//       </section>

//       {/* Call to Action */}
//       <section className="container-custom py-32 text-center">
//         <div className="max-w-3xl mx-auto space-y-8">
//           <h2 className="text-5xl md:text-6xl font-serif font-bold">
//             Begin Your 
//             <span className="bg-gradient-to-r from-[#C40C0C] to-[#FF6500] bg-clip-text text-transparent"> Heritage</span>
//             <br />
//             Journey
//           </h2>
          
//           <p className="text-xl text-gray-600">
//             Join thousands of collectors who've made our handlooms a part of their story.
//           </p>
          
//           <div className="flex flex-col sm:flex-row gap-4 justify-center pt-8">
//             <Link 
//               to="/shop" 
//               className="group px-10 py-5 bg-gradient-to-r from-[#C40C0C] to-[#FF6500] text-white font-bold rounded-full hover:shadow-2xl hover:scale-105 transition-all duration-300 text-lg"
//             >
//               Explore Collection
//             </Link>
            
//             <Link 
//               to="/story" 
//               className="group px-10 py-5 border-2 border-gray-300 text-gray-700 font-bold rounded-full hover:border-[#C40C0C] hover:text-[#C40C0C] transition-all duration-300 text-lg"
//             >
//               Read Weaver Stories
//             </Link>
//           </div>

//           {/* Trust badges */}
//           <div className="flex flex-wrap justify-center gap-8 pt-16">
//             {[
//               { icon: Shield, text: 'GI Certified' },
//               { icon: Award, text: 'National Award Winners' },
//               { icon: Heart, text: '10k+ Happy Collectors' }
//             ].map((badge, index) => (
//               <div key={index} className="flex items-center gap-2 text-sm text-gray-500">
//                 <badge.icon className="w-4 h-4 text-[#C40C0C]" />
//                 <span>{badge.text}</span>
//               </div>
//             ))}
//           </div>
//         </div>
//       </section>

//       <style jsx>{`
//         @keyframes gradient {
//           0%, 100% { background-position: 0% 50%; }
//           50% { background-position: 100% 50%; }
//         }
        
//         .animate-gradient {
//           background-size: 200% 200%;
//           animation: gradient 4s ease infinite;
//         }
        
//         .animation-delay-200 {
//           animation-delay: 0.2s;
//         }
        
//         .animation-delay-400 {
//           animation-delay: 0.4s;
//         }
        
//         .animate-on-scroll {
//           transition: opacity 0.7s ease-out, transform 0.7s ease-out;
//         }
//       `}</style>
//     </div>
//   );
// };

// export default About;

// import React from 'react';
// // Correctly importing named component from react-router-dom
// import { Link } from "react-router-dom";
// import { Sparkles, Users, Heart, Globe, Award, Leaf, Clock, MapPin, Quote, ArrowRight, Shield, Truck, Star, Gem, Droplet, Wind, Sun } from 'lucide-react';

// // REMOVE THIS LINE: import OdishaMap from '../public/images/odisha-map.svg';

// const About: React.FC = () => {
//   // Key weaving clusters data
//   const weavingClusters = [
//     { name: 'Keonjhar', artisans: 45, specialty: 'Sambalpuri Ikat', color: '#C40C0C', coordinates: { top: '35%', left: '45%' } },
//     { name: 'Mayurbhanj', artisans: 38, specialty: 'Tussar Silk', color: '#FF6500', coordinates: { top: '25%', left: '55%' } },
//     { name: 'Balasore', artisans: 32, specialty: 'Cotton Ikat', color: '#CC561E', coordinates: { top: '30%', left: '75%' } },
//     { name: 'Bargarh', artisans: 45, specialty: 'Sambalpuri Silk', color: '#C40C0C', coordinates: { top: '50%', left: '25%' } },
//     { name: 'Nuapatna', artisans: 32, specialty: 'Khandua Silk', color: '#FF6500', coordinates: { top: '55%', left: '40%' } },
//     { name: 'Sonepur', artisans: 28, specialty: 'Ikat Cotton', color: '#CC561E', coordinates: { top: '60%', left: '30%' } },
//     { name: 'Cuttack', artisans: 22, specialty: 'Bomkai', color: '#F6CE71', coordinates: { top: '45%', left: '50%' } },
//     { name: 'Berhampur', artisans: 35, specialty: 'Silk Sarees', color: '#C40C0C', coordinates: { top: '75%', left: '45%' } },
//     { name: 'Puri', artisans: 18, specialty: 'Khandua', color: '#FF6500', coordinates: { top: '60%', left: '55%' } },
//     { name: 'Dhenkanal', artisans: 25, specialty: 'Cotton', color: '#CC561E', coordinates: { top: '45%', left: '40%' } }
//   ];

//   // Featured clusters (Keonjhar, Mayurbhanj, Balasore)
//   const featuredClusters = weavingClusters.filter(c => 
//     ['Keonjhar', 'Mayurbhanj', 'Balasore'].includes(c.name)
//   );

//   return (
//     <div className="min-h-screen bg-gradient-to-b from-[#FCF5E8] to-[#F8E9D5] pt-32 pb-24">
//       {/* Background Pattern */}
//       <div className="fixed inset-0 opacity-[0.03] pointer-events-none" 
//            style={{
//              backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M30 0L60 30L30 60L0 30L30 0z' fill='%23C40C0C' fill-opacity='0.2'/%3E%3C/svg%3E")`,
//              backgroundSize: '60px 60px'
//            }}>
//       </div>

//       {/* Hero Section */}
//       <section className="container-custom mb-32 relative">
//         <div className="absolute -top-20 -left-20 w-64 h-64 bg-gradient-to-br from-[#C40C0C]/5 to-[#F6CE71]/5 rounded-full blur-3xl" />
//         <div className="absolute -bottom-20 -right-20 w-80 h-80 bg-gradient-to-tl from-[#FF6500]/5 to-[#C40C0C]/5 rounded-full blur-3xl" />
        
//         <div className="max-w-5xl mx-auto relative">
//           <div className="inline-flex items-center gap-2 px-4 py-2 bg-[#C40C0C]/5 rounded-full border border-[#C40C0C]/20 mb-8">
//             <Gem className="w-4 h-4 text-[#C40C0C]" />
//             <span className="text-[#C40C0C] font-black uppercase tracking-[0.3em] text-xs">Authentic Odisha Handlooms</span>
//           </div>
          
//           <h1 className="text-7xl md:text-8xl lg:text-9xl font-serif font-bold tracking-tight leading-[0.9] mb-12">
//             <span className="bg-gradient-to-r from-[#C40C0C] via-[#FF6500] to-[#CC561E] bg-clip-text text-transparent">
//               Bridging
//             </span>
//             <br />
//             <span className="relative">
//               Tradition & Trend
//               <svg className="absolute -bottom-6 left-0 w-full" viewBox="0 0 300 12" fill="none" xmlns="http://www.w3.org/2000/svg">
//                 <path d="M2 10C50 4 150 2 298 2" stroke="#F6CE71" strokeWidth="4" strokeLinecap="round" strokeDasharray="8 8"/>
//               </svg>
//             </span>
//           </h1>
          
//           <p className="text-xl md:text-2xl text-[#5C4E3D] font-light leading-relaxed max-w-3xl mb-8">
//             We don't weave the sarees — we weave the connection between 700-year-old 
//             <span className="font-semibold text-[#C40C0C]"> Odisha's master artisans </span> 
//             and the modern wardrobe. Your platform for authentic, handcrafted heritage.
//           </p>
          
//           <div className="flex flex-wrap gap-4 items-center">
//             <Link 
//               to="/shop" 
//               className="group px-8 py-4 bg-gradient-to-r from-[#C40C0C] to-[#FF6500] text-white rounded-full font-bold hover:shadow-2xl hover:scale-105 transition-all duration-300 flex items-center gap-2"
//             >
//               Explore Collection
//               <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
//             </Link>
//             <Link 
//               to="/weavers" 
//               className="px-8 py-4 border-2 border-[#C40C0C] text-[#C40C0C] rounded-full font-bold hover:bg-[#C40C0C]/5 transition-all duration-300"
//             >
//               Meet Our Artisans
//             </Link>
//           </div>

//           {/* Stats */}
//           <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mt-16">
//             {[
//               { label: 'Artisan Families', value: '200+', icon: Users },
//               { label: 'Weaving Clusters', value: '28', icon: MapPin },
//               { label: 'Years of Legacy', value: '700+', icon: Clock },
//               { label: 'Happy Clients', value: '15K+', icon: Heart }
//             ].map((stat, index) => (
//               <div key={index} className="text-center group">
//                 <div className="w-12 h-12 mx-auto mb-3 bg-[#F6CE71]/10 rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
//                   <stat.icon className="w-5 h-5 text-[#CC561E]" />
//                 </div>
//                 <div className="text-2xl font-bold text-[#C40C0C]">{stat.value}</div>
//                 <div className="text-xs text-[#5C4E3D] font-medium uppercase tracking-wider">{stat.label}</div>
//               </div>
//             ))}
//           </div>
//         </div>
//       </section>

//       {/* Artisan Network Map Section - Redesigned with Odisha Map */}
//       <section className="w-full py-24 bg-gradient-to-b from-[#F8E9D5] to-[#FCF5E8]">
//         <div className="container-custom">
//           <div className="text-center mb-16">
//             <div className="inline-flex items-center gap-2 px-4 py-2 bg-[#F6CE71]/20 rounded-full mb-4">
//               <MapPin className="w-4 h-4 text-[#CC561E]" />
//               <span className="text-[#CC561E] font-black uppercase tracking-[0.3em] text-xs">Our Roots</span>
//             </div>
//             <h2 className="text-5xl md:text-6xl font-serif font-bold mb-4">
//               <span className="bg-gradient-to-r from-[#C40C0C] to-[#FF6500] bg-clip-text text-transparent">
//                 Artisan Network
//               </span>
//             </h2>
//             <p className="text-xl text-[#5C4E3D] max-w-3xl mx-auto">
//               We work with <span className="font-bold text-[#C40C0C]">28 weaving clusters</span> across Odisha, 
//               supporting over <span className="font-bold text-[#FF6500]">200 artisan families</span>. 
//               Our strongest roots are in the heart of Odisha's handloom tradition.
//             </p>
//           </div>

//           {/* Featured Clusters - Keonjhar, Mayurbhanj, Balasore */}
//           <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-16">
//             {featuredClusters.map((cluster, index) => (
//               <div 
//                 key={index} 
//                 className="bg-white/90 backdrop-blur-sm p-8 rounded-3xl shadow-xl hover:shadow-2xl transition-all duration-500 hover:-translate-y-2 border-l-8 relative overflow-hidden group"
//                 style={{ borderLeftColor: cluster.color }}
//               >
//                 <div className="absolute top-0 right-0 w-32 h-32 opacity-5 group-hover:opacity-10 transition-opacity">
//                   <MapPin className="w-full h-full" />
//                 </div>
//                 <h3 className="text-3xl font-serif font-bold mb-2">{cluster.name}</h3>
//                 <p className="text-sm uppercase tracking-wider text-gray-500 mb-4">{cluster.specialty}</p>
//                 <div className="flex items-center justify-between">
//                   <div>
//                     <span className="text-2xl font-bold text-[#C40C0C]">{cluster.artisans}</span>
//                     <span className="text-sm text-gray-500 ml-1">artisans</span>
//                   </div>
//                   <div className="flex items-center gap-1">
//                     <Droplet className="w-4 h-4 text-blue-400" />
//                     <Wind className="w-4 h-4 text-green-400" />
//                     <Sun className="w-4 h-4 text-yellow-400" />
//                   </div>
//                 </div>
//                 <div className="mt-4 pt-4 border-t border-gray-100">
//                   <Link 
//                     to={`/shop?cluster=${cluster.name.toLowerCase()}`}
//                     className="text-sm font-bold text-[#C40C0C] hover:text-[#FF6500] transition-colors flex items-center gap-1"
//                   >
//                     View Collection <ArrowRight className="w-3 h-3" />
//                   </Link>
//                 </div>
//               </div>
//             ))}
//           </div>

//           {/* Odisha Map with Clusters */}
//           <div className="relative max-w-5xl mx-auto">
//             <div className="bg-gradient-to-br from-[#FCF5E8] to-[#F8E9D5] rounded-[3rem] p-8 shadow-2xl border-2 border-[#F6CE71]/30">
//               {/* Map Title */}
//               <div className="flex items-center justify-between mb-6 px-4">
//                 <div className="flex items-center gap-2">
//                   <div className="w-3 h-3 bg-[#C40C0C] rounded-full"></div>
//                   <span className="text-xs text-gray-600">Primary Clusters</span>
//                 </div>
//                 <div className="flex items-center gap-2">
//                   <div className="w-3 h-3 bg-[#FF6500] rounded-full"></div>
//                   <span className="text-xs text-gray-600">Secondary Clusters</span>
//                 </div>
//                 <div className="flex items-center gap-2">
//                   <div className="w-3 h-3 bg-[#F6CE71] rounded-full"></div>
//                   <span className="text-xs text-gray-600">Emerging Clusters</span>
//                 </div>
//               </div>

//               {/* Map Container - Using the actual Odisha map image */}
//               <div className="relative aspect-[4/3] w-full bg-[#E8D5B5] rounded-2xl overflow-hidden">
//                 {/* Base Map Image */}
//                 <img 
//                   src="/images/odisha-map.svg" 
//                   alt="Odisha Map with Weaving Clusters" 
//                   className="w-full h-full object-contain"
//                 />
                
//                 {/* Overlay markers */}
//                 <div className="absolute inset-0">
//                   {/* Cluster Markers with enhanced visibility */}
//                   {weavingClusters.map((cluster, index) => (
//                     <div 
//                       key={index} 
//                       className="absolute group cursor-pointer"
//                       style={{ 
//                         top: cluster.coordinates.top, 
//                         left: cluster.coordinates.left,
//                         transform: 'translate(-50%, -50%)'
//                       }}
//                     >
//                       {/* Pulse Effect */}
//                       <div 
//                         className="absolute inset-0 rounded-full animate-ping" 
//                         style={{ 
//                           backgroundColor: cluster.color,
//                           width: '30px',
//                           height: '30px',
//                           opacity: '0.2'
//                         }}
//                       />
                      
//                       {/* Main Marker */}
//                       <div 
//                         className="relative w-5 h-5 rounded-full border-2 border-white hover:scale-150 transition-all duration-300"
//                         style={{ backgroundColor: cluster.color }}
//                       >
//                         {/* Tooltip */}
//                         <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none">
//                           <div className="bg-black text-white text-xs p-2 rounded-lg whitespace-nowrap">
//                             <p className="font-bold">{cluster.name}</p>
//                             <p>{cluster.artisans} artisans • {cluster.specialty}</p>
//                           </div>
//                         </div>
//                       </div>
                      
//                       {/* Label */}
//                       <span className="absolute top-6 left-1/2 transform -translate-x-1/2 text-[8px] font-bold text-gray-700 whitespace-nowrap opacity-70 group-hover:opacity-100 transition-opacity">
//                         {cluster.name}
//                       </span>
//                     </div>
//                   ))}

//                   {/* Featured Clusters Special Highlight */}
//                   {featuredClusters.map((cluster, index) => (
//                     <div 
//                       key={`featured-${index}`}
//                       className="absolute pointer-events-none"
//                       style={{ 
//                         top: cluster.coordinates.top, 
//                         left: cluster.coordinates.left,
//                         transform: 'translate(-50%, -50%)'
//                       }}
//                     >
//                       <div className="absolute inset-0 w-10 h-10 border-2 border-[#F6CE71] rounded-full animate-pulse" />
//                       <span className="absolute -top-6 left-1/2 transform -translate-x-1/2 text-[8px] font-bold text-[#C40C0C] whitespace-nowrap">
//                         ★ FEATURED
//                       </span>
//                     </div>
//                   ))}
//                 </div>
//               </div>

//               {/* Map Legend */}
//               <div className="mt-6 grid grid-cols-2 md:grid-cols-5 gap-4">
//                 {weavingClusters.slice(0,5).map((cluster, index) => (
//                   <div key={index} className="flex items-center gap-2">
//                     <div className="w-3 h-3 rounded-full" style={{ backgroundColor: cluster.color }}></div>
//                     <span className="text-xs text-gray-600">{cluster.name} ({cluster.artisans})</span>
//                   </div>
//                 ))}
//               </div>
//             </div>

//             {/* Stats Card */}
//             <div className="absolute -bottom-6 -right-6 bg-white p-6 rounded-2xl shadow-2xl max-w-xs border-l-4 border-[#C40C0C]">
//               <div className="flex items-center gap-3 mb-3">
//                 <div className="w-10 h-10 bg-[#F6CE71]/20 rounded-full flex items-center justify-center">
//                   <MapPin className="w-5 h-5 text-[#CC561E]" />
//                 </div>
//                 <div>
//                   <p className="font-bold text-lg">Northern Clusters</p>
//                   <p className="text-xs text-gray-500">Our strongest network</p>
//                 </div>
//               </div>
//               <div className="space-y-2">
//                 <div className="flex justify-between text-sm">
//                   <span>Keonjhar</span>
//                   <span className="font-bold">45 artisans</span>
//                 </div>
//                 <div className="flex justify-between text-sm">
//                   <span>Mayurbhanj</span>
//                   <span className="font-bold">38 artisans</span>
//                 </div>
//                 <div className="flex justify-between text-sm">
//                   <span>Balasore</span>
//                   <span className="font-bold">32 artisans</span>
//                 </div>
//                 <div className="pt-2 mt-2 border-t border-gray-100">
//                   <div className="flex justify-between text-sm font-bold text-[#C40C0C]">
//                     <span>Total</span>
//                     <span>115 artisans</span>
//                   </div>
//                 </div>
//               </div>
//             </div>
//           </div>
//         </div>
//       </section>

//       {/* Our Role Section */}
//       <section className="w-full py-24 bg-gradient-to-r from-[#C40C0C]/5 via-transparent to-[#F6CE71]/5">
//         <div className="container-custom">
//           <div className="max-w-4xl mx-auto text-center mb-16">
//             <h2 className="text-4xl md:text-5xl font-serif font-bold mb-6">
//               We Don't Weave, We 
//               <span className="text-[#FF6500]"> Connect</span>
//             </h2>
//             <p className="text-lg text-[#5C4E3D]">
//               Think of us as the bridge between the skilled hands of Odisha and your wardrobe. 
//               We handle the logistics, quality checks, and global reach — so artisans can focus on what they do best.
//             </p>
//           </div>

//           <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
//             {[
//               {
//                 icon: <Gem className="w-8 h-8" />,
//                 title: "Curated Selection",
//                 description: "We personally visit 28 weaving clusters to handpick only the finest pieces that meet our quality standards."
//               },
//               {
//                 icon: <Shield className="w-8 h-8" />,
//                 title: "Authenticity Guaranteed",
//                 description: "Every product comes with a GI certification and weaver's signature, ensuring 100% authentic handloom."
//               },
//               {
//                 icon: <Globe className="w-8 h-8" />,
//                 title: "Global Reach",
//                 description: "From a small village in Odisha to your doorstep anywhere in the world — we make it happen."
//               }
//             ].map((item, index) => (
//               <div key={index} className="bg-white/80 backdrop-blur-sm p-8 rounded-3xl shadow-xl hover:shadow-2xl transition-all duration-500 hover:-translate-y-2 border border-[#F6CE71]/20 group">
//                 <div className="w-16 h-16 bg-gradient-to-br from-[#C40C0C]/10 to-[#FF6500]/10 rounded-2xl flex items-center justify-center mb-6 text-[#C40C0C] group-hover:scale-110 transition-transform duration-300">
//                   {item.icon}
//                 </div>
//                 <h3 className="text-xl font-serif font-bold mb-3">{item.title}</h3>
//                 <p className="text-[#5C4E3D]">{item.description}</p>
//               </div>
//             ))}
//           </div>
//         </div>
//       </section>
//     </div>
//   );
// };

// export default About;
import React from 'react';
import { Link } from "react-router-dom";
import { 
  Sparkles, Users, Heart, Globe, Award, Leaf, Clock, 
  MapPin, Quote, ArrowRight, Shield, Truck, Star, Gem, 
  Droplet, Wind, Sun, ChevronRight 
} from 'lucide-react';

// Note: The Odisha map SVG should be placed in public/images/odisha-map.svg
// If the file doesn't exist, we'll use a fallback div with background pattern

const About: React.FC = () => {
  // Key weaving clusters data
  const weavingClusters = [
    { name: 'Keonjhar', artisans: 45, specialty: 'Sambalpuri Ikat', color: '#C40C0C', coordinates: { top: '35%', left: '45%' } },
    { name: 'Mayurbhanj', artisans: 38, specialty: 'Tussar Silk', color: '#FF6500', coordinates: { top: '25%', left: '55%' } },
    { name: 'Balasore', artisans: 32, specialty: 'Cotton Ikat', color: '#CC561E', coordinates: { top: '30%', left: '75%' } },
    { name: 'Bargarh', artisans: 45, specialty: 'Sambalpuri Silk', color: '#C40C0C', coordinates: { top: '50%', left: '25%' } },
    { name: 'Nuapatna', artisans: 32, specialty: 'Khandua Silk', color: '#FF6500', coordinates: { top: '55%', left: '40%' } },
    { name: 'Sonepur', artisans: 28, specialty: 'Ikat Cotton', color: '#CC561E', coordinates: { top: '60%', left: '30%' } },
    { name: 'Cuttack', artisans: 22, specialty: 'Bomkai', color: '#F6CE71', coordinates: { top: '45%', left: '50%' } },
    { name: 'Berhampur', artisans: 35, specialty: 'Silk Sarees', color: '#C40C0C', coordinates: { top: '75%', left: '45%' } },
    { name: 'Puri', artisans: 18, specialty: 'Khandua', color: '#FF6500', coordinates: { top: '60%', left: '55%' } },
    { name: 'Dhenkanal', artisans: 25, specialty: 'Cotton', color: '#CC561E', coordinates: { top: '45%', left: '40%' } }
  ];

  // Featured clusters (Keonjhar, Mayurbhanj, Balasore)
  const featuredClusters = weavingClusters.filter(c => 
    ['Keonjhar', 'Mayurbhanj', 'Balasore'].includes(c.name)
  );

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#FCF5E8] to-[#F8E9D5] pt-32 pb-24">
      {/* Background Pattern - Ikat inspired */}
      <div className="fixed inset-0 opacity-[0.03] pointer-events-none" 
           style={{
             backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M30 0L60 30L30 60L0 30L30 0z' fill='%23C40C0C' fill-opacity='0.2'/%3E%3C/svg%3E")`,
             backgroundSize: '60px 60px'
           }}>
      </div>

      {/* Hero Section */}
      <section className="container-custom mb-32 relative">
        <div className="absolute -top-20 -left-20 w-64 h-64 bg-gradient-to-br from-[#C40C0C]/5 to-[#F6CE71]/5 rounded-full blur-3xl" />
        <div className="absolute -bottom-20 -right-20 w-80 h-80 bg-gradient-to-tl from-[#FF6500]/5 to-[#C40C0C]/5 rounded-full blur-3xl" />
        
        <div className="max-w-5xl mx-auto relative">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-[#C40C0C]/5 rounded-full border border-[#C40C0C]/20 mb-8">
            <Gem className="w-4 h-4 text-[#C40C0C]" />
            <span className="text-[#C40C0C] font-black uppercase tracking-[0.3em] text-xs">Authentic Odisha Handlooms</span>
          </div>
          
          <h1 className="text-6xl md:text-7xl lg:text-8xl font-serif font-bold tracking-tight leading-[0.9] mb-12">
            <span className="bg-gradient-to-r from-[#C40C0C] via-[#FF6500] to-[#CC561E] bg-clip-text text-transparent">
              Bridging
            </span>
            <br />
            <span className="relative">
              Tradition & Trend
              <svg className="absolute -bottom-6 left-0 w-full" viewBox="0 0 300 12" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M2 10C50 4 150 2 298 2" stroke="#F6CE71" strokeWidth="4" strokeLinecap="round" strokeDasharray="8 8"/>
              </svg>
            </span>
          </h1>
          
          <p className="text-lg md:text-xl text-[#5C4E3D] font-light leading-relaxed max-w-3xl mb-8">
            We don't just sell sarees — we connect you with the 700-year-old legacy of 
            <span className="font-semibold text-[#C40C0C]"> Odisha's master artisans</span>. 
            Your trusted platform for authentic, handcrafted heritage, direct from the loom to your wardrobe.
          </p>
          
          <div className="flex flex-wrap gap-4 items-center">
            <Link 
              to="/shop" 
              className="group px-8 py-4 bg-gradient-to-r from-[#C40C0C] to-[#FF6500] text-white rounded-full font-bold hover:shadow-2xl hover:scale-105 transition-all duration-300 flex items-center gap-2"
            >
              Explore Collection
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </Link>
            <Link 
              to="/weavers" 
              className="px-8 py-4 border-2 border-[#C40C0C] text-[#C40C0C] rounded-full font-bold hover:bg-[#C40C0C]/5 transition-all duration-300"
            >
              Meet Our Artisans
            </Link>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mt-16">
            {[
              { label: 'Artisan Families', value: '200+', icon: Users },
              { label: 'Weaving Clusters', value: '28', icon: MapPin },
              { label: 'Years of Legacy', value: '700+', icon: Clock },
              { label: 'Happy Clients', value: '15K+', icon: Heart }
            ].map((stat, index) => (
              <div key={index} className="text-center group">
                <div className="w-12 h-12 mx-auto mb-3 bg-[#F6CE71]/10 rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                  <stat.icon className="w-5 h-5 text-[#CC561E]" />
                </div>
                <div className="text-2xl font-bold text-[#C40C0C]">{stat.value}</div>
                <div className="text-xs text-[#5C4E3D] font-medium uppercase tracking-wider">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Artisan Network Map Section */}
      <section className="w-full py-24 bg-gradient-to-b from-[#F8E9D5] to-[#FCF5E8]">
        <div className="container-custom">
          <div className="text-center mb-16">
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-[#F6CE71]/20 rounded-full mb-4">
              <MapPin className="w-4 h-4 text-[#CC561E]" />
              <span className="text-[#CC561E] font-black uppercase tracking-[0.3em] text-xs">Our Roots</span>
            </div>
            <h2 className="text-4xl md:text-5xl font-serif font-bold mb-4">
              <span className="bg-gradient-to-r from-[#C40C0C] to-[#FF6500] bg-clip-text text-transparent">
                Artisan Network
              </span>
            </h2>
            <p className="text-lg text-[#5C4E3D] max-w-3xl mx-auto">
              We work with <span className="font-bold text-[#C40C0C]">28 weaving clusters</span> across Odisha, 
              supporting over <span className="font-bold text-[#FF6500]">200 artisan families</span>. 
              Our strongest roots are in the heart of Odisha's handloom tradition.
            </p>
          </div>

          {/* Featured Clusters - Keonjhar, Mayurbhanj, Balasore */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-16">
            {featuredClusters.map((cluster, index) => (
              <div 
                key={index} 
                className="bg-white/90 backdrop-blur-sm p-8 rounded-3xl shadow-xl hover:shadow-2xl transition-all duration-500 hover:-translate-y-2 border-l-8 relative overflow-hidden group"
                style={{ borderLeftColor: cluster.color }}
              >
                <div className="absolute top-0 right-0 w-32 h-32 opacity-5 group-hover:opacity-10 transition-opacity">
                  <MapPin className="w-full h-full" />
                </div>
                <h3 className="text-3xl font-serif font-bold mb-2">{cluster.name}</h3>
                <p className="text-sm uppercase tracking-wider text-gray-500 mb-4">{cluster.specialty}</p>
                <div className="flex items-center justify-between">
                  <div>
                    <span className="text-2xl font-bold text-[#C40C0C]">{cluster.artisans}</span>
                    <span className="text-sm text-gray-500 ml-1">artisans</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <Droplet className="w-4 h-4 text-blue-400" />
                    <Wind className="w-4 h-4 text-green-400" />
                    <Sun className="w-4 h-4 text-yellow-400" />
                  </div>
                </div>
                <div className="mt-4 pt-4 border-t border-gray-100">
                  <Link 
                    to={`/shop?cluster=${cluster.name.toLowerCase()}`}
                    className="text-sm font-bold text-[#C40C0C] hover:text-[#FF6500] transition-colors flex items-center gap-1"
                  >
                    View Collection <ArrowRight className="w-3 h-3" />
                  </Link>
                </div>
              </div>
            ))}
          </div>

          {/* Map Container - Using div with background pattern as fallback */}
          <div className="relative max-w-5xl mx-auto">
            <div className="bg-gradient-to-br from-[#FCF5E8] to-[#F8E9D5] rounded-[3rem] p-8 shadow-2xl border-2 border-[#F6CE71]/30">
              {/* Map Title */}
              <div className="flex flex-wrap items-center justify-between gap-4 mb-6 px-4">
                <div className="flex items-center gap-4">
                  <div className="flex items-center gap-2">
                    <div className="w-3 h-3 bg-[#C40C0C] rounded-full"></div>
                    <span className="text-xs text-gray-600">Primary Clusters</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-3 h-3 bg-[#FF6500] rounded-full"></div>
                    <span className="text-xs text-gray-600">Secondary Clusters</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-3 h-3 bg-[#F6CE71] rounded-full"></div>
                    <span className="text-xs text-gray-600">Emerging Clusters</span>
                  </div>
                </div>
              </div>

              {/* Map Visualization - Using CSS grid as base map */}
              <div className="relative aspect-[4/3] w-full bg-gradient-to-b from-[#D9C8A8] to-[#C4B090] rounded-2xl overflow-hidden border-4 border-[#F6CE71]/20">
                {/* Grid pattern for map reference */}
                <div className="absolute inset-0 grid grid-cols-6 grid-rows-6">
                  {Array.from({ length: 36 }).map((_, i) => (
                    <div key={i} className="border border-[#F6CE71]/5"></div>
                  ))}
                </div>
                
                {/* River Ganges representation */}
                <div className="absolute top-1/3 left-0 w-full h-1 bg-blue-300/30 transform -rotate-6"></div>
                <div className="absolute bottom-1/3 left-0 w-full h-1 bg-blue-300/30 transform rotate-12"></div>
                
                {/* Coastal line */}
                <div className="absolute right-0 top-0 w-2 h-full bg-green-600/10"></div>
                
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
                        width: '30px',
                        height: '30px',
                        opacity: '0.2'
                      }}
                    />
                    
                    {/* Main Marker */}
                    <div 
                      className="relative w-5 h-5 rounded-full border-2 border-white hover:scale-150 transition-all duration-300 shadow-lg"
                      style={{ backgroundColor: cluster.color }}
                    >
                      {/* Tooltip */}
                      <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none z-20">
                        <div className="bg-black text-white text-xs p-2 rounded-lg whitespace-nowrap shadow-xl">
                          <p className="font-bold">{cluster.name}</p>
                          <p>{cluster.artisans} artisans</p>
                          <p className="text-[10px] opacity-75">{cluster.specialty}</p>
                        </div>
                      </div>
                    </div>
                    
                    {/* Label */}
                    <span className="absolute top-6 left-1/2 transform -translate-x-1/2 text-[8px] font-bold text-gray-800 whitespace-nowrap opacity-70 group-hover:opacity-100 transition-opacity bg-white/50 px-1 rounded">
                      {cluster.name}
                    </span>
                  </div>
                ))}

                {/* Featured Clusters Special Highlight */}
                {featuredClusters.map((cluster, index) => (
                  <div 
                    key={`featured-${index}`}
                    className="absolute pointer-events-none"
                    style={{ 
                      top: cluster.coordinates.top, 
                      left: cluster.coordinates.left,
                      transform: 'translate(-50%, -50%)'
                    }}
                  >
                    <div className="absolute inset-0 w-10 h-10 border-2 border-[#F6CE71] rounded-full animate-pulse" />
                    <span className="absolute -top-6 left-1/2 transform -translate-x-1/2 text-[8px] font-bold text-[#C40C0C] whitespace-nowrap bg-white/80 px-2 py-0.5 rounded-full">
                      ★ FEATURED
                    </span>
                  </div>
                ))}
              </div>

              {/* Map Legend */}
              <div className="mt-6 grid grid-cols-2 md:grid-cols-5 gap-4">
                {weavingClusters.slice(0,5).map((cluster, index) => (
                  <div key={index} className="flex items-center gap-2">
                    <div className="w-3 h-3 rounded-full" style={{ backgroundColor: cluster.color }}></div>
                    <span className="text-xs text-gray-600">
                      {cluster.name} <span className="font-bold">({cluster.artisans})</span>
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* Stats Card */}
            <div className="absolute -bottom-6 -right-6 bg-white p-6 rounded-2xl shadow-2xl max-w-xs border-l-4 border-[#C40C0C] hidden lg:block">
              <div className="flex items-center gap-3 mb-3">
                <div className="w-10 h-10 bg-[#F6CE71]/20 rounded-full flex items-center justify-center">
                  <MapPin className="w-5 h-5 text-[#CC561E]" />
                </div>
                <div>
                  <p className="font-bold text-lg">Northern Clusters</p>
                  <p className="text-xs text-gray-500">Our strongest network</p>
                </div>
              </div>
              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span>Keonjhar</span>
                  <span className="font-bold">45 artisans</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span>Mayurbhanj</span>
                  <span className="font-bold">38 artisans</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span>Balasore</span>
                  <span className="font-bold">32 artisans</span>
                </div>
                <div className="pt-2 mt-2 border-t border-gray-100">
                  <div className="flex justify-between text-sm font-bold text-[#C40C0C]">
                    <span>Total</span>
                    <span>115 artisans</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Mobile Stats Card */}
          <div className="lg:hidden mt-8 bg-white p-6 rounded-2xl shadow-xl border-l-4 border-[#C40C0C]">
            <div className="flex items-center gap-3 mb-3">
              <div className="w-10 h-10 bg-[#F6CE71]/20 rounded-full flex items-center justify-center">
                <MapPin className="w-5 h-5 text-[#CC561E]" />
              </div>
              <div>
                <p className="font-bold text-lg">Northern Clusters</p>
                <p className="text-xs text-gray-500">Our strongest network</p>
              </div>
            </div>
            <div className="grid grid-cols-3 gap-4">
              <div className="text-center">
                <div className="text-xl font-bold text-[#C40C0C]">45</div>
                <div className="text-xs">Keonjhar</div>
              </div>
              <div className="text-center">
                <div className="text-xl font-bold text-[#C40C0C]">38</div>
                <div className="text-xs">Mayurbhanj</div>
              </div>
              <div className="text-center">
                <div className="text-xl font-bold text-[#C40C0C]">32</div>
                <div className="text-xs">Balasore</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Our Role Section */}
      <section className="w-full py-24 bg-gradient-to-r from-[#C40C0C]/5 via-transparent to-[#F6CE71]/5">
        <div className="container-custom">
          <div className="max-w-4xl mx-auto text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-serif font-bold mb-6">
              We Don't Just Sell, We 
              <span className="text-[#FF6500]"> Connect</span>
            </h2>
            <p className="text-lg text-[#5C4E3D]">
              Think of us as the bridge between the skilled hands of Odisha and your wardrobe. 
              We handle the logistics, quality checks, and global reach — so artisans can focus on what they do best.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                icon: <Gem className="w-8 h-8" />,
                title: "Curated Selection",
                description: "We personally visit 28 weaving clusters to handpick only the finest pieces that meet our quality standards."
              },
              {
                icon: <Shield className="w-8 h-8" />,
                title: "Authenticity Guaranteed",
                description: "Every product comes with a GI certification and weaver's signature, ensuring 100% authentic handloom."
              },
              {
                icon: <Globe className="w-8 h-8" />,
                title: "Global Reach",
                description: "From a small village in Odisha to your doorstep anywhere in the world — we make it happen."
              }
            ].map((item, index) => (
              <div key={index} className="bg-white/80 backdrop-blur-sm p-8 rounded-3xl shadow-xl hover:shadow-2xl transition-all duration-500 hover:-translate-y-2 border border-[#F6CE71]/20 group">
                <div className="w-16 h-16 bg-gradient-to-br from-[#C40C0C]/10 to-[#FF6500]/10 rounded-2xl flex items-center justify-center mb-6 text-[#C40C0C] group-hover:scale-110 transition-transform duration-300">
                  {item.icon}
                </div>
                <h3 className="text-xl font-serif font-bold mb-3">{item.title}</h3>
                <p className="text-[#5C4E3D]">{item.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="container-custom mt-24">
        <div className="bg-gradient-to-r from-[#C40C0C] to-[#FF6500] rounded-[3rem] p-16 text-center text-white relative overflow-hidden">
          <div className="absolute top-0 right-0 w-64 h-64 bg-white/5 rounded-full -mr-16 -mt-16"></div>
          <div className="absolute bottom-0 left-0 w-48 h-48 bg-black/5 rounded-full -ml-16 -mb-16"></div>
          
          <h2 className="text-4xl md:text-5xl font-serif font-bold mb-6 relative z-10">
            Join the <span className="text-[#F6CE71]">Heritage</span> Movement
          </h2>
          <p className="text-lg opacity-90 mb-8 max-w-2xl mx-auto relative z-10">
            Be part of our journey to preserve and promote Odisha's rich handloom tradition. 
            Every purchase directly supports an artisan family.
          </p>
          <div className="flex flex-wrap gap-4 justify-center relative z-10">
            <Link 
              to="/shop" 
              className="px-8 py-4 bg-white text-[#C40C0C] rounded-full font-bold hover:shadow-2xl hover:scale-105 transition-all duration-300"
            >
              Shop Now
            </Link>
            <Link 
              to="/contact" 
              className="px-8 py-4 border-2 border-white text-white rounded-full font-bold hover:bg-white hover:text-[#C40C0C] transition-all duration-300"
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