import React from 'react';
import { Home as HomeIcon, Search, Calendar, User, BarChart3, Package } from 'lucide-react';
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
    { id: 'home', label: 'HOME', icon: HomeIcon },
    { id: 'services', label: 'SERVICES', icon: Search },
    { id: 'bookings', label: 'BOOKINGS', icon: Calendar },
    { id: 'profile', label: 'PROFILE', icon: User },
  ];

  const providerTabs = [
    { id: 'provider-dashboard', label: 'DASHBOARD', icon: BarChart3 },
    { id: 'provider-bookings', label: 'BOOKINGS', icon: Calendar },
    { id: 'provider-services', label: 'SERVICES', icon: Package },
    { id: 'provider-profile', label: 'PROFILE', icon: User },
  ];

  const tabs = userType === 'customer' ? customerTabs : providerTabs;

  return (
    <div className="z-50 flex items-center justify-between border-t border-border bg-white/80 px-fluid-md py-fluid-sm backdrop-blur-xl md:hidden shadow-[0_-10px_30px_-15px_rgba(0,0,0,0.1)]">
      {tabs.map((tab) => {
        const Icon = tab.icon;
        const isActive = active === tab.id || (tab.id === 'profile' && active === 'settings') || (tab.id === 'provider-profile' && active === 'settings');
        return (
          <button
            key={tab.id}
            onClick={() => onChange(tab.id as Screen)}
            className={`flex flex-col items-center gap-1 transition-colors ${isActive ? 'text-ink' : 'text-ink-muted'}`}
          >
            <div className={`p-1 transition-all ${isActive ? 'scale-110' : ''}`}>
              <Icon size={20} strokeWidth={isActive ? 3 : 2} />
            </div>
            <span className="text-[9px] font-black uppercase tracking-widest">{tab.label}</span>
          </button>
        );
      })}
    </div>
  );
};
