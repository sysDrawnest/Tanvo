
import React from 'react';
import { Globe, Truck, Clock, ShieldCheck } from 'lucide-react';

const Shipping: React.FC = () => {
  return (
    <div className="min-h-screen bg-white pt-40 pb-24">
      <div className="container-custom max-w-4xl">
        <div className="text-center mb-16 space-y-4">
          <p className="text-[#C40C0C] font-black uppercase tracking-[0.3em] text-xs">Global Logistics</p>
          <h1 className="text-5xl md:text-7xl font-serif font-bold">Shipping <br /><span className="text-[#F6CE71]">Guide</span></h1>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16">
          <div className="p-10 bg-gray-50 rounded-[2.5rem] border border-gray-100 flex flex-col gap-6">
            <div className="w-14 h-14 bg-white rounded-2xl flex items-center justify-center text-[#C40C0C] shadow-sm"><Truck size={28} /></div>
            <h3 className="text-2xl font-serif font-bold">Domestic Shipping</h3>
            <p className="text-gray-500 font-medium text-lg leading-relaxed">Free across India for orders over ₹1,999. Standard delivery takes 3-5 business days. Remote areas may take up to 7 days.</p>
          </div>
          <div className="p-10 bg-black rounded-[2.5rem] text-white flex flex-col gap-6 relative overflow-hidden">
            <div className="absolute top-0 right-0 w-32 h-32 bg-white/5 rounded-full blur-2xl -mr-16 -mt-16" />
            <div className="w-14 h-14 bg-white/10 rounded-2xl flex items-center justify-center text-[#F6CE71]"><Globe size={28} /></div>
            <h3 className="text-2xl font-serif font-bold">International</h3>
            <p className="text-gray-400 font-medium text-lg leading-relaxed">Flat rate shipping of $25 for most countries. Duty and taxes (if any) are to be borne by the recipient at destination.</p>
          </div>
        </div>

        <div className="space-y-12">
          <div className="flex flex-col md:flex-row items-center gap-10 p-12 border border-gray-100 rounded-[3rem] hover:shadow-xl transition-shadow">
            <div className="w-24 h-24 bg-green-50 rounded-full flex items-center justify-center text-green-600 shrink-0"><Clock size={40} /></div>
            <div>
              <h4 className="text-2xl font-serif font-bold mb-4">Handling Time</h4>
              <p className="text-gray-500 font-medium leading-relaxed">We ship within 24-48 hours of order placement. Since these are high-value handloom pieces, we conduct a final quality inspection before every dispatch.</p>
            </div>
          </div>

          <div className="flex flex-col md:flex-row items-center gap-10 p-12 border border-gray-100 rounded-[3rem] hover:shadow-xl transition-shadow">
            <div className="w-24 h-24 bg-blue-50 rounded-full flex items-center justify-center text-blue-600 shrink-0"><ShieldCheck size={40} /></div>
            <div>
              <h4 className="text-2xl font-serif font-bold mb-4">Insurance & Security</h4>
              <p className="text-gray-500 font-medium leading-relaxed">All shipments are fully insured against loss or damage during transit. Every package requires a signature upon delivery for your safety.</p>
            </div>
          </div>
        </div>

        <div className="mt-20 text-center space-y-4">
          <p className="text-gray-400 font-bold uppercase tracking-widest text-xs">Tracking Partners</p>
          <div className="flex flex-wrap justify-center gap-12 opacity-30 grayscale contrast-125">
            <span className="text-2xl font-black italic">DHL</span>
            <span className="text-2xl font-black italic">FedEx</span>
            <span className="text-2xl font-black italic">BlueDart</span>
            <span className="text-2xl font-black italic">Delhivery</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Shipping;
