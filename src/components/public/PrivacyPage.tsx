import React from 'react';
import { motion } from 'motion/react';
import { ChevronLeft, Shield, Eye, Lock, Database, Globe, Mail, ArrowRight } from 'lucide-react';
import { Screen } from '../../types';

interface PrivacyPageProps {
  onNavigate: (s: Screen) => void;
}

const SECTIONS = [
  {
    icon: Database,
    title: 'Information We Collect',
    content: `We collect information you provide directly, such as your name, email address, phone number, payment details, and any service-related information. We also collect information automatically when you use our platform, including log data, device information, and usage patterns to improve your experience.`,
  },
  {
    icon: Eye,
    title: 'How We Use Your Information',
    content: `Your information is used to: provide and improve our services; process transactions and send related information; send administrative messages, updates, and promotional content (with your consent); respond to comments and questions; and detect and prevent fraudulent transactions and other illegal activities.`,
  },
  {
    icon: Globe,
    title: 'Information Sharing',
    content: `We do not sell, trade, or transfer your personally identifiable information to outside parties except to provide our services. This includes trusted third parties who assist us in operating our platform, conducting our business, or servicing you, so long as those parties agree to keep this information confidential.`,
  },
  {
    icon: Lock,
    title: 'Data Security',
    content: `We implement industry-standard security measures including 256-bit SSL encryption, PCI-DSS compliance for payment data, two-factor authentication, and regular security audits. While no method of transmission over the Internet is 100% secure, we strive to use commercially acceptable means to protect your data.`,
  },
  {
    icon: Shield,
    title: 'Your Rights & Choices',
    content: `You have the right to access, correct, or delete your personal data at any time through your account settings. You may also opt out of marketing communications, request data portability, and lodge a complaint with a supervisory authority. We will respond to all legitimate requests within 30 days.`,
  },
  {
    icon: Mail,
    title: 'Cookies & Tracking',
    content: `We use cookies and similar tracking technologies to track activity on our platform and hold certain information. You can instruct your browser to refuse all cookies or to indicate when a cookie is being sent. However, if you do not accept cookies, some portions of our service may not function properly.`,
  },
];

export const PrivacyPage = ({ onNavigate }: PrivacyPageProps) => {
  return (
    <div className="w-full">
      {/* ── Hero ── */}
      <div
        className="w-full py-14 px-5 lg:px-8 relative overflow-hidden"
        style={{ background: 'linear-gradient(160deg, var(--color-deep) 0%, #005840 100%)' }}
      >
        <div className="absolute inset-0 opacity-[0.04]"
          style={{ backgroundImage: 'radial-gradient(rgba(255,255,255,0.4) 1px, transparent 1px)', backgroundSize: '24px 24px' }} />
        <div className="mx-auto max-w-4xl relative">
          <button
            onClick={() => onNavigate('landing')}
            className="flex items-center gap-2 text-sm mb-6 transition-colors"
            style={{ color: 'rgba(255,255,255,0.6)', fontFamily: 'var(--font-display)' }}
          >
            <ChevronLeft size={15} /> Back
          </button>
          <div className="flex items-center gap-3 mb-4">
            <div className="h-10 w-10 rounded-xl flex items-center justify-center" style={{ background: 'rgba(255,255,255,0.1)' }}>
              <Shield size={20} className="text-white" />
            </div>
            <span className="text-xs font-semibold uppercase tracking-widest" style={{ color: 'var(--color-primary)', fontFamily: 'var(--font-display)' }}>
              Legal
            </span>
          </div>
          <h1 className="text-4xl font-extrabold text-white mb-3" style={{ fontFamily: 'var(--font-display)' }}>
            Privacy Policy
          </h1>
          <p className="text-base" style={{ color: 'rgba(255,255,255,0.65)' }}>
            Last updated: March 20, 2026 · Effective: March 20, 2026
          </p>
        </div>
      </div>

      <div className="mx-auto max-w-4xl px-5 lg:px-8 py-12">
        {/* Intro */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          className="p-6 rounded-2xl mb-8"
          style={{ background: 'var(--color-primary-light)', border: '1px solid color-mix(in srgb, var(--color-primary) 15%, transparent)' }}
        >
          <p className="text-sm leading-relaxed" style={{ color: 'var(--color-ink)' }}>
            AiDER ("we", "us", or "our") is committed to protecting your privacy. This Privacy Policy explains how we collect, use, disclose, and safeguard your information when you use our platform. Please read this policy carefully. By using AiDER, you consent to the practices described herein.
          </p>
        </motion.div>

        {/* Sections */}
        <div className="space-y-6">
          {SECTIONS.map(({ icon: Icon, title, content }, idx) => (
            <motion.div
              key={title}
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: idx * 0.07 }}
              className="rounded-2xl overflow-hidden"
              style={{ background: 'var(--color-surface)', border: '1px solid var(--color-border)', boxShadow: 'var(--shadow-xs)' }}
            >
              <div className="p-6">
                <div className="flex items-center gap-3 mb-4">
                  <div className="h-9 w-9 rounded-xl flex items-center justify-center shrink-0"
                    style={{ background: 'var(--color-primary-light)' }}>
                    <Icon size={17} style={{ color: 'var(--color-primary)' }} />
                  </div>
                  <h2 className="text-base font-extrabold" style={{ color: 'var(--color-ink)', fontFamily: 'var(--font-display)' }}>
                    {title}
                  </h2>
                </div>
                <p className="text-sm leading-relaxed" style={{ color: 'var(--color-ink-muted)' }}>
                  {content}
                </p>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Contact */}
        <div
          className="mt-10 p-6 rounded-2xl flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4"
          style={{ background: 'var(--color-neutral-50)', border: '1px solid var(--color-border)' }}
        >
          <div>
            <p className="text-sm font-bold mb-1" style={{ color: 'var(--color-ink)', fontFamily: 'var(--font-display)' }}>
              Questions about your privacy?
            </p>
            <p className="text-xs" style={{ color: 'var(--color-ink-muted)' }}>
              Contact our Data Protection Officer at privacy@aider.com
            </p>
          </div>
          <button
            onClick={() => onNavigate('help')}
            className="flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-bold text-white transition-all hover:opacity-90 shrink-0"
            style={{ background: 'var(--color-deep)', fontFamily: 'var(--font-display)' }}
          >
            Contact Support <ArrowRight size={13} />
          </button>
        </div>
      </div>
    </div>
  );
};
