import { SetupThemeManagementParams, Theme } from '../types';

/**
 * Gets the current system theme preference from the user's OS settings
 * @returns {boolean} true if the system prefers dark mode, false if light mode
 * @example
 * ```ts
 * const prefersDark = getSystemThemePreference();
 * if (prefersDark) {
 *   console.log('System prefers dark mode');
 * }
 * ```
 */
export const getSystemThemePreference = (): boolean => {
    return window.matchMedia('(prefers-color-scheme: dark)').matches;
};

/**
 * Determines if dark mode should be active based on the current theme setting
 * @param theme - The theme setting to check ('dark' | 'light' | 'system')
 * @returns {boolean} true if dark mode should be active, false otherwise
 * @example
 * ```ts
 * const shouldDark = shouldUseDarkMode('system'); // Returns true if system prefers dark
 * const shouldDark = shouldUseDarkMode('dark');   // Always returns true
 * const shouldDark = shouldUseDarkMode('light');  // Always returns false
 * ```
 */
export const shouldUseDarkMode = (theme: Theme): boolean => {
    return theme === 'dark' || (theme === 'system' && getSystemThemePreference());
};

/**
 * Applies the specified theme to the DOM by adding/removing classes and attributes
 * @param isDark - Whether to apply dark mode (true) or light mode (false)
 * @example
 * ```ts
 * applyThemeToDOM(true);  // Applies dark theme
 * applyThemeToDOM(false); // Applies light theme
 * ```
 */
export const applyThemeToDOM = (isDark: boolean): void => {
    const html = document.documentElement;
    if (isDark) {
        html.classList.add('dark');
        html.setAttribute('data-theme', 'dark');
    } else {
        html.classList.remove('dark');
        html.setAttribute('data-theme', 'light');
    }
};

/**
 * Sets the theme in localStorage and applies it to the DOM
 * @param theme - The theme to set ('dark' | 'light' | 'system')
 * @example
 * ```ts
 * setTheme('dark');   // Sets and applies dark theme
 * setTheme('light');  // Sets and applies light theme
 * setTheme('system'); // Sets theme to follow system preference
 * ```
 */
export const setTheme = (theme: Theme): void => {
    localStorage.setItem('theme', theme);
    const isDark = shouldUseDarkMode(theme);
    applyThemeToDOM(isDark);
};

/**
 * Initializes the theme from localStorage or falls back to system preference
 * @returns {Theme} The initialized theme ('dark' | 'light' | 'system')
 * @example
 * ```ts
 * const theme = initializeTheme();
 * console.log(`Current theme: ${theme}`);
 * ```
 */
export const initializeTheme = (): Theme => {
    const savedTheme = localStorage.getItem('theme') as Theme | null;
    const theme = savedTheme || 'system';
    const isDark = shouldUseDarkMode(theme);
    applyThemeToDOM(isDark);
    return theme;
};

/**
 * Subscribes to system theme changes and calls the provided callback when changes occur
 * @param callback - Function to call when system theme changes, receives boolean indicating if dark mode is active
 * @returns {() => void} Cleanup function to remove the event listener
 * @example
 * ```ts
 * const unsubscribe = subscribeToSystemTheme((isDark) => {
 *   console.log(`System theme changed to: ${isDark ? 'dark' : 'light'}`);
 * });
 *
 * // Later, to cleanup:
 * unsubscribe();
 * ```
 */
export const subscribeToSystemTheme = (callback: (isDark: boolean) => void): (() => void) => {
    const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
    const handler = (e: MediaQueryListEvent): void => {
        callback(e.matches);
        // Apply theme when system preference changes
        const theme = (localStorage.getItem('theme') as Theme) || 'system';
        if (theme === 'system') {
            applyThemeToDOM(e.matches);
        }
    };
    mediaQuery.addEventListener('change', handler);
    return () => mediaQuery.removeEventListener('change', handler);
};

/**
 * Sets up theme initialization, system theme subscription, and storage synchronization.
 * Accepts callbacks for theme changes and system theme changes.
 * Returns a cleanup function to remove event listeners.
 *
 * @param setTheme - Function to set the application's theme state.
 * @param initializeTheme - Function to initialize the theme from storage or system preference.
 * @param onThemeChange - Optional callback function called when the theme changes.
 * @param onSystemThemeChange - Optional callback function called when the system theme changes.
 * @returns {() => void} Cleanup function to remove event listeners.
 */
export const setupThemeManagement = (params: SetupThemeManagementParams): (() => void) => {
    const { setTheme, initializeTheme, onThemeChange, onSystemThemeChange } = params;

    // Initialize theme
    initializeTheme();

    // Subscribe to system theme changes
    const cleanupSystemTheme = subscribeToSystemTheme((isDark: boolean): void => {
        onSystemThemeChange?.(isDark);
    });

    // Listen for theme toggle events
    const handleThemeToggle = (event: CustomEvent<Theme>): void => {
        if (event.detail) {
            setTheme(event.detail);
            onThemeChange?.(event.detail);
        } else {
            // If no theme provided, get it from localStorage
            const storedTheme = localStorage.getItem('theme') as Theme | null;
            const theme = storedTheme || 'system';
            setTheme(theme);
            onThemeChange?.(theme);
        }
    };

    // Listen for storage changes to sync theme across tabs
    const handleStorageChange = (event: StorageEvent): void => {
        if (event.key === 'theme' && event.newValue) {
            const newTheme = event.newValue as Theme;
            setTheme(newTheme);
            onThemeChange?.(newTheme);
        }
    };

    window.addEventListener('theme-toggle', handleThemeToggle as EventListener);
    window.addEventListener('storage', handleStorageChange);

    const cleanupEventListeners = (): void => {
        window.removeEventListener('theme-toggle', handleThemeToggle as EventListener);
        window.removeEventListener('storage', handleStorageChange);
    };

    return () => {
        cleanupSystemTheme();
        cleanupEventListeners();
    };
};
