import React from 'react';
import { Search, MapPin, Star, Shield, Clock, Sparkles, ArrowRight, CheckCircle, Zap, Brush, Truck, Flower2, Paintbrush, Wrench, ChevronRight } from 'lucide-react';
import { motion } from 'motion/react';
import { Screen } from '../../types';

interface HomeProps {
  onNavigate: (s: Screen) => void;
  isAuthenticated: boolean;
}

const CATEGORIES = [
  { id: 'cleaning',   name: 'Cleaning',   icon: Sparkles,   bg: '#EEF6FF', color: '#2563EB' },
  { id: 'repair',     name: 'Repair',     icon: Wrench,     bg: '#FFF4EC', color: '#EA580C' },
  { id: 'beauty',     name: 'Beauty',     icon: Brush,      bg: '#FEF0F9', color: '#DB2777' },
  { id: 'moving',     name: 'Moving',     icon: Truck,      bg: '#F3EFFF', color: '#7C3AED' },
  { id: 'gardening',  name: 'Gardening',  icon: Flower2,    bg: '#EEFAEF', color: '#16A34A' },
  { id: 'painting',   name: 'Painting',   icon: Paintbrush, bg: '#FEFCE8', color: '#CA8A04' },
];

const POPULAR_SERVICES = [
  {
    id: '1',
    title: 'Deep Home Cleaning',
    provider: 'Sparkle Pros',
    rating: 4.9,
    reviews: 128,
    price: 45,
    tag: 'Most Booked',
    image: 'https://picsum.photos/seed/cleaning1/600/400',
  },
  {
    id: '2',
    title: 'AC Maintenance',
    provider: 'CoolAir Tech',
    rating: 4.8,
    reviews: 85,
    price: 60,
    tag: 'Top Rated',
    image: 'https://picsum.photos/seed/ac1/600/400',
  },
  {
    id: '3',
    title: 'Garden Care',
    provider: 'GreenThumb Co.',
    rating: 4.7,
    reviews: 64,
    price: 35,
    tag: 'New',
    image: 'https://picsum.photos/seed/garden1/600/400',
  },
];

const TRUST_STATS = [
  { value: '10K+', label: 'Verified Pros' },
  { value: '50K+', label: 'Jobs Done' },
  { value: '4.9★', label: 'Avg Rating' },
  { value: '98%',  label: 'Satisfaction' },
];

const tagColor: Record<string, { bg: string; color: string }> = {
  'Most Booked': { bg: '#FFF4EC', color: '#EA580C' },
  'Top Rated':   { bg: '#EEFAEF', color: '#16A34A' },
  'New':         { bg: '#EEF6FF', color: '#2563EB' },
};

const fadeUp = (delay = 0) => ({
  initial: { opacity: 0, y: 18 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.5, delay, ease: [0.16, 1, 0.3, 1] },
});

export const Home = ({ onNavigate, isAuthenticated }: HomeProps) => {
  return (
    <div className="w-full">

      {/* ════════════════════════════════════
          MOBILE LAYOUT
      ════════════════════════════════════ */}
      <div className="block md:hidden bg-white min-h-screen pb-28">

        {/* Mobile Hero */}
        <div className="px-5 pt-7 pb-5">
          {!isAuthenticated ? (
            <div className="space-y-5">
              <div>
                <p className="text-xs font-semibold tracking-wider uppercase mb-2" style={{ color: 'var(--color-primary)', fontFamily: 'var(--font-display)' }}>
                  Trusted Home Services
                </p>
                <h1 className="text-[2.1rem] font-extrabold leading-[1.1] tracking-tight" style={{ color: 'var(--color-ink)', fontFamily: 'var(--font-display)' }}>
                  Your home,<br />
                  <span style={{ color: 'var(--color-deep)' }}>sorted instantly.</span>
                </h1>
                <p className="mt-2.5 text-sm leading-relaxed" style={{ color: 'var(--color-ink-muted)' }}>
                  Book verified professionals for any home task — fast, easy, and reliable.
                </p>
              </div>
              <div className="flex gap-2.5">
                <button
                  onClick={() => onNavigate('signup')}
                  className="flex-1 py-3.5 rounded-xl text-sm font-semibold text-white active:scale-95 transition-transform"
                  style={{ background: 'var(--color-deep)', fontFamily: 'var(--font-display)' }}
                >
                  Sign Up Free
                </button>
                <button
                  onClick={() => onNavigate('login')}
                  className="flex-1 py-3.5 rounded-xl text-sm font-semibold active:scale-95 transition-transform"
                  style={{ border: '1.5px solid var(--color-border)', color: 'var(--color-deep)', fontFamily: 'var(--font-display)' }}
                >
                  Log In
                </button>
              </div>
            </div>
          ) : (
            <div className="flex justify-between items-center">
              <div>
                <p className="text-xs font-medium mb-0.5" style={{ color: 'var(--color-ink-muted)' }}>Good morning 👋</p>
                <h1 className="text-2xl font-extrabold" style={{ color: 'var(--color-ink)', fontFamily: 'var(--font-display)' }}>John Doe</h1>
              </div>
              <button
                onClick={() => onNavigate('profile')}
                className="h-11 w-11 rounded-xl flex items-center justify-center text-sm font-bold text-white"
                style={{ background: 'var(--color-deep)', fontFamily: 'var(--font-display)' }}
              >
                JD
              </button>
            </div>
          )}

          {/* Mobile Search */}
          <div
            className="mt-5 flex items-center gap-2 rounded-2xl p-2.5"
            style={{ background: 'var(--color-neutral-50)', border: '1.5px solid var(--color-border)' }}
          >
            <Search size={17} className="ml-1 shrink-0" style={{ color: 'var(--color-ink-muted)' }} />
            <input
              type="text"
              placeholder="What do you need help with?"
              className="flex-1 bg-transparent text-sm outline-none"
              style={{ color: 'var(--color-ink)' }}
            />
            <button
              className="flex items-center gap-1.5 px-3 py-2 rounded-xl text-xs font-semibold text-white shrink-0"
              style={{ background: 'var(--color-primary)', fontFamily: 'var(--font-display)' }}
            >
              <MapPin size={13} />
              Nearby
            </button>
          </div>
        </div>

        {/* Mobile Categories */}
        <div className="mt-1 px-5">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-base font-bold" style={{ color: 'var(--color-ink)', fontFamily: 'var(--font-display)' }}>Categories</h2>
            <button className="text-xs font-semibold flex items-center gap-0.5" style={{ color: 'var(--color-primary)', fontFamily: 'var(--font-display)' }}>
              All <ChevronRight size={13} />
            </button>
          </div>
          <div className="grid grid-cols-3 gap-3">
            {CATEGORIES.map((cat) => (
              <button
                key={cat.id}
                onClick={() => onNavigate('services')}
                className="flex flex-col items-center gap-2 p-3 rounded-2xl active:scale-95 transition-transform"
                style={{ background: cat.bg }}
              >
                <div className="flex items-center justify-center h-9 w-9 rounded-xl" style={{ background: cat.color + '20' }}>
                  <cat.icon size={18} style={{ color: cat.color }} strokeWidth={1.8} />
                </div>
                <span className="text-[11px] font-semibold leading-none" style={{ color: cat.color, fontFamily: 'var(--font-display)' }}>
                  {cat.name}
                </span>
              </button>
            ))}
          </div>
        </div>

        {/* Mobile Promo Banner */}
        <div className="mx-5 mt-6 rounded-2xl p-5 flex items-center justify-between overflow-hidden relative"
          style={{ background: 'linear-gradient(135deg, var(--color-deep) 0%, #006b4e 100%)' }}>
          <div className="relative z-10">
            <span className="text-[10px] font-semibold tracking-wider uppercase px-2.5 py-1 rounded-md"
              style={{ background: 'rgba(255,255,255,0.15)', color: 'rgba(255,255,255,0.9)', fontFamily: 'var(--font-display)' }}>
              Limited Offer
            </span>
            <h3 className="text-xl font-extrabold text-white mt-2 leading-tight" style={{ fontFamily: 'var(--font-display)' }}>
              20% Off<br />First Booking
            </h3>
            <button className="mt-3 flex items-center gap-1.5 text-xs font-semibold"
              style={{ color: 'var(--color-primary)', fontFamily: 'var(--font-display)' }}>
              Claim Now <ArrowRight size={13} />
            </button>
          </div>
          <div className="absolute -right-8 -top-8 h-28 w-28 rounded-full"
            style={{ background: 'rgba(132,183,1,0.15)', filter: 'blur(20px)' }} />
          <div className="absolute -right-4 bottom-0 h-20 w-20 rounded-full"
            style={{ background: 'rgba(255,255,255,0.05)' }} />
          <Sparkles size={56} style={{ color: 'rgba(132,183,1,0.6)', position: 'relative', zIndex: 10 }} strokeWidth={1} />
        </div>

        {/* Mobile Popular Services */}
        <div className="mt-7 px-5">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-base font-bold" style={{ color: 'var(--color-ink)', fontFamily: 'var(--font-display)' }}>Popular Services</h2>
          </div>
          <div className="flex gap-4 overflow-x-auto no-scrollbar -mx-5 px-5 pb-2">
            {POPULAR_SERVICES.map((service) => {
              const tc = tagColor[service.tag] ?? { bg: '#F3F4F6', color: '#6B7280' };
              return (
                <div
                  key={service.id}
                  className="min-w-[200px] rounded-2xl overflow-hidden flex flex-col"
                  style={{ background: 'var(--color-surface)', border: '1px solid var(--color-border)', boxShadow: 'var(--shadow-sm)' }}
                >
                  <div className="h-28 w-full relative overflow-hidden">
                    <img src={service.image} alt={service.title} className="w-full h-full object-cover" />
                    <div className="absolute top-2 left-2 px-2.5 py-1 rounded-lg text-[10px] font-semibold"
                      style={{ background: tc.bg, color: tc.color, fontFamily: 'var(--font-display)' }}>
                      {service.tag}
                    </div>
                    <div className="absolute top-2 right-2 flex items-center gap-1 bg-white/90 backdrop-blur-sm px-2 py-1 rounded-lg">
                      <Star size={10} className="fill-yellow-400 text-yellow-400" />
                      <span className="text-[10px] font-bold" style={{ color: 'var(--color-ink)' }}>{service.rating}</span>
                    </div>
                  </div>
                  <div className="p-3.5 flex flex-col flex-1">
                    <h3 className="text-sm font-semibold leading-tight" style={{ color: 'var(--color-ink)', fontFamily: 'var(--font-display)' }}>
                      {service.title}
                    </h3>
                    <p className="text-[11px] mt-0.5" style={{ color: 'var(--color-ink-muted)' }}>{service.provider}</p>
                    <div className="mt-3 flex items-center justify-between">
                      <span className="text-base font-extrabold" style={{ color: 'var(--color-primary)', fontFamily: 'var(--font-display)' }}>
                        ${service.price}
                      </span>
                      <button
                        onClick={() => onNavigate(isAuthenticated ? 'services' : 'login')}
                        className="text-[11px] font-semibold px-3 py-1.5 rounded-lg text-white active:scale-95 transition-transform"
                        style={{ background: 'var(--color-deep)', fontFamily: 'var(--font-display)' }}
                      >
                        Book
                      </button>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>


      {/* ════════════════════════════════════
          DESKTOP LAYOUT
      ════════════════════════════════════ */}
      <div className="hidden md:block">

        {/* ── Hero ── */}
        <section
          className="relative overflow-hidden"
          style={{ background: 'var(--color-background)', paddingBlock: 'clamp(4rem, 8vw, 7rem)' }}
        >
          {/* Decorative background blobs */}
          <div className="absolute inset-0 pointer-events-none overflow-hidden">
            <div className="absolute -top-40 -right-40 h-[600px] w-[600px] rounded-full opacity-[0.06]"
              style={{ background: 'var(--color-primary)', filter: 'blur(80px)' }} />
            <div className="absolute -bottom-20 -left-20 h-[400px] w-[400px] rounded-full opacity-[0.05]"
              style={{ background: 'var(--color-deep)', filter: 'blur(60px)' }} />
          </div>

          <div className="mx-auto max-w-7xl px-8 relative">
            <div className="grid lg:grid-cols-2 gap-12 xl:gap-16 items-center">

              {/* Left */}
              <div className="space-y-8">
                <motion.div {...fadeUp(0)} className="space-y-5">
                  {/* Label */}
                  <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full text-xs font-semibold"
                    style={{
                      background: 'var(--color-primary-light)',
                      color: 'var(--color-deep)',
                      fontFamily: 'var(--font-display)',
                      border: '1px solid color-mix(in srgb, var(--color-primary) 20%, transparent)',
                    }}>
                    <span className="h-1.5 w-1.5 rounded-full" style={{ background: 'var(--color-primary)' }} />
                    10,000+ Verified Professionals
                  </div>

                  {/* Headline */}
                  <h1
                    className="leading-[1.1] tracking-tight"
                    style={{
                      fontSize: 'clamp(3rem, 5.5vw, 5rem)',
                      fontFamily: 'var(--font-display)',
                      fontWeight: 800,
                      color: 'var(--color-ink)',
                    }}
                  >
                    Find trusted{' '}
                    <span style={{ color: 'var(--color-deep)' }}>home services</span>
                    <br />near you.
                  </h1>

                  <p className="text-lg leading-relaxed max-w-md" style={{ color: 'var(--color-ink-muted)' }}>
                    Electricians, plumbers, cleaners, and more — instantly connected to your doorstep.
                  </p>
                </motion.div>

                {/* Search Bar */}
                <motion.div {...fadeUp(0.12)}>
                  <div
                    className="flex items-center rounded-2xl p-2 gap-1"
                    style={{
                      background: 'var(--color-surface)',
                      border: '1.5px solid var(--color-border)',
                      boxShadow: 'var(--shadow-md)',
                    }}
                  >
                    <div className="flex flex-1 items-center gap-3 px-4 py-2"
                      style={{ borderRight: '1.5px solid var(--color-border)' }}>
                      <Search size={18} className="shrink-0" style={{ color: 'var(--color-primary)' }} strokeWidth={2.5} />
                      <input
                        type="text"
                        placeholder="What service do you need?"
                        className="w-full bg-transparent text-sm outline-none font-medium"
                        style={{ color: 'var(--color-ink)' }}
                      />
                    </div>
                    <div className="flex flex-1 items-center gap-3 px-4 py-2">
                      <MapPin size={18} className="shrink-0" style={{ color: 'var(--color-primary)' }} strokeWidth={2.5} />
                      <input
                        type="text"
                        placeholder="Your location"
                        className="w-full bg-transparent text-sm outline-none font-medium"
                        style={{ color: 'var(--color-ink)' }}
                      />
                    </div>
                    <button
                      className="px-7 py-3 rounded-xl text-sm font-semibold text-white transition-all hover:opacity-90 shrink-0"
                      style={{ background: 'var(--color-deep)', fontFamily: 'var(--font-display)' }}
                    >
                      Search
                    </button>
                  </div>
                </motion.div>

                {/* Trust row */}
                <motion.div {...fadeUp(0.22)} className="flex flex-wrap gap-5">
                  {[
                    { icon: CheckCircle, text: 'Verified Professionals' },
                    { icon: Zap,          text: 'Same-Day Booking' },
                    { icon: Shield,       text: 'Fully Insured' },
                  ].map(({ icon: Icon, text }) => (
                    <div key={text} className="flex items-center gap-2">
                      <Icon size={16} style={{ color: 'var(--color-primary)' }} strokeWidth={2} />
                      <span className="text-sm font-medium" style={{ color: 'var(--color-ink-muted)' }}>{text}</span>
                    </div>
                  ))}
                </motion.div>
              </div>

              {/* Right — Stat Cards */}
              <motion.div
                initial={{ opacity: 0, x: 24 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
                className="relative"
              >
                {/* Main illustration card */}
                <div
                  className="rounded-3xl overflow-hidden relative"
                  style={{
                    background: 'linear-gradient(150deg, var(--color-deep) 0%, #005840 100%)',
                    boxShadow: 'var(--shadow-2xl)',
                    aspectRatio: '1 / 0.8',
                  }}
                >
                  <img
                    src="https://illustrations.popsy.co/amber/working-from-home.svg"
                    alt="Home services illustration"
                    className="absolute bottom-0 right-0 w-3/4 h-auto object-contain"
                    style={{ filter: 'brightness(0) invert(1) opacity(0.7)' }}
                  />
                  <div className="absolute inset-0 p-8 flex flex-col justify-between">
                    <div>
                      <p className="text-xs font-semibold uppercase tracking-wider mb-1"
                        style={{ color: 'rgba(255,255,255,0.6)', fontFamily: 'var(--font-display)' }}>
                        Platform Stats
                      </p>
                      <h3 className="text-2xl font-extrabold text-white" style={{ fontFamily: 'var(--font-display)' }}>
                        Trusted by thousands
                      </h3>
                    </div>

                    {/* Stat pills */}
                    <div className="grid grid-cols-2 gap-3">
                      {TRUST_STATS.map((s) => (
                        <div
                          key={s.label}
                          className="rounded-xl p-4"
                          style={{ background: 'rgba(255,255,255,0.1)', backdropFilter: 'blur(10px)', border: '1px solid rgba(255,255,255,0.12)' }}
                        >
                          <p className="text-xl font-extrabold text-white" style={{ fontFamily: 'var(--font-display)' }}>{s.value}</p>
                          <p className="text-xs mt-0.5" style={{ color: 'rgba(255,255,255,0.6)', fontFamily: 'var(--font-display)' }}>{s.label}</p>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Floating badge */}
                <div
                  className="absolute -bottom-4 -left-4 flex items-center gap-3 px-4 py-3 rounded-2xl"
                  style={{
                    background: 'var(--color-surface)',
                    boxShadow: 'var(--shadow-xl)',
                    border: '1px solid var(--color-border)',
                  }}
                >
                  <div className="h-9 w-9 rounded-xl flex items-center justify-center" style={{ background: 'var(--color-primary-light)' }}>
                    <Star size={16} style={{ color: 'var(--color-primary)' }} className="fill-current" />
                  </div>
                  <div>
                    <p className="text-xs font-extrabold" style={{ color: 'var(--color-ink)', fontFamily: 'var(--font-display)' }}>4.9 / 5</p>
                    <p className="text-[11px]" style={{ color: 'var(--color-ink-muted)' }}>128 reviews today</p>
                  </div>
                </div>
              </motion.div>
            </div>
          </div>
        </section>


        {/* ── Categories ── */}
        <section
          className="mx-auto max-w-7xl px-8"
          style={{ paddingBlock: 'clamp(3rem, 5vw, 5rem)' }}
        >
          <div className="flex items-end justify-between mb-8">
            <div>
              <p className="text-xs font-semibold uppercase tracking-widest mb-1.5"
                style={{ color: 'var(--color-primary)', fontFamily: 'var(--font-display)' }}>
                Browse
              </p>
              <h2 className="text-3xl font-extrabold" style={{ color: 'var(--color-ink)', fontFamily: 'var(--font-display)' }}>
                Service Categories
              </h2>
            </div>
            <button
              onClick={() => onNavigate('services')}
              className="flex items-center gap-1.5 text-sm font-semibold transition-colors"
              style={{ color: 'var(--color-primary)', fontFamily: 'var(--font-display)' }}
            >
              View All <ArrowRight size={15} />
            </button>
          </div>

          <div className="grid grid-cols-3 lg:grid-cols-6 gap-4">
            {CATEGORIES.map((cat, idx) => (
              <motion.button
                key={cat.id}
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: idx * 0.05, ease: [0.16, 1, 0.3, 1] }}
                onClick={() => onNavigate('services')}
                className="group flex flex-col items-center gap-3 p-5 rounded-2xl transition-all duration-200 hover:-translate-y-1"
                style={{
                  background: cat.bg,
                  border: `1px solid ${cat.color}18`,
                }}
              >
                <div
                  className="h-12 w-12 rounded-xl flex items-center justify-center transition-transform group-hover:scale-110"
                  style={{ background: cat.color + '15' }}
                >
                  <cat.icon size={22} style={{ color: cat.color }} strokeWidth={1.8} />
                </div>
                <span
                  className="text-[0.8125rem] font-semibold text-center leading-none"
                  style={{ color: cat.color, fontFamily: 'var(--font-display)' }}
                >
                  {cat.name}
                </span>
              </motion.button>
            ))}
          </div>
        </section>


        {/* ── Popular Services ── */}
        <section
          style={{
            paddingBlock: 'clamp(2rem, 4vw, 4rem)',
            background: 'linear-gradient(180deg, var(--color-background) 0%, var(--color-surface) 100%)',
          }}
        >
          <div className="mx-auto max-w-7xl px-8">
            <div className="flex items-end justify-between mb-8">
              <div>
                <p className="text-xs font-semibold uppercase tracking-widest mb-1.5"
                  style={{ color: 'var(--color-primary)', fontFamily: 'var(--font-display)' }}>
                  Trending
                </p>
                <h2 className="text-3xl font-extrabold" style={{ color: 'var(--color-ink)', fontFamily: 'var(--font-display)' }}>
                  Popular Services
                </h2>
              </div>
              <button
                onClick={() => onNavigate('services')}
                className="flex items-center gap-1.5 text-sm font-semibold transition-colors"
                style={{ color: 'var(--color-primary)', fontFamily: 'var(--font-display)' }}
              >
                See All <ArrowRight size={15} />
              </button>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {POPULAR_SERVICES.map((service, idx) => {
                const tc = tagColor[service.tag] ?? { bg: '#F3F4F6', color: '#6B7280' };
                return (
                  <motion.div
                    key={service.id}
                    initial={{ opacity: 0, scale: 0.97 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.4, delay: idx * 0.1, ease: [0.16, 1, 0.3, 1] }}
                    className="group overflow-hidden rounded-2xl flex flex-col"
                    style={{
                      background: 'var(--color-surface)',
                      border: '1px solid var(--color-border)',
                      boxShadow: 'var(--shadow-sm)',
                      transition: 'box-shadow 0.25s ease, transform 0.25s ease, border-color 0.25s ease',
                    }}
                    onMouseEnter={e => {
                      (e.currentTarget as HTMLElement).style.boxShadow = 'var(--shadow-xl)';
                      (e.currentTarget as HTMLElement).style.transform = 'translateY(-4px)';
                      (e.currentTarget as HTMLElement).style.borderColor = 'var(--color-neutral-200)';
                    }}
                    onMouseLeave={e => {
                      (e.currentTarget as HTMLElement).style.boxShadow = 'var(--shadow-sm)';
                      (e.currentTarget as HTMLElement).style.transform = 'translateY(0)';
                      (e.currentTarget as HTMLElement).style.borderColor = 'var(--color-border)';
                    }}
                  >
                    {/* Image */}
                    <div className="relative h-52 overflow-hidden">
                      <img
                        src={service.image}
                        alt={service.title}
                        className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                        referrerPolicy="no-referrer"
                      />
                      {/* Tag */}
                      <div
                        className="absolute top-3 left-3 px-2.5 py-1 rounded-lg text-[11px] font-semibold"
                        style={{ background: tc.bg, color: tc.color, fontFamily: 'var(--font-display)' }}
                      >
                        {service.tag}
                      </div>
                      {/* Rating */}
                      <div
                        className="absolute top-3 right-3 flex items-center gap-1 px-2.5 py-1 rounded-lg"
                        style={{ background: 'rgba(255,255,255,0.92)', backdropFilter: 'blur(8px)' }}
                      >
                        <Star size={12} className="fill-yellow-400 text-yellow-400" />
                        <span className="text-[11px] font-bold" style={{ color: 'var(--color-ink)', fontFamily: 'var(--font-display)' }}>
                          {service.rating}
                        </span>
                        <span className="text-[10px]" style={{ color: 'var(--color-ink-muted)' }}>({service.reviews})</span>
                      </div>
                    </div>

                    {/* Body */}
                    <div className="flex flex-col flex-1 p-5 gap-4">
                      <div className="flex items-start justify-between gap-3">
                        <div className="min-w-0">
                          <h3 className="text-base font-semibold leading-snug truncate"
                            style={{ color: 'var(--color-ink)', fontFamily: 'var(--font-display)' }}>
                            {service.title}
                          </h3>
                          <p className="text-sm mt-0.5" style={{ color: 'var(--color-ink-muted)' }}>
                            by {service.provider}
                          </p>
                        </div>
                        <div className="text-right shrink-0">
                          <p className="text-lg font-extrabold" style={{ color: 'var(--color-primary)', fontFamily: 'var(--font-display)' }}>
                            ${service.price}
                          </p>
                          <p className="text-[10px] font-medium uppercase tracking-wide" style={{ color: 'var(--color-ink-muted)' }}>
                            / hr
                          </p>
                        </div>
                      </div>

                      {/* CTA */}
                      <button
                        onClick={() => onNavigate(isAuthenticated ? 'services' : 'login')}
                        className="mt-auto w-full py-3 rounded-xl text-sm font-semibold text-white transition-all hover:opacity-90"
                        style={{ background: 'var(--color-deep)', fontFamily: 'var(--font-display)' }}
                      >
                        {isAuthenticated ? 'Book Now' : 'Login to Book'}
                      </button>
                    </div>
                  </motion.div>
                );
              })}
            </div>
          </div>
        </section>


        {/* ── Promo Banner ── */}
        <section className="mx-auto max-w-7xl px-8" style={{ paddingBlock: 'clamp(2rem, 4vw, 4rem)' }}>
          <div
            className="rounded-3xl p-10 flex flex-col md:flex-row items-center justify-between gap-8 relative overflow-hidden"
            style={{ background: 'linear-gradient(135deg, var(--color-deep) 0%, #00694a 100%)' }}
          >
            <div className="absolute inset-0 pointer-events-none overflow-hidden">
              <div className="absolute -top-16 -right-16 h-64 w-64 rounded-full opacity-10"
                style={{ background: 'var(--color-primary)', filter: 'blur(40px)' }} />
            </div>
            <div className="relative z-10 space-y-3">
              <span className="text-xs font-semibold uppercase tracking-wider px-3 py-1.5 rounded-full"
                style={{ background: 'rgba(255,255,255,0.12)', color: 'rgba(255,255,255,0.8)', fontFamily: 'var(--font-display)' }}>
                🎉 Special Offer
              </span>
              <h2 className="text-3xl font-extrabold text-white" style={{ fontFamily: 'var(--font-display)' }}>
                Get 20% off your<br />first booking.
              </h2>
              <p style={{ color: 'rgba(255,255,255,0.65)' }}>
                New customers only. Use code <strong style={{ color: 'var(--color-primary)' }}>FIRST20</strong> at checkout.
              </p>
            </div>
            <div className="relative z-10 flex gap-3">
              <button
                onClick={() => onNavigate(isAuthenticated ? 'services' : 'signup')}
                className="px-7 py-3.5 rounded-xl text-sm font-semibold text-white transition-all hover:opacity-90"
                style={{ background: 'var(--color-primary)', fontFamily: 'var(--font-display)' }}
              >
                {isAuthenticated ? 'Browse Services' : 'Sign Up & Save'}
              </button>
              <button
                className="px-7 py-3.5 rounded-xl text-sm font-semibold transition-all"
                style={{
                  border: '1.5px solid rgba(255,255,255,0.35)',
                  color: 'rgba(255,255,255,0.85)',
                  fontFamily: 'var(--font-display)',
                }}
              >
                Learn More
              </button>
            </div>
          </div>
        </section>

      </div>
    </div>
  );
};
