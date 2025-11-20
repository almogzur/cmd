import { ServiceCalls } from '@prisma/client';
import React, { createContext, useContext, useState, ReactNode } from 'react';



interface DesktopSelectedCallContextType  {
  call: ServiceCalls | null;
  setCall: (call: ServiceCalls | null) => void;
}

const DesktopSelectedCallContext = createContext<DesktopSelectedCallContextType | undefined>(undefined);


export function DesktopSelectedCallProvider({ children }: { children: ReactNode }) {
  const [call, setCall] = useState<ServiceCalls | null>(null);

  return (
    <DesktopSelectedCallContext.Provider value={{call, setCall }}>
      {children}
    </DesktopSelectedCallContext.Provider>
  );
}


export function useDesktopSelectedCall() {
  const context = useContext(DesktopSelectedCallContext);
  if (!context) {
    throw new Error('useDesktopAdminSelectedCall must be used within a DesktopAdminSelectedCallProvider');
  }
  return context;
}