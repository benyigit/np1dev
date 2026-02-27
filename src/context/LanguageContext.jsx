import { createContext, useContext, useState, useCallback } from 'react';
import translations from '../i18n/translations';

const LanguageContext = createContext();

const SUPPORTED_LANGUAGES = [
    { code: 'en', name: 'English', flag: '🇬🇧' },
    { code: 'tr', name: 'Türkçe', flag: '🇹🇷' },
    { code: 'de', name: 'Deutsch', flag: '🇩🇪' },
    { code: 'fr', name: 'Français', flag: '🇫🇷' },
];

export function LanguageProvider({ children }) {
    const [language, setLanguage] = useState(() => {
        const saved = localStorage.getItem('np1-language');
        return saved || 'en';
    });

    const changeLanguage = useCallback((lang) => {
        setLanguage(lang);
        localStorage.setItem('np1-language', lang);
    }, []);

    const t = useCallback((key) => {
        const keys = key.split('.');
        let value = translations[language];
        for (const k of keys) {
            if (value && typeof value === 'object') {
                value = value[k];
            } else {
                return key;
            }
        }
        return value || key;
    }, [language]);

    return (
        <LanguageContext.Provider value={{ language, changeLanguage, t, SUPPORTED_LANGUAGES }}>
            {children}
        </LanguageContext.Provider>
    );
}

export function useLanguage() {
    const context = useContext(LanguageContext);
    if (!context) {
        throw new Error('useLanguage must be used within a LanguageProvider');
    }
    return context;
}
