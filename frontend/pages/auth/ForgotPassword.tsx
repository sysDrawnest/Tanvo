import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { api } from '../../context/AuthContext';
import { Mail, ArrowLeft, Loader2, CheckCircle } from 'lucide-react';
import { Link } from 'react-router-dom';

const ForgotPassword: React.FC = () => {
  const [email, setEmail] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isSent, setIsSent] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');

    try {
      await api.post('/auth/forgot-password', { email });
      setIsSent(true);
    } catch (err: any) {
      setError(err.response?.data?.message || 'Something went wrong. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-4 bg-[#fdfbf7]">
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="max-w-md w-full bg-white p-8 rounded-2xl shadow-xl border border-[#c9a84c]/20"
      >
        <Link to="/auth" className="inline-flex items-center text-sm text-[#c9a84c] hover:underline mb-6">
          <ArrowLeft className="w-4 h-4 mr-2" />
          Back to Login
        </Link>

        {!isSent ? (
          <>
            <h1 className="text-3xl font-display text-[#1a362d] mb-2">Forgot Password?</h1>
            <p className="text-[#666] mb-8">Enter your email address and we'll send you a link to reset your password.</p>

            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label className="block text-sm font-medium text-[#1a362d] mb-2">Email Address</label>
                <div className="relative">
                  <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-[#999]" />
                  <input
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full pl-10 pr-4 py-3 border border-[#eee] rounded-xl focus:outline-none focus:ring-2 focus:ring-[#c9a84c] transition-all"
                    placeholder="example@email.com"
                  />
                </div>
              </div>

              {error && <p className="text-red-500 text-sm">{error}</p>}

              <button
                type="submit"
                disabled={isLoading}
                className="w-full py-4 bg-[#1a362d] text-white rounded-xl font-bold hover:bg-[#254d40] transition-all disabled:opacity-50 flex items-center justify-center"
              >
                {isLoading ? <Loader2 className="w-5 h-5 animate-spin mr-2" /> : null}
                Send Reset Link
              </button>
            </form>
          </>
        ) : (
          <div className="text-center py-4">
            <CheckCircle className="w-16 h-16 text-green-500 mx-auto mb-4" />
            <h2 className="text-2xl font-display text-[#1a362d] mb-2">Check your email</h2>
            <p className="text-[#666] mb-8">
              We've sent a password reset link to <strong>{email}</strong>. Please check your inbox and spam folder.
            </p>
            <button
              onClick={() => setIsSent(false)}
              className="text-[#c9a84c] font-medium hover:underline"
            >
              Didn't receive the email? Try again
            </button>
          </div>
        )}
      </motion.div>
    </div>
  );
};

export default ForgotPassword;
