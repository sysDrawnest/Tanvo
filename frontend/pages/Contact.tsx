import React, { useState } from 'react';
import { Mail, Phone, MapPin, MessageCircle, Clock, ShieldCheck, Send, User, MessageSquare, Instagram, Facebook, Youtube, ChevronRight, Loader2, CheckCircle, Info } from 'lucide-react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { api } from '../context/AuthContext';
import { CORPORATE_CONFIG } from '../corporateConfig';

const Contact: React.FC = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    category: 'General Inquiry',
    message: ''
  });
  const [isLoading, setIsLoading] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');

    try {
      await api.post('/support/contact', formData);
      setIsSuccess(true);
      setFormData({ name: '', email: '', category: 'General Inquiry', message: '' });
    } catch (err: any) {
      setError(err.response?.data?.message || 'Failed to send message. Please try again later.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };

  return (
    <div className="min-h-screen bg-[#F8EDED] pt-24 md:pt-32 pb-16 md:pb-24 relative overflow-hidden">
      {/* Textile overlay */}
      <div
        className="fixed inset-0 pointer-events-none"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='40' height='40' viewBox='0 0 40 40' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M0 0h40v2H0V0zm0 4h40v2H0V4zm0 4h40v2H0V8zm0 4h40v2H0v-2zm0 4h40v2H0v-2zm0 4h40v2H0v-2zm0 4h40v2H0v-2zm0 4h40v2H0v-2zm0 4h40v2H0v-2zm0 4h40v2H0v-2z' fill='%23B43F3F' fill-opacity='0.02' fill-rule='evenodd'/%3E%3C/svg%3E")`,
          opacity: 0.5,
        }}
      />

      {/* Decorative thread lines */}
      <div className="absolute top-40 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-[#B43F3F]/20 to-transparent"></div>
      <div className="absolute bottom-40 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-[#FF8225]/20 to-transparent"></div>

      {/* Background decorative elements */}
      <div className="absolute top-20 left-0 w-96 h-96 bg-gradient-to-br from-[#B43F3F]/5 to-transparent rounded-full blur-3xl -z-10" />
      <div className="absolute bottom-20 right-0 w-80 h-80 bg-gradient-to-tl from-[#FF8225]/5 to-transparent rounded-full blur-3xl -z-10" />

      <div className="container mx-auto px-4 max-w-6xl relative z-10">
        {/* Hero Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="max-w-3xl mx-auto text-center mb-12 md:mb-16 space-y-4"
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-[#FF8225]/10 rounded-sm border border-[#FF8225]/20">
            <MessageCircle className="w-4 h-4 text-[#FF8225]" />
            <span className="text-[#FF8225] font-medium uppercase tracking-[0.2em] text-xs">Connect with Artisans</span>
          </div>
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-display font-medium text-[#173B45]">
            Weave Your{' '}
            <span className="text-[#B43F3F]">Query</span>
          </h1>
          <p className="text-base md:text-lg text-[#173B45]/70 max-w-2xl mx-auto font-light">
            Connect directly with master weavers and heritage experts. Every thread tells a story—let's weave yours together.
          </p>
          <div className="w-20 h-1 bg-gradient-to-r from-[#B43F3F] to-[#FF8225] mx-auto mt-4"></div>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 md:gap-12 lg:gap-16 items-start">
          {/* Left Column - Contact Info */}
          <div className="space-y-6 md:space-y-8">
            {/* Contact Cards */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="grid grid-cols-1 sm:grid-cols-2 gap-4"
            >
              <div className="group bg-white p-6 rounded border border-[#B43F3F]/10 shadow-md hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
                <div className="w-12 h-12 bg-[#F8EDED] rounded-sm flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300">
                  <Phone className="w-5 h-5 text-[#B43F3F]" />
                </div>
                <h3 className="text-lg font-display font-medium text-[#173B45] mb-2">Call Us</h3>
                <p className="text-xs text-[#173B45]/60 mb-3">Direct line to artisan support</p>
                <a
                  href="tel:+918144622958"
                  className="inline-flex items-center gap-1 text-sm font-medium text-[#FF8225] hover:text-[#B43F3F] transition-colors"
                >
                  +91 81446 22958
                  <ChevronRight size={14} />
                </a>
              </div>

              <div className="group bg-white p-6 rounded border border-[#B43F3F]/10 shadow-md hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
                <div className="w-12 h-12 bg-[#F8EDED] rounded-sm flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300">
                  <Mail className="w-5 h-5 text-[#FF8225]" />
                </div>
                <h3 className="text-lg font-display font-medium text-[#173B45] mb-2">Email Us</h3>
                <p className="text-xs text-[#173B45]/60 mb-3">For custom orders & collaborations</p>
                <a
                  href="mailto:hello@tanvo.com"
                  className="inline-flex items-center gap-1 text-sm font-medium text-[#FF8225] hover:text-[#B43F3F] transition-colors"
                >
                  hello@tanvo.com
                  <ChevronRight size={14} />
                </a>
              </div>
            </motion.div>

            {/* Address Card */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="bg-white p-6 md:p-8 rounded border border-[#B43F3F]/10 shadow-md relative overflow-hidden"
            >
              <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-bl from-[#B43F3F]/5 to-transparent rounded-full -translate-y-16 translate-x-16" />

              <div className="flex items-start gap-4 relative z-10">
                <div className="w-12 h-12 bg-[#F8EDED] rounded-sm flex items-center justify-center shrink-0">
                  <MapPin className="w-5 h-5 text-[#173B45]" />
                </div>
                <div>
                  <h4 className="text-lg font-display font-medium text-[#173B45] mb-2">
                    Tanvo Hub
                  </h4>
                  <p className="text-sm text-[#173B45]/70 leading-relaxed font-light">
                    Patia, Bhubaneswar<br />
                    Odisha, India - 751024
                  </p>
                  <p className="text-xs text-[#173B45]/50 mt-1 font-mono">
                    20°16′N 85°50′E
                  </p>
                  <div className="mt-4 pt-3 border-t border-[#B43F3F]/10 text-left">
                    <p className="text-[9px] uppercase tracking-wider text-[#173B45]/40 font-medium">Corporate Information</p>
                    <div className="flex flex-col gap-1 mt-1 text-[11px] text-[#173B45]/70">
                      <div><span className="font-semibold text-[#173B45]/50">Brand:</span> {CORPORATE_CONFIG.brands.find(b => b.id === 'tanvo')?.name || 'TANVO'}</div>
                      <div><span className="font-semibold text-[#173B45]/50">Legal Entity:</span> {CORPORATE_CONFIG.parentCompany.name}</div>
                    </div>
                  </div>
                  <a
                    href="https://www.google.com/maps?q=Patia+Bhubaneswar+Odisha+751024"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1 mt-3 text-xs font-medium text-[#FF8225] hover:text-[#B43F3F] transition-colors"
                  >
                    View on Google Maps
                    <ChevronRight size={12} />
                  </a>
                </div>
              </div>

              <div className="mt-6 pt-6 border-t border-[#B43F3F]/10 relative z-10">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-[10px] font-medium uppercase tracking-wider text-[#FF8225] mb-1">Master Weaver</p>
                    <p className="text-xl font-display font-medium text-[#173B45]">
                      The Tanvo Atelier
                    </p>
                  </div>
                  <div className="w-12 h-12 bg-gradient-to-br from-[#B43F3F] to-[#FF8225] rounded-sm flex items-center justify-center text-[#F8EDED] font-medium text-sm">
                    T
                  </div>
                </div>
              </div>
            </motion.div>

            {/* Trust Badges */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="flex flex-wrap gap-3"
            >
              <div className="flex items-center gap-2 px-3 py-2 bg-white rounded-sm border border-[#B43F3F]/10 shadow-sm">
                <div className="w-8 h-8 bg-green-50 rounded-sm flex items-center justify-center">
                  <ShieldCheck className="w-4 h-4 text-green-600" />
                </div>
                <div>
                  <p className="text-xs font-medium text-[#173B45]">GI Certified</p>
                  <p className="text-[8px] text-[#173B45]/50">Authenticity Guaranteed</p>
                </div>
              </div>

              <div className="flex items-center gap-2 px-3 py-2 bg-white rounded-sm border border-[#B43F3F]/10 shadow-sm">
                <div className="w-8 h-8 bg-[#F8EDED] rounded-sm flex items-center justify-center">
                  <Clock className="w-4 h-4 text-[#FF8225]" />
                </div>
                <div>
                  <p className="text-xs font-medium text-[#173B45]">24/7 Support</p>
                  <p className="text-[8px] text-[#173B45]/50">Quick Response Time</p>
                </div>
              </div>
            </motion.div>

            {/* Social Media */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.5 }}
              className="pt-6 border-t border-[#B43F3F]/10"
            >
              <p className="text-sm font-medium text-[#173B45] mb-3 font-display">Follow Our Journey</p>
              <div className="flex gap-3">
                {[
                  { icon: Instagram, href: '#', label: 'Instagram', color: '#E1306C' },
                  { icon: Facebook, href: '#', label: 'Facebook', color: '#1877F2' },
                  { icon: Youtube, href: '#', label: 'YouTube', color: '#FF0000' },
                ].map((social) => (
                  <a
                    key={social.label}
                    href={social.href}
                    className="group w-10 h-10 bg-white rounded-sm border border-[#B43F3F]/10 shadow-sm flex items-center justify-center hover:shadow-md transition-all duration-300 hover:-translate-y-1"
                    aria-label={social.label}
                  >
                    <social.icon className="w-4 h-4 text-[#173B45] group-hover:text-[#FF8225] transition-colors" />
                  </a>
                ))}
              </div>
            </motion.div>
          </div>

          {/* Right Column - Form */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="bg-white p-6 md:p-8 border border-[#B43F3F]/10 shadow-xl rounded relative overflow-hidden"
          >
            {/* Top gradient bar */}
            <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-[#B43F3F] via-[#FF8225] to-[#B43F3F]" />

            <div className="flex items-center gap-3 mb-6">
              <div className="w-10 h-10 bg-[#F8EDED] rounded-sm flex items-center justify-center">
                <MessageSquare className="w-5 h-5 text-[#B43F3F]" />
              </div>
              <h2 className="text-xl md:text-2xl font-display font-medium text-[#173B45]">
                Send Your Message
              </h2>
            </div>

            {isSuccess ? (
              <motion.div 
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                className="text-center py-12"
              >
                <div className="w-20 h-20 bg-green-100 rounded-sm flex items-center justify-center mx-auto mb-6">
                  <CheckCircle className="w-10 h-10 text-green-600" />
                </div>
                <h3 className="text-2xl font-display text-[#173B45] mb-2">Message Sent!</h3>
                <p className="text-[#173B45]/70 mb-8 font-light">Thank you for reaching out. Our team will get back to you within 2 hours.</p>
                <button 
                  onClick={() => setIsSuccess(false)}
                  className="px-8 py-3 bg-[#B43F3F] text-white rounded-sm hover:bg-[#FF8225] transition-colors text-sm font-medium"
                >
                  Send Another Message
                </button>
              </motion.div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <label className="flex items-center gap-2 text-xs font-medium text-[#173B45]/70 uppercase tracking-wider">
                      <User className="w-3 h-3" />
                      Your Full Name
                    </label>
                    <input
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      type="text"
                      className="w-full bg-[#F8EDED] border border-[#B43F3F]/10 rounded-sm py-3 px-4 outline-none focus:border-[#FF8225] focus:ring-2 focus:ring-[#FF8225]/20 transition-all text-sm placeholder-[#173B45]/40"
                      placeholder="e.g., Arjun Meher"
                      required
                    />
                  </div>

                  <div className="space-y-2">
                    <label className="flex items-center gap-2 text-xs font-medium text-[#173B45]/70 uppercase tracking-wider">
                      <Mail className="w-3 h-3" />
                      Email Address
                    </label>
                    <input
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      type="email"
                      className="w-full bg-[#F8EDED] border border-[#B43F3F]/10 rounded-sm py-3 px-4 outline-none focus:border-[#FF8225] focus:ring-2 focus:ring-[#FF8225]/20 transition-all text-sm placeholder-[#173B45]/40"
                      placeholder="e.g., hello@example.com"
                      required
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <label className="flex items-center gap-2 text-xs font-medium text-[#173B45]/70 uppercase tracking-wider">
                    <Info className="w-3 h-3" />
                    Support Category
                  </label>
                  <select
                    name="category"
                    value={formData.category}
                    onChange={handleChange}
                    className="w-full bg-[#F8EDED] border border-[#B43F3F]/10 rounded-sm py-3 px-4 outline-none focus:border-[#FF8225] focus:ring-2 focus:ring-[#FF8225]/20 transition-all text-sm appearance-none"
                    required
                  >
                    <option value="General Inquiry">General Inquiry</option>
                    <option value="Technical Issue">Technical Issue</option>
                    <option value="Billing">Billing</option>
                    <option value="Product Question">Product Question</option>
                    <option value="Partnership">Partnership</option>
                  </select>
                </div>

                <div className="space-y-2">
                  <label className="flex items-center gap-2 text-xs font-medium text-[#173B45]/70 uppercase tracking-wider">
                    <MessageSquare className="w-3 h-3" />
                    Your Message
                  </label>
                  <textarea
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    rows={4}
                    className="w-full bg-[#F8EDED] border border-[#B43F3F]/10 rounded-sm py-3 px-4 outline-none focus:border-[#FF8225] focus:ring-2 focus:ring-[#FF8225]/20 transition-all text-sm placeholder-[#173B45]/40 resize-none font-light"
                    placeholder="Share your thoughts, questions, or custom requirements..."
                    required
                  />
                </div>

                {error && (
                  <p className="text-red-500 text-xs flex items-center gap-1">
                    <Info className="w-3 h-3" />
                    {error}
                  </p>
                )}

                <button
                  type="submit"
                  disabled={isLoading}
                  className="group w-full py-3 bg-[#B43F3F] text-[#F8EDED] text-sm font-medium rounded-sm shadow-md hover:bg-[#FF8225] transition-all duration-300 flex items-center justify-center gap-2 disabled:opacity-50"
                >
                  {isLoading ? (
                    <Loader2 className="w-4 h-4 animate-spin" />
                  ) : (
                    <>
                      <span>Send Message</span>
                      <Send className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                    </>
                  )}
                </button>

                <p className="text-xs text-center text-[#173B45]/40 pt-2 font-light">
                  We typically respond within 2 hours during business hours
                </p>
              </form>
            )}
          </motion.div>
        </div>

        {/* Map Preview */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.5 }}
          className="mt-8 bg-white rounded border border-[#B43F3F]/10 overflow-hidden shadow-md"
        >
          <div className="p-4 border-b border-[#B43F3F]/10">
            <div className="flex items-center gap-2">
              <MapPin className="w-4 h-4 text-[#B43F3F]" />
              <h3 className="text-sm font-medium text-[#173B45] font-display">Visit Our Hub</h3>
            </div>
          </div>

          <div className="relative h-64 bg-[#F8EDED]">
            {/* Map placeholder with coordinates */}
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="relative w-48 h-48 bg-white rounded shadow-lg border border-[#B43F3F]/10 overflow-hidden">
                {/* Decorative grid pattern */}
                <div className="absolute inset-0" style={{
                  backgroundImage: 'linear-gradient(#B43F3F10 1px, transparent 1px), linear-gradient(90deg, #B43F3F10 1px, transparent 1px)',
                  backgroundSize: '20px 20px'
                }} />

                {/* Location marker */}
                <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
                  <div className="relative">
                    <div className="w-12 h-12 bg-gradient-to-br from-[#B43F3F] to-[#FF8225] rounded-full flex items-center justify-center animate-pulse">
                      <div className="w-6 h-6 bg-white rounded-full flex items-center justify-center">
                        <MapPin className="w-3 h-3 text-[#B43F3F]" />
                      </div>
                    </div>
                    <div className="absolute -bottom-8 left-1/2 transform -translate-x-1/2 whitespace-nowrap">
                      <p className="text-xs font-medium text-[#173B45]">Tanvo Hub</p>
                      <p className="text-[8px] text-[#173B45]/50">20°16′N 85°50′E</p>
                    </div>
                  </div>
                </div>

                {/* Compass */}
                <div className="absolute bottom-2 right-2 text-[8px] text-[#173B45]/30 font-mono">
                  N ↑
                </div>
              </div>
            </div>
          </div>

          <div className="p-4 bg-[#F8EDED] border-t border-[#B43F3F]/10">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-xs font-medium text-[#173B45]">Patia, Bhubaneswar</p>
                <p className="text-[10px] text-[#173B45]/50">Odisha, India - 751024</p>
              </div>
              <a
                href="https://www.google.com/maps?q=Patia+Bhubaneswar+Odisha+751024"
                target="_blank"
                rel="noopener noreferrer"
                className="px-4 py-2 bg-[#B43F3F] text-[#F8EDED] text-xs font-medium rounded hover:bg-[#FF8225] transition-colors"
              >
                Open in Maps
              </a>
            </div>
          </div>
        </motion.div>

        {/* WhatsApp CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.6 }}
          className="mt-8 text-center"
        >
          <Link
            to="/whatsapp-order"
            className="inline-flex items-center gap-2 px-6 py-3 bg-[#25D366] text-white rounded hover:bg-[#128C7E] transition-colors text-sm font-medium"
          >
            <MessageCircle size={18} />
            Chat on WhatsApp
          </Link>
          <p className="text-xs text-[#173B45]/40 mt-3">
            Prefer email? <a href="mailto:hello@tanvo.com" className="text-[#FF8225] hover:text-[#B43F3F]">hello@tanvo.com</a>
          </p>
        </motion.div>
      </div>
    </div>
  );
};

export default Contact;