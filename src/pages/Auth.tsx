
import { useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { toast } from "sonner";
import { BookOpen, Mail, Lock, UserPlus, LogIn } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import AnimatedQuill from "@/components/UI/AnimatedQuill";

const Auth = () => {
  const [loading, setLoading] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const isWriter = localStorage.getItem("user-type") === "writer";

  useEffect(() => {
    // If user is already logged in, redirect to home
    if (localStorage.getItem("quill-logged-in") === "true") {
      navigate("/");
    }
  }, [navigate]);

  // Handle sign in
  const handleSignIn = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    
    try {
      // Mock authentication for demo purposes
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Set logged in status
      localStorage.setItem("quill-logged-in", "true");
      
      toast.success("Welcome back to Quill!");
      navigate("/");
    } catch (error: any) {
      toast.error(error.message || "Failed to sign in");
    } finally {
      setLoading(false);
    }
  };

  // Handle sign up
  const handleSignUp = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    
    try {
      // Mock authentication for demo purposes
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Set logged in status
      localStorage.setItem("quill-logged-in", "true");
      
      toast.success("Account created successfully!");
      navigate("/");
    } catch (error: any) {
      toast.error(error.message || "Failed to create account");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-parchment flex flex-col">
      <header className="border-b border-ink/10">
        <div className="max-w-7xl mx-auto px-4 py-4">
          <Link to="/" className="flex items-center">
            <BookOpen className="h-6 w-6 text-ink" />
            <span className="ml-2 text-xl font-playfair font-medium text-ink">Quill</span>
          </Link>
        </div>
      </header>
      
      <main className="flex-1 flex flex-col items-center justify-center px-4 py-12">
        <div className="w-full max-w-md">
          <div className="text-center mb-8">
            <h1 className="text-3xl font-playfair font-bold text-ink mb-2">Welcome to Quill</h1>
            <p className="text-ink/70 font-handwriting text-lg">Where words become art, safely preserved</p>
            {isWriter && (
              <p className="mt-4 text-ink/90 bg-parchment-dark p-2 rounded-md">
                As a writer, you need to sign in to publish your content.
              </p>
            )}
          </div>
          
          <div className="bg-parchment-dark rounded-lg shadow-lg p-8 border border-ink/10">
            <Tabs defaultValue="signin" className="w-full">
              <TabsList className="grid grid-cols-2 mb-6">
                <TabsTrigger value="signin" className="font-handwriting text-lg">Sign In</TabsTrigger>
                <TabsTrigger value="signup" className="font-handwriting text-lg">Sign Up</TabsTrigger>
              </TabsList>
              
              <TabsContent value="signin">
                <form onSubmit={handleSignIn} className="space-y-4">
                  <div className="space-y-2">
                    <label htmlFor="email" className="block text-ink font-handwriting text-lg">Email</label>
                    <div className="relative">
                      <Mail className="absolute left-3 top-1/2 -translate-y-1/2 text-ink/40 h-4 w-4" />
                      <Input
                        id="email"
                        type="email"
                        placeholder="your.email@example.com"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className="pl-10 bg-parchment border-ink/20"
                        required
                      />
                    </div>
                  </div>
                  
                  <div className="space-y-2">
                    <label htmlFor="password" className="block text-ink font-handwriting text-lg">Password</label>
                    <div className="relative">
                      <Lock className="absolute left-3 top-1/2 -translate-y-1/2 text-ink/40 h-4 w-4" />
                      <Input
                        id="password"
                        type="password"
                        placeholder="••••••••"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        className="pl-10 bg-parchment border-ink/20"
                        required
                      />
                    </div>
                  </div>
                  
                  <Button 
                    type="submit" 
                    className="w-full bg-ink text-parchment hover:bg-ink-light font-handwriting text-lg"
                    disabled={loading}
                  >
                    {loading ? (
                      <AnimatedQuill text="Signing in..." />
                    ) : (
                      <>
                        <LogIn className="mr-2 h-4 w-4" />
                        Sign In
                      </>
                    )}
                  </Button>
                </form>
              </TabsContent>
              
              <TabsContent value="signup">
                <form onSubmit={handleSignUp} className="space-y-4">
                  <div className="space-y-2">
                    <label htmlFor="signup-email" className="block text-ink font-handwriting text-lg">Email</label>
                    <div className="relative">
                      <Mail className="absolute left-3 top-1/2 -translate-y-1/2 text-ink/40 h-4 w-4" />
                      <Input
                        id="signup-email"
                        type="email"
                        placeholder="your.email@example.com"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className="pl-10 bg-parchment border-ink/20"
                        required
                      />
                    </div>
                  </div>
                  
                  <div className="space-y-2">
                    <label htmlFor="signup-password" className="block text-ink font-handwriting text-lg">Password</label>
                    <div className="relative">
                      <Lock className="absolute left-3 top-1/2 -translate-y-1/2 text-ink/40 h-4 w-4" />
                      <Input
                        id="signup-password"
                        type="password"
                        placeholder="••••••••"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        className="pl-10 bg-parchment border-ink/20"
                        required
                      />
                    </div>
                  </div>
                  
                  <Button 
                    type="submit" 
                    className="w-full bg-ink text-parchment hover:bg-ink-light font-handwriting text-lg"
                    disabled={loading}
                  >
                    {loading ? (
                      <AnimatedQuill text="Creating account..." />
                    ) : (
                      <>
                        <UserPlus className="mr-2 h-4 w-4" />
                        Sign Up
                      </>
                    )}
                  </Button>
                </form>
              </TabsContent>
            </Tabs>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Auth;
