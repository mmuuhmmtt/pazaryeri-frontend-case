import { cn } from '@/lib/utils';
import { ReactNode } from 'react';

export interface BadgeProps {
    children: ReactNode;
    variant?: 'default' | 'primary' | 'secondary' | 'success' | 'warning' | 'danger' | 'info';
    size?: 'sm' | 'md' | 'lg';
    className?: string;
}

export const Badge = ({
                          children,
                          variant = 'default',
                          size = 'md',
                          className,
                      }: BadgeProps) => {
    const baseStyles =
        'inline-flex items-center justify-center font-bold transition-all duration-300 rounded-lg hover:scale-110 hover:shadow-lg cursor-default animate-fade-in';

    const variants = {
        default:
            'bg-gradient-to-r from-secondary-100 to-secondary-200 text-secondary-800 dark:from-secondary-700 dark:to-secondary-800 dark:text-secondary-100',
        primary:
            'bg-gradient-to-r from-primary-500 to-primary-600 text-white shadow-glow-purple hover:from-primary-400 hover:to-primary-500',
        secondary:
            'bg-gradient-to-r from-secondary-500 to-secondary-600 text-white hover:from-secondary-400 hover:to-secondary-500',
        success: 'bg-gradient-to-r from-green-500 to-green-600 text-white hover:from-green-400 hover:to-green-500',
        warning:
            'bg-gradient-to-r from-yellow-500 to-yellow-600 text-white hover:from-yellow-400 hover:to-yellow-500',
        danger: 'bg-gradient-to-r from-red-500 to-red-600 text-white hover:from-red-400 hover:to-red-500 animate-glow-pulse',
        info: 'bg-gradient-to-r from-blue-500 to-blue-600 text-white hover:from-blue-400 hover:to-blue-500',
    };

    const sizes = {
        sm: 'px-2 py-0.5 text-xs',
        md: 'px-2.5 py-1 text-sm',
        lg: 'px-3 py-1.5 text-base',
    };

    return (
        <span className={cn(baseStyles, variants[variant], sizes[size], className)}>
            <span className="relative z-10">{children}</span>
        </span>
    );
};
