// File: components/github/types.ts
export type SortOption = 'updated' | 'stars' | 'name'

export interface Repo {
  id: number
  name: string
  html_url: string
  description: string | null
  language: string | null
  stargazers_count: number
  updated_at: string
  forks_count: number
  topics: string[]
  owner: {
    avatar_url: string
    login: string
  }
}