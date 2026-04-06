import React from 'react';
import OdiaNavbar from './OdiaNavbar';
import { useNavigate } from 'react-router-dom';

interface OdiaLayoutProps {
    children: React.ReactNode;
}

const OdiaLayout: React.FC<OdiaLayoutProps> = ({ children }) => {
    const navigate = useNavigate();
    const PHONE = '9100000000'; // Placeholder from user design

    return (
        <div className="bg-[#fefaf5] text-[#2d2a24] font-inter antialiased min-h-screen">
            {/* Top App Bar (refined) */}
            <header className="sticky top-[30px] z-50 bg-white/95 backdrop-blur-md border-b border-[#f0e2d6] shadow-sm">
                <div className="flex justify-between items-center w-full px-5 py-3 max-w-screen-xl mx-auto">
                    <div className="flex items-center gap-3">
                        <span className="material-symbols-outlined text-primary text-3xl cursor-pointer hover:scale-105 transition">menu</span>
                        <h1 className="font-noto text-2xl tracking-tight font-bold bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
                            ଓଡ଼ିଆ ହସ୍ତତନ୍ତ
                        </h1>
                    </div>
                    <div className="flex items-center gap-3">
                        <span
                            className="material-symbols-outlined text-primary text-3xl cursor-pointer hover:scale-105 transition"
                            onClick={() => navigate('/cart')}
                        >
                            shopping_cart
                        </span>
                    </div>
                </div>
            </header>

            <main className="max-w-screen-xl mx-auto px-4 pb-28">
                {children}
            </main>

            {/* Sticky Order Help Bar */}
            <div className="fixed bottom-20 left-0 right-0 z-40 flex justify-center px-4 pointer-events-none">
                <div className="bg-white/95 backdrop-blur-lg rounded-full shadow-xl border border-[#f0e2d6] py-2 px-4 flex gap-4 pointer-events-auto items-center">
                    <a
                        href={`tel:+${PHONE}`}
                        className="flex items-center gap-2 bg-primary text-white px-4 py-2 rounded-full text-sm font-bold hover:bg-primary-dark transition btn-tap no-underline"
                    >
                        <span className="material-symbols-outlined text-base">call</span> କଲ୍
                    </a>
                    <a
                        href={`https://wa.me/${PHONE}`}
                        className="flex items-center gap-2 bg-[#25D366] text-white px-4 py-2 rounded-full text-sm font-bold hover:bg-[#128C7E] transition btn-tap no-underline"
                    >
                        <span className="material-symbols-outlined text-base" style={{ fontVariationSettings: "'FILL' 1" }}>chat</span> ୱ୍ହାଟ୍ସଆପ୍
                    </a>
                    <span className="text-[#2d2a24] lg:flex hidden items-center text-xs font-medium">ସହଯୋଗ ଦରକାର?</span>
                </div>
            </div>

            {/* Bottom Nav */}
            <OdiaNavbar />
        </div>
    );
};

export default OdiaLayout;
