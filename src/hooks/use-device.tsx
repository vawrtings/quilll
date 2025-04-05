
import { useState, useEffect } from "react";

type DeviceType = 'mobile' | 'tablet' | 'laptop';

interface DeviceInfo {
  type: DeviceType;
  isMobile: boolean;
  isTablet: boolean;
  isLaptop: boolean;
  width: number;
}

export function useDevice(): DeviceInfo {
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
      
      if (width < 768) {
        type = 'mobile';
      } else if (width < 1024) {
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

  return deviceInfo;
}
