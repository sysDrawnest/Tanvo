import React, { useState } from 'react';
// Correctly importing useNavigate hook from react-router-dom
import { useNavigate } from "react-router-dom";
import { useStore } from '../context/StoreContext';
import { Mail, Lock, User as UserIcon, ArrowRight } from 'lucide-react';

const Auth: React.FC = () => {
  const [isLogin, setIsLogin] = useState(true);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const { login } = useStore();
  const navigate = useNavigate();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    login(email);
    navigate('/');
  };

  return (
    <div className="max-w-7xl mx-auto px-4 py-20 flex justify-center items-center min-h-[70vh]">
      <div className="w-full max-w-md bg-white p-10 shadow-2xl border border-slate-100 relative overflow-hidden">
        <div className="absolute top-0 left-0 w-full h-1 bg-maroon"></div>
        
        <div className="text-center mb-10">
          <h1 className="text-3xl font-serif font-bold text-slate-900 mb-2">
            {isLogin ? 'Welcome Back' : 'Join Our Legacy'}
          </h1>
          <p className="text-sm text-slate-500 uppercase tracking-widest">
            {isLogin ? 'Sign in to your account' : 'Create your weaver account'}
          </p>
        </div>

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
                  className="w-full pl-12 pr-4 py-3 bg-slate-50 border border-slate-200 outline-none focus:border-maroon focus:bg-white transition-all text-sm"
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
                className="w-full pl-12 pr-4 py-3 bg-slate-50 border border-slate-200 outline-none focus:border-maroon focus:bg-white transition-all text-sm"
                placeholder="you@example.com"
                required
              />
            </div>
          </div>

          <div className="space-y-2">
            <div className="flex justify-between items-center">
              <label className="text-xs font-bold uppercase tracking-widest text-slate-600 block">Password</label>
              {isLogin && <button type="button" className="text-[10px] text-maroon font-bold uppercase">Forgot?</button>}
            </div>
            <div className="relative">
              <Lock size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" />
              <input 
                type="password" 
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full pl-12 pr-4 py-3 bg-slate-50 border border-slate-200 outline-none focus:border-maroon focus:bg-white transition-all text-sm"
                placeholder="••••••••"
                required
              />
            </div>
          </div>

          <button 
            type="submit"
            className="w-full bg-maroon text-white py-4 font-bold uppercase tracking-[0.2em] shadow-xl hover:bg-red-900 transition-all flex items-center justify-center gap-3"
          >
            {isLogin ? 'Sign In' : 'Create Account'} <ArrowRight size={18} />
          </button>
        </form>

        <div className="mt-8 pt-8 border-t border-slate-100 text-center">
          <p className="text-sm text-slate-500">
            {isLogin ? "Don't have an account?" : "Already have an account?"}
            <button 
              onClick={() => setIsLogin(!isLogin)}
              className="ml-2 text-maroon font-bold uppercase text-xs tracking-widest hover:underline"
            >
              {isLogin ? 'Sign Up' : 'Log In'}
            </button>
          </p>
        </div>

        {/* Demo Note */}
        <div className="mt-6 p-4 bg-indigo-50 border border-indigo-100 rounded text-[10px] text-indigo-700 font-medium">
          <span className="font-bold">PRO TIP:</span> Use an email containing "admin" to access the Admin Panel simulation.
        </div>
      </div>
    </div>
  );
};

export default Auth;