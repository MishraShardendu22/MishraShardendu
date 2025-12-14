/**
 * Theme management utilities for dark/light mode
 * Uses shared localStorage key to sync theme across all portfolio websites
 */

import { writable } from 'svelte/store'

export type Theme = 'light' | 'dark'

// Shared theme key across all portfolio websites for synchronized theme
const THEME_KEY = 'portfolio-theme'

// Get initial theme from localStorage or system preference
function getInitialTheme(): Theme {
  if (typeof window === 'undefined') return 'light'

  const stored = localStorage.getItem(THEME_KEY)
  if (stored === 'light' || stored === 'dark') {
    return stored
  }

  // Check system preference
  if (window.matchMedia?.('(prefers-color-scheme: dark)').matches) {
    return 'dark'
  }

  return 'light'
}

// Create theme store
function createThemeStore() {
  const { subscribe, set, update } = writable<Theme>(getInitialTheme())

  return {
    subscribe,
    set: (theme: Theme) => {
      if (typeof window !== 'undefined') {
        localStorage.setItem(THEME_KEY, theme)
        applyTheme(theme)
      }
      set(theme)
    },
    toggle: () => {
      update((current) => {
        const newTheme = current === 'light' ? 'dark' : 'light'
        if (typeof window !== 'undefined') {
          localStorage.setItem(THEME_KEY, newTheme)
          applyTheme(newTheme)
        }
        return newTheme
      })
    },
    init: () => {
      if (typeof window !== 'undefined') {
        const theme = getInitialTheme()
        applyTheme(theme)
        set(theme)

        // Listen for system theme changes
        const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)')
        const handleChange = (e: MediaQueryListEvent) => {
          const stored = localStorage.getItem(THEME_KEY)
          if (!stored) {
            const newTheme = e.matches ? 'dark' : 'light'
            applyTheme(newTheme)
            set(newTheme)
          }
        }

        // Listen for theme changes from other tabs/websites (cross-app sync)
        const handleStorageChange = (e: StorageEvent) => {
          if (e.key === THEME_KEY && e.newValue) {
            const newTheme = e.newValue as Theme
            if (newTheme === 'light' || newTheme === 'dark') {
              applyTheme(newTheme)
              set(newTheme)
            }
          }
        }

        mediaQuery.addEventListener('change', handleChange)
        window.addEventListener('storage', handleStorageChange)

        return () => {
          mediaQuery.removeEventListener('change', handleChange)
          window.removeEventListener('storage', handleStorageChange)
        }
      }
    },
  }
}

// Apply theme to document
function applyTheme(theme: Theme) {
  if (typeof document === 'undefined') return

  const root = document.documentElement

  if (theme === 'dark') {
    root.classList.add('dark')
  } else {
    root.classList.remove('dark')
  }

  // Update meta theme-color for mobile browsers
  const metaThemeColor = document.querySelector('meta[name="theme-color"]')
  if (metaThemeColor) {
    metaThemeColor.setAttribute('content', theme === 'dark' ? '#000000' : '#fef7f0')
  }
}

export const themeStore = createThemeStore()

// Helper function to get current theme
export function getTheme(): Theme {
  let currentTheme: Theme = 'light'
  themeStore.subscribe((theme) => {
    currentTheme = theme
  })()
  return currentTheme
}
