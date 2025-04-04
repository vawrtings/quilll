
import React, { useEffect, useRef } from "react";
import { cn } from "@/lib/utils";

interface BookPageProps {
  children: React.ReactNode;
  className?: string;
  transitionDelay?: number;
  pageNumber?: number;
}

const BookPage: React.FC<BookPageProps> = ({
  children,
  className,
  transitionDelay = 0,
  pageNumber,
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
      page.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
      page.style.opacity = '1';
      page.style.transform = 'translateX(0)';
    }, transitionDelay * 100);
    
    return () => clearTimeout(timer);
  }, [transitionDelay]);

  return (
    <div 
      ref={pageRef}
      className={cn(
        "book-page p-6 mb-8", 
        className
      )}
    >
      {pageNumber && (
        <div className="absolute bottom-2 right-4 text-ink/40 font-handwriting text-sm">
          {pageNumber}
        </div>
      )}
      {children}
    </div>
  );
};

export default BookPage;
