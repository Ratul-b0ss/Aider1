import React, { useState, useEffect } from 'react';
import './index.css';

import { useTheme } from './hooks/useTheme';
import { useLanguage } from './hooks/useLanguage';
import { useRouter } from './hooks/useRouter';

import Navbar from './components/Navbar';
import HomePage from './components/HomePage';
import PageView from './components/PageView';
import Footer from './components/Footer';
import ScrollToTop from './components/ScrollToTop';
import { pagesData } from './data/pages';

const App: React.FC = () => {
  const { theme, toggleTheme } = useTheme();
  const { lang, toggleLang } = useLanguage();
  const { route, navigate, goHome } = useRouter();

  const [searchQuery, setSearchQuery] = useState('');

  // Apply Bengali font class to body
  useEffect(() => {
    if (lang === 'bn') {
      document.body.classList.add('bn-lang');
    } else {
      document.body.classList.remove('bn-lang');
    }
  }, [lang]);

  // Clear search on page navigate
  const handleNavigate = (slug: string) => {
    setSearchQuery('');
    navigate(slug);
  };

  // Clear search on go home
  const handleGoHome = () => {
    goHome();
  };

  // Mobile top offset: 62px navbar + 54px mobile search on small screens
  const contentPaddingTop = '70px';

  return (
    <div
      className="theme-transition"
      style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column' }}
    >
      {/* Glassmorphism Navbar */}
      <Navbar
        theme={theme}
        toggleTheme={toggleTheme}
        lang={lang}
        toggleLang={toggleLang}
        searchQuery={searchQuery}
        setSearchQuery={(q) => {
          setSearchQuery(q);
          // If user starts searching while on a page, go home
          if (route.view === 'page' && q.trim()) {
            goHome();
          }
        }}
        onLogoClick={handleGoHome}
        totalPages={pagesData.length}
      />

      {/* Page Content */}
      <div style={{ paddingTop: contentPaddingTop, flex: 1 }}>
        {route.view === 'home' ? (
          <HomePage
            lang={lang}
            searchQuery={searchQuery}
            setSearchQuery={setSearchQuery}
            onNavigate={handleNavigate}
          />
        ) : (
          <PageView
            slug={route.slug}
            lang={lang}
            onBack={handleGoHome}
            onNavigate={handleNavigate}
          />
        )}
      </div>

      {/* Footer */}
      <Footer lang={lang} />

      {/* Scroll to Top Button */}
      <ScrollToTop />
    </div>
  );
};

export default App;
