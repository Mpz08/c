
'use client';

import React, { useState } from 'react';
import { Card, CardContent, CardFooter, CardHeader } from '@/components/ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { Heart, MessageCircle, Share2, ThumbsDown, Flag, UserPlus } from 'lucide-react';
import { Post } from '@/lib/types';
import Link from 'next/link';
import { isCookingRelatedVideo } from '@/ai/flows/ai-cooking-content-moderation';
import { useToast } from '@/hooks/use-toast';
import { Badge } from '@/components/ui/badge';

interface VideoCardProps {
  post: Post;
}

export function VideoCard({ post }: VideoCardProps) {
  const [likes, setLikes] = useState(post.likes);
  const [dislikes, setDislikes] = useState(post.dislikes);
  const [isLiked, setIsLiked] = useState(false);
  const [isDisliked, setIsDisliked] = useState(false);
  const [isReporting, setIsReporting] = useState(false);
  const { toast } = useToast();

  const handleLike = () => {
    if (isLiked) {
      setLikes(likes - 1);
      setIsLiked(false);
    } else {
      setLikes(likes + 1);
      setIsLiked(true);
      if (isDisliked) {
        setDislikes(dislikes - 1);
        setIsDisliked(false);
      }
    }
  };

  const handleDislike = () => {
    if (isDisliked) {
      setDislikes(dislikes - 1);
      setIsDisliked(false);
    } else {
      setDislikes(dislikes + 1);
      setIsDisliked(true);
      if (isLiked) {
        setLikes(likes - 1);
        setIsLiked(false);
      }
    }
  };

  const handleReport = async () => {
    setIsReporting(true);
    try {
      const result = await isCookingRelatedVideo({
        videoTitle: post.title,
        videoDescription: post.description,
      });

      if (result.isCookingRelated) {
        toast({
          title: "Report Dismissed",
          description: "Our AI analyzed the post and confirmed it is cooking related.",
        });
      } else {
        toast({
          variant: "destructive",
          title: "Post Reported",
          description: `AI flagged this post: ${result.reason}`,
        });
      }
    } catch (error) {
      toast({
        variant: "destructive",
        title: "Report Error",
        description: "Failed to process report. Please try again later.",
      });
    } finally {
      setIsReporting(false);
    }
  };

  return (
    <Card className="overflow-hidden bg-card border-none shadow-md mb-6 max-w-2xl mx-auto">
      <CardHeader className="p-4 flex flex-row items-center justify-between">
        <div className="flex items-center gap-3">
          <Link href={`/profile/${post.username}`}>
            <Avatar className="h-10 w-10 border-2 border-primary">
              <AvatarImage src={post.userAvatar} />
              <AvatarFallback>{post.username[0]}</AvatarFallback>
            </Avatar>
          </Link>
          <div className="flex flex-col">
            <Link href={`/profile/${post.username}`} className="font-semibold text-sm hover:text-primary transition-colors">
              @{post.username}
            </Link>
            <span className="text-xs text-muted-foreground">{post.createdAt}</span>
          </div>
        </div>
        <Button variant="ghost" size="sm" className="text-primary hover:text-primary/80 hover:bg-primary/10">
          <UserPlus className="h-4 w-4 mr-1" /> Follow
        </Button>
      </CardHeader>

      <div className="relative aspect-[9/16] bg-black group">
        <video 
          src={post.videoUrl} 
          className="w-full h-full object-cover" 
          controls 
          poster={post.thumbnailUrl}
        />
        <div className="absolute top-4 right-4 flex flex-col gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
           <Button 
            variant="secondary" 
            size="icon" 
            className="rounded-full bg-black/40 text-white backdrop-blur-sm hover:bg-black/60"
            onClick={handleReport}
            disabled={isReporting}
           >
             <Flag className={`h-4 w-4 ${isReporting ? 'animate-pulse' : ''}`} />
           </Button>
        </div>
      </div>

      <CardContent className="p-4 space-y-2">
        <h3 className="font-headline text-lg font-bold text-foreground">{post.title}</h3>
        <p className="text-sm text-muted-foreground line-clamp-2">{post.description}</p>
      </CardContent>

      <CardFooter className="p-4 pt-0 flex items-center justify-between border-t border-border mt-2">
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-1">
            <Button 
              variant="ghost" 
              size="icon" 
              onClick={handleLike}
              className={isLiked ? 'text-primary' : 'text-muted-foreground'}
            >
              <Heart className={`h-5 w-5 ${isLiked ? 'fill-current' : ''}`} />
            </Button>
            <span className="text-xs font-medium">{likes.toLocaleString()}</span>
          </div>
          <div className="flex items-center gap-1">
            <Button 
              variant="ghost" 
              size="icon" 
              onClick={handleDislike}
              className={isDisliked ? 'text-accent' : 'text-muted-foreground'}
            >
              <ThumbsDown className={`h-5 w-5 ${isDisliked ? 'fill-current' : ''}`} />
            </Button>
            <span className="text-xs font-medium">{dislikes.toLocaleString()}</span>
          </div>
          <div className="flex items-center gap-1">
            <Button variant="ghost" size="icon" className="text-muted-foreground">
              <MessageCircle className="h-5 w-5" />
            </Button>
            <span className="text-xs font-medium">{post.comments.length}</span>
          </div>
        </div>
        <Button variant="ghost" size="icon" className="text-muted-foreground">
          <Share2 className="h-5 w-5" />
        </Button>
      </CardFooter>
    </Card>
  );
}
