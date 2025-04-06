// Type definitions for client side
// These should match the types from shared/schema.ts

export interface CarouselItem {
  id: number;
  title: string;
  description: string;
  imageUrl: string;
  order: number;
}

export interface CulturalItem {
  id: number;
  title: string;
  description: string;
  imageUrl: string;
  category: string;
  state: string;
  featured: boolean;
}

export interface Event {
  id: number;
  title: string;
  description: string;
  date: string;
  month: string;
  day: number;
  time: string;
  location: string;
  category: string;
  imageUrl?: string;
}

export interface GalleryItem {
  id: number;
  title: string;
  location: string;
  imageUrl: string;
  category: string;
}

export interface HeritageInfo {
  id: number;
  title: string;
  description: string;
  imageUrl?: string;
  category: string;
}

export interface Subscriber {
  id: number;
  email: string;
  createdAt: string;
}
