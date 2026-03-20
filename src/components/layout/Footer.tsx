import React from 'react';
import { Star, Twitter, Instagram, Linkedin, Github, ArrowRight } from 'lucide-react';
import { Screen } from '../../types';

interface FooterProps {
  onNavigate: (s: Screen) => void;
}

const FOOTER_LINKS = {
  Platform: [
    { label: 'How it Works', screen: 'landing' as Screen },
    { label: 'Services',     screen: 'services' as Screen },
    { label: 'Become a Pro', screen: 'signup' as Screen },
    { label: 'Help Center',  screen: 'help' as Screen },
  ],
  Legal: [
    { label: 'Terms of Service', screen: 'terms' as Screen },
    { label: 'Privacy Policy',   screen: 'privacy' as Screen },
    { label: 'Support',          screen: 'support' as Screen },
  ],
};

export const Footer = ({ onNavigate }: FooterProps) => {
  return (
    <footer
      className="w-full mt-auto"
      style={{
        background: 'linear-gradient(180deg, var(--color-background) 0%, var(--color-deep) 100%)',
        borderTop: '1px solid var(--color-border)',
      }}
    >
      {/* ── Newsletter Bar ── */}
      <div
        className="w-full py-12"
        style={{ background: 'var(--color-deep)' }}
      >
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="flex flex-col md:flex-row items-center justify-between gap-6">
            <div>
              <h3
                className="text-xl font-extrabold text-white"
                style={{ fontFamily: 'var(--font-display)' }}
              >
                Stay in the loop
              </h3>
              <p className="text-sm mt-1" style={{ color: 'rgba(255,255,255,0.6)' }}>
                Get the latest service deals and platform updates.
              </p>
            </div>
            <div className="flex w-full max-w-sm gap-2">
              <input
                type="email"
                placeholder="you@example.com"
                className="flex-1 px-4 py-2.5 rounded-xl text-sm outline-none"
                style={{
                  background: 'rgba(255,255,255,0.1)',
                  border: '1px solid rgba(255,255,255,0.2)',
                  color: '#fff',
                  fontFamily: 'var(--font-sans)',
                }}
              />
              <button
                className="flex items-center gap-1.5 px-5 py-2.5 rounded-xl text-sm font-semibold text-white transition-all hover:opacity-90 shrink-0"
                style={{ background: 'var(--color-primary)', fontFamily: 'var(--font-display)' }}
              >
                Subscribe <ArrowRight size={14} />
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* ── Main Footer ── */}
      <div
        className="py-12"
        style={{ background: '#001f15' }}
      >
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-10">

            {/* Brand */}
            <div className="col-span-2 md:col-span-1">
              <div className="flex items-center gap-2 mb-4">
                <div
                  className="h-8 w-8 rounded-lg flex items-center justify-center"
                  style={{ background: 'linear-gradient(135deg, var(--color-deep) 0%, var(--color-primary) 100%)' }}
                >
                  <Star size={14} className="text-white" strokeWidth={2.5} />
                </div>
                <span
                  className="text-base font-extrabold text-white"
                  style={{ fontFamily: 'var(--font-display)' }}
                >
                  Servify
                </span>
              </div>
              <p className="text-sm leading-relaxed" style={{ color: 'rgba(255,255,255,0.5)' }}>
                Connecting trusted service professionals with customers who need them.
              </p>
              <div className="flex gap-3 mt-5">
                {[Twitter, Instagram, Linkedin, Github].map((Icon, i) => (
                  <a
                    key={i}
                    href="#"
                    className="h-8 w-8 rounded-lg flex items-center justify-center transition-all hover:opacity-80"
                    style={{ background: 'rgba(255,255,255,0.08)', color: 'rgba(255,255,255,0.6)' }}
                  >
                    <Icon size={14} />
                  </a>
                ))}
              </div>
            </div>

            {/* Links */}
            {Object.entries(FOOTER_LINKS).map(([section, items]) => (
              <div key={section}>
                <h4
                  className="text-xs font-semibold uppercase tracking-widest mb-4"
                  style={{ color: 'rgba(255,255,255,0.4)', fontFamily: 'var(--font-display)' }}
                >
                  {section}
                </h4>
                <ul className="space-y-2.5">
                  {items.map(({ label, screen }) => (
                    <li key={label}>
                      <button
                        onClick={() => onNavigate(screen)}
                        className="text-sm transition-colors text-left"
                        style={{ color: 'rgba(255,255,255,0.6)', fontFamily: 'var(--font-sans)' }}
                        onMouseEnter={e => (e.currentTarget.style.color = 'rgba(255,255,255,0.9)')}
                        onMouseLeave={e => (e.currentTarget.style.color = 'rgba(255,255,255,0.6)')}
                      >
                        {label}
                      </button>
                    </li>
                  ))}
                </ul>
              </div>
            ))}

            {/* Stats */}
            <div>
              <h4
                className="text-xs font-semibold uppercase tracking-widest mb-4"
                style={{ color: 'rgba(255,255,255,0.4)', fontFamily: 'var(--font-display)' }}
              >
                Platform
              </h4>
              <div className="space-y-3">
                {[
                  { value: '10K+', label: 'Verified Pros' },
                  { value: '50K+', label: 'Jobs Completed' },
                  { value: '4.9★', label: 'Avg Rating' },
                ].map(({ value, label }) => (
                  <div key={label}>
                    <p
                      className="text-base font-extrabold text-white"
                      style={{ fontFamily: 'var(--font-display)' }}
                    >
                      {value}
                    </p>
                    <p className="text-xs" style={{ color: 'rgba(255,255,255,0.45)' }}>
                      {label}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Bottom bar */}
          <div
            className="pt-6 flex flex-col sm:flex-row justify-between items-center gap-3"
            style={{ borderTop: '1px solid rgba(255,255,255,0.08)' }}
          >
            <p className="text-xs" style={{ color: 'rgba(255,255,255,0.3)' }}>
              © {new Date().getFullYear()} Servify. All rights reserved.
            </p>
            <div className="flex gap-4">
              {['Terms', 'Privacy', 'Cookies'].map(item => (
                <button
                  key={item}
                  onClick={() => onNavigate(item.toLowerCase() as Screen)}
                  className="text-xs transition-colors"
                  style={{ color: 'rgba(255,255,255,0.3)' }}
                >
                  {item}
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};
