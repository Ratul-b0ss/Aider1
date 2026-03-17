import React from 'react';
import { cn } from '../../lib/utils';

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
  icon?: React.ReactNode;
}

export const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, label, error, icon, ...props }, ref) => {
    return (
      <div className="w-full flex flex-col gap-1.5">
        {label && (
          <label
            className="text-xs font-semibold px-1"
            style={{ color: 'var(--color-ink-muted)', fontFamily: 'var(--font-display)' }}
          >
            {label}
          </label>
        )}
        <div className="relative group">
          <input
            ref={ref}
            className={cn(
              'w-full px-4 py-3 text-sm font-medium rounded-xl outline-none transition-all',
              'placeholder:text-[var(--color-neutral-400)]',
              error
                ? 'border-red-400 focus:border-red-500 focus:ring-2 focus:ring-red-500/15'
                : 'border-[var(--color-border)] focus:border-[var(--color-primary)] focus:ring-2 focus:ring-[var(--color-primary)]/12',
              icon && 'pr-12',
              className
            )}
            style={{
              background: 'var(--color-neutral-50)',
              border: `1.5px solid ${error ? '#f87171' : 'var(--color-border)'}`,
              color: 'var(--color-ink)',
              fontFamily: 'var(--font-sans)',
            }}
            {...props}
          />
          {icon && (
            <div
              className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none transition-colors"
              style={{ color: 'var(--color-neutral-400)' }}
            >
              {icon}
            </div>
          )}
        </div>
        {error && (
          <span
            className="text-xs px-1"
            style={{ color: '#DC2626', fontFamily: 'var(--font-display)' }}
          >
            {error}
          </span>
        )}
      </div>
    );
  }
);

Input.displayName = 'Input';
