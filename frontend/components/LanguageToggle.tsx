import React from 'react';
import { useLanguage } from '../context/LanguageContext';
import { useNavigate, useLocation } from 'react-router-dom';

const LanguageToggle: React.FC = () => {
    const { mode, setMode } = useLanguage();
    const navigate = useNavigate();
    const location = useLocation();

    const handleToggle = (newMode: 'english' | 'odia') => {
        if (newMode === mode) return;

        setMode(newMode);

        // Logic to redirect if necessary
        if (newMode === 'odia') {
            if (!location.pathname.startsWith('/odia')) {
                navigate('/odia');
            }
        } else {
            if (location.pathname.startsWith('/odia')) {
                navigate('/');
            }
        }
    };

    return (
        <div className="w-full bg-white/90 backdrop-blur-sm px-5 py-2 flex justify-end items-center gap-4 text-sm font-medium border-b border-[#f0e2d6] fixed top-0 left-0 z-[60] h-[30px]" style={{ zIndex: 1000 }}>
            <button
                onClick={() => handleToggle('english')}
                className={`transition-all ${mode === 'english' ? 'text-primary font-bold text-[#9f2e30]' : 'text-[#6b6259] cursor-pointer opacity-60'}`}
            >
                English
            </button>
            <div className="w-[1px] h-3 bg-[#f0e2d6]"></div>
            <button
                onClick={() => handleToggle('odia')}
                className={`transition-all ${mode === 'odia' ? 'text-primary font-bold text-[#9f2e30]' : 'text-[#6b6259] cursor-pointer opacity-60'}`}
            >
                ଓଡ଼ିଆ
            </button>
        </div>
    );
};

export default LanguageToggle;
