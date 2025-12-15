import {
  Award,
  Book,
  Briefcase,
  FolderKanban,
  GraduationCap,
  LayoutDashboard,
  LogOut,
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
  path?: string
}

export default function AdminLayout({ children, path }: AdminLayoutProps) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const { logout, isAuthenticated, isLoading } = useAuth()
  const [isNarrow, setIsNarrow] = useState(false)

  useEffect(() => {
    if (!isLoading && !isAuthenticated && path !== '/admin/login') {
      route('/admin/login')
    }
  }, [isAuthenticated, isLoading, path])

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

  const isActive = (href: string) => path === href

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-primary"></div>
      </div>
    )
  }

  if (!isAuthenticated) {
    return null
  }

  return (
    <div className="min-h-screen flex flex-col bg-background text-foreground">
      <div className="fixed bottom-4 right-4 z-60">
        <ThemeToggle />
      </div>

      <header className="sticky top-0 z-50 flex items-center justify-between bg-card/90 backdrop-blur-md border-b border-border px-4 sm:px-8 h-16 shadow-md">
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
          <nav className="flex gap-6 font-semibold">
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
            <LogOut className="w-5 h-5 mr-2" />
            Sign Out
          </Button>
        </div>
      </header>

      {mobileMenuOpen && isNarrow && (
        <nav className="sticky top-16 z-40 bg-card/90 backdrop-blur-md border-b border-border shadow-md flex flex-col px-4 py-2 gap-2">
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
        </nav>
      )}

      <main className="flex-1 p-6 sm:p-10">{children}</main>
    </div>
  )
}
