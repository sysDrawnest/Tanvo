import React from 'react';
// Correctly importing named exports from react-router-dom
import { Link } from "react-router-dom";
import { Facebook, Instagram, Twitter, Mail, Phone, MapPin } from 'lucide-react';

const Footer: React.FC = () => {
  return (
    <footer className="bg-[#111111] text-gray-400 pt-20 pb-10">
      <div className="container-custom">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-16 mb-20">
          {/* Brand */}
          <div className="space-y-8">
            <Link to="/" className="flex items-center gap-3">
              <div className="w-10 h-10 bg-[#C40C0C] rounded-xl flex items-center justify-center text-white text-xl font-bold">ଓ</div>
              <div className="flex flex-col">
                <span className="text-2xl font-serif font-black text-white leading-none">yobazar</span>
                <span className="text-[8px] font-black tracking-[0.3em] text-[#C40C0C] uppercase mt-1">Meher Weavers</span>
              </div>
            </Link>
            <p className="text-sm leading-relaxed font-medium">
              Evolved, not replaced. Celebrating the 700-year legacy of Odisha's master weavers through modern editorial fashion.
            </p>
            <div className="flex items-center gap-6">
              <a href="#" className="hover:text-white transition-colors"><Facebook size={20} /></a>
              <a href="#" className="hover:text-white transition-colors"><Instagram size={20} /></a>
              <a href="#" className="hover:text-white transition-colors"><Twitter size={20} /></a>
            </div>
          </div>

          {/* Quick Links */}
          <div className="space-y-8">
            <h4 className="text-white font-serif text-xl font-bold">Collections</h4>
            <ul className="space-y-4 text-[11px] font-black uppercase tracking-widest">
              <li><Link to="/shop?category=Sambalpuri" className="hover:text-white transition-colors">Sambalpuri Heritage</Link></li>
              <li><Link to="/shop?category=Silk" className="hover:text-white transition-colors">Bomkai Silks</Link></li>
              <li><Link to="/shop?category=Cotton" className="hover:text-white transition-colors">Ikat Cottons</Link></li>
              <li><Link to="/shop?category=Men's Shirts" className="hover:text-white transition-colors">Men's Handloom</Link></li>
              <li><Link to="/story" className="hover:text-white transition-colors">Artisan Legacy</Link></li>
            </ul>
          </div>

          {/* Support */}
          <div className="space-y-8">
            <h4 className="text-white font-serif text-xl font-bold">Support</h4>
            <ul className="space-y-4 text-[11px] font-black uppercase tracking-widest">
              <li><Link to="/shipping" className="hover:text-white transition-colors">Global Shipping</Link></li>
              <li><Link to="/returns" className="hover:text-white transition-colors">7-Day Easy Returns</Link></li>
              <li><Link to="/faqs" className="hover:text-white transition-colors">Help Center</Link></li>
              <li><Link to="/care" className="hover:text-white transition-colors">Fabric Care Guide</Link></li>
              <li><Link to="/contact" className="hover:text-white transition-colors">Reach Us</Link></li>
            </ul>
          </div>

          {/* Contact Details (SYS Weavers) */}
          <div className="space-y-8">
            <h4 className="text-white font-serif text-xl font-bold">Contact Us</h4>
            <ul className="space-y-6 text-xs font-medium">
              <li className="flex items-start gap-4">
                <MapPin size={20} className="text-[#C40C0C] shrink-0" />
                <span>Patia, Bhubaneswar, Odisha</span>
              </li>
              <li className="flex items-center gap-4">
                <Phone size={20} className="text-[#C40C0C] shrink-0" />
                <span>+91 81446 22958</span>
              </li>
              <li className="flex items-center gap-4">
                <Mail size={20} className="text-[#C40C0C] shrink-0" />
                <span>legacy@meherweavers.in</span>
              </li>
              <li className="pt-4 border-t border-gray-800">
                <p className="text-[10px] uppercase font-black tracking-widest text-[#F6CE71]">Founder</p>
                <p className="text-white font-bold text-base">Mr. SYS</p>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-gray-800 pt-10 flex flex-col md:flex-row justify-between items-center gap-6">
          <p className="text-[10px] uppercase font-black tracking-widest">
            &copy; {new Date().getFullYear()} Utkal Heritage / Meher Weavers.
          </p>
          <div className="flex items-center gap-8">
            <img src="https://upload.wikimedia.org/wikipedia/commons/b/b5/PayPal.svg" alt="PayPal" className="h-4 opacity-30 grayscale hover:grayscale-0 transition-all" />
            <img src="https://upload.wikimedia.org/wikipedia/commons/5/5e/Visa_Inc._logo.svg" alt="Visa" className="h-3 opacity-30 grayscale hover:grayscale-0 transition-all" />
            <img src="https://upload.wikimedia.org/wikipedia/commons/2/2a/Mastercard-logo.svg" alt="Mastercard" className="h-6 opacity-30 grayscale hover:grayscale-0 transition-all" />
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;