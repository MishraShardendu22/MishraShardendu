import api from './api'
import {
  ApiResponse,
  AuthRequest,
  AuthResponse,
  SkillsRequest,
  SkillsResponse,
  Project,
  CreateProjectRequest,
  UpdateProjectRequest,
  Experience,
  CreateExperienceRequest,
  UpdateExperienceRequest,
} from '../data/types.data'

// Authentication API
export const authAPI = {
  login: async (credentials: AuthRequest): Promise<ApiResponse<AuthResponse>> => {
    const response = await api.post('/admin/auth', credentials)
    return response.data
  },
}

// Skills API
export const skillsAPI = {
  getSkills: async (): Promise<ApiResponse<SkillsResponse>> => {
    const response = await api.get('/skills')
    return response.data
  },

  addSkills: async (skills: SkillsRequest): Promise<ApiResponse<SkillsResponse>> => {
    const response = await api.post('/skills', skills)
    return response.data
  },
}

// Projects API
export const projectsAPI = {
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

  updateProject: async (id: string, project: UpdateProjectRequest): Promise<ApiResponse<Project>> => {
    const response = await api.put(`/projects/${id}`, project)
    return response.data
  },

  deleteProject: async (id: string): Promise<ApiResponse<{ message: string }>> => {
    const response = await api.delete(`/projects/${id}`)
    return response.data
  },
}

// Experiences API
export const experiencesAPI = {
  getAllExperiences: async (): Promise<ApiResponse<Experience[]>> => {
    const response = await api.get('/experiences')
    return response.data
  },

  getExperienceById: async (id: string): Promise<ApiResponse<Experience>> => {
    const response = await api.get(`/experiences/${id}`)
    return response.data
  },

  createExperience: async (experience: CreateExperienceRequest): Promise<ApiResponse<Experience>> => {
    const response = await api.post('/experiences', experience)
    return response.data
  },

  updateExperience: async (id: string, experience: UpdateExperienceRequest): Promise<ApiResponse<Experience>> => {
    const response = await api.put(`/experiences/${id}`, experience)
    return response.data
  },

  deleteExperience: async (id: string): Promise<ApiResponse<{ message: string }>> => {
    const response = await api.delete(`/experiences/${id}`)
    return response.data
  },
}

// Test API
export const testAPI = {
  testEndpoint: async (): Promise<ApiResponse<{ message: string }>> => {
    const response = await api.get('/test')
    return response.data
  },
}