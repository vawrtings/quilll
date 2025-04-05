
import { useState, useEffect } from "react";
import Navbar from "@/components/Layout/Navbar";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import ProfileSection from "@/components/Profile/ProfileSection";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Edit, Settings, Bookmark, BookMarked } from "lucide-react";

const Profile = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [loading, setLoading] = useState(true);
  const { toast } = useToast();

  useEffect(() => {
    // Check if user is logged in - in a real app, this would validate with Supabase
    const checkLoginStatus = async () => {
      // For now, just simulate login status
      const loggedIn = localStorage.getItem("quill-logged-in") === "true";
      setIsLoggedIn(loggedIn);
      setLoading(false);
      
      if (!loggedIn) {
        toast({
          title: "Not logged in",
          description: "Please log in to view and edit your profile",
        });
      }
    };
    
    checkLoginStatus();
  }, [toast]);

  if (loading) {
    return (
      <div className="min-h-screen bg-parchment dark:bg-ink">
        <Navbar />
        <div className="flex justify-center items-center h-[80vh]">
          <div className="animate-pulse text-2xl text-ink/50 dark:text-parchment/50 font-handwriting">
            Loading profile...
          </div>
        </div>
      </div>
    );
  }

  if (!isLoggedIn) {
    return (
      <div className="min-h-screen bg-parchment dark:bg-ink">
        <Navbar />
        <div className="max-w-3xl mx-auto px-4 py-16 text-center">
          <h1 className="text-3xl font-playfair font-bold text-ink dark:text-parchment mb-4">
            Profile not available
          </h1>
          <p className="text-lg text-ink/70 dark:text-parchment/70 mb-8">
            Please log in to view and edit your profile
          </p>
          <Button
            onClick={() => window.location.href = "/auth"}
            className="bg-ink text-parchment hover:bg-ink-light dark:bg-parchment dark:text-ink dark:hover:bg-parchment-dark"
          >
            Sign In
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-parchment dark:bg-ink text-ink dark:text-parchment">
      <Navbar />
      
      <ProfileSection 
        username="yourname"
        displayName="Your Name"
        bio="Writer, dreamer, and storyteller. I craft worlds with words and find magic in the mundane."
        location="Literary Land"
        website="yourwebsite.com"
        twitter="yourtwitter"
        instagram="yourinsta"
        joinDate="April 2025"
        followers={0}
        following={0}
        publications={0}
      />
      
      <main className="max-w-5xl mx-auto px-4 py-8">
        <div className="flex justify-end mb-6">
          <Button variant="outline" className="flex items-center mr-2">
            <Settings className="h-4 w-4 mr-2" />
            Settings
          </Button>
          <Button className="flex items-center bg-ink text-parchment hover:bg-ink-light dark:bg-parchment dark:text-ink">
            <Edit className="h-4 w-4 mr-2" />
            Edit Profile
          </Button>
        </div>
        
        <Tabs defaultValue="publications">
          <TabsList className="mb-8">
            <TabsTrigger value="publications">Publications</TabsTrigger>
            <TabsTrigger value="saved">Saved</TabsTrigger>
            <TabsTrigger value="drafts">Drafts</TabsTrigger>
          </TabsList>
          
          <TabsContent value="publications" className="mt-0">
            <div className="bg-white dark:bg-ink-dark rounded-lg p-12 text-center border border-ink/10 dark:border-parchment/10">
              <BookMarked className="h-16 w-16 mx-auto text-ink/30 dark:text-parchment/30 mb-4" />
              <h3 className="text-2xl font-handwriting mb-2">No publications yet</h3>
              <p className="text-ink/70 dark:text-parchment/70 mb-8">
                Your published works will appear here
              </p>
              <Button 
                onClick={() => window.location.href = "/upload"}
                className="bg-ink text-parchment hover:bg-ink-light dark:bg-parchment dark:text-ink dark:hover:bg-parchment-dark"
              >
                Create Your First Publication
              </Button>
            </div>
          </TabsContent>
          
          <TabsContent value="saved" className="mt-0">
            <div className="bg-white dark:bg-ink-dark rounded-lg p-12 text-center border border-ink/10 dark:border-parchment/10">
              <Bookmark className="h-16 w-16 mx-auto text-ink/30 dark:text-parchment/30 mb-4" />
              <h3 className="text-2xl font-handwriting mb-2">No saved items</h3>
              <p className="text-ink/70 dark:text-parchment/70 mb-8">
                Writings you save will appear here
              </p>
              <Button 
                onClick={() => window.location.href = "/explore"}
                className="bg-ink text-parchment hover:bg-ink-light dark:bg-parchment dark:text-ink dark:hover:bg-parchment-dark"
              >
                Explore Writings
              </Button>
            </div>
          </TabsContent>
          
          <TabsContent value="drafts" className="mt-0">
            <div className="bg-white dark:bg-ink-dark rounded-lg p-12 text-center border border-ink/10 dark:border-parchment/10">
              <Edit className="h-16 w-16 mx-auto text-ink/30 dark:text-parchment/30 mb-4" />
              <h3 className="text-2xl font-handwriting mb-2">No drafts</h3>
              <p className="text-ink/70 dark:text-parchment/70 mb-8">
                Your works in progress will be saved here
              </p>
              <Button 
                onClick={() => window.location.href = "/upload"}
                className="bg-ink text-parchment hover:bg-ink-light dark:bg-parchment dark:text-ink dark:hover:bg-parchment-dark"
              >
                Start a Draft
              </Button>
            </div>
          </TabsContent>
        </Tabs>
      </main>
    </div>
  );
};

export default Profile;
