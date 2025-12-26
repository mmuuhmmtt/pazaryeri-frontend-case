'use client';

import { useEffect } from 'react';
import { useUIStore } from '@/store/useUIStore';

export function ThemeProvider({ children }: { children: React.ReactNode }) {
    const { theme, setTheme } = useUIStore();

    // Initialize theme from localStorage on mount
    useEffect(() => {
        const storedTheme = localStorage.getItem('theme') as 'light' | 'dark' | 'system' | null;
        if (storedTheme) {
            setTheme(storedTheme);
        } else {
            // First time - set to dark
            setTheme('dark');
        }
    }, [setTheme]);

    // Apply theme changes
    useEffect(() => {
        const root = document.documentElement;
        root.classList.remove('light', 'dark');
        
        if (theme === 'system') {
            const systemTheme = window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
            root.classList.add(systemTheme);
        } else {
            root.classList.add(theme);
        }
        
        localStorage.setItem('theme', theme);
    }, [theme]);

    return <>{children}</>;
}

