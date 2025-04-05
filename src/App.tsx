
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { ThemeProvider } from "next-themes";
import { DeviceProvider } from "@/contexts/DeviceContext";
import Index from "./pages/Index";
import Auth from "./pages/Auth";
import Explore from "./pages/Explore";
import Upload from "./pages/Upload";
import NotFound from "./pages/NotFound";
import Profile from "./pages/Profile";
import DeviceDetection from "./pages/DeviceDetection";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <ThemeProvider attribute="class">
      <DeviceProvider>
        <TooltipProvider>
          <Toaster />
          <Sonner />
          <BrowserRouter>
            <Routes>
              <Route path="/" element={<Index />} />
              <Route path="/auth" element={<Auth />} />
              <Route path="/explore" element={<Explore />} />
              <Route path="/upload" element={<Upload />} />
              <Route path="/profile" element={<Profile />} />
              <Route path="/device" element={<DeviceDetection />} />
              {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
              <Route path="*" element={<NotFound />} />
            </Routes>
          </BrowserRouter>
        </TooltipProvider>
      </DeviceProvider>
    </ThemeProvider>
  </QueryClientProvider>
);

export default App;
