'use client'

import { useEffect, useState } from 'react'
import { ProtectedRoute } from '../../../components/auth/protected-route'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../../../components/ui/card'
import { Button } from '../../../components/ui/button'
import { Badge } from '../../../components/ui/badge'
import { projectsAPI, experiencesAPI, skillsAPI } from '../../../util/apiResponse.util'
import { Project, Experience } from '../../../data/types.data'
import { Briefcase, GraduationCap, Settings, Plus, ExternalLink } from 'lucide-react'
import Link from 'next/link'

export default function AdminDashboardPage() {
  const [projects, setProjects] = useState<Project[]>([])
  const [experiences, setExperiences] = useState<Experience[]>([])
  const [skills, setSkills] = useState<string[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [projectsRes, experiencesRes, skillsRes] = await Promise.all([
          projectsAPI.getAllProjects(),
          experiencesAPI.getAllExperiences(),
          (await skillsAPI.getSkills()),
        ])
        setProjects(Array.isArray(projectsRes.data) ? projectsRes.data : [])
        setExperiences(Array.isArray(experiencesRes.data) ? experiencesRes.data : [])
        setSkills(Array.isArray(skillsRes.data) ? skillsRes.data : [])
      } catch (err) {
        setError('Failed to load dashboard data')
        setProjects([])
        setExperiences([])
        setSkills([])
      } finally {
        setLoading(false)
      }
    }
    fetchData()
  }, [])

  if (loading) return <div>Loading...</div>
  if (error) return <div>{error}</div>

  return (
    <ProtectedRoute>
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Dashboard</h1>
          <p className="text-muted-foreground">
            Welcome to your portfolio admin panel. Manage your projects, experiences, and skills.
          </p>
        </div>

        {/* Stats Cards */}
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Projects</CardTitle>
              <Briefcase className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{projects.length}</div>
              <p className="text-xs text-muted-foreground">
                {projects.length === 0 ? 'No projects yet' : 'Active projects'}
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Experiences</CardTitle>
              <GraduationCap className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{experiences.length}</div>
              <p className="text-xs text-muted-foreground">
                {experiences.length === 0 ? 'No experiences yet' : 'Work experiences'}
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Skills</CardTitle>
              <Settings className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{skills.length}</div>
              <p className="text-xs text-muted-foreground">
                {skills.length === 0 ? 'No skills yet' : 'Technical skills'}
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Portfolio Status</CardTitle>
              <Badge variant="outline" className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">Live</div>
              <p className="text-xs text-muted-foreground">Portfolio is active</p>
            </CardContent>
          </Card>
        </div>

        {/* Recent Projects */}
        <div className="grid gap-4 md:grid-cols-2">
          <Card>
            <CardHeader>
              <CardTitle>Recent Projects</CardTitle>
              <CardDescription>
                Your latest projects and their current status
              </CardDescription>
            </CardHeader>
            <CardContent>
              {projects.length === 0 ? (
                <div className="text-center py-6">
                  <Briefcase className="mx-auto h-12 w-12 text-gray-400" />
                  <h3 className="mt-2 text-sm font-medium text-gray-900">No projects</h3>
                  <p className="mt-1 text-sm text-gray-500">
                    Get started by creating your first project.
                  </p>
                  <div className="mt-6">
                    <Link href="/admin/projects">
                      <Button>
                        <Plus className="mr-2 h-4 w-4" />
                        Add Project
                      </Button>
                    </Link>
                  </div>
                </div>
              ) : (
                <div className="space-y-4">
                  {projects.slice(0, 3).map((project) => (
                    <div key={project._id} className="flex items-center justify-between">
                      <div className="flex-1 min-w-0">
                        <p className="text-sm font-medium text-gray-900 truncate">
                          {project.project_name}
                        </p>
                        <p className="text-sm text-gray-500 truncate">
                          {project.small_description}
                        </p>
                      </div>
                      <div className="flex items-center space-x-2">
                        {project.project_live_link && (
                          <a
                            href={project.project_live_link}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-blue-600 hover:text-blue-800"
                          >
                            <ExternalLink className="h-4 w-4" />
                          </a>
                        )}
                      </div>
                    </div>
                  ))}
                  {projects.length > 3 && (
                    <div className="pt-4">
                      <Link href="/admin/projects">
                        <Button variant="outline" className="w-full">
                          View All Projects
                        </Button>
                      </Link>
                    </div>
                  )}
                </div>
              )}
            </CardContent>
          </Card>

          {/* Recent Experiences */}
          <Card>
            <CardHeader>
              <CardTitle>Recent Experiences</CardTitle>
              <CardDescription>
                Your latest work experiences and positions
              </CardDescription>
            </CardHeader>
            <CardContent>
              {experiences.length === 0 ? (
                <div className="text-center py-6">
                  <GraduationCap className="mx-auto h-12 w-12 text-gray-400" />
                  <h3 className="mt-2 text-sm font-medium text-gray-900">No experiences</h3>
                  <p className="mt-1 text-sm text-gray-500">
                    Get started by adding your work experience.
                  </p>
                  <div className="mt-6">
                    <Link href="/admin/experiences">
                      <Button>
                        <Plus className="mr-2 h-4 w-4" />
                        Add Experience
                      </Button>
                    </Link>
                  </div>
                </div>
              ) : (
                <div className="space-y-4">
                  {experiences.slice(0, 3).map((experience) => (
                    <div key={experience._id} className="flex items-center justify-between">
                      <div className="flex-1 min-w-0">
                        <p className="text-sm font-medium text-gray-900 truncate">
                          {experience.position}
                        </p>
                        <p className="text-sm text-gray-500 truncate">
                          {experience.company_name}
                        </p>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Badge variant="secondary" className="text-xs">
                          {new Date(experience.start_date).getFullYear()} - {new Date(experience.end_date).getFullYear()}
                        </Badge>
                      </div>
                    </div>
                  ))}
                  {experiences.length > 3 && (
                    <div className="pt-4">
                      <Link href="/admin/experiences">
                        <Button variant="outline" className="w-full">
                          View All Experiences
                        </Button>
                      </Link>
                    </div>
                  )}
                </div>
              )}
            </CardContent>
          </Card>
        </div>

        {/* Quick Actions */}
        <Card>
          <CardHeader>
            <CardTitle>Quick Actions</CardTitle>
            <CardDescription>
              Common tasks to manage your portfolio
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
              <Link href="/admin/projects">
                <Button variant="outline" className="w-full h-auto p-4 flex-col">
                  <Briefcase className="h-8 w-8 mb-2" />
                  <span>Manage Projects</span>
                </Button>
              </Link>
              <Link href="/admin/experiences">
                <Button variant="outline" className="w-full h-auto p-4 flex-col">
                  <GraduationCap className="h-8 w-8 mb-2" />
                  <span>Manage Experiences</span>
                </Button>
              </Link>
              <Link href="/admin/skills">
                <Button variant="outline" className="w-full h-auto p-4 flex-col">
                  <Settings className="h-8 w-8 mb-2" />
                  <span>Manage Skills</span>
                </Button>
              </Link>
              <Link href="/">
                <Button variant="outline" className="w-full h-auto p-4 flex-col">
                  <ExternalLink className="h-8 w-8 mb-2" />
                  <span>View Portfolio</span>
                </Button>
              </Link>
            </div>
          </CardContent>
        </Card>
      </div>
    </ProtectedRoute>
  )
} 