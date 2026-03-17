import React from 'react';
import { cn } from '../../lib/utils';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'ghost' | 'action' | 'outline' | 'danger';
  size?: 'sm' | 'md' | 'lg' | 'icon';
  isLoading?: boolean;
}

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant = 'primary', size = 'md', isLoading, children, ...props }, ref) => {
    const base = [
      'inline-flex items-center justify-center gap-2 font-semibold rounded-xl',
      'transition-all duration-150 active:scale-[0.97] disabled:opacity-50 disabled:pointer-events-none',
      'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2',
    ].join(' ');

    const variants = {
      primary: [
        'bg-[var(--color-deep)] text-white border border-[var(--color-deep)]',
        'hover:bg-[var(--color-deep-hover)] hover:border-[var(--color-deep-hover)] hover:shadow-md',
        'focus-visible:ring-[var(--color-deep)]',
      ].join(' '),

      action: [
        'bg-[var(--color-primary)] text-white border border-[var(--color-primary)]',
        'hover:bg-[var(--color-primary-hover)] hover:border-[var(--color-primary-hover)] hover:shadow-md',
        'focus-visible:ring-[var(--color-primary)]',
      ].join(' '),

      ghost: [
        'bg-transparent text-[var(--color-deep)] border border-[var(--color-border)]',
        'hover:bg-[var(--color-neutral-50)] hover:border-[var(--color-neutral-300)]',
        'focus-visible:ring-[var(--color-deep)]',
      ].join(' '),

      outline: [
        'bg-transparent text-[var(--color-ink)] border border-[var(--color-border)]',
        'hover:bg-[var(--color-neutral-50)] hover:border-[var(--color-neutral-300)]',
        'focus-visible:ring-[var(--color-ink)]',
      ].join(' '),

      danger: [
        'bg-red-50 text-red-600 border border-red-100',
        'hover:bg-red-500 hover:text-white hover:border-red-500 hover:shadow-md',
        'focus-visible:ring-red-400',
      ].join(' '),
    };

    const sizes = {
      sm:   'px-3.5 py-2 text-xs',
      md:   'px-5 py-2.5 text-sm',
      lg:   'px-7 py-3.5 text-sm',
      icon: 'w-10 h-10 p-0',
    };

    return (
      <button
        ref={ref}
        className={cn(base, variants[variant], sizes[size], className)}
        style={{ fontFamily: 'var(--font-display)' } as React.CSSProperties}
        disabled={isLoading}
        {...props}
      >
        {isLoading ? (
          <div className="w-4 h-4 border-2 border-current border-t-transparent rounded-full animate-spin" />
        ) : (
          children
        )}
      </button>
    );
  }
);

Button.displayName = 'Button';
