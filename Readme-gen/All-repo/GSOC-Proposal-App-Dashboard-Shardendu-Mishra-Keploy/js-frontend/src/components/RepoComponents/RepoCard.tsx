import { formatDate, getRelativeTime, getLanguageColor } from './util'
import { Repo } from './types'
import Link from 'next/link'
import { useState } from 'react'

interface RepoCardProps {
  repo: Repo
}

const RepoCard = ({ repo }: RepoCardProps) => {
  const [isHovered, setIsHovered] = useState(false)

  return (
    <div
      className="bg-white rounded-lg overflow-hidden shadow transition-all duration-300 flex flex-col h-full border border-gray-200 hover:border-orange-300 hover:translate-y-[-2px]"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className="px-5 pt-4 pb-3 flex items-center">
        <div
          className={`p-2 rounded-md mr-3 transition-colors duration-300 ${isHovered ? 'bg-orange-500 text-white' : 'bg-orange-100 text-orange-600'}`}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-5 w-5"
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
        <h2 className="font-semibold text-lg text-gray-800 truncate flex-1 group">
          <span
            className={`transition-colors duration-300 ${isHovered ? 'text-orange-600' : ''}`}
          >
            {repo.name}
          </span>
        </h2>
      </div>

      <div className="px-5 py-3 flex-grow">
        <p className="text-gray-600 mb-4 line-clamp-2 text-sm min-h-[3rem]">
          {repo.description || 'No description available'}
        </p>

        <div className="flex flex-wrap gap-2 mb-4">
          {repo.language && (
            <span
              className={`px-3 py-1 ${getLanguageColor(repo.language)} rounded-full text-xs font-medium flex items-center shadow-sm`}
            >
              <span
                className={`w-2 h-2 rounded-full mr-1 ${repo.language ? 'bg-current opacity-70' : ''}`}
              ></span>
              {repo.language}
            </span>
          )}

          {repo.stargazers_count > 0 && (
            <span className="px-3 py-1 bg-yellow-50 text-yellow-700 rounded-full text-xs font-medium flex items-center shadow-sm">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-3.5 w-3.5 mr-1"
                fill="currentColor"
                viewBox="0 0 24 24"
              >
                <path d="M12 .587l3.668 7.568 8.332 1.151-6.064 5.828 1.48 8.279-7.416-3.967-7.417 3.967 1.481-8.279-6.064-5.828 8.332-1.151z" />
              </svg>
              {repo.stargazers_count.toLocaleString()}
            </span>
          )}

          {repo.forks_count > 0 && (
            <span className="px-3 py-1 bg-green-50 text-green-700 rounded-full text-xs font-medium flex items-center shadow-sm">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-3.5 w-3.5 mr-1"
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
              {repo.forks_count.toLocaleString()}
            </span>
          )}
        </div>

        <div className="flex justify-between items-center text-xs text-gray-500 mb-4">
          <div className="flex items-center">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-3.5 w-3.5 mr-1 text-gray-400"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
              />
            </svg>
            <span>Updated: {formatDate(repo.updated_at)}</span>
          </div>
          <div className="font-medium">{getRelativeTime(repo.updated_at)}</div>
        </div>

        <div className="flex justify-between items-center">
          <div></div> {/* Empty div for spacing */}
          <Link
            href={`/repositories/${repo.name}`}
            className={`inline-flex items-center justify-center px-3 py-1.5 rounded-md text-xs font-medium transition-all duration-200 ${
              isHovered
                ? 'bg-orange-100 text-orange-700'
                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
            }`}
          >
            See stats
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-3.5 w-3.5 ml-1"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"
              />
            </svg>
          </Link>
        </div>
      </div>

      <div className="px-5 py-3 bg-gray-50">
        <a
          href={repo.html_url}
          target="_blank"
          rel="noopener noreferrer"
          className={`flex w-full justify-center items-center px-4 py-2 rounded-md transition-all duration-300 text-sm font-medium ${
            isHovered
              ? 'bg-orange-600 text-white shadow-md'
              : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
          }`}
        >
          View on GitHub
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-4 w-4 ml-1.5"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"
            />
          </svg>
        </a>
      </div>
    </div>
  )
}

export default RepoCard
