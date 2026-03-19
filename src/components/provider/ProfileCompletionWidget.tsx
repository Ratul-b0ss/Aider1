/**
 * ProfileCompletionWidget — dashboard card showing missing requirements
 * and a gradient completion ring. Locks "Post Service" behind 100%.
 */
import React from 'react';
import { motion } from 'motion/react';
import {
  AlertCircle, Camera, FileText, Tag, Award, ShieldCheck,
  ArrowRight, CheckCircle2, Lock,
} from 'lucide-react';
import { useProvider } from '../../context/ProviderContext';
import { Screen } from '../../types';

interface ProfileCompletionWidgetProps {
  onNavigate: (s: Screen) => void;
}

const REQ_ICON_MAP: Record<string, React.ElementType> = {
  photo: Camera,
  bio: FileText,
  skills: Tag,
  certs: Award,
  identity: ShieldCheck,
};

// ── Radial progress ring (SVG) ───────────────────────────────────────────────
const RingProgress = ({ pct }: { pct: number }) => {
  const R = 44;
  const C = 2 * Math.PI * R;
  const filled = (pct / 100) * C;

  const color = pct === 100 ? '#16A34A' : pct >= 60 ? 'var(--color-primary)' : '#F59E0B';

  return (
    <svg width={110} height={110} viewBox="0 0 110 110" className="rotate-[-90deg]" aria-hidden="true">
      {/* Track */}
      <circle cx={55} cy={55} r={R} fill="none" strokeWidth={9} stroke="var(--color-neutral-100)" />
      {/* Filled */}
      <motion.circle
        cx={55} cy={55} r={R}
        fill="none"
        strokeWidth={9}
        stroke={color}
        strokeLinecap="round"
        strokeDasharray={C}
        initial={{ strokeDashoffset: C }}
        animate={{ strokeDashoffset: C - filled }}
        transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
      />
    </svg>
  );
};

// ─────────────────────────────────────────────────────────────────────────────
export const ProfileCompletionWidget = ({ onNavigate }: ProfileCompletionWidgetProps) => {
  const { completionPct, requirements, canPostService } = useProvider();
  const missing = requirements.filter(r => !r.isComplete);
  const done = requirements.filter(r => r.isComplete);
  const isComplete = completionPct === 100;

  return (
    <div
      className="rounded-2xl overflow-hidden"
      style={{
        background: 'var(--color-surface)',
        border: '1px solid var(--color-border)',
        boxShadow: 'var(--shadow-xs)',
      }}
    >
      {/* ── Top band ── */}
      <div
        className="relative px-6 pt-6 pb-5 overflow-hidden"
        style={{
          background: isComplete
            ? 'linear-gradient(135deg, #EEFAEF 0%, #D1FAE5 100%)'
            : 'linear-gradient(135deg, color-mix(in srgb, var(--color-deep) 5%, transparent) 0%, var(--color-primary-light) 100%)',
          borderBottom: '1px solid var(--color-border)',
        }}
      >
        {/* Decorative orb */}
        <div
          className="absolute -right-8 -top-8 h-32 w-32 rounded-full pointer-events-none"
          style={{ background: isComplete ? 'rgba(22,163,74,0.12)' : 'rgba(132,183,1,0.14)', filter: 'blur(20px)' }}
        />

        <div className="relative flex items-center gap-5">
          {/* Ring */}
          <div className="relative shrink-0">
            <RingProgress pct={completionPct} />
            <div className="absolute inset-0 flex flex-col items-center justify-center">
              <span
                className="text-xl font-extrabold leading-none"
                style={{
                  color: isComplete ? '#16A34A' : 'var(--color-deep)',
                  fontFamily: 'var(--font-display)',
                }}
              >
                {completionPct}%
              </span>
              <span className="text-[9px] font-bold uppercase tracking-wider mt-0.5"
                style={{ color: isComplete ? '#15803D' : 'var(--color-primary-hover)', fontFamily: 'var(--font-display)' }}>
                {isComplete ? 'Done' : 'Done'}
              </span>
            </div>
          </div>

          {/* Text */}
          <div className="flex-1 min-w-0">
            <p className="text-[10px] font-black uppercase tracking-widest mb-0.5"
              style={{ color: isComplete ? '#16A34A' : 'var(--color-primary)', fontFamily: 'var(--font-display)' }}>
              {isComplete ? 'Profile Verified' : 'Profile Incomplete'}
            </p>
            <h3 className="text-base font-extrabold leading-tight"
              style={{ color: 'var(--color-ink)', fontFamily: 'var(--font-display)' }}>
              {isComplete ? "You're ready to earn!" : `${missing.length} requirement${missing.length > 1 ? 's' : ''} missing`}
            </h3>
            <p className="text-xs mt-1 leading-relaxed" style={{ color: 'var(--color-ink-muted)' }}>
              {isComplete
                ? 'Post services, accept bookings and grow your business.'
                : 'Complete your profile to post services and receive bookings.'}
            </p>

            {/* CTA */}
            {!isComplete && (
              <motion.button
                whileTap={{ scale: 0.97 }}
                onClick={() => onNavigate('provider-verification')}
                className="mt-3 flex items-center gap-1.5 text-xs font-bold transition-colors hover:underline"
                style={{ color: 'var(--color-deep)', fontFamily: 'var(--font-display)' }}
              >
                Complete Verification
                <ArrowRight size={12} strokeWidth={2.5} />
              </motion.button>
            )}
          </div>
        </div>
      </div>

      {/* ── Missing requirements ── */}
      {missing.length > 0 && (
        <div className="px-6 pt-4 pb-2">
          <p className="text-[10px] font-black uppercase tracking-widest mb-3 flex items-center gap-1.5"
            style={{ color: '#DC2626', fontFamily: 'var(--font-display)' }}>
            <AlertCircle size={11} strokeWidth={2.5} />
            Missing Requirements
          </p>
          <div className="flex flex-col gap-2">
            {missing.map(req => {
              const Icon = REQ_ICON_MAP[req.id] ?? AlertCircle;
              return (
                <motion.button
                  key={req.id}
                  whileTap={{ scale: 0.98 }}
                  onClick={() => onNavigate('provider-verification')}
                  className="group flex items-center justify-between gap-3 p-3 rounded-xl transition-all hover:bg-[#FEF2F2]"
                  style={{ border: '1px solid #FECACA', background: '#FFF8F8' }}
                >
                  <div className="flex items-center gap-3 min-w-0">
                    <div className="h-7 w-7 rounded-lg flex items-center justify-center shrink-0" style={{ background: '#FEE2E2' }}>
                      <Icon size={13} style={{ color: '#DC2626' }} strokeWidth={2} />
                    </div>
                    <div className="text-left min-w-0">
                      <p className="text-xs font-bold truncate" style={{ color: 'var(--color-ink)', fontFamily: 'var(--font-display)' }}>
                        {req.label}
                      </p>
                      <p className="text-[10px] mt-0.5 truncate" style={{ color: '#B91C1C', opacity: 0.8 }}>
                        {req.description}
                      </p>
                    </div>
                  </div>
                  <ArrowRight size={13} style={{ color: '#DC2626' }} className="shrink-0 transition-transform group-hover:translate-x-0.5" />
                </motion.button>
              );
            })}
          </div>
        </div>
      )}

      {/* ── Completed items ── */}
      {done.length > 0 && (
        <div className="px-6 pt-3 pb-4">
          {missing.length > 0 && (
            <p className="text-[10px] font-black uppercase tracking-widest mb-3 flex items-center gap-1.5"
              style={{ color: 'var(--color-success)', fontFamily: 'var(--font-display)' }}>
              <CheckCircle2 size={11} strokeWidth={2.5} />
              Completed
            </p>
          )}
          <div className="flex flex-wrap gap-2">
            {done.map(req => {
              const Icon = REQ_ICON_MAP[req.id] ?? CheckCircle2;
              return (
                <span
                  key={req.id}
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-[11px] font-semibold"
                  style={{
                    background: '#EEFAEF',
                    color: '#16A34A',
                    border: '1px solid #BBF7D0',
                    fontFamily: 'var(--font-display)',
                  }}
                >
                  <CheckCircle2 size={11} strokeWidth={2.5} />
                  {req.label}
                </span>
              );
            })}
          </div>
        </div>
      )}

      {/* ── Post Service gate ── */}
      <div
        className="mx-6 mb-6 rounded-2xl overflow-hidden"
        style={{ border: `1.5px solid ${canPostService ? 'var(--color-primary)' : 'var(--color-border)'}` }}
      >
        <motion.button
          whileTap={canPostService ? { scale: 0.97 } : {}}
          onClick={() => canPostService ? onNavigate('provider-post-service') : onNavigate('provider-verification')}
          className="w-full flex items-center justify-between gap-3 px-5 py-4 transition-all"
          style={{
            background: canPostService
              ? 'linear-gradient(135deg, var(--color-deep) 0%, var(--color-primary) 100%)'
              : 'var(--color-neutral-50)',
            cursor: canPostService ? 'pointer' : 'not-allowed',
          }}
          aria-disabled={!canPostService}
          title={canPostService ? 'Post a new service' : 'Complete your profile first'}
        >
          <div className="flex items-center gap-3">
            <div
              className="h-9 w-9 rounded-xl flex items-center justify-center shrink-0"
              style={{ background: canPostService ? 'rgba(255,255,255,0.15)' : 'var(--color-neutral-100)' }}
            >
              {canPostService
                ? <ArrowRight size={17} className="text-white" strokeWidth={2.5} />
                : <Lock size={17} style={{ color: 'var(--color-neutral-400)' }} strokeWidth={2} />}
            </div>
            <div className="text-left">
              <p
                className="text-sm font-extrabold"
                style={{
                  color: canPostService ? '#fff' : 'var(--color-ink-muted)',
                  fontFamily: 'var(--font-display)',
                }}
              >
                Post a Service
              </p>
              <p
                className="text-xs mt-0.5"
                style={{
                  color: canPostService ? 'rgba(255,255,255,0.65)' : 'var(--color-neutral-400)',
                }}
              >
                {canPostService ? 'Create your first service listing' : `Requires 100% profile completion`}
              </p>
            </div>
          </div>
          {!canPostService && (
            <span
              className="text-[10px] font-black px-2.5 py-1 rounded-full uppercase tracking-wider shrink-0"
              style={{ background: '#FEF2F2', color: '#DC2626', border: '1px solid #FECACA', fontFamily: 'var(--font-display)' }}
            >
              Locked
            </span>
          )}
        </motion.button>
      </div>
    </div>
  );
};
