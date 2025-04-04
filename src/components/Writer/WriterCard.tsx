
import { useState } from "react";
import { Link } from "react-router-dom";
import { Heart, MessageSquare, Share2, BookOpen } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import PirateProof from "../UI/PirateProof";

interface WriterCardProps {
  id: string;
  author: string;
  authorId: string;
  title: string;
  content: string;
  date: string;
  likes: number;
  comments: number;
  readingTime: string;
  className?: string;
}

const WriterCard = ({
  id,
  author,
  authorId,
  title,
  content,
  date,
  likes,
  comments,
  readingTime,
  className,
}: WriterCardProps) => {
  const [isLiked, setIsLiked] = useState(false);
  const [likeCount, setLikeCount] = useState(likes);
  const [isInkAnimating, setIsInkAnimating] = useState(false);

  const toggleLike = () => {
    setIsLiked(!isLiked);
    setLikeCount(isLiked ? likeCount - 1 : likeCount + 1);
    setIsInkAnimating(true);
    setTimeout(() => setIsInkAnimating(false), 2000);
  };

  const truncateContent = (text: string, maxLength = 280) => {
    if (text.length <= maxLength) return text;
    return text.slice(0, maxLength) + "...";
  };

  return (
    <div className={cn("bg-white rounded-lg shadow-sm border border-ink/5 overflow-hidden", className)}>
      <div className="p-5">
        <div className="flex items-center mb-4">
          <Link to={`/writer/${authorId}`} className="flex items-center group">
            <div className="w-10 h-10 rounded-full bg-parchment-dark flex items-center justify-center text-ink font-playfair text-lg">
              {author.charAt(0)}
            </div>
            <div className="ml-3">
              <p className="text-ink font-medium group-hover:text-ink/70 transition-colors">{author}</p>
              <p className="text-xs text-ink/60">{date} • {readingTime}</p>
            </div>
          </Link>
        </div>

        <Link to={`/writing/${id}`} className="block group">
          <h3 className="text-xl font-playfair font-medium mb-2 group-hover:text-ink/80 transition-colors">{title}</h3>
          
          <PirateProof author={author} className="mb-4">
            <p className="text-ink/80 leading-relaxed">
              {truncateContent(content)}
            </p>
          </PirateProof>
          
          {content.length > 280 && (
            <span className="text-ink/60 text-sm hover:text-ink/80 transition-colors">
              Read more
            </span>
          )}
        </Link>

        <div className="flex items-center mt-5 pt-4 border-t border-ink/5">
          <Button 
            variant="ghost" 
            size="sm" 
            className={cn(
              "ink-splash rounded-full hover:bg-transparent p-2", 
              isLiked ? "text-red-500" : "text-ink/70 hover:text-red-500"
            )}
            onClick={toggleLike}
          >
            <Heart className={cn("h-5 w-5", isLiked ? "fill-current" : "")} />
            <span className="ml-1">{likeCount}</span>
          </Button>
          
          <Button 
            variant="ghost" 
            size="sm" 
            className="rounded-full text-ink/70 hover:text-ink hover:bg-transparent p-2"
          >
            <MessageSquare className="h-5 w-5" />
            <span className="ml-1">{comments}</span>
          </Button>
          
          <Button 
            variant="ghost" 
            size="sm" 
            className="rounded-full text-ink/70 hover:text-ink hover:bg-transparent p-2 ml-auto"
          >
            <Share2 className="h-5 w-5" />
          </Button>
          
          <Button 
            variant="ghost" 
            size="sm" 
            className="rounded-full text-ink/70 hover:text-ink hover:bg-transparent p-2"
          >
            <BookOpen className="h-5 w-5" />
          </Button>
        </div>
      </div>
    </div>
  );
};

export default WriterCard;
