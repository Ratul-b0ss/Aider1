/**
 * ProviderLayout — wraps all provider-facing pages.
 * Uses a deep-forest / lime-accent layered gradient with a
 * distinct provider role badge strip and a subtle grid overlay.
 */
import React from 'react';
import { motion } from 'motion/react';
import { Zap } from 'lucide-react';
import { Screen } from '../../types';
import { useProvider } from '../../context/ProviderContext';

interface ProviderLayoutProps {
  children: React.ReactNode;
  screen: Screen;
  onNavigate: (s: Screen) => void;
}

export const ProviderLayout = ({ children, screen, onNavigate }: ProviderLayoutProps) => {
  const { completionPct, canPostService } = useProvider();
  const isFullBleed = false;

  return (
    <div
      className="relative min-h-screen w-full overflow-x-hidden"
      style={{ background: 'var(--color-background)' }}
    >
      {/* ── Layered Provider Gradient Mesh ── */}
      <div className="pointer-events-none fixed inset-0 z-0 overflow-hidden" aria-hidden="true">
        {/* deep-forest top orb */}
        <div
          className="absolute -left-24 -top-24 h-[520px] w-[520px] rounded-full opacity-[0.08]"
          style={{
            background: 'radial-gradient(circle, var(--color-deep) 0%, transparent 70%)',
            filter: 'blur(70px)',
          }}
        />
        {/* lime accent bottom */}
        <div
          className="absolute -bottom-32 right-0 h-[420px] w-[560px] rounded-full opacity-[0.07]"
          style={{
            background: 'radial-gradient(circle, var(--color-primary) 0%, transparent 70%)',
            filter: 'blur(90px)',
          }}
        />
        {/* diagonal shimmer */}
        <div
          className="absolute top-0 right-0 h-full w-1/3 opacity-[0.03]"
          style={{
            background: 'linear-gradient(180deg, var(--color-primary) 0%, transparent 100%)',
            filter: 'blur(60px)',
          }}
        />
        {/* Subtle dot-grid texture */}
        <div
          className="absolute inset-0 opacity-[0.025]"
          style={{
            backgroundImage: `radial-gradient(circle, var(--color-deep) 1px, transparent 1px)`,
            backgroundSize: '28px 28px',
          }}
        />
      </div>

      {/* ── Provider Role & Completion Strip ── */}
      <div
        className="relative z-10 w-full flex items-center justify-between px-5 md:px-8 py-1.5"
        role="status"
        aria-label="Logged in as Provider"
      >
        {/* Role badge */}
        <span
          className="inline-flex items-center gap-1.5 text-[10px] font-black uppercase tracking-widest px-3 py-1 rounded-full"
          style={{
            background: 'color-mix(in srgb, var(--color-deep) 8%, transparent)',
            color: 'var(--color-deep)',
            fontFamily: 'var(--font-display)',
            border: '1px solid color-mix(in srgb, var(--color-deep) 16%, transparent)',
          }}
        >
          <span
            className="h-1.5 w-1.5 rounded-full"
            style={{ background: 'var(--color-deep)' }}
          />
          Service Provider
        </span>

        {/* Completion pill */}
        {completionPct < 100 && (
          <button
            onClick={() => onNavigate('provider-verification')}
            className="inline-flex items-center gap-2 text-[10px] font-black uppercase tracking-widest px-3 py-1 rounded-full transition-all hover:opacity-80 active:scale-95"
            style={{
              background: completionPct >= 60 ? 'color-mix(in srgb, var(--color-primary) 12%, transparent)' : '#FEF2F2',
              color: completionPct >= 60 ? 'var(--color-primary-hover)' : '#DC2626',
              fontFamily: 'var(--font-display)',
              border: `1px solid ${completionPct >= 60 ? 'color-mix(in srgb, var(--color-primary) 25%, transparent)' : '#FECACA'}`,
            }}
            aria-label={`Profile ${completionPct}% complete — click to finish verification`}
          >
            <Zap size={9} strokeWidth={3} />
            {completionPct}% Complete
          </button>
        )}
      </div>

      {/* ── Page Content ── */}
      <motion.div
        className="relative z-10 px-fluid-md py-fluid-lg"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
      >
        <div className="max-w-7xl mx-auto">
          {children}
        </div>
      </motion.div>
    </div>
  );
};
