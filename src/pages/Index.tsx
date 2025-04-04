
import { useState, useEffect, useRef } from "react";
import Navbar from "@/components/Layout/Navbar";
import ContentUploader from "@/components/Writer/ContentUploader";
import AnimatedQuill from "@/components/UI/AnimatedQuill";
import EnhancedAnimatedQuill from "@/components/UI/EnhancedAnimatedQuill";
import StickyNote from "@/components/UI/StickyNote";
import BookPage from "@/components/UI/BookPage";
import { Button } from "@/components/ui/button";
import { Book, PenTool, Feather, BookOpen, User, Search, Upload } from "lucide-react";
import { ScrollArea } from "@/components/ui/scroll-area";
import { useNavigate, Link } from "react-router-dom";

const Index = () => {
  const [loading, setLoading] = useState(true);
  const scrollRef = useRef<HTMLDivElement>(null);
  const navigate = useNavigate();

  useEffect(() => {
    // Simulate loading
    const timer = setTimeout(() => {
      setLoading(false);
    }, 1000);
    
    return () => clearTimeout(timer);
  }, []);

  // Scroll handler to create page turning effect
  const handleScroll = () => {
    if (!scrollRef.current) return;
    const scrollTop = scrollRef.current.scrollTop;
    const bookPages = document.querySelectorAll('.book-page');
    
    bookPages.forEach((page, index) => {
      const pageElement = page as HTMLElement;
      const pageTop = pageElement.offsetTop;
      const distance = scrollTop - pageTop + 300;
      
      // Only animate pages that are in view
      if (distance > -400 && distance < 400) {
        const rotation = Math.min(Math.max(distance / 20, -5), 0);
        pageElement.style.transform = `perspective(1000px) rotateX(${rotation}deg)`;
        pageElement.style.boxShadow = `0 ${5 + Math.abs(rotation) * 2}px ${10 + Math.abs(rotation) * 3}px rgba(0,0,0,${0.05 + Math.abs(rotation) * 0.01})`;
      }
    });
  };

  // Navigation handlers
  const handleNavigation = (path: string) => {
    navigate(path);
  };

  return (
    <div className="min-h-screen bg-parchment overflow-x-hidden cursor-quill">
      {/* Navigation Sticky Notes - positioned absolutely */}
      <div className="fixed top-6 right-6 z-50 flex flex-col gap-4">
        <StickyNote color="green" rotation={2} flying interactive onClick={() => handleNavigation("/auth")}>
          <div className="flex items-center justify-center flex-col gap-1">
            <User className="w-4 h-4 mb-1" />
            <p className="text-center">Sign Up</p>
          </div>
        </StickyNote>
        
        <StickyNote color="blue" rotation={-3} flying interactive onClick={() => handleNavigation("/auth")}>
          <div className="flex items-center justify-center flex-col gap-1">
            <BookOpen className="w-4 h-4 mb-1" />
            <p className="text-center">Login</p>
          </div>
        </StickyNote>
      </div>
      
      <div className="fixed top-6 left-6 z-50 flex flex-col gap-4">
        <StickyNote color="pink" rotation={3} flying interactive onClick={() => handleNavigation("/explore")}>
          <div className="flex items-center justify-center flex-col gap-1">
            <Search className="w-4 h-4 mb-1" />
            <p className="text-center">Explore</p>
          </div>
        </StickyNote>
        
        <StickyNote color="yellow" rotation={-2} flying interactive onClick={() => handleNavigation("/upload")}>
          <div className="flex items-center justify-center flex-col gap-1">
            <Upload className="w-4 h-4 mb-1" />
            <p className="text-center">Upload</p>
          </div>
        </StickyNote>
      </div>
      
      <main className="relative">
        {/* Hero section with pen animation */}
        <section className="bg-parchment-dark py-16 sm:py-24 border-b border-ink/10 relative overflow-hidden">
          {/* Floating elements for visual interest */}
          <div className="absolute top-10 right-10 transform rotate-6 opacity-20 animate-fly">
            <Feather className="w-16 h-16 text-ink" />
          </div>
          <div className="absolute bottom-10 left-10 transform -rotate-12 opacity-20 animate-fly" style={{ animationDelay: "1.5s" }}>
            <PenTool className="w-10 h-10 text-ink" />
          </div>
          
          <div className="max-w-3xl mx-auto text-center px-4">
            <h1 className="mb-12">
              <div className="flex flex-row items-center justify-center space-x-6">
                <EnhancedAnimatedQuill 
                  text="Write." 
                  cursorStyle="quill" 
                  speed={1.5} 
                  style="cursive"
                  size="xl"
                  inline
                />
                <EnhancedAnimatedQuill 
                  text="Share." 
                  cursorStyle="quill"
                  style="cursive" 
                  delay={1.5} 
                  speed={1.5}
                  size="xl"
                  inline
                />
                <EnhancedAnimatedQuill 
                  text="Preserve." 
                  cursorStyle="quill"
                  style="cursive" 
                  delay={3} 
                  speed={1.5} 
                  size="xl"
                  inline
                />
              </div>
            </h1>
            
            <div className="mt-16">
              <Button 
                className="bg-ink text-parchment hover:bg-ink-light font-handwriting text-xl px-6 py-6"
                onClick={() => navigate("/upload")}
              >
                <BookOpen className="mr-2 h-5 w-5" /> Begin Your Story
              </Button>
            </div>
          </div>
        </section>
        
        {/* Content section with book page effect */}
        <div className="relative max-w-4xl mx-auto">
          {/* Decorative sticky notes */}
          <div className="absolute -left-20 top-40 hidden md:block">
            <StickyNote color="yellow" rotation={-6} flying>
              <p>Remember that idea about the lighthouse?</p>
              <p className="text-right mt-2">— Me</p>
            </StickyNote>
          </div>
          
          <div className="absolute -right-20 top-80 hidden md:block">
            <StickyNote color="blue" rotation={4} flying>
              <p>Draft due next Tuesday</p>
              <p className="text-right mt-2 text-sm">Don't forget!</p>
            </StickyNote>
          </div>
          
          <div className="absolute -left-20 top-[500px] hidden md:block">
            <StickyNote color="green" rotation={3} flying>
              <p>New character idea: a detective with synesthesia</p>
            </StickyNote>
          </div>
          
          <div className="absolute -right-20 top-[650px] hidden md:block">
            <StickyNote color="pink" rotation={-5} flying>
              <p>Find a better word for "whisper"</p>
            </StickyNote>
          </div>
          
          {/* Main content area with scroll effect */}
          <ScrollArea 
            ref={scrollRef}
            className="h-[calc(100vh-12rem)] px-4 sm:px-6 pt-8 pb-16"
            onScroll={handleScroll}
          >
            <BookPage pageNumber={1} transitionDelay={1}>
              <h2 className="text-2xl font-handwriting mb-4 text-ink">Your Writing Sanctuary</h2>
              <p className="mb-4 text-ink/90 leading-relaxed font-handwriting text-lg">
                Welcome to a space designed for writers. Free from distractions, 
                secure from content theft, and beautifully minimalist to let your words
                take center stage.
              </p>
              <p className="text-ink/90 leading-relaxed font-handwriting text-lg">
                Begin by uploading your first piece or explore the features designed
                to protect and showcase your work.
              </p>
            </BookPage>
            
            <BookPage pageNumber={2} transitionDelay={2}>
              <h2 className="text-2xl font-handwriting mb-4 text-ink">Pirate-Proof Protection</h2>
              <p className="mb-4 text-ink/90 leading-relaxed font-handwriting text-lg">
                Every piece you publish is protected with our unique technology that
                prevents unauthorized copying while still allowing readers to enjoy your work.
              </p>
              <p className="text-ink/90 leading-relaxed font-handwriting text-lg">
                Your words remain yours, always.
              </p>
            </BookPage>
            
            <BookPage pageNumber={3} transitionDelay={3}>
              <h2 className="text-2xl font-handwriting mb-4 text-ink">Build Your Collection</h2>
              <p className="mb-4 text-ink/90 leading-relaxed font-handwriting text-lg">
                As you write more, your personal library grows. Organize your works
                by themes, series, or projects. Create collections that showcase your
                literary journey.
              </p>
              <div className="flex justify-center my-8">
                <Book className="h-16 w-16 text-ink/30" />
              </div>
            </BookPage>
            
            <BookPage pageNumber={4} transitionDelay={4}>
              <h2 className="text-2xl font-handwriting mb-4 text-ink">Connect With Readers</h2>
              <p className="mb-4 text-ink/90 leading-relaxed font-handwriting text-lg">
                Share your publications with a community that values the written word.
                Receive thoughtful feedback and connect with fellow writers who share your passion.
              </p>
              <div className="mt-8 text-center">
                <Button 
                  className="bg-ink/10 text-ink hover:bg-ink/20 font-handwriting text-lg"
                  onClick={() => navigate("/upload")}
                >
                  Start Writing Now
                </Button>
              </div>
            </BookPage>
          </ScrollArea>
        </div>
      </main>
      
      <ContentUploader />
      
      <footer className="bg-parchment-dark border-t border-ink/10 py-6 mt-12">
        <div className="max-w-3xl mx-auto px-4 text-center">
          <div className="flex justify-center items-center mb-2">
            <span className="text-xl font-handwriting font-medium text-ink">Quill</span>
            <span className="text-ink/60 text-sm ml-2 font-handwriting">© 2025</span>
          </div>
          <div className="text-xs text-ink/50 font-handwriting">
            Where words become art, safely preserved
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;
