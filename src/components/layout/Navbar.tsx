import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import {
  Bell, Menu, X, Settings, LogOut, User,
  HelpCircle, Home, BookOpen, Search, Star,
} from 'lucide-react';
import { Screen, AuthUser } from '../../types';

type AuthStatus = 'guest' | 'customer' | 'provider';

interface NavbarProps {
  screen: Screen;
  onNavigate: (s: Screen) => void;
  authStatus: AuthStatus;
  user: AuthUser | null;
  onLogout?: () => void;
}

// ── Customer-only essential links ─────────────────────────────────────────────
const CUSTOMER_LINKS = [
  { label: 'Home',        screen: 'home'     as Screen, icon: Home },
  { label: 'My Bookings', screen: 'bookings' as Screen, icon: BookOpen },
  { label: 'Profile',     screen: 'profile'  as Screen, icon: User },
];

export const Navbar = ({ screen, onNavigate, authStatus, user, onLogout }: NavbarProps) => {
  // Providers never see this navbar — rendered null below
  if (authStatus === 'provider') return null;

  return <NavbarInner screen={screen} onNavigate={onNavigate} authStatus={authStatus} user={user} onLogout={onLogout} />;
};

// ── Inner impl (only guest + customer) ───────────────────────────────────────
const NavbarInner = ({ screen, onNavigate, authStatus, user, onLogout }: NavbarProps) => {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [profileOpen, setProfileOpen] = useState(false);

  const initials = user
    ? user.name.split(' ').map(n => n[0]).join('').slice(0, 2).toUpperCase()
    : '';

  // Solid white — never transparent, always sticky
  const navStyle: React.CSSProperties = {
    background: '#ffffff',
    borderBottom: '1px solid #e5e7eb',
    boxShadow: '0 1px 3px rgba(0,0,0,0.06)',
  };

  return (
    <nav className="sticky top-0 z-50 w-full" style={navStyle}>
      <div className="mx-auto max-w-7xl px-5 lg:px-8">
        <div className="flex h-16 items-center justify-between gap-4">

          {/* ── Logo ── */}
          <button
            onClick={() => onNavigate(authStatus === 'customer' ? 'home' : 'landing')}
            className="flex items-center gap-2.5 shrink-0"
          >
            <div
              className="h-8 w-8 rounded-lg flex items-center justify-center"
              style={{ background: 'linear-gradient(135deg, #005B40 0%, #00a86b 100%)' }}
            >
              <Star size={14} className="text-white" strokeWidth={2.5} />
            </div>
            <span
              className="text-base font-extrabold tracking-tight hidden sm:block"
              style={{ fontFamily: 'var(--font-display)', color: '#111827', letterSpacing: '-0.02em' }}
            >
              AiDER
            </span>
          </button>

          {/* ── Desktop Links (Customer only) ── */}
          {authStatus === 'customer' && (
            <div className="hidden md:flex items-center gap-1">
              {CUSTOMER_LINKS.map(({ label, screen: s, icon: Icon }) => (
                <button
                  key={label}
                  onClick={() => onNavigate(s)}
                  className="flex items-center gap-1.5 px-3.5 py-2 rounded-lg text-sm font-medium transition-all duration-150"
                  style={{
                    color: screen === s ? '#005B40' : '#6b7280',
                    background: screen === s ? '#e6f5f0' : 'transparent',
                    fontFamily: 'var(--font-display)',
                  }}
                >
                  <Icon size={14} strokeWidth={2} />
                  {label}
                </button>
              ))}
            </div>
          )}

          {/* ── Right Controls ── */}
          <div className="flex items-center gap-2">

            {/* ─── GUEST: simple Log In + Sign Up ─── */}
            {authStatus === 'guest' && (
              <>
                <button
                  onClick={() => onNavigate('login')}
                  className="hidden sm:block px-4 py-2 rounded-lg text-sm font-semibold transition-colors hover:bg-gray-50"
                  style={{ color: '#374151', border: '1px solid #d1d5db', fontFamily: 'var(--font-display)' }}
                >
                  Log In
                </button>
                <button
                  onClick={() => onNavigate('signup')}
                  className="px-4 py-2 rounded-lg text-sm font-semibold transition-all hover:bg-gray-800"
                  style={{
                    background: '#111827',
                    color: '#ffffff',
                    fontFamily: 'var(--font-display)',
                  }}
                >
                  Sign Up
                </button>
              </>
            )}

            {/* ─── CUSTOMER: search + bell + avatar ─── */}
            {authStatus === 'customer' && (
              <>
                {/* Search */}
                <button
                  onClick={() => onNavigate('search')}
                  className="h-9 w-9 rounded-lg flex items-center justify-center transition-colors hover:bg-gray-100"
                  style={{ color: '#6b7280', background: '#f3f4f6' }}
                >
                  <Search size={16} />
                </button>

                {/* Bell */}
                <button
                  className="h-9 w-9 rounded-lg flex items-center justify-center relative transition-colors hover:bg-gray-100"
                  style={{ color: '#6b7280', background: '#f3f4f6' }}
                >
                  <Bell size={16} />
                  <span className="absolute top-1.5 right-1.5 h-2 w-2 rounded-full bg-green-500" />
                </button>

                {/* Avatar dropdown */}
                <div className="relative">
                  <button
                    onClick={() => setProfileOpen(o => !o)}
                    className="h-9 w-9 rounded-lg flex items-center justify-center text-xs font-bold text-white transition-all hover:opacity-90"
                    style={{ background: 'linear-gradient(135deg, #005B40 0%, #006b4e 100%)' }}
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
                          background: '#ffffff',
                          border: '1px solid #e5e7eb',
                          boxShadow: '0 20px 40px -8px rgba(0,0,0,0.15)',
                        }}
                        onMouseLeave={() => setProfileOpen(false)}
                      >
                        {/* User info */}
                        <div className="p-4 border-b border-gray-100">
                          <p className="text-sm font-bold text-gray-900" style={{ fontFamily: 'var(--font-display)' }}>
                            {user?.name}
                          </p>
                          <p className="text-xs mt-0.5 truncate text-gray-500">{user?.email}</p>
                          <span
                            className="inline-block mt-2 px-2 py-0.5 rounded-full text-[10px] font-semibold"
                            style={{ background: '#e6f5f0', color: '#005B40', fontFamily: 'var(--font-display)' }}
                          >
                            customer
                          </span>
                        </div>

                        {[
                          { icon: User,       label: 'Profile',    screen: 'profile'   as Screen },
                          { icon: Settings,   label: 'Settings',   screen: 'settings'  as Screen },
                          { icon: HelpCircle, label: 'Help Center', screen: 'help'     as Screen },
                        ].map(({ icon: Icon, label, screen: s }) => (
                          <button
                            key={label}
                            onClick={() => { onNavigate(s); setProfileOpen(false); }}
                            className="w-full flex items-center gap-3 px-4 py-2.5 text-sm font-medium transition-colors hover:bg-gray-50 text-gray-700"
                            style={{ fontFamily: 'var(--font-display)' }}
                          >
                            <Icon size={15} className="text-gray-400" />
                            {label}
                          </button>
                        ))}

                        <div className="border-t border-gray-100" />
                        <button
                          onClick={() => { setProfileOpen(false); onLogout?.(); }}
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
              className="md:hidden h-9 w-9 rounded-lg flex items-center justify-center transition-colors hover:bg-gray-100"
              style={{ color: '#374151', background: '#f3f4f6' }}
              onClick={() => setMobileOpen(o => !o)}
            >
              {mobileOpen ? <X size={18} /> : <Menu size={18} />}
            </button>
          </div>
        </div>
      </div>

      {/* ── Mobile Drawer ── */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.2 }}
            className="md:hidden overflow-hidden border-t border-gray-100"
            style={{ background: '#ffffff' }}
          >
            <div className="px-5 py-4 flex flex-col gap-1">
              {authStatus === 'customer' && CUSTOMER_LINKS.map(({ label, screen: s, icon: Icon }) => (
                <button
                  key={label}
                  onClick={() => { onNavigate(s); setMobileOpen(false); }}
                  className="flex items-center gap-3 px-3 py-3 rounded-xl text-sm font-medium text-left transition-colors"
                  style={{
                    color: screen === s ? '#005B40' : '#374151',
                    background: screen === s ? '#e6f5f0' : 'transparent',
                    fontFamily: 'var(--font-display)',
                  }}
                >
                  <Icon size={16} style={{ color: screen === s ? '#005B40' : '#9ca3af' }} />
                  {label}
                </button>
              ))}

              {authStatus === 'guest' && (
                <div className="flex gap-2 mt-1">
                  <button
                    onClick={() => { onNavigate('login'); setMobileOpen(false); }}
                    className="flex-1 py-3 rounded-xl text-sm font-semibold transition-colors hover:bg-gray-50"
                    style={{ border: '1px solid #d1d5db', color: '#374151', fontFamily: 'var(--font-display)' }}
                  >
                    Log In
                  </button>
                  <button
                    onClick={() => { onNavigate('signup'); setMobileOpen(false); }}
                    className="flex-1 py-3 rounded-xl text-sm font-semibold text-white transition-all hover:bg-gray-800"
                    style={{ background: '#111827', fontFamily: 'var(--font-display)' }}
                  >
                    Sign Up
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
