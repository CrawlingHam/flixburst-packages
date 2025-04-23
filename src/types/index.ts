/**
 * Type definition for the browser themes
 */
export declare type Theme = 'light' | 'dark' | 'system';

/**
 * Configuration options for the theme hook
 */
export declare type ThemeHookOptions = {
    onSystemThemeChange?: (isDark: boolean) => void;
    onThemeChange?: (theme: Theme) => void;
    initialTheme?: Theme;
};

/**
 * State and methods provided by the theme hook
 */
export declare type ThemeHookState = {
    setTheme: (theme: Theme) => void;
    initializeTheme: () => void;
    theme: Theme;
};

/**
 * Parameters for setting up theme management
 */
export declare type SetupThemeManagementParams = {
    onSystemThemeChange?: (isDark: boolean) => void;
    onThemeChange?: (theme: Theme) => void;
    setTheme: (theme: Theme) => void;
    initializeTheme: () => void;
};
