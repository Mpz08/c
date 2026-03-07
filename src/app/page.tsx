
'use client';

import React, { useState } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { VideoCard } from '@/components/VideoCard';
import { mockPosts } from '@/lib/mock-data';
import { ScrollArea } from '@/components/ui/scroll-area';

export default function Home() {
  const [activeTab, setActiveTab] = useState('following');

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-2xl mx-auto mb-8 text-center">
        <h1 className="font-headline text-3xl font-bold mb-2">Welcome to FlavorFeed</h1>
        <p className="text-muted-foreground">Discover and share your favorite culinary creations.</p>
      </div>

      <Tabs defaultValue="following" className="max-w-2xl mx-auto" onValueChange={setActiveTab}>
        <div className="flex justify-center mb-6">
          <TabsList className="grid w-[400px] grid-cols-2">
            <TabsTrigger value="following">Following</TabsTrigger>
            <TabsTrigger value="for-you">For You</TabsTrigger>
          </TabsList>
        </div>

        <TabsContent value="following" className="mt-0">
          <div className="space-y-6">
            {mockPosts.map((post) => (
              <VideoCard key={post.id} post={post} />
            ))}
          </div>
        </TabsContent>

        <TabsContent value="for-you" className="mt-0">
           <div className="space-y-6">
            {[...mockPosts].reverse().map((post) => (
              <VideoCard key={post.id} post={post} />
            ))}
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}
