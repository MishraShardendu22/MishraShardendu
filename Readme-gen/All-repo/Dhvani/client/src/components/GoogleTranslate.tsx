import React, { useEffect } from 'react';
import { useThemeStore } from '@/store/themeStore';

// Extend the Window interface to include googleTranslateElementInit
declare global {
    interface Window {
        googleTranslateElementInit?: () => void;
        google?: {
            translate: {
                TranslateElement: new (options: object, containerId: string) => void;
            };
        };
    }
}

interface LanguageOption {
    code: string;
    name: string;
    flag: string;
    }

    const LanguageSwitcher: React.FC = () => {
    const { theme } = useThemeStore()
    const languages: LanguageOption[] = [
        { code: 'en', name: 'English', flag: '🇬🇧' },
        { code: 'es', name: 'Español', flag: '🇪🇸' },
        { code: 'fr', name: 'Français', flag: '🇫🇷' },
        { code: 'de', name: 'Deutsch', flag: '🇩🇪' },
        { code: 'zh-CN', name: '中文', flag: '🇨🇳' },
        { code: 'hi', name: 'हिन्दी', flag: '🇮🇳' },
    ];

    useEffect(() => {
        // Add Google Translate script
        const googleScript = document.createElement('script');
        googleScript.src = '//translate.google.com/translate_a/element.js?cb=googleTranslateElementInit';
        googleScript.async = true;
        document.body.appendChild(googleScript);
        
        // Hidden Google Translate element (used for its API only)
        const googleTranslateDiv = document.createElement('div');
        googleTranslateDiv.id = 'google_translate_element';
        googleTranslateDiv.style.display = 'none';
        document.body.appendChild(googleTranslateDiv);
        
        // Initialize Google Translate
        window.googleTranslateElementInit = () => {
        if (window.google && window.google.translate) {
            new window.google.translate.TranslateElement({
                pageLanguage: 'en',
                includedLanguages: languages.map(lang => lang.code).join(','),
                autoDisplay: false
            }, 'google_translate_element');
        }
        };
        
        return () => {
        document.body.removeChild(googleScript);
        document.body.removeChild(googleTranslateDiv);
        delete window.googleTranslateElementInit;
        };
    }, []);

    const changeLanguage = (languageCode: string) => {
        // Get the select element inserted by Google Translate
        const googleSelect = document.querySelector('.goog-te-combo') as HTMLSelectElement;
        
        if (googleSelect) {
        googleSelect.value = languageCode;
        
        // Trigger change event to apply translation
        googleSelect.dispatchEvent(new Event('change'));
        }
    };
    return (
        <div className="relative inline-block text-left">
        <select
            onChange={(e) => changeLanguage(e.target.value)}
            className={`${
            theme === "light" ? "bg-white border-gray-600 block px-4 py-2 pr-8 leading-tight rounded-lg shadow appearance-none focus:outline-none focus:shadow-outline" : "bg-base-200/50 backdrop-blur-sm border-slate-400 block px-4 py-2 pr-8 leading-tight rounded-lg shadow appearance-none focus:outline-none focus:shadow-outline"
            }`}
        >
            {languages.map((lang) => (
            <option key={lang.code} value={lang.code}>
                {lang.flag} {lang.name}
            </option>
            ))}
        </select>
        <div className="absolute inset-y-0 right-0 flex items-center px-2 text-gray-700 pointer-events-none">
            <svg className="w-4 h-4 fill-current" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20">
            <path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z" />
            </svg>
        </div>
        </div>
    );
};

export default LanguageSwitcher;