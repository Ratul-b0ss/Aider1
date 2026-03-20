import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import {
  LayoutDashboard, Briefcase, BookOpen, Wallet, User,
  Settings, HelpCircle, LogOut, Star, Menu, X, Plus,
  Bell, ChevronRight, TrendingUp, Shield,
} from 'lucide-react';
import { Screen, AuthUser } from '../../types';
import { useProvider } from '../../context/ProviderContext';

interface ProviderSidebarLayoutProps {
  screen: Screen;
  onNavigate: (s: Screen) => void;
  user: AuthUser;
  onLogout: () => void;
  children: React.ReactNode;
}

const SIDEBAR_LINKS = [
  { label: 'Dashboard',    screen: 'provider-dashboard' as Screen,          icon: LayoutDashboard, section: 'main' },
  { label: 'My Services',  screen: 'provider-services' as Screen,           icon: Briefcase,       section: 'main' },
  { label: 'Bookings',     screen: 'provider-bookings' as Screen,           icon: BookOpen,        section: 'main' },
  { label: 'Wallet',       screen: 'provider-wallet' as Screen,             icon: Wallet,          section: 'main' },
  { label: 'Profile',      screen: 'provider-profile' as Screen,            icon: User,            section: 'main' },
  { label: 'Verification', screen: 'provider-verification-wizard' as Screen, icon: Shield,          section: 'tools' },
  { label: 'Post Service', screen: 'provider-gig-create' as Screen,         icon: Plus,            section: 'tools' },
  { label: 'Settings',     screen: 'settings' as Screen,                    icon: Settings,        section: 'bottom' },
  { label: 'Help Center',  screen: 'help' as Screen,                        icon: HelpCircle,      section: 'bottom' },
];

export const ProviderSidebarLayout = ({
  screen, onNavigate, user, onLogout, children,
}: ProviderSidebarLayoutProps) => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const { completionPct, canPostService } = useProvider();

  const initials = user.name.split(' ').map(n => n[0]).join('').slice(0, 2).toUpperCase();

  const mainLinks  = SIDEBAR_LINKS.filter(l => l.section === 'main');
  const toolLinks  = SIDEBAR_LINKS.filter(l => l.section === 'tools');
  const bottomLinks = SIDEBAR_LINKS.filter(l => l.section === 'bottom');

  const SidebarContent = () => (
    <div className="flex flex-col h-full">

      {/* Logo */}
      <div className="flex items-center gap-2.5 px-5 py-5 border-b" style={{ borderColor: 'var(--color-border)' }}>
        <div
          className="h-8 w-8 rounded-lg flex items-center justify-center shrink-0"
          style={{ background: 'linear-gradient(135deg, var(--color-deep) 0%, var(--color-primary) 100%)' }}
        >
          <Star size={14} className="text-white" strokeWidth={2.5} />
        </div>
        <span className="text-base font-extrabold tracking-tight" style={{ fontFamily: 'var(--font-display)', color: 'var(--color-ink)' }}>
          AiDER
        </span>
        <span
          className="ml-auto text-[10px] font-semibold px-2 py-0.5 rounded-full"
          style={{ background: '#D1F843', color: '#005B40', fontFamily: 'var(--font-display)' }}
        >
          PRO
        </span>
      </div>

      {/* Onboarding Gate Progress */}
      {completionPct < 100 && (
        <button
          onClick={() => onNavigate('provider-verification-wizard')}
          className="mx-3 mt-3 p-3 rounded-xl text-left transition-all hover:opacity-90"
          style={{ background: 'linear-gradient(135deg, var(--color-deep) 0%, #006b4e 100%)' }}
        >
          <div className="flex items-center justify-between mb-2">
            <span className="text-xs font-bold text-white" style={{ fontFamily: 'var(--font-display)' }}>
              Complete Your Profile
            </span>
            <ChevronRight size={13} className="text-white opacity-70" />
          </div>
          <div className="h-1.5 rounded-full mb-1.5" style={{ background: 'rgba(255,255,255,0.2)' }}>
            <motion.div
              className="h-full rounded-full"
              style={{ background: 'linear-gradient(90deg, #D1F843 0%, #005B40 100%)' }}
              initial={{ width: 0 }}
              animate={{ width: `${completionPct}%` }}
              transition={{ duration: 1, ease: 'easeOut' }}
            />
          </div>
          <span className="text-[10px]" style={{ color: 'rgba(255,255,255,0.7)' }}>
            {completionPct}% complete — {canPostService ? 'Ready to post!' : 'Unlock all features'}
          </span>
        </button>
      )}

      {/* Nav Links */}
      <nav className="flex-1 px-3 py-4 space-y-0.5 overflow-y-auto">
        {/* Main */}
        <p className="text-[10px] font-semibold uppercase tracking-widest px-3 mb-2" style={{ color: 'var(--color-ink-muted)', fontFamily: 'var(--font-display)' }}>
          Workspace
        </p>
        {mainLinks.map(({ label, screen: s, icon: Icon }) => {
          const isActive = screen === s;
          return (
            <button
              key={s}
              onClick={() => { onNavigate(s); setSidebarOpen(false); }}
              className="w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-all"
              style={{
                color: isActive ? 'var(--color-deep)' : 'var(--color-ink)',
                background: isActive ? 'var(--color-primary-light)' : 'transparent',
                fontFamily: 'var(--font-display)',
              }}
            >
              <Icon
                size={16}
                strokeWidth={isActive ? 2.5 : 1.8}
                style={{ color: isActive ? 'var(--color-primary)' : 'var(--color-neutral-400)' }}
              />
              {label}
              {label === 'Bookings' && (
                <span
                  className="ml-auto text-[10px] font-bold px-1.5 py-0.5 rounded-full"
                  style={{ background: 'var(--color-primary)', color: '#fff' }}
                >
                  3
                </span>
              )}
            </button>
          );
        })}

        {/* Tools */}
        <p className="text-[10px] font-semibold uppercase tracking-widest px-3 mt-5 mb-2" style={{ color: 'var(--color-ink-muted)', fontFamily: 'var(--font-display)' }}>
          Tools
        </p>
        {toolLinks.map(({ label, screen: s, icon: Icon }) => {
          const isActive = screen === s;
          const isLocked = label === 'Post Service' && !canPostService;
          return (
            <button
              key={s}
              onClick={() => {
                if (!isLocked) { onNavigate(s); setSidebarOpen(false); }
              }}
              disabled={isLocked}
              className="w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-all"
              style={{
                color: isLocked ? 'var(--color-neutral-400)' : isActive ? 'var(--color-deep)' : 'var(--color-ink)',
                background: isActive ? 'var(--color-primary-light)' : 'transparent',
                fontFamily: 'var(--font-display)',
                opacity: isLocked ? 0.5 : 1,
                cursor: isLocked ? 'not-allowed' : 'pointer',
              }}
            >
              <Icon size={16} strokeWidth={isActive ? 2.5 : 1.8}
                style={{ color: isLocked ? 'var(--color-neutral-300)' : isActive ? 'var(--color-primary)' : 'var(--color-neutral-400)' }}
              />
              {label}
              {isLocked && (
                <span className="ml-auto text-[9px] font-bold px-1.5 py-0.5 rounded-full" style={{ background: 'var(--color-neutral-200)', color: 'var(--color-neutral-500)' }}>
                  LOCKED
                </span>
              )}
            </button>
          );
        })}
      </nav>

      {/* Bottom */}
      <div className="px-3 pb-4 space-y-0.5 border-t pt-3" style={{ borderColor: 'var(--color-border)' }}>
        {bottomLinks.map(({ label, screen: s, icon: Icon }) => (
          <button
            key={s}
            onClick={() => { onNavigate(s); setSidebarOpen(false); }}
            className="w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-all hover:bg-neutral-50"
            style={{ color: 'var(--color-ink-muted)', fontFamily: 'var(--font-display)' }}
          >
            <Icon size={15} style={{ color: 'var(--color-neutral-400)' }} />
            {label}
          </button>
        ))}
        <button
          onClick={onLogout}
          className="w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-all hover:bg-red-50"
          style={{ color: '#ef4444', fontFamily: 'var(--font-display)' }}
        >
          <LogOut size={15} />
          Sign Out
        </button>
      </div>

      {/* Provider Avatar Card */}
      <div
        className="mx-3 mb-4 p-3 rounded-xl flex items-center gap-3"
        style={{ background: 'var(--color-neutral-50)', border: '1px solid var(--color-border)' }}
      >
        <div
          className="h-9 w-9 rounded-lg flex items-center justify-center text-xs font-bold text-white shrink-0"
          style={{ background: 'linear-gradient(135deg, var(--color-deep) 0%, var(--color-primary) 100%)' }}
        >
          {initials}
        </div>
        <div className="flex-1 min-w-0">
          <p className="text-sm font-bold truncate" style={{ color: 'var(--color-ink)', fontFamily: 'var(--font-display)' }}>
            {user.name}
          </p>
          <p className="text-[11px] truncate" style={{ color: 'var(--color-ink-muted)' }}>
            {user.email}
          </p>
        </div>
      </div>
    </div>
  );

  return (
    <div className="flex min-h-screen" style={{ background: 'var(--color-background)' }}>

      {/* ── Desktop Sidebar ── */}
      <aside
        className="hidden lg:flex flex-col w-60 shrink-0 sticky top-0 h-screen overflow-y-auto"
        style={{
          background: 'var(--color-surface)',
          borderRight: '1px solid var(--color-border)',
          boxShadow: 'var(--shadow-sm)',
        }}
      >
        <SidebarContent />
      </aside>

      {/* ── Mobile Sidebar Overlay ── */}
      <AnimatePresence>
        {sidebarOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="lg:hidden fixed inset-0 z-40"
              style={{ background: 'rgba(0,0,0,0.4)', backdropFilter: 'blur(4px)' }}
              onClick={() => setSidebarOpen(false)}
            />
            <motion.aside
              initial={{ x: -280 }}
              animate={{ x: 0 }}
              exit={{ x: -280 }}
              transition={{ type: 'spring', stiffness: 300, damping: 30 }}
              className="lg:hidden fixed left-0 top-0 bottom-0 w-64 z-50 flex flex-col overflow-y-auto"
              style={{
                background: 'var(--color-surface)',
                boxShadow: 'var(--shadow-2xl)',
              }}
            >
              <SidebarContent />
            </motion.aside>
          </>
        )}
      </AnimatePresence>

      {/* ── Main Content Area ── */}
      <div className="flex-1 flex flex-col min-w-0">

        {/* ── Mobile Top Bar ── */}
        <header
          className="lg:hidden sticky top-0 z-30 flex items-center gap-3 px-5 h-14"
          style={{
            background: 'rgba(255,255,255,0.95)',
            backdropFilter: 'blur(20px)',
            borderBottom: '1px solid var(--color-border)',
          }}
        >
          <button
            onClick={() => setSidebarOpen(true)}
            className="h-8 w-8 rounded-lg flex items-center justify-center"
            style={{ color: 'var(--color-ink)', background: 'var(--color-neutral-100)' }}
          >
            <Menu size={16} />
          </button>

          <div className="flex items-center gap-2">
            <div
              className="h-6 w-6 rounded-md flex items-center justify-center"
              style={{ background: 'linear-gradient(135deg, var(--color-deep) 0%, var(--color-primary) 100%)' }}
            >
              <Star size={11} className="text-white" strokeWidth={2.5} />
            </div>
            <span className="text-sm font-extrabold" style={{ fontFamily: 'var(--font-display)', color: 'var(--color-ink)' }}>
              AiDER
            </span>
          </div>

          <div className="ml-auto flex items-center gap-2">
            <button
              className="h-8 w-8 rounded-lg flex items-center justify-center relative"
              style={{ background: 'var(--color-neutral-100)', color: 'var(--color-ink-muted)' }}
            >
              <Bell size={14} />
              <span className="absolute top-1 right-1 h-1.5 w-1.5 rounded-full" style={{ background: 'var(--color-primary)' }} />
            </button>
          </div>
        </header>

        {/* ── Real-time Stats Bar (Desktop) ── */}
        <div
          className="hidden lg:flex items-center gap-6 px-6 py-2.5 border-b"
          style={{
            background: 'linear-gradient(90deg, var(--color-deep) 0%, #005840 100%)',
            borderColor: 'transparent',
          }}
        >
          {[
            { label: 'This Month', value: '$2,450', icon: TrendingUp },
            { label: 'Avg Rating', value: '4.9 ★', icon: Star },
            { label: 'Active Jobs', value: '3', icon: BookOpen },
            { label: 'Profile', value: `${completionPct}%`, icon: User },
          ].map(({ label, value, icon: Icon }) => (
            <div key={label} className="flex items-center gap-2">
              <Icon size={12} className="text-white opacity-60" />
              <span className="text-[11px]" style={{ color: 'rgba(255,255,255,0.6)', fontFamily: 'var(--font-display)' }}>
                {label}:
              </span>
              <span className="text-[11px] font-bold text-white" style={{ fontFamily: 'var(--font-display)' }}>
                {value}
              </span>
            </div>
          ))}
          <div className="ml-auto flex items-center gap-2">
            <button
              onClick={() => onNavigate('provider-gig-create')}
              className="flex items-center gap-1.5 px-3 py-1 rounded-lg text-[11px] font-semibold transition-all hover:opacity-90"
              style={{
                background: canPostService ? 'var(--color-primary)' : 'rgba(255,255,255,0.1)',
                color: canPostService ? '#fff' : 'rgba(255,255,255,0.5)',
                fontFamily: 'var(--font-display)',
                cursor: canPostService ? 'pointer' : 'not-allowed',
              }}
            >
              <Plus size={11} />
              Post Service
            </button>
            <Bell size={13} className="text-white opacity-60 ml-1" />
          </div>
        </div>

        {/* ── Page Content ── */}
        <main className="flex-1 overflow-auto">
          <div className="mx-auto max-w-5xl px-5 lg:px-8 py-6 pb-24 lg:pb-8">
            {children}
          </div>
        </main>
      </div>
    </div>
  );
};
