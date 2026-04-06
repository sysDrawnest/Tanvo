import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';

const OdiaNavbar: React.FC = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const path = location.pathname;

    const PHONE = '918658000000'; // Replace with real number
    const WHATSAPP_MSG = encodeURIComponent('ନମସ୍କାର! ମୁଁ ଏକ ଶାଢ଼ି ଅର୍ଡ଼ର କରିବାକୁ ଚାହୁଁଛି।');

    const tabs = [
        { label: 'ଘର', icon: '🏠', path: '/odia' },
        { label: 'ଶାଢ଼ି', icon: '🛍️', path: '/odia/shop' },
        { label: 'ଡ଼ାକ', icon: '📞', action: () => window.open(`tel:+${PHONE}`) },
        { label: 'WhatsApp', icon: '💬', action: () => window.open(`https://wa.me/${PHONE}?text=${WHATSAPP_MSG}`, '_blank') },
    ];

    return (
        <nav style={{
            position: 'fixed',
            bottom: 0,
            left: 0,
            right: 0,
            zIndex: 999,
            background: '#fff',
            borderTop: '1px solid #e5e0d8',
            display: 'grid',
            gridTemplateColumns: 'repeat(4, 1fr)',
            boxShadow: '0 -4px 24px rgba(0,0,0,0.1)',
        }}>
            {tabs.map((tab) => {
                const isActive = tab.path && path === tab.path;
                return (
                    <button
                        key={tab.label}
                        onClick={() => tab.action ? tab.action() : navigate(tab.path!)}
                        style={{
                            display: 'flex',
                            flexDirection: 'column',
                            alignItems: 'center',
                            justifyContent: 'center',
                            padding: '10px 4px',
                            border: 'none',
                            background: isActive ? '#fff5e6' : '#fff',
                            cursor: 'pointer',
                            borderTop: isActive ? '3px solid #C9A84C' : '3px solid transparent',
                            transition: 'all 0.2s ease',
                            gap: 2,
                        }}
                    >
                        <span style={{ fontSize: 22 }}>{tab.icon}</span>
                        <span style={{
                            fontFamily: "'Noto Sans Odia', sans-serif",
                            fontSize: 11,
                            fontWeight: isActive ? 700 : 400,
                            color: isActive ? '#C9A84C' : '#6b5e4e',
                        }}>{tab.label}</span>
                    </button>
                );
            })}
        </nav>
    );
};

export default OdiaNavbar;
