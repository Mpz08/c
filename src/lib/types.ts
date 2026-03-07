
export interface User {
  id: string;
  username: string;
  displayName: string;
  avatar: string;
  bio: string;
  followersCount: number;
  followingCount: number;
}

export interface Comment {
  id: string;
  userId: string;
  username: string;
  userAvatar: string;
  content: string;
  createdAt: string;
}

export interface Post {
  id: string;
  userId: string;
  username: string;
  userAvatar: string;
  title: string;
  description: string;
  videoUrl: string;
  thumbnailUrl: string;
  likes: number;
  dislikes: number;
  comments: Comment[];
  shares: number;
  createdAt: string;
  isCooking: boolean;
}
