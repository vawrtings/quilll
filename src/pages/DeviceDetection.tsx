
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Smartphone, Tablet, Monitor } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useDeviceContext } from "@/contexts/DeviceContext";

const DeviceDetection = () => {
  const navigate = useNavigate();
  const deviceInfo = useDeviceContext();
  
  const selectDevice = (deviceType: string) => {
    localStorage.setItem("preferred-device", deviceType);
    navigate("/");
  };
  
  useEffect(() => {
    // If user already selected a device preference, redirect to home
    const preferredDevice = localStorage.getItem("preferred-device");
    if (preferredDevice) {
      navigate("/");
    }
  }, [navigate]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-parchment dark:bg-ink p-4">
      <div className="max-w-md w-full bg-white dark:bg-ink-dark rounded-lg shadow-lg p-8 text-center">
        <h1 className="text-2xl font-playfair font-bold text-ink dark:text-parchment mb-6">
          Welcome to Quill
        </h1>
        
        <p className="text-ink/80 dark:text-parchment/80 mb-8">
          How would you like to experience Quill? Choose your preferred device view:
        </p>
        
        <div className="grid grid-cols-3 gap-4">
          <Button
            variant="outline"
            className="flex flex-col items-center p-4 h-auto"
            onClick={() => selectDevice("mobile")}
          >
            <Smartphone className="h-10 w-10 mb-2" />
            <span>Mobile</span>
          </Button>
          
          <Button
            variant="outline"
            className="flex flex-col items-center p-4 h-auto"
            onClick={() => selectDevice("tablet")}
          >
            <Tablet className="h-10 w-10 mb-2" />
            <span>Tablet</span>
          </Button>
          
          <Button
            variant="outline" 
            className="flex flex-col items-center p-4 h-auto"
            onClick={() => selectDevice("laptop")}
          >
            <Monitor className="h-10 w-10 mb-2" />
            <span>Desktop</span>
          </Button>
        </div>
        
        <p className="mt-8 text-xs text-ink/60 dark:text-parchment/60">
          We'll automatically adapt to your device, but you can change this preference anytime.
        </p>
      </div>
    </div>
  );
};

export default DeviceDetection;
