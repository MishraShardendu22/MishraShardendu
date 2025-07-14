/* eslint-disable @typescript-eslint/no-explicit-any */
// File: components/github/GitHubRepos.tsx
'use client'
import { useState, useEffect } from 'react'
import RepoCard from './RepoCard'
import RepoStats from './RepoStats'
import Pagination from './Pagination'
import { Repo, SortOption } from './types'
import { EnhancedSpinner } from '@/components/Loader'
import FilterSortControls from './FilterSort'
import ErrorState from './Error'

const GitHubRepos = ({username} : {username: string}) => {
  console.log(username)

  const [repos, setRepos] = useState<Repo[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [currentPage, setCurrentPage] = useState(1)
  const [sortBy, setSortBy] = useState<SortOption>('updated')
  const [filterLanguage, setFilterLanguage] = useState<string | null>(null)
  const [languages, setLanguages] = useState<string[]>([])
  const reposPerPage = 6

  useEffect(() => {
    const fetchRepos = async () => {
      try {
        setLoading(true)
        const response = await fetch(
          `https://api.github.com/users/${username}/repos?per_page=100`
        )

        if (!response.ok) {
          throw new Error(`GitHub API returned ${response.status}`)
        }

        const data = await response.json()

        // Extract unique languages for filter
        const uniqueLanguages = Array.from(
          new Set(
            data
              .map((repo: any) => repo.language)
              .filter((lang: string | null) => lang !== null)
          )
        ) as string[]

        setRepos(data)
        setLanguages(uniqueLanguages)
        setLoading(false)
      } catch (err) {
        console.error('Error fetching repos:', err)
        setError(
          err instanceof Error ? err.message : 'Failed to fetch repositories'
        )
        setLoading(false)
      }
    }

    fetchRepos()
  }, [username])

  // Sort and filter repos
  const getSortedAndFilteredRepos = () => {
    if (!Array.isArray(repos)) return []

    let filtered = repos

    // Apply language filter if selected
    if (filterLanguage) {
      filtered = filtered.filter((repo) => repo.language === filterLanguage)
    }

    // Apply sorting
    return [...filtered].sort((a, b) => {
      if (sortBy === 'updated') {
        return (
          new Date(b.updated_at).getTime() - new Date(a.updated_at).getTime()
        )
      } else if (sortBy === 'stars') {
        return b.stargazers_count - a.stargazers_count
      } else {
        return a.name.localeCompare(b.name)
      }
    })
  }

  const sortedAndFilteredRepos = getSortedAndFilteredRepos()

  // Calculate pagination
  const indexOfLastRepo = currentPage * reposPerPage
  const indexOfFirstRepo = indexOfLastRepo - reposPerPage
  const currentRepos = sortedAndFilteredRepos.slice(
    indexOfFirstRepo,
    indexOfLastRepo
  )
  const totalPages = Math.ceil(sortedAndFilteredRepos.length / reposPerPage)

  // Handle sort change
  const handleSortChange = (sort: SortOption) => {
    setSortBy(sort)
    setCurrentPage(1) // Reset to first page when sorting
  }

  // Handle filter change
  const handleFilterChange = (language: string | null) => {
    setFilterLanguage(language)
    setCurrentPage(1) // Reset to first page when filtering
  }

  // Change page
  const handlePageChange = (pageNumber: number) => {
    setCurrentPage(pageNumber)
    // Scroll to top when changing page
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  if (loading) {
    return <EnhancedSpinner />
  }

  if (error) {
    return (
      <ErrorState message={error} onRetry={() => window.location.reload()} />
    )
  }

  return (
    <div className="w-full p-4 md:p-8 bg-gray-50">
      {/* Header Section */}
      <div className="flex flex-col md:flex-row items-center justify-between mb-8">
        <div>
          <h1 className="text-3xl font-bold text-center md:text-left mb-2 text-gray-800">
            My GitHub Repositories
          </h1>
          <p className="text-center md:text-left text-gray-500">
            Showcasing my latest projects and code
          </p>
        </div>

        <FilterSortControls
          languages={languages}
          selectedLanguage={filterLanguage}
          sortBy={sortBy}
          onSortChange={handleSortChange}
          onFilterChange={handleFilterChange}
        />
      </div>

      {/* Stats Bar */}
      <RepoStats repos={repos} languages={languages} />

      {/* Repository Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {currentRepos.length > 0 ? (
          currentRepos.map((repo) => <RepoCard key={repo.id} repo={repo} />)
        ) : (
          <p>No Repositories</p>
        )}
      </div>

      {totalPages > 1 && (
        <Pagination
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={handlePageChange}
        />
      )}
    </div>
  )
}

export default GitHubRepos
