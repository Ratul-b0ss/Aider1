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
          <label className="text-[10px] font-black text-deep-moss/40 uppercase tracking-[0.2em] px-4">
            {label}
          </label>
        )}
        <div className="relative group">
          <input
            ref={ref}
            className={cn(
              'w-full px-6 py-4 bg-white border-2 border-deep-moss/5 rounded-2xl font-bold text-deep-moss outline-none transition-all focus:border-primary focus:ring-4 focus:ring-primary/10 placeholder:text-deep-moss/20',
              error && 'border-red-500 focus:border-red-500 focus:ring-red-500/10',
              icon && 'pr-14',
              className
            )}
            {...props}
          />
          {icon && (
            <div className="absolute right-5 top-1/2 -translate-y-1/2 text-deep-moss/30 group-focus-within:text-primary transition-colors pointer-events-none">
              {icon}
            </div>
          )}
        </div>
        {error && (
          <span className="text-[10px] text-red-500 font-bold uppercase tracking-widest px-4 animate-in fade-in slide-in-from-top-1">
            {error}
          </span>
        )}
      </div>
    );
  }
);

Input.displayName = 'Input';
