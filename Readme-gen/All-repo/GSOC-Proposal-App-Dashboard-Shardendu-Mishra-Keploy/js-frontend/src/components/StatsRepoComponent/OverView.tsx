import React from 'react'
import { Bar } from 'react-chartjs-2'
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js'

// Register Chart.js components
ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend)

interface ContributorStats {
  total: number
  author: {
    login: string
    avatar_url: string
  }
  weeks: {
    w: number
    a: number
    d: number
    c: number
  }[]
}

interface RepositoryOverviewProps {
  lineStats: { added: number; deleted: number }
  stats: ContributorStats[]
}

const RepositoryOverview: React.FC<RepositoryOverviewProps> = ({
  lineStats,
  stats,
}) => {
  // Ensure data is always >= 1 to avoid logarithmic errors
  const linesAdded = Math.max(lineStats?.added || 1, 1)
  const linesDeleted = Math.max(lineStats?.deleted || 1, 1)
  const totalCommits = Math.max(
    stats?.reduce((acc, curr) => acc + (curr.total || 0), 0) || 1,
    1
  )

  // Chart Data
  const combinedStatsData = {
    labels: ['Lines Added', 'Lines Deleted', 'Total Commits'],
    datasets: [
      {
        label: 'Repository Statistics',
        data: [linesAdded, linesDeleted, totalCommits],
        backgroundColor: ['var(--chart-1)', 'var(--chart-2)', 'var(--chart-3)'],
        borderWidth: 1,
        borderColor: ['var(--chart-1)', 'var(--chart-2)', 'var(--chart-3)'],
      },
    ],
  }

  return (
    <div className="rounded-lg border border-border bg-card p-4 shadow-sm">
      <h2 className="mb-4 text-xl font-semibold text-card-foreground">
        Repository Overview
      </h2>

      <div className="h-64 w-full">
        <Bar
          data={combinedStatsData}
          options={{
            responsive: true,
            maintainAspectRatio: false,
            scales: {
              y: {
                beginAtZero: true,
                ticks: {
                  callback: function (value) {
                    return Number(value).toLocaleString() // Format numbers
                  },
                },
              },
            },
            plugins: {
              title: {
                display: true,
                text: 'Repository Statistics Overview',
                color: 'var(--card-foreground)',
                font: {
                  size: 16,
                  family: 'var(--font-sans)',
                },
              },
              tooltip: {
                callbacks: {
                  label: function (context) {
                    const value = context.raw
                    return `${context.dataset.label}: ${(value as number).toLocaleString()}`
                  },
                },
              },
              legend: {
                labels: {
                  color: 'var(--card-foreground)',
                },
              },
            },
          }}
        />
      </div>

      <div className="mt-6 grid grid-cols-3 gap-4">
        <div className="rounded-md bg-muted p-3 text-center">
          <div className="text-xl font-bold text-primary">
            {linesAdded.toLocaleString()}
          </div>
          <div className="text-sm text-muted-foreground">Lines Added</div>
        </div>
        <div className="rounded-md bg-muted p-3 text-center">
          <div className="text-xl font-bold text-secondary">
            {linesDeleted.toLocaleString()}
          </div>
          <div className="text-sm text-muted-foreground">Lines Deleted</div>
        </div>
        <div className="rounded-md bg-muted p-3 text-center">
          <div className="text-xl font-bold text-accent">
            {totalCommits.toLocaleString()}
          </div>
          <div className="text-sm text-muted-foreground">Total Commits</div>
        </div>
      </div>
    </div>
  )
}

export default RepositoryOverview