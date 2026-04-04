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
