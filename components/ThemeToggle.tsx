'use client';

import { useState, useLayoutEffect } from 'react';

interface ThemeContextType {
  theme: 'light' | 'dark' | 'system';
  setTheme: (theme: 'light' | 'dark' | 'system') => void;
}

const getInitialTheme = (): 'light' | 'dark' | 'system' => {
  if (typeof window === 'undefined') {
    return 'system';
  }
  return (localStorage.getItem('theme') as 'light' | 'dark' | 'system') || 'system';
};

export default function ThemeToggle() {
  const [theme, setThemeState] = useState<'light' | 'dark' | 'system'>(getInitialTheme());
  const [isOpen, setIsOpen] = useState(false);
  const [themeContext, setThemeContext] = useState<ThemeContextType | null>(null);
  const [clientReady, setClientReady] = useState(false);

  // Load theme context on mount
  useLayoutEffect(() => {
    // Move all state updates to microtask queue to avoid cascading render warnings
    queueMicrotask(() => {
      // Try to find theme context from window (if ThemeProvider is active)
      const win = typeof window !== 'undefined' ? (window as unknown as Record<string, unknown>) : null;
      if (win?.__themeContext && typeof win.__themeContext === 'object') {
        const ctx = win.__themeContext as ThemeContextType;
        setThemeContext(ctx);
      }
      
      // Mark client ready
      setClientReady(true);
    });
  }, []);

  const currentTheme = themeContext?.theme ?? theme;
  const setTheme = themeContext?.setTheme ?? ((newTheme: 'light' | 'dark' | 'system') => {
    setThemeState(newTheme);
    if (typeof localStorage !== 'undefined') {
      localStorage.setItem('theme', newTheme);
    }
  });

  if (!clientReady) {
    return (
      <button
        className="p-2 rounded-lg text-foreground hover:bg-surface transition-colors"
        aria-label="Toggle theme"
        disabled
      >
        <span>🖥️</span>
      </button>
    );
  }

  const themes = [
    { value: 'light' as const, label: 'Light', icon: '☀️' },
    { value: 'dark' as const, label: 'Dark', icon: '🌙' },
    { value: 'system' as const, label: 'System', icon: '🖥️' },
  ];

  return (
    <div className="relative">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="p-2 rounded-lg text-foreground hover:bg-surface transition-colors"
        aria-label="Toggle theme"
        title={`Current theme: ${currentTheme}`}
      >
        {currentTheme === 'light' && <span>☀️</span>}
        {currentTheme === 'dark' && <span>🌙</span>}
        {currentTheme === 'system' && <span>🖥️</span>}
      </button>

      {isOpen && (
        <div className="absolute right-0 mt-2 w-40 bg-surface border border-border rounded-lg shadow-lg z-50">
          {themes.map((t) => (
            <button
              key={t.value}
              onClick={() => {
                setTheme(t.value);
                setIsOpen(false);
              }}
              className={`w-full px-4 py-2.5 text-left text-sm font-medium transition-colors flex items-center gap-2 ${
                currentTheme === t.value
                  ? 'bg-primary text-white'
                  : 'text-foreground hover:bg-surface'
              } ${t.value === 'light' && 'rounded-t-lg'} ${t.value === 'system' && 'rounded-b-lg'}`}
            >
              <span>{t.icon}</span>
              {t.label}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
