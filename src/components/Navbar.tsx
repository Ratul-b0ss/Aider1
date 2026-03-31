import React, { useState, useEffect, useRef } from 'react';
import { Theme } from '../hooks/useTheme';
import { Language } from '../hooks/useLanguage';

interface NavbarProps {
  theme: Theme;
  toggleTheme: () => void;
  lang: Language;
  toggleLang: () => void;
  searchQuery: string;
  setSearchQuery: (q: string) => void;
  onLogoClick: () => void;
  totalPages: number;
}

const Navbar: React.FC<NavbarProps> = ({
  theme, toggleTheme, lang, toggleLang,
  searchQuery, setSearchQuery, onLogoClick, totalPages
}) => {
  const [scrolled, setScrolled] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const ui = {
    en: {
      placeholder: `Search ${totalPages} topics…`,
      langBtn: 'বাংলা',
      darkBtn: 'Light',
      lightBtn: 'Dark',
      title: 'KnowledgeHub',
    },
    bn: {
      placeholder: `${totalPages}টি বিষয় অনুসন্ধান করুন…`,
      langBtn: 'English',
      darkBtn: 'আলো',
      lightBtn: 'অন্ধকার',
      title: 'জ্ঞানকেন্দ্র',
    }
  }[lang];

  return (
    <>
      <nav className="navbar" style={{ boxShadow: scrolled ? '0 4px 32px rgba(0,0,0,0.12)' : undefined }}>
        <div className="navbar-inner">

          {/* Logo */}
          <div className="navbar-logo" onClick={onLogoClick} role="button" tabIndex={0}
            onKeyDown={e => e.key === 'Enter' && onLogoClick()}>
            <div className="navbar-logo-icon">✦</div>
            <span className="navbar-logo-text">{ui.title}</span>
          </div>

          {/* Search */}
          <div className="navbar-search-wrap">
            <span className="navbar-search-icon">🔍</span>
            <input
              ref={inputRef}
              type="text"
              className="navbar-search"
              placeholder={ui.placeholder}
              value={searchQuery}
              onChange={e => setSearchQuery(e.target.value)}
              aria-label="Search pages"
            />
            {searchQuery && (
              <button
                onClick={() => { setSearchQuery(''); inputRef.current?.focus(); }}
                style={{
                  position: 'absolute', right: '0.75rem', top: '50%',
                  transform: 'translateY(-50%)', background: 'none',
                  border: 'none', cursor: 'pointer', color: 'var(--text-muted)',
                  fontSize: '0.85rem', padding: '0.25rem', lineHeight: 1
                }}
                aria-label="Clear search"
              >✕</button>
            )}
          </div>

          {/* Controls */}
          <div className="navbar-controls">
            {/* Language Toggle */}
            <button
              className={`nav-btn ${lang === 'bn' ? 'active' : ''}`}
              onClick={toggleLang}
              aria-label="Toggle language"
            >
              <span>{lang === 'en' ? '🇧🇩' : '🇬🇧'}</span>
              <span>{ui.langBtn}</span>
            </button>

            {/* Theme Toggle */}
            <button
              className="nav-icon-btn"
              onClick={toggleTheme}
              aria-label="Toggle theme"
              title={theme === 'dark' ? ui.darkBtn : ui.lightBtn}
            >
              {theme === 'dark' ? '☀️' : '🌙'}
            </button>
          </div>
        </div>
      </nav>

      {/* Mobile Search Bar */}
      <div className="mobile-search-bar" style={{ position: 'fixed', top: '62px', left: 0, right: 0, zIndex: 999 }}>
        <div style={{ position: 'relative' }}>
          <span style={{ position: 'absolute', left: '0.85rem', top: '50%', transform: 'translateY(-50%)', fontSize: '0.85rem' }}>🔍</span>
          <input
            type="text"
            placeholder={ui.placeholder}
            value={searchQuery}
            onChange={e => setSearchQuery(e.target.value)}
            style={{
              width: '100%', padding: '0.5rem 1rem 0.5rem 2.5rem',
              background: 'var(--search-bg)', border: '1px solid var(--search-border)',
              borderRadius: '50px', color: 'var(--text-primary)',
              fontSize: '0.88rem', fontFamily: 'inherit', outline: 'none'
            }}
          />
        </div>
      </div>
    </>
  );
};

export default Navbar;
