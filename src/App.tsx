
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
import DeviceSelection from "./pages/DeviceSelection";
import UserTypeSelection from "./pages/UserTypeSelection";

const queryClient = new QueryClient();

const App = () => {
  const [showSplash, setShowSplash] = useState(true);
  
  // Check if this is user's first visit
  const isFirstVisit = !localStorage.getItem("device-selected");
  const userTypeSelected = localStorage.getItem("user-type");

  // Determine initial route based on setup completion
  const getInitialRoute = () => {
    if (!localStorage.getItem("device-selected")) {
      return <Navigate to="/select-device" />;
    } else if (!localStorage.getItem("user-type")) {
      return <Navigate to="/select-user-type" />;
    } else {
      return <Index />;
    }
  };

  useEffect(() => {
    console.log("App mounted, checking setup status:");
    console.log("Device selected:", localStorage.getItem("device-selected"));
    console.log("User type:", localStorage.getItem("user-type"));
  }, []);

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
                  onComplete={() => {
                    console.log("Splash screen completed");
                    setShowSplash(false);
                  }} 
                />
              ) : (
                <Routes>
                  <Route path="/" element={getInitialRoute()} />
                  <Route path="/select-device" element={<DeviceSelection />} />
                  <Route path="/select-user-type" element={<UserTypeSelection />} />
                  <Route path="/auth" element={<Auth />} />
                  <Route path="/explore" element={<Explore />} />
                  <Route path="/explore/:categoryParam" element={<Explore />} />
                  <Route path="/upload" element={<Upload />} />
                  <Route path="/profile" element={<Profile />} />
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
