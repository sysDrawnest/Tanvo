
import React, { useState } from 'react';
import { ChevronDown, ChevronUp, Search, MessageCircle } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const FAQ: React.FC = () => {
  const [activeId, setActiveId] = useState<number | null>(0);
  const [search, setSearch] = useState('');

  const faqs = [
    { id: 0, q: "How can I be sure the Saree is an authentic Odisha Handloom?", a: "Every product sold by Meher Weavers is GI (Geographical Indication) certified. We source directly from master weavers in cluster villages like Bargarh and Nuapatna. Each saree comes with an authenticity certificate signed by the artisan." },
    { id: 1, q: "What is the difference between Single Ikat and Double Ikat?", a: "Single Ikat is when only the warp or the weft is tie-dyed before weaving. Double Ikat is the master-craft where both warp and weft are tie-dyed with mathematical precision to form the pattern. Double Ikat takes significantly longer and is rarer." },
    { id: 2, q: "Do you offer international shipping?", a: "Yes, we ship to over 50 countries including USA, UK, Canada, UAE, and Australia. International delivery typically takes 7-12 business days." },
    { id: 3, q: "How do I care for my Sambalpuri Silk Saree?", a: "We recommend professional dry cleaning only. For storage, wrap the saree in a clean muslin cloth and avoid hanging on metal hangers to prevent stretching. Change the folds every few months." },
    { id: 4, q: "Can I customize the blouse piece?", a: "Most of our sarees come with a standard 80cm-1m unstitched blouse piece. We do offer bespoke stitching services for domestic orders through our Bhubaneswar workshop." }
  ];

  const filteredFaqs = faqs.filter(f => f.q.toLowerCase().includes(search.toLowerCase()));

  return (
    <div className="min-h-screen bg-white pt-40 pb-24">
      <div className="container-custom max-w-4xl">
        <div className="text-center mb-16 space-y-4">
          <p className="text-[#C40C0C] font-black uppercase tracking-[0.3em] text-xs">Support Center</p>
          <h1 className="text-5xl md:text-7xl font-serif font-bold">Frequently Asked <br /><span className="text-[#F6CE71]">Questions</span></h1>
        </div>

        <div className="relative mb-12">
          <Search className="absolute left-6 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
          <input 
            type="text" 
            placeholder="Search questions..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full bg-gray-50 border-2 border-transparent focus:border-[#FF6500] focus:bg-white rounded-[2rem] py-6 pl-16 pr-8 text-lg font-medium outline-none transition-all shadow-sm"
          />
        </div>

        <div className="space-y-4">
          {filteredFaqs.map(faq => (
            <div key={faq.id} className="border border-gray-100 rounded-[2rem] overflow-hidden transition-all hover:shadow-lg">
              <button 
                onClick={() => setActiveId(activeId === faq.id ? null : faq.id)}
                className="w-full p-8 flex justify-between items-center text-left hover:bg-gray-50 transition-colors"
              >
                <span className="text-lg font-serif font-bold text-gray-900">{faq.q}</span>
                {activeId === faq.id ? <ChevronUp className="text-[#C40C0C]" /> : <ChevronDown className="text-gray-400" />}
              </button>
              <AnimatePresence>
                {activeId === faq.id && (
                  <motion.div 
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    className="overflow-hidden"
                  >
                    <div className="px-8 pb-8 pt-0 text-gray-500 text-lg leading-relaxed font-medium">
                      {faq.a}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          ))}
        </div>

        <div className="mt-20 p-12 bg-black rounded-[3rem] text-center text-white relative overflow-hidden">
          <div className="absolute top-0 right-0 w-64 h-64 bg-[#C40C0C]/20 rounded-full blur-[100px] -mr-20 -mt-20" />
          <div className="relative z-10 space-y-6">
            <h3 className="text-3xl font-serif font-bold">Still have questions?</h3>
            <p className="text-gray-400 text-lg font-medium">Our heritage experts are available 24/7 via WhatsApp or Email.</p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button className="btn-primary !bg-white !text-black flex items-center gap-2 justify-center">
                <MessageCircle size={18} /> Chat with us
              </button>
              <button className="btn-secondary !border-white !text-white flex items-center gap-2 justify-center">
                Email Support
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FAQ;
