
import { Post, User } from './types';
import { PlaceHolderImages } from './placeholder-images';

export const currentUser: User = {
  id: 'u1',
  username: 'gordon_chef',
  displayName: 'Gordon Ramsey',
  avatar: PlaceHolderImages.find(i => i.id === 'user1')?.imageUrl || '',
  bio: 'Passion for perfection. Cook with me!',
  followersCount: 1200,
  followingCount: 450,
};

export const mockPosts: Post[] = [
  {
    id: 'p1',
    userId: 'u1',
    username: 'gordon_chef',
    userAvatar: PlaceHolderImages.find(i => i.id === 'user1')?.imageUrl || '',
    title: 'The Perfect Ribeye Steak',
    description: 'Learn the secrets to a restaurant-quality sear and butter basting.',
    videoUrl: 'https://www.w3schools.com/html/mov_bbb.mp4',
    thumbnailUrl: PlaceHolderImages.find(i => i.id === 'cook1')?.imageUrl || '',
    likes: 4500,
    dislikes: 12,
    comments: [
      { id: 'c1', userId: 'u2', username: 'foodie_jane', userAvatar: PlaceHolderImages.find(i => i.id === 'user2')?.imageUrl || '', content: 'This looks incredible! Trying it tonight.', createdAt: '2h ago' }
    ],
    shares: 890,
    createdAt: '1d ago',
    isCooking: true,
  },
  {
    id: 'p2',
    userId: 'u2',
    username: 'foodie_jane',
    userAvatar: PlaceHolderImages.find(i => i.id === 'user2')?.imageUrl || '',
    title: 'Handmade Pappardelle',
    description: 'Nothing beats fresh pasta from scratch. Simple ingredients, amazing results.',
    videoUrl: 'https://www.w3schools.com/html/movie.mp4',
    thumbnailUrl: PlaceHolderImages.find(i => i.id === 'cook2')?.imageUrl || '',
    likes: 2300,
    dislikes: 5,
    comments: [],
    shares: 120,
    createdAt: '3h ago',
    isCooking: true,
  },
  {
    id: 'p3',
    userId: 'u3',
    username: 'baking_pro',
    userAvatar: 'https://picsum.photos/seed/chef3/200/200',
    title: 'Double Choc Chip Cookies',
    description: 'Crispy edges, gooey center. The ultimate recipe.',
    videoUrl: 'https://www.w3schools.com/html/mov_bbb.mp4',
    thumbnailUrl: PlaceHolderImages.find(i => i.id === 'cook4')?.imageUrl || '',
    likes: 1200,
    dislikes: 3,
    comments: [],
    shares: 45,
    createdAt: '5h ago',
    isCooking: true,
  }
];
