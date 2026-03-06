import React from 'react';
import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const Hexagon = ({ className, children }: { className?: string; children?: React.ReactNode }) => (
  <div className={cn("hexagon flex items-center justify-center", className)}>
    {children}
  </div>
);

export const Card = ({ className, children, angled = false }: { className?: string; children?: React.ReactNode; angled?: boolean }) => (
  <div className={cn(
    "bg-white border border-stone-200 p-6 shadow-sm",
    angled ? "angled-card" : "rounded-3xl",
    className
  )}>
    {children}
  </div>
);

export const Button = ({ 
  className, 
  variant = 'primary', 
  children, 
  ...props 
}: React.ButtonHTMLAttributes<HTMLButtonElement> & { variant?: 'primary' | 'secondary' | 'ghost' }) => {
  const variants = {
    primary: "bg-primary text-white hover:bg-primary-dark shadow-lg shadow-primary/20",
    secondary: "bg-interactive-surface text-text-main hover:bg-stone-100",
    ghost: "bg-transparent text-stone-500 hover:bg-interactive-surface",
  };

  return (
    <button 
      className={cn(
        "px-5 py-2.5 rounded-xl font-semibold text-sm transition-all flex items-center justify-center gap-2 disabled:opacity-50 cursor-pointer",
        variants[variant],
        className
      )}
      {...props}
    >
      {children}
    </button>
  );
};
