import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import {
  ChevronLeft, ChevronRight, Upload, CheckCircle, User, FileText,
  Award, Camera, X, Plus, Shield, Zap, AlertCircle,
} from 'lucide-react';
import { Screen } from '../../types';
import { useProvider } from '../../context/ProviderContext';

interface VerificationWizardProps {
  onNavigate: (s: Screen) => void;
}

type Step = 1 | 2 | 3 | 4 | 5;

const STEPS = [
  { num: 1, label: 'Profile Photo', icon: Camera },
  { num: 2, label: 'Professional Bio', icon: User },
  { num: 3, label: 'Skill Tags', icon: Zap },
  { num: 4, label: 'Certifications', icon: Award },
  { num: 5, label: 'ID Verification', icon: Shield },
];

const SUGGESTED_SKILLS = [
  'Cleaning', 'Plumbing', 'Electrical', 'Carpentry', 'Painting',
  'Gardening', 'HVAC', 'Tiling', 'Welding', 'Moving',
  'Event Setup', 'Deep Clean', 'Pest Control', 'Solar Panels',
];

export const VerificationWizard = ({ onNavigate }: VerificationWizardProps) => {
  const { profile, requirements, completionPct, canPostService, updateProfile } = useProvider();

  const [step, setStep] = useState<Step>(1);
  const [bio, setBio] = useState(profile.bio);
  const [selectedSkills, setSelectedSkills] = useState<string[]>(profile.skillTags);
  const [customSkill, setCustomSkill] = useState('');
  const [certName, setCertName] = useState('');
  const [certIssuer, setCertIssuer] = useState('');
  const [certYear, setCertYear] = useState('');
  const [idUploaded, setIdUploaded] = useState(profile.idVerified);
  const [photoUploaded, setPhotoUploaded] = useState(!!profile.photoUrl);

  const toggleSkill = (s: string) => {
    setSelectedSkills(prev =>
      prev.includes(s) ? prev.filter(x => x !== s) : [...prev, s]
    );
  };

  const addCert = () => {
    if (certName && certIssuer && certYear) {
      updateProfile({
        professionalCerts: [
          ...profile.professionalCerts,
          { id: Date.now().toString(), name: certName, issuer: certIssuer, year: certYear, fileUrl: null },
        ],
      });
      setCertName(''); setCertIssuer(''); setCertYear('');
    }
  };

  const saveStep = () => {
    if (step === 1 && photoUploaded) {
      updateProfile({ photoUrl: '/placeholder-photo.jpg' });
    }
    if (step === 2) {
      updateProfile({ bio });
    }
    if (step === 3) {
      updateProfile({ skillTags: selectedSkills });
    }
    if (step === 5 && idUploaded) {
      updateProfile({ idVerified: true, idDocumentUrl: '/placeholder-id.jpg' });
    }
  };

  const handleNext = () => {
    saveStep();
    if (step < 5) setStep((step + 1) as Step);
    else onNavigate('provider-dashboard');
  };

  const req = requirements.find(r =>
    (step === 1 && r.id === 'photo') ||
    (step === 2 && r.id === 'bio') ||
    (step === 3 && r.id === 'skills') ||
    (step === 4 && r.id === 'certs') ||
    (step === 5 && r.id === 'identity')
  );

  return (
    <div className="max-w-xl mx-auto space-y-5">

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
            Profile Setup
          </h1>
          <p className="text-xs" style={{ color: 'var(--color-ink-muted)' }}>
            Step {step} of 5 — {STEPS[step - 1].label}
          </p>
        </div>
        <div className="text-right">
          <p className="text-xl font-extrabold" style={{ color: 'var(--color-primary)', fontFamily: 'var(--font-display)' }}>
            {completionPct}%
          </p>
          <p className="text-[10px]" style={{ color: 'var(--color-ink-muted)' }}>complete</p>
        </div>
      </div>

      {/* ── Master Progress Bar ── */}
      <div className="h-2.5 rounded-full overflow-hidden" style={{ background: 'var(--color-neutral-100)' }}>
        <motion.div
          className="h-full rounded-full"
          style={{ background: 'linear-gradient(90deg, var(--color-primary) 0%, #D1F843 100%)' }}
          animate={{ width: `${completionPct}%` }}
          transition={{ duration: 0.8, ease: 'easeOut' }}
        />
      </div>

      {/* ── Step Pills ── */}
      <div className="flex gap-1.5 overflow-x-auto no-scrollbar">
        {STEPS.map(({ num, label, icon: Icon }) => {
          const stepReq = requirements.find(r =>
            (num === 1 && r.id === 'photo') || (num === 2 && r.id === 'bio') ||
            (num === 3 && r.id === 'skills') || (num === 4 && r.id === 'certs') ||
            (num === 5 && r.id === 'identity')
          );
          const isDone = stepReq?.isComplete;
          return (
            <button
              key={num}
              onClick={() => setStep(num as Step)}
              className="shrink-0 flex items-center gap-1.5 px-3 py-2 rounded-xl text-[10px] font-bold transition-all"
              style={{
                background: step === num ? 'var(--color-deep)' : isDone ? 'var(--color-primary-light)' : 'var(--color-neutral-100)',
                color: step === num ? '#fff' : isDone ? 'var(--color-deep)' : 'var(--color-ink-muted)',
                fontFamily: 'var(--font-display)',
              }}
            >
              {isDone ? <CheckCircle size={10} /> : <Icon size={10} />}
              {label}
            </button>
          );
        })}
      </div>

      {/* ── Step Content ── */}
      <AnimatePresence mode="wait">
        {/* ── STEP 1: Profile Photo ── */}
        {step === 1 && (
          <motion.div key="s1" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }} className="space-y-4">
            <div
              className="rounded-2xl p-6 text-center"
              style={{ background: 'var(--color-neutral-50)', border: '1px solid var(--color-border)' }}
            >
              <div className="h-24 w-24 mx-auto rounded-2xl flex items-center justify-center mb-4 relative overflow-hidden"
                style={{ background: photoUploaded ? 'var(--color-primary-light)' : 'var(--color-neutral-100)' }}>
                {photoUploaded
                  ? <CheckCircle size={36} style={{ color: 'var(--color-primary)' }} />
                  : <Camera size={36} style={{ color: 'var(--color-neutral-400)' }} />
                }
              </div>
              <p className="text-sm font-bold mb-1" style={{ color: 'var(--color-ink)', fontFamily: 'var(--font-display)' }}>
                {photoUploaded ? 'Photo Uploaded ✓' : 'Upload Profile Photo'}
              </p>
              <p className="text-xs mb-4" style={{ color: 'var(--color-ink-muted)' }}>
                A professional headshot builds trust with customers.
              </p>
              <button
                onClick={() => setPhotoUploaded(true)}
                className="flex items-center gap-2 mx-auto px-5 py-2.5 rounded-xl text-xs font-bold text-white transition-all hover:opacity-90"
                style={{ background: photoUploaded ? 'var(--color-primary)' : 'var(--color-deep)', fontFamily: 'var(--font-display)' }}
              >
                <Upload size={13} />
                {photoUploaded ? 'Change Photo' : 'Upload Photo'}
              </button>
            </div>
          </motion.div>
        )}

        {/* ── STEP 2: Bio ── */}
        {step === 2 && (
          <motion.div key="s2" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }} className="space-y-4">
            <div>
              <label className="block text-xs font-bold mb-1.5" style={{ color: 'var(--color-ink)', fontFamily: 'var(--font-display)' }}>
                Professional Bio *
              </label>
              <textarea
                value={bio}
                onChange={e => setBio(e.target.value)}
                placeholder="Tell customers about your experience, what makes you great, specialties, years in the industry..."
                rows={5}
                className="w-full px-4 py-3 rounded-xl text-sm outline-none resize-none"
                style={{
                  background: 'var(--color-neutral-50)',
                  border: `1.5px solid ${bio.length >= 80 ? 'var(--color-primary)' : 'var(--color-border)'}`,
                  color: 'var(--color-ink)',
                  fontFamily: 'var(--font-sans)',
                }}
              />
              <div className="flex justify-between items-center mt-1.5">
                <p className="text-[10px]" style={{ color: bio.length >= 80 ? 'var(--color-primary)' : 'var(--color-ink-muted)' }}>
                  {bio.length >= 80 ? '✓ Minimum met!' : `${80 - bio.length} more characters needed`}
                </p>
                <p className="text-[10px]" style={{ color: 'var(--color-ink-muted)' }}>{bio.length}/500</p>
              </div>
            </div>
          </motion.div>
        )}

        {/* ── STEP 3: Skills ── */}
        {step === 3 && (
          <motion.div key="s3" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }} className="space-y-4">
            <div>
              <div className="flex items-center justify-between mb-3">
                <label className="text-xs font-bold" style={{ color: 'var(--color-ink)', fontFamily: 'var(--font-display)' }}>
                  Select Skills (min. 3)
                </label>
                <span className="text-xs font-semibold" style={{ color: selectedSkills.length >= 3 ? 'var(--color-primary)' : 'var(--color-ink-muted)' }}>
                  {selectedSkills.length} selected
                </span>
              </div>
              <div className="flex flex-wrap gap-2 mb-4">
                {SUGGESTED_SKILLS.map(s => (
                  <button
                    key={s}
                    onClick={() => toggleSkill(s)}
                    className="px-3 py-1.5 rounded-full text-xs font-semibold transition-all"
                    style={{
                      background: selectedSkills.includes(s) ? 'var(--color-primary)' : 'var(--color-neutral-100)',
                      color: selectedSkills.includes(s) ? '#fff' : 'var(--color-ink)',
                      fontFamily: 'var(--font-display)',
                    }}
                  >
                    {s}
                  </button>
                ))}
              </div>

              <div className="flex gap-2">
                <input
                  type="text"
                  value={customSkill}
                  onChange={e => setCustomSkill(e.target.value)}
                  onKeyDown={e => { if (e.key === 'Enter' && customSkill) { toggleSkill(customSkill); setCustomSkill(''); } }}
                  placeholder="Add custom skill..."
                  className="flex-1 px-4 py-2.5 rounded-xl text-sm outline-none"
                  style={{ background: 'var(--color-neutral-50)', border: '1.5px solid var(--color-border)', color: 'var(--color-ink)' }}
                />
                <button
                  onClick={() => { if (customSkill) { toggleSkill(customSkill); setCustomSkill(''); } }}
                  className="px-4 rounded-xl text-xs font-bold text-white"
                  style={{ background: 'var(--color-deep)', fontFamily: 'var(--font-display)' }}
                >
                  Add
                </button>
              </div>
            </div>
          </motion.div>
        )}

        {/* ── STEP 4: Certifications ── */}
        {step === 4 && (
          <motion.div key="s4" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }} className="space-y-4">
            <div>
              <label className="block text-xs font-bold mb-3" style={{ color: 'var(--color-ink)', fontFamily: 'var(--font-display)' }}>
                Professional Certifications (min. 1)
              </label>

              {/* Existing certs */}
              {profile.professionalCerts.map(cert => (
                <div
                  key={cert.id}
                  className="flex items-center gap-3 p-3 rounded-xl mb-2"
                  style={{ background: 'var(--color-primary-light)', border: '1px solid color-mix(in srgb, var(--color-primary) 20%, transparent)' }}
                >
                  <CheckCircle size={15} style={{ color: 'var(--color-primary)' }} className="shrink-0" />
                  <div className="flex-1">
                    <p className="text-xs font-bold" style={{ color: 'var(--color-deep)', fontFamily: 'var(--font-display)' }}>{cert.name}</p>
                    <p className="text-[10px]" style={{ color: 'var(--color-ink-muted)' }}>{cert.issuer} · {cert.year}</p>
                  </div>
                </div>
              ))}

              {/* Add cert form */}
              <div className="space-y-2.5 p-4 rounded-2xl" style={{ background: 'var(--color-neutral-50)', border: '1px solid var(--color-border)' }}>
                <p className="text-xs font-bold" style={{ color: 'var(--color-ink)', fontFamily: 'var(--font-display)' }}>Add Certification</p>
                <input type="text" value={certName} onChange={e => setCertName(e.target.value)} placeholder="Certification Name *"
                  className="w-full px-4 py-2.5 rounded-xl text-sm outline-none"
                  style={{ background: 'var(--color-surface)', border: '1.5px solid var(--color-border)', color: 'var(--color-ink)' }} />
                <div className="grid grid-cols-2 gap-2">
                  <input type="text" value={certIssuer} onChange={e => setCertIssuer(e.target.value)} placeholder="Issuing Organization"
                    className="w-full px-4 py-2.5 rounded-xl text-sm outline-none"
                    style={{ background: 'var(--color-surface)', border: '1.5px solid var(--color-border)', color: 'var(--color-ink)' }} />
                  <input type="text" value={certYear} onChange={e => setCertYear(e.target.value)} placeholder="Year (2024)"
                    className="w-full px-4 py-2.5 rounded-xl text-sm outline-none"
                    style={{ background: 'var(--color-surface)', border: '1.5px solid var(--color-border)', color: 'var(--color-ink)' }} />
                </div>
                <button
                  onClick={addCert}
                  disabled={!certName || !certIssuer || !certYear}
                  className="w-full flex items-center justify-center gap-2 py-2.5 rounded-xl text-xs font-bold text-white disabled:opacity-40"
                  style={{ background: 'var(--color-deep)', fontFamily: 'var(--font-display)' }}
                >
                  <Plus size={13} /> Add Certification
                </button>
              </div>

              <div
                className="flex items-center gap-3 p-3 rounded-xl border-dashed cursor-pointer"
                style={{ border: '2px dashed var(--color-border)', background: 'var(--color-neutral-50)' }}
              >
                <Upload size={16} style={{ color: 'var(--color-ink-muted)' }} />
                <p className="text-xs" style={{ color: 'var(--color-ink-muted)' }}>
                  Upload certificate documents (PDF, JPG)
                </p>
              </div>
            </div>
          </motion.div>
        )}

        {/* ── STEP 5: ID Verification ── */}
        {step === 5 && (
          <motion.div key="s5" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }} className="space-y-4">
            <div
              className="p-4 rounded-2xl"
              style={{ background: '#EEF6FF', border: '1px solid rgba(37,99,235,0.15)' }}
            >
              <div className="flex items-center gap-2 mb-2">
                <AlertCircle size={14} style={{ color: '#2563EB' }} />
                <p className="text-xs font-bold" style={{ color: '#2563EB', fontFamily: 'var(--font-display)' }}>
                  Why is ID verification required?
                </p>
              </div>
              <p className="text-xs leading-relaxed" style={{ color: '#4B5563' }}>
                To ensure the safety of our customers, all service providers must verify their identity with a government-issued ID. Your data is encrypted and never shared with third parties.
              </p>
            </div>

            <div
              className="rounded-2xl p-8 text-center cursor-pointer transition-all"
              style={{
                border: `2px dashed ${idUploaded ? 'var(--color-primary)' : 'var(--color-border)'}`,
                background: idUploaded ? 'var(--color-primary-light)' : 'var(--color-neutral-50)',
              }}
              onClick={() => setIdUploaded(true)}
            >
              <div className="h-16 w-16 mx-auto rounded-2xl flex items-center justify-center mb-3"
                style={{ background: idUploaded ? 'var(--color-primary)' : 'var(--color-neutral-100)' }}>
                {idUploaded
                  ? <CheckCircle size={28} className="text-white" />
                  : <FileText size={28} style={{ color: 'var(--color-neutral-400)' }} />
                }
              </div>
              <p className="text-sm font-bold mb-1" style={{ color: 'var(--color-ink)', fontFamily: 'var(--font-display)' }}>
                {idUploaded ? 'ID Uploaded Successfully ✓' : 'Upload Government ID'}
              </p>
              <p className="text-xs mb-4" style={{ color: 'var(--color-ink-muted)' }}>
                {idUploaded ? 'Your identity verification is pending review.' : 'Passport, Driver\'s License, or National ID'}
              </p>
              {!idUploaded && (
                <button
                  className="flex items-center gap-2 mx-auto px-5 py-2.5 rounded-xl text-xs font-bold text-white"
                  style={{ background: 'var(--color-deep)', fontFamily: 'var(--font-display)' }}
                >
                  <Upload size={13} /> Upload ID Document
                </button>
              )}
            </div>

            {idUploaded && completionPct === 100 && (
              <div
                className="p-4 rounded-2xl flex items-center gap-3"
                style={{ background: 'var(--color-primary-light)', border: '1px solid color-mix(in srgb, var(--color-primary) 20%, transparent)' }}
              >
                <CheckCircle size={20} style={{ color: 'var(--color-primary)' }} className="shrink-0" />
                <div>
                  <p className="text-sm font-bold" style={{ color: 'var(--color-deep)', fontFamily: 'var(--font-display)' }}>
                    Profile Complete! 🎉
                  </p>
                  <p className="text-xs" style={{ color: 'var(--color-ink-muted)' }}>
                    You can now post services and start earning.
                  </p>
                </div>
              </div>
            )}
          </motion.div>
        )}
      </AnimatePresence>

      {/* ── Navigation ── */}
      <div className="flex gap-3">
        <button
          onClick={handleNext}
          className="flex-1 flex items-center justify-center gap-2 py-3.5 rounded-xl text-sm font-bold text-white transition-all hover:opacity-90"
          style={{
            background: step === 5
              ? 'linear-gradient(135deg, var(--color-primary) 0%, #D1F843 100%)'
              : 'linear-gradient(135deg, var(--color-deep) 0%, #005840 100%)',
            fontFamily: 'var(--font-display)',
            boxShadow: 'var(--shadow-md)',
          }}
        >
          {step < 5 ? (
            <>Continue <ChevronRight size={15} /></>
          ) : (
            <>
              <CheckCircle size={15} />
              {canPostService ? 'Go to Dashboard' : 'Save & Continue Later'}
            </>
          )}
        </button>
      </div>
    </div>
  );
};
