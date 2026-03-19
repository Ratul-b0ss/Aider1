import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { GlobalErrorBoundary } from './components/ErrorBoundary';
import { Navbar } from './components/layout/Navbar';
import { BottomNav } from './components/layout/BottomNav';
import { CustomerLayout } from './components/layout/CustomerLayout';
import { ProviderLayout } from './components/layout/ProviderLayout';
import { Auth } from './components/auth/Auth';

// Customer screens
import { Home } from './components/customer/Home';
import { Services } from './components/customer/Services';
import { Profile } from './components/customer/Profile';
import { Bookings } from './components/customer/Bookings';
import { Settings } from './components/customer/Settings';

// Provider screens
import { ProviderDashboard } from './components/provider/ProviderDashboard';
import { ProviderProfile } from './components/provider/ProviderProfile';
import { ProviderVerification } from './components/provider/ProviderVerification';
import { PostServiceGate } from './components/provider/PostServiceGate';

// Shared screens
import { SearchPage } from './components/shared/SearchPage';
import { SupportPage } from './components/shared/SupportPage';

// Context
import { ProviderContextProvider } from './context/ProviderContext';

import { Screen, UserType } from './types';

// ── Screens that should have full-bleed (no wrapper padding) ────────────────
const FULL_BLEED_SCREENS: Screen[] = ['home'];

// ── Screens where nav is shown ────────────────────────────────────────────────
const NAV_SCREENS: Screen[] = [
  'home', 'services', 'profile', 'settings', 'bookings', 'search', 'support',
  'provider-dashboard', 'provider-profile', 'provider-bookings',
  'provider-services', 'provider-verification', 'provider-post-service',
];

// ── Auth-only screens ─────────────────────────────────────────────────────────
const AUTH_SCREENS: Screen[] = ['login', 'signup'];

export default function App() {
  const [screen, setScreen] = useState<Screen>('home');
  const [userType, setUserType] = useState<UserType>('customer');
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  const handleAuthSuccess = (type: UserType) => {
    setUserType(type);
    setIsAuthenticated(true);
    setScreen(type === 'customer' ? 'home' : 'provider-dashboard');
  };

  const handleLogout = () => {
    setIsAuthenticated(false);
    setUserType('customer');
    setScreen('home');
  };

  // ── Screen renderer ─────────────────────────────────────────────────────────
  const renderScreen = () => {
    switch (screen) {
      // ── Auth ──
      case 'login':
      case 'signup':
        return <Auth initialMode={screen} onAuthSuccess={handleAuthSuccess} />;

      // ── Shared ──
      case 'search':
        return <SearchPage onNavigate={setScreen} userType={userType} />;
      case 'support':
        return <SupportPage onNavigate={setScreen} userType={userType} />;

      // ── Customer ──
      case 'home':
        return <Home onNavigate={setScreen} isAuthenticated={isAuthenticated} />;
      case 'services':
        return <Services onNavigate={setScreen} />;
      case 'profile':
        return <Profile onNavigate={setScreen} onLogout={handleLogout} />;
      case 'bookings':
        return <Bookings onNavigate={setScreen} />;
      case 'settings':
        return (
          <Settings
            onBack={() => setScreen(userType === 'customer' ? 'profile' : 'provider-profile')}
            onLogout={handleLogout}
          />
        );

      // ── Provider ──
      case 'provider-dashboard':
        return <ProviderDashboard onNavigate={setScreen} />;
      case 'provider-profile':
        return <ProviderProfile onNavigate={setScreen} onLogout={handleLogout} />;
      case 'provider-bookings':
        return <Bookings onNavigate={setScreen} />;
      case 'provider-services':
        return <Services onNavigate={setScreen} />;
      case 'provider-verification':
        return <ProviderVerification onNavigate={setScreen} />;
      case 'provider-post-service':
        return <PostServiceGate onNavigate={setScreen} />;

      default:
        return userType === 'customer'
          ? <Home onNavigate={setScreen} isAuthenticated={isAuthenticated} />
          : <ProviderDashboard onNavigate={setScreen} />;
    }
  };

  const showNav = NAV_SCREENS.includes(screen);
  const isAuthScreen = AUTH_SCREENS.includes(screen);
  const isFullBleed = FULL_BLEED_SCREENS.includes(screen);

  // ── Auth layout (full screen, no chrome) ──────────────────────────────────
  if (isAuthScreen) {
    return (
      <GlobalErrorBoundary>
        <ProviderContextProvider>
          <AnimatePresence mode="wait">
            <motion.div
              key={screen}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.4 }}
              className="h-screen w-screen overflow-hidden"
            >
              <Auth initialMode={screen as 'login' | 'signup'} onAuthSuccess={handleAuthSuccess} />
            </motion.div>
          </AnimatePresence>
        </ProviderContextProvider>
      </GlobalErrorBoundary>
    );
  }

  // ── Authenticated Provider layout ─────────────────────────────────────────
  if (isAuthenticated && userType === 'provider') {
    return (
      <GlobalErrorBoundary>
        <ProviderContextProvider>
          <div className="layout-grid min-h-screen" style={{ background: 'var(--color-background)' }}>
            {showNav && (
              <header className="[grid-area:header] z-50 sticky top-0">
                <Navbar
                  active={screen}
                  onChange={setScreen}
                  userType={userType}
                  isAuthenticated={isAuthenticated}
                />
              </header>
            )}

            <main className="[grid-area:main]">
              <ProviderLayout screen={screen} onNavigate={setScreen}>
                <AnimatePresence mode="wait">
                  <motion.div
                    key={screen}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    transition={{ duration: 0.35, ease: [0.23, 1, 0.32, 1] }}
                  >
                    {renderScreen()}
                  </motion.div>
                </AnimatePresence>
              </ProviderLayout>
            </main>

            {showNav && (
              <footer className="[grid-area:nav] md:hidden z-50 sticky bottom-0">
                <BottomNav
                  active={screen}
                  onChange={setScreen}
                  userType={userType}
                  isAuthenticated={isAuthenticated}
                />
              </footer>
            )}
          </div>
        </ProviderContextProvider>
      </GlobalErrorBoundary>
    );
  }

  // ── Customer / Public layout ───────────────────────────────────────────────
  return (
    <GlobalErrorBoundary>
      <ProviderContextProvider>
        <div className="layout-grid min-h-screen" style={{ background: 'var(--color-background)' }}>
          {showNav && (
            <header className="[grid-area:header] z-50 sticky top-0">
              <Navbar
                active={screen}
                onChange={setScreen}
                userType={userType}
                isAuthenticated={isAuthenticated}
              />
            </header>
          )}

          <main className="[grid-area:main]">
            {isAuthenticated ? (
              <CustomerLayout screen={screen}>
                <AnimatePresence mode="wait">
                  <motion.div
                    key={screen}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    transition={{ duration: 0.35, ease: [0.23, 1, 0.32, 1] }}
                  >
                    {renderScreen()}
                  </motion.div>
                </AnimatePresence>
              </CustomerLayout>
            ) : (
              /* Public / unauthenticated — no wrapper role badge */
              <div className={isFullBleed ? 'h-full w-full' : 'px-fluid-md py-fluid-lg'}>
                <div className={isFullBleed ? 'h-full w-full' : 'max-w-7xl mx-auto'}>
                  <AnimatePresence mode="wait">
                    <motion.div
                      key={screen}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -10 }}
                      transition={{ duration: 0.35, ease: [0.23, 1, 0.32, 1] }}
                    >
                      {renderScreen()}
                    </motion.div>
                  </AnimatePresence>
                </div>
              </div>
            )}
          </main>

          {showNav && (
            <footer className="[grid-area:nav] md:hidden z-50 sticky bottom-0">
              <BottomNav
                active={screen}
                onChange={setScreen}
                userType={userType}
                isAuthenticated={isAuthenticated}
              />
            </footer>
          )}
        </div>
      </ProviderContextProvider>
    </GlobalErrorBoundary>
  );
}
