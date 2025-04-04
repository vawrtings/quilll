
import { useState } from "react";
import { Link } from "react-router-dom";
import { BookOpen, Menu, X, Upload, User, Search } from "lucide-react";
import { Button } from "@/components/ui/button";

const Navbar = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <nav className="bg-parchment/90 backdrop-blur-sm sticky top-0 z-50 border-b border-ink/10">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 justify-between items-center">
          <div className="flex">
            <Link to="/" className="flex items-center">
              <BookOpen className="h-6 w-6 text-ink" />
              <span className="ml-2 text-xl font-playfair font-medium text-ink">Quill</span>
            </Link>
          </div>
          
          {/* Desktop menu */}
          <div className="hidden md:flex md:items-center md:space-x-6">
            <Link to="/explore" className="text-ink/80 hover:text-ink text-sm font-medium transition-colors">
              Explore
            </Link>
            <Link to="/writers" className="text-ink/80 hover:text-ink text-sm font-medium transition-colors">
              Writers
            </Link>
            <div className="relative">
              <Search className="absolute left-2 top-1/2 h-4 w-4 -translate-y-1/2 text-ink/50" />
              <input
                type="text"
                placeholder="Search writings..."
                className="h-9 rounded-md border border-input bg-background pl-8 pr-3 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
              />
            </div>
          </div>
          
          <div className="flex items-center space-x-4">
            <Button variant="ghost" size="icon" className="text-ink/80 hover:text-ink hover:bg-ink/5">
              <Upload className="h-5 w-5" />
            </Button>
            <Button variant="ghost" size="icon" className="text-ink/80 hover:text-ink hover:bg-ink/5">
              <User className="h-5 w-5" />
            </Button>
            <Button variant="outline" className="border-ink text-ink hidden md:flex">
              Sign In
            </Button>
            
            {/* Mobile menu button */}
            <Button
              variant="ghost"
              size="icon"
              className="md:hidden"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            >
              {mobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </Button>
          </div>
        </div>
      </div>
      
      {/* Mobile menu */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-parchment border-b border-ink/10 py-2 animate-fade-in">
          <div className="space-y-1 px-4 pb-3 pt-2">
            <Link
              to="/explore"
              className="block px-3 py-2 text-base font-medium text-ink/80 hover:text-ink hover:bg-ink/5 rounded-md"
            >
              Explore
            </Link>
            <Link
              to="/writers"
              className="block px-3 py-2 text-base font-medium text-ink/80 hover:text-ink hover:bg-ink/5 rounded-md"
            >
              Writers
            </Link>
            <div className="relative mt-2 px-3">
              <Search className="absolute left-5 top-1/2 h-4 w-4 -translate-y-1/2 text-ink/50" />
              <input
                type="text"
                placeholder="Search writings..."
                className="w-full h-10 rounded-md border border-input bg-background pl-8 pr-3 text-sm"
              />
            </div>
            <Button className="w-full mt-2 bg-ink text-parchment hover:bg-ink-light">
              Sign In
            </Button>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
