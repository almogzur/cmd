import { ServiceCalls } from '@prisma/client';
import React, { createContext, useContext, useState, ReactNode } from 'react';



interface DesktopAdminSelectedCallContextType  {
  call: ServiceCalls | null;
  setCall: (call: ServiceCalls | null) => void;
}

const DesktopAdminSelectedCallContext = createContext<DesktopAdminSelectedCallContextType | undefined>(undefined);


export function DesktopAdminSelectedCallProvider({ children }: { children: ReactNode }) {
  const [call, setCall] = useState<ServiceCalls | null>(null);

  return (
    <DesktopAdminSelectedCallContext.Provider value={{call, setCall }}>
      {children}
    </DesktopAdminSelectedCallContext.Provider>
  );
}


export function useDesktopAdminSelectedCall() {
  const context = useContext(DesktopAdminSelectedCallContext);
  if (!context) {
    throw new Error('useDesktopAdminSelectedCall must be used within a DesktopAdminSelectedCallProvider');
  }
  return context;
}