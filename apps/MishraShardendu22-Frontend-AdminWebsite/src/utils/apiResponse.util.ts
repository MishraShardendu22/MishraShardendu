import type {
  ApiResponse,
  AuthRequest,
  Blog,
  BlogComment,
  BlogReorderItem,
  BlogReorderUpdate,
  BlogResponse,
  BlogStatsResponse,
  BlogsResponse,
  Certification,
  CommentsResponse,
  CreateBlogRequest,
  CreateCertificationRequest,
  CreateExperienceRequest,
  CreateProjectRequest,
  CreateVolunteerExperienceRequest,
  Experience,
  ProfileData,
  Project,
  ProjectDetail,
  ProjectDetailKanban,
  SkillsRequest,
  UpdateBlogRequest,
  UpdateCertificationRequest,
  UpdateExperienceRequest,
  UpdateProjectRequest,
  UpdateVolunteerExperienceRequest,
  VolunteerExperience,
} from '../types/types.data'
import api, { blogApi } from './api'

// =============================================================================
// AUTH API
// =============================================================================

export const authAPI = {
  login: async (credentials: AuthRequest): Promise<unknown> => {
    const response = await api.post('/admin/auth', credentials)
    return response.data
  },

  getCurrentUser: async (): Promise<ApiResponse<ProfileData>> => {
    const response = await api.get('/admin/auth')
    return response.data
  },
}

// =============================================================================
// SKILLS API
// =============================================================================

// Skills response from backend
interface SkillsResponseData {
  skills: string[]
  page: number
  limit: number
  total: number
  total_pages: number
  has_next: boolean
  has_previous: boolean
}

export const skillsAPI = {
  getSkills: async (page = 1, limit = 100): Promise<ApiResponse<SkillsResponseData>> => {
    const response = await api.get(`/skills?page=${page}&limit=${limit}`)
    return response.data
  },

  addSkills: async (skills: SkillsRequest): Promise<ApiResponse<SkillsResponseData>> => {
    const response = await api.post('/skills', skills)
    return response.data
  },
}

// =============================================================================
// PROJECTS API
// =============================================================================

// Paginated response from backend
interface PaginatedProjectsResponse {
  projects: Project[]
  page: number
  limit: number
  total: number
  total_pages: number
  has_next: boolean
  has_previous: boolean
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

  getAllProjects: async (
    page = 1,
    limit = 100
  ): Promise<ApiResponse<PaginatedProjectsResponse>> => {
    const response = await api.get(`/projects?page=${page}&limit=${limit}`)
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

interface PaginatedExperiencesResponse {
  experiences: Experience[]
  page: number
  limit: number
  total: number
  total_pages: number
  has_next: boolean
  has_previous: boolean
}

export const experiencesAPI = {
  getAllExperiences: async (
    page = 1,
    limit = 100
  ): Promise<ApiResponse<PaginatedExperiencesResponse>> => {
    const response = await api.get(`/experiences?page=${page}&limit=${limit}`)
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

interface PaginatedCertificationsResponse {
  certifications: Certification[]
  page: number
  limit: number
  total: number
  total_pages: number
  has_next: boolean
  has_previous: boolean
}

export const certificationsAPI = {
  getAllCertifications: async (
    page = 1,
    limit = 100
  ): Promise<ApiResponse<PaginatedCertificationsResponse>> => {
    const response = await api.get(`/certifications?page=${page}&limit=${limit}`)
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

interface PaginatedVolunteerResponse {
  experiences?: VolunteerExperience[]
  volunteer_experiences?: VolunteerExperience[]
  page: number
  limit: number
  total: number
  total_pages: number
  has_next: boolean
  has_previous: boolean
}

export const volunteerExperiencesAPI = {
  getAllVolunteerExperiences: async (
    page = 1,
    limit = 100
  ): Promise<ApiResponse<PaginatedVolunteerResponse>> => {
    const response = await api.get(`/volunteer/experiences?page=${page}&limit=${limit}`)
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

// =============================================================================
// BLOG API
// =============================================================================

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

    const response = await blogApi.get(`/blogs?${params.toString()}`)
    return response.data
  },

  getBlogById: async (id: number): Promise<BlogResponse> => {
    const response = await blogApi.get(`/blogs/${id}`)
    return response.data
  },

  createBlog: async (blog: CreateBlogRequest): Promise<BlogResponse> => {
    const response = await blogApi.post('/blogs', blog)
    return response.data
  },

  updateBlog: async (id: number, blog: UpdateBlogRequest): Promise<BlogResponse> => {
    const response = await blogApi.put(`/blogs/${id}`, blog)
    return response.data
  },

  patchBlog: async (id: number, blog: Partial<UpdateBlogRequest>): Promise<BlogResponse> => {
    const response = await blogApi.patch(`/blogs/${id}`, blog)
    return response.data
  },

  deleteBlog: async (id: number): Promise<ApiResponse<{ message: string }>> => {
    const response = await blogApi.delete(`/blogs/${id}`)
    return response.data
  },

  getBlogStats: async (): Promise<BlogStatsResponse> => {
    const response = await blogApi.get('/blogs/stats')
    return response.data
  },

  getReorderList: async (): Promise<ApiResponse<BlogReorderItem[]>> => {
    const response = await blogApi.get('/blogs/reorder')
    return response.data
  },

  updateReorder: async (payload: BlogReorderUpdate[]): Promise<ApiResponse<unknown>> => {
    const response = await blogApi.post('/blogs/reorder', payload)
    return response.data
  },
}

// Re-export types for convenience
export type { Blog, BlogComment, BlogsResponse, BlogResponse, CommentsResponse }
