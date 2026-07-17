import type { JSX } from 'preact'
import { createContext } from 'preact'
import { useContext, useEffect } from 'preact/hooks'

type Theme = 'dark'

interface ThemeContextType {
  theme: Theme
  setTheme: (theme: Theme) => void
  resolvedTheme: 'dark'
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined)

export function ThemeProvider({ children }: { children: JSX.Element | JSX.Element[] }) {
  const applyTheme = () => {
    const root = document.documentElement
    root.classList.remove('light')
    root.classList.add('dark')
  }

  const setTheme = () => {
    // Locked to dark-only, no-op
  }

  useEffect(() => {
    applyTheme()

    // Auto-migrate any local storage theme to dark
    localStorage.setItem('portfolio-theme', 'dark')

    const handleStorageChange = (e: StorageEvent) => {
      if (e.key === 'portfolio-theme' && e.newValue !== 'dark') {
        localStorage.setItem('portfolio-theme', 'dark')
        applyTheme()
      }
    }

    window.addEventListener('storage', handleStorageChange)
    return () => {
      window.removeEventListener('storage', handleStorageChange)
    }
  }, [])

  return (
    <ThemeContext.Provider value={{ theme: 'dark', setTheme, resolvedTheme: 'dark' }}>
      {children}
    </ThemeContext.Provider>
  )
}

export function useTheme() {
  const context = useContext(ThemeContext)
  if (!context) {
    throw new Error('useTheme must be used within ThemeProvider')
  }
  return context
}
