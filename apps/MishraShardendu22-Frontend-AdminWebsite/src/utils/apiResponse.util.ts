import api from './api'
import axios from 'axios'
import { API_CONFIG } from '../constants'
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
  ProjectDetail,
  ProjectDetailKanban,
  VolunteerExperience,
  AuthRequest,
  ProfileData,
  BlogReorderItem,
  BlogReorderUpdate,
  Blog,
  BlogComment,
  BlogsResponse,
  BlogResponse,
  CommentsResponse,
  CreateBlogRequest,
  UpdateBlogRequest,
  CreateCommentRequest,
  BlogStatsResponse,
} from '../types/types.data'

// =============================================================================
// AUTH API
// =============================================================================

export const authAPI = {
  login: async (credentials: AuthRequest): Promise<unknown> => {
    const baseURL = import.meta.env.VITE_BACKEND_1 || ''
    const response = await fetch(baseURL + '/api/admin/auth', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(credentials),
    })

    const contentType = response.headers.get('content-type')
    let data: unknown = {}
    if (contentType?.includes('application/json')) {
      data = await response.json()
    }

    if (!response.ok) {
      throw new Error(
        (data as { message?: string }).message || `HTTP error! status: ${response.status}`
      )
    }
    return data
  },

  getCurrentUser: async (): Promise<ApiResponse<ProfileData>> => {
    const response = await api.get('/admin/auth')
    return response.data
  },
}

// =============================================================================
// SKILLS API
// =============================================================================

export const skillsAPI = {
  getSkills: async (): Promise<ApiResponse<string[]>> => {
    const response = await api.get('/skills')
    return response.data
  },

  addSkills: async (skills: SkillsRequest): Promise<ApiResponse<string[]>> => {
    const response = await api.post('/skills', skills)
    return response.data
  },
}

// =============================================================================
// PROJECTS API
// =============================================================================

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

// =============================================================================
// EXPERIENCES API
// =============================================================================

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

// =============================================================================
// CERTIFICATIONS API
// =============================================================================

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

// =============================================================================
// VOLUNTEER EXPERIENCES API
// =============================================================================

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

// =============================================================================
// BLOG API (External Blog Backend)
// =============================================================================

const getAuthHeaders = () => {
  const token = typeof window !== 'undefined' ? localStorage.getItem('authToken') : null
  return {
    'Content-Type': 'application/json',
    Authorization: `Bearer ${token}`,
  }
}

export const blogsAPI = {
  getAllBlogs: async (
    page = 1,
    limit = 10,
    options?: { tag?: string; author?: string; search?: string }
  ): Promise<BlogsResponse> => {
    const params = new URLSearchParams({ page: page.toString(), limit: limit.toString() })
    if (options?.tag) params.append('tag', options.tag)
    if (options?.author) params.append('author', options.author)
    if (options?.search) params.append('search', options.search)

    const response = await axios.get(`${API_CONFIG.BLOG_BASE_URL}/blogs?${params.toString()}`, {
      headers: getAuthHeaders(),
    })
    return response.data
  },

  getBlogById: async (id: number): Promise<BlogResponse> => {
    const response = await axios.get(`${API_CONFIG.BLOG_BASE_URL}/blogs/${id}`, {
      headers: getAuthHeaders(),
    })
    return response.data
  },

  createBlog: async (blog: CreateBlogRequest): Promise<BlogResponse> => {
    const response = await axios.post(`${API_CONFIG.BLOG_BASE_URL}/blogs`, blog, {
      headers: getAuthHeaders(),
    })
    return response.data
  },

  updateBlog: async (id: number, blog: UpdateBlogRequest): Promise<BlogResponse> => {
    const response = await axios.put(`${API_CONFIG.BLOG_BASE_URL}/blogs/${id}`, blog, {
      headers: getAuthHeaders(),
    })
    return response.data
  },

  patchBlog: async (id: number, blog: Partial<UpdateBlogRequest>): Promise<BlogResponse> => {
    const response = await axios.patch(`${API_CONFIG.BLOG_BASE_URL}/blogs/${id}`, blog, {
      headers: getAuthHeaders(),
    })
    return response.data
  },

  deleteBlog: async (id: number): Promise<ApiResponse<{ message: string }>> => {
    const response = await axios.delete(`${API_CONFIG.BLOG_BASE_URL}/blogs/${id}`, {
      headers: getAuthHeaders(),
    })
    return response.data
  },

  getBlogStats: async (): Promise<BlogStatsResponse> => {
    const response = await axios.get(`${API_CONFIG.BLOG_BASE_URL}/blogs/stats`, {
      headers: getAuthHeaders(),
    })
    return response.data
  },

  getReorderList: async (): Promise<ApiResponse<BlogReorderItem[]>> => {
    const response = await axios.get(`${API_CONFIG.BLOG_BASE_URL}/blogs/reorder`, {
      headers: getAuthHeaders(),
    })
    return response.data
  },

  updateReorder: async (payload: BlogReorderUpdate[]): Promise<ApiResponse<unknown>> => {
    const response = await axios.post(`${API_CONFIG.BLOG_BASE_URL}/blogs/reorder`, payload, {
      headers: getAuthHeaders(),
    })
    return response.data
  },
}

// =============================================================================
// COMMENTS API
// =============================================================================

export const commentsAPI = {
  getCommentsByBlogId: async (blogId: number, page = 1, limit = 10): Promise<CommentsResponse> => {
    const params = new URLSearchParams({ page: page.toString(), limit: limit.toString() })
    const response = await axios.get(
      `${API_CONFIG.BLOG_BASE_URL}/blogs/${blogId}/comments?${params.toString()}`,
      { headers: getAuthHeaders() }
    )
    return response.data
  },

  createComment: async (
    blogId: number,
    comment: CreateCommentRequest
  ): Promise<ApiResponse<BlogComment>> => {
    const response = await axios.post(
      `${API_CONFIG.BLOG_BASE_URL}/blogs/${blogId}/comments`,
      comment,
      { headers: getAuthHeaders() }
    )
    return response.data
  },

  deleteComment: async (
    blogId: number,
    commentId: number
  ): Promise<ApiResponse<{ message: string }>> => {
    const response = await axios.delete(
      `${API_CONFIG.BLOG_BASE_URL}/blogs/${blogId}/comments/${commentId}`,
      { headers: getAuthHeaders() }
    )
    return response.data
  },
}

// Re-export types for convenience
export type { Blog, BlogComment, BlogsResponse, BlogResponse, CommentsResponse }
