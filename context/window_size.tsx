// context/WindowSizeContext.tsx
import React, { createContext, useContext } from 'react';
import { useMediaQuery, useTheme } from '@mui/material';

interface WindowSizeContextProps {
  isMobile: boolean;
  isTablet: boolean;
  isDesktop: boolean;
}

const WindowSizeContext = createContext<WindowSizeContextProps | undefined>(undefined);

export const WindowSizeProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const theme = useTheme();
  
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  const isTablet = useMediaQuery(theme.breakpoints.between('sm', 'md'));
  const isDesktop = useMediaQuery(theme.breakpoints.up('md'));

  return (
    <WindowSizeContext.Provider value={{ isMobile, isTablet, isDesktop }}>
      {children}
    </WindowSizeContext.Provider>
  );
};

export const useWindowSize = (): WindowSizeContextProps => {
  const context = useContext(WindowSizeContext);
  if (!context) {
    throw new Error('useWindowSize must be used within a WindowSizeProvider');
  }
  return context;
};
