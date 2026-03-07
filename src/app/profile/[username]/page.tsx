
'use client';

import React from 'react';
import { useParams } from 'next/navigation';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { VideoCard } from '@/components/VideoCard';
import { mockPosts, currentUser } from '@/lib/mock-data';
import { Settings, Share2, Grid, Video, Camera, MessageSquare, List } from 'lucide-react';

export default function ProfilePage() {
  const { username } = useParams();
  
  // In a real app, fetch user by username. For now, use current user or mock.
  const profileUser = username === currentUser.username ? currentUser : {
    ...currentUser,
    username: username as string,
    displayName: (username as string).replace('_', ' ').toUpperCase(),
  };

  const userPosts = mockPosts.filter(p => p.username === profileUser.username || profileUser.id === currentUser.id);

  return (
    <div className="container mx-auto px-4 py-8 max-w-4xl">
      <div className="flex flex-col md:flex-row items-center md:items-start gap-8 mb-12">
        <Avatar className="h-32 w-32 md:h-40 md:w-40 border-4 border-primary ring-4 ring-primary/20">
          <AvatarImage src={profileUser.avatar} />
          <AvatarFallback>{profileUser.username[0]}</AvatarFallback>
        </Avatar>
        
        <div className="flex-1 text-center md:text-left space-y-4">
          <div className="flex flex-col md:flex-row md:items-center gap-4">
            <h1 className="text-3xl font-headline font-bold">{profileUser.displayName}</h1>
            <div className="flex items-center justify-center md:justify-start gap-2">
              <Button size="sm" variant="outline">Edit Profile</Button>
              <Button size="sm" variant="outline" size="icon"><Settings className="h-4 w-4" /></Button>
              <Button size="sm" variant="outline" size="icon"><Share2 className="h-4 w-4" /></Button>
            </div>
          </div>
          
          <div className="flex items-center justify-center md:justify-start gap-6 text-sm font-medium">
            <span><strong className="text-lg font-bold">{userPosts.length}</strong> posts</span>
            <span><strong className="text-lg font-bold">{profileUser.followersCount}</strong> followers</span>
            <span><strong className="text-lg font-bold">{profileUser.followingCount}</strong> following</span>
          </div>

          <div>
            <p className="font-semibold text-primary">@{profileUser.username}</p>
            <p className="text-muted-foreground mt-1">{profileUser.bio}</p>
          </div>
        </div>
      </div>

      <Tabs defaultValue="videos" className="w-full">
        <TabsList className="w-full grid grid-cols-4 mb-8">
          <TabsTrigger value="videos" className="flex items-center gap-2">
            <Video className="h-4 w-4" /> <span className="hidden sm:inline">Videos</span>
          </TabsTrigger>
          <TabsTrigger value="pictures" className="flex items-center gap-2">
            <Camera className="h-4 w-4" /> <span className="hidden sm:inline">Pictures</span>
          </TabsTrigger>
          <TabsTrigger value="comments" className="flex items-center gap-2">
            <MessageSquare className="h-4 w-4" /> <span className="hidden sm:inline">Comments</span>
          </TabsTrigger>
          <TabsTrigger value="feed" className="flex items-center gap-2">
            <List className="h-4 w-4" /> <span className="hidden sm:inline">Full Feed</span>
          </TabsTrigger>
        </TabsList>

        <TabsContent value="videos">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {userPosts.map(post => (
              <div key={post.id} className="aspect-[9/16] relative rounded-lg overflow-hidden group border">
                <img src={post.thumbnailUrl} alt={post.title} className="w-full h-full object-cover" />
                <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex flex-col justify-end p-4 text-white">
                  <p className="font-bold text-sm truncate">{post.title}</p>
                  <p className="text-xs flex items-center gap-1"><Video className="h-3 w-3" /> {post.likes} likes</p>
                </div>
              </div>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="pictures">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
             {/* Mocking picture content */}
             {[1,2,3,4].map(i => (
               <div key={i} className="aspect-square bg-muted rounded-lg overflow-hidden border">
                  <img src={`https://picsum.photos/seed/pic${i}/400/400`} alt="Cooking snapshot" className="w-full h-full object-cover" />
               </div>
             ))}
          </div>
        </TabsContent>

        <TabsContent value="comments">
          <div className="space-y-4">
            {userPosts.flatMap(p => p.comments).map(c => (
              <div key={c.id} className="p-4 bg-muted/30 rounded-lg border border-border">
                <p className="text-sm italic">"{c.content}"</p>
                <p className="text-xs text-muted-foreground mt-2">Commented on {c.createdAt}</p>
              </div>
            ))}
            {userPosts.flatMap(p => p.comments).length === 0 && (
              <div className="text-center py-12 text-muted-foreground">No recent comments.</div>
            )}
          </div>
        </TabsContent>

        <TabsContent value="feed">
           <div className="max-w-2xl mx-auto space-y-6">
            {userPosts.map(post => (
              <VideoCard key={post.id} post={post} />
            ))}
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}
