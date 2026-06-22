import React from 'react';
import styled from 'styled-components';
import { motion } from 'framer-motion';
import { MessageCircle, ArrowRight } from 'lucide-react';

const WhatsAppOrder = () => {
  const handleWhatsAppClick = () => {
    const defaultMessage = "Namaste! 🙏 I'm interested in your handwoven collection. Can you please help me with styling advice and collection availability?";
    const encodedMessage = encodeURIComponent(defaultMessage);
    const yourNumber = "919876543210"; // Country code + number
    window.open(`https://wa.me/${yourNumber}?text=${encodedMessage}`, '_blank');
  };

  return (
    <StyledSection>
      <div className="container">
        {/* Subtle decorative thread line */}
        <div className="decor-line"></div>

        <motion.div
          className="content-card"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: [0.25, 0.1, 0.25, 1] }}
          viewport={{ once: true }}
        >
          <span className="section-label">✦ Personal Styling & Custom Orders ✦</span>
          
          <h2 className="title">
            Connect with Our <br />
            <span className="serif-title">Artisan Collectives</span>
          </h2>
          
          <p className="description">
            For bridal trousseau styling, custom weaving commissions, or to view specific pieces live from the looms of Maniabandha, speak directly with our weaving community on WhatsApp.
          </p>

          <div className="action-row">
            <motion.button
              className="whatsapp-btn"
              onClick={handleWhatsAppClick}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              <MessageCircle size={18} />
              <span>Initiate Consultation</span>
              <ArrowRight size={14} className="arrow-icon" />
            </motion.button>
          </div>

          <div className="trust-points">
            <div className="point">
              <span className="point-title">Direct Response</span>
              <span className="point-desc">Answered by our weavers</span>
            </div>
            <div className="point-divider"></div>
            <div className="point">
              <span className="point-title">Custom Weaving</span>
              <span className="point-desc">Bespoke sizing & patterns</span>
            </div>
            <div className="point-divider"></div>
            <div className="point">
              <span className="point-title">7th Gen Craft</span>
              <span className="point-desc">Generations of master design</span>
            </div>
          </div>
        </motion.div>
      </div>
    </StyledSection>
  );
};

const StyledSection = styled.section`
  padding: 100px 0;
  background: #FFFFFF;
  position: relative;
  overflow: hidden;

  .container {
    max-width: 900px;
    margin: 0 auto;
    padding: 0 24px;
    display: flex;
    flex-direction: column;
    align-items: center;
    position: relative;
    z-index: 2;
  }

  .decor-line {
    position: absolute;
    top: 0;
    left: 50%;
    transform: translateX(-50%);
    width: 1px;
    height: 60px;
    background: linear-gradient(180deg, rgba(201, 168, 76, 0.4) 0%, transparent 100%);
  }

  .content-card {
    text-align: center;
    width: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
  }

  .section-label {
    font-family: 'Inter', sans-serif;
    font-size: 11px;
    font-weight: 600;
    letter-spacing: 0.25em;
    color: #C9A84C; /* Gold */
    text-transform: uppercase;
    margin-bottom: 24px;
  }

  .title {
    font-family: 'Playfair Display', serif;
    font-size: clamp(32px, 5vw, 48px);
    font-weight: 300;
    line-height: 1.25;
    color: #1C1612; /* Ink */
    margin-bottom: 24px;
    letter-spacing: -0.01em;

    .serif-title {
      font-style: italic;
      color: #C9A84C; /* Gold */
    }
  }

  .description {
    font-family: 'Raleway', sans-serif;
    font-size: 16px;
    color: #555555;
    line-height: 1.7;
    max-width: 680px;
    margin-bottom: 40px;
  }

  .action-row {
    margin-bottom: 48px;
  }

  .whatsapp-btn {
    background: #1C1612; /* Ink */
    color: #F9F5EE; /* Ivory */
    border: 1px solid #C9A84C; /* Gold border */
    padding: 18px 36px;
    font-family: 'Inter', sans-serif;
    font-size: 13px;
    font-weight: 500;
    letter-spacing: 0.1em;
    text-transform: uppercase;
    display: flex;
    align-items: center;
    gap: 12px;
    cursor: pointer;
    transition: all 0.3s cubic-bezier(0.25, 0.1, 0.25, 1);

    .arrow-icon {
      transition: transform 0.3s ease;
    }

    &:hover {
      background: #C9A84C;
      color: #1C1612;
      box-shadow: 0 10px 30px -15px rgba(201, 168, 76, 0.5);

      .arrow-icon {
        transform: translateX(4px);
      }
    }
  }

  .trust-points {
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 40px;
    margin-top: 20px;
    width: 100%;
    max-width: 700px;
    border-top: 1px solid rgba(28, 22, 18, 0.08);
    padding-top: 40px;
  }

  .point {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 4px;
    flex: 1;
  }

  .point-title {
    font-family: 'Playfair Display', serif;
    font-size: 18px;
    font-weight: 400;
    color: #1C1612;
  }

  .point-desc {
    font-family: 'Raleway', sans-serif;
    font-size: 12px;
    color: #888888;
  }

  .point-divider {
    width: 1px;
    height: 32px;
    background: rgba(28, 22, 18, 0.1);
  }

  @media (max-width: 640px) {
    padding: 80px 0;

    .trust-points {
      flex-direction: column;
      gap: 24px;
      padding-top: 32px;
    }

    .point-divider {
      display: none;
    }
  }
`;

export default WhatsAppOrder;