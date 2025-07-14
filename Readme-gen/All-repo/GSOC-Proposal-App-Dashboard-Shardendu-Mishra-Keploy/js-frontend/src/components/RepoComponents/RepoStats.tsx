// File: components/github/RepoStats.tsx
import { Repo } from './types'

interface RepoStatsProps {
  repos: Repo[]
  languages: string[]
}

const RepoStats = ({ repos, languages }: RepoStatsProps) => {
  return (
    <div className="bg-white rounded-lg shadow-sm p-4 mb-8 flex flex-wrap gap-6 justify-center md:justify-start">
      <div className="flex items-center">
        <div className="bg-blue-100 p-2 rounded-lg mr-3">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-5 w-5 text-blue-600"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M3 7v10a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-6l-2-2H5a2 2 0 00-2 2z"
            />
          </svg>
        </div>
        <div>
          <p className="text-sm text-gray-500">Total Repositories</p>
          <p className="text-xl font-bold text-gray-800">{repos.length}</p>
        </div>
      </div>

      <div className="flex items-center">
        <div className="bg-yellow-100 p-2 rounded-lg mr-3">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-5 w-5 text-yellow-600"
            fill="currentColor"
            viewBox="0 0 24 24"
          >
            <path d="M12 .587l3.668 7.568 8.332 1.151-6.064 5.828 1.48 8.279-7.416-3.967-7.417 3.967 1.481-8.279-6.064-5.828 8.332-1.151z" />
          </svg>
        </div>
        <div>
          <p className="text-sm text-gray-500">Total Stars</p>
          <p className="text-xl font-bold text-gray-800">
            {repos.reduce((total, repo) => total + repo.stargazers_count, 0)}
          </p>
        </div>
      </div>

      <div className="flex items-center">
        <div className="bg-green-100 p-2 rounded-lg mr-3">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-5 w-5 text-green-600"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M8 7h12m0 0l-4-4m4 4l-4 4m0 6H4m0 0l4 4m-4-4l4-4"
            />
          </svg>
        </div>
        <div>
          <p className="text-sm text-gray-500">Total Forks</p>
          <p className="text-xl font-bold text-gray-800">
            {repos.reduce((total, repo) => total + repo.forks_count, 0)}
          </p>
        </div>
      </div>

      <div className="flex items-center">
        <div className="bg-purple-100 p-2 rounded-lg mr-3">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-5 w-5 text-purple-600"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M7 7h.01M7 3h5c.512 0 1.024.195 1.414.586l7 7a2 2 0 010 2.828l-7 7a2 2 0 01-2.828 0l-7-7A1.994 1.994 0 013 12V7a4 4 0 014-4z"
            />
          </svg>
        </div>
        <div>
          <p className="text-sm text-gray-500">Languages</p>
          <p className="text-xl font-bold text-gray-800">{languages.length}</p>
        </div>
      </div>
    </div>
  )
}

export default RepoStats
