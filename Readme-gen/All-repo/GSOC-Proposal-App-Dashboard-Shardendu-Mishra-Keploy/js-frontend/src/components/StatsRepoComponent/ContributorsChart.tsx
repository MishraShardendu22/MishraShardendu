// Component/ContributorsChart.tsx
import React from 'react'
import { Bar } from 'react-chartjs-2'
import { Contributor } from './Types'

interface ContributorsChartProps {
  contributors: Contributor[]
}

const ContributorsChart: React.FC<ContributorsChartProps> = ({
  contributors,
}) => {
  const getThemeColor = (variable: string) => {
    return getComputedStyle(document.documentElement)
      .getPropertyValue(variable)
      .trim()
  }

const contributorsChartData = {
  labels: Array.isArray(contributors)
    ? contributors.slice(0, 10).map((c) => c?.login || 'Unknown')
    : [], // Default to an empty array if contributors is not valid
  datasets: [
    {
      label: 'Contributions',
      data: Array.isArray(contributors)
        ? contributors.slice(0, 10).map((c) => c?.contributions || 0)
        : [], // Default to an empty array if contributors is not valid
      backgroundColor: getThemeColor('--primary') || 'rgba(54, 162, 235, 0.6)',
      borderColor:
        getThemeColor('--primary-foreground') || 'rgba(54, 162, 235, 1)',
      borderWidth: 2,
      borderRadius: 6,
      hoverBackgroundColor:
        getThemeColor('--primary-hover') || 'rgba(54, 162, 235, 0.8)',
    },
  ],
}

  return (
    <div className="bg-card rounded-xl shadow-md p-6 border border-border/50 transition-all hover:shadow-lg">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl font-bold text-card-foreground">
          Top Contributors
        </h2>
        <div className="text-xs text-muted-foreground bg-muted px-3 py-1 rounded-full">
          {contributors.length} total
        </div>
      </div>
      <div className="h-72">
        {contributors.length > 0 ? (
          <Bar
            data={contributorsChartData}
            options={{
              indexAxis: 'y',
              responsive: true,
              maintainAspectRatio: false,
              scales: {
                x: {
                  grid: {
                    color: getThemeColor('--border') || 'rgba(0,0,0,0.05)',
                  },
                  ticks: {
                    color:
                      getThemeColor('--muted-foreground') || 'rgba(0,0,0,0.6)',
                    font: {
                      family:
                        getThemeColor('--font-sans') || 'Inter, sans-serif',
                      size: 11,
                    },
                  },
                },
                y: {
                  grid: {
                    display: false,
                  },
                  ticks: {
                    color:
                      getThemeColor('--card-foreground') || 'rgba(0,0,0,0.8)',
                    font: {
                      family:
                        getThemeColor('--font-sans') || 'Inter, sans-serif',
                      size: 12,
                    },
                  },
                },
              },
              plugins: {
                legend: {
                  display: false,
                },
                title: {
                  display: true,
                  text: 'Top 10 Contributors by Commits',
                  color:
                    getThemeColor('--card-foreground') || 'rgba(0,0,0,0.8)',
                  font: {
                    family: getThemeColor('--font-sans') || 'Inter, sans-serif',
                    size: 14,
                    weight: 'normal',
                  },
                  padding: {
                    bottom: 16,
                  },
                },
                tooltip: {
                  backgroundColor:
                    getThemeColor('--popover') || 'rgba(0,0,0,0.8)',
                  titleColor:
                    getThemeColor('--popover-foreground') ||
                    'rgba(255,255,255,0.9)',
                  bodyColor:
                    getThemeColor('--popover-foreground') ||
                    'rgba(255,255,255,0.9)',
                  padding: 12,
                  cornerRadius: 8,
                  boxPadding: 4,
                  callbacks: {
                    label: function (context) {
                      const value = context.raw
                      return `${value} commit${value !== 1 ? 's' : ''}`
                    },
                  },
                },
              },
              animation: {
                duration: 1000,
              },
              layout: {
                padding: 8,
              },
            }}
          />
        ) : (
          <div className="flex h-full flex-col items-center justify-center gap-3 text-muted-foreground">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="48"
              height="48"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="opacity-30"
            >
              <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"></path>
              <circle cx="9" cy="7" r="4"></circle>
              <path d="M23 21v-2a4 4 0 0 0-3-3.87"></path>
              <path d="M16 3.13a4 4 0 0 1 0 7.75"></path>
            </svg>
            <p>No contributors data available</p>
            <button className="text-xs mt-2 px-4 py-2 rounded-md bg-primary/10 text-primary hover:bg-primary/20 transition-colors">
              Fetch Contributors
            </button>
          </div>
        )}
      </div>
      {contributors.length > 0 && contributors.length > 10 && (
        <div className="mt-4 text-xs text-muted-foreground text-center">
          Showing top 10 of {contributors.length} contributors
        </div>
      )}
    </div>
  )
}

export default ContributorsChart