import React from 'react';
import OdiaNavbar from './OdiaNavbar';
import LanguageToggle from './LanguageToggle';

interface OdiaLayoutProps {
    children: React.ReactNode;
}

const OdiaLayout: React.FC<OdiaLayoutProps> = ({ children }) => {
    return (
        <div style={{ background: '#fdf8f2', minHeight: '100vh', paddingTop: 30 }}>
            {/* Odia-mode top header */}
            <header style={{
                background: '#fff',
                borderBottom: '1px solid #e5e0d8',
                padding: '10px 16px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                position: 'sticky',
                top: 30,
                zIndex: 100,
                boxShadow: '0 2px 12px rgba(0,0,0,0.06)',
            }}>
                <img src="/logo.png" alt="Tanvo" style={{ height: 36 }} onError={(e) => {
                    (e.target as HTMLImageElement).style.display = 'none';
                }} />
                <span style={{
                    fontFamily: "'Noto Sans Odia', sans-serif",
                    fontSize: 20,
                    fontWeight: 700,
                    color: '#1a120b',
                    letterSpacing: '-0.01em',
                }}>TANVO</span>
                <a
                    href="tel:+918658000000"
                    style={{
                        background: '#25D366',
                        color: '#fff',
                        borderRadius: 20,
                        padding: '6px 14px',
                        fontSize: 12,
                        fontFamily: "'Noto Sans Odia', sans-serif",
                        fontWeight: 700,
                        textDecoration: 'none',
                        display: 'flex',
                        alignItems: 'center',
                        gap: 4,
                    }}
                >
                    📞 ଡ଼ାକ
                </a>
            </header>

            {/* Page Content */}
            <main style={{ paddingBottom: 80 }}>
                {children}
            </main>

            {/* Bottom Nav */}
            <OdiaNavbar />
        </div>
    );
};

export default OdiaLayout;
