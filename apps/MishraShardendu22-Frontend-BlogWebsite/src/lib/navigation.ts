/**
 * Get the base path for navigation
 * Standalone deployment at root
 */
export function getBasePath(): string {
  if (typeof window === 'undefined') return ''
  return ''
}

/**
 * Navigate to a path with proper base path handling
 */
export function navigateTo(path: string): void {
  const basePath = getBasePath()
  const targetPath = path.startsWith('/') ? path : `/${path}`
  window.location.href = `${basePath}${targetPath}`
}
