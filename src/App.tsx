
import { useState, useEffect } from "react";
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { ThemeProvider } from "next-themes";
import { DeviceProvider } from "@/contexts/DeviceContext";
import SplashScreen from "./components/UI/SplashScreen";
import Index from "./pages/Index";
import Auth from "./pages/Auth";
import Explore from "./pages/Explore";
import Upload from "./pages/Upload";
import NotFound from "./pages/NotFound";
import Profile from "./pages/Profile";
import DeviceDetection from "./pages/DeviceDetection";
import DeviceSelection from "./pages/DeviceSelection";

const queryClient = new QueryClient();

const App = () => {
  const [showSplash, setShowSplash] = useState(true);
  
  // Check if this is user's first visit
  const isFirstVisit = !localStorage.getItem("device-selected");

  return (
    <QueryClientProvider client={queryClient}>
      <ThemeProvider attribute="class" defaultTheme="light" enableSystem>
        <DeviceProvider>
          <TooltipProvider>
            <Toaster />
            <Sonner />
            <BrowserRouter>
              {showSplash ? (
                <SplashScreen 
                  duration={3500} 
                  onComplete={() => setShowSplash(false)} 
                />
              ) : (
                <Routes>
                  <Route path="/" element={isFirstVisit ? <Navigate to="/select-device" /> : <Index />} />
                  <Route path="/select-device" element={<DeviceSelection />} />
                  <Route path="/auth" element={<Auth />} />
                  <Route path="/explore" element={<Explore />} />
                  <Route path="/explore/:categoryParam" element={<Explore />} />
                  <Route path="/upload" element={<Upload />} />
                  <Route path="/profile" element={<Profile />} />
                  <Route path="/device" element={<DeviceDetection />} />
                  {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
                  <Route path="*" element={<NotFound />} />
                </Routes>
              )}
            </BrowserRouter>
          </TooltipProvider>
        </DeviceProvider>
      </ThemeProvider>
    </QueryClientProvider>
  );
};

export default App;
