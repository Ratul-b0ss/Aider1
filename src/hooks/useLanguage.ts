import { useState, useEffect } from 'react';

export type Language = 'en' | 'bn';

export function useLanguage() {
  const [lang, setLang] = useState<Language>(() => {
    const saved = localStorage.getItem('lang') as Language;
    return saved === 'en' || saved === 'bn' ? saved : 'en';
  });

  useEffect(() => {
    localStorage.setItem('lang', lang);
    document.documentElement.setAttribute('lang', lang === 'bn' ? 'bn' : 'en');
  }, [lang]);

  const toggleLang = () => setLang(prev => prev === 'en' ? 'bn' : 'en');

  return { lang, toggleLang };
}
