
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Upload, Image, FileText, BookOpen, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";
import { toast } from "sonner";
import Navbar from "@/components/Layout/Navbar";
import AnimatedQuill from "@/components/UI/AnimatedQuill";
import StickyNote from "@/components/UI/StickyNote";

const UploadPage = () => {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!title.trim()) {
      toast.error("Please add a title to your work");
      return;
    }
    
    if (!content.trim()) {
      toast.error("Please add some content to your work");
      return;
    }
    
    setIsSubmitting(true);
    
    // Simulate submission
    setTimeout(() => {
      toast.success("Your work has been uploaded successfully!");
      setIsSubmitting(false);
      navigate("/explore");
    }, 1500);
  };

  return (
    <div className="min-h-screen bg-parchment">
      <Navbar />
      
      <main className="max-w-4xl mx-auto px-4 py-8">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-playfair font-bold text-ink mb-4">Share Your Writing</h1>
          <p className="text-xl font-handwriting text-ink/70">Your words, your art, safely preserved</p>
        </div>
        
        <div className="bg-parchment-dark rounded-lg shadow-lg overflow-hidden relative">
          {/* Spiral binding */}
          <div className="absolute left-0 top-0 bottom-0 w-10 bg-ink/10 flex flex-col justify-around items-center">
            {[...Array(20)].map((_, i) => (
              <div key={i} className="w-6 h-6 rounded-full bg-ink/30"></div>
            ))}
          </div>
          
          <form onSubmit={handleSubmit} className="ml-12 p-8">
            <div className="mb-6">
              <label htmlFor="title" className="block mb-2 text-xl font-handwriting font-medium text-ink">
                Title
              </label>
              <StickyNote color="yellow" className="mb-2">
                <Input
                  id="title"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  placeholder="Give your work a title..."
                  className="w-full border-none bg-transparent font-handwriting text-xl focus-visible:ring-0 focus-visible:ring-offset-0 p-0"
                  maxLength={100}
                />
              </StickyNote>
              <div className="text-right text-xs text-ink/60 mt-1 font-handwriting">
                {title.length}/100
              </div>
            </div>
            
            <div className="mb-6">
              <label htmlFor="content" className="block mb-2 text-xl font-handwriting font-medium text-ink">
                Content
              </label>
              <div className="relative notebook-paper">
                <Textarea
                  id="content"
                  value={content}
                  onChange={(e) => setContent(e.target.value)}
                  placeholder="Write your masterpiece..."
                  className="min-h-[300px] font-handwriting text-lg border-ink/10 bg-parchment-dark/20 notebook-lines"
                />
                <div className="absolute right-3 bottom-3 flex space-x-2">
                  <Button type="button" size="icon" variant="ghost" className="h-8 w-8">
                    <Image className="h-4 w-4" />
                  </Button>
                  <Button type="button" size="icon" variant="ghost" className="h-8 w-8">
                    <FileText className="h-4 w-4" />
                  </Button>
                </div>
              </div>
              <div className="text-right text-xs text-ink/60 mt-1 font-handwriting">
                {content.length} characters
              </div>
            </div>
            
            <div className="flex items-center pt-5 border-t border-ink/10">
              <div className="text-sm text-ink/70 font-handwriting">
                Your work will be protected against piracy.
              </div>
              
              <div className="ml-auto flex space-x-3">
                <Button 
                  type="button" 
                  variant="outline" 
                  onClick={() => navigate("/explore")}
                  disabled={isSubmitting}
                  className="font-handwriting"
                >
                  Cancel
                </Button>
                <Button 
                  type="submit" 
                  className="bg-ink text-parchment hover:bg-ink-light font-handwriting text-xl"
                  disabled={isSubmitting}
                >
                  {isSubmitting ? (
                    <AnimatedQuill text="Publishing..." />
                  ) : (
                    <>
                      <Upload className="h-5 w-5 mr-2" />
                      Publish
                    </>
                  )}
                </Button>
              </div>
            </div>
          </form>
        </div>
      </main>
    </div>
  );
};

export default UploadPage;
