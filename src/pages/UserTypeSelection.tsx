
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { BookOpen, PenTool } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";

const UserTypeSelection = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  
  const selectUserType = (userType: "reader" | "writer") => {
    localStorage.setItem("user-type", userType);
    
    toast({
      title: `${userType.charAt(0).toUpperCase() + userType.slice(1)} mode activated`,
      description: userType === "writer" ? "You can now create and publish content." : "You can now explore content created by writers.",
    });
    
    // Navigate to auth if writer, or home if reader
    if (userType === "writer") {
      // Writers need to sign in before they can post
      const isLoggedIn = localStorage.getItem("quill-logged-in") === "true";
      navigate(isLoggedIn ? "/" : "/auth");
    } else {
      navigate("/");
    }
  };
  
  useEffect(() => {
    // Check if user has already selected a device
    const deviceSelected = localStorage.getItem("device-selected");
    
    // If no device selected yet, redirect to device selection
    if (!deviceSelected) {
      navigate("/select-device");
    }
    
    // If user type already selected, redirect to home
    if (localStorage.getItem("user-type")) {
      navigate("/");
    }
  }, [navigate]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-parchment dark:bg-ink p-4">
      <div className="max-w-md w-full bg-white dark:bg-ink-dark rounded-lg shadow-lg p-8 text-center">
        <h1 className="text-2xl font-playfair font-bold text-ink dark:text-parchment mb-6">
          How will you use Quill?
        </h1>
        
        <p className="text-ink/80 dark:text-parchment/80 mb-8">
          Choose your role in the Quill community:
        </p>
        
        <div className="grid grid-cols-2 gap-6">
          <Button
            variant="outline"
            className="flex flex-col items-center p-6 h-auto"
            onClick={() => selectUserType("reader")}
          >
            <BookOpen className="h-12 w-12 mb-3" />
            <span className="text-lg font-handwriting">Reader</span>
            <p className="text-xs mt-2 text-ink/60 dark:text-parchment/60">
              Discover and read content
            </p>
          </Button>
          
          <Button
            variant="outline"
            className="flex flex-col items-center p-6 h-auto"
            onClick={() => selectUserType("writer")}
          >
            <PenTool className="h-12 w-12 mb-3" />
            <span className="text-lg font-handwriting">Writer</span>
            <p className="text-xs mt-2 text-ink/60 dark:text-parchment/60">
              Create and publish content
            </p>
          </Button>
        </div>
        
        <p className="mt-8 text-xs text-ink/60 dark:text-parchment/60">
          Writers will need to sign in to publish content.
          You can change your role anytime in settings.
        </p>
      </div>
    </div>
  );
};

export default UserTypeSelection;
