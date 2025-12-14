import api from './api'
import type {
  Project,
  Experience,
  ApiResponse,
  Certification,
  UpdateProjectRequest,
  CreateProjectRequest,
  UpdateExperienceRequest,
  CreateExperienceRequest,
  UpdateCertificationRequest,
  CreateCertificationRequest,
  UpdateVolunteerExperienceRequest,
  CreateVolunteerExperienceRequest,
  SkillsRequest,
  SkillsResponse,
  ProjectDetail,
  ProjectDetailKanban,
  VolunteerExperience,
  AuthRequest,
  ProfileData,
  BlogReorderItem,
  BlogReorderUpdate,
} from '../types/types.data'

export const authAPI = {
  login: async (credentials: AuthRequest): Promise<unknown> => {
    try {
      const response = await fetch(import.meta.env.VITE_BACKEND_1 + '/api/admin/auth', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(credentials),
      })

      const data = await response.json()

      return data
    } catch (error: unknown) {
      console.error('authAPI.login error:', error)
      if (error instanceof Error) {
        console.error('Error message:', error.message)
      }
      throw error
    }
  },

  getCurrentUser: async (): Promise<ApiResponse<ProfileData>> => {
    const response = await api.get('/admin/auth')
    return response.data
  },
}

export const skillsAPI = {
  getSkills: async (): Promise<ApiResponse<SkillsResponse>> => {
    const response = await api.get('/skills')
    return response.data
  },

  addSkills: async (skills: SkillsRequest): Promise<ApiResponse<SkillsResponse>> => {
    const response = await api.post('/skills', skills)
    return response.data
  },

  deleteSkill: async (skill: string): Promise<ApiResponse<SkillsResponse>> => {
    const response = await api.delete(`/skills/${encodeURIComponent(skill)}`)
    return response.data
  },
}

export const projectsAPI = {
  getAllProjectsKanban: async (): Promise<ApiResponse<ProjectDetail[]>> => {
    const response = await api.get('/projects/kanban')
    return response.data
  },

  updateOrder: async (
    details: ProjectDetailKanban[]
  ): Promise<ApiResponse<ProjectDetailKanban[]>> => {
    const response = await api.post('/projects/updateOrder', details)
    return response.data
  },

  getAllProjects: async (): Promise<ApiResponse<Project[]>> => {
    const response = await api.get('/projects')
    return response.data
  },

  getProjectById: async (id: string): Promise<ApiResponse<Project>> => {
    const response = await api.get(`/projects/${id}`)
    return response.data
  },

  createProject: async (project: CreateProjectRequest): Promise<ApiResponse<Project>> => {
    const response = await api.post('/projects', project)
    return response.data
  },

  updateProject: async (
    id: string,
    project: UpdateProjectRequest
  ): Promise<ApiResponse<Project>> => {
    const response = await api.put(`/projects/${id}`, project)
    return response.data
  },

  deleteProject: async (id: string): Promise<ApiResponse<{ message: string }>> => {
    const response = await api.delete(`/projects/${id}`)
    return response.data
  },
}

export const experiencesAPI = {
  getAllExperiences: async (): Promise<ApiResponse<Experience[]>> => {
    const response = await api.get('/experiences')
    return response.data
  },

  getExperienceById: async (id: string): Promise<ApiResponse<Experience>> => {
    const response = await api.get(`/experiences/${id}`)
    return response.data
  },

  createExperience: async (
    experience: CreateExperienceRequest
  ): Promise<ApiResponse<Experience>> => {
    const response = await api.post('/experiences', experience)
    return response.data
  },

  updateExperience: async (
    id: string,
    experience: UpdateExperienceRequest
  ): Promise<ApiResponse<Experience>> => {
    const response = await api.put(`/experiences/${id}`, experience)
    return response.data
  },

  deleteExperience: async (id: string): Promise<ApiResponse<{ message: string }>> => {
    const response = await api.delete(`/experiences/${id}`)
    return response.data
  },
}

export const certificationsAPI = {
  getAllCertifications: async (): Promise<ApiResponse<Certification[]>> => {
    const response = await api.get('/certifications')
    return response.data
  },

  getCertificationById: async (id: string): Promise<ApiResponse<Certification>> => {
    const response = await api.get(`/certifications/${id}`)
    return response.data
  },

  createCertification: async (
    cert: CreateCertificationRequest
  ): Promise<ApiResponse<Certification>> => {
    const response = await api.post('/certifications', cert)
    return response.data
  },

  updateCertification: async (
    id: string,
    cert: UpdateCertificationRequest
  ): Promise<ApiResponse<Certification>> => {
    const response = await api.put(`/certifications/${id}`, cert)
    return response.data
  },

  deleteCertification: async (id: string): Promise<ApiResponse<{ message: string }>> => {
    const response = await api.delete(`/certifications/${id}`)
    return response.data
  },
}

export const volunteerExperiencesAPI = {
  getAllVolunteerExperiences: async (): Promise<ApiResponse<VolunteerExperience[]>> => {
    const response = await api.get('/volunteer/experiences')
    return response.data
  },

  getVolunteerExperienceById: async (id: string): Promise<ApiResponse<VolunteerExperience>> => {
    const response = await api.get(`/volunteer/experiences/${id}`)
    return response.data
  },

  createVolunteerExperience: async (
    experience: CreateVolunteerExperienceRequest
  ): Promise<ApiResponse<VolunteerExperience>> => {
    const response = await api.post('/volunteer/experiences', experience)
    return response.data
  },

  updateVolunteerExperience: async (
    id: string,
    experience: UpdateVolunteerExperienceRequest
  ): Promise<ApiResponse<VolunteerExperience>> => {
    const response = await api.put(`/volunteer/experiences/${id}`, experience)
    return response.data
  },

  deleteVolunteerExperience: async (id: string): Promise<ApiResponse<{ message: string }>> => {
    const response = await api.delete(`/volunteer/experiences/${id}`)
    return response.data
  },
}

export const achievementsAPI = certificationsAPI

export const testAPI = {
  testEndpoint: async (): Promise<ApiResponse<{ message: string }>> => {
    const response = await api.get('/test')
    return response.data
  },
}

export const TimelineAPI = {
  getAllEndpoints: async (): Promise<ApiResponse<string[]>> => {
    const response = await api.get('/timeline')
    return response.data
  },
}

import axios from 'axios'

const BASE_URL = 'https://mishrashardendu22-backend-blogwebsite.onrender.com/api'

const getAuthHeaders = () => {
  const token = typeof window !== 'undefined' ? localStorage.getItem('authToken') : null
  return {
    'Content-Type': 'application/json',
    Authorization: `Bearer ${token}`,
  }
}

export interface Blog {
  id: number
  title: string
  image: string | null
  content: string
  tags: string[]
  authorId: number
  createdAt: string
  updatedAt: string
  author: {
    id: number
    email: string
    name: string
    image: string | null
  }
  authorProfile: {
    firstName: string | null
    lastName: string | null
    avatar: string | null
  } | null
  comments: number
}

export interface Comment {
  id: number
  content: string
  userId: number
  blogId: number
  createdAt: string
  user: {
    id: number
    email: string
    name: string
    isVerified: boolean
    profileImage: string | null
  }
  userProfile: {
    firstName: string | null
    lastName: string | null
    avatar: string | null
  } | null
}

export interface PaginationResponse {
  page: number
  limit: number
  total: number
  totalPages: number
}

export interface BlogsResponse {
  success: boolean
  data: Blog[]
  pagination: PaginationResponse
}

export interface BlogResponse {
  success: boolean
  data: Blog
}

export interface CommentsResponse {
  success: boolean
  data: Comment[]
  pagination: PaginationResponse
}

export interface CreateBlogRequest {
  title: string
  content: string
  tags?: string[]
  image?: string
}

export interface UpdateBlogRequest {
  title?: string
  content?: string
  tags?: string[]
  image?: string
}

export interface CreateCommentRequest {
  content: string
}

export interface BlogStatsResponse {
  success: boolean
  data: {
    totalBlogs: number
    totalComments: number
    totalTags: number
    recentBlogs: number
  }
}

export const blogsAPI = {
  // Get all blogs with pagination and filters
  getAllBlogs: async (
    page = 1,
    limit = 10,
    options?: {
      tag?: string
      author?: string
      search?: string
    }
  ): Promise<BlogsResponse> => {
    const params = new URLSearchParams({
      page: page.toString(),
      limit: limit.toString(),
    })
    if (options?.tag) params.append('tag', options.tag)
    if (options?.author) params.append('author', options.author)
    if (options?.search) params.append('search', options.search)

    const response = await axios.get(`${BASE_URL}/blogs?${params.toString()}`, {
      headers: getAuthHeaders(),
    })
    return response.data
  },

  // Get single blog by ID
  getBlogById: async (id: number): Promise<BlogResponse> => {
    const response = await axios.get(`${BASE_URL}/blogs/${id}`, {
      headers: getAuthHeaders(),
    })
    return response.data
  },

  // Create new blog (owner only)
  createBlog: async (blog: CreateBlogRequest): Promise<BlogResponse> => {
    const response = await axios.post(`${BASE_URL}/blogs`, blog, {
      headers: getAuthHeaders(),
    })
    return response.data
  },

  // Update blog (owner only)
  updateBlog: async (id: number, blog: UpdateBlogRequest): Promise<BlogResponse> => {
    const response = await axios.put(`${BASE_URL}/blogs/${id}`, blog, {
      headers: getAuthHeaders(),
    })
    return response.data
  },

  // Partially update blog (owner only)
  patchBlog: async (id: number, blog: Partial<UpdateBlogRequest>): Promise<BlogResponse> => {
    const response = await axios.patch(`${BASE_URL}/blogs/${id}`, blog, {
      headers: getAuthHeaders(),
    })
    return response.data
  },

  // Delete blog (owner only)
  deleteBlog: async (id: number): Promise<ApiResponse<{ message: string }>> => {
    const response = await axios.delete(`${BASE_URL}/blogs/${id}`, {
      headers: getAuthHeaders(),
    })
    return response.data
  },

  // Get blog stats
  getBlogStats: async (): Promise<BlogStatsResponse> => {
    const response = await axios.get(`${BASE_URL}/blogs/stats`, {
      headers: getAuthHeaders(),
    })
    return response.data
  },

  // Get reorder list
  getReorderList: async (): Promise<ApiResponse<BlogReorderItem[]>> => {
    const response = await axios.get(`${BASE_URL}/blogs/reorder`, {
      headers: getAuthHeaders(),
    })
    return response.data
  },

  // Update reorder
  updateReorder: async (payload: BlogReorderUpdate[]): Promise<ApiResponse<unknown>> => {
    const response = await axios.post(`${BASE_URL}/blogs/reorder`, payload, {
      headers: getAuthHeaders(),
    })
    return response.data
  },
}

export const commentsAPI = {
  // Get all comments for a blog with pagination
  getCommentsByBlogId: async (blogId: number, page = 1, limit = 10): Promise<CommentsResponse> => {
    const params = new URLSearchParams({
      page: page.toString(),
      limit: limit.toString(),
    })
    const response = await axios.get(`${BASE_URL}/blogs/${blogId}/comments?${params.toString()}`, {
      headers: getAuthHeaders(),
    })
    return response.data
  },

  // Create new comment (authenticated users only)
  createComment: async (
    blogId: number,
    comment: CreateCommentRequest
  ): Promise<ApiResponse<Comment>> => {
    const response = await axios.post(`${BASE_URL}/blogs/${blogId}/comments`, comment, {
      headers: getAuthHeaders(),
    })
    return response.data
  },

  // Delete comment (comment author or blog owner only)
  deleteComment: async (
    blogId: number,
    commentId: number
  ): Promise<ApiResponse<{ message: string }>> => {
    const response = await axios.delete(`${BASE_URL}/blogs/${blogId}/comments/${commentId}`, {
      headers: getAuthHeaders(),
    })
    return response.data
  },
}
