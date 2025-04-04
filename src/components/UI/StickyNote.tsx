
import React from "react";
import { cn } from "@/lib/utils";

interface StickyNoteProps {
  children: React.ReactNode;
  className?: string;
  color?: "yellow" | "blue" | "pink" | "green" | "purple" | "orange";
  rotation?: number;
  floating?: boolean;
  onClick?: () => void;
  interactive?: boolean;
}

const StickyNote: React.FC<StickyNoteProps> = ({
  children,
  className,
  color = "yellow",
  rotation = 0,
  floating = false,
  onClick,
  interactive = false,
}) => {
  const colorClasses = {
    yellow: "bg-amber-100 shadow-amber-200/50",
    blue: "bg-blue-100 shadow-blue-200/50",
    pink: "bg-pink-100 shadow-pink-200/50",
    green: "bg-emerald-100 shadow-emerald-200/50",
    purple: "bg-purple-100 shadow-purple-200/50",
    orange: "bg-orange-100 shadow-orange-200/50",
  };

  return (
    <div
      className={cn(
        "sticky-note p-4 max-w-xs", 
        colorClasses[color],
        floating && "animate-float",
        interactive && "cursor-pointer transform hover:scale-105 hover:-translate-y-1 transition-all duration-300",
        className
      )}
      style={{ 
        transform: `rotate(${rotation}deg)`,
        transformOrigin: "center center"
      }}
      onClick={onClick}
      role={interactive ? "button" : undefined}
      tabIndex={interactive ? 0 : undefined}
    >
      <div className="font-handwriting text-ink-dark">
        {children}
      </div>
    </div>
  );
};

export default StickyNote;
