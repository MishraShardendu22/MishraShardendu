import React from 'react'
import { RepoInfo } from './Types'

interface RepoHeaderProps {
  repoName: string
  username: string
  repoInfo: RepoInfo | null
}

const RepoHeader: React.FC<RepoHeaderProps> = ({
  repoName,
  username,
  repoInfo,
}) => {
  return (
    <div className="bg-gradient-to-r from-primary to-accent rounded-lg shadow-lg p-6 mb-8 text-black">
      <h1 className="text-3xl font-bold mb-2">{repoName}</h1>
      <div className="flex items-center mb-4">
        <span className="font-medium mr-2">Owner:</span>
        <span className="bg-accent bg-opacity-30 px-3 py-1 rounded-full">
          {username}
        </span>
      </div>
      {repoInfo && (
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mt-4">
          <div className="bg-card bg-opacity-20 rounded-lg p-3 text-center">
            <div className="text-2xl font-bold">
              {repoInfo.stargazers_count.toLocaleString()}
            </div>
            <div className="text-sm">Stars</div>
          </div>
          <div className="bg-card bg-opacity-20 rounded-lg p-3 text-center">
            <div className="text-2xl font-bold">
              {repoInfo.forks_count.toLocaleString()}
            </div>
            <div className="text-sm">Forks</div>
          </div>
          <div className="bg-card bg-opacity-20 rounded-lg p-3 text-center">
            <div className="text-2xl font-bold">
              {repoInfo.open_issues_count.toLocaleString()}
            </div>
            <div className="text-sm">Open Issues</div>
          </div>
          <div className="bg-card bg-opacity-20 rounded-lg p-3 text-center">
            <div className="text-2xl font-bold">
              {repoInfo.watchers_count.toLocaleString()}
            </div>
            <div className="text-sm">Watchers</div>
          </div>
        </div>
      )}
    </div>
  )
}

export default RepoHeader
