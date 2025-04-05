import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Search, Filter, BookOpen, AlertCircle } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useToast } from "@/hooks/use-toast";
import Navbar from "@/components/Layout/Navbar";
import WriterCard from "@/components/Writer/WriterCard";
import ContentUploader from "@/components/Writer/ContentUploader";
import { useIsMobile } from "@/hooks/use-mobile";

const Explore = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [loading, setLoading] = useState(true);
  const [posts, setPosts] = useState([]);
  const [category, setCategory] = useState("all");
  const navigate = useNavigate();
  const { toast } = useToast();
  const isMobile = useIsMobile();
  const { categoryParam } = useParams();

  // Determine default category from URL if present
  useEffect(() => {
    if (categoryParam) {
      setCategory(categoryParam);
    }
  }, [categoryParam]);

  // Simulate loading and fetch data
  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
      // No example posts - we're starting with an empty state
      setPosts([]);
    }, 1000);
    
    return () => clearTimeout(timer);
  }, []);

  // Show welcome notification
  useEffect(() => {
    toast({
      title: "Welcome to Explore!",
      description: "This page will show the latest writings when content is added.",
    });
  }, [toast]);

  return (
    <div className="min-h-screen bg-parchment dark:bg-ink text-ink dark:text-parchment">
      <Navbar />
      
      <main className="max-w-6xl mx-auto px-4 py-8">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-playfair font-bold mb-4">Explore Writings</h1>
          <p className="text-xl font-handwriting text-ink/70 dark:text-parchment/70">Discover stories that move, inspire, and captivate</p>
        </div>
        
        <Tabs defaultValue={category} onValueChange={setCategory} className="mb-8">
          <TabsList className="grid grid-cols-5 mb-8">
            <TabsTrigger value="all">All</TabsTrigger>
            <TabsTrigger value="stories">Stories</TabsTrigger>
            <TabsTrigger value="series">Series</TabsTrigger>
            <TabsTrigger value="poems">Poems</TabsTrigger>
            <TabsTrigger value="writings">Writings</TabsTrigger>
          </TabsList>
          
          <TabsContent value="all" className="mt-0">
            <div className="flex items-center mb-8 bg-parchment-dark dark:bg-ink-light rounded-lg p-4 shadow-sm border border-ink/10 dark:border-parchment/10">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-ink/40 dark:text-parchment/40 h-5 w-5" />
                <Input
                  type="text"
                  placeholder="Search by title, author, or content..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10 bg-parchment dark:bg-ink-dark border-ink/20 dark:border-parchment/20 font-handwriting"
                />
              </div>
              <Button variant="ghost" className="ml-2 text-ink/70 dark:text-parchment/70">
                <Filter className="h-5 w-5" />
              </Button>
            </div>
            
            {loading ? (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {[1, 2].map((i) => (
                  <div key={i} className="bg-parchment-dark dark:bg-ink-light rounded-lg h-64 animate-pulse"></div>
                ))}
              </div>
            ) : (
              <>
                {posts.length > 0 ? (
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    {posts.map((writing) => (
                      <WriterCard key={writing.id} {...writing} />
                    ))}
                  </div>
                ) : (
                  <div className="text-center py-12 bg-white dark:bg-ink-dark rounded-lg shadow-sm border border-ink/5 dark:border-parchment/5 p-8">
                    <AlertCircle className="mx-auto h-12 w-12 text-ink/30 dark:text-parchment/30 mb-4" />
                    <h3 className="mt-2 text-2xl font-handwriting text-ink/70 dark:text-parchment/70">No writings yet</h3>
                    <p className="mt-2 text-ink/50 dark:text-parchment/50 mb-6">Be the first to share your story with the world</p>
                    
                    <Button 
                      onClick={() => navigate("/upload")}
                      className="bg-ink text-parchment hover:bg-ink-light dark:bg-parchment dark:text-ink dark:hover:bg-parchment-dark"
                    >
                      Start Writing
                    </Button>
                  </div>
                )}
              </>
            )}
          </TabsContent>
          
          {/* Other category tabs will show the same no-content state for now */}
          {["stories", "series", "poems", "writings"].map(cat => (
            <TabsContent key={cat} value={cat} className="mt-0">
              <div className="text-center py-12 bg-white dark:bg-ink-dark rounded-lg shadow-sm border border-ink/5 dark:border-parchment/5 p-8">
                <AlertCircle className="mx-auto h-12 w-12 text-ink/30 dark:text-parchment/30 mb-4" />
                <h3 className="mt-2 text-2xl font-handwriting text-ink/70 dark:text-parchment/70">No {cat} yet</h3>
                <p className="mt-2 text-ink/50 dark:text-parchment/50 mb-6">Be the first to contribute to this category</p>
                
                <Button 
                  onClick={() => navigate("/upload")}
                  className="bg-ink text-parchment hover:bg-ink-light dark:bg-parchment dark:text-ink dark:hover:bg-parchment-dark"
                >
                  Create {cat.slice(0, -1)}
                </Button>
              </div>
            </TabsContent>
          ))}
        </Tabs>
      </main>
      
      <ContentUploader />
    </div>
  );
};

export default Explore;
