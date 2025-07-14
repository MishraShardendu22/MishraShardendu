import React, { useState } from 'react'
import Image from 'next/image'
import { Contributor } from './Types'

interface ContributorsSectionProps {
  contributors: Contributor[]
}

const ContributorsSection: React.FC<ContributorsSectionProps> = ({
  contributors,
}) => {
  const [currentPage, setCurrentPage] = useState(1)
  const contributorsPerPage = 9

  // Calculate pagination
  const indexOfLastContributor = currentPage * contributorsPerPage
  const indexOfFirstContributor = indexOfLastContributor - contributorsPerPage
  const currentContributors = contributors.slice(
    indexOfFirstContributor,
    indexOfLastContributor
  )
  const totalPages = Math.ceil(contributors.length / contributorsPerPage)

  // Change page
  const paginate = (pageNumber: number) => setCurrentPage(pageNumber)

  return (
    <div className="bg-card rounded-lg shadow-md p-6 mb-8 border border-border">
      <h2 className="text-xl font-bold mb-4 text-foreground">Contributors</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {contributors.length > 0 ? (
          currentContributors.map((contributor, index) => (
            <div
              key={index}
              className="flex items-center p-4 border border-border rounded-lg hover:bg-muted transition-colors"
            >
              <Image
                src={contributor.avatar_url}
                alt={contributor.login}
                width={50}
                height={50}
                className="rounded-full"
              />
              <div className="ml-4">
                <a
                  href={contributor.html_url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="font-medium text-accent hover:text-accent-foreground hover:underline transition-colors"
                >
                  {contributor.login}
                </a>
                <div className="text-sm text-muted-foreground">
                  {contributor.contributions} contributions
                </div>
              </div>
            </div>
          ))
        ) : (
          <div className="col-span-3 text-center text-muted-foreground">
            No contributors found
          </div>
        )}
      </div>

      {/* Pagination */}
      {contributors.length > 0 && totalPages > 1 && (
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
              onClick={() => paginate(Math.min(totalPages, currentPage + 1))}
              disabled={currentPage === totalPages}
              className="px-3 py-1 border border-border rounded-md text-foreground hover:bg-muted disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Next
            </button>
          </nav>
        </div>
      )}
    </div>
  )
}

export default ContributorsSection
