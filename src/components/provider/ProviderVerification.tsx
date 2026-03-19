import React, { useState, useRef, useCallback } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import {
  Camera, FileText, Tag, Award, ShieldCheck, Check, ChevronRight, ChevronLeft,
  X, Plus, Upload, AlertCircle, CheckCircle2, ArrowRight, Sparkles,
} from 'lucide-react';
import { useProvider } from '../../context/ProviderContext';
import { Screen, CertEntry } from '../../types';

interface ProviderVerificationProps {
  onNavigate: (s: Screen) => void;
}

// ── Step metadata ────────────────────────────────────────────────────────────
const STEPS = [
  { id: 0, key: 'photo',    label: 'Profile Photo',     icon: Camera,      color: '#7C3AED', bg: '#F3EFFF', weight: 20 },
  { id: 1, key: 'bio',      label: 'Professional Bio',  icon: FileText,    color: '#2563EB', bg: '#EEF6FF', weight: 20 },
  { id: 2, key: 'skills',   label: 'Skill Tags',        icon: Tag,         color: 'var(--color-primary-hover)', bg: 'var(--color-primary-light)', weight: 20 },
  { id: 3, key: 'certs',    label: 'Certifications',    icon: Award,       color: '#EA580C', bg: '#FFF4EC', weight: 20 },
  { id: 4, key: 'identity', label: 'Identity Verification', icon: ShieldCheck, color: '#16A34A', bg: '#EEFAEF', weight: 20 },
];

// ── Pill tag ─────────────────────────────────────────────────────────────────
const SkillPill = ({ label, onRemove }: { label: string; onRemove: () => void }) => (
  <motion.span
    layout
    initial={{ opacity: 0, scale: 0.8 }}
    animate={{ opacity: 1, scale: 1 }}
    exit={{ opacity: 0, scale: 0.8 }}
    transition={{ duration: 0.18 }}
    className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-sm font-semibold"
    style={{
      background: 'var(--color-primary-light)',
      color: 'var(--color-deep)',
      border: '1px solid color-mix(in srgb, var(--color-primary) 30%, transparent)',
      fontFamily: 'var(--font-display)',
    }}
  >
    {label}
    <button
      type="button"
      onClick={onRemove}
      className="h-4 w-4 rounded-full flex items-center justify-center transition-colors hover:bg-[var(--color-primary)] hover:text-white"
      aria-label={`Remove ${label}`}
    >
      <X size={10} strokeWidth={3} />
    </button>
  </motion.span>
);

// ── Cert card ─────────────────────────────────────────────────────────────────
const CertCard = ({ cert, onRemove }: { cert: CertEntry; onRemove: () => void }) => (
  <motion.div
    layout
    initial={{ opacity: 0, y: 8 }}
    animate={{ opacity: 1, y: 0 }}
    exit={{ opacity: 0, y: -8 }}
    className="flex items-center justify-between p-4 rounded-xl"
    style={{
      background: '#FFF4EC',
      border: '1px solid #EA580C20',
    }}
  >
    <div className="flex items-center gap-3 min-w-0">
      <div className="h-9 w-9 rounded-xl flex items-center justify-center shrink-0" style={{ background: '#FFF4EC', border: '1px solid #EA580C30' }}>
        <Award size={16} style={{ color: '#EA580C' }} />
      </div>
      <div className="min-w-0">
        <p className="text-sm font-semibold truncate" style={{ color: 'var(--color-ink)', fontFamily: 'var(--font-display)' }}>
          {cert.name}
        </p>
        <p className="text-xs mt-0.5" style={{ color: 'var(--color-ink-muted)' }}>
          {cert.issuer} · {cert.year}
        </p>
      </div>
    </div>
    <button type="button" onClick={onRemove} className="ml-3 shrink-0 h-7 w-7 rounded-lg flex items-center justify-center hover:bg-red-50 transition-colors" aria-label="Remove certificate">
      <X size={14} style={{ color: '#DC2626' }} />
    </button>
  </motion.div>
);

// ── Step indicator ───────────────────────────────────────────────────────────
const StepIndicator = ({ current, total, steps, completionPct }: {
  current: number; total: number; steps: typeof STEPS; completionPct: number;
}) => (
  <div className="mb-8">
    {/* Progress bar */}
    <div className="relative h-1.5 w-full rounded-full mb-5 overflow-hidden" style={{ background: 'var(--color-neutral-100)' }}>
      <motion.div
        className="absolute inset-y-0 left-0 rounded-full"
        style={{ background: 'linear-gradient(90deg, var(--color-deep) 0%, var(--color-primary) 100%)' }}
        initial={{ width: 0 }}
        animate={{ width: `${((current) / total) * 100}%` }}
        transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
      />
    </div>

    {/* Step dots */}
    <div className="flex items-center justify-between">
      {steps.map((step, idx) => {
        const isDone = idx < current;
        const isActive = idx === current;
        return (
          <div key={step.id} className="flex flex-col items-center gap-1.5">
            <motion.div
              animate={{
                scale: isActive ? 1.1 : 1,
                background: isDone ? step.color : isActive ? step.color : 'var(--color-neutral-200)',
              }}
              transition={{ duration: 0.3 }}
              className="h-8 w-8 rounded-xl flex items-center justify-center shadow-sm"
            >
              {isDone ? (
                <Check size={14} className="text-white" strokeWidth={3} />
              ) : (
                <step.icon size={14} className={isActive ? 'text-white' : ''} style={{ color: isActive ? '#fff' : 'var(--color-neutral-400)' }} strokeWidth={2} />
              )}
            </motion.div>
            <span
              className="text-[10px] font-semibold hidden sm:block"
              style={{
                fontFamily: 'var(--font-display)',
                color: isDone || isActive ? 'var(--color-ink)' : 'var(--color-neutral-400)',
              }}
            >
              {step.label.split(' ')[0]}
            </span>
          </div>
        );
      })}
    </div>
  </div>
);

// ── STEP 0: Photo ─────────────────────────────────────────────────────────────
const StepPhoto = ({
  photoUrl, onChange,
}: {
  photoUrl: string | null;
  onChange: (url: string) => void;
}) => {
  const fileRef = useRef<HTMLInputElement>(null);

  const handleFile = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const url = URL.createObjectURL(file);
    onChange(url);
  };

  return (
    <div className="flex flex-col items-center gap-6">
      {/* Preview */}
      <motion.div
        whileHover={{ scale: 1.03 }}
        whileTap={{ scale: 0.97 }}
        onClick={() => fileRef.current?.click()}
        className="relative cursor-pointer group"
      >
        <div
          className="h-32 w-32 rounded-3xl overflow-hidden flex items-center justify-center"
          style={{
            background: photoUrl ? 'transparent' : 'var(--color-primary-light)',
            border: photoUrl ? '3px solid var(--color-primary)' : '2px dashed color-mix(in srgb, var(--color-primary) 50%, transparent)',
          }}
        >
          {photoUrl ? (
            <img src={photoUrl} alt="Preview" className="h-full w-full object-cover" />
          ) : (
            <div className="flex flex-col items-center gap-2">
              <Camera size={32} style={{ color: 'var(--color-primary)' }} strokeWidth={1.5} />
              <span className="text-xs font-semibold" style={{ color: 'var(--color-primary)', fontFamily: 'var(--font-display)' }}>Upload Photo</span>
            </div>
          )}
        </div>
        {/* hover overlay */}
        <div className="absolute inset-0 rounded-3xl bg-black/30 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
          <Camera size={28} className="text-white" />
        </div>
        {photoUrl && (
          <div className="absolute -bottom-2 -right-2 h-8 w-8 rounded-xl flex items-center justify-center shadow-md" style={{ background: 'var(--color-primary)' }}>
            <Camera size={14} className="text-white" />
          </div>
        )}
      </motion.div>

      <input ref={fileRef} type="file" accept="image/*" className="hidden" onChange={handleFile} />

      <div className="text-center">
        <p className="text-sm font-medium" style={{ color: 'var(--color-ink-muted)' }}>
          Upload a clear, professional photo. JPG, PNG or WebP under 5MB.
        </p>
        <p className="text-xs mt-1.5" style={{ color: 'var(--color-neutral-400)' }}>
          Providers with photos receive 3× more bookings.
        </p>
      </div>

      {/* Drag & Drop zone */}
      <label
        htmlFor="photo-upload"
        className="w-full flex flex-col items-center justify-center gap-3 py-8 rounded-2xl cursor-pointer transition-all hover:border-[var(--color-primary)] group"
        style={{
          border: '2px dashed var(--color-border)',
          background: 'var(--color-neutral-50)',
        }}
      >
        <Upload size={22} style={{ color: 'var(--color-neutral-400)' }} className="group-hover:text-[var(--color-primary)] transition-colors" />
        <span className="text-sm font-semibold" style={{ fontFamily: 'var(--font-display)', color: 'var(--color-ink-muted)' }}>
          Click to upload or drag & drop
        </span>
        <input id="photo-upload" type="file" accept="image/*" className="hidden" onChange={handleFile} />
      </label>
    </div>
  );
};

// ── STEP 1: Bio ───────────────────────────────────────────────────────────────
const StepBio = ({
  bio, onChange,
}: {
  bio: string;
  onChange: (v: string) => void;
}) => {
  const MIN = 80;
  const MAX = 600;
  const pct = Math.min((bio.length / MIN) * 100, 100);
  const isValid = bio.trim().length >= MIN;

  return (
    <div className="flex flex-col gap-4">
      <div className="flex items-center justify-between mb-1">
        <label className="text-sm font-semibold" style={{ color: 'var(--color-ink)', fontFamily: 'var(--font-display)' }}>
          Tell clients about yourself
        </label>
        <span
          className="text-xs font-semibold"
          style={{ color: isValid ? 'var(--color-success)' : 'var(--color-ink-muted)', fontFamily: 'var(--font-display)' }}
        >
          {bio.length}/{MAX}
        </span>
      </div>

      <div className="relative">
        <textarea
          value={bio}
          onChange={e => onChange(e.target.value.slice(0, MAX))}
          rows={6}
          placeholder="Describe your professional experience, specialties, and what makes you stand out. Include your years of experience, notable achievements, and service areas..."
          className="w-full resize-none rounded-2xl p-4 text-sm leading-relaxed outline-none transition-all"
          style={{
            background: 'var(--color-neutral-50)',
            border: `1.5px solid ${isValid ? 'var(--color-success)' : 'var(--color-border)'}`,
            color: 'var(--color-ink)',
            fontFamily: 'var(--font-sans)',
            boxShadow: isValid ? '0 0 0 3px color-mix(in srgb, var(--color-success) 10%, transparent)' : 'none',
          }}
        />
        {isValid && (
          <div className="absolute bottom-3 right-3">
            <CheckCircle2 size={18} style={{ color: 'var(--color-success)' }} />
          </div>
        )}
      </div>

      {/* Progress ring */}
      <div className="flex items-center gap-3">
        <div className="relative h-1.5 flex-1 rounded-full overflow-hidden" style={{ background: 'var(--color-neutral-100)' }}>
          <motion.div
            className="absolute inset-y-0 left-0 rounded-full"
            animate={{ width: `${pct}%` }}
            transition={{ duration: 0.4 }}
            style={{ background: isValid ? 'var(--color-success)' : 'var(--color-primary)' }}
          />
        </div>
        <span className="text-xs font-semibold shrink-0" style={{ color: 'var(--color-ink-muted)', fontFamily: 'var(--font-display)' }}>
          {isValid ? '✓ Minimum reached' : `${MIN - bio.trim().length} chars left`}
        </span>
      </div>

      {/* Tips */}
      <div className="p-4 rounded-2xl" style={{ background: '#EEF6FF', border: '1px solid #2563EB20' }}>
        <p className="text-xs font-semibold mb-2" style={{ color: '#2563EB', fontFamily: 'var(--font-display)' }}>✦ Bio Tips</p>
        {['Include years of experience', 'List your key specialties', 'Mention certifications & achievements', 'Describe your service area'].map((tip) => (
          <p key={tip} className="text-xs mt-1" style={{ color: '#2563EB', opacity: 0.8 }}>· {tip}</p>
        ))}
      </div>
    </div>
  );
};

// ── STEP 2: Skills ────────────────────────────────────────────────────────────
const SUGGESTED_SKILLS = [
  'Plumbing', 'Electrical', 'Carpentry', 'Painting', 'Deep Cleaning',
  'HVAC', 'Landscaping', 'Pest Control', 'Moving', 'Appliance Repair',
  'Roofing', 'Flooring', 'Welding', 'Masonry', 'Security Systems',
];

const StepSkills = ({
  skills, onChange,
}: {
  skills: string[];
  onChange: (tags: string[]) => void;
}) => {
  const [input, setInput] = useState('');
  const MIN = 3;

  const addTag = (tag: string) => {
    const clean = tag.trim();
    if (!clean || skills.includes(clean) || skills.length >= 12) return;
    onChange([...skills, clean]);
    setInput('');
  };

  const removeTag = (tag: string) => onChange(skills.filter(s => s !== tag));

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter' || e.key === ',') {
      e.preventDefault();
      addTag(input);
    }
    if (e.key === 'Backspace' && !input && skills.length) {
      removeTag(skills[skills.length - 1]);
    }
  };

  return (
    <div className="flex flex-col gap-5">
      {/* Input row */}
      <div className="relative">
        <div
          className="flex flex-wrap gap-2 p-3 rounded-2xl min-h-[56px] cursor-text"
          style={{
            background: 'var(--color-neutral-50)',
            border: `1.5px solid ${skills.length >= MIN ? 'var(--color-success)' : 'var(--color-border)'}`,
            boxShadow: skills.length >= MIN ? '0 0 0 3px color-mix(in srgb, var(--color-success) 10%, transparent)' : 'none',
          }}
          onClick={() => document.getElementById('skill-input')?.focus()}
        >
          <AnimatePresence>
            {skills.map(s => (
              <SkillPill key={s} label={s} onRemove={() => removeTag(s)} />
            ))}
          </AnimatePresence>
          <input
            id="skill-input"
            value={input}
            onChange={e => setInput(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder={skills.length === 0 ? 'Type a skill and press Enter…' : ''}
            className="flex-1 min-w-[140px] bg-transparent outline-none text-sm py-1"
            style={{ color: 'var(--color-ink)', fontFamily: 'var(--font-sans)' }}
          />
        </div>
        <div className="absolute right-3 top-1/2 -translate-y-1/2 flex items-center gap-1.5">
          {skills.length >= MIN && <CheckCircle2 size={16} style={{ color: 'var(--color-success)' }} />}
          <span className="text-xs font-semibold" style={{ color: 'var(--color-ink-muted)', fontFamily: 'var(--font-display)' }}>
            {skills.length}/12
          </span>
        </div>
      </div>

      <p className="text-xs" style={{ color: 'var(--color-ink-muted)' }}>
        Minimum {MIN} tags required. Press <kbd className="px-1.5 py-0.5 rounded-md bg-neutral-100 text-xs font-mono">Enter</kbd> or <kbd className="px-1.5 py-0.5 rounded-md bg-neutral-100 text-xs font-mono">,</kbd> to add.
      </p>

      {/* Suggestions */}
      <div>
        <p className="text-xs font-semibold mb-3" style={{ color: 'var(--color-ink-muted)', fontFamily: 'var(--font-display)' }}>
          Popular categories
        </p>
        <div className="flex flex-wrap gap-2">
          {SUGGESTED_SKILLS.filter(s => !skills.includes(s)).map(s => (
            <motion.button
              key={s}
              type="button"
              whileTap={{ scale: 0.95 }}
              onClick={() => addTag(s)}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-semibold transition-all hover:border-[var(--color-primary)] hover:text-[var(--color-deep)]"
              style={{
                background: 'var(--color-surface)',
                border: '1.5px solid var(--color-border)',
                color: 'var(--color-ink-muted)',
                fontFamily: 'var(--font-display)',
              }}
            >
              <Plus size={11} strokeWidth={2.5} />
              {s}
            </motion.button>
          ))}
        </div>
      </div>
    </div>
  );
};

// ── STEP 3: Certs ─────────────────────────────────────────────────────────────
const StepCerts = ({
  certs, onChange,
}: {
  certs: CertEntry[];
  onChange: (c: CertEntry[]) => void;
}) => {
  const [form, setForm] = useState({ name: '', issuer: '', year: '' });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const fileRef = useRef<HTMLInputElement>(null);
  const [pendingFile, setPendingFile] = useState<string | null>(null);

  const handleFile = (e: React.ChangeEvent<HTMLInputElement>) => {
    const f = e.target.files?.[0];
    if (f) setPendingFile(URL.createObjectURL(f));
  };

  const addCert = () => {
    const errs: Record<string, string> = {};
    if (!form.name.trim()) errs.name = 'Name required';
    if (!form.issuer.trim()) errs.issuer = 'Issuer required';
    if (!form.year.trim() || isNaN(+form.year) || +form.year < 1990 || +form.year > new Date().getFullYear())
      errs.year = 'Valid year required';
    setErrors(errs);
    if (Object.keys(errs).length) return;

    const entry: CertEntry = {
      id: Date.now().toString(),
      name: form.name.trim(),
      issuer: form.issuer.trim(),
      year: form.year,
      fileUrl: pendingFile,
    };
    onChange([...certs, entry]);
    setForm({ name: '', issuer: '', year: '' });
    setPendingFile(null);
  };

  return (
    <div className="flex flex-col gap-5">
      {/* Existing certs */}
      <AnimatePresence>
        {certs.map(c => (
          <CertCard key={c.id} cert={c} onRemove={() => onChange(certs.filter(x => x.id !== c.id))} />
        ))}
      </AnimatePresence>

      {/* Add form */}
      <div
        className="rounded-2xl p-5 flex flex-col gap-4"
        style={{ background: 'var(--color-neutral-50)', border: '1.5px dashed var(--color-border)' }}
      >
        <p className="text-sm font-bold" style={{ color: 'var(--color-ink)', fontFamily: 'var(--font-display)' }}>
          {certs.length === 0 ? 'Add your first certification' : 'Add another certification'}
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          {[
            { key: 'name', placeholder: 'Certificate Name', label: 'Name' },
            { key: 'issuer', placeholder: 'Issuing Organization', label: 'Issuer' },
          ].map(({ key, placeholder, label }) => (
            <div key={key} className="relative">
              <input
                value={form[key as keyof typeof form]}
                onChange={e => setForm(p => ({ ...p, [key]: e.target.value }))}
                placeholder={placeholder}
                className="field-group__input !mb-0"
                aria-label={label}
              />
              {errors[key] && <span className="text-[10px] text-red-500 font-bold mt-1 block">{errors[key]}</span>}
            </div>
          ))}
          <div className="relative">
            <input
              value={form.year}
              onChange={e => setForm(p => ({ ...p, year: e.target.value }))}
              placeholder="Year (e.g. 2022)"
              type="number"
              min="1990"
              max={new Date().getFullYear()}
              className="field-group__input !mb-0"
              aria-label="Year"
            />
            {errors.year && <span className="text-[10px] text-red-500 font-bold mt-1 block">{errors.year}</span>}
          </div>
          {/* File upload */}
          <button
            type="button"
            onClick={() => fileRef.current?.click()}
            className="flex items-center justify-center gap-2 rounded-xl px-4 py-3 text-sm font-semibold transition-all hover:border-[var(--color-primary)]"
            style={{
              border: `1.5px dashed ${pendingFile ? 'var(--color-success)' : 'var(--color-border)'}`,
              color: pendingFile ? 'var(--color-success)' : 'var(--color-ink-muted)',
              fontFamily: 'var(--font-display)',
              background: pendingFile ? '#EEFAEF' : 'transparent',
            }}
          >
            {pendingFile ? <CheckCircle2 size={15} /> : <Upload size={15} />}
            {pendingFile ? 'File attached' : 'Upload Certificate'}
          </button>
          <input ref={fileRef} type="file" accept=".pdf,.jpg,.png" className="hidden" onChange={handleFile} />
        </div>

        <motion.button
          type="button"
          whileTap={{ scale: 0.97 }}
          onClick={addCert}
          className="flex items-center justify-center gap-2 w-full py-3 rounded-xl text-sm font-bold transition-all hover:opacity-90"
          style={{
            background: 'var(--color-deep)',
            color: '#fff',
            fontFamily: 'var(--font-display)',
          }}
        >
          <Plus size={16} strokeWidth={2.5} />
          Add Certification
        </motion.button>
      </div>

      {certs.length === 0 && (
        <p className="text-xs text-center" style={{ color: 'var(--color-neutral-400)' }}>
          At least 1 certification required to complete this step.
        </p>
      )}
    </div>
  );
};

// ── STEP 4: Identity ──────────────────────────────────────────────────────────
const ID_TYPES = ['National ID', "Driver's License", 'International Passport', 'Residence Permit'];

const StepIdentity = ({
  idVerified, idDocumentUrl, onChange,
}: {
  idVerified: boolean;
  idDocumentUrl: string | null;
  onChange: (data: { idVerified: boolean; idDocumentUrl: string | null }) => void;
}) => {
  const fileRef = useRef<HTMLInputElement>(null);
  const [selected, setSelected] = useState('');
  const [preview, setPreview] = useState<string | null>(idDocumentUrl);

  const handleFile = (e: React.ChangeEvent<HTMLInputElement>) => {
    const f = e.target.files?.[0];
    if (!f || !selected) return;
    const url = URL.createObjectURL(f);
    setPreview(url);
    onChange({ idVerified: true, idDocumentUrl: url });
  };

  const handleRemove = () => {
    setPreview(null);
    onChange({ idVerified: false, idDocumentUrl: null });
  };

  return (
    <div className="flex flex-col gap-6">
      {/* Status banner */}
      <motion.div
        animate={{ borderColor: idVerified ? 'var(--color-success)' : '#FCA5A5' }}
        className="flex items-start gap-4 p-5 rounded-2xl"
        style={{
          background: idVerified ? '#EEFAEF' : '#FEF2F2',
          border: `1.5px solid ${idVerified ? 'var(--color-success)' : '#FCA5A5'}`,
        }}
      >
        <div
          className="h-10 w-10 rounded-xl flex items-center justify-center shrink-0"
          style={{ background: idVerified ? '#D1FAE5' : '#FEE2E2' }}
        >
          {idVerified
            ? <CheckCircle2 size={20} style={{ color: 'var(--color-success)' }} />
            : <AlertCircle size={20} style={{ color: '#DC2626' }} />}
        </div>
        <div>
          <p className="text-sm font-bold" style={{ color: idVerified ? 'var(--color-success)' : '#DC2626', fontFamily: 'var(--font-display)' }}>
            {idVerified ? 'Identity Verified' : 'Verification Required'}
          </p>
          <p className="text-xs mt-0.5" style={{ color: idVerified ? '#15803D' : '#B91C1C', opacity: 0.8 }}>
            {idVerified
              ? 'Your identity document has been submitted for review.'
              : 'Upload a valid government-issued ID to unlock all platform features.'}
          </p>
        </div>
      </motion.div>

      {/* ID Type selector */}
      <div>
        <p className="text-sm font-semibold mb-3" style={{ color: 'var(--color-ink)', fontFamily: 'var(--font-display)' }}>
          Select document type
        </p>
        <div className="grid grid-cols-2 gap-2">
          {ID_TYPES.map(type => (
            <motion.button
              key={type}
              type="button"
              whileTap={{ scale: 0.97 }}
              onClick={() => setSelected(type)}
              className="flex items-center gap-2.5 p-3 rounded-xl text-left text-sm font-semibold transition-all"
              style={{
                background: selected === type ? 'var(--color-primary-light)' : 'var(--color-neutral-50)',
                border: `1.5px solid ${selected === type ? 'var(--color-primary)' : 'var(--color-border)'}`,
                color: selected === type ? 'var(--color-deep)' : 'var(--color-ink-muted)',
                fontFamily: 'var(--font-display)',
              }}
            >
              <div
                className="h-4 w-4 rounded-full border-2 shrink-0 flex items-center justify-center"
                style={{ borderColor: selected === type ? 'var(--color-primary)' : 'var(--color-neutral-300)' }}
              >
                {selected === type && (
                  <div className="h-2 w-2 rounded-full" style={{ background: 'var(--color-primary)' }} />
                )}
              </div>
              {type}
            </motion.button>
          ))}
        </div>
      </div>

      {/* Upload area */}
      {preview ? (
        <div className="relative rounded-2xl overflow-hidden" style={{ border: '2px solid var(--color-success)' }}>
          <div className="bg-[#EEFAEF] p-4 flex items-center gap-3">
            <CheckCircle2 size={20} style={{ color: 'var(--color-success)' }} />
            <span className="text-sm font-semibold" style={{ color: 'var(--color-success)', fontFamily: 'var(--font-display)' }}>
              Document uploaded — {selected}
            </span>
          </div>
          <button
            type="button"
            onClick={handleRemove}
            className="absolute top-3 right-3 h-7 w-7 rounded-lg flex items-center justify-center hover:bg-red-50 transition-colors"
          >
            <X size={14} style={{ color: '#DC2626' }} />
          </button>
        </div>
      ) : (
        <label
          className={`flex flex-col items-center justify-center gap-4 py-10 rounded-2xl cursor-pointer transition-all ${!selected ? 'opacity-50 pointer-events-none' : 'hover:border-[var(--color-primary)]'}`}
          style={{ border: '2px dashed var(--color-border)', background: 'var(--color-neutral-50)' }}
        >
          <div
            className="h-14 w-14 rounded-2xl flex items-center justify-center"
            style={{ background: 'color-mix(in srgb, var(--color-deep) 8%, transparent)' }}
          >
            <ShieldCheck size={26} style={{ color: 'var(--color-deep)' }} strokeWidth={1.5} />
          </div>
          <div className="text-center">
            <p className="text-sm font-bold" style={{ fontFamily: 'var(--font-display)', color: 'var(--color-ink)' }}>
              {selected ? `Upload ${selected}` : 'Select a document type above first'}
            </p>
            <p className="text-xs mt-1" style={{ color: 'var(--color-neutral-400)' }}>
              JPG, PNG or PDF · Max 10MB · Both sides if applicable
            </p>
          </div>
          <input ref={fileRef} type="file" accept=".pdf,.jpg,.png" className="hidden" onChange={handleFile} />
        </label>
      )}

      {/* Trust note */}
      <div className="flex items-start gap-3 p-4 rounded-xl" style={{ background: 'var(--color-primary-light)' }}>
        <ShieldCheck size={16} style={{ color: 'var(--color-primary-hover)', marginTop: 1 }} strokeWidth={2} />
        <p className="text-xs leading-relaxed" style={{ color: 'var(--color-deep)' }}>
          Your ID is encrypted and only used for identity verification. It is never shared with clients or third parties.
        </p>
      </div>
    </div>
  );
};

// ── SUCCESS screen ─────────────────────────────────────────────────────────────
const SuccessScreen = ({ onNavigate }: { onNavigate: (s: Screen) => void }) => (
  <motion.div
    initial={{ opacity: 0, scale: 0.9 }}
    animate={{ opacity: 1, scale: 1 }}
    transition={{ duration: 0.5, ease: [0.34, 1.56, 0.64, 1] }}
    className="flex flex-col items-center text-center gap-6 py-8"
  >
    {/* Icon */}
    <div className="relative">
      <div
        className="h-24 w-24 rounded-3xl flex items-center justify-center"
        style={{ background: 'linear-gradient(135deg, var(--color-deep) 0%, var(--color-primary) 100%)' }}
      >
        <Sparkles size={40} className="text-white" strokeWidth={1.5} />
      </div>
      <motion.div
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ delay: 0.3, duration: 0.4, ease: [0.34, 1.56, 0.64, 1] }}
        className="absolute -bottom-2 -right-2 h-9 w-9 rounded-xl flex items-center justify-center shadow-lg"
        style={{ background: 'var(--color-success)' }}
      >
        <Check size={18} className="text-white" strokeWidth={3} />
      </motion.div>
    </div>

    <div>
      <h2 className="text-2xl font-extrabold mb-2" style={{ color: 'var(--color-ink)', fontFamily: 'var(--font-display)' }}>
        Profile 100% Complete!
      </h2>
      <p className="text-sm leading-relaxed max-w-xs mx-auto" style={{ color: 'var(--color-ink-muted)' }}>
        Congratulations! Your profile is fully verified. You can now post services and start accepting bookings.
      </p>
    </div>

    {/* CTA */}
    <motion.button
      whileTap={{ scale: 0.97 }}
      onClick={() => onNavigate('provider-post-service')}
      className="flex items-center gap-2 px-8 py-4 rounded-2xl text-sm font-bold text-white transition-all hover:opacity-90"
      style={{
        background: 'linear-gradient(135deg, var(--color-deep) 0%, var(--color-primary) 100%)',
        fontFamily: 'var(--font-display)',
        boxShadow: 'var(--shadow-lg)',
      }}
    >
      Post Your First Service
      <ArrowRight size={16} strokeWidth={2.5} />
    </motion.button>

    <button
      type="button"
      onClick={() => onNavigate('provider-dashboard')}
      className="text-sm font-semibold transition-colors hover:underline"
      style={{ color: 'var(--color-ink-muted)', fontFamily: 'var(--font-display)' }}
    >
      Back to Dashboard
    </button>
  </motion.div>
);

// ══════════════════════════════════════════════════════════════════
//  MAIN WIZARD
// ══════════════════════════════════════════════════════════════════
export const ProviderVerification = ({ onNavigate }: ProviderVerificationProps) => {
  const { profile, completionPct, requirements, updateProfile } = useProvider();
  const [step, setStep] = useState(0);
  const [localPhoto, setLocalPhoto] = useState(profile.photoUrl);
  const [localBio, setLocalBio] = useState(profile.bio);
  const [localSkills, setLocalSkills] = useState([...profile.skillTags]);
  const [localCerts, setLocalCerts] = useState([...profile.professionalCerts]);
  const [localId, setLocalId] = useState({ idVerified: profile.idVerified, idDocumentUrl: profile.idDocumentUrl });
  const [done, setDone] = useState(false);

  const isStepValid = useCallback(() => {
    switch (step) {
      case 0: return !!localPhoto;
      case 1: return localBio.trim().length >= 80;
      case 2: return localSkills.length >= 3;
      case 3: return localCerts.length >= 1;
      case 4: return localId.idVerified && !!localId.idDocumentUrl;
      default: return false;
    }
  }, [step, localPhoto, localBio, localSkills, localCerts, localId]);

  const handleNext = () => {
    // Persist step data to context
    switch (step) {
      case 0: updateProfile({ photoUrl: localPhoto }); break;
      case 1: updateProfile({ bio: localBio }); break;
      case 2: updateProfile({ skillTags: localSkills }); break;
      case 3: updateProfile({ professionalCerts: localCerts }); break;
      case 4:
        updateProfile({ idVerified: localId.idVerified, idDocumentUrl: localId.idDocumentUrl });
        setDone(true);
        return;
    }
    setStep(s => s + 1);
  };

  const handleBack = () => setStep(s => Math.max(s - 1, 0));

  const stepInfo = STEPS[step];

  const stepContent = () => {
    switch (step) {
      case 0: return <StepPhoto photoUrl={localPhoto} onChange={url => setLocalPhoto(url)} />;
      case 1: return <StepBio bio={localBio} onChange={v => setLocalBio(v)} />;
      case 2: return <StepSkills skills={localSkills} onChange={tags => setLocalSkills(tags)} />;
      case 3: return <StepCerts certs={localCerts} onChange={c => setLocalCerts(c)} />;
      case 4: return (
        <StepIdentity
          idVerified={localId.idVerified}
          idDocumentUrl={localId.idDocumentUrl}
          onChange={data => setLocalId(data)}
        />
      );
      default: return null;
    }
  };

  if (done) return <SuccessScreen onNavigate={onNavigate} />;

  return (
    <div className="pb-28 pt-2 max-w-2xl mx-auto">

      {/* ── Page header ── */}
      <header className="mb-8">
        <div className="flex items-center gap-3 mb-1.5">
          <button
            onClick={() => onNavigate('provider-profile')}
            className="h-9 w-9 rounded-xl flex items-center justify-center transition-colors hover:bg-[var(--color-neutral-100)]"
            aria-label="Back to profile"
          >
            <ChevronLeft size={18} style={{ color: 'var(--color-ink-muted)' }} />
          </button>
          <p className="text-xs font-semibold uppercase tracking-widest"
            style={{ color: 'var(--color-primary)', fontFamily: 'var(--font-display)' }}>
            Provider Onboarding
          </p>
        </div>
        <h1 className="text-3xl md:text-4xl font-extrabold tracking-tight pl-12"
          style={{ color: 'var(--color-ink)', fontFamily: 'var(--font-display)' }}>
          Verify Your Profile
        </h1>
        <p className="pl-12 mt-1 text-sm" style={{ color: 'var(--color-ink-muted)' }}>
          Complete all 5 steps to unlock posting services
        </p>
      </header>

      {/* ── Card ── */}
      <div
        className="rounded-3xl p-6 md:p-8"
        style={{
          background: 'var(--color-surface)',
          border: '1px solid var(--color-border)',
          boxShadow: 'var(--shadow-xl)',
        }}
      >
        {/* Step indicator */}
        <StepIndicator current={step} total={STEPS.length} steps={STEPS} completionPct={completionPct} />

        {/* Step header */}
        <div className="flex items-center gap-4 mb-6">
          <div
            className="h-12 w-12 rounded-2xl flex items-center justify-center shrink-0"
            style={{ background: stepInfo.bg }}
          >
            <stepInfo.icon size={22} style={{ color: stepInfo.color }} strokeWidth={1.8} />
          </div>
          <div>
            <h2 className="text-xl font-extrabold" style={{ color: 'var(--color-ink)', fontFamily: 'var(--font-display)' }}>
              {stepInfo.label}
            </h2>
            <p className="text-xs mt-0.5" style={{ color: 'var(--color-ink-muted)' }}>
              Step {step + 1} of {STEPS.length} · {stepInfo.weight}% of profile
            </p>
          </div>
        </div>

        {/* Step content */}
        <AnimatePresence mode="wait">
          <motion.div
            key={step}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
          >
            {stepContent()}
          </motion.div>
        </AnimatePresence>

        {/* Navigation */}
        <div className="flex items-center justify-between mt-8 pt-6" style={{ borderTop: '1px solid var(--color-border)' }}>
          <motion.button
            type="button"
            whileTap={{ scale: 0.96 }}
            onClick={handleBack}
            disabled={step === 0}
            className="flex items-center gap-2 px-5 py-3 rounded-xl text-sm font-semibold transition-all disabled:opacity-40 disabled:cursor-not-allowed"
            style={{
              border: '1.5px solid var(--color-border)',
              color: 'var(--color-ink-muted)',
              fontFamily: 'var(--font-display)',
            }}
          >
            <ChevronLeft size={16} />
            Back
          </motion.button>

          <div className="flex items-center gap-2">
            {/* Step dots */}
            {STEPS.map((_, i) => (
              <div
                key={i}
                className="h-1.5 rounded-full transition-all duration-300"
                style={{
                  width: i === step ? '20px' : '6px',
                  background: i <= step ? 'var(--color-primary)' : 'var(--color-neutral-200)',
                }}
              />
            ))}
          </div>

          <motion.button
            type="button"
            whileTap={{ scale: 0.96 }}
            onClick={handleNext}
            disabled={!isStepValid()}
            className="flex items-center gap-2 px-5 py-3 rounded-xl text-sm font-bold text-white transition-all disabled:opacity-40 disabled:cursor-not-allowed hover:opacity-90"
            style={{
              background: isStepValid()
                ? 'linear-gradient(135deg, var(--color-deep) 0%, var(--color-primary) 100%)'
                : 'var(--color-neutral-300)',
              fontFamily: 'var(--font-display)',
              boxShadow: isStepValid() ? 'var(--shadow-md)' : 'none',
            }}
          >
            {step === STEPS.length - 1 ? 'Complete' : 'Continue'}
            <ChevronRight size={16} strokeWidth={2.5} />
          </motion.button>
        </div>
      </div>

      {/* Requirements summary */}
      <div
        className="mt-6 rounded-2xl p-5"
        style={{
          background: 'var(--color-surface)',
          border: '1px solid var(--color-border)',
          boxShadow: 'var(--shadow-xs)',
        }}
      >
        <p className="text-xs font-bold uppercase tracking-widest mb-4" style={{ color: 'var(--color-ink-muted)', fontFamily: 'var(--font-display)' }}>
          All Requirements
        </p>
        <div className="flex flex-col gap-2">
          {requirements.map(req => (
            <div key={req.id} className="flex items-center justify-between gap-3 py-2" style={{ borderBottom: '1px solid var(--color-border)' }}>
              <div className="flex items-center gap-3 min-w-0">
                <div
                  className="h-5 w-5 rounded-full flex items-center justify-center shrink-0 transition-all"
                  style={{
                    background: req.isComplete ? 'var(--color-success)' : 'var(--color-neutral-100)',
                    border: `1.5px solid ${req.isComplete ? 'var(--color-success)' : 'var(--color-neutral-300)'}`,
                  }}
                >
                  {req.isComplete && <Check size={10} className="text-white" strokeWidth={3} />}
                </div>
                <span className="text-sm font-semibold truncate" style={{ color: req.isComplete ? 'var(--color-ink)' : 'var(--color-ink-muted)', fontFamily: 'var(--font-display)' }}>
                  {req.label}
                </span>
              </div>
              <span
                className="text-xs font-bold px-2 py-0.5 rounded-lg shrink-0"
                style={{
                  background: req.isComplete ? '#EEFAEF' : 'var(--color-neutral-100)',
                  color: req.isComplete ? 'var(--color-success)' : 'var(--color-neutral-400)',
                  fontFamily: 'var(--font-display)',
                }}
              >
                {req.weight}%
              </span>
            </div>
          ))}
        </div>
        {/* Total bar */}
        <div className="mt-4">
          <div className="flex items-center justify-between mb-1.5">
            <span className="text-xs font-semibold" style={{ color: 'var(--color-ink-muted)', fontFamily: 'var(--font-display)' }}>Overall Completion</span>
            <span className="text-xs font-extrabold" style={{ color: completionPct === 100 ? 'var(--color-success)' : 'var(--color-primary)', fontFamily: 'var(--font-display)' }}>
              {completionPct}%
            </span>
          </div>
          <div className="h-2 w-full rounded-full overflow-hidden" style={{ background: 'var(--color-neutral-100)' }}>
            <motion.div
              animate={{ width: `${completionPct}%` }}
              transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
              className="h-full rounded-full"
              style={{ background: 'linear-gradient(90deg, var(--color-deep) 0%, var(--color-primary) 100%)' }}
            />
          </div>
        </div>
      </div>
    </div>
  );
};
