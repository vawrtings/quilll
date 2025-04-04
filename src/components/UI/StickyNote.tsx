
import React from "react";
import { cn } from "@/lib/utils";

interface StickyNoteProps {
  children: React.ReactNode;
  className?: string;
  color?: "yellow" | "blue" | "pink" | "green";
  rotation?: number;
  floating?: boolean;
}

const StickyNote: React.FC<StickyNoteProps> = ({
  children,
  className,
  color = "yellow",
  rotation = 0,
  floating = false,
}) => {
  const colorClasses = {
    yellow: "bg-amber-100 shadow-amber-200/50",
    blue: "bg-blue-100 shadow-blue-200/50",
    pink: "bg-pink-100 shadow-pink-200/50",
    green: "bg-emerald-100 shadow-emerald-200/50",
  };

  return (
    <div
      className={cn(
        "sticky-note p-4 max-w-xs", 
        colorClasses[color],
        floating && "animate-float",
        className
      )}
      style={{ 
        transform: `rotate(${rotation}deg)`,
        transformOrigin: "center center"
      }}
    >
      <div className="font-handwriting text-ink-dark">
        {children}
      </div>
    </div>
  );
};

export default StickyNote;
