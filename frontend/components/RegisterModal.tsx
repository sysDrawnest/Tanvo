import React, { useState, useEffect } from 'react';
import { X, Mail, Sparkles } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const RegisterModal: React.FC = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [email, setEmail] = useState('');

    useEffect(() => {
        // Show modal after 2 seconds only if not shown before
        const hasSeenModal = localStorage.getItem('hasSeenRegisterModal');
        if (!hasSeenModal) {
            const timer = setTimeout(() => setIsOpen(true), 2000);
            return () => clearTimeout(timer);
        }
    }, []);

    const handleClose = () => {
        setIsOpen(false);
        localStorage.setItem('hasSeenRegisterModal', 'true');
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        // Here you would handle the registration
        console.log('Registering email:', email);
        handleClose();
    };

    return (
        <AnimatePresence>
            {isOpen && (
                <div className="fixed inset-0 z-[100] flex items-center justify-center p-6">
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="absolute inset-0 bg-tanvoDark/60 backdrop-blur-md"
                        onClick={handleClose}
                    />
                    <motion.div
                        initial={{ scale: 0.9, opacity: 0, y: 20 }}
                        animate={{ scale: 1, opacity: 1, y: 0 }}
                        exit={{ scale: 0.9, opacity: 0, y: 20 }}
                        className="relative bg-tanvoBg max-w-lg w-full overflow-hidden shadow-2xl rounded-sm"
                    >
                        {/* Decorative background */}
                        <div className="absolute top-0 right-0 w-32 h-32 bg-tanvoPrimary/5 rounded-full -mr-16 -mt-16 blur-2xl" />
                        <div className="absolute bottom-0 left-0 w-24 h-24 bg-tanvoPrimary/5 rounded-full -ml-12 -mb-12 blur-xl" />

                        <button
                            onClick={handleClose}
                            className="absolute top-4 right-4 text-tanvoDark/40 hover:text-tanvoPrimary transition-colors"
                        >
                            <X size={20} />
                        </button>

                        <div className="p-8 md:p-12 text-center">
                            <div className="inline-flex items-center justify-center w-12 h-12 bg-tanvoPrimary/10 rounded-full mb-6 text-tanvoPrimary">
                                <Sparkles size={24} />
                            </div>

                            <h2 className="font-serif text-3xl md:text-4xl text-tanvoDark mb-4 leading-tight">
                                Join the <span className="italic">Tanvo</span> Circle
                            </h2>

                            <p className="text-gray-500 text-sm leading-relaxed mb-8 max-w-sm mx-auto">
                                Be the first to experience our seasonal drops and receive stories of artisanal heritage directly in your inbox.
                            </p>

                            <form onSubmit={handleSubmit} className="space-y-4">
                                <div className="relative">
                                    <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-tanvoDark/30" size={16} />
                                    <input
                                        type="email"
                                        required
                                        placeholder="your@email.com"
                                        value={email}
                                        onChange={(e) => setEmail(e.target.value)}
                                        className="w-full bg-white border border-gray-100 pl-12 pr-4 py-4 text-sm focus:border-tanvoPrimary outline-none transition-all rounded-sm uppercase tracking-widest"
                                    />
                                </div>
                                <div className="grid grid-cols-2 gap-4">
                                    <button
                                        type="button"
                                        onClick={handleClose}
                                        className="py-4 text-xs font-bold uppercase tracking-widest text-tanvoDark/40 hover:text-tanvoDark transition-colors"
                                    >
                                        Later
                                    </button>
                                    <button
                                        type="submit"
                                        className="bg-tanvoPrimary text-white py-4 text-xs font-bold uppercase tracking-widest hover:bg-tanvoAccent transition-all shadow-lg shadow-tanvoPrimary/20"
                                    >
                                        Register
                                    </button>
                                </div>
                            </form>

                            <p className="mt-8 text-[10px] text-gray-400 uppercase tracking-widest">
                                Handwoven Heritage • Global Appreciation
                            </p>
                        </div>

                        {/* Thread detail at bottom */}
                        <div className="h-1 bg-gradient-to-r from-tanvoPrimary/10 via-tanvoPrimary to-tanvoPrimary/10" />
                    </motion.div>
                </div>
            )}
        </AnimatePresence>
    );
};

export default RegisterModal;
