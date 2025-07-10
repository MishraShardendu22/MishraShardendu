'use client'

import { useEffect, useState } from 'react'
import { ProtectedRoute } from '../../../components/auth/protected-route'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../../../components/ui/card'
import { Button } from '../../../components/ui/button'
import { Badge } from '../../../components/ui/badge'
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '../../../components/ui/dialog'
import { Input } from '../../../components/ui/input'
import { Label } from '../../../components/ui/label'
import { Textarea } from '../../../components/ui/textarea'
import { Alert, AlertDescription } from '../../../components/ui/alert'
import { projectsAPI } from '../../../util/apiResponse.util'
import { Project, CreateProjectRequest } from '../../../data/types.data'
import { Plus, Edit, Trash2, ExternalLink, Github, Play, Briefcase } from 'lucide-react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import * as z from 'zod'
import { Checkbox } from '../../../components/ui/checkbox';
import { skillsAPI } from '../../../util/apiResponse.util';
import { Popover, PopoverTrigger, PopoverContent } from '../../../components/ui/popover';

const projectSchema = z.object({
  project_name: z.string().min(1, 'Project name is required'),
  small_description: z.string().min(1, 'Small description is required'),
  description: z.string().min(1, 'Description is required'),
  skills: z.array(z.string()).min(1, 'At least one skill is required'),
  project_repository: z.string().url('Must be a valid URL'),
  project_live_link: z.string().url('Must be a valid URL'),
  project_video: z.string().url('Must be a valid URL'),
})

type ProjectFormData = z.infer<typeof projectSchema>

export default function AdminProjectsPage() {
  const [projects, setProjects] = useState<Project[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')
  const [success, setSuccess] = useState('')
  const [isDialogOpen, setIsDialogOpen] = useState(false)
  const [editingProject, setEditingProject] = useState<Project | null>(null)
  const [allSkills, setAllSkills] = useState<string[]>([]);

  const {
    register,
    handleSubmit,
    reset,
    setValue,
    watch,
    formState: { errors },
  } = useForm<ProjectFormData>({
    resolver: zodResolver(projectSchema),
    defaultValues: { skills: [] },
  })

  const selectedSkills = watch('skills') || [];

  const fetchProjects = async () => {
    try {
      const response = await projectsAPI.getAllProjects()
      setProjects(Array.isArray(response.data) ? response.data : (response.data === null ? [] : []))
    } catch (error) {
      setError('Failed to fetch projects')
      setProjects([])
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchProjects();
    // Fetch all skills for skills field
    const fetchSkills = async () => {
      const skillsRes = await skillsAPI.getSkills();
      setAllSkills(Array.isArray(skillsRes.data) ? skillsRes.data : []);
    };
    fetchSkills();
  }, []);

  if (loading) return <div>Loading...</div>
  if (error) return <div>{error}</div>

  const onSubmit = async (data: ProjectFormData) => {
    try {
      const projectData: CreateProjectRequest = {
        ...data,
        skills: data.skills,
      }

      if (editingProject) {
        await projectsAPI.updateProject(editingProject.inline.id, projectData)
        setSuccess('Project updated successfully')
      } else {
        await projectsAPI.createProject(projectData)
        setSuccess('Project created successfully')
      }

      setIsDialogOpen(false)
      setEditingProject(null)
      reset({ skills: [] })
      fetchProjects()
    } catch (error) {
      console.error('Error saving project:', error)
      setError('Failed to save project')
    }
  }

  const handleEdit = (project: Project) => {
    setEditingProject(project)
    reset({
      project_name: project.project_name,
      small_description: project.small_description,
      description: project.description,
      skills: project.skills,
      project_repository: project.project_repository,
      project_live_link: project.project_live_link,
      project_video: project.project_video,
    })
    setIsDialogOpen(true)
  }

  const handleDelete = async (projectId: string) => {
    if (confirm('Are you sure you want to delete this project?')) {
      try {
        await projectsAPI.deleteProject(projectId)
        setSuccess('Project deleted successfully')
        fetchProjects()
      } catch (error) {
        console.error('Error deleting project:', error)
        setError('Failed to delete project')
      }
    }
  }

  const openDialog = () => {
    setEditingProject(null)
    reset({ skills: [] })
    setIsDialogOpen(true)
  }

  return (
    <ProtectedRoute>
      <div className="space-y-6">
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-bold tracking-tight">Projects</h1>
            <p className="text-muted-foreground">
              Manage your portfolio projects and showcase your work.
            </p>
          </div>
          <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
            <DialogTrigger asChild>
              <Button onClick={openDialog}>
                <Plus className="mr-2 h-4 w-4" />
                Add Project
              </Button>
            </DialogTrigger>
            <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
              <DialogHeader>
                <DialogTitle>
                  {editingProject ? 'Edit Project' : 'Add New Project'}
                </DialogTitle>
                <DialogDescription>
                  {editingProject ? 'Update your project details.' : 'Add a new project to your portfolio.'}
                </DialogDescription>
              </DialogHeader>
              <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="project_name">Project Name</Label>
                    <Input
                      id="project_name"
                      {...register('project_name')}
                      placeholder="My Awesome Project"
                    />
                    {errors.project_name && (
                      <p className="text-sm text-red-500">{errors.project_name.message}</p>
                    )}
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="skills">Skills</Label>
                    <Popover>
                      <PopoverTrigger asChild>
                        <Button type="button" variant="outline" className="w-full justify-between">
                          {selectedSkills.length > 0
                            ? `${selectedSkills.length} selected`
                            : 'Select Skills'}
                        </Button>
                      </PopoverTrigger>
                      <PopoverContent className="max-h-64 overflow-y-auto w-72 p-2">
                        {allSkills.map((skill) => (
                          <label key={skill} className="flex items-center gap-2 py-1 px-2 hover:bg-gray-100 rounded cursor-pointer">
                            <Checkbox
                              checked={selectedSkills.includes(skill)}
                              onCheckedChange={(checked) => {
                                if (checked) setValue('skills', [...selectedSkills, skill]);
                                else setValue('skills', selectedSkills.filter((s) => s !== skill));
                              }}
                            />
                            <span>{skill}</span>
                          </label>
                        ))}
                      </PopoverContent>
                    </Popover>
                    {errors.skills && <p className="text-sm text-red-500">{errors.skills.message as string}</p>}
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="small_description">Small Description</Label>
                  <Input
                    id="small_description"
                    {...register('small_description')}
                    placeholder="Brief project description"
                  />
                  {errors.small_description && (
                    <p className="text-sm text-red-500">{errors.small_description.message}</p>
                  )}
                </div>

                <div className="space-y-2">
                  <Label htmlFor="description">Full Description</Label>
                  <Textarea
                    id="description"
                    {...register('description')}
                    placeholder="Detailed project description"
                    rows={4}
                  />
                  {errors.description && (
                    <p className="text-sm text-red-500">{errors.description.message}</p>
                  )}
                </div>

                <div className="space-y-2">
                  <Label htmlFor="project_repository">Repository URL</Label>
                  <Input
                    id="project_repository"
                    {...register('project_repository')}
                    placeholder="https://github.com/username/project"
                  />
                  {errors.project_repository && (
                    <p className="text-sm text-red-500">{errors.project_repository.message}</p>
                  )}
                </div>

                <div className="space-y-2">
                  <Label htmlFor="project_live_link">Live Demo URL</Label>
                  <Input
                    id="project_live_link"
                    {...register('project_live_link')}
                    placeholder="https://project-demo.com"
                  />
                  {errors.project_live_link && (
                    <p className="text-sm text-red-500">{errors.project_live_link.message}</p>
                  )}
                </div>

                <div className="space-y-2">
                  <Label htmlFor="project_video">Video Demo URL</Label>
                  <Input
                    id="project_video"
                    {...register('project_video')}
                    placeholder="https://youtube.com/watch?v=..."
                  />
                  {errors.project_video && (
                    <p className="text-sm text-red-500">{errors.project_video.message}</p>
                  )}
                </div>

                <div className="flex justify-end space-x-2">
                  <Button type="button" variant="outline" onClick={() => setIsDialogOpen(false)}>
                    Cancel
                  </Button>
                  <Button type="submit">
                    {editingProject ? 'Update Project' : 'Create Project'}
                  </Button>
                </div>
              </form>
            </DialogContent>
          </Dialog>
        </div>

        {error && (
          <Alert variant="destructive">
            <AlertDescription>{error}</AlertDescription>
          </Alert>
        )}

        {success && (
          <Alert>
            <AlertDescription>{success}</AlertDescription>
          </Alert>
        )}

        {projects.length === 0 ? (
          <Card>
            <CardContent className="text-center py-12">
              <Briefcase className="mx-auto h-12 w-12 text-gray-400 mb-4" />
              <h3 className="text-lg font-medium text-gray-900 mb-2">No projects yet</h3>
              <p className="text-gray-500 mb-4">
                Get started by adding your first project to showcase your work.
              </p>
              <Button onClick={openDialog}>
                <Plus className="mr-2 h-4 w-4" />
                Add Your First Project
              </Button>
            </CardContent>
          </Card>
        ) : (
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {projects.map((project) => (
              <Card key={project.inline?.id || project.inline.id} className="overflow-hidden">
                <CardHeader>
                  <div className="flex justify-between items-start">
                    <div className="flex-1">
                      <CardTitle className="text-lg">{project.project_name}</CardTitle>
                      <CardDescription className="mt-2">
                        {project.small_description}
                      </CardDescription>
                    </div>
                    <div className="flex space-x-1">
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => handleEdit(project)}
                      >
                        <Edit className="h-4 w-4" />
                      </Button>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => handleDelete(project.inline.id)}
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex flex-wrap gap-2">
                    {project.skills.map((skill, index) => (
                      <Badge key={index} variant="secondary">
                        {skill}
                      </Badge>
                    ))}
                  </div>
                  
                  <p className="text-sm text-gray-600 line-clamp-3">
                    {project.description}
                  </p>

                  <div className="flex space-x-2">
                    {project.project_repository && (
                      <a
                        href={project.project_repository}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-blue-600 hover:text-blue-800"
                      >
                        <Github className="h-4 w-4" />
                      </a>
                    )}
                    {project.project_live_link && (
                      <a
                        href={project.project_live_link}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-green-600 hover:text-green-800"
                      >
                        <ExternalLink className="h-4 w-4" />
                      </a>
                    )}
                    {project.project_video && (
                      <a
                        href={project.project_video}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-red-600 hover:text-red-800"
                      >
                        <Play className="h-4 w-4" />
                      </a>
                    )}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        )}
      </div>
    </ProtectedRoute>
  )
} 