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

          {/* Right side - Quick order cards */}
          <motion.div
            className="right-content"
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            viewport={{ once: true }}
          >
            <div className="quick-order-header">
              <h3>Quick Inquiry</h3>
              <p>Tap to ask about our heritage collections</p>
            </div>

            <div className="quick-order-grid">
              {[
                {
                  type: "Wedding Saree",
                  weave: "Sambalpuri Silk",
                  price: "₹9,999 - ₹35,000",
                  icon: "👰",
                  badge: "Most Popular"
                },
                {
                  type: "Bridal Collection",
                  weave: "Bomkai Silk",
                  price: "₹15,000 - ₹45,000",
                  icon: "💍",
                  badge: "Premium"
                },
                {
                  type: "Festival Wear",
                  weave: "Ikat Cotton",
                  price: "₹4,500 - ₹12,000",
                  icon: "✨",
                  badge: "New Collection"
                },
                {
                  type: "Men's Handloom",
                  weave: "Khandua",
                  price: "₹3,800 - ₹8,500",
                  icon: "👔",
                  badge: "Exclusive"
                }
              ].map((item, index) => (
                <motion.div
                  key={index}
                  className="quick-order-card"
                  onClick={() => handleQuickOrder(item.type, item.weave)}
                  whileHover={{ y: -5, scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.3 + (index * 0.1) }}
                  viewport={{ once: true }}
                >
                  {item.badge && (
                    <span className="card-badge">{item.badge}</span>
                  )}
                  <span className="item-emoji">{item.icon}</span>
                  <div className="item-details">
                    <span className="item-name">{item.type}</span>
                    <span className="item-weave">{item.weave}</span>
                    <span className="item-price">{item.price}</span>
                  </div>
                  <MessageCircle size={16} className="item-whatsapp" />
                </motion.div>
              ))}
            </div>

            <div className="weave-quick-row">
              <p className="weave-label">Explore weaves:</p>
              <div className="weave-tags">
                {['Sambalpuri', 'Bomkai', 'Ikat', 'Khandua', 'Pasapali'].map((weave, index) => (
                  <motion.span
                    key={index}
                    className="weave-tag"
                    onClick={() => handleWeaveInquiry(weave)}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    {weave}
                  </motion.span>
                ))}
              </div>
            </div>

            <div className="testimonial-note">
              <Heart size={14} className="heart-icon" />
              <span>Join 500+ families who found their heirloom pieces through artisan chats</span>
            </div>
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
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 60px;
    margin-bottom: 40px;
    position: relative;
    z-index: 3;
  }

  /* Left content styles */
  .left-content {
    display: flex;
    flex-direction: column;
    align-items: flex-start;
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
    gap: 8px;
    background: linear-gradient(135deg, #B43F3F, #FF8225);
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
    max-width: 90%;
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