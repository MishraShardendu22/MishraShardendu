'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useAuth } from '../../hooks/use-auth'
import { Button } from '../../components/ui/button'
import { Separator } from '../../components/ui/separator'
import {
  LayoutDashboard,
  Briefcase,
  GraduationCap,
  Settings,
  LogOut,
  Menu,
  X,
  User,
  Award,
} from 'lucide-react'
import api from '../../util/api'

const navigation = [
  { name: 'Dashboard', href: '/admin/dashboard', icon: LayoutDashboard },
  { name: 'Projects', href: '/admin/projects', icon: Briefcase },
  { name: 'Experiences', href: '/admin/experiences', icon: GraduationCap },
  { name: 'Skills', href: '/admin/skills', icon: Settings },
  { name: 'Certifications & Achievements', href: '/admin/certifications', icon: Award },
  { name: 'Profile', href: '/admin/profile', icon: User },
]

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const pathname = usePathname()
  type Profile = { email: string }
  const [profile, setProfile] = useState<Profile | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')
  const { logout } = useAuth()

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const response = await api.get('/admin/profile')
        setProfile(response.data)
      } catch (err) {
        setError('Failed to load profile')
      } finally {
        setLoading(false)
      }
    }
    fetchProfile()
  }, [])

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-muted/20 flex">
      {/* Mobile sidebar overlay */}
      <div className={`fixed inset-0 z-50 lg:hidden transition-all duration-300 ${sidebarOpen ? 'block' : 'hidden'}`}>
        <div className="fixed inset-0 bg-black/40 backdrop-blur-sm" onClick={() => setSidebarOpen(false)} />
        <aside className="fixed inset-y-0 left-0 flex w-72 flex-col bg-card/80 border-r border-border shadow-2xl rounded-tr-3xl rounded-br-3xl backdrop-blur-xl animate-fade-in">
          <div className="flex h-20 items-center justify-between px-6 border-b border-border/30">
            <h1 className="text-2xl font-heading font-bold text-primary drop-shadow-lg">Admin Panel</h1>
            <Button variant="ghost" size="icon" onClick={() => setSidebarOpen(false)}>
              <X className="h-6 w-6 text-foreground" />
            </Button>
          </div>
          <nav className="flex-1 space-y-2 px-4 py-6">
            {navigation.map((item) => {
              const isActive = pathname === item.href
              return (
                <Link
                  key={item.name}
                  href={item.href}
                  className={`group flex items-center gap-3 px-4 py-3 text-base font-medium rounded-xl transition-all duration-200 ${
                    isActive
                      ? 'bg-primary/10 text-primary shadow-lg'
                      : 'text-muted-foreground hover:bg-primary/5 hover:text-primary'
                  }`}
                  onClick={() => setSidebarOpen(false)}
                >
                  <item.icon className="h-5 w-5" />
                  {item.name}
                </Link>
              )
            })}
          </nav>
          <div className="border-t border-border/30 p-6 flex flex-col gap-4">
            <div className="flex items-center gap-3">
              <User className="h-9 w-9 rounded-full bg-muted p-1 shadow" />
              <div>
                <p className="text-base font-semibold text-foreground">{profile?.email}</p>
              </div>
            </div>
            <Button
              variant="outline"
              className="w-full justify-start"
              onClick={logout}
            >
              <LogOut className="mr-2 h-5 w-5" />
              Sign out
            </Button>
          </div>
        </aside>
      </div>

      {/* Desktop sidebar */}
      <aside className="hidden lg:flex lg:flex-col lg:w-72 bg-card/80 border-r border-border shadow-2xl rounded-tr-3xl rounded-br-3xl backdrop-blur-xl animate-fade-in">
        <div className="flex h-20 items-center px-6 border-b border-border/30">
          <h1 className="text-2xl font-heading font-bold text-primary drop-shadow-lg">Admin Panel</h1>
        </div>
        <nav className="flex-1 space-y-2 px-4 py-6">
          {navigation.map((item) => {
            const isActive = pathname === item.href
            return (
              <Link
                key={item.name}
                href={item.href}
                className={`group flex items-center gap-3 px-4 py-3 text-base font-medium rounded-xl transition-all duration-200 ${
                  isActive
                    ? 'bg-primary/10 text-primary shadow-lg'
                    : 'text-muted-foreground hover:bg-primary/5 hover:text-primary'
                }`}
              >
                <item.icon className="h-5 w-5" />
                {item.name}
              </Link>
            )
          })}
        </nav>
        <div className="border-t border-border/30 p-6 flex flex-col gap-4">
          <div className="flex items-center gap-3">
            <User className="h-9 w-9 rounded-full bg-muted p-1 shadow" />
            <div>
              <p className="text-base font-semibold text-foreground">{profile?.email}</p>
            </div>
          </div>
          <Button
            variant="outline"
            className="w-full justify-start"
            onClick={logout}
          >
            <LogOut className="mr-2 h-5 w-5" />
            Sign out
          </Button>
        </div>
      </aside>

      {/* Main content */}
      <div className="flex-1 flex flex-col min-h-screen lg:pl-0">
        {/* Top bar */}
        <header className="sticky top-0 z-40 flex h-20 items-center gap-x-4 border-b border-border bg-card/80 backdrop-blur-xl shadow-md px-4 sm:px-8 animate-fade-in">
          <Button
            variant="ghost"
            className="lg:hidden p-2.5 text-primary"
            onClick={() => setSidebarOpen(true)}
            aria-label="Open sidebar"
          >
            <Menu className="h-7 w-7" />
          </Button>
          <Separator orientation="vertical" className="h-8" />
          <div className="flex flex-1 gap-x-4 self-stretch lg:gap-x-6">
            <div className="flex flex-1"></div>
          </div>
        </header>

        {/* Page content */}
        <main className="flex-1 py-10 px-4 sm:px-8 max-w-7xl mx-auto w-full animate-fade-in">
          {children}
        </main>
      </div>
    </div>
  )
} 