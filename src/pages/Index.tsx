
import { useState, useEffect, useRef } from "react";
import Navbar from "@/components/Layout/Navbar";
import ContentUploader from "@/components/Writer/ContentUploader";
import AnimatedQuill from "@/components/UI/AnimatedQuill";
import StickyNote from "@/components/UI/StickyNote";
import BookPage from "@/components/UI/BookPage";
import { Button } from "@/components/ui/button";
import { Book, PenTool, Feather, BookOpen } from "lucide-react";
import { ScrollArea } from "@/components/ui/scroll-area";

const Index = () => {
  const [loading, setLoading] = useState(true);
  const scrollRef = useRef<HTMLDivElement>(null);

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

  return (
    <div className="min-h-screen bg-parchment overflow-x-hidden">
      <Navbar />
      
      <main className="relative">
        {/* Hero section with pen animation */}
        <section className="bg-parchment-dark py-16 sm:py-24 border-b border-ink/10 relative overflow-hidden">
          {/* Floating elements for visual interest */}
          <div className="absolute top-10 right-10 transform rotate-6 opacity-20">
            <Feather className="w-16 h-16 text-ink" />
          </div>
          <div className="absolute bottom-10 left-10 transform -rotate-12 opacity-20">
            <PenTool className="w-10 h-10 text-ink" />
          </div>
          
          <div className="max-w-3xl mx-auto text-center px-4">
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-playfair font-semibold mb-6 space-y-2">
              <AnimatedQuill 
                text="Write." 
                cursorStyle="quill" 
                speed={1} 
                className="block" 
              />
              <AnimatedQuill 
                text="Share." 
                cursorStyle="quill" 
                delay={1} 
                speed={1} 
                className="block" 
              />
              <AnimatedQuill 
                text="Preserve." 
                cursorStyle="quill" 
                delay={2} 
                speed={1} 
                className="block" 
              />
            </h1>
            
            <div className="mt-16">
              <Button className="bg-ink text-parchment hover:bg-ink-light">
                <BookOpen className="mr-2 h-4 w-4" /> Begin Your Story
              </Button>
            </div>
          </div>
        </section>
        
        {/* Content section with book page effect */}
        <div className="relative max-w-4xl mx-auto">
          {/* Decorative sticky notes */}
          <div className="absolute -left-20 top-40 hidden md:block">
            <StickyNote color="yellow" rotation={-6} floating>
              <p>Remember that idea about the lighthouse?</p>
              <p className="text-right mt-2">— Me</p>
            </StickyNote>
          </div>
          
          <div className="absolute -right-20 top-80 hidden md:block">
            <StickyNote color="blue" rotation={4} floating>
              <p>Draft due next Tuesday</p>
              <p className="text-right mt-2 text-sm">Don't forget!</p>
            </StickyNote>
          </div>
          
          {/* Main content area with scroll effect */}
          <ScrollArea 
            ref={scrollRef}
            className="h-[calc(100vh-12rem)] px-4 sm:px-6 pt-8 pb-16"
            onScroll={handleScroll}
          >
            <BookPage pageNumber={1} transitionDelay={1}>
              <h2 className="text-2xl font-playfair mb-4">Your Writing Sanctuary</h2>
              <p className="mb-4 text-ink/80 leading-relaxed">
                Welcome to a space designed for writers. Free from distractions, 
                secure from content theft, and beautifully minimalist to let your words
                take center stage.
              </p>
              <p className="text-ink/80 leading-relaxed">
                Begin by uploading your first piece or explore the features designed
                to protect and showcase your work.
              </p>
            </BookPage>
            
            <BookPage pageNumber={2} transitionDelay={2}>
              <h2 className="text-2xl font-playfair mb-4">Pirate-Proof Protection</h2>
              <p className="mb-4 text-ink/80 leading-relaxed">
                Every piece you publish is protected with our unique technology that
                prevents unauthorized copying while still allowing readers to enjoy your work.
              </p>
              <p className="text-ink/80 leading-relaxed">
                Your words remain yours, always.
              </p>
            </BookPage>
            
            <BookPage pageNumber={3} transitionDelay={3}>
              <h2 className="text-2xl font-playfair mb-4">Build Your Collection</h2>
              <p className="mb-4 text-ink/80 leading-relaxed">
                As you write more, your personal library grows. Organize your works
                by themes, series, or projects. Create collections that showcase your
                literary journey.
              </p>
              <div className="flex justify-center my-8">
                <Book className="h-16 w-16 text-ink/30" />
              </div>
            </BookPage>
            
            <BookPage pageNumber={4} transitionDelay={4}>
              <h2 className="text-2xl font-playfair mb-4">Connect With Readers</h2>
              <p className="mb-4 text-ink/80 leading-relaxed">
                Share your publications with a community that values the written word.
                Receive thoughtful feedback and connect with fellow writers who share your passion.
              </p>
              <div className="mt-8 text-center">
                <Button className="bg-ink/10 text-ink hover:bg-ink/20">
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
            <span className="text-xl font-playfair font-medium text-ink">Quill</span>
            <span className="text-ink/60 text-sm ml-2">© 2025</span>
          </div>
          <div className="text-xs text-ink/50">
            Where words become art, safely preserved
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;
