import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Facebook, Instagram, Youtube, Mail, MapPin, Phone, ArrowUpRight, Heart, ChevronUp } from 'lucide-react';

const Footer: React.FC = () => {
  const [isMobile, setIsMobile] = useState(false);
  const [email, setEmail] = useState('');
  const [isSubscribed, setIsSubscribed] = useState(false);

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth <= 768);
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  const scrollToTop = () => window.scrollTo({ top: 0, behavior: 'smooth' });

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (email) {
      setIsSubscribed(true);
      setEmail('');
      setTimeout(() => setIsSubscribed(false), 3000);
    }
  };

  return (
    <footer style={{
      background: 'var(--ink)',
      position: 'relative',
      overflow: 'hidden',
      fontFamily: "'Raleway', sans-serif"
    }}>
      <style>{`
        .footer-link {
          display: inline-flex;
          align-items: center;
          gap: 8px;
          font-family: 'Raleway', sans-serif;
          font-size: 12px;
          font-weight: 300;
          color: rgba(249,245,238,0.45);
          text-decoration: none;
          transition: all 0.35s cubic-bezier(0.2, 0.9, 0.4, 1.1);
          letter-spacing: 0.02em;
        }
        .footer-link:hover { 
          color: var(--terra); 
          transform: translateX(6px);
          gap: 12px;
        }

        .social-icon {
          transition: all 0.3s cubic-bezier(0.2, 0.9, 0.4, 1.1);
          cursor: pointer;
          opacity: 0.4;
        }
        .social-icon:hover {
          opacity: 1;
          transform: translateY(-3px);
        }

        .newsletter-input {
          background: rgba(249,245,238,0.03);
          border: 1px solid rgba(249,245,238,0.1);
          outline: none;
          font-family: 'Raleway', sans-serif;
          font-size: 13px;
          font-weight: 300;
          color: var(--ivory);
          padding: 14px 18px;
          width: 100%;
          transition: all 0.3s ease;
        }
        .newsletter-input:focus {
          border-color: rgba(181,80,43,0.5);
          background: rgba(249,245,238,0.05);
        }
        .newsletter-input::placeholder {
          color: rgba(249,245,238,0.25);
        }

        .art-image {
          width: 100%;
          height: auto;
          display: block;
          transition: transform 0.6s cubic-bezier(0.2, 0.9, 0.4, 1.1);
        }
        .art-image:hover {
          transform: scale(1.02);
        }

        .back-to-top {
          background: transparent;
          border: 1px solid rgba(249,245,238,0.15);
          color: rgba(249,245,238,0.5);
          padding: 10px 20px;
          font-size: 8px;
          cursor: pointer;
          text-transform: uppercase;
          letter-spacing: 0.25em;
          transition: all 0.3s ease;
          font-family: 'Cinzel', serif;
          font-weight: 400;
        }
        .back-to-top:hover {
          background: var(--terra);
          color: var(--ivory);
          border-color: var(--terra);
          transform: translateY(-2px);
        }

        @keyframes fadeInUp {
          from { opacity: 0; transform: translateY(20px); }
          to   { opacity: 1; transform: translateY(0); }
        }

        .footer-section {
          animation: fadeInUp 0.6s ease forwards;
        }

        .responsive-art-image {
          width: 100%;
          height: auto;
          display: block;
        }
      `}</style>

      {/* Subtle warm radial glow */}
      <div style={{
        position: 'absolute', top: '10%', right: '-5%',
        width: '300px', height: '300px',
        background: 'radial-gradient(circle, rgba(181,80,43,0.04) 0%, transparent 70%)',
        borderRadius: '50%', pointerEvents: 'none'
      }} />
      <div style={{
        position: 'absolute', bottom: '20%', left: '-5%',
        width: '400px', height: '400px',
        background: 'radial-gradient(circle, rgba(181,80,43,0.02) 0%, transparent 70%)',
        borderRadius: '50%', pointerEvents: 'none'
      }} />

      {/* Main Content */}
      <div style={{ padding: '80px clamp(24px, 6vw, 80px) 0', position: 'relative', zIndex: 5 }}>

        {/* Top Section - Brand Story */}
        <div className="footer-section" style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'flex-start',
          flexWrap: 'wrap',
          gap: 48,
          marginBottom: 80
        }}>
          <div style={{ flex: '1 1 450px' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 24 }}>
              <div style={{ width: 28, height: 1, background: 'var(--terra)' }} />
              <span style={{
                fontFamily: "'Cinzel', serif",
                fontSize: 9,
                letterSpacing: '0.32em',
                color: 'var(--terra)',
                textTransform: 'uppercase',
                fontWeight: 500
              }}>The Art of Weaving</span>
            </div>
            <h2 style={{
              fontFamily: "'Cormorant Garamond', serif",
              fontSize: 'clamp(32px, 4vw, 52px)',
              color: 'var(--ivory)',
              margin: '0 0 28px 0',
              fontStyle: 'italic',
              fontWeight: 300,
              lineHeight: 1.0,
              letterSpacing: '-0.02em'
            }}>
              Every thread<br />
              <span style={{
                background: 'linear-gradient(135deg, var(--terra) 0%, var(--terra-light) 100%)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                fontStyle: 'normal'
              }}>tells a story</span>
            </h2>
            <p style={{
              color: 'rgba(249,245,238,0.5)',
              fontSize: 13,
              lineHeight: 1.75,
              maxWidth: '480px',
              fontWeight: 300,
              fontFamily: "'Raleway', sans-serif"
            }}>
              As a heritage-driven collective, we're on a mission to bring hand-curated elegance
              to the modern wardrobe. Rooted in tradition and driven by creativity, our
              experiences have reached homes across India. And guess what? We're just getting started.
            </p>
          </div>

          {/* Newsletter Section */}
          <div style={{ flex: '0 1 340px', background: 'rgba(249,245,238,0.03)', padding: '32px', backdropFilter: 'blur(10px)', border: '1px solid rgba(249,245,238,0.06)' }}>
            <div style={{
              display: 'flex',
              alignItems: 'center',
              gap: 8,
              marginBottom: 16
            }}>
              <Mail size={16} color="var(--terra)" />
              <p style={{ color: 'var(--terra)', fontSize: 10, fontWeight: 500, letterSpacing: '0.28em', textTransform: 'uppercase', fontFamily: "'Cinzel',serif", margin: 0 }}>
                Newsletter
              </p>
            </div>
            <p style={{ color: 'rgba(249,245,238,0.4)', fontSize: 12, fontWeight: 300, marginBottom: 24, lineHeight: 1.6, fontFamily: "'Raleway',sans-serif" }}>
              Join our community to receive exclusive offers and stories from master weavers.
            </p>
            <form onSubmit={handleSubscribe} style={{ display: 'flex', gap: 12, flexDirection: 'column' }}>
              <input
                type="email"
                placeholder="Your email address"
                className="newsletter-input"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
              <button style={{
                background: 'var(--terra)',
                color: 'var(--ivory)',
                border: 'none',
                padding: '12px 24px',
                fontSize: 9,
                fontWeight: 500,
                cursor: 'pointer',
                letterSpacing: '0.28em',
                textTransform: 'uppercase',
                transition: 'all 0.3s ease',
                fontFamily: "'Cinzel', serif"
              }}
                onMouseEnter={(e) => e.currentTarget.style.background = 'var(--terra-light)'}
                onMouseLeave={(e) => e.currentTarget.style.background = 'var(--terra)'}
              >
                {isSubscribed ? '✓ Subscribed' : 'Subscribe'}
              </button>
            </form>
            {isSubscribed && (
              <p style={{ color: 'var(--terra)', fontSize: 11, marginTop: 12, textAlign: 'center', fontFamily: "'Cinzel',serif", letterSpacing: '0.2em' }}>
                Thank you ✦
              </p>
            )}
          </div>
        </div>

        {/* Links Grid */}
        <div className="footer-section" style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
          gap: 48,
          paddingBottom: 60,
          borderBottom: '1px solid rgba(249,245,238,0.07)'
        }}>
          <div>
            <p style={{
              color: 'rgba(249,245,238,0.35)',
              fontWeight: 500,
              fontSize: 9,
              marginBottom: 28,
              letterSpacing: '0.28em',
              textTransform: 'uppercase',
              fontFamily: "'Cinzel',serif"
            }}>Our Policies</p>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
              <Link to="/terms" className="footer-link">Terms of Service</Link>
              <Link to="/shipping" className="footer-link">Shipping Policy</Link>
              <Link to="/refund" className="footer-link">Refund Policy</Link>
              <Link to="/privacy" className="footer-link">Privacy Policy</Link>
              <Link to="/contact" className="footer-link">Contact Us</Link>
            </div>
          </div>

          <div>
            <p style={{
              color: 'rgba(249,245,238,0.35)',
              fontWeight: 500,
              fontSize: 9,
              marginBottom: 28,
              letterSpacing: '0.28em',
              textTransform: 'uppercase',
              fontFamily: "'Cinzel',serif"
            }}>Connect With Us</p>
            <div style={{ display: 'flex', gap: 24, marginBottom: 32 }}>
              <Instagram size={20} className="social-icon" color="rgba(248, 237, 237, 0.6)" />
              <Facebook size={20} className="social-icon" color="rgba(248, 237, 237, 0.6)" />
              <Youtube size={20} className="social-icon" color="rgba(248, 237, 237, 0.6)" />
            </div>
            <div style={{ marginTop: 24 }}>
              <p style={{ color: 'rgba(249,245,238,0.3)', fontSize: 11, marginBottom: 10, display: 'flex', alignItems: 'center', gap: 8, fontFamily: "'Raleway',sans-serif", fontWeight: 300 }}>
                <MapPin size={11} style={{ color: 'var(--terra)', flexShrink: 0 }} /> Bhubaneswar, Odisha
              </p>
              <p style={{ color: 'rgba(249,245,238,0.3)', fontSize: 11, display: 'flex', alignItems: 'center', gap: 8, fontFamily: "'Raleway',sans-serif", fontWeight: 300 }}>
                <Phone size={11} style={{ color: 'var(--terra)', flexShrink: 0 }} /> +91 12345 67890
              </p>
            </div>
          </div>

          <div>
            <p style={{
              color: 'rgba(249,245,238,0.35)',
              fontWeight: 500,
              fontSize: 9,
              marginBottom: 28,
              letterSpacing: '0.28em',
              textTransform: 'uppercase',
              fontFamily: "'Cinzel',serif"
            }}>Our Promise</p>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
              <div className="footer-link" style={{ cursor: 'default', gap: 8 }}>
                <Heart size={12} style={{ color: 'var(--terra)', flexShrink: 0 }} /> Handcrafted with Love
              </div>
              <div className="footer-link" style={{ cursor: 'default', gap: 8 }}>
                <ArrowUpRight size={12} style={{ color: 'var(--terra)', flexShrink: 0 }} /> Ethically Sourced
              </div>
              <div className="footer-link" style={{ cursor: 'default', gap: 8 }}>
                <ArrowUpRight size={12} style={{ color: 'var(--terra)', flexShrink: 0 }} /> Sustainable Luxury
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Art Section - Fixed Responsive Images */}
      <div style={{
        width: '100%',
        position: 'relative',
        marginTop: '20px',
        lineHeight: 0,
        overflow: 'hidden'
      }}>
        {/* Using both picture element and CSS media query for maximum compatibility */}
        <picture>
          {/* Mobile image - for screens up to 768px */}
          <source
            media="(max-width: 768px)"
            srcSet="/footer mobile.png"
            type="image/png"
          />
          {/* Desktop image - for screens 769px and above */}
          <source
            media="(min-width: 769px)"
            srcSet="/footer pc.png"
            type="image/png"
          />
          {/* Fallback image */}
          <img
            src="/footer pc.png"
            alt="Tanvo Artisanal Heritage - Handwoven Elegance"
            className="responsive-art-image"
            style={{
              width: '100%',
              height: 'auto',
              display: 'block'
            }}
          />
        </picture>

        {/* Fallback JavaScript solution if picture element fails */}
        <script dangerouslySetInnerHTML={{
          __html: `
            (function() {
              function updateFooterImage() {
                const isMobileView = window.innerWidth <= 768;
                const images = document.querySelectorAll('.responsive-art-image');
                images.forEach(img => {
                  if (isMobileView && img.src !== '/footer mobile.png') {
                    img.src = '/footer mobile.png';
                  } else if (!isMobileView && img.src !== '/footer pc.png') {
                    img.src = '/footer pc.png';
                  }
                });
              }
              window.addEventListener('load', updateFooterImage);
              window.addEventListener('resize', updateFooterImage);
            })();
          `
        }} />
      </div>

      {/* Bottom Bar */}
      <div style={{
        background: 'rgba(0,0,0,0.2)',
        padding: '24px clamp(24px, 6vw, 80px)',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        flexWrap: 'wrap',
        gap: 20,
        borderTop: '1px solid rgba(249,245,238,0.06)'
      }}>
        <p style={{
          color: 'rgba(249,245,238,0.2)',
          fontSize: 8,
          letterSpacing: '0.28em',
          textTransform: 'uppercase',
          fontFamily: "'Cinzel', serif"
        }}>
          © {new Date().getFullYear()} TANVO · THE ART OF HANDWOVEN LUXURY
        </p>
        <button
          onClick={scrollToTop}
          className="back-to-top"
          style={{ display: 'flex', alignItems: 'center', gap: 8 }}
          onMouseEnter={(e) => {
            e.currentTarget.style.background = 'var(--terra)';
            e.currentTarget.style.color = 'var(--ivory)';
            e.currentTarget.style.borderColor = 'var(--terra)';
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.background = 'transparent';
            e.currentTarget.style.color = 'rgba(249,245,238,0.5)';
            e.currentTarget.style.borderColor = 'rgba(249,245,238,0.15)';
          }}
        >
          <ChevronUp size={12} />
          Back to top
        </button>
      </div>
    </footer>
  );
};

export default Footer;