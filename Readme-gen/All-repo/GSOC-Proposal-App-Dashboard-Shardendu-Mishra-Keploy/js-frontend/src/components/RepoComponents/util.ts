// File: components/github/utils.ts

// Format date
export const formatDate = (dateString: string) => {
  const date = new Date(dateString)
  return date.toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
  })
}

// Get relative time
export const getRelativeTime = (dateString: string) => {
  const date = new Date(dateString)
  const now = new Date()
  const diffTime = Math.abs(now.getTime() - date.getTime())
  const diffDays = Math.floor(diffTime / (1000 * 60 * 60 * 24))
  
  if (diffDays === 0) return 'Today'
  if (diffDays === 1) return 'Yesterday'
  if (diffDays < 7) return `${diffDays} days ago`
  if (diffDays < 30) return `${Math.floor(diffDays / 7)} weeks ago`
  if (diffDays < 365) return `${Math.floor(diffDays / 30)} months ago`
  return `${Math.floor(diffDays / 365)} years ago`
}

// Get language color
export const getLanguageColor = (language: string | null) => {
  if (!language) return 'bg-gray-100 text-gray-700'
  
  const colors: Record<string, string> = {
    JavaScript: 'bg-yellow-50 text-yellow-700',
    TypeScript: 'bg-blue-50 text-blue-700',
    Python: 'bg-green-50 text-green-700',
    Java: 'bg-red-50 text-red-700',
    HTML: 'bg-orange-50 text-orange-700',
    CSS: 'bg-purple-50 text-purple-700',
    Go: 'bg-cyan-50 text-cyan-700',
    Rust: 'bg-amber-50 text-amber-700',
    C: 'bg-gray-100 text-gray-700',
    'C++': 'bg-pink-50 text-pink-700',
    Ruby: 'bg-red-50 text-red-700',
    PHP: 'bg-indigo-50 text-indigo-700',
  }
  
  return colors[language] || 'bg-blue-50 text-blue-700'
}