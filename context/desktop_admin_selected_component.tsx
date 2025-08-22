
'use client';

import React, { createContext, useContext, useState, ReactNode } from 'react';

// Define the shape of the context
interface DesktopAdminSelctedComponentContextType {
  SelectedComponent: ReactNode;
  setSelectedComponent: (page: ReactNode) => void;
}

// Create the context
const DesktopAdminComponentContext = createContext<DesktopAdminSelctedComponentContextType | undefined>(undefined);

// Provider component
export function DesktopAdminComponentProvider({ children }: { children: ReactNode }) {
    
  const [SelectedComponent, setSelectedComponent] = useState<ReactNode>(null);

  return (
    <DesktopAdminComponentContext.Provider value={{SelectedComponent, setSelectedComponent }}>
      {children}
    </DesktopAdminComponentContext.Provider>
  );
}

// Hook to use the context
export function useDesktopAdminComponent() {
  const context = useContext(DesktopAdminComponentContext);
  if (!context) {
    throw new Error('useDesktopAdminComponent must be used within an AdminComponentProvider');
  }
  return context;
}
