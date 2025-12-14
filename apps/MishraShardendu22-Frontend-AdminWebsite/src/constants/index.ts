/**
 * Application constants and configuration
 * All static values used across the application
 */

// API Configuration
export const API_CONFIG = {
  BLOG_BASE_URL: 'https://mishrashardendu22-backend-blogwebsite.onrender.com/api',
  TIMEOUT: 60000,
  MAX_RETRIES: 3,
  RETRY_DELAY: 1000,
} as const

// Pagination defaults
export const PAGINATION = {
  DEFAULT_PAGE: 1,
  DEFAULT_LIMIT: 10,
  ITEMS_PER_PAGE: 6,
} as const

// Route paths
export const ROUTES = {
  LOGIN: '/admin/login',
  DASHBOARD: '/admin',
  PROJECTS: '/admin/projects',
  EXPERIENCES: '/admin/experiences',
  SKILLS: '/admin/skills',
  CERTIFICATIONS: '/admin/certifications',
  VOLUNTEER: '/admin/volunteer',
  KANBAN: '/admin/kanban',
  PROFILE: '/admin/profile',
  BLOG_REORDER: '/admin/blog-reorder',
} as const

// Storage keys
export const STORAGE_KEYS = {
  JWT_TOKEN: 'jwt_token',
  AUTH_TOKEN: 'authToken',
  THEME: 'theme',
} as const

// UI constants
export const UI = {
  TOAST_DURATION: 3000,
  ANIMATION_DURATION: 300,
  DEBOUNCE_DELAY: 300,
} as const

// Status constants
export const STATUS = {
  LOADING: 'loading',
  SUCCESS: 'success',
  ERROR: 'error',
  IDLE: 'idle',
} as const

export type Status = (typeof STATUS)[keyof typeof STATUS]
