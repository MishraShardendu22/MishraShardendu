// API Configuration
const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:3000'

if (!API_URL) {
  console.error('VITE_API_URL is not defined in environment variables')
}

// Comprehensive Types matching backend API
export interface User {
  id: number
  email: string
  name: string
  profileImage?: string
  // Additional optional fields from backend (kept permissive for different schemas)
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

// API Response Types
export interface ApiResponse<T = any> {
  success: boolean
  message?: string
  data?: T
  error?: string
}

export interface AuthResponse
  extends ApiResponse<{
    token: string
    user: User
  }> {
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
  comments?: number // comment count
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

// Error Types
export class ApiError extends Error {
  constructor(
    message: string,
    public statusCode?: number,
    public response?: any
  ) {
    super(message)
    this.name = 'ApiError'
  }
}

// Helper function to get auth token
const getAuthToken = (): string | null => {
  return localStorage.getItem('authToken')
}

// Request throttling to prevent rapid-fire API calls
let lastRequestTime = 0
const MIN_REQUEST_INTERVAL = 100 // 100ms between requests

// Helper function to make API requests with comprehensive error handling and throttling
const apiRequest = async <T>(endpoint: string, options: RequestInit = {}): Promise<T> => {
  // Throttle requests to prevent rapid-fire API calls
  const now = Date.now()
  const timeSinceLastRequest = now - lastRequestTime
  if (timeSinceLastRequest < MIN_REQUEST_INTERVAL) {
    await new Promise((resolve) => setTimeout(resolve, MIN_REQUEST_INTERVAL - timeSinceLastRequest))
  }
  lastRequestTime = Date.now()

  const token = getAuthToken()

  const headers: Record<string, string> = {
    'Content-Type': 'application/json',
    ...(options.headers as Record<string, string>),
  }

  if (token) {
    headers.Authorization = `Bearer ${token}`
  }

  try {
    const response = await fetch(`${API_URL}${endpoint}`, {
      ...options,
      headers,
    })

    // Try to parse JSON response
    let data: any
    try {
      data = await response.json()
    } catch (_e) {
      // If JSON parsing fails, throw generic error
      throw new ApiError('Invalid response from server', response.status, null)
    }

    // Handle HTTP errors
    if (!response.ok) {
      const errorMessage =
        data.error || data.message || `Request failed with status ${response.status}`
      throw new ApiError(errorMessage, response.status, data)
    }

    return data
  } catch (error) {
    // If it's already an ApiError, re-throw it
    if (error instanceof ApiError) {
      throw error
    }

    // Handle network errors
    if (error instanceof TypeError && error.message === 'Failed to fetch') {
      throw new ApiError('Network error. Please check your connection.', 0)
    }

    // Generic error
    console.error('API request error:', error)
    throw new ApiError(
      error instanceof Error ? error.message : 'An unexpected error occurred',
      undefined,
      error
    )
  }
}

// Auth API
export const authApi = {
  register: async (
    email: string,
    password: string,
    name: string,
    profileImage?: string
  ): Promise<AuthResponse> => {
    return apiRequest<AuthResponse>('/api/auth/register', {
      method: 'POST',
      body: JSON.stringify({ email, password, name, profileImage }),
    })
  },

  login: async (email: string, password: string): Promise<AuthResponse> => {
    return apiRequest<AuthResponse>('/api/auth/login', {
      method: 'POST',
      body: JSON.stringify({ email, password }),
    })
  },

  verifyOTP: async (email: string, otp: string): Promise<AuthResponse> => {
    return apiRequest<AuthResponse>('/api/auth/verify-otp', {
      method: 'POST',
      body: JSON.stringify({ email, otp }),
    })
  },

  resendOTP: async (email: string): Promise<{ success: boolean; message?: string }> => {
    return apiRequest('/api/auth/resend-otp', {
      method: 'POST',
      body: JSON.stringify({ email }),
    })
  },

  getCurrentUser: async (): Promise<{ success: boolean; data?: { user: User } }> => {
    return apiRequest('/api/auth/me', {
      method: 'GET',
    })
  },
}

// Blog API
export const blogApi = {
  getAllBlogs: async (params?: {
    page?: number
    limit?: number
    tag?: string
    search?: string
    author?: number
  }): Promise<PaginatedResponse<Blog[]>> => {
    const queryParams = new URLSearchParams()
    if (params?.page) queryParams.append('page', params.page.toString())
    if (params?.limit) queryParams.append('limit', params.limit.toString())
    if (params?.tag) queryParams.append('tag', params.tag)
    if (params?.search) queryParams.append('search', params.search)
    if (params?.author) queryParams.append('author', params.author.toString())

    const queryString = queryParams.toString()
    const endpoint = `/api/blogs${queryString ? `?${queryString}` : ''}`

    return apiRequest<PaginatedResponse<Blog[]>>(endpoint, {
      method: 'GET',
    })
  },

  getBlogById: async (id: number): Promise<ApiResponse<Blog>> => {
    if (!id || Number.isNaN(id)) {
      throw new ApiError('Invalid blog ID', 400)
    }
    return apiRequest<ApiResponse<Blog>>(`/api/blogs/${id}`, {
      method: 'GET',
    })
  },

  createBlog: async (blog: {
    title: string
    content: string
    tags?: string[]
    image?: string
    summary?: string
    published?: boolean
  }): Promise<ApiResponse<Blog>> => {
    if (!blog.title?.trim() || !blog.content?.trim()) {
      throw new ApiError('Title and content are required', 400)
    }
    return apiRequest<ApiResponse<Blog>>('/api/blogs', {
      method: 'POST',
      body: JSON.stringify(blog),
    })
  },

  updateBlog: async (
    id: number,
    blog: {
      title: string
      content: string
      tags?: string[]
      summary?: string
      published?: boolean
    }
  ): Promise<ApiResponse<Blog>> => {
    if (!id || Number.isNaN(id)) {
      throw new ApiError('Invalid blog ID', 400)
    }
    if (!blog.title?.trim() || !blog.content?.trim()) {
      throw new ApiError('Title and content are required', 400)
    }
    return apiRequest<ApiResponse<Blog>>(`/api/blogs/${id}`, {
      method: 'PUT',
      body: JSON.stringify(blog),
    })
  },

  partialUpdateBlog: async (
    id: number,
    blog: Partial<{
      title: string
      content: string
      tags: string[]
      summary: string
      published: boolean
    }>
  ): Promise<ApiResponse<Blog>> => {
    if (!id || Number.isNaN(id)) {
      throw new ApiError('Invalid blog ID', 400)
    }
    return apiRequest<ApiResponse<Blog>>(`/api/blogs/${id}`, {
      method: 'PATCH',
      body: JSON.stringify(blog),
    })
  },

  deleteBlog: async (id: number): Promise<ApiResponse<void>> => {
    if (!id || Number.isNaN(id)) {
      throw new ApiError('Invalid blog ID', 400)
    }
    return apiRequest<ApiResponse<void>>(`/api/blogs/${id}`, {
      method: 'DELETE',
    })
  },
}

// Comment API
export const commentApi = {
  getCommentsByBlogId: async (
    blogId: number,
    params?: { page?: number; limit?: number }
  ): Promise<PaginatedResponse<Comment[]>> => {
    if (!blogId || Number.isNaN(blogId)) {
      throw new ApiError('Invalid blog ID', 400)
    }
    const queryParams = new URLSearchParams()
    if (params?.page) queryParams.append('page', params.page.toString())
    if (params?.limit) queryParams.append('limit', params.limit.toString())

    const queryString = queryParams.toString()
    const endpoint = `/api/blogs/${blogId}/comments${queryString ? `?${queryString}` : ''}`

    return apiRequest<PaginatedResponse<Comment[]>>(endpoint, {
      method: 'GET',
    })
  },

  createComment: async (blogId: number, content: string): Promise<ApiResponse<Comment>> => {
    if (!blogId || Number.isNaN(blogId)) {
      throw new ApiError('Invalid blog ID', 400)
    }
    if (!content?.trim()) {
      throw new ApiError('Content is required', 400)
    }
    return apiRequest<ApiResponse<Comment>>(`/api/blogs/${blogId}/comments`, {
      method: 'POST',
      body: JSON.stringify({ content: content.trim() }),
    })
  },

  deleteComment: async (blogId: number, commentId: number): Promise<ApiResponse<void>> => {
    if (!blogId || Number.isNaN(blogId) || !commentId || Number.isNaN(commentId)) {
      throw new ApiError('Invalid blog ID or comment ID', 400)
    }
    return apiRequest<ApiResponse<void>>(`/api/blogs/${blogId}/comments/${commentId}`, {
      method: 'DELETE',
    })
  },
}

// Stats API
export const statsApi = {
  getBlogStats: async (): Promise<ApiResponse<BlogStats>> => {
    return apiRequest<ApiResponse<BlogStats>>('/api/blogs/stats', {
      method: 'GET',
    })
  },
}
