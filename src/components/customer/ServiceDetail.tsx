import React, { useState } from 'react';
import { motion } from 'motion/react';
import {
  Star, MapPin, Clock, Shield, Heart, Share2, ChevronLeft,
  CheckCircle, ArrowRight, Calendar, Users, Zap, MessageCircle,
} from 'lucide-react';
import { Screen } from '../../types';

interface ServiceDetailProps {
  onNavigate: (s: Screen) => void;
}

const SERVICE = {
  id: '1',
  title: 'Professional Deep Home Cleaning',
  provider: { name: 'Sparkle Pros', rating: 4.9, reviews: 128, jobs: 540, avatar: 'SP', verified: true },
  price: 45,
  duration: '3–4 hours',
  location: 'City-wide',
  description: `Our deep cleaning service covers every corner of your home. We use eco-friendly, hospital-grade products and bring all equipment. Every session includes: kitchen deep-clean, bathroom sanitization, vacuuming all floors and carpets, dusting all surfaces, window interior clean, and appliance exterior wipe-down.`,
  includes: [
    'All cleaning equipment & supplies provided',
    'Eco-friendly, pet-safe products',
    'Background-checked & insured professionals',
    'On-time arrival guarantee',
    '24-hr satisfaction guarantee',
  ],
  images: [
    'https://picsum.photos/seed/clean1/800/500',
    'https://picsum.photos/seed/clean2/800/500',
    'https://picsum.photos/seed/clean3/800/500',
  ],
  tag: 'Most Booked',
  tagColor: '#EEFAEF',
  tagText: '#16A34A',
};

const REVIEWS = [
  { id: '1', name: 'Alice B.', avatar: 'AB', rating: 5, date: 'Mar 12', comment: 'Absolutely spotless! They were professional, thorough, and on time.' },
  { id: '2', name: 'Marcus T.', avatar: 'MT', rating: 5, date: 'Mar 8',  comment: 'Best cleaning service I\'ve ever used. Will book again for sure.' },
  { id: '3', name: 'Linda R.', avatar: 'LR', rating: 4, date: 'Feb 28', comment: 'Very good service. Minor issue with timing but they made up for it.' },
];

export const ServiceDetail = ({ onNavigate }: ServiceDetailProps) => {
  const [activeImg, setActiveImg] = useState(0);
  const [liked, setLiked] = useState(false);

  return (
    <div className="w-full pb-24">

      {/* ── Hero Image ── */}
      <div className="relative h-72 md:h-96 overflow-hidden">
        <img
          src={SERVICE.images[activeImg]}
          alt={SERVICE.title}
          className="w-full h-full object-cover transition-all duration-500"
        />
        {/* Overlay gradient */}
        <div className="absolute inset-0" style={{ background: 'linear-gradient(180deg, rgba(0,0,0,0) 50%, rgba(0,0,0,0.6) 100%)' }} />

        {/* Back button */}
        <button
          onClick={() => onNavigate('services')}
          className="absolute top-4 left-4 h-10 w-10 rounded-xl flex items-center justify-center"
          style={{ background: 'rgba(255,255,255,0.9)', backdropFilter: 'blur(10px)', color: 'var(--color-ink)' }}
        >
          <ChevronLeft size={18} />
        </button>

        {/* Actions */}
        <div className="absolute top-4 right-4 flex gap-2">
          <button
            onClick={() => setLiked(l => !l)}
            className="h-10 w-10 rounded-xl flex items-center justify-center"
            style={{ background: 'rgba(255,255,255,0.9)', backdropFilter: 'blur(10px)' }}
          >
            <Heart size={16} className={liked ? 'fill-red-500 text-red-500' : 'text-gray-600'} />
          </button>
          <button
            className="h-10 w-10 rounded-xl flex items-center justify-center"
            style={{ background: 'rgba(255,255,255,0.9)', backdropFilter: 'blur(10px)', color: 'var(--color-ink)' }}
          >
            <Share2 size={16} />
          </button>
        </div>

        {/* Tag */}
        <div className="absolute bottom-4 left-4">
          <span
            className="px-3 py-1.5 rounded-lg text-xs font-bold"
            style={{ background: SERVICE.tagColor, color: SERVICE.tagText, fontFamily: 'var(--font-display)' }}
          >
            {SERVICE.tag}
          </span>
        </div>

        {/* Thumbnail strip */}
        <div className="absolute bottom-4 right-4 flex gap-2">
          {SERVICE.images.map((img, i) => (
            <button
              key={i}
              onClick={() => setActiveImg(i)}
              className="h-10 w-14 rounded-lg overflow-hidden transition-all"
              style={{ border: `2px solid ${activeImg === i ? 'var(--color-primary)' : 'rgba(255,255,255,0.5)'}` }}
            >
              <img src={img} alt="" className="w-full h-full object-cover" />
            </button>
          ))}
        </div>
      </div>

      {/* ── Content ── */}
      <div className="mx-auto max-w-5xl px-5 lg:px-8 pt-6">
        <div className="grid lg:grid-cols-3 gap-8">

          {/* ── Left: Details ── */}
          <div className="lg:col-span-2 space-y-6">

            {/* Title & Provider */}
            <div>
              <h1 className="text-2xl md:text-3xl font-extrabold tracking-tight mb-4"
                style={{ color: 'var(--color-ink)', fontFamily: 'var(--font-display)' }}>
                {SERVICE.title}
              </h1>

              <div className="flex items-center gap-4 flex-wrap">
                {[
                  { icon: Star,     text: `${SERVICE.provider.rating} (${SERVICE.provider.reviews} reviews)`, color: '#CA8A04' },
                  { icon: Clock,    text: SERVICE.duration, color: 'var(--color-ink-muted)' },
                  { icon: MapPin,   text: SERVICE.location, color: 'var(--color-ink-muted)' },
                  { icon: Users,    text: `${SERVICE.provider.jobs} jobs done`, color: 'var(--color-ink-muted)' },
                ].map(({ icon: Icon, text, color }) => (
                  <div key={text} className="flex items-center gap-1.5">
                    <Icon size={14} style={{ color }} strokeWidth={2} />
                    <span className="text-sm" style={{ color }}>{text}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Provider Card */}
            <div
              className="flex items-center gap-4 p-4 rounded-2xl"
              style={{ background: 'var(--color-neutral-50)', border: '1px solid var(--color-border)' }}
            >
              <div
                className="h-12 w-12 rounded-xl flex items-center justify-center text-sm font-bold text-white shrink-0"
                style={{ background: 'linear-gradient(135deg, var(--color-deep) 0%, var(--color-primary) 100%)' }}
              >
                {SERVICE.provider.avatar}
              </div>
              <div className="flex-1">
                <div className="flex items-center gap-2">
                  <p className="text-sm font-bold" style={{ color: 'var(--color-ink)', fontFamily: 'var(--font-display)' }}>
                    {SERVICE.provider.name}
                  </p>
                  {SERVICE.provider.verified && (
                    <Shield size={13} style={{ color: 'var(--color-primary)' }} />
                  )}
                </div>
                <p className="text-xs" style={{ color: 'var(--color-ink-muted)' }}>
                  Professional Service Provider
                </p>
              </div>
              <button
                className="flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-xs font-bold transition-all"
                style={{ border: '1.5px solid var(--color-border)', color: 'var(--color-ink)', fontFamily: 'var(--font-display)', background: 'var(--color-surface)' }}
              >
                <MessageCircle size={12} />
                Message
              </button>
            </div>

            {/* Description */}
            <div>
              <h2 className="text-base font-extrabold mb-3" style={{ color: 'var(--color-ink)', fontFamily: 'var(--font-display)' }}>
                About this Service
              </h2>
              <p className="text-sm leading-relaxed" style={{ color: 'var(--color-ink-muted)' }}>
                {SERVICE.description}
              </p>
            </div>

            {/* What's Included */}
            <div>
              <h2 className="text-base font-extrabold mb-3" style={{ color: 'var(--color-ink)', fontFamily: 'var(--font-display)' }}>
                What's Included
              </h2>
              <div className="space-y-2.5">
                {SERVICE.includes.map((item, i) => (
                  <div key={i} className="flex items-center gap-3">
                    <CheckCircle size={15} style={{ color: 'var(--color-primary)', shrink: 0 }} className="shrink-0" />
                    <span className="text-sm" style={{ color: 'var(--color-ink)' }}>{item}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Reviews */}
            <div>
              <h2 className="text-base font-extrabold mb-4" style={{ color: 'var(--color-ink)', fontFamily: 'var(--font-display)' }}>
                Customer Reviews
              </h2>
              <div className="space-y-4">
                {REVIEWS.map((r, idx) => (
                  <motion.div
                    key={r.id}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: idx * 0.08 }}
                    className="p-4 rounded-2xl"
                    style={{ background: 'var(--color-neutral-50)', border: '1px solid var(--color-border)' }}
                  >
                    <div className="flex items-center gap-3 mb-2">
                      <div
                        className="h-8 w-8 rounded-lg flex items-center justify-center text-xs font-bold text-white shrink-0"
                        style={{ background: 'linear-gradient(135deg, var(--color-deep) 0%, var(--color-primary) 100%)' }}
                      >
                        {r.avatar}
                      </div>
                      <div>
                        <p className="text-xs font-bold" style={{ color: 'var(--color-ink)', fontFamily: 'var(--font-display)' }}>
                          {r.name}
                        </p>
                        <p className="text-[10px]" style={{ color: 'var(--color-ink-muted)' }}>{r.date}</p>
                      </div>
                      <div className="ml-auto flex gap-0.5">
                        {Array.from({ length: r.rating }).map((_, i) => (
                          <Star key={i} size={11} className="fill-yellow-400 text-yellow-400" />
                        ))}
                      </div>
                    </div>
                    <p className="text-sm leading-relaxed" style={{ color: 'var(--color-ink)' }}>{r.comment}</p>
                  </motion.div>
                ))}
              </div>
            </div>
          </div>

          {/* ── Right: Booking Card ── */}
          <div className="lg:col-span-1">
            <div
              className="sticky top-24 rounded-2xl p-6"
              style={{
                background: 'var(--color-surface)',
                border: '1px solid var(--color-border)',
                boxShadow: 'var(--shadow-lg)',
              }}
            >
              <div className="flex items-baseline gap-1 mb-5">
                <span className="text-3xl font-extrabold" style={{ color: 'var(--color-primary)', fontFamily: 'var(--font-display)' }}>
                  ${SERVICE.price}
                </span>
                <span className="text-sm" style={{ color: 'var(--color-ink-muted)' }}>/visit</span>
              </div>

              <div className="space-y-3 mb-5">
                {[
                  { icon: Clock,   label: 'Duration', value: SERVICE.duration },
                  { icon: Shield,  label: 'Insurance', value: 'Fully covered' },
                  { icon: Zap,     label: 'Booking',  value: 'Instant confirmation' },
                  { icon: Calendar,label: 'Availability', value: 'Mon–Sun, 8am–8pm' },
                ].map(({ icon: Icon, label, value }) => (
                  <div key={label} className="flex items-center justify-between text-sm">
                    <div className="flex items-center gap-2" style={{ color: 'var(--color-ink-muted)' }}>
                      <Icon size={13} />
                      {label}
                    </div>
                    <span className="font-medium" style={{ color: 'var(--color-ink)' }}>{value}</span>
                  </div>
                ))}
              </div>

              <div className="space-y-2.5">
                <button
                  onClick={() => onNavigate('booking-checkout')}
                  className="w-full flex items-center justify-center gap-2 py-3.5 rounded-xl text-sm font-bold text-white transition-all hover:opacity-90"
                  style={{
                    background: 'linear-gradient(135deg, var(--color-deep) 0%, #005840 100%)',
                    fontFamily: 'var(--font-display)',
                    boxShadow: 'var(--shadow-md)',
                  }}
                >
                  Book This Service
                  <ArrowRight size={14} />
                </button>
                <button
                  className="w-full flex items-center justify-center gap-2 py-3 rounded-xl text-sm font-semibold transition-all"
                  style={{
                    border: '1.5px solid var(--color-border)',
                    color: 'var(--color-ink)',
                    fontFamily: 'var(--font-display)',
                    background: 'transparent',
                  }}
                >
                  <MessageCircle size={14} />
                  Message Provider
                </button>
              </div>

              <p className="text-center text-[11px] mt-4" style={{ color: 'var(--color-ink-muted)' }}>
                No charge until confirmed. Free cancellation.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
