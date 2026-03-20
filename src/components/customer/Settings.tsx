import React, { useState } from 'react';
import { motion } from 'motion/react';
import {
  User, Bell, Shield, CreditCard, MapPin, Moon, ChevronRight,
  LogOut, Camera, Lock, Globe, Trash2, CheckCircle,
} from 'lucide-react';
import { Screen, AuthUser } from '../../types';

interface SettingsProps {
  onNavigate: (s: Screen) => void;
  onLogout: () => void;
  user: AuthUser;
}

const SETTING_SECTIONS = [
  {
    title: 'Account',
    items: [
      { icon: User,       label: 'Edit Profile',       desc: 'Name, email, phone' },
      { icon: Camera,     label: 'Profile Photo',      desc: 'Change your picture' },
      { icon: Lock,       label: 'Change Password',    desc: 'Update security' },
    ],
  },
  {
    title: 'Notifications',
    items: [
      { icon: Bell,       label: 'Push Notifications', desc: 'Booking alerts, offers', toggle: true, defaultOn: true },
      { icon: Globe,      label: 'Email Notifications',desc: 'Newsletter, updates',    toggle: true, defaultOn: false },
    ],
  },
  {
    title: 'Preferences',
    items: [
      { icon: CreditCard, label: 'Payment Methods',    desc: 'Manage cards & billing' },
      { icon: MapPin,     label: 'Saved Addresses',    desc: 'Home, work, other' },
      { icon: Moon,       label: 'Dark Mode',          desc: 'System, light, dark',    toggle: true, defaultOn: false },
    ],
  },
  {
    title: 'Privacy & Security',
    items: [
      { icon: Shield,     label: 'Two-Factor Auth',    desc: 'SMS or authenticator app', toggle: true, defaultOn: false },
      { icon: Globe,      label: 'Privacy Policy',     desc: 'Review our data practices' },
    ],
  },
];

export const Settings = ({ onNavigate, onLogout, user }: SettingsProps) => {
  const [toggles, setToggles] = useState<Record<string, boolean>>({
    'Push Notifications': true,
    'Email Notifications': false,
    'Dark Mode': false,
    'Two-Factor Auth': false,
  });
  const [saved, setSaved] = useState(false);

  const flip = (label: string) => setToggles(t => ({ ...t, [label]: !t[label] }));

  const initials = user.name.split(' ').map(n => n[0]).join('').slice(0, 2).toUpperCase();

  return (
    <div className="space-y-5">
      {/* ── Header ── */}
      <div>
        <p className="text-xs font-semibold uppercase tracking-widest mb-1" style={{ color: 'var(--color-primary)', fontFamily: 'var(--font-display)' }}>
          Preferences
        </p>
        <h1 className="text-2xl font-extrabold" style={{ color: 'var(--color-ink)', fontFamily: 'var(--font-display)' }}>
          Settings
        </h1>
      </div>

      {/* ── User Info Card ── */}
      <div
        className="flex items-center gap-4 p-4 rounded-2xl"
        style={{ background: 'var(--color-neutral-50)', border: '1px solid var(--color-border)' }}
      >
        <div
          className="h-12 w-12 rounded-xl flex items-center justify-center text-sm font-bold text-white shrink-0"
          style={{ background: 'linear-gradient(135deg, var(--color-deep) 0%, var(--color-primary) 100%)' }}
        >
          {initials}
        </div>
        <div>
          <p className="text-sm font-bold" style={{ color: 'var(--color-ink)', fontFamily: 'var(--font-display)' }}>{user.name}</p>
          <p className="text-xs" style={{ color: 'var(--color-ink-muted)' }}>{user.email}</p>
        </div>
        <span
          className="ml-auto text-[10px] font-bold px-2.5 py-1 rounded-full capitalize"
          style={{ background: 'var(--color-primary-light)', color: 'var(--color-deep)', fontFamily: 'var(--font-display)' }}
        >
          {user.role}
        </span>
      </div>

      {/* ── Setting Sections ── */}
      {SETTING_SECTIONS.map(section => (
        <div key={section.title}>
          <p className="text-xs font-semibold uppercase tracking-widest mb-2 px-1" style={{ color: 'var(--color-ink-muted)', fontFamily: 'var(--font-display)' }}>
            {section.title}
          </p>
          <div className="rounded-2xl overflow-hidden" style={{ background: 'var(--color-surface)', border: '1px solid var(--color-border)' }}>
            {section.items.map(({ icon: Icon, label, desc, toggle, defaultOn }, i) => (
              <div
                key={label}
                className="flex items-center gap-3 px-4 py-3.5 border-b last:border-0 transition-colors hover:bg-neutral-50 cursor-pointer"
                style={{ borderColor: 'var(--color-border)' }}
                onClick={() => toggle ? flip(label) : undefined}
              >
                <div className="h-9 w-9 rounded-xl flex items-center justify-center shrink-0" style={{ background: 'var(--color-neutral-50)' }}>
                  <Icon size={15} style={{ color: 'var(--color-ink-muted)' }} />
                </div>
                <div className="flex-1">
                  <p className="text-sm font-semibold" style={{ color: 'var(--color-ink)', fontFamily: 'var(--font-display)' }}>{label}</p>
                  <p className="text-xs" style={{ color: 'var(--color-ink-muted)' }}>{desc}</p>
                </div>
                {toggle ? (
                  <div
                    className="relative h-5 w-9 rounded-full cursor-pointer transition-all shrink-0"
                    style={{ background: toggles[label] ? 'var(--color-primary)' : 'var(--color-neutral-200)' }}
                  >
                    <div
                      className="absolute top-0.5 h-4 w-4 rounded-full bg-white shadow transition-all duration-200"
                      style={{ left: toggles[label] ? '18px' : '2px' }}
                    />
                  </div>
                ) : (
                  <ChevronRight size={15} style={{ color: 'var(--color-neutral-300)' }} className="shrink-0" />
                )}
              </div>
            ))}
          </div>
        </div>
      ))}

      {/* ── Danger Zone ── */}
      <div>
        <p className="text-xs font-semibold uppercase tracking-widest mb-2 px-1" style={{ color: '#EF4444', fontFamily: 'var(--font-display)' }}>
          Danger Zone
        </p>
        <div className="rounded-2xl overflow-hidden" style={{ background: 'var(--color-surface)', border: '1px solid #FECACA' }}>
          <button className="w-full flex items-center gap-3 px-4 py-3.5 text-left transition-colors hover:bg-red-50 border-b" style={{ borderColor: '#FECACA' }}>
            <div className="h-9 w-9 rounded-xl flex items-center justify-center shrink-0" style={{ background: '#FEF2F2' }}>
              <Trash2 size={15} style={{ color: '#EF4444' }} />
            </div>
            <div>
              <p className="text-sm font-semibold" style={{ color: '#EF4444', fontFamily: 'var(--font-display)' }}>Delete Account</p>
              <p className="text-xs" style={{ color: 'var(--color-ink-muted)' }}>Permanently remove all data</p>
            </div>
          </button>
          <button
            onClick={onLogout}
            className="w-full flex items-center gap-3 px-4 py-3.5 text-left transition-colors hover:bg-red-50"
          >
            <div className="h-9 w-9 rounded-xl flex items-center justify-center shrink-0" style={{ background: '#FEF2F2' }}>
              <LogOut size={15} style={{ color: '#EF4444' }} />
            </div>
            <div>
              <p className="text-sm font-semibold" style={{ color: '#EF4444', fontFamily: 'var(--font-display)' }}>Sign Out</p>
              <p className="text-xs" style={{ color: 'var(--color-ink-muted)' }}>Log out of your account</p>
            </div>
          </button>
        </div>
      </div>

      {saved && (
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex items-center gap-2 p-3 rounded-xl"
          style={{ background: 'var(--color-primary-light)', border: '1px solid var(--color-primary)' }}
        >
          <CheckCircle size={14} style={{ color: 'var(--color-primary)' }} />
          <span className="text-xs font-semibold" style={{ color: 'var(--color-deep)', fontFamily: 'var(--font-display)' }}>
            Settings saved successfully
          </span>
        </motion.div>
      )}
    </div>
  );
};
