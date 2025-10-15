// Global Type Definitions
// Define all TypeScript interfaces and types here

// Example types for college portfolio:

export interface Department {
  id: string;
  name: string;
  slug: string;
  description: string;
  image?: string;
  faculty?: Faculty[];
  courses?: Course[];
}

export interface NewsArticle {
  id: string;
  title: string;
  slug: string;
  excerpt: string;
  content: string;
  publishedAt: string;
  author: string;
  image?: string;
  tags?: string[];
}

export interface Executive {
  id: string;
  name: string;
  position: string;
  bio: string;
  image?: string;
  email?: string;
  phone?: string;
}

export interface Faculty {
  id: string;
  name: string;
  title: string;
  department: string;
  bio?: string;
  image?: string;
  email?: string;
}

export interface Course {
  id: string;
  code: string;
  name: string;
  description: string;
  credits: number;
  prerequisites?: string[];
}

export interface Event {
  id: string;
  title: string;
  description: string;
  date: string;
  location: string;
  image?: string;
}
