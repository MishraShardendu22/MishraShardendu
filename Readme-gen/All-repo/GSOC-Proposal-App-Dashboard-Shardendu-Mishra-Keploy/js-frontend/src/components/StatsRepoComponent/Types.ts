/* eslint-disable @typescript-eslint/no-explicit-any */
export interface Activity {
  activity_type: string
  timestamp: string
}

export interface Contributor {
  login: string
  id: number
  avatar_url: string
  html_url: string
  contributions: number
}

export interface Week {
  w: number
  a: number
  d: number
  c: number
}

export interface ContributorStats {
  author: Contributor
  total: number
  weeks: Week[]
}

export interface RepoInfo {
  name: string
  description: string
  stargazers_count: number
  forks_count: number
  open_issues_count: number
  watchers_count: number
  [key: string]: any
}