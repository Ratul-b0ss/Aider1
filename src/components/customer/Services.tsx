import React, { useState } from 'react';
import { Search, Star, Clock, Shield } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { Button } from '../ui/Button';
import { Input } from '../ui/Input';
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
  },
];

export const Services = ({ onNavigate }: ServicesProps) => {
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');

  const filteredServices = SERVICES.filter(service => {
    const matchesCategory = selectedCategory === 'All' || service.category === selectedCategory;
    const matchesSearch = service.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         service.provider.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  return (
    <div className="space-y-fluid-lg pb-fluid-xl pt-fluid-md">
      {/* Header */}
      <div className="flex flex-col gap-fluid-md md:flex-row md:items-end md:justify-between">
        <div className="space-y-1">
          <span className="block text-[10px] font-black uppercase tracking-[0.2em] text-primary">Marketplace</span>
          <h1 className="text-fluid-xl">Find Services</h1>
        </div>
        <div className="w-full md:w-96">
          <Input
            placeholder="Search for services..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            icon={<Search size={20} />}
          />
        </div>
      </div>

      {/* Categories Filter */}
      <div className="no-scrollbar flex gap-fluid-xs overflow-x-auto pb-fluid-xs">
        {CATEGORIES.map((cat) => (
          <button
            key={cat}
            onClick={() => setSelectedCategory(cat)}
            className={`whitespace-nowrap rounded-2xl border-2 px-fluid-md py-fluid-sm text-[10px] font-black uppercase tracking-widest transition-all ${
              selectedCategory === cat
                ? 'border-primary bg-primary text-white shadow-lg shadow-primary/20'
                : 'border-border bg-white text-ink-muted hover:border-primary hover:text-primary'
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* Services Grid */}
      <div className="auto-grid">
        <AnimatePresence mode="popLayout">
          {filteredServices.map((service, idx) => (
            <motion.div
              key={service.id}
              layout
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9 }}
              transition={{ duration: 0.3, delay: idx * 0.05 }}
              className="card-premium group flex flex-col p-0"
            >
              <div className="relative h-56 overflow-hidden">
                <img 
                  src={service.image} 
                  alt={service.name} 
                  className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-110"
                  referrerPolicy="no-referrer"
                />
                <div className="absolute left-fluid-sm top-fluid-sm rounded-2xl bg-white/90 px-4 py-2 backdrop-blur-md">
                  <span className="text-[10px] font-black uppercase tracking-widest text-ink">{service.category}</span>
                </div>
                <div className="absolute right-fluid-sm top-fluid-sm flex items-center gap-1 rounded-full bg-primary px-3 py-1 shadow-lg">
                  <Star size={12} className="fill-ink text-ink" />
                  <span className="text-[10px] font-black text-ink">{service.rating}</span>
                </div>
              </div>

              <div className="flex flex-1 flex-col gap-fluid-md p-fluid-md">
                <div className="space-y-2">
                  <h3 className="text-fluid-lg leading-tight text-ink transition-colors group-hover:text-primary">
                    {service.name}
                  </h3>
                  <p className="text-fluid-xs font-bold text-ink-muted">by {service.provider}</p>
                  <p className="line-clamp-2 text-fluid-xs text-ink-muted">
                    {service.description}
                  </p>
                </div>

                <div className="mt-auto space-y-fluid-sm">
                  <div className="flex gap-4">
                    <div className="flex items-center gap-2 text-ink-muted">
                      <Clock size={14} />
                      <span className="text-[10px] font-black uppercase tracking-widest">Fast Service</span>
                    </div>
                    <div className="flex items-center gap-2 text-ink-muted">
                      <Shield size={14} />
                      <span className="text-[10px] font-black uppercase tracking-widest">Verified</span>
                    </div>
                  </div>

                  <div className="flex items-center justify-between border-t border-border pt-fluid-sm">
                    <div className="flex items-baseline gap-1">
                      <span className="text-fluid-xl font-black text-ink">${service.price}</span>
                      <span className="text-[10px] font-black uppercase tracking-widest text-ink-muted">/hr</span>
                    </div>
                    <Button size="sm">Book Now</Button>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>

      {filteredServices.length === 0 && (
        <div className="flex flex-col items-center justify-center py-20 text-center">
          <div className="mb-6 flex h-24 w-24 items-center justify-center rounded-full bg-border">
            <Search size={40} className="text-ink-muted opacity-20" />
          </div>
          <h3 className="text-fluid-lg mb-2">No services found</h3>
          <p className="text-fluid-xs text-ink-muted">Try adjusting your search or category filters.</p>
          <Button 
            variant="ghost" 
            className="mt-8 text-primary"
            onClick={() => {
              setSearchQuery('');
              setSelectedCategory('All');
            }}
          >
            Clear All Filters
          </Button>
        </div>
      )}
    </div>
  );
};
