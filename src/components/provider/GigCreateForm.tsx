import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import {
  ChevronLeft, ChevronRight, Upload, Plus, X, Tag,
  DollarSign, Clock, MapPin, CheckCircle, ImageIcon,
  List, Info, Zap,
} from 'lucide-react';
import { Screen } from '../../types';
import { useProvider } from '../../context/ProviderContext';

interface GigCreateFormProps {
  onNavigate: (s: Screen) => void;
}

type Step = 1 | 2 | 3 | 4;

const CATEGORIES = ['Cleaning', 'Repair & Maintenance', 'Beauty & Wellness', 'Moving & Delivery', 'Gardening', 'Painting', 'Plumbing', 'Electrical'];

export const GigCreateForm = ({ onNavigate }: GigCreateFormProps) => {
  const { canPostService } = useProvider();
  const [step, setStep] = useState<Step>(1);
  const [form, setForm] = useState({
    title: '',
    category: '',
    description: '',
    price: '',
    priceType: 'fixed',
    duration: '',
    location: '',
    tags: [] as string[],
    tagInput: '',
    includes: [''] as string[],
  });
  const [published, setPublished] = useState(false);

  const update = (key: string, val: any) => setForm(f => ({ ...f, [key]: val }));

  const addTag = () => {
    if (form.tagInput.trim() && form.tags.length < 8) {
      update('tags', [...form.tags, form.tagInput.trim()]);
      update('tagInput', '');
    }
  };

  const removeTag = (t: string) => update('tags', form.tags.filter(x => x !== t));

  const addInclude = () => update('includes', [...form.includes, '']);
  const updateInclude = (i: number, val: string) => {
    const arr = [...form.includes];
    arr[i] = val;
    update('includes', arr);
  };
  const removeInclude = (i: number) => update('includes', form.includes.filter((_, idx) => idx !== i));

  if (!canPostService) {
    return (
      <div className="flex items-center justify-center min-h-[50vh] px-5">
        <div className="text-center max-w-sm">
          <div className="h-16 w-16 mx-auto rounded-2xl flex items-center justify-center mb-4"
            style={{ background: 'var(--color-neutral-100)' }}>
            <Zap size={28} style={{ color: 'var(--color-neutral-400)' }} />
          </div>
          <h2 className="text-lg font-extrabold mb-2" style={{ color: 'var(--color-ink)', fontFamily: 'var(--font-display)' }}>
            Complete your profile first
          </h2>
          <p className="text-sm mb-5" style={{ color: 'var(--color-ink-muted)' }}>
            You need to complete your provider profile before posting services.
          </p>
          <button
            onClick={() => onNavigate('provider-verification-wizard')}
            className="px-6 py-3 rounded-xl text-sm font-bold text-white"
            style={{ background: 'var(--color-deep)', fontFamily: 'var(--font-display)' }}
          >
            Complete Profile
          </button>
        </div>
      </div>
    );
  }

  if (published) {
    return (
      <div className="flex items-center justify-center min-h-[50vh] px-5">
        <motion.div
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          className="text-center max-w-sm"
        >
          <div className="h-20 w-20 mx-auto rounded-full flex items-center justify-center mb-5"
            style={{ background: 'var(--color-primary-light)' }}>
            <CheckCircle size={38} style={{ color: 'var(--color-primary)' }} />
          </div>
          <h2 className="text-2xl font-extrabold mb-2" style={{ color: 'var(--color-ink)', fontFamily: 'var(--font-display)' }}>
            Service Published!
          </h2>
          <p className="text-sm mb-6" style={{ color: 'var(--color-ink-muted)' }}>
            Your service is now live and visible to customers.
          </p>
          <button
            onClick={() => onNavigate('provider-services')}
            className="px-6 py-3 rounded-xl text-sm font-bold text-white"
            style={{ background: 'var(--color-deep)', fontFamily: 'var(--font-display)' }}
          >
            View My Services
          </button>
        </motion.div>
      </div>
    );
  }

  const STEP_LABELS = ['Basics', 'Pricing', 'Details', 'Media'];

  return (
    <div className="max-w-2xl mx-auto space-y-6">

      {/* ── Header ── */}
      <div className="flex items-center gap-3">
        <button
          onClick={() => step > 1 ? setStep((step - 1) as Step) : onNavigate('provider-dashboard')}
          className="h-10 w-10 rounded-xl flex items-center justify-center"
          style={{ background: 'var(--color-neutral-100)', color: 'var(--color-ink)' }}
        >
          <ChevronLeft size={18} />
        </button>
        <div className="flex-1">
          <h1 className="text-xl font-extrabold" style={{ color: 'var(--color-ink)', fontFamily: 'var(--font-display)' }}>
            Create New Service
          </h1>
          <p className="text-xs" style={{ color: 'var(--color-ink-muted)' }}>
            Step {step} of 4 — {STEP_LABELS[step - 1]}
          </p>
        </div>
      </div>

      {/* ── Progress ── */}
      <div className="flex gap-1.5">
        {([1, 2, 3, 4] as Step[]).map(s => (
          <div
            key={s}
            className="h-1.5 rounded-full flex-1 transition-all duration-500"
            style={{
              background: s <= step
                ? 'linear-gradient(90deg, var(--color-primary) 0%, #a3d900 100%)'
                : 'var(--color-neutral-100)',
            }}
          />
        ))}
      </div>

      <AnimatePresence mode="wait">
        {/* ── STEP 1: Basics ── */}
        {step === 1 && (
          <motion.div key="s1" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }} className="space-y-4">
            <div>
              <label className="block text-xs font-bold mb-1.5" style={{ color: 'var(--color-ink)', fontFamily: 'var(--font-display)' }}>
                Service Title *
              </label>
              <input
                type="text"
                value={form.title}
                onChange={e => update('title', e.target.value)}
                placeholder="e.g. Professional Deep Home Cleaning"
                maxLength={80}
                className="w-full px-4 py-3 rounded-xl text-sm outline-none"
                style={{ background: 'var(--color-neutral-50)', border: '1.5px solid var(--color-border)', color: 'var(--color-ink)', fontFamily: 'var(--font-sans)' }}
              />
              <p className="text-[10px] mt-1 text-right" style={{ color: 'var(--color-ink-muted)' }}>{form.title.length}/80</p>
            </div>

            <div>
              <label className="block text-xs font-bold mb-1.5" style={{ color: 'var(--color-ink)', fontFamily: 'var(--font-display)' }}>
                Category *
              </label>
              <div className="grid grid-cols-2 gap-2">
                {CATEGORIES.map(c => (
                  <button
                    key={c}
                    onClick={() => update('category', c)}
                    className="px-3 py-2.5 rounded-xl text-xs font-semibold text-left transition-all"
                    style={{
                      background: form.category === c ? 'var(--color-primary-light)' : 'var(--color-neutral-50)',
                      border: `1.5px solid ${form.category === c ? 'var(--color-primary)' : 'var(--color-border)'}`,
                      color: form.category === c ? 'var(--color-deep)' : 'var(--color-ink)',
                      fontFamily: 'var(--font-display)',
                    }}
                  >
                    {c}
                  </button>
                ))}
              </div>
            </div>

            <div>
              <label className="block text-xs font-bold mb-1.5" style={{ color: 'var(--color-ink)', fontFamily: 'var(--font-display)' }}>
                Description *
              </label>
              <textarea
                value={form.description}
                onChange={e => update('description', e.target.value)}
                placeholder="Describe what you offer, what's included, your experience..."
                rows={4}
                className="w-full px-4 py-3 rounded-xl text-sm outline-none resize-none"
                style={{ background: 'var(--color-neutral-50)', border: '1.5px solid var(--color-border)', color: 'var(--color-ink)', fontFamily: 'var(--font-sans)' }}
              />
              <p className="text-[10px] mt-1" style={{ color: 'var(--color-ink-muted)' }}>
                Minimum 80 characters for best results. ({form.description.length} / 80+)
              </p>
            </div>
          </motion.div>
        )}

        {/* ── STEP 2: Pricing ── */}
        {step === 2 && (
          <motion.div key="s2" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }} className="space-y-4">
            <div>
              <label className="block text-xs font-bold mb-1.5" style={{ color: 'var(--color-ink)', fontFamily: 'var(--font-display)' }}>
                Pricing Type
              </label>
              <div className="flex gap-2">
                {['fixed', 'hourly', 'negotiable'].map(type => (
                  <button
                    key={type}
                    onClick={() => update('priceType', type)}
                    className="flex-1 py-3 rounded-xl text-xs font-bold capitalize transition-all"
                    style={{
                      background: form.priceType === type ? 'var(--color-deep)' : 'var(--color-neutral-50)',
                      border: `1.5px solid ${form.priceType === type ? 'var(--color-deep)' : 'var(--color-border)'}`,
                      color: form.priceType === type ? '#fff' : 'var(--color-ink)',
                      fontFamily: 'var(--font-display)',
                    }}
                  >
                    {type}
                  </button>
                ))}
              </div>
            </div>

            <div>
              <label className="block text-xs font-bold mb-1.5" style={{ color: 'var(--color-ink)', fontFamily: 'var(--font-display)' }}>
                Base Price (USD) *
              </label>
              <div className="relative">
                <DollarSign size={15} className="absolute left-3.5 top-1/2 -translate-y-1/2" style={{ color: 'var(--color-ink-muted)' }} />
                <input
                  type="number"
                  value={form.price}
                  onChange={e => update('price', e.target.value)}
                  placeholder="0.00"
                  className="w-full pl-10 pr-4 py-3 rounded-xl text-sm outline-none"
                  style={{ background: 'var(--color-neutral-50)', border: '1.5px solid var(--color-border)', color: 'var(--color-ink)' }}
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-bold mb-1.5" style={{ color: 'var(--color-ink)', fontFamily: 'var(--font-display)' }}>
                Estimated Duration
              </label>
              <div className="relative">
                <Clock size={15} className="absolute left-3.5 top-1/2 -translate-y-1/2" style={{ color: 'var(--color-ink-muted)' }} />
                <select
                  value={form.duration}
                  onChange={e => update('duration', e.target.value)}
                  className="w-full pl-10 pr-4 py-3 rounded-xl text-sm outline-none appearance-none"
                  style={{ background: 'var(--color-neutral-50)', border: '1.5px solid var(--color-border)', color: 'var(--color-ink)' }}
                >
                  <option value="">Select duration</option>
                  {['< 1 hour', '1–2 hours', '2–4 hours', '4–6 hours', 'Half day', 'Full day', 'Multiple days'].map(d => (
                    <option key={d} value={d}>{d}</option>
                  ))}
                </select>
              </div>
            </div>

            <div>
              <label className="block text-xs font-bold mb-1.5" style={{ color: 'var(--color-ink)', fontFamily: 'var(--font-display)' }}>
                Service Area
              </label>
              <div className="relative">
                <MapPin size={15} className="absolute left-3.5 top-1/2 -translate-y-1/2" style={{ color: 'var(--color-ink-muted)' }} />
                <input
                  type="text"
                  value={form.location}
                  onChange={e => update('location', e.target.value)}
                  placeholder="e.g. New York City, NY"
                  className="w-full pl-10 pr-4 py-3 rounded-xl text-sm outline-none"
                  style={{ background: 'var(--color-neutral-50)', border: '1.5px solid var(--color-border)', color: 'var(--color-ink)' }}
                />
              </div>
            </div>
          </motion.div>
        )}

        {/* ── STEP 3: Details ── */}
        {step === 3 && (
          <motion.div key="s3" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }} className="space-y-4">
            <div>
              <label className="block text-xs font-bold mb-1.5" style={{ color: 'var(--color-ink)', fontFamily: 'var(--font-display)' }}>
                What's Included
              </label>
              <div className="space-y-2">
                {form.includes.map((item, i) => (
                  <div key={i} className="flex gap-2">
                    <input
                      type="text"
                      value={item}
                      onChange={e => updateInclude(i, e.target.value)}
                      placeholder={`Inclusion #${i + 1}`}
                      className="flex-1 px-4 py-3 rounded-xl text-sm outline-none"
                      style={{ background: 'var(--color-neutral-50)', border: '1.5px solid var(--color-border)', color: 'var(--color-ink)' }}
                    />
                    {form.includes.length > 1 && (
                      <button onClick={() => removeInclude(i)} className="h-[46px] w-10 rounded-xl flex items-center justify-center shrink-0"
                        style={{ background: '#FEF2F2', color: '#EF4444' }}>
                        <X size={14} />
                      </button>
                    )}
                  </div>
                ))}
                <button
                  onClick={addInclude}
                  className="w-full flex items-center justify-center gap-2 py-2.5 rounded-xl text-xs font-semibold border-dashed transition-all"
                  style={{ border: '1.5px dashed var(--color-border)', color: 'var(--color-ink-muted)', fontFamily: 'var(--font-display)' }}
                >
                  <Plus size={13} /> Add inclusion
                </button>
              </div>
            </div>

            <div>
              <label className="block text-xs font-bold mb-1.5" style={{ color: 'var(--color-ink)', fontFamily: 'var(--font-display)' }}>
                Tags (up to 8) — helps customers find your service
              </label>
              <div className="flex gap-2 mb-2">
                <input
                  type="text"
                  value={form.tagInput}
                  onChange={e => update('tagInput', e.target.value)}
                  onKeyDown={e => e.key === 'Enter' && addTag()}
                  placeholder="e.g. same-day, eco-friendly..."
                  className="flex-1 px-4 py-3 rounded-xl text-sm outline-none"
                  style={{ background: 'var(--color-neutral-50)', border: '1.5px solid var(--color-border)', color: 'var(--color-ink)' }}
                />
                <button onClick={addTag} className="px-4 rounded-xl text-xs font-bold text-white"
                  style={{ background: 'var(--color-deep)', fontFamily: 'var(--font-display)' }}>
                  Add
                </button>
              </div>
              <div className="flex flex-wrap gap-2">
                {form.tags.map(t => (
                  <span key={t} className="flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-semibold"
                    style={{ background: 'var(--color-primary-light)', color: 'var(--color-deep)', fontFamily: 'var(--font-display)' }}>
                    {t}
                    <button onClick={() => removeTag(t)}><X size={10} /></button>
                  </span>
                ))}
              </div>
            </div>
          </motion.div>
        )}

        {/* ── STEP 4: Media ── */}
        {step === 4 && (
          <motion.div key="s4" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }} className="space-y-4">
            <div
              className="relative border-dashed rounded-2xl p-10 flex flex-col items-center gap-3 cursor-pointer transition-colors"
              style={{ border: '2px dashed var(--color-border)', background: 'var(--color-neutral-50)' }}
            >
              <div className="h-14 w-14 rounded-2xl flex items-center justify-center" style={{ background: 'var(--color-primary-light)' }}>
                <ImageIcon size={24} style={{ color: 'var(--color-primary)' }} />
              </div>
              <div className="text-center">
                <p className="text-sm font-bold" style={{ color: 'var(--color-ink)', fontFamily: 'var(--font-display)' }}>
                  Upload Service Photos
                </p>
                <p className="text-xs mt-1" style={{ color: 'var(--color-ink-muted)' }}>
                  Drag & drop or click to browse. JPG, PNG up to 10MB each.
                </p>
              </div>
              <button
                className="flex items-center gap-2 px-5 py-2.5 rounded-xl text-xs font-bold text-white"
                style={{ background: 'var(--color-deep)', fontFamily: 'var(--font-display)' }}
              >
                <Upload size={13} /> Browse Files
              </button>
            </div>

            {/* Review Summary */}
            <div className="p-4 rounded-2xl" style={{ background: 'var(--color-neutral-50)', border: '1px solid var(--color-border)' }}>
              <h3 className="text-sm font-extrabold mb-3" style={{ color: 'var(--color-ink)', fontFamily: 'var(--font-display)' }}>
                Service Summary
              </h3>
              {[
                { label: 'Title',    value: form.title     || '—' },
                { label: 'Category', value: form.category  || '—' },
                { label: 'Price',    value: form.price ? `$${form.price} (${form.priceType})` : '—' },
                { label: 'Duration', value: form.duration  || '—' },
                { label: 'Area',     value: form.location  || '—' },
                { label: 'Tags',     value: form.tags.join(', ') || '—' },
              ].map(({ label, value }) => (
                <div key={label} className="flex justify-between text-xs py-1.5 border-b last:border-0"
                  style={{ borderColor: 'var(--color-border)' }}>
                  <span style={{ color: 'var(--color-ink-muted)' }}>{label}</span>
                  <span className="font-medium text-right max-w-[60%] truncate" style={{ color: 'var(--color-ink)' }}>{value}</span>
                </div>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* ── CTA ── */}
      <div className="flex gap-3">
        {step < 4 ? (
          <button
            onClick={() => setStep((step + 1) as Step)}
            disabled={step === 1 && (!form.title || !form.category)}
            className="flex-1 flex items-center justify-center gap-2 py-3.5 rounded-xl text-sm font-bold text-white transition-all hover:opacity-90 disabled:opacity-40"
            style={{ background: 'linear-gradient(135deg, var(--color-deep) 0%, #005840 100%)', fontFamily: 'var(--font-display)', boxShadow: 'var(--shadow-md)' }}
          >
            Continue <ChevronRight size={15} />
          </button>
        ) : (
          <button
            onClick={() => setPublished(true)}
            className="flex-1 flex items-center justify-center gap-2 py-3.5 rounded-xl text-sm font-bold text-white transition-all hover:opacity-90"
            style={{
              background: 'linear-gradient(135deg, var(--color-primary) 0%, #a3d900 100%)',
              fontFamily: 'var(--font-display)',
              boxShadow: '0 4px 14px rgba(132,183,1,0.35)',
            }}
          >
            <Zap size={15} /> Publish Service
          </button>
        )}
      </div>
    </div>
  );
};
