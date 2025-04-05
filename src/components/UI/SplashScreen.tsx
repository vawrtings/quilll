
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import EnhancedAnimatedQuill from "@/components/UI/EnhancedAnimatedQuill";

interface SplashScreenProps {
  duration?: number; // in milliseconds
  onComplete?: () => void;
}

const SplashScreen = ({ duration = 3000, onComplete }: SplashScreenProps) => {
  const [isAnimationComplete, setIsAnimationComplete] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsAnimationComplete(true);
      
      if (onComplete) {
        onComplete();
      } else {
        // Default behavior: redirect based on first visit
        const isFirstVisit = !localStorage.getItem("device-selected");
        navigate(isFirstVisit ? "/select-device" : "/");
      }
    }, duration);

    return () => clearTimeout(timer);
  }, [duration, navigate, onComplete]);

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-parchment z-50">
      <div className="text-center">
        <EnhancedAnimatedQuill
          text="Quill"
          cursorStyle="quill"
          style="cursive"
          size="xl"
          speed={2}
        />
        <div className="mt-4 opacity-70 font-handwriting">
          <EnhancedAnimatedQuill
            text="Where words become art"
            cursorStyle="none"
            delay={1}
            speed={1.5}
          />
        </div>
      </div>
    </div>
  );
};

export default SplashScreen;
