
import React from 'react';
import { RotateCcw, ShieldAlert, Truck, Mail } from 'lucide-react';

const Returns: React.FC = () => {
  return (
    <div className="min-h-screen bg-white pt-40 pb-24">
      <div className="container-custom max-w-4xl">
        <div className="text-center mb-16 space-y-4">
          <p className="text-[#C9A84C] font-black uppercase tracking-[0.3em] text-xs">Policy Details</p>
          <h1 className="text-5xl md:text-7xl font-display font-bold">Returns & <br /><span className="text-[#C9A84C]">Exchanges</span></h1>
        </div>

        <div className="prose prose-lg max-w-none space-y-12">
          <section className="bg-gray-50 p-12 rounded-[3rem] border border-gray-100">
            <div className="flex items-center gap-4 mb-8">
              <div className="w-12 h-12 bg-white rounded-2xl flex items-center justify-center text-[#C9A84C] shadow-sm"><RotateCcw /></div>
              <h2 className="text-3xl font-display font-bold !m-0">7-Day Return Policy</h2>
            </div>
            <p className="text-gray-600 text-lg leading-relaxed font-medium">
              We want you to love your handloom masterpiece. If for any reason you are not satisfied, you can return or exchange the product within 7 days of delivery.
            </p>
            <ul className="mt-8 space-y-4 text-gray-500 font-medium">
              <li className="flex items-start gap-3"><CheckCircle size={18} className="text-green-600 mt-1 shrink-0" /> Saree must be in its original condition with all tags intact.</li>
              <li className="flex items-start gap-3"><CheckCircle size={18} className="text-green-600 mt-1 shrink-0" /> The unstitched blouse piece must not be cut or separated.</li>
              <li className="flex items-start gap-3"><CheckCircle size={18} className="text-green-600 mt-1 shrink-0" /> Proof of GI Certification and authenticity card must be returned.</li>
            </ul>
          </section>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="p-10 border border-gray-100 rounded-[2.5rem] space-y-6">
              <ShieldAlert className="text-[#C9A84C]" size={40} />
              <h3 className="text-2xl font-display font-bold">Exceptions</h3>
              <p className="text-gray-500 font-medium">Custom-stitched blouses, products on final clearance, and used items cannot be returned. Handloom irregularities are hallmarks of authenticity, not defects.</p>
            </div>
            <div className="p-10 border border-gray-100 rounded-[2.5rem] space-y-6">
              <Truck className="text-[#E8C97A]" size={40} />
              <h3 className="text-2xl font-display font-bold">Process</h3>
              <p className="text-gray-500 font-medium">Log in to your profile, select the order, and click 'Return'. We will arrange a reverse pickup within 48 hours for most locations.</p>
            </div>
          </div>
        </div>

        <div className="mt-20 flex flex-col items-center gap-6">
          <h3 className="text-2xl font-display font-bold">Questions about a return?</h3>
          <a href="mailto:support@meherweavers.in" className="btn-primary flex items-center gap-3">
            <Mail size={18} /> Email support
          </a>
        </div>
      </div>
    </div>
  );
};

const CheckCircle = ({ size, className }: { size: number, className: string }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
    <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path>
    <polyline points="22 4 12 14.01 9 11.01"></polyline>
  </svg>
);

export default Returns;
