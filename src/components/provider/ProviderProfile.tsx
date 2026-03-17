import React from 'react';
import { Settings as SettingsIcon, CreditCard, ShieldCheck, LogOut, ChevronRight, Store, MapPin, Star, Clock, Briefcase, Camera } from 'lucide-react';
import { Screen } from '../../types';

interface ProviderProfileProps {
  onLogout: () => void;
  onNavigate: (s: Screen) => void;
}

const MENU_ITEMS = [
  { id: 'business',  name: 'Business Details',  icon: Store,        bg: '#EEF6FF', color: '#2563EB' },
  { id: 'services',  name: 'Manage Services',   icon: Briefcase,    bg: '#FFF4EC', color: '#EA580C' },
  { id: 'payouts',   name: 'Payout Settings',   icon: CreditCard,   bg: '#EEFAEF', color: '#16A34A' },
  { id: 'security',  name: 'Security & Privacy', icon: ShieldCheck, bg: '#F3EFFF', color: '#7C3AED' },
  { id: 'settings',  name: 'App Settings',      icon: SettingsIcon, bg: '#FEF0F9', color: '#DB2777' },
];

const STATS = [
  { label: 'Total Jobs',  value: '458',   color: '#2563EB', bg: '#EEF6FF' },
  { label: 'Completion',  value: '98%',   color: '#16A34A', bg: '#EEFAEF' },
  { label: 'Response',    value: '< 1hr', color: '#EA580C', bg: '#FFF4EC' },
  { label: 'Badges',      value: '12',    color: '#7C3AED', bg: '#F3EFFF' },
];

export const ProviderProfile = ({ onLogout, onNavigate }: ProviderProfileProps) => {
  return (
    <div className="pb-28 pt-2 max-w-3xl mx-auto">

      {/* ── Header ── */}
      <header className="mb-8">
        <p className="text-xs font-semibold uppercase tracking-widest mb-1.5"
          style={{ color: 'var(--color-primary)', fontFamily: 'var(--font-display)' }}>
          Business Profile
        </p>
        <h1 className="text-3xl md:text-4xl font-extrabold tracking-tight"
          style={{ color: 'var(--color-ink)', fontFamily: 'var(--font-display)' }}>
          Profile
        </h1>
      </header>

      {/* ── Business Card ── */}
      <section
        className="rounded-2xl p-6 md:p-8 mb-6 relative overflow-hidden"
        style={{
          background: 'linear-gradient(140deg, var(--color-deep) 0%, #005840 60%, #006b4e 100%)',
          boxShadow: 'var(--shadow-xl)',
        }}
      >
        <div className="absolute -right-16 -top-16 h-48 w-48 rounded-full pointer-events-none"
          style={{ background: 'rgba(132,183,1,0.12)', filter: 'blur(40px)' }} />

        <div className="relative z-10 flex flex-col sm:flex-row items-center sm:items-start gap-5">
          {/* Avatar */}
          <div className="relative shrink-0">
            <div
              className="h-20 w-20 rounded-2xl overflow-hidden"
              style={{ border: '2px solid rgba(255,255,255,0.2)' }}
            >
              <img
                src="https://api.dicebear.com/7.x/initials/svg?seed=SparklePros"
                alt="Business"
                className="h-full w-full object-cover"
                referrerPolicy="no-referrer"
              />
            </div>
            <button
              className="absolute -bottom-1.5 -right-1.5 h-7 w-7 rounded-xl flex items-center justify-center"
              style={{ background: 'var(--color-primary)', boxShadow: 'var(--shadow-md)' }}
              aria-label="Change logo"
            >
              <Camera size={13} className="text-white" />
            </button>
          </div>

          {/* Info */}
          <div className="flex-1 text-center sm:text-left">
            <h2 className="text-xl font-extrabold text-white" style={{ fontFamily: 'var(--font-display)' }}>
              Sparkle Pros
            </h2>
            <div className="flex items-center justify-center sm:justify-start gap-1.5 mt-0.5" style={{ color: 'rgba(255,255,255,0.6)' }}>
              <MapPin size={13} />
              <span className="text-sm">San Francisco, CA</span>
            </div>
            <div className="flex flex-wrap justify-center sm:justify-start gap-2 mt-4">
              <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg"
                style={{ background: 'rgba(255,255,255,0.12)' }}>
                <Star size={12} style={{ color: 'var(--color-primary)' }} className="fill-current" />
                <span className="text-xs font-semibold text-white" style={{ fontFamily: 'var(--font-display)' }}>
                  4.9 · 124 Reviews
                </span>
              </div>
              <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg"
                style={{ background: 'rgba(255,255,255,0.12)' }}>
                <Clock size={12} style={{ color: 'rgba(255,255,255,0.6)' }} />
                <span className="text-xs font-semibold text-white" style={{ fontFamily: 'var(--font-display)' }}>
                  Active 2 Years
                </span>
              </div>
            </div>
          </div>

          <button
            className="shrink-0 px-5 py-2.5 rounded-xl text-sm font-semibold transition-all hover:opacity-90"
            style={{
              border: '1.5px solid rgba(255,255,255,0.35)',
              color: 'rgba(255,255,255,0.9)',
              fontFamily: 'var(--font-display)',
            }}
          >
            Edit Profile
          </button>
        </div>
      </section>

      {/* ── Stats ── */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-6">
        {STATS.map((stat, idx) => (
          <div
            key={idx}
            className="p-5 rounded-2xl text-center"
            style={{ background: stat.bg, border: `1px solid ${stat.color}20` }}
          >
            <p className="text-2xl font-extrabold" style={{ color: stat.color, fontFamily: 'var(--font-display)' }}>
              {stat.value}
            </p>
            <p className="text-xs font-medium mt-1" style={{ color: stat.color, fontFamily: 'var(--font-display)', opacity: 0.75 }}>
              {stat.label}
            </p>
          </div>
        ))}
      </div>

      {/* ── Menu ── */}
      <div
        className="rounded-2xl overflow-hidden mb-6"
        style={{
          background: 'var(--color-surface)',
          border: '1px solid var(--color-border)',
          boxShadow: 'var(--shadow-xs)',
        }}
      >
        {MENU_ITEMS.map((item, idx) => (
          <button
            key={item.id}
            onClick={() => onNavigate(item.id as Screen)}
            className="group flex w-full items-center justify-between px-5 py-4 transition-colors hover:bg-[var(--color-neutral-50)]"
            style={{ borderBottom: idx < MENU_ITEMS.length - 1 ? '1px solid var(--color-border)' : 'none' }}
          >
            <div className="flex items-center gap-4">
              <div
                className="h-10 w-10 flex items-center justify-center rounded-xl shrink-0"
                style={{ background: item.bg }}
              >
                <item.icon size={18} style={{ color: item.color }} strokeWidth={1.8} />
              </div>
              <span className="text-sm font-semibold" style={{ color: 'var(--color-ink)', fontFamily: 'var(--font-display)' }}>
                {item.name}
              </span>
            </div>
            <ChevronRight
              size={17}
              className="transition-transform group-hover:translate-x-0.5"
              style={{ color: 'var(--color-neutral-400)' }}
            />
          </button>
        ))}
      </div>

      {/* ── Logout ── */}
      <button
        onClick={onLogout}
        className="w-full flex items-center justify-center gap-2 py-3.5 rounded-2xl text-sm font-semibold transition-all hover:opacity-90"
        style={{
          background: '#FEF2F2',
          color: '#DC2626',
          border: '1px solid #FECACA',
          fontFamily: 'var(--font-display)',
        }}
      >
        <LogOut size={17} strokeWidth={2} />
        Sign Out
      </button>
    </div>
  );
};
