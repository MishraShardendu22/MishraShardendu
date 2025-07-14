/* eslint-disable @typescript-eslint/no-explicit-any */
// Component/CommitActivityChart.tsx
import React from 'react'
import { Line } from 'react-chartjs-2'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'

interface CommitActivityChartProps {
  commitActivity: any[]
}

const CommitActivityChart: React.FC<CommitActivityChartProps> = ({
  commitActivity,
}) => {

  const commitChartData = {
    labels: Array.isArray(commitActivity)
      ? commitActivity.slice(0, 12).map((week) =>
          new Date(week.week * 1000).toLocaleDateString('en-US', {
            month: 'short',
            day: 'numeric',
          })
        )
      : [],
    datasets: [
      {
        label: 'Commits',
        data: Array.isArray(commitActivity) 
        ? commitActivity.slice(0, 12).map((week) => week.total || 0) 
        : [],
        fill: true,
        backgroundColor: 'rgba(75, 192, 192, 0.2)',
        borderColor: 'rgba(75, 192, 192, 1)',
        borderWidth: 2,
        pointBackgroundColor: 'rgba(75, 192, 192, 1)',
        pointBorderColor: '#fff',
        pointHoverBackgroundColor: '#fff',
        pointHoverBorderColor: 'rgba(75, 192, 192, 1)',
        pointRadius: 4,
        tension: 0.3,
      },
    ],
  }

  // Chart options for better styling
  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: 'top' as const,
        labels: {
          font: {
            size: 12,
          },
          padding: 20,
        },
      },
      tooltip: {
        backgroundColor: 'rgba(0, 0, 0, 0.7)',
        padding: 10,
        cornerRadius: 4,
        titleFont: {
          size: 14,
        },
        bodyFont: {
          size: 12,
        },
      },
    },
    scales: {
      y: {
        beginAtZero: true,
        grid: {
          color: 'rgba(0, 0, 0, 0.05)',
        },
        ticks: {
          precision: 0,
        },
      },
      x: {
        grid: {
          display: false,
        },
      },
    },
  }

  return (
    <Card className="shadow-md bg-trasparent rounded-lg overflow-hidden">
      <CardHeader className="pb-2 border-b">
        <CardTitle className="text-lg font-medium text-gray-800">
          Commit Activity
        </CardTitle>
      </CardHeader>
      <CardContent className="p-4">
        <div className="h-64 w-full">
          {commitActivity.length > 0 ? (
            <Line data={commitChartData} options={options} />
          ) : (
            <div className="h-full w-full flex items-center justify-center text-gray-500">
              No commit activity data available
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  )
}

export default CommitActivityChart