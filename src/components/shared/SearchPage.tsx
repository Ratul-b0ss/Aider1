import React, { useState } from 'react';
import { motion } from 'motion/react';
import { Search, MapPin, Star, Filter, ArrowRight, Clock, Sparkles, Wrench } from 'lucide-react';
import { Screen } from '../../types';

type AuthStatus = 'guest' | 'customer' | 'provider';

interface SearchPageProps {
  onNavigate: (s: Screen) => void;
  authStatus?: AuthStatus;
}

const RESULTS = [
  { id: '1', title: 'Deep Home Cleaning',  provider: 'Sparkle Pros',  rating: 4.9, reviews: 128, price: 45, category: 'Cleaning', icon: Sparkles, color: '#16A34A' },
  { id: '2', title: 'AC Maintenance',       provider: 'CoolAir Tech',  rating: 4.8, reviews: 85,  price: 60, category: 'Repair',   icon: Wrench,   color: '#EA580C' },
];

export const SearchPage = ({ onNavigate, authStatus = 'guest' }: SearchPageProps) => {
  const [query, setQuery] = useState('');

  return (
    <div className="mx-auto max-w-3xl px-5 lg:px-8 py-6 space-y-5">
      <h1 className="text-2xl font-extrabold" style={{ color: 'var(--color-ink)', fontFamily: 'var(--font-display)' }}>
        Search
      </h1>
      <div
        className="flex items-center gap-3 px-4 py-3 rounded-2xl"
        style={{ background: 'var(--color-surface)', border: '1.5px solid var(--color-border)', boxShadow: 'var(--shadow-sm)' }}
      >
        <Search size={16} style={{ color: 'var(--color-ink-muted)' }} />
        <input
          type="text"
          value={query}
          onChange={e => setQuery(e.target.value)}
          placeholder="Search for services..."
          autoFocus
          className="flex-1 bg-transparent text-sm outline-none"
          style={{ color: 'var(--color-ink)' }}
        />
        {query && (
          <button
            onClick={() => setQuery('')}
            className="text-xs font-medium"
            style={{ color: 'var(--color-ink-muted)' }}
          >
            Clear
          </button>
        )}
      </div>
      <div className="space-y-3">
        {RESULTS.map((r, idx) => (
          <motion.button
            key={r.id}
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: idx * 0.07 }}
            onClick={() => onNavigate(authStatus !== 'guest' ? 'service-detail' : 'login')}
            className="w-full flex items-center gap-4 p-4 rounded-2xl text-left transition-all hover:shadow-md"
            style={{ background: 'var(--color-surface)', border: '1px solid var(--color-border)', boxShadow: 'var(--shadow-xs)' }}
          >
            <div className="h-10 w-10 rounded-xl flex items-center justify-center shrink-0"
              style={{ background: `${r.color}15` }}>
              <r.icon size={18} style={{ color: r.color }} />
            </div>
            <div className="flex-1">
              <p className="text-sm font-bold" style={{ color: 'var(--color-ink)', fontFamily: 'var(--font-display)' }}>{r.title}</p>
              <div className="flex items-center gap-2 mt-0.5">
                <Star size={10} className="fill-yellow-400 text-yellow-400" />
                <span className="text-xs" style={{ color: 'var(--color-ink-muted)' }}>{r.rating} ({r.reviews})</span>
              </div>
            </div>
            <span className="text-sm font-extrabold shrink-0" style={{ color: 'var(--color-primary)', fontFamily: 'var(--font-display)' }}>
              ${r.price}
            </span>
          </motion.button>
        ))}
      </div>
    </div>
  );
};
