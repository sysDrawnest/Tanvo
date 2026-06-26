// ==========================================
// ALL HOMEPAGE CODES CONSOLIDATED
// ==========================================


// --- FILE: HeroSection.tsx ---

import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowUpRight, Star, Award, Users } from 'lucide-react';

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
    return (
        <section style={{
            minHeight: '100vh',
            width: '100%',
            position: 'relative',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'space-between',
            padding: '4vw 6vw',
            backgroundImage: 'url(/luxury_saree_macro.png)',
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            backgroundRepeat: 'no-repeat',
            backgroundColor: '#0A0A0A',
        }}>
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
                <div style={{
                    color: '#EAE6DF',
                    fontSize: '15px',
                    letterSpacing: '0.25em',
                    fontWeight: 300,
                    textTransform: 'uppercase',
                    fontFamily: '"Helvetica Neue", Helvetica, Arial, sans-serif'
                }}>
                    Tanvo
                </div>
                <div style={{
                    color: '#EAE6DF',
                    fontSize: '11px',
                    letterSpacing: '0.15em',
                    textTransform: 'uppercase',
                    opacity: 0.7,
                }}>
                    Fine Silks
                </div>
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
}) => {
    return (
        <section style={{ padding: '100px max(48px, 6vw)', background }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', marginBottom: 64, flexWrap: 'wrap', gap: 24 }}>
                <div>
                    <p className="section-label" style={{ marginBottom: 16 }}>{label}</p>
                    <h2 className="font-display" style={{ fontSize: 'clamp(36px, 4.5vw, 60px)', fontWeight: 300, color: 'var(--ink)', lineHeight: 1.05 }}>
                        {title}{titleEm && <> <em>{titleEm}</em></>}
                    </h2>
                </div>
                <Link
                    to={viewAllLink}
                    style={{ fontFamily: 'Montserrat, sans-serif', fontSize: 9, fontWeight: 700, letterSpacing: '0.2em', color: 'var(--ink)', textDecoration: 'none', borderBottom: '1px solid var(--ink)', paddingBottom: 4 }}
                >
                    {viewAllText}
                </Link>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-8">
                {products.map(product => <ProductCard key={product._id} product={product} />)}
                {products.length === 0 && (
                    <div style={{ gridColumn: '1/-1', textAlign: 'center', padding: '80px 0', color: 'rgba(13,11,10,0.35)', fontFamily: 'Montserrat, sans-serif', fontSize: 11, letterSpacing: '0.15em' }}>
                        {emptyMessage}
                    </div>
                )}
            </div>
        </section>
    );
};

export default ProductsGrid;


// --- FILE: HandwovenHeritage.tsx ---

import React from 'react';
import { Link } from 'react-router-dom';

const HandwovenHeritage: React.FC = () => {
    return (
        <section className="relative overflow-hidden bg-[#F9F5EE]" style={{ backgroundImage: 'radial-gradient(circle at 2px 2px, rgba(120, 0, 0, 0.02) 1px, transparent 0)', backgroundSize: '24px 24px' }}>
            <div className="flex flex-col md:flex-row min-h-[580px] lg:min-h-[640px]">
                {/* Left Content Side */}
                <div className="w-full md:w-1/2 flex flex-col justify-center px-6 md:px-16 py-12 md:py-16 z-10">
                    <div className="max-w-xl space-y-6">
                        <h1 className="text-3xl md:text-5xl font-headline font-bold text-[#0D0B0A] leading-tight font-serif">
                            Every Saree is Handwoven, Not Manufactured
                        </h1>
                        <p className="text-lg md:text-xl font-body font-light text-[#59413d] leading-relaxed italic">
                            Crafted by skilled artisans across Odisha, each Tanvo piece carries generations of tradition, patience, and human touch — no machines, no shortcuts.
                        </p>
                        <div className="h-px w-20 bg-[#780000]/20"></div>
                        <p className="text-sm md:text-base text-[#59413d]/90 leading-relaxed font-body">
                            Our sarees are woven thread by thread using traditional techniques like Sambalpuri Ikat, Bomkai, and Khandua. Each piece takes days — sometimes weeks — to complete, making every saree unique.
                        </p>
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-y-4 gap-x-6 py-2">
                            <div className="flex items-center gap-3">
                                <span className="material-symbols-outlined text-[#C9A84C] shrink-0" style={{ fontVariationSettings: "'FILL' 1" }}>check_circle</span>
                                <span className="text-xs font-label uppercase tracking-widest text-[#0D0B0A] font-bold">100% Handmade by Master Weavers</span>
                            </div>
                            <div className="flex items-center gap-3">
                                <span className="material-symbols-outlined text-[#C9A84C] shrink-0" style={{ fontVariationSettings: "'FILL' 1" }}>verified</span>
                                <span className="text-xs font-label uppercase tracking-widest text-[#0D0B0A] font-bold">GI Certified Authentic Handloom</span>
                            </div>
                            <div className="flex items-center gap-3">
                                <span className="material-symbols-outlined text-[#C9A84C] shrink-0" style={{ fontVariationSettings: "'FILL' 1" }}>groups</span>
                                <span className="text-xs font-label uppercase tracking-widest text-[#0D0B0A] font-bold">Supports 7th Gen Artisans</span>
                            </div>
                            <div className="flex items-center gap-3">
                                <span className="material-symbols-outlined text-[#C9A84C] shrink-0" style={{ fontVariationSettings: "'FILL' 1" }}>eco</span>
                                <span className="text-xs font-label uppercase tracking-widest text-[#0D0B0A] font-bold">No Mass Production</span>
                            </div>
                        </div>
                        <div className="pt-4">
                            <Link to="/shop" className="group relative px-7 py-3.5 bg-gradient-to-r from-[#780000] to-[#C1121F] text-white font-label text-xs rounded-sm overflow-hidden transition-all duration-500 hover:shadow-lg hover:shadow-[#780000]/10 inline-flex items-center justify-center uppercase tracking-[0.2em] font-bold h-[48px]">
                                <span className="relative z-10 font-label uppercase tracking-[0.2em] text-[11px] font-bold">Explore Handwoven Collection</span>
                                <div className="absolute inset-0 bg-[#780000] translate-y-full group-hover:translate-y-0 transition-transform duration-500 ease-out"></div>
                            </Link>
                        </div>
                    </div>
                </div>
                {/* Right Image Side */}
                <div className="w-full md:w-1/2 relative min-h-[320px] md:min-h-full">
                    <img alt="Traditional Weaver" className="absolute inset-0 w-full h-full object-cover" data-alt="Close-up of an elderly Indian artisan weaving silk on a traditional wooden handloom, warm morning sunlight highlighting fine threads and complex textures" src="https://lh3.googleusercontent.com/aida-public/AB6AXuCdg7Ev_2hzinZ3ELEiaInm85FF5cZlgC3vjDdz0dNR_5uT4IiQNlFThWx02_8d06i2loTg_isOhanjJ-XgBXwD-7k3DYSXsQ0sK299Dac6LbvjJmC1kxyaGNcHjfKqM2ha6jBHoYHFtoC01UMM9aZuUX9eFXnAZmP-cpSPrKM2hmNjOcawJFf_SRb7nmoR1VqIFZtR3wRMta_51owM7im8pFVUJIkDcyqlH5ayYK0PtWIo3z1HxUK-4v3km41dOKv787phEhTaww" />
                    {/* Decorative Element */}
                    <div className="absolute bottom-12 left-12 p-6 bg-white rounded-sm shadow-lg hidden lg:block max-w-xs border-l-4 border-[#780000]">
                        <p className="font-headline italic text-[#0D0B0A] leading-relaxed text-sm font-serif">
                            "The rhythm of the loom is the heartbeat of our village. Every thread we cross is a story we preserve."
                        </p>
                        <p className="mt-2 text-[10px] font-label uppercase tracking-[0.2em] text-[#C9A84C] font-bold">— S. Mahapatra, Master Weaver</p>
                    </div>
                </div>
            </div>
            {/* Process Strip */}
            <div className="bg-[#FAF6F0] border-t border-[#E2D9C8]/40 py-8 px-6 md:px-16">
                <div className="max-w-[1440px] mx-auto">
                    <div className="flex flex-row justify-between items-center gap-8 md:gap-12 relative overflow-x-auto pb-4 scrollbar-hide">
                        {/* Connecting Line (Desktop) */}
                        <div className="absolute top-[1.35rem] left-0 w-full h-px bg-[#E2D9C8]/40 hidden md:block"></div>
                        <div className="absolute top-[1.35rem] left-0 w-1/3 h-px bg-[#780000] hidden md:block"></div>
                        {/* Step 1 */}
                        <div className="flex flex-row md:flex-col items-center md:items-start relative z-10 group cursor-default flex-shrink-0 gap-3 md:gap-0">
                            <div className="w-10 h-10 md:w-12 md:h-12 rounded-full bg-[#780000] flex items-center justify-center text-white md:mb-3 transition-transform group-hover:scale-110">
                                <span className="material-symbols-outlined text-sm md:text-base" style={{ fontVariationSettings: "'FILL' 1" }}>palette</span>
                            </div>
                            <div className="flex flex-col">
                                <span className="text-[10px] md:text-xs font-label uppercase tracking-[0.15em] text-[#780000] font-bold whitespace-nowrap">Thread Dyeing</span>
                                <p className="text-[11px] text-[#59413d]/70 mt-0.5 hidden md:block font-body-md">Organic pigments &amp; sun drying</p>
                            </div>
                        </div>
                        {/* Step 2 */}
                        <div className="flex flex-row md:flex-col items-center md:items-start relative z-10 group cursor-default flex-shrink-0 gap-3 md:gap-0">
                            <div className="w-10 h-10 md:w-12 md:h-12 rounded-full bg-white border-2 border-[#E2D9C8] flex items-center justify-center text-[#59413d] md:mb-3 group-hover:border-[#780000] transition-all">
                                <span className="material-symbols-outlined text-sm md:text-base">settings_suggest</span>
                            </div>
                            <div className="flex flex-col">
                                <span className="text-[10px] md:text-xs font-label uppercase tracking-[0.15em] text-[#59413d] font-bold whitespace-nowrap">Handloom Setup</span>
                                <p className="text-[11px] text-[#59413d]/70 mt-0.5 hidden md:block font-body-md">Drafting the warp patterns</p>
                            </div>
                        </div>
                        {/* Step 3 */}
                        <div className="flex flex-row md:flex-col items-center md:items-start relative z-10 group cursor-default flex-shrink-0 gap-3 md:gap-0">
                            <div className="w-10 h-10 md:w-12 md:h-12 rounded-full bg-white border-2 border-[#E2D9C8] flex items-center justify-center text-[#59413d] md:mb-3 group-hover:border-[#780000] transition-all">
                                <span className="material-symbols-outlined text-sm md:text-base">gesture</span>
                            </div>
                            <div className="flex flex-col">
                                <span className="text-[10px] md:text-xs font-label uppercase tracking-[0.15em] text-[#59413d] font-bold whitespace-nowrap">Weaving</span>
                                <p className="text-[11px] text-[#59413d]/70 mt-0.5 hidden md:block font-body-md">Intricate weft insertion</p>
                            </div>
                        </div>
                        {/* Step 4 */}
                        <div className="flex flex-row md:flex-col items-center md:items-start relative z-10 group cursor-default flex-shrink-0 gap-3 md:gap-0">
                            <div className="w-10 h-10 md:w-12 md:h-12 rounded-full bg-white border-2 border-[#E2D9C8] flex items-center justify-center text-[#59413d] md:mb-3 group-hover:border-[#780000] transition-all">
                                <span className="material-symbols-outlined text-sm md:text-base">auto_awesome</span>
                            </div>
                            <div className="flex flex-col">
                                <span className="text-[10px] md:text-xs font-label uppercase tracking-[0.15em] text-[#59413d] font-bold whitespace-nowrap">Finished Saree</span>
                                <p className="text-[11px] text-[#59413d]/70 mt-0.5 hidden md:block font-body-md">A masterpiece is ready</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default HandwovenHeritage;


// --- FILE: MarqueeTicker.tsx ---

import React from 'react';

const MarqueeTicker: React.FC = () => {
    return (
        <div style={{ background: 'var(--gold)', padding: '14px 0', overflow: 'hidden' }}>
            <div className="marquee-inner" style={{ display: 'flex', whiteSpace: 'nowrap', width: 'max-content' }}>
                {Array(6).fill('✦  Handwoven Sarees  ✦  GI Tagged Heritage  ✦  Direct from Master Weavers  ✦  Sambalpuri · Bomkai · Ikat  ').map((t, i) => (
                    <span key={i} style={{
                        fontFamily: 'Montserrat, sans-serif',
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
                        <p className="font-sans text-[10px] md:text-xs font-bold uppercase tracking-[0.2em] mb-1" style={{ color: 'var(--ivory)', fontFamily: "'Cinzel', serif" }}>{p.label}</p>
                        <p className="font-sans text-[9px] md:text-[11px] tracking-wider capitalize" style={{ color: 'rgba(249,245,238,0.4)', fontFamily: "'Raleway', sans-serif" }}>{p.sub}</p>
                    </div>
                ))}
            </div>
        </section>
    );
};

export default PillarsSection;


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


// --- FILE: EditorialBanner.tsx ---

import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';

const EditorialBanner: React.FC = () => {
    return (
        <section style={{ 
            display: 'flex', 
            flexDirection: 'row', 
            height: '85vh', 
            minHeight: '600px', 
            width: '100%', 
            overflow: 'hidden',
            backgroundColor: '#F9F6F0' // Ivory base
        }}>
            
            {/* Left Column: Ivory Editorial Text Panel */}
            <div style={{ 
                flex: '1 1 50%', 
                height: '100%', 
                backgroundColor: '#F9F6F0', // Premium Ivory
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
                    autoPlay
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
                    <source src="/EditorialBanner.mp4" type="video/mp4" />
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
                                width: 48, height: 48, borderRadius: '0px',
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
                            New
                            <br />
                            Arrivals
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
                .trust-card * {
                    transition: all 0.3s ease;
                }
            `}</style>
        </section>
    );
};

export default TrustSignals;

// --- FILE: JournalHint.tsx ---

import React, { useRef, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowUpRight } from 'lucide-react';

const articles = [
    {
        issue: '01',
        tag: 'Craft',
        title: 'The mathematics of the loom',
        excerpt: 'How Sambalpuri weavers calculate ikat resist patterns using a system that predates modern algebra by four centuries.',
        readTime: '6 min read',
    },
    {
        issue: '02',
        tag: 'Heritage',
        title: 'Seven hundred years of silk',
        excerpt: 'Tracing the unbroken lineage of Odisha\'s weaving clusters from the Ganga dynasty courts to the present-day loom shed.',
        readTime: '9 min read',
    },
    {
        issue: '03',
        tag: 'Process',
        title: 'Why a single saree takes three weeks',
        excerpt: 'A step-by-step look at resist-dyeing, warping, and hand-shuttle weaving — and the irreducible human time each stage demands.',
        readTime: '7 min read',
    },
];

const JournalHint: React.FC = () => {
    const sectionRef = useRef<HTMLElement>(null);
    const [visible, setVisible] = useState(false);

    useEffect(() => {
        const observer = new IntersectionObserver(
            ([entry]) => { if (entry.isIntersecting) setVisible(true); },
            { threshold: 0.15 }
        );
        if (sectionRef.current) observer.observe(sectionRef.current);
        return () => observer.disconnect();
    }, []);

    return (
        <section
            ref={sectionRef}
            className="relative overflow-hidden"
            style={{ backgroundColor: '#0D0B0A' }}
            data-purpose="journal-hint"
        >
            {/* Subtle textile grid overlay */}
            <div
                aria-hidden="true"
                className="pointer-events-none absolute inset-0"
                style={{
                    backgroundImage: `
                        linear-gradient(rgba(201,168,76,0.04) 1px, transparent 1px),
                        linear-gradient(90deg, rgba(201,168,76,0.04) 1px, transparent 1px)
                    `,
                    backgroundSize: '48px 48px',
                }}
            />

            <div className="relative max-w-[1280px] mx-auto px-8">
                {/* Top rule */}
                <div
                    className="transition-all duration-700 ease-out origin-left"
                    style={{
                        height: '1px',
                        backgroundColor: 'rgba(201,168,76,0.25)',
                        transform: visible ? 'scaleX(1)' : 'scaleX(0)',
                    }}
                />

                <div className="grid grid-cols-1 lg:grid-cols-[1fr_1.6fr] gap-0">

                    {/* ── Left column: editorial header ── */}
                    <div
                        className="py-16 lg:py-24 lg:pr-16 flex flex-col justify-between"
                        style={{ borderRight: '1px solid rgba(201,168,76,0.15)' }}
                    >
                        <div>
                            <span
                                className="block mb-6"
                                style={{
                                    fontFamily: "'Inter', sans-serif",
                                    fontSize: '10px',
                                    fontWeight: 700,
                                    letterSpacing: '0.2em',
                                    textTransform: 'uppercase',
                                    color: '#C9A84C',
                                    opacity: visible ? 1 : 0,
                                    transform: visible ? 'translateY(0)' : 'translateY(12px)',
                                    transition: 'opacity 600ms ease 200ms, transform 600ms ease 200ms',
                                }}
                            >
                                The TANVO Chronicles
                            </span>

                            <h2
                                style={{
                                    fontFamily: "'Playfair Display', serif",
                                    fontSize: 'clamp(36px, 4vw, 56px)',
                                    fontWeight: 700,
                                    lineHeight: 1.1,
                                    letterSpacing: '-0.02em',
                                    color: '#F9F5EE',
                                    opacity: visible ? 1 : 0,
                                    transform: visible ? 'translateY(0)' : 'translateY(16px)',
                                    transition: 'opacity 700ms ease 300ms, transform 700ms ease 300ms',
                                }}
                            >
                                The real <br />
                                <span style={{ color: '#C9A84C', fontStyle: 'italic' }}>
                                    stories
                                </span>
                                <br /> behind <br /> our brand
                            </h2>
                        </div>

                        <div
                            style={{
                                opacity: visible ? 1 : 0,
                                transform: visible ? 'translateY(0)' : 'translateY(12px)',
                                transition: 'opacity 700ms ease 500ms, transform 700ms ease 500ms',
                            }}
                        >
                            <p
                                className="mb-8"
                                style={{
                                    fontFamily: "'Raleway', sans-serif",
                                    fontSize: '14px',
                                    lineHeight: 1.75,
                                    color: 'rgba(249,245,238,0.5)',
                                    maxWidth: '320px',
                                }}
                            >
                                Long-form writing on craft, heritage, and the quiet precision that goes into every saree we carry.
                            </p>

                            <Link
                                to="/journal"
                                className="inline-flex items-center gap-3 group"
                                style={{
                                    fontFamily: "'Inter', sans-serif",
                                    fontSize: '11px',
                                    fontWeight: 700,
                                    letterSpacing: '0.2em',
                                    textTransform: 'uppercase',
                                    color: '#F9F5EE',
                                    textDecoration: 'none',
                                }}
                            >
                                <span
                                    style={{
                                        display: 'inline-flex',
                                        alignItems: 'center',
                                        justifyContent: 'center',
                                        width: '40px',
                                        height: '40px',
                                        borderRadius: '8px',
                                        border: '1px solid rgba(249,245,238,0.25)',
                                        transition: 'background 500ms ease, border-color 500ms ease',
                                    }}
                                    className="group-hover:bg-[#780000] group-hover:border-[#780000]"
                                >
                                    <ArrowUpRight size={15} />
                                </span>
                                Explore the chronicles
                            </Link>
                        </div>
                    </div>

                    {/* ── Right column: article list ── */}
                    <div className="py-16 lg:py-24 lg:pl-16 flex flex-col justify-center gap-0">
                        {articles.map((article, i) => (
                            <Link
                                key={article.issue}
                                to="/journal"
                                className="group block"
                                style={{
                                    textDecoration: 'none',
                                    borderBottom: i < articles.length - 1
                                        ? '1px solid rgba(201,168,76,0.12)'
                                        : 'none',
                                    padding: '28px 0',
                                    opacity: visible ? 1 : 0,
                                    transform: visible ? 'translateX(0)' : 'translateX(24px)',
                                    transition: `opacity 600ms ease ${400 + i * 120}ms, transform 600ms ease ${400 + i * 120}ms`,
                                }}
                            >
                                <div className="flex items-start justify-between gap-6">
                                    <div className="flex items-start gap-6 flex-1 min-w-0">
                                        {/* Issue number */}
                                        <span
                                            aria-hidden="true"
                                            style={{
                                                fontFamily: "'Playfair Display', serif",
                                                fontSize: '11px',
                                                fontWeight: 700,
                                                letterSpacing: '0.1em',
                                                color: 'rgba(201,168,76,0.4)',
                                                paddingTop: '3px',
                                                flexShrink: 0,
                                                transition: 'color 400ms ease',
                                            }}
                                            className="group-hover:text-[#C9A84C]"
                                        >
                                            {article.issue}
                                        </span>

                                        <div className="flex-1 min-w-0">
                                            {/* Tag pill */}
                                            <span
                                                className="inline-block mb-2"
                                                style={{
                                                    fontFamily: "'Inter', sans-serif",
                                                    fontSize: '9px',
                                                    fontWeight: 700,
                                                    letterSpacing: '0.18em',
                                                    textTransform: 'uppercase',
                                                    color: 'rgba(249,245,238,0.4)',
                                                    border: '1px solid rgba(249,245,238,0.12)',
                                                    borderRadius: '4px',
                                                    padding: '3px 8px',
                                                }}
                                            >
                                                {article.tag}
                                            </span>

                                            <h3
                                                className="mb-2"
                                                style={{
                                                    fontFamily: "'Playfair Display', serif",
                                                    fontSize: '19px',
                                                    fontWeight: 700,
                                                    letterSpacing: '-0.01em',
                                                    lineHeight: 1.25,
                                                    color: '#F9F5EE',
                                                    transition: 'color 400ms ease',
                                                }}
                                            >
                                                {article.title}
                                            </h3>

                                            <p
                                                style={{
                                                    fontFamily: "'Raleway', sans-serif",
                                                    fontSize: '13px',
                                                    lineHeight: 1.65,
                                                    color: 'rgba(249,245,238,0.45)',
                                                    maxWidth: '460px',
                                                    margin: 0,
                                                    transition: 'color 400ms ease',
                                                }}
                                                className="group-hover:text-[rgba(249,245,238,0.7)]"
                                            >
                                                {article.excerpt}
                                            </p>
                                        </div>
                                    </div>

                                    {/* Read time + arrow */}
                                    <div
                                        className="flex flex-col items-end gap-3 flex-shrink-0 pt-1"
                                    >
                                        <span
                                            style={{
                                                fontFamily: "'Inter', sans-serif",
                                                fontSize: '10px',
                                                fontWeight: 700,
                                                letterSpacing: '0.1em',
                                                textTransform: 'uppercase',
                                                color: 'rgba(249,245,238,0.3)',
                                                whiteSpace: 'nowrap',
                                            }}
                                        >
                                            {article.readTime}
                                        </span>
                                        <span
                                            style={{
                                                display: 'inline-flex',
                                                alignItems: 'center',
                                                justifyContent: 'center',
                                                width: '32px',
                                                height: '32px',
                                                borderRadius: '8px',
                                                border: '1px solid rgba(249,245,238,0.1)',
                                                color: 'rgba(249,245,238,0.3)',
                                                opacity: 0,
                                                transform: 'translateX(-6px)',
                                                transition: 'opacity 400ms ease, transform 400ms ease, background 400ms ease',
                                            }}
                                            className="group-hover:!opacity-100 group-hover:!translate-x-0 group-hover:bg-[#780000] group-hover:border-[#780000] group-hover:text-white"
                                        >
                                            <ArrowUpRight size={14} />
                                        </span>
                                    </div>
                                </div>
                            </Link>
                        ))}
                    </div>
                </div>

                {/* Bottom rule */}
                <div
                    style={{
                        height: '1px',
                        backgroundColor: 'rgba(201,168,76,0.25)',
                        transition: 'transform 700ms ease 800ms',
                        transformOrigin: 'right',
                        transform: visible ? 'scaleX(1)' : 'scaleX(0)',
                    }}
                />
            </div>
        </section>
    );
};

export default JournalHint;

// --- FILE: DrapedEveryMoment.tsx ---

import React from 'react';

const DrapedEveryMoment: React.FC = () => {
    const occasions = [
        {
            image: 'https://images.unsplash.com/photo-1610030469983-98e550d6193c?w=800',
            label: 'BRIDAL COLLECTION',
            title: 'Wedding Elegance',
            description: 'Timeless silks for your most cherished celebration.',
            stagger: false,
        },
        {
            image: 'https://images.unsplash.com/photo-1610030469668-935142b9cdd0?w=800',
            label: 'CELEBRATION',
            title: 'Golden Beginnings',
            description: 'Graceful weaves for moments worth remembering.',
            stagger: true,
        },
        {
            image: 'https://images.unsplash.com/photo-1605697040720-18df82424b9a?w=800',
            label: 'DAILY HERITAGE',
            title: 'Effortless Grace',
            description: 'Comfort meets traditional craftsmanship.',
            stagger: false,
        },
        {
            image: 'https://images.unsplash.com/photo-1607344645866-009c320c5ab8?w=800',
            label: 'THOUGHTFUL GIFTS',
            title: 'A Gift Of Tradition',
            description: "Share a piece of India's weaving legacy.",
            stagger: true,
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
                        className="img-zoom"
                        style={{ position: 'relative', aspectRatio: '1', display: 'block', overflow: 'hidden', background: '#111' }}
                    >
                        <img src={item.image} alt="Instagram" style={{ width: '100%', height: '100%', objectFit: 'cover', opacity: 0.75, transition: 'opacity 0.4s' }} />
                        <div
                            style={{ position: 'absolute', inset: 0, background: 'rgba(201,168,76,0.25)', opacity: 0, transition: 'opacity 0.4s', display: 'flex', alignItems: 'center', justifyContent: 'center' }}
                            onMouseEnter={e => ((e.currentTarget as HTMLDivElement).style.opacity = '1')}
                            onMouseLeave={e => ((e.currentTarget as HTMLDivElement).style.opacity = '0')}
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


// --- FILE: WhatsAppOrder.tsx ---

import React, { useState } from 'react';
import styled from 'styled-components';
import { motion } from 'framer-motion';
import { MessageCircle, Send, CheckCircle, Clock, Heart, ShoppingBag, Tag, Sparkles, Phone, Users } from 'lucide-react';

const WhatsAppOrder = () => {
  const [phoneNumber, setPhoneNumber] = useState('');
  const [message, setMessage] = useState('');
  const [showForm, setShowForm] = useState(false);

  const handleWhatsAppClick = () => {
    // Pre-filled message
    const defaultMessage = "Namaste! 🙏 I'm interested in your handwoven collection. Can you please help me with:";
    const encodedMessage = encodeURIComponent(defaultMessage);

    // Your WhatsApp number (replace with your actual number)
    const yourNumber = "919876543210"; // Format: country code + number, no + or spaces

    window.open(`https://wa.me/${yourNumber}?text=${encodedMessage}`, '_blank');
  };

  const handleQuickOrder = (productType, weaveType) => {
    const quickMessage = `Namaste! 🙏 I'm interested in ${productType} with ${weaveType} weave. Can you please share the available options and prices?`;
    const encodedMessage = encodeURIComponent(quickMessage);
    const yourNumber = "919876543210";

    window.open(`https://wa.me/${yourNumber}?text=${encodedMessage}`, '_blank');
  };

  const handleWeaveInquiry = (weaveName) => {
    const quickMessage = `Namaste! 🙏 I'd like to know more about your ${weaveName} collection. Can you share available sarees in this weave?`;
    const encodedMessage = encodeURIComponent(quickMessage);
    const yourNumber = "919876543210";

    window.open(`https://wa.me/${yourNumber}?text=${encodedMessage}`, '_blank');
  };

  return (
    <StyledSection>
      <div className="container">
        {/* Decorative textile elements */}
        <div className="textile-overlay"></div>
        <div className="thread-lines">
          <div className="thread thread-1"></div>
          <div className="thread thread-2"></div>
          <div className="thread thread-3"></div>
        </div>
        <div className="pattern-weave"></div>

        <div className="content-wrapper">
          {/* Left side - Main CTA */}
          <motion.div
            className="left-content"
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <div className="badge">
              <MessageCircle className="badge-icon" size={16} />
              <span>Artisan Stylist</span>
            </div>

            <h2 className="title">
              Connect with Our
              <span className="highlight">
                <span className="whatsapp-text"> Master Weavers</span>
                <img
                  src="https://upload.wikimedia.org/wikipedia/commons/6/6b/WhatsApp.svg"
                  alt="WhatsApp"
                  className="whatsapp-icon"
                />
              </span>
            </h2>

            <p className="description">
              Speak directly with the artisans who create our masterpieces. Personal styling advice from the hands that weave tradition.
            </p>

            <div className="features">
              <div className="feature">
                <div className="feature-icon primary-bg">
                  <MessageCircle size={18} />
                </div>
                <span>Direct chat with master weavers</span>
              </div>
              <div className="feature">
                <div className="feature-icon primary-bg">
                  <Send size={18} />
                </div>
                <span>Share your vision, get custom recommendations</span>
              </div>
              <div className="feature">
                <div className="feature-icon primary-bg">
                  <Users size={18} />
                </div>
                <span>Bridal trousseau & family orders</span>
              </div>
            </div>

            <motion.button
              className="whatsapp-button"
              onClick={handleWhatsAppClick}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <MessageCircle size={24} />
              <span>Chat with Artisan</span>
              <Send size={18} className="send-icon" />
            </motion.button>

            <p className="small-note">
              👋 No bots or automated replies. Every message is answered by our weaving community.
            </p>
          </motion.div>

        </div>

        {/* Stats banner */}
        <motion.div
          className="stats-banner"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          viewport={{ once: true }}
        >
          <div className="stat-item">
            <span className="stat-number">20 min</span>
            <span className="stat-label">Avg. response time</span>
          </div>
          <div className="divider"></div>
          <div className="stat-item">
            <span className="stat-number">1000+</span>
            <span className="stat-label">Weddings styled</span>
          </div>
          <div className="divider"></div>
          <div className="stat-item">
            <span className="stat-number">7th Gen</span>
            <span className="stat-label">Weaver families</span>
          </div>
        </motion.div>

        {/* Business hours note */}
        <div className="business-hours">
          <Clock size={14} />
          <span>Artisans available 9 AM - 8 PM (IST). Weekend inquiries celebrated on Monday.</span>
        </div>
      </div>
    </StyledSection>
  );
};

const StyledSection = styled.section`
  padding: 100px 0;
  background: #F8EDED; // --brand-bg
  position: relative;
  overflow: hidden;

  .container {
    max-width: 1200px;
    margin: 0 auto;
    padding: 0 24px;
    position: relative;
    z-index: 2;
  }

  /* Textile overlay */
  .textile-overlay {
    position: absolute;
    inset: 0;
    background-image: url("data:image/svg+xml,%3Csvg width='40' height='40' viewBox='0 0 40 40' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M0 0h40v2H0V0zm0 4h40v2H0V4zm0 4h40v2H0V8zm0 4h40v2H0v-2zm0 4h40v2H0v-2zm0 4h40v2H0v-2zm0 4h40v2H0v-2zm0 4h40v2H0v-2zm0 4h40v2H0v-2zm0 4h40v2H0v-2z' fill='%23B43F3F' fill-opacity='0.03' fill-rule='evenodd'/%3E%3C/svg%3E");
    opacity: 0.5;
    pointer-events: none;
    z-index: 1;
  }

  /* Animated thread lines */
  .thread-lines {
    position: absolute;
    inset: 0;
    pointer-events: none;
    z-index: 1;
  }

  .thread {
    position: absolute;
    height: 1px;
    width: 100%;
    background: linear-gradient(90deg, 
      transparent 0%, 
      rgba(180, 63, 63, 0.1) 20%, 
      rgba(255, 130, 37, 0.2) 50%,
      rgba(180, 63, 63, 0.1) 80%, 
      transparent 100%
    );
  }

  .thread-1 {
    top: 15%;
    animation: slideThread 20s linear infinite;
  }

  .thread-2 {
    top: 45%;
    animation: slideThread 25s linear infinite reverse;
  }

  .thread-3 {
    top: 75%;
    animation: slideThread 22s linear infinite;
  }

  @keyframes slideThread {
    0% { transform: translateX(-100%); }
    100% { transform: translateX(100%); }
  }

  /* Weave pattern */
  .pattern-weave {
    position: absolute;
    inset: 0;
    background-image: 
      linear-gradient(45deg, rgba(180, 63, 63, 0.02) 25%, transparent 25%),
      linear-gradient(-45deg, rgba(255, 130, 37, 0.02) 25%, transparent 25%);
    background-size: 60px 60px;
    pointer-events: none;
    z-index: 1;
  }

  .content-wrapper {
    display: flex;
    flex-direction: column;
    align-items: center;
    text-align: center;
    max-width: 800px;
    margin: 0 auto 40px auto;
    position: relative;
    z-index: 3;
  }

  .left-content {
    display: flex;
    flex-direction: column;
    align-items: center;
  }

  .badge {
    display: inline-flex;
    align-items: center;
    gap: 8px;
    background: rgba(255, 130, 37, 0.1);
    color: #FF8225;
    padding: 8px 16px;
    border-radius: 40px;
    font-size: 0.85rem;
    font-weight: 500;
    margin-bottom: 24px;
    border: 1px solid rgba(255, 130, 37, 0.2);
    letter-spacing: 0.05em;
  }

  .badge-icon {
    color: #FF8225;
  }

  .title {
    font-size: 3rem;
    font-weight: 500;
    line-height: 1.2;
    margin-bottom: 20px;
    color: #173B45;
    font-family: 'Playfair Display', serif;
  }

  .highlight {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    gap: 8px;
    background: linear-gradient(135deg, #1C1612, #333333);
    padding: 4px 16px 4px 20px;
    border-radius: 50px;
    margin-left: 8px;
  }

  .whatsapp-text {
    color: #F8EDED;
    font-family: 'Inter', sans-serif;
    font-size: 1.8rem;
    font-weight: 500;
  }

  .whatsapp-icon {
    width: 28px;
    height: 28px;
    filter: brightness(0) invert(1);
  }

  .description {
    font-size: 1.1rem;
    color: rgba(23, 59, 69, 0.7);
    line-height: 1.6;
    margin-bottom: 30px;
    max-width: 600px;
    font-family: 'Inter', sans-serif;
  }

  .features {
    display: flex;
    flex-direction: column;
    gap: 16px;
    margin-bottom: 30px;
  }

  .feature {
    display: flex;
    align-items: center;
    gap: 12px;
    color: #173B45;
  }

  .feature-icon {
    width: 36px;
    height: 36px;
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
    color: #F8EDED;
  }

  .primary-bg {
    background: #B43F3F;
  }

  .whatsapp-button {
    background: #B43F3F;
    color: #F8EDED;
    border: none;
    padding: 18px 32px;
    border-radius: 50px;
    font-size: 1.1rem;
    font-weight: 500;
    display: flex;
    align-items: center;
    gap: 12px;
    cursor: pointer;
    box-shadow: 0 20px 30px -10px rgba(180, 63, 63, 0.3);
    margin-bottom: 16px;
    transition: all 0.3s ease;
    font-family: 'Inter', sans-serif;
    letter-spacing: 0.05em;

    &:hover {
      background: #FF8225;
      transform: translateY(-2px);
      box-shadow: 0 25px 35px -10px rgba(255, 130, 37, 0.4);
    }
  }

  .send-icon {
    margin-left: 4px;
    transition: transform 0.3s ease;
  }

  .whatsapp-button:hover .send-icon {
    transform: translateX(4px);
  }

  .small-note {
    font-size: 0.9rem;
    color: rgba(23, 59, 69, 0.5);
    font-style: italic;
    font-family: 'Inter', sans-serif;
  }

  /* Right content styles */
  .right-content {
    background: rgba(248, 237, 237, 0.8);
    backdrop-filter: blur(10px);
    border-radius: 30px;
    padding: 35px;
    box-shadow: 0 20px 40px rgba(23, 59, 69, 0.08);
    border: 1px solid rgba(180, 63, 63, 0.15);
    position: relative;
    overflow: hidden;
  }

  .quick-order-header {
    margin-bottom: 24px;

    h3 {
      font-size: 1.6rem;
      font-weight: 500;
      color: #173B45;
      margin-bottom: 4px;
      font-family: 'Playfair Display', serif;
    }

    p {
      color: rgba(23, 59, 69, 0.6);
      font-size: 0.95rem;
      font-family: 'Inter', sans-serif;
    }
  }

  .quick-order-grid {
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    gap: 12px;
    margin-bottom: 20px;
  }

  .quick-order-card {
    background: #F8EDED;
    border-radius: 20px;
    padding: 16px;
    display: flex;
    align-items: center;
    gap: 12px;
    cursor: pointer;
    transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
    border: 1px solid rgba(180, 63, 63, 0.1);
    position: relative;
    overflow: hidden;

    &::before {
      content: '';
      position: absolute;
      top: 0;
      left: 0;
      right: 0;
      height: 2px;
      background: linear-gradient(90deg, #B43F3F, #FF8225);
      transform: translateX(-100%);
      transition: transform 0.4s ease;
    }

    &:hover {
      border-color: #FF8225;
      background: white;
      transform: translateY(-4px);
      box-shadow: 0 15px 30px rgba(180, 63, 63, 0.1);

      &::before {
        transform: translateX(0);
      }
    }

    .card-badge {
      position: absolute;
      top: 8px;
      right: 8px;
      background: linear-gradient(135deg, #B43F3F, #FF8225);
      color: #F8EDED;
      padding: 2px 8px;
      border-radius: 20px;
      font-size: 0.6rem;
      font-weight: 500;
      letter-spacing: 0.05em;
    }

    .item-emoji {
      font-size: 1.8rem;
    }

    .item-details {
      flex: 1;
      display: flex;
      flex-direction: column;
    }

    .item-name {
      font-weight: 600;
      color: #173B45;
      font-size: 0.9rem;
      font-family: 'Inter', sans-serif;
    }

    .item-weave {
      font-size: 0.7rem;
      color: #B43F3F;
      font-weight: 500;
      margin-top: 2px;
    }

    .item-price {
      font-size: 0.75rem;
      color: #FF8225;
      font-weight: 600;
      margin-top: 4px;
    }

    .item-whatsapp {
      color: #B43F3F;
      opacity: 0.3;
      transition: opacity 0.3s ease;
    }

    &:hover .item-whatsapp {
      opacity: 1;
    }
  }

  .weave-quick-row {
    margin-bottom: 20px;
    
    .weave-label {
      font-size: 0.85rem;
      color: rgba(23, 59, 69, 0.6);
      margin-bottom: 8px;
      font-family: 'Inter', sans-serif;
    }
    
    .weave-tags {
      display: flex;
      flex-wrap: wrap;
      gap: 8px;
    }
    
    .weave-tag {
      padding: 6px 14px;
      background: #F8EDED;
      border: 1px solid rgba(180, 63, 63, 0.2);
      border-radius: 30px;
      font-size: 0.8rem;
      font-weight: 500;
      color: #B43F3F;
      cursor: pointer;
      transition: all 0.3s ease;
      font-family: 'Inter', sans-serif;
      
      &:hover {
        background: #FF8225;
        color: #F8EDED;
        border-color: #FF8225;
      }
    }
  }

  .testimonial-note {
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 8px;
    padding: 12px;
    background: rgba(180, 63, 63, 0.05);
    border-radius: 30px;
    color: #B43F3F;
    font-size: 0.9rem;
    font-family: 'Inter', sans-serif;

    .heart-icon {
      color: #B43F3F;
      fill: #B43F3F;
    }
  }

  /* Stats banner */
  .stats-banner {
    background: #173B45;
    border-radius: 60px;
    padding: 30px;
    display: flex;
    align-items: center;
    justify-content: space-around;
    margin: 40px 0 20px;
    box-shadow: 0 15px 35px rgba(23, 59, 69, 0.2);
    border: 1px solid rgba(255, 130, 37, 0.2);
    position: relative;
    z-index: 3;
  }

  .stat-item {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 4px;
  }

  .stat-number {
    font-size: 2rem;
    font-weight: 500;
    color: #FF8225;
    font-family: 'Playfair Display', serif;
  }

  .stat-label {
    font-size: 0.85rem;
    color: rgba(248, 237, 237, 0.7);
    font-family: 'Inter', sans-serif;
    letter-spacing: 0.05em;
  }

  .divider {
    width: 1px;
    height: 40px;
    background: rgba(255, 130, 37, 0.2);
  }

  .business-hours {
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 8px;
    color: rgba(23, 59, 69, 0.6);
    font-size: 0.9rem;
    margin-top: 16px;
    font-family: 'Inter', sans-serif;

    svg {
      color: #FF8225;
    }
  }

  /* Responsive styles */
  @media (max-width: 968px) {
    .content-wrapper {
      grid-template-columns: 1fr;
      gap: 40px;
    }

    .title {
      font-size: 2.5rem;
    }
  }

  @media (max-width: 768px) {
    padding: 60px 0;

    .title {
      font-size: 2rem;
    }

    .highlight .whatsapp-text {
      font-size: 1.5rem;
    }

    .quick-order-grid {
      grid-template-columns: 1fr;
    }

    .stats-banner {
      flex-direction: column;
      gap: 20px;
      border-radius: 30px;
      padding: 20px;
    }

    .divider {
      width: 80%;
      height: 1px;
    }
  }
`;

export default WhatsAppOrder;

// --- FILE: RegisterModal.tsx ---

import React, { useState, useEffect } from 'react';
import { X, Mail, Sparkles } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const RegisterModal: React.FC = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [email, setEmail] = useState('');

    useEffect(() => {
        // Show modal after 2 seconds only if not shown before
        const hasSeenModal = localStorage.getItem('hasSeenRegisterModal');
        if (!hasSeenModal) {
            const timer = setTimeout(() => setIsOpen(true), 2000);
            return () => clearTimeout(timer);
        }
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


// --- FILE: TrustBar.tsx ---

import React from 'react';

const trustItems = [
    { icon: '✓', title: '100% Authentic', sub: 'Direct from Loom' },
    { icon: '⟶', title: 'Global Shipping', sub: 'Fast & Insured' },
    { icon: '◈', title: 'Premium Fabrics', sub: 'Hand-picked' },
    { icon: '↺', title: '7-Day Returns', sub: 'Hassle Free' },
];

const TrustBar: React.FC = () => {
    return (
        <div style={{ background: 'var(--gold)', padding: '0 max(48px, 6vw)' }}>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))', borderTop: '1px solid rgba(13,11,10,0.15)' }}>
                {trustItems.map((item, i) => (
                    <div key={i} style={{ padding: '32px 24px', textAlign: 'center', borderRight: i < trustItems.length - 1 ? '1px solid rgba(13,11,10,0.15)' : 'none' }}>
                        <span style={{ fontFamily: 'Montserrat, sans-serif', fontSize: 18, color: 'var(--ink)', display: 'block', marginBottom: 8 }}>{item.icon}</span>
                        <p style={{ fontFamily: 'Montserrat, sans-serif', fontSize: 9, fontWeight: 700, color: 'var(--ink)', letterSpacing: '0.15em', textTransform: 'uppercase', marginBottom: 4 }}>{item.title}</p>
                        <p style={{ fontFamily: 'Montserrat, sans-serif', fontSize: 8, color: 'rgba(13,11,10,0.6)', letterSpacing: '0.1em' }}>{item.sub}</p>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default TrustBar;


// --- FILE: Home.tsx ---

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

// ── New Components ──
import HandwovenHeritage from './sections/HandwovenHeritage';
import DrapedEveryMoment from './sections/DrapedEveryMoment';
import JournalHint from './sections/JournalHint';
import MensTraditionalAttireBanner from './sections/MensTraditionalAttireBanner';
import ModernMuse from './sections/ModernMuse';
import VideoBanner from './sections/VideoBanner';

const Home: React.FC = () => {
  const { products, fetchProducts, loading } = useStore();
  const [newArrivals, setNewArrivals] = useState<any[]>([]);
  const [bestsellers, setBestsellers] = useState<any[]>([]);

  useEffect(() => {
    fetchProducts({ limit: 12, sort: '-createdAt' });
  }, []);

  useEffect(() => {
    if (products.length > 0) {
      setNewArrivals(products.slice(0, 4));
      setBestsellers(products.filter((p: any) => p.isBestSeller).slice(0, 4));
    }
  }, [products]);

  if (loading && products.length === 0) {
    return (
      <div className="bg-tanvoBg min-h-screen flex items-center justify-center relative">
        <div className="absolute inset-0 pointer-events-none opacity-50" style={{ backgroundImage: `url("data:image/svg+xml,%3Csvg width='40' height='40' viewBox='0 0 40 40' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M0 0h40v2H0V0zm0 4h40v2H0V4zm0 4h40v2H0V8zm0 4h40v2H0v-2zm0 4h40v2H0v-2zm0 4h40v2H0v-2zm0 4h40v2H0v-2zm0 4h40v2H0v-2zm0 4h40v2H0v-2zm0 4h40v2H0v-2z' fill='%23B43F3F' fill-opacity='0.02' fill-rule='evenodd'/%3E%3C/svg%3E")` }} />
        <div className="text-center relative z-10">
          <div className="w-10 h-10 border-2 border-tanvoPrimary border-t-tanvoAccent rounded-full animate-spin mx-auto mb-6" />
          <p className="font-sans text-[10px] tracking-[0.3em] uppercase text-tanvoDark opacity-70">Weaving your experience</p>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-tanvoBg overflow-x-hidden relative font-sans">
      {/* textile overlay */}
      <div className="fixed inset-0 pointer-events-none opacity-50 z-1" style={{ backgroundImage: `url("data:image/svg+xml,%3Csvg width='40' height='40' viewBox='0 0 40 40' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M0 0h40v2H0V0zm0 4h40v2H0V4zm0 4h40v2H0V8zm0 4h40v2H0v-2zm0 4h40v2H0v-2zm0 4h40v2H0v-2zm0 4h40v2H0v-2zm0 4h40v2H0v-2zm0 4h40v2H0v-2zm0 4h40v2H0v-2z' fill='%23B43F3F' fill-opacity='0.02' fill-rule='evenodd'/%3E%3C/svg%3E")` }} />

      <div className="relative z-10">
        <HeroSection />
        <VideoBanner />

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

        <HandwovenHeritage />

        {/* Sarees directly after hero for buying */}
        <ProductsGrid
          products={products.slice(0, 4)}
          label="Direct from the Loom"
          title="Curated"
          titleEm="Selection"
          viewAllLink="/shop"
          viewAllText="Explore All Sarees"
          background="white"
        />

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

        <IkatDeepDive />

        <EditorialBanner />
        <CategoryGrid />
        <WhyChooseUs />
        <MensTraditionalAttireBanner />
        <ModernMuse />

        <TrustSignals />
        <JournalHint />
        <DrapedEveryMoment />

        <InstagramSection
          handle="@Tanvo"
          profileUrl="https://instagram.com"
        />
        <WhatsAppOrder />
        <TrustBar />
      </div>
    </div>
  );
};

export default Home;