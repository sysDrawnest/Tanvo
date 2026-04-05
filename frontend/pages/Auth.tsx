import React, { useState } from 'react';
// Correctly importing useNavigate and useLocation hooks from react-router-dom
import { useNavigate, useLocation } from "react-router-dom";
import { useStore } from '../context/StoreContext';
import { Mail, Lock, User as UserIcon, ArrowRight, CheckCircle } from 'lucide-react';

const Auth: React.FC = () => {
  const [isLogin, setIsLogin] = useState(true);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [authError, setAuthError] = useState('');
  const [merging, setMerging] = useState(false);
  const { login, register, mergeGuestData, guestCart, guestWishlist } = useStore();
  const navigate = useNavigate();
  const location = useLocation();

  // Get redirect path from query string
  const queryParams = new URLSearchParams(location.search);
  const redirectPath = queryParams.get('redirect') || '/';

  const hasGuestData = guestCart.length > 0 || guestWishlist.length > 0;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setAuthError('');

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
        navigate(redirectPath);
      } else {
        setAuthError(res.error || 'Registration failed.');
      }
    }
  };

  if (merging) {
    return (
      <div className="max-w-7xl mx-auto px-4 py-20 flex justify-center items-center min-h-[70vh]">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-[#B43F3F] border-t-transparent rounded-full animate-spin mx-auto mb-6"></div>
          <h2 className="text-2xl font-display font-medium text-[#173B45] mb-2">Saving Your Items</h2>
          <p className="text-[#173B45]/60">Syncing your cart and wishlist to your account...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 py-20 flex justify-center items-center min-h-[70vh]">
      <div className="w-full max-w-md bg-white p-10 shadow-2xl border border-slate-100 relative overflow-hidden">
        <div className="absolute top-0 left-0 w-full h-1" style={{ background: 'var(--action-cta)' }}></div>

        {/* Guest data notice */}
        {hasGuestData && (
          <div className="mb-6 flex items-start gap-3 p-4 bg-[#B43F3F]/5 border border-[#B43F3F]/20 rounded-lg">
            <CheckCircle size={18} className="text-[#B43F3F] shrink-0 mt-0.5" />
            <p className="text-sm text-[#173B45]">
              You have <strong>{guestCart.length > 0 ? `${guestCart.length} item${guestCart.length > 1 ? 's' : ''} in cart` : ''}{guestCart.length > 0 && guestWishlist.length > 0 ? ' and ' : ''}{guestWishlist.length > 0 ? `${guestWishlist.length} item${guestWishlist.length > 1 ? 's' : ''} in wishlist` : ''}</strong> saved locally. Sign in to save them permanently! ❤️
            </p>
          </div>
        )}

        <div className="text-center mb-10">
          <h1 className="text-3xl font-display font-bold text-[#0D0B0A] mb-2">
            {isLogin ? 'Welcome Back' : 'Join Our Legacy'}
          </h1>
          <p className="text-sm text-slate-500 uppercase tracking-widest">
            {isLogin ? 'Sign in to your account' : 'Create your weaver account'}
          </p>
        </div>

        {authError && (
          <div className="mb-6 p-3 bg-red-50 text-red-600 font-bold text-sm border border-red-200 rounded text-center">
            {authError}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-6">
          {!isLogin && (
            <div className="space-y-2">
              <label className="text-xs font-bold uppercase tracking-widest text-slate-600 block">Full Name</label>
              <div className="relative">
                <UserIcon size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" />
                <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full pl-12 pr-4 py-3 bg-slate-50 border border-slate-200 outline-none focus:border-[var(--action-cta)] focus:bg-white transition-all text-sm"
                  placeholder="Arjun Meher"
                  required
                />
              </div>
            </div>
          )}

          <div className="space-y-2">
            <label className="text-xs font-bold uppercase tracking-widest text-slate-600 block">Email Address</label>
            <div className="relative">
              <Mail size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" />
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full pl-12 pr-4 py-3 bg-slate-50 border border-slate-200 outline-none focus:border-[var(--action-cta)] focus:bg-white transition-all text-sm"
                placeholder="you@example.com"
                required
              />
            </div>
          </div>

          <div className="space-y-2">
            <div className="flex justify-between items-center">
              <label className="text-xs font-bold uppercase tracking-widest text-slate-600 block">Password</label>
              {isLogin && <button type="button" className="text-[10px] text-[var(--action-cta)] font-bold uppercase">Forgot?</button>}
            </div>
            <div className="relative">
              <Lock size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" />
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full pl-12 pr-4 py-3 bg-slate-50 border border-slate-200 outline-none focus:border-[var(--action-cta)] focus:bg-white transition-all text-sm"
                placeholder="••••••••"
                required
              />
            </div>
          </div>

          <button
            type="submit"
            className="w-full text-white py-4 font-bold uppercase tracking-[0.2em] shadow-xl hover:opacity-90 transition-all flex items-center justify-center gap-3"
            style={{ background: 'var(--action-cta)', color: 'var(--action-text)' }}
          >
            {isLogin ? 'Sign In' : 'Create Account'} <ArrowRight size={18} />
          </button>
        </form>

        <div className="mt-8 pt-8 border-t border-slate-100 text-center">
          <p className="text-sm text-slate-500">
            {isLogin ? "Don't have an account?" : "Already have an account?"}
            <button
              onClick={() => setIsLogin(!isLogin)}
              className="ml-2 text-[var(--action-cta)] font-bold uppercase text-xs tracking-widest hover:underline"
            >
              {isLogin ? 'Sign Up' : 'Log In'}
            </button>
          </p>
        </div>

        {/* Demo Note */}
        <div className="mt-6 p-4 bg-emerald-50 border border-emerald-200 rounded text-[10px] text-emerald-700 font-medium">
          <span className="font-bold">ADMIN LOGIN:</span> Use <strong>admin@tanvo.com</strong> / <strong>Admin@123</strong> to access the Admin Dashboard.
        </div>
      </div>
    </div>
  );
};

export default Auth;