
import React, { useEffect, useRef } from "react";
import { cn } from "@/lib/utils";

interface AnimatedQuillProps {
  text: string;
  className?: string;
  delay?: number;
  speed?: number;
  onComplete?: () => void;
}

const AnimatedQuill: React.FC<AnimatedQuillProps> = ({
  text,
  className,
  delay = 0,
  speed = 1.5,
  onComplete
}) => {
  const quillRef = useRef<HTMLSpanElement>(null);
  
  useEffect(() => {
    const quillElement = quillRef.current;
    
    if (!quillElement) return;
    
    // Set animation delay and duration based on props
    quillElement.style.animationDelay = `${delay}s`;
    quillElement.style.animationDuration = `${speed}s`;
    
    // Handle animation completion
    const handleAnimationEnd = () => {
      if (onComplete) onComplete();
    };
    
    quillElement.addEventListener('animationend', handleAnimationEnd);
    
    return () => {
      quillElement.removeEventListener('animationend', handleAnimationEnd);
    };
  }, [delay, speed, onComplete]);
  
  return (
    <span 
      ref={quillRef} 
      className={cn("quill-text", className)}
    >
      {text}
    </span>
  );
};

export default AnimatedQuill;
