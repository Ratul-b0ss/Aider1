import React from 'react';
import { Home as HomeIcon, Search, Calendar, User, BarChart3, Package, ShieldCheck, HelpCircle } from 'lucide-react';
import { Screen, UserType } from '../../types';

interface BottomNavProps {
  active: Screen;
  onChange: (s: Screen) => void;
  userType: UserType;
  isAuthenticated: boolean;
}

export const BottomNav = ({ active, onChange, userType, isAuthenticated }: BottomNavProps) => {
  if (!isAuthenticated) return null;

  const customerTabs = [
    { id: 'home',     label: 'Home',     icon: HomeIcon },
    { id: 'search',   label: 'Search',   icon: Search },
    { id: 'bookings', label: 'Bookings', icon: Calendar },
    { id: 'support',  label: 'Support',  icon: HelpCircle },
    { id: 'profile',  label: 'Profile',  icon: User },
  ];

  const providerTabs = [
    { id: 'provider-dashboard',    label: 'Home',    icon: BarChart3 },
    { id: 'provider-bookings',     label: 'Bookings', icon: Calendar },
    { id: 'provider-services',     label: 'Services', icon: Package },
    { id: 'provider-verification', label: 'Verify',   icon: ShieldCheck },
    { id: 'provider-profile',      label: 'Profile',  icon: User },
  ];

  const tabs = userType === 'customer' ? customerTabs : providerTabs;

  return (
    <div
      className="md:hidden flex items-center justify-around px-2 pt-2 pb-[max(0.5rem,env(safe-area-inset-bottom))]"
      style={{
        background: 'rgba(255,255,255,0.9)',
        backdropFilter: 'blur(20px) saturate(180%)',
        WebkitBackdropFilter: 'blur(20px) saturate(180%)',
        borderTop: '1px solid var(--color-border)',
        boxShadow: '0 -8px 24px -8px rgba(0,0,0,0.07)',
      }}
    >
      {tabs.map((tab) => {
        const Icon = tab.icon;
        const isActive =
          active === tab.id ||
          (tab.id === 'profile' && active === 'settings') ||
          (tab.id === 'provider-profile' && active === 'settings');

        return (
          <button
            key={tab.id}
            onClick={() => onChange(tab.id as Screen)}
            className="flex flex-col items-center gap-1 py-2 px-3 rounded-2xl transition-all"
            style={{
              color: isActive ? 'var(--color-deep)' : 'var(--color-neutral-400)',
              background: isActive ? 'var(--color-primary-light)' : 'transparent',
              minWidth: '52px',
            }}
          >
            <Icon
              size={20}
              strokeWidth={isActive ? 2.5 : 1.8}
              style={{ color: isActive ? 'var(--color-deep)' : 'var(--color-neutral-400)' }}
            />
            <span
              className="text-[9px] font-semibold leading-none"
              style={{ fontFamily: 'var(--font-display)', letterSpacing: '0.01em' }}
            >
              {tab.label}
            </span>
          </button>
        );
      })}
    </div>
  );
};
