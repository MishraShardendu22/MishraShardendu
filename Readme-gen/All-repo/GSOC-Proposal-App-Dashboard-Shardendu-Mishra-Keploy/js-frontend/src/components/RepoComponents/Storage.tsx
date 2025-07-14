'use client'

import { useEffect } from 'react'
import GitHubRepos from '@/components/RepoComponents/MainRepo'

const ClientComponent = ({ username }: { username: string }) => {
  useEffect(() => {
    localStorage.setItem('username-keploy-app-dashboard', username)
  }, [username])

  return <GitHubRepos username={username} />
}

export default ClientComponent
