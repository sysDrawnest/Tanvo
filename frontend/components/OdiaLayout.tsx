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
                <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start' }}>
                    <span style={{
                        fontFamily: '"Playfair Display", serif',
                        fontSize: 20,
                        fontWeight: 700,
                        color: '#B43F3F',
                        letterSpacing: '0.1em',
                        lineHeight: 1,
                    }}>TANVO</span>
                    <span style={{
                        fontFamily: 'Inter, sans-serif',
                        fontSize: 6,
                        letterSpacing: '0.3em',
                        color: 'rgba(23, 59, 69, 0.6)',
                        textTransform: 'uppercase',
                        marginTop: 2,
                    }}>Artisanal Heritage</span>
                </div>
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
