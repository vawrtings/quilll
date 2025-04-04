
import React, { useEffect, useRef } from "react";
import { cn } from "@/lib/utils";

interface AnimatedQuillProps {
  text: string;
  className?: string;
  delay?: number;
  speed?: number;
  cursorStyle?: "pen" | "quill" | "none";
  cursorSize?: "sm" | "md" | "lg";
  style?: "cursive" | "handwritten" | "normal";
  onComplete?: () => void;
}

const AnimatedQuill: React.FC<AnimatedQuillProps> = ({
  text,
  className,
  delay = 0,
  speed = 1.5,
  cursorStyle = "pen",
  cursorSize = "md",
  style = "normal",
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
  
  const cursorSizeClass = {
    sm: "text-xs",
    md: "text-sm",
    lg: "text-base"
  };

  const fontStyleClass = {
    cursive: "font-handwriting",
    handwritten: "font-handwriting",
    normal: ""
  };
  
  return (
    <span 
      ref={quillRef} 
      className={cn(
        "quill-text", 
        cursorStyle === "pen" && "cursor-pen",
        cursorStyle === "quill" && "cursor-quill",
        fontStyleClass[style],
        cursorSizeClass[cursorSize],
        className
      )}
      style={{
        textRendering: "optimizeLegibility"
      }}
    >
      {text}
    </span>
  );
};

export default AnimatedQuill;
