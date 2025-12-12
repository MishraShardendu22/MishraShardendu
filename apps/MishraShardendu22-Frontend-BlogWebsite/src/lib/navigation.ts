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
 * Uses pushState to update URL without full page reload
 */
export function navigateTo(path: string): void {
  const basePath = getBasePath()
  const targetPath = path.startsWith('/') ? path : `/${path}`
  const fullPath = `${basePath}${targetPath}`

  // Update URL without reload
  window.history.pushState(null, '', fullPath)

  // Dispatch popstate event to trigger route change in App.svelte
  window.dispatchEvent(new PopStateEvent('popstate'))
}
