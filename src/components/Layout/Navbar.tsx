
import { useState, useEffect } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { BookOpen, Menu, X, Upload, User, Search, Moon, Sun } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useDeviceContext } from "@/contexts/DeviceContext";
import { useTheme } from "next-themes";
import { 
  NavigationMenu,
  NavigationMenuList,
  NavigationMenuItem,
} from "@/components/ui/navigation-menu";
import { useToast } from "@/hooks/use-toast";

const Navbar = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { isMobile } = useDeviceContext();
  const location = useLocation();
  const navigate = useNavigate();
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);
  const { toast } = useToast();

  // Avoid hydration mismatch with theme
  useEffect(() => {
    setMounted(true);
  }, []);

  const categories = [
    { name: "Stories", path: "/explore/stories" },
    { name: "Series", path: "/explore/series" },
    { name: "Poems", path: "/explore/poems" },
    { name: "Writings", path: "/explore/writings" }
  ];

  // Check if user is logged in and is a writer
  const isLoggedIn = localStorage.getItem("quill-logged-in") === "true";
  const isWriter = localStorage.getItem("user-type") === "writer";

  const handleUploadClick = (e: React.MouseEvent) => {
    if (!isWriter) {
      e.preventDefault();
      toast({
        title: "Writer account required",
        description: "Only writers can upload content. Please change your role in settings.",
        variant: "destructive",
      });
      return;
    }

    if (!isLoggedIn) {
      e.preventDefault();
      toast({
        title: "Authentication required",
        description: "Please sign in to upload content.",
        variant: "destructive",
      });
      navigate("/auth");
      return;
    }
  };

  return (
    <nav className="bg-parchment/90 dark:bg-ink/90 backdrop-blur-sm sticky top-0 z-50 border-b border-ink/10 dark:border-parchment/10">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 justify-between items-center">
          <div className="flex">
            <Link to="/" className="flex items-center">
              <BookOpen className="h-6 w-6 text-ink dark:text-parchment" />
              <span className="ml-2 text-xl font-playfair font-medium text-ink dark:text-parchment">Quill</span>
            </Link>
          </div>
          
          {/* Desktop menu */}
          <div className="hidden md:flex md:items-center md:space-x-6">
            <NavigationMenu>
              <NavigationMenuList>
                <NavigationMenuItem>
                  <Link to="/explore" className="text-ink/80 dark:text-parchment/80 hover:text-ink dark:hover:text-parchment text-sm font-medium transition-colors">
                    Explore
                  </Link>
                </NavigationMenuItem>

                {categories.map(category => (
                  <NavigationMenuItem key={category.name}>
                    <Link to={category.path} className="text-ink/80 dark:text-parchment/80 hover:text-ink dark:hover:text-parchment text-sm font-medium transition-colors ml-4">
                      {category.name}
                    </Link>
                  </NavigationMenuItem>
                ))}
              </NavigationMenuList>
            </NavigationMenu>

            <div className="relative">
              <Search className="absolute left-2 top-1/2 h-4 w-4 -translate-y-1/2 text-ink/50 dark:text-parchment/50" />
              <input
                type="text"
                placeholder="Search writings..."
                className="h-9 rounded-md border border-input bg-background pl-8 pr-3 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring dark:bg-ink-light dark:text-parchment"
              />
            </div>
          </div>
          
          <div className="flex items-center space-x-2">
            {/* Theme Switcher */}
            {mounted && (
              <Button
                variant="ghost"
                size="icon"
                onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
                className="text-ink/80 dark:text-parchment/80 hover:text-ink dark:hover:text-parchment hover:bg-ink/5 dark:hover:bg-parchment/5"
                aria-label="Toggle theme"
              >
                {theme === "dark" ? (
                  <Sun className="h-5 w-5" />
                ) : (
                  <Moon className="h-5 w-5" />
                )}
              </Button>
            )}

            <Link to="/upload" onClick={handleUploadClick}>
              <Button 
                variant="ghost" 
                size="icon" 
                className="text-ink/80 dark:text-parchment/80 hover:text-ink dark:hover:text-parchment hover:bg-ink/5 dark:hover:bg-parchment/5"
              >
                <Upload className="h-5 w-5" />
              </Button>
            </Link>
            
            <Link to="/profile">
              <Button 
                variant="ghost" 
                size="icon" 
                className="text-ink/80 dark:text-parchment/80 hover:text-ink dark:hover:text-parchment hover:bg-ink/5 dark:hover:bg-parchment/5"
              >
                <User className="h-5 w-5" />
              </Button>
            </Link>
            
            {!isLoggedIn && (
              <Link to="/auth">
                <Button 
                  variant="outline" 
                  className="border-ink text-ink dark:border-parchment dark:text-parchment hidden md:flex"
                >
                  Sign In
                </Button>
              </Link>
            )}
            
            {/* Mobile menu button */}
            <Button
              variant="ghost"
              size="icon"
              className="md:hidden text-ink dark:text-parchment"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            >
              {mobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </Button>
          </div>
        </div>
      </div>
      
      {/* Mobile menu */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-parchment dark:bg-ink border-b border-ink/10 dark:border-parchment/10 py-2 animate-fade-in">
          <div className="space-y-1 px-4 pb-3 pt-2">
            <Link
              to="/explore"
              className="block px-3 py-2 text-base font-medium text-ink/80 dark:text-parchment/80 hover:text-ink dark:hover:text-parchment hover:bg-ink/5 dark:hover:bg-parchment/5 rounded-md"
              onClick={() => setMobileMenuOpen(false)}
            >
              Explore
            </Link>
            
            {categories.map(category => (
              <Link
                key={category.name}
                to={category.path}
                className="block px-3 py-2 text-base font-medium text-ink/80 dark:text-parchment/80 hover:text-ink dark:hover:text-parchment hover:bg-ink/5 dark:hover:bg-parchment/5 rounded-md pl-6"
                onClick={() => setMobileMenuOpen(false)}
              >
                {category.name}
              </Link>
            ))}
            
            <div className="relative mt-2 px-3">
              <Search className="absolute left-5 top-1/2 h-4 w-4 -translate-y-1/2 text-ink/50 dark:text-parchment/50" />
              <input
                type="text"
                placeholder="Search writings..."
                className="w-full h-10 rounded-md border border-input bg-background pl-8 pr-3 text-sm dark:bg-ink-light dark:text-parchment"
              />
            </div>
            
            {!isLoggedIn && (
              <Link to="/auth" onClick={() => setMobileMenuOpen(false)}>
                <Button 
                  className="w-full mt-2 bg-ink text-parchment hover:bg-ink-light dark:bg-parchment dark:text-ink dark:hover:bg-parchment-dark"
                >
                  Sign In
                </Button>
              </Link>
            )}
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
