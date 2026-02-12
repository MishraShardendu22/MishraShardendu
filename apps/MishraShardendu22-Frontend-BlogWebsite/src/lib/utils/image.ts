/**
 * Resolve image URLs from the backend.
 * Relative paths get prefixed with VITE_API_URL; absolute URLs pass through.
 */
const API_URL = import.meta.env.VITE_API_URL || ''

export function resolveImageUrl(path?: string | null): string | undefined {
  if (!path) return undefined
  if (/^(https?:)?\/\//i.test(path)) return path
  const base = API_URL.replace(/\/$/, '')
  return `${base}/${path.replace(/^\//, '')}`
}
