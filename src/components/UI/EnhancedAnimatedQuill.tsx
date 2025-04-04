
import { useEffect, useState } from "react";

interface EnhancedAnimatedQuillProps {
  text: string;
  cursorStyle?: "pen" | "quill" | "none";
  style?: "normal" | "cursive" | "bold";
  delay?: number; // seconds
  speed?: number; // multiplier
  inline?: boolean;
  size?: "small" | "medium" | "large" | "xl";
}

const EnhancedAnimatedQuill = ({
  text,
  cursorStyle = "pen",
  style = "normal",
  delay = 0,
  speed = 1,
  inline = false,
  size = "medium",
}: EnhancedAnimatedQuillProps) => {
  const [displayText, setDisplayText] = useState("");
  const [isAnimating, setIsAnimating] = useState(false);

  useEffect(() => {
    let timeout: NodeJS.Timeout;
    
    // Start animation after specified delay
    if (delay > 0) {
      timeout = setTimeout(() => {
        setIsAnimating(true);
      }, delay * 1000);
    } else {
      setIsAnimating(true);
    }
    
    return () => {
      if (timeout) clearTimeout(timeout);
    };
  }, [delay]);

  useEffect(() => {
    if (!isAnimating) return;
    
    const charTypingSpeed = 80 / speed;
    let pos = 0;
    let interval: NodeJS.Timeout;
    
    // Character-by-character animation
    interval = setInterval(() => {
      if (pos < text.length) {
        setDisplayText(text.substring(0, pos + 1));
        pos++;
      } else {
        clearInterval(interval);
      }
    }, charTypingSpeed);
    
    return () => {
      clearInterval(interval);
    };
  }, [text, speed, isAnimating]);

  const fontClass = () => {
    switch (style) {
      case "cursive":
        return "font-cursive";
      case "bold":
        return "font-handwriting font-bold";
      default:
        return "font-handwriting";
    }
  };

  const sizeClass = () => {
    switch (size) {
      case "small":
        return "text-base";
      case "large":
        return "text-2xl md:text-3xl";
      case "xl":
        return "text-3xl md:text-4xl lg:text-5xl";
      default:
        return "text-xl";
    }
  };

  const cursorClass = () => {
    if (cursorStyle === "none") return "";
    return cursorStyle === "quill" ? "cursor-quill" : "cursor-pen";
  };

  const containerTag = inline ? "span" : "div";

  const ContainerTag = containerTag as keyof JSX.IntrinsicElements;

  return (
    <ContainerTag className={`${cursorClass()} ${sizeClass()} ${fontClass()} quill-text`}>
      {displayText}
    </ContainerTag>
  );
};

export default EnhancedAnimatedQuill;
