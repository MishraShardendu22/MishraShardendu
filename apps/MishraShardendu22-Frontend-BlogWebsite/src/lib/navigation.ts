/**
 * Navigate to a path using pushState (no full page reload)
 */
export function navigateTo(path: string): void {
  const targetPath = path.startsWith('/') ? path : `/${path}`

  window.history.pushState(null, '', targetPath)
  window.dispatchEvent(new PopStateEvent('popstate'))
}
