
import { useState } from "react";
import { Upload, X, Type, Image, PenTool, FileText } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";
import { toast } from "sonner";
import AnimatedQuill from "../UI/AnimatedQuill";

const ContentUploader = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

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
      setIsOpen(false);
      setTitle("");
      setContent("");
      setIsSubmitting(false);
    }, 1500);
  };

  if (!isOpen) {
    return (
      <Button 
        className="fixed bottom-6 right-6 rounded-full bg-ink text-parchment hover:bg-ink-light shadow-lg p-0 w-14 h-14 flex items-center justify-center"
        onClick={() => setIsOpen(true)}
      >
        <PenTool className="h-6 w-6" />
      </Button>
    );
  }

  return (
    <div className="fixed inset-0 bg-black/20 backdrop-blur-sm flex items-center justify-center z-50 p-4">
      <div className="bg-parchment rounded-lg shadow-xl w-full max-w-2xl max-h-[90vh] overflow-hidden animate-fade-in">
        <div className="flex items-center justify-between p-4 border-b border-ink/10">
          <h2 className="text-xl font-playfair font-medium">Share Your Work</h2>
          <Button variant="ghost" size="icon" onClick={() => setIsOpen(false)}>
            <X className="h-5 w-5" />
          </Button>
        </div>
        
        <form onSubmit={handleSubmit} className="p-6 overflow-y-auto max-h-[calc(90vh-120px)]">
          <div className="mb-5">
            <label htmlFor="title" className="block mb-2 text-sm font-medium text-ink">
              Title
            </label>
            <Input
              id="title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="Give your work a title..."
              className="w-full"
              maxLength={100}
            />
            <div className="text-right text-xs text-ink/60 mt-1">
              {title.length}/100
            </div>
          </div>
          
          <div className="mb-5">
            <label htmlFor="content" className="block mb-2 text-sm font-medium text-ink">
              Content
            </label>
            <div className="relative">
              <Textarea
                id="content"
                value={content}
                onChange={(e) => setContent(e.target.value)}
                placeholder="Write your masterpiece..."
                className="min-h-[200px] font-serif"
              />
              <div className="absolute right-3 bottom-3 flex space-x-2">
                <Button type="button" size="icon" variant="ghost" className="h-8 w-8">
                  <Type className="h-4 w-4" />
                </Button>
                <Button type="button" size="icon" variant="ghost" className="h-8 w-8">
                  <Image className="h-4 w-4" />
                </Button>
              </div>
            </div>
            <div className="text-right text-xs text-ink/60 mt-1">
              {content.length} characters
            </div>
          </div>
          
          <div className="flex items-center pt-5 border-t border-ink/10">
            <div className="text-sm text-ink/70">
              Your work will be protected against piracy.
            </div>
            
            <div className="ml-auto flex space-x-3">
              <Button 
                type="button" 
                variant="outline" 
                onClick={() => setIsOpen(false)}
                disabled={isSubmitting}
              >
                Cancel
              </Button>
              <Button 
                type="submit" 
                className="bg-ink text-parchment hover:bg-ink-light"
                disabled={isSubmitting}
              >
                {isSubmitting ? (
                  <AnimatedQuill text="Publishing..." />
                ) : (
                  <>
                    <Upload className="h-4 w-4 mr-2" />
                    Publish
                  </>
                )}
              </Button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ContentUploader;
