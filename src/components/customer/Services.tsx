import React, { useState } from 'react';
import { Search, Star, Clock, Shield, SlidersHorizontal, ArrowRight } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { Screen } from '../../types';

interface ServicesProps {
  onNavigate: (s: Screen) => void;
}

const CATEGORIES = ['All', 'Cleaning', 'Repair', 'Beauty', 'Moving', 'Gardening', 'Painting'];

const SERVICES = [
  {
    id: '1',
    name: 'Deep Home Cleaning',
    category: 'Cleaning',
    provider: 'Sparkle Pros',
    rating: 4.9,
    reviews: 128,
    price: 45,
    image: 'https://picsum.photos/seed/cleaning/400/300',
    description: 'Complete home sanitization including kitchen, bathrooms, and windows.',
    badge: 'Most Booked',
    badgeBg: '#FFF4EC',
    badgeColor: '#EA580C',
  },
  {
    id: '2',
    name: 'AC Maintenance',
    category: 'Repair',
    provider: 'CoolAir Tech',
    rating: 4.8,
    reviews: 85,
    price: 60,
    image: 'https://picsum.photos/seed/ac/400/300',
    description: 'Professional AC servicing, gas refilling, and filter cleaning.',
    badge: 'Top Rated',
    badgeBg: '#EEFAEF',
    badgeColor: '#16A34A',
  },
  {
    id: '3',
    name: 'Professional Makeup',
    category: 'Beauty',
    provider: 'Glow Studio',
    rating: 4.7,
    reviews: 210,
    price: 75,
    image: 'https://picsum.photos/seed/makeup/400/300',
    description: 'Expert makeup services for weddings, parties, and special events.',
    badge: null,
    badgeBg: '',
    badgeColor: '',
  },
  {
    id: '4',
    name: 'Furniture Moving',
    category: 'Moving',
    provider: 'Swift Movers',
    rating: 4.6,
    reviews: 156,
    price: 120,
    image: 'https://picsum.photos/seed/moving/400/300',
    description: 'Safe and secure furniture transportation with packing services.',
    badge: null,
    badgeBg: '',
    badgeColor: '',
  },
];

export const Services = ({ onNavigate }: ServicesProps) => {
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');

  const filteredServices = SERVICES.filter((service) => {
    const matchesCategory = selectedCategory === 'All' || service.category === selectedCategory;
    const matchesSearch =
      service.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      service.provider.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  return (
    <div className="pb-24 pt-2" style={{ minHeight: '80vh' }}>

      {/* ── Page Header ── */}
      <div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between mb-8">
        <div>
          <p
            className="text-xs font-semibold uppercase tracking-widest mb-1.5"
            style={{ color: 'var(--color-primary)', fontFamily: 'var(--font-display)' }}
          >
            Marketplace
          </p>
          <h1
            className="text-3xl md:text-4xl font-extrabold tracking-tight"
            style={{ color: 'var(--color-ink)', fontFamily: 'var(--font-display)' }}
          >
            Find Services
          </h1>
        </div>

        {/* Search */}
        <div className="w-full md:w-80 lg:w-96">
          <div
            className="flex items-center gap-3 px-4 py-3 rounded-xl"
            style={{
              background: 'var(--color-surface)',
              border: '1.5px solid var(--color-border)',
              boxShadow: 'var(--shadow-xs)',
            }}
          >
            <Search size={17} style={{ color: 'var(--color-ink-muted)' }} strokeWidth={2} className="shrink-0" />
            <input
              type="text"
              placeholder="Search services or providers..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-transparent text-sm outline-none"
              style={{ color: 'var(--color-ink)' }}
            />
          </div>
        </div>
      </div>

      {/* ── Category Pills ── */}
      <div className="no-scrollbar flex items-center gap-2 overflow-x-auto pb-1 mb-8">
        {CATEGORIES.map((cat) => {
          const active = selectedCategory === cat;
          return (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className="whitespace-nowrap px-5 py-2.5 rounded-full text-[0.8125rem] font-semibold transition-all shrink-0"
              style={{
                fontFamily: 'var(--font-display)',
                background: active ? 'var(--color-deep)' : 'var(--color-surface)',
                color: active ? '#fff' : 'var(--color-ink-muted)',
                border: `1.5px solid ${active ? 'var(--color-deep)' : 'var(--color-border)'}`,
                boxShadow: active ? 'var(--shadow-md)' : 'none',
              }}
            >
              {cat}
            </button>
          );
        })}
      </div>

      {/* ── Services Grid ── */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
        <AnimatePresence mode="popLayout">
          {filteredServices.map((service, idx) => (
            <motion.div
              key={service.id}
              layout
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95 }}
              transition={{ duration: 0.3, delay: idx * 0.05, ease: [0.16, 1, 0.3, 1] }}
              className="group flex flex-col overflow-hidden rounded-2xl"
              style={{
                background: 'var(--color-surface)',
                border: '1px solid var(--color-border)',
                boxShadow: 'var(--shadow-sm)',
                transition: 'box-shadow 0.25s ease, transform 0.25s ease, border-color 0.25s ease',
              }}
              onMouseEnter={e => {
                const el = e.currentTarget as HTMLElement;
                el.style.boxShadow = 'var(--shadow-xl)';
                el.style.transform = 'translateY(-3px)';
                el.style.borderColor = 'var(--color-neutral-200)';
              }}
              onMouseLeave={e => {
                const el = e.currentTarget as HTMLElement;
                el.style.boxShadow = 'var(--shadow-sm)';
                el.style.transform = 'translateY(0)';
                el.style.borderColor = 'var(--color-border)';
              }}
            >
              {/* Image */}
              <div className="relative h-48 overflow-hidden">
                <img
                  src={service.image}
                  alt={service.name}
                  className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                  referrerPolicy="no-referrer"
                />
                {/* Category chip */}
                <div
                  className="absolute top-3 left-3 px-2.5 py-1 rounded-lg text-[11px] font-semibold"
                  style={{
                    background: 'rgba(255,255,255,0.92)',
                    backdropFilter: 'blur(8px)',
                    color: 'var(--color-ink)',
                    fontFamily: 'var(--font-display)',
                  }}
                >
                  {service.category}
                </div>
                {/* Rating */}
                <div
                  className="absolute top-3 right-3 flex items-center gap-1.5 px-2.5 py-1 rounded-lg"
                  style={{
                    background: 'var(--color-primary)',
                    fontFamily: 'var(--font-display)',
                  }}
                >
                  <Star size={11} className="fill-white text-white" />
                  <span className="text-[11px] font-bold text-white">{service.rating}</span>
                </div>
                {/* Badge */}
                {service.badge && (
                  <div
                    className="absolute bottom-3 left-3 px-2.5 py-1 rounded-lg text-[11px] font-semibold"
                    style={{ background: service.badgeBg, color: service.badgeColor, fontFamily: 'var(--font-display)' }}
                  >
                    {service.badge}
                  </div>
                )}
              </div>

              {/* Body */}
              <div className="flex flex-col flex-1 p-5 gap-4">
                <div className="space-y-1.5">
                  <h3
                    className="text-base font-semibold leading-snug"
                    style={{ color: 'var(--color-ink)', fontFamily: 'var(--font-display)' }}
                  >
                    {service.name}
                  </h3>
                  <p className="text-sm font-medium" style={{ color: 'var(--color-ink-muted)' }}>
                    by {service.provider}
                  </p>
                  <p className="text-sm leading-relaxed line-clamp-2" style={{ color: 'var(--color-ink-muted)' }}>
                    {service.description}
                  </p>
                </div>

                {/* Trust badges */}
                <div className="flex items-center gap-4">
                  <div className="flex items-center gap-1.5" style={{ color: 'var(--color-ink-muted)' }}>
                    <Clock size={13} strokeWidth={2} />
                    <span className="text-[11px] font-medium" style={{ fontFamily: 'var(--font-display)' }}>Fast Service</span>
                  </div>
                  <div className="flex items-center gap-1.5" style={{ color: 'var(--color-ink-muted)' }}>
                    <Shield size={13} strokeWidth={2} />
                    <span className="text-[11px] font-medium" style={{ fontFamily: 'var(--font-display)' }}>Verified</span>
                  </div>
                </div>

                {/* Price + CTA */}
                <div
                  className="flex items-center justify-between pt-4 mt-auto"
                  style={{ borderTop: '1px solid var(--color-border)' }}
                >
                  <div>
                    <span className="text-xl font-extrabold" style={{ color: 'var(--color-ink)', fontFamily: 'var(--font-display)' }}>
                      ${service.price}
                    </span>
                    <span className="text-xs ml-1 font-medium" style={{ color: 'var(--color-ink-muted)' }}>/hr</span>
                  </div>
                  <button
                    className="flex items-center gap-1.5 px-4 py-2 rounded-xl text-sm font-semibold text-white transition-all hover:opacity-90"
                    style={{ background: 'var(--color-deep)', fontFamily: 'var(--font-display)' }}
                  >
                    Book Now
                  </button>
                </div>
              </div>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>

      {/* ── Empty State ── */}
      {filteredServices.length === 0 && (
        <div className="flex flex-col items-center justify-center py-24 text-center">
          <div
            className="h-20 w-20 rounded-2xl flex items-center justify-center mb-6"
            style={{ background: 'var(--color-neutral-100)' }}
          >
            <Search size={32} style={{ color: 'var(--color-neutral-400)' }} strokeWidth={1.5} />
          </div>
          <h3
            className="text-xl font-bold mb-2"
            style={{ color: 'var(--color-ink)', fontFamily: 'var(--font-display)' }}
          >
            No services found
          </h3>
          <p className="text-sm mb-8 max-w-xs" style={{ color: 'var(--color-ink-muted)' }}>
            Try adjusting your search or selecting a different category.
          </p>
          <button
            onClick={() => { setSearchQuery(''); setSelectedCategory('All'); }}
            className="flex items-center gap-2 px-6 py-3 rounded-xl text-sm font-semibold transition-all hover:opacity-90"
            style={{
              background: 'var(--color-deep)',
              color: '#fff',
              fontFamily: 'var(--font-display)',
            }}
          >
            Clear Filters <ArrowRight size={15} />
          </button>
        </div>
      )}
    </div>
  );
};
