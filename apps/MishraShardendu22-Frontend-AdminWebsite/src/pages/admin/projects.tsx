import { useEffect, useState } from 'preact/hooks'
import { Button } from '../../components/ui/button'
import { Input } from '../../components/ui/input'
import { Label } from '../../components/ui/label'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../../components/ui/card'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '../../components/ui/dialog'
import { Badge } from '../../components/ui/badge'
import { Loading } from '../../components/shared'
import { projectsAPI } from '../../utils/apiResponse.util'
import { Plus, ExternalLink, Loader2, Pencil, Trash2, Github } from 'lucide-react'
import toast from 'react-hot-toast'
import type { Project } from '../../types/types.data'
import MarkdownEditor from '../../components/extra/MarkdownEditor'

export default function ProjectsPage() {
  const [projects, setProjects] = useState<Project[]>([])
  const [loading, setLoading] = useState(true)
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false)
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false)
  const [submitting, setSubmitting] = useState(false)
  const [editingProject, setEditingProject] = useState<Project | null>(null)
  const [currentPage, setCurrentPage] = useState(0)
  const itemsPerPage = 6
  const totalPages = Math.ceil(projects.length / itemsPerPage)
  const paginatedProjects = projects.slice(
    currentPage * itemsPerPage,
    (currentPage + 1) * itemsPerPage
  )

  // Form state for adding/editing
  const [formData, setFormData] = useState({
    project_name: '',
    small_description: '',
    description: '',
    project_repository: '',
    project_live_link: '',
    skills: '',
    order: 0,
  })

  const fetchProjects = async () => {
    try {
      const response = await projectsAPI.getAllProjects()
      // Backend returns { data: [...], message: "...", status: 200 }
      const projectsData = response.data || []
      setProjects(Array.isArray(projectsData) ? projectsData : [])
    } catch {
      toast.error('Failed to fetch projects')
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchProjects()
  }, [])

  const resetForm = () => {
    setFormData({
      project_name: '',
      small_description: '',
      description: '',
      project_repository: '',
      project_live_link: '',
      skills: '',
      order: 0,
    })
  }

  const handleAddProject = async (e: Event) => {
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

      await projectsAPI.createProject({
        project_name: formData.project_name,
        small_description: formData.small_description,
        description: formData.description,
        project_repository: formData.project_repository,
        project_live_link: formData.project_live_link,
        skills: skillsArray,
        project_video: '',
      })

      toast.success('Project added successfully!')
      setIsAddDialogOpen(false)
      resetForm()
      fetchProjects()
    } catch {
      toast.error('Failed to add project')
    } finally {
      setSubmitting(false)
    }
  }

  const handleEditProject = async (e: Event) => {
    e.preventDefault()
    if (!editingProject || !formData.project_name || !formData.description) {
      toast.error('Project name and description are required')
      return
    }

    setSubmitting(true)
    try {
      const skillsArray = formData.skills
        .split(',')
        .map((t) => t.trim())
        .filter((t) => t.length > 0)

      await projectsAPI.updateProject(editingProject.inline.id, {
        project_name: formData.project_name,
        small_description: formData.small_description,
        description: formData.description,
        project_repository: formData.project_repository,
        project_live_link: formData.project_live_link,
        skills: skillsArray,
        project_video: '',
      })

      toast.success('Project updated successfully!')
      setIsEditDialogOpen(false)
      setEditingProject(null)
      resetForm()
      fetchProjects()
    } catch {
      toast.error('Failed to update project')
    } finally {
      setSubmitting(false)
    }
  }

  const handleDeleteProject = async (id: string) => {
    if (!confirm('Are you sure you want to delete this project?')) return

    try {
      await projectsAPI.deleteProject(id)
      toast.success('Project deleted successfully!')
      fetchProjects()
    } catch {
      toast.error('Failed to delete project')
    }
  }

  const openEditDialog = (project: Project) => {
    setEditingProject(project)
    setFormData({
      project_name: project.project_name,
      small_description: project.small_description,
      description: project.description,
      project_repository: project.project_repository || '',
      project_live_link: project.project_live_link || '',
      skills: project.skills?.join(', ') || '',
      order: project.order || 0,
    })
    setIsEditDialogOpen(true)
  }

  if (loading) {
    return <Loading title="Loading Projects" description="Fetching your projects..." />
  }

  return (
    <div className="space-y-8 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Header */}
      <header className="text-center space-y-4">
        <h1 className="text-3xl md:text-4xl lg:text-5xl font-heading font-extrabold bg-gradient-to-r from-primary via-secondary to-accent bg-clip-text text-transparent">
          Projects Management
        </h1>
        <p className="text-foreground/70 text-lg max-w-2xl mx-auto">
          Manage your portfolio projects
        </p>
      </header>

      {/* Action Bar */}
      <div className="flex flex-col md:flex-row md:justify-between md:items-center gap-4 border-b border-border pb-4">
        <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
          <DialogTrigger>
            <Button onClick={() => resetForm()}>
              <Plus className="w-4 h-4 mr-2" />
              Add Project
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[600px] max-h-[90vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle>Add New Project</DialogTitle>
              <DialogDescription>Fill in the project details below</DialogDescription>
            </DialogHeader>
            <form onSubmit={handleAddProject} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="project_name">Title *</Label>
                <Input
                  id="project_name"
                  value={formData.project_name}
                  onInput={(e) =>
                    setFormData({ ...formData, project_name: (e.target as HTMLInputElement).value })
                  }
                  disabled={submitting}
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="small_description">Short Description</Label>
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
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="description">Description *</Label>
                <MarkdownEditor
                  content={formData.description}
                  onChange={(content) => setFormData({ ...formData, description: content })}
                  placeholder="Write a detailed description of your project..."
                />
              </div>
              <div className="grid md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="project_live_link">Live Link</Label>
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
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="project_repository">GitHub Link</Label>
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
                  />
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="skills">Skills (comma separated)</Label>
                <Input
                  id="skills"
                  placeholder="React, TypeScript, Node.js"
                  value={formData.skills}
                  onInput={(e) =>
                    setFormData({ ...formData, skills: (e.target as HTMLInputElement).value })
                  }
                  disabled={submitting}
                />
              </div>
              <div className="flex items-center gap-4">
                <div className="flex-1">
                  <Label htmlFor="order">Display Order</Label>
                  <Input
                    id="order"
                    type="number"
                    value={formData.order}
                    onInput={(e) =>
                      setFormData({
                        ...formData,
                        order: parseInt((e.target as HTMLInputElement).value) || 0,
                      })
                    }
                    disabled={submitting}
                  />
                </div>
              </div>
              <div className="flex justify-end gap-3 pt-4">
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => setIsAddDialogOpen(false)}
                  disabled={submitting}
                >
                  Cancel
                </Button>
                <Button type="submit" disabled={submitting}>
                  {submitting && <Loader2 className="w-4 h-4 mr-2 animate-spin" />}
                  Add Project
                </Button>
              </div>
            </form>
          </DialogContent>
        </Dialog>
      </div>

      {/* Projects Grid */}
      {projects.length === 0 ? (
        <div className="text-center py-16">
          <div className="w-24 h-24 rounded-full bg-muted/50 flex items-center justify-center mx-auto mb-6">
            <span className="text-5xl">🚀</span>
          </div>
          <h3 className="text-2xl font-bold text-foreground mb-2">No Projects Yet</h3>
          <p className="text-foreground/60 mb-6">Start by adding your first project</p>
          <Button onClick={() => setIsAddDialogOpen(true)}>
            <Plus className="w-4 h-4 mr-2" />
            Add Your First Project
          </Button>
        </div>
      ) : (
        <>
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {paginatedProjects.map((project) => (
              <Card key={project.inline.id} className="hover:shadow-lg transition-shadow">
                <CardHeader>
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <CardTitle className="text-xl">{project.project_name}</CardTitle>
                    </div>
                    <div className="flex gap-2">
                      <Button size="sm" variant="ghost" onClick={() => openEditDialog(project)}>
                        <Pencil className="w-4 h-4" />
                      </Button>
                      <Button
                        size="sm"
                        variant="ghost"
                        onClick={() => handleDeleteProject(project.inline.id)}
                      >
                        <Trash2 className="w-4 h-4 text-destructive" />
                      </Button>
                    </div>
                  </div>
                  <CardDescription className="line-clamp-2">
                    {project.small_description}
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    {project.skills && project.skills.length > 0 && (
                      <div className="flex flex-wrap gap-2">
                        {project.skills.map((skill) => (
                          <Badge key={skill} variant="outline">
                            {skill}
                          </Badge>
                        ))}
                      </div>
                    )}
                    <div className="flex gap-2">
                      {project.project_live_link && (
                        <Button size="sm" variant="outline">
                          <a
                            href={project.project_live_link}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="flex items-center"
                          >
                            <ExternalLink className="w-3 h-3 mr-1" />
                            Live
                          </a>
                        </Button>
                      )}
                      {project.project_repository && (
                        <Button size="sm" variant="outline">
                          <a
                            href={project.project_repository}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="flex items-center"
                          >
                            <Github className="w-3 h-3 mr-1" />
                            Code
                          </a>
                        </Button>
                      )}
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>{' '}
          {totalPages > 1 && (
            <div className="flex justify-center items-center gap-4 mt-8">
              <Button
                variant="outline"
                size="sm"
                onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 0))}
                disabled={currentPage === 0}
              >
                Previous
              </Button>
              <span className="text-sm font-medium">
                Page {currentPage + 1} of {totalPages}
              </span>
              <Button
                variant="outline"
                size="sm"
                onClick={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages - 1))}
                disabled={currentPage === totalPages - 1}
              >
                Next
              </Button>
            </div>
          )}
        </>
      )}

      {/* Edit Dialog */}
      <Dialog open={isEditDialogOpen} onOpenChange={setIsEditDialogOpen}>
        <DialogContent className="sm:max-w-[600px] max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>Edit Project</DialogTitle>
            <DialogDescription>Update the project details</DialogDescription>
          </DialogHeader>
          <form onSubmit={handleEditProject} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="edit-project_name">Title *</Label>
              <Input
                id="edit-project_name"
                value={formData.project_name}
                onInput={(e) =>
                  setFormData({ ...formData, project_name: (e.target as HTMLInputElement).value })
                }
                disabled={submitting}
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="edit-small_description">Short Description</Label>
              <Input
                id="edit-small_description"
                value={formData.small_description}
                onInput={(e) =>
                  setFormData({
                    ...formData,
                    small_description: (e.target as HTMLInputElement).value,
                  })
                }
                disabled={submitting}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="edit-description">Description *</Label>
              <MarkdownEditor
                content={formData.description}
                onChange={(content) => setFormData({ ...formData, description: content })}
                placeholder="Write a detailed description of your project..."
              />
            </div>
            <div className="grid md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="edit-project_live_link">Live Link</Label>
                <Input
                  id="edit-project_live_link"
                  type="url"
                  value={formData.project_live_link}
                  onInput={(e) =>
                    setFormData({
                      ...formData,
                      project_live_link: (e.target as HTMLInputElement).value,
                    })
                  }
                  disabled={submitting}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="edit-project_repository">GitHub Link</Label>
                <Input
                  id="edit-project_repository"
                  type="url"
                  value={formData.project_repository}
                  onInput={(e) =>
                    setFormData({
                      ...formData,
                      project_repository: (e.target as HTMLInputElement).value,
                    })
                  }
                  disabled={submitting}
                />
              </div>
            </div>
            <div className="space-y-2">
              <Label htmlFor="edit-skills">Skills (comma separated)</Label>
              <Input
                id="edit-skills"
                placeholder="React, TypeScript, Node.js"
                value={formData.skills}
                onInput={(e) =>
                  setFormData({ ...formData, skills: (e.target as HTMLInputElement).value })
                }
                disabled={submitting}
              />
            </div>
            <div className="flex items-center gap-4">
              <div className="flex-1">
                <Label htmlFor="edit-order">Display Order</Label>
                <Input
                  id="edit-order"
                  type="number"
                  value={formData.order}
                  onInput={(e) =>
                    setFormData({
                      ...formData,
                      order: parseInt((e.target as HTMLInputElement).value) || 0,
                    })
                  }
                  disabled={submitting}
                />
              </div>
            </div>
            <div className="flex justify-end gap-3 pt-4">
              <Button
                type="button"
                variant="outline"
                onClick={() => setIsEditDialogOpen(false)}
                disabled={submitting}
              >
                Cancel
              </Button>
              <Button type="submit" disabled={submitting}>
                {submitting && <Loader2 className="w-4 h-4 mr-2 animate-spin" />}
                Update Project
              </Button>
            </div>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  )
}
