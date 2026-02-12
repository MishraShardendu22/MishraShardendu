import type { ComponentType } from 'preact'
import { lazy, Suspense } from 'preact/compat'
import { useEffect } from 'preact/hooks'
import { Route, Router } from 'preact-router'
import AdminLayout from './components/layout/AdminLayout'
import { useAuth } from './hooks/use-auth'
import { pageSEO, updateSEO } from './utils/seo.util'

// Route-level code splitting - lazy load all page components
const LoginPage = lazy(() => import('./pages/login'))
const DashboardPage = lazy(() => import('./pages/dashboard'))
const ProfilePage = lazy(() => import('./pages/profile'))
const SkillsPage = lazy(() => import('./pages/skills'))
const ProjectsPage = lazy(() => import('./pages/projects'))
const ExperiencesPage = lazy(() => import('./pages/experiences'))
const VolunteerPage = lazy(() => import('./pages/volunteer'))
const CertificationsPage = lazy(() => import('./pages/certifications'))
const KanbanPage = lazy(() => import('./pages/kanban'))
const BlogReorderPage = lazy(() => import('./pages/blogReorder'))
const EditProjectPage = lazy(() => import('./pages/edit-project'))
const EditCertificationPage = lazy(() => import('./pages/edit-certification'))
const EditExperiencePage = lazy(() => import('./pages/edit-experience'))
const EditVolunteerPage = lazy(() => import('./pages/edit-volunteer'))

// Lightweight loading fallback
const PageLoader = () => (
  <div className="flex items-center justify-center min-h-[60vh]">
    <div className="animate-spin rounded-full h-10 w-10 border-2 border-primary border-t-transparent" />
  </div>
)

// Route-to-SEO key mapping
const routeSEOMap: Record<string, keyof typeof pageSEO> = {
  '/login': 'login',
  '/dashboard': 'dashboard',
  '/profile': 'profile',
  '/skills': 'skills',
  '/projects': 'projects',
  '/experiences': 'experiences',
  '/volunteer': 'volunteer',
  '/certifications': 'certifications',
  '/kanban': 'kanban',
  '/blogs/reorder': 'blogReorder',
}

// Protected route definitions
interface RouteConfig {
  path: string
  Page: ComponentType<any>
  hasIdParam?: boolean
}

const protectedRoutes: RouteConfig[] = [
  { path: '/admin/dashboard', Page: DashboardPage },
  { path: '/admin/profile', Page: ProfilePage },
  { path: '/admin/skills', Page: SkillsPage },
  { path: '/admin/projects', Page: ProjectsPage },
  { path: '/admin/experiences', Page: ExperiencesPage },
  { path: '/admin/volunteer', Page: VolunteerPage },
  { path: '/admin/certifications', Page: CertificationsPage },
  { path: '/admin/kanban', Page: KanbanPage },
  { path: '/admin/blogs/reorder', Page: BlogReorderPage },
  { path: '/admin/projects/new', Page: EditProjectPage },
  { path: '/admin/projects/edit/:id', Page: EditProjectPage, hasIdParam: true },
  { path: '/admin/certifications/new', Page: EditCertificationPage },
  { path: '/admin/certifications/edit/:id', Page: EditCertificationPage, hasIdParam: true },
  { path: '/admin/experiences/new', Page: EditExperiencePage },
  { path: '/admin/experiences/edit/:id', Page: EditExperiencePage, hasIdParam: true },
  { path: '/admin/volunteer/new', Page: EditVolunteerPage },
  { path: '/admin/volunteer/edit/:id', Page: EditVolunteerPage, hasIdParam: true },
]

function App() {
  const { isAuthenticated, isLoading, initializeAuth } = useAuth()

  useEffect(() => {
    initializeAuth()
    updateSEO()
  }, [initializeAuth])

  const handleRouteChange = (e: { url?: string }) => {
    const path = e.url || window.location.pathname
    const seoKey = Object.entries(routeSEOMap).find(([key]) => path.includes(key))?.[1]
    updateSEO(seoKey ? pageSEO[seoKey] : undefined)
  }

  if (isLoading) {
    return <PageLoader />
  }

  return (
    <Suspense fallback={<PageLoader />}>
      <Router onChange={handleRouteChange}>
        <Route path="/admin/login" component={LoginPage} />
        {protectedRoutes.map(({ path, Page, hasIdParam }) => (
          <Route
            key={path}
            path={path}
            component={
              hasIdParam
                ? ({ id }: { id?: string }) => (
                    <AdminLayout>
                      <Page id={id} />
                    </AdminLayout>
                  )
                : () => (
                    <AdminLayout>
                      <Page />
                    </AdminLayout>
                  )
            }
          />
        ))}
        <Route
          default
          component={() => {
            if (typeof window !== 'undefined') {
              window.location.href = isAuthenticated ? '/admin/dashboard' : '/admin/login'
            }
            return null
          }}
        />
      </Router>
    </Suspense>
  )
}

export default App
