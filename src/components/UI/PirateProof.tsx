
import React from "react";
import { cn } from "@/lib/utils";

interface PirateProofProps {
  children: React.ReactNode;
  author: string;
  className?: string;
  disableCopy?: boolean;
  showWatermark?: boolean;
}

const PirateProof: React.FC<PirateProofProps> = ({
  children,
  author,
  className,
  disableCopy = true,
  showWatermark = true,
}) => {
  // Handle right click to prevent saving
  const handleContextMenu = (e: React.MouseEvent) => {
    if (disableCopy) {
      e.preventDefault();
      return false;
    }
  };

  // Handle key combinations for copy
  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (
      disableCopy &&
      ((e.ctrlKey || e.metaKey) && (e.key === "c" || e.key === "C"))
    ) {
      e.preventDefault();
      return false;
    }
  };

  return (
    <div
      className={cn(
        disableCopy && "pirate-proof",
        showWatermark && "watermark",
        className
      )}
      data-author={`© ${author}`}
      onContextMenu={handleContextMenu}
      onKeyDown={handleKeyDown}
    >
      {children}
    </div>
  );
};

export default PirateProof;
