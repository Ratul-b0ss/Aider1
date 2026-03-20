import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import {
  Search, Bell, Menu, X, Settings, LogOut, User,
  LayoutDashboard, BookOpen, Briefcase, HelpCircle,
  Home, Star, Wallet,
} from 'lucide-react';
import { Screen, AuthUser } from '../../types';

type AuthStatus = 'guest' | 'customer' | 'provider';

interface NavbarProps {
  screen: Screen;
  onNavigate: (s: Screen) => void;
  authStatus: AuthStatus;
  user: AuthUser | null;
}

// ── Context-aware nav links per role ──────────────────────────────────────────
const GUEST_LINKS = [
  { label: 'How it Works', screen: 'landing' as Screen, icon: undefined as any },
  { label: 'Help', screen: 'help' as Screen, icon: undefined as any },
  { label: 'Terms', screen: 'terms' as Screen, icon: undefined as any },
];

const CUSTOMER_LINKS = [
  { label: 'Dashboard',  screen: 'home' as Screen,     icon: Home },
  { label: 'Services',   screen: 'services' as Screen, icon: Search },
  { label: 'Bookings',   screen: 'bookings' as Screen, icon: BookOpen },
  { label: 'Support',    screen: 'support' as Screen,  icon: HelpCircle },
];

const PROVIDER_LINKS = [
  { label: 'Dashboard',  screen: 'provider-dashboard' as Screen, icon: LayoutDashboard },
  { label: 'Services',   screen: 'provider-services' as Screen,  icon: Briefcase },
  { label: 'Bookings',   screen: 'provider-bookings' as Screen,  icon: BookOpen },
  { label: 'Wallet',     screen: 'provider-wallet' as Screen,    icon: Wallet },
];

export const Navbar = ({ screen, onNavigate, authStatus, user }: NavbarProps) => {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [profileOpen, setProfileOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const links = authStatus === 'provider'
    ? PROVIDER_LINKS
    : authStatus === 'customer'
    ? CUSTOMER_LINKS
    : GUEST_LINKS;

  const profileScreen: Screen = authStatus === 'provider' ? 'provider-profile' : 'profile';
  const settingsScreen: Screen = 'settings';

  const initials = user
    ? user.name.split(' ').map(n => n[0]).join('').slice(0, 2).toUpperCase()
    : '';

  return (
    <nav
      className="sticky top-0 z-50 w-full transition-all duration-300"
      style={{
        background: scrolled
          ? 'rgba(247,248,247,0.92)'
          : 'rgba(247,248,247,0.98)',
        backdropFilter: 'blur(20px)',
        borderBottom: scrolled
          ? '1px solid var(--color-border)'
          : '1px solid transparent',
        boxShadow: scrolled ? 'var(--shadow-sm)' : 'none',
      }}
    >
      <div className="mx-auto max-w-7xl px-5 lg:px-8">
        <div className="flex h-16 items-center justify-between gap-4">

          {/* ── Logo ── */}
          <button
            onClick={() => onNavigate(
              authStatus === 'provider' ? 'provider-dashboard'
              : authStatus === 'customer' ? 'home'
              : 'landing'
            )}
            className="flex items-center gap-2.5 shrink-0"
          >
            <div
              className="h-8 w-8 rounded-lg flex items-center justify-center"
              style={{ background: 'linear-gradient(135deg, var(--color-deep) 0%, var(--color-primary) 100%)' }}
            >
              <Star size={14} className="text-white" strokeWidth={2.5} />
            </div>
            <span
              className="text-base font-extrabold tracking-tight hidden sm:block"
              style={{ fontFamily: 'var(--font-display)', color: 'var(--color-ink)' }}
            >
              AiDER
            </span>
          </button>

          {/* ── Desktop Links ── */}
          <div className="hidden md:flex items-center gap-1">
            {links.map(({ label, screen: s, icon: Icon }: any) => (
              <button
                key={label}
                onClick={() => onNavigate(s)}
                className="flex items-center gap-1.5 px-3.5 py-2 rounded-lg text-sm font-medium transition-all duration-150"
                style={{
                  color: screen === s ? 'var(--color-deep)' : 'var(--color-ink-muted)',
                  background: screen === s ? 'var(--color-primary-light)' : 'transparent',
                  fontFamily: 'var(--font-display)',
                }}
              >
                {Icon && <Icon size={14} strokeWidth={2} />}
                {label}
              </button>
            ))}
          </div>

          {/* ── Right Controls ── */}
          <div className="flex items-center gap-2">
            {authStatus === 'guest' ? (
              <>
                <button
                  onClick={() => onNavigate('login')}
                  className="hidden sm:block px-4 py-2 rounded-lg text-sm font-semibold transition-all"
                  style={{ color: 'var(--color-deep)', fontFamily: 'var(--font-display)' }}
                >
                  Log In
                </button>
                <button
                  onClick={() => onNavigate('signup')}
                  className="px-4 py-2 rounded-lg text-sm font-semibold text-white transition-all hover:opacity-90"
                  style={{ background: 'var(--color-deep)', fontFamily: 'var(--font-display)' }}
                >
                  Get Started
                </button>
              </>
            ) : (
              <>
                {/* Search icon */}
                <button
                  onClick={() => onNavigate('search')}
                  className="h-9 w-9 rounded-lg flex items-center justify-center transition-colors"
                  style={{ color: 'var(--color-ink-muted)', background: 'var(--color-neutral-100)' }}
                >
                  <Search size={16} />
                </button>

                {/* Notification Bell */}
                <button
                  className="h-9 w-9 rounded-lg flex items-center justify-center relative transition-colors"
                  style={{ color: 'var(--color-ink-muted)', background: 'var(--color-neutral-100)' }}
                >
                  <Bell size={16} />
                  <span
                    className="absolute top-1.5 right-1.5 h-2 w-2 rounded-full"
                    style={{ background: 'var(--color-primary)' }}
                  />
                </button>

                {/* Avatar + Profile Dropdown */}
                <div className="relative">
                  <button
                    onClick={() => setProfileOpen(o => !o)}
                    className="h-9 w-9 rounded-lg flex items-center justify-center text-xs font-bold text-white transition-all hover:opacity-90"
                    style={{ background: 'linear-gradient(135deg, var(--color-deep) 0%, #006b4e 100%)' }}
                  >
                    {initials || <User size={15} />}
                  </button>

                  <AnimatePresence>
                    {profileOpen && (
                      <motion.div
                        initial={{ opacity: 0, scale: 0.95, y: -4 }}
                        animate={{ opacity: 1, scale: 1, y: 0 }}
                        exit={{ opacity: 0, scale: 0.95, y: -4 }}
                        transition={{ duration: 0.15 }}
                        className="absolute right-0 top-full mt-2 w-56 rounded-2xl overflow-hidden"
                        style={{
                          background: 'var(--color-surface)',
                          border: '1px solid var(--color-border)',
                          boxShadow: 'var(--shadow-xl)',
                        }}
                        onMouseLeave={() => setProfileOpen(false)}
                      >
                        {/* User info */}
                        <div className="p-4 border-b" style={{ borderColor: 'var(--color-border)' }}>
                          <p className="text-sm font-bold" style={{ color: 'var(--color-ink)', fontFamily: 'var(--font-display)' }}>
                            {user?.name}
                          </p>
                          <p className="text-xs mt-0.5 truncate" style={{ color: 'var(--color-ink-muted)' }}>
                            {user?.email}
                          </p>
                          <span
                            className="inline-block mt-2 px-2 py-0.5 rounded-full text-[10px] font-semibold capitalize"
                            style={{
                              background: authStatus === 'provider' ? 'var(--color-primary-light)' : '#EEF6FF',
                              color: authStatus === 'provider' ? 'var(--color-deep)' : '#2563EB',
                              fontFamily: 'var(--font-display)',
                            }}
                          >
                            {authStatus}
                          </span>
                        </div>

                        {/* Links */}
                        {[
                          { icon: User, label: 'Profile', screen: profileScreen },
                          { icon: Settings, label: 'Settings', screen: settingsScreen as Screen },
                          { icon: HelpCircle, label: 'Help Center', screen: 'help' as Screen },
                        ].map(({ icon: Icon, label, screen: s }) => (
                          <button
                            key={label}
                            onClick={() => { onNavigate(s); setProfileOpen(false); }}
                            className="w-full flex items-center gap-3 px-4 py-2.5 text-sm font-medium transition-colors hover:bg-neutral-50"
                            style={{ color: 'var(--color-ink)', fontFamily: 'var(--font-display)' }}
                          >
                            <Icon size={15} style={{ color: 'var(--color-ink-muted)' }} />
                            {label}
                          </button>
                        ))}

                        <div className="border-t" style={{ borderColor: 'var(--color-border)' }} />
                        <button
                          onClick={() => { /* logout handled by parent */ setProfileOpen(false); }}
                          className="w-full flex items-center gap-3 px-4 py-2.5 text-sm font-medium text-red-500 transition-colors hover:bg-red-50"
                          style={{ fontFamily: 'var(--font-display)' }}
                        >
                          <LogOut size={15} />
                          Sign Out
                        </button>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              </>
            )}

            {/* Mobile Menu Toggle */}
            <button
              className="md:hidden h-9 w-9 rounded-lg flex items-center justify-center transition-colors"
              style={{ color: 'var(--color-ink)', background: 'var(--color-neutral-100)' }}
              onClick={() => setMobileOpen(o => !o)}
            >
              {mobileOpen ? <X size={18} /> : <Menu size={18} />}
            </button>
          </div>
        </div>
      </div>

      {/* ── Mobile Menu Drawer ── */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.2 }}
            className="md:hidden overflow-hidden border-t"
            style={{
              borderColor: 'var(--color-border)',
              background: 'var(--color-surface)',
            }}
          >
            <div className="px-5 py-4 flex flex-col gap-1">
              {links.map(({ label, screen: s, icon: Icon }: any) => (
                <button
                  key={label}
                  onClick={() => { onNavigate(s); setMobileOpen(false); }}
                  className="flex items-center gap-3 px-3 py-3 rounded-xl text-sm font-medium text-left transition-colors"
                  style={{
                    color: screen === s ? 'var(--color-deep)' : 'var(--color-ink)',
                    background: screen === s ? 'var(--color-primary-light)' : 'transparent',
                    fontFamily: 'var(--font-display)',
                  }}
                >
                  {Icon && <Icon size={16} style={{ color: screen === s ? 'var(--color-primary)' : 'var(--color-ink-muted)' }} />}
                  {label}
                </button>
              ))}
              {authStatus === 'guest' && (
                <div className="mt-3 flex gap-2">
                  <button
                    onClick={() => { onNavigate('login'); setMobileOpen(false); }}
                    className="flex-1 py-3 rounded-xl text-sm font-semibold"
                    style={{ border: '1.5px solid var(--color-border)', color: 'var(--color-deep)', fontFamily: 'var(--font-display)' }}
                  >
                    Log In
                  </button>
                  <button
                    onClick={() => { onNavigate('signup'); setMobileOpen(false); }}
                    className="flex-1 py-3 rounded-xl text-sm font-semibold text-white"
                    style={{ background: 'var(--color-deep)', fontFamily: 'var(--font-display)' }}
                  >
                    Get Started
                  </button>
                </div>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};
