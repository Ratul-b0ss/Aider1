import React from 'react';
import { motion } from 'motion/react';
import {
  User, Settings, LogOut, Star, ChevronRight, MapPin,
  Calendar, Shield, BookOpen, Heart, Bell, CreditCard,
} from 'lucide-react';
import { Screen, AuthUser } from '../../types';

interface ProfileProps {
  onNavigate: (s: Screen) => void;
  onLogout: () => void;
  user: AuthUser;
}

const QUICK_ACTIONS = [
  { icon: BookOpen,  label: 'My Bookings',  screen: 'bookings' as Screen,  color: '#2563EB', bg: '#EEF6FF' },
  { icon: Heart,     label: 'Saved',        screen: 'services' as Screen,  color: '#DB2777', bg: '#FEF0F9' },
  { icon: Star,      label: 'Reviews',      screen: 'bookings' as Screen,  color: '#CA8A04', bg: '#FEFCE8' },
];

export const Profile = ({ onNavigate, onLogout, user }: ProfileProps) => {
  const initials = user.name.split(' ').map(n => n[0]).join('').slice(0, 2).toUpperCase();

  return (
    <div className="space-y-5">
      {/* ── Header Card ── */}
      <motion.div
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        className="relative rounded-2xl overflow-hidden p-6"
        style={{ background: 'linear-gradient(135deg, var(--color-deep) 0%, #006b4e 100%)' }}
      >
        <div className="absolute -top-10 -right-10 h-40 w-40 rounded-full opacity-10"
          style={{ background: 'var(--color-primary)', filter: 'blur(30px)' }} />
        <div className="relative flex items-center gap-4">
          <div
            className="h-16 w-16 rounded-2xl flex items-center justify-center text-xl font-extrabold text-white shrink-0"
            style={{ background: 'rgba(255,255,255,0.15)', backdropFilter: 'blur(10px)' }}
          >
            {initials}
          </div>
          <div className="flex-1">
            <h2 className="text-xl font-extrabold text-white" style={{ fontFamily: 'var(--font-display)' }}>
              {user.name}
            </h2>
            <p className="text-sm" style={{ color: 'rgba(255,255,255,0.65)' }}>{user.email}</p>
            <div className="flex items-center gap-2 mt-1.5">
              <div className="flex items-center gap-1">
                <Star size={12} style={{ color: 'var(--color-primary)' }} className="fill-current" />
                <span className="text-xs font-semibold text-white">4.9</span>
              </div>
              <span className="text-xs" style={{ color: 'rgba(255,255,255,0.5)' }}>·</span>
              <span className="text-xs" style={{ color: 'rgba(255,255,255,0.65)' }}>12 bookings</span>
            </div>
          </div>
          <button
            onClick={() => onNavigate('settings')}
            className="h-9 w-9 rounded-lg flex items-center justify-center shrink-0"
            style={{ background: 'rgba(255,255,255,0.1)' }}
          >
            <Settings size={15} className="text-white" />
          </button>
        </div>
      </motion.div>

      {/* ── Quick Actions ── */}
      <div className="grid grid-cols-3 gap-3">
        {QUICK_ACTIONS.map(({ icon: Icon, label, screen, color, bg }, idx) => (
          <motion.button
            key={label}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: idx * 0.08 }}
            onClick={() => onNavigate(screen)}
            className="flex flex-col items-center gap-2 p-4 rounded-2xl transition-all hover:-translate-y-0.5"
            style={{ background: bg, border: `1px solid ${color}20` }}
          >
            <div className="h-10 w-10 rounded-xl flex items-center justify-center" style={{ background: `${color}15` }}>
              <Icon size={18} style={{ color }} strokeWidth={1.8} />
            </div>
            <span className="text-[11px] font-semibold" style={{ color, fontFamily: 'var(--font-display)' }}>{label}</span>
          </motion.button>
        ))}
      </div>

      {/* ── Settings List ── */}
      <div className="rounded-2xl overflow-hidden" style={{ background: 'var(--color-surface)', border: '1px solid var(--color-border)', boxShadow: 'var(--shadow-xs)' }}>
        {[
          { icon: User,       label: 'Edit Profile',         screen: 'settings' as Screen,  desc: 'Name, photo, bio' },
          { icon: Bell,       label: 'Notifications',        screen: 'settings' as Screen,  desc: 'Push, email alerts' },
          { icon: CreditCard, label: 'Payment Methods',      screen: 'settings' as Screen,  desc: 'Cards & billing' },
          { icon: Shield,     label: 'Security',             screen: 'settings' as Screen,  desc: 'Password, 2FA' },
          { icon: MapPin,     label: 'Saved Addresses',      screen: 'settings' as Screen,  desc: 'Home, work...' },
          { icon: BookOpen,   label: 'Help Center',          screen: 'help' as Screen,       desc: 'FAQs & support' },
        ].map(({ icon: Icon, label, screen, desc }, i) => (
          <button
            key={label}
            onClick={() => onNavigate(screen)}
            className="w-full flex items-center gap-3 px-4 py-3.5 text-left transition-colors hover:bg-neutral-50 border-b last:border-0"
            style={{ borderColor: 'var(--color-border)' }}
          >
            <div className="h-9 w-9 rounded-xl flex items-center justify-center shrink-0"
              style={{ background: 'var(--color-neutral-50)' }}>
              <Icon size={15} style={{ color: 'var(--color-ink-muted)' }} />
            </div>
            <div className="flex-1">
              <p className="text-sm font-semibold" style={{ color: 'var(--color-ink)', fontFamily: 'var(--font-display)' }}>{label}</p>
              <p className="text-xs" style={{ color: 'var(--color-ink-muted)' }}>{desc}</p>
            </div>
            <ChevronRight size={15} style={{ color: 'var(--color-neutral-300)' }} />
          </button>
        ))}
      </div>

      {/* ── Logout ── */}
      <button
        onClick={onLogout}
        className="w-full flex items-center justify-center gap-2 py-3.5 rounded-2xl text-sm font-bold transition-all"
        style={{ border: '1.5px solid #FCA5A5', color: '#EF4444', background: '#FEF2F2', fontFamily: 'var(--font-display)' }}
      >
        <LogOut size={15} /> Sign Out
      </button>
    </div>
  );
};
