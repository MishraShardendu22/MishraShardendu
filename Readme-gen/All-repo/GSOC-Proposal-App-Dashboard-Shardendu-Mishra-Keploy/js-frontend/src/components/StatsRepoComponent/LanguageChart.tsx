/* eslint-disable @typescript-eslint/no-explicit-any */
import React from 'react'
import { Pie } from 'react-chartjs-2'
import { generateColors } from './ChartConfig'

interface LanguagesChartProps {
  languagesData: Record<string, number> | null
}

const LanguagesChart: React.FC<LanguagesChartProps> = ({ languagesData }) => {
  console.log('languagesData', languagesData)

const getThemeChartColors = () => {
  return [
    getComputedStyle(document.documentElement)
      .getPropertyValue('--chart-1')
      .trim(),
    getComputedStyle(document.documentElement)
      .getPropertyValue('--chart-2')
      .trim(),
    getComputedStyle(document.documentElement)
      .getPropertyValue('--chart-3')
      .trim(),
    getComputedStyle(document.documentElement)
      .getPropertyValue('--chart-4')
      .trim(),
    getComputedStyle(document.documentElement)
      .getPropertyValue('--chart-5')
      .trim(),
  ]
}

const languageChartData = {
  labels:
    languagesData && typeof languagesData === 'object'
      ? Object.keys(languagesData)
      : [], // Fallback to an empty array if languagesData is not an object
  datasets: [
    {
      data:
        languagesData && typeof languagesData === 'object'
          ? Object.values(languagesData)
          : [], // Fallback to an empty array if languagesData is not an object
      backgroundColor:
        languagesData && typeof languagesData === 'object'
          ? [
              ...getThemeChartColors(),
              ...generateColors(
                Math.max(0, Object.keys(languagesData).length - 5)
              ).colors,
            ]
          : [], // Fallback to an empty array if languagesData is not an object
      borderWidth: 2,
      borderColor: getComputedStyle(document.documentElement)
        .getPropertyValue('--background')
        .trim(),
      hoverOffset: 10,
      hoverBorderWidth: 3,
    },
  ],
}

const formatBytes = (bytes: number) => {
  if (bytes === 0) return '0 Bytes'
  const k = 1024
  const sizes = ['Bytes', 'KB', 'MB', 'GB']
  const i = Math.floor(Math.log(bytes) / Math.log(k))
  return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i]
}


  return (
    <div className="bg-card rounded-xl shadow-md p-6 border border-border/50 transition-all hover:shadow-lg">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl font-bold text-card-foreground">Languages</h2>
        <div className="text-xs text-muted-foreground bg-muted px-3 py-1 rounded-full">
          {languagesData ? Object.keys(languagesData).length : 0} languages
        </div>
      </div>
      <div className="h-72">
        {languagesData && Object.keys(languagesData).length > 0 ? (
          <Pie
            data={languageChartData}
            options={{
              responsive: true,
              maintainAspectRatio: false,
              plugins: {
                legend: {
                  position: 'right',
                  align: 'center',
                  labels: {
                    boxWidth: 12,
                    boxHeight: 12,
                    padding: 16,
                    color: getComputedStyle(document.documentElement)
                      .getPropertyValue('--card-foreground')
                      .trim(),
                    font: {
                      family: getComputedStyle(document.documentElement)
                        .getPropertyValue('--font-sans')
                        .trim(),
                      size: 11,
                    },
                    usePointStyle: true,
                    pointStyle: 'circle',
                  },
                },
                title: {
                  display: true,
                  text: 'Languages Distribution',
                  color: getComputedStyle(document.documentElement)
                    .getPropertyValue('--card-foreground')
                    .trim(),
                  font: {
                    family: getComputedStyle(document.documentElement)
                      .getPropertyValue('--font-sans')
                      .trim(),
                    size: 14,
                    weight: 'normal',
                  },
                  padding: {
                    bottom: 16,
                  },
                },
                tooltip: {
                  backgroundColor: getComputedStyle(document.documentElement)
                    .getPropertyValue('--popover')
                    .trim(),
                  titleColor: getComputedStyle(document.documentElement)
                    .getPropertyValue('--popover-foreground')
                    .trim(),
                  bodyColor: getComputedStyle(document.documentElement)
                    .getPropertyValue('--popover-foreground')
                    .trim(),
                  padding: 12,
                  cornerRadius: 8,
                  boxPadding: 4,
                  callbacks: {
                    label: function (context) {
                      const label = context.label || ''
                      const value = context.raw as number
                      const total = context.chart.data.datasets[0].data.reduce(
                        (a: number, b: any) =>
                          a + (typeof b === 'number' ? b : 0),
                        0
                      )
                      const percentage = Math.round((value / total) * 100)
                      return `${label}: ${percentage}% (${formatBytes(value)})`
                    },
                  },
                },
              },
              animation: {
                animateRotate: true,
                animateScale: true,
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
              <path d="M17.5 5.5C19 7 20.5 9 21 11c-2.5.5-5 .5-8.5-1" />
              <path d="M5.5 17.5C7 19 9 20.5 11 21c.5-2.5.5-5-1-8.5" />
              <path d="M16.5 11.5c1 2 1 3.5 1 6-2.5 0-4 0-6-1" />
              <path d="M20 11.5c1 1.5 2 3.5 2 4.5-1.5.5-3 0-4.5-.5" />
              <path d="M11.5 20c1.5 1 3.5 2 4.5 2 .5-1.5 0-3-.5-4.5" />
              <path d="M20.5 16.5c1 2 1.5 3.5 1.5 5.5-2 0-3.5-.5-5.5-1.5" />
              <path d="M4.783 4.782C1.075 8.492 1 13.5 1 16.5c3-0 8-0 11.713-3.712M7.5 7.5l5 5" />
            </svg>
            <p>No language data available</p>
            <button className="text-xs mt-2 px-4 py-2 rounded-md bg-primary/10 text-primary hover:bg-primary/20 transition-colors">
              Refresh Data
            </button>
          </div>
        )}
      </div>
      {languagesData && Object.keys(languagesData).length > 0 && (
        <div className="mt-4 text-xs text-muted-foreground text-center">
          Click on a language in the legend to toggle its visibility
        </div>
      )}
    </div>
  )
}

export default LanguagesChart