// File: components/github/Pagination.tsx

interface PaginationProps {
  currentPage: number
  totalPages: number
  onPageChange: (pageNumber: number) => void
}

const Pagination = ({
  currentPage,
  totalPages,
  onPageChange,
}: PaginationProps) => {
  return (
    <div className="flex justify-center mt-10">
      <div className="inline-flex rounded-md shadow-sm bg-white p-1 border border-gray-200">
        <button
          onClick={() => onPageChange(currentPage > 1 ? currentPage - 1 : 1)}
          disabled={currentPage === 1}
          className={`relative inline-flex items-center px-3 py-2 rounded-md text-sm font-medium ${
            currentPage === 1
              ? 'text-gray-300 cursor-not-allowed'
              : 'text-gray-700 hover:bg-gray-100'
          }`}
          aria-label="Previous page"
        >
          <svg
            className="h-5 w-5"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 20 20"
            fill="currentColor"
          >
            <path
              fillRule="evenodd"
              d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z"
              clipRule="evenodd"
            />
          </svg>
        </button>

        {totalPages <= 5 ? (
          // Show all pages if 5 or fewer
          [...Array(totalPages)].map((_, index) => (
            <button
              key={index}
              onClick={() => onPageChange(index + 1)}
              className={`relative inline-flex items-center px-4 py-2 rounded-md text-sm font-medium ${
                currentPage === index + 1
                  ? 'bg-blue-50 text-blue-600'
                  : 'text-gray-700 hover:bg-gray-100'
              }`}
              aria-label={`Page ${index + 1}`}
              aria-current={currentPage === index + 1 ? 'page' : undefined}
            >
              {index + 1}
            </button>
          ))
        ) : (
          // Show limited pages with ellipsis for larger page counts
          <>
            {/* First page */}
            <button
              onClick={() => onPageChange(1)}
              className={`relative inline-flex items-center px-4 py-2 rounded-md text-sm font-medium ${
                currentPage === 1
                  ? 'bg-blue-50 text-blue-600'
                  : 'text-gray-700 hover:bg-gray-100'
              }`}
              aria-current={currentPage === 1 ? 'page' : undefined}
            >
              1
            </button>

            {/* Left ellipsis */}
            {currentPage > 3 && (
              <span className="relative inline-flex items-center px-4 py-2 text-sm font-medium text-gray-700">
                ...
              </span>
            )}

            {/* Current page neighborhood */}
            {[...Array(totalPages)].map((_, index) => {
              const pageNumber = index + 1
              // Show current page and 1 page before/after
              if (
                pageNumber !== 1 &&
                pageNumber !== totalPages &&
                pageNumber >= currentPage - 1 &&
                pageNumber <= currentPage + 1
              ) {
                return (
                  <button
                    key={index}
                    onClick={() => onPageChange(pageNumber)}
                    className={`relative inline-flex items-center px-4 py-2 rounded-md text-sm font-medium ${
                      currentPage === pageNumber
                        ? 'bg-blue-50 text-blue-600'
                        : 'text-gray-700 hover:bg-gray-100'
                    }`}
                    aria-current={
                      currentPage === pageNumber ? 'page' : undefined
                    }
                  >
                    {pageNumber}
                  </button>
                )
              }
              return null
            })}

            {/* Right ellipsis */}
            {currentPage < totalPages - 2 && (
              <span className="relative inline-flex items-center px-4 py-2 text-sm font-medium text-gray-700">
                ...
              </span>
            )}

            {/* Last page */}
            {totalPages > 1 && (
              <button
                onClick={() => onPageChange(totalPages)}
                className={`relative inline-flex items-center px-4 py-2 rounded-md text-sm font-medium ${
                  currentPage === totalPages
                    ? 'bg-blue-50 text-blue-600'
                    : 'text-gray-700 hover:bg-gray-100'
                }`}
                aria-current={currentPage === totalPages ? 'page' : undefined}
              >
                {totalPages}
              </button>
            )}
          </>
        )}

        <button
          onClick={() =>
            onPageChange(
              currentPage < totalPages ? currentPage + 1 : totalPages
            )
          }
          disabled={currentPage === totalPages}
          className={`relative inline-flex items-center px-3 py-2 rounded-md text-sm font-medium ${
            currentPage === totalPages
              ? 'text-gray-300 cursor-not-allowed'
              : 'text-gray-700 hover:bg-gray-100'
          }`}
          aria-label="Next page"
        >
          <svg
            className="h-5 w-5"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 20 20"
            fill="currentColor"
          >
            <path
              fillRule="evenodd"
              d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z"
              clipRule="evenodd"
            />
          </svg>
        </button>
      </div>
    </div>
  )
}

export default Pagination
