import React, { useState, useEffect } from 'react';
// Correctly importing named exports from react-router-dom for web navigation
import { Link, useNavigate, useLocation } from "react-router-dom";
import { 
  ShoppingCart, Heart, User, Search, Menu, X, LogOut, LayoutDashboard,
  Home, Grid, Gem, UserCircle, MapPin, Phone, Mail, Package,
  Tag, Award, Instagram, Facebook, Youtube, ChevronDown, LogIn
} from 'lucide-react';
import { useStore } from '../context/StoreContext';
import { motion, AnimatePresence } from 'framer-motion';

const Navbar: React.FC = () => {
  const { cart, wishlist, user, logout, isAdmin } = useStore();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  // ✅ FIXED: Access cart.items instead of cart directly
  const cartCount = cart?.items?.reduce((acc, item) => acc + item.quantity, 0) || 0;
  const wishlistCount = wishlist?.length || 0;

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close menu when route changes
  useEffect(() => {
    setIsMenuOpen(false);
    setIsSearchOpen(false);
  }, [location.pathname]);

  // Prevent body scroll when menu is open
  useEffect(() => {
    if (isMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isMenuOpen]);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/shop?q=${encodeURIComponent(searchQuery)}`);
      setSearchQuery('');
      setIsMenuOpen(false);
      setIsSearchOpen(false);
    }
  };

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const closeMenu = () => {
    setIsMenuOpen(false);
  };

  const navLinks = [
    { to: '/', label: 'Home', icon: Home },
    { to: '/shop', label: 'Shop', icon: Grid },
    { to: '/shop?category=Women', label: 'Women', icon: User },
    { to: '/shop?category=Men', label: 'Men', icon: User },
    { to: '/contact', label: 'Contact', icon: Phone },
  ];

  const userLinks = [
    { to: '/profile', label: 'Profile', icon: UserCircle },
    { to: '/wishlist', label: 'Wishlist', icon: Heart, count: wishlistCount },
    { to: '/cart', label: 'Cart', icon: ShoppingCart, count: cartCount },
    { to: '/orders', label: 'Orders', icon: Package },
  ];

  // Animation variants
  const overlayVariants = {
    closed: { opacity: 0 },
    open: { opacity: 1 }
  };

  const menuVariants = {
    closed: {
      x: '-100%',
      transition: {
        type: 'tween',
        duration: 0.3,
        ease: 'easeInOut'
      }
    },
    open: {
      x: 0,
      transition: {
        type: 'tween',
        duration: 0.3,
        ease: 'easeInOut'
      }
    }
  };

  const itemVariants = {
    closed: { opacity: 0, x: -20 },
    open: { opacity: 1, x: 0 }
  };

  return (
    <>
      {/* Top Banner */}
      <motion.div 
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        className="bg-gradient-to-r from-[#C40C0C] to-[#FF6500] text-white text-center py-3 text-[10px] sm:text-xs font-black uppercase tracking-[0.2em] relative z-50 px-4"
      >
        ✦ Summer Sale - 50% Off on All Silk Suits! ✦ 
        <Link to="/shop" className="underline hover:text-[#F6CE71] ml-2 inline-block">Shop Now</Link>
      </motion.div>

      <nav 
        className={`fixed w-full z-50 transition-all duration-500 ${
          isScrolled 
            ? 'bg-white/95 backdrop-blur-xl shadow-lg h-16' 
            : 'bg-gradient-to-r from-[#FFCE99]/90 to-[#FFE5CC]/90 backdrop-blur-md h-20'
        }`}
      >
        <div className="container-custom h-full flex items-center justify-between px-4 lg:px-8">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-2 sm:gap-3 group shrink-0">
            <motion.div 
              whileHover={{ rotate: 360 }}
              transition={{ duration: 0.5 }}
              className={`w-10 h-10 sm:w-12 sm:h-12 rounded-2xl flex items-center justify-center text-white text-xl sm:text-2xl font-bold shadow-lg ${
                isScrolled ? 'bg-gradient-to-br from-[#C40C0C] to-[#FF6500]' : 'bg-black'
              }`}
            >
              ଓ
            </motion.div>
            <div className="flex flex-col">
              <span className={`text-lg sm:text-xl font-serif font-black tracking-tighter leading-none ${
                isScrolled ? 'text-gray-900' : 'text-white'
              }`}>
                Syssaree
              </span>
              <span className={`text-[8px] font-bold tracking-[0.2em] uppercase ${
                isScrolled ? 'text-gray-500' : 'text-white/70'
              }`}>
                Meher Weavers
              </span>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center gap-8">
            {navLinks.map((link) => (
              <Link
                key={link.to}
                to={link.to}
                className={`group relative text-xs font-black uppercase tracking-widest transition-all duration-300 ${
                  isScrolled ? 'text-gray-700' : 'text-white'
                } hover:text-[#C40C0C]`}
              >
                {link.label}
                <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-gradient-to-r from-[#C40C0C] to-[#FF6500] group-hover:w-full transition-all duration-300" />
              </Link>
            ))}
          </div>

          {/* Right Icons */}
          <div className="flex items-center gap-2 sm:gap-4">
            {/* Search Toggle (Mobile) */}
            <button 
              onClick={() => setIsSearchOpen(!isSearchOpen)}
              className={`lg:hidden p-2 transition-colors ${
                isScrolled ? 'text-gray-700' : 'text-white'
              }`}
            >
              <Search size={20} />
            </button>

            {/* Search Bar (Desktop) */}
            <form onSubmit={handleSearch} className="hidden lg:flex relative items-center">
              <input 
                type="text" 
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search collections..." 
                className={`bg-transparent border-b-2 py-2 px-3 text-sm font-medium transition-all outline-none w-48 focus:w-64 ${
                  isScrolled 
                    ? 'border-gray-300 text-gray-700 focus:border-[#C40C0C]' 
                    : 'border-white/30 text-white placeholder:text-white/50 focus:border-white'
                }`}
              />
              <button type="submit" className={`absolute right-0 ${
                isScrolled ? 'text-gray-500' : 'text-white'
              }`}>
                <Search size={16} />
              </button>
            </form>

            {/* Desktop User Menu */}
            <div className="hidden sm:block">
              {user ? (
                <div className="relative group">
                  <button className={`p-2 ${isScrolled ? 'text-gray-700' : 'text-white'}`}>
                    <User size={20} />
                  </button>
                  <div className="absolute right-0 top-full mt-2 w-56 bg-white shadow-2xl rounded-2xl opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300 p-2 border border-gray-100">
                    <div className="px-4 py-3 border-b border-gray-100">
                      <p className="text-xs font-bold text-gray-900 truncate">{user.email}</p>
                    </div>
                    {isAdmin && (
                      <Link to="/admin" className="flex items-center gap-2 px-4 py-2.5 text-sm text-[#C40C0C] hover:bg-red-50 rounded-xl transition-colors">
                        <LayoutDashboard size={16} /> Admin
                      </Link>
                    )}
                    <Link to="/profile" className="flex items-center gap-2 px-4 py-2.5 text-sm text-gray-700 hover:bg-gray-50 rounded-xl transition-colors">
                      <UserCircle size={16} /> Profile
                    </Link>
                    <button onClick={logout} className="w-full flex items-center gap-2 px-4 py-2.5 text-sm text-red-600 hover:bg-red-50 rounded-xl transition-colors">
                      <LogOut size={16} /> Logout
                    </button>
                  </div>
                </div>
              ) : (
                <Link 
                  to="/auth" 
                  className={`flex items-center gap-1 px-4 py-2 rounded-full border-2 text-xs font-black uppercase tracking-wider transition-all hover:scale-105 ${
                    isScrolled 
                      ? 'border-[#C40C0C] text-[#C40C0C] hover:bg-[#C40C0C] hover:text-white' 
                      : 'border-white text-white hover:bg-white hover:text-black'
                  }`}
                >
                  <User size={14} /> Login
                </Link>
              )}
            </div>

            {/* Desktop Wishlist */}
            <Link to="/wishlist" className={`hidden sm:block p-2 relative ${isScrolled ? 'text-gray-700' : 'text-white'}`}>
              <Heart size={20} />
              {wishlistCount > 0 && (
                <span className="absolute -top-1 -right-1 w-4 h-4 bg-[#C40C0C] text-white text-[8px] flex items-center justify-center rounded-full font-black">
                  {wishlistCount}
                </span>
              )}
            </Link>

            {/* Desktop Cart */}
            <Link to="/cart" className={`hidden sm:block p-2 relative ${isScrolled ? 'text-gray-700' : 'text-white'}`}>
              <ShoppingCart size={20} />
              {cartCount > 0 && (
                <span className="absolute -top-1 -right-1 w-4 h-4 bg-black text-white text-[8px] flex items-center justify-center rounded-full font-black">
                  {cartCount}
                </span>
              )}
            </Link>

            {/* Mobile Menu Toggle */}
            <button 
              onClick={toggleMenu}
              className={`lg:hidden p-2 transition-colors relative z-[60] ${
                isScrolled ? 'text-gray-700' : 'text-white'
              }`}
            >
              {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>

        {/* Mobile Search Bar (Conditional) */}
        <AnimatePresence>
          {isSearchOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              className="lg:hidden px-4 py-3 bg-white border-t border-gray-100"
            >
              <form onSubmit={handleSearch} className="relative">
                <input 
                  type="text" 
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="What are you looking for?"
                  className="w-full bg-gray-100 border-0 rounded-2xl py-4 px-5 text-base outline-none focus:ring-2 focus:ring-[#C40C0C]/30"
                  autoFocus
                />
                <button type="submit" className="absolute right-4 top-1/2 -translate-y-1/2">
                  <Search size={20} className="text-gray-500" />
                </button>
              </form>
            </motion.div>
          )}
        </AnimatePresence>
      </nav>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {isMenuOpen && (
          <motion.div
            variants={overlayVariants}
            initial="closed"
            animate="open"
            exit="closed"
            className="fixed inset-0 bg-black/60 z-[100] lg:hidden"
            onClick={closeMenu}
          >
            <motion.div
              variants={menuVariants}
              initial="closed"
              animate="open"
              exit="closed"
              className="fixed left-0 top-0 h-full w-[85%] max-w-sm bg-white shadow-2xl overflow-y-auto"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Menu Header */}
              <div className="sticky top-0 bg-white z-10 px-5 py-4 border-b border-gray-100 flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-gradient-to-br from-[#C40C0C] to-[#FF6500] rounded-xl flex items-center justify-center text-white font-bold text-xl">
                    ଓ
                  </div>
                  <span className="font-serif font-bold text-lg">Syssaree</span>
                </div>
                <button 
                  onClick={closeMenu}
                  className="p-2 bg-gray-100 rounded-xl hover:bg-gray-200 transition-colors"
                >
                  <X size={20} />
                </button>
              </div>

              {/* User Info (if logged in) */}
              {user && (
                <div className="px-5 py-4 bg-gradient-to-r from-gray-50 to-white border-b border-gray-100">
                  <p className="text-xs text-gray-500 mb-1">Logged in as</p>
                  <p className="font-bold text-gray-900 truncate">{user.email}</p>
                </div>
              )}

              {/* Main Navigation Links */}
              <div className="px-3 py-4">
                <p className="px-3 text-[10px] font-black uppercase tracking-widest text-gray-400 mb-2">
                  MENU
                </p>
                <div className="space-y-1">
                  {navLinks.map((link, index) => (
                    <motion.div
                      key={link.to}
                      variants={itemVariants}
                      initial="closed"
                      animate="open"
                      transition={{ delay: index * 0.05 }}
                    >
                      <Link
                        to={link.to}
                        onClick={closeMenu}
                        className="flex items-center gap-4 px-3 py-3.5 text-gray-900 hover:bg-gray-50 rounded-xl transition-colors"
                      >
                        <link.icon size={20} className="text-[#C40C0C]" />
                        <span className="font-bold text-base">{link.label}</span>
                      </Link>
                    </motion.div>
                  ))}
                </div>
              </div>

              {/* User Section */}
              <div className="px-3 py-2 border-t border-gray-100">
                <p className="px-3 text-[10px] font-black uppercase tracking-widest text-gray-400 mb-2">
                  ACCOUNT
                </p>
                
                {!user ? (
                  <motion.div
                    variants={itemVariants}
                    initial="closed"
                    animate="open"
                    transition={{ delay: 0.3 }}
                  >
                    <Link
                      to="/auth"
                      onClick={closeMenu}
                      className="flex items-center gap-4 px-3 py-3.5 text-gray-900 hover:bg-gray-50 rounded-xl transition-colors"
                    >
                      <LogIn size={20} className="text-[#C40C0C]" />
                      <span className="font-bold text-base">Register / Login</span>
                    </Link>
                  </motion.div>
                ) : (
                  <>
                    {userLinks.map((link, index) => (
                      <motion.div
                        key={link.to}
                        variants={itemVariants}
                        initial="closed"
                        animate="open"
                        transition={{ delay: 0.3 + index * 0.05 }}
                      >
                        <Link
                          to={link.to}
                          onClick={closeMenu}
                          className="flex items-center justify-between gap-4 px-3 py-3.5 text-gray-900 hover:bg-gray-50 rounded-xl transition-colors"
                        >
                          <div className="flex items-center gap-4">
                            <link.icon size={20} className="text-[#C40C0C]" />
                            <span className="font-bold text-base">{link.label}</span>
                          </div>
                          {link.count && link.count > 0 && (
                            <span className="bg-[#C40C0C] text-white text-xs px-2 py-1 rounded-full font-bold min-w-[24px] text-center">
                              {link.count}
                            </span>
                          )}
                        </Link>
                      </motion.div>
                    ))}
                  </>
                )}
              </div>

              {/* Admin Link */}
              {isAdmin && user && (
                <div className="px-3 py-2">
                  <motion.div
                    variants={itemVariants}
                    initial="closed"
                    animate="open"
                    transition={{ delay: 0.5 }}
                  >
                    <Link
                      to="/admin"
                      onClick={closeMenu}
                      className="flex items-center gap-4 px-3 py-3.5 text-[#C40C0C] hover:bg-red-50 rounded-xl transition-colors"
                    >
                      <LayoutDashboard size={20} />
                      <span className="font-bold text-base">Admin Dashboard</span>
                    </Link>
                  </motion.div>
                </div>
              )}

              {/* Logout Button (if logged in) */}
              {user && (
                <div className="px-3 py-2 border-t border-gray-100">
                  <motion.div
                    variants={itemVariants}
                    initial="closed"
                    animate="open"
                    transition={{ delay: 0.55 }}
                  >
                    <button
                      onClick={() => {
                        logout();
                        closeMenu();
                      }}
                      className="w-full flex items-center gap-4 px-3 py-3.5 text-red-600 hover:bg-red-50 rounded-xl transition-colors"
                    >
                      <LogOut size={20} />
                      <span className="font-bold text-base">Logout</span>
                    </button>
                  </motion.div>
                </div>
              )}

              {/* Contact Info */}
              <div className="px-5 py-6 mt-2 border-t border-gray-100 bg-gray-50">
                <div className="space-y-3">
                  <a href="tel:+919876543210" className="flex items-center gap-3 text-sm text-gray-600 hover:text-[#C40C0C]">
                    <Phone size={16} /> +91 98765 43210
                  </a>
                  <a href="mailto:hello@syssaree.com" className="flex items-center gap-3 text-sm text-gray-600 hover:text-[#C40C0C]">
                    <Mail size={16} /> hello@syssaree.com
                  </a>
                  <div className="flex items-center gap-3 text-sm text-gray-600">
                    <MapPin size={16} /> Bhubaneswar, Odisha
                  </div>
                </div>

                {/* Social Icons */}
                <div className="flex justify-start gap-4 pt-4">
                  <a href="#" className="p-2 bg-white rounded-full shadow-sm hover:shadow-md transition-all">
                    <Instagram size={18} className="text-gray-600" />
                  </a>
                  <a href="#" className="p-2 bg-white rounded-full shadow-sm hover:shadow-md transition-all">
                    <Facebook size={18} className="text-gray-600" />
                  </a>
                  <a href="#" className="p-2 bg-white rounded-full shadow-sm hover:shadow-md transition-all">
                    <Youtube size={18} className="text-gray-600" />
                  </a>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default Navbar;