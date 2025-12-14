// =============================================================================
// CORE API TYPES
// =============================================================================

/**
 * Standard API response wrapper
 */
export interface ApiResponse<T> {
  message: string
  data: T
  error?: string
  status?: number
}

/**
 * Pagination metadata
 */
export interface PaginationMeta {
  page: number
  limit: number
  total: number
  totalPages: number
}

/**
 * Paginated API response
 */
export interface PaginatedResponse<T> {
  success: boolean
  data: T[]
  pagination: PaginationMeta
}

// =============================================================================
// AUTHENTICATION TYPES
// =============================================================================

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

export interface User {
  email: string
  skills: string[]
  projects: string[]
  experiences: string[]
  certifications: string[]
}

export interface ProfileData {
  inline: InlineMetadata
  email: string
  password: string
  admin_pass: string
  skills: string[] | null
  projects: string[]
  experiences: string[]
  certifications?: string[] | null
}

// =============================================================================
// SHARED TYPES
// =============================================================================

/**
 * Common inline metadata for entities
 */
export interface InlineMetadata {
  id: string
  created_at: string
  updated_at: string
}

/**
 * Skills request/response
 */
export interface SkillsRequest {
  skills: string[]
}

export type SkillsResponse = string[]

// =============================================================================
// EXPERIENCE TYPES
// =============================================================================

export interface ExperienceTimeLine {
  position: string
  start_date: string
  end_date: string
}

export interface ExperienceFormData {
  company_name: string
  position: string
  start_date: string
  end_date: string
  description: string
  technologies: string[]
  company_logo: string
  certificate_url: string
  projects: string[]
  images: string
}

// =============================================================================
// PROJECT TYPES
// =============================================================================

export interface Project {
  inline: InlineMetadata
  order: number
  images: string[]
  stats?: Record<string, unknown>
  project_name: string
  title?: string
  small_description: string
  description: string
  skills: string[]
  project_repository: string
  project_live_link: string
  project_video: string
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

export interface Experience {
  inline: InlineMetadata
  images: string[]
  projects: string[]
  created_by: string
  description: string
  technologies: string[]
  company_name: string
  company_logo: string
  certificate_url: string
  experience_time_line: ExperienceTimeLine[]
}

export interface CreateExperienceRequest {
  images: string[]
  projects: string[]
  created_by: string
  description: string
  technologies: string[]
  company_name: string
  company_logo: string
  certificate_url: string
  experience_time_line: ExperienceTimeLine[]
}

export interface ExperienceListResponse {
  data: Experience[]
  message: string
  status: number
}

export interface ExperienceResponse {
  data: Experience
  message: string
  status: number
}

// =============================================================================
// CERTIFICATION TYPES
// =============================================================================

export interface Certification {
  inline: InlineMetadata
  title: string
  description: string
  projects: string[]
  skills: string[]
  certificate_url: string
  images: string[]
  issuer: string
  issue_date: string
  expiry_date: string
}

export interface CreateCertificationRequest {
  title: string
  description: string
  issuer: string
  skills: string[]
  projects: string[]
  certificate_url: string
  images: string[]
  issue_date: string
  expiry_date: string
}

// =============================================================================
// VOLUNTEER TYPES
// =============================================================================

export interface VolunteerExperienceTimeLine {
  position: string
  start_date: string
  end_date: string
}

export interface VolunteerExperience {
  inline: InlineMetadata
  images: string[]
  projects: string[]
  created_by: string
  description: string
  technologies: string[]
  organisation: string
  organisation_logo: string
  volunteer_time_line: VolunteerExperienceTimeLine[]
}

export interface CreateVolunteerExperienceRequest {
  images: string[]
  projects: string[]
  created_by: string
  description: string
  technologies: string[]
  organisation: string
  organisation_logo: string
  volunteer_time_line: VolunteerExperienceTimeLine[]
}

// =============================================================================
// PROJECT KANBAN TYPES
// =============================================================================

export interface ProjectDetail {
  order: number
  project_id: string
  project_title: string
}

export interface ProjectDetailKanban {
  order: number
  project_id: string
}

// =============================================================================
// BLOG TYPES (from Blog API)
// =============================================================================

export interface BlogAuthor {
  id: number
  email: string
  name: string
  image: string | null
}

export interface BlogAuthorProfile {
  firstName: string | null
  lastName: string | null
  avatar: string | null
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
  author: BlogAuthor
  authorProfile: BlogAuthorProfile | null
  comments: number
}

export interface BlogComment {
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
  userProfile: BlogAuthorProfile | null
}

export interface BlogsResponse {
  success: boolean
  data: Blog[]
  pagination: PaginationMeta
}

export interface BlogResponse {
  success: boolean
  data: Blog
}

export interface CommentsResponse {
  success: boolean
  data: BlogComment[]
  pagination: PaginationMeta
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

export interface BlogReorderUpdate {
  id: number
  blogId_New: number
}

export interface BlogReorderItem {
  id: number
  orderId: number
  title: string
}

// =============================================================================
// TYPE ALIASES
// =============================================================================

export type Achievement = Certification
export type UpdateProjectRequest = CreateProjectRequest
export type UpdateExperienceRequest = CreateExperienceRequest
export type CreateAchievementRequest = CreateCertificationRequest
export type UpdateAchievementRequest = CreateCertificationRequest
export type UpdateCertificationRequest = CreateCertificationRequest
export type UpdateVolunteerExperienceRequest = CreateVolunteerExperienceRequest
