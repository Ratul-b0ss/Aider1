import React, { useState } from 'react';
import { motion } from 'motion/react';
import {
  Search, MapPin, Star, ArrowRight, Sparkles, Wrench, Brush, Truck,
  Flower2, Paintbrush, Clock, CheckCircle, Calendar, ChevronRight,
  TrendingUp, Bell, Zap,
} from 'lucide-react';
import { Screen, AuthUser } from '../../types';

interface CustomerDashboardProps {
  onNavigate: (s: Screen) => void;
  user: AuthUser;
}

const CATEGORIES = [
  { id: 'cleaning',  name: 'Cleaning',   icon: Sparkles,   bg: '#EEFAEF', color: '#16A34A' },
  { id: 'repair',    name: 'Repair',     icon: Wrench,     bg: '#FFF4EC', color: '#EA580C' },
  { id: 'beauty',    name: 'Beauty',     icon: Brush,      bg: '#FEF0F9', color: '#DB2777' },
  { id: 'moving',    name: 'Moving',     icon: Truck,      bg: '#F3EFFF', color: '#7C3AED' },
  { id: 'gardening', name: 'Gardening',  icon: Flower2,    bg: '#EEFAEF', color: '#16A34A' },
  { id: 'painting',  name: 'Painting',   icon: Paintbrush, bg: '#FEFCE8', color: '#CA8A04' },
];

const FEATURED_SERVICES = [
  { id: '1', title: 'Deep Home Cleaning', provider: 'Sparkle Pros', rating: 4.9, reviews: 128, price: 45, tag: 'Most Booked', tagColor: '#EEFAEF', tagText: '#16A34A', img: 'https://picsum.photos/seed/clean1/600/400' },
  { id: '2', title: 'AC Maintenance',     provider: 'CoolAir Tech',  rating: 4.8, reviews: 85,  price: 60, tag: 'Top Rated',   tagColor: '#EEF6FF', tagText: '#2563EB', img: 'https://picsum.photos/seed/ac11/600/400' },
  { id: '3', title: 'Garden Care',        provider: 'GreenThumb Co.',rating: 4.7, reviews: 64,  price: 35, tag: 'New',         tagColor: '#F3EFFF', tagText: '#7C3AED', img: 'https://picsum.photos/seed/garden11/600/400' },
];

const RECENT_ACTIVITY = [
  { id: '1', service: 'Deep Cleaning',  provider: 'Jane P.',  date: 'Mar 14', status: 'Completed', statusBg: '#EEFAEF', statusColor: '#16A34A', icon: CheckCircle },
  { id: '2', service: 'AC Repair',      provider: 'Mike D.',  date: 'Mar 18', status: 'Upcoming',  statusBg: '#EEF6FF', statusColor: '#2563EB', icon: Calendar },
  { id: '3', service: 'Garden Service', provider: 'Rose G.',  date: 'Mar 20', status: 'In Progress', statusBg: 'var(--color-primary-light)', statusColor: 'var(--color-deep)', icon: Clock },
];

const QUICK_STATS = [
  { label: 'Total Bookings', value: '12', icon: Calendar,   bg: '#EEF6FF', color: '#2563EB' },
  { label: 'Completed',      value: '9',  icon: CheckCircle, bg: '#EEFAEF', color: '#16A34A' },
  { label: 'Saved Pros',     value: '5',  icon: Star,        bg: 'var(--color-primary-light)', color: 'var(--color-deep)' },
];

const greetingFor = (name: string) => {
  const h = new Date().getHours();
  const prefix = h < 12 ? 'Good morning' : h < 17 ? 'Good afternoon' : 'Good evening';
  return `${prefix}, ${name.split(' ')[0]}`;
};

export const CustomerDashboard = ({ onNavigate, user }: CustomerDashboardProps) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [activeCategory, setActiveCategory] = useState<string | null>(null);

  const firstName = user.name.split(' ')[0];
  const initials  = user.name.split(' ').map(n => n[0]).join('').slice(0, 2).toUpperCase();

  return (
    <div className="w-full">

      {/* ════════════════════════════════════
          SEARCH-FIRST HEADER
      ════════════════════════════════════ */}
      <div
        className="w-full pt-6 pb-8 px-5 lg:px-8"
        style={{
          background: 'linear-gradient(160deg, #f0f9f4 0%, #e8f5e9 60%, var(--color-background) 100%)',
          borderBottom: '1px solid var(--color-border)',
        }}
      >
        <div className="max-w-7xl mx-auto">

          {/* ── Hello {user} Greeting ── */}
          <div className="flex items-center justify-between mb-5">
            <div>
              <p className="text-xs font-semibold mb-0.5" style={{ color: 'var(--color-primary)', fontFamily: 'var(--font-display)' }}>
                Welcome back 👋
              </p>
              <h1
                className="text-2xl md:text-3xl font-extrabold tracking-tight"
                style={{ color: 'var(--color-ink)', fontFamily: 'var(--font-display)' }}
              >
                {greetingFor(user.name)}
              </h1>
            </div>
            <div className="flex items-center gap-2">
              <button
                className="h-10 w-10 rounded-xl flex items-center justify-center relative transition-colors"
                style={{ background: 'var(--color-surface)', border: '1px solid var(--color-border)', color: 'var(--color-ink-muted)' }}
              >
                <Bell size={16} />
                <span className="absolute top-1.5 right-1.5 h-2 w-2 rounded-full" style={{ background: 'var(--color-primary)' }} />
              </button>
              <button
                onClick={() => onNavigate('profile')}
                className="h-10 w-10 rounded-xl flex items-center justify-center text-xs font-bold text-white"
                style={{ background: 'linear-gradient(135deg, var(--color-deep) 0%, #006b4e 100%)' }}
              >
                {initials}
              </button>
            </div>
          </div>

          {/* ── Search Bar (Search-First) ── */}
          <div
            className="flex items-center rounded-2xl p-2 gap-1 mb-5"
            style={{
              background: 'var(--color-surface)',
              border: '1.5px solid var(--color-border)',
              boxShadow: 'var(--shadow-md)',
            }}
          >
            <div className="flex flex-1 items-center gap-3 px-4 py-2"
              style={{ borderRight: '1.5px solid var(--color-border)' }}>
              <Search size={16} style={{ color: 'var(--color-primary)' }} strokeWidth={2.5} />
              <input
                value={searchQuery}
                onChange={e => setSearchQuery(e.target.value)}
                type="text"
                placeholder="Search for a service..."
                className="w-full bg-transparent text-sm outline-none"
                style={{ color: 'var(--color-ink)' }}
              />
            </div>
            <div className="hidden sm:flex items-center gap-2 px-4 py-2">
              <MapPin size={15} style={{ color: 'var(--color-primary)' }} strokeWidth={2.5} />
              <span className="text-sm" style={{ color: 'var(--color-ink-muted)' }}>Current Location</span>
            </div>
            <button
              onClick={() => onNavigate('services')}
              className="px-5 py-2.5 rounded-xl text-sm font-semibold text-white shrink-0 transition-all hover:opacity-90"
              style={{ background: 'var(--color-deep)', fontFamily: 'var(--font-display)' }}
            >
              Search
            </button>
          </div>

          {/* ── Category Pills ── */}
          <div className="flex gap-2 overflow-x-auto no-scrollbar pb-1">
            <button
              onClick={() => setActiveCategory(null)}
              className="shrink-0 px-4 py-2 rounded-full text-xs font-semibold transition-all"
              style={{
                background: activeCategory === null ? 'var(--color-deep)' : 'var(--color-surface)',
                color: activeCategory === null ? '#fff' : 'var(--color-ink-muted)',
                border: '1.5px solid',
                borderColor: activeCategory === null ? 'var(--color-deep)' : 'var(--color-border)',
                fontFamily: 'var(--font-display)',
              }}
            >
              All
            </button>
            {CATEGORIES.map(cat => (
              <button
                key={cat.id}
                onClick={() => setActiveCategory(cat.id)}
                className="shrink-0 flex items-center gap-1.5 px-4 py-2 rounded-full text-xs font-semibold transition-all"
                style={{
                  background: activeCategory === cat.id ? cat.color : cat.bg,
                  color: activeCategory === cat.id ? '#fff' : cat.color,
                  border: `1.5px solid ${cat.color}30`,
                  fontFamily: 'var(--font-display)',
                }}
              >
                <cat.icon size={12} />
                {cat.name}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* ════════════════════════════════════
          MAIN CONTENT
      ════════════════════════════════════ */}
      <div className="max-w-7xl mx-auto px-5 lg:px-8 py-6 space-y-8">

        {/* ── Quick Stats Row ── */}
        <div className="grid grid-cols-3 gap-4">
          {QUICK_STATS.map(({ label, value, icon: Icon, bg, color }, idx) => (
            <motion.div
              key={label}
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.35, delay: idx * 0.08 }}
              className="rounded-2xl p-4 flex flex-col gap-2"
              style={{ background: bg, border: `1px solid ${color}20` }}
            >
              <Icon size={16} style={{ color }} strokeWidth={2} />
              <p className="text-xl font-extrabold" style={{ color: 'var(--color-ink)', fontFamily: 'var(--font-display)' }}>
                {value}
              </p>
              <p className="text-[11px] font-medium" style={{ color: 'var(--color-ink-muted)' }}>{label}</p>
            </motion.div>
          ))}
        </div>

        {/* ── Recent Activity Grid ── */}
        <div>
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-extrabold" style={{ color: 'var(--color-ink)', fontFamily: 'var(--font-display)' }}>
              Recent Activity
            </h2>
            <button
              onClick={() => onNavigate('bookings')}
              className="flex items-center gap-1 text-xs font-semibold"
              style={{ color: 'var(--color-primary)', fontFamily: 'var(--font-display)' }}
            >
              View All <ChevronRight size={13} />
            </button>
          </div>

          <div className="space-y-3">
            {RECENT_ACTIVITY.map((item, idx) => (
              <motion.button
                key={item.id}
                initial={{ opacity: 0, x: -12 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.35, delay: idx * 0.08 }}
                onClick={() => onNavigate('order-tracking')}
                className="w-full flex items-center gap-4 p-4 rounded-2xl text-left transition-all hover:shadow-md"
                style={{
                  background: 'var(--color-surface)',
                  border: '1px solid var(--color-border)',
                  boxShadow: 'var(--shadow-xs)',
                }}
              >
                <div className="h-10 w-10 rounded-xl flex items-center justify-center shrink-0"
                  style={{ background: item.statusBg }}>
                  <item.icon size={16} style={{ color: item.statusColor }} />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-bold truncate" style={{ color: 'var(--color-ink)', fontFamily: 'var(--font-display)' }}>
                    {item.service}
                  </p>
                  <p className="text-xs" style={{ color: 'var(--color-ink-muted)' }}>
                    {item.provider} · {item.date}
                  </p>
                </div>
                <span
                  className="shrink-0 text-[10px] font-bold px-2.5 py-1 rounded-full"
                  style={{ background: item.statusBg, color: item.statusColor, fontFamily: 'var(--font-display)' }}
                >
                  {item.status}
                </span>
              </motion.button>
            ))}
          </div>
        </div>

        {/* ── Featured Services ── */}
        <div>
          <div className="flex items-center justify-between mb-4">
            <div>
              <p className="text-xs font-semibold uppercase tracking-widest mb-1"
                style={{ color: 'var(--color-primary)', fontFamily: 'var(--font-display)' }}>
                Trending Now
              </p>
              <h2 className="text-lg font-extrabold" style={{ color: 'var(--color-ink)', fontFamily: 'var(--font-display)' }}>
                Popular Services
              </h2>
            </div>
            <button
              onClick={() => onNavigate('services')}
              className="flex items-center gap-1 text-xs font-semibold"
              style={{ color: 'var(--color-primary)', fontFamily: 'var(--font-display)' }}
            >
              See All <ArrowRight size={13} />
            </button>
          </div>

          <div className="grid md:grid-cols-3 gap-5">
            {FEATURED_SERVICES.map((svc, idx) => (
              <motion.div
                key={svc.id}
                initial={{ opacity: 0, scale: 0.97 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.35, delay: idx * 0.08 }}
                onClick={() => onNavigate('service-detail')}
                className="group rounded-2xl overflow-hidden cursor-pointer transition-all hover:-translate-y-1 hover:shadow-lg"
                style={{
                  background: 'var(--color-surface)',
                  border: '1px solid var(--color-border)',
                  boxShadow: 'var(--shadow-sm)',
                }}
              >
                <div className="relative h-44 overflow-hidden">
                  <img
                    src={svc.img}
                    alt={svc.title}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                  <div className="absolute top-3 left-3 px-2.5 py-1 rounded-lg text-[10px] font-bold"
                    style={{ background: svc.tagColor, color: svc.tagText, fontFamily: 'var(--font-display)' }}>
                    {svc.tag}
                  </div>
                  <div className="absolute top-3 right-3 flex items-center gap-1 bg-white/90 backdrop-blur-sm px-2 py-1 rounded-lg">
                    <Star size={10} className="fill-yellow-400 text-yellow-400" />
                    <span className="text-[10px] font-bold" style={{ color: 'var(--color-ink)' }}>{svc.rating}</span>
                    <span className="text-[10px]" style={{ color: 'var(--color-ink-muted)' }}>({svc.reviews})</span>
                  </div>
                </div>
                <div className="p-4">
                  <h3 className="text-sm font-bold mb-0.5" style={{ color: 'var(--color-ink)', fontFamily: 'var(--font-display)' }}>
                    {svc.title}
                  </h3>
                  <p className="text-xs mb-3" style={{ color: 'var(--color-ink-muted)' }}>{svc.provider}</p>
                  <div className="flex items-center justify-between">
                    <span className="text-base font-extrabold" style={{ color: 'var(--color-primary)', fontFamily: 'var(--font-display)' }}>
                      ${svc.price}
                    </span>
                    <button
                      onClick={e => { e.stopPropagation(); onNavigate('booking-checkout'); }}
                      className="flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-xs font-bold text-white transition-all hover:opacity-90"
                      style={{ background: 'var(--color-deep)', fontFamily: 'var(--font-display)' }}
                    >
                      Book Now
                    </button>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* ── Promo Banner ── */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="relative rounded-3xl p-8 overflow-hidden flex flex-col md:flex-row items-start md:items-center justify-between gap-5"
          style={{ background: 'linear-gradient(135deg, var(--color-deep) 0%, #006b4e 100%)' }}
        >
          <div className="absolute -top-10 -right-10 h-48 w-48 rounded-full opacity-10"
            style={{ background: 'var(--color-primary)', filter: 'blur(40px)' }} />
          <div className="relative">
            <span
              className="inline-block text-[10px] font-semibold uppercase tracking-widest px-2.5 py-1 rounded-md mb-3"
              style={{ background: 'rgba(255,255,255,0.12)', color: 'rgba(255,255,255,0.8)', fontFamily: 'var(--font-display)' }}
            >
              Limited Offer
            </span>
            <h3 className="text-2xl font-extrabold text-white mb-2" style={{ fontFamily: 'var(--font-display)' }}>
              20% Off Your Next Booking
            </h3>
            <p className="text-sm" style={{ color: 'rgba(255,255,255,0.65)' }}>
              Valid on all services until end of month. Use code <strong className="text-white">WELCOME20</strong>
            </p>
          </div>
          <button
            onClick={() => onNavigate('services')}
            className="relative shrink-0 flex items-center gap-2 px-6 py-3 rounded-xl text-sm font-bold transition-all hover:opacity-90"
            style={{ background: 'var(--color-primary)', color: '#fff', fontFamily: 'var(--font-display)' }}
          >
            Claim Offer <ArrowRight size={14} />
          </button>
        </motion.div>
      </div>
    </div>
  );
};
