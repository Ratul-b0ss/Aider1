import React, { useState } from 'react';
import { Calendar, Clock, MapPin } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { Button } from '../ui/Button';
import { Screen } from '../../types';

interface BookingsProps {
  onNavigate: (s: Screen) => void;
}

const BOOKINGS = [
  {
    id: '1',
    service: 'Deep Home Cleaning',
    provider: 'Sparkle Pros',
    date: 'Oct 24, 2024',
    time: '10:00 AM',
    status: 'Upcoming',
    price: 45,
    image: 'https://picsum.photos/seed/cleaning/200/200',
    address: '123 Luxury Ave, Suite 405',
    type: 'Upcoming'
  },
  {
    id: '2',
    service: 'AC Maintenance',
    provider: 'CoolAir Tech',
    date: 'Oct 20, 2024',
    time: '02:30 PM',
    status: 'Completed',
    price: 60,
    image: 'https://picsum.photos/seed/ac/200/200',
    address: '456 Business Rd, Office 12',
    type: 'Completed'
  },
];

export const Bookings = ({ onNavigate }: BookingsProps) => {
  const [activeTab, setActiveTab] = useState<'Upcoming' | 'Completed'>('Upcoming');

  const filteredBookings = BOOKINGS.filter(b => b.type === activeTab);

  return (
    <div className="flex flex-col gap-fluid-xl px-fluid-lg py-fluid-lg pb-24">
      {/* Header */}
      <header>
        <span className="mb-2 block text-[10px] font-black uppercase tracking-[0.2em] text-primary">My Schedule</span>
        <h1 className="text-fluid-3xl font-black tracking-tighter text-ink">Bookings</h1>
      </header>

      {/* Tabs */}
      <div className="flex w-full max-w-md gap-1 rounded-2xl bg-border p-1">
        {(['Upcoming', 'Completed'] as const).map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`flex-1 rounded-xl py-3 text-[10px] font-black uppercase tracking-widest transition-all ${
              activeTab === tab
                ? 'bg-white text-ink shadow-sm'
                : 'text-ink-muted hover:text-ink'
            }`}
          >
            {tab}
          </button>
        ))}
      </div>

      {/* Bookings List */}
      <div className="auto-grid">
        <AnimatePresence mode="popLayout">
          {filteredBookings.map((booking, idx) => (
            <motion.div
              key={booking.id}
              layout
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95 }}
              transition={{ delay: idx * 0.1 }}
              className="card-premium group p-fluid-md hover:border-primary"
            >
              <div className="flex flex-col gap-fluid-md md:flex-row">
                <div className="h-32 w-full shrink-0 overflow-hidden rounded-2xl md:w-32">
                  <img 
                    src={booking.image} 
                    alt={booking.service} 
                    className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-110"
                    referrerPolicy="no-referrer"
                  />
                </div>

                <div className="flex flex-1 flex-col justify-between">
                  <div className="mb-4 flex items-start justify-between">
                    <div>
                      <h3 className="mb-1 text-fluid-lg font-black leading-tight text-ink">{booking.service}</h3>
                      <p className="text-sm font-bold text-ink-muted">by {booking.provider}</p>
                    </div>
                    <div className={`rounded-full px-4 py-2 text-[10px] font-black uppercase tracking-widest ${
                      booking.status === 'Upcoming' 
                        ? 'bg-primary/10 text-primary' 
                        : 'bg-emerald-50 text-emerald-600'
                    }`}>
                      {booking.status}
                    </div>
                  </div>

                  <div className="grid grid-cols-1 gap-fluid-sm sm:grid-cols-3">
                    <div className="flex items-center gap-3 text-ink-muted">
                      <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-background-light">
                        <Calendar size={18} />
                      </div>
                      <span className="text-[10px] font-black uppercase tracking-widest">{booking.date}</span>
                    </div>
                    <div className="flex items-center gap-3 text-ink-muted">
                      <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-background-light">
                        <Clock size={18} />
                      </div>
                      <span className="text-[10px] font-black uppercase tracking-widest">{booking.time}</span>
                    </div>
                    <div className="flex items-center gap-3 text-ink-muted">
                      <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-background-light">
                        <MapPin size={18} />
                      </div>
                      <span className="truncate text-[10px] font-black uppercase tracking-widest">{booking.address}</span>
                    </div>
                  </div>
                </div>
              </div>

              <div className="mt-fluid-md flex flex-col items-center justify-between border-t border-border pt-fluid-md gap-fluid-md md:flex-row">
                <div className="flex items-baseline gap-1">
                  <span className="text-fluid-2xl font-black text-ink">${booking.price}</span>
                  <span className="text-[10px] font-black uppercase tracking-widest text-ink-muted">Total Price</span>
                </div>
                
                <div className="flex w-full gap-4 md:w-auto">
                  {booking.status === 'Upcoming' ? (
                    <>
                      <Button variant="outline" size="sm" className="flex-1 md:flex-none">Reschedule</Button>
                      <Button size="sm" className="flex-1 md:flex-none">Contact Pro</Button>
                    </>
                  ) : (
                    <>
                      <Button variant="outline" size="sm" className="flex-1 md:flex-none">Download Invoice</Button>
                      <Button size="sm" className="flex-1 md:flex-none">Book Again</Button>
                    </>
                  )}
                </div>
              </div>
            </motion.div>
          ))}
        </AnimatePresence>

        {filteredBookings.length === 0 && (
          <div className="flex flex-col items-center justify-center py-20 text-center">
            <div className="mb-6 flex h-24 w-24 items-center justify-center rounded-full bg-background-light">
              <Calendar size={40} className="text-ink-muted/20" />
            </div>
            <h3 className="mb-2 text-fluid-xl font-black text-ink">No {activeTab.toLowerCase()} bookings</h3>
            <p className="font-bold text-ink-muted">Your schedule looks clear for now.</p>
            <Button 
              variant="outline" 
              className="mt-8"
              onClick={() => onNavigate('services')}
            >
              Explore Services
            </Button>
          </div>
        )}
      </div>
    </div>
  );
};
