import React from 'react';
import { useLanguage } from '../context/LanguageContext';
import { useNavigate } from 'react-router-dom';

const LanguageToggle: React.FC = () => {
    const { mode, setMode } = useLanguage();
    const navigate = useNavigate();

    const switchToOdia = () => {
        setMode('odia');
        navigate('/odia');
    };

    const switchToEnglish = () => {
        setMode('english');
        navigate('/');
    };

    return (
        <div
            style={{
                position: 'fixed',
                top: 0,
                left: 0,
                right: 0,
                zIndex: 2000,
                background: '#1a120b',
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                gap: '6px',
                padding: '5px 16px',
                height: 30,
            }}
        >
            <span style={{ fontSize: 9, letterSpacing: '0.15em', color: 'rgba(255,255,255,0.4)', textTransform: 'uppercase', fontFamily: 'Inter, sans-serif' }}>
                Language:
            </span>
            <button
                onClick={switchToEnglish}
                style={{
                    background: 'none',
                    border: 'none',
                    cursor: 'pointer',
                    padding: '2px 10px',
                    borderRadius: 20,
                    fontSize: 10,
                    fontFamily: 'Inter, sans-serif',
                    fontWeight: mode === 'english' ? 700 : 400,
                    color: mode === 'english' ? '#C9A84C' : 'rgba(255,255,255,0.5)',
                    background: mode === 'english' ? 'rgba(201,168,76,0.12)' : 'transparent',
                    letterSpacing: '0.1em',
                    transition: 'all 0.2s ease',
                }}
            >
                English
            </button>
            <span style={{ color: 'rgba(255,255,255,0.2)', fontSize: 10 }}>|</span>
            <button
                onClick={switchToOdia}
                style={{
                    background: 'none',
                    border: 'none',
                    cursor: 'pointer',
                    padding: '2px 10px',
                    borderRadius: 20,
                    fontSize: 11,
                    fontFamily: "'Noto Sans Odia', sans-serif",
                    fontWeight: mode === 'odia' ? 700 : 400,
                    color: mode === 'odia' ? '#C9A84C' : 'rgba(255,255,255,0.5)',
                    background: mode === 'odia' ? 'rgba(201,168,76,0.12)' : 'transparent',
                    transition: 'all 0.2s ease',
                }}
            >
                ଓଡ଼ିଆ
            </button>
        </div>
    );
};

export default LanguageToggle;
