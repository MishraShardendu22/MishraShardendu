import { useEffect } from 'preact/hooks'
import { Route, Router } from 'preact-router'
import AdminLayout from './components/layout/AdminLayout'
import { useAuth } from './hooks/use-auth'
import BlogReorderPage from './pages/blogReorder'
import CertificationsPage from './pages/certifications'
import DashboardPage from './pages/dashboard'
import EditCertificationPage from './pages/edit-certification'
import EditExperiencePage from './pages/edit-experience'
// Edit pages
import EditProjectPage from './pages/edit-project'
import EditVolunteerPage from './pages/edit-volunteer'
import ExperiencesPage from './pages/experiences'
import KanbanPage from './pages/kanban'
// Import pages (these will be created)
import LoginPage from './pages/login'
import ProfilePage from './pages/profile'
import ProjectsPage from './pages/projects'
import SkillsPage from './pages/skills'
import VolunteerPage from './pages/volunteer'
import { pageSEO, updateSEO } from './utils/seo.util'

function App() {
  const { isAuthenticated, isLoading, initializeAuth } = useAuth()

  useEffect(() => {
    initializeAuth()
    // Ensure favicons and basic SEO on app mount
    updateSEO()
  }, [initializeAuth])

  // Handle route changes for SEO
  const handleRouteChange = (e: { url?: string }) => {
    const path = e.url || window.location.pathname

    // Determine which page SEO to apply based on route
    if (path.includes('/login')) {
      updateSEO(pageSEO.login)
    } else if (path.includes('/dashboard')) {
      updateSEO(pageSEO.dashboard)
    } else if (path.includes('/profile')) {
      updateSEO(pageSEO.profile)
    } else if (path.includes('/skills')) {
      updateSEO(pageSEO.skills)
    } else if (path.includes('/projects')) {
      updateSEO(pageSEO.projects)
    } else if (path.includes('/experiences')) {
      updateSEO(pageSEO.experiences)
    } else if (path.includes('/volunteer')) {
      updateSEO(pageSEO.volunteer)
    } else if (path.includes('/certifications')) {
      updateSEO(pageSEO.certifications)
    } else if (path.includes('/kanban')) {
      updateSEO(pageSEO.kanban)
    } else if (path.includes('/blogs/reorder')) {
      updateSEO(pageSEO.blogReorder)
    } else {
      updateSEO()
    }
  }

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-primary"></div>
      </div>
    )
  }

  return (
    <Router onChange={handleRouteChange}>
      <Route path="/admin/login" component={LoginPage} />
      <Route
        path="/admin/dashboard"
        component={() => (
          <AdminLayout>
            <DashboardPage />
          </AdminLayout>
        )}
      />
      <Route
        path="/admin/profile"
        component={() => (
          <AdminLayout>
            <ProfilePage />
          </AdminLayout>
        )}
      />
      <Route
        path="/admin/skills"
        component={() => (
          <AdminLayout>
            <SkillsPage />
          </AdminLayout>
        )}
      />
      <Route
        path="/admin/projects"
        component={() => (
          <AdminLayout>
            <ProjectsPage />
          </AdminLayout>
        )}
      />
      <Route
        path="/admin/experiences"
        component={() => (
          <AdminLayout>
            <ExperiencesPage />
          </AdminLayout>
        )}
      />
      <Route
        path="/admin/volunteer"
        component={() => (
          <AdminLayout>
            <VolunteerPage />
          </AdminLayout>
        )}
      />
      <Route
        path="/admin/certifications"
        component={() => (
          <AdminLayout>
            <CertificationsPage />
          </AdminLayout>
        )}
      />
      <Route
        path="/admin/kanban"
        component={() => (
          <AdminLayout>
            <KanbanPage />
          </AdminLayout>
        )}
      />
      <Route
        path="/admin/blogs/reorder"
        component={() => (
          <AdminLayout>
            <BlogReorderPage />
          </AdminLayout>
        )}
      />
      {/* Edit Pages */}
      <Route
        path="/admin/projects/new"
        component={() => (
          <AdminLayout>
            <EditProjectPage />
          </AdminLayout>
        )}
      />
      <Route
        path="/admin/projects/edit/:id"
        component={({ id }: { id?: string }) => (
          <AdminLayout>
            <EditProjectPage id={id} />
          </AdminLayout>
        )}
      />
      <Route
        path="/admin/certifications/new"
        component={() => (
          <AdminLayout>
            <EditCertificationPage />
          </AdminLayout>
        )}
      />
      <Route
        path="/admin/certifications/edit/:id"
        component={({ id }: { id?: string }) => (
          <AdminLayout>
            <EditCertificationPage id={id} />
          </AdminLayout>
        )}
      />
      <Route
        path="/admin/experiences/new"
        component={() => (
          <AdminLayout>
            <EditExperiencePage />
          </AdminLayout>
        )}
      />
      <Route
        path="/admin/experiences/edit/:id"
        component={({ id }: { id?: string }) => (
          <AdminLayout>
            <EditExperiencePage id={id} />
          </AdminLayout>
        )}
      />
      <Route
        path="/admin/volunteer/new"
        component={() => (
          <AdminLayout>
            <EditVolunteerPage />
          </AdminLayout>
        )}
      />
      <Route
        path="/admin/volunteer/edit/:id"
        component={({ id }: { id?: string }) => (
          <AdminLayout>
            <EditVolunteerPage id={id} />
          </AdminLayout>
        )}
      />
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
  )
}

export default App
