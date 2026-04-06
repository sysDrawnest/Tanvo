import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';

const OdiaNavbar: React.FC = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const path = location.pathname;

    const navItems = [
        { label: 'ମୁଖ୍ୟ', icon: 'home', path: '/odia' },
        { label: 'ଶାଢ଼ି', icon: 'shopping_bag', path: '/odia/shop' },
        { label: 'ଯୋଗାଯୋଗ', icon: 'call', path: '/contact' }, // Or keep internal if preferred
    ];

    return (
        <nav className="fixed bottom-0 left-0 w-full flex justify-around items-center px-3 pb-5 pt-2 bg-white/90 backdrop-blur-xl border-t border-[#f0e2d6] shadow-[0_-8px_30px_rgba(0,0,0,0.04)] z-50 rounded-t-3xl">
            {navItems.map((item) => {
                const isActive = path === item.path;
                return (
                    <button
                        key={item.label}
                        onClick={() => navigate(item.path)}
                        className={`flex flex-col items-center justify-center px-5 py-1 transition-all rounded-2xl ${isActive
                                ? 'nav-active'
                                : 'text-[#2d2a24] hover:bg-[#f0e3d4]'
                            }`}
                    >
                        <span
                            className="material-symbols-outlined"
                            style={{ fontVariationSettings: isActive ? "'FILL' 1" : "'FILL' 0" }}
                        >
                            {item.icon}
                        </span>
                        <span className={`font-inter text-[11px] ${isActive ? 'font-semibold tracking-wide' : 'font-medium'}`}>
                            {item.label}
                        </span>
                    </button>
                );
            })}
        </nav>
    );
};

export default OdiaNavbar;
