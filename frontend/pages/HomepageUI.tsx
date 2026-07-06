// ==========================================
// ALL HOMEPAGE CODES CONSOLIDATED
// ==========================================


// --- FILE: Home.tsx ---

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
import IkatDeepDive from './sections/IkatDeepDive';
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
        <VideoBanner />

        <ProductsGrid
          products={bestsellers}
          loading={loading && bestsellers.length === 0}
          label="Most Loved"
          title="Bestsellers"
          viewAllLink="/shop?isBestSeller=true"
          viewAllText="All Bestsellers"
          background="#F9F5EE"
        />

        <HandwovenHeritage />

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

        <EditorialBanner />
        <CategoryGrid />
        <WhyChooseUs />
        <MensTraditionalAttireBanner />
        <ModernMuse />
        <DrapedEveryMoment />
        <TrustSignals />
        <BrandStorySection />
        <IkatDeepDive />
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

// --- FILE: HeroSection.tsx ---

import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { ArrowUpRight, Star, Award, Users } from 'lucide-react';
import { HERO_SLIDES } from '../../constants';

/*
=====================================================
OLD HERO SECTION (Archived)
=====================================================
*/
// 
// const HeroSection: React.FC = () => {
//     return (
//         <section style={{
//             minHeight: '100vh',
//             background: '#F8EDED', // Soft off-white background
//             position: 'relative',
//             overflow: 'hidden',
//             display: 'flex',
//             alignItems: 'center',
//         }}>
//             {/* Dynamic background elements */}
//             <div style={{
//                 position: 'absolute',
//                 top: '-10%',
//                 right: '-5%',
//                 width: '70%',
//                 height: '70%',
//                 background: '#FF8225', // Vibrant orange
//                 opacity: 0.03,
//                 borderRadius: '30% 70% 70% 30% / 30% 30% 70% 70%',
//                 transform: 'rotate(10deg)',
//             }} />
// 
//             <div style={{
//                 position: 'absolute',
//                 bottom: '-10%',
//                 left: '-5%',
//                 width: '60%',
//                 height: '60%',
//                 background: '#B43F3F', // Rich red
//                 opacity: 0.03,
//                 borderRadius: '70% 30% 30% 70% / 60% 40% 60% 40%',
//                 transform: 'rotate(-15deg)',
//             }} />
// 
//             {/* Main grid pattern */}
//             <div style={{
//                 position: 'absolute',
//                 inset: 0,
//                 backgroundImage: `
//                     linear-gradient(rgba(23, 59, 69, 0.03) 1px, transparent 1px),
//                     linear-gradient(90deg, rgba(23, 59, 69, 0.03) 1px, transparent 1px)
//                 `,
//                 backgroundSize: '50px 50px',
//                 zIndex: 1,
//             }} />
// 
//             {/* Corner accent */}
//             <div style={{
//                 position: 'absolute',
//                 top: 0,
//                 right: 0,
//                 width: '300px',
//                 height: '300px',
//                 background: 'linear-gradient(135deg, #FF8225 0%, #B43F3F 100%)',
//                 opacity: 0.1,
//                 clipPath: 'polygon(100% 0, 0 0, 100% 100%)',
//             }} />
// 
//             {/* Main content container */}
//             <div style={{
//                 position: 'relative',
//                 zIndex: 5,
//                 maxWidth: '1400px',
//                 margin: '0 auto',
//                 padding: '80px 48px',
//                 width: '100%',
//             }}>
//                 <div style={{
//                     display: 'grid',
//                     gridTemplateColumns: '1.2fr 0.8fr',
//                     gap: '60px',
//                     alignItems: 'center',
//                 }}>
//                     {/* Left column - Hero text */}
//                     <div>
//                         {/* Heritage badge */}
//                         <div style={{
//                             display: 'inline-flex',
//                             alignItems: 'center',
//                             gap: '8px',
//                             padding: '8px 16px',
//                             background: '#173B45', // Deep teal
//                             borderRadius: '2px',
//                             marginBottom: '30px',
//                         }}>
//                             <Star size={14} color="#F8EDED" />
//                             <span style={{
//                                 color: '#F8EDED',
//                                 fontSize: '11px',
//                                 fontWeight: 500,
//                                 letterSpacing: '1.5px',
//                                 textTransform: 'uppercase',
//                             }}>
//                                 Est. 1952 · Seventh Generation
//                             </span>
//                         </div>
// 
//                         {/* Main heading */}
//                         <h1 style={{
//                             fontSize: 'clamp(48px, 7vw, 84px)',
//                             fontWeight: 700,
//                             lineHeight: 1,
//                             marginBottom: '20px',
//                         }}>
//                             <span style={{
//                                 color: '#173B45', // Deep teal
//                                 display: 'block',
//                             }}>WEAVING</span>
//                             <span style={{
//                                 color: '#B43F3F', // Rich red
//                                 display: 'block',
//                             }}>HERITAGE</span>
//                             <span style={{
//                                 color: '#FF8225', // Vibrant orange
//                                 fontSize: 'clamp(24px, 4vw, 42px)',
//                                 fontWeight: 400,
//                                 display: 'block',
//                                 marginTop: '16px',
//                                 letterSpacing: '-0.02em',
//                             }}>into every thread</span>
//                         </h1>
// 
//                         {/* Description */}
//                         <p style={{
//                             color: '#173B45',
//                             fontSize: '16px',
//                             lineHeight: 1.8,
//                             maxWidth: '520px',
//                             marginBottom: '40px',
//                             opacity: 0.8,
//                             fontWeight: 400,
//                         }}>
//                             From the looms of Odisha to the world — each saree carries
//                             stories of craftsmanship, patience, and devotion passed down
//                             through seven generations of master weavers.
//                         </p>
// 
//                         {/* CTA Buttons */}
//                         <div style={{
//                             display: 'flex',
//                             gap: '16px',
//                             flexWrap: 'wrap',
//                             marginBottom: '50px',
//                         }}>
//                             <Link
//                                 to="/shop"
//                                 style={{
//                                     display: 'inline-flex',
//                                     alignItems: 'center',
//                                     gap: '8px',
//                                     padding: '16px 42px',
//                                     background: '#B43F3F', // Rich red
//                                     color: '#F8EDED',
//                                     fontSize: '13px',
//                                     fontWeight: 600,
//                                     letterSpacing: '1.5px',
//                                     textTransform: 'uppercase',
//                                     textDecoration: 'none',
//                                     transition: 'all 0.3s ease',
//                                     border: 'none',
//                                 }}
//                                 onMouseEnter={(e) => {
//                                     e.currentTarget.style.background = '#FF8225';
//                                     e.currentTarget.style.transform = 'translateY(-2px)';
//                                 }}
//                                 onMouseLeave={(e) => {
//                                     e.currentTarget.style.background = '#B43F3F';
//                                     e.currentTarget.style.transform = 'translateY(0)';
//                                 }}
//                             >
//                                 Explore Collection <ArrowUpRight size={16} />
//                             </Link>
// 
//                             <Link
//                                 to="/story"
//                                 style={{
//                                     display: 'inline-flex',
//                                     alignItems: 'center',
//                                     padding: '16px 42px',
//                                     background: 'transparent',
//                                     color: '#173B45',
//                                     fontSize: '13px',
//                                     fontWeight: 600,
//                                     letterSpacing: '1.5px',
//                                     textTransform: 'uppercase',
//                                     textDecoration: 'none',
//                                     border: '2px solid #173B45',
//                                     transition: 'all 0.3s ease',
//                                 }}
//                                 onMouseEnter={(e) => {
//                                     e.currentTarget.style.background = '#173B45';
//                                     e.currentTarget.style.color = '#F8EDED';
//                                 }}
//                                 onMouseLeave={(e) => {
//                                     e.currentTarget.style.background = 'transparent';
//                                     e.currentTarget.style.color = '#173B45';
//                                 }}
//                             >
//                                 Our Story
//                             </Link>
//                         </div>
// 
//                         {/* Trust indicators */}
//                         <div style={{
//                             display: 'flex',
//                             gap: '40px',
//                             borderTop: '1px solid rgba(23, 59, 69, 0.1)',
//                             paddingTop: '30px',
//                         }}>
//                             {[
//                                 { icon: Award, value: 'GI Certified', label: 'Authentic Heritage' },
//                                 { icon: Star, value: '100% Handwoven', label: 'Pure Craft' },
//                                 { icon: Users, value: '50+ Master', label: 'Weavers' },
//                             ].map((item, index) => {
//                                 const Icon = item.icon;
//                                 return (
//                                     <div key={index} style={{
//                                         display: 'flex',
//                                         alignItems: 'center',
//                                         gap: '12px',
//                                     }}>
//                                         <div style={{
//                                             width: '40px',
//                                             height: '40px',
//                                             background: '#FF8225',
//                                             borderRadius: '50%',
//                                             display: 'flex',
//                                             alignItems: 'center',
//                                             justifyContent: 'center',
//                                             opacity: 0.1,
//                                         }}>
//                                             <Icon size={18} color="#FF8225" />
//                                         </div>
//                                         <div>
//                                             <div style={{
//                                                 fontSize: '14px',
//                                                 fontWeight: 700,
//                                                 color: '#173B45',
//                                             }}>
//                                                 {item.value}
//                                             </div>
//                                             <div style={{
//                                                 fontSize: '11px',
//                                                 color: '#173B45',
//                                                 opacity: 0.6,
//                                                 letterSpacing: '0.5px',
//                                             }}>
//                                                 {item.label}
//                                             </div>
//                                         </div>
//                                     </div>
//                                 );
//                             })}
//                         </div>
//                     </div>
// 
//                     {/* Right column - Visual showcase */}
//                     <div style={{
//                         position: 'relative',
//                     }}>
//                         {/* Main image collage */}
//                         <div style={{
//                             display: 'grid',
//                             gridTemplateColumns: 'repeat(2, 1fr)',
//                             gap: '16px',
//                         }}>
//                             {/* Large image */}
//                             <div style={{
//                                 gridColumn: 'span 2',
//                                 position: 'relative',
//                                 height: '320px',
//                                 background: '#173B45',
//                                 borderRadius: '2px',
//                                 overflow: 'hidden',
//                             }}>
//                                 <img
//                                     src="/api/placeholder/600/320"
//                                     alt="Handwoven saree detail"
//                                     style={{
//                                         width: '100%',
//                                         height: '100%',
//                                         objectFit: 'cover',
//                                         opacity: 0.9,
//                                     }}
//                                 />
//                                 <div style={{
//                                     position: 'absolute',
//                                     bottom: '16px',
//                                     left: '16px',
//                                     right: '16px',
//                                     padding: '12px',
//                                     background: 'rgba(248, 237, 237, 0.9)',
//                                     backdropFilter: 'blur(5px)',
//                                 }}>
//                                     <p style={{
//                                         color: '#173B45',
//                                         fontSize: '12px',
//                                         fontWeight: 600,
//                                         letterSpacing: '1px',
//                                         textTransform: 'uppercase',
//                                     }}>
//                                         Traditional Ikat Weave
//                                     </p>
//                                 </div>
//                             </div>
// 
//                             {/* Small images */}
//                             {[1, 2].map((item) => (
//                                 <div key={item} style={{
//                                     height: '160px',
//                                     background: '#FF8225',
//                                     borderRadius: '2px',
//                                     overflow: 'hidden',
//                                     position: 'relative',
//                                 }}>
//                                     <img
//                                         src={`/api/placeholder/300/160`}
//                                         alt="Weaving detail"
//                                         style={{
//                                             width: '100%',
//                                             height: '100%',
//                                             objectFit: 'cover',
//                                         }}
//                                     />
//                                     <div style={{
//                                         position: 'absolute',
//                                         bottom: 0,
//                                         left: 0,
//                                         right: 0,
//                                         height: '50%',
//                                         background: 'linear-gradient(to top, #173B45, transparent)',
//                                         opacity: 0.3,
//                                     }} />
//                                 </div>
//                             ))}
//                         </div>
// 
//                         {/* Floating card */}
//                         <div style={{
//                             position: 'absolute',
//                             bottom: '-20px',
//                             left: '-20px',
//                             background: '#F8EDED',
//                             padding: '20px',
//                             boxShadow: '10px 10px 30px rgba(23, 59, 69, 0.1)',
//                             borderLeft: '4px solid #FF8225',
//                             maxWidth: '200px',
//                         }}>
//                             <p style={{
//                                 color: '#173B45',
//                                 fontSize: '13px',
//                                 fontWeight: 600,
//                                 marginBottom: '4px',
//                                 textTransform: 'uppercase',
//                                 letterSpacing: '1px',
//                             }}>
//                                 Limited Edition
//                             </p>
//                             <p style={{
//                                 color: '#B43F3F',
//                                 fontSize: '16px',
//                                 fontWeight: 700,
//                             }}>
//                                 Pata Saree 2024
//                             </p>
//                             <p style={{
//                                 color: '#173B45',
//                                 fontSize: '11px',
//                                 opacity: 0.6,
//                             }}>
//                                 Only 10 pieces available
//                             </p>
//                         </div>
//                     </div>
//                 </div>
//             </div>
// 
//             {/* Scroll indicator */}
//             <div style={{
//                 position: 'absolute',
//                 bottom: '30px',
//                 left: '50%',
//                 transform: 'translateX(-50%)',
//                 zIndex: 10,
//                 display: 'flex',
//                 flexDirection: 'column',
//                 alignItems: 'center',
//                 gap: '8px',
//             }}>
//                 <div style={{
//                     width: '2px',
//                     height: '50px',
//                     background: 'linear-gradient(to bottom, #FF8225, #B43F3F)',
//                 }} />
//                 <span style={{
//                     color: '#173B45',
//                     fontSize: '10px',
//                     letterSpacing: '2px',
//                     textTransform: 'uppercase',
//                     opacity: 0.5,
//                 }}>
//                     Scroll
//                 </span>
//             </div>
// 
//             {/* Side badge */}
//             <div style={{
//                 position: 'absolute',
//                 right: '30px',
//                 top: '50%',
//                 transform: 'translateY(-50%) rotate(90deg)',
//                 zIndex: 10,
//                 display: 'flex',
//                 gap: '30px',
//             }}>
//                 {['Handwoven', 'Ethical', 'Heritage'].map((item, index) => (
//                     <span key={index} style={{
//                         color: '#173B45',
//                         fontSize: '11px',
//                         letterSpacing: '2px',
//                         textTransform: 'uppercase',
//                         opacity: 0.3,
//                         fontWeight: 500,
//                     }}>
//                         • {item} •
//                     </span>
//                 ))}
//             </div>
//         </section>
//     );
// };
// 

/*
=====================================================
NEW LUXURY HERO SECTION
=====================================================
*/
const HeroSection: React.FC = () => {
    const [currentIndex, setCurrentIndex] = useState(0);
    const [isMobile, setIsMobile] = useState(window.innerWidth <= 768);

    useEffect(() => {
        const handleResize = () => setIsMobile(window.innerWidth <= 768);
        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, []);

    useEffect(() => {
        const timer = setInterval(() => {
            setCurrentIndex((prev) => (prev + 1) % HERO_SLIDES.length);
        }, 5000);
        return () => clearInterval(timer);
    }, []);

    return (
        <section style={{
            minHeight: '100vh',
            width: '100%',
            position: 'relative',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'space-between',
            padding: '4vw 6vw',
            backgroundColor: '#0A0A0A',
            overflow: 'hidden',
        }}>
            {/* Background Slideshow */}
            {HERO_SLIDES.map((slide, index) => {
                const imgUrl = isMobile ? slide.mobile : slide.desktop;
                return (
                    <div
                        key={index}
                        style={{
                            position: 'absolute',
                            inset: 0,
                            backgroundImage: `url("${imgUrl}")`,
                            backgroundSize: 'cover',
                            backgroundPosition: slide.position || 'center',
                            backgroundRepeat: 'no-repeat',
                            opacity: index === currentIndex ? 1 : 0,
                            transition: 'opacity 1.5s ease-in-out',
                            zIndex: 0,
                        }}
                    />
                );
            })}

            {/* Elegant dark overlay */}
            <div style={{
                position: 'absolute',
                top: 0, left: 0, right: 0, bottom: 0,
                background: 'linear-gradient(180deg, rgba(10,10,10,0.1) 0%, rgba(10,10,10,0.85) 100%)',
                zIndex: 1,
            }} />

            {/* Top row: Brand */}
            <div style={{
                position: 'relative',
                zIndex: 2,
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center'
            }}>
                <div />
                <Link to="/shop" style={{
                    color: '#EAE6DF',
                    fontSize: '11px',
                    letterSpacing: '0.15em',
                    textTransform: 'uppercase',
                    opacity: 0.7,
                    textDecoration: 'none',
                    transition: 'opacity 0.3s ease'
                }}
                onMouseEnter={(e) => e.currentTarget.style.opacity = '1'}
                onMouseLeave={(e) => e.currentTarget.style.opacity = '0.7'}>
                    Fine Silks
                </Link>
            </div>

            {/* Main content */}
            <div style={{
                position: 'relative',
                zIndex: 2,
                maxWidth: '650px',
                marginBottom: '4vh'
            }}>
                <h1 style={{
                    color: '#FFFFFF',
                    fontSize: 'clamp(42px, 6vw, 76px)',
                    fontWeight: 200,
                    letterSpacing: '0.02em',
                    lineHeight: 1.1,
                    marginBottom: '24px',
                    fontFamily: '"Playfair Display", "Times New Roman", serif',
                }}>
                    The silent poetry <br />
                    <i style={{ fontWeight: 400, color: '#D4AF37', opacity: 0.9 }}>of pure silk.</i>
                </h1>

                <p style={{
                    color: 'rgba(234, 230, 223, 0.75)',
                    fontSize: '15px',
                    letterSpacing: '0.05em',
                    lineHeight: 1.6,
                    marginBottom: '48px',
                    fontWeight: 300,
                    maxWidth: '450px',
                    fontFamily: '"Helvetica Neue", Helvetica, Arial, sans-serif'
                }}>
                    Experience the timeless elegance and intricate craftsmanship woven into every thread.
                </p>

                <Link
                    to="/shop"
                    style={{
                        display: 'inline-flex',
                        alignItems: 'center',
                        color: '#FFFFFF',
                        fontSize: '12px',
                        letterSpacing: '0.15em',
                        textTransform: 'uppercase',
                        textDecoration: 'none',
                        borderBottom: '1px solid rgba(255, 255, 255, 0.3)',
                        paddingBottom: '8px',
                        transition: 'all 0.4s ease',
                        fontFamily: '"Helvetica Neue", Helvetica, Arial, sans-serif'
                    }}
                    onMouseEnter={(e) => {
                        e.currentTarget.style.borderBottomColor = '#FFFFFF';
                        e.currentTarget.style.color = '#D4AF37';
                    }}
                    onMouseLeave={(e) => {
                        e.currentTarget.style.borderBottomColor = 'rgba(255, 255, 255, 0.3)';
                        e.currentTarget.style.color = '#FFFFFF';
                    }}
                >
                    Discover the Collection
                </Link>
            </div>

            {/* Slide Indicators */}
            <div style={{
                position: 'absolute',
                bottom: '4vh',
                left: '6vw',
                zIndex: 2,
                display: 'flex',
                gap: '8px',
            }}>
                {HERO_SLIDES.map((_, index) => (
                    <button
                        key={index}
                        onClick={() => setCurrentIndex(index)}
                        style={{
                            width: index === currentIndex ? '24px' : '8px',
                            height: '2px',
                            background: index === currentIndex ? '#D4AF37' : 'rgba(234, 230, 223, 0.4)',
                            border: 'none',
                            padding: 0,
                            cursor: 'pointer',
                            transition: 'all 0.3s ease',
                        }}
                        aria-label={`Go to slide ${index + 1}`}
                    />
                ))}
            </div>

            <div style={{
                position: 'absolute',
                bottom: '4vh',
                right: '6vw',
                zIndex: 2,
                display: 'flex',
                alignItems: 'center',
                gap: '16px'
            }}>
                <div style={{
                    width: '40px',
                    height: '1px',
                    background: 'rgba(234, 230, 223, 0.4)',
                }} />
                <span style={{
                    color: 'rgba(234, 230, 223, 0.6)',
                    fontSize: '10px',
                    letterSpacing: '0.25em',
                    textTransform: 'uppercase',
                    fontFamily: '"Helvetica Neue", Helvetica, Arial, sans-serif'
                }}>
                    Scroll
                </span>
            </div>
        </section>
    );
};

export default HeroSection;


// --- FILE: MarqueeTicker.tsx ---

import React from 'react';

const MarqueeTicker: React.FC = () => {
    return (
        <div style={{ background: 'var(--gold)', padding: '14px 0', overflow: 'hidden' }}>
            <style>{`
                @keyframes marquee {
                    from { transform: translateX(0); }
                    to { transform: translateX(-50%); }
                }
                .marquee-inner {
                    animation: marquee 30s linear infinite;
                }
            `}</style>
            <div className="marquee-inner" style={{ display: 'flex', whiteSpace: 'nowrap', width: 'max-content' }}>
                {Array(6).fill('✦  Handwoven Sarees  ✦  GI Tagged Heritage  ✦  Direct from Master Weavers  ✦  Sambalpuri · Bomkai · Ikat  ').map((t, i) => (
                    <span key={i} style={{
                        fontFamily: "'Inter', sans-serif",
                        fontSize: 9,
                        fontWeight: 700,
                        letterSpacing: '0.2em',
                        color: 'var(--ink)',
                        paddingRight: 40,
                    }}>{t}</span>
                ))}
            </div>
        </div>
    );
};

export default MarqueeTicker;


// --- FILE: PillarsSection.tsx ---

import React from 'react';

const pillars = [
    { num: '7+', label: 'Generations', sub: 'of master craft' },
    { num: '15', label: 'Days', sub: 'per single saree' },
    { num: '200+', label: 'Weavers', sub: 'in our collective' },
    { num: '100%', label: 'Authentic', sub: 'GI certified' },
];

const PillarsSection: React.FC = () => {
    return (
        <section style={{ background: 'var(--ink)' }} className="py-12 md:py-24 px-6">
            <div className="max-w-7xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-0 border-y" style={{ borderColor: 'rgba(237,227,208,0.1)' }}>
                {pillars.map((p, i) => (
                    <div key={i} className={`py-8 md:py-12 px-4 text-center ${i < 3 ? 'md:border-r' : ''}`} style={{ borderColor: 'rgba(237,227,208,0.05)' }}>
                        <p className="font-serif text-4xl md:text-5xl mb-2" style={{ color: 'var(--terra)' }}>{p.num}</p>
                        <p className="font-sans text-[10px] md:text-xs font-bold uppercase tracking-[0.2em] mb-1" style={{ color: 'var(--ivory)', fontFamily: "'Playfair Display', serif" }}>{p.label}</p>
                        <p className="font-sans text-[9px] md:text-[11px] tracking-wider capitalize" style={{ color: 'rgba(249,245,238,0.4)', fontFamily: "'Raleway', sans-serif" }}>{p.sub}</p>
                    </div>
                ))}
            </div>
        </section>
    );
};

export default PillarsSection;


// --- FILE: EditorialBanner.tsx ---

import React, { useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';

const EditorialBanner: React.FC = () => {
    const videoRef = useRef<HTMLVideoElement>(null);

    useEffect(() => {
        const observer = new IntersectionObserver(
            (entries) => {
                entries.forEach((entry) => {
                    if (entry.isIntersecting) {
                        videoRef.current?.play().catch(() => {});
                    } else {
                        videoRef.current?.pause();
                    }
                });
            },
            { threshold: 0.1 }
        );

        if (videoRef.current) {
            observer.observe(videoRef.current);
        }

        return () => {
            if (videoRef.current) {
                observer.unobserve(videoRef.current);
            }
        };
    }, []);

    return (
        <section style={{ 
            display: 'flex', 
            flexDirection: 'row', 
            height: '85vh', 
            minHeight: '600px', 
            width: '100%', 
            overflow: 'hidden',
            backgroundColor: '#F9F5EE' // Ivory base
        }}>
            
            {/* Left Column: Ivory Editorial Text Panel */}
            <div style={{ 
                flex: '1 1 50%', 
                height: '100%', 
                backgroundColor: '#F9F5EE', // Premium Ivory
                display: 'flex', 
                flexDirection: 'column', 
                justifyContent: 'center', 
                padding: '0 max(60px, 6vw)',
                boxSizing: 'border-box'
            }}>
                <div style={{ maxWidth: '460px' }}>
                    {/* Brand Identifier */}
                    <span style={{ 
                        display: 'block',
                        fontSize: '11px', 
                        fontWeight: 500, 
                        textTransform: 'uppercase', 
                        letterSpacing: '0.25em', 
                        color: '#706B63', 
                        marginBottom: '32px' 
                    }}>
                        The TANVO Experience
                    </span>

                    {/* Editorial Main Title */}
                    <h2 className="font-sans" style={{ 
                        fontSize: 'clamp(32px, 3.5vw, 44px)', 
                        fontWeight: 300, 
                        color: '#1C1B1A', 
                        lineHeight: 1.2, 
                        letterSpacing: '-0.01em', 
                        marginBottom: '28px' 
                    }}>
                        Beyond A Saree
                    </h2>

                    {/* Prose Narrative Structure */}
                    <div style={{ 
                        fontSize: '15px', 
                        lineHeight: '1.8', 
                        color: '#4A4640', 
                        fontWeight: 300, 
                        letterSpacing: '0.01em',
                        marginBottom: '48px' 
                    }}>
                        <p style={{ margin: '0 0 8px 0' }}>A piece of heritage.</p>
                        <p style={{ margin: '0 0 8px 0' }}>A story of craftsmanship.</p>
                        <p style={{ margin: '0' }}>A connection between artisan and wearer.</p>
                    </div>

                    {/* Minimalist Editorial Action Element */}
                    <div>
                        <Link 
                            to="/shop" 
                            style={{ 
                                display: 'inline-flex', 
                                alignItems: 'center', 
                                gap: '12px',
                                fontSize: '13px',
                                fontWeight: 500,
                                textTransform: 'uppercase',
                                letterSpacing: '0.15em',
                                color: '#1C1B1A',
                                textDecoration: 'none',
                                borderBottom: '1px solid #1C1B1A',
                                paddingBottom: '6px',
                                transition: 'opacity 0.3s ease',
                                borderRadius: '0px' 
                            }}
                            onMouseEnter={(e) => e.currentTarget.style.opacity = '0.7'}
                            onMouseLeave={(e) => e.currentTarget.style.opacity = '1'}
                        >
                            Explore the Collection <ArrowRight size={15} strokeWidth={1.5} />
                        </Link>
                    </div>
                </div>
            </div>

            {/* Right Column: Visual Canvas */}
            <div style={{ 
                position: 'relative', 
                flex: '1 1 50%', 
                height: '100%', 
                overflow: 'hidden',
                display: 'block'
            }}>
                <video
                    ref={videoRef}
                    muted
                    loop
                    playsInline
                    style={{
                        width: '100%',
                        height: '100%',
                        objectFit: 'cover',
                        position: 'absolute',
                        top: 0,
                        left: 0,
                    }}
                >
                    <source src="/A_cinematic_couture_beauty_fil.mp4" type="video/mp4" />
                    Your browser does not support the video tag.
                </video>
                
                {/* Subtle, soft vignette overlay to give the video an editorial tone */}
                <div style={{
                    position: 'absolute',
                    inset: 0,
                    background: 'rgba(0, 0, 0, 0.04)',
                }} />
            </div>

        </section>
    );
};

export default EditorialBanner;

// --- FILE: CategoryGrid.tsx ---

// import React, { useRef, useEffect, useState } from 'react';
// import { Link } from 'react-router-dom';
// import { ArrowUpRight } from 'lucide-react';

// const categories = [
//     { label: 'Sambalpuri', sub: 'GI Tagged', slug: 'Sambalpuri', num: '01', image: '/Sambalpuri saree.png' },
//     { label: 'Bomkai', sub: 'Temple Weave', slug: 'Bomkai', num: '02', image: '/Bomkai saree.png' },
//     { label: 'Ikat', sub: 'Tie & Dye', slug: 'Ikat', num: '03', image: '/Ikat saree.png' },
//     { label: 'Silk', sub: 'Pure Mulberry', slug: 'Silk', num: '04', image: '/silk saree.png' },
//     { label: 'Cotton', sub: 'Handspun', slug: 'Cotton', num: '05', image: '/cotton saree.png' },
//     { label: 'Khandua', sub: 'Sacred Weave', slug: 'Khandua', num: '06', image: '/Khandua saree.png' },
// ];

// const CategoryGrid: React.FC = () => {
//     const [hoveredIdx, setHoveredIdx] = useState<number | null>(null);
//     const [visible, setVisible] = useState(false);
//     const sectionRef = useRef<HTMLElement>(null);

//     useEffect(() => {
//         const observer = new IntersectionObserver(
//             ([entry]) => { if (entry.isIntersecting) setVisible(true); },
//             { threshold: 0.1 }
//         );
//         if (sectionRef.current) observer.observe(sectionRef.current);
//         return () => observer.disconnect();
//     }, []);

//     return (
//         <>
//             <style>{`
//                 .cg-section {
//                     padding: clamp(80px, 10vw, 140px) clamp(20px, 6vw, 96px);
//                     background: var(--ivory);
//                     position: relative;
//                     overflow: hidden;
//                 }

//                 .cg-topline {
//                     width: 100%;
//                     height: 1px;
//                     background: linear-gradient(90deg, transparent, var(--ivory-deep), transparent);
//                     margin-bottom: clamp(48px, 6vw, 80px);
//                 }

//                 .cg-header {
//                     display: flex;
//                     justify-content: space-between;
//                     align-items: flex-end;
//                     margin-bottom: clamp(48px, 6vw, 80px);
//                     flex-wrap: wrap;
//                     gap: 24px;
//                 }

//                 .cg-title {
//                     font-family: 'Cormorant Garamond', serif;
//                     font-size: clamp(44px, 5.5vw, 80px);
//                     font-weight: 300;
//                     color: var(--ink);
//                     line-height: 0.95;
//                     letter-spacing: -0.02em;
//                     margin: 0;
//                 }
//                 .cg-title em {
//                     font-style: italic;
//                     color: var(--terra);
//                 }

//                 .cg-view-all {
//                     display: inline-flex;
//                     align-items: center;
//                     gap: 10px;
//                     font-family: 'Cinzel', serif;
//                     font-size: 9px;
//                     letter-spacing: 0.28em;
//                     text-transform: uppercase;
//                     color: var(--ink);
//                     text-decoration: none;
//                     border: 1px solid rgba(28,22,18,0.25);
//                     padding: 13px 26px;
//                     position: relative;
//                     overflow: hidden;
//                     transition: color 0.4s ease, border-color 0.4s ease;
//                     white-space: nowrap;
//                 }
//                 .cg-view-all::before {
//                     content: '';
//                     position: absolute;
//                     inset: 0;
//                     background: var(--ink);
//                     transform: scaleX(0);
//                     transform-origin: left;
//                     transition: transform 0.4s cubic-bezier(0.76, 0, 0.24, 1);
//                 }
//                 .cg-view-all:hover::before { transform: scaleX(1); }
//                 .cg-view-all:hover { color: var(--ivory); border-color: var(--ink); }
//                 .cg-view-all span { position: relative; z-index: 1; display: flex; align-items: center; gap: 10px; }

//                 .cg-grid {
//                     display: grid;
//                     grid-template-columns: 1.2fr 0.9fr 1fr;
//                     grid-template-rows: auto auto;
//                     gap: 3px;
//                 }

//                 .cg-item {
//                     position: relative;
//                     display: block;
//                     overflow: hidden;
//                     text-decoration: none;
//                     cursor: pointer;
//                     background: var(--ivory-deep);
//                 }

//                 .cg-item:nth-child(1) { aspect-ratio: 3/4; }
//                 .cg-item:nth-child(2) { aspect-ratio: 4/5; align-self: end; }
//                 .cg-item:nth-child(3) { aspect-ratio: 2/3; grid-row: 1 / 3; align-self: stretch; }
//                 .cg-item:nth-child(4) { aspect-ratio: 4/3; }
//                 .cg-item:nth-child(5) { aspect-ratio: 4/3; }
//                 .cg-item:nth-child(6) { display: none; }

//                 .cg-item img {
//                     width: 100%;
//                     height: 100%;
//                     object-fit: cover;
//                     display: block;
//                     opacity: 0.82;
//                     transition: transform 0.9s cubic-bezier(0.25, 0.46, 0.45, 0.94), opacity 0.6s ease;
//                     transform: scale(1.03);
//                 }
//                 .cg-item:hover img {
//                     opacity: 0.95;
//                     transform: scale(1.0);
//                 }

//                 .cg-overlay {
//                     position: absolute;
//                     inset: 0;
//                     background: linear-gradient(
//                         160deg,
//                         rgba(28,22,18,0.0) 0%,
//                         rgba(28,22,18,0.0) 40%,
//                         rgba(28,22,18,0.65) 100%
//                     );
//                     transition: opacity 0.5s ease;
//                 }

//                 .cg-corner {
//                     position: absolute;
//                     top: 16px; right: 16px;
//                     width: 18px; height: 18px;
//                     border-top: 1px solid rgba(249,245,238,0.7);
//                     border-right: 1px solid rgba(249,245,238,0.7);
//                     opacity: 0;
//                     transform: scale(0.6) translate(4px, -4px);
//                     transition: opacity 0.4s ease 0.1s, transform 0.4s ease 0.1s;
//                 }
//                 .cg-item:hover .cg-corner { opacity: 1; transform: scale(1) translate(0,0); }

//                 .cg-text {
//                     position: absolute;
//                     bottom: 0; left: 0; right: 0;
//                     padding: clamp(14px, 2.5vw, 24px);
//                     transform: translateY(5px);
//                     transition: transform 0.5s cubic-bezier(0.25, 0.46, 0.45, 0.94);
//                 }
//                 .cg-item:hover .cg-text { transform: translateY(0); }

//                 .cg-num {
//                     font-family: 'Cinzel', serif;
//                     font-size: 8px;
//                     color: rgba(249,245,238,0.6);
//                     letter-spacing: 0.3em;
//                     margin-bottom: 6px;
//                     display: block;
//                 }
//                 .cg-label {
//                     font-family: 'Cormorant Garamond', serif;
//                     font-size: clamp(20px, 2.5vw, 32px);
//                     font-weight: 400;
//                     color: var(--ivory);
//                     line-height: 1;
//                     margin-bottom: 4px;
//                 }
//                 .cg-sub {
//                     font-family: 'Raleway', sans-serif;
//                     font-size: 8px;
//                     color: rgba(249,245,238,0.45);
//                     letter-spacing: 0.2em;
//                     text-transform: uppercase;
//                     font-weight: 300;
//                 }

//                 .cg-shine {
//                     position: absolute; inset: 0;
//                     background: linear-gradient(105deg, transparent 35%, rgba(255,255,255,0.06) 50%, transparent 65%);
//                     transform: translateX(-100%);
//                     transition: transform 0s;
//                 }
//                 .cg-item:hover .cg-shine {
//                     transform: translateX(100%);
//                     transition: transform 0.8s ease;
//                 }

//                 .cg-item {
//                     opacity: 0;
//                     transform: translateY(20px);
//                     transition:
//                         opacity 0.7s ease,
//                         transform 0.7s cubic-bezier(0.25, 0.46, 0.45, 0.94),
//                         box-shadow 0.4s ease;
//                 }
//                 .cg-item.visible {
//                     opacity: 1;
//                     transform: translateY(0);
//                 }
//                 .cg-item:hover {
//                     box-shadow: 0 8px 40px rgba(28,22,18,0.25);
//                     z-index: 2;
//                 }
//                 .cg-item:nth-child(1) { transition-delay: 0.05s; }
//                 .cg-item:nth-child(2) { transition-delay: 0.15s; }
//                 .cg-item:nth-child(3) { transition-delay: 0.1s; }
//                 .cg-item:nth-child(4) { transition-delay: 0.2s; }
//                 .cg-item:nth-child(5) { transition-delay: 0.25s; }
//                 .cg-item:nth-child(6) { transition-delay: 0.3s; }

//                 .cg-sixth-strip {
//                     margin-top: 3px;
//                     position: relative;
//                     display: flex;
//                     align-items: center;
//                     gap: 3px;
//                 }
//                 .cg-sixth-card {
//                     flex: 1;
//                     height: 148px;
//                     position: relative;
//                     overflow: hidden;
//                     display: block;
//                     text-decoration: none;
//                     background: var(--ivory-deep);
//                     opacity: 0;
//                     transform: translateY(20px);
//                     transition: opacity 0.7s ease 0.3s, transform 0.7s cubic-bezier(0.25,0.46,0.45,0.94) 0.3s, box-shadow 0.4s ease;
//                 }
//                 .cg-sixth-card.visible { opacity: 1; transform: translateY(0); }
//                 .cg-sixth-card img {
//                     width: 100%; height: 100%;
//                     object-fit: cover; opacity: 0.75;
//                     transition: transform 0.9s ease, opacity 0.5s ease;
//                     transform: scale(1.04);
//                 }
//                 .cg-sixth-card:hover img { opacity: 0.9; transform: scale(1.0); }
//                 .cg-sixth-card:hover { box-shadow: 0 8px 40px rgba(28,22,18,0.2); }
//                 .cg-sixth-overlay {
//                     position: absolute; inset: 0;
//                     background: linear-gradient(to right, rgba(28,22,18,0.65) 0%, rgba(28,22,18,0.1) 100%);
//                 }
//                 .cg-sixth-text { position: absolute; left: 22px; top: 50%; transform: translateY(-50%); }

//                 @media (max-width: 768px) {
//                     .cg-grid {
//                         grid-template-columns: 1fr 1fr;
//                         grid-template-rows: auto;
//                         gap: 3px;
//                     }
//                     .cg-item:nth-child(1) { aspect-ratio: 3/4; }
//                     .cg-item:nth-child(2) { aspect-ratio: 3/4; align-self: auto; }
//                     .cg-item:nth-child(3) { grid-column: 1 / -1; grid-row: auto; aspect-ratio: 16/9; }
//                     .cg-item:nth-child(4) { aspect-ratio: 3/4; }
//                     .cg-item:nth-child(5) { aspect-ratio: 3/4; }
//                     .cg-item:nth-child(6) { display: block; grid-column: 1 / -1; aspect-ratio: 16/9; }
//                     .cg-sixth-strip { display: none; }
//                 }

//                 @media (max-width: 480px) {
//                     .cg-grid { grid-template-columns: 1fr; }
//                     .cg-item:nth-child(n) { aspect-ratio: 4/3 !important; grid-column: auto !important; grid-row: auto !important; }
//                 }
//             `}</style>

//             <section className="cg-section" ref={sectionRef}>
//                 <div className="cg-topline" />

//                 <div className="cg-header">
//                     <div>
//                         <p className="section-label" style={{ marginBottom: 18 }}>Explore By Weave</p>
//                         <h2 className="cg-title">
//                             Six Ancient<br /><em>Traditions</em>
//                         </h2>
//                     </div>
//                     <Link to="/shop" className="cg-view-all">
//                         <span>View All Collections <ArrowUpRight size={13} /></span>
//                     </Link>
//                 </div>

//                 {/* Main 5-cell grid */}
//                 <div className="cg-grid">
//                     {categories.slice(0, 5).map((cat, idx) => (
//                         <Link
//                             key={idx}
//                             to={`/shop?weave=${cat.slug}`}
//                             className={`cg-item${visible ? ' visible' : ''}`}
//                             onMouseEnter={() => setHoveredIdx(idx)}
//                             onMouseLeave={() => setHoveredIdx(null)}
//                         >
//                             <img src={cat.image} alt={cat.label} />
//                             <div className="cg-overlay" />
//                             <div className="cg-shine" />
//                             <div className="cg-corner" />
//                             <div className="cg-text">
//                                 <span className="cg-num">{cat.num}</span>
//                                 <h3 className="cg-label">{cat.label}</h3>
//                                 <p className="cg-sub">{cat.sub}</p>
//                             </div>
//                         </Link>
//                     ))}

//                     {/* 6th visible only on mobile */}
//                     <Link
//                         to={`/shop?weave=${categories[5].slug}`}
//                         className={`cg-item${visible ? ' visible' : ''}`}
//                     >
//                         <img src={categories[5].image} alt={categories[5].label} />
//                         <div className="cg-overlay" />
//                         <div className="cg-shine" />
//                         <div className="cg-text">
//                             <span className="cg-num">{categories[5].num}</span>
//                             <h3 className="cg-label">{categories[5].label}</h3>
//                             <p className="cg-sub">{categories[5].sub}</p>
//                         </div>
//                     </Link>
//                 </div>

//                 {/* 6th as wide strip on desktop */}
//                 <div className="cg-sixth-strip">
//                     <Link
//                         to={`/shop?weave=${categories[5].slug}`}
//                         className={`cg-sixth-card${visible ? ' visible' : ''}`}
//                     >
//                         <img src={categories[5].image} alt={categories[5].label} />
//                         <div className="cg-sixth-overlay" />
//                         <div className="cg-sixth-text">
//                             <span className="cg-num">{categories[5].num}</span>
//                             <h3 className="cg-label" style={{ fontSize: 'clamp(18px,2vw,26px)' }}>{categories[5].label}</h3>
//                             <p className="cg-sub">{categories[5].sub}</p>
//                         </div>
//                     </Link>
//                 </div>
//             </section>
//         </>
//     );
// };

// export default CategoryGrid;
import React, { useRef, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowUpRight } from 'lucide-react';

const categories = [
  {
    label: 'Sambalpuri',
    sub: 'GI Tagged',
    slug: 'Sambalpuri',
    num: '01',
    image: '/Sambalpuri saree.png',
    mobileImage: '/Sambalpuri-mobile.png'
  },
  {
    label: 'Bomkai',
    sub: 'Temple Weave',
    slug: 'Bomkai',
    num: '02',
    image: '/Bomkai saree.png',
    mobileImage: '/Bomkai-mobile.png'
  },
  {
    label: 'Ikat',
    sub: 'Tie & Dye',
    slug: 'Ikat',
    num: '03',
    image: '/Ikat saree.png',
    mobileImage: '/Ikat-mobile.png'
  },
  {
    label: 'Silk',
    sub: 'Pure Mulberry',
    slug: 'Silk',
    num: '04',
    image: '/silk saree.png',
    mobileImage: '/silk-mobile.png'
  },
  {
    label: 'Cotton',
    sub: 'Handspun',
    slug: 'Cotton',
    num: '05',
    image: '/cotton saree.png',
    mobileImage: '/cotton-mobile.png'
  },
  {
    label: 'Fancy',
    sub: 'For Modern Girls',
    slug: 'Fancy',
    num: '06',
    image: '/Fancy saree.png',
    mobileImage: '/Fancy-mobile.png'
  },
  {
    label: 'Khandua',
    sub: 'Sacred Weave',
    slug: 'Khandua',
    num: '07',
    image: '/Khandua saree.png',
    mobileImage: '/Khandua-mobile.png'
  },
];

const CategoryGrid: React.FC = () => {
  const [visible, setVisible] = useState(false);
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const io = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) setVisible(true); },
      { threshold: 0.08 }
    );
    if (sectionRef.current) io.observe(sectionRef.current);
    return () => io.disconnect();
  }, []);

  // fancy = index 5, khandua = index 6
  // we want mobile order: ..., Silk, Fancy, Cotton, Khandua
  // gridCats indices: 0:Sam, 1:Bom, 2:Ikat, 3:Silk, 4:Fancy(index 5), 5:Cotton(index 4), 6:Khandua(index 6)
  const gridCats = [
    categories[0], categories[1], categories[2], categories[3],
    categories[5], categories[4], categories[6]
  ];
  const fancy = categories[5];

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,400;0,500;1,400&family=DM+Sans:wght@300;400;500&display=swap');

        /* ── SECTION ── */
        .cg-section {
          padding: clamp(64px, 9vw, 120px) clamp(20px, 6vw, 88px);
          background: #F9F5EE;
          position: relative;
          overflow: hidden;
        }

        /* ── HEADER ── */
        .cg-header {
          display: flex;
          justify-content: space-between;
          align-items: flex-end;
          margin-bottom: clamp(36px, 5vw, 60px);
          flex-wrap: wrap;
          gap: 20px;
        }
        .cg-eyebrow {
          display: flex;
          align-items: center;
          gap: 10px;
          font-family: 'DM Sans', sans-serif;
          font-size: 10px;
          font-weight: 500;
          letter-spacing: 0.25em;
          text-transform: uppercase;
          color: #B5502B;
          margin-bottom: 14px;
        }
        .cg-eyebrow::before {
          content: '';
          width: 24px; height: 1px;
          background: #B5502B;
          display: block;
        }
        .cg-title {
          font-family: 'Playfair Display', Georgia, serif;
          font-size: clamp(40px, 5.5vw, 72px);
          font-weight: 400;
          color: #1C1612;
          line-height: 0.94;
          letter-spacing: -0.02em;
        }
        .cg-title em {
          font-style: italic;
          color: #B5502B;
        }
        .cg-cta {
          display: inline-flex;
          align-items: center;
          gap: 8px;
          font-family: 'DM Sans', sans-serif;
          font-size: 10px;
          font-weight: 500;
          letter-spacing: 0.2em;
          text-transform: uppercase;
          color: #1C1612;
          padding: 13px 26px;
          border: 1px solid #1C1612;
          position: relative;
          overflow: hidden;
          transition: color 0.35s ease;
          white-space: nowrap;
          text-decoration: none;
        }
        .cg-cta::before {
          content: '';
          position: absolute; inset: 0;
          background: #1C1612;
          transform: scaleX(0);
          transform-origin: left;
          transition: transform 0.4s cubic-bezier(0.76,0,0.24,1);
        }
        .cg-cta:hover::before { transform: scaleX(1); }
        .cg-cta:hover { color: #F9F5EE; }
        .cg-cta span { position: relative; z-index: 1; display: flex; align-items: center; gap: 8px; }

        /* ─────────────────────────────────────────
           FANCY TOP BANNER (desktop only)
           Shown ABOVE the main grid
        ───────────────────────────────────────── */
        .cg-fancy-banner {
          display: block;
          position: relative;
          overflow: hidden;
          background: #EDE3D0;
          text-decoration: none;
          height: 200px;
          margin-bottom: 6px;
          opacity: 0;
          transform: translateY(16px);
          transition:
            opacity 0.7s cubic-bezier(0.25,0.46,0.45,0.94) 0s,
            transform 0.7s cubic-bezier(0.25,0.46,0.45,0.94) 0s,
            box-shadow 0.35s ease;
        }
        .cg-fancy-banner.vis { opacity: 1; transform: translateY(0); }
        .cg-fancy-banner:hover { box-shadow: 0 14px 44px rgba(28,22,18,0.14); z-index: 2; }

        /* fancy badge — top-right, always visible on banner */
        .cg-fancy-badge {
          position: absolute;
          top: 18px; right: 18px;
          font-family: 'DM Sans', sans-serif;
          font-size: 9px;
          font-weight: 500;
          letter-spacing: 0.22em;
          text-transform: uppercase;
          color: #B5502B;
          border: 1px solid #B5502B;
          padding: 5px 12px;
          background: rgba(249,245,238,0.12);
          backdrop-filter: blur(4px);
          opacity: 0;
          transform: translateY(-6px);
          transition: opacity 0.35s ease 0.08s, transform 0.35s ease 0.08s;
        }
        .cg-fancy-banner:hover .cg-fancy-badge {
          opacity: 1;
          transform: translateY(0);
        }

        /* fancy banner text — right-aligned for modern feel */
        .cg-fancy-txt {
          position: absolute;
          bottom: 0; right: 0;
          padding: clamp(18px, 3vw, 34px);
          text-align: right;
          transform: translateY(4px);
          transition: transform 0.45s cubic-bezier(0.25,0.46,0.45,0.94);
        }
        .cg-fancy-banner:hover .cg-fancy-txt { transform: translateY(0); }

        /* fancy banner veil — reversed gradient (left transparent, right dark) */
        .cg-fancy-veil {
          position: absolute; inset: 0;
          background: linear-gradient(
            to left,
            rgba(28,22,18,0.72) 0%,
            rgba(28,22,18,0.08) 55%
          );
          transition: background 0.4s ease;
        }
        .cg-fancy-banner:hover .cg-fancy-veil {
          background: linear-gradient(
            to left,
            rgba(28,22,18,0.86) 0%,
            rgba(28,22,18,0.16) 55%
          );
        }

        /* hide fancy banner on mobile/tablet — it lives in the grid there */
        @media (max-width: 1024px) {
          .cg-fancy-banner { display: none; }
        }

        /* ─────────────────────────────────────────
           MAIN GRID
           Desktop: 3-col  [ hero ] [ 2×2 ] + bottom banner
           Mobile card order: 1-5 (grid), then fancy card, then khandua banner
        ───────────────────────────────────────── */
        .cg-grid {
          display: grid;
          grid-template-columns: 1.2fr 0.9fr 0.9fr;
          grid-template-rows: 1fr 1fr auto;
          gap: 6px;
        }

        /* desktop grid positions for gridCats (cards 1-7) */
        .cg-card-1 { grid-column: 1; grid-row: 1 / 3; }
        .cg-card-2 { grid-column: 2; grid-row: 1; }
        .cg-card-3 { grid-column: 3; grid-row: 1; }
        .cg-card-4 { grid-column: 2; grid-row: 2; }
        .cg-card-5 { display: none; } /* Fancy - top banner on desktop */
        .cg-card-6 { grid-column: 3; grid-row: 2; } /* Cotton */
        .cg-card-7 { grid-column: 1 / -1; grid-row: 3; height: 160px; }

        /* shared card */
        .cg-card {
          display: block;
          position: relative;
          overflow: hidden;
          background: #EDE3D0;
          text-decoration: none;
          opacity: 0;
          transform: translateY(20px);
          transition:
            opacity 0.7s cubic-bezier(0.25,0.46,0.45,0.94),
            transform 0.7s cubic-bezier(0.25,0.46,0.45,0.94),
            box-shadow 0.35s ease;
        }
        .cg-card.vis { opacity: 1; transform: translateY(0); }

        .cg-card-1 { transition-delay: 0.04s; }
        .cg-card-2 { transition-delay: 0.10s; }
        .cg-card-3 { transition-delay: 0.16s; }
        .cg-card-4 { transition-delay: 0.22s; }
        .cg-card-5 { transition-delay: 0.28s; }
        .cg-card-6 { transition-delay: 0.34s; }
        .cg-card-7 { transition-delay: 0.40s; }

        .cg-card:hover { box-shadow: 0 14px 44px rgba(28,22,18,0.14); z-index: 2; }

        @media (min-width: 1025px) {
          .cg-card-1 { aspect-ratio: unset; }
          .cg-card-2,
          .cg-card-3,
          .cg-card-4,
          .cg-card-6 { aspect-ratio: 4/3; }
        }

        /* ── IMAGES ── */
        .cg-img-desk,
        .cg-img-mob {
          position: absolute;
          inset: 0;
          width: 100%; height: 100%;
          object-fit: cover;
          transition: transform 0.85s cubic-bezier(0.25,0.46,0.45,0.94), opacity 0.5s ease;
          transform: scale(1.05);
          opacity: 0.82;
        }
        @media (min-width: 769px) {
          .cg-img-desk { display: block; }
          .cg-img-mob  { display: none; }
        }
        @media (max-width: 768px) {
          .cg-img-desk { display: none; }
          .cg-img-mob  { display: block; }
        }
        .cg-card:hover .cg-img-desk,
        .cg-card:hover .cg-img-mob,
        .cg-fancy-banner:hover .cg-img-desk {
          transform: scale(1.0);
          opacity: 0.92;
        }

        /* ── OVERLAY ── */
        .cg-veil {
          position: absolute; inset: 0;
          background: linear-gradient(
            160deg,
            rgba(249,245,238,0) 40%,
            rgba(28,22,18,0.65) 100%
          );
          transition: background 0.4s ease;
        }
        .cg-card-6 .cg-veil {
          background: linear-gradient(
            to right,
            rgba(28,22,18,0.70) 0%,
            rgba(28,22,18,0.10) 55%
          );
        }
        .cg-card:hover .cg-veil {
          background: linear-gradient(
            160deg,
            rgba(249,245,238,0) 28%,
            rgba(28,22,18,0.80) 100%
          );
        }
        .cg-card-6:hover .cg-veil {
          background: linear-gradient(
            to right,
            rgba(28,22,18,0.82) 0%,
            rgba(28,22,18,0.18) 55%
          );
        }

        /* terracotta line */
        .cg-line {
          position: absolute;
          top: 0; left: 0; right: 0;
          height: 2px;
          background: #B5502B;
          transform: scaleX(0);
          transform-origin: left;
          transition: transform 0.5s cubic-bezier(0.25,0.46,0.45,0.94);
        }
        .cg-card:hover .cg-line,
        .cg-fancy-banner:hover .cg-line { transform: scaleX(1); }

        /* arrow badge */
        .cg-badge {
          position: absolute;
          top: 14px; right: 14px;
          width: 32px; height: 32px;
          background: #F9F5EE;
          display: flex;
          align-items: center;
          justify-content: center;
          color: #1C1612;
          opacity: 0;
          transform: translateY(-8px) scale(0.85);
          transition: opacity 0.3s ease 0.05s, transform 0.3s cubic-bezier(0.25,0.46,0.45,0.94) 0.05s;
        }
        .cg-card:hover .cg-badge { opacity: 1; transform: translateY(0) scale(1); }

        /* ── TEXT ── */
        .cg-txt {
          position: absolute;
          bottom: 0; left: 0; right: 0;
          padding: clamp(14px, 2vw, 22px);
          transform: translateY(4px);
          transition: transform 0.45s cubic-bezier(0.25,0.46,0.45,0.94);
        }
        .cg-card-6 .cg-txt {
          top: 0;
          display: flex;
          flex-direction: column;
          justify-content: center;
          padding: clamp(16px, 3vw, 32px);
          transform: none;
        }
        .cg-card:hover .cg-txt { transform: translateY(0); }
        .cg-card-6:hover .cg-txt { transform: none; }

        .cg-num {
          display: block;
          font-family: 'DM Sans', sans-serif;
          font-size: 9px;
          letter-spacing: 0.3em;
          color: #B5502B;
          margin-bottom: 5px;
        }
        .cg-name {
          font-family: 'Playfair Display', Georgia, serif;
          font-size: clamp(18px, 2.2vw, 28px);
          font-weight: 400;
          color: #F9F5EE;
          line-height: 1.05;
          margin: 0 0 4px;
        }
        .cg-sub {
          font-family: 'DM Sans', sans-serif;
          font-size: 8px;
          letter-spacing: 0.2em;
          text-transform: uppercase;
          color: rgba(249,245,238,0.5);
          margin: 0;
        }

        /* ─────────────────────────────────────────
           TABLET  (769px – 1024px)
        ───────────────────────────────────────── */
        @media (max-width: 1024px) and (min-width: 769px) {
          .cg-grid {
            grid-template-columns: 1fr 1fr;
            gap: 5px;
          }
          .cg-card-1, .cg-card-2, .cg-card-3, .cg-card-4, .cg-card-5, .cg-card-6 {
            grid-column: auto;
            grid-row: auto;
            display: block;
            aspect-ratio: 4/5;
          }
          .cg-card-7 {
            grid-column: 1 / -1;
            height: 140px;
          }
          .cg-badge { display: none; }
        }

        /* ─────────────────────────────────────────
           MOBILE  (≤ 768px)
        ───────────────────────────────────────── */
        @media (max-width: 768px) {
          .cg-section { padding: 48px 16px; }
          .cg-grid {
            grid-template-columns: 1fr 1fr;
            gap: 4px;
          }
          .cg-card-1, .cg-card-2, .cg-card-3, .cg-card-4, .cg-card-5, .cg-card-6 {
            grid-column: auto;
            grid-row: auto;
            display: block;
            aspect-ratio: 3/4;
          }
          .cg-card-7 {
            grid-column: 1 / -1;
            height: 130px;
          }
          .cg-badge { display: none; }
          .cg-name { font-size: 18px; }
        }

        @media (max-width: 400px) {
          .cg-card-1, .cg-card-2, .cg-card-3, .cg-card-4, .cg-card-5, .cg-card-6 { aspect-ratio: 3/4; }
          .cg-card-7 { height: 110px; }
        }
      `}</style>

      <section className="cg-section" ref={sectionRef}>
        <div className="cg-header">
          <div>
            <p className="cg-eyebrow">Explore By Weave</p>
            <h2 className="cg-title">Seven Ancient<br /><em>Traditions</em></h2>
          </div>
          <Link to="/shop" className="cg-cta">
            <span>View All Collections <ArrowUpRight size={13} /></span>
          </Link>
        </div>

        {/* ── FANCY BANNER — desktop only, sits above the grid ── */}
        <Link
          to={`/shop?weave=${fancy.slug}`}
          className={`cg-fancy-banner${visible ? ' vis' : ''}`}
        >
          <img
            className="cg-img-desk"
            src={fancy.image}
            alt={fancy.label}
            loading="eager"
          />
          <div className="cg-fancy-veil" />
          <div className="cg-line" />
          <div className="cg-fancy-badge">New Arrivals</div>
          <div className="cg-fancy-txt">
            <span className="cg-num">{fancy.num}</span>
            <h3 className="cg-name">{fancy.label}</h3>
            <p className="cg-sub">{fancy.sub}</p>
          </div>
        </Link>

        {/* ── MAIN GRID — cards 1–5 + khandua banner ── */}
        <div className="cg-grid">
          {gridCats.map((cat, i) => (
            <Link
              key={cat.slug}
              to={`/shop?weave=${cat.slug}`}
              className={`cg-card cg-card-${i + 1}${visible ? ' vis' : ''}`}
            >
              <img
                className="cg-img-desk"
                src={cat.image}
                alt={cat.label}
                loading={i === 0 ? 'eager' : 'lazy'}
              />
              <img
                className="cg-img-mob"
                src={cat.mobileImage}
                alt={cat.label}
                loading="lazy"
              />
              <div className="cg-veil" />
              <div className="cg-line" />
              <div className="cg-badge"><ArrowUpRight size={13} /></div>
              <div className="cg-txt">
                <span className="cg-num">{cat.num}</span>
                <h3 className="cg-name">{cat.label}</h3>
                <p className="cg-sub">{cat.sub}</p>
              </div>
            </Link>
          ))}
        </div>
      </section>
    </>
  );
};

export default CategoryGrid;

// --- FILE: ProductsGrid.tsx ---

import React from 'react';
import { Link } from 'react-router-dom';
import ProductCard from '../../components/ProductCard';

interface ProductsGridProps {
    products: any[];
    label: string;
    title: string;
    titleEm?: string;
    viewAllLink: string;
    viewAllText?: string;
    background?: string;
    emptyMessage?: string;
    inverse?: boolean;
    loading?: boolean;
}

const ProductsGrid: React.FC<ProductsGridProps> = ({
    products,
    label,
    title,
    titleEm,
    viewAllLink,
    viewAllText = 'View All',
    background = 'var(--cream)',
    emptyMessage = 'NEW PIECES ARRIVING SOON',
    inverse = false,
    loading = false,
}) => {
    const textColor = inverse ? 'var(--ivory)' : 'var(--ink)';
    
    return (
        <section className="px-4 py-16 md:px-[6vw] md:py-24" style={{ background }}>
            <div className="mb-8 md:mb-16 flex justify-between items-end flex-wrap gap-6">
                <div>
                    <p className="section-label" style={{ marginBottom: 12, color: inverse ? 'var(--gold)' : undefined }}>{label}</p>
                    <h2 className="font-display" style={{ fontSize: 'clamp(32px, 4.5vw, 60px)', fontWeight: 300, color: textColor, lineHeight: 1.05 }}>
                        {title}{titleEm && <> <em style={{ color: inverse ? 'var(--gold)' : undefined }}>{titleEm}</em></>}
                    </h2>
                </div>
                <Link
                    to={viewAllLink}
                    style={{ fontFamily: "'Inter', sans-serif", fontSize: 9, fontWeight: 700, letterSpacing: '0.2em', color: textColor, textDecoration: 'none', borderBottom: `1px solid ${textColor}`, paddingBottom: 4 }}
                >
                    {viewAllText}
                </Link>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-x-4 gap-y-8 md:gap-x-8 md:gap-y-12">
                {loading ? (
                    <>
                        {[1, 2, 3, 4].map(i => (
                            <div key={i} className="w-full aspect-[3/4] max-[640px]:aspect-[2/3] animate-pulse" style={{ background: inverse ? 'rgba(255,255,255,0.05)' : 'rgba(13,11,10,0.05)' }} />
                        ))}
                    </>
                ) : products.length > 0 ? (
                    products.map(product => <ProductCard key={product._id} product={product} inverse={inverse} />)
                ) : (
                    <div style={{ gridColumn: '1/-1', textAlign: 'center', padding: '80px 0', color: 'rgba(13,11,10,0.35)', fontFamily: 'Montserrat, sans-serif', fontSize: 11, letterSpacing: '0.15em' }}>
                        {emptyMessage}
                    </div>
                )}
            </div>
        </section>
    );
};

export default ProductsGrid;


// --- FILE: IkatDeepDive.tsx ---

import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowUpRight } from 'lucide-react';
import img from '../../public/Ikat Detail.png';

const IkatDeepDive: React.FC = () => {
    return (
        <section className="relative overflow-hidden" style={{ background: 'var(--ink)' }}>
            <div className="grid grid-cols-1 lg:grid-cols-2 min-h-[85vh]">

                {/* Image side */}
                <div className="img-zoom relative overflow-hidden min-h-[400px] lg:min-h-[500px]">
                    <img
                        src={img}
                        alt="Ikat Detail"
                        className="absolute inset-0 w-full h-full object-cover opacity-70"
                    />

                    {/* Hotspot 1 */}
                    <div className="absolute top-[32%] right-[28%] z-10">
                        <div className="hotspot-pulse relative w-7 h-7 rounded-full flex items-center justify-center cursor-pointer group" style={{ background: 'var(--gold)' }}>
                            <span style={{ fontFamily: 'Montserrat, sans-serif', fontSize: 9, fontWeight: 700, color: 'var(--ink)' }}>1</span>
                            <div className="absolute top-9 right-0 md:left-1/2 md:-translate-x-1/2 md:right-auto lg:right-0 lg:left-auto lg:translate-x-0 w-[180px] md:w-[220px] p-4 pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-20" style={{ background: '#F5F0E8' }}>
                                <p style={{ fontSize: 9, fontWeight: 700, color: 'var(--red)', letterSpacing: '0.15em', textTransform: 'uppercase', marginBottom: 6 }}>Double Ikat</p>
                                <p style={{ fontSize: 10, color: 'var(--ink)', lineHeight: 1.6 }}>Both warp and weft tied and dyed before weaving — the rarest technique.</p>
                            </div>
                        </div>
                    </div>

                    {/* Hotspot 2 */}
                    <div className="absolute top-[58%] right-[18%] z-10">
                        <div className="hotspot-pulse relative w-7 h-7 rounded-full flex items-center justify-center cursor-pointer" style={{ background: 'var(--gold)' }}>
                            <span style={{ fontFamily: 'Montserrat, sans-serif', fontSize: 9, fontWeight: 700, color: 'var(--ink)' }}>2</span>
                        </div>
                    </div>
                </div>

                {/* Text side */}
                <div className="flex flex-col justify-center p-8 sm:p-12 lg:p-20 border-t lg:border-t-0 lg:border-l" style={{ borderColor: 'rgba(201,168,76,0.15)' }}>
                    <p className="section-label mb-6 lg:mb-8 text-xs lg:text-sm">The Art of Ikat</p>
                    <h2 className="font-display font-light text-[#F5F0E8] leading-[1.1] mb-6 lg:mb-8 text-4xl sm:text-5xl lg:text-[clamp(40px,4vw,64px)]">
                        Every Thread<br />Tells a<br /><em className="not-italic" style={{ color: 'var(--gold)' }}>Sacred Story</em>
                    </h2>
                    <div className="w-12 h-px mb-6 lg:mb-8" style={{ background: 'var(--gold)' }} />
                    <p className="text-[13px] leading-loose mb-10 lg:mb-12 max-w-[400px]" style={{ color: 'rgba(245,240,232,0.55)' }}>
                        A 7th-generation craft where every thread is meticulously tied and dyed by hand before a single pass of the shuttle. Motifs inspired by the Konark Sun Temple and Lord Jagannath rituals are encoded into each weave.
                    </p>
                    <Link to="/story" className="btn-gold self-start inline-flex items-center gap-2">Learn More <ArrowUpRight size={14} /></Link>
                </div>

            </div>
        </section>
    );
};

export default IkatDeepDive;


// --- FILE: InstagramSection.tsx ---

import React, { useState } from 'react';
import { Instagram, ArrowUpRight } from 'lucide-react';

interface InstagramPost {
    id: number;
    image: string;
    link: string;
}

interface InstagramSectionProps {
    posts?: InstagramPost[];
    handle?: string;
    profileUrl?: string;
}

const InstagramSection: React.FC<InstagramSectionProps> = ({
    posts,
    handle = '#Tanvo',
    profileUrl = 'https://instagram.com',
}) => {
    const [feed] = useState<InstagramPost[]>(
        posts ||
        [1, 2, 3, 4, 5, 6].map(i => ({
            id: i,
            image: `https://picsum.photos/seed/insta${i}x/600/600`,
            link: profileUrl,
        }))
    );

    return (
        <section style={{ background: 'var(--ink)', padding: '100px max(48px, 6vw)' }}>
            <div style={{ textAlign: 'center', marginBottom: 64 }}>
                <p className="section-label" style={{ marginBottom: 16 }}>Community</p>
                <h2 className="font-display" style={{ fontSize: 'clamp(28px, 4vw, 52px)', fontWeight: 300, color: '#F5F0E8', lineHeight: 1.1 }}>
                    Wear it · Share it<br /><em style={{ color: 'var(--gold)' }}>{handle}</em>
                </h2>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(6, 1fr)', gap: 2, marginBottom: 48 }}>
                {feed.map(item => (
                    <a
                        key={item.id}
                        href={item.link}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="group img-zoom"
                        style={{ position: 'relative', aspectRatio: '1', display: 'block', overflow: 'hidden', background: '#111' }}
                    >
                        <img src={item.image} alt="Instagram" className="w-full h-full object-cover opacity-75 group-hover:opacity-100 transition-opacity duration-400" />
                        <div
                            className="absolute inset-0 bg-[rgba(201,168,76,0.25)] opacity-0 group-hover:opacity-100 transition-opacity duration-400 flex items-center justify-center pointer-events-none"
                        >
                            <Instagram size={20} style={{ color: '#F5F0E8' }} />
                        </div>
                    </a>
                ))}
            </div>

            <div style={{ textAlign: 'center' }}>
                <a href={profileUrl} target="_blank" rel="noopener noreferrer" className="btn-outline-gold">
                    Follow on Instagram <ArrowUpRight size={14} />
                </a>
            </div>
        </section>
    );
};

export default InstagramSection;


// --- FILE: TrustBar.tsx ---

import React from 'react';
import { ShieldCheck, Globe, Gem, RotateCcw } from 'lucide-react';

const trustItems = [
    { icon: ShieldCheck, title: '100% Authentic', sub: 'Direct from Loom' },
    { icon: Globe, title: 'Global Shipping', sub: 'Fast & Insured' },
    { icon: Gem, title: 'Premium Fabrics', sub: 'Hand-picked' },
    { icon: RotateCcw, title: '7-Day Returns', sub: 'Hassle Free' },
];

const TrustBar: React.FC = () => {
    return (
        <div style={{ background: 'var(--gold)', padding: '0 max(48px, 6vw)' }}>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))', borderTop: '1px solid rgba(13,11,10,0.15)' }}>
                {trustItems.map((item, i) => (
                    <div key={i} style={{ padding: '32px 24px', textAlign: 'center', borderRight: i < trustItems.length - 1 ? '1px solid rgba(13,11,10,0.15)' : 'none' }}>
                        <span style={{ color: 'var(--ink)', display: 'flex', justifyContent: 'center', marginBottom: 8 }}><item.icon size={20} strokeWidth={1.5} /></span>
                        <p style={{ fontFamily: "'Inter', sans-serif", fontSize: 9, fontWeight: 700, color: 'var(--ink)', letterSpacing: '0.15em', textTransform: 'uppercase', marginBottom: 4 }}>{item.title}</p>
                        <p style={{ fontFamily: "'Inter', sans-serif", fontSize: 8, color: 'rgba(13,11,10,0.6)', letterSpacing: '0.1em' }}>{item.sub}</p>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default TrustBar;


// --- FILE: WhyChooseUs.tsx ---

import React from 'react';
import { motion } from 'framer-motion';
import { ShieldCheck, Tag, Award, Heart } from 'lucide-react';

const reasons = [
    {
        icon: ShieldCheck,
        title: 'Weaver Collectives',
        desc: 'Direct collaboration with over 200 registered artisan families in Maniabandha, Nuapatna, and Barpali.',
        color: '#C9A84C'
    },
    {
        icon: Tag,
        title: 'Fair Price Sourcing',
        desc: 'Eliminating traditional 2-3x retail markups to route 70% of the purchase value directly to weaving households.',
        color: '#C9A84C'
    },
    {
        icon: Award,
        title: 'Registered GI Tagging',
        desc: 'Audited compliance with Geographical Indication tags (Sambalpuri Ikat GI No. 22, Khandua Silk GI No. 132).',
        color: '#C9A84C'
    },
    {
        icon: Heart,
        title: 'Handloom Mark Certified',
        desc: 'Ministry of Textiles validated certification, ensuring 100% manual shuttle operation without powerloom use.',
        color: '#C9A84C'
    }
];

const WhyChooseUs: React.FC = () => {
    return (
        <section style={{ padding: '100px max(48px, 6vw)', background: '#FFFFFF' }}>
            <div style={{ maxWidth: 1200, margin: '0 auto' }}>
                <div style={{ textAlign: 'center', marginBottom: 64 }}>
                    <p className="section-label" style={{ color: 'var(--gold)', letterSpacing: '0.3em', textTransform: 'uppercase', fontSize: 10, fontWeight: 700, marginBottom: 16 }}>The TANVO Promise</p>
                    <h2 style={{ fontFamily: 'Playfair Display, serif', fontSize: 'clamp(40px, 5vw, 64px)', fontWeight: 300, color: 'var(--ink)' }}>
                        Why Choose <span style={{ color: 'var(--gold)', fontStyle: 'italic' }}>TANVO</span>
                    </h2>
                </div>

                <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 md:gap-10">
                    {reasons.map((item, idx) => (
                        <motion.div
                            key={idx}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ delay: idx * 0.1 }}
                            viewport={{ once: true }}
                            className="p-4 md:p-10 bg-white border border-[rgba(201,168,76,0.1)] text-center transition-all duration-300"
                            style={{
                                border: '1px solid rgba(201,168,76,0.1)',
                                textAlign: 'center',
                                transition: 'all 0.3s ease'
                            }}
                            onMouseEnter={(e) => {
                                e.currentTarget.style.borderColor = 'var(--gold)';
                                e.currentTarget.style.transform = 'translateY(-10px)';
                                e.currentTarget.style.boxShadow = '0 20px 40px rgba(201,168,76,0.08)';
                            }}
                            onMouseLeave={(e) => {
                                e.currentTarget.style.borderColor = 'rgba(201,168,76,0.1)';
                                e.currentTarget.style.transform = 'translateY(0)';
                                e.currentTarget.style.boxShadow = 'none';
                            }}
                        >
                            <div style={{
                                width: 48, height: 48, borderRadius: '8px',
                                background: `${item.color}10`, color: item.color,
                                display: 'flex', alignItems: 'center', justifyContent: 'center',
                                margin: '0 auto 16px',
                                border: '1px solid rgba(201,168,76,0.2)'
                            }}>
                                <item.icon className="w-5 h-5 md:w-6 md:h-6" />
                            </div>
                            <h3 className="font-display text-lg md:text-xl mb-2 md:mb-4" style={{ fontFamily: 'Playfair Display, serif', color: 'var(--ink)', fontWeight: 400 }}>{item.title}</h3>
                            <p className="font-sans text-[11px] md:text-sm leading-relaxed" style={{ fontFamily: 'Raleway, sans-serif', color: 'rgba(13,11,10,0.65)' }}>{item.desc}</p>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default WhyChooseUs;


// --- FILE: TrustSignals.tsx ---

import React, { useRef, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Play, Star, Box, Image as ImageIcon, Pause, Shield, Truck, Users, Award } from 'lucide-react';

const trustSections = [
    {
        icon: Play,
        title: 'The Loom Journey',
        desc: 'Follow the making of a TANVO saree — from silk threads and natural dyes to the hands of Odisha master weavers.',
        badge: 'Behind The Craft',
        videoSrc: '/saree quality 2.mp4',
        stats: 'Handwoven Heritage',
        color: '#C9A84C'
    },
    {
        icon: Users,
        title: 'The Weaver Stories',
        desc: 'Meet the artisans, families, and generations preserving Odisha’s timeless weaving traditions.',
        badge: 'Meet The Makers',
        img: '/weaver-story.png',
        stats: 'Generations Of Craft',
        color: '#C9A84C'
    },
    {
        icon: Shield,
        title: 'Authenticity Promise',
        desc: 'Every creation carries details about its weave, origin, fabric, and craftsmanship.',
        badge: 'Certified Heritage',
        img: '/certificate.png',
        stats: 'Craft You Can Trust',
        color: '#C9A84C'
    }
];

const TrustCard: React.FC<{ item: any, idx: number }> = ({ item, idx }) => {
    const videoRef = useRef<HTMLVideoElement>(null);
    const [isHovered, setIsHovered] = useState(false);
    const [isPlaying, setIsPlaying] = useState(false);

    const togglePlay = () => {
        if (item.videoSrc && videoRef.current) {
            if (videoRef.current.paused) {
                videoRef.current.play().catch(() => { });
                setIsPlaying(true);
            } else {
                videoRef.current.pause();
                setIsPlaying(false);
            }
        }
    };

    const handleMouseEnter = () => {
        setIsHovered(true);
        if (item.videoSrc && videoRef.current && !isPlaying) {
            videoRef.current.play().catch(() => { });
            setIsPlaying(true);
        }
    };

    const handleMouseLeave = () => {
        setIsHovered(false);
        if (item.videoSrc && videoRef.current && isPlaying) {
            videoRef.current.pause();
            setIsPlaying(false);
        }
    };

    return (
        <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: idx * 0.15, duration: 0.7, ease: [0.25, 0.1, 0.25, 1] }}
            viewport={{ once: true, margin: "-50px" }}
            className="trust-card"
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
            onClick={togglePlay}
            style={{
                position: 'relative',
                overflow: 'hidden',
                borderRadius: '2px',
                cursor: 'pointer',
                height: '480px',
                boxShadow: '0 20px 40px -12px rgba(0,0,0,0.3)',
                transition: 'transform 0.3s ease, box-shadow 0.3s ease',
            }}
            whileHover={{
                transform: 'translateY(-8px)',
                boxShadow: '0 30px 50px -15px rgba(0,0,0,0.4)',
            }}
        >
            {/* Background Media */}
            <div style={{
                width: '100%',
                height: '100%',
                position: 'relative',
                background: '#1a120b',
                overflow: 'hidden',
            }}>
                {/* Decorative gradient overlay */}
                <div style={{
                    position: 'absolute',
                    top: 0,
                    left: 0,
                    right: 0,
                    height: '40%',
                    background: 'linear-gradient(180deg, rgba(0,0,0,0.4) 0%, rgba(0,0,0,0) 100%)',
                    zIndex: 1,
                    pointerEvents: 'none',
                }} />

                {item.img && (
                    <motion.img
                        src={item.img}
                        alt={item.title}
                        style={{
                            width: '100%',
                            height: '100%',
                            objectFit: 'cover',
                            transition: 'transform 0.8s cubic-bezier(0.33, 1, 0.68, 1)',
                        }}
                        animate={{
                            scale: isHovered ? 1.08 : 1,
                        }}
                        transition={{ duration: 0.8, ease: [0.33, 1, 0.68, 1] }}
                    />
                )}

                {item.videoSrc && (
                    <video
                        ref={videoRef}
                        src={`${item.videoSrc}#t=0.001`}
                        muted
                        loop
                        playsInline
                        preload="metadata"
                        style={{
                            position: 'absolute',
                            top: 0,
                            left: 0,
                            width: '100%',
                            height: '100%',
                            objectFit: 'cover',
                            transition: 'opacity 0.4s ease',
                            opacity: isPlaying ? 1 : 0.95,
                        }}
                    />
                )}

                {/* Content Overlay */}
                <motion.div
                    className="card-overlay"
                    style={{
                        position: 'absolute',
                        inset: 0,
                        background: `linear-gradient(180deg, rgba(0,0,0,0.2) 0%, rgba(0,0,0,0.75) 100%)`,
                        transition: 'background 0.4s ease',
                        display: 'flex',
                        flexDirection: 'column',
                        justifyContent: 'flex-end',
                        padding: '28px',
                        zIndex: 2,
                    }}
                    animate={{
                        background: (isHovered || isPlaying)
                            ? `linear-gradient(180deg, rgba(0,0,0,0.15) 0%, rgba(0,0,0,0.85) 100%)`
                            : `linear-gradient(180deg, rgba(0,0,0,0.3) 0%, rgba(0,0,0,0.7) 100%)`,
                    }}
                >
                    {/* Badge */}
                    <motion.div
                        initial={{ opacity: 0, x: -20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        transition={{ delay: idx * 0.1 + 0.2 }}
                        style={{
                            display: 'inline-flex',
                            alignItems: 'center',
                            gap: '8px',
                            padding: '6px 16px',
                            background: item.color,
                            color: '#1a1a1a',
                            fontSize: '11px',
                            fontWeight: 700,
                            letterSpacing: '0.1em',
                            textTransform: 'uppercase',
                            marginBottom: 20,
                            width: 'fit-content',
                            borderRadius: '2px',
                        }}
                    >
                        <span>✦</span>
                        {item.badge}
                    </motion.div>

                    {/* Title */}
                    <motion.h3
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ delay: idx * 0.1 + 0.3 }}
                        style={{
                            fontFamily: "'Playfair Display', serif",
                            fontSize: '32px',
                            fontWeight: 500,
                            color: '#FFFFFF',
                            marginBottom: 12,
                            lineHeight: 1.2,
                            letterSpacing: '-0.02em',
                        }}
                    >
                        {item.title}
                    </motion.h3>

                    {/* Description */}
                    <motion.p
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ delay: idx * 0.1 + 0.4 }}
                        style={{
                            fontFamily: "'Raleway', sans-serif",
                            fontSize: '13px',
                            color: 'rgba(255,255,255,0.75)',
                            lineHeight: 1.6,
                            marginBottom: 24,
                            maxWidth: '100%',
                        }}
                    >
                        {item.desc}
                    </motion.p>

                    {/* Stats Row */}
                    {item.stats && (
                        <motion.div
                            initial={{ opacity: 0 }}
                            whileInView={{ opacity: 1 }}
                            transition={{ delay: idx * 0.1 + 0.5 }}
                            style={{
                                display: 'flex',
                                alignItems: 'center',
                                gap: '8px',
                                marginBottom: 20,
                                fontSize: '12px',
                                color: item.color,
                                fontWeight: 500,
                                letterSpacing: '0.5px',
                            }}
                        >
                            <Award size={14} />
                            <span>{item.stats}</span>
                        </motion.div>
                    )}

                    {/* Editorial Play Button */}
                    <motion.div
                        initial={{ opacity: 0, y: 10 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ delay: idx * 0.1 + 0.6 }}
                        style={{
                            display: 'flex',
                            alignItems: 'center',
                            gap: '12px',
                            cursor: 'pointer',
                        }}
                    >
                        <div style={{
                            width: 40,
                            height: 40,
                            borderRadius: '2px',
                            border: `1.5px solid ${item.color}`,
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            color: '#FFFFFF',
                            background: (isHovered || isPlaying) ? item.color : 'rgba(0,0,0,0.3)',
                            backdropFilter: 'blur(8px)',
                            transition: 'all 0.3s ease',
                        }}>
                            {isPlaying ? <Pause size={14} fill="white" /> : <item.icon size={14} fill="white" />}
                        </div>
                        <span style={{
                            fontFamily: "'Raleway', sans-serif",
                            fontSize: '11px',
                            fontWeight: 700,
                            letterSpacing: '0.2em',
                            color: '#FFFFFF',
                            textTransform: 'uppercase',
                        }}>
                            {isPlaying ? 'PAUSE STORY' : 'WATCH STORY'}
                        </span>
                    </motion.div>
                </motion.div>
            </div>
        </motion.div>
    );
};

const TrustSignals: React.FC = () => {
    return (
        <section className="trust-signals-section" style={{
            padding: '80px 0',
            background: '#0D0B0A',
            position: 'relative',
            overflow: 'hidden',
        }}>
            {/* Background Texture */}
            <div style={{
                position: 'absolute',
                top: 0,
                left: 0,
                right: 0,
                bottom: 0,
                backgroundImage: `radial-gradient(circle at 20% 40%, rgba(201, 168, 76, 0.03) 0%, transparent 50%)`,
                pointerEvents: 'none',
            }} />

            <div style={{
                maxWidth: 1400,
                margin: '0 auto',
                padding: '0 5%',
            }}>
                {/* Section Header */}
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6 }}
                    viewport={{ once: true }}
                    style={{
                        display: 'flex',
                        justifyContent: 'space-between',
                        alignItems: 'flex-end',
                        flexWrap: 'wrap',
                        gap: '32px',
                        marginBottom: '64px',
                    }}
                >
                    <div style={{ maxWidth: 640 }}>
                        <motion.p
                            initial={{ opacity: 0 }}
                            whileInView={{ opacity: 1 }}
                            transition={{ delay: 0.1 }}
                            style={{
                                color: '#C9A84C',
                                letterSpacing: '0.3em',
                                textTransform: 'uppercase',
                                fontSize: '11px',
                                fontWeight: 600,
                                marginBottom: 16,
                            }}
                        >
                            Worn Across Generations
                        </motion.p>
                        <motion.h2
                            initial={{ opacity: 0 }}
                            whileInView={{ opacity: 1 }}
                            transition={{ delay: 0.2 }}
                            style={{
                                fontFamily: "'Playfair Display', serif",
                                fontSize: 'clamp(40px, 6vw, 64px)',
                                fontWeight: 400,
                                color: '#FFFFFF',
                                lineHeight: 1.1,
                            }}
                        >
                            The Story Behind{' '}
                            <span style={{
                                color: '#C9A84C',
                                fontStyle: 'italic',
                                position: 'relative',
                                display: 'inline-block',
                            }}>
                                Every Saree
                                <span style={{
                                    position: 'absolute',
                                    bottom: 8,
                                    left: 0,
                                    right: 0,
                                    height: '2px',
                                    background: '#C9A84C',
                                    opacity: 0.3,
                                }} />
                            </span>
                        </motion.h2>
                    </div>

                    <motion.p
                        initial={{ opacity: 0, x: 20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.3 }}
                        style={{
                            color: 'rgba(255,255,255,0.6)',
                            maxWidth: 420,
                            fontFamily: "'Raleway', sans-serif",
                            fontSize: '14px',
                            lineHeight: 1.7,
                        }}
                    >
                        We believe in honest craftsmanship. Explore our process, meet our community, and see the care behind every shipment.
                    </motion.p>
                </motion.div>

                {/* Responsive Grid - 3 side by side on desktop, 1 per row on mobile */}
                <div className="trust-grid" style={{
                    display: 'grid',
                    gridTemplateColumns: 'repeat(3, 1fr)',
                    gap: '28px',
                }}>
                    {trustSections.map((item, idx) => (
                        <TrustCard key={idx} item={item} idx={idx} />
                    ))}
                </div>

                {/* Trust Badges Row */}
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.4, duration: 0.6 }}
                    viewport={{ once: true }}
                    style={{
                        display: 'flex',
                        justifyContent: 'center',
                        flexWrap: 'wrap',
                        gap: 'clamp(20px, 4vw, 60px)',
                        marginTop: '70px',
                        paddingTop: '40px',
                        borderTop: '1px solid rgba(201, 168, 76, 0.15)',
                    }}
                >
                    {[
                        { icon: Shield, text: 'Authenticity Guaranteed' },
                        { icon: Truck, text: 'Free Shipping Worldwide' },
                        { icon: Users, text: '24/7 Customer Support' },
                        { icon: Award, text: 'Handcrafted with Love' },
                    ].map((badge, i) => (
                        <motion.div
                            key={i}
                            initial={{ opacity: 0, scale: 0.9 }}
                            whileInView={{ opacity: 1, scale: 1 }}
                            transition={{ delay: 0.5 + i * 0.05 }}
                            viewport={{ once: true }}
                            whileHover={{ y: -3 }}
                            style={{
                                display: 'flex',
                                alignItems: 'center',
                                gap: '12px',
                                color: 'rgba(255,255,255,0.7)',
                                fontSize: '13px',
                                fontWeight: 500,
                                fontFamily: "'Raleway', sans-serif",
                                letterSpacing: '0.5px',
                            }}
                        >
                            <div style={{
                                width: 36,
                                height: 36,
                                borderRadius: '2px',
                                background: 'rgba(201, 168, 76, 0.1)',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                color: '#C9A84C',
                            }}>
                                <badge.icon size={18} />
                            </div>
                            <span>{badge.text}</span>
                        </motion.div>
                    ))}
                </motion.div>
            </div>

            {/* Responsive Styles */}
            <style>{`
                @media (max-width: 1024px) {
                    .trust-grid {
                        grid-template-columns: repeat(2, 1fr) !important;
                        gap: 24px !important;
                    }
                }
                
                @media (max-width: 768px) {
                    .trust-signals-section {
                        padding: 60px 0 !important;
                    }
                    
                    .trust-grid {
                        grid-template-columns: 1fr !important;
                        gap: 24px !important;
                    }
                    
                    .trust-card {
                        height: 440px !important;
                    }
                }
                
                @media (max-width: 480px) {
                    .trust-card {
                        height: 400px !important;
                    }
                }
                
                /* Smooth scroll behavior */
                .trust-signals-section {
                    scroll-margin-top: 80px;
                }
                
                /* Card inner elements transition */
                .trust-card .card-overlay, .trust-card img {
                    transition: all 0.3s ease;
                }
            `}</style>
        </section>
    );
};

export default TrustSignals;

// --- FILE: WhatsAppOrder.tsx ---

import React from 'react';
import { motion } from 'framer-motion';
import WhatsAppConcierge from './WhatsAppConcierge';

const WHATSAPP_NUMBER = "919876543210";

const WhatsAppOrder: React.FC = () => {
  const handleOccasionClick = (occasion: string) => {
    const messages: Record<string, string> = {
      wedding: `Hi TANVO,\n\nI am looking for a *Wedding Saree*.\n\nPlease share your best collections for wedding ceremonies. I'd like to see options, prices, and delivery details.\n\nThank you.`,
      engagement: `Hi TANVO,\n\nI am looking for an *Engagement / Ring Ceremony Saree*.\n\nPlease share suitable options. I'd like to know price, fabric, and delivery time.\n\nThank you.`,
      festivals: `Hi TANVO,\n\nI am looking for a *Festive Saree* for an upcoming celebration.\n\nPlease suggest some handloom options. I'd love to see photos and prices.\n\nThank you.`,
      gifting: `Hi TANVO,\n\nI am looking for a *Handloom Saree for Gifting*.\n\nCould you please suggest beautiful options with gift packaging? I'd like to know price, delivery, and customization options.\n\nThank you.`
    };
    const encoded = encodeURIComponent(messages[occasion]);
    window.open(`https://wa.me/${WHATSAPP_NUMBER}?text=${encoded}`, '_blank');
  };

  return (
    <section
      className="relative overflow-hidden py-20 lg:py-28"
      style={{ background: '#F9F5EE' }}
    >
      <div className="container mx-auto px-6 lg:px-16 max-w-[1400px]">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center min-h-[580px]">

          {/* Left - Image Panel */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="relative order-2 lg:order-1"
          >
            <div className="relative overflow-hidden bg-[#F9F5EE] aspect-[3/4] max-h-[680px] group">
              <img
                src="/Indian bride wearing silk saree.jpeg"
                alt="TANVO WhatsApp Order"
                className="w-full h-full object-cover object-[center_25%] transition-transform duration-700 ease-out group-hover:scale-105"
                onError={(e) => {
                  (e.target as HTMLImageElement).src = '/Sambalpuri saree.png';
                }}
              />
              {/* Gradient overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-[#1A6634]/30 via-transparent to-transparent pointer-events-none" />

              {/* Badge */}
              <div className="absolute bottom-6 left-6 bg-[#1A6634] text-white px-4 py-2 flex items-center gap-2">
                <svg viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4 flex-shrink-0">
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z" />
                  <path d="M12 0C5.373 0 0 5.373 0 12c0 2.123.558 4.115 1.532 5.842L0 24l6.334-1.51A11.938 11.938 0 0012 24c6.627 0 12-5.373 12-12S18.627 0 12 0zm0 21.818a9.818 9.818 0 01-5.006-1.369l-.36-.214-3.732.979.999-3.641-.235-.374A9.818 9.818 0 1112 21.818z" />
                </svg>
                <span className="text-xs font-medium tracking-wider">Personal Assistance</span>
              </div>

              {/* Corner accent */}
              <div className="absolute bottom-5 right-5 w-14 h-14 border-r border-b border-[#C9A84C]/50 pointer-events-none" />
            </div>

            <div className="flex items-center gap-4 mt-5">
              <span className="w-8 h-[1px] bg-[#0D0B0A]/30" />
              <span className="font-sans text-[10px] tracking-[0.3em] text-[#0D0B0A]/40 uppercase">
                Handloom Heritage · Est. 2020
              </span>
            </div>
          </motion.div>

          {/* Right - Content Panel */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            viewport={{ once: true }}
            className="flex flex-col items-start gap-7 order-1 lg:order-2"
          >
            {/* Eyebrow */}
            <div className="flex items-center gap-4">
              <span className="w-8 h-[1px] bg-[#1A6634]" />
              <span className="font-sans text-[11px] tracking-[0.3em] font-medium text-[#1A6634] uppercase">
                TANVO CONCIERGE
              </span>
            </div>

            {/* Headline */}
            <h2 className="font-display text-4xl md:text-5xl lg:text-[52px] text-[#0D0B0A] leading-tight font-light tracking-tight">
              Order Directly<br />
              <span className="relative inline-block mt-1">
                <span className="font-normal italic text-[#1A6634]">via WhatsApp</span>
                <span className="absolute bottom-0 left-0 right-0 h-[1px] bg-[#1A6634]/30" />
              </span>
            </h2>

            {/* Description */}
            <p className="font-sans text-base text-[#0D0B0A]/65 font-light leading-relaxed max-w-md">
              For traditional buyers and high-value purchases — simply message us. Share a screenshot, your address, and ask any questions. We'll handle the rest personally, over chat or a call.
            </p>

            {/* 3-Step Flow */}
            <div className="flex flex-col gap-3 w-full max-w-sm">
              {[
                { step: '01', text: 'Send a screenshot or product name' },
                { step: '02', text: 'Share your delivery address' },
                { step: '03', text: 'Confirm via chat or call · Pay COD or online' }
              ].map(({ step, text }) => (
                <div key={step} className="flex items-start gap-4 group">
                  <span className="font-sans text-[10px] font-medium tracking-[0.2em] text-[#1A6634]/60 pt-0.5 w-6 flex-shrink-0">
                    {step}
                  </span>
                  <span className="font-sans text-sm text-[#0D0B0A]/60 font-light leading-snug">
                    {text}
                  </span>
                </div>
              ))}
            </div>

            {/* Occasion chips */}
            <div className="flex flex-wrap items-center gap-2.5">
              {['wedding', 'engagement', 'festivals', 'gifting'].map((type, index, arr) => (
                <React.Fragment key={type}>
                  <button
                    onClick={() => handleOccasionClick(type)}
                    className="font-sans text-xs text-[#0D0B0A]/55 hover:text-[#1A6634] transition-colors capitalize relative group pb-0.5"
                  >
                    {type.charAt(0).toUpperCase() + type.slice(1)}
                    <span className="absolute bottom-0 left-0 right-0 h-[1px] bg-[#1A6634] scale-x-0 group-hover:scale-x-100 transition-transform origin-left" />
                  </button>
                  {index < arr.length - 1 && <span className="text-[#0D0B0A]/20 text-[10px]">·</span>}
                </React.Fragment>
              ))}
            </div>

            {/* CTA */}
            <WhatsAppConcierge size="lg" label="Order via WhatsApp" className="w-full sm:w-auto" />

            {/* Trust line */}
            <div className="flex items-center gap-3 pt-3 border-t border-[#0D0B0A]/8 w-full max-w-sm">
              <span className="text-[#C9A84C] text-sm">✦</span>
              <span className="font-sans text-xs italic text-[#0D0B0A]/45 tracking-wide">
                Trusted by families choosing heritage handloom for special occasions
              </span>
            </div>
          </motion.div>

        </div>
      </div>
    </section>
  );
};

export default WhatsAppOrder;

// --- FILE: RegisterModal.tsx ---

import React, { useState, useEffect } from 'react';
import { X, Mail, Sparkles } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const RegisterModal: React.FC = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [email, setEmail] = useState('');

    useEffect(() => {
        const hasSeenModal = localStorage.getItem('hasSeenRegisterModal');
        if (hasSeenModal) return;

        let triggered = false;

        const triggerModal = () => {
            if (triggered) return;
            setIsOpen(true);
            triggered = true;
            window.removeEventListener('scroll', handleScroll);
            document.removeEventListener('mouseout', handleMouseOut);
        };

        const handleScroll = () => {
            const scrollPercent = (window.scrollY / (document.documentElement.scrollHeight - window.innerHeight)) * 100;
            if (scrollPercent > 60) {
                triggerModal();
            }
        };

        const handleMouseOut = (e: MouseEvent) => {
            if (e.clientY <= 0) {
                triggerModal();
            }
        };

        // Automatically open the modal 4 seconds after landing on the site
        const timer = setTimeout(() => {
            triggerModal();
        }, 4000);

        window.addEventListener('scroll', handleScroll);
        document.addEventListener('mouseout', handleMouseOut);

        return () => {
            clearTimeout(timer);
            window.removeEventListener('scroll', handleScroll);
            document.removeEventListener('mouseout', handleMouseOut);
        };
    }, []);

    const handleClose = () => {
        setIsOpen(false);
        localStorage.setItem('hasSeenRegisterModal', 'true');
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        // Here you would handle the registration
        console.log('Registering email:', email);
        handleClose();
    };

    return (
        <AnimatePresence>
            {isOpen && (
                <div className="fixed inset-0 z-[100] flex items-center justify-center p-6">
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="absolute inset-0 bg-tanvoDark/60 backdrop-blur-md"
                        onClick={handleClose}
                    />
                    <motion.div
                        initial={{ scale: 0.9, opacity: 0, y: 20 }}
                        animate={{ scale: 1, opacity: 1, y: 0 }}
                        exit={{ scale: 0.9, opacity: 0, y: 20 }}
                        className="relative bg-tanvoBg max-w-lg w-full overflow-hidden shadow-2xl rounded-sm"
                    >
                        {/* Decorative background */}
                        <div className="absolute top-0 right-0 w-32 h-32 bg-tanvoPrimary/5 rounded-full -mr-16 -mt-16 blur-2xl" />
                        <div className="absolute bottom-0 left-0 w-24 h-24 bg-tanvoPrimary/5 rounded-full -ml-12 -mb-12 blur-xl" />

                        <button
                            onClick={handleClose}
                            className="absolute top-4 right-4 text-tanvoDark/40 hover:text-tanvoPrimary transition-colors"
                        >
                            <X size={20} />
                        </button>

                        <div className="p-8 md:p-12 text-center">
                            <div className="inline-flex items-center justify-center w-12 h-12 bg-tanvoPrimary/10 rounded-full mb-6 text-tanvoPrimary">
                                <Sparkles size={24} />
                            </div>

                            <h2 className="font-serif text-3xl md:text-4xl text-tanvoDark mb-4 leading-tight">
                                Join the <span className="italic">Tanvo</span> Circle
                            </h2>

                            <p className="text-gray-500 text-sm leading-relaxed mb-8 max-w-sm mx-auto">
                                Be the first to experience our seasonal drops and receive stories of artisanal heritage directly in your inbox.
                            </p>

                            <form onSubmit={handleSubmit} className="space-y-4">
                                <div className="relative">
                                    <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-tanvoDark/30" size={16} />
                                    <input
                                        type="email"
                                        required
                                        placeholder="your@email.com"
                                        value={email}
                                        onChange={(e) => setEmail(e.target.value)}
                                        className="w-full bg-white border border-gray-100 pl-12 pr-4 py-4 text-sm focus:border-tanvoPrimary outline-none transition-all rounded-sm uppercase tracking-widest"
                                    />
                                </div>
                                <div className="grid grid-cols-2 gap-4">
                                    <button
                                        type="button"
                                        onClick={handleClose}
                                        className="py-4 text-xs font-bold uppercase tracking-widest text-tanvoDark/40 hover:text-tanvoDark transition-colors"
                                    >
                                        Later
                                    </button>
                                    <button
                                        type="submit"
                                        className="bg-tanvoPrimary text-white py-4 text-xs font-bold uppercase tracking-widest hover:bg-tanvoAccent transition-all shadow-lg shadow-tanvoPrimary/20"
                                    >
                                        Register
                                    </button>
                                </div>
                            </form>

                            <p className="mt-8 text-[10px] text-gray-400 uppercase tracking-widest">
                                Handwoven Heritage • Global Appreciation
                            </p>
                        </div>

                        {/* Thread detail at bottom */}
                        <div className="h-1 bg-gradient-to-r from-tanvoPrimary/10 via-tanvoPrimary to-tanvoPrimary/10" />
                    </motion.div>
                </div>
            )}
        </AnimatePresence>
    );
};

export default RegisterModal;


// --- FILE: HandwovenHeritage.tsx ---

import React from 'react';
import { Link } from 'react-router-dom';

const HandwovenHeritage: React.FC = () => {
    return (
        <section className="bg-white py-10 md:py-14 overflow-hidden selection:bg-[#780000] selection:text-white">
            <div className="max-w-[1440px] mx-auto px-6 md:px-12 flex flex-col items-center text-center">
                
                {/* Title */}
                <h2 className="font-headline font-normal text-4xl md:text-6xl lg:text-[5rem] tracking-tight text-[#0D0B0A] uppercase mb-6 md:mb-8 w-full" style={{ lineHeight: '0.95' }}>
                    <span className="block">EVERY THREAD</span>
                    <span className="block text-[#780000] italic font-serif">CARRIES A STORY</span>
                </h2>

                {/* Hero Image with Stats Overlay */}
                <div className="w-full max-w-7xl relative group mb-8 md:mb-10">
                    <div className="w-full h-[240px] md:h-[340px] lg:h-[420px] overflow-hidden bg-[#F9F5EE] relative">
                        <img 
                            src="/Master_weaver_creating_Sambalpur…_2K_202607021325.jpeg" 
                            alt="Master Weaver"
                            className="w-full h-full object-cover object-center transform transition-transform duration-[1.5s] ease-out group-hover:scale-105"
                        />
                        {/* Stats Strip Overlay */}
                        <div className="absolute bottom-0 left-0 right-0 bg-white/85 backdrop-blur-md border-t border-[#0D0B0A]/10 py-3 md:py-4">
                            <div className="grid grid-cols-4 divide-x divide-[#0D0B0A]/10">
                                <div className="flex flex-col items-center justify-center px-1">
                                    <span className="font-label text-[9px] md:text-xs uppercase tracking-[0.2em] text-[#0D0B0A] font-bold text-center">15 Days</span>
                                </div>
                                <div className="flex flex-col items-center justify-center px-1">
                                    <span className="font-label text-[9px] md:text-xs uppercase tracking-[0.2em] text-[#0D0B0A] font-bold text-center">7 Gen</span>
                                </div>
                                <div className="flex flex-col items-center justify-center px-1">
                                    <span className="font-label text-[9px] md:text-xs uppercase tracking-[0.2em] text-[#0D0B0A] font-bold text-center">100% Hand</span>
                                </div>
                                <div className="flex flex-col items-center justify-center px-1">
                                    <span className="font-label text-[9px] md:text-xs uppercase tracking-[0.2em] text-[#0D0B0A] font-bold text-center">GI Cert.</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Quote / Subtext */}
                <div className="max-w-4xl mx-auto px-4 mb-6 md:mb-10">
                    <p className="font-serif text-xl md:text-3xl lg:text-4xl text-[#0D0B0A] leading-[1.3]">
                        "Handwoven over 15 days by artisans whose families have woven for seven generations."
                    </p>
                </div>

                {/* CTA */}
                <Link to="/about" className="group flex items-center justify-center gap-4 text-[#0D0B0A] hover:text-[#780000] transition-colors duration-300 mt-2">
                    <span className="font-label text-xs md:text-sm uppercase tracking-[0.2em] font-bold">Discover the Craft</span>
                    <span className="material-symbols-outlined transform transition-transform duration-300 group-hover:translate-x-2">arrow_right_alt</span>
                </Link>

            </div>
        </section>
    );
};

export default HandwovenHeritage;


// --- FILE: DrapedEveryMoment.tsx ---

import React from 'react';
import { useNavigate } from 'react-router-dom';

const DrapedEveryMoment: React.FC = () => {
    const navigate = useNavigate();

    const occasions = [
        {
            image: '/The Art of Occasion Wedding .jpeg',
            label: 'BRIDAL COLLECTION',
            title: 'Wedding Elegance',
            description: 'Timeless silks for your most cherished celebration.',
            stagger: false,
            query: 'wedding',
        },
        {
            image: '/The Art of Occasion Ring Ceremony .jpeg',
            label: 'CELEBRATION',
            title: 'Golden Beginnings',
            description: 'Graceful weaves for moments worth remembering.',
            stagger: true,
            query: 'celebration',
        },
        {
            image: '/The Art of Occasion Efferlatly garce .jpeg',
            label: 'DAILY HERITAGE',
            title: 'Effortless Grace',
            description: 'Comfort meets traditional craftsmanship.',
            stagger: false,
            query: 'daily',
        },
        {
            image: '/The Art of Occasion Daily Use .jpeg',
            label: 'THOUGHTFUL GIFTS',
            title: 'A Gift Of Tradition',
            description: "Share a piece of India's weaving legacy.",
            stagger: true,
            query: 'gifting',
        }
    ];

    return (
        <section className="py-24 bg-white" data-purpose="draped-moments">
            <div className="max-w-7xl mx-auto px-6">
                <p className="text-[#C9A84C] text-[10px] tracking-[0.3em] uppercase text-center font-bold mb-4">Draped For Every Moment</p>
                <h2 className="font-serif text-3xl md:text-4xl mb-16 text-center uppercase tracking-widest text-[#1C1612]">
                    The Art of Occasion
                </h2>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                    {occasions.map((item, idx) => (
                        <div
                            key={idx}
                            onClick={() => navigate(`/shop?occasion=${item.query}`)}
                            className={`aspect-[9/16] bg-gray-50 relative group overflow-hidden cursor-pointer ${
                                item.stagger ? 'md:mt-8' : ''
                            }`}
                        >
                            <img
                                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700 filter contrast-[1.05]"
                                src={item.image}
                                alt={item.title}
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent p-6 flex flex-col justify-end opacity-90 group-hover:opacity-100 transition-opacity">
                                <span className="text-[#C9A84C] text-[9px] uppercase tracking-[0.2em] font-bold block mb-2">
                                    {item.label}
                                </span>
                                <h3 className="text-white font-serif text-xl mb-2">
                                    {item.title}
                                </h3>
                                <p className="text-gray-300 text-xs font-sans leading-relaxed opacity-0 group-hover:opacity-100 transition-opacity duration-500 max-h-0 group-hover:max-h-20 overflow-hidden">
                                    {item.description}
                                </p>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default DrapedEveryMoment;


// --- FILE: BrandStorySection.tsx ---

import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';

const BrandStorySection: React.FC = () => {
    return (
        <section className="relative w-full h-[80vh] min-h-[600px] overflow-hidden bg-[#0D0B0A] flex items-center">
            {/* Autoplay Background Video */}
            <video
                autoPlay
                muted
                loop
                playsInline
                className="absolute inset-0 w-full h-full object-cover opacity-50"
            >
                <source src="/VID02606251815.mp4" type="video/mp4" />
            </video>

            {/* Subtle dark overlays for text readability */}
            <div className="absolute inset-0 bg-gradient-to-t md:bg-gradient-to-r from-[#0D0B0A]/95 via-[#0D0B0A]/70 to-transparent" />
            <div className="absolute inset-0 bg-[#0D0B0A]/20" />

            {/* Content Container */}
            <div className="relative z-10 max-w-[1400px] w-full mx-auto px-8 md:px-16 flex flex-col justify-center h-full text-center md:text-left items-center md:items-start">
                <motion.span 
                    initial={{ opacity: 0, y: 15 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: "-100px" }}
                    transition={{ duration: 0.8 }}
                    className="block mb-4 md:mb-6 tracking-[0.25em] uppercase text-[#C9A84C] text-[10px] md:text-xs font-semibold"
                    style={{ fontFamily: "'Inter', sans-serif" }}
                >
                    THE TANVO STORY
                </motion.span>

                <motion.h2 
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: "-100px" }}
                    transition={{ delay: 0.2, duration: 1 }}
                    className="text-[#F9F5EE] text-4xl md:text-5xl lg:text-[64px] mb-6 font-light leading-[1.1]"
                    style={{ fontFamily: "'Playfair Display', serif" }}
                >
                    The Real Stories<br />
                    Behind Our Brand
                </motion.h2>

                <motion.p 
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: "-100px" }}
                    transition={{ delay: 0.4, duration: 1 }}
                    className="text-[#F9F5EE]/80 text-sm md:text-base leading-relaxed mb-10 max-w-sm md:max-w-md"
                    style={{ fontFamily: "'Raleway', sans-serif" }}
                >
                    Every saree carries the hands, heritage, and patience of the artisans who create it.
                </motion.p>

                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: "-100px" }}
                    transition={{ delay: 0.6, duration: 1 }}
                >
                    <Link 
                        to="/story"
                        className="inline-block border border-[#C9A84C] text-[#F9F5EE] px-8 py-4 text-[11px] md:text-xs tracking-[0.15em] uppercase transition-all duration-500 hover:bg-[#780000] hover:border-[#780000]"
                        style={{ fontFamily: "'Inter', sans-serif" }}
                    >
                        Discover Our Heritage
                    </Link>
                </motion.div>
            </div>
        </section>
    );
};

export default BrandStorySection;

// --- FILE: MensTraditionalAttireBanner.tsx ---

import React from 'react';
import { Link } from 'react-router-dom';

const NewArrivalsBanner: React.FC = () => {
    return (
        <section className="container mx-auto px-4 py-12 md:py-20">
            <div className="bg-[#F9F5EE] w-full max-w-7xl mx-auto overflow-hidden relative min-h-[550px] shadow-sm">
                
                {/* Full background image */}
                <div className="absolute inset-0 w-full h-full">
                    <img
                        src="/Mens Collection Banner.png"
                        alt="New Arrivals Artisans"
                        className="w-full h-full object-cover object-[80%_top]"
                    />
                    {/* Minimal dark gradient overlay for text readability */}
                    <div className="absolute inset-0 bg-gradient-to-r from-[#1B2B3A]/80 via-[#1B2B3A]/50 to-transparent"></div>
                </div>

                {/* Content overlay - left aligned with light text */}
                <div className="relative h-full min-h-[550px] flex items-center">
                    <div className="w-full md:w-1/2 px-8 md:px-16 py-12">
                        
                        {/* Minimal badge */}
                        <div className="inline-block mb-6">
                            <span className="text-[11px] tracking-[4px] text-[#F9F5EE] font-light uppercase border border-[#F9F5EE]/30 px-4 py-2">
                                Handloom Collection
                            </span>
                        </div>
                        
                        {/* Heading - big and bold with light color */}
                        <h2 className="font-serif text-5xl md:text-7xl lg:text-8xl text-[#F9F5EE] tracking-tighter leading-[1.05] mb-4">
                            Men's 
                            <br />
                            Traditional
                        </h2>
                        
                        {/* Minimal description with light color */}
                        <p className="text-[#F9F5EE] text-sm md:text-base font-light max-w-sm mb-8 opacity-80 leading-relaxed">
                            Discover the latest masterpieces from our looms.
                        </p>

                        {/* Clean CTA with light styling */}
                        <Link
                            to="/shop?sort=-createdAt"
                            className="inline-block bg-[#F9F5EE] text-[#1B2B3A] px-10 py-4 text-sm font-medium tracking-wider transition-all duration-300 hover:bg-white hover:shadow-lg shadow-md uppercase"
                        >
                            Shop Now
                        </Link>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default NewArrivalsBanner;

// --- FILE: ModernMuse.tsx ---

import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';

const ModernMuse: React.FC = () => {
    return (
        <section className="w-full my-8 md:my-16">
            <div className="relative w-full h-[600px] md:h-[85vh] min-h-[500px] max-h-[900px] bg-[#F9F5EE] overflow-hidden">
                
                {/* Full Width Hero Image Background */}
                <div className="absolute inset-0 w-full h-full overflow-hidden">
                    <motion.img 
                        initial={{ scale: 1.15, opacity: 0 }}
                        whileInView={{ scale: 1, opacity: 1 }}
                        transition={{ duration: 2, ease: [0.16, 1, 0.3, 1] }}
                        viewport={{ once: true }}
                        alt="TANVO Modern Muse Editorial" 
                        className="w-full h-full object-cover object-center" 
                        src="/IMG202606240805.jpeg" 
                    />
                    
                    {/* Sophisticated Gradient Overlay for Full Width Impact */}
                    <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-black/80"></div>
                    <div className="absolute inset-0 bg-gradient-to-r from-black/20 to-transparent"></div>
                </div>

                {/* Content Overlay - Centered Bottom with Full Width */}
                <div className="absolute bottom-0 left-0 right-0 p-6 md:p-16 lg:p-20 text-white">
                    <div className="max-w-4xl mx-auto">
                        <div className="flex flex-col space-y-4 md:space-y-6">
                            
                            {/* Brand Label - Centered */}
                            <motion.div 
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                transition={{ delay: 0.2, duration: 1, ease: [0.16, 1, 0.3, 1] }}
                                viewport={{ once: true }}
                                className="flex justify-center"
                            >
                                <span className="font-sans text-xs tracking-[0.3em] uppercase text-white/80">
                                    TANVO PRESENTS
                                </span>
                            </motion.div>

                            {/* Heading - Centered */}
                            <motion.div
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                transition={{ delay: 0.4, duration: 1, ease: [0.16, 1, 0.3, 1] }}
                                viewport={{ once: true }}
                                className="text-center"
                            >
                                <h2 className="font-serif text-4xl md:text-6xl lg:text-7xl xl:text-8xl leading-[1.05] mb-4 text-white drop-shadow-2xl">
                                    THE MODERN MUSE
                                </h2>
                                <p className="font-sans text-sm md:text-base lg:text-lg text-white/90 max-w-2xl mx-auto leading-relaxed drop-shadow-lg">
                                    Where heritage weaving meets contemporary elegance. 
                                    <br className="hidden sm:block" />
                                    A curated dialogue between ancestral craft and modern silhouette.
                                </p>
                            </motion.div>

                            {/* CTA Button - Centered */}
                            <motion.div
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                transition={{ delay: 0.6, duration: 1, ease: [0.16, 1, 0.3, 1] }}
                                viewport={{ once: true }}
                                className="flex justify-center pt-2 md:pt-4"
                            >
                                <Link 
                                    to="/shop?style=Modern,Designer"
                                    className="group relative inline-flex items-center gap-2 px-8 md:px-10 py-4 md:py-5 bg-[#780000] text-white font-sans text-xs md:text-sm uppercase tracking-widest rounded-[4px] overflow-hidden transition-all duration-500 hover:bg-[#4f0000] hover:shadow-2xl active:scale-95"
                                >
                                    <span className="relative z-10">Explore Collection</span>
                                    <ArrowRight size={16} className="relative z-10 group-hover:translate-x-1 transition-transform duration-300" />
                                    <div className="absolute inset-0 w-0 bg-white/10 group-hover:w-full transition-all duration-500"></div>
                                </Link>
                            </motion.div>
                        </div>
                    </div>
                </div>

                {/* Floating Brand Aesthetic Details */}
                <motion.div 
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 0.3 }}
                    transition={{ delay: 0.8, duration: 1 }}
                    viewport={{ once: true }}
                    className="absolute top-8 right-8 md:right-12 hidden lg:block"
                >
                    <p className="font-serif text-white text-[10px] tracking-[0.5em] uppercase [writing-mode:vertical-lr] opacity-60">
                        HERITAGE · CRAFT · SOUL
                    </p>
                </motion.div>

                <motion.div 
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 0.2 }}
                    transition={{ delay: 1, duration: 1 }}
                    viewport={{ once: true }}
                    className="absolute bottom-8 left-8 md:left-12 hidden lg:block"
                >
                    <div className="w-px h-12 bg-white/40 mx-auto"></div>
                    <p className="font-serif text-white text-[10px] tracking-[0.3em] uppercase mt-2 opacity-60">
                        EST. 2024
                    </p>
                </motion.div>

                {/* Scroll Indicator */}
                <motion.div 
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 0.4, y: 0 }}
                    transition={{ delay: 1.5, duration: 1, repeat: Infinity, repeatType: "reverse" }}
                    className="absolute bottom-8 left-1/2 transform -translate-x-1/2 hidden md:block"
                >
                    <div className="flex flex-col items-center gap-2">
                        <span className="text-[8px] tracking-[0.3em] uppercase text-white/40">Scroll</span>
                        <div className="w-px h-8 bg-white/20"></div>
                    </div>
                </motion.div>
            </div>
        </section>
    );
};

export default ModernMuse;

// --- FILE: VideoBanner.tsx ---

import React, { useRef, useState } from 'react';

const VideoBanner: React.FC = () => {
    const videoRef = useRef<HTMLVideoElement>(null);
    const [isPlaying, setIsPlaying] = useState(true);

    const togglePlay = () => {
        if (videoRef.current) {
            if (isPlaying) {
                videoRef.current.pause();
            } else {
                videoRef.current.play();
            }
            setIsPlaying(!isPlaying);
        }
    };

    return (
        <section 
            className="relative w-full overflow-hidden"
            style={{ 
                height: '70vh', 
                minHeight: '500px', 
                maxHeight: '800px',
            }}
        >
            {/* Video Background */}
            <video
                ref={videoRef}
                autoPlay
                muted
                loop
                playsInline
                className="w-full h-full object-cover"
                style={{
                    objectPosition: 'center 25%',
                    // Increased brightness from 0.45 to 0.85 for better clarity
                    filter: 'brightness(0.85) saturate(1.1)', 
                }}
            >
                <source src="/Woman_wearing_silk_saree_202606221155.mp4" type="video/mp4" />
                Your browser does not support the video tag.
            </video>

            {/* 
               Adjusted Gradient Overlay:
               Reduced intensity from black/60 to black/30 to ensure the video 
               pops while still providing enough contrast for the white text.
            */}
            <div className="absolute inset-0 bg-gradient-to-b from-black/20 via-transparent to-black/30"></div>

            {/* Content Overlay */}
            <div className="absolute inset-0 flex flex-col items-center justify-center px-4 md:px-8">
                <h1 className="text-base sm:text-xl md:text-3xl lg:text-4xl font-sans font-light tracking-[0.15em] text-white text-center uppercase whitespace-nowrap drop-shadow-lg">
                    Timeless Heritage. <span className="text-[#C9A84C] font-normal">Modern Elegance.</span>
                </h1>
            </div>

            {/* Play/Pause Button */}
            <button 
                className="absolute bottom-6 right-6 md:bottom-8 md:right-8 text-white/60 hover:text-white transition-colors duration-300 z-20"
                aria-label="Toggle video playback"
                onClick={togglePlay}
            >
                <span className="material-symbols-outlined text-xl">
                    {isPlaying ? 'pause' : 'play_arrow'}
                </span>
            </button>
        </section>
    );
};

export default VideoBanner;
