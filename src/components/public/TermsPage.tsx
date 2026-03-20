import React from 'react';
import { motion } from 'motion/react';
import { ChevronLeft, FileText, Scale, AlertCircle, CheckCircle, CreditCard, Shield, Ban, ArrowRight } from 'lucide-react';
import { Screen } from '../../types';

interface TermsPageProps {
  onNavigate: (s: Screen) => void;
}

const SECTIONS = [
  {
    icon: FileText,
    title: '1. Acceptance of Terms',
    content: `By accessing or using the Servify platform ("Service"), you agree to be bound by these Terms of Service ("Terms"). If you do not agree to these Terms, you may not access or use the Service. These Terms apply to all visitors, users, and others who access or use the Service.`,
  },
  {
    icon: Scale,
    title: '2. Use of Service',
    content: `You may use the Service only for lawful purposes and in accordance with these Terms. You agree not to use the Service: in any way that violates applicable law or regulation; to transmit unsolicited commercial communications; to impersonate any person or entity; to engage in any conduct that restricts others' use of the Service; or to harass, abuse, or harm another person.`,
  },
  {
    icon: CheckCircle,
    title: '3. User Accounts',
    content: `To access certain features of the Service, you must create an account. You are responsible for maintaining the confidentiality of your account credentials and for all activities that occur under your account. You must provide accurate, current, and complete information. You must notify us immediately of any unauthorized use of your account.`,
  },
  {
    icon: CreditCard,
    title: '4. Payments & Fees',
    content: `Customers agree to pay the fees displayed at the time of booking. Servify charges a platform fee of 10% on all transactions. Payments are processed securely via our payment partners. Refunds are issued in accordance with our cancellation policy. All prices are in USD unless otherwise stated.`,
  },
  {
    icon: Shield,
    title: '5. Provider Obligations',
    content: `Service providers must complete identity verification and maintain accurate profile information. Providers agree to perform services as described, arrive on time, maintain professional conduct, carry appropriate insurance, and comply with all applicable laws and licensing requirements.`,
  },
  {
    icon: Ban,
    title: '6. Prohibited Activities',
    content: `You may not: engage in fraudulent activities; circumvent the platform to arrange off-platform transactions; post false or misleading reviews; use automated scripts or bots; violate intellectual property rights; share account access with unauthorized persons; or engage in any activity that could damage the platform or other users.`,
  },
  {
    icon: AlertCircle,
    title: '7. Limitation of Liability',
    content: `To the maximum extent permitted by applicable law, Servify shall not be liable for any indirect, incidental, special, consequential, or punitive damages, or any loss of profits or revenues. Our total liability for any claims under these Terms shall not exceed the amount paid by you to Servify in the twelve months preceding the claim.`,
  },
];

export const TermsPage = ({ onNavigate }: TermsPageProps) => {
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
              <Scale size={20} className="text-white" />
            </div>
            <span className="text-xs font-semibold uppercase tracking-widest" style={{ color: 'var(--color-primary)', fontFamily: 'var(--font-display)' }}>
              Legal
            </span>
          </div>
          <h1 className="text-4xl font-extrabold text-white mb-3" style={{ fontFamily: 'var(--font-display)' }}>
            Terms of Service
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
            Welcome to Servify. These Terms of Service govern your use of our platform that connects customers with service professionals. Please read them carefully. By creating an account or using our services, you agree to these Terms.
          </p>
        </motion.div>

        {/* Sections */}
        <div className="space-y-5">
          {SECTIONS.map(({ icon: Icon, title, content }, idx) => (
            <motion.div
              key={title}
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: idx * 0.06 }}
              className="rounded-2xl overflow-hidden"
              style={{ background: 'var(--color-surface)', border: '1px solid var(--color-border)', boxShadow: 'var(--shadow-xs)' }}
            >
              <div className="p-6">
                <div className="flex items-center gap-3 mb-3">
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

        {/* Agreement Footer */}
        <div
          className="mt-10 p-6 rounded-2xl flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4"
          style={{ background: 'var(--color-neutral-50)', border: '1px solid var(--color-border)' }}
        >
          <div>
            <p className="text-sm font-bold mb-1" style={{ color: 'var(--color-ink)', fontFamily: 'var(--font-display)' }}>
              Have questions about our Terms?
            </p>
            <p className="text-xs" style={{ color: 'var(--color-ink-muted)' }}>
              Contact our legal team at legal@servify.com
            </p>
          </div>
          <div className="flex gap-2 shrink-0">
            <button
              onClick={() => onNavigate('privacy')}
              className="flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm font-semibold transition-all"
              style={{ border: '1.5px solid var(--color-border)', color: 'var(--color-ink)', fontFamily: 'var(--font-display)', background: 'transparent' }}
            >
              Privacy Policy
            </button>
            <button
              onClick={() => onNavigate('help')}
              className="flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm font-bold text-white transition-all hover:opacity-90"
              style={{ background: 'var(--color-deep)', fontFamily: 'var(--font-display)' }}
            >
              Get Help <ArrowRight size={13} />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
