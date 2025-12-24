import { HTMLAttributes } from 'react';
import { cn } from '@/lib/utils';

export interface BadgeProps extends HTMLAttributes<HTMLSpanElement> {
    variant?: 'default' | 'success' | 'warning' | 'danger' | 'info';
    size?: 'sm' | 'md' | 'lg';
}

export const Badge = ({
                          children,
                          className,
                          variant = 'default',
                          size = 'md',
                          ...props
                      }: BadgeProps) => {
    const baseStyles =
        'inline-flex items-center justify-center font-medium rounded-full';

    const variants = {
        default:
            'bg-secondary-100 text-secondary-800 dark:bg-secondary-800 dark:text-secondary-100',
        success:
            'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-100',
        warning:
            'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-100',
        danger: 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-100',
        info: 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-100',
    };

    const sizes = {
        sm: 'px-2 py-0.5 text-xs',
        md: 'px-2.5 py-1 text-sm',
        lg: 'px-3 py-1.5 text-base',
    };

    return (
        <span
            className={cn(baseStyles, variants[variant], sizes[size], className)}
            {...props}
        >
      {children}
    </span>
    );
};