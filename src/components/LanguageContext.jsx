import React, { createContext, useContext, useState, useEffect } from 'react';
import { translations } from './translations';

const LanguageContext = createContext();

export function LanguageProvider({ children }) {
  const [lang, setLang] = useState('fr');

  useEffect(() => {
    const html = document.documentElement;
    html.lang = lang;
    html.dir = lang === 'ar' ? 'rtl' : 'ltr';
  }, [lang]);

  const toggleLanguage = (newLang) => {
    if (newLang === 'fr' || newLang === 'ar') {
      setLang(newLang);
    } else {
      setLang((prev) => (prev === 'fr' ? 'ar' : 'fr'));
    }
  };

  const t = translations[lang];

  return (
    <LanguageContext.Provider value={{ lang, setLang: toggleLanguage, t, isRTL: lang === 'ar' }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  return useContext(LanguageContext);
}
