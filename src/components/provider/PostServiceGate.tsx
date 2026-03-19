/**
 * PostServiceGate — guards the "Post Service" flow.
 * Renders a locked state with missing requirements if profile < 100%,
 * or the full post-service form when profile is complete.
 */
import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import {
  Lock, ShieldCheck, ArrowRight, ChevronLeft, Plus, X,
  DollarSign, Clock, MapPin, Image as ImageIcon, Tag,
  CheckCircle2, Sparkles,
} from 'lucide-react';
import { useProvider } from '../../context/ProviderContext';
import { Screen } from '../../types';

interface PostServiceGateProps {
  onNavigate: (s: Screen) => void;
}

// ── Locked State ─────────────────────────────────────────────────────────────
const LockedGate = ({ completionPct, onNavigate }: { completionPct: number; onNavigate: (s: Screen) => void }) => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    className="flex flex-col items-center text-center gap-6 py-12 max-w-md mx-auto"
  >
    {/* Lock icon */}
    <div className="relative">
      <div
        className="h-24 w-24 rounded-3xl flex items-center justify-center"
        style={{
          background: 'linear-gradient(135deg, var(--color-neutral-100) 0%, var(--color-neutral-200) 100%)',
          border: '2px solid var(--color-border)',
        }}
      >
        <Lock size={36} style={{ color: 'var(--color-neutral-400)' }} strokeWidth={1.5} />
      </div>
      <div
        className="absolute -bottom-2 -right-2 h-9 w-9 rounded-xl flex items-center justify-center shadow-md"
        style={{ background: '#FEF2F2', border: '1.5px solid #FECACA' }}
      >
        <span className="text-sm font-black" style={{ color: '#DC2626', fontFamily: 'var(--font-display)' }}>
          {completionPct}%
        </span>
      </div>
    </div>

    <div>
      <h2 className="text-2xl font-extrabold mb-2" style={{ color: 'var(--color-ink)', fontFamily: 'var(--font-display)' }}>
        Feature Locked
      </h2>
      <p className="text-sm leading-relaxed max-w-xs mx-auto" style={{ color: 'var(--color-ink-muted)' }}>
        Posting services requires a 100% verified profile. You're currently at{' '}
        <span className="font-bold" style={{ color: 'var(--color-primary)' }}>{completionPct}%</span>.
        Complete the remaining requirements to unlock this feature.
      </p>
    </div>

    {/* Progress bar */}
    <div className="w-full max-w-xs">
      <div className="flex justify-between text-xs font-semibold mb-1.5"
        style={{ color: 'var(--color-ink-muted)', fontFamily: 'var(--font-display)' }}>
        <span>Profile Completion</span>
        <span>{completionPct}%</span>
      </div>
      <div className="h-2 w-full rounded-full overflow-hidden" style={{ background: 'var(--color-neutral-100)' }}>
        <motion.div
          animate={{ width: `${completionPct}%` }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="h-full rounded-full"
          style={{ background: 'linear-gradient(90deg, var(--color-deep) 0%, var(--color-primary) 100%)' }}
        />
      </div>
    </div>

    <div className="flex flex-col gap-3 w-full max-w-xs">
      <motion.button
        whileTap={{ scale: 0.97 }}
        onClick={() => onNavigate('provider-verification')}
        className="w-full flex items-center justify-center gap-2 py-4 rounded-2xl text-sm font-bold text-white transition-all hover:opacity-90"
        style={{
          background: 'linear-gradient(135deg, var(--color-deep) 0%, var(--color-primary) 100%)',
          fontFamily: 'var(--font-display)',
          boxShadow: 'var(--shadow-lg)',
        }}
      >
        <ShieldCheck size={16} strokeWidth={2.5} />
        Complete Verification
        <ArrowRight size={16} strokeWidth={2.5} />
      </motion.button>

      <button
        onClick={() => onNavigate('provider-dashboard')}
        className="text-sm font-semibold transition-colors hover:underline"
        style={{ color: 'var(--color-ink-muted)', fontFamily: 'var(--font-display)' }}
      >
        Back to Dashboard
      </button>
    </div>
  </motion.div>
);

// ── Category options ──────────────────────────────────────────────────────────
const CATEGORIES = [
  'Cleaning', 'Plumbing', 'Electrical', 'Carpentry', 'Painting',
  'HVAC', 'Landscaping', 'Pest Control', 'Moving', 'Other',
];

const DURATION_OPTIONS = ['30 min', '1 hour', '2 hours', '3 hours', '4+ hours', 'Custom'];

// ── Post Service Form ─────────────────────────────────────────────────────────
const PostServiceForm = ({
  profile, onNavigate,
}: {
  profile: { skillTags: string[] };
  onNavigate: (s: Screen) => void;
}) => {
  const [submitted, setSubmitted] = useState(false);
  const [form, setForm] = useState({
    title: '',
    category: '',
    description: '',
    price: '',
    duration: '',
    location: '',
    tags: [] as string[],
  });
  const [tagInput, setTagInput] = useState('');
  const [errors, setErrors] = useState<Record<string, string>>({});

  const addTag = (t: string) => {
    const c = t.trim();
    if (!c || form.tags.includes(c) || form.tags.length >= 8) return;
    setForm(p => ({ ...p, tags: [...p.tags, c] }));
    setTagInput('');
  };

  const removeTag = (t: string) => setForm(p => ({ ...p, tags: p.tags.filter(x => x !== t) }));

  const validate = () => {
    const errs: Record<string, string> = {};
    if (!form.title.trim()) errs.title = 'Service title required';
    if (!form.category) errs.category = 'Select a category';
    if (form.description.trim().length < 40) errs.description = 'Description must be at least 40 characters';
    if (!form.price || isNaN(+form.price) || +form.price <= 0) errs.price = 'Valid price required';
    if (!form.duration) errs.duration = 'Select a duration';
    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (validate()) setSubmitted(true);
  };

  if (submitted) {
    return (
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5, ease: [0.34, 1.56, 0.64, 1] }}
        className="flex flex-col items-center text-center gap-6 py-12 max-w-sm mx-auto"
      >
        <div
          className="h-24 w-24 rounded-3xl flex items-center justify-center"
          style={{ background: 'linear-gradient(135deg, var(--color-deep) 0%, var(--color-primary) 100%)' }}
        >
          <Sparkles size={40} className="text-white" strokeWidth={1.5} />
        </div>
        <div>
          <h2 className="text-2xl font-extrabold mb-2" style={{ color: 'var(--color-ink)', fontFamily: 'var(--font-display)' }}>
            Service Posted!
          </h2>
          <p className="text-sm leading-relaxed" style={{ color: 'var(--color-ink-muted)' }}>
            <strong className="text-[var(--color-ink)]">{form.title}</strong> is now live on the platform.
            Customers can discover and book your service.
          </p>
        </div>
        <motion.button
          whileTap={{ scale: 0.97 }}
          onClick={() => onNavigate('provider-dashboard')}
          className="flex items-center gap-2 px-8 py-4 rounded-2xl text-sm font-bold text-white hover:opacity-90"
          style={{
            background: 'linear-gradient(135deg, var(--color-deep) 0%, var(--color-primary) 100%)',
            fontFamily: 'var(--font-display)',
            boxShadow: 'var(--shadow-lg)',
          }}
        >
          Go to Dashboard
          <ArrowRight size={16} strokeWidth={2.5} />
        </motion.button>
      </motion.div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-6 max-w-2xl mx-auto">

      {/* ── Service Title ── */}
      <div>
        <label className="block text-sm font-bold mb-2" style={{ color: 'var(--color-ink)', fontFamily: 'var(--font-display)' }}>
          Service Title <span style={{ color: 'var(--color-error)' }}>*</span>
        </label>
        <input
          value={form.title}
          onChange={e => setForm(p => ({ ...p, title: e.target.value }))}
          placeholder="e.g. Professional Deep Cleaning – 3 Bedroom Home"
          className="field-group__input"
          maxLength={80}
        />
        {errors.title && <p className="text-xs text-red-500 font-semibold mt-1">{errors.title}</p>}
      </div>

      {/* ── Category ── */}
      <div>
        <label className="block text-sm font-bold mb-2" style={{ color: 'var(--color-ink)', fontFamily: 'var(--font-display)' }}>
          Category <span style={{ color: 'var(--color-error)' }}>*</span>
        </label>
        <div className="flex flex-wrap gap-2">
          {CATEGORIES.map(cat => (
            <motion.button
              key={cat}
              type="button"
              whileTap={{ scale: 0.95 }}
              onClick={() => setForm(p => ({ ...p, category: cat }))}
              className="px-4 py-2 rounded-xl text-xs font-bold transition-all"
              style={{
                background: form.category === cat ? 'var(--color-primary-light)' : 'var(--color-surface)',
                border: `1.5px solid ${form.category === cat ? 'var(--color-primary)' : 'var(--color-border)'}`,
                color: form.category === cat ? 'var(--color-deep)' : 'var(--color-ink-muted)',
                fontFamily: 'var(--font-display)',
              }}
            >
              {cat}
            </motion.button>
          ))}
        </div>
        {errors.category && <p className="text-xs text-red-500 font-semibold mt-1">{errors.category}</p>}
      </div>

      {/* ── Description ── */}
      <div>
        <div className="flex items-center justify-between mb-2">
          <label className="text-sm font-bold" style={{ color: 'var(--color-ink)', fontFamily: 'var(--font-display)' }}>
            Description <span style={{ color: 'var(--color-error)' }}>*</span>
          </label>
          <span className="text-xs font-semibold" style={{ color: 'var(--color-ink-muted)', fontFamily: 'var(--font-display)' }}>
            {form.description.length}/500
          </span>
        </div>
        <textarea
          value={form.description}
          onChange={e => setForm(p => ({ ...p, description: e.target.value.slice(0, 500) }))}
          rows={5}
          placeholder="Describe exactly what's included in this service, what customers can expect, your process, and any requirements..."
          className="w-full resize-none rounded-2xl p-4 text-sm outline-none transition-all"
          style={{
            background: 'var(--color-neutral-50)',
            border: `1.5px solid ${errors.description ? 'var(--color-error)' : 'var(--color-border)'}`,
            color: 'var(--color-ink)',
            fontFamily: 'var(--font-sans)',
          }}
        />
        {errors.description && <p className="text-xs text-red-500 font-semibold mt-1">{errors.description}</p>}
      </div>

      {/* ── Price + Duration ── */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-bold mb-2" style={{ color: 'var(--color-ink)', fontFamily: 'var(--font-display)' }}>
            Price (USD) <span style={{ color: 'var(--color-error)' }}>*</span>
          </label>
          <div className="relative">
            <DollarSign size={16} className="absolute left-3 top-1/2 -translate-y-1/2" style={{ color: 'var(--color-neutral-400)' }} />
            <input
              type="number"
              value={form.price}
              onChange={e => setForm(p => ({ ...p, price: e.target.value }))}
              placeholder="0.00"
              min="1"
              step="0.01"
              className="field-group__input !pl-9"
            />
          </div>
          {errors.price && <p className="text-xs text-red-500 font-semibold mt-1">{errors.price}</p>}
        </div>

        <div>
          <label className="block text-sm font-bold mb-2" style={{ color: 'var(--color-ink)', fontFamily: 'var(--font-display)' }}>
            Duration <span style={{ color: 'var(--color-error)' }}>*</span>
          </label>
          <div className="flex flex-wrap gap-2">
            {DURATION_OPTIONS.map(opt => (
              <motion.button
                key={opt}
                type="button"
                whileTap={{ scale: 0.95 }}
                onClick={() => setForm(p => ({ ...p, duration: opt }))}
                className="px-3 py-2 rounded-xl text-xs font-bold transition-all flex items-center gap-1"
                style={{
                  background: form.duration === opt ? 'color-mix(in srgb, var(--color-deep) 8%, transparent)' : 'var(--color-surface)',
                  border: `1.5px solid ${form.duration === opt ? 'var(--color-deep)' : 'var(--color-border)'}`,
                  color: form.duration === opt ? 'var(--color-deep)' : 'var(--color-ink-muted)',
                  fontFamily: 'var(--font-display)',
                }}
              >
                <Clock size={11} strokeWidth={2.5} />
                {opt}
              </motion.button>
            ))}
          </div>
          {errors.duration && <p className="text-xs text-red-500 font-semibold mt-1">{errors.duration}</p>}
        </div>
      </div>

      {/* ── Location ── */}
      <div>
        <label className="block text-sm font-bold mb-2" style={{ color: 'var(--color-ink)', fontFamily: 'var(--font-display)' }}>
          Service Area
        </label>
        <div className="relative">
          <MapPin size={16} className="absolute left-3 top-1/2 -translate-y-1/2" style={{ color: 'var(--color-neutral-400)' }} />
          <input
            value={form.location}
            onChange={e => setForm(p => ({ ...p, location: e.target.value }))}
            placeholder="e.g. San Francisco, CA or Remote"
            className="field-group__input !pl-9"
          />
        </div>
      </div>

      {/* ── Tags ── */}
      <div>
        <label className="block text-sm font-bold mb-2" style={{ color: 'var(--color-ink)', fontFamily: 'var(--font-display)' }}>
          Service Tags
        </label>
        <div
          className="flex flex-wrap gap-2 p-3 rounded-2xl min-h-[52px] cursor-text"
          style={{ background: 'var(--color-neutral-50)', border: '1.5px solid var(--color-border)' }}
          onClick={() => document.getElementById('service-tag-input')?.focus()}
        >
          <AnimatePresence>
            {form.tags.map(t => (
              <motion.span
                key={t}
                layout
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.8, opacity: 0 }}
                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-semibold"
                style={{
                  background: 'var(--color-primary-light)',
                  color: 'var(--color-deep)',
                  border: '1px solid color-mix(in srgb, var(--color-primary) 30%, transparent)',
                  fontFamily: 'var(--font-display)',
                }}
              >
                <Tag size={9} strokeWidth={2.5} />
                {t}
                <button type="button" onClick={() => removeTag(t)} className="hover:opacity-70">
                  <X size={10} strokeWidth={3} />
                </button>
              </motion.span>
            ))}
          </AnimatePresence>
          <input
            id="service-tag-input"
            value={tagInput}
            onChange={e => setTagInput(e.target.value)}
            onKeyDown={e => {
              if (e.key === 'Enter' || e.key === ',') { e.preventDefault(); addTag(tagInput); }
            }}
            placeholder={form.tags.length === 0 ? 'Add tags…' : ''}
            className="flex-1 min-w-[120px] bg-transparent outline-none text-sm py-1"
            style={{ color: 'var(--color-ink)' }}
          />
        </div>
        {/* Skill suggestions */}
        {profile.skillTags.filter(s => !form.tags.includes(s)).slice(0, 6).length > 0 && (
          <div className="flex flex-wrap gap-1.5 mt-2">
            {profile.skillTags.filter(s => !form.tags.includes(s)).slice(0, 6).map(s => (
              <button
                key={s}
                type="button"
                onClick={() => addTag(s)}
                className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-[10px] font-semibold transition-all hover:border-[var(--color-primary)] hover:text-[var(--color-deep)]"
                style={{
                  background: 'var(--color-surface)',
                  border: '1px solid var(--color-border)',
                  color: 'var(--color-ink-muted)',
                  fontFamily: 'var(--font-display)',
                }}
              >
                <Plus size={9} strokeWidth={2.5} />
                {s}
              </button>
            ))}
          </div>
        )}
      </div>

      {/* ── Cover image placeholder ── */}
      <div>
        <label className="block text-sm font-bold mb-2" style={{ color: 'var(--color-ink)', fontFamily: 'var(--font-display)' }}>
          Cover Image <span className="text-xs font-normal" style={{ color: 'var(--color-ink-muted)' }}>(optional)</span>
        </label>
        <label className="flex flex-col items-center justify-center gap-3 py-8 rounded-2xl cursor-pointer hover:border-[var(--color-primary)] transition-all group"
          style={{ border: '2px dashed var(--color-border)', background: 'var(--color-neutral-50)' }}>
          <ImageIcon size={28} style={{ color: 'var(--color-neutral-300)' }} className="group-hover:text-[var(--color-primary)] transition-colors" strokeWidth={1.5} />
          <span className="text-sm font-semibold" style={{ fontFamily: 'var(--font-display)', color: 'var(--color-ink-muted)' }}>
            Upload a cover image
          </span>
          <span className="text-xs" style={{ color: 'var(--color-neutral-400)' }}>PNG, JPG · Recommended 16:9</span>
          <input type="file" accept="image/*" className="hidden" />
        </label>
      </div>

      {/* ── Submit ── */}
      <div className="sticky bottom-6 z-10">
        <motion.button
          type="submit"
          whileTap={{ scale: 0.97 }}
          className="w-full flex items-center justify-center gap-2 py-4 rounded-2xl text-sm font-extrabold text-white transition-all hover:opacity-90"
          style={{
            background: 'linear-gradient(135deg, var(--color-deep) 0%, var(--color-primary) 100%)',
            fontFamily: 'var(--font-display)',
            boxShadow: 'var(--shadow-xl)',
          }}
        >
          <CheckCircle2 size={18} strokeWidth={2.5} />
          Publish Service
          <ArrowRight size={16} strokeWidth={2.5} />
        </motion.button>
      </div>
    </form>
  );
};

// ══════════════════════════════════════════════════════════════════
//  EXPORT
// ══════════════════════════════════════════════════════════════════
export const PostServiceGate = ({ onNavigate }: PostServiceGateProps) => {
  const { canPostService, completionPct, profile } = useProvider();

  return (
    <div className="pb-28 pt-2 max-w-2xl mx-auto">
      {/* ── Page header ── */}
      <header className="mb-8">
        <div className="flex items-center gap-3 mb-1.5">
          <button
            onClick={() => onNavigate('provider-dashboard')}
            className="h-9 w-9 rounded-xl flex items-center justify-center transition-colors hover:bg-[var(--color-neutral-100)]"
            aria-label="Back"
          >
            <ChevronLeft size={18} style={{ color: 'var(--color-ink-muted)' }} />
          </button>
          <p className="text-xs font-semibold uppercase tracking-widest"
            style={{ color: 'var(--color-primary)', fontFamily: 'var(--font-display)' }}>
            Service Management
          </p>
        </div>
        <h1 className="text-3xl md:text-4xl font-extrabold tracking-tight pl-12"
          style={{ color: 'var(--color-ink)', fontFamily: 'var(--font-display)' }}>
          Post a Service
        </h1>
        <p className="pl-12 mt-1 text-sm" style={{ color: 'var(--color-ink-muted)' }}>
          {canPostService
            ? 'Create a new service listing for customers to discover'
            : 'Complete your profile to unlock service posting'}
        </p>
      </header>

      <AnimatePresence mode="wait">
        {canPostService ? (
          <motion.div
            key="form"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.35 }}
          >
            <PostServiceForm profile={profile} onNavigate={onNavigate} />
          </motion.div>
        ) : (
          <motion.div
            key="locked"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.35 }}
          >
            <LockedGate completionPct={completionPct} onNavigate={onNavigate} />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};
