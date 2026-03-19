import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import {
  MessageCircle, Mail, Phone, ChevronDown, ChevronRight,
  Search, Send, CheckCircle2, ExternalLink, FileText,
  Zap, HelpCircle,
} from 'lucide-react';
import { Screen, UserType } from '../../types';

interface SupportPageProps {
  onNavigate: (s: Screen) => void;
  userType: UserType;
}

const FAQS_CUSTOMER = [
  { q: 'How do I book a service?', a: "Browse services on the Services page, click \"Book Now\" on your preferred listing, choose a date and time, confirm payment, and you're set. You'll receive a confirmation email immediately." },
  { q: 'Can I reschedule or cancel a booking?', a: 'Yes — head to My Bookings, select the booking, and choose Reschedule or Cancel. Cancellations made at least 24 hours before the appointment are fully refunded.' },
  { q: 'How are providers verified?', a: 'All providers complete a 5-step identity and skills verification, including government-issued ID, professional certifications, and a background check before they can offer services.' },
  { q: 'What payment methods are accepted?', a: 'We accept all major credit/debit cards, Apple Pay, Google Pay, and bank transfers. All payments are secured by industry-standard encryption.' },
  { q: 'What if I\'m not satisfied with a service?', a: 'We offer a 100% satisfaction guarantee. If you\'re not happy, contact support within 48 hours of the service and we\'ll arrange a free re-service or full refund.' },
];

const FAQS_PROVIDER = [
  { q: 'Why can\'t I post services yet?', a: 'Service posting is locked until your profile is 100% complete. This includes uploading a profile photo, writing a bio, adding skill tags, uploading a professional certification, and completing identity verification.' },
  { q: 'How do I receive payments?', a: 'Payments are deposited to your linked bank account within 3–5 business days after a service is marked complete. You can manage payout settings in your profile.' },
  { q: 'How are service fees calculated?', a: 'AIDER charges a 10% service fee on each completed booking. You keep 90% of every job. Fees are automatically deducted before payout.' },
  { q: 'Can I set my own pricing?', a: 'Absolutely. You have full control over your pricing, duration, and service areas. You can adjust prices at any time from your Services dashboard.' },
  { q: 'How do I improve my ranking in search?', a: 'Maintain a high response rate, complete all verifications, accumulate positive reviews, and keep your calendar up to date. Providers with 4.8+ ratings receive priority placement.' },
];

const TOPICS = [
  { id: 'bookings', label: 'Bookings', icon: CheckCircle2 },
  { id: 'payments', label: 'Payments', icon: FileText },
  { id: 'account', label: 'Account', icon: HelpCircle },
  { id: 'technical', label: 'Technical', icon: Zap },
];

export const SupportPage = ({ onNavigate, userType }: SupportPageProps) => {
  const [openFaq, setOpenFaq] = useState<number | null>(null);
  const [search, setSearch] = useState('');
  const [message, setMessage] = useState('');
  const [selectedTopic, setSelectedTopic] = useState('');
  const [sent, setSent] = useState(false);

  const faqs = userType === 'provider' ? FAQS_PROVIDER : FAQS_CUSTOMER;

  const filteredFaqs = faqs.filter(
    f => !search || f.q.toLowerCase().includes(search.toLowerCase()) || f.a.toLowerCase().includes(search.toLowerCase())
  );

  const handleSend = (e: React.FormEvent) => {
    e.preventDefault();
    if (!message.trim()) return;
    setSent(true);
  };

  return (
    <div className="pb-28 pt-2 max-w-3xl mx-auto">

      {/* ── Page header ── */}
      <header className="mb-8">
        <p className="text-xs font-semibold uppercase tracking-widest mb-1.5"
          style={{ color: 'var(--color-primary)', fontFamily: 'var(--font-display)' }}>
          Help Center
        </p>
        <h1 className="text-3xl md:text-4xl font-extrabold tracking-tight"
          style={{ color: 'var(--color-ink)', fontFamily: 'var(--font-display)' }}>
          Support
        </h1>
        <p className="mt-1.5 text-sm" style={{ color: 'var(--color-ink-muted)' }}>
          {userType === 'provider'
            ? 'Get help managing your business, bookings, and payments.'
            : "We're here to help with bookings, payments, and more."}
        </p>
      </header>

      {/* ── Quick contact cards ── */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-8">
        {[
          { icon: MessageCircle, label: 'Live Chat', sub: 'Avg. 2 min response', action: 'Start Chat', color: '#7C3AED', bg: '#F3EFFF' },
          { icon: Mail, label: 'Email Support', sub: 'support@aider.com', action: 'Send Email', color: '#2563EB', bg: '#EEF6FF' },
          { icon: Phone, label: 'Phone', sub: 'Mon–Fri, 9am–6pm PST', action: 'Call Now', color: 'var(--color-primary-hover)', bg: 'var(--color-primary-light)' },
        ].map(({ icon: Icon, label, sub, action, color, bg }) => (
          <motion.button
            key={label}
            whileTap={{ scale: 0.97 }}
            className="group flex flex-col items-start gap-3 p-5 rounded-2xl transition-all hover:-translate-y-0.5 text-left"
            style={{
              background: bg,
              border: `1px solid ${color}20`,
              boxShadow: 'var(--shadow-xs)',
            }}
          >
            <div className="h-10 w-10 rounded-xl flex items-center justify-center" style={{ background: `${color}18` }}>
              <Icon size={18} style={{ color }} strokeWidth={1.8} />
            </div>
            <div>
              <p className="text-sm font-bold" style={{ color: 'var(--color-ink)', fontFamily: 'var(--font-display)' }}>{label}</p>
              <p className="text-xs mt-0.5" style={{ color: 'var(--color-ink-muted)' }}>{sub}</p>
            </div>
            <span
              className="text-xs font-bold flex items-center gap-1"
              style={{ color, fontFamily: 'var(--font-display)' }}
            >
              {action}
              <ExternalLink size={11} strokeWidth={2.5} />
            </span>
          </motion.button>
        ))}
      </div>

      {/* ── FAQ section ── */}
      <section className="mb-8">
        <h2 className="text-xl font-extrabold mb-4" style={{ color: 'var(--color-ink)', fontFamily: 'var(--font-display)' }}>
          Frequently Asked Questions
        </h2>

        {/* Search */}
        <div className="relative mb-5">
          <Search size={16} className="absolute left-4 top-1/2 -translate-y-1/2" style={{ color: 'var(--color-neutral-400)' }} />
          <input
            type="search"
            value={search}
            onChange={e => setSearch(e.target.value)}
            placeholder="Search FAQs…"
            className="w-full py-3 pl-11 pr-4 rounded-xl text-sm outline-none transition-all"
            style={{
              background: 'var(--color-neutral-50)',
              border: '1.5px solid var(--color-border)',
              color: 'var(--color-ink)',
            }}
            onFocus={e => { e.currentTarget.style.borderColor = 'var(--color-primary)'; }}
            onBlur={e => { e.currentTarget.style.borderColor = 'var(--color-border)'; }}
          />
        </div>

        <div
          className="rounded-2xl overflow-hidden"
          style={{ background: 'var(--color-surface)', border: '1px solid var(--color-border)', boxShadow: 'var(--shadow-xs)' }}
        >
          {filteredFaqs.length === 0 ? (
            <div className="py-10 text-center">
              <p className="text-sm font-semibold" style={{ color: 'var(--color-ink-muted)', fontFamily: 'var(--font-display)' }}>
                No matching questions found.
              </p>
            </div>
          ) : (
            filteredFaqs.map((faq, idx) => (
              <div
                key={idx}
                style={{ borderBottom: idx < filteredFaqs.length - 1 ? '1px solid var(--color-border)' : 'none' }}
              >
                <button
                  onClick={() => setOpenFaq(openFaq === idx ? null : idx)}
                  className="w-full flex items-center justify-between gap-4 px-5 py-4 text-left transition-colors hover:bg-[var(--color-neutral-50)]"
                >
                  <span className="text-sm font-semibold" style={{ color: 'var(--color-ink)', fontFamily: 'var(--font-display)' }}>
                    {faq.q}
                  </span>
                  <motion.div animate={{ rotate: openFaq === idx ? 180 : 0 }} transition={{ duration: 0.2 }}>
                    <ChevronDown size={17} style={{ color: 'var(--color-neutral-400)' }} />
                  </motion.div>
                </button>
                <AnimatePresence>
                  {openFaq === idx && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
                      className="overflow-hidden"
                    >
                      <p className="px-5 pb-5 text-sm leading-relaxed" style={{ color: 'var(--color-ink-muted)' }}>
                        {faq.a}
                      </p>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            ))
          )}
        </div>
      </section>

      {/* ── Contact form ── */}
      <section>
        <h2 className="text-xl font-extrabold mb-4" style={{ color: 'var(--color-ink)', fontFamily: 'var(--font-display)' }}>
          Still need help?
        </h2>

        <div
          className="rounded-2xl p-6"
          style={{ background: 'var(--color-surface)', border: '1px solid var(--color-border)', boxShadow: 'var(--shadow-xs)' }}
        >
          {sent ? (
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              className="flex flex-col items-center text-center gap-3 py-6"
            >
              <div className="h-14 w-14 rounded-2xl flex items-center justify-center" style={{ background: '#EEFAEF' }}>
                <CheckCircle2 size={28} style={{ color: '#16A34A' }} strokeWidth={2} />
              </div>
              <h3 className="text-base font-extrabold" style={{ color: 'var(--color-ink)', fontFamily: 'var(--font-display)' }}>
                Message Sent!
              </h3>
              <p className="text-sm" style={{ color: 'var(--color-ink-muted)' }}>
                We've received your message and will reply within 24 hours.
              </p>
              <button
                onClick={() => { setSent(false); setMessage(''); setSelectedTopic(''); }}
                className="text-sm font-semibold mt-2 hover:underline"
                style={{ color: 'var(--color-primary)', fontFamily: 'var(--font-display)' }}
              >
                Send another message
              </button>
            </motion.div>
          ) : (
            <form onSubmit={handleSend} className="flex flex-col gap-4">
              {/* Topic selector */}
              <div>
                <p className="text-sm font-bold mb-2" style={{ color: 'var(--color-ink)', fontFamily: 'var(--font-display)' }}>
                  Topic
                </p>
                <div className="flex flex-wrap gap-2">
                  {TOPICS.map(({ id, label, icon: Icon }) => (
                    <motion.button
                      key={id}
                      type="button"
                      whileTap={{ scale: 0.95 }}
                      onClick={() => setSelectedTopic(id)}
                      className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs font-bold transition-all"
                      style={{
                        background: selectedTopic === id ? 'var(--color-primary-light)' : 'var(--color-neutral-50)',
                        border: `1.5px solid ${selectedTopic === id ? 'var(--color-primary)' : 'var(--color-border)'}`,
                        color: selectedTopic === id ? 'var(--color-deep)' : 'var(--color-ink-muted)',
                        fontFamily: 'var(--font-display)',
                      }}
                    >
                      <Icon size={12} strokeWidth={2.5} />
                      {label}
                    </motion.button>
                  ))}
                </div>
              </div>

              {/* Message */}
              <div>
                <label className="block text-sm font-bold mb-2" style={{ color: 'var(--color-ink)', fontFamily: 'var(--font-display)' }}>
                  Message
                </label>
                <textarea
                  value={message}
                  onChange={e => setMessage(e.target.value)}
                  rows={5}
                  placeholder="Describe your issue in detail…"
                  className="w-full resize-none rounded-2xl p-4 text-sm outline-none transition-all"
                  style={{
                    background: 'var(--color-neutral-50)',
                    border: '1.5px solid var(--color-border)',
                    color: 'var(--color-ink)',
                    fontFamily: 'var(--font-sans)',
                  }}
                  onFocus={e => { e.currentTarget.style.borderColor = 'var(--color-primary)'; }}
                  onBlur={e => { e.currentTarget.style.borderColor = 'var(--color-border)'; }}
                />
              </div>

              <motion.button
                type="submit"
                whileTap={{ scale: 0.97 }}
                disabled={!message.trim()}
                className="flex items-center justify-center gap-2 w-full py-4 rounded-2xl text-sm font-bold text-white transition-all disabled:opacity-40"
                style={{
                  background: 'linear-gradient(135deg, var(--color-deep) 0%, var(--color-primary) 100%)',
                  fontFamily: 'var(--font-display)',
                  boxShadow: 'var(--shadow-md)',
                }}
              >
                <Send size={16} strokeWidth={2.5} />
                Send Message
              </motion.button>
            </form>
          )}
        </div>
      </section>
    </div>
  );
};
