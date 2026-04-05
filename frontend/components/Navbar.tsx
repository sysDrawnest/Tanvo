// export default Navbar;
import React, { useState, useEffect, useRef } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import {
  ShoppingCart, Heart, User, Search, X, LogOut,
  LayoutDashboard, UserCircle, Package, Phone,
  Mail, MapPin, Instagram, Facebook, Youtube, LogIn, ArrowUpRight
} from 'lucide-react';
import { useStore } from '../context/StoreContext';
import { motion, AnimatePresence } from 'framer-motion';

/* ── Navbar-scoped styles ── */
const NavStyles = () => (
  <style>{`
    @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,400;0,500;0,600;1,400&family=Inter:wght@300;400;500&display=swap');

    :root {
      --brand-bg: #F8EDED;
      --brand-primary: #B43F3F;
      --brand-secondary: #FF8225;
      --brand-accent: #173B45;
      --brand-text: #173B45;
    }

    /* Textile/loom inspired texture overlay */
    .textile-overlay {
      background-image: url("data:image/svg+xml,%3Csvg width='40' height='40' viewBox='0 0 40 40' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M0 0h40v2H0V0zm0 4h40v2H0V4zm0 4h40v2H0V8zm0 4h40v2H0v-2zm0 4h40v2H0v-2zm0 4h40v2H0v-2zm0 4h40v2H0v-2zm0 4h40v2H0v-2zm0 4h40v2H0v-2zm0 4h40v2H0v-2z' fill='%23B43F3F' fill-opacity='0.03' fill-rule='evenodd'/%3E%3C/svg%3E");
    }

    /* Thread-inspired divider */
    .thread-divider {
      position: relative;
    }
    .thread-divider::after {
      content: '';
      position: absolute;
      bottom: 0;
      left: 0;
      right: 0;
      height: 1px;
      background: linear-gradient(90deg, transparent 0%, rgba(180, 63, 63, 0.2) 50%, transparent 100%);
    }

    /* Nav link hover effect */
    .nav-hover-effect {
      position: relative;
      transition: color 0.3s ease;
    }
    .nav-hover-effect::after {
      content: '';
      position: absolute;
      width: 0%;
      height: 1px;
      bottom: -4px;
      left: 50%;
      background-color: var(--brand-secondary);
      transition: all 0.3s ease;
      transform: translateX(-50%);
    }
    .nav-hover-effect:hover::after,
    .nav-hover-effect.active::after {
      width: 100%;
    }

    .nav-icon-btn {
      position: relative;
      display: flex;
      align-items: center;
      justify-content: center;
      width: 40px;
      height: 40px;
      transition: color 0.25s ease;
      cursor: pointer;
      background: none;
      border: none;
      color: var(--brand-accent);
    }
    .nav-icon-btn:hover { 
      color: var(--brand-primary) !important; 
    }

    .nav-badge {
      position: absolute;
      top: 4px;
      right: 4px;
      width: 16px;
      height: 16px;
      border-radius: 50%;
      background: var(--brand-secondary);
      color: #F8EDED;
      font-family: 'Inter', sans-serif;
      font-size: 8px;
      font-weight: 700;
      display: flex;
      align-items: center;
      justify-content: center;
      line-height: 1;
    }

    /* Announcement ticker */
    @keyframes ticker {
      from { transform: translateX(0); }
      to   { transform: translateX(-50%); }
    }
    .ticker-inner { animation: ticker 30s linear infinite; }

    /* Search bar expand */
    .search-input {
      background: transparent;
      border: none;
      border-bottom: 1px solid rgba(180, 63, 63, 0.3);
      outline: none;
      color: var(--brand-accent);
      font-family: 'Inter', sans-serif;
      font-size: 12px;
      letter-spacing: 0.02em;
      padding: 6px 4px;
      width: 0;
      opacity: 0;
      transition: width 0.4s cubic-bezier(0.4, 0, 0.2, 1), opacity 0.3s ease;
    }
    .search-input.open {
      width: 200px;
      opacity: 1;
    }
    .search-input::placeholder { 
      color: rgba(23, 59, 69, 0.3); 
    }

    /* Dropdown */
    .user-dropdown {
      position: absolute;
      top: calc(100% + 16px);
      right: 0;
      width: 240px;
      background: #F8EDED;
      border: 1px solid rgba(180, 63, 63, 0.15);
      padding: 8px;
      opacity: 0;
      visibility: hidden;
      transform: translateY(-8px);
      transition: all 0.25s ease;
      z-index: 200;
      box-shadow: 0 4px 20px rgba(23, 59, 69, 0.08);
    }
    .user-dropdown-wrap:hover .user-dropdown {
      opacity: 1;
      visibility: visible;
      transform: translateY(0);
    }
    .user-dropdown a,
    .user-dropdown button {
      display: flex;
      align-items: center;
      gap: 10px;
      width: 100%;
      padding: 10px 14px;
      font-family: 'Inter', sans-serif;
      font-size: 11px;
      font-weight: 500;
      color: var(--brand-accent);
      text-decoration: none;
      background: none;
      border: none;
      cursor: pointer;
      transition: all 0.2s;
      border-radius: 4px;
    }
    .user-dropdown a:hover,
    .user-dropdown button:hover {
      color: var(--brand-primary);
      background: rgba(180, 63, 63, 0.05);
    }
    .user-dropdown .divider {
      height: 1px;
      background: linear-gradient(90deg, transparent, rgba(180, 63, 63, 0.2), transparent);
      margin: 8px 0;
    }

    /* Mobile drawer */
    .drawer-link {
      display: flex;
      align-items: center;
      justify-content: space-between;
      padding: 16px 24px;
      font-family: 'Playfair Display', serif;
      font-size: 18px;
      color: #F8EDED;
      text-decoration: none;
      border-bottom: 1px solid rgba(255, 130, 37, 0.1);
      transition: all 0.3s ease;
    }
    .drawer-link:hover { 
      color: var(--brand-secondary); 
      padding-left: 32px;
      background: rgba(255, 130, 37, 0.05);
    }
    .drawer-link.gold  { 
      color: var(--brand-secondary); 
    }

    .drawer-section-label {
      padding: 20px 24px 8px;
      font-family: 'Inter', sans-serif;
      font-size: 10px;
      font-weight: 600;
      letter-spacing: 0.15em;
      text-transform: uppercase;
      color: rgba(255, 130, 37, 0.5);
    }

    /* Sub-dropdown styles */
    .nav-dropdown-content {
      position: absolute;
      top: 100%;
      left: 0;
      min-width: 220px;
      background: white;
      border: 1px solid rgba(180, 63, 63, 0.1);
      box-shadow: 0 10px 30px rgba(0,0,0,0.08);
      opacity: 0;
      visibility: hidden;
      transform: translateY(10px);
      transition: all 0.3s ease;
      padding: 12px 0;
      z-index: 100;
    }
    .nav-dropdown-wrap:hover .nav-dropdown-content {
      opacity: 1;
      visibility: visible;
      transform: translateY(0);
    }
    .nav-sub-item {
      display: block;
      padding: 8px 24px;
      font-size: 11px;
      color: var(--brand-accent);
      text-decoration: none;
      transition: all 0.2s;
      letter-spacing: 0.05em;
      text-transform: uppercase;
      font-weight: 500;
      position: relative;
    }
    .nav-sub-item:hover {
      background: rgba(180, 63, 63, 0.05);
      color: var(--brand-primary);
      padding-left: 28px;
    }

    .nested-dropdown-content {
      position: absolute;
      left: 100%;
      top: 0;
      min-width: 200px;
      background: white;
      border: 1px solid rgba(180, 63, 63, 0.1);
      box-shadow: 0 10px 30px rgba(0,0,0,0.08);
      opacity: 0;
      visibility: hidden;
      transform: translateX(10px);
      transition: all 0.3s ease;
      padding: 8px 0;
    }
    .nav-sub-wrap:hover .nested-dropdown-content {
      opacity: 1;
      visibility: visible;
      transform: translateX(0);
    }
  `}</style>
);

const Navbar: React.FC = () => {
  const { cart, wishlist, user, logout, isAdmin, cartCount, wishlistCount } = useStore();
  const [isScrolled, setIsScrolled] = useState(false);
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [expandedMobileLink, setExpandedMobileLink] = useState<string | null>(null);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const searchInputRef = useRef<HTMLInputElement>(null);
  const navigate = useNavigate();
  const location = useLocation();


  /* Scroll detection */
  useEffect(() => {
    const onScroll = () => setIsScrolled(window.scrollY > 60);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  /* Close on route change */
  useEffect(() => {
    setIsDrawerOpen(false);
    setIsSearchOpen(false);
    setExpandedMobileLink(null);
  }, [location.pathname]);

  /* Lock body when drawer open */
  useEffect(() => {
    document.body.style.overflow = isDrawerOpen ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [isDrawerOpen]);

  /* Focus search input when opened */
  useEffect(() => {
    if (isSearchOpen) searchInputRef.current?.focus();
  }, [isSearchOpen]);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/shop?q=${encodeURIComponent(searchQuery)}`);
      setSearchQuery('');
      setIsSearchOpen(false);
    }
  };

  const navLinks = [
    { to: '/shop', label: 'All Sarees' },
    { to: '/', label: 'Home' },
    {
      to: '/shop',
      label: 'Shop',
      subLinks: [
        {
          label: 'By Fabric',
          nested: [
            { label: 'Cotton Saree', to: '/shop?fabric=Cotton' },
            { label: 'Banarasi', to: '/shop?fabric=Banarasi' },
            { label: 'Linen', to: '/shop?fabric=Linen' },
            { label: 'Silk', to: '/shop?fabric=Silk' },
          ]
        },
        {
          label: 'On Budget',
          nested: [
            { label: 'Saree under 1700', to: '/shop?maxPrice=1700' },
            { label: 'Saree under 2500', to: '/shop?maxPrice=2500' },
            { label: 'Saree under 4000', to: '/shop?maxPrice=4000' },
          ]
        },
        {
          label: 'Quick Picks',
          nested: [
            { label: 'New Arrivals', to: '/shop?sort=-createdAt' },
            { label: 'Premium Picks', to: '/shop?isPremium=true' },
          ]
        }
      ]
    },
    { to: '/shop', label: 'Collections' },
    { to: '/shop?sort=newest', label: 'New Arrivals' },
    { to: '/shop?sort=popular', label: 'Best Sellers' },
    { to: '/about', label: 'About' },
    { to: '/journal', label: 'Craft Chronicles' },
  ];

  return (
    <>
      <NavStyles />

      {/* ── Main navbar ── */}
      <nav
        className="textile-overlay thread-divider"
        style={{
          position: 'fixed',
          top: 0,
          left: 0, right: 0,
          zIndex: 50,
          display: 'flex',
          flexDirection: 'column',
          background: isScrolled
            ? '#fbf9f4f2' // background with 95% opacity
            : 'rgba(251, 249, 244, 0.8)',
          backdropFilter: 'blur(16px)',
          borderBottom: isScrolled ? '1px solid #debfbd' : '1px solid transparent', // outline-variant
          transition: 'all 0.4s cubic-bezier(0.4, 0, 0.2, 1)',
          boxShadow: isScrolled ? '0 4px 30px rgba(0,0,0,0.03)' : 'none',
        }}
      >
        {/* Announcement bar */}
        <div
          className="textile-overlay"
          style={{
            background: 'var(--terra)',
            color: 'var(--ivory)',
            fontSize: '10px',
            letterSpacing: '0.15em',
            textTransform: 'uppercase',
            padding: isScrolled ? '6px 0' : '10px 0',
            width: '100%',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            transition: 'padding 0.4s ease',
            fontFamily: "'Cinzel', serif",
            fontWeight: 500,
          }}
        >
          FESTIVE OFFER: BUY 1 GET 1. ADD 2 SAREES TO THE CART TO AVAIL THE OFFER.
        </div>

        {/* Main navigation content */}
        <div style={{
          maxWidth: 1400,
          width: '100%',
          margin: '0 auto',
          height: isScrolled ? 64 : 88,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          padding: '0 max(24px, 4vw)',
          gap: 20,
          transition: 'height 0.4s ease',
        }}>

          {/* ── LEFT: Logo ── */}
          <Link to="/" style={{
            textDecoration: 'none',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'flex-start',
            flexShrink: 0
          }}>
            <h1 style={{
              fontFamily: '"Playfair Display", serif',
              fontSize: isScrolled ? 28 : 36,
              fontWeight: 500,
              letterSpacing: '0.1em',
              color: 'var(--brand-primary)',
              textTransform: 'uppercase',
              lineHeight: 1,
              transition: 'font-size 0.4s',
              margin: 0,
            }}>
              Tanvo
            </h1>
            <span style={{
              fontFamily: 'Inter, sans-serif',
              fontSize: 8,
              letterSpacing: '0.4em',
              textTransform: 'uppercase',
              color: 'rgba(23, 59, 69, 0.6)',
              marginTop: 4,
            }}>
              Artisanal Heritage
            </span>
          </Link>

          {/* ── CENTER: Desktop nav links ── */}
          <div className="hidden lg:flex" style={{ alignItems: 'center', gap: 24 }}>
            {navLinks.map(link => {
              const isActive = location.pathname === link.to;
              const hasSub = link.subLinks && link.subLinks.length > 0;

              return (
                <div key={link.label} className={hasSub ? "nav-dropdown-wrap h-full flex items-center" : "h-full flex items-center"} style={{ position: 'relative' }}>
                  <Link
                    to={link.to}
                    className={`nav-hover-effect ${isActive ? 'active' : ''}`}
                    style={{
                      fontFamily: 'Inter, sans-serif',
                      fontSize: 11,
                      fontWeight: 500,
                      letterSpacing: '0.1em',
                      textTransform: 'uppercase',
                      color: isActive ? 'var(--brand-primary)' : 'var(--brand-accent)',
                      textDecoration: 'none',
                      transition: 'color 0.3s',
                      display: 'flex',
                      alignItems: 'center',
                      gap: 4
                    }}
                  >
                    {link.label}
                    {hasSub && <span style={{ fontSize: '8px' }}>▼</span>}
                  </Link>

                  {hasSub && (
                    <div className="nav-dropdown-content">
                      {link.subLinks?.map(sub => (
                        <div key={sub.label} className="nav-sub-wrap relative">
                          <div className="nav-sub-item flex justify-between items-center cursor-default">
                            {sub.label}
                            <ArrowUpRight size={10} className="opacity-40" />
                          </div>

                          {sub.nested && (
                            <div className="nested-dropdown-content">
                              {sub.nested.map(nest => (
                                <Link key={nest.label} to={nest.to} className="nav-sub-item">
                                  {nest.label}
                                </Link>
                              ))}
                            </div>
                          )}
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              );
            })}
          </div>

          {/* ── RIGHT: actions ── */}
          <div style={{ display: 'flex', alignItems: 'center', gap: 4 }}>

            {/* Search */}
            <form onSubmit={handleSearch} style={{ display: 'flex', alignItems: 'center', gap: 4 }}>
              <input
                ref={searchInputRef}
                type="text"
                value={searchQuery}
                onChange={e => setSearchQuery(e.target.value)}
                placeholder="Search..."
                className={`search-input ${isSearchOpen ? 'open' : ''}`}
              />
              <button
                type={isSearchOpen ? 'submit' : 'button'}
                className="nav-icon-btn"
                onClick={() => !isSearchOpen && setIsSearchOpen(true)}
                aria-label="Search"
              >
                <Search size={18} />
              </button>
            </form>

            {/* Wishlist */}
            <Link to="/wishlist" className="nav-icon-btn hidden sm:flex" aria-label="Wishlist">
              <Heart size={18} />
              {wishlistCount > 0 && <span className="nav-badge">{wishlistCount}</span>}
            </Link>

            {/* Cart */}
            <Link to="/cart" className="nav-icon-btn hidden sm:flex" aria-label="Cart">
              <ShoppingCart size={18} />
              {cartCount > 0 && <span className="nav-badge">{cartCount}</span>}
            </Link>

            {/* User — desktop */}
            <div className="user-dropdown-wrap hidden sm:block" style={{ position: 'relative' }}>
              {user ? (
                <>
                  <button className="nav-icon-btn" aria-label="Account">
                    <User size={18} />
                  </button>
                  <div className="user-dropdown">
                    <div style={{
                      padding: '12px 14px 10px',
                      borderBottom: '1px solid rgba(180, 63, 63, 0.1)',
                      marginBottom: 6
                    }}>
                      <p style={{
                        fontFamily: 'Inter, sans-serif',
                        fontSize: 9,
                        letterSpacing: '0.1em',
                        color: 'rgba(23, 59, 69, 0.5)',
                        textTransform: 'uppercase',
                        marginBottom: 4
                      }}>
                        Signed in as
                      </p>
                      <p style={{
                        fontFamily: 'Inter, sans-serif',
                        fontSize: 11,
                        fontWeight: 500,
                        color: 'var(--brand-accent)',
                        letterSpacing: '0.02em',
                        overflow: 'hidden',
                        textOverflow: 'ellipsis',
                        whiteSpace: 'nowrap'
                      }}>
                        {user.email}
                      </p>
                    </div>
                    {isAdmin && (
                      <Link to="/admin">
                        <LayoutDashboard size={14} /> Admin Dashboard
                      </Link>
                    )}
                    <Link to="/profile"><UserCircle size={14} /> Profile</Link>
                    <Link to="/orders"><Package size={14} /> My Orders</Link>
                    <Link to="/wishlist"><Heart size={14} /> Wishlist</Link>
                    <div className="divider" />
                    <button onClick={logout} style={{ color: 'var(--brand-primary)' }}>
                      <LogOut size={14} /> Logout
                    </button>
                  </div>
                </>
              ) : (
                <Link
                  to="/auth"
                  style={{
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: 8,
                    padding: '10px 24px',
                    background: 'var(--brand-primary)',
                    fontFamily: 'Inter, sans-serif',
                    fontSize: 11,
                    fontWeight: 600,
                    letterSpacing: '0.15em',
                    textTransform: 'uppercase',
                    color: '#F8EDED',
                    textDecoration: 'none',
                    transition: 'all 0.3s ease',
                    borderRadius: 0,
                  }}
                  onMouseEnter={e => {
                    (e.currentTarget as HTMLAnchorElement).style.background = 'var(--brand-secondary)';
                  }}
                  onMouseLeave={e => {
                    (e.currentTarget as HTMLAnchorElement).style.background = 'var(--brand-primary)';
                  }}
                >
                  <LogIn size={14} /> Login
                </Link>
              )}
            </div>

            {/* Hamburger — mobile */}
            <button
              className="lg:hidden nav-icon-btn"
              onClick={() => setIsDrawerOpen(true)}
              aria-label="Open menu"
            >
              <div style={{ display: 'flex', flexDirection: 'column', gap: 5, width: 22 }}>
                <span style={{ display: 'block', height: 1.5, background: 'var(--brand-primary)', width: '100%' }} />
                <span style={{ display: 'block', height: 1.5, background: 'var(--brand-primary)', width: '60%' }} />
                <span style={{ display: 'block', height: 1.5, background: 'var(--brand-primary)', width: '80%' }} />
              </div>
            </button>

          </div>
        </div>
      </nav>

      {/* ── Mobile Drawer ── */}
      <AnimatePresence>
        {isDrawerOpen && (
          <>
            {/* Backdrop */}
            <motion.div
              key="backdrop"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
              onClick={() => setIsDrawerOpen(false)}
              style={{
                position: 'fixed', inset: 0,
                background: 'rgba(23, 59, 69, 0.8)',
                backdropFilter: 'blur(4px)',
                zIndex: 200,
              }}
            />

            {/* Drawer panel */}
            <motion.div
              key="drawer"
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'tween', duration: 0.35, ease: [0.4, 0, 0.2, 1] }}
              style={{
                position: 'fixed',
                top: 0, right: 0, bottom: 0,
                width: 'min(360px, 90vw)',
                background: 'var(--brand-accent)',
                zIndex: 201,
                display: 'flex',
                flexDirection: 'column',
                overflowY: 'auto',
                borderLeft: '1px solid rgba(255, 130, 37, 0.2)',
              }}
            >
              {/* Drawer header */}
              <div style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                padding: '24px 24px 20px',
                borderBottom: '1px solid rgba(255, 130, 37, 0.15)',
                flexShrink: 0,
              }}>
                <Link to="/" onClick={() => setIsDrawerOpen(false)} style={{ textDecoration: 'none' }}>
                  <h2 style={{
                    fontFamily: '"Playfair Display", serif',
                    fontSize: 22,
                    fontWeight: 500,
                    color: '#F8EDED',
                    letterSpacing: '0.1em',
                    margin: 0,
                  }}>
                    Tanvo
                  </h2>
                  <span style={{
                    fontFamily: 'Inter, sans-serif',
                    fontSize: 7,
                    letterSpacing: '0.4em',
                    color: 'rgba(255, 130, 37, 0.6)',
                  }}>
                    ARTISANAL HERITAGE
                  </span>
                </Link>
                <button
                  onClick={() => setIsDrawerOpen(false)}
                  style={{
                    background: 'none',
                    border: 'none',
                    cursor: 'pointer',
                    color: 'rgba(248, 237, 237, 0.5)',
                    padding: 4
                  }}
                >
                  <X size={20} />
                </button>
              </div>

              {/* Mobile search */}
              <div style={{ padding: '20px 24px', borderBottom: '1px solid rgba(255, 130, 37, 0.1)' }}>
                <form onSubmit={(e) => { handleSearch(e); setIsDrawerOpen(false); }} style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: 10,
                  borderBottom: '1px solid rgba(255, 130, 37, 0.3)',
                  paddingBottom: 8
                }}>
                  <Search size={14} style={{ color: 'rgba(248, 237, 237, 0.5)' }} />
                  <input
                    type="text"
                    value={searchQuery}
                    onChange={e => setSearchQuery(e.target.value)}
                    placeholder="Search collections..."
                    style={{
                      flex: 1,
                      background: 'none',
                      border: 'none',
                      outline: 'none',
                      fontFamily: 'Inter, sans-serif',
                      fontSize: 12,
                      color: '#F8EDED',
                      padding: '4px 0',
                    }}
                  />
                </form>
              </div>

              {/* Nav links */}
              <div style={{ flexShrink: 0 }}>
                <div className="drawer-section-label">Navigate</div>
                {navLinks.map((link, i) => {
                  const hasSub = link.subLinks && link.subLinks.length > 0;
                  const isExpanded = expandedMobileLink === link.label;

                  return (
                    <motion.div
                      key={link.to + link.label}
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.1 + i * 0.05 }}
                    >
                      <div className="border-b border-white/5">
                        <div
                          className="drawer-link cursor-pointer"
                          onClick={() => {
                            if (hasSub) {
                              setExpandedMobileLink(isExpanded ? null : link.label);
                            } else {
                              navigate(link.to);
                              setIsDrawerOpen(false);
                            }
                          }}
                        >
                          <span>{link.label}</span>
                          {hasSub ? (
                            <motion.span
                              animate={{ rotate: isExpanded ? 180 : 0 }}
                              className="text-[10px] opacity-40"
                            >
                              ▼
                            </motion.span>
                          ) : (
                            <ArrowUpRight size={12} style={{ color: 'rgba(255, 130, 37, 0.5)' }} />
                          )}
                        </div>

                        <AnimatePresence>
                          {hasSub && isExpanded && (
                            <motion.div
                              initial={{ height: 0, opacity: 0 }}
                              animate={{ height: 'auto', opacity: 1 }}
                              exit={{ height: 0, opacity: 0 }}
                              transition={{ duration: 0.3, ease: 'easeInOut' }}
                              className="overflow-hidden bg-white/5"
                            >
                              <div className="pb-6">
                                {link.subLinks?.map(sub => (
                                  <div key={sub.label} className="px-8 pt-4 pb-2">
                                    <div className="text-[10px] uppercase tracking-widest text-brand-secondary mb-3 opacity-80 font-bold border-l-2 border-brand-secondary pl-3">
                                      {sub.label}
                                    </div>
                                    <div className="flex flex-col gap-3 pl-4">
                                      {sub.nested?.map(nest => (
                                        <Link
                                          key={nest.label}
                                          to={nest.to}
                                          className="text-white/60 text-sm hover:text-white transition-colors py-1 flex items-center justify-between group"
                                          onClick={() => setIsDrawerOpen(false)}
                                        >
                                          <span>{nest.label}</span>
                                          <ArrowUpRight size={10} className="opacity-0 group-hover:opacity-100 -translate-x-2 group-hover:translate-x-0 transition-all text-brand-secondary" />
                                        </Link>
                                      ))}
                                    </div>
                                  </div>
                                ))}
                              </div>
                            </motion.div>
                          )}
                        </AnimatePresence>
                      </div>
                    </motion.div>
                  );
                })}
              </div>

              {/* Account links */}
              <div style={{ flexShrink: 0 }}>
                <div className="drawer-section-label">Account</div>
                {!user ? (
                  <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.35 }}>
                    <Link to="/auth" className="drawer-link" style={{ color: 'var(--brand-secondary)' }} onClick={() => setIsDrawerOpen(false)}>
                      <span>Login / Register</span>
                      <ArrowUpRight size={12} />
                    </Link>
                  </motion.div>
                ) : (
                  <>
                    {isAdmin && (
                      <Link to="/admin" className="drawer-link" style={{ color: 'var(--brand-secondary)' }} onClick={() => setIsDrawerOpen(false)}>
                        <span>Admin Dashboard</span><ArrowUpRight size={12} />
                      </Link>
                    )}
                    {[
                      { to: '/profile', label: 'My Profile' },
                      { to: '/orders', label: 'My Orders' },
                      { to: '/wishlist', label: `Wishlist${wishlistCount > 0 ? ` (${wishlistCount})` : ''}` },
                      { to: '/cart', label: `Cart${cartCount > 0 ? ` (${cartCount})` : ''}` },
                    ].map((l, i) => (
                      <motion.div key={l.to} initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.38 + i * 0.05 }}>
                        <Link to={l.to} className="drawer-link" onClick={() => setIsDrawerOpen(false)}>
                          <span>{l.label}</span><ArrowUpRight size={12} style={{ color: 'rgba(255, 130, 37, 0.5)' }} />
                        </Link>
                      </motion.div>
                    ))}
                    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.6 }}>
                      <button
                        onClick={() => { logout(); setIsDrawerOpen(false); }}
                        style={{
                          display: 'flex', alignItems: 'center', gap: 8,
                          width: '100%', padding: '16px 24px',
                          fontFamily: 'Inter, sans-serif', fontSize: 11, fontWeight: 500,
                          color: 'rgba(255, 130, 37, 0.7)',
                          background: 'none', border: 'none', borderTop: '1px solid rgba(255, 130, 37, 0.1)',
                          cursor: 'pointer',
                        }}
                      >
                        <LogOut size={14} /> Logout
                      </button>
                    </motion.div>
                  </>
                )}
              </div>

              {/* Spacer */}
              <div style={{ flex: 1 }} />

              {/* Footer contact */}
              <div style={{
                padding: '24px',
                borderTop: '1px solid rgba(255, 130, 37, 0.15)',
                flexShrink: 0,
              }}>
                <div style={{ display: 'flex', flexDirection: 'column', gap: 12, marginBottom: 20 }}>
                  {[
                    { icon: Phone, text: '+91 98765 43210', href: 'tel:+919876543210' },
                    { icon: Mail, text: 'hello@tanvo.com', href: 'mailto:hello@tanvo.com' },
                    { icon: MapPin, text: 'Varanasi, India', href: undefined },
                  ].map(({ icon: Icon, text, href }, i) => {
                    const el = (
                      <div key={i} style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                        <Icon size={12} style={{ color: 'var(--brand-secondary)' }} />
                        <span style={{
                          fontFamily: 'Inter, sans-serif',
                          fontSize: 10,
                          color: 'rgba(248, 237, 237, 0.6)'
                        }}>{text}</span>
                      </div>
                    );
                    return href ? <a key={i} href={href} style={{ textDecoration: 'none' }}>{el}</a> : el;
                  })}
                </div>

                {/* Social */}
                <div style={{ display: 'flex', gap: 16 }}>
                  {[
                    { Icon: Instagram, href: '#' },
                    { Icon: Facebook, href: '#' },
                    { Icon: Youtube, href: '#' },
                  ].map(({ Icon, href }, i) => (
                    <a key={i} href={href} style={{
                      width: 32, height: 32,
                      border: '1px solid rgba(255, 130, 37, 0.2)',
                      display: 'flex', alignItems: 'center', justifyContent: 'center',
                      color: 'rgba(248, 237, 237, 0.5)',
                      transition: 'all 0.2s',
                      textDecoration: 'none',
                    }}
                      onMouseEnter={e => {
                        (e.currentTarget as HTMLAnchorElement).style.color = 'var(--brand-secondary)';
                        (e.currentTarget as HTMLAnchorElement).style.borderColor = 'var(--brand-secondary)';
                      }}
                      onMouseLeave={e => {
                        (e.currentTarget as HTMLAnchorElement).style.color = 'rgba(248, 237, 237, 0.5)';
                        (e.currentTarget as HTMLAnchorElement).style.borderColor = 'rgba(255, 130, 37, 0.2)';
                      }}>
                      <Icon size={14} />
                    </a>
                  ))}
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
};

export default Navbar;