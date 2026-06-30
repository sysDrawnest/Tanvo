import React, { useState } from 'react';
// Correctly importing useNavigate and useLocation hooks from react-router-dom
import { useNavigate, useLocation, Link } from "react-router-dom";
import { useStore } from '../context/StoreContext';
import { Mail, Lock, User as UserIcon, ArrowRight, CheckCircle, Eye, EyeOff, Award, Users, BookOpen } from 'lucide-react';

const Auth: React.FC = () => {
  const [isLogin, setIsLogin] = useState(true);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [authError, setAuthError] = useState('');
  const [authSuccess, setAuthSuccess] = useState('');
  const [merging, setMerging] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const { login, register, mergeGuestData, guestCart, guestWishlist } = useStore();
  const navigate = useNavigate();
  const location = useLocation();

  // Get redirect path from query string
  const queryParams = new URLSearchParams(location.search);
  const redirectPath = queryParams.get('redirect') || '/';

  const hasGuestData = guestCart.length > 0 || guestWishlist.length > 0;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (submitting) return;
    setSubmitting(true);
    setAuthError('');
    setAuthSuccess('');

    try {
      if (isLogin) {
        const res = await login(email, password);
        if (res.success) {
          // Merge guest cart/wishlist into account
          if (hasGuestData) {
            setMerging(true);
            await mergeGuestData();
            setMerging(false);
          }

          // Redirect admin users to the admin dashboard
          if (res.user?.role === 'admin') {
            navigate('/admin');
          } else {
            navigate(redirectPath);
          }
        } else {
          setAuthError(res.error || 'Login failed. Please check your credentials.');
        }
      } else {
        // @ts-ignore
        const res = await register({ name, email, password });
        if (res.success) {
          // Merge guest cart/wishlist into new account
          if (hasGuestData) {
            setMerging(true);
            await mergeGuestData();
            setMerging(false);
          }
          setAuthSuccess('Account created successfully. Please login.');
          setIsLogin(true);
          setPassword(''); // clear password for security
        } else {
          setAuthError(res.error || 'Registration failed.');
        }
      }
    } catch (err: any) {
      setAuthError(err.message || 'An unexpected error occurred.');
    } finally {
      setSubmitting(false);
    }
  };

  if (merging) {
    return (
      <div className="min-h-screen w-full bg-[#F9F5EE] flex justify-center items-center">
        <div className="text-center p-8 bg-white border border-[#E2D9C8] rounded max-w-sm mx-auto shadow-sm">
          <div className="w-12 h-12 border-4 border-[#780000] border-t-transparent rounded-full animate-spin mx-auto mb-6"></div>
          <h2 className="text-xl font-headline-lg font-bold text-[#261816] mb-2 font-serif">Saving Your Items</h2>
          <p className="text-sm font-body-md text-[#59413d]">Syncing your cart and wishlist to your account...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen w-full bg-[#F9F5EE] text-[#261816] font-body-md flex flex-col lg:flex-row relative">
      {/* Left Panel: Immersive Brand Story (hidden on mobile, visible on lg) */}
      <section className="relative w-full lg:w-1/2 h-[380px] lg:h-screen overflow-hidden bg-[#4f0000]">
        <div className="absolute inset-0 z-0">
          <div 
            className="w-full h-full bg-cover bg-center lg:bg-[position:20%_center] transition-transform duration-[10s] hover:scale-105" 
            style={{ 
              backgroundImage: `url('/Authentication%20Image.png')`
            }}
          />
          {/* Dark Overlay for Readability */}
          <div className="absolute inset-0 bg-gradient-to-t from-[#4f0000]/95 via-[#4f0000]/40 to-transparent"></div>
        </div>

        {/* Content Overlay */}
        <div className="relative z-10 h-full flex flex-col justify-between p-8 lg:p-16 text-white">
          {/* Logo */}
          <div>
            <Link to="/" className="font-headline-lg text-2xl tracking-widest uppercase block text-white hover:opacity-80 transition-opacity">
              TANVO
            </Link>
          </div>

          {/* Heritage Message */}
          <div className="max-w-xl">
            <h2 className="text-2xl lg:text-5xl font-headline-lg font-bold mb-4 lg:mb-6 leading-tight font-serif">
              {isLogin 
                ? 'Threads of Heritage. Stories Woven Through Generations.' 
                : 'Join the Heritage. Own a Piece of History.'}
            </h2>
            <p className="text-xs lg:text-base font-body-lg text-white/80 mb-6 lg:mb-10 max-w-md">
              {isLogin 
                ? 'Authentic Odisha handlooms crafted by skilled artisans and preserved through generations.' 
                : 'Experience the timeless artistry of Odisha’s finest weavers. Every thread tells a story of survival, skill, and soul.'}
            </p>

          </div>
        </div>
      </section>

      {/* Right Panel: Authentication Area */}
      <section className="w-full lg:w-1/2 bg-[#F9F5EE] flex flex-col justify-between min-h-[calc(100vh-380px)] lg:min-h-screen">
        {/* Minimal Mobile Header */}
        <header className="flex justify-between items-center px-8 py-6 lg:hidden">
          <Link to="/" className="font-headline-lg text-xl font-bold text-[#780000] uppercase tracking-widest">
            TANVO
          </Link>
          <div className="flex items-center gap-2">
            <span className="font-label-sm text-[10px] text-[#59413d] uppercase">
              {isLogin ? 'New to TANVO?' : 'Already member?'}
            </span>
            <button 
              onClick={() => setIsLogin(!isLogin)}
              className="font-label-sm text-[10px] text-[#780000] font-bold uppercase border-b border-[#780000] hover:opacity-75 transition-opacity font-serif"
            >
              {isLogin ? 'Sign Up' : 'Sign In'}
            </button>
          </div>
        </header>

        {/* Form Container */}
        <div className="flex-grow flex items-center justify-center p-6 lg:p-12">
          <div className="w-full max-w-[420px] bg-white p-8 lg:p-10 rounded shadow-[0px_4px_40px_rgba(13,11,10,0.04)] border border-[#E2D9C8]/50 relative">
            
            {/* Guest data notice */}
            {hasGuestData && (
              <div className="mb-6 flex items-start gap-3 p-4 bg-[#780000]/5 border border-[#780000]/20 rounded-sm">
                <CheckCircle size={18} className="text-[#780000] shrink-0 mt-0.5" />
                <p className="text-xs text-[#261816] leading-relaxed">
                  You have <strong>{guestCart.length > 0 ? `${guestCart.length} item${guestCart.length > 1 ? 's' : ''} in cart` : ''}{guestCart.length > 0 && guestWishlist.length > 0 ? ' and ' : ''}{guestWishlist.length > 0 ? `${guestWishlist.length} item${guestWishlist.length > 1 ? 's' : ''} in wishlist` : ''}</strong> saved locally. Sign in to sync them permanently! ❤️
                </p>
              </div>
            )}

            <div className="text-center mb-8">
              <h3 className="font-headline-md text-2xl lg:text-3xl text-[#261816] mb-3 font-serif">
                {isLogin ? 'Welcome Back' : 'Create Your TANVO Account'}
              </h3>
              <p className="font-body-md text-sm text-[#59413d]">
                {isLogin 
                  ? 'Continue your journey through Indian craftsmanship.' 
                  : 'Save your favourite collections and discover stories behind every weave.'}
              </p>
            </div>

            {authError && (
              <div className="mb-6 p-4 bg-red-50 text-red-700 font-medium text-xs border border-red-200 rounded-sm text-center">
                {authError}
              </div>
            )}

            {authSuccess && (
              <div className="mb-6 p-4 bg-green-50 text-green-700 font-medium text-xs border border-green-200 rounded-sm text-center">
                {authSuccess}
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-5">
              {!isLogin && (
                <div className="space-y-1.5">
                  <label className="font-label-sm text-[10px] text-[#59413d] uppercase tracking-widest ml-1 block" htmlFor="full_name">
                    Full Name
                  </label>
                  <div className="relative">
                    <UserIcon size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-[#59413d]/60" />
                    <input
                      className="w-full bg-[#fff8f6] border border-[#E2D9C8] rounded-sm pl-11 pr-4 py-3 font-body-md text-sm text-[#261816] focus:border-[#780000] focus:ring-0 transition-colors outline-none placeholder-[#D2C7B1]"
                      id="full_name"
                      placeholder="Arjun Meher"
                      type="text"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      required
                    />
                  </div>
                </div>
              )}

              <div className="space-y-1.5">
                <label className="font-label-sm text-[10px] text-[#59413d] uppercase tracking-widest ml-1 block" htmlFor="email">
                  Email Address
                </label>
                <div className="relative">
                  <Mail size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-[#59413d]/60" />
                  <input
                    className="w-full bg-[#fff8f6] border border-[#E2D9C8] rounded-sm pl-11 pr-4 py-3 font-body-md text-sm text-[#261816] focus:border-[#780000] focus:ring-0 transition-colors outline-none placeholder-[#D2C7B1]"
                    id="email"
                    placeholder="e.g. name@heritage.com"
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                  />
                </div>
              </div>

              <div className="space-y-1.5">
                <div className="flex justify-between items-center px-1">
                  <label className="font-label-sm text-[10px] text-[#59413d] uppercase tracking-widest block" htmlFor="password">
                    Password
                  </label>
                  {isLogin && (
                    <Link to="/auth/forgot-password" className="font-label-sm text-[10px] text-[#780000] hover:text-[#C1121F] tracking-wider uppercase font-bold transition-colors">
                      Forgot?
                    </Link>
                  )}
                </div>
                <div className="relative">
                  <Lock size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-[#59413d]/60" />
                  <input
                    className="w-full bg-[#fff8f6] border border-[#E2D9C8] rounded-sm pl-11 pr-4 py-3 font-body-md text-sm text-[#261816] focus:border-[#780000] focus:ring-0 transition-colors outline-none placeholder-[#D2C7B1]"
                    id="password"
                    placeholder="••••••••"
                    type={showPassword ? 'text' : 'password'}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                  />
                  <button 
                    type="button" 
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-4 top-1/2 -translate-y-1/2 text-[#59413d]/60 hover:text-[#261816] transition-colors"
                  >
                    {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                  </button>
                </div>
              </div>

              {isLogin ? (
                <div className="flex items-center gap-3 pt-2">
                  <input 
                    id="remember" 
                    type="checkbox"
                    className="w-4 h-4 rounded border-[#E2D9C8] text-[#780000] focus:ring-[#780000]/20 transition-all cursor-pointer"
                  />
                  <label htmlFor="remember" className="font-body-md text-xs text-[#59413d] select-none cursor-pointer">
                    Remember me for 30 days
                  </label>
                </div>
              ) : (
                <div className="flex items-start gap-3 pt-2">
                  <input 
                    id="newsletter" 
                    type="checkbox"
                    className="mt-0.5 w-4 h-4 rounded border-[#E2D9C8] text-[#780000] focus:ring-[#780000]/20 transition-all cursor-pointer"
                  />
                  <label htmlFor="newsletter" className="font-body-md text-xs text-[#59413d] select-none cursor-pointer leading-tight">
                    Receive artisan stories and collection updates
                  </label>
                </div>
              )}

              <button
                type="submit"
                disabled={submitting}
                className="w-full bg-gradient-to-r from-[#780000] to-[#C1121F] text-white font-label-sm text-xs py-4 rounded-sm uppercase tracking-[0.2em] shadow-lg shadow-[#780000]/10 hover:shadow-[#780000]/20 hover:opacity-95 transform active:scale-[0.98] transition-all duration-200 mt-4 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
              >
                {submitting ? (
                  <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                ) : (
                  <>
                    {isLogin ? 'Login' : 'Create Account'}
                    <ArrowRight size={16} />
                  </>
                )}
              </button>
            </form>

            <div className="mt-8 pt-6 border-t border-[#E2D9C8]/40 text-center">
              <p className="font-body-md text-sm text-[#59413d]">
                {isLogin ? "New to TANVO?" : "Already have an account?"}
                <button
                  onClick={() => setIsLogin(!isLogin)}
                  className="ml-1.5 text-[#780000] font-bold hover:underline"
                >
                  {isLogin ? 'Create Account' : 'Sign In'}
                </button>
              </p>
            </div>

            {/* Admin preset credential notes */}
            <div className="mt-5 p-3.5 bg-amber-50/70 border border-amber-200/50 rounded-sm text-[10px] text-amber-800 leading-relaxed font-medium">
              <span className="font-bold">ADMIN PRESET:</span> Use <strong>admin@tanvo.com</strong> / <strong>Admin@123</strong> to explore the fulfillment dashboard.
            </div>
          </div>
        </div>

        {/* Footer links for right panel */}
        <footer className="p-8 border-t border-[#E2D9C8]/30 flex flex-col sm:flex-row items-center justify-between gap-4 text-[#59413d]/60 mt-auto bg-transparent">
          <p className="font-label-sm text-[9px] uppercase tracking-widest text-center sm:text-left">
            © 2024 TANVO. Handwoven Stories From Odisha.
          </p>
          <div className="flex gap-6">
            <a href="#" className="font-label-sm text-[9px] uppercase hover:text-[#780000] transition-colors">Heritage</a>
            <a href="#" className="font-label-sm text-[9px] uppercase hover:text-[#780000] transition-colors">Artisans</a>
            <a href="#" className="font-label-sm text-[9px] uppercase hover:text-[#780000] transition-colors">Sustainability</a>
          </div>
        </footer>
      </section>
    </div>
  );
};

export default Auth;