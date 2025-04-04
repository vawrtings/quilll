
import React, { useEffect, useRef } from "react";
import { cn } from "@/lib/utils";

interface BookPageProps {
  children: React.ReactNode;
  className?: string;
  transitionDelay?: number;
  pageNumber?: number;
  corner?: boolean;
  spiral?: boolean;
}

const BookPage: React.FC<BookPageProps> = ({
  children,
  className,
  transitionDelay = 0,
  pageNumber,
  corner = true,
  spiral = false,
}) => {
  const pageRef = useRef<HTMLDivElement>(null);
  
  useEffect(() => {
    const page = pageRef.current;
    if (!page) return;
    
    // Add initial state
    page.style.opacity = '0';
    page.style.transform = 'translateX(30px)';
    
    // Trigger entrance animation after a small delay
    const timer = setTimeout(() => {
      page.style.transition = 'opacity 0.8s ease, transform 0.8s cubic-bezier(0.22, 1, 0.36, 1)';
      page.style.opacity = '1';
      page.style.transform = 'translateX(0)';
    }, transitionDelay * 100);
    
    return () => clearTimeout(timer);
  }, [transitionDelay]);

  return (
    <div 
      ref={pageRef}
      className={cn(
        "book-page p-6 mb-10 relative", 
        spiral && "border-t border-l border-b border-ink/10 rounded-l-md",
        className
      )}
    >
      {spiral && (
        <div className="absolute left-0 inset-y-0 w-6 flex flex-col justify-around items-center">
          {[...Array(7)].map((_, i) => (
            <div key={i} className="w-3 h-3 rounded-full bg-ink/20"></div>
          ))}
        </div>
      )}
      
      {corner && (
        <div className="absolute top-0 right-0 w-0 h-0 border-t-20 border-r-20 border-t-ink/5 border-r-parchment-dark transform -translate-y-1 translate-x-1"></div>
      )}
      {pageNumber && (
        <div className="absolute bottom-2 right-4 text-ink/40 font-handwriting text-sm">
          {pageNumber}
        </div>
      )}
      <div className={cn("relative z-10", spiral && "pl-4")}>
        {children}
      </div>
    </div>
  );
};

export default BookPage;
