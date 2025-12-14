/**
 * Application constants and configuration
 * All static values used across the application
 */

// API Configuration
export const API_CONFIG = {
  BASE_URL: import.meta.env.VITE_API_URL || 'http://localhost:3000',
  TIMEOUT: 30000,
  MIN_REQUEST_INTERVAL: 100, // ms between requests
} as const

// Pagination defaults
export const PAGINATION = {
  DEFAULT_PAGE: 1,
  DEFAULT_LIMIT: 10,
  BLOG_PAGE_SIZE: 6,
} as const

// Route paths
export const ROUTES = {
  HOME: '/',
  BLOG: '/blog',
  BLOG_CREATE: '/blog/create',
  BLOG_DETAIL: '/blog/:id',
  DASHBOARD: '/dashboard',
  LOGIN: '/login',
} as const

// Storage keys
export const STORAGE_KEYS = {
  AUTH_TOKEN: 'authToken',
  THEME: 'theme',
  USER: 'user',
} as const

// UI constants
export const UI = {
  TOAST_DURATION: 3000,
  ANIMATION_DURATION: 300,
  DEBOUNCE_DELAY: 300,
  MAX_EXCERPT_LENGTH: 150,
} as const

// Status constants
export const STATUS = {
  LOADING: 'loading',
  SUCCESS: 'success',
  ERROR: 'error',
  IDLE: 'idle',
} as const

export type Status = (typeof STATUS)[keyof typeof STATUS]
