import React, { useState } from 'react';
import { motion } from 'motion/react';
import {
  DollarSign, TrendingUp, ArrowDownToLine, Clock, CheckCircle,
  AlertCircle, ArrowRight, CreditCard, Building2, Wallet,
  ArrowUpRight, ArrowDownRight, Filter,
} from 'lucide-react';
import { Screen, AuthUser } from '../../types';

interface WalletPayoutProps {
  onNavigate: (s: Screen) => void;
  user: AuthUser;
}

const TRANSACTIONS = [
  { id: '1', type: 'credit',  desc: 'Payment for Deep Cleaning',  date: 'Mar 20', amount: 45,   status: 'completed' },
  { id: '2', type: 'credit',  desc: 'Payment for AC Repair',      date: 'Mar 18', amount: 60,   status: 'completed' },
  { id: '3', type: 'debit',   desc: 'Payout to Bank — ****4521',  date: 'Mar 15', amount: -200, status: 'completed' },
  { id: '4', type: 'credit',  desc: 'Payment for Garden Care',    date: 'Mar 14', amount: 35,   status: 'completed' },
  { id: '5', type: 'pending', desc: 'Pending — Plumbing Fix',     date: 'Mar 22', amount: 80,   status: 'pending' },
  { id: '6', type: 'debit',   desc: 'Platform Fee (10%)',         date: 'Mar 12', amount: -14,  status: 'completed' },
];

const STATS = [
  { label: 'Available Balance', value: '$624.00', icon: Wallet,        bg: 'var(--color-primary-light)', color: 'var(--color-deep)',  main: true },
  { label: 'This Month',        value: '$1,240',  icon: TrendingUp,    bg: '#EEFAEF', color: '#16A34A',             main: false },
  { label: 'Pending',           value: '$80.00',  icon: Clock,         bg: '#FFF4EC', color: '#EA580C',             main: false },
  { label: 'Total Earned',      value: '$5,820',  icon: DollarSign,    bg: '#F3EFFF', color: '#7C3AED',             main: false },
];

export const WalletPayout = ({ onNavigate, user }: WalletPayoutProps) => {
  const [tab, setTab] = useState<'overview' | 'payout'>('overview');
  const [payoutAmount, setPayoutAmount] = useState('');
  const [method, setMethod] = useState<'bank' | 'card'>('bank');
  const [filter, setFilter] = useState<'all' | 'credit' | 'debit' | 'pending'>('all');
  const [payoutDone, setPayoutDone] = useState(false);

  const filtered = filter === 'all' ? TRANSACTIONS : TRANSACTIONS.filter(t => t.type === filter);

  return (
    <div className="space-y-6">

      {/* ── Header ── */}
      <div>
        <p className="text-xs font-semibold uppercase tracking-widest mb-1" style={{ color: 'var(--color-primary)', fontFamily: 'var(--font-display)' }}>
          Financial
        </p>
        <h1 className="text-2xl font-extrabold" style={{ color: 'var(--color-ink)', fontFamily: 'var(--font-display)' }}>
          Wallet & Payouts
        </h1>
      </div>

      {/* ── Stats Grid ── */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {STATS.map(({ label, value, icon: Icon, bg, color, main }, idx) => (
          <motion.div
            key={label}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: idx * 0.07 }}
            className="rounded-2xl p-4"
            style={{ background: bg, border: `1px solid ${color}20` }}
          >
            <div className="flex items-center justify-between mb-2">
              <Icon size={16} style={{ color }} strokeWidth={2} />
              {main && (
                <span className="text-[10px] font-bold px-2 py-0.5 rounded-full"
                  style={{ background: 'var(--color-primary)', color: '#fff', fontFamily: 'var(--font-display)' }}>
                  Available
                </span>
              )}
            </div>
            <p className={`font-extrabold`}
              style={{ fontSize: main ? '1.5rem' : '1.25rem', color: 'var(--color-ink)', fontFamily: 'var(--font-display)' }}>
              {value}
            </p>
            <p className="text-[11px] mt-0.5" style={{ color: 'var(--color-ink-muted)' }}>{label}</p>
          </motion.div>
        ))}
      </div>

      {/* ── Tabs ── */}
      <div
        className="flex gap-1 p-1 rounded-xl"
        style={{ background: 'var(--color-neutral-100)', width: 'fit-content' }}
      >
        {(['overview', 'payout'] as const).map(t => (
          <button
            key={t}
            onClick={() => setTab(t)}
            className="px-5 py-2 rounded-lg text-sm font-semibold capitalize transition-all"
            style={{
              background: tab === t ? 'var(--color-surface)' : 'transparent',
              color: tab === t ? 'var(--color-deep)' : 'var(--color-ink-muted)',
              fontFamily: 'var(--font-display)',
              boxShadow: tab === t ? 'var(--shadow-sm)' : 'none',
            }}
          >
            {t === 'overview' ? 'Transactions' : 'Request Payout'}
          </button>
        ))}
      </div>

      {/* ── TRANSACTIONS TAB ── */}
      {tab === 'overview' && (
        <div className="rounded-2xl overflow-hidden" style={{ background: 'var(--color-surface)', border: '1px solid var(--color-border)', boxShadow: 'var(--shadow-sm)' }}>
          <div className="flex items-center justify-between px-5 py-4 border-b" style={{ borderColor: 'var(--color-border)' }}>
            <h2 className="text-base font-extrabold" style={{ color: 'var(--color-ink)', fontFamily: 'var(--font-display)' }}>
              Transaction History
            </h2>
            <div className="flex gap-2">
              {(['all', 'credit', 'debit', 'pending'] as const).map(f => (
                <button
                  key={f}
                  onClick={() => setFilter(f)}
                  className="px-3 py-1.5 rounded-lg text-[10px] font-bold capitalize transition-all"
                  style={{
                    background: filter === f ? 'var(--color-deep)' : 'var(--color-neutral-100)',
                    color: filter === f ? '#fff' : 'var(--color-ink-muted)',
                    fontFamily: 'var(--font-display)',
                  }}
                >
                  {f}
                </button>
              ))}
            </div>
          </div>
          <div className="divide-y" style={{ borderColor: 'var(--color-border)' }}>
            {filtered.map((tx, idx) => (
              <motion.div
                key={tx.id}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: idx * 0.05 }}
                className="flex items-center gap-4 px-5 py-4"
                style={{ borderColor: 'var(--color-border)' }}
              >
                <div
                  className="h-9 w-9 rounded-xl flex items-center justify-center shrink-0"
                  style={{
                    background: tx.type === 'credit' ? '#EEFAEF' : tx.type === 'pending' ? 'var(--color-primary-light)' : '#FEF2F2',
                  }}
                >
                  {tx.type === 'credit'
                    ? <ArrowDownRight size={15} style={{ color: '#16A34A' }} />
                    : tx.type === 'pending'
                    ? <Clock size={15} style={{ color: 'var(--color-primary)' }} />
                    : <ArrowUpRight size={15} style={{ color: '#EF4444' }} />
                  }
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-bold truncate" style={{ color: 'var(--color-ink)', fontFamily: 'var(--font-display)' }}>
                    {tx.desc}
                  </p>
                  <p className="text-xs" style={{ color: 'var(--color-ink-muted)' }}>{tx.date}</p>
                </div>
                <div className="text-right shrink-0">
                  <p
                    className="text-sm font-extrabold"
                    style={{
                      color: tx.type === 'credit' ? '#16A34A' : tx.type === 'pending' ? 'var(--color-primary)' : '#EF4444',
                      fontFamily: 'var(--font-display)',
                    }}
                  >
                    {tx.amount > 0 ? '+' : ''}{tx.amount < 0 ? `-$${Math.abs(tx.amount)}` : `$${tx.amount}`}
                  </p>
                  <span
                    className="text-[10px] font-semibold capitalize"
                    style={{ color: tx.status === 'pending' ? 'var(--color-primary)' : 'var(--color-ink-muted)' }}
                  >
                    {tx.status}
                  </span>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      )}

      {/* ── PAYOUT TAB ── */}
      {tab === 'payout' && (
        <div className="max-w-md space-y-4">
          {payoutDone ? (
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              className="text-center py-10"
            >
              <div className="h-16 w-16 mx-auto rounded-full flex items-center justify-center mb-4"
                style={{ background: 'var(--color-primary-light)' }}>
                <CheckCircle size={30} style={{ color: 'var(--color-primary)' }} />
              </div>
              <h3 className="text-lg font-extrabold mb-1" style={{ color: 'var(--color-ink)', fontFamily: 'var(--font-display)' }}>
                Payout Requested!
              </h3>
              <p className="text-sm" style={{ color: 'var(--color-ink-muted)' }}>
                Funds will arrive in 1–3 business days.
              </p>
            </motion.div>
          ) : (
            <>
              <div
                className="p-4 rounded-2xl"
                style={{ background: 'var(--color-primary-light)', border: '1px solid color-mix(in srgb, var(--color-primary) 20%, transparent)' }}
              >
                <p className="text-xs font-semibold" style={{ color: 'var(--color-ink-muted)' }}>Available to withdraw</p>
                <p className="text-3xl font-extrabold mt-1" style={{ color: 'var(--color-deep)', fontFamily: 'var(--font-display)' }}>
                  $624.00
                </p>
              </div>

              <div>
                <label className="block text-xs font-bold mb-2" style={{ color: 'var(--color-ink)', fontFamily: 'var(--font-display)' }}>
                  Payout Amount
                </label>
                <div className="relative">
                  <DollarSign size={15} className="absolute left-3.5 top-1/2 -translate-y-1/2" style={{ color: 'var(--color-ink-muted)' }} />
                  <input
                    type="number"
                    value={payoutAmount}
                    onChange={e => setPayoutAmount(e.target.value)}
                    placeholder="0.00"
                    className="w-full pl-10 pr-4 py-3 rounded-xl text-sm outline-none"
                    style={{ background: 'var(--color-neutral-50)', border: '1.5px solid var(--color-border)', color: 'var(--color-ink)' }}
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold mb-2" style={{ color: 'var(--color-ink)', fontFamily: 'var(--font-display)' }}>
                  Payout Method
                </label>
                <div className="grid grid-cols-2 gap-2">
                  {([
                    { val: 'bank', icon: Building2, label: 'Bank Transfer' },
                    { val: 'card', icon: CreditCard, label: 'Debit Card' },
                  ] as const).map(({ val, icon: Icon, label }) => (
                    <button
                      key={val}
                      onClick={() => setMethod(val)}
                      className="flex items-center gap-2.5 px-4 py-3.5 rounded-xl text-sm font-semibold transition-all"
                      style={{
                        background: method === val ? 'var(--color-primary-light)' : 'var(--color-neutral-50)',
                        border: `1.5px solid ${method === val ? 'var(--color-primary)' : 'var(--color-border)'}`,
                        color: method === val ? 'var(--color-deep)' : 'var(--color-ink)',
                        fontFamily: 'var(--font-display)',
                      }}
                    >
                      <Icon size={15} />
                      {label}
                    </button>
                  ))}
                </div>
              </div>

              {method === 'bank' && (
                <div className="p-4 rounded-2xl" style={{ background: 'var(--color-neutral-50)', border: '1px solid var(--color-border)' }}>
                  <p className="text-xs font-bold mb-1" style={{ color: 'var(--color-ink)', fontFamily: 'var(--font-display)' }}>
                    Bank Account on File
                  </p>
                  <p className="text-sm" style={{ color: 'var(--color-ink-muted)' }}>
                    Chase Bank — ****4521
                  </p>
                </div>
              )}

              <button
                onClick={() => setPayoutDone(true)}
                disabled={!payoutAmount}
                className="w-full flex items-center justify-center gap-2 py-3.5 rounded-xl text-sm font-bold text-white transition-all hover:opacity-90 disabled:opacity-40"
                style={{
                  background: 'linear-gradient(135deg, var(--color-primary) 0%, #D1F843 100%)',
                  fontFamily: 'var(--font-display)',
                  boxShadow: '0 4px 14px rgba(209,248,67,0.3)',
                }}
              >
                <ArrowDownToLine size={15} />
                Request Payout
              </button>

              <p className="text-center text-[11px]" style={{ color: 'var(--color-ink-muted)' }}>
                Minimum payout: $10. Typically processed in 1–3 business days.
              </p>
            </>
          )}
        </div>
      )}
    </div>
  );
};
