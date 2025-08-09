'use client';

import React, { createContext, useContext, useState, ReactNode } from 'react';

// Define the shape of the context
interface AdminSelctedComponentContextType {
  SelectedComponent: ReactNode;
  setSelectedComponent: (page: ReactNode) => void;
}

// Create the context
const MobileAdminComponentContext = createContext<AdminSelctedComponentContextType | undefined>(undefined);

// Provider component
export function MobileAdminComponentProvider({ children }: { children: ReactNode }) {
    
  const [SelectedComponent, setSelectedComponent] = useState<ReactNode>(null);

  return (
    <MobileAdminComponentContext.Provider value={{SelectedComponent, setSelectedComponent }}>
      {children}
    </MobileAdminComponentContext.Provider>
  );
}

// Hook to use the context
export function useMobileAdminComponent() {
  const context = useContext(MobileAdminComponentContext);
  if (!context) {
    throw new Error('useMobileAdminComponent must be used within an AdminPageProvider');
  }
  return context;
}
