import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { GlobalErrorBoundary } from './components/ErrorBoundary';
import { ProviderContextProvider } from './context/ProviderContext';

// ── Layout ──
import { Navbar } from './components/layout/Navbar';
import { Footer } from './components/layout/Footer';
import { BottomNav } from './components/layout/BottomNav';
import { CustomerLayout } from './components/layout/CustomerLayout';
import { ProviderSidebarLayout } from './components/layout/ProviderSidebarLayout';

// ── Auth ──
import { Auth } from './components/auth/Auth';

// ── Landing (State 1: Guest) ──
import { GuestLanding } from './components/guest/GuestLanding';

// ── Customer Screens (State 2) ──
import { CustomerDashboard } from './components/customer/CustomerDashboard';
import { Services } from './components/customer/Services';
import { ServiceDetail } from './components/customer/ServiceDetail';
import { BookingCheckout } from './components/customer/BookingCheckout';
import { OrderTracking } from './components/customer/OrderTracking';
import { Profile } from './components/customer/Profile';
import { Bookings } from './components/customer/Bookings';
import { Settings } from './components/customer/Settings';

// ── Provider Screens (State 3) ──
import { ProviderDashboard } from './components/provider/ProviderDashboard';
import { ProviderProfile } from './components/provider/ProviderProfile';
import { ProviderVerification } from './components/provider/ProviderVerification';
import { PostServiceGate } from './components/provider/PostServiceGate';
import { GigCreateForm } from './components/provider/GigCreateForm';
import { WalletPayout } from './components/provider/WalletPayout';
import { VerificationWizard } from './components/provider/VerificationWizard';

// ── Shared Screens ──
import { SearchPage } from './components/shared/SearchPage';
import { SupportPage } from './components/shared/SupportPage';

// ── Public Screens ──
import { TermsPage } from './components/public/TermsPage';
import { PrivacyPage } from './components/public/PrivacyPage';
import { HelpCenter } from './components/public/HelpCenter';

import { Screen, AuthUser } from './types';

// ── Screens that use full-bleed (no padding wrapper) ─────────────────────────
const FULL_BLEED_SCREENS: Screen[] = ['landing', 'login', 'signup'];

// ── Screens with bottom nav (mobile) ─────────────────────────────────────────
const CUSTOMER_NAV_SCREENS: Screen[] = [
  'home', 'services', 'service-detail', 'profile', 'settings',
  'bookings', 'search', 'support', 'booking-checkout', 'order-tracking',
];
const PROVIDER_NAV_SCREENS: Screen[] = [
  'provider-dashboard', 'provider-profile', 'provider-bookings',
  'provider-services', 'provider-verification', 'provider-post-service',
  'provider-gig-create', 'provider-wallet', 'provider-verification-wizard',
];

// ── Page transition preset ────────────────────────────────────────────────────
const pageTransition = {
  initial: { opacity: 0, y: 12 },
  animate: { opacity: 1, y: 0 },
  exit:    { opacity: 0, y: -8 },
  transition: { duration: 0.32, ease: [0.23, 1, 0.32, 1] as [number, number, number, number] },
};

export default function App() {
  const [screen, setScreen] = useState<Screen>('landing');
  const [user, setUser] = useState<AuthUser | null>(null);

  // ── Auth Handlers ────────────────────────────────────────────────────────
  const handleAuthSuccess = (userData: AuthUser) => {
    setUser(userData);
    setScreen(userData.role === 'customer' ? 'home' : 'provider-dashboard');
  };

  const handleLogout = () => {
    setUser(null);
    setScreen('landing');
  };

  const navigate = (s: Screen) => setScreen(s);

  // ── LandingSwitcher: 3-State Core Controller ─────────────────────────────
  const authStatus = !user ? 'guest' : user.role === 'customer' ? 'customer' : 'provider';

  // ── Screen Renderer ──────────────────────────────────────────────────────
  const renderScreen = (): React.ReactNode => {

    // ── AUTH SCREENS ──────────────────────────────────────────────────────
    if (screen === 'login' || screen === 'signup') {
      return <Auth initialMode={screen} onAuthSuccess={handleAuthSuccess} onNavigate={navigate} />;
    }

    // ─── PUBLIC SCREENS (accessible by all) ────────────────────────────────
    if (screen === 'terms')   return <TermsPage onNavigate={navigate} />;
    if (screen === 'privacy') return <PrivacyPage onNavigate={navigate} />;
    if (screen === 'help')    return <HelpCenter onNavigate={navigate} />;
    if (screen === 'search')  return <SearchPage onNavigate={navigate} authStatus={authStatus} />;
    if (screen === 'support') return <SupportPage onNavigate={navigate} authStatus={authStatus} />;

    // ── STATE 1: GUEST ─────────────────────────────────────────────────────
    if (authStatus === 'guest') {
      return <GuestLanding onNavigate={navigate} />;
    }

    // ── STATE 2: CUSTOMER ──────────────────────────────────────────────────
    if (authStatus === 'customer') {
      switch (screen) {
        case 'home':             return <CustomerDashboard onNavigate={navigate} user={user!} />;
        case 'services':         return <Services onNavigate={navigate} />;
        case 'service-detail':   return <ServiceDetail onNavigate={navigate} />;
        case 'booking-checkout': return <BookingCheckout onNavigate={navigate} />;
        case 'order-tracking':   return <OrderTracking onNavigate={navigate} />;
        case 'profile':          return <Profile onNavigate={navigate} onLogout={handleLogout} user={user!} />;
        case 'bookings':         return <Bookings onNavigate={navigate} />;
        case 'settings':         return <Settings onNavigate={navigate} onLogout={handleLogout} user={user!} />;
        default:                 return <CustomerDashboard onNavigate={navigate} user={user!} />;
      }
    }

    // ── STATE 3: PROVIDER ──────────────────────────────────────────────────
    if (authStatus === 'provider') {
      switch (screen) {
        case 'provider-dashboard':          return <ProviderDashboard onNavigate={navigate} user={user!} />;
        case 'provider-profile':            return <ProviderProfile onNavigate={navigate} onLogout={handleLogout} />;
        case 'provider-bookings':           return <Bookings onNavigate={navigate} isProvider />;
        case 'provider-services':           return <Services onNavigate={navigate} isProvider />;
        case 'provider-verification':       return <ProviderVerification onNavigate={navigate} />;
        case 'provider-post-service':       return <PostServiceGate onNavigate={navigate} />;
        case 'provider-gig-create':         return <GigCreateForm onNavigate={navigate} />;
        case 'provider-wallet':             return <WalletPayout onNavigate={navigate} user={user!} />;
        case 'provider-verification-wizard':return <VerificationWizard onNavigate={navigate} />;
        case 'settings':                    return <Settings onNavigate={navigate} onLogout={handleLogout} user={user!} />;
        default:                            return <ProviderDashboard onNavigate={navigate} user={user!} />;
      }
    }

    return <GuestLanding onNavigate={navigate} />;
  };

  const isAuthScreen = screen === 'login' || screen === 'signup';
  const isFullBleed  = FULL_BLEED_SCREENS.includes(screen);
  const showCustomerNav = authStatus === 'customer' && CUSTOMER_NAV_SCREENS.includes(screen);
  const showProviderNav = authStatus === 'provider' && PROVIDER_NAV_SCREENS.includes(screen);
  const showNav = showCustomerNav || showProviderNav;
  const showFooter = authStatus === 'guest' && !isAuthScreen;

  // ── Full-screen Auth / Landing ──────────────────────────────────────────
  if (isAuthScreen || (authStatus === 'guest' && screen === 'landing')) {
    return (
      <GlobalErrorBoundary>
        <ProviderContextProvider>
          <AnimatePresence mode="wait">
            <motion.div key={screen} {...pageTransition} className="min-h-screen w-full">
              {renderScreen()}
            </motion.div>
          </AnimatePresence>
        </ProviderContextProvider>
      </GlobalErrorBoundary>
    );
  }

  // ── Public pages (terms/privacy/help) with footer ──────────────────────
  if (authStatus === 'guest') {
    return (
      <GlobalErrorBoundary>
        <ProviderContextProvider>
          <div className="min-h-screen flex flex-col" style={{ background: 'var(--color-background)' }}>
            <Navbar screen={screen} onNavigate={navigate} authStatus={authStatus} user={user} onLogout={handleLogout} />
            <main className="flex-1">
              <AnimatePresence mode="wait">
                <motion.div key={screen} {...pageTransition}>
                  {renderScreen()}
                </motion.div>
              </AnimatePresence>
            </main>
            <Footer onNavigate={navigate} />
          </div>
        </ProviderContextProvider>
      </GlobalErrorBoundary>
    );
  }

  // ── STATE 3: Provider — Sidebar Layout ─────────────────────────────────
  if (authStatus === 'provider') {
    return (
      <GlobalErrorBoundary>
        <ProviderContextProvider>
          <ProviderSidebarLayout
            screen={screen}
            onNavigate={navigate}
            user={user!}
            onLogout={handleLogout}
          >
            <AnimatePresence mode="wait">
              <motion.div key={screen} {...pageTransition}>
                {renderScreen()}
              </motion.div>
            </AnimatePresence>
          </ProviderSidebarLayout>
        </ProviderContextProvider>
      </GlobalErrorBoundary>
    );
  }

  // ── STATE 2: Customer — Top Nav + Bottom Nav layout ─────────────────────
  return (
    <GlobalErrorBoundary>
      <ProviderContextProvider>
        <div className="min-h-screen flex flex-col" style={{ background: 'var(--color-background)' }}>
          <Navbar screen={screen} onNavigate={navigate} authStatus={authStatus} user={user} onLogout={handleLogout} />
          <main className="flex-1">
            <CustomerLayout screen={screen}>
              <AnimatePresence mode="wait">
                <motion.div key={screen} {...pageTransition}>
                  {renderScreen()}
                </motion.div>
              </AnimatePresence>
            </CustomerLayout>
          </main>
          {showNav && (
            <BottomNav screen={screen} onNavigate={navigate} authStatus={authStatus} />
          )}
        </div>
      </ProviderContextProvider>
    </GlobalErrorBoundary>
  );
}
