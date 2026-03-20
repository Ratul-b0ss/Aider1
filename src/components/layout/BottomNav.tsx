import React from 'react';
import { Home, Search, BookOpen, User, LayoutDashboard, Briefcase, Wallet, Star } from 'lucide-react';
import { Screen } from '../../types';

type AuthStatus = 'guest' | 'customer' | 'provider';

interface BottomNavProps {
  screen: Screen;
  onNavigate: (s: Screen) => void;
  authStatus: AuthStatus;
}

const CUSTOMER_TABS = [
  { label: 'Home',     screen: 'home' as Screen,     icon: Home },
  { label: 'Explore',  screen: 'services' as Screen, icon: Search },
  { label: 'Bookings', screen: 'bookings' as Screen, icon: BookOpen },
  { label: 'Profile',  screen: 'profile' as Screen,  icon: User },
];

const PROVIDER_TABS = [
  { label: 'Dashboard', screen: 'provider-dashboard' as Screen, icon: LayoutDashboard },
  { label: 'Services',  screen: 'provider-services' as Screen,  icon: Briefcase },
  { label: 'Bookings',  screen: 'provider-bookings' as Screen,  icon: BookOpen },
  { label: 'Wallet',    screen: 'provider-wallet' as Screen,    icon: Wallet },
  { label: 'Profile',   screen: 'provider-profile' as Screen,   icon: User },
];

export const BottomNav = ({ screen, onNavigate, authStatus }: BottomNavProps) => {
  const tabs = authStatus === 'provider' ? PROVIDER_TABS : CUSTOMER_TABS;

  return (
    <nav
      className="fixed bottom-0 left-0 right-0 z-50 md:hidden"
      style={{
        background: 'rgba(255,255,255,0.95)',
        backdropFilter: 'blur(20px)',
        borderTop: '1px solid var(--color-border)',
        paddingBottom: 'env(safe-area-inset-bottom)',
        boxShadow: '0 -4px 20px rgba(0,0,0,0.06)',
      }}
    >
      <div className="flex items-center justify-around px-2 py-2">
        {tabs.map(({ label, screen: s, icon: Icon }) => {
          const isActive = screen === s;
          return (
            <button
              key={s}
              onClick={() => onNavigate(s)}
              className="flex flex-col items-center gap-0.5 px-3 py-1.5 rounded-xl transition-all active:scale-95"
              style={{
                color: isActive ? 'var(--color-deep)' : 'var(--color-ink-muted)',
                background: isActive ? 'var(--color-primary-light)' : 'transparent',
                minWidth: 52,
              }}
            >
              <Icon
                size={18}
                strokeWidth={isActive ? 2.5 : 1.8}
                style={{ color: isActive ? 'var(--color-primary)' : 'var(--color-neutral-400)' }}
              />
              <span
                className="text-[9px] font-semibold"
                style={{ fontFamily: 'var(--font-display)' }}
              >
                {label}
              </span>
            </button>
          );
        })}
      </div>
    </nav>
  );
};
