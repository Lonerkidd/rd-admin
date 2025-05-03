import { Document } from 'mongoose'

//Create a user Interface type

export interface IUser extends Document {
    id: string;
    email: string;
    password: string;
    name: string;
    role: 'user' | 'admin';
    createdAt: Date;
    updatedAt: Date;
    comparePassword(candidatePassword: string): Promise<boolean>;
}

// Common base interface for content items
export interface ContentItemBase {
  _id: string;
  title: string;
  content: string;
  slug: string;
  excerpt: string;
  client?: string;
  tags: string;
  image?: File | string | null;
  video?: string;
  author?: string;
  createdAt?: Date;
  updatedAt?: Date;
}

// Blog Form types
export type BlogFormValues = ContentItemBase

export interface BlogFormProps {
  defaultValues?: Partial<BlogFormValues>;
  mode: 'create' | 'edit';
}

export type FormValues = ContentItemBase

// Portfolio Types
export interface PortfolioItem extends ContentItemBase {
  category: string;
  client: string;
  videoLink?: string;  // Renamed from video for consistency with naming pattern
  photoLink?: string;  // Alternative to image for portfolio-specific needs
}