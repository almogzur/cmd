'use client';

import React, { createContext, useContext, useEffect, useLayoutEffect } from 'react';
import { grey } from '@mui/material/colors';

interface ThemeContextProps {
  isDarkMode: boolean;
  toggleTheme: () => void;
  bgColor: string;
  textColor: string;
}

export const ThemeContext = createContext<ThemeContextProps | undefined>(undefined);

const STORAGE_KEY = 'CMD-theme'; // 'dark' | 'light'

export const ThemeContextProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [mounted, setMounted] = React.useState(false);
  const [isDarkMode, setIsDarkMode] = React.useState<boolean>(false);

  // Read saved theme ASAP on the client, before first paint of children
  useLayoutEffect(() => {
    try {
      const saved = window.localStorage.getItem(STORAGE_KEY);
      if (saved === 'dark') setIsDarkMode(true);
      else if (saved === 'light') setIsDarkMode(false);
      else setIsDarkMode(window.matchMedia?.('(prefers-color-scheme: dark)').matches ?? false);
    } catch {
      // ignore
    } finally {
      setMounted(true);
    }
  }, []);

  // Persist on change
  useEffect(() => {
    try {
      window.localStorage.setItem(STORAGE_KEY, isDarkMode ? 'dark' : 'light');
    } catch {
      // ignore
    }
  }, [isDarkMode]);

  const dark = grey[900];
  const light = '#ffffffff'; // (this is white with full alpha; #fff is fine too)
  const bgColor = isDarkMode ? dark : light;
  const textColor = isDarkMode ? 'white' : 'black';

  const toggleTheme = () => setIsDarkMode((p) => !p);

  // Avoid rendering children until theme is known (prevents “flash” + mismatch)
  if (!mounted) return null;

  return (
    <ThemeContext.Provider value={{ isDarkMode, toggleTheme, bgColor, textColor }}>
      {children}
    </ThemeContext.Provider>
  );
};

export const useThemeContext = () => {
  const ctx = useContext(ThemeContext);
  if (!ctx) throw new Error('useThemeContext must be used within a ThemeContextProvider');
  return ctx;
};
