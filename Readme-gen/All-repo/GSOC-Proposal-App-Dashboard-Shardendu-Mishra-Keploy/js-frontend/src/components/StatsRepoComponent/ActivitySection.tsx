import React, { useState } from 'react'
import Image from 'next/image'
import { Chart } from 'react-chartjs-2'
import { ContributorStats } from './Types'

interface ContributorActivitySectionProps {
  stats: ContributorStats[]
}

const ContributorActivitySection: React.FC<ContributorActivitySectionProps> = ({
  stats,
}) => {
  const [currentPage, setCurrentPage] = useState(1)
  const contributorsPerPage = 3

  // Calculate pagination
  const indexOfLastContributor = currentPage * contributorsPerPage
  const indexOfFirstContributor = indexOfLastContributor - contributorsPerPage
  const currentContributors = stats
    ? stats.slice(indexOfFirstContributor, indexOfLastContributor)
    : []
  const totalPages = stats ? Math.ceil(stats.length / contributorsPerPage) : 0

  // Change page
  const paginate = (pageNumber: number) => setCurrentPage(pageNumber)

  return (
    <div className="bg-card rounded-lg shadow-md p-6 border border-border">
      <h2 className="text-xl font-bold mb-4 text-foreground">
        Contributor Activity
      </h2>
      {stats && stats.length > 0 ? (
        <>
          {currentContributors.map((contributor, index) => {
            // Calculate contributor totals
            const additions = contributor.weeks.reduce(
              (sum, week) => sum + week.a,
              0
            )
            const deletions = contributor.weeks.reduce(
              (sum, week) => sum + week.d,
              0
            )

            // Prepare weekly data for this contributor
            const weeklyData = {
              labels: contributor.weeks.slice(-10).map((week) =>
                new Date(week.w * 1000).toLocaleDateString('en-US', {
                  month: 'short',
                  day: 'numeric',
                })
              ),
              datasets: [
                {
                  label: 'Additions',
                  data: contributor.weeks.slice(-10).map((week) => week.a),
                  backgroundColor: 'rgba(255, 107, 61, 0.4)', // --chart-1
                  borderColor: 'rgba(255, 107, 61, 1)',
                  borderWidth: 1,
                  yAxisID: 'y',
                },
                {
                  label: 'Deletions',
                  data: contributor.weeks.slice(-10).map((week) => week.d),
                  backgroundColor: 'rgba(46, 31, 94, 0.4)', // --chart-2
                  borderColor: 'rgba(46, 31, 94, 1)',
                  borderWidth: 1,
                  yAxisID: 'y',
                },
                {
                  label: 'Commits',
                  data: contributor.weeks.slice(-10).map((week) => week.c),
                  type: 'line' as const,
                  borderColor: 'rgba(120, 97, 165, 1)', // --chart-3
                  backgroundColor: 'rgba(120, 97, 165, 0.5)',
                  yAxisID: 'y1',
                },
              ],
            }

            return (
              <div
                key={index}
                className="mb-8 p-4 border border-border rounded-lg bg-card/50"
              >
                <div className="flex flex-col sm:flex-row sm:items-center mb-4">
                  <Image
                    src={contributor.author.avatar_url}
                    alt={contributor.author.login}
                    width={60}
                    height={60}
                    className="rounded-full"
                  />
                  <div className="mt-4 sm:mt-0 sm:ml-4">
                    <a
                      href={contributor.author.html_url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-lg font-bold text-accent hover:text-accent-foreground hover:underline transition-colors"
                    >
                      {contributor.author.login}
                    </a>
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mt-2">
                      <div className="text-sm">
                        <span className="font-medium">Commits:</span>{' '}
                        <span className="text-foreground">
                          {contributor.total}
                        </span>
                      </div>
                      <div className="text-sm">
                        <span className="font-medium">Additions:</span>{' '}
                        <span className="text-primary">
                          {additions.toLocaleString()}
                        </span>
                      </div>
                      <div className="text-sm">
                        <span className="font-medium">Deletions:</span>{' '}
                        <span className="text-secondary-foreground">
                          {deletions.toLocaleString()}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="h-64 mt-4">
                  <Chart
                    type="bar"
                    data={weeklyData}
                    options={{
                      responsive: true,
                      plugins: {
                        title: {
                          display: true,
                          text: `Recent Activity - ${contributor.author.login}`,
                          color: 'var(--foreground)',
                        },
                        legend: {
                          labels: {
                            color: 'var(--foreground)',
                          },
                        },
                      },
                      scales: {
                        x: {
                          title: {
                            display: true,
                            text: 'Week',
                            color: 'var(--foreground)',
                          },
                          ticks: {
                            color: 'var(--foreground)',
                          },
                          grid: {
                            color: 'var(--border)',
                          },
                        },
                        y: {
                          type: 'linear',
                          display: true,
                          position: 'left',
                          title: {
                            display: true,
                            text: 'Lines',
                            color: 'var(--foreground)',
                          },
                          ticks: {
                            color: 'var(--foreground)',
                          },
                          grid: {
                            color: 'var(--border)',
                          },
                        },
                        y1: {
                          type: 'linear',
                          display: true,
                          position: 'right',
                          grid: {
                            drawOnChartArea: false,
                            color: 'var(--border)',
                          },
                          title: {
                            display: true,
                            text: 'Commits',
                            color: 'var(--foreground)',
                          },
                          min: 0,
                          ticks: {
                            color: 'var(--foreground)',
                          },
                        },
                      },
                    }}
                  />
                </div>
              </div>
            )
          })}

          {/* Pagination */}
          {totalPages > 1 && (
            <div className="flex justify-center mt-6">
              <nav className="flex items-center space-x-2">
                <button
                  onClick={() => paginate(Math.max(1, currentPage - 1))}
                  disabled={currentPage === 1}
                  className="px-3 py-1 border border-border rounded-md text-foreground hover:bg-muted disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  Previous
                </button>

                {Array.from({ length: totalPages }, (_, i) => i + 1).map(
                  (number) => (
                    <button
                      key={number}
                      onClick={() => paginate(number)}
                      className={`px-3 py-1 border border-border rounded-md hover:bg-muted ${
                        currentPage === number
                          ? 'bg-accent text-accent-foreground'
                          : 'text-foreground'
                      }`}
                    >
                      {number}
                    </button>
                  )
                )}

                <button
                  onClick={() =>
                    paginate(Math.min(totalPages, currentPage + 1))
                  }
                  disabled={currentPage === totalPages}
                  className="px-3 py-1 border border-border rounded-md text-foreground hover:bg-muted disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  Next
                </button>
              </nav>
            </div>
          )}
        </>
      ) : (
        <p className="text-muted-foreground">Loading contributor stats...</p>
      )}
    </div>
  )
}

export default ContributorActivitySection
