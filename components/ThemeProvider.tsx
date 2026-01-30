'use client';

import { createContext, useContext, useEffect, useState, useLayoutEffect, ReactNode } from 'react';

type Theme = 'light' | 'dark' | 'system';

interface ThemeContextType {
  theme: Theme;
  setTheme: (theme: Theme) => void;
  resolvedTheme: 'light' | 'dark';
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

// Apply theme to document
const applyTheme = (resolvedTheme: 'light' | 'dark') => {
  const html = document.documentElement;
  html.setAttribute('data-theme', resolvedTheme);
  html.style.colorScheme = resolvedTheme;
};

// Get initial theme from localStorage
const getInitialTheme = (): { theme: Theme; resolved: 'light' | 'dark' } => {
  if (typeof window === 'undefined') {
    return { theme: 'system', resolved: 'light' };
  }
  
  const saved = (localStorage.getItem('theme') as Theme) || 'system';
  
  const resolved = saved === 'system'
    ? window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light'
    : saved;
    
  return { theme: saved, resolved };
};

export function ThemeProvider({ children }: { children: ReactNode }) {
  const { theme: initialTheme, resolved: initialResolved } = getInitialTheme();
  
  const [theme, setThemeState] = useState<Theme>(initialTheme);
  const [resolvedTheme, setResolvedTheme] = useState<'light' | 'dark'>(initialResolved);

  // Apply theme on first render
  useLayoutEffect(() => {
    applyTheme(initialResolved);
  }, [initialResolved]);

  // Listen for system theme changes
  useEffect(() => {
    const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
    
    const handleChange = () => {
      if (theme === 'system') {
        const newResolved: 'light' | 'dark' = mediaQuery.matches ? 'dark' : 'light';
        setResolvedTheme(newResolved);
        applyTheme(newResolved);
      }
    };
    
    mediaQuery.addEventListener('change', handleChange);
    return () => mediaQuery.removeEventListener('change', handleChange);
  }, [theme]);

  const setTheme = (newTheme: Theme) => {
    setThemeState(newTheme);
    localStorage.setItem('theme', newTheme);
    
    // Determine resolved theme
    let resolved: 'light' | 'dark';
    if (newTheme === 'system') {
      resolved = window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
    } else {
      resolved = newTheme;
    }
    
    setResolvedTheme(resolved);
    applyTheme(resolved);
  };

  return (
    <ThemeContext.Provider value={{ theme, setTheme, resolvedTheme }}>
      {children}
    </ThemeContext.Provider>
  );
}

export function useTheme() {
  const context = useContext(ThemeContext);
  if (context === undefined) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
}
