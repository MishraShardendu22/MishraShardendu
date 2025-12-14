import { Briefcase, ExternalLink, Globe, GraduationCap, Medal, Plus, Settings } from 'lucide-react'
import { useEffect, useState } from 'preact/hooks'
import { Loading } from '../components/shared'
import { Badge } from '../components/ui/badge'
import { Button } from '../components/ui/button'
import { Card, CardContent } from '../components/ui/card'
import type { Experience, Project } from '../types/types.data'
import {
  certificationsAPI,
  experiencesAPI,
  projectsAPI,
  skillsAPI,
} from '../utils/apiResponse.util'

export default function DashboardPage() {
  const [stats, setStats] = useState({
    projects: 0,
    experiences: 0,
    skills: 0,
    certifications: 0,
  })
  const [projects, setProjects] = useState<Project[]>([])
  const [experiences, setExperiences] = useState<Experience[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [projectsRes, experiencesRes, skillsRes, certificationsRes] = await Promise.all([
          projectsAPI.getAllProjects(1, 100),
          experiencesAPI.getAllExperiences(1, 100),
          skillsAPI.getSkills(1, 100),
          certificationsAPI.getAllCertifications(1, 100),
        ])

        // Backend returns paginated data: { data: { items: [...], total: N, ... } }
        const projectsArray = projectsRes.data?.projects || []
        const experiencesArray = experiencesRes.data?.experiences || []
        const skillsArray = skillsRes.data?.skills || []
        const certificationsArray = certificationsRes.data?.certifications || []

        // Get total counts from response
        const projectsTotal = projectsRes.data?.total || projectsArray.length
        const experiencesTotal = experiencesRes.data?.total || experiencesArray.length
        const skillsTotal = skillsRes.data?.total || skillsArray.length
        const certificationsTotal = certificationsRes.data?.total || certificationsArray.length

        setProjects(projectsArray.slice(0, 3))
        setExperiences(experiencesArray.slice(0, 3))

        setStats({
          projects: projectsTotal,
          experiences: experiencesTotal,
          skills: skillsTotal,
          certifications: certificationsTotal,
        })
      } catch {
        // Failed to load dashboard data
      } finally {
        setLoading(false)
      }
    }

    fetchData()
  }, [])

  if (loading) {
    return <Loading title="Loading Dashboard" description="Fetching your data..." />
  }

  return (
    <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-12">
      <div className="text-center space-y-6 pb-8">
        <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold bg-linear-to-r from-primary via-secondary to-accent bg-clip-text text-transparent">
          Welcome, Admin
        </h1>
        <p className="text-lg md:text-xl text-foreground/80 max-w-2xl mx-auto">
          Manage your professional content with ease
        </p>
      </div>

      <div className="grid gap-6 sm:gap-8 grid-cols-1 sm:grid-cols-2 lg:grid-cols-5">
        <Card className="border-2 border-border/50 hover:border-primary/50 transition-all hover:-translate-y-2">
          <CardContent className="p-6 lg:p-8 flex flex-col items-center">
            <Briefcase className="h-10 w-10 text-primary mb-4" />
            <div className="text-4xl font-bold text-foreground mb-2">{stats.projects}</div>
            <div className="text-base font-medium text-foreground/80">Projects</div>
          </CardContent>
        </Card>

        <Card className="border-2 border-border/50 hover:border-secondary/50 transition-all hover:-translate-y-2">
          <CardContent className="p-6 lg:p-8 flex flex-col items-center">
            <GraduationCap className="h-10 w-10 text-secondary mb-4" />
            <div className="text-4xl font-bold text-foreground mb-2">{stats.experiences}</div>
            <div className="text-base font-medium text-foreground/80">Experiences</div>
          </CardContent>
        </Card>

        <Card className="border-2 border-border/50 hover:border-accent/50 transition-all hover:-translate-y-2">
          <CardContent className="p-6 lg:p-8 flex flex-col items-center">
            <Settings className="h-10 w-10 text-accent mb-4" />
            <div className="text-4xl font-bold text-foreground mb-2">{stats.skills}</div>
            <div className="text-base font-medium text-foreground/80">Skills</div>
          </CardContent>
        </Card>

        <Card className="border-2 border-border/50 hover:border-yellow-500/50 transition-all hover:-translate-y-2">
          <CardContent className="p-6 lg:p-8 flex flex-col items-center">
            <Medal className="h-10 w-10 text-yellow-500 mb-4" />
            <div className="text-4xl font-bold text-foreground mb-2">{stats.certifications}</div>
            <div className="text-base font-medium text-foreground/80">Certifications</div>
          </CardContent>
        </Card>

        <Card className="border-2 border-border/50 hover:border-blue-500/50 transition-all hover:-translate-y-2">
          <CardContent className="p-6 lg:p-8 flex flex-col items-center">
            <Globe className="h-10 w-10 text-blue-500 mb-4" />
            <div className="text-4xl font-bold text-foreground mb-2">Live</div>
            <div className="text-base font-medium text-foreground/80">Portfolio Status</div>
          </CardContent>
        </Card>
      </div>

      <div className="space-y-6">
        <h2 className="text-2xl md:text-3xl font-heading font-bold text-center text-foreground">
          Quick Actions
        </h2>
        <div className="grid gap-6 sm:gap-8 grid-cols-1 sm:grid-cols-2 lg:grid-cols-4">
          <a href="/admin/projects" className="group">
            <Button
              variant="outline"
              className="w-full h-auto p-6 lg:p-8 flex flex-col gap-4 text-lg font-semibold shadow-md hover:shadow-xl transition-all duration-300 border-2 hover:border-primary/50"
            >
              <Briefcase className="h-10 w-10 text-primary" />
              <span>Manage Projects</span>
            </Button>
          </a>

          <a href="/admin/experiences" className="group">
            <Button
              variant="outline"
              className="w-full h-auto p-6 lg:p-8 flex flex-col gap-4 text-lg font-semibold shadow-md hover:shadow-xl transition-all duration-300 border-2 hover:border-secondary/50"
            >
              <GraduationCap className="h-10 w-10 text-secondary" />
              <span>Manage Experiences</span>
            </Button>
          </a>

          <a href="/admin/skills" className="group">
            <Button
              variant="outline"
              className="w-full h-auto p-6 lg:p-8 flex flex-col gap-4 text-lg font-semibold shadow-md hover:shadow-xl transition-all duration-300 border-2 hover:border-accent/50"
            >
              <Settings className="h-10 w-10 text-accent" />
              <span>Manage Skills</span>
            </Button>
          </a>

          <a href="/" target="_blank" rel="noopener noreferrer" className="group">
            <Button
              variant="outline"
              className="w-full h-auto p-6 lg:p-8 flex flex-col gap-4 text-lg font-semibold shadow-md hover:shadow-xl transition-all duration-300 border-2 hover:border-primary/50"
            >
              <ExternalLink className="h-10 w-10 text-primary" />
              <span>View Portfolio</span>
            </Button>
          </a>
        </div>
      </div>

      <div className="space-y-6">
        <h2 className="text-2xl md:text-3xl font-heading font-bold text-center text-foreground">
          Recent Activity
        </h2>
        <div className="grid gap-8 lg:gap-12 grid-cols-1 lg:grid-cols-2">
          {/* Recent Projects */}
          <div className="rounded-2xl border-2 border-border bg-card/80 shadow-xl p-6 lg:p-8">
            <div className="flex items-center gap-3 mb-6">
              <Briefcase className="h-6 w-6 text-primary" />
              <h3 className="text-2xl font-bold text-primary">Recent Projects</h3>
            </div>

            <div className="space-y-4">
              {projects.length === 0 ? (
                <div className="flex flex-col items-center justify-center py-12 space-y-4">
                  <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center">
                    <Briefcase className="h-8 w-8 text-primary/60" />
                  </div>
                  <div className="text-center space-y-2">
                    <h4 className="text-xl font-semibold text-foreground">No projects yet</h4>
                    <p className="text-foreground/70">Get started by creating your first project</p>
                  </div>
                  <a href="/admin/projects">
                    <Button className="mt-4">
                      <Plus className="mr-2 h-5 w-5" />
                      Add Project
                    </Button>
                  </a>
                </div>
              ) : (
                <div className="space-y-4">
                  {projects.map((project) => (
                    <div
                      key={project.inline.id}
                      className="flex items-center justify-between gap-4 p-4 rounded-xl bg-primary/5 hover:bg-primary/10 transition-all duration-200 border border-primary/10"
                    >
                      <div className="flex-1 min-w-0 space-y-1">
                        <p className="text-lg font-semibold text-foreground truncate">
                          {project.project_name}
                        </p>
                        <p className="text-sm text-foreground/70 line-clamp-2">
                          {project.small_description}
                        </p>
                      </div>
                      {project.project_live_link && (
                        <a
                          href={project.project_live_link}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="p-2 rounded-lg text-primary hover:bg-accent/10 transition-all"
                        >
                          <ExternalLink className="h-5 w-5" />
                        </a>
                      )}
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>

          {/* Recent Experiences */}
          <div className="rounded-2xl border-2 border-border bg-card/80 shadow-xl p-6 lg:p-8">
            <div className="flex items-center gap-3 mb-6">
              <GraduationCap className="h-6 w-6 text-secondary" />
              <h3 className="text-2xl font-bold text-secondary">Recent Experiences</h3>
            </div>

            <div className="space-y-4">
              {experiences.length === 0 ? (
                <div className="flex flex-col items-center justify-center py-12 space-y-4">
                  <div className="w-16 h-16 rounded-full bg-secondary/10 flex items-center justify-center">
                    <GraduationCap className="h-8 w-8 text-secondary/60" />
                  </div>
                  <div className="text-center space-y-2">
                    <h4 className="text-xl font-semibold text-foreground">No experiences yet</h4>
                    <p className="text-foreground/70">Get started by adding your work experience</p>
                  </div>
                  <a href="/admin/experiences">
                    <Button className="mt-4">
                      <Plus className="mr-2 h-5 w-5" />
                      Add Experience
                    </Button>
                  </a>
                </div>
              ) : (
                <div className="space-y-4">
                  {experiences.map((experience) => (
                    <div
                      key={experience.inline.id}
                      className="flex items-center justify-between gap-4 p-4 rounded-xl bg-secondary/5 hover:bg-secondary/10 transition-all duration-200 border border-secondary/10"
                    >
                      <div className="flex-1 min-w-0 space-y-1">
                        <p className="text-lg font-semibold text-foreground truncate">
                          {experience.experience_time_line?.[0]?.position || 'Position'}
                        </p>
                        <p className="text-sm text-foreground/70 truncate">
                          {experience.company_name}
                        </p>
                      </div>
                      <Badge variant="secondary" className="text-sm px-3 py-1">
                        {new Date(experience.experience_time_line?.[0]?.start_date).getFullYear()} -{' '}
                        {new Date(
                          experience.experience_time_line?.[
                            experience.experience_time_line.length - 1
                          ]?.end_date
                        ).getFullYear()}
                      </Badge>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
