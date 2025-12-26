import { ButtonHTMLAttributes, forwardRef } from 'react';
import { cn } from '@/lib/utils';

export interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
    variant?: 'primary' | 'secondary' | 'outline' | 'ghost' | 'danger';
    size?: 'sm' | 'md' | 'lg';
    isLoading?: boolean;
    leftIcon?: React.ReactNode;
    rightIcon?: React.ReactNode;
}

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
    (
        {
            children,
            className,
            variant = 'primary',
            size = 'md',
            isLoading = false,
            leftIcon,
            rightIcon,
            disabled,
            ...props
        },
        ref
    ) => {
        const baseStyles =
            'inline-flex items-center justify-center font-medium transition-all duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 active:scale-95 relative overflow-hidden group';

        const variants = {
            primary:
                'bg-gradient-to-r from-primary-600 to-primary-700 text-white hover:from-primary-500 hover:to-primary-600 hover:shadow-glow-purple hover:scale-105 focus-visible:ring-primary-500',
            secondary:
                'bg-gradient-to-r from-secondary-600 to-secondary-700 text-white hover:from-secondary-500 hover:to-secondary-600 hover:shadow-lg hover:scale-105 focus-visible:ring-secondary-500',
            outline:
                'border-2 border-primary-600 text-primary-600 hover:bg-primary-50 dark:hover:bg-primary-950 hover:border-primary-500 hover:scale-105 hover:shadow-glow-purple focus-visible:ring-primary-500',
            ghost:
                'text-secondary-700 dark:text-secondary-300 hover:bg-secondary-100 dark:hover:bg-secondary-800 hover:scale-105 focus-visible:ring-secondary-500',
            danger:
                'bg-gradient-to-r from-red-600 to-red-700 text-white hover:from-red-500 hover:to-red-600 hover:shadow-lg hover:scale-105 focus-visible:ring-red-500',
        };

        const sizes = {
            sm: 'h-9 px-3 text-sm rounded-md gap-1.5',
            md: 'h-10 px-4 text-base rounded-lg gap-2',
            lg: 'h-12 px-6 text-lg rounded-lg gap-2',
        };

        return (
            <button
                ref={ref}
                className={cn(
                    baseStyles,
                    variants[variant],
                    sizes[size],
                    className
                )}
                disabled={disabled || isLoading}
                {...props}
            >
                {/* Shine effect on hover */}
                <span className="absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/20 to-transparent transition-transform duration-500 group-hover:translate-x-full" />
                
                <span className="relative z-10 flex items-center gap-2">
                    {isLoading ? (
                        <>
                            <svg
                                className="h-4 w-4 animate-spin"
                                xmlns="http://www.w3.org/2000/svg"
                                fill="none"
                                viewBox="0 0 24 24"
                            >
                                <circle
                                    className="opacity-25"
                                    cx="12"
                                    cy="12"
                                    r="10"
                                    stroke="currentColor"
                                    strokeWidth="4"
                                />
                                <path
                                    className="opacity-75"
                                    fill="currentColor"
                                    d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                                />
                            </svg>
                            <span>Loading...</span>
                        </>
                    ) : (
                        <>
                            {leftIcon && <span className="flex-shrink-0">{leftIcon}</span>}
                            {children}
                            {rightIcon && <span className="flex-shrink-0">{rightIcon}</span>}
                        </>
                    )}
                </span>
            </button>
        );
    }
);

Button.displayName = 'Button';
