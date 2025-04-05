
import React, { createContext, useContext, ReactNode } from 'react';
import { useDevice } from '@/hooks/use-device';

type DeviceContextType = ReturnType<typeof useDevice>;

const DeviceContext = createContext<DeviceContextType | undefined>(undefined);

export function DeviceProvider({ children }: { children: ReactNode }) {
  const device = useDevice();
  
  return (
    <DeviceContext.Provider value={device}>
      {children}
    </DeviceContext.Provider>
  );
}

export function useDeviceContext() {
  const context = useContext(DeviceContext);
  if (context === undefined) {
    throw new Error('useDeviceContext must be used within a DeviceProvider');
  }
  return context;
}
