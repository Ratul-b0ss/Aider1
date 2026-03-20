import React, { useState } from 'react';
import { motion } from 'motion/react';
import {
  Search, Star, MapPin, Filter, ChevronDown, SlidersHorizontal,
  Sparkles, Wrench, Brush, Truck, Flower2, Paintbrush, Heart, ArrowRight,
} from 'lucide-react';
import { Screen } from '../../types';

interface ServicesProps {
  onNavigate: (s: Screen) => void;
  isProvider?: boolean;
}

const ALL_SERVICES = [
  { id: '1', title: 'Deep Home Cleaning',     provider: 'Sparkle Pros',    rating: 4.9, reviews: 128, price: 45, category: 'Cleaning',  img: 'https://picsum.photos/seed/svc1/600/400',  tag: 'Popular' },
  { id: '2', title: 'AC Maintenance',          provider: 'CoolAir Tech',    rating: 4.8, reviews: 85,  price: 60, category: 'Repair',    img: 'https://picsum.photos/seed/svc2/600/400',  tag: 'Top Rated' },
  { id: '3', title: 'Garden Care Package',     provider: 'GreenThumb Co.',  rating: 4.7, reviews: 64,  price: 35, category: 'Gardening', img: 'https://picsum.photos/seed/svc3/600/400',  tag: 'New' },
  { id: '4', title: 'Interior Painting',       provider: 'ArtHouse Pros',   rating: 4.6, reviews: 52,  price: 120, category: 'Painting', img: 'https://picsum.photos/seed/svc4/600/400',  tag: '' },
  { id: '5', title: 'Hair & Nail Studio',      provider: 'Glam Mobile',     rating: 4.9, reviews: 201, price: 55, category: 'Beauty',   img: 'https://picsum.photos/seed/svc5/600/400',  tag: 'Popular' },
  { id: '6', title: 'Full Home Move',          provider: 'MoversPro',       rating: 4.5, reviews: 43,  price: 250, category: 'Moving',  img: 'https://picsum.photos/seed/svc6/600/400',  tag: '' },
];

const CATEGORIES = [
  { id: 'all',       name: 'All',       icon: SlidersHorizontal },
  { id: 'cleaning',  name: 'Cleaning',  icon: Sparkles },
  { id: 'repair',    name: 'Repair',    icon: Wrench },
  { id: 'beauty',    name: 'Beauty',    icon: Brush },
  { id: 'moving',    name: 'Moving',    icon: Truck },
  { id: 'gardening', name: 'Gardening', icon: Flower2 },
  { id: 'painting',  name: 'Painting',  icon: Paintbrush },
];

export const Services = ({ onNavigate, isProvider = false }: ServicesProps) => {
  const [search, setSearch] = useState('');
  const [category, setCategory] = useState('all');
  const [liked, setLiked] = useState<string[]>([]);

  const filtered = ALL_SERVICES.filter(s => {
    const matchSearch = !search || s.title.toLowerCase().includes(search.toLowerCase());
    const matchCat    = category === 'all' || s.category.toLowerCase() === category;
    return matchSearch && matchCat;
  });

  return (
    <div className="space-y-5">
      {/* ── Header ── */}
      <div>
        <p className="text-xs font-semibold uppercase tracking-widest mb-1" style={{ color: 'var(--color-primary)', fontFamily: 'var(--font-display)' }}>
          Explore
        </p>
        <h1 className="text-2xl font-extrabold" style={{ color: 'var(--color-ink)', fontFamily: 'var(--font-display)' }}>
          {isProvider ? 'Manage Services' : 'All Services'}
        </h1>
      </div>

      {/* Search */}
      <div
        className="flex items-center gap-3 px-4 py-3 rounded-2xl"
        style={{ background: 'var(--color-surface)', border: '1.5px solid var(--color-border)', boxShadow: 'var(--shadow-sm)' }}
      >
        <Search size={16} style={{ color: 'var(--color-ink-muted)' }} />
        <input
          type="text"
          value={search}
          onChange={e => setSearch(e.target.value)}
          placeholder="Search services..."
          className="flex-1 bg-transparent text-sm outline-none"
          style={{ color: 'var(--color-ink)' }}
        />
        <button
          className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold transition-all"
          style={{ background: 'var(--color-neutral-100)', color: 'var(--color-ink)', fontFamily: 'var(--font-display)' }}
        >
          <Filter size={12} /> Filter
        </button>
      </div>

      {/* Category pills */}
      <div className="flex gap-2 overflow-x-auto no-scrollbar pb-1">
        {CATEGORIES.map(({ id, name, icon: Icon }) => (
          <button
            key={id}
            onClick={() => setCategory(id)}
            className="shrink-0 flex items-center gap-1.5 px-4 py-2 rounded-full text-xs font-semibold transition-all"
            style={{
              background: category === id ? 'var(--color-deep)' : 'var(--color-neutral-100)',
              color: category === id ? '#fff' : 'var(--color-ink)',
              fontFamily: 'var(--font-display)',
            }}
          >
            <Icon size={12} />
            {name}
          </button>
        ))}
      </div>

      {/* Service Grid */}
      <p className="text-xs font-medium" style={{ color: 'var(--color-ink-muted)' }}>
        {filtered.length} services found
      </p>
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">
        {filtered.map((svc, idx) => (
          <motion.div
            key={svc.id}
            initial={{ opacity: 0, scale: 0.97 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.3, delay: idx * 0.06 }}
            onClick={() => onNavigate(isProvider ? 'provider-services' : 'service-detail')}
            className="group rounded-2xl overflow-hidden cursor-pointer transition-all hover:-translate-y-1 hover:shadow-lg"
            style={{ background: 'var(--color-surface)', border: '1px solid var(--color-border)', boxShadow: 'var(--shadow-xs)' }}
          >
            <div className="relative h-44 overflow-hidden">
              <img
                src={svc.img}
                alt={svc.title}
                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
              />
              {svc.tag && (
                <div className="absolute top-3 left-3 px-2.5 py-1 rounded-lg text-[10px] font-bold"
                  style={{ background: 'rgba(255,255,255,0.95)', color: 'var(--color-deep)', fontFamily: 'var(--font-display)' }}>
                  {svc.tag}
                </div>
              )}
              <button
                onClick={e => { e.stopPropagation(); setLiked(l => l.includes(svc.id) ? l.filter(x => x !== svc.id) : [...l, svc.id]); }}
                className="absolute top-3 right-3 h-8 w-8 rounded-lg flex items-center justify-center"
                style={{ background: 'rgba(255,255,255,0.9)', backdropFilter: 'blur(8px)' }}
              >
                <Heart size={13} className={liked.includes(svc.id) ? 'fill-red-500 text-red-500' : 'text-gray-600'} />
              </button>
            </div>
            <div className="p-4">
              <p className="text-[11px] font-semibold uppercase tracking-wider mb-1" style={{ color: 'var(--color-ink-muted)' }}>
                {svc.category}
              </p>
              <h3 className="text-sm font-bold mb-1 line-clamp-1" style={{ color: 'var(--color-ink)', fontFamily: 'var(--font-display)' }}>
                {svc.title}
              </h3>
              <p className="text-xs mb-3" style={{ color: 'var(--color-ink-muted)' }}>{svc.provider}</p>
              <div className="flex items-center gap-2 mb-3">
                <Star size={11} className="fill-yellow-400 text-yellow-400" />
                <span className="text-xs font-bold" style={{ color: 'var(--color-ink)' }}>{svc.rating}</span>
                <span className="text-xs" style={{ color: 'var(--color-ink-muted)' }}>({svc.reviews})</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-base font-extrabold" style={{ color: 'var(--color-primary)', fontFamily: 'var(--font-display)' }}>
                  ${svc.price}
                </span>
                {!isProvider && (
                  <button
                    onClick={e => { e.stopPropagation(); onNavigate('booking-checkout'); }}
                    className="flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-xs font-bold text-white transition-all hover:opacity-90"
                    style={{ background: 'var(--color-deep)', fontFamily: 'var(--font-display)' }}
                  >
                    Book <ArrowRight size={11} />
                  </button>
                )}
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
};
