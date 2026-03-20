import React from 'react';
import { motion } from 'motion/react';
import { CheckCircle, Clock, MapPin, Phone, MessageCircle, Star, ChevronLeft, ArrowRight, Navigation } from 'lucide-react';
import { Screen } from '../../types';

interface OrderTrackingProps {
  onNavigate: (s: Screen) => void;
}

const TRACKING_STEPS = [
  { id: '1', label: 'Booking Confirmed',    desc: 'Your booking was successfully placed.',         done: true,  time: '10:02 AM' },
  { id: '2', label: 'Pro Assigned',         desc: 'Jane P. from Sparkle Pros has been assigned.',  done: true,  time: '10:05 AM' },
  { id: '3', label: 'Pro On the Way',       desc: 'Jane is 12 minutes away from your location.',   done: true,  time: '01:48 PM' },
  { id: '4', label: 'Service In Progress',  desc: 'Jane is currently working at your location.',   done: false, time: 'Now' },
  { id: '5', label: 'Service Completed',    desc: 'All done! Rate your experience.',               done: false, time: '—' },
];

export const OrderTracking = ({ onNavigate }: OrderTrackingProps) => {
  const activeStep = TRACKING_STEPS.findIndex(s => !s.done);

  return (
    <div className="mx-auto max-w-2xl px-5 py-6 pb-24">

      {/* ── Header ── */}
      <div className="flex items-center gap-3 mb-6">
        <button
          onClick={() => onNavigate('bookings')}
          className="h-10 w-10 rounded-xl flex items-center justify-center"
          style={{ background: 'var(--color-neutral-100)', color: 'var(--color-ink)' }}
        >
          <ChevronLeft size={18} />
        </button>
        <div>
          <h1 className="text-lg font-extrabold" style={{ color: 'var(--color-ink)', fontFamily: 'var(--font-display)' }}>
            Order Tracking
          </h1>
          <p className="text-xs" style={{ color: 'var(--color-ink-muted)' }}>Order #ORD-2024-0392</p>
        </div>
        <span
          className="ml-auto text-[10px] font-bold px-3 py-1.5 rounded-full"
          style={{ background: 'var(--color-primary-light)', color: 'var(--color-deep)', fontFamily: 'var(--font-display)' }}
        >
          In Progress
        </span>
      </div>

      {/* ── Map Placeholder ── */}
      <div
        className="relative h-48 rounded-2xl mb-5 overflow-hidden flex items-center justify-center"
        style={{ background: 'linear-gradient(135deg, #e8f5e9 0%, #c8e6c9 100%)', border: '1px solid var(--color-border)' }}
      >
        <div className="absolute inset-0 opacity-20"
          style={{ backgroundImage: 'repeating-linear-gradient(0deg, var(--color-primary) 0px, transparent 1px, transparent 40px)', backgroundSize: '40px 40px' }} />
        <div className="absolute inset-0 opacity-20"
          style={{ backgroundImage: 'repeating-linear-gradient(90deg, var(--color-primary) 0px, transparent 1px, transparent 40px)', backgroundSize: '40px 40px' }} />
        <div className="relative flex flex-col items-center gap-2">
          <div
            className="h-14 w-14 rounded-full flex items-center justify-center"
            style={{ background: 'var(--color-deep)', boxShadow: '0 4px 20px rgba(0,61,43,0.4)' }}
          >
            <Navigation size={22} className="text-white" />
          </div>
          <span className="text-sm font-bold" style={{ color: 'var(--color-deep)', fontFamily: 'var(--font-display)' }}>
            Jane is 12 min away
          </span>
        </div>
      </div>

      {/* ── Provider Card ── */}
      <div
        className="flex items-center gap-4 p-4 rounded-2xl mb-6"
        style={{ background: 'var(--color-surface)', border: '1px solid var(--color-border)', boxShadow: 'var(--shadow-sm)' }}
      >
        <div
          className="h-12 w-12 rounded-xl flex items-center justify-center text-sm font-bold text-white shrink-0"
          style={{ background: 'linear-gradient(135deg, var(--color-deep) 0%, var(--color-primary) 100%)' }}
        >
          JP
        </div>
        <div className="flex-1">
          <p className="text-sm font-bold" style={{ color: 'var(--color-ink)', fontFamily: 'var(--font-display)' }}>
            Jane P. — Sparkle Pros
          </p>
          <div className="flex items-center gap-1 mt-0.5">
            <Star size={11} className="fill-yellow-400 text-yellow-400" />
            <span className="text-xs font-medium" style={{ color: 'var(--color-ink-muted)' }}>4.9 · 128 reviews</span>
          </div>
        </div>
        <div className="flex gap-2">
          <button
            className="h-10 w-10 rounded-xl flex items-center justify-center transition-colors"
            style={{ background: 'var(--color-primary-light)', color: 'var(--color-deep)' }}
          >
            <Phone size={15} />
          </button>
          <button
            className="h-10 w-10 rounded-xl flex items-center justify-center transition-colors"
            style={{ background: 'var(--color-primary-light)', color: 'var(--color-deep)' }}
          >
            <MessageCircle size={15} />
          </button>
        </div>
      </div>

      {/* ── Timeline ── */}
      <div className="mb-6">
        <h2 className="text-base font-extrabold mb-4" style={{ color: 'var(--color-ink)', fontFamily: 'var(--font-display)' }}>
          Live Status
        </h2>
        <div className="space-y-0">
          {TRACKING_STEPS.map((s, idx) => {
            const isActive = idx === activeStep;
            const isDone   = s.done;
            const isFuture = !isDone && !isActive;
            return (
              <div key={s.id} className="flex gap-4">
                {/* Dot & line */}
                <div className="flex flex-col items-center">
                  <motion.div
                    initial={isActive ? { scale: 0.5 } : {}}
                    animate={isActive ? { scale: [1, 1.2, 1] } : {}}
                    transition={isActive ? { repeat: Infinity, duration: 1.5 } : {}}
                    className="h-8 w-8 rounded-full flex items-center justify-center shrink-0 mt-1"
                    style={{
                      background: isDone ? 'var(--color-primary)' : isActive ? 'var(--color-deep)' : 'var(--color-neutral-100)',
                      border: `2px solid ${isDone ? 'var(--color-primary)' : isActive ? 'var(--color-deep)' : 'var(--color-border)'}`,
                      boxShadow: isActive ? '0 0 0 4px rgba(0,61,43,0.12)' : 'none',
                    }}
                  >
                    {isDone
                      ? <CheckCircle size={14} className="text-white" />
                      : isActive
                      ? <Clock size={14} className="text-white" />
                      : <div className="h-2 w-2 rounded-full" style={{ background: 'var(--color-neutral-300)' }} />
                    }
                  </motion.div>
                  {idx < TRACKING_STEPS.length - 1 && (
                    <div
                      className="w-0.5 flex-1 mt-1"
                      style={{
                        background: isDone ? 'var(--color-primary)' : 'var(--color-border)',
                        minHeight: 24,
                      }}
                    />
                  )}
                </div>

                {/* Content */}
                <div className="pb-6 flex-1" style={{ opacity: isFuture ? 0.45 : 1 }}>
                  <div className="flex items-center justify-between">
                    <p className="text-sm font-bold" style={{ color: isActive ? 'var(--color-deep)' : 'var(--color-ink)', fontFamily: 'var(--font-display)' }}>
                      {s.label}
                    </p>
                    <span className="text-[11px]" style={{ color: 'var(--color-ink-muted)' }}>{s.time}</span>
                  </div>
                  <p className="text-xs mt-0.5 leading-relaxed" style={{ color: 'var(--color-ink-muted)' }}>
                    {s.desc}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* ── Service Details ── */}
      <div
        className="p-4 rounded-2xl mb-5"
        style={{ background: 'var(--color-neutral-50)', border: '1px solid var(--color-border)' }}
      >
        <h2 className="text-sm font-extrabold mb-3" style={{ color: 'var(--color-ink)', fontFamily: 'var(--font-display)' }}>
          Service Details
        </h2>
        {[
          { label: 'Service',  value: 'Deep Home Cleaning' },
          { label: 'Date',     value: 'Mar 20, 2:00 PM' },
          { label: 'Address',  value: '42 Green Street, City' },
          { label: 'Total',    value: '$45.00' },
        ].map(({ label, value }) => (
          <div key={label} className="flex justify-between text-sm py-1.5 border-b last:border-0"
            style={{ borderColor: 'var(--color-border)' }}>
            <span style={{ color: 'var(--color-ink-muted)' }}>{label}</span>
            <span className="font-medium" style={{ color: 'var(--color-ink)' }}>{value}</span>
          </div>
        ))}
      </div>

      {/* ── Rate CTA ── */}
      <button
        onClick={() => onNavigate('bookings')}
        className="w-full flex items-center justify-center gap-2 py-3.5 rounded-xl text-sm font-bold text-white transition-all hover:opacity-90"
        style={{
          background: 'linear-gradient(135deg, var(--color-primary) 0%, #a3d900 100%)',
          fontFamily: 'var(--font-display)',
          boxShadow: '0 4px 14px rgba(132,183,1,0.3)',
        }}
      >
        <Star size={14} />
        Rate This Service
        <ArrowRight size={14} />
      </button>
    </div>
  );
};
