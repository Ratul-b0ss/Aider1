import React, { useState } from 'react';
import { motion } from 'motion/react';
import { MessageCircle, Mail, Phone, ChevronRight, Send, CheckCircle } from 'lucide-react';
import { Screen } from '../../types';

type AuthStatus = 'guest' | 'customer' | 'provider';

interface SupportPageProps {
  onNavigate: (s: Screen) => void;
  authStatus?: AuthStatus;
}

export const SupportPage = ({ onNavigate, authStatus = 'guest' }: SupportPageProps) => {
  const [message, setMessage] = useState('');
  const [sent, setSent] = useState(false);

  return (
    <div className="mx-auto max-w-3xl px-5 lg:px-8 py-6 space-y-6">
      <div>
        <p className="text-xs font-semibold uppercase tracking-widest mb-1" style={{ color: 'var(--color-primary)', fontFamily: 'var(--font-display)' }}>
          Help
        </p>
        <h1 className="text-2xl font-extrabold" style={{ color: 'var(--color-ink)', fontFamily: 'var(--font-display)' }}>
          Contact Support
        </h1>
      </div>

      {/* Contact Methods */}
      <div className="grid md:grid-cols-3 gap-3">
        {[
          { icon: MessageCircle, label: 'Live Chat',    sub: '~2 min response',        color: '#16A34A', bg: '#EEFAEF' },
          { icon: Mail,          label: 'Email',         sub: 'support@servify.com',    color: '#2563EB', bg: '#EEF6FF' },
          { icon: Phone,         label: 'Phone',         sub: '+1 (800) SERV-IFY',      color: '#7C3AED', bg: '#F3EFFF' },
        ].map(({ icon: Icon, label, sub, color, bg }) => (
          <button
            key={label}
            className="flex items-center gap-3 p-4 rounded-2xl text-left transition-all hover:-translate-y-0.5 hover:shadow-md"
            style={{ background: bg, border: `1px solid ${color}20` }}
          >
            <div className="h-10 w-10 rounded-xl flex items-center justify-center shrink-0" style={{ background: `${color}15` }}>
              <Icon size={17} style={{ color }} />
            </div>
            <div>
              <p className="text-sm font-bold" style={{ color: 'var(--color-ink)', fontFamily: 'var(--font-display)' }}>{label}</p>
              <p className="text-xs" style={{ color: 'var(--color-ink-muted)' }}>{sub}</p>
            </div>
          </button>
        ))}
      </div>

      {/* Message Form */}
      {!sent ? (
        <div className="rounded-2xl p-5 space-y-4" style={{ background: 'var(--color-surface)', border: '1px solid var(--color-border)', boxShadow: 'var(--shadow-sm)' }}>
          <h2 className="text-base font-extrabold" style={{ color: 'var(--color-ink)', fontFamily: 'var(--font-display)' }}>
            Send a Message
          </h2>
          {[
            { placeholder: 'Your name', type: 'text' },
            { placeholder: 'Your email', type: 'email' },
          ].map(({ placeholder, type }) => (
            <input
              key={placeholder}
              type={type}
              placeholder={placeholder}
              className="w-full px-4 py-3 rounded-xl text-sm outline-none"
              style={{ background: 'var(--color-neutral-50)', border: '1.5px solid var(--color-border)', color: 'var(--color-ink)', fontFamily: 'var(--font-sans)' }}
            />
          ))}
          <textarea
            value={message}
            onChange={e => setMessage(e.target.value)}
            placeholder="Describe your issue or question..."
            rows={4}
            className="w-full px-4 py-3 rounded-xl text-sm outline-none resize-none"
            style={{ background: 'var(--color-neutral-50)', border: '1.5px solid var(--color-border)', color: 'var(--color-ink)', fontFamily: 'var(--font-sans)' }}
          />
          <button
            onClick={() => setSent(true)}
            disabled={!message}
            className="flex items-center gap-2 px-6 py-3 rounded-xl text-sm font-bold text-white disabled:opacity-40 transition-all hover:opacity-90"
            style={{ background: 'var(--color-deep)', fontFamily: 'var(--font-display)' }}
          >
            <Send size={14} /> Send Message
          </button>
        </div>
      ) : (
        <motion.div
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          className="text-center py-10 rounded-2xl"
          style={{ background: 'var(--color-surface)', border: '1px solid var(--color-border)' }}
        >
          <div className="h-14 w-14 mx-auto rounded-full flex items-center justify-center mb-3"
            style={{ background: 'var(--color-primary-light)' }}>
            <CheckCircle size={26} style={{ color: 'var(--color-primary)' }} />
          </div>
          <p className="text-base font-extrabold mb-1" style={{ color: 'var(--color-ink)', fontFamily: 'var(--font-display)' }}>
            Message Sent!
          </p>
          <p className="text-sm" style={{ color: 'var(--color-ink-muted)' }}>
            We'll get back to you within 24 hours.
          </p>
        </motion.div>
      )}

      <button
        onClick={() => onNavigate('help')}
        className="flex items-center gap-2 text-sm font-semibold"
        style={{ color: 'var(--color-primary)', fontFamily: 'var(--font-display)' }}
      >
        <ChevronRight size={14} /> Browse Help Center
      </button>
    </div>
  );
};
