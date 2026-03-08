
import React, { useState } from 'react';
import { Mail, Phone, MapPin, MessageCircle, Clock, ShieldCheck, Send, User, MessageSquare, Instagram, Facebook, Youtube } from 'lucide-react';
import { motion } from 'framer-motion';

const Contact: React.FC = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle form submission
    console.log(formData);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-gray-50/50 pt-32 pb-24 overflow-hidden">
      {/* Background decorative elements */}
      <div className="absolute top-20 left-0 w-96 h-96 bg-gradient-to-br from-[#F6CE71]/5 to-[#C40C0C]/5 rounded-full blur-3xl -z-10" />
      <div className="absolute bottom-20 right-0 w-80 h-80 bg-gradient-to-tl from-[#FF6500]/5 to-[#CC561E]/5 rounded-full blur-3xl -z-10" />
      
      <div className="container-custom relative">
        {/* Hero Section */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="max-w-5xl mx-auto text-center mb-20 space-y-6"
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-[#F6CE71]/20 to-[#FF6500]/20 rounded-full border border-[#FF6500]/20">
            <MessageCircle className="w-4 h-4 text-[#C40C0C]" />
            <span className="text-[#C40C0C] font-black uppercase tracking-[0.3em] text-xs">Direct Support</span>
          </div>
          <h1 className="text-6xl md:text-8xl font-serif font-bold tracking-tight">
            <span className="bg-gradient-to-r from-[#C40C0C] via-[#FF6500] to-[#CC561E] bg-clip-text text-transparent">
              Weave Your Query
            </span>
          </h1>
          <p className="text-xl text-gray-600 font-medium max-w-2xl mx-auto leading-relaxed">
            Connect directly with master weavers and artisans. Every thread tells a story, let's weave yours together.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-start">
          {/* Left Column - Contact Info */}
          <div className="space-y-12">
            {/* Contact Cards */}
            <motion.div 
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="grid grid-cols-1 sm:grid-cols-2 gap-8"
            >
              <div className="group bg-white p-8 rounded-3xl border border-gray-100 shadow-lg hover:shadow-2xl transition-all duration-500 hover:-translate-y-2">
                <div className="w-16 h-16 bg-gradient-to-br from-[#C40C0C]/10 to-[#FF6500]/10 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
                  <Phone className="w-7 h-7 text-[#C40C0C]" />
                </div>
                <h3 className="text-2xl font-serif font-bold mb-3">Call Us</h3>
                <p className="text-sm text-gray-500 font-medium mb-4">Direct line to our artisan support team</p>
                <a 
                  href="tel:8144622958" 
                  className="inline-flex items-center gap-2 text-lg font-bold bg-gradient-to-r from-[#C40C0C] to-[#FF6500] bg-clip-text text-transparent group-hover:gap-3 transition-all duration-300"
                >
                  +91 81446 22958
                  <span className="text-[#FF6500]">↗</span>
                </a>
              </div>

              <div className="group bg-white p-8 rounded-3xl border border-gray-100 shadow-lg hover:shadow-2xl transition-all duration-500 hover:-translate-y-2">
                <div className="w-16 h-16 bg-gradient-to-br from-[#F6CE71]/10 to-[#FF6500]/10 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
                  <Mail className="w-7 h-7 text-[#CC561E]" />
                </div>
                <h3 className="text-2xl font-serif font-bold mb-3">Email Us</h3>
                <p className="text-sm text-gray-500 font-medium mb-4">For custom orders & collaborations</p>
                <a 
                  href="mailto:legacy@meherweavers.in" 
                  className="inline-flex items-center gap-2 text-lg font-bold bg-gradient-to-r from-[#CC561E] to-[#FF6500] bg-clip-text text-transparent group-hover:gap-3 transition-all duration-300"
                >
                  legacy@meherweavers.in
                  <span className="text-[#FF6500]">↗</span>
                </a>
              </div>
            </motion.div>

            {/* Address Card */}
            <motion.div 
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="bg-gradient-to-br from-white to-gray-50 p-10 rounded-[2.5rem] space-y-8 border border-gray-100 shadow-lg relative overflow-hidden"
            >
              <div className="absolute top-0 right-0 w-40 h-40 bg-gradient-to-bl from-[#F6CE71]/10 to-transparent rounded-full -translate-y-20 translate-x-20" />
              
              <div className="flex items-start gap-6 relative z-10">
                <div className="w-16 h-16 bg-gradient-to-br from-[#FF6500]/10 to-[#C40C0C]/10 rounded-2xl flex items-center justify-center shrink-0">
                  <MapPin className="w-7 h-7 text-[#C40C0C]" />
                </div>
                <div>
                  <h4 className="text-2xl font-serif font-bold mb-3 bg-gradient-to-r from-[#C40C0C] to-[#FF6500] bg-clip-text text-transparent">
                    Artisan Hub
                  </h4>
                  <p className="text-gray-700 font-medium leading-relaxed text-lg">
                    Patia, Bhubaneswar<br />
                    Odisha, India - 751024
                  </p>
                  <a 
                    href="https://maps.google.com/?q=Patia+Bhubaneswar+Odisha" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 mt-4 text-sm font-bold text-[#FF6500] hover:text-[#C40C0C] transition-colors"
                  >
                    View on Google Maps
                    <span className="text-lg">↗</span>
                  </a>
                </div>
              </div>

              <div className="pt-8 border-t border-gray-200 relative z-10">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-[11px] font-black uppercase tracking-[0.3em] text-[#C40C0C] mb-1">Master Weaver</p>
                    <p className="text-3xl font-serif font-bold bg-gradient-to-r from-gray-900 to-gray-700 bg-clip-text text-transparent">
                      Mr. SYS
                    </p>
                  </div>
                  <div className="w-16 h-16 bg-gradient-to-br from-[#F6CE71] to-[#FF6500] rounded-2xl flex items-center justify-center text-white font-bold text-lg">
                    ସ୍ୱାଗତ
                  </div>
                </div>
              </div>
            </motion.div>

            {/* Trust Badges */}
            <motion.div 
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="flex flex-wrap gap-6"
            >
              <div className="flex items-center gap-3 px-4 py-3 bg-white rounded-2xl border border-gray-100 shadow-sm">
                <div className="w-10 h-10 bg-gradient-to-br from-green-500/10 to-green-600/10 rounded-xl flex items-center justify-center">
                  <ShieldCheck className="w-5 h-5 text-green-600" />
                </div>
                <div>
                  <p className="text-xs font-black uppercase tracking-wider text-gray-900">GI Certified</p>
                  <p className="text-[10px] text-gray-500">Authenticity Guaranteed</p>
                </div>
              </div>
              
              <div className="flex items-center gap-3 px-4 py-3 bg-white rounded-2xl border border-gray-100 shadow-sm">
                <div className="w-10 h-10 bg-gradient-to-br from-[#F6CE71]/10 to-[#FF6500]/10 rounded-xl flex items-center justify-center">
                  <Clock className="w-5 h-5 text-[#CC561E]" />
                </div>
                <div>
                  <p className="text-xs font-black uppercase tracking-wider text-gray-900">24/7 Support</p>
                  <p className="text-[10px] text-gray-500">Quick Response Time</p>
                </div>
              </div>
            </motion.div>

            {/* Social Media */}
            <motion.div 
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.5 }}
              className="pt-8 border-t border-gray-100"
            >
              <p className="text-sm font-bold text-gray-700 mb-4">Follow Our Journey</p>
              <div className="flex gap-4">
                {[
                  { icon: Instagram, color: '#E1306C', label: 'Instagram' },
                  { icon: Facebook, color: '#1877F2', label: 'Facebook' },
                  { icon: Youtube, color: '#FF0000', label: 'YouTube' },
                ].map((social) => (
                  <a
                    key={social.label}
                    href="#"
                    className="group w-12 h-12 rounded-2xl bg-white border border-gray-100 shadow-sm flex items-center justify-center hover:shadow-lg transition-all duration-300 hover:-translate-y-1"
                    aria-label={social.label}
                  >
                    <social.icon className="w-5 h-5 text-gray-600 group-hover:scale-110 transition-transform duration-300" />
                  </a>
                ))}
              </div>
            </motion.div>
          </div>

          {/* Right Column - Map & Form */}
          <div className="space-y-12">
            {/* Map Section */}
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="bg-white rounded-[2.5rem] border border-gray-100 shadow-2xl overflow-hidden"
            >
              <div className="p-8 border-b border-gray-100">
                <h3 className="text-2xl font-serif font-bold flex items-center gap-3">
                  <MapPin className="w-6 h-6 text-[#C40C0C]" />
                  <span className="bg-gradient-to-r from-[#C40C0C] to-[#FF6500] bg-clip-text text-transparent">
                    Visit Our Workshop
                  </span>
                </h3>
              </div>
              
              {/* Map Container */}
              <div className="relative h-96 bg-gradient-to-br from-gray-100 to-gray-200">
                {/* Map Placeholder with decorative pattern */}
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="relative w-64 h-64 bg-gradient-to-br from-white to-gray-50 rounded-3xl shadow-2xl border-2 border-white overflow-hidden">
                    {/* Decorative map pattern */}
                    <div className="absolute inset-4 bg-gradient-to-br from-[#F6CE71]/20 to-[#FF6500]/20 rounded-2xl" />
                    
                    {/* Map markers */}
                    <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
                      <div className="relative">
                        <div className="w-16 h-16 bg-gradient-to-br from-[#C40C0C] to-[#FF6500] rounded-full flex items-center justify-center animate-pulse-gentle">
                          <div className="w-10 h-10 bg-white rounded-full flex items-center justify-center">
                            <span className="text-2xl">📍</span>
                          </div>
                        </div>
                        <div className="absolute -top-2 -right-2 w-8 h-8 bg-[#F6CE71] rounded-full border-4 border-white" />
                      </div>
                    </div>
                    
                    {/* Roads */}
                    <div className="absolute top-1/2 left-4 right-4 h-1 bg-gray-300 rounded-full" />
                    <div className="absolute left-1/2 top-4 bottom-4 w-1 bg-gray-300 rounded-full transform -translate-x-1/2" />
                    
                    {/* Location text */}
                    <div className="absolute bottom-6 left-0 right-0 text-center">
                      <p className="text-sm font-bold text-gray-800">Patia, Bhubaneswar</p>
                      <p className="text-xs text-gray-600">Odisha, India</p>
                    </div>
                  </div>
                </div>
                
                {/* Map controls */}
                <div className="absolute bottom-6 right-6 flex gap-2">
                  <button className="w-10 h-10 bg-white rounded-xl shadow-lg flex items-center justify-center hover:shadow-xl transition-shadow">
                    <span className="text-xl">+</span>
                  </button>
                  <button className="w-10 h-10 bg-white rounded-xl shadow-lg flex items-center justify-center hover:shadow-xl transition-shadow">
                    <span className="text-xl">−</span>
                  </button>
                </div>
              </div>
              
              <div className="p-6 bg-gradient-to-r from-gray-50 to-white">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-bold text-gray-700">📍 Current Location</p>
                    <p className="text-xs text-gray-500">Lat: 20.2961° N, Long: 85.8245° E</p>
                  </div>
                  <a 
                    href="https://maps.google.com/?q=Patia+Bhubaneswar+Odisha"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="px-4 py-2 bg-gradient-to-r from-[#C40C0C] to-[#FF6500] text-white text-sm font-bold rounded-full hover:shadow-lg transition-all duration-300 hover:scale-105"
                  >
                    Open in Maps
                  </a>
                </div>
              </div>
            </motion.div>

            {/* Contact Form */}
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="bg-gradient-to-br from-white to-gray-50 p-10 border border-gray-100 shadow-2xl rounded-[2.5rem] relative overflow-hidden"
            >
              <div className="absolute top-0 left-0 w-full h-2 bg-gradient-to-r from-[#C40C0C] via-[#FF6500] to-[#F6CE71]" />
              
              <div className="flex items-center gap-3 mb-8">
                <div className="w-12 h-12 bg-gradient-to-br from-[#F6CE71]/10 to-[#FF6500]/10 rounded-2xl flex items-center justify-center">
                  <MessageSquare className="w-6 h-6 text-[#CC561E]" />
                </div>
                <h2 className="text-3xl font-serif font-bold bg-gradient-to-r from-[#C40C0C] to-[#FF6500] bg-clip-text text-transparent">
                  Send Your Message
                </h2>
              </div>

              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="space-y-3">
                  <label className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-gray-700">
                    <User className="w-3 h-3" />
                    Your Full Name
                  </label>
                  <input
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    type="text"
                    className="w-full bg-white border-2 border-gray-200 rounded-2xl py-4 px-6 outline-none focus:border-[#FF6500] focus:ring-2 focus:ring-[#FF6500]/20 transition-all font-medium placeholder-gray-400"
                    placeholder="Ex. Arjun Meher"
                  />
                </div>

                <div className="space-y-3">
                  <label className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-gray-700">
                    <Mail className="w-3 h-3" />
                    Email Address
                  </label>
                  <input
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    type="email"
                    className="w-full bg-white border-2 border-gray-200 rounded-2xl py-4 px-6 outline-none focus:border-[#FF6500] focus:ring-2 focus:ring-[#FF6500]/20 transition-all font-medium placeholder-gray-400"
                    placeholder="Ex. hello@artisan.com"
                  />
                </div>

                <div className="space-y-3">
                  <label className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-gray-700">
                    <MessageSquare className="w-3 h-3" />
                    Your Message
                  </label>
                  <textarea
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    rows={4}
                    className="w-full bg-white border-2 border-gray-200 rounded-2xl py-4 px-6 outline-none focus:border-[#FF6500] focus:ring-2 focus:ring-[#FF6500]/20 transition-all font-medium placeholder-gray-400 resize-none"
                    placeholder="Share your thoughts, questions, or custom requirements..."
                  />
                </div>

                <button
                  type="submit"
                  className="group w-full py-5 bg-gradient-to-r from-[#C40C0C] via-[#FF6500] to-[#CC561E] text-white text-sm font-bold rounded-2xl shadow-xl hover:shadow-2xl transition-all duration-500 hover:scale-[1.02] flex items-center justify-center gap-3"
                >
                  <span>Send Message</span>
                  <Send className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </button>

                <p className="text-xs text-center text-gray-500 pt-4">
                  We typically respond within 2 hours during business hours
                </p>
              </form>
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Contact;
