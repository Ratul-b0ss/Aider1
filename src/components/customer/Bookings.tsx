import React, { useState } from 'react';
import { motion } from 'motion/react';
import {
  Calendar, Clock, CheckCircle, X, ArrowRight, Star, ChevronRight, Filter,
} from 'lucide-react';
import { Screen } from '../../types';

interface BookingsProps {
  onNavigate: (s: Screen) => void;
  isProvider?: boolean;
}

const BOOKINGS = [
  { id: '1', service: 'Deep Cleaning',   pro: 'Sparkle Pros', date: 'Mar 14, 2024', time: '10:00 AM', status: 'Completed', price: '$45', img: 'https://picsum.photos/seed/b1/100/100' },
  { id: '2', service: 'AC Maintenance',  pro: 'CoolAir Tech',  date: 'Mar 18, 2024', time: '2:00 PM',  status: 'Upcoming',  price: '$60', img: 'https://picsum.photos/seed/b2/100/100' },
  { id: '3', service: 'Garden Service',  pro: 'GreenThumb Co.',date: 'Mar 20, 2024', time: '9:00 AM',  status: 'In Progress', price: '$35', img: 'https://picsum.photos/seed/b3/100/100' },
  { id: '4', service: 'Interior Painting',pro: 'ArtHouse Pros', date: 'Mar 5, 2024',  time: '8:00 AM',  status: 'Cancelled', price: '$120', img: 'https://picsum.photos/seed/b4/100/100' },
];

const STATUS_CONFIG: Record<string, { bg: string; color: string; icon: typeof CheckCircle }> = {
  Completed:   { bg: '#EEFAEF', color: '#16A34A', icon: CheckCircle },
  Upcoming:    { bg: '#EEF6FF', color: '#2563EB', icon: Calendar },
  'In Progress': { bg: 'var(--color-primary-light)', color: 'var(--color-deep)', icon: Clock },
  Cancelled:   { bg: '#FEF2F2', color: '#EF4444', icon: X },
};

type FilterTab = 'All' | 'Upcoming' | 'Completed' | 'Cancelled';

export const Bookings = ({ onNavigate, isProvider = false }: BookingsProps) => {
  const [tab, setTab] = useState<FilterTab>('All');

  const filtered = tab === 'All' ? BOOKINGS : BOOKINGS.filter(b => b.status === tab || (tab === 'Upcoming' && b.status === 'In Progress'));

  return (
    <div className="space-y-5">
      {/* ── Header ── */}
      <div>
        <p className="text-xs font-semibold uppercase tracking-widest mb-1" style={{ color: 'var(--color-primary)', fontFamily: 'var(--font-display)' }}>
          {isProvider ? 'Manage' : 'Activity'}
        </p>
        <h1 className="text-2xl font-extrabold" style={{ color: 'var(--color-ink)', fontFamily: 'var(--font-display)' }}>
          {isProvider ? 'Booking Requests' : 'My Bookings'}
        </h1>
      </div>

      {/* Tab Filter */}
      <div
        className="flex gap-1 p-1 rounded-xl"
        style={{ background: 'var(--color-neutral-100)', width: 'fit-content' }}
      >
        {(['All', 'Upcoming', 'Completed', 'Cancelled'] as FilterTab[]).map(t => (
          <button
            key={t}
            onClick={() => setTab(t)}
            className="px-4 py-2 rounded-lg text-xs font-semibold transition-all"
            style={{
              background: tab === t ? 'var(--color-surface)' : 'transparent',
              color: tab === t ? 'var(--color-deep)' : 'var(--color-ink-muted)',
              fontFamily: 'var(--font-display)',
              boxShadow: tab === t ? 'var(--shadow-sm)' : 'none',
            }}
          >
            {t}
          </button>
        ))}
      </div>

      {/* Booking List */}
      <div className="space-y-3">
        {filtered.map((b, idx) => {
          const sc = STATUS_CONFIG[b.status] ?? STATUS_CONFIG.Upcoming;
          const Icon = sc.icon;
          return (
            <motion.div
              key={b.id}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: idx * 0.07 }}
              className="rounded-2xl overflow-hidden transition-all hover:shadow-md"
              style={{ background: 'var(--color-surface)', border: '1px solid var(--color-border)', boxShadow: 'var(--shadow-xs)' }}
            >
              <div className="flex items-center gap-4 p-4">
                <div className="h-14 w-14 rounded-xl overflow-hidden shrink-0">
                  <img src={b.img} alt={b.service} className="w-full h-full object-cover" />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-bold truncate" style={{ color: 'var(--color-ink)', fontFamily: 'var(--font-display)' }}>
                    {b.service}
                  </p>
                  <p className="text-xs" style={{ color: 'var(--color-ink-muted)' }}>{b.pro}</p>
                  <div className="flex items-center gap-3 mt-1.5">
                    <div className="flex items-center gap-1">
                      <Calendar size={10} style={{ color: 'var(--color-ink-muted)' }} />
                      <span className="text-[10px]" style={{ color: 'var(--color-ink-muted)' }}>{b.date}</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <Clock size={10} style={{ color: 'var(--color-ink-muted)' }} />
                      <span className="text-[10px]" style={{ color: 'var(--color-ink-muted)' }}>{b.time}</span>
                    </div>
                  </div>
                </div>
                <div className="flex flex-col items-end gap-2 shrink-0">
                  <span
                    className="flex items-center gap-1 text-[10px] font-bold px-2.5 py-1 rounded-full"
                    style={{ background: sc.bg, color: sc.color, fontFamily: 'var(--font-display)' }}
                  >
                    <Icon size={9} />
                    {b.status}
                  </span>
                  <span className="text-sm font-extrabold" style={{ color: 'var(--color-primary)', fontFamily: 'var(--font-display)' }}>
                    {b.price}
                  </span>
                </div>
              </div>

              {/* Action Row */}
              <div className="flex border-t" style={{ borderColor: 'var(--color-border)' }}>
                {b.status === 'Upcoming' && (
                  <>
                    <button
                      onClick={() => onNavigate('order-tracking')}
                      className="flex-1 py-3 text-xs font-semibold transition-colors"
                      style={{ color: 'var(--color-primary)', fontFamily: 'var(--font-display)', borderRight: '1px solid var(--color-border)' }}
                    >
                      Track Order
                    </button>
                    <button className="flex-1 py-3 text-xs font-semibold transition-colors" style={{ color: '#EF4444', fontFamily: 'var(--font-display)' }}>
                      Cancel
                    </button>
                  </>
                )}
                {b.status === 'In Progress' && (
                  <button
                    onClick={() => onNavigate('order-tracking')}
                    className="flex-1 py-3 text-xs font-semibold flex items-center justify-center gap-1.5"
                    style={{ color: 'var(--color-primary)', fontFamily: 'var(--font-display)' }}
                  >
                    Live Tracking <ArrowRight size={11} />
                  </button>
                )}
                {b.status === 'Completed' && (
                  <button className="flex-1 py-3 text-xs font-semibold flex items-center justify-center gap-1.5"
                    style={{ color: 'var(--color-ink-muted)', fontFamily: 'var(--font-display)' }}>
                    <Star size={11} /> Rate Service
                  </button>
                )}
                {b.status === 'Cancelled' && (
                  <button
                    onClick={() => onNavigate('booking-checkout')}
                    className="flex-1 py-3 text-xs font-semibold" style={{ color: 'var(--color-primary)', fontFamily: 'var(--font-display)' }}>
                    Rebook
                  </button>
                )}
              </div>
            </motion.div>
          );
        })}
      </div>
    </div>
  );
};
