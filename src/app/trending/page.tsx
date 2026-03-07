
'use client';

import React from 'react';
import { VideoCard } from '@/components/VideoCard';
import { mockPosts } from '@/lib/mock-data';
import { TrendingUp, Flame, Star } from 'lucide-react';
import { Badge } from '@/components/ui/badge';

export default function TrendingPage() {
  // Sort by likes descending to simulate trending
  const trendingPosts = [...mockPosts].sort((a, b) => b.likes - a.likes);

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-2xl mx-auto mb-8 flex items-center justify-between">
        <div>
          <h1 className="font-headline text-3xl font-bold flex items-center gap-2">
            <Flame className="text-primary h-8 w-8" /> Trending Now
          </h1>
          <p className="text-muted-foreground mt-1">What the world is cooking today.</p>
        </div>
        <div className="flex gap-2">
          <Badge variant="secondary" className="px-3 py-1">#Viral</Badge>
          <Badge variant="secondary" className="px-3 py-1">#ChefsChoice</Badge>
        </div>
      </div>

      <div className="max-w-2xl mx-auto space-y-6">
        {trendingPosts.map((post) => (
          <div key={post.id} className="relative">
             <VideoCard post={post} />
          </div>
        ))}
      </div>
    </div>
  );
}
