import React, { useState } from 'react';
import { motion } from 'motion/react';
import {
  Search, ChevronRight, ChevronDown, BookOpen, MessageCircle,
  Mail, Phone, ExternalLink, Star, CheckCircle, ArrowRight,
  Zap, Shield, Clock, Users, LifeBuoy, AlertCircle,
} from 'lucide-react';
import { Screen } from '../../types';

interface HelpCenterProps {
  onNavigate: (s: Screen) => void;
}

type AuthStatus = 'guest' | 'customer' | 'provider';

const CATEGORIES = [
  { id: 'getting-started', label: 'Getting Started',   icon: Zap,          color: '#16A34A', bg: '#EEFAEF' },
  { id: 'bookings',        label: 'Bookings',           icon: BookOpen,     color: '#2563EB', bg: '#EEF6FF' },
  { id: 'payments',        label: 'Payments',           icon: Shield,       color: '#EA580C', bg: '#FFF4EC' },
  { id: 'providers',       label: 'For Providers',      icon: Users,        color: '#7C3AED', bg: '#F3EFFF' },
  { id: 'account',         label: 'Account & Security', icon: CheckCircle,  color: 'var(--color-deep)', bg: 'var(--color-primary-light)' },
  { id: 'safety',          label: 'Safety',             icon: LifeBuoy,     color: '#DB2777', bg: '#FEF0F9' },
];

const FAQS = [
  { q: 'How do I book a service?',       a: 'Browse services, select the one you need, choose a time slot, and confirm your booking in three easy steps. Payment is held securely until the service is complete.', cat: 'bookings' },
  { q: 'Are service providers verified?', a: 'Yes! Every provider on AiDER undergoes identity verification, background checks, and must submit professional certifications before being approved.', cat: 'getting-started' },
  { q: 'What if I\'m unhappy with a service?', a: 'We offer a 24-hour satisfaction guarantee. Contact our support team within 24 hours of service completion and we will work to make it right, including potential refunds.', cat: 'bookings' },
  { q: 'How do payouts work for providers?', a: 'Payments are released to your wallet 24 hours after service completion. You can request a payout to your bank or debit card at any time, with funds arriving in 1–3 business days.', cat: 'providers' },
  { q: 'Can I cancel a booking?',        a: 'Yes. Cancellations made 24+ hours before the scheduled service are fully refunded. Late cancellations (under 24 hours) may incur a 20% fee to compensate the provider.', cat: 'bookings' },
  { q: 'How are service prices determined?', a: 'Providers set their own prices. You will always see the full price before confirming a booking — no hidden fees.', cat: 'payments' },
  { q: 'What documents do I need for ID verification?', a: 'We accept government-issued photo ID: passport, driver\'s license, or national identity card. All documents are encrypted and stored securely.', cat: 'providers' },
  { q: 'Is my payment information secure?', a: 'Absolutely. We use 256-bit SSL encryption and are PCI-DSS compliant. We never store your full card details on our servers.', cat: 'payments' },
];

export const HelpCenter = ({ onNavigate }: HelpCenterProps) => {
  const [search, setSearch] = useState('');
  const [activeCategory, setActiveCategory] = useState<string | null>(null);
  const [openFAQ, setOpenFAQ] = useState<string | null>(null);

  const filtered = FAQS.filter(f => {
    const matchSearch = !search || f.q.toLowerCase().includes(search.toLowerCase());
    const matchCat = !activeCategory || f.cat === activeCategory;
    return matchSearch && matchCat;
  });

  return (
    <div className="w-full">

      {/* ── Hero ── */}
      <div
        className="w-full py-16 px-5 lg:px-8 text-center relative overflow-hidden"
        style={{ background: 'linear-gradient(160deg, var(--color-deep) 0%, #006b4e 100%)' }}
      >
        <div className="absolute inset-0 opacity-[0.04]"
          style={{ backgroundImage: 'radial-gradient(rgba(255,255,255,0.4) 1px, transparent 1px)', backgroundSize: '24px 24px' }} />
        <div className="relative max-w-2xl mx-auto">
          <p className="text-xs font-semibold uppercase tracking-widest mb-3"
            style={{ color: 'var(--color-primary)', fontFamily: 'var(--font-display)' }}>
            Support Center
          </p>
          <h1 className="text-4xl font-extrabold text-white mb-3" style={{ fontFamily: 'var(--font-display)' }}>
            How can we help?
          </h1>
          <p className="text-base mb-7" style={{ color: 'rgba(255,255,255,0.65)' }}>
            Find answers, guides, and support for all things AiDER.
          </p>
          <div
            className="flex items-center gap-3 px-4 py-3 rounded-2xl max-w-lg mx-auto"
            style={{ background: 'rgba(255,255,255,0.12)', backdropFilter: 'blur(20px)', border: '1px solid rgba(255,255,255,0.2)' }}
          >
            <Search size={16} className="text-white opacity-70 shrink-0" />
            <input
              type="text"
              value={search}
              onChange={e => setSearch(e.target.value)}
              placeholder="Search for answers..."
              className="flex-1 bg-transparent text-sm outline-none text-white placeholder-white/50"
            />
          </div>
        </div>
      </div>

      <div className="mx-auto max-w-5xl px-5 lg:px-8 py-12 space-y-12">

        {/* ── Category Grid ── */}
        <div>
          <h2 className="text-xl font-extrabold mb-5" style={{ color: 'var(--color-ink)', fontFamily: 'var(--font-display)' }}>
            Browse by Topic
          </h2>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
            {CATEGORIES.map(({ id, label, icon: Icon, color, bg }) => (
              <button
                key={id}
                onClick={() => setActiveCategory(activeCategory === id ? null : id)}
                className="flex items-center gap-3 p-4 rounded-2xl text-left transition-all hover:-translate-y-0.5 hover:shadow-md"
                style={{
                  background: activeCategory === id ? color : bg,
                  border: `1px solid ${color}20`,
                }}
              >
                <div className="h-9 w-9 rounded-xl flex items-center justify-center shrink-0"
                  style={{ background: activeCategory === id ? 'rgba(255,255,255,0.2)' : `${color}15` }}>
                  <Icon size={17} style={{ color: activeCategory === id ? '#fff' : color }} />
                </div>
                <span className="text-sm font-semibold"
                  style={{ color: activeCategory === id ? '#fff' : 'var(--color-ink)', fontFamily: 'var(--font-display)' }}>
                  {label}
                </span>
                <ChevronRight size={13} className="ml-auto"
                  style={{ color: activeCategory === id ? 'rgba(255,255,255,0.7)' : 'var(--color-neutral-400)' }} />
              </button>
            ))}
          </div>
        </div>

        {/* ── FAQs ── */}
        <div>
          <div className="flex items-center justify-between mb-5">
            <h2 className="text-xl font-extrabold" style={{ color: 'var(--color-ink)', fontFamily: 'var(--font-display)' }}>
              Frequently Asked Questions
            </h2>
            {activeCategory && (
              <button
                onClick={() => setActiveCategory(null)}
                className="text-xs font-semibold"
                style={{ color: 'var(--color-primary)', fontFamily: 'var(--font-display)' }}
              >
                Clear filter
              </button>
            )}
          </div>
          <div className="space-y-2.5">
            {filtered.map((faq, idx) => (
              <motion.div
                key={faq.q}
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: idx * 0.04 }}
                className="rounded-2xl overflow-hidden"
                style={{ background: 'var(--color-surface)', border: '1px solid var(--color-border)', boxShadow: 'var(--shadow-xs)' }}
              >
                <button
                  className="w-full flex items-center justify-between gap-3 px-5 py-4 text-left"
                  onClick={() => setOpenFAQ(openFAQ === faq.q ? null : faq.q)}
                >
                  <span className="text-sm font-semibold" style={{ color: 'var(--color-ink)', fontFamily: 'var(--font-display)' }}>
                    {faq.q}
                  </span>
                  <ChevronDown
                    size={16}
                    style={{
                      color: 'var(--color-ink-muted)',
                      transform: openFAQ === faq.q ? 'rotate(180deg)' : 'none',
                      transition: 'transform 0.2s',
                      shrink: 0,
                    }}
                    className="shrink-0"
                  />
                </button>
                {openFAQ === faq.q && (
                  <motion.div
                    initial={{ height: 0 }}
                    animate={{ height: 'auto' }}
                    exit={{ height: 0 }}
                    className="px-5 pb-4"
                  >
                    <p className="text-sm leading-relaxed" style={{ color: 'var(--color-ink-muted)' }}>
                      {faq.a}
                    </p>
                  </motion.div>
                )}
              </motion.div>
            ))}
            {filtered.length === 0 && (
              <div className="text-center py-10">
                <AlertCircle size={28} className="mx-auto mb-3" style={{ color: 'var(--color-neutral-300)' }} />
                <p className="text-sm" style={{ color: 'var(--color-ink-muted)' }}>
                  No results found. Try a different search term.
                </p>
              </div>
            )}
          </div>
        </div>

        {/* ── Contact ── */}
        <div
          className="relative rounded-3xl p-8 overflow-hidden"
          style={{ background: 'linear-gradient(135deg, var(--color-deep) 0%, #006b4e 100%)' }}
        >
          <div className="absolute -top-8 -right-8 h-32 w-32 rounded-full opacity-10"
            style={{ background: 'var(--color-primary)', filter: 'blur(30px)' }} />
          <div className="relative">
            <h3 className="text-xl font-extrabold text-white mb-2" style={{ fontFamily: 'var(--font-display)' }}>
              Still need help?
            </h3>
            <p className="text-sm mb-6" style={{ color: 'rgba(255,255,255,0.65)' }}>
              Our support team is available 24/7 to help you.
            </p>
            <div className="flex flex-wrap gap-3">
              {[
                { icon: Mail,           label: 'Email Support',    sub: 'support@aider.com' },
                { icon: MessageCircle,  label: 'Live Chat',        sub: 'Average 2 min response' },
                { icon: Phone,          label: 'Phone Support',    sub: '+1 (800) AiDER-01' },
              ].map(({ icon: Icon, label, sub }) => (
                <button
                  key={label}
                  className="flex items-center gap-3 px-4 py-3 rounded-xl transition-all hover:opacity-90"
                  style={{ background: 'rgba(255,255,255,0.1)', border: '1px solid rgba(255,255,255,0.15)' }}
                >
                  <Icon size={16} className="text-white opacity-80 shrink-0" />
                  <div className="text-left">
                    <p className="text-xs font-bold text-white" style={{ fontFamily: 'var(--font-display)' }}>{label}</p>
                    <p className="text-[10px]" style={{ color: 'rgba(255,255,255,0.55)' }}>{sub}</p>
                  </div>
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
