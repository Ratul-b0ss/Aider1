import React from 'react';
import { cn } from '../../lib/utils';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'ghost' | 'action' | 'outline' | 'danger';
  size?: 'sm' | 'md' | 'lg' | 'icon';
  isLoading?: boolean;
}

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant = 'primary', size = 'md', isLoading, children, ...props }, ref) => {
    const variants = {
      primary: 'bg-primary text-deep-moss border-2 border-primary hover:bg-deep-moss hover:text-white hover:border-deep-moss shadow-lg shadow-primary/20',
      ghost: 'bg-transparent border-2 border-white text-white hover:bg-white hover:text-deep-moss',
      action: 'bg-deep-moss text-white border-2 border-deep-moss hover:bg-primary hover:text-deep-moss hover:border-primary shadow-xl shadow-deep-moss/10',
      outline: 'bg-transparent border-2 border-deep-moss/10 text-deep-moss hover:bg-primary/10',
      danger: 'bg-red-50 text-red-500 border-2 border-red-100 hover:bg-red-500 hover:text-white hover:border-red-500',
    };

    const sizes = {
      sm: 'px-4 py-2 text-[10px]',
      md: 'px-8 py-4 text-xs',
      lg: 'px-12 py-5 text-sm',
      icon: 'w-12 h-12 p-0',
    };

    return (
      <button
        ref={ref}
        className={cn(
          'inline-flex items-center justify-center rounded-2xl font-black uppercase tracking-widest transition-all active:scale-95 disabled:opacity-50 disabled:pointer-events-none',
          variants[variant],
          sizes[size],
          className
        )}
        disabled={isLoading}
        {...props}
      >
        {isLoading ? (
          <div className="w-5 h-5 border-2 border-current border-t-transparent rounded-full animate-spin" />
        ) : (
          children
        )}
      </button>
    );
  }
);

Button.displayName = 'Button';
