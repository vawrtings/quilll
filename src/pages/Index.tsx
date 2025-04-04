
import { useState, useEffect } from "react";
import Navbar from "@/components/Layout/Navbar";
import WriterCard from "@/components/Writer/WriterCard";
import ContentUploader from "@/components/Writer/ContentUploader";
import AnimatedQuill from "@/components/UI/AnimatedQuill";
import { Button } from "@/components/ui/button";

// Sample data for testing
const sampleWritings = [
  {
    id: "1",
    author: "Emily Brontë",
    authorId: "emily-bronte",
    title: "The Silent Echo",
    content: "No coward soul is mine, No trembler in the world's storm-troubled sphere: I see Heaven's glories shine, And faith shines equal, arming me from fear. O God within my breast, Almighty, ever-present Deity! Life—that in me has rest, As I—undying Life—have power in Thee!",
    date: "April 3, 2025",
    likes: 42,
    comments: 7,
    readingTime: "2 min read"
  },
  {
    id: "2",
    author: "Oscar Wilde",
    authorId: "oscar-wilde",
    title: "Reflections on Modern Art",
    content: "All art is at once surface and symbol. Those who go beneath the surface do so at their peril. Those who read the symbol do so at their peril. It is the spectator, and not life, that art really mirrors. Diversity of opinion about a work of art shows that the work is new, complex, and vital.",
    date: "April 2, 2025",
    likes: 38,
    comments: 12,
    readingTime: "3 min read"
  },
  {
    id: "3",
    author: "Sylvia Plath",
    authorId: "sylvia-plath",
    title: "Morning Thoughts",
    content: "I am vertical, but I would rather be horizontal. I am not a tree with my root in the soil, sucking up minerals and motherly love so that each March I may gleam into leaf, nor am I the beauty of a garden bed attracting my share of Ahs and spectacularly painted, unknowing I must soon unpetal. Compared with me, a tree is immortal.",
    date: "April 1, 2025",
    likes: 104,
    comments: 23,
    readingTime: "4 min read"
  },
];

const Index = () => {
  const [writings, setWritings] = useState<typeof sampleWritings>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Simulate loading data
    setTimeout(() => {
      setWritings(sampleWritings);
      setLoading(false);
    }, 1000);
  }, []);

  return (
    <div className="min-h-screen bg-parchment">
      <Navbar />
      
      <main>
        {/* Hero section */}
        <section className="bg-parchment-dark py-16 sm:py-24 border-b border-ink/10">
          <div className="max-w-5xl mx-auto text-center px-4">
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-playfair font-semibold mb-6">
              <AnimatedQuill text="Where Words Become Art" />
            </h1>
            <p className="text-lg text-ink/80 max-w-2xl mx-auto mb-8">
              Share your writing in a beautiful, pirate-proof space. Connect with fellow writers
              and build your literary portfolio.
            </p>
            <div className="flex justify-center gap-4">
              <Button className="bg-ink text-parchment hover:bg-ink-light">
                Start Writing
              </Button>
              <Button variant="outline" className="border-ink text-ink">
                Explore Writers
              </Button>
            </div>
          </div>
        </section>
        
        {/* Content section */}
        <section className="py-12 max-w-5xl mx-auto px-4">
          <div className="flex justify-between items-center mb-8">
            <h2 className="text-2xl font-playfair font-medium">Recent Publications</h2>
            <Button variant="ghost" className="text-ink-light hover:text-ink hover:bg-ink/5">
              View All
            </Button>
          </div>
          
          {loading ? (
            <div className="space-y-6">
              {[1, 2, 3].map((item) => (
                <div key={item} className="bg-white rounded-lg shadow-sm border border-ink/5 h-64 animate-pulse" />
              ))}
            </div>
          ) : (
            <div className="space-y-6">
              {writings.map((writing) => (
                <WriterCard
                  key={writing.id}
                  {...writing}
                />
              ))}
            </div>
          )}
        </section>
      </main>
      
      <ContentUploader />
      
      <footer className="bg-parchment-dark border-t border-ink/10 py-8 mt-12">
        <div className="max-w-5xl mx-auto px-4">
          <div className="flex flex-col sm:flex-row justify-between items-center">
            <div className="flex items-center mb-4 sm:mb-0">
              <span className="text-xl font-playfair font-medium text-ink">Quill</span>
              <span className="text-ink/60 text-sm ml-2">© 2025</span>
            </div>
            <div className="flex space-x-6 text-sm">
              <a href="#" className="text-ink/70 hover:text-ink">About</a>
              <a href="#" className="text-ink/70 hover:text-ink">Help</a>
              <a href="#" className="text-ink/70 hover:text-ink">Terms</a>
              <a href="#" className="text-ink/70 hover:text-ink">Privacy</a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;
