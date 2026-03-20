import React from 'react';
import { motion } from 'motion/react';
import {
  TrendingUp, Users, Calendar, DollarSign, Clock, Star,
  ArrowUpRight, Plus, Shield, AlertCircle, ChevronRight,
  CheckCircle, Zap, Lock,
} from 'lucide-react';
import { Screen, AuthUser } from '../../types';
import { useProvider } from '../../context/ProviderContext';

interface ProviderDashboardProps {
  onNavigate: (s: Screen) => void;
  user: AuthUser;
}

const STATS = [
  { label: 'Earnings',  value: '$2,450', icon: DollarSign, bg: '#EEFAEF', color: '#16A34A', trend: '+12.5%', up: true },
  { label: 'Bookings',  value: '48',     icon: Calendar,   bg: '#EEF6FF', color: '#2563EB', trend: '+8.2%',  up: true },
  { label: 'Rating',    value: '4.9',    icon: Star,       bg: 'var(--color-primary-light)', color: 'var(--color-deep)', trend: '0.0%', up: null },
  { label: 'Customers', value: '124',    icon: Users,      bg: '#F3EFFF', color: '#7C3AED', trend: '+15.3%', up: true },
];

const RECENT_BOOKINGS = [
  { id: '1', customer: 'Alex Johnson', service: 'Deep Cleaning',  time: 'Today, 2:00 PM',    status: 'Pending',   price: 45, avatar: 'AJ' },
  { id: '2', customer: 'Sarah Miller', service: 'AC Repair',      time: 'Tomorrow, 10:00 AM', status: 'Confirmed', price: 60, avatar: 'SM' },
  { id: '3', customer: 'Tom Wilson',   service: 'Plumbing Fix',   time: 'Mar 22, 3:00 PM',   status: 'Confirmed', price: 80, avatar: 'TW' },
];

const STATUS_STYLE: Record<string, { bg: string; color: string }> = {
  Confirmed: { bg: '#EEFAEF', color: '#16A34A' },
  Pending:   { bg: 'var(--color-primary-light)', color: 'var(--color-deep)' },
  Cancelled: { bg: '#FEF2F2', color: '#EF4444' },
};

export const ProviderDashboard = ({ onNavigate, user }: ProviderDashboardProps) => {
  const { canPostService, completionPct, requirements } = useProvider();
  const firstName = user.name.split(' ')[0];
  const initials  = user.name.split(' ').map(n => n[0]).join('').slice(0, 2).toUpperCase();

  return (
    <div className="space-y-6">

      {/* ── Header ── */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <p className="text-xs font-semibold uppercase tracking-widest mb-1"
            style={{ color: 'var(--color-primary)', fontFamily: 'var(--font-display)' }}>
            Business Overview
          </p>
          <h1 className="text-2xl md:text-3xl font-extrabold tracking-tight"
            style={{ color: 'var(--color-ink)', fontFamily: 'var(--font-display)' }}>
            Welcome back, {firstName} 👋
          </h1>
        </div>
        <div className="flex gap-3">
          <button
            className="flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm font-semibold transition-all"
            style={{
              border: '1.5px solid var(--color-border)',
              color: 'var(--color-ink)',
              fontFamily: 'var(--font-display)',
              background: 'var(--color-surface)',
            }}
          >
            <TrendingUp size={14} />
            Analytics
          </button>
          <button
            onClick={() => canPostService ? onNavigate('provider-gig-create') : onNavigate('provider-verification-wizard')}
            className="flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm font-bold text-white transition-all hover:opacity-90"
            style={{
              background: canPostService
                ? 'linear-gradient(135deg, var(--color-primary) 0%, #a3d900 100%)'
                : 'var(--color-neutral-300)',
              fontFamily: 'var(--font-display)',
              boxShadow: canPostService ? '0 4px 14px rgba(132,183,1,0.35)' : 'none',
            }}
          >
            {canPostService ? <Plus size={14} /> : <Lock size={14} />}
            Post Service
          </button>
        </div>
      </div>

      {/* ════════════════════════════════════
          ONBOARDING GATE (Fiverr-style)
          Shows until 100% completion
      ════════════════════════════════════ */}
      {completionPct < 100 && (
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          className="relative overflow-hidden rounded-2xl"
          style={{
            background: 'linear-gradient(135deg, var(--color-deep) 0%, #005840 100%)',
            border: '1px solid rgba(255,255,255,0.1)',
            boxShadow: 'var(--shadow-lg)',
          }}
        >
          {/* BG Decoration */}
          <div className="absolute -right-20 -top-20 h-64 w-64 rounded-full opacity-10"
            style={{ background: 'var(--color-primary)', filter: 'blur(40px)' }} />
          <div className="absolute inset-0 opacity-[0.03]"
            style={{ backgroundImage: 'radial-gradient(rgba(255,255,255,0.4) 1px, transparent 1px)', backgroundSize: '20px 20px' }} />

          <div className="relative p-6">
            <div className="flex flex-col lg:flex-row lg:items-center gap-5">
              <div className="flex-1">
                <div className="flex items-center gap-2 mb-1">
                  <AlertCircle size={15} style={{ color: 'var(--color-primary)' }} />
                  <span className="text-xs font-semibold" style={{ color: 'var(--color-primary)', fontFamily: 'var(--font-display)' }}>
                    Profile Setup Required
                  </span>
                </div>
                <h3 className="text-lg font-extrabold text-white mb-1" style={{ fontFamily: 'var(--font-display)' }}>
                  Complete your profile to start earning
                </h3>
                <p className="text-sm" style={{ color: 'rgba(255,255,255,0.6)' }}>
                  {canPostService
                    ? 'Your profile is complete! You can now post services.'
                    : `${100 - completionPct}% more to unlock all platform features.`}
                </p>

                {/* Progress Bar */}
                <div className="mt-4">
                  <div className="flex items-center justify-between mb-1.5">
                    <span className="text-xs font-semibold text-white" style={{ fontFamily: 'var(--font-display)' }}>
                      Profile Completion
                    </span>
                    <span className="text-xs font-bold" style={{ color: 'var(--color-primary)', fontFamily: 'var(--font-display)' }}>
                      {completionPct}%
                    </span>
                  </div>
                  <div className="h-2.5 rounded-full overflow-hidden" style={{ background: 'rgba(255,255,255,0.15)' }}>
                    <motion.div
                      className="h-full rounded-full"
                      style={{
                        background: 'linear-gradient(90deg, var(--color-primary) 0%, #a3d900 100%)',
                        boxShadow: '0 0 10px rgba(132,183,1,0.5)',
                      }}
                      initial={{ width: 0 }}
                      animate={{ width: `${completionPct}%` }}
                      transition={{ duration: 1.2, ease: 'easeOut' }}
                    />
                  </div>
                </div>

                {/* Requirement Chips */}
                <div className="flex flex-wrap gap-2 mt-4">
                  {requirements.map(req => (
                    <div
                      key={req.id}
                      className="flex items-center gap-1.5 px-3 py-1.5 rounded-full text-[10px] font-semibold"
                      style={{
                        background: req.isComplete ? 'rgba(132,183,1,0.2)' : 'rgba(255,255,255,0.08)',
                        color: req.isComplete ? 'var(--color-primary)' : 'rgba(255,255,255,0.5)',
                        border: `1px solid ${req.isComplete ? 'rgba(132,183,1,0.3)' : 'rgba(255,255,255,0.1)'}`,
                        fontFamily: 'var(--font-display)',
                      }}
                    >
                      {req.isComplete ? <CheckCircle size={10} /> : <Clock size={10} />}
                      {req.label}
                    </div>
                  ))}
                </div>
              </div>

              <button
                onClick={() => onNavigate('provider-verification-wizard')}
                className="shrink-0 flex items-center gap-2 px-6 py-3 rounded-xl text-sm font-bold text-white transition-all hover:opacity-90"
                style={{
                  background: 'var(--color-primary)',
                  fontFamily: 'var(--font-display)',
                  boxShadow: '0 4px 14px rgba(132,183,1,0.35)',
                }}
              >
                Continue Setup
                <ChevronRight size={15} />
              </button>
            </div>
          </div>
        </motion.div>
      )}

      {/* ── Stats Grid ── */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {STATS.map(({ label, value, icon: Icon, bg, color, trend, up }, idx) => (
          <motion.div
            key={label}
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.35, delay: idx * 0.08 }}
            className="rounded-2xl p-4"
            style={{ background: bg, border: `1px solid ${color}20` }}
          >
            <div className="flex items-center justify-between mb-3">
              <div className="h-9 w-9 rounded-xl flex items-center justify-center" style={{ background: `${color}18` }}>
                <Icon size={16} style={{ color }} strokeWidth={2} />
              </div>
              {up !== null && (
                <span
                  className="flex items-center gap-0.5 text-[10px] font-bold px-2 py-0.5 rounded-full"
                  style={{
                    background: up ? '#EEFAEF' : '#FEF2F2',
                    color: up ? '#16A34A' : '#EF4444',
                    fontFamily: 'var(--font-display)',
                  }}
                >
                  <ArrowUpRight size={9} style={{ transform: up ? 'none' : 'scaleY(-1)' }} />
                  {trend}
                </span>
              )}
            </div>
            <p className="text-2xl font-extrabold" style={{ color: 'var(--color-ink)', fontFamily: 'var(--font-display)' }}>
              {value}
            </p>
            <p className="text-xs mt-0.5" style={{ color: 'var(--color-ink-muted)' }}>{label}</p>
          </motion.div>
        ))}
      </div>

      {/* ── Recent Bookings ── */}
      <div
        className="rounded-2xl overflow-hidden"
        style={{ background: 'var(--color-surface)', border: '1px solid var(--color-border)', boxShadow: 'var(--shadow-sm)' }}
      >
        <div className="flex items-center justify-between px-5 py-4 border-b" style={{ borderColor: 'var(--color-border)' }}>
          <h2 className="text-base font-extrabold" style={{ color: 'var(--color-ink)', fontFamily: 'var(--font-display)' }}>
            Recent Bookings
          </h2>
          <button
            onClick={() => onNavigate('provider-bookings')}
            className="flex items-center gap-1 text-xs font-semibold"
            style={{ color: 'var(--color-primary)', fontFamily: 'var(--font-display)' }}
          >
            View All <ChevronRight size={12} />
          </button>
        </div>
        <div className="divide-y" style={{ '--tw-divide-opacity': 1 } as React.CSSProperties}>
          {RECENT_BOOKINGS.map((b, idx) => {
            const ss = STATUS_STYLE[b.status] ?? STATUS_STYLE.Pending;
            return (
              <motion.div
                key={b.id}
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.3, delay: idx * 0.07 }}
                className="flex items-center gap-4 px-5 py-4"
                style={{ borderColor: 'var(--color-border)' }}
              >
                <div
                  className="h-9 w-9 rounded-xl flex items-center justify-center text-xs font-bold text-white shrink-0"
                  style={{ background: 'linear-gradient(135deg, var(--color-deep) 0%, var(--color-primary) 100%)' }}
                >
                  {b.avatar}
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-bold" style={{ color: 'var(--color-ink)', fontFamily: 'var(--font-display)' }}>
                    {b.customer}
                  </p>
                  <p className="text-xs" style={{ color: 'var(--color-ink-muted)' }}>
                    {b.service} · {b.time}
                  </p>
                </div>
                <div className="flex items-center gap-3 shrink-0">
                  <span
                    className="text-[10px] font-bold px-2.5 py-1 rounded-full"
                    style={{ background: ss.bg, color: ss.color, fontFamily: 'var(--font-display)' }}
                  >
                    {b.status}
                  </span>
                  <span className="text-sm font-extrabold" style={{ color: 'var(--color-primary)', fontFamily: 'var(--font-display)' }}>
                    ${b.price}
                  </span>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>

      {/* ── Quick Actions ── */}
      <div className="grid sm:grid-cols-3 gap-4">
        {[
          { label: 'Verify Identity',   icon: Shield,   screen: 'provider-verification-wizard' as Screen, color: '#2563EB', bg: '#EEF6FF' },
          { label: 'Manage Wallet',     icon: DollarSign, screen: 'provider-wallet' as Screen,            color: '#16A34A', bg: '#EEFAEF' },
          { label: 'View Full Profile', icon: Users,    screen: 'provider-profile' as Screen,             color: 'var(--color-deep)', bg: 'var(--color-primary-light)' },
        ].map(({ label, icon: Icon, screen: s, color, bg }) => (
          <button
            key={label}
            onClick={() => onNavigate(s)}
            className="flex items-center gap-3 p-4 rounded-2xl text-left transition-all hover:-translate-y-0.5 hover:shadow-md"
            style={{ background: bg, border: `1px solid ${color}20` }}
          >
            <div className="h-10 w-10 rounded-xl flex items-center justify-center shrink-0" style={{ background: `${color}15` }}>
              <Icon size={18} style={{ color }} strokeWidth={1.8} />
            </div>
            <span className="text-sm font-bold" style={{ color: 'var(--color-ink)', fontFamily: 'var(--font-display)' }}>
              {label}
            </span>
            <ChevronRight size={15} className="ml-auto" style={{ color: 'var(--color-neutral-400)' }} />
          </button>
        ))}
      </div>
    </div>
  );
};
