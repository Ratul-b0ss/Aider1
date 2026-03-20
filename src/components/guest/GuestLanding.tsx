import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import {
  Search, Star, Shield, Zap, CheckCircle, ArrowRight,
  Play, Sparkles, Wrench, Brush, Truck, Flower2, Paintbrush,
  Users, MapPin, ChevronRight, TrendingUp,
} from 'lucide-react';
import { Screen } from '../../types';
import { Footer } from '../layout/Footer';

interface GuestLandingProps {
  onNavigate: (s: Screen) => void;
}

const CATEGORIES = [
  { id: 'cleaning',  name: 'Cleaning',   icon: Sparkles,   bg: '#EEFAEF', color: '#16A34A' },
  { id: 'repair',    name: 'Repair',     icon: Wrench,     bg: '#FFF4EC', color: '#EA580C' },
  { id: 'beauty',    name: 'Beauty',     icon: Brush,      bg: '#FEF0F9', color: '#DB2777' },
  { id: 'moving',    name: 'Moving',     icon: Truck,      bg: '#F3EFFF', color: '#7C3AED' },
  { id: 'gardening', name: 'Gardening',  icon: Flower2,    bg: '#EEFAEF', color: '#16A34A' },
  { id: 'painting',  name: 'Painting',   icon: Paintbrush, bg: '#FEFCE8', color: '#CA8A04' },
];

const HOW_IT_WORKS_CUSTOMER = [
  { step: '01', title: 'Search & Browse', desc: 'Find from 100+ services by category, location or keyword.', color: 'var(--color-primary)' },
  { step: '02', title: 'Book Instantly',  desc: 'Select your time slot and pay securely in one tap.',        color: 'var(--color-deep)' },
  { step: '03', title: 'Get It Done',     desc: 'A verified pro arrives on time. Rate when complete.',       color: '#7C3AED' },
];

const HOW_IT_WORKS_PROVIDER = [
  { step: '01', title: 'Create Profile',  desc: 'Set up your pro profile with skills, certs and ID.',     color: 'var(--color-primary)' },
  { step: '02', title: 'Post Your Gig',   desc: 'List your services with pricing and availability.',       color: 'var(--color-deep)' },
  { step: '03', title: 'Earn & Grow',     desc: 'Accept bookings, collect payments, build your rating.',   color: '#7C3AED' },
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
    quote: "Found an amazing plumber within 10 minutes. The whole experience was seamless — I'm never going back to the old way.",
    rating: 5, color: '#EEF6FF',
  },
  {
    name: 'James Okafor', role: 'Freelance Cleaner', avatar: 'JO',
    quote: "As a provider, I went from 2 bookings/week to 18 in just a month. The platform pays out fast and fair.",
    rating: 5, color: '#EEFAEF',
  },
  {
    name: 'Priya Sharma', role: 'Small Business Owner', avatar: 'PS',
    quote: "The verification system gives me total confidence. I always know the pros I hire are legit.",
    rating: 5, color: '#FFF4EC',
  },
];

export const GuestLanding = ({ onNavigate }: GuestLandingProps) => {
  const [activeTab, setActiveTab] = useState<'customer' | 'provider'>('customer');
  const [searchQuery, setSearchQuery] = useState('');

  return (
    <div className="w-full bg-white">

      {/* ════════════════════════════════════
          NAVBAR (inline for guest)
      ════════════════════════════════════ */}
      <nav
        className="sticky top-0 z-50 w-full"
        style={{
          background: 'rgba(255,255,255,0.95)',
          backdropFilter: 'blur(20px)',
          borderBottom: '1px solid var(--color-border)',
        }}
      >
        <div className="mx-auto max-w-7xl px-5 lg:px-8 flex h-16 items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div
              className="h-8 w-8 rounded-lg flex items-center justify-center"
              style={{ background: 'linear-gradient(135deg, var(--color-deep) 0%, var(--color-primary) 100%)' }}
            >
              <Star size={14} className="text-white" strokeWidth={2.5} />
            </div>
            <span className="text-base font-extrabold" style={{ fontFamily: 'var(--font-display)', color: 'var(--color-ink)' }}>
              Servify
            </span>
          </div>
          <div className="hidden md:flex items-center gap-1">
            {['How it Works', 'Services', 'For Providers', 'Help'].map(l => (
              <button key={l} className="px-3.5 py-2 rounded-lg text-sm font-medium transition-colors"
                style={{ color: 'var(--color-ink-muted)', fontFamily: 'var(--font-display)' }}>
                {l}
              </button>
            ))}
          </div>
          <div className="flex items-center gap-2">
            <button
              onClick={() => onNavigate('login')}
              className="px-4 py-2 rounded-lg text-sm font-semibold"
              style={{ color: 'var(--color-deep)', fontFamily: 'var(--font-display)' }}
            >
              Log In
            </button>
            <button
              onClick={() => onNavigate('signup')}
              className="px-4 py-2 rounded-lg text-sm font-semibold text-white"
              style={{ background: 'var(--color-deep)', fontFamily: 'var(--font-display)' }}
            >
              Get Started
            </button>
          </div>
        </div>
      </nav>

      {/* ════════════════════════════════════
          HERO SECTION
      ════════════════════════════════════ */}
      <section
        className="relative overflow-hidden"
        style={{
          background: 'linear-gradient(160deg, #f0f9f4 0%, #e8f5e9 40%, #f7f8f7 100%)',
          paddingBlock: 'clamp(4rem, 10vw, 8rem)',
        }}
      >
        {/* Decorative blobs */}
        <div className="absolute inset-0 pointer-events-none overflow-hidden">
          <div className="absolute -top-32 -right-32 h-[500px] w-[500px] rounded-full opacity-[0.12]"
            style={{ background: 'var(--color-primary)', filter: 'blur(80px)' }} />
          <div className="absolute top-1/2 -left-20 h-[300px] w-[300px] rounded-full opacity-[0.08]"
            style={{ background: 'var(--color-deep)', filter: 'blur(60px)' }} />
          <div className="absolute -bottom-20 right-1/4 h-[250px] w-[250px] rounded-full opacity-[0.07]"
            style={{ background: '#84b701', filter: 'blur(50px)' }} />
        </div>

        <div className="mx-auto max-w-7xl px-5 lg:px-8 relative">
          <div className="grid lg:grid-cols-2 gap-12 xl:gap-20 items-center">

            {/* Left Column */}
            <div>
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
                className="space-y-7"
              >
                {/* Badge */}
                <div
                  className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full text-xs font-semibold"
                  style={{
                    background: 'var(--color-primary-light)',
                    color: 'var(--color-deep)',
                    border: '1px solid color-mix(in srgb, var(--color-primary) 20%, transparent)',
                    fontFamily: 'var(--font-display)',
                  }}
                >
                  <span className="h-1.5 w-1.5 rounded-full" style={{ background: 'var(--color-primary)' }} />
                  10,000+ Verified Professionals
                </div>

                {/* Headline */}
                <h1
                  className="leading-[1.08] tracking-tight"
                  style={{
                    fontSize: 'clamp(2.8rem, 5.5vw, 5.2rem)',
                    fontFamily: 'var(--font-display)',
                    fontWeight: 800,
                    color: 'var(--color-ink)',
                    letterSpacing: '-0.03em',
                  }}
                >
                  Find trusted{' '}
                  <span
                    style={{
                      background: 'linear-gradient(135deg, var(--color-deep) 0%, var(--color-primary) 100%)',
                      WebkitBackgroundClip: 'text',
                      WebkitTextFillColor: 'transparent',
                      backgroundClip: 'text',
                    }}
                  >
                    home services
                  </span>
                  <br />near you.
                </h1>

                <p
                  className="text-lg leading-relaxed max-w-md"
                  style={{ color: 'var(--color-ink-muted)' }}
                >
                  Electricians, plumbers, cleaners, and more — instantly connected to your doorstep. Book, pay, rate.
                </p>

                {/* Search Bar */}
                <div
                  className="flex items-center rounded-2xl p-2 gap-1 max-w-lg"
                  style={{
                    background: 'var(--color-surface)',
                    border: '1.5px solid var(--color-border)',
                    boxShadow: 'var(--shadow-lg)',
                  }}
                >
                  <div className="flex flex-1 items-center gap-3 px-4 py-2"
                    style={{ borderRight: '1.5px solid var(--color-border)' }}>
                    <Search size={16} style={{ color: 'var(--color-primary)' }} strokeWidth={2.5} />
                    <input
                      value={searchQuery}
                      onChange={e => setSearchQuery(e.target.value)}
                      type="text"
                      placeholder="What service do you need?"
                      className="w-full bg-transparent text-sm outline-none"
                      style={{ color: 'var(--color-ink)' }}
                    />
                  </div>
                  <div className="flex items-center gap-2 px-4 py-2">
                    <MapPin size={16} style={{ color: 'var(--color-primary)' }} strokeWidth={2.5} />
                    <input
                      type="text"
                      placeholder="Your city"
                      className="w-24 bg-transparent text-sm outline-none"
                      style={{ color: 'var(--color-ink)' }}
                    />
                  </div>
                  <button
                    onClick={() => onNavigate('login')}
                    className="px-5 py-2.5 rounded-xl text-sm font-semibold text-white shrink-0"
                    style={{ background: 'var(--color-deep)', fontFamily: 'var(--font-display)' }}
                  >
                    Search
                  </button>
                </div>

                {/* ── DUAL CTAs ── */}
                <div className="flex flex-wrap gap-3">
                  <button
                    onClick={() => onNavigate('signup')}
                    className="group flex items-center gap-2 px-6 py-3.5 rounded-xl text-sm font-bold text-white transition-all hover:opacity-90 hover:shadow-lg"
                    style={{
                      background: 'linear-gradient(135deg, var(--color-deep) 0%, #005840 100%)',
                      fontFamily: 'var(--font-display)',
                      boxShadow: 'var(--shadow-md)',
                    }}
                  >
                    <Search size={15} />
                    Hire a Pro
                    <ArrowRight size={14} className="group-hover:translate-x-0.5 transition-transform" />
                  </button>
                  <button
                    onClick={() => onNavigate('signup')}
                    className="group flex items-center gap-2 px-6 py-3.5 rounded-xl text-sm font-bold transition-all hover:shadow-lg"
                    style={{
                      background: 'linear-gradient(135deg, var(--color-primary) 0%, #a3d900 100%)',
                      color: '#fff',
                      fontFamily: 'var(--font-display)',
                      boxShadow: 'var(--shadow-md)',
                    }}
                  >
                    <Zap size={15} />
                    Start Earning
                    <ArrowRight size={14} className="group-hover:translate-x-0.5 transition-transform" />
                  </button>
                </div>

                {/* Trust row */}
                <div className="flex flex-wrap gap-5 pt-1">
                  {[
                    { icon: CheckCircle, text: 'Verified Professionals' },
                    { icon: Zap,         text: 'Same-Day Booking' },
                    { icon: Shield,      text: 'Fully Insured' },
                  ].map(({ icon: Icon, text }) => (
                    <div key={text} className="flex items-center gap-2">
                      <Icon size={15} style={{ color: 'var(--color-primary)' }} strokeWidth={2} />
                      <span className="text-sm font-medium" style={{ color: 'var(--color-ink-muted)' }}>{text}</span>
                    </div>
                  ))}
                </div>
              </motion.div>
            </div>

            {/* Right Column — Glassmorphism Cards */}
            <motion.div
              initial={{ opacity: 0, x: 24 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.7, delay: 0.15, ease: [0.16, 1, 0.3, 1] }}
              className="relative"
            >
              {/* Main Card */}
              <div
                className="relative rounded-3xl overflow-hidden"
                style={{
                  background: 'linear-gradient(150deg, var(--color-deep) 0%, #005840 60%, #007a55 100%)',
                  boxShadow: '0 32px 64px -12px rgba(0,61,43,0.35)',
                  aspectRatio: '1 / 0.85',
                }}
              >
                {/* Grid pattern */}
                <div className="absolute inset-0 opacity-5"
                  style={{ backgroundImage: 'radial-gradient(rgba(255,255,255,0.4) 1px, transparent 1px)', backgroundSize: '24px 24px' }} />

                <div className="absolute inset-0 p-8 flex flex-col justify-between">
                  <div>
                    <p className="text-xs font-semibold uppercase tracking-wider mb-1"
                      style={{ color: 'rgba(255,255,255,0.55)', fontFamily: 'var(--font-display)' }}>
                      Platform Overview
                    </p>
                    <h3 className="text-2xl font-extrabold text-white" style={{ fontFamily: 'var(--font-display)' }}>
                      Trusted by thousands
                    </h3>
                  </div>

                  {/* Stats Grid */}
                  <div className="grid grid-cols-2 gap-3">
                    {TRUST_STATS.map(({ value, label, icon: Icon }) => (
                      <div
                        key={label}
                        className="rounded-2xl p-4"
                        style={{ background: 'rgba(255,255,255,0.1)', backdropFilter: 'blur(10px)', border: '1px solid rgba(255,255,255,0.1)' }}
                      >
                        <div className="flex items-center gap-2 mb-1">
                          <Icon size={13} style={{ color: 'var(--color-primary)' }} />
                          <p className="text-xl font-extrabold text-white" style={{ fontFamily: 'var(--font-display)' }}>
                            {value}
                          </p>
                        </div>
                        <p className="text-xs" style={{ color: 'rgba(255,255,255,0.55)', fontFamily: 'var(--font-display)' }}>
                          {label}
                        </p>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Floating Rating Badge */}
              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5, delay: 0.5 }}
                className="absolute -bottom-5 -left-5 flex items-center gap-3 px-4 py-3 rounded-2xl"
                style={{
                  background: 'var(--color-surface)',
                  boxShadow: 'var(--shadow-xl)',
                  border: '1px solid var(--color-border)',
                }}
              >
                <div className="h-9 w-9 rounded-xl flex items-center justify-center"
                  style={{ background: 'var(--color-primary-light)' }}>
                  <Star size={16} style={{ color: 'var(--color-primary)' }} className="fill-current" />
                </div>
                <div>
                  <p className="text-xs font-extrabold" style={{ color: 'var(--color-ink)', fontFamily: 'var(--font-display)' }}>
                    4.9 / 5.0
                  </p>
                  <p className="text-[11px]" style={{ color: 'var(--color-ink-muted)' }}>
                    128 ratings today
                  </p>
                </div>
              </motion.div>

              {/* Floating Hire Card */}
              <motion.div
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.65 }}
                className="absolute -top-5 -right-3 px-4 py-3 rounded-2xl flex items-center gap-2"
                style={{
                  background: 'var(--color-primary)',
                  boxShadow: '0 8px 24px rgba(132,183,1,0.35)',
                }}
              >
                <Zap size={14} className="text-white" />
                <span className="text-xs font-bold text-white" style={{ fontFamily: 'var(--font-display)' }}>
                  Book in 60 seconds
                </span>
              </motion.div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ════════════════════════════════════
          CATEGORIES
      ════════════════════════════════════ */}
      <section className="py-16 lg:py-24" style={{ background: 'var(--color-background)' }}>
        <div className="mx-auto max-w-7xl px-5 lg:px-8">
          <div className="text-center mb-12">
            <p className="text-xs font-semibold uppercase tracking-widest mb-3"
              style={{ color: 'var(--color-primary)', fontFamily: 'var(--font-display)' }}>
              Browse
            </p>
            <h2 className="text-4xl font-extrabold" style={{ color: 'var(--color-ink)', fontFamily: 'var(--font-display)' }}>
              Every service you need
            </h2>
            <p className="mt-3 text-base" style={{ color: 'var(--color-ink-muted)' }}>
              From quick repairs to full home transformations.
            </p>
          </div>
          <div className="grid grid-cols-3 sm:grid-cols-6 gap-4">
            {CATEGORIES.map((cat, idx) => (
              <motion.button
                key={cat.id}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: idx * 0.06 }}
                onClick={() => onNavigate('signup')}
                className="group flex flex-col items-center gap-3 p-5 rounded-2xl transition-all hover:-translate-y-1 hover:shadow-md"
                style={{ background: cat.bg, border: `1px solid ${cat.color}18` }}
              >
                <div className="h-12 w-12 rounded-xl flex items-center justify-center transition-transform group-hover:scale-110"
                  style={{ background: cat.color + '15' }}>
                  <cat.icon size={22} style={{ color: cat.color }} strokeWidth={1.8} />
                </div>
                <span className="text-[0.8125rem] font-semibold text-center leading-none"
                  style={{ color: cat.color, fontFamily: 'var(--font-display)' }}>
                  {cat.name}
                </span>
              </motion.button>
            ))}
          </div>
        </div>
      </section>

      {/* ════════════════════════════════════
          HOW IT WORKS — DUAL TAB INFOGRAPHIC
      ════════════════════════════════════ */}
      <section
        className="py-16 lg:py-24 relative overflow-hidden"
        style={{ background: 'linear-gradient(160deg, #001f15 0%, var(--color-deep) 100%)' }}
      >
        <div className="absolute inset-0 opacity-5 pointer-events-none"
          style={{ backgroundImage: 'radial-gradient(rgba(132,183,1,0.5) 1px, transparent 1px)', backgroundSize: '28px 28px' }} />

        <div className="mx-auto max-w-7xl px-5 lg:px-8 relative">
          <div className="text-center mb-10">
            <p className="text-xs font-semibold uppercase tracking-widest mb-3"
              style={{ color: 'var(--color-primary)', fontFamily: 'var(--font-display)' }}>
              Simple Process
            </p>
            <h2 className="text-4xl font-extrabold text-white" style={{ fontFamily: 'var(--font-display)' }}>
              How Servify Works
            </h2>
            <p className="mt-3 text-base" style={{ color: 'rgba(255,255,255,0.55)' }}>
              Whether you're hiring or earning — it's three simple steps.
            </p>

            {/* Toggle */}
            <div
              className="inline-flex mt-6 p-1 rounded-xl gap-1"
              style={{ background: 'rgba(255,255,255,0.08)', border: '1px solid rgba(255,255,255,0.1)' }}
            >
              {(['customer', 'provider'] as const).map(tab => (
                <button
                  key={tab}
                  onClick={() => setActiveTab(tab)}
                  className="px-6 py-2.5 rounded-lg text-sm font-bold transition-all capitalize"
                  style={{
                    fontFamily: 'var(--font-display)',
                    background: activeTab === tab ? 'var(--color-primary)' : 'transparent',
                    color: activeTab === tab ? '#fff' : 'rgba(255,255,255,0.5)',
                    boxShadow: activeTab === tab ? '0 4px 14px rgba(132,183,1,0.35)' : 'none',
                  }}
                >
                  {tab === 'customer' ? 'I want to Hire' : 'I want to Earn'}
                </button>
              ))}
            </div>
          </div>

          <AnimatePresence mode="wait">
            <motion.div
              key={activeTab}
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.3 }}
              className="grid md:grid-cols-3 gap-6 max-w-4xl mx-auto"
            >
              {(activeTab === 'customer' ? HOW_IT_WORKS_CUSTOMER : HOW_IT_WORKS_PROVIDER).map((item, idx) => (
                <motion.div
                  key={item.step}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.4, delay: idx * 0.1 }}
                  className="relative rounded-2xl p-6"
                  style={{
                    background: 'rgba(255,255,255,0.06)',
                    backdropFilter: 'blur(20px)',
                    border: '1px solid rgba(255,255,255,0.1)',
                  }}
                >
                  {/* Step number */}
                  <div
                    className="text-4xl font-black mb-4 leading-none"
                    style={{ color: item.color, fontFamily: 'var(--font-display)', opacity: 0.6 }}
                  >
                    {item.step}
                  </div>
                  <h3 className="text-lg font-extrabold text-white mb-2" style={{ fontFamily: 'var(--font-display)' }}>
                    {item.title}
                  </h3>
                  <p className="text-sm leading-relaxed" style={{ color: 'rgba(255,255,255,0.6)' }}>
                    {item.desc}
                  </p>

                  {/* Connector arrow */}
                  {idx < 2 && (
                    <ChevronRight
                      size={20}
                      className="absolute -right-3 top-1/2 -translate-y-1/2 hidden md:block"
                      style={{ color: 'rgba(255,255,255,0.2)' }}
                    />
                  )}
                </motion.div>
              ))}
            </motion.div>
          </AnimatePresence>

          <div className="text-center mt-10">
            <button
              onClick={() => onNavigate('signup')}
              className="inline-flex items-center gap-2 px-8 py-3.5 rounded-xl text-sm font-bold text-white transition-all hover:opacity-90"
              style={{
                background: 'var(--color-primary)',
                fontFamily: 'var(--font-display)',
                boxShadow: '0 8px 24px rgba(132,183,1,0.35)',
              }}
            >
              {activeTab === 'customer' ? 'Find a Pro Now' : 'Start Earning Today'}
              <ArrowRight size={15} />
            </button>
          </div>
        </div>
      </section>

      {/* ════════════════════════════════════
          TESTIMONIALS
      ════════════════════════════════════ */}
      <section className="py-16 lg:py-24" style={{ background: 'var(--color-surface)' }}>
        <div className="mx-auto max-w-7xl px-5 lg:px-8">
          <div className="text-center mb-12">
            <p className="text-xs font-semibold uppercase tracking-widest mb-3"
              style={{ color: 'var(--color-primary)', fontFamily: 'var(--font-display)' }}>
              Stories
            </p>
            <h2 className="text-4xl font-extrabold" style={{ color: 'var(--color-ink)', fontFamily: 'var(--font-display)' }}>
              Loved by customers & pros
            </h2>
          </div>
          <div className="grid md:grid-cols-3 gap-6">
            {TESTIMONIALS.map((t, idx) => (
              <motion.div
                key={t.name}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: idx * 0.1 }}
                className="rounded-2xl p-6 flex flex-col gap-4"
                style={{
                  background: t.color,
                  border: '1px solid var(--color-border)',
                  boxShadow: 'var(--shadow-sm)',
                }}
              >
                <div className="flex gap-0.5">
                  {Array.from({ length: t.rating }).map((_, i) => (
                    <Star key={i} size={14} className="fill-yellow-400 text-yellow-400" />
                  ))}
                </div>
                <p className="text-sm leading-relaxed italic" style={{ color: 'var(--color-ink)' }}>
                  "{t.quote}"
                </p>
                <div className="flex items-center gap-3 mt-auto">
                  <div
                    className="h-10 w-10 rounded-xl flex items-center justify-center text-xs font-bold text-white shrink-0"
                    style={{ background: 'linear-gradient(135deg, var(--color-deep) 0%, var(--color-primary) 100%)' }}
                  >
                    {t.avatar}
                  </div>
                  <div>
                    <p className="text-sm font-bold" style={{ color: 'var(--color-ink)', fontFamily: 'var(--font-display)' }}>
                      {t.name}
                    </p>
                    <p className="text-xs" style={{ color: 'var(--color-ink-muted)' }}>{t.role}</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ════════════════════════════════════
          DUAL CTA SECTION
      ════════════════════════════════════ */}
      <section
        className="py-16 lg:py-24 relative overflow-hidden"
        style={{ background: 'var(--color-background)' }}
      >
        <div className="mx-auto max-w-7xl px-5 lg:px-8">
          <div className="grid md:grid-cols-2 gap-6">

            {/* Hire Card */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className="relative rounded-3xl p-8 overflow-hidden"
              style={{
                background: 'linear-gradient(150deg, var(--color-deep) 0%, #006b4e 100%)',
                boxShadow: 'var(--shadow-xl)',
              }}
            >
              <div className="absolute -top-10 -right-10 h-40 w-40 rounded-full opacity-10"
                style={{ background: 'var(--color-primary)', filter: 'blur(30px)' }} />
              <div className="relative">
                <div className="h-12 w-12 rounded-2xl mb-5 flex items-center justify-center"
                  style={{ background: 'rgba(255,255,255,0.1)' }}>
                  <Search size={22} className="text-white" />
                </div>
                <h3 className="text-2xl font-extrabold text-white mb-3" style={{ fontFamily: 'var(--font-display)' }}>
                  Need a service?
                </h3>
                <p className="text-sm leading-relaxed mb-6" style={{ color: 'rgba(255,255,255,0.65)' }}>
                  Browse verified professionals in your area. Book instantly, track in real time.
                </p>
                <button
                  onClick={() => onNavigate('signup')}
                  className="flex items-center gap-2 px-6 py-3 rounded-xl text-sm font-bold text-white transition-all hover:opacity-90"
                  style={{ background: 'rgba(255,255,255,0.15)', border: '1px solid rgba(255,255,255,0.2)', fontFamily: 'var(--font-display)' }}
                >
                  Hire a Pro <ArrowRight size={14} />
                </button>
              </div>
            </motion.div>

            {/* Earn Card */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="relative rounded-3xl p-8 overflow-hidden"
              style={{
                background: 'linear-gradient(150deg, var(--color-primary) 0%, #a3d900 100%)',
                boxShadow: 'var(--shadow-xl)',
              }}
            >
              <div className="absolute -bottom-10 -right-10 h-40 w-40 rounded-full opacity-15"
                style={{ background: 'var(--color-deep)', filter: 'blur(30px)' }} />
              <div className="relative">
                <div className="h-12 w-12 rounded-2xl mb-5 flex items-center justify-center"
                  style={{ background: 'rgba(255,255,255,0.2)' }}>
                  <Zap size={22} className="text-white" />
                </div>
                <h3 className="text-2xl font-extrabold text-white mb-3" style={{ fontFamily: 'var(--font-display)' }}>
                  Ready to earn?
                </h3>
                <p className="text-sm leading-relaxed mb-6" style={{ color: 'rgba(255,255,255,0.75)' }}>
                  List your skills, set your price, get booked. Join 10,000+ professionals growing their income.
                </p>
                <button
                  onClick={() => onNavigate('signup')}
                  className="flex items-center gap-2 px-6 py-3 rounded-xl text-sm font-bold transition-all hover:opacity-90"
                  style={{
                    background: 'var(--color-deep)',
                    color: '#fff',
                    fontFamily: 'var(--font-display)',
                    boxShadow: '0 4px 14px rgba(0,61,43,0.3)',
                  }}
                >
                  Start Earning <ArrowRight size={14} />
                </button>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ── Footer ── */}
      <Footer onNavigate={onNavigate} />
    </div>
  );
};
