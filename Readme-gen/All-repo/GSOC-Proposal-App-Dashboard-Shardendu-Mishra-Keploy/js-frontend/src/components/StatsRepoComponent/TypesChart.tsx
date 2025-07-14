import React from 'react'
import { Radar } from 'react-chartjs-2'

interface ActivityTypesChartProps {
  activityTypes: Record<string, number>
}

const ActivityTypesChart: React.FC<ActivityTypesChartProps> = ({
  activityTypes,
}) => {
  // Get theme colors from CSS variables
  const getThemeColor = (variable: string) => {
    return getComputedStyle(document.documentElement)
      .getPropertyValue(variable)
      .trim()
  }

  const primaryColor = getThemeColor('--primary') || 'rgb(255, 99, 132)'
  const primaryColorAlpha = primaryColor
    .replace('rgb', 'rgba')
    .replace(')', ', 0.2)')

  const activityRadarData = {
    labels: Object.keys(activityTypes),
    datasets: [
      {
        label: 'Repository Activities',
        data: Object.values(activityTypes),
        backgroundColor: primaryColorAlpha,
        borderColor: primaryColor,
        borderWidth: 2,
        pointBackgroundColor: primaryColor,
        pointBorderColor: getThemeColor('--card') || '#fff',
        pointHoverBackgroundColor: getThemeColor('--card') || '#fff',
        pointHoverBorderColor: primaryColor,
        pointRadius: 4,
        pointHoverRadius: 6,
      },
    ],
  }

  return (
    <div className="bg-card rounded-xl shadow-md p-6 border border-border/50 transition-all hover:shadow-lg">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl font-bold text-card-foreground">
          Activity Types
        </h2>
        <div className="text-xs text-muted-foreground bg-muted px-3 py-1 rounded-full">
          {Object.keys(activityTypes).length} types
        </div>
      </div>
      <div className="h-72">
        {Object.keys(activityTypes).length > 0 ? (
          <Radar
            data={activityRadarData}
            options={{
              responsive: true,
              maintainAspectRatio: false,
              plugins: {
                legend: {
                  labels: {
                    color:
                      getThemeColor('--card-foreground') || 'rgba(0,0,0,0.8)',
                    font: {
                      family:
                        getThemeColor('--font-sans') || 'Inter, sans-serif',
                      size: 12,
                    },
                    boxWidth: 12,
                    boxHeight: 12,
                    padding: 16,
                    usePointStyle: true,
                    pointStyle: 'circle',
                  },
                },
                title: {
                  display: true,
                  text: 'Activity Type Distribution',
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
                      return `${context.label}: ${value} ${value === 1 ? 'event' : 'events'}`
                    },
                  },
                },
              },
              scales: {
                r: {
                  suggestedMin: 1,
                  angleLines: {
                    color: getThemeColor('--border') || 'rgba(0,0,0,0.1)',
                  },
                  grid: {
                    color: getThemeColor('--border') || 'rgba(0,0,0,0.1)',
                  },
                  pointLabels: {
                    color:
                      getThemeColor('--muted-foreground') || 'rgba(0,0,0,0.6)',
                    font: {
                      family:
                        getThemeColor('--font-sans') || 'Inter, sans-serif',
                      size: 11,
                    },
                  },
                  ticks: {
                    color:
                      getThemeColor('--muted-foreground') || 'rgba(0,0,0,0.6)',
                    font: {
                      family:
                        getThemeColor('--font-sans') || 'Inter, sans-serif',
                      size: 10,
                    },
                    backdropColor: 'transparent',
                  },
                },
              },
              elements: {
                line: {
                  tension: 0.1,
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
              <circle cx="12" cy="12" r="10"></circle>
              <line x1="12" y1="8" x2="12" y2="12"></line>
              <line x1="12" y1="16" x2="12.01" y2="16"></line>
            </svg>
            <p>No activity data available</p>
            <button className="text-xs mt-2 px-4 py-2 rounded-md bg-primary/10 text-primary hover:bg-primary/20 transition-colors">
              Refresh Activities
            </button>
          </div>
        )}
      </div>
      {Object.keys(activityTypes).length > 0 && (
        <div className="mt-4 text-xs text-muted-foreground text-center">
          Activity data shows repository interactions by type
        </div>
      )}
    </div>
  )
}

export default ActivityTypesChart
