/**
 * Core type definitions for the Blog application
 * All TypeScript interfaces and types used across the application
 */

// =============================================================================
// USER TYPES
// =============================================================================

export interface User {
  id: number
  email: string
  name: string
  profileImage?: string
  image?: string
  avatar?: string
  profile?: UserProfile | null
  isVerified: boolean
  isOwner: boolean
  createdAt?: string
}

export interface UserProfile {
  firstName: string | null
  lastName: string | null
  avatar: string | null
}

export interface Author {
  id: number
  name: string
  email: string
  image?: string
  profileImage?: string
  avatar?: string
  profile?: UserProfile
}

// =============================================================================
// API RESPONSE TYPES
// =============================================================================

export interface ApiResponse<T = unknown> {
  success: boolean
  message?: string
  data?: T
  error?: string
}

export interface AuthResponse extends ApiResponse<{ token: string; user: User }> {
  requiresVerification?: boolean
}

export interface PaginationMeta {
  page: number
  limit: number
  total: number
  totalPages: number
}

export interface PaginatedResponse<T> extends ApiResponse<T> {
  pagination?: PaginationMeta
}

// =============================================================================
// BLOG TYPES
// =============================================================================

export interface Blog {
  id: number
  title: string
  url?: string
  image?: string
  content: string
  tags?: string[]
  authorId: number
  createdAt: string
  updatedAt: string
  author?: Author
  authorProfile?: UserProfile | null
  comments?: number
  summary?: string
  published?: boolean
}

export interface Comment {
  id: number
  content: string
  blogId: number
  userId: number
  createdAt: string
  user?: Author
}

export interface BlogStats {
  totalBlogs: number
  totalComments: number
  recentPosts: Blog[]
  popularTags: Array<{ tag: string; count: number }>
}

// =============================================================================
// ERROR TYPES
// =============================================================================

export class ApiError extends Error {
  constructor(
    message: string,
    public statusCode?: number,
    public response?: unknown
  ) {
    super(message)
    this.name = 'ApiError'
  }
}

// =============================================================================
// FORM TYPES
// =============================================================================

export interface LoginFormData {
  email: string
  password: string
}

export interface RegisterFormData extends LoginFormData {
  name: string
  profileImage?: string
}

export interface BlogFormData {
  title: string
  content: string
  tags?: string[]
  image?: string
}

export interface CommentFormData {
  content: string
}

// =============================================================================
// UI STATE TYPES
// =============================================================================

export type LoadingState = 'idle' | 'loading' | 'success' | 'error'

export interface AsyncState<T> {
  data: T | null
  loading: boolean
  error: string | null
}
