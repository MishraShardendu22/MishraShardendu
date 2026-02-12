/**
 * Application constants and configuration
 * All static values used across the application
 */

// Get backend URL from environment
const getBackendUrl = () => {
  const backendUrl = import.meta.env.VITE_BACKEND_1 || ''
  return backendUrl ? `${backendUrl}/api` : '/api'
}

// API Configuration
export const API_CONFIG = {
  BASE_URL: getBackendUrl(),
  BLOG_BASE_URL: getBackendUrl(),
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

// CDN image URLs (Cloudinary)
export const CDN_IMAGES = {
  ICON: 'https://res.cloudinary.com/dkxw15and/image/upload/v1770811006/image-upload-app/ehth0fbefclihy2a2qmj.png',
  PROFESSIONAL:
    'https://res.cloudinary.com/dkxw15and/image/upload/v1770811800/image-upload-app/whgmghnkqpj32ruoupdx.webp',
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
