import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import {
  ChevronLeft, ChevronRight, Calendar, Clock, CreditCard,
  MapPin, Shield, CheckCircle, ArrowRight, Zap, Tag,
} from 'lucide-react';
import { Screen } from '../../types';

interface BookingCheckoutProps {
  onNavigate: (s: Screen) => void;
}

type Step = 1 | 2 | 3;

const TIME_SLOTS = [
  '08:00 AM', '09:00 AM', '10:00 AM', '11:00 AM',
  '01:00 PM', '02:00 PM', '03:00 PM', '04:00 PM',
];

const DAYS = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];
const DATES = [17, 18, 19, 20, 21, 22, 23];

export const BookingCheckout = ({ onNavigate }: BookingCheckoutProps) => {
  const [step, setStep] = useState<Step>(1);
  const [selectedDate, setSelectedDate] = useState(20);
  const [selectedTime, setSelectedTime] = useState('');
  const [address, setAddress] = useState('');
  const [notes, setNotes] = useState('');
  const [promoCode, setPromoCode] = useState('');
  const [promoApplied, setPromoApplied] = useState(false);
  const [card, setCard] = useState({ number: '', name: '', expiry: '', cvv: '' });
  const [confirmed, setConfirmed] = useState(false);

  const price = promoApplied ? 36 : 45;

  const handleConfirm = () => {
    setConfirmed(true);
    setTimeout(() => onNavigate('order-tracking'), 2000);
  };

  if (confirmed) {
    return (
      <div className="flex items-center justify-center min-h-[60vh] px-5">
        <motion.div
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ type: 'spring', stiffness: 260, damping: 20 }}
          className="text-center max-w-sm"
        >
          <div className="h-20 w-20 mx-auto rounded-full flex items-center justify-center mb-5"
            style={{ background: 'var(--color-primary-light)' }}>
            <CheckCircle size={40} style={{ color: 'var(--color-primary)' }} />
          </div>
          <h2 className="text-2xl font-extrabold mb-2" style={{ color: 'var(--color-ink)', fontFamily: 'var(--font-display)' }}>
            Booking Confirmed!
          </h2>
          <p className="text-sm" style={{ color: 'var(--color-ink-muted)' }}>
            Redirecting to order tracking...
          </p>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-2xl px-5 py-6 pb-24">

      {/* ── Header ── */}
      <div className="flex items-center gap-3 mb-6">
        <button
          onClick={() => step > 1 ? setStep((step - 1) as Step) : onNavigate('service-detail')}
          className="h-10 w-10 rounded-xl flex items-center justify-center transition-colors"
          style={{ background: 'var(--color-neutral-100)', color: 'var(--color-ink)' }}
        >
          <ChevronLeft size={18} />
        </button>
        <div className="flex-1">
          <h1 className="text-lg font-extrabold" style={{ color: 'var(--color-ink)', fontFamily: 'var(--font-display)' }}>
            Book Service
          </h1>
          <p className="text-xs" style={{ color: 'var(--color-ink-muted)' }}>
            Deep Home Cleaning · $45/visit
          </p>
        </div>
      </div>

      {/* ── Step Indicator ── */}
      <div className="flex items-center gap-2 mb-7">
        {([1, 2, 3] as Step[]).map((s) => (
          <React.Fragment key={s}>
            <div
              className="flex items-center gap-1.5"
              style={{ opacity: step >= s ? 1 : 0.4 }}
            >
              <div
                className="h-7 w-7 rounded-full flex items-center justify-center text-xs font-bold"
                style={{
                  background: step > s ? 'var(--color-primary)' : step === s ? 'var(--color-deep)' : 'var(--color-neutral-200)',
                  color: step >= s ? '#fff' : 'var(--color-neutral-500)',
                  fontFamily: 'var(--font-display)',
                }}
              >
                {step > s ? <CheckCircle size={14} /> : s}
              </div>
              <span className="text-xs font-semibold hidden sm:block" style={{ color: step === s ? 'var(--color-ink)' : 'var(--color-ink-muted)', fontFamily: 'var(--font-display)' }}>
                {s === 1 ? 'Schedule' : s === 2 ? 'Details' : 'Payment'}
              </span>
            </div>
            {s < 3 && <div className="flex-1 h-px" style={{ background: step > s ? 'var(--color-primary)' : 'var(--color-border)' }} />}
          </React.Fragment>
        ))}
      </div>

      <AnimatePresence mode="wait">
        {/* ── STEP 1: Schedule ── */}
        {step === 1 && (
          <motion.div
            key="step1"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            className="space-y-5"
          >
            <div>
              <h2 className="text-base font-extrabold mb-4" style={{ color: 'var(--color-ink)', fontFamily: 'var(--font-display)' }}>
                Choose Date
              </h2>
              <div className="flex gap-2 overflow-x-auto no-scrollbar pb-1">
                {DAYS.map((day, i) => (
                  <button
                    key={day}
                    onClick={() => setSelectedDate(DATES[i])}
                    className="shrink-0 flex flex-col items-center p-3 rounded-xl min-w-[56px] transition-all"
                    style={{
                      background: selectedDate === DATES[i] ? 'var(--color-deep)' : 'var(--color-neutral-50)',
                      border: `1.5px solid ${selectedDate === DATES[i] ? 'var(--color-deep)' : 'var(--color-border)'}`,
                    }}
                  >
                    <span className="text-[10px] font-semibold mb-1"
                      style={{ color: selectedDate === DATES[i] ? 'rgba(255,255,255,0.7)' : 'var(--color-ink-muted)', fontFamily: 'var(--font-display)' }}>
                      {day}
                    </span>
                    <span className="text-base font-extrabold"
                      style={{ color: selectedDate === DATES[i] ? '#fff' : 'var(--color-ink)', fontFamily: 'var(--font-display)' }}>
                      {DATES[i]}
                    </span>
                  </button>
                ))}
              </div>
            </div>

            <div>
              <h2 className="text-base font-extrabold mb-4" style={{ color: 'var(--color-ink)', fontFamily: 'var(--font-display)' }}>
                Choose Time
              </h2>
              <div className="grid grid-cols-4 gap-2">
                {TIME_SLOTS.map(time => (
                  <button
                    key={time}
                    onClick={() => setSelectedTime(time)}
                    className="py-2.5 rounded-xl text-xs font-semibold transition-all"
                    style={{
                      background: selectedTime === time ? 'var(--color-primary-light)' : 'var(--color-neutral-50)',
                      border: `1.5px solid ${selectedTime === time ? 'var(--color-primary)' : 'var(--color-border)'}`,
                      color: selectedTime === time ? 'var(--color-deep)' : 'var(--color-ink)',
                      fontFamily: 'var(--font-display)',
                    }}
                  >
                    {time}
                  </button>
                ))}
              </div>
            </div>
          </motion.div>
        )}

        {/* ── STEP 2: Details ── */}
        {step === 2 && (
          <motion.div
            key="step2"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            className="space-y-5"
          >
            <div>
              <label className="block text-xs font-semibold mb-2" style={{ color: 'var(--color-ink)', fontFamily: 'var(--font-display)' }}>
                Service Address
              </label>
              <div className="relative">
                <MapPin size={15} className="absolute left-3.5 top-1/2 -translate-y-1/2" style={{ color: 'var(--color-ink-muted)' }} />
                <input
                  type="text"
                  value={address}
                  onChange={e => setAddress(e.target.value)}
                  placeholder="Enter your full address"
                  className="w-full pl-10 pr-4 py-3 rounded-xl text-sm outline-none"
                  style={{
                    background: 'var(--color-neutral-50)',
                    border: '1.5px solid var(--color-border)',
                    color: 'var(--color-ink)',
                    fontFamily: 'var(--font-sans)',
                  }}
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-semibold mb-2" style={{ color: 'var(--color-ink)', fontFamily: 'var(--font-display)' }}>
                Special Instructions (Optional)
              </label>
              <textarea
                value={notes}
                onChange={e => setNotes(e.target.value)}
                placeholder="Any specific areas to focus on, pets at home, access codes, etc."
                rows={3}
                className="w-full px-4 py-3 rounded-xl text-sm outline-none resize-none"
                style={{
                  background: 'var(--color-neutral-50)',
                  border: '1.5px solid var(--color-border)',
                  color: 'var(--color-ink)',
                  fontFamily: 'var(--font-sans)',
                }}
              />
            </div>

            <div>
              <label className="block text-xs font-semibold mb-2" style={{ color: 'var(--color-ink)', fontFamily: 'var(--font-display)' }}>
                Promo Code
              </label>
              <div className="flex gap-2">
                <div className="relative flex-1">
                  <Tag size={15} className="absolute left-3.5 top-1/2 -translate-y-1/2" style={{ color: 'var(--color-ink-muted)' }} />
                  <input
                    type="text"
                    value={promoCode}
                    onChange={e => setPromoCode(e.target.value.toUpperCase())}
                    placeholder="WELCOME20"
                    className="w-full pl-10 pr-4 py-3 rounded-xl text-sm outline-none"
                    style={{
                      background: 'var(--color-neutral-50)',
                      border: `1.5px solid ${promoApplied ? 'var(--color-primary)' : 'var(--color-border)'}`,
                      color: 'var(--color-ink)',
                      fontFamily: 'var(--font-sans)',
                    }}
                  />
                </div>
                <button
                  onClick={() => promoCode === 'WELCOME20' && setPromoApplied(true)}
                  className="px-5 rounded-xl text-sm font-bold text-white transition-all hover:opacity-90"
                  style={{ background: 'var(--color-deep)', fontFamily: 'var(--font-display)' }}
                >
                  Apply
                </button>
              </div>
              {promoApplied && (
                <p className="text-xs mt-1.5 flex items-center gap-1" style={{ color: 'var(--color-primary)' }}>
                  <CheckCircle size={11} /> 20% discount applied — saving $9!
                </p>
              )}
            </div>
          </motion.div>
        )}

        {/* ── STEP 3: Payment ── */}
        {step === 3 && (
          <motion.div
            key="step3"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            className="space-y-5"
          >
            <div
              className="p-4 rounded-2xl"
              style={{ background: 'var(--color-primary-light)', border: '1px solid color-mix(in srgb, var(--color-primary) 20%, transparent)' }}
            >
              <div className="flex items-center gap-2 mb-3">
                <Shield size={14} style={{ color: 'var(--color-deep)' }} />
                <span className="text-xs font-bold" style={{ color: 'var(--color-deep)', fontFamily: 'var(--font-display)' }}>
                  Secure Payment — 256-bit SSL Encrypted
                </span>
              </div>
              {[
                { label: 'Service', value: 'Deep Home Cleaning', isRow: true },
                { label: 'Date',    value: `Mar ${selectedDate}, ${selectedTime}`, isRow: true },
                { label: 'Subtotal', value: '$45.00', isRow: true },
                ...(promoApplied ? [{ label: 'Discount (20%)', value: '-$9.00', isRow: true }] : []),
                { label: 'Total', value: `$${price}.00`, isRow: true, bold: true },
              ].map(({ label, value, bold }) => (
                <div key={label} className="flex justify-between text-sm py-1">
                  <span style={{ color: 'var(--color-ink-muted)' }}>{label}</span>
                  <span style={{ color: 'var(--color-ink)', fontWeight: bold ? 800 : 500, fontFamily: bold ? 'var(--font-display)' : 'inherit' }}>
                    {value}
                  </span>
                </div>
              ))}
            </div>

            <div className="space-y-3">
              <label className="block text-xs font-semibold" style={{ color: 'var(--color-ink)', fontFamily: 'var(--font-display)' }}>
                Card Information
              </label>
              {[
                { key: 'number', placeholder: '1234 5678 9012 3456', label: 'Card Number' },
                { key: 'name',   placeholder: 'John Doe', label: 'Cardholder Name' },
              ].map(({ key, placeholder, label }) => (
                <input
                  key={key}
                  type="text"
                  placeholder={placeholder}
                  value={card[key as keyof typeof card]}
                  onChange={e => setCard(c => ({ ...c, [key]: e.target.value }))}
                  className="w-full px-4 py-3 rounded-xl text-sm outline-none"
                  style={{
                    background: 'var(--color-neutral-50)',
                    border: '1.5px solid var(--color-border)',
                    color: 'var(--color-ink)',
                    fontFamily: 'var(--font-sans)',
                  }}
                />
              ))}
              <div className="grid grid-cols-2 gap-3">
                {[
                  { key: 'expiry', placeholder: 'MM/YY' },
                  { key: 'cvv',    placeholder: 'CVV' },
                ].map(({ key, placeholder }) => (
                  <input
                    key={key}
                    type="text"
                    placeholder={placeholder}
                    value={card[key as keyof typeof card]}
                    onChange={e => setCard(c => ({ ...c, [key]: e.target.value }))}
                    className="w-full px-4 py-3 rounded-xl text-sm outline-none"
                    style={{
                      background: 'var(--color-neutral-50)',
                      border: '1.5px solid var(--color-border)',
                      color: 'var(--color-ink)',
                      fontFamily: 'var(--font-sans)',
                    }}
                  />
                ))}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* ── CTA ── */}
      <div className="mt-7">
        {step < 3 ? (
          <button
            onClick={() => setStep((step + 1) as Step)}
            disabled={step === 1 && (!selectedTime)}
            className="w-full flex items-center justify-center gap-2 py-3.5 rounded-xl text-sm font-bold text-white transition-all hover:opacity-90 disabled:opacity-40"
            style={{
              background: 'linear-gradient(135deg, var(--color-deep) 0%, #005840 100%)',
              fontFamily: 'var(--font-display)',
              boxShadow: 'var(--shadow-md)',
            }}
          >
            Continue
            <ChevronRight size={15} />
          </button>
        ) : (
          <button
            onClick={handleConfirm}
            className="w-full flex items-center justify-center gap-2 py-3.5 rounded-xl text-sm font-bold text-white transition-all hover:opacity-90"
            style={{
              background: 'linear-gradient(135deg, var(--color-primary) 0%, #D1F843 100%)',
              fontFamily: 'var(--font-display)',
              boxShadow: '0 4px 14px rgba(209,248,67,0.35)',
            }}
          >
            <Zap size={15} />
            Confirm & Pay ${price}
          </button>
        )}
      </div>
    </div>
  );
};
