// Application Constants
// Define constant values used throughout the application

export const APP_NAME = "SCISA College";
export const APP_VERSION = "1.0.0";

// API Configuration
export const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || "http://localhost:3000/api";

// Sanity Configuration
export const SANITY_CONFIG = {
  projectId: import.meta.env.VITE_SANITY_PROJECT_ID,
  dataset: import.meta.env.VITE_SANITY_DATASET || "production",
  apiVersion: "2023-10-01",
  useCdn: true
} as const;

// Image Sizes for Optimization
export const IMAGE_SIZES = {
  thumbnail: { width: 150, height: 150 },
  card: { width: 400, height: 300 },
  hero: { width: 1200, height: 600 },
  profile: { width: 300, height: 300 }
} as const;

// Pagination
export const ITEMS_PER_PAGE = {
  news: 12,
  departments: 9,
  executives: 8,
  events: 10
} as const;

// Breakpoints (matching Tailwind defaults)
export const BREAKPOINTS = {
  sm: 640,
  md: 768,
  lg: 1024,
  xl: 1280,
  "2xl": 1536
} as const;

// Animation Durations (in ms)
export const ANIMATION_DURATION = {
  fast: 150,
  normal: 300,
  slow: 500
} as const;
