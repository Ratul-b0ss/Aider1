import React, { useState } from 'react';
import { Calendar, Clock, MapPin, ChevronRight, AlertCircle } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { Screen } from '../../types';

interface BookingsProps {
  onNavigate: (s: Screen) => void;
}

const BOOKINGS = [
  {
    id: '1',
    service: 'Deep Home Cleaning',
    provider: 'Sparkle Pros',
    date: 'Oct 24, 2024',
    time: '10:00 AM',
    status: 'Upcoming',
    price: 45,
    image: 'https://picsum.photos/seed/cleaning/200/200',
    address: '123 Luxury Ave, Suite 405',
    type: 'Upcoming',
  },
  {
    id: '2',
    service: 'AC Maintenance',
    provider: 'CoolAir Tech',
    date: 'Oct 20, 2024',
    time: '02:30 PM',
    status: 'Completed',
    price: 60,
    image: 'https://picsum.photos/seed/ac/200/200',
    address: '456 Business Rd, Office 12',
    type: 'Completed',
  },
];

const statusStyle = {
  Upcoming:  { bg: 'color-mix(in srgb, var(--color-primary) 12%, transparent)', color: 'var(--color-primary-hover)' },
  Completed: { bg: '#EEFAEF', color: '#16A34A' },
};

export const Bookings = ({ onNavigate }: BookingsProps) => {
  const [activeTab, setActiveTab] = useState<'Upcoming' | 'Completed'>('Upcoming');
  const filteredBookings = BOOKINGS.filter((b) => b.type === activeTab);

  return (
    <div className="pb-28 pt-2" style={{ minHeight: '80vh' }}>

      {/* ── Header ── */}
      <header className="mb-8">
        <p className="text-xs font-semibold uppercase tracking-widest mb-1.5"
          style={{ color: 'var(--color-primary)', fontFamily: 'var(--font-display)' }}>
          My Schedule
        </p>
        <h1 className="text-3xl md:text-4xl font-extrabold tracking-tight"
          style={{ color: 'var(--color-ink)', fontFamily: 'var(--font-display)' }}>
          Bookings
        </h1>
      </header>

      {/* ── Tabs ── */}
      <div
        className="inline-flex gap-1 p-1 rounded-xl mb-8"
        style={{ background: 'var(--color-neutral-100)', border: '1px solid var(--color-border)' }}
      >
        {(['Upcoming', 'Completed'] as const).map((tab) => {
          const active = activeTab === tab;
          return (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className="px-6 py-2.5 rounded-lg text-sm font-semibold transition-all"
              style={{
                fontFamily: 'var(--font-display)',
                background: active ? 'var(--color-surface)' : 'transparent',
                color: active ? 'var(--color-ink)' : 'var(--color-ink-muted)',
                boxShadow: active ? 'var(--shadow-sm)' : 'none',
              }}
            >
              {tab}
            </button>
          );
        })}
      </div>

      {/* ── Booking Cards ── */}
      <div className="flex flex-col gap-5">
        <AnimatePresence mode="popLayout">
          {filteredBookings.map((booking, idx) => {
            const ss = statusStyle[booking.status as keyof typeof statusStyle];
            return (
              <motion.div
                key={booking.id}
                layout
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.97 }}
                transition={{ duration: 0.3, delay: idx * 0.08, ease: [0.16, 1, 0.3, 1] }}
                className="rounded-2xl overflow-hidden"
                style={{
                  background: 'var(--color-surface)',
                  border: '1px solid var(--color-border)',
                  boxShadow: 'var(--shadow-sm)',
                }}
              >
                <div className="flex flex-col md:flex-row gap-0">
                  {/* Image */}
                  <div className="relative md:w-44 h-44 md:h-auto shrink-0 overflow-hidden">
                    <img
                      src={booking.image}
                      alt={booking.service}
                      className="w-full h-full object-cover"
                      referrerPolicy="no-referrer"
                    />
                  </div>

                  {/* Content */}
                  <div className="flex flex-1 flex-col justify-between p-5 gap-4">
                    {/* Top row */}
                    <div className="flex items-start justify-between gap-4">
                      <div className="min-w-0">
                        <h3
                          className="text-base font-semibold leading-snug"
                          style={{ color: 'var(--color-ink)', fontFamily: 'var(--font-display)' }}
                        >
                          {booking.service}
                        </h3>
                        <p className="text-sm mt-0.5" style={{ color: 'var(--color-ink-muted)' }}>
                          by {booking.provider}
                        </p>
                      </div>
                      <div
                        className="shrink-0 px-3 py-1.5 rounded-lg text-xs font-semibold"
                        style={{ background: ss.bg, color: ss.color, fontFamily: 'var(--font-display)' }}
                      >
                        {booking.status}
                      </div>
                    </div>

                    {/* Meta info */}
                    <div className="flex flex-wrap gap-x-6 gap-y-2">
                      {[
                        { icon: Calendar, text: booking.date },
                        { icon: Clock,    text: booking.time },
                        { icon: MapPin,   text: booking.address },
                      ].map(({ icon: Icon, text }) => (
                        <div key={text} className="flex items-center gap-2">
                          <div
                            className="h-7 w-7 rounded-lg flex items-center justify-center shrink-0"
                            style={{ background: 'var(--color-neutral-100)' }}
                          >
                            <Icon size={14} style={{ color: 'var(--color-ink-muted)' }} strokeWidth={2} />
                          </div>
                          <span className="text-xs font-medium" style={{ color: 'var(--color-ink-muted)' }}>{text}</span>
                        </div>
                      ))}
                    </div>

                    {/* Bottom row */}
                    <div
                      className="flex items-center justify-between pt-4 gap-4 flex-wrap"
                      style={{ borderTop: '1px solid var(--color-border)' }}
                    >
                      <div className="flex items-baseline gap-1">
                        <span className="text-2xl font-extrabold"
                          style={{ color: 'var(--color-ink)', fontFamily: 'var(--font-display)' }}>
                          ${booking.price}
                        </span>
                        <span className="text-xs" style={{ color: 'var(--color-ink-muted)' }}>total</span>
                      </div>

                      <div className="flex gap-2.5">
                        {booking.status === 'Upcoming' ? (
                          <>
                            <button
                              className="px-4 py-2 rounded-xl text-sm font-semibold transition-all"
                              style={{
                                border: '1.5px solid var(--color-border)',
                                color: 'var(--color-ink)',
                                fontFamily: 'var(--font-display)',
                              }}
                            >
                              Reschedule
                            </button>
                            <button
                              className="px-4 py-2 rounded-xl text-sm font-semibold text-white transition-all hover:opacity-90"
                              style={{ background: 'var(--color-deep)', fontFamily: 'var(--font-display)' }}
                            >
                              Contact Pro
                            </button>
                          </>
                        ) : (
                          <>
                            <button
                              className="px-4 py-2 rounded-xl text-sm font-semibold transition-all"
                              style={{
                                border: '1.5px solid var(--color-border)',
                                color: 'var(--color-ink)',
                                fontFamily: 'var(--font-display)',
                              }}
                            >
                              Invoice
                            </button>
                            <button
                              className="px-4 py-2 rounded-xl text-sm font-semibold text-white transition-all hover:opacity-90"
                              style={{ background: 'var(--color-deep)', fontFamily: 'var(--font-display)' }}
                            >
                              Book Again
                            </button>
                          </>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </AnimatePresence>
      </div>

      {/* ── Empty State ── */}
      {filteredBookings.length === 0 && (
        <div className="flex flex-col items-center justify-center py-24 text-center">
          <div
            className="h-20 w-20 rounded-2xl flex items-center justify-center mb-6"
            style={{ background: 'var(--color-neutral-100)' }}
          >
            <Calendar size={32} style={{ color: 'var(--color-neutral-400)' }} strokeWidth={1.5} />
          </div>
          <h3
            className="text-xl font-bold mb-2"
            style={{ color: 'var(--color-ink)', fontFamily: 'var(--font-display)' }}
          >
            No {activeTab.toLowerCase()} bookings
          </h3>
          <p className="text-sm mb-8" style={{ color: 'var(--color-ink-muted)' }}>
            Your schedule looks clear for now.
          </p>
          <button
            onClick={() => onNavigate('services')}
            className="flex items-center gap-2 px-6 py-3 rounded-xl text-sm font-semibold transition-all hover:opacity-90"
            style={{
              background: 'var(--color-deep)',
              color: '#fff',
              fontFamily: 'var(--font-display)',
            }}
          >
            Explore Services <ChevronRight size={15} />
          </button>
        </div>
      )}
    </div>
  );
};
