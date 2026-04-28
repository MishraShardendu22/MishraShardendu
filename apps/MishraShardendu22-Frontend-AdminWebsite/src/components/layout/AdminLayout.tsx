import {
  Award,
  Book,
  Briefcase,
  FolderKanban,
  GraduationCap,
  LayoutDashboard,
  Menu,
  Settings,
  User,
  User2Icon,
} from 'lucide-react'
import type { JSX } from 'preact'
import { useEffect, useState } from 'preact/hooks'
import { route } from 'preact-router'
import { useAuth } from '../../hooks/use-auth'
import ThemeToggle from '../extra/ThemeToggle'
import { Button } from '../ui/button'

const navigation = [
  { name: 'Dashboard', href: '/admin/dashboard', icon: LayoutDashboard },
  { name: 'Profile', href: '/admin/profile', icon: User },

  { name: 'Skills', href: '/admin/skills', icon: Settings },

  { name: 'Experiences', href: '/admin/experiences', icon: GraduationCap },
  { name: 'Volunteer', href: '/admin/volunteer', icon: User2Icon },

  { name: 'Certifications', href: '/admin/certifications', icon: Award },

  { name: 'Projects', href: '/admin/projects', icon: Briefcase },
  { name: 'Kanban', href: '/admin/kanban', icon: FolderKanban },

  { name: 'Blog', href: '/admin/blogs/reorder', icon: Book },
]

interface AdminLayoutProps {
  children?: JSX.Element | JSX.Element[]
}

export default function AdminLayout({ children }: AdminLayoutProps) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const { logout, isAuthenticated, isLoading } = useAuth()
  const [isNarrow, setIsNarrow] = useState(false)
  const currentPath = typeof window !== 'undefined' ? window.location.pathname : ''

  useEffect(() => {
    if (!isLoading && !isAuthenticated) {
      route('/admin/login')
    }
  }, [isAuthenticated, isLoading])

  // show mobile/menu button when viewport is less than 1650px
  useEffect(() => {
    const update = () => {
      if (typeof window === 'undefined') return
      setIsNarrow(window.innerWidth < 1650)
    }

    update()
    window.addEventListener('resize', update)
    return () => window.removeEventListener('resize', update)
  }, [])

  const isActive = (href: string) => currentPath === href

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-[60vh]">
        <div className="animate-spin rounded-full h-10 w-10 border-2 border-primary border-t-transparent" />
      </div>
    )
  }

  if (!isAuthenticated) {
    return null
  }

  return (
    <div className="relative min-h-screen flex flex-col bg-background text-foreground overflow-hidden">
      <div className="pointer-events-none absolute inset-0 -z-10">
        <div className="absolute -top-32 left-1/2 h-72 w-72 -translate-x-1/2 rounded-full bg-primary/20 blur-3xl" />
        <div className="absolute top-24 right-[-8%] h-80 w-80 rounded-full bg-accent/20 blur-3xl" />
        <div className="absolute bottom-[-10%] left-[-6%] h-72 w-72 rounded-full bg-secondary/15 blur-3xl" />
      </div>

      <div className="fixed bottom-4 right-4 z-60">
        <ThemeToggle />
      </div>

      <header className="sticky top-0 z-50 bg-card/85 backdrop-blur-md border-b border-border shadow-sm">
        <div className="mx-auto flex w-full max-w-7xl items-center justify-between px-4 sm:px-8 h-16">
          <div className="flex items-center gap-4">
            {isNarrow && (
              <button
                className="p-2 rounded-md hover:bg-primary/20 transition"
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              >
                <Menu className="w-6 h-6 text-primary" />
              </button>
            )}
            <a href="/admin/dashboard" className="font-bold text-xl text-primary select-none">
              Admin Panel
            </a>
          </div>

          {!isNarrow && (
            <nav className="flex gap-4 font-semibold">
              {navigation.map(({ name, href, icon: Icon }) => (
                <a
                  key={name}
                  href={href}
                  className={`flex items-center gap-2 px-3 py-2 rounded-md transition-colors duration-200 ${
                    isActive(href)
                      ? 'bg-primary text-primary-foreground shadow-md'
                      : 'text-foreground hover:bg-primary/10 hover:text-primary'
                  }`}
                >
                  <Icon className="w-5 h-5" />
                  <span>{name}</span>
                </a>
              ))}
            </nav>
          )}

          <div className="flex items-center gap-4">
            <Button variant="outline" className="text-primary hover:bg-primary/20" onClick={logout}>
              Sign Out
            </Button>
          </div>
        </div>
      </header>

      {mobileMenuOpen && isNarrow && (
        <nav className="sticky top-16 z-40 bg-card/90 backdrop-blur-md border-b border-border shadow-md">
          <div className="mx-auto flex w-full max-w-7xl flex-col px-4 py-2 gap-2">
            {navigation.map(({ name, href, icon: Icon }) => (
              <a
                key={name}
                href={href}
                className={`flex items-center gap-3 px-3 py-2 rounded-md transition-colors duration-150 ${
                  isActive(href)
                    ? 'bg-primary text-primary-foreground shadow-md'
                    : 'text-foreground hover:bg-primary/10 hover:text-primary'
                }`}
                onClick={() => setMobileMenuOpen(false)}
              >
                <Icon className="w-5 h-5" />
                <span>{name}</span>
              </a>
            ))}
          </div>
        </nav>
      )}

      <main className="flex-1 w-full max-w-7xl mx-auto px-4 sm:px-8 py-10">{children}</main>
    </div>
  )
}
