import React from 'react';
import styled from 'styled-components';
import { motion } from 'framer-motion';

const WhatsAppOrder: React.FC = () => {
  const handleWhatsAppClick = () => {
    const defaultMessage = "Namaste! 🙏 I'd love to find the perfect saree for my special occasion. Can you please help me with a personal consultation?";
    const encodedMessage = encodeURIComponent(defaultMessage);
    const yourNumber = "919876543210";
    window.open(`https://wa.me/${yourNumber}?text=${encodedMessage}`, '_blank');
  };

  const handleConsultation = (occasion: string) => {
    const messages = {
      wedding: "Namaste! 🙏 I'm getting married and need a premium bridal saree. Can you help me find the perfect one?",
      engagement: "Namaste! 🙏 I'm looking for an engagement saree. I'd love your expert guidance.",
      festivals: "Namaste! 🙏 I need a beautiful saree for an upcoming festival celebration.",
      gifting: "Namaste! 🙏 I'm looking to gift a handloom saree. Can you help me choose something special?"
    };
    
    const encodedMessage = encodeURIComponent(messages[occasion as keyof typeof messages]);
    const yourNumber = "919876543210";
    window.open(`https://wa.me/${yourNumber}?text=${encodedMessage}`, '_blank');
  };

  return (
    <StyledSection>
      <div className="container">
        {/* Left Side - Hero Image */}
        <motion.div 
          className="image-wrapper"
          initial={{ opacity: 0, x: -30 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          <div className="image-container">
            <img 
              src="/saree-consultation-hero.jpg" 
              alt="TANVO Saree Consultation - Luxury Handloom Experience"
              className="hero-image"
            />
            {/* Subtle overlay gradient */}
            <div className="image-overlay"></div>
            
            {/* Decorative border element */}
            <div className="border-accent"></div>
          </div>
          
          {/* Small heritage mark */}
          <div className="heritage-mark">
            <span className="mark-line"></span>
            <span className="mark-text">HANDLOOM HERITAGE · EST. 2020</span>
          </div>
        </motion.div>

        {/* Right Side - Content */}
        <motion.div 
          className="content-wrapper"
          initial={{ opacity: 0, x: 30 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          viewport={{ once: true }}
        >
          {/* Gold Label */}
          <div className="gold-label">
            <span className="label-line"></span>
            <span className="label-text">PERSONAL SAREE CONSULTATION</span>
          </div>

          {/* Main Heading */}
          <h2 className="heading">
            Find the Saree
            <br />
            <span className="highlight">That Tells Your Story</span>
          </h2>

          {/* Description */}
          <p className="description">
            Our stylists help you choose the perfect saree for weddings, 
            celebrations, gifting, and special occasions.
          </p>

          {/* Consultation Options */}
          <div className="consultation-options">
            <button 
              className="consultation-link"
              onClick={() => handleConsultation('wedding')}
            >
              Wedding
            </button>
            <span className="option-divider">·</span>
            <button 
              className="consultation-link"
              onClick={() => handleConsultation('engagement')}
            >
              Engagement
            </button>
            <span className="option-divider">·</span>
            <button 
              className="consultation-link"
              onClick={() => handleConsultation('festivals')}
            >
              Festivals
            </button>
            <span className="option-divider">·</span>
            <button 
              className="consultation-link"
              onClick={() => handleConsultation('gifting')}
            >
              Gifting
            </button>
          </div>

          {/* Primary CTA */}
          <motion.button 
            className="primary-cta"
            onClick={handleWhatsAppClick}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            <span className="cta-text">Chat with TANVO Stylist</span>
            <span className="cta-arrow">→</span>
          </motion.button>

          {/* Secondary Info */}
          <div className="secondary-info">
            <span className="info-item">Personal guidance</span>
            <span className="info-dot">•</span>
            <span className="info-item">Authentic handloom</span>
            <span className="info-dot">•</span>
            <span className="info-item">Direct support</span>
          </div>

          {/* Trust Line */}
          <div className="trust-line">
            <span className="trust-symbol">✦</span>
            <span className="trust-text">
              Trusted by families choosing handcrafted heritage sarees
            </span>
          </div>
        </motion.div>
      </div>
    </StyledSection>
  );
};

const StyledSection = styled.section`
  padding: 80px 0;
  background: #F9F5EE;
  position: relative;
  overflow: hidden;

  .container {
    max-width: 1400px;
    margin: 0 auto;
    padding: 0 60px;
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 80px;
    align-items: center;
    min-height: 600px;
    position: relative;
  }

  /* Left Side - Image */
  .image-wrapper {
    position: relative;
  }

  .image-container {
    position: relative;
    overflow: hidden;
    background: #F9F5EE;
    aspect-ratio: 3/4;
    max-height: 700px;
  }

  .hero-image {
    width: 100%;
    height: 100%;
    object-fit: cover;
    object-position: center 30%;
    transition: transform 0.8s ease;
    
    &:hover {
      transform: scale(1.02);
    }
  }

  .image-overlay {
    position: absolute;
    inset: 0;
    background: linear-gradient(
      to bottom,
      transparent 60%,
      rgba(249, 245, 238, 0.15) 100%
    );
    pointer-events: none;
  }

  .border-accent {
    position: absolute;
    bottom: 20px;
    right: 20px;
    width: 60px;
    height: 60px;
    border-right: 1px solid rgba(201, 168, 76, 0.4);
    border-bottom: 1px solid rgba(201, 168, 76, 0.4);
    pointer-events: none;
  }

  .heritage-mark {
    display: flex;
    align-items: center;
    gap: 16px;
    margin-top: 20px;
  }

  .mark-line {
    width: 30px;
    height: 1px;
    background: rgba(13, 11, 10, 0.3);
  }

  .mark-text {
    font-size: 10px;
    letter-spacing: 3px;
    color: rgba(13, 11, 10, 0.4);
    font-family: 'Inter', -apple-system, sans-serif;
    font-weight: 400;
  }

  /* Right Side - Content */
  .content-wrapper {
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    gap: 28px;
  }

  .gold-label {
    display: flex;
    align-items: center;
    gap: 16px;
  }

  .label-line {
    width: 30px;
    height: 1px;
    background: #C9A84C;
  }

  .label-text {
    font-size: 11px;
    letter-spacing: 4px;
    color: #C9A84C;
    font-family: 'Inter', -apple-system, sans-serif;
    font-weight: 500;
  }

  .heading {
    font-family: 'Playfair Display', 'Times New Roman', serif;
    font-size: clamp(2.8rem, 4.5vw, 4.2rem);
    font-weight: 400;
    color: #0D0B0A;
    line-height: 1.1;
    margin: 0;
    letter-spacing: -0.02em;
  }

  .highlight {
    font-weight: 500;
    color: #780000;
    position: relative;
    
    &::after {
      content: '';
      position: absolute;
      bottom: 4px;
      left: 0;
      right: 0;
      height: 2px;
      background: #C9A84C;
      opacity: 0.3;
    }
  }

  .description {
    font-family: 'Inter', -apple-system, sans-serif;
    font-size: 1.05rem;
    line-height: 1.7;
    color: rgba(13, 11, 10, 0.7);
    max-width: 440px;
    margin: 0;
    font-weight: 300;
  }

  .consultation-options {
    display: flex;
    align-items: center;
    gap: 8px;
    flex-wrap: wrap;
  }

  .consultation-link {
    font-family: 'Inter', -apple-system, sans-serif;
    font-size: 0.85rem;
    letter-spacing: 0.5px;
    color: rgba(13, 11, 10, 0.6);
    background: none;
    border: none;
    padding: 4px 0;
    cursor: pointer;
    transition: all 0.3s ease;
    position: relative;
    font-weight: 400;

    &::after {
      content: '';
      position: absolute;
      bottom: 0;
      left: 0;
      right: 0;
      height: 1px;
      background: #C9A84C;
      transform: scaleX(0);
      transition: transform 0.3s ease;
    }

    &:hover {
      color: #780000;
      
      &::after {
        transform: scaleX(1);
      }
    }
  }

  .option-divider {
    color: rgba(13, 11, 10, 0.2);
    font-size: 0.8rem;
  }

  .primary-cta {
    display: inline-flex;
    align-items: center;
    gap: 16px;
    background: #780000;
    color: #F9F5EE;
    border: none;
    padding: 16px 36px;
    font-family: 'Inter', -apple-system, sans-serif;
    font-size: 0.95rem;
    font-weight: 500;
    letter-spacing: 1px;
    cursor: pointer;
    transition: all 0.4s ease;
    position: relative;
    overflow: hidden;

    &::before {
      content: '';
      position: absolute;
      inset: 0;
      background: #0D0B0A;
      transform: translateX(-100%);
      transition: transform 0.4s ease;
    }

    &:hover {
      transform: translateY(-2px);
      
      &::before {
        transform: translateX(0);
      }
    }

    .cta-text {
      position: relative;
      z-index: 1;
    }

    .cta-arrow {
      position: relative;
      z-index: 1;
      font-size: 1.2rem;
      transition: transform 0.3s ease;
    }

    &:hover .cta-arrow {
      transform: translateX(4px);
    }
  }

  .secondary-info {
    display: flex;
    align-items: center;
    gap: 8px;
    flex-wrap: wrap;
  }

  .info-item {
    font-family: 'Inter', -apple-system, sans-serif;
    font-size: 0.8rem;
    color: rgba(13, 11, 10, 0.5);
    letter-spacing: 0.3px;
  }

  .info-dot {
    color: rgba(13, 11, 10, 0.2);
    font-size: 0.6rem;
  }

  .trust-line {
    display: flex;
    align-items: center;
    gap: 12px;
    padding-top: 8px;
  }

  .trust-symbol {
    color: #C9A84C;
    font-size: 0.8rem;
  }

  .trust-text {
    font-family: 'Inter', -apple-system, sans-serif;
    font-size: 0.8rem;
    color: rgba(13, 11, 10, 0.4);
    font-style: italic;
    letter-spacing: 0.2px;
  }

  /* Responsive */
  @media (max-width: 1024px) {
    .container {
      padding: 0 40px;
      gap: 60px;
    }
  }

  @media (max-width: 968px) {
    padding: 60px 0;

    .container {
      grid-template-columns: 1fr;
      gap: 50px;
      padding: 0 30px;
    }

    .image-wrapper {
      order: -1;
    }

    .image-container {
      max-height: 500px;
    }

    .heading {
      font-size: 2.8rem;
    }
  }

  @media (max-width: 768px) {
    padding: 40px 0;

    .container {
      padding: 0 20px;
      gap: 40px;
    }

    .image-container {
      max-height: 400px;
    }

    .heading {
      font-size: 2.2rem;
    }

    .description {
      font-size: 0.95rem;
    }

    .consultation-options {
      gap: 6px;
    }

    .consultation-link {
      font-size: 0.8rem;
    }

    .primary-cta {
      width: 100%;
      justify-content: center;
      padding: 14px 24px;
      font-size: 0.9rem;
    }

    .secondary-info {
      font-size: 0.75rem;
    }

    .trust-text {
      font-size: 0.75rem;
    }

    .border-accent {
      width: 40px;
      height: 40px;
      bottom: 12px;
      right: 12px;
    }

    .heritage-mark {
      margin-top: 16px;
    }

    .mark-text {
      font-size: 8px;
      letter-spacing: 2px;
    }
  }

  @media (max-width: 480px) {
    .container {
      gap: 30px;
      padding: 0 16px;
    }

    .image-container {
      max-height: 350px;
    }

    .heading {
      font-size: 1.8rem;
    }

    .gold-label .label-text {
      font-size: 9px;
      letter-spacing: 3px;
    }

    .consultation-options {
      gap: 4px;
    }

    .option-divider {
      display: none;
    }

    .consultation-link {
      font-size: 0.75rem;
      padding: 6px 12px;
      background: rgba(201, 168, 76, 0.08);
      border-radius: 2px;
      
      &::after {
        display: none;
      }
      
      &:hover {
        background: rgba(201, 168, 76, 0.15);
      }
    }

    .secondary-info {
      flex-wrap: wrap;
      justify-content: center;
    }
  }
`;

export default WhatsAppOrder;