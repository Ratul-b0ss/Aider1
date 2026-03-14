import React from 'react';
import { ArrowLeft, Bell, Lock, Languages, Moon, HelpCircle, ShieldCheck, LogOut, ChevronRight } from 'lucide-react';
import { Button } from '../ui/Button';

interface SettingsProps {
  onBack: () => void;
  onLogout: () => void;
}

const SECTIONS = [
  {
    title: 'Preferences',
    items: [
      { id: 'notifications', icon: Bell, label: 'Notifications', value: 'On', color: 'text-blue-500 bg-blue-50' },
      { id: 'language', icon: Languages, label: 'Language', value: 'English', color: 'text-orange-500 bg-orange-50' },
      { id: 'appearance', icon: Moon, label: 'Dark Mode', value: 'Off', color: 'text-purple-500 bg-purple-50' },
    ]
  },
  {
    title: 'Privacy & Security',
    items: [
      { id: 'password', icon: Lock, label: 'Change Password', value: '', color: 'text-green-500 bg-green-50' },
      { id: '2fa', icon: ShieldCheck, label: 'Two-Factor Auth', value: 'Off', color: 'text-pink-500 bg-pink-50' },
    ]
  },
  {
    title: 'Support',
    items: [
      { id: 'help', icon: HelpCircle, label: 'Help Center', value: '', color: 'text-indigo-500 bg-indigo-50' },
    ]
  }
];

export const Settings = ({ onBack, onLogout }: SettingsProps) => {
  return (
    <div className="flex flex-col gap-fluid-xl px-fluid-lg py-fluid-lg pb-24">
      {/* Header */}
      <header className="flex items-center gap-fluid-md">
        <Button 
          variant="outline" 
          size="sm" 
          className="flex h-12 w-12 items-center justify-center p-0"
          onClick={onBack}
        >
          <ArrowLeft size={20} />
        </Button>
        <div>
          <span className="mb-1 block text-[10px] font-black uppercase tracking-[0.2em] text-primary">App Preferences</span>
          <h1 className="text-fluid-3xl font-black tracking-tighter text-ink">Settings</h1>
        </div>
      </header>

      <div className="flex flex-col gap-fluid-lg">
        {SECTIONS.map((section) => (
          <div key={section.title} className="flex flex-col gap-fluid-sm">
            <h3 className="px-4 text-[10px] font-black uppercase tracking-[0.3em] text-ink-muted">{section.title}</h3>
            <div className="card-premium overflow-hidden p-0">
              {section.items.map((item, idx) => (
                <button
                  key={item.id}
                  className={`flex w-full items-center justify-between p-fluid-md transition-all hover:bg-background-light ${
                    idx !== section.items.length - 1 ? 'border-b border-border' : ''
                  }`}
                >
                  <div className="flex items-center gap-fluid-md">
                    <div className={`flex h-12 w-12 items-center justify-center rounded-2xl ${item.color}`}>
                      <item.icon size={20} />
                    </div>
                    <span className="text-xs font-black uppercase tracking-widest text-ink">{item.label}</span>
                  </div>
                  <div className="flex items-center gap-4">
                    {item.value && (
                      <span className="text-[10px] font-black uppercase tracking-widest text-ink-muted">
                        {item.value}
                      </span>
                    )}
                    <ChevronRight size={20} className="text-ink-muted/20" />
                  </div>
                </button>
              ))}
            </div>
          </div>
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
