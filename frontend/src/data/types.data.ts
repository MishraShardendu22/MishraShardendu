// API Response Types
export interface ApiResponse<T> {
  message: string
  data: T
  error?: string
}

// Authentication Types
export interface AuthRequest {
  email: string
  password: string
  admin_pass: string
}

export interface AuthResponse {
  token: string
  data: {
    _id: string
    email: string
    skills: string[]
    projects: string[]
    experiences: string[]
  }
}

// User Types
export interface User {

  email: string
  skills: string[]
  projects: string[]
  experiences: string[]
}

// Skills Types
export interface SkillsRequest {
  skills: string[]
}

export interface SkillsResponse {
  skills: string[]
}

// Project Types
export interface Project {
  inline: any
  project_name: string
  small_description: string
  description: string
  skills: string[]
  project_repository: string
  project_live_link: string
  project_video: string
  created_at?: string
  updated_at?: string
}

export interface CreateProjectRequest {
  project_name: string
  small_description: string
  description: string
  skills: string[]
  project_repository: string
  project_live_link: string
  project_video: string
}

export type UpdateProjectRequest = CreateProjectRequest

// Experience Types
export interface Experience {
  inline: any
  company_name: string
  position: string
  start_date: string
  end_date: string
  description: string
  technologies: string[]
  company_logo: string
  certificate_url: string
  images: string[]
  created_at?: string
  updated_at?: string
}

export interface CreateExperienceRequest {
  company_name: string
  position: string
  start_date: string
  end_date: string
  description: string
  technologies: string[]
  company_logo: string
  certificate_url: string
  images: string[]
}

export type UpdateExperienceRequest = CreateExperienceRequest
