// Utility to resolve image URLs coming from backend. If the backend returns a
// relative path (e.g. "/uploads/img.png" or "uploads/img.png"), this will
// prefix it with VITE_API_URL. If the path is already absolute, it will be
// returned as-is. Returns undefined when no path is provided.
const API_URL = import.meta.env.VITE_API_URL || ''

export const resolveImageUrl = (path?: string | null | undefined): string | undefined => {
  if (!path) return undefined
  // If already absolute (starts with http://, https:// or //), return as-is
  if (/^(https?:)?\/\//i.test(path)) return path
  const base = API_URL.replace(/\/$/, '')
  return `${base}/${path.replace(/^\//, '')}`
}

// Generate responsive image srcset for different screen sizes
export const generateSrcset = (
  src: string | undefined,
  widths: number[] = [320, 640, 768, 1024, 1280, 1920]
): string => {
  if (!src) return ''

  // If it's a Cloudinary URL, use transformation parameters
  if (src.includes('cloudinary.com')) {
    return widths
      .map((w) => {
        const transformed = src.replace('/upload/', `/upload/w_${w},f_auto,q_auto/`)
        return `${transformed} ${w}w`
      })
      .join(', ')
  }

  // For other URLs, return empty (browser will use src)
  return ''
}

// Get optimized Cloudinary URL with auto format and quality
export const getOptimizedImageUrl = (
  src: string | undefined,
  width?: number
): string | undefined => {
  if (!src) return undefined

  const resolvedSrc = resolveImageUrl(src)
  if (!resolvedSrc) return undefined

  // If it's a Cloudinary URL, add optimization parameters
  if (resolvedSrc.includes('cloudinary.com')) {
    const params = ['f_auto', 'q_auto']
    if (width) params.push(`w_${width}`)

    return resolvedSrc.replace('/upload/', `/upload/${params.join(',')}/`)
  }

  return resolvedSrc
}

// Calculate responsive sizes attribute based on layout
export const getResponsiveSizes = (
  layout: 'full' | 'card' | 'avatar' | 'thumbnail' = 'full'
): string => {
  switch (layout) {
    case 'avatar':
      return '48px'
    case 'thumbnail':
      return '(max-width: 640px) 100px, 150px'
    case 'card':
      return '(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw'
    default:
      return '(max-width: 640px) 100vw, (max-width: 1024px) 80vw, 1200px'
  }
}

// Check if an image URL is from Cloudinary (supports optimizations)
export const isCloudinaryUrl = (url: string | undefined): boolean => {
  return url?.includes('cloudinary.com') ?? false
}

export default resolveImageUrl
