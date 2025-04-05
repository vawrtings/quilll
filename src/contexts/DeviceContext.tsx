
import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';

type DeviceType = 'mobile' | 'tablet' | 'laptop';

interface DeviceInfo {
  type: DeviceType;
  isMobile: boolean;
  isTablet: boolean;
  isLaptop: boolean;
  width: number;
}

const DeviceContext = createContext<DeviceInfo | undefined>(undefined);

export function DeviceProvider({ children }: { children: ReactNode }) {
  const [deviceInfo, setDeviceInfo] = useState<DeviceInfo>({
    type: 'laptop',
    isMobile: false,
    isTablet: false,
    isLaptop: true,
    width: typeof window !== 'undefined' ? window.innerWidth : 1200,
  });

  useEffect(() => {
    const handleResize = () => {
      const width = window.innerWidth;
      let type: DeviceType = 'laptop';
      
      // Check for user preference first
      const preferredDevice = localStorage.getItem("preferred-device");
      
      if (preferredDevice === 'mobile' || (!preferredDevice && width < 768)) {
        type = 'mobile';
      } else if (preferredDevice === 'tablet' || (!preferredDevice && width < 1024)) {
        type = 'tablet';
      } else {
        type = 'laptop';
      }
      
      setDeviceInfo({
        type,
        isMobile: type === 'mobile',
        isTablet: type === 'tablet',
        isLaptop: type === 'laptop',
        width,
      });
    };

    // Initial detection
    handleResize();
    
    // Add event listener
    window.addEventListener('resize', handleResize);
    
    // Clean up
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return (
    <DeviceContext.Provider value={deviceInfo}>
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
