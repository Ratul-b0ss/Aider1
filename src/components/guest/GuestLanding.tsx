import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import {
  Search, Star, Zap, CheckCircle, ArrowRight,
  Sparkles, Wrench, Brush, Truck, Flower2, Paintbrush,
  Users, ChevronRight, TrendingUp,
  Smartphone, Globe, MessageSquare, CalendarCheck,
} from 'lucide-react';
import { Screen } from '../../types';
import { Footer } from '../layout/Footer';

interface GuestLandingProps {
  onNavigate: (s: Screen) => void;
}

const CATEGORIES = [
  { id: 'cleaning',  name: 'Cleaning',   icon: Sparkles,   bg: '#e6f5f0', color: '#005B40' },
  { id: 'repair',    name: 'Repair',     icon: Wrench,     bg: '#FFF4EC', color: '#EA580C' },
  { id: 'beauty',    name: 'Beauty',     icon: Brush,      bg: '#FEF0F9', color: '#DB2777' },
  { id: 'moving',    name: 'Moving',     icon: Truck,      bg: '#F3EFFF', color: '#7C3AED' },
  { id: 'gardening', name: 'Gardening',  icon: Flower2,    bg: '#e6f5f0', color: '#005B40' },
  { id: 'painting',  name: 'Painting',   icon: Paintbrush, bg: '#FEFCE8', color: '#CA8A04' },
];

const HOW_IT_WORKS_CUSTOMER = [
  { step: '01', title: 'Search & Browse', desc: 'Find from 100+ services by category, location or keyword.', color: '#D1F843' },
  { step: '02', title: 'Book Instantly',  desc: 'Select your time slot and pay securely in one tap.',        color: '#ffffff' },
  { step: '03', title: 'Get It Done',     desc: 'A verified pro arrives on time. Rate when complete.',       color: '#1F8FE8' },
];

const HOW_IT_WORKS_PROVIDER = [
  { step: '01', title: 'Create Profile',  desc: 'Set up your pro profile with skills, certs and ID.',     color: '#D1F843' },
  { step: '02', title: 'Post Your Gig',   desc: 'List your services with pricing and availability.',       color: '#ffffff' },
  { step: '03', title: 'Earn & Grow',     desc: 'Accept bookings, collect payments, build your rating.',   color: '#1F8FE8' },
];

const TRUST_STATS = [
  { value: '10K+', label: 'Verified Pros',   icon: Users },
  { value: '50K+', label: 'Jobs Completed',  icon: CheckCircle },
  { value: '4.9',  label: 'Avg Rating',      icon: Star },
  { value: '98%',  label: 'Satisfaction',    icon: TrendingUp },
];

const TESTIMONIALS = [
  {
    name: 'Sarah Mitchell', role: 'Homeowner', avatar: 'SM',
    quote: "Found an amazing plumber within 10 minutes. The whole experience was seamless.",
    rating: 5, color: '#e6f5f0',
  },
  {
    name: 'James Okafor', role: 'Freelance Cleaner', avatar: 'JO',
    quote: "As a provider, I went from 2 bookings/week to 18 in just a month. The platform pays out fast and fair.",
    rating: 5, color: '#ECF0EF',
  },
  {
    name: 'Priya Sharma', role: 'Small Business Owner', avatar: 'PS',
    quote: "The verification system gives me total confidence. I always know the pros I hire are legit.",
    rating: 5, color: '#FFF4EC',
  },
];

const FLOATING_ICONS = [
  { icon: CalendarCheck, label: 'Booking',    x: '10%',  y: '18%', delay: 0.3 },
  { icon: MessageSquare, label: 'Chat',       x: '65%',  y: '8%',  delay: 0.5 },
  { icon: Globe,         label: 'Discover',   x: '72%',  y: '55%', delay: 0.7 },
  { icon: Smartphone,    label: 'Mobile',     x: '15%',  y: '65%', delay: 0.4 },
];

export const GuestLanding = ({ onNavigate }: GuestLandingProps) => {
  const [activeTab, setActiveTab] = useState<'customer' | 'provider'>('customer');

  return (
    <div className="w-full bg-white">

      {/* NAVBAR — solid white, logo + auth buttons only */}
      <nav
        className="sticky top-0 z-50 w-full"
        style={{
          background: '#ffffff',
          borderBottom: '1px solid #e5e7eb',
          boxShadow: '0 1px 3px rgba(0,0,0,0.06)',
        }}
      >
        <div className="mx-auto max-w-7xl px-5 lg:px-8 flex h-16 items-center justify-between">
          {/* Logo */}
          <div className="flex items-center gap-2.5">
            <div
              className="h-8 w-8 rounded-lg flex items-center justify-center"
              style={{ background: 'linear-gradient(135deg, #005B40 0%, #00a86b 100%)' }}
            >
              <Star size={14} className="text-white" strokeWidth={2.5} />
            </div>
            <span
              className="text-base font-extrabold tracking-tight"
              style={{ fontFamily: 'var(--font-display)', color: '#111827', letterSpacing: '-0.02em' }}
            >
              AiDER
            </span>
          </div>

          {/* Auth Buttons */}
          <div className="flex items-center gap-2">
            <button
              onClick={() => onNavigate('login')}
              className="px-4 py-2 rounded-lg text-sm font-semibold transition-colors hover:bg-gray-50"
              style={{ color: '#374151', fontFamily: 'var(--font-display)', border: '1px solid #d1d5db' }}
            >
              Log In
            </button>
            <button
              onClick={() => onNavigate('signup')}
              className="px-4 py-2 rounded-lg text-sm font-semibold transition-all hover:bg-gray-900"
              style={{
                background: '#111827',
                color: '#ffffff',
                fontFamily: 'var(--font-display)',
              }}
            >
              Sign Up
            </button>
          </div>
        </div>
      </nav>

      {/* HERO SECTION */}
      <section className="relative overflow-hidden"
        style={{ background: '#ECF0EF', paddingBlock: 'clamp(2.5rem, 6vw, 4rem)' }}>
        <div className="absolute inset-0 pointer-events-none overflow-hidden">
          <div className="absolute -top-20 -right-20 h-[380px] w-[380px] rounded-full opacity-[0.18]"
            style={{ background: '#D1F843', filter: 'blur(60px)' }} />
          <div className="absolute bottom-0 left-1/4 h-[200px] w-[200px] rounded-full opacity-[0.10]"
            style={{ background: '#005B40', filter: 'blur(50px)' }} />
        </div>

        <div className="mx-auto max-w-7xl px-5 lg:px-8 relative">
          <div className="grid lg:grid-cols-2 gap-10 xl:gap-14 items-center">
            <div>
              <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }} className="space-y-5">

                <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full text-xs font-semibold"
                  style={{ background: '#D1F843', color: '#005B40', fontFamily: 'var(--font-display)' }}>
                  <Zap size={12} strokeWidth={2.5} />
                  AI-Powered Service Marketplace
                </div>

                <h1 className="leading-[1.08] tracking-tight"
                  style={{ fontSize: 'clamp(2.8rem, 5.5vw, 5.2rem)', fontFamily: 'var(--font-display)',
                    fontWeight: 800, color: '#005B40', letterSpacing: '-0.03em' }}>
                  Fast, reliable services<br />for any need.
                </h1>

                <button
                  onClick={() => onNavigate('signup')}
                  className="group inline-flex items-center gap-2 px-8 py-4 rounded-xl text-base font-bold transition-all hover:bg-gray-900 hover:text-white"
                  style={{
                    background: 'transparent',
                    color: '#111827',
                    fontFamily: 'var(--font-display)',
                    border: '2px solid #111827',
                  }}
                >
                  Get started
                  <ArrowRight size={16} className="group-hover:translate-x-0.5 transition-transform" />
                </button>
              </motion.div>
            </div>

            {/* Right Column: IONOS-style Visual */}
            <motion.div initial={{ opacity: 0, x: 24 }} animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.7, delay: 0.15, ease: [0.16, 1, 0.3, 1] }}
              className="relative flex items-center justify-center" style={{ minHeight: '420px' }}>

              <div className="absolute rounded-full"
                style={{ width: '320px', height: '320px', background: 'linear-gradient(135deg, #D1F843 0%, #b8e030 100%)',
                  top: '50%', left: '50%', transform: 'translate(-50%, -50%)', opacity: 0.35 }} />
              <div className="absolute rounded-full"
                style={{ width: '180px', height: '180px', background: '#005B40', bottom: '5%', right: '5%', opacity: 0.15 }} />

              <div className="relative rounded-3xl overflow-hidden z-10"
                style={{ background: 'linear-gradient(150deg, #005B40 0%, #004a34 60%, #007a55 100%)',
                  boxShadow: '0 32px 64px -12px rgba(0,91,64,0.35)', width: '100%', maxWidth: '380px', aspectRatio: '1 / 0.95' }}>
                <div className="absolute inset-0 opacity-5"
                  style={{ backgroundImage: 'radial-gradient(rgba(255,255,255,0.4) 1px, transparent 1px)', backgroundSize: '24px 24px' }} />
                <div className="absolute inset-0 p-7 flex flex-col justify-between">
                  <div>
                    <p className="text-xs font-semibold uppercase tracking-wider mb-1"
                      style={{ color: '#D1F843', fontFamily: 'var(--font-display)' }}>Platform Overview</p>
                    <h3 className="text-2xl font-extrabold text-white" style={{ fontFamily: 'var(--font-display)' }}>
                      Trusted by thousands
                    </h3>
                  </div>
                  <div className="grid grid-cols-2 gap-3">
                    {TRUST_STATS.map(({ value, label, icon: Icon }) => (
                      <div key={label} className="rounded-2xl p-3.5"
                        style={{ background: 'rgba(255,255,255,0.1)', backdropFilter: 'blur(10px)', border: '1px solid rgba(255,255,255,0.1)' }}>
                        <div className="flex items-center gap-2 mb-1">
                          <Icon size={13} style={{ color: '#D1F843' }} />
                          <p className="text-xl font-extrabold text-white" style={{ fontFamily: 'var(--font-display)' }}>{value}</p>
                        </div>
                        <p className="text-xs" style={{ color: 'rgba(255,255,255,0.55)', fontFamily: 'var(--font-display)' }}>{label}</p>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {FLOATING_ICONS.map(({ icon: Icon, label, x, y, delay }) => (
                <motion.div key={label} initial={{ opacity: 0, scale: 0.7 }} animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.5, delay }}
                  className="absolute z-20 flex items-center gap-2 px-3 py-2.5 rounded-xl"
                  style={{ left: x, top: y, background: 'rgba(255,255,255,0.95)', boxShadow: '0 8px 24px rgba(0,0,0,0.12)',
                    border: '1px solid rgba(0,91,64,0.08)', backdropFilter: 'blur(10px)' }}>
                  <div className="h-8 w-8 rounded-lg flex items-center justify-center" style={{ background: '#e6f5f0' }}>
                    <Icon size={14} style={{ color: '#005B40' }} strokeWidth={2} />
                  </div>
                  <span className="text-xs font-semibold hidden sm:block" style={{ color: '#005B40', fontFamily: 'var(--font-display)' }}>
                    {label}
                  </span>
                </motion.div>
              ))}

              <motion.div initial={{ opacity: 0, scale: 0.8 }} animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5, delay: 0.5 }}
                className="absolute -bottom-4 left-4 flex items-center gap-3 px-4 py-3 rounded-2xl z-20"
                style={{ background: '#fff', boxShadow: '0 12px 32px rgba(0,0,0,0.12)', border: '1px solid rgba(0,91,64,0.08)' }}>
                <div className="h-9 w-9 rounded-xl flex items-center justify-center" style={{ background: '#D1F843' }}>
                  <Star size={16} style={{ color: '#005B40' }} className="fill-current" />
                </div>
                <div>
                  <p className="text-xs font-extrabold" style={{ color: '#005B40', fontFamily: 'var(--font-display)' }}>4.9 / 5.0</p>
                  <p className="text-[11px]" style={{ color: 'var(--color-ink-muted)' }}>128 ratings today</p>
                </div>
              </motion.div>

              <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.65 }}
                className="absolute -top-3 right-0 px-4 py-3 rounded-2xl flex items-center gap-2 z-20"
                style={{ background: '#D1F843', boxShadow: '0 8px 24px rgba(209,248,67,0.35)' }}>
                <Zap size={14} style={{ color: '#005B40' }} />
                <span className="text-xs font-bold" style={{ color: '#005B40', fontFamily: 'var(--font-display)' }}>Book in 60 seconds</span>
              </motion.div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* CATEGORIES */}
      <section className="py-16 lg:py-24" style={{ background: '#ECF0EF' }}>
        <div className="mx-auto max-w-7xl px-5 lg:px-8">
          <div className="text-center mb-12">
            <p className="text-xs font-semibold uppercase tracking-widest mb-3"
              style={{ color: '#005B40', fontFamily: 'var(--font-display)' }}>Browse</p>
            <h2 className="text-4xl font-extrabold" style={{ color: '#005B40', fontFamily: 'var(--font-display)' }}>
              Every service you need
            </h2>
            <p className="mt-3 text-base" style={{ color: 'var(--color-ink-muted)' }}>
              From quick repairs to full home transformations.
            </p>
          </div>
          <div className="grid grid-cols-3 sm:grid-cols-6 gap-4">
            {CATEGORIES.map((cat, idx) => (
              <motion.button key={cat.id} initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }} transition={{ duration: 0.4, delay: idx * 0.06 }}
                onClick={() => onNavigate('signup')}
                className="group flex flex-col items-center gap-3 p-5 rounded-2xl transition-all hover:-translate-y-1 hover:shadow-md"
                style={{ background: '#fff', border: '1px solid ' + cat.color + '18' }}>
                <div className="h-12 w-12 rounded-xl flex items-center justify-center transition-transform group-hover:scale-110"
                  style={{ background: cat.bg }}>
                  <cat.icon size={22} style={{ color: cat.color }} strokeWidth={1.8} />
                </div>
                <span className="text-[0.8125rem] font-semibold text-center leading-none"
                  style={{ color: cat.color, fontFamily: 'var(--font-display)' }}>{cat.name}</span>
              </motion.button>
            ))}
          </div>
        </div>
      </section>

      {/* HOW IT WORKS */}
      <section className="py-16 lg:py-24 relative overflow-hidden"
        style={{ background: 'linear-gradient(160deg, #003d2b 0%, #005B40 100%)' }}>
        <div className="absolute inset-0 opacity-5 pointer-events-none"
          style={{ backgroundImage: 'radial-gradient(rgba(209,248,67,0.5) 1px, transparent 1px)', backgroundSize: '28px 28px' }} />
        <div className="mx-auto max-w-7xl px-5 lg:px-8 relative">
          <div className="text-center mb-10">
            <p className="text-xs font-semibold uppercase tracking-widest mb-3"
              style={{ color: '#D1F843', fontFamily: 'var(--font-display)' }}>Simple Process</p>
            <h2 className="text-4xl font-extrabold text-white" style={{ fontFamily: 'var(--font-display)' }}>
              How AiDER Works
            </h2>
            <p className="mt-3 text-base" style={{ color: 'rgba(255,255,255,0.55)' }}>
              Whether you are hiring or earning — it is three simple steps.
            </p>
            <div className="inline-flex mt-6 p-1 rounded-xl gap-1"
              style={{ background: 'rgba(255,255,255,0.08)', border: '1px solid rgba(255,255,255,0.1)' }}>
              {(['customer', 'provider'] as const).map(tab => (
                <button key={tab} onClick={() => setActiveTab(tab)}
                  className="px-6 py-2.5 rounded-lg text-sm font-bold transition-all capitalize"
                  style={{ fontFamily: 'var(--font-display)',
                    background: activeTab === tab ? '#D1F843' : 'transparent',
                    color: activeTab === tab ? '#005B40' : 'rgba(255,255,255,0.5)',
                    boxShadow: activeTab === tab ? '0 4px 14px rgba(209,248,67,0.35)' : 'none' }}>
                  {tab === 'customer' ? 'I want to Hire' : 'I want to Earn'}
                </button>
              ))}
            </div>
          </div>

          <AnimatePresence mode="wait">
            <motion.div key={activeTab} initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }} transition={{ duration: 0.3 }}
              className="grid md:grid-cols-3 gap-6 max-w-4xl mx-auto">
              {(activeTab === 'customer' ? HOW_IT_WORKS_CUSTOMER : HOW_IT_WORKS_PROVIDER).map((item, idx) => (
                <motion.div key={item.step} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.4, delay: idx * 0.1 }} className="relative rounded-2xl p-6"
                  style={{ background: 'rgba(255,255,255,0.09)', backdropFilter: 'blur(20px)', border: '1px solid rgba(255,255,255,0.15)' }}>
                  <div className="text-5xl font-black mb-4 leading-none"
                    style={{ color: item.color, fontFamily: 'var(--font-display)', opacity: 0.9 }}>{item.step}</div>
                  <h3 className="text-lg font-extrabold text-white mb-2" style={{ fontFamily: 'var(--font-display)' }}>{item.title}</h3>
                  <p className="text-sm leading-relaxed" style={{ color: 'rgba(255,255,255,0.65)' }}>{item.desc}</p>
                  {idx < 2 && <ChevronRight size={22} className="absolute -right-4 top-1/2 -translate-y-1/2 hidden md:block z-10"
                    style={{ color: 'rgba(255,255,255,0.5)' }} />}
                </motion.div>
              ))}
            </motion.div>
          </AnimatePresence>

          <div className="text-center mt-10">
            <button onClick={() => onNavigate('signup')}
              className="inline-flex items-center gap-2 px-8 py-3.5 rounded-xl text-sm font-bold transition-all hover:opacity-90"
              style={{ background: '#1F8FE8', color: '#fff', fontFamily: 'var(--font-display)', boxShadow: '0 8px 24px rgba(31,143,232,0.35)' }}>
              {activeTab === 'customer' ? 'Find a Pro Now' : 'Start Earning Today'}
              <ArrowRight size={15} />
            </button>
          </div>
        </div>
      </section>

      {/* TESTIMONIALS */}
      <section className="py-16 lg:py-24" style={{ background: '#fff' }}>
        <div className="mx-auto max-w-7xl px-5 lg:px-8">
          <div className="text-center mb-12">
            <p className="text-xs font-semibold uppercase tracking-widest mb-3"
              style={{ color: '#005B40', fontFamily: 'var(--font-display)' }}>Stories</p>
            <h2 className="text-4xl font-extrabold" style={{ color: '#005B40', fontFamily: 'var(--font-display)' }}>
              Loved by customers & pros
            </h2>
          </div>
          <div className="grid md:grid-cols-3 gap-6">
            {TESTIMONIALS.map((t, idx) => (
              <motion.div key={t.name} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }} transition={{ duration: 0.4, delay: idx * 0.1 }}
                className="rounded-2xl p-6 flex flex-col gap-4"
                style={{ background: t.color, border: '1px solid var(--color-border)', boxShadow: 'var(--shadow-sm)' }}>
                <div className="flex gap-0.5">
                  {Array.from({ length: t.rating }).map((_, i) => (
                    <Star key={i} size={14} className="fill-yellow-400 text-yellow-400" />
                  ))}
                </div>
                <p className="text-sm leading-relaxed italic" style={{ color: '#005B40' }}>
                  &ldquo;{t.quote}&rdquo;
                </p>
                <div className="flex items-center gap-3 mt-auto">
                  <div className="h-10 w-10 rounded-xl flex items-center justify-center text-xs font-bold text-white shrink-0"
                    style={{ background: 'linear-gradient(135deg, #005B40 0%, #007a55 100%)' }}>{t.avatar}</div>
                  <div>
                    <p className="text-sm font-bold" style={{ color: '#005B40', fontFamily: 'var(--font-display)' }}>{t.name}</p>
                    <p className="text-xs" style={{ color: 'var(--color-ink-muted)' }}>{t.role}</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* DUAL CTA */}
      <section className="py-16 lg:py-24 relative overflow-hidden" style={{ background: '#ECF0EF' }}>
        <div className="mx-auto max-w-7xl px-5 lg:px-8">
          <div className="grid md:grid-cols-2 gap-6">
            <motion.div initial={{ opacity: 0, x: -20 }} whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }} transition={{ duration: 0.5 }}
              className="relative rounded-3xl p-8 overflow-hidden"
              style={{ background: 'linear-gradient(150deg, #005B40 0%, #007a55 100%)', boxShadow: 'var(--shadow-xl)' }}>
              <div className="absolute -top-10 -right-10 h-40 w-40 rounded-full opacity-20"
                style={{ background: '#D1F843', filter: 'blur(30px)' }} />
              <div className="relative">
                <div className="h-12 w-12 rounded-2xl mb-5 flex items-center justify-center"
                  style={{ background: 'rgba(209,248,67,0.2)' }}>
                  <Search size={22} style={{ color: '#D1F843' }} />
                </div>
                <h3 className="text-2xl font-extrabold text-white mb-3" style={{ fontFamily: 'var(--font-display)' }}>
                  Need a service?
                </h3>
                <p className="text-sm leading-relaxed mb-6" style={{ color: 'rgba(255,255,255,0.65)' }}>
                  Browse verified professionals in your area. Book instantly, track in real time.
                </p>
                <button onClick={() => onNavigate('signup')}
                  className="flex items-center gap-2 px-6 py-3 rounded-xl text-sm font-bold text-white transition-all hover:opacity-90"
                  style={{ background: '#1F8FE8', fontFamily: 'var(--font-display)', boxShadow: '0 4px 14px rgba(31,143,232,0.3)' }}>
                  Hire a Pro <ArrowRight size={14} />
                </button>
              </div>
            </motion.div>

            <motion.div initial={{ opacity: 0, x: 20 }} whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }} transition={{ duration: 0.5, delay: 0.1 }}
              className="relative rounded-3xl p-8 overflow-hidden"
              style={{ background: 'linear-gradient(150deg, #D1F843 0%, #b8e030 100%)', boxShadow: 'var(--shadow-xl)' }}>
              <div className="absolute -bottom-10 -right-10 h-40 w-40 rounded-full opacity-15"
                style={{ background: '#005B40', filter: 'blur(30px)' }} />
              <div className="relative">
                <div className="h-12 w-12 rounded-2xl mb-5 flex items-center justify-center"
                  style={{ background: 'rgba(0,91,64,0.15)' }}>
                  <Zap size={22} style={{ color: '#005B40' }} />
                </div>
                <h3 className="text-2xl font-extrabold mb-3" style={{ fontFamily: 'var(--font-display)', color: '#005B40' }}>
                  Ready to earn?
                </h3>
                <p className="text-sm leading-relaxed mb-6" style={{ color: 'rgba(0,91,64,0.7)' }}>
                  List your skills, set your price, get booked. Join 10,000+ professionals growing their income.
                </p>
                <button onClick={() => onNavigate('signup')}
                  className="flex items-center gap-2 px-6 py-3 rounded-xl text-sm font-bold transition-all hover:opacity-90"
                  style={{ background: '#005B40', color: '#fff', fontFamily: 'var(--font-display)', boxShadow: '0 4px 14px rgba(0,91,64,0.3)' }}>
                  Start Earning <ArrowRight size={14} />
                </button>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      <Footer onNavigate={onNavigate} />
    </div>
  );
};
