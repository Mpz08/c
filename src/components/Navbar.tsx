
'use client';

import Link from 'next/link';
import { ChefHat, TrendingUp, Home, PlusSquare, Search, User } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { currentUser } from '@/lib/mock-data';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';

export function Navbar() {
  return (
    <nav className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container mx-auto flex h-16 items-center justify-between px-4">
        <Link href="/" className="flex items-center gap-2 text-primary">
          <ChefHat className="h-8 w-8" />
          <span className="font-headline text-xl font-bold tracking-tight text-foreground">FlavorFeed</span>
        </Link>

        <div className="hidden md:flex items-center gap-1 bg-muted/50 p-1 rounded-full px-4 border">
          <Search className="h-4 w-4 text-muted-foreground" />
          <input 
            type="text" 
            placeholder="Search recipes, chefs..." 
            className="bg-transparent border-none focus:outline-none text-sm p-2 w-64"
          />
        </div>

        <div className="flex items-center gap-4">
          <Link href="/">
            <Button variant="ghost" size="icon" className="hover:text-primary">
              <Home className="h-5 w-5" />
            </Button>
          </Link>
          <Link href="/trending">
            <Button variant="ghost" size="icon" className="hover:text-primary">
              <TrendingUp className="h-5 w-5" />
            </Button>
          </Link>
          <Link href="/upload">
            <Button variant="primary" size="sm" className="rounded-full px-4">
              <PlusSquare className="h-4 w-4 mr-2" /> Post
            </Button>
          </Link>
          <Link href={`/profile/${currentUser.username}`}>
            <Avatar className="h-8 w-8 border hover:ring-2 ring-primary transition-all">
              <AvatarImage src={currentUser.avatar} />
              <AvatarFallback><User /></AvatarFallback>
            </Avatar>
          </Link>
        </div>
      </div>
    </nav>
  );
}
