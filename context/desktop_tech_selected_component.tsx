
'use client';

import React, { createContext, useContext, useState, ReactNode } from 'react';

// Define the shape of the context
interface DesktopTechSelctedComponentContextType {
  SelectedComponent: ReactNode;
  setSelectedComponent: (page: ReactNode) => void;
}

// Create the context
const DesktopTechComponentContext = createContext<DesktopTechSelctedComponentContextType | undefined>(undefined);

// Provider component
export function DesktopTechComponentProvider({ children }: { children: ReactNode }) {
    
  const [SelectedComponent, setSelectedComponent] = useState<ReactNode>(null);

  return (
    <DesktopTechComponentContext.Provider value={{SelectedComponent, setSelectedComponent }}>
      {children}
    </DesktopTechComponentContext.Provider>
  );
}

// Hook to use the context
export function useDesktopTechComponent() {
  const context = useContext(DesktopTechComponentContext);
  if (!context) {
    throw new Error('useDesktopAdminComponent must be used within an AdminComponentProvider');
  }
  return context;
}
