import React, { useState } from 'react';
import styled from 'styled-components';
import { motion } from 'framer-motion';
import { 
  MessageCircle, Send, CheckCircle, Clock, Heart, 
  ShoppingBag, Tag, Sparkles, Phone, Users, ArrowRight,
  Star, Shield, Gift, Camera, MapPin, Award
} from 'lucide-react';

const WhatsAppOrder = () => {
  const [phoneNumber, setPhoneNumber] = useState('');
  const [message, setMessage] = useState('');
  const [showForm, setShowForm] = useState(false);

  const handleWhatsAppClick = () => {
    const defaultMessage = "Namaste! 🙏 I'm interested in your handwoven collection. Can you please help me with:";
    const encodedMessage = encodeURIComponent(defaultMessage);
    const yourNumber = "919876543210";

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
        {/* Decorative elements */}
        <div className="bg-pattern"></div>
        <div className="floating-dots">
          <span className="dot dot-1"></span>
          <span className="dot dot-2"></span>
          <span className="dot dot-3"></span>
          <span className="dot dot-4"></span>
        </div>

        <div className="content-grid">
          {/* Left Column - Main CTA */}
          <motion.div
            className="main-cta"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <div className="badge-container">
              <span className="badge pulse">
                <MessageCircle size={14} />
                Live Chat
              </span>
              <span className="badge">
                <Users size={14} />
                100% Human
              </span>
            </div>

            <h1 className="hero-title">
              Connect with
              <br />
              <span className="gradient-text">Master Weavers</span>
            </h1>

            <p className="hero-description">
              Skip the automated replies. Chat directly with the hands that weave 
              tradition — get personalized styling advice, custom orders, and 
              exclusive access to our artisan collection.
            </p>

            <div className="trust-features">
              <div className="trust-item">
                <div className="trust-icon">
                  <Shield size={16} />
                </div>
                <span>100% Authentic Handloom</span>
              </div>
              <div className="trust-item">
                <div className="trust-icon">
                  <Clock size={16} />
                </div>
                <span>Response in 15 min</span>
              </div>
              <div className="trust-item">
                <div className="trust-icon">
                  <Gift size={16} />
                </div>
                <span>Free Styling Session</span>
              </div>
            </div>

            <motion.button
              className="primary-btn"
              onClick={handleWhatsAppClick}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              <span className="btn-content">
                <MessageCircle size={22} />
                Chat with Artisan
                <ArrowRight size={18} className="arrow-icon" />
              </span>
            </motion.button>

            <div className="assurance">
              <div className="assurance-item">
                <CheckCircle size={14} color="#10B981" />
                <span>No bots • Real artisans</span>
              </div>
              <div className="assurance-item">
                <CheckCircle size={14} color="#10B981" />
                <span>7th generation weavers</span>
              </div>
            </div>
          </motion.div>

          {/* Right Column - Quick Actions */}
          <motion.div
            className="quick-actions"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            viewport={{ once: true }}
          >
            <div className="quick-header">
              <h3>Quick Inquiries</h3>
              <p>Tap any option to start a conversation</p>
            </div>

            <div className="action-grid">
              {[
                { 
                  icon: <ShoppingBag size={18} />, 
                  label: 'Bridal Collection', 
                  type: 'bridal',
                  weave: 'luxury',
                  badge: 'Best Seller'
                },
                { 
                  icon: <Tag size={18} />, 
                  label: 'Festival Special', 
                  type: 'festival',
                  weave: 'ikat',
                  badge: 'New'
                },
                { 
                  icon: <Sparkles size={18} />, 
                  label: 'Custom Orders', 
                  type: 'custom',
                  weave: 'designer',
                  badge: 'Personalized'
                },
                { 
                  icon: <Heart size={18} />, 
                  label: 'Gift Collection', 
                  type: 'gift',
                  weave: 'premium',
                  badge: 'Popular'
                }
              ].map((item, idx) => (
                <motion.button
                  key={idx}
                  className="action-card"
                  onClick={() => handleQuickOrder(item.type, item.weave)}
                  whileHover={{ y: -4, transition: { duration: 0.2 } }}
                  whileTap={{ scale: 0.95 }}
                >
                  <div className="card-icon">{item.icon}</div>
                  <div className="card-content">
                    <span className="card-label">{item.label}</span>
                    <span className="card-badge">{item.badge}</span>
                  </div>
                </motion.button>
              ))}
            </div>

            <div className="weave-section">
              <p className="weave-label">Popular Weaves</p>
              <div className="weave-tags">
                {['Ikat', 'Sambalpuri', 'Bomkai', 'Khandua', 'Tussar'].map((weave) => (
                  <motion.button
                    key={weave}
                    className="weave-tag"
                    onClick={() => handleWeaveInquiry(weave)}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    {weave}
                  </motion.button>
                ))}
              </div>
            </div>

            <div className="testimonial-mini">
              <div className="stars">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} size={14} fill="#FF8225" color="#FF8225" />
                ))}
              </div>
              <p>"The weaver personally helped me choose the perfect saree for my wedding!"</p>
              <span className="testimonial-author">— Priya M., Chennai</span>
            </div>
          </motion.div>
        </div>

        {/* Stats Section */}
        <motion.div
          className="stats-grid"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          viewport={{ once: true }}
        >
          {[
            { number: '2,847', label: 'Weddings Styled', icon: <Heart size={20} /> },
            { number: '15 min', label: 'Avg Response Time', icon: <Clock size={20} /> },
            { number: '7th Gen', label: 'Weaver Families', icon: <Award size={20} /> },
            { number: '4.9★', label: 'Customer Rating', icon: <Star size={20} /> }
          ].map((stat, idx) => (
            <div key={idx} className="stat-item">
              <div className="stat-icon">{stat.icon}</div>
              <div className="stat-number">{stat.number}</div>
              <div className="stat-label">{stat.label}</div>
            </div>
          ))}
        </motion.div>

        {/* Footer Note */}
        <div className="footer-note">
          <div className="note-content">
            <Clock size={14} />
            <span>Artisans available 9 AM - 8 PM (IST) • Weekend inquiries celebrated on Monday</span>
          </div>
          <div className="note-content">
            <Camera size={14} />
            <span>Share your vision • Get personalized video consultations</span>
          </div>
        </div>
      </div>
    </StyledSection>
  );
};

const StyledSection = styled.section`
  padding: 80px 0;
  background: linear-gradient(180deg, #F8EDED 0%, #f5e8e8 100%);
  position: relative;
  overflow: hidden;

  .container {
    max-width: 1200px;
    margin: 0 auto;
    padding: 0 24px;
    position: relative;
    z-index: 2;
  }

  /* Decorative background */
  .bg-pattern {
    position: absolute;
    inset: 0;
    background-image: 
      radial-gradient(circle at 20% 50%, rgba(180, 63, 63, 0.03) 0%, transparent 50%),
      radial-gradient(circle at 80% 50%, rgba(255, 130, 37, 0.03) 0%, transparent 50%);
    pointer-events: none;
  }

  .floating-dots {
    position: absolute;
    inset: 0;
    pointer-events: none;
    overflow: hidden;
  }

  .dot {
    position: absolute;
    width: 4px;
    height: 4px;
    background: rgba(180, 63, 63, 0.15);
    border-radius: 50%;
    animation: float 12s infinite ease-in-out;
  }

  .dot-1 { top: 10%; left: 5%; animation-delay: 0s; }
  .dot-2 { top: 30%; right: 10%; animation-delay: 2s; width: 6px; height: 6px; }
  .dot-3 { bottom: 20%; left: 15%; animation-delay: 4s; }
  .dot-4 { bottom: 40%; right: 5%; animation-delay: 6s; width: 8px; height: 8px; }

  @keyframes float {
    0%, 100% { transform: translateY(0) scale(1); }
    50% { transform: translateY(-20px) scale(1.2); }
  }

  .content-grid {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 60px;
    margin-bottom: 50px;
    position: relative;
  }

  /* Left Column */
  .main-cta {
    display: flex;
    flex-direction: column;
    justify-content: center;
  }

  .badge-container {
    display: flex;
    gap: 12px;
    margin-bottom: 20px;
  }

  .badge {
    display: inline-flex;
    align-items: center;
    gap: 6px;
    padding: 6px 14px;
    background: white;
    border-radius: 30px;
    font-size: 0.75rem;
    font-weight: 500;
    color: #173B45;
    box-shadow: 0 4px 12px rgba(23, 59, 69, 0.06);
    letter-spacing: 0.02em;

    svg {
      color: #B43F3F;
    }
  }

  .badge.pulse {
    background: #B43F3F;
    color: #F8EDED;
    animation: pulse 2s infinite;

    svg {
      color: #F8EDED;
    }
  }

  @keyframes pulse {
    0%, 100% { opacity: 1; }
    50% { opacity: 0.8; }
  }

  .hero-title {
    font-family: 'Playfair Display', serif;
    font-size: clamp(2.5rem, 5vw, 3.8rem);
    font-weight: 600;
    line-height: 1.1;
    color: #173B45;
    margin-bottom: 16px;
  }

  .gradient-text {
    background: linear-gradient(135deg, #B43F3F, #FF8225);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    background-clip: text;
  }

  .hero-description {
    font-size: 1.05rem;
    line-height: 1.7;
    color: rgba(23, 59, 69, 0.7);
    max-width: 500px;
    margin-bottom: 24px;
    font-family: 'Inter', sans-serif;
  }

  .trust-features {
    display: flex;
    flex-wrap: wrap;
    gap: 16px;
    margin-bottom: 28px;
  }

  .trust-item {
    display: flex;
    align-items: center;
    gap: 8px;
    font-size: 0.85rem;
    color: #173B45;
    font-weight: 500;
  }

  .trust-icon {
    width: 28px;
    height: 28px;
    background: rgba(180, 63, 63, 0.1);
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
    color: #B43F3F;
  }

  .primary-btn {
    background: linear-gradient(135deg, #B43F3F, #c94f4f);
    color: #F8EDED;
    border: none;
    padding: 0;
    border-radius: 60px;
    cursor: pointer;
    box-shadow: 0 20px 40px -10px rgba(180, 63, 63, 0.3);
    transition: all 0.3s ease;
    max-width: 280px;
    margin-bottom: 16px;

    &:hover {
      transform: translateY(-3px);
      box-shadow: 0 25px 45px -10px rgba(180, 63, 63, 0.4);
    }
  }

  .btn-content {
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 12px;
    padding: 16px 28px;
    font-size: 1rem;
    font-weight: 500;
    font-family: 'Inter', sans-serif;
    width: 100%;
  }

  .arrow-icon {
    transition: transform 0.3s ease;
  }

  .primary-btn:hover .arrow-icon {
    transform: translateX(4px);
  }

  .assurance {
    display: flex;
    gap: 20px;
  }

  .assurance-item {
    display: flex;
    align-items: center;
    gap: 6px;
    font-size: 0.8rem;
    color: rgba(23, 59, 69, 0.6);
  }

  /* Right Column */
  .quick-actions {
    background: white;
    border-radius: 32px;
    padding: 32px;
    box-shadow: 0 20px 60px rgba(23, 59, 69, 0.06);
    border: 1px solid rgba(180, 63, 63, 0.06);
  }

  .quick-header {
    margin-bottom: 24px;
    
    h3 {
      font-family: 'Playfair Display', serif;
      font-size: 1.4rem;
      color: #173B45;
      margin-bottom: 4px;
    }
    
    p {
      font-size: 0.85rem;
      color: rgba(23, 59, 69, 0.6);
      font-family: 'Inter', sans-serif;
    }
  }

  .action-grid {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 12px;
    margin-bottom: 24px;
  }

  .action-card {
    background: #F8EDED;
    border: 1px solid rgba(180, 63, 63, 0.06);
    border-radius: 16px;
    padding: 16px;
    display: flex;
    align-items: center;
    gap: 12px;
    cursor: pointer;
    transition: all 0.3s ease;
    width: 100%;

    &:hover {
      background: white;
      border-color: #FF8225;
      box-shadow: 0 8px 20px rgba(180, 63, 63, 0.08);
    }
  }

  .card-icon {
    width: 40px;
    height: 40px;
    background: rgba(180, 63, 63, 0.08);
    border-radius: 12px;
    display: flex;
    align-items: center;
    justify-content: center;
    color: #B43F3F;
    flex-shrink: 0;
  }

  .card-content {
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    flex: 1;
  }

  .card-label {
    font-size: 0.85rem;
    font-weight: 600;
    color: #173B45;
    font-family: 'Inter', sans-serif;
  }

  .card-badge {
    font-size: 0.6rem;
    padding: 2px 8px;
    background: rgba(255, 130, 37, 0.15);
    color: #FF8225;
    border-radius: 20px;
    font-weight: 500;
    margin-top: 2px;
  }

  .weave-section {
    margin-bottom: 24px;
  }

  .weave-label {
    font-size: 0.8rem;
    color: rgba(23, 59, 69, 0.6);
    margin-bottom: 10px;
    font-weight: 500;
    font-family: 'Inter', sans-serif;
  }

  .weave-tags {
    display: flex;
    flex-wrap: wrap;
    gap: 8px;
  }

  .weave-tag {
    padding: 6px 16px;
    background: #F8EDED;
    border: 1px solid rgba(180, 63, 63, 0.1);
    border-radius: 30px;
    font-size: 0.8rem;
    font-weight: 500;
    color: #173B45;
    cursor: pointer;
    transition: all 0.3s ease;
    font-family: 'Inter', sans-serif;

    &:hover {
      background: #B43F3F;
      color: #F8EDED;
      border-color: #B43F3F;
    }
  }

  .testimonial-mini {
    background: #F8EDED;
    border-radius: 16px;
    padding: 16px;
    border: 1px solid rgba(180, 63, 63, 0.06);

    .stars {
      display: flex;
      gap: 2px;
      margin-bottom: 6px;
    }

    p {
      font-size: 0.85rem;
      color: #173B45;
      font-style: italic;
      line-height: 1.5;
      margin-bottom: 4px;
      font-family: 'Inter', sans-serif;
    }

    .testimonial-author {
      font-size: 0.75rem;
      color: rgba(23, 59, 69, 0.5);
      font-weight: 500;
    }
  }

  /* Stats Grid */
  .stats-grid {
    display: grid;
    grid-template-columns: repeat(4, 1fr);
    gap: 20px;
    background: #173B45;
    border-radius: 24px;
    padding: 30px 40px;
    margin-bottom: 24px;
    box-shadow: 0 10px 40px rgba(23, 59, 69, 0.2);
  }

  .stat-item {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 4px;
    text-align: center;
  }

  .stat-icon {
    color: #FF8225;
    opacity: 0.6;
  }

  .stat-number {
    font-family: 'Playfair Display', serif;
    font-size: 1.8rem;
    font-weight: 600;
    color: #F8EDED;
  }

  .stat-label {
    font-size: 0.75rem;
    color: rgba(248, 237, 237, 0.6);
    font-family: 'Inter', sans-serif;
    letter-spacing: 0.05em;
  }

  /* Footer Note */
  .footer-note {
    display: flex;
    justify-content: space-between;
    flex-wrap: wrap;
    gap: 12px;
    padding: 12px 0;
  }

  .note-content {
    display: flex;
    align-items: center;
    gap: 8px;
    font-size: 0.8rem;
    color: rgba(23, 59, 69, 0.5);
    font-family: 'Inter', sans-serif;

    svg {
      color: #B43F3F;
      opacity: 0.5;
    }
  }

  /* Responsive */
  @media (max-width: 1024px) {
    .content-grid {
      gap: 40px;
    }

    .stats-grid {
      grid-template-columns: repeat(4, 1fr);
      padding: 24px 30px;
    }
  }

  @media (max-width: 768px) {
    padding: 50px 0;

    .content-grid {
      grid-template-columns: 1fr;
      gap: 30px;
    }

    .stats-grid {
      grid-template-columns: repeat(2, 1fr);
      padding: 20px;
      gap: 16px;
    }

    .action-grid {
      grid-template-columns: 1fr;
    }

    .stat-number {
      font-size: 1.4rem;
    }

    .footer-note {
      flex-direction: column;
      align-items: flex-start;
    }

    .primary-btn {
      max-width: 100%;
    }

    .quick-actions {
      padding: 24px;
    }

    .badge-container {
      flex-wrap: wrap;
    }
  }

  @media (max-width: 480px) {
    .stats-grid {
      grid-template-columns: 1fr 1fr;
      gap: 12px;
    }

    .stat-item {
      padding: 8px;
    }

    .trust-features {
      flex-direction: column;
      gap: 8px;
    }
  }
`;

export default WhatsAppOrder;