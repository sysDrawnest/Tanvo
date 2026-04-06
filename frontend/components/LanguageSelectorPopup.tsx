import React, { useState, useEffect } from 'react';
import { useLanguage } from '../context/LanguageContext';
import { motion, AnimatePresence } from 'framer-motion';
import { useNavigate } from 'react-router-dom';

const LanguageSelectorPopup: React.FC = () => {
    const { mode, setMode } = useLanguage();
    const [isVisible, setIsVisible] = useState(false);
    const navigate = useNavigate();

    useEffect(() => {
        // Show popup if no preference is set in localStorage
        const hasPreference = localStorage.getItem('tanvo_language_preferred');
        if (!hasPreference) {
            setIsVisible(true);
        }
    }, []);

    const handleChoice = (choice: 'english' | 'odia') => {
        setMode(choice);
        localStorage.setItem('tanvo_language_preferred', 'true');
        setIsVisible(false);

        if (choice === 'odia') {
            navigate('/odia');
        } else {
            navigate('/');
        }
    };

    const handleCancel = () => {
        localStorage.setItem('tanvo_language_preferred', 'true'); // Don't show again this session/ever
        setIsVisible(false);
    };

    if (!isVisible) return null;

    return (
        <AnimatePresence>
            <div className="fixed inset-0 z-[1000] flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
                <motion.div
                    initial={{ opacity: 0, scale: 0.9, y: 20 }}
                    animate={{ opacity: 1, scale: 1, y: 0 }}
                    exit={{ opacity: 0, scale: 0.9, y: 20 }}
                    className="bg-white rounded-3xl p-8 max-w-md w-full shadow-2xl border border-[#f0e2d6] text-center"
                >
                    <div className="w-20 h-20 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-6">
                        <span className="material-symbols-outlined text-4xl text-primary">language</span>
                    </div>

                    <h2 className="font-noto text-2xl font-bold mb-2">Welcome to Tanvo / ସ୍ଵାଗତମ୍</h2>
                    <p className="text-[#6b6259] mb-8">Choose your preferred experience / ଆପଣଙ୍କ ପସନ୍ଦ ବାଛନ୍ତୁ</p>

                    <div className="grid gap-4">
                        <button
                            onClick={() => handleChoice('english')}
                            className="w-full py-4 rounded-2xl border-2 border-[#f0e2d6] hover:border-primary hover:bg-primary/5 transition-all font-bold text-lg flex items-center justify-between px-6 group"
                        >
                            <span>English Mode</span>
                            <span className="material-symbols-outlined opacity-0 group-hover:opacity-100 transition-all">arrow_forward</span>
                        </button>

                        <button
                            onClick={() => handleChoice('odia')}
                            className="w-full py-4 rounded-2xl border-2 border-primary bg-primary/5 hover:bg-primary/10 transition-all font-bold text-lg flex flex-col items-center gap-1 group relative overflow-hidden"
                        >
                            <div className="flex items-center justify-between w-full px-6">
                                <span className="text-[#9f2e30]">ଓଡ଼ିଆ Mode</span>
                                <span className="material-symbols-outlined text-[#9f2e30]">arrow_forward</span>
                            </div>
                            <span className="text-xs font-normal text-[#6b6259] mt-1">
                                (ସରଳ ସଂସ୍କରଣ - ସହଜରେ ଶାଢ଼ୀ କିଣିବା ପାଇଁ)
                            </span>
                        </button>
                    </div>

                    <button
                        onClick={handleCancel}
                        className="mt-8 text-[#6b6259] text-sm font-medium hover:underline"
                    >
                        Maybe later / ପରେ ଦେଖିବା
                    </button>
                </motion.div>
            </div>
        </AnimatePresence>
    );
};

export default LanguageSelectorPopup;
