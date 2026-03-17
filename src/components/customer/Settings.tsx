import React from 'react';
import { ArrowLeft, Bell, Lock, Languages, Moon, HelpCircle, ShieldCheck, LogOut, ChevronRight } from 'lucide-react';

interface SettingsProps {
  onBack: () => void;
  onLogout: () => void;
}

const SECTIONS = [
  {
    title: 'Preferences',
    items: [
      { id: 'notifications', icon: Bell,      label: 'Notifications', value: 'On',      bg: '#EEF6FF', color: '#2563EB' },
      { id: 'language',      icon: Languages, label: 'Language',      value: 'English', bg: '#FFF4EC', color: '#EA580C' },
      { id: 'appearance',    icon: Moon,      label: 'Dark Mode',     value: 'Off',     bg: '#F3EFFF', color: '#7C3AED' },
    ],
  },
  {
    title: 'Privacy & Security',
    items: [
      { id: 'password', icon: Lock,       label: 'Change Password',  value: '',    bg: '#EEFAEF', color: '#16A34A' },
      { id: '2fa',      icon: ShieldCheck, label: 'Two-Factor Auth', value: 'Off', bg: '#FEF0F9', color: '#DB2777' },
    ],
  },
  {
    title: 'Support',
    items: [
      { id: 'help', icon: HelpCircle, label: 'Help Center', value: '', bg: '#EEF6FF', color: '#2563EB' },
    ],
  },
];

export const Settings = ({ onBack, onLogout }: SettingsProps) => {
  return (
    <div className="pb-28 pt-2 max-w-2xl mx-auto">

      {/* ── Header ── */}
      <header className="flex items-center gap-4 mb-8">
        <button
          onClick={onBack}
          className="h-10 w-10 flex items-center justify-center rounded-xl transition-all hover:bg-[var(--color-neutral-100)] shrink-0"
          style={{ border: '1.5px solid var(--color-border)', color: 'var(--color-ink)' }}
          aria-label="Go back"
        >
          <ArrowLeft size={18} strokeWidth={2} />
        </button>
        <div>
          <p className="text-xs font-semibold uppercase tracking-widest mb-0.5"
            style={{ color: 'var(--color-primary)', fontFamily: 'var(--font-display)' }}>
            App Preferences
          </p>
          <h1 className="text-3xl font-extrabold tracking-tight"
            style={{ color: 'var(--color-ink)', fontFamily: 'var(--font-display)' }}>
            Settings
          </h1>
        </div>
      </header>

      {/* ── Sections ── */}
      <div className="flex flex-col gap-7">
        {SECTIONS.map((section) => (
          <div key={section.title}>
            <p
              className="text-xs font-semibold uppercase tracking-widest mb-3 px-1"
              style={{ color: 'var(--color-ink-muted)', fontFamily: 'var(--font-display)' }}
            >
              {section.title}
            </p>
            <div
              className="rounded-2xl overflow-hidden"
              style={{
                background: 'var(--color-surface)',
                border: '1px solid var(--color-border)',
                boxShadow: 'var(--shadow-xs)',
              }}
            >
              {section.items.map((item, idx) => (
                <button
                  key={item.id}
                  className="group flex w-full items-center justify-between px-5 py-4 transition-colors hover:bg-[var(--color-neutral-50)]"
                  style={{ borderBottom: idx < section.items.length - 1 ? '1px solid var(--color-border)' : 'none' }}
                >
                  <div className="flex items-center gap-4">
                    <div
                      className="h-10 w-10 flex items-center justify-center rounded-xl shrink-0"
                      style={{ background: item.bg }}
                    >
                      <item.icon size={18} style={{ color: item.color }} strokeWidth={1.8} />
                    </div>
                    <span
                      className="text-sm font-semibold"
                      style={{ color: 'var(--color-ink)', fontFamily: 'var(--font-display)' }}
                    >
                      {item.label}
                    </span>
                  </div>
                  <div className="flex items-center gap-3">
                    {item.value && (
                      <span
                        className="text-xs font-medium px-2.5 py-1 rounded-lg"
                        style={{
                          background: 'var(--color-neutral-100)',
                          color: 'var(--color-ink-muted)',
                          fontFamily: 'var(--font-display)',
                        }}
                      >
                        {item.value}
                      </span>
                    )}
                    <ChevronRight
                      size={16}
                      className="transition-transform group-hover:translate-x-0.5"
                      style={{ color: 'var(--color-neutral-400)' }}
                    />
                  </div>
                </button>
              ))}
            </div>
          </div>
        ))}
      </div>

      {/* ── Logout ── */}
      <div className="mt-8">
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
    </div>
  );
};
