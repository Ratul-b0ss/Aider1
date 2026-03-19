/**
 * CustomerLayout — wraps all customer-facing pages.
 * Injects a subtle lime/green layered gradient mesh background
 * and a thin role badge strip at the top.
 */
import React from 'react';
import { motion } from 'motion/react';
import { Screen } from '../../types';

interface CustomerLayoutProps {
  children: React.ReactNode;
  screen: Screen;
}

export const CustomerLayout = ({ children, screen }: CustomerLayoutProps) => {
  const isFullBleed = screen === 'home';

  return (
    <div className="relative min-h-screen w-full overflow-x-hidden" style={{ background: 'var(--color-background)' }}>
      {/* ── Layered Gradient Mesh ── */}
      <div className="pointer-events-none fixed inset-0 z-0 overflow-hidden" aria-hidden="true">
        {/* top-left orb */}
        <div
          className="absolute -left-32 -top-32 h-[480px] w-[480px] rounded-full opacity-[0.07]"
          style={{
            background: 'radial-gradient(circle, var(--color-primary) 0%, transparent 70%)',
            filter: 'blur(60px)',
          }}
        />
        {/* bottom-right orb */}
        <div
          className="absolute -bottom-24 -right-24 h-[400px] w-[400px] rounded-full opacity-[0.06]"
          style={{
            background: 'radial-gradient(circle, var(--color-deep) 0%, transparent 70%)',
            filter: 'blur(80px)',
          }}
        />
        {/* mid shimmer */}
        <div
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 h-[600px] w-[900px] opacity-[0.03]"
          style={{
            background: 'linear-gradient(135deg, var(--color-primary) 0%, var(--color-deep) 100%)',
            filter: 'blur(120px)',
            borderRadius: '50%',
          }}
        />
      </div>

      {/* ── Role Badge Strip ── */}
      <div
        className="relative z-10 w-full flex items-center justify-end px-5 md:px-8 py-1.5"
        style={{ background: 'transparent' }}
        role="status"
        aria-label="Logged in as Customer"
      >
        <span
          className="inline-flex items-center gap-1.5 text-[10px] font-black uppercase tracking-widest px-3 py-1 rounded-full"
          style={{
            background: 'var(--color-primary-light)',
            color: 'var(--color-deep)',
            fontFamily: 'var(--font-display)',
            border: '1px solid color-mix(in srgb, var(--color-primary) 25%, transparent)',
          }}
        >
          <span
            className="h-1.5 w-1.5 rounded-full"
            style={{ background: 'var(--color-primary)' }}
          />
          Customer
        </span>
      </div>

      {/* ── Page Content ── */}
      <motion.div
        className={`relative z-10 ${isFullBleed ? '' : 'px-fluid-md py-fluid-lg'}`}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
      >
        <div className={isFullBleed ? 'h-full w-full' : 'max-w-7xl mx-auto'}>
          {children}
        </div>
      </motion.div>
    </div>
  );
};
