import React from 'react';
import { Screen } from '../../types';

interface CustomerLayoutProps {
  screen: Screen;
  children: React.ReactNode;
}

// Screens that should NOT have max-width / padding wrapping
// 'home' is full-bleed because CustomerDashboard manages its own layout internally
const FULL_BLEED: Screen[] = ['home', 'service-detail', 'booking-checkout', 'order-tracking'];

export const CustomerLayout = ({ screen, children }: CustomerLayoutProps) => {
  if (FULL_BLEED.includes(screen)) {
    return <div className="w-full pb-20 md:pb-0">{children}</div>;
  }

  return (
    <div className="w-full pb-20 md:pb-0">
      <div className="mx-auto max-w-7xl px-5 lg:px-8 py-6">
        {children}
      </div>
    </div>
  );
};
