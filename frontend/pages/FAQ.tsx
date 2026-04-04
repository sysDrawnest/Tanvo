import React, { useState } from 'react';
import { ChevronDown, ChevronUp, Search, MessageCircle, Mail, HelpCircle } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link } from 'react-router-dom';

const FAQ: React.FC = () => {
  const [activeId, setActiveId] = useState<number | null>(0);
  const [search, setSearch] = useState('');

  const faqs = [
    {
      id: 0,
      q: "How can I be sure the saree is authentic handloom?",
      a: "Every TANVO saree is GI (Geographical Indication) certified and sourced directly from master weaver communities in Odisha. Each piece comes with an authenticity certificate signed by the artisan who wove it, ensuring complete traceability and heritage value."
    },
    {
      id: 1,
      q: "What is the difference between Single Ikat and Double Ikat?",
      a: "Single Ikat involves tie-dyeing either the warp or weft threads before weaving. Double Ikat is a master-craft where both warp and weft are tie-dyed with mathematical precision to form the pattern. Double Ikat takes 3-4 times longer to create and represents the pinnacle of the weaver's art. TANVO offers both varieties, with Double Ikat pieces being particularly rare and investment-worthy."
    },
    {
      id: 2,
      q: "Do you offer international shipping?",
      a: "Yes, we ship to over 50 countries including USA, UK, Canada, UAE, Australia, and Singapore. International delivery typically takes 7-12 business days. Flat rate shipping of $25 USD applies, and all shipments are fully insured with tracking provided."
    },
    {
      id: 3,
      q: "How do I care for my handwoven silk saree?",
      a: "We recommend professional dry cleaning only. For storage, wrap the saree in a clean muslin cloth (never plastic) and avoid hanging on metal hangers to prevent stretching. Change the folds every 2-3 months to prevent crease damage. Keep away from direct sunlight and use natural neem leaves to prevent pest damage."
    },
    {
      id: 4,
      q: "Can I customize the blouse piece or get stitching service?",
      a: "All our sarees come with an unstitched blouse piece (80cm-1m). We offer bespoke stitching services through our network of master tailors in Bhubaneswar for domestic orders. International customers can request stitching consultations via video call. Turnaround time is 7-10 days for stitching."
    },
    {
      id: 5,
      q: "What is your return and exchange policy?",
      a: "We offer a 7-day return policy for domestic orders if the product is unused and in original condition. Returns are free for exchanges; for refunds, a nominal restocking fee may apply. International returns are accepted but shipping costs are borne by the customer. Handcrafted variations are part of the charm and not considered defects."
    },
    {
      id: 6,
      q: "How do I find my perfect saree size?",
      a: "Traditional sarees are one-size-fits-all (approximately 5.5 to 6.5 meters). For blouse measurements, we provide detailed size charts. Our WhatsApp stylists can guide you through measurements and even arrange for custom blouse stitching to ensure the perfect fit."
    },
  ];

  const filteredFaqs = faqs.filter(f =>
    f.q.toLowerCase().includes(search.toLowerCase()) ||
    f.a.toLowerCase().includes(search.toLowerCase())
  );

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

      <div className="container mx-auto px-4 max-w-4xl relative z-10">
        {/* Header */}
        <div className="text-center mb-8 md:mb-12 space-y-4">
          <p className="text-[#FF8225] font-medium uppercase tracking-[0.3em] text-xs">Support Center</p>
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-display font-medium text-[#173B45]">
            Frequently Asked <br className="md:hidden" />
            <span className="text-[#B43F3F]">Questions</span>
          </h1>
          <div className="w-20 h-1 bg-gradient-to-r from-[#B43F3F] to-[#FF8225] mx-auto mt-4"></div>
        </div>

        {/* Search */}
        <div className="relative mb-8 md:mb-12">
          <Search className="absolute left-4 md:left-6 top-1/2 -translate-y-1/2 text-[#173B45]/40" size={18} />
          <input
            type="text"
            placeholder="Search questions..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full bg-white border border-[#B43F3F]/10 focus:border-[#FF8225] focus:ring-2 focus:ring-[#FF8225]/20 rounded-xl md:rounded-2xl py-4 md:py-5 pl-12 md:pl-16 pr-4 text-sm md:text-base outline-none transition-all shadow-sm"
          />
        </div>

        {/* FAQ Accordion */}
        <div className="space-y-3 md:space-y-4">
          <AnimatePresence mode="wait">
            {filteredFaqs.length > 0 ? (
              filteredFaqs.map(faq => (
                <motion.div
                  key={faq.id}
                  layout
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{ duration: 0.2 }}
                  className="bg-white rounded-xl md:rounded-2xl border border-[#B43F3F]/10 overflow-hidden transition-all hover:shadow-md"
                >
                  <button
                    onClick={() => setActiveId(activeId === faq.id ? null : faq.id)}
                    className="w-full p-4 md:p-6 flex justify-between items-center text-left hover:bg-[#F8EDED] transition-colors"
                  >
                    <span className="text-sm md:text-base font-medium text-[#173B45] pr-4">{faq.q}</span>
                    {activeId === faq.id ?
                      <ChevronUp className="text-[#FF8225] flex-shrink-0" size={18} /> :
                      <ChevronDown className="text-[#173B45]/40 flex-shrink-0" size={18} />
                    }
                  </button>

                  <AnimatePresence>
                    {activeId === faq.id && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: 'auto', opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.3 }}
                        className="overflow-hidden"
                      >
                        <div className="px-4 md:px-6 pb-4 md:pb-6 pt-0 text-sm md:text-base text-[#173B45]/70 leading-relaxed border-t border-[#B43F3F]/10">
                          {faq.a}
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </motion.div>
              ))
            ) : (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="text-center py-12 bg-white rounded-xl md:rounded-2xl border border-[#B43F3F]/10"
              >
                <HelpCircle className="w-12 h-12 mx-auto mb-3 text-[#173B45]/20" />
                <p className="text-[#173B45]/60 mb-2">No questions found matching "{search}"</p>
                <button
                  onClick={() => setSearch('')}
                  className="text-[#FF8225] text-sm font-medium hover:text-[#B43F3F] transition-colors"
                >
                  Clear search
                </button>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Still have questions CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="mt-12 md:mt-16 p-6 md:p-10 bg-gradient-to-br from-[#173B45] to-[#0f2a33] rounded-xl md:rounded-2xl text-center text-[#F8EDED] relative overflow-hidden"
        >
          {/* Decorative elements */}
          <div className="absolute top-0 right-0 w-48 h-48 bg-[#B43F3F]/20 rounded-full blur-3xl -mr-20 -mt-20" />
          <div className="absolute bottom-0 left-0 w-32 h-32 bg-[#FF8225]/20 rounded-full blur-2xl -ml-16 -mb-16" />

          <div className="relative z-10 space-y-4 md:space-y-6">
            <h3 className="text-xl md:text-2xl lg:text-3xl font-display font-medium text-[#F8EDED]">
              Still have questions?
            </h3>
            <p className="text-sm md:text-base text-[#F8EDED]/70 max-w-lg mx-auto">
              Our heritage experts are available to help you find the perfect piece or answer any queries.
            </p>

            <div className="flex flex-col sm:flex-row gap-3 justify-center">
              <Link
                to="/contact"
                className="px-5 py-2.5 md:px-6 md:py-3 bg-[#FF8225] text-[#F8EDED] rounded-lg font-medium text-xs md:text-sm hover:bg-[#B43F3F] transition-colors flex items-center gap-2 justify-center"
              >
                <MessageCircle size={16} /> Chat with Artisan
              </Link>
              <Link
                to="/contact"
                className="px-5 py-2.5 md:px-6 md:py-3 border border-[#F8EDED]/20 text-[#F8EDED] rounded-lg font-medium text-xs md:text-sm hover:bg-[#F8EDED]/10 transition-colors flex items-center gap-2 justify-center"
              >
                <Mail size={16} /> Email Support
              </Link>
            </div>

            <p className="text-xs text-[#F8EDED]/40 mt-4">
              Average response time: <span className="text-[#FF8225]">30 minutes</span> on WhatsApp
            </p>
          </div>
        </motion.div>

        {/* Quick Contact Links */}
        <div className="mt-8 text-center">
          <p className="text-xs text-[#173B45]/40">
            Prefer email? Write to us at{' '}
            <a href="mailto:hello@tanvo.com" className="text-[#B43F3F] hover:text-[#FF8225] transition-colors">
              hello@tanvo.com
            </a>
          </p>
        </div>
      </div>
    </div>
  );
};

export default FAQ;