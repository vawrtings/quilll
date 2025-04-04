
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Search, Filter, BookOpen } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import Navbar from "@/components/Layout/Navbar";
import WriterCard from "@/components/Writer/WriterCard";
import BookPage from "@/components/UI/BookPage";
import ContentUploader from "@/components/Writer/ContentUploader";

const Explore = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  // Mock data for demo purposes
  const mockWritings = [
    {
      id: "1",
      author: "Emily Wright",
      authorId: "emily",
      title: "The Lighthouse Keeper's Daughter",
      content: "The lighthouse stood tall against the raging storm, its beam cutting through the darkness like a knife. Inside, Maria tended the light as she had every night since her father's passing three months ago...",
      date: "Apr 2, 2025",
      likes: 42,
      comments: 12,
      readingTime: "3 min read"
    },
    {
      id: "2",
      author: "James Peterson",
      authorId: "james",
      title: "Memories of Summer",
      content: "The scent of freshly cut grass mingled with the sweetness of lemonade. Children's laughter echoed through the neighborhood as sprinklers created rainbows against the afternoon sun...",
      date: "Apr 1, 2025",
      likes: 36,
      comments: 8,
      readingTime: "2 min read"
    },
    {
      id: "3",
      author: "Sophia Chen",
      authorId: "sophia",
      title: "The Detective with Synesthesia",
      content: "Detective Liam Reid saw numbers as colors and sounds as shapes. When the phone rang, crimson circles exploded in his vision. 'Reid speaking,' he answered, already knowing from the violet hue that it was the chief...",
      date: "Mar 30, 2025",
      likes: 89,
      comments: 24,
      readingTime: "5 min read"
    },
    {
      id: "4",
      author: "Marcus Johnson",
      authorId: "marcus",
      title: "Beyond the Garden Gate",
      content: "The old garden gate creaked open, revealing a world untouched by time. Ivy-covered statues stood frozen in eternal conversation while butterflies danced between blooms that shouldn't have existed in this century...",
      date: "Mar 28, 2025",
      likes: 64,
      comments: 18,
      readingTime: "4 min read"
    }
  ];

  // Simulate loading
  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 1000);
    
    return () => clearTimeout(timer);
  }, []);

  const filteredWritings = mockWritings.filter((writing) =>
    writing.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    writing.author.toLowerCase().includes(searchTerm.toLowerCase()) ||
    writing.content.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-parchment">
      <Navbar />
      
      <main className="max-w-6xl mx-auto px-4 py-8">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-playfair font-bold text-ink mb-4">Explore Writings</h1>
          <p className="text-xl font-handwriting text-ink/70">Discover stories that move, inspire, and captivate</p>
        </div>
        
        <div className="flex items-center mb-8 bg-parchment-dark rounded-lg p-4 shadow-sm border border-ink/10">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-ink/40 h-5 w-5" />
            <Input
              type="text"
              placeholder="Search by title, author, or content..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10 bg-parchment border-ink/20 font-handwriting"
            />
          </div>
          <Button variant="ghost" className="ml-2 text-ink/70">
            <Filter className="h-5 w-5" />
          </Button>
        </div>
        
        {loading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {[1, 2, 3, 4].map((i) => (
              <div key={i} className="bg-parchment-dark rounded-lg h-64 animate-pulse"></div>
            ))}
          </div>
        ) : (
          <>
            {filteredWritings.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {filteredWritings.map((writing) => (
                  <WriterCard
                    key={writing.id}
                    id={writing.id}
                    author={writing.author}
                    authorId={writing.authorId}
                    title={writing.title}
                    content={writing.content}
                    date={writing.date}
                    likes={writing.likes}
                    comments={writing.comments}
                    readingTime={writing.readingTime}
                    className="h-full"
                  />
                ))}
              </div>
            ) : (
              <div className="text-center py-12">
                <BookOpen className="mx-auto h-12 w-12 text-ink/30" />
                <h3 className="mt-4 text-2xl font-handwriting text-ink/70">No writings found</h3>
                <p className="mt-2 text-ink/50">Try adjusting your search or explore different topics</p>
              </div>
            )}
          </>
        )}
      </main>
      
      <ContentUploader />
    </div>
  );
};

export default Explore;
