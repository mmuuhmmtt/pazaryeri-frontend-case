import { create } from 'zustand';

interface UIState {
    isMobileMenuOpen: boolean;
    isFilterSidebarOpen: boolean;
    isSearchOpen: boolean;
    theme: 'light' | 'dark' | 'system';
}

interface UIActions {
    toggleMobileMenu: () => void;
    closeMobileMenu: () => void;
    toggleFilterSidebar: () => void;
    closeFilterSidebar: () => void;
    toggleSearch: () => void;
    closeSearch: () => void;
    setTheme: (theme: 'light' | 'dark' | 'system') => void;
    closeAll: () => void;
}

type UIStore = UIState & UIActions;

export const useUIStore = create<UIStore>((set) => ({
    // State
    isMobileMenuOpen: false,
    isFilterSidebarOpen: false,
    isSearchOpen: false,
    theme: 'system',

    // Actions
    toggleMobileMenu: () =>
        set((state) => ({ isMobileMenuOpen: !state.isMobileMenuOpen })),

    closeMobileMenu: () => set({ isMobileMenuOpen: false }),

    toggleFilterSidebar: () =>
        set((state) => ({ isFilterSidebarOpen: !state.isFilterSidebarOpen })),

    closeFilterSidebar: () => set({ isFilterSidebarOpen: false }),

    toggleSearch: () => set((state) => ({ isSearchOpen: !state.isSearchOpen })),

    closeSearch: () => set({ isSearchOpen: false }),

    setTheme: (theme) => {
        set({ theme });

        // Apply theme to document
        if (typeof window !== 'undefined') {
            const root = window.document.documentElement;
            root.classList.remove('light', 'dark');

            if (theme === 'system') {
                const systemTheme = window.matchMedia('(prefers-color-scheme: dark)')
                    .matches
                    ? 'dark'
                    : 'light';
                root.classList.add(systemTheme);
            } else {
                root.classList.add(theme);
            }
        }
    },

    closeAll: () =>
        set({
            isMobileMenuOpen: false,
            isFilterSidebarOpen: false,
            isSearchOpen: false,
        }),
}));