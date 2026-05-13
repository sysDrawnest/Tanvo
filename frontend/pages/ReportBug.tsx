import React, { useState, useRef } from 'react';
import { motion } from 'framer-motion';
import { Bug, Camera, Upload, Send, Loader2, CheckCircle, AlertCircle, X } from 'lucide-react';
import html2canvas from 'html2canvas';
import { api } from '../context/AuthContext';
import { useLocation } from 'react-router-dom';

const ReportBug: React.FC = () => {
  const location = useLocation();
  const [description, setDescription] = useState('');
  const [screenshot, setScreenshot] = useState<string | null>(null);
  const [isCapturing, setIsCapturing] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [error, setError] = useState('');
  
  const fileInputRef = useRef<HTMLInputElement>(null);

  const captureScreen = async () => {
    setIsCapturing(true);
    try {
      const canvas = await html2canvas(document.body);
      const base64Image = canvas.toDataURL('image/png');
      setScreenshot(base64Image);
    } catch (err) {
      console.error('Failed to capture screenshot:', err);
      setError('Failed to capture screen. Please upload manually.');
    } finally {
      setIsCapturing(false);
    }
  };

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setScreenshot(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');

    try {
      await api.post('/support/bug-report', {
        description,
        route: location.pathname,
        deviceInfo: navigator.userAgent,
        screenshotUrl: screenshot // In a real app, you'd upload this to S3/Cloudinary first
      });
      setIsSuccess(true);
    } catch (err: any) {
      setError(err.response?.data?.message || 'Failed to submit report.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#fdfbf7] pt-32 pb-24">
      <div className="container-custom max-w-2xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white p-8 rounded-2xl shadow-xl border border-[#c9a84c]/20"
        >
          <div className="flex items-center gap-4 mb-8">
            <div className="w-12 h-12 bg-red-50 rounded-xl flex items-center justify-center">
              <Bug className="w-6 h-6 text-red-600" />
            </div>
            <div>
              <h1 className="text-3xl font-display text-[#1a362d]">Report a Problem</h1>
              <p className="text-[#666]">Help us improve your experience</p>
            </div>
          </div>

          {isSuccess ? (
            <div className="text-center py-12">
              <CheckCircle className="w-16 h-16 text-green-500 mx-auto mb-4" />
              <h2 className="text-2xl font-display text-[#1a362d] mb-2">Thank You!</h2>
              <p className="text-[#666] mb-8">Your report has been received. Our technical team will investigate it.</p>
              <button 
                onClick={() => setIsSuccess(false)}
                className="btn-gold"
              >
                Report Another Issue
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label className="block text-sm font-medium text-[#1a362d] mb-2">What happened?</label>
                <textarea
                  required
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  rows={5}
                  className="w-full p-4 border border-[#eee] rounded-xl focus:outline-none focus:ring-2 focus:ring-[#c9a84c] transition-all"
                  placeholder="Describe the issue in detail..."
                />
              </div>

              <div className="space-y-4">
                <label className="block text-sm font-medium text-[#1a362d]">Screenshot (Optional)</label>
                
                {screenshot ? (
                  <div className="relative group rounded-xl overflow-hidden border border-[#eee]">
                    <img src={screenshot} alt="Preview" className="w-full h-auto max-h-64 object-cover" />
                    <button 
                      type="button"
                      onClick={() => setScreenshot(null)}
                      className="absolute top-2 right-2 p-1 bg-black/50 text-white rounded-full hover:bg-black/70"
                    >
                      <X size={16} />
                    </button>
                  </div>
                ) : (
                  <div className="grid grid-cols-2 gap-4">
                    <button
                      type="button"
                      onClick={captureScreen}
                      disabled={isCapturing}
                      className="flex flex-col items-center justify-center p-6 border-2 border-dashed border-[#eee] rounded-xl hover:border-[#c9a84c] hover:bg-[#c9a84c]/5 transition-all group"
                    >
                      {isCapturing ? (
                        <Loader2 className="w-6 h-6 animate-spin text-[#c9a84c]" />
                      ) : (
                        <Camera className="w-6 h-6 text-[#999] group-hover:text-[#c9a84c]" />
                      )}
                      <span className="text-xs mt-2 text-[#999] group-hover:text-[#c9a84c]">Capture Screen</span>
                    </button>
                    
                    <button
                      type="button"
                      onClick={() => fileInputRef.current?.click()}
                      className="flex flex-col items-center justify-center p-6 border-2 border-dashed border-[#eee] rounded-xl hover:border-[#c9a84c] hover:bg-[#c9a84c]/5 transition-all group"
                    >
                      <Upload className="w-6 h-6 text-[#999] group-hover:text-[#c9a84c]" />
                      <span className="text-xs mt-2 text-[#999] group-hover:text-[#c9a84c]">Upload Image</span>
                    </button>
                  </div>
                )}
                <input 
                  type="file" 
                  ref={fileInputRef} 
                  onChange={handleFileUpload} 
                  accept="image/*" 
                  className="hidden" 
                />
              </div>

              <div className="bg-blue-50 p-4 rounded-xl flex gap-3 items-start">
                <AlertCircle className="w-5 h-5 text-blue-500 shrink-0 mt-0.5" />
                <div className="text-xs text-blue-700">
                  <p className="font-bold mb-1">Context Captured</p>
                  <p>Page: {location.pathname}</p>
                  <p>Browser: {navigator.userAgent.substring(0, 50)}...</p>
                </div>
              </div>

              {error && <p className="text-red-500 text-sm">{error}</p>}

              <button
                type="submit"
                disabled={isLoading}
                className="w-full py-4 bg-[#1a362d] text-white rounded-xl font-bold hover:bg-[#254d40] transition-all disabled:opacity-50 flex items-center justify-center"
              >
                {isLoading ? <Loader2 className="w-5 h-5 animate-spin mr-2" /> : null}
                Submit Report
              </button>
            </form>
          )}
        </motion.div>
      </div>
    </div>
  );
};

export default ReportBug;
