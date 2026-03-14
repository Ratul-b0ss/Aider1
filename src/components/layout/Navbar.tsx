import React, { useState, useEffect } from 'react';
import { Leaf, Zap, Bell, Home as HomeIcon, LayoutGrid, Calendar, User, BarChart3, Package, Menu, X } from 'lucide-react';
import { Button } from '../ui/Button';
import { Screen, UserType } from '../../types';

interface NavbarProps {
  active: Screen;
  onChange: (s: Screen) => void;
  userType: UserType;
  isAuthenticated: boolean;
}

export const Navbar = ({ active, onChange, userType, isAuthenticated }: NavbarProps) => {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const customerTabs = [
    { id: 'home', label: 'Home', icon: HomeIcon },
    { id: 'services', label: 'Services', icon: LayoutGrid },
    { id: 'bookings', label: 'Bookings', icon: Calendar },
    { id: 'profile', label: 'Profile', icon: User },
  ];

  const providerTabs = [
    { id: 'provider-dashboard', label: 'Dashboard', icon: BarChart3 },
    { id: 'provider-bookings', label: 'Bookings', icon: Calendar },
    { id: 'provider-services', label: 'Services', icon: Package },
    { id: 'provider-profile', label: 'Profile', icon: User },
  ];

  const tabs = userType === 'customer' ? customerTabs : providerTabs;

  const handleNavClick = (screen: Screen | string) => {
    onChange(screen as Screen);
    setMobileMenuOpen(false);
  };

  return (
    <nav className={`z-50 border-b border-border bg-white transition-all ${scrolled ? 'py-3 shadow-sm' : 'py-4 md:py-5'}`}>
      <div className="mx-auto flex max-w-7xl items-center justify-between px-fluid-md">
        {/* Logo */}
        <div 
          className="flex cursor-pointer items-center gap-1" 
          onClick={() => handleNavClick(userType === 'customer' ? 'home' : 'provider-dashboard')}
        >
          <span className="text-[clamp(1.5rem,3vw,2rem)] font-black tracking-tighter text-deep-moss">AIDER</span>
          <span className="text-[clamp(1.5rem,3vw,2rem)] font-black text-primary">.</span>
        </div>
        
        {/* Desktop Navigation Links */}
        <div className="hidden md:flex items-center gap-8">
          {isAuthenticated ? tabs.map((tab) => {
            const isActive = active === tab.id || (tab.id === 'profile' && active === 'settings') || (tab.id === 'provider-profile' && active === 'settings');
            return (
              <button
                key={tab.id}
                onClick={() => handleNavClick(tab.id)}
                className={`flex items-center gap-2 text-[clamp(0.875rem,1.5vw,1rem)] font-bold transition-all hover:text-deep-moss ${isActive ? 'text-deep-moss' : 'text-gray-600'}`}
              >
                <tab.icon size={16} />
                {tab.label}
              </button>
            );
          }) : (
            <>
              <button onClick={() => handleNavClick('services')} className="text-[clamp(0.875rem,1.5vw,1rem)] font-bold text-gray-800 hover:text-deep-moss transition-colors">Services</button>
              <button className="text-[clamp(0.875rem,1.5vw,1rem)] font-bold text-gray-800 hover:text-deep-moss transition-colors">How It Works</button>
              <button onClick={() => handleNavClick('signup')} className="text-[clamp(0.875rem,1.5vw,1rem)] font-bold text-gray-800 hover:text-deep-moss transition-colors">Become a Provider</button>
            </>
          )}
        </div>

        {/* Actions */}
        <div className="flex items-center gap-3 md:gap-4">
          {isAuthenticated ? (
            <>
              <button className="relative hidden md:block rounded-full p-2 text-gray-600 transition-colors hover:bg-gray-100 hover:text-deep-moss">
                <Bell size={20} />
                <span className="absolute right-1 top-1 h-2 w-2 rounded-full bg-primary"></span>
              </button>
              <button 
                onClick={() => handleNavClick('profile')}
                className="hidden md:flex h-10 w-10 items-center justify-center rounded-full bg-deep-moss text-sm font-bold text-white transition-transform hover:scale-105"
              >
                {userType === 'customer' ? 'JD' : 'SP'}
              </button>
            </>
          ) : (
            <>
              <button 
                onClick={() => handleNavClick('login')}
                className="hidden md:block text-[clamp(0.875rem,1.5vw,1rem)] font-bold text-deep-moss hover:text-deep-moss-dark transition-colors px-4"
              >
                Log In
              </button>
              <button 
                onClick={() => handleNavClick('signup')}
                className="hidden md:block rounded-xl bg-deep-moss px-4 py-2 md:px-6 md:py-2.5 text-[clamp(0.875rem,1.5vw,1rem)] font-bold text-white transition-all hover:bg-deep-moss-dark hover:shadow-md"
              >
                Sign Up
              </button>
              <button 
                onClick={() => handleNavClick('signup')}
                className="hidden md:block rounded-xl border-2 border-deep-moss px-6 py-2 text-[clamp(0.875rem,1.5vw,1rem)] font-bold text-deep-moss transition-all hover:bg-deep-moss hover:text-white"
              >
                Post a Job
              </button>
            </>
          )}
          
          {/* Mobile Menu Toggle (Only for unauthenticated users, auth users use BottomNav) */}
          {!isAuthenticated && (
            <button 
              className="md:hidden p-2 text-deep-moss"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            >
              {mobileMenuOpen ? <X size={28} /> : <Menu size={28} />}
            </button>
          )}
        </div>
      </div>

      {/* Mobile Menu Dropdown */}
      {mobileMenuOpen && !isAuthenticated && (
        <div className="md:hidden absolute top-full left-0 w-full bg-white border-b border-border shadow-lg py-4 px-fluid-md flex flex-col gap-4 z-50">
          <div className="flex flex-col gap-4">
            <button onClick={() => handleNavClick('services')} className="text-left text-lg font-bold text-gray-800 hover:text-deep-moss py-2">Services</button>
            <button className="text-left text-lg font-bold text-gray-800 hover:text-deep-moss py-2">How It Works</button>
            <button onClick={() => handleNavClick('signup')} className="text-left text-lg font-bold text-gray-800 hover:text-deep-moss py-2">Become a Provider</button>
            <div className="h-px w-full bg-gray-100 my-2"></div>
            <button 
              onClick={() => handleNavClick('login')}
              className="text-left text-lg font-bold text-deep-moss py-2"
            >
              Log In
            </button>
            <button 
              onClick={() => handleNavClick('signup')}
              className="w-full rounded-xl bg-deep-moss px-6 py-3 text-lg font-bold text-white text-center transition-all hover:bg-deep-moss-dark"
            >
              Sign Up
            </button>
            <button 
              onClick={() => handleNavClick('signup')}
              className="w-full rounded-xl border-2 border-deep-moss px-6 py-3 text-lg font-bold text-deep-moss text-center transition-all hover:bg-deep-moss hover:text-white"
            >
              Post a Job
            </button>
          </div>
        </div>
      )}
    </nav>
  );
};
