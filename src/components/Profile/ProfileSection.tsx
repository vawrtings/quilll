
import React from "react";
import { Calendar, MapPin, Link2, Twitter, Instagram } from "lucide-react";
import { Button } from "@/components/ui/button";
import AnimatedQuill from "../UI/AnimatedQuill";

interface ProfileSectionProps {
  username: string;
  displayName: string;
  bio: string;
  location?: string;
  website?: string;
  twitter?: string;
  instagram?: string;
  joinDate: string;
  followers: number;
  following: number;
  publications: number;
}

const ProfileSection: React.FC<ProfileSectionProps> = ({
  username,
  displayName,
  bio,
  location,
  website,
  twitter,
  instagram,
  joinDate,
  followers,
  following,
  publications,
}) => {
  return (
    <div className="bg-parchment border-b border-ink/10 pb-8">
      <div className="max-w-5xl mx-auto px-4">
        <div className="pt-16 pb-8 relative">
          {/* Profile image */}
          <div className="w-24 h-24 sm:w-32 sm:h-32 bg-parchment-dark rounded-full border-4 border-parchment flex items-center justify-center">
            <span className="text-4xl sm:text-5xl font-playfair text-ink">
              {displayName.charAt(0)}
            </span>
          </div>
          
          {/* Follow button */}
          <div className="absolute right-0 top-20">
            <Button 
              className="bg-ink text-parchment hover:bg-ink-light"
              variant="default"
            >
              Follow
            </Button>
          </div>
          
          {/* Writer info */}
          <h1 className="text-2xl sm:text-3xl font-playfair font-semibold mt-4">
            {displayName}
          </h1>
          <p className="text-ink/60 mb-4">@{username}</p>
          
          <div className="mb-6">
            <AnimatedQuill text={bio} className="text-ink/80 leading-relaxed block" />
          </div>
          
          <div className="flex flex-wrap gap-y-2">
            {location && (
              <div className="flex items-center mr-6 text-sm text-ink/70">
                <MapPin className="h-4 w-4 mr-1" />
                {location}
              </div>
            )}
            
            <div className="flex items-center mr-6 text-sm text-ink/70">
              <Calendar className="h-4 w-4 mr-1" />
              Joined {joinDate}
            </div>
            
            {website && (
              <a 
                href={website.startsWith('http') ? website : `https://${website}`} 
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center mr-6 text-sm text-ink-light hover:text-ink"
              >
                <Link2 className="h-4 w-4 mr-1" />
                {website.replace(/^https?:\/\//, '')}
              </a>
            )}
            
            {twitter && (
              <a 
                href={`https://twitter.com/${twitter}`}
                target="_blank"
                rel="noopener noreferrer" 
                className="flex items-center mr-6 text-sm text-ink-light hover:text-ink"
              >
                <Twitter className="h-4 w-4 mr-1" />
                @{twitter}
              </a>
            )}
            
            {instagram && (
              <a 
                href={`https://instagram.com/${instagram}`}
                target="_blank"
                rel="noopener noreferrer" 
                className="flex items-center mr-6 text-sm text-ink-light hover:text-ink"
              >
                <Instagram className="h-4 w-4 mr-1" />
                @{instagram}
              </a>
            )}
          </div>
        </div>
        
        {/* Stats */}
        <div className="flex border-t border-ink/10 pt-4">
          <div className="mr-6">
            <span className="text-lg font-medium">{publications}</span>
            <span className="text-ink/60 text-sm ml-1">Publications</span>
          </div>
          
          <div className="mr-6">
            <span className="text-lg font-medium">{followers}</span>
            <span className="text-ink/60 text-sm ml-1">Followers</span>
          </div>
          
          <div>
            <span className="text-lg font-medium">{following}</span>
            <span className="text-ink/60 text-sm ml-1">Following</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfileSection;
