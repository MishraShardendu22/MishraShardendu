/* eslint-disable @typescript-eslint/no-explicit-any */
'use client'

import axios from 'axios'
import React, { useEffect, useState } from 'react'
import RepoHeader from '../../../components/StatsRepoComponent/RepoHeader'
import { EnhancedSpinner } from '@/components/Loader'
import { Activity, Contributor, ContributorStats } from '../../../components/StatsRepoComponent/Types'
import LanguagesChart from '../../../components/StatsRepoComponent/LanguageChart'
import ContributorsChart from '../../../components/StatsRepoComponent/ContributorsChart'
import CommitActivityChart from '../../../components/StatsRepoComponent/ActivityChart'
import ActivityTypesChart from '../../../components/StatsRepoComponent/TypesChart'
import TopicsSection from '../../../components/StatsRepoComponent/TopicSection'
import ContributorActivitySection from '../../../components/StatsRepoComponent/ActivitySection'
import RepositoryOverview from '../../../components/StatsRepoComponent/OverView'
import ContributorsSection from '../../../components/StatsRepoComponent/ContributionSection'

export default function RepoStats({
  params,
}: {
  params: Promise<{ repo_name: string }>
}) {
  const resolvedParams = React.use(params) // ✅ Unwrapping Next.js 14+ params
  const { repo_name } = resolvedParams

  // State variables with initial empty states to prevent hydration mismatch
  const [username, setUsername] = useState<string | null>(null)
  const [repoInfo, setRepoInfo] = useState<any>({})
  const [languagesData, setLanguagesData] = useState<Record<string, number>>({})
  const [topicsData, setTopicsData] = useState<string[]>([])
  const [contributors, setContributors] = useState<Contributor[]>([])
  const [activity, setActivity] = useState<Activity[]>([])
  const [stats, setStats] = useState<ContributorStats[]>([])
  const [commitActivity, setCommitActivity] = useState<any[]>([])
  const [loading, setLoading] = useState(true)
  const [isClient, setIsClient] = useState(false) // ✅ Fix for localStorage issue

  useEffect(() => {
    setIsClient(true) // ✅ Ensures we only access browser-specific APIs after hydration

    if (typeof window !== 'undefined') {
      const storedUsername = localStorage.getItem(
        'username-keploy-app-dashboard'
      )
      setUsername(storedUsername)
    }

    const owner = username || 'MishraShardendu22'

    const fetchData = async () => {
      setLoading(true)
      try {
        const [
          repoRes,
          langRes,
          topicsRes,
          contribRes,
          activityRes,
          statsRes,
          commitRes,
        ] = await Promise.all([
          axios.get(`https://api.github.com/repos/${owner}/${repo_name}`),
          axios.get(
            `https://api.github.com/repos/${owner}/${repo_name}/languages`
          ),
          axios.get(
            `https://api.github.com/repos/${owner}/${repo_name}/topics`,
            {
              headers: { Accept: 'application/vnd.github.mercy-preview+json' },
            }
          ),
          axios.get(
            `https://api.github.com/repos/${owner}/${repo_name}/contributors`
          ),
          axios.get(
            `https://api.github.com/repos/${owner}/${repo_name}/events`
          ),
          axios.get(
            `https://api.github.com/repos/${owner}/${repo_name}/stats/contributors`
          ),
          axios.get(
            `https://api.github.com/repos/${owner}/${repo_name}/stats/commit_activity`
          ),
        ])

        setRepoInfo(repoRes.data)
        setLanguagesData(langRes.data)
        setTopicsData(topicsRes.data.names || [])
        setContributors(contribRes.data)
        setActivity(
          activityRes.data.map((event: any) => ({
            activity_type: event.type,
            timestamp: event.created_at,
          }))
        )
        setStats(statsRes.data)
        setCommitActivity(commitRes.data)
      } catch (error) {
        console.error('Error fetching GitHub data:', error)
      }
      setLoading(false)
    }

    fetchData()
  }, [repo_name])

  if (!isClient) {
    return null
  }

  if (loading) {
    return <EnhancedSpinner />
  }

  const calculateLineStats = () => {
    if (!stats || stats.length === 0) return { added: 0, deleted: 0 }
    return stats.reduce(
      (acc, contributor) => {
        const contributorTotals = contributor.weeks.reduce(
          (
            weekAcc: { added: number; deleted: number },
            week: { a: number; d: number }
          ) => {
            weekAcc.added += week.a
            weekAcc.deleted += week.d
            return weekAcc
          },
          { added: 0, deleted: 0 }
        )
        acc.added += contributorTotals.added
        acc.deleted += contributorTotals.deleted
        return acc
      },
      { added: 0, deleted: 0 }
    )
  }

  const lineStats = calculateLineStats()

  const activityTypes = activity.reduce((acc: Record<string, number>, curr) => {
    acc[curr.activity_type] = (acc[curr.activity_type] || 0) + 1
    return acc
  }, {})

  return (
    <div className="container mx-auto px-4 py-8">
      <RepoHeader
        repoName={repo_name}
        repoInfo={repoInfo}
        username={username || 'MishraShardendu22'}
      />

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
        <LanguagesChart languagesData={languagesData} />
        <ContributorsChart contributors={contributors} />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
        <ActivityTypesChart activityTypes={activityTypes} />
        <CommitActivityChart commitActivity={commitActivity} />
      </div>

      <TopicsSection topics={topicsData} />
      <ContributorsSection contributors={contributors} />
      <ContributorActivitySection stats={stats} />
      <RepositoryOverview lineStats={lineStats} stats={stats} />
    </div>
  )
}
