import React, { useEffect, useState } from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { api } from '../../context/AuthContext';
import { CheckCircle, XCircle, Loader2 } from 'lucide-react';

const VerifyEmail: React.FC = () => {
  const [searchParams] = useSearchParams();
  const [status, setStatus] = useState<'loading' | 'success' | 'error'>('loading');
  const [message, setMessage] = useState('');
  const navigate = useNavigate();
  const token = searchParams.get('token');

  useEffect(() => {
    const verifyToken = async () => {
      if (!token) {
        setStatus('error');
        setMessage('Missing verification token.');
        return;
      }

      try {
        const response = await api.post('/auth/verify-email', { token });
        setStatus('success');
        setMessage(response.data.message || 'Email verified successfully!');
        // Redirect to login after a delay
        setTimeout(() => navigate('/auth'), 3000);
      } catch (err: any) {
        setStatus('error');
        setMessage(err.response?.data?.message || 'Verification failed. Token may be expired or invalid.');
      }
    };

    verifyToken();
  }, [token, navigate]);

  return (
    <div className="min-h-screen flex items-center justify-center p-4 bg-[#fdfbf7]">
      <motion.div 
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        className="max-w-md w-full bg-white p-8 rounded shadow-xl border border-[#c9a84c]/20 text-center"
      >
        {status === 'loading' && (
          <>
            <Loader2 className="w-16 h-16 text-[#c9a84c] animate-spin mx-auto mb-4" />
            <h1 className="text-2xl font-display text-[#1a362d] mb-2">Verifying your email</h1>
            <p className="text-[#666]">Please wait while we confirm your address...</p>
          </>
        )}

        {status === 'success' && (
          <>
            <CheckCircle className="w-16 h-16 text-green-500 mx-auto mb-4" />
            <h1 className="text-2xl font-display text-[#1a362d] mb-2">Success!</h1>
            <p className="text-[#666] mb-6">{message}</p>
            <p className="text-sm text-[#999]">Redirecting you to login...</p>
          </>
        )}

        {status === 'error' && (
          <>
            <XCircle className="w-16 h-16 text-red-500 mx-auto mb-4" />
            <h1 className="text-2xl font-display text-[#1a362d] mb-2">Verification Failed</h1>
            <p className="text-[#666] mb-6">{message}</p>
            <button 
              onClick={() => navigate('/auth')}
              className="px-6 py-2 bg-[#1a362d] text-white rounded-sm hover:bg-[#254d40] transition-colors"
            >
              Back to Login
            </button>
          </>
        )}
      </motion.div>
    </div>
  );
};

export default VerifyEmail;
