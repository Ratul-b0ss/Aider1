import React from 'react';
import { TrendingUp, Users, Calendar, DollarSign, Clock, Star, CheckCircle2, ArrowUpRight, MoreHorizontal } from 'lucide-react';
import { motion } from 'motion/react';
import { Screen } from '../../types';

interface ProviderDashboardProps {
  onNavigate: (s: Screen) => void;
}

const STATS = [
  { label: 'Revenue',   value: '$2,450', icon: DollarSign, bg: '#EEFAEF', color: '#16A34A', trend: '+12.5%', up: true },
  { label: 'Bookings',  value: '48',     icon: Calendar,   bg: '#EEF6FF', color: '#2563EB', trend: '+8.2%',  up: true },
  { label: 'Rating',    value: '4.9',    icon: Star,       bg: '#FFF4EC', color: '#EA580C', trend: '0.0%',   up: null },
  { label: 'Customers', value: '124',    icon: Users,      bg: '#F3EFFF', color: '#7C3AED', trend: '+15.3%', up: true },
];

const RECENT_BOOKINGS = [
  { id: '1', customer: 'Alex Johnson', service: 'Deep Cleaning',  time: 'Today, 2:00 PM',    status: 'Pending',   price: 45 },
  { id: '2', customer: 'Sarah Miller', service: 'AC Repair',      time: 'Tomorrow, 10:00 AM', status: 'Confirmed', price: 60 },
];

const statusStyle = {
  Confirmed: { bg: '#EEFAEF', color: '#16A34A' },
  Pending:   { bg: 'color-mix(in srgb, var(--color-primary) 12%, transparent)', color: 'var(--color-primary-hover)' },
};

export const ProviderDashboard = ({ onNavigate }: ProviderDashboardProps) => {
  return (
    <div className="pb-28 pt-2" style={{ minHeight: '80vh' }}>

      {/* ── Header ── */}
      <header className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4 mb-8">
        <div>
          <p className="text-xs font-semibold uppercase tracking-widest mb-1.5"
            style={{ color: 'var(--color-primary)', fontFamily: 'var(--font-display)' }}>
            Business Overview
          </p>
          <h1 className="text-3xl md:text-4xl font-extrabold tracking-tight"
            style={{ color: 'var(--color-ink)', fontFamily: 'var(--font-display)' }}>
            Dashboard
          </h1>
        </div>
        <div className="flex gap-3">
          <button
            className="px-4 py-2.5 rounded-xl text-sm font-semibold transition-all"
            style={{
              border: '1.5px solid var(--color-border)',
              color: 'var(--color-ink)',
              fontFamily: 'var(--font-display)',
              background: 'var(--color-surface)',
            }}
          >
            Download Report
          </button>
          <button
            className="px-4 py-2.5 rounded-xl text-sm font-semibold text-white transition-all hover:opacity-90"
            style={{ background: 'var(--color-deep)', fontFamily: 'var(--font-display)' }}
          >
            + Add Service
          </button>
        </div>
      </header>

      {/* ── Stats Grid ── */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        {STATS.map((stat, idx) => (
          <motion.div
            key={stat.label}
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.35, delay: idx * 0.07, ease: [0.16, 1, 0.3, 1] }}
            className="p-5 rounded-2xl"
            style={{
              background: stat.bg,
              border: `1px solid ${stat.color}20`,
            }}
          >
            <div className="flex items-center justify-between mb-4">
              <div
                className="h-9 w-9 rounded-xl flex items-center justify-center"
                style={{ background: stat.color + '18' }}
              >
                <stat.icon size={18} style={{ color: stat.color }} strokeWidth={1.8} />
              </div>
              <span
                className="text-[11px] font-semibold px-2 py-1 rounded-lg"
                style={{
                  background: stat.up === true ? '#EEFAEF' : stat.up === false ? '#FEF2F2' : 'rgba(0,0,0,0.06)',
                  color: stat.up === true ? '#16A34A' : stat.up === false ? '#DC2626' : 'var(--color-ink-muted)',
                  fontFamily: 'var(--font-display)',
                }}
              >
                {stat.up === true && '↑ '}{stat.trend}
              </span>
            </div>
            <p className="text-2xl font-extrabold" style={{ color: stat.color, fontFamily: 'var(--font-display)' }}>
              {stat.value}
            </p>
            <p className="text-xs font-medium mt-1" style={{ color: stat.color, fontFamily: 'var(--font-display)', opacity: 0.7 }}>
              {stat.label}
            </p>
          </motion.div>
        ))}
      </div>

      {/* ── Main Content ── */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">

        {/* Recent Bookings */}
        <div className="lg:col-span-2">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-bold" style={{ color: 'var(--color-ink)', fontFamily: 'var(--font-display)' }}>
              Recent Bookings
            </h2>
            <button
              className="flex items-center gap-1.5 text-sm font-semibold transition-colors"
              style={{ color: 'var(--color-primary)', fontFamily: 'var(--font-display)' }}
            >
              View All <ArrowUpRight size={15} />
            </button>
          </div>

          <div
            className="rounded-2xl overflow-hidden"
            style={{
              background: 'var(--color-surface)',
              border: '1px solid var(--color-border)',
              boxShadow: 'var(--shadow-xs)',
            }}
          >
            {RECENT_BOOKINGS.map((booking, idx) => {
              const ss = statusStyle[booking.status as keyof typeof statusStyle];
              return (
                <div
                  key={booking.id}
                  className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 p-5 transition-colors hover:bg-[var(--color-neutral-50)]"
                  style={{
                    borderBottom: idx < RECENT_BOOKINGS.length - 1 ? '1px solid var(--color-border)' : 'none',
                  }}
                >
                  <div className="flex items-center gap-4 min-w-0">
                    <div
                      className="h-11 w-11 rounded-xl flex items-center justify-center shrink-0"
                      style={{ background: 'var(--color-primary-light)' }}
                    >
                      <Calendar size={19} style={{ color: 'var(--color-primary-hover)' }} strokeWidth={2} />
                    </div>
                    <div className="min-w-0">
                      <h4 className="text-sm font-semibold truncate" style={{ color: 'var(--color-ink)', fontFamily: 'var(--font-display)' }}>
                        {booking.service}
                      </h4>
                      <p className="text-xs mt-0.5" style={{ color: 'var(--color-ink-muted)' }}>
                        {booking.customer}
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center gap-3 shrink-0 flex-wrap sm:flex-nowrap">
                    <div className="flex items-center gap-1.5" style={{ color: 'var(--color-ink-muted)' }}>
                      <Clock size={13} strokeWidth={2} />
                      <span className="text-xs font-medium" style={{ fontFamily: 'var(--font-display)' }}>{booking.time}</span>
                    </div>
                    <div
                      className="px-3 py-1.5 rounded-lg text-xs font-semibold"
                      style={{ background: ss.bg, color: ss.color, fontFamily: 'var(--font-display)' }}
                    >
                      {booking.status}
                    </div>
                    <span className="text-base font-extrabold" style={{ color: 'var(--color-ink)', fontFamily: 'var(--font-display)' }}>
                      ${booking.price}
                    </span>
                    <button
                      className="px-3 py-1.5 rounded-xl text-xs font-semibold transition-all"
                      style={{
                        border: '1.5px solid var(--color-border)',
                        color: 'var(--color-ink)',
                        fontFamily: 'var(--font-display)',
                      }}
                    >
                      Manage
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Quick Actions */}
        <div className="flex flex-col gap-4">
          <h2 className="text-lg font-bold" style={{ color: 'var(--color-ink)', fontFamily: 'var(--font-display)' }}>
            Quick Actions
          </h2>

          {/* Boost card */}
          <div
            className="rounded-2xl p-6 relative overflow-hidden cursor-pointer group transition-all hover:-translate-y-0.5"
            style={{
              background: 'linear-gradient(140deg, var(--color-deep) 0%, #005840 100%)',
              boxShadow: 'var(--shadow-lg)',
            }}
          >
            <div className="absolute -right-8 -top-8 h-32 w-32 rounded-full pointer-events-none"
              style={{ background: 'rgba(132,183,1,0.12)', filter: 'blur(20px)' }} />
            <div className="relative z-10">
              <div className="h-10 w-10 rounded-xl flex items-center justify-center mb-4"
                style={{ background: 'rgba(132,183,1,0.2)' }}>
                <TrendingUp size={20} style={{ color: 'var(--color-primary)' }} strokeWidth={2} />
              </div>
              <h4 className="text-base font-bold text-white mb-1.5" style={{ fontFamily: 'var(--font-display)' }}>
                Boost Visibility
              </h4>
              <p className="text-sm leading-relaxed" style={{ color: 'rgba(255,255,255,0.6)' }}>
                Promote your services to reach more customers.
              </p>
              <button
                className="mt-4 flex items-center gap-1.5 text-xs font-semibold transition-colors"
                style={{ color: 'var(--color-primary)', fontFamily: 'var(--font-display)' }}
              >
                Learn more <ArrowUpRight size={13} />
              </button>
            </div>
          </div>

          {/* Complete card */}
          <div
            className="rounded-2xl p-6"
            style={{
              background: 'var(--color-surface)',
              border: '1px solid var(--color-border)',
              boxShadow: 'var(--shadow-xs)',
            }}
          >
            <div className="h-10 w-10 rounded-xl flex items-center justify-center mb-4"
              style={{ background: '#EEFAEF' }}>
              <CheckCircle2 size={20} style={{ color: '#16A34A' }} strokeWidth={2} />
            </div>
            <h4 className="text-base font-bold mb-1.5" style={{ color: 'var(--color-ink)', fontFamily: 'var(--font-display)' }}>
              Profile Complete
            </h4>
            <p className="text-sm leading-relaxed" style={{ color: 'var(--color-ink-muted)' }}>
              Your business profile is 100% complete. You're ready to grow!
            </p>
            {/* Progress bar */}
            <div className="mt-4 h-1.5 rounded-full overflow-hidden" style={{ background: 'var(--color-neutral-100)' }}>
              <div className="h-full rounded-full w-full" style={{ background: '#16A34A' }} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
