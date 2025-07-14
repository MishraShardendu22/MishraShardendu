"use client"

import Link from 'next/link'
import { usePathname } from 'next/navigation'

const Tabs = () => {
  const pathname = usePathname()
  const isActive = (path: string) => pathname === path

  return (
    <div className="flex space-x-1 bg-muted/40 p-1 rounded-lg">
      <Link
        href="/dashboard"
        className={`px-4 py-2 text-sm font-medium rounded-md transition-colors duration-200 ${
          isActive('/dashboard')
            ? 'bg-accent text-accent-foreground shadow-sm'
            : 'text-foreground/70 hover:text-foreground hover:bg-muted'
        }`}
        aria-current={isActive('/dashboard') ? 'page' : undefined}
      >
        Dashboard
      </Link>

      <Link
        href="/repositories"
        className={`px-4 py-2 text-sm font-medium rounded-md transition-colors duration-200 ${
          isActive('/repositories')
            ? 'bg-accent text-accent-foreground shadow-sm'
            : 'text-foreground/70 hover:text-foreground hover:bg-muted'
        }`}
        aria-current={isActive('/repositories') ? 'page' : undefined}
      >
        Repositories
      </Link>
      <Link
        href="/settings"
        className={`px-4 py-2 text-sm font-medium rounded-md transition-colors duration-200 ${
          isActive('/settings')
            ? 'bg-accent text-accent-foreground shadow-sm'
            : 'text-foreground/70 hover:text-foreground hover:bg-muted'
        }`}
        aria-current={isActive('/settings') ? 'page' : undefined}
      >
        Settings
      </Link>
    </div>
  )
}

export default Tabs
