import React from 'react';
import { TrendingUp, Users, Calendar, DollarSign, Clock, Star, CheckCircle2 } from 'lucide-react';
import { motion } from 'motion/react';
import { Button } from '../ui/Button';
import { Screen } from '../../types';

interface ProviderDashboardProps {
  onNavigate: (s: Screen) => void;
}

const STATS = [
  { label: 'Revenue', value: '$2,450', icon: DollarSign, color: 'text-green-500 bg-green-50', trend: '+12.5%' },
  { label: 'Bookings', value: '48', icon: Calendar, color: 'text-blue-500 bg-blue-50', trend: '+8.2%' },
  { label: 'Rating', value: '4.9', icon: Star, color: 'text-orange-500 bg-orange-50', trend: '0.0%' },
  { label: 'Customers', value: '124', icon: Users, color: 'text-purple-500 bg-purple-50', trend: '+15.3%' },
];

const RECENT_BOOKINGS = [
  { id: '1', customer: 'Alex Johnson', service: 'Deep Cleaning', time: 'Today, 2:00 PM', status: 'Pending', price: 45 },
  { id: '2', customer: 'Sarah Miller', service: 'AC Repair', time: 'Tomorrow, 10:00 AM', status: 'Confirmed', price: 60 },
];

export const ProviderDashboard = ({ onNavigate }: ProviderDashboardProps) => {
  return (
    <div className="flex flex-col gap-fluid-xl px-fluid-lg py-fluid-lg pb-24">
      {/* Header */}
      <header className="flex flex-col justify-between gap-fluid-md md:flex-row md:items-end">
        <div>
          <span className="mb-2 block text-[10px] font-black uppercase tracking-[0.2em] text-primary">Business Overview</span>
          <h1 className="text-fluid-3xl font-black tracking-tighter text-ink">Dashboard</h1>
        </div>
        <div className="flex gap-4">
          <Button variant="outline" size="sm">Download Report</Button>
          <Button size="sm">Add Service</Button>
        </div>
      </header>

      {/* Stats Grid */}
      <div className="grid grid-cols-2 gap-fluid-md lg:grid-cols-4">
        {STATS.map((stat, idx) => (
          <motion.div
            key={stat.label}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: idx * 0.1 }}
            className="card-premium group p-fluid-md hover:border-primary"
          >
            <div className="mb-fluid-md flex items-start justify-between">
              <div className={`flex h-12 w-12 items-center justify-center rounded-2xl ${stat.color}`}>
                <stat.icon size={20} />
              </div>
              <span className={`text-[10px] font-black uppercase tracking-widest ${stat.trend.startsWith('+') ? 'text-emerald-500' : 'text-ink-muted'}`}>
                {stat.trend}
              </span>
            </div>
            <h3 className="mb-1 text-fluid-2xl font-black text-ink">{stat.value}</h3>
            <p className="text-[10px] font-black uppercase tracking-widest text-ink-muted">{stat.label}</p>
          </motion.div>
        ))}
      </div>

      <div className="grid grid-cols-1 gap-fluid-xl lg:grid-cols-3">
        {/* Recent Bookings */}
        <div className="flex flex-col gap-fluid-md lg:col-span-2">
          <div className="flex items-end justify-between">
            <h2 className="text-fluid-xl font-black tracking-tight text-ink">Recent Bookings</h2>
            <button className="text-[10px] font-black uppercase tracking-widest text-ink-muted transition-colors hover:text-primary">
              View Schedule
            </button>
          </div>
          <div className="card-premium overflow-hidden p-0">
            {RECENT_BOOKINGS.map((booking, idx) => (
              <div 
                key={booking.id}
                className={`flex flex-col items-center justify-between gap-fluid-md p-fluid-md transition-all hover:bg-background-light md:flex-row ${
                  idx !== RECENT_BOOKINGS.length - 1 ? 'border-b border-border' : ''
                }`}
              >
                <div className="flex items-center gap-fluid-md">
                  <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-primary/10">
                    <Calendar size={24} className="text-primary" />
                  </div>
                  <div>
                    <h4 className="mb-1 text-fluid-lg font-black text-ink">{booking.service}</h4>
                    <p className="text-sm font-bold text-ink-muted">Customer: {booking.customer}</p>
                  </div>
                </div>
                <div className="flex flex-col gap-2 md:items-end">
                  <div className="flex items-center gap-2 text-ink-muted">
                    <Clock size={14} />
                    <span className="text-[10px] font-black uppercase tracking-widest">{booking.time}</span>
                  </div>
                  <div className={`rounded-full px-4 py-1 text-[10px] font-black uppercase tracking-widest ${
                    booking.status === 'Confirmed' ? 'bg-emerald-50 text-emerald-600' : 'bg-primary/10 text-primary'
                  }`}>
                    {booking.status}
                  </div>
                </div>
                <div className="flex items-center gap-fluid-md">
                  <span className="text-fluid-xl font-black text-ink">${booking.price}</span>
                  <Button variant="outline" size="sm">Manage</Button>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Quick Actions / Tips */}
        <div className="flex flex-col gap-fluid-md">
          <h2 className="text-fluid-xl font-black tracking-tight text-ink">Quick Actions</h2>
          <div className="flex flex-col gap-fluid-md">
            <button className="group relative overflow-hidden rounded-[40px] bg-ink p-fluid-lg text-left transition-all hover:scale-[1.02]">
              <div className="absolute right-0 top-0 -mr-16 -mt-16 h-32 w-32 rounded-full bg-primary/20 blur-[40px]"></div>
              <div className="relative z-10">
                <TrendingUp className="mb-4 text-primary" size={32} />
                <h4 className="mb-2 text-fluid-lg font-black text-white">Boost Visibility</h4>
                <p className="text-sm font-medium leading-relaxed text-white/60">Promote your services to reach more customers in your area.</p>
              </div>
            </button>
            <div className="card-premium p-fluid-lg">
              <CheckCircle2 className="mb-4 text-emerald-500" size={32} />
              <h4 className="mb-2 text-fluid-lg font-black text-ink">Profile Complete</h4>
              <p className="text-sm font-bold leading-relaxed text-ink-muted">Your business profile is 100% complete. You're ready to grow!</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
