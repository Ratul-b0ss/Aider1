import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Search as SearchIcon, SlidersHorizontal, X, MapPin, Star, ArrowUpRight, Filter } from 'lucide-react';
import { Screen, UserType } from '../../types';

interface SearchPageProps {
  onNavigate: (s: Screen) => void;
  userType: UserType;
}

const CATEGORIES = [
  { id: 'all', label: 'All' },
  { id: 'cleaning', label: 'Cleaning' },
  { id: 'plumbing', label: 'Plumbing' },
  { id: 'electrical', label: 'Electrical' },
  { id: 'carpentry', label: 'Carpentry' },
  { id: 'hvac', label: 'HVAC' },
  { id: 'landscaping', label: 'Landscaping' },
  { id: 'painting', label: 'Painting' },
];

const RESULTS = [
  { id: 1, title: 'Deep Home Cleaning', pro: 'Maria S.', rating: 4.9, reviews: 87, price: '$45', location: 'San Francisco, CA', category: 'cleaning', available: true },
  { id: 2, title: 'Emergency Plumbing Repair', pro: 'Carlos T.', rating: 4.8, reviews: 142, price: '$60', location: 'Oakland, CA', category: 'plumbing', available: true },
  { id: 3, title: 'Full Electrical Inspection', pro: 'Dan W.', rating: 5.0, reviews: 36, price: '$95', location: 'San Jose, CA', category: 'electrical', available: false },
  { id: 4, title: 'Custom Carpentry Work', pro: 'Priya N.', rating: 4.7, reviews: 64, price: '$75', location: 'Berkeley, CA', category: 'carpentry', available: true },
  { id: 5, title: 'AC Service & Maintenance', pro: 'James L.', rating: 4.8, reviews: 51, price: '$80', location: 'San Francisco, CA', category: 'hvac', available: true },
  { id: 6, title: 'Garden & Lawn Maintenance', pro: 'Sofia R.', rating: 4.9, reviews: 103, price: '$55', location: 'Palo Alto, CA', category: 'landscaping', available: true },
];

export const SearchPage = ({ onNavigate, userType }: SearchPageProps) => {
  const [query, setQuery] = useState('');
  const [activeCategory, setActiveCategory] = useState('all');
  const [showFilters, setShowFilters] = useState(false);

  const filtered = RESULTS.filter(r => {
    const matchCat = activeCategory === 'all' || r.category === activeCategory;
    const matchQ = !query || r.title.toLowerCase().includes(query.toLowerCase()) || r.pro.toLowerCase().includes(query.toLowerCase());
    return matchCat && matchQ;
  });

  return (
    <div className="pb-28 pt-2">
      {/* ── Page header ── */}
      <header className="mb-6">
        <p className="text-xs font-semibold uppercase tracking-widest mb-1.5"
          style={{ color: 'var(--color-primary)', fontFamily: 'var(--font-display)' }}>
          Discover
        </p>
        <h1 className="text-3xl md:text-4xl font-extrabold tracking-tight"
          style={{ color: 'var(--color-ink)', fontFamily: 'var(--font-display)' }}>
          {userType === 'provider' ? 'Browse Market' : 'Find Services'}
        </h1>
      </header>

      {/* ── Search bar ── */}
      <div className="flex items-center gap-3 mb-5">
        <div className="relative flex-1">
          <SearchIcon size={18} className="absolute left-4 top-1/2 -translate-y-1/2" style={{ color: 'var(--color-neutral-400)' }} />
          <input
            type="search"
            value={query}
            onChange={e => setQuery(e.target.value)}
            placeholder={userType === 'provider' ? 'Search service categories…' : 'Search services, professionals…'}
            className="w-full py-3.5 pl-11 pr-4 rounded-2xl text-sm outline-none transition-all"
            style={{
              background: 'var(--color-surface)',
              border: '1.5px solid var(--color-border)',
              color: 'var(--color-ink)',
              boxShadow: 'var(--shadow-xs)',
            }}
            onFocus={e => {
              e.currentTarget.style.borderColor = 'var(--color-primary)';
              e.currentTarget.style.boxShadow = '0 0 0 3px color-mix(in srgb, var(--color-primary) 12%, transparent)';
            }}
            onBlur={e => {
              e.currentTarget.style.borderColor = 'var(--color-border)';
              e.currentTarget.style.boxShadow = 'var(--shadow-xs)';
            }}
          />
          {query && (
            <button
              onClick={() => setQuery('')}
              className="absolute right-4 top-1/2 -translate-y-1/2 h-5 w-5 rounded-full flex items-center justify-center"
              style={{ background: 'var(--color-neutral-200)' }}
            >
              <X size={11} strokeWidth={2.5} style={{ color: 'var(--color-neutral-600)' }} />
            </button>
          )}
        </div>
        <motion.button
          whileTap={{ scale: 0.95 }}
          onClick={() => setShowFilters(f => !f)}
          className="h-12 w-12 rounded-2xl flex items-center justify-center transition-all"
          style={{
            background: showFilters ? 'var(--color-primary)' : 'var(--color-surface)',
            border: `1.5px solid ${showFilters ? 'var(--color-primary)' : 'var(--color-border)'}`,
            boxShadow: 'var(--shadow-xs)',
          }}
          aria-label="Toggle filters"
        >
          <SlidersHorizontal size={17} style={{ color: showFilters ? '#fff' : 'var(--color-ink-muted)' }} strokeWidth={2} />
        </motion.button>
      </div>

      {/* ── Category pills ── */}
      <div className="flex gap-2 overflow-x-auto pb-1 no-scrollbar mb-6">
        {CATEGORIES.map(cat => (
          <motion.button
            key={cat.id}
            whileTap={{ scale: 0.95 }}
            onClick={() => setActiveCategory(cat.id)}
            className="shrink-0 px-4 py-2 rounded-full text-xs font-bold transition-all"
            style={{
              background: activeCategory === cat.id ? 'var(--color-deep)' : 'var(--color-surface)',
              color: activeCategory === cat.id ? '#fff' : 'var(--color-ink-muted)',
              border: `1.5px solid ${activeCategory === cat.id ? 'var(--color-deep)' : 'var(--color-border)'}`,
              fontFamily: 'var(--font-display)',
            }}
          >
            {cat.label}
          </motion.button>
        ))}
      </div>

      {/* ── Filter panel ── */}
      <AnimatePresence>
        {showFilters && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="overflow-hidden mb-6"
          >
            <div
              className="p-5 rounded-2xl"
              style={{ background: 'var(--color-surface)', border: '1px solid var(--color-border)', boxShadow: 'var(--shadow-xs)' }}
            >
              <div className="flex items-center justify-between mb-4">
                <p className="text-sm font-bold" style={{ color: 'var(--color-ink)', fontFamily: 'var(--font-display)' }}>
                  Filters
                </p>
                <button className="text-xs font-semibold" style={{ color: 'var(--color-primary)', fontFamily: 'var(--font-display)' }}>
                  Reset All
                </button>
              </div>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                {['Available Now', 'Top Rated', 'Verified Pro', 'Nearby'].map(f => (
                  <label key={f} className="flex items-center gap-2.5 cursor-pointer">
                    <div className="h-4 w-4 rounded-md border-2 flex items-center justify-center transition-all" style={{ borderColor: 'var(--color-border)', background: 'var(--color-neutral-50)' }} />
                    <span className="text-xs font-semibold" style={{ color: 'var(--color-ink-muted)', fontFamily: 'var(--font-display)' }}>{f}</span>
                  </label>
                ))}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* ── Results count ── */}
      <div className="flex items-center justify-between mb-4">
        <p className="text-sm font-semibold" style={{ color: 'var(--color-ink-muted)', fontFamily: 'var(--font-display)' }}>
          {filtered.length} result{filtered.length !== 1 ? 's' : ''}
          {activeCategory !== 'all' && (
            <span> in <strong style={{ color: 'var(--color-ink)' }}>{CATEGORIES.find(c => c.id === activeCategory)?.label}</strong></span>
          )}
        </p>
        <span className="flex items-center gap-1.5 text-xs font-semibold" style={{ color: 'var(--color-ink-muted)', fontFamily: 'var(--font-display)' }}>
          <Filter size={12} strokeWidth={2} />
          Relevance
        </span>
      </div>

      {/* ── Results grid ── */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <AnimatePresence>
          {filtered.map((result, i) => (
            <motion.div
              key={result.id}
              layout
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95 }}
              transition={{ duration: 0.3, delay: i * 0.05 }}
              className="group cursor-pointer rounded-2xl p-5 transition-all hover:-translate-y-0.5"
              style={{
                background: 'var(--color-surface)',
                border: '1px solid var(--color-border)',
                boxShadow: 'var(--shadow-xs)',
              }}
              onMouseEnter={e => {
                (e.currentTarget as HTMLElement).style.boxShadow = 'var(--shadow-lg)';
                (e.currentTarget as HTMLElement).style.borderColor = 'var(--color-neutral-200)';
              }}
              onMouseLeave={e => {
                (e.currentTarget as HTMLElement).style.boxShadow = 'var(--shadow-xs)';
                (e.currentTarget as HTMLElement).style.borderColor = 'var(--color-border)';
              }}
            >
              <div className="flex items-start justify-between gap-3 mb-3">
                <div className="min-w-0">
                  <h3 className="text-sm font-bold leading-tight truncate" style={{ color: 'var(--color-ink)', fontFamily: 'var(--font-display)' }}>
                    {result.title}
                  </h3>
                  <p className="text-xs mt-0.5" style={{ color: 'var(--color-ink-muted)' }}>by {result.pro}</p>
                </div>
                <div className="text-right shrink-0">
                  <p className="text-base font-extrabold" style={{ color: 'var(--color-deep)', fontFamily: 'var(--font-display)' }}>
                    {result.price}
                  </p>
                  <p className="text-[10px]" style={{ color: 'var(--color-ink-muted)' }}>per visit</p>
                </div>
              </div>

              <div className="flex items-center gap-3 flex-wrap">
                <span className="flex items-center gap-1 text-xs font-semibold" style={{ color: 'var(--color-ink-muted)', fontFamily: 'var(--font-display)' }}>
                  <Star size={11} strokeWidth={2} style={{ color: '#F59E0B', fill: '#F59E0B' }} />
                  {result.rating} ({result.reviews})
                </span>
                <span className="flex items-center gap-1 text-xs" style={{ color: 'var(--color-ink-muted)' }}>
                  <MapPin size={10} strokeWidth={2} />
                  {result.location}
                </span>
                <span
                  className="ml-auto text-[10px] font-black px-2.5 py-1 rounded-full"
                  style={{
                    background: result.available ? '#EEFAEF' : 'var(--color-neutral-100)',
                    color: result.available ? '#16A34A' : 'var(--color-neutral-500)',
                    fontFamily: 'var(--font-display)',
                  }}
                >
                  {result.available ? '● Available' : '○ Busy'}
                </span>
              </div>

              <div className="flex items-center gap-2 mt-4">
                <button
                  className="flex-1 py-2.5 rounded-xl text-xs font-bold transition-all hover:opacity-90"
                  style={{
                    background: 'var(--color-deep)',
                    color: '#fff',
                    fontFamily: 'var(--font-display)',
                  }}
                >
                  {userType === 'provider' ? 'View Details' : 'Book Now'}
                </button>
                <button
                  className="h-9 w-9 rounded-xl flex items-center justify-center transition-all hover:bg-[var(--color-neutral-50)]"
                  style={{ border: '1.5px solid var(--color-border)' }}
                  aria-label="View"
                >
                  <ArrowUpRight size={14} style={{ color: 'var(--color-ink-muted)' }} />
                </button>
              </div>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>

      {filtered.length === 0 && (
        <div className="flex flex-col items-center gap-3 py-16 text-center">
          <SearchIcon size={40} style={{ color: 'var(--color-neutral-300)' }} strokeWidth={1.5} />
          <p className="text-base font-bold" style={{ color: 'var(--color-ink-muted)', fontFamily: 'var(--font-display)' }}>
            No results found
          </p>
          <p className="text-sm" style={{ color: 'var(--color-neutral-400)' }}>
            Try different keywords or reset your filters
          </p>
        </div>
      )}
    </div>
  );
};
