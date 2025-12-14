import { ArrowLeft, Loader2, Save } from 'lucide-react'
import { useEffect, useState } from 'preact/hooks'
import { route } from 'preact-router'
import toast from 'react-hot-toast'
import { Loading } from '../components/shared'
import { Button } from '../components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '../components/ui/card'
import { Input } from '../components/ui/input'
import { Label } from '../components/ui/label'
import { Textarea } from '../components/ui/textarea'
import type { Project } from '../types/types.data'
import { projectsAPI } from '../utils/apiResponse.util'

interface EditProjectPageProps {
  id?: string
}

export default function EditProjectPage({ id }: EditProjectPageProps) {
  const [loading, setLoading] = useState(true)
  const [submitting, setSubmitting] = useState(false)
  const [project, setProject] = useState<Project | null>(null)

  const [formData, setFormData] = useState({
    project_name: '',
    small_description: '',
    description: '',
    project_repository: '',
    project_live_link: '',
    skills: '',
    order: 0,
  })

  useEffect(() => {
    if (id) {
      fetchProject()
    } else {
      setLoading(false)
    }
  }, [id])

  const fetchProject = async () => {
    try {
      const response = await projectsAPI.getProjectById(id!)
      const projectData = response.data
      if (projectData) {
        setProject(projectData)
        setFormData({
          project_name: projectData.project_name,
          small_description: projectData.small_description || '',
          description: projectData.description || '',
          project_repository: projectData.project_repository || '',
          project_live_link: projectData.project_live_link || '',
          skills: projectData.skills?.join(', ') || '',
          order: projectData.order || 0,
        })
      }
    } catch {
      toast.error('Failed to fetch project')
      route('/admin/projects')
    } finally {
      setLoading(false)
    }
  }

  const handleSubmit = async (e: Event) => {
    e.preventDefault()
    if (!formData.project_name || !formData.description) {
      toast.error('Project name and description are required')
      return
    }

    setSubmitting(true)
    try {
      const skillsArray = formData.skills
        .split(',')
        .map((t) => t.trim())
        .filter((t) => t.length > 0)

      if (id && project) {
        await projectsAPI.updateProject(id, {
          project_name: formData.project_name,
          small_description: formData.small_description,
          description: formData.description,
          project_repository: formData.project_repository,
          project_live_link: formData.project_live_link,
          skills: skillsArray,
          project_video: '',
        })
        toast.success('Project updated successfully!')
      } else {
        await projectsAPI.createProject({
          project_name: formData.project_name,
          small_description: formData.small_description,
          description: formData.description,
          project_repository: formData.project_repository,
          project_live_link: formData.project_live_link,
          skills: skillsArray,
          project_video: '',
        })
        toast.success('Project created successfully!')
      }
      route('/admin/projects')
    } catch {
      toast.error(id ? 'Failed to update project' : 'Failed to create project')
    } finally {
      setSubmitting(false)
    }
  }

  if (loading) {
    return <Loading title="Loading Project" description="Fetching project details..." />
  }

  return (
    <div className="w-full min-h-screen bg-background">
      <div className="w-[95%] mx-auto py-8">
        {/* Header */}
        <div className="flex items-center gap-4 mb-8">
          <Button variant="outline" size="sm" onClick={() => route('/admin/projects')}>
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Projects
          </Button>
          <h1 className="text-3xl font-bold bg-linear-to-r from-primary via-secondary to-accent bg-clip-text text-transparent">
            {id ? 'Edit Project' : 'Add New Project'}
          </h1>
        </div>

        {/* Form Card */}
        <Card className="w-full">
          <CardHeader>
            <CardTitle>{id ? 'Update Project Details' : 'Create New Project'}</CardTitle>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-8">
              {/* Basic Info Section */}
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <Label htmlFor="project_name" className="text-base font-medium">
                    Project Name *
                  </Label>
                  <Input
                    id="project_name"
                    value={formData.project_name}
                    onInput={(e) =>
                      setFormData({
                        ...formData,
                        project_name: (e.target as HTMLInputElement).value,
                      })
                    }
                    disabled={submitting}
                    required
                    className="h-12 text-base"
                    placeholder="Enter project name"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="small_description" className="text-base font-medium">
                    Short Description
                  </Label>
                  <Input
                    id="small_description"
                    value={formData.small_description}
                    onInput={(e) =>
                      setFormData({
                        ...formData,
                        small_description: (e.target as HTMLInputElement).value,
                      })
                    }
                    disabled={submitting}
                    className="h-12 text-base"
                    placeholder="Brief description for cards"
                  />
                </div>
              </div>

              {/* Description Section */}
              <div className="space-y-2">
                <Label htmlFor="description" className="text-base font-medium">
                  Full Description *
                </Label>
                <Textarea
                  id="description"
                  value={formData.description}
                  onInput={(e) =>
                    setFormData({
                      ...formData,
                      description: (e.target as HTMLTextAreaElement).value,
                    })
                  }
                  placeholder="Write a detailed description of your project..."
                  rows={8}
                  required
                  disabled={submitting}
                  className="text-base"
                />
              </div>

              {/* Links Section */}
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <Label htmlFor="project_live_link" className="text-base font-medium">
                    Live Demo URL
                  </Label>
                  <Input
                    id="project_live_link"
                    type="url"
                    value={formData.project_live_link}
                    onInput={(e) =>
                      setFormData({
                        ...formData,
                        project_live_link: (e.target as HTMLInputElement).value,
                      })
                    }
                    disabled={submitting}
                    className="h-12 text-base"
                    placeholder="https://your-project.com"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="project_repository" className="text-base font-medium">
                    GitHub Repository URL
                  </Label>
                  <Input
                    id="project_repository"
                    type="url"
                    value={formData.project_repository}
                    onInput={(e) =>
                      setFormData({
                        ...formData,
                        project_repository: (e.target as HTMLInputElement).value,
                      })
                    }
                    disabled={submitting}
                    className="h-12 text-base"
                    placeholder="https://github.com/username/repo"
                  />
                </div>
              </div>

              {/* Skills & Order Section */}
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <Label htmlFor="skills" className="text-base font-medium">
                    Skills / Technologies (comma separated)
                  </Label>
                  <Input
                    id="skills"
                    placeholder="React, TypeScript, Node.js, MongoDB"
                    value={formData.skills}
                    onInput={(e) =>
                      setFormData({ ...formData, skills: (e.target as HTMLInputElement).value })
                    }
                    disabled={submitting}
                    className="h-12 text-base"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="order" className="text-base font-medium">
                    Display Order
                  </Label>
                  <Input
                    id="order"
                    type="number"
                    value={formData.order}
                    onInput={(e) =>
                      setFormData({
                        ...formData,
                        order: parseInt((e.target as HTMLInputElement).value, 10) || 0,
                      })
                    }
                    disabled={submitting}
                    className="h-12 text-base"
                  />
                </div>
              </div>

              {/* Actions */}
              <div className="flex justify-end gap-4 pt-6 border-t">
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => route('/admin/projects')}
                  disabled={submitting}
                  size="lg"
                >
                  Cancel
                </Button>
                <Button type="submit" disabled={submitting} size="lg">
                  {submitting && <Loader2 className="w-4 h-4 mr-2 animate-spin" />}
                  <Save className="w-4 h-4 mr-2" />
                  {id ? 'Update Project' : 'Create Project'}
                </Button>
              </div>
            </form>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
