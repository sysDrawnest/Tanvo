import React from 'react';
import { Globe, Truck, Clock, ShieldCheck, Package, MapPin, Plane, Gift } from 'lucide-react';
import { motion } from 'framer-motion';

const Shipping: React.FC = () => {
  return (
    <div className="min-h-screen bg-[#F8EDED] pt-24 md:pt-40 pb-16 md:pb-24 relative overflow-hidden">
      {/* Textile overlay */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='40' height='40' viewBox='0 0 40 40' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M0 0h40v2H0V0zm0 4h40v2H0V4zm0 4h40v2H0V8zm0 4h40v2H0v-2zm0 4h40v2H0v-2zm0 4h40v2H0v-2zm0 4h40v2H0v-2zm0 4h40v2H0v-2zm0 4h40v2H0v-2zm0 4h40v2H0v-2z' fill='%23B43F3F' fill-opacity='0.03' fill-rule='evenodd'/%3E%3C/svg%3E")`,
          opacity: 0.5,
        }}
      />

      {/* Decorative thread lines */}
      <div className="absolute top-20 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-[#B43F3F]/20 to-transparent"></div>
      <div className="absolute bottom-20 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-[#FF8225]/20 to-transparent"></div>

      <div className="container mx-auto px-4 md:px-6 max-w-4xl relative z-10">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-12 md:mb-16 space-y-4"
        >
          <p className="text-[#FF8225] font-medium uppercase tracking-[0.3em] text-xs">Artisan Delivery</p>
          <h1 className="text-4xl md:text-6xl lg:text-7xl font-display font-medium text-[#173B45]">
            Shipping <br className="md:hidden" />
            <span className="text-[#B43F3F]">Guide</span>
          </h1>
          <div className="w-20 h-1 bg-gradient-to-r from-[#B43F3F] to-[#FF8225] mx-auto mt-6"></div>
        </motion.div>

        {/* Main Shipping Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8 mb-12 md:mb-16">
          {/* Domestic Shipping */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.1 }}
            className="p-8 md:p-10 bg-white rounded-2xl md:rounded-[2.5rem] border border-[#B43F3F]/10 flex flex-col gap-6 hover:shadow-xl transition-shadow"
          >
            <div className="w-14 h-14 bg-[#F8EDED] rounded-2xl flex items-center justify-center text-[#B43F3F]">
              <Truck size={28} />
            </div>
            <h3 className="text-2xl md:text-3xl font-display font-medium text-[#173B45]">Domestic Shipping</h3>
            <div className="space-y-3">
              <p className="text-[#173B45]/70 leading-relaxed">
                <span className="font-medium text-[#B43F3F]">Free shipping</span> across India for orders over ₹2,999.
              </p>
              <p className="text-[#173B45]/70 leading-relaxed">
                Standard delivery takes <span className="font-medium text-[#173B45]">3-5 business days</span>. Remote locations may require up to 7 days.
              </p>
            </div>
            <div className="pt-4 mt-2 border-t border-[#B43F3F]/10">
              <p className="text-xs text-[#173B45]/50 uppercase tracking-wider">📍 All major cities covered</p>
            </div>
          </motion.div>

          {/* International Shipping */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2 }}
            className="p-8 md:p-10 bg-[#173B45] rounded-2xl md:rounded-[2.5rem] text-[#F8EDED] flex flex-col gap-6 relative overflow-hidden group hover:shadow-xl transition-shadow"
          >
            <div className="absolute top-0 right-0 w-48 h-48 bg-[#FF8225]/10 rounded-full blur-3xl -mr-20 -mt-20 group-hover:scale-150 transition-transform duration-700"></div>
            <div className="absolute bottom-0 left-0 w-32 h-32 bg-[#B43F3F]/10 rounded-full blur-2xl -ml-16 -mb-16"></div>

            <div className="w-14 h-14 bg-[#F8EDED]/10 rounded-2xl flex items-center justify-center text-[#FF8225] relative z-10">
              <Globe size={28} />
            </div>
            <h3 className="text-2xl md:text-3xl font-display font-medium text-[#F8EDED] relative z-10">International</h3>
            <div className="space-y-3 relative z-10">
              <p className="text-[#F8EDED]/80 leading-relaxed">
                <span className="font-medium text-[#FF8225]">Flat rate shipping</span> of $25 USD for most countries.
              </p>
              <p className="text-[#F8EDED]/80 leading-relaxed">
                Delivery takes <span className="font-medium text-[#FF8225]">7-12 business days</span> depending on customs clearance.
              </p>
              <p className="text-xs text-[#F8EDED]/50 mt-4">
                * Duties and taxes (if any) are borne by the recipient
              </p>
            </div>
          </motion.div>
        </div>

        {/* Detailed Sections */}
        <div className="space-y-6 md:space-y-8 mb-12 md:mb-16">
          {/* Handling Time */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="flex flex-col md:flex-row items-start gap-6 md:gap-10 p-8 md:p-12 bg-white rounded-2xl md:rounded-[3rem] border border-[#B43F3F]/10 hover:shadow-xl transition-all"
          >
            <div className="w-16 h-16 md:w-20 md:h-20 bg-[#F8EDED] rounded-2xl flex items-center justify-center text-[#FF8225] shrink-0">
              <Clock size={36} className="md:w-10 md:h-10" />
            </div>
            <div>
              <h4 className="text-xl md:text-2xl font-display font-medium text-[#173B45] mb-3">Handling & Quality Check</h4>
              <p className="text-[#173B45]/70 leading-relaxed">
                Every piece undergoes a <span className="font-medium text-[#B43F3F]">final quality inspection</span> by our master weavers before dispatch.
                Orders typically ship within <span className="font-medium text-[#173B45]">24-48 hours</span> of placement.
              </p>
              <div className="flex items-center gap-2 mt-4 text-xs text-[#173B45]/50">
                <Package size={14} />
                <span>Each piece is hand-packaged in artisanal wrapping</span>
              </div>
            </div>
          </motion.div>

          {/* Insurance & Security */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="flex flex-col md:flex-row items-start gap-6 md:gap-10 p-8 md:p-12 bg-white rounded-2xl md:rounded-[3rem] border border-[#B43F3F]/10 hover:shadow-xl transition-all"
          >
            <div className="w-16 h-16 md:w-20 md:h-20 bg-[#F8EDED] rounded-2xl flex items-center justify-center text-[#B43F3F] shrink-0">
              <ShieldCheck size={36} className="md:w-10 md:h-10" />
            </div>
            <div>
              <h4 className="text-xl md:text-2xl font-display font-medium text-[#173B45] mb-3">Insurance & Security</h4>
              <p className="text-[#173B45]/70 leading-relaxed">
                All shipments are <span className="font-medium text-[#B43F3F]">fully insured</span> against loss or damage during transit.
                Every package requires a <span className="font-medium text-[#173B45]">signature upon delivery</span> for your security.
              </p>
              <div className="flex items-center gap-2 mt-4 text-xs text-[#173B45]/50">
                <Gift size={14} />
                <span>Tamper-evident packaging for your peace of mind</span>
              </div>
            </div>
          </motion.div>

          {/* Remote Areas */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
            className="flex flex-col md:flex-row items-start gap-6 md:gap-10 p-8 md:p-12 bg-white rounded-2xl md:rounded-[3rem] border border-[#B43F3F]/10 hover:shadow-xl transition-all"
          >
            <div className="w-16 h-16 md:w-20 md:h-20 bg-[#F8EDED] rounded-2xl flex items-center justify-center text-[#FF8225] shrink-0">
              <MapPin size={36} className="md:w-10 md:h-10" />
            </div>
            <div>
              <h4 className="text-xl md:text-2xl font-display font-medium text-[#173B45] mb-3">Remote & International Customs</h4>
              <p className="text-[#173B45]/70 leading-relaxed">
                For remote locations within India, allow <span className="font-medium text-[#173B45]">7-10 business days</span>.
                International orders may experience customs delays beyond our control.
              </p>
              <div className="flex items-center gap-2 mt-4 text-xs text-[#173B45]/50">
                <Plane size={14} />
                <span>Tracking updates provided at every stage</span>
              </div>
            </div>
          </motion.div>
        </div>

        {/* Tracking Partners */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
          className="mt-16 md:mt-20 text-center space-y-6"
        >
          <p className="text-[#FF8225] font-medium uppercase tracking-widest text-xs">Trusted Carriers</p>

          <div className="flex flex-wrap justify-center items-center gap-8 md:gap-12">
            {[
              { name: 'DHL', color: '#B43F3F' },
              { name: 'FedEx', color: '#FF8225' },
              { name: 'BlueDart', color: '#173B45' },
              { name: 'Delhivery', color: '#B43F3F' },
              { name: 'India Post', color: '#FF8225' }
            ].map((carrier, index) => (
              <motion.div
                key={carrier.name}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.7 + index * 0.1 }}
                className="group"
              >
                <span
                  className="text-lg md:text-xl font-medium tracking-wide transition-all duration-300 hover:scale-110 inline-block"
                  style={{ color: carrier.color }}
                >
                  {carrier.name}
                </span>
                <div className="h-[1px] w-0 group-hover:w-full transition-all duration-300 mx-auto"
                  style={{ background: `linear-gradient(90deg, transparent, ${carrier.color}, transparent)` }} />
              </motion.div>
            ))}
          </div>

          <p className="text-xs text-[#173B45]/40 mt-8">
            * Tracking details will be emailed within 24 hours of dispatch
          </p>
        </motion.div>

        {/* FAQ Note */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.8 }}
          className="mt-16 text-center"
        >
          <p className="text-sm text-[#173B45]/60">
            Have questions about shipping? Visit our{' '}
            <a href="/contact" className="text-[#B43F3F] font-medium hover:text-[#FF8225] transition-colors underline-offset-4 hover:underline">
              Contact Page
            </a>{' '}
            or chat with our artisan support team.
          </p>
        </motion.div>
      </div>
    </div>
  );
};

export default Shipping;