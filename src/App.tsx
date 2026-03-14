import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { GlobalErrorBoundary } from './components/ErrorBoundary';
import { Navbar } from './components/layout/Navbar';
import { BottomNav } from './components/layout/BottomNav';
import { Auth } from './components/auth/Auth';
import { Home } from './components/customer/Home';
import { Services } from './components/customer/Services';
import { Profile } from './components/customer/Profile';
import { Bookings } from './components/customer/Bookings';
import { Settings } from './components/customer/Settings';
import { ProviderDashboard } from './components/provider/ProviderDashboard';
import { ProviderProfile } from './components/provider/ProviderProfile';
import { Screen, UserType } from './types';

export default function App() {
  const [screen, setScreen] = useState<Screen>('home');
  const [userType, setUserType] = useState<UserType>('customer');
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  const handleAuthSuccess = (type: UserType) => {
    setUserType(type);
    setIsAuthenticated(true);
    if (type === 'customer') {
      setScreen('home');
    } else {
      setScreen('provider-dashboard');
    }
  };

  const handleLogout = () => {
    setIsAuthenticated(false);
    setScreen('home');
  };

  const renderScreen = () => {
    switch (screen) {
      case 'login':
        return <Auth initialMode="login" onAuthSuccess={handleAuthSuccess} />;
      case 'signup':
        return <Auth initialMode="signup" onAuthSuccess={handleAuthSuccess} />;
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
      
      // Provider Screens
      case 'provider-dashboard':
        return <ProviderDashboard onNavigate={setScreen} />;
      case 'provider-profile':
        return <ProviderProfile onNavigate={setScreen} onLogout={handleLogout} />;
      case 'provider-bookings':
        return <Bookings onNavigate={setScreen} />;
      case 'provider-services':
        return <Services onNavigate={setScreen} />;
      
      default:
        return userType === 'customer' ? <Home onNavigate={setScreen} isAuthenticated={isAuthenticated} /> : <ProviderDashboard onNavigate={setScreen} />;
    }
  };

  const showNav = ['home', 'services', 'profile', 'settings', 'bookings', 'provider-dashboard', 'provider-profile', 'provider-bookings', 'provider-services'].includes(screen);

  if (screen === 'login' || screen === 'signup') {
    return (
      <GlobalErrorBoundary>
        <AnimatePresence mode="wait">
          <motion.div
            key={screen}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.4 }}
            className="h-screen w-screen overflow-hidden"
          >
            <Auth initialMode={screen} onAuthSuccess={handleAuthSuccess} />
          </motion.div>
        </AnimatePresence>
      </GlobalErrorBoundary>
    );
  }

  return (
    <GlobalErrorBoundary>
      <div className="layout-grid min-h-screen bg-background-light selection:bg-primary/30">
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
        
        <main className={`[grid-area:main] ${showNav && screen !== 'home' ? 'px-fluid-md py-fluid-lg' : 'w-full h-full'}`}>
          <div className={showNav && screen !== 'home' ? 'max-w-7xl mx-auto' : 'h-full w-full'}>
            <AnimatePresence mode="wait">
              <motion.div
                key={screen}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.4, ease: [0.23, 1, 0.32, 1] }}
                className="h-full w-full"
              >
                {renderScreen()}
              </motion.div>
            </AnimatePresence>
          </div>
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
    </GlobalErrorBoundary>
  );
}
