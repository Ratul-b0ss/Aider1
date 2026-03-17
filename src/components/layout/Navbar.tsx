import React, { useState, useEffect } from 'react';
import { Home as HomeIcon, LayoutGrid, Calendar, User, BarChart3, Package, Bell, Menu, X, ChevronDown } from 'lucide-react';
import { Screen, UserType } from '../../types';

interface NavbarProps {
  active: Screen;
  onChange: (s: Screen) => void;
  userType: UserType;
  isAuthenticated: boolean;
}

export const Navbar = ({ active, onChange, userType, isAuthenticated }: NavbarProps) => {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 12);
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const customerTabs = [
    { id: 'home',     label: 'Home',     icon: HomeIcon },
    { id: 'services', label: 'Services', icon: LayoutGrid },
    { id: 'bookings', label: 'Bookings', icon: Calendar },
    { id: 'profile',  label: 'Profile',  icon: User },
  ];

  const providerTabs = [
    { id: 'provider-dashboard', label: 'Dashboard', icon: BarChart3 },
    { id: 'provider-bookings',  label: 'Bookings',  icon: Calendar },
    { id: 'provider-services',  label: 'Services',  icon: Package },
    { id: 'provider-profile',   label: 'Profile',   icon: User },
  ];

  const tabs = userType === 'customer' ? customerTabs : providerTabs;

  const handleNavClick = (screen: string) => {
    onChange(screen as Screen);
    setMobileMenuOpen(false);
  };

  const isTabActive = (tabId: string) =>
    active === tabId ||
    (tabId === 'profile' && active === 'settings') ||
    (tabId === 'provider-profile' && active === 'settings');

  return (
    <>
      <nav
        className={`
          relative z-50 w-full transition-all duration-300
          ${scrolled
            ? 'bg-white/90 backdrop-blur-xl shadow-sm border-b border-[var(--color-border)]'
            : 'bg-white border-b border-[var(--color-border)]'
          }
        `}
      >
        <div className="mx-auto flex max-w-7xl items-center justify-between px-5 md:px-8"
          style={{ height: scrolled ? '60px' : '68px', transition: 'height 0.3s ease' }}
        >
          {/* ── Logo ── */}
          <button
            onClick={() => handleNavClick(userType === 'customer' ? 'home' : 'provider-dashboard')}
            className="flex items-center gap-0.5 group outline-none"
            aria-label="Go to home"
          >
            <span
              className="font-display text-[1.5rem] font-extrabold tracking-tight leading-none"
              style={{ color: 'var(--color-deep)', fontFamily: 'var(--font-display)' }}
            >
              AIDER
            </span>
            <span
              className="text-[1.5rem] font-extrabold leading-none"
              style={{ color: 'var(--color-primary)' }}
            >
              .
            </span>
          </button>

          {/* ── Desktop Nav Links ── */}
          <div className="hidden md:flex items-center gap-1">
            {isAuthenticated
              ? tabs.map((tab) => {
                  const active_ = isTabActive(tab.id);
                  return (
                    <button
                      key={tab.id}
                      onClick={() => handleNavClick(tab.id)}
                      className={`
                        flex items-center gap-2 px-4 py-2 rounded-xl text-[0.875rem] font-semibold
                        transition-all duration-150
                        ${active_
                          ? 'bg-[var(--color-primary-light)] text-[var(--color-deep)]'
                          : 'text-[var(--color-ink-muted)] hover:bg-[var(--color-neutral-50)] hover:text-[var(--color-ink)]'
                        }
                      `}
                      style={{ fontFamily: 'var(--font-display)' }}
                    >
                      <tab.icon size={15} strokeWidth={active_ ? 2.5 : 2} />
                      {tab.label}
                    </button>
                  );
                })
              : (
                <>
                  <button
                    onClick={() => handleNavClick('services')}
                    className="px-4 py-2 rounded-xl text-[0.875rem] font-semibold text-[var(--color-ink-muted)] hover:bg-[var(--color-neutral-50)] hover:text-[var(--color-ink)] transition-all"
                    style={{ fontFamily: 'var(--font-display)' }}
                  >
                    Services
                  </button>
                  <button
                    className="px-4 py-2 rounded-xl text-[0.875rem] font-semibold text-[var(--color-ink-muted)] hover:bg-[var(--color-neutral-50)] hover:text-[var(--color-ink)] transition-all"
                    style={{ fontFamily: 'var(--font-display)' }}
                  >
                    How It Works
                  </button>
                  <button
                    onClick={() => handleNavClick('signup')}
                    className="px-4 py-2 rounded-xl text-[0.875rem] font-semibold text-[var(--color-ink-muted)] hover:bg-[var(--color-neutral-50)] hover:text-[var(--color-ink)] transition-all"
                    style={{ fontFamily: 'var(--font-display)' }}
                  >
                    Become a Provider
                  </button>
                </>
              )
            }
          </div>

          {/* ── Desktop Actions ── */}
          <div className="hidden md:flex items-center gap-3">
            {isAuthenticated ? (
              <>
                {/* Notification Bell */}
                <button
                  className="relative h-9 w-9 flex items-center justify-center rounded-xl text-[var(--color-ink-muted)] hover:bg-[var(--color-neutral-50)] hover:text-[var(--color-ink)] transition-all"
                  aria-label="Notifications"
                >
                  <Bell size={18} strokeWidth={2} />
                  <span
                    className="absolute right-2 top-2 h-2 w-2 rounded-full"
                    style={{ background: 'var(--color-primary)' }}
                  />
                </button>

                {/* Avatar */}
                <button
                  onClick={() => handleNavClick(userType === 'customer' ? 'profile' : 'provider-profile')}
                  className="flex h-9 w-9 items-center justify-center rounded-xl text-[0.8125rem] font-bold text-white transition-all hover:opacity-90 hover:shadow-md"
                  style={{ background: 'var(--color-deep)', fontFamily: 'var(--font-display)' }}
                  aria-label="Profile"
                >
                  {userType === 'customer' ? 'JD' : 'SP'}
                </button>
              </>
            ) : (
              <>
                <button
                  onClick={() => handleNavClick('login')}
                  className="px-4 py-2 text-[0.875rem] font-semibold transition-colors"
                  style={{ color: 'var(--color-deep)', fontFamily: 'var(--font-display)' }}
                >
                  Log In
                </button>
                <button
                  onClick={() => handleNavClick('signup')}
                  className="px-5 py-2 rounded-xl text-[0.875rem] font-semibold text-white transition-all hover:opacity-90 hover:shadow-md"
                  style={{
                    background: 'var(--color-deep)',
                    fontFamily: 'var(--font-display)',
                  }}
                >
                  Get Started
                </button>
                <button
                  onClick={() => handleNavClick('signup')}
                  className="px-5 py-2 rounded-xl text-[0.875rem] font-semibold transition-all hover:shadow-sm"
                  style={{
                    border: '1.5px solid var(--color-primary)',
                    color: 'var(--color-primary)',
                    fontFamily: 'var(--font-display)',
                  }}
                >
                  Post a Job
                </button>
              </>
            )}
          </div>

          {/* ── Mobile Hamburger (unauthenticated only) ── */}
          {!isAuthenticated && (
            <button
              className="md:hidden h-9 w-9 flex items-center justify-center rounded-xl text-[var(--color-deep)] hover:bg-[var(--color-neutral-50)] transition-all"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              aria-label={mobileMenuOpen ? 'Close menu' : 'Open menu'}
            >
              {mobileMenuOpen ? <X size={20} /> : <Menu size={20} />}
            </button>
          )}
        </div>

        {/* ── Mobile Dropdown ── */}
        {mobileMenuOpen && !isAuthenticated && (
          <div
            className="md:hidden absolute top-full left-0 w-full bg-white border-b border-[var(--color-border)] shadow-lg py-4 px-5 flex flex-col gap-1 z-50"
            style={{ boxShadow: 'var(--shadow-lg)' }}
          >
            {[
              { label: 'Services', action: () => handleNavClick('services') },
              { label: 'How It Works', action: () => {} },
              { label: 'Become a Provider', action: () => handleNavClick('signup') },
            ].map(({ label, action }) => (
              <button
                key={label}
                onClick={action}
                className="text-left px-3 py-2.5 rounded-xl text-[0.9375rem] font-semibold text-[var(--color-ink)] hover:bg-[var(--color-neutral-50)] transition-colors"
                style={{ fontFamily: 'var(--font-display)' }}
              >
                {label}
              </button>
            ))}

            <div className="h-px w-full my-2" style={{ background: 'var(--color-border)' }} />

            <button
              onClick={() => handleNavClick('login')}
              className="text-left px-3 py-2.5 rounded-xl text-[0.9375rem] font-semibold transition-colors"
              style={{ color: 'var(--color-deep)', fontFamily: 'var(--font-display)' }}
            >
              Log In
            </button>
            <button
              onClick={() => handleNavClick('signup')}
              className="w-full py-3 rounded-xl text-[0.9375rem] font-semibold text-white text-center transition-all hover:opacity-90"
              style={{ background: 'var(--color-deep)', fontFamily: 'var(--font-display)' }}
            >
              Get Started Free
            </button>
            <button
              onClick={() => handleNavClick('signup')}
              className="w-full py-3 rounded-xl text-[0.9375rem] font-semibold text-center transition-all"
              style={{
                border: '1.5px solid var(--color-primary)',
                color: 'var(--color-primary)',
                fontFamily: 'var(--font-display)',
              }}
            >
              Post a Job
            </button>
          </div>
        )}
      </nav>
    </>
  );
};
