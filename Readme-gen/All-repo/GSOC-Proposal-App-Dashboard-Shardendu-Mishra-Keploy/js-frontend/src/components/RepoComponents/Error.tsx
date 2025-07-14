// File: components/github/ErrorState.tsx

interface ErrorStateProps {
  message: string
  onRetry: () => void
}

const ErrorState = ({ message, onRetry }: ErrorStateProps) => {
  return (
    <div className="flex justify-center items-center h-64">
      <div className="bg-red-50 p-6 rounded-xl max-w-md text-center">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-12 w-12 mx-auto text-red-500 mb-4"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
          />
        </svg>
        <h3 className="text-lg font-bold text-gray-800 mb-2">
          Error Loading Repositories
        </h3>
        <p className="text-gray-600">{message}</p>
        <button
          onClick={onRetry}
          className="mt-4 px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors duration-200"
        >
          Try Again
        </button>
      </div>
    </div>
  )
}

export default ErrorState
