import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';

export type LanguageMode = 'english' | 'odia';

interface LanguageContextType {
    mode: LanguageMode;
    setMode: (mode: LanguageMode) => void;
    isOdia: boolean;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

const LANG_STORAGE_KEY = 'tanvo_language_mode';

export const LanguageProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
    const [mode, setModeState] = useState<LanguageMode>(() => {
        const saved = localStorage.getItem(LANG_STORAGE_KEY);
        return (saved === 'odia' ? 'odia' : 'english') as LanguageMode;
    });

    const setMode = (newMode: LanguageMode) => {
        setModeState(newMode);
        localStorage.setItem(LANG_STORAGE_KEY, newMode);
    };

    const isOdia = mode === 'odia';

    return (
        <LanguageContext.Provider value={{ mode, setMode, isOdia }}>
            {children}
        </LanguageContext.Provider>
    );
};

export const useLanguage = (): LanguageContextType => {
    const ctx = useContext(LanguageContext);
    if (!ctx) throw new Error('useLanguage must be used within LanguageProvider');
    return ctx;
};
