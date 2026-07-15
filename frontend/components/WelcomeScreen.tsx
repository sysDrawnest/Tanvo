import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const WelcomeScreen: React.FC = () => {
    const [isVisible, setIsVisible] = useState(true);

    const handleDismiss = () => {
        setIsVisible(false);
        sessionStorage.setItem('tanvo_welcome_shown', 'true');
    };

    useEffect(() => {
        const hasBeenShown = sessionStorage.getItem('tanvo_welcome_shown');
        if (hasBeenShown) {
            setIsVisible(false);
            return;
        }

        const timer = setTimeout(() => {
            handleDismiss();
        }, 800);

        return () => clearTimeout(timer);
    }, []);

    return (
        <AnimatePresence>
            {isVisible && (
                <motion.div
                    initial={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.6, ease: "easeInOut" }}
                    style={{
                        position: 'fixed',
                        inset: 0,
                        zIndex: 9999,
                        background: '#F8EDED', // Brand background (cream)
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                    }}
                >
                    <button
                        onClick={handleDismiss}
                        style={{
                            position: 'absolute',
                            top: '24px',
                            right: '24px',
                            background: 'none',
                            border: 'none',
                            color: '#173B45',
                            fontFamily: 'Inter, sans-serif',
                            fontSize: '11px',
                            letterSpacing: '0.2em',
                            textTransform: 'uppercase',
                            opacity: 0.6,
                            cursor: 'pointer',
                            padding: '8px',
                            transition: 'opacity 0.2s ease',
                            outline: 'none',
                        }}
                        onMouseEnter={(e) => (e.currentTarget.style.opacity = '1')}
                        onMouseLeave={(e) => (e.currentTarget.style.opacity = '0.6')}
                    >
                        Skip Intro
                    </button>

                    <motion.div
                        initial={{ scale: 0.98, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        transition={{ duration: 0.6, ease: "easeOut" }}
                        style={{ textAlign: 'center' }}
                    >
                        <h1 style={{
                            fontFamily: '"Playfair Display", serif',
                            fontSize: 'clamp(48px, 12vw, 130px)',
                            fontWeight: 500,
                            letterSpacing: '0.15em',
                            textTransform: 'uppercase',
                            color: '#B43F3F', // Brand primary (burgundy)
                            margin: 0,
                            lineHeight: 1,
                        }}>
                            Tanvo
                        </h1>
                        <motion.div
                            initial={{ width: 0 }}
                            animate={{ width: '100%' }}
                            transition={{ duration: 0.6, delay: 0.2 }}
                            style={{
                                height: '1px',
                                background: 'linear-gradient(90deg, transparent, #FF8225, transparent)',
                                margin: '16px auto 8px',
                                width: '60%',
                            }}
                        />
                        <p style={{
                            fontFamily: 'Inter, sans-serif',
                            fontSize: 10,
                            letterSpacing: '0.4em',
                            textTransform: 'uppercase',
                            color: '#173B45', // Brand accent (teal)
                            opacity: 0.7,
                            marginTop: 8,
                        }}>
                            Artisanal Heritage
                        </p>
                    </motion.div>
                </motion.div>
            )}
        </AnimatePresence>
    );
};

export default WelcomeScreen;