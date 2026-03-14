import React from 'react';
import { User, Settings as SettingsIcon, CreditCard, ShieldCheck, Headphones, LogOut, ChevronRight, Star, Clock } from 'lucide-react';
import { motion } from 'motion/react';
import { Button } from '../ui/Button';
import { Screen } from '../../types';

interface ProfileProps {
  onLogout: () => void;
  onNavigate: (s: Screen) => void;
}

const MENU_ITEMS = [
  { id: 'account', name: 'Account Details', icon: User, color: 'text-blue-500 bg-blue-50' },
  { id: 'payments', name: 'Payment Methods', icon: CreditCard, color: 'text-orange-500 bg-orange-50' },
  { id: 'notifications', name: 'Notifications', icon: Headphones, color: 'text-pink-500 bg-pink-50' },
  { id: 'security', name: 'Security & Privacy', icon: ShieldCheck, color: 'text-purple-500 bg-purple-50' },
  { id: 'settings', name: 'App Settings', icon: SettingsIcon, color: 'text-green-500 bg-green-50' },
];

export const Profile = ({ onLogout, onNavigate }: ProfileProps) => {
  return (
    <div className="flex flex-col gap-fluid-xl px-fluid-lg py-fluid-lg pb-24">
      {/* Header */}
      <header>
        <span className="mb-2 block text-[10px] font-black uppercase tracking-[0.2em] text-primary">My Account</span>
        <h1 className="text-fluid-3xl font-black tracking-tighter text-ink">Profile</h1>
      </header>

      {/* Profile Card */}
      <section className="relative overflow-hidden rounded-[40px] bg-ink p-fluid-lg text-white">
        <div className="absolute right-0 top-0 -mr-32 -mt-32 h-64 w-64 rounded-full bg-primary/20 blur-[80px]"></div>
        
        <div className="relative z-10 flex flex-col items-center gap-fluid-md md:flex-row">
          <div className="flex h-32 w-32 items-center justify-center overflow-hidden rounded-[32px] border-4 border-white/10 bg-primary">
            <img 
              src="https://api.dicebear.com/7.x/avataaars/svg?seed=Felix" 
              alt="Profile" 
              className="h-full w-full object-cover"
              referrerPolicy="no-referrer"
            />
          </div>
          <div className="flex-1 text-center md:text-left">
            <h2 className="mb-2 text-fluid-2xl font-black tracking-tight">Sariful Alam</h2>
            <p className="mb-6 font-bold opacity-60">sarifulalamratul@gmail.com</p>
            <div className="flex flex-wrap justify-center gap-4 md:justify-start">
              <div className="flex items-center gap-2 rounded-2xl bg-white/10 px-4 py-2 backdrop-blur-md">
                <Star size={14} className="fill-primary text-primary" />
                <span className="text-[10px] font-black uppercase tracking-widest">Premium Member</span>
              </div>
              <div className="flex items-center gap-2 rounded-2xl bg-white/10 px-4 py-2 backdrop-blur-md">
                <Clock size={14} className="opacity-60" />
                <span className="text-[10px] font-black uppercase tracking-widest">Joined Mar 2024</span>
              </div>
            </div>
          </div>
          <Button variant="ghost" className="w-full md:w-auto">Edit Profile</Button>
        </div>
      </section>

      {/* Stats Grid */}
      <div className="grid grid-cols-2 gap-fluid-sm md:grid-cols-4">
        {[
          { label: 'Bookings', value: '12', color: 'text-blue-500' },
          { label: 'Reviews', value: '8', color: 'text-orange-500' },
          { label: 'Saved', value: '24', color: 'text-pink-500' },
          { label: 'Points', value: '450', color: 'text-purple-500' },
        ].map((stat, idx) => (
          <div key={idx} className="card-premium p-fluid-md text-center">
            <span className={`mb-1 block text-fluid-xl font-black ${stat.color}`}>{stat.value}</span>
            <span className="text-[10px] font-black uppercase tracking-widest text-ink-muted">{stat.label}</span>
          </div>
        ))}
      </div>

      {/* Menu */}
      <div className="card-premium overflow-hidden p-0">
        {MENU_ITEMS.map((item, idx) => (
          <button
            key={item.id}
            onClick={() => onNavigate(item.id as any)}
            className={`flex w-full items-center justify-between p-fluid-md transition-all hover:bg-background-light ${
              idx !== MENU_ITEMS.length - 1 ? 'border-b border-border' : ''
            }`}
          >
            <div className="flex items-center gap-fluid-md">
              <div className={`flex h-12 w-12 items-center justify-center rounded-2xl ${item.color}`}>
                <item.icon size={20} />
              </div>
              <span className="text-xs font-black uppercase tracking-widest text-ink">{item.name}</span>
            </div>
            <ChevronRight size={20} className="text-ink-muted/20" />
          </button>
        ))}
      </div>

      {/* Logout */}
      <Button 
        variant="danger" 
        className="w-full"
        onClick={onLogout}
      >
        <LogOut size={20} className="mr-2" />
        Logout Session
      </Button>
    </div>
  );
};
