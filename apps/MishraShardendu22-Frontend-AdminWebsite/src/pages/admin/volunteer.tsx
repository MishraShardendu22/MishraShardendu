import { useEffect, useState } from 'preact/hooks'
import { Plus, Edit, Trash2, Briefcase, ChevronLeft, ChevronRight, X } from 'lucide-react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../../components/ui/card'
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '../../components/ui/dialog'
import { Alert, AlertDescription } from '../../components/ui/alert'
import { Badge } from '../../components/ui/badge'
import { Input } from '../../components/ui/input'
import { Label } from '../../components/ui/label'
import { Button } from '../../components/ui/button'
import toast from 'react-hot-toast'
import type { VolunteerExperience, CreateVolunteerExperienceRequest } from '../../types/types.data'
import { volunteerExperiencesAPI, projectsAPI } from '../../utils/apiResponse.util'
import MarkdownEditor from '../../components/extra/MarkdownEditor'

interface FormData {
  images: string
  projects: string[]
  created_by: string
  description: string
  technologies: string[]
  organisation: string
  organisation_logo: string
  volunteer_time_line: { position: string; start_date: string; end_date: string }[]
}

export default function VolunteerPage() {
  const [items, setItems] = useState<VolunteerExperience[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')
  const [success, setSuccess] = useState('')
  const [isDialogOpen, setIsDialogOpen] = useState(false)
  const [editing, setEditing] = useState<VolunteerExperience | null>(null)
  const [allProjects, setAllProjects] = useState<{ id: string; name: string }[]>([])
  const [selectedTechnologies, setSelectedTechnologies] = useState<string[]>([])
  const [selectedProjects, setSelectedProjects] = useState<string[]>([])
  const [newTechnology, setNewTechnology] = useState('')
  const [page, setPage] = useState(1)
  const limit = 6

  const [formData, setFormData] = useState<FormData>({
    images: '',
    projects: [],
    created_by: '',
    description: '',
    technologies: [],
    organisation: '',
    organisation_logo: '',
    volunteer_time_line: [],
  })

  const fetch = async () => {
    try {
      const res = await volunteerExperiencesAPI.getAllVolunteerExperiences()
      // Backend returns { data: { volunteer_experiences: [...], page: 1, ... } }
      const data = res.data as unknown as
        | { volunteer_experiences?: VolunteerExperience[] }
        | VolunteerExperience[]
      const volunteerData = Array.isArray(data)
        ? data
        : (data as { volunteer_experiences?: VolunteerExperience[] })?.volunteer_experiences || []
      setItems(Array.isArray(volunteerData) ? volunteerData : [])
    } catch {
      setError('Failed to fetch volunteer experiences')
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetch()
    projectsAPI.getAllProjects().then((res) => {
      const data = res.data as unknown as
        | { projects?: { inline: { id: string }; project_name: string }[] }
        | { inline: { id: string }; project_name: string }[]
      const projectsData = Array.isArray(data)
        ? data
        : (data as { projects?: { inline: { id: string }; project_name: string }[] })?.projects ||
          []
      setAllProjects(
        Array.isArray(projectsData)
          ? projectsData.map((p: { inline: { id: string }; project_name: string }) => ({
              id: p.inline.id,
              name: p.project_name,
            }))
          : []
      )
    })
  }, [])

  useEffect(() => {
    if (success) {
      toast.success(success)
      const timer = setTimeout(() => setSuccess(''), 3000)
      return () => clearTimeout(timer)
    }
  }, [success])

  useEffect(() => {
    if (error) {
      toast.error(error)
      const timer = setTimeout(() => setError(''), 3000)
      return () => clearTimeout(timer)
    }
  }, [error])

  if (loading)
    return (
      <div className="min-h-[40vh] flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-4 border-primary border-solid"></div>
      </div>
    )

  const resetForm = () => {
    setFormData({
      images: '',
      projects: [],
      created_by: '',
      description: '',
      technologies: [],
      organisation: '',
      organisation_logo: '',
      volunteer_time_line: [],
    })
    setSelectedProjects([])
    setSelectedTechnologies([])
  }

  const handleSubmit = async (e: Event) => {
    e.preventDefault()
    try {
      const payload: CreateVolunteerExperienceRequest = {
        images: formData.images.split(',').map((s) => s.trim()),
        projects: selectedProjects,
        created_by: formData.created_by,
        description: formData.description,
        technologies: selectedTechnologies,
        organisation: formData.organisation,
        organisation_logo: formData.organisation_logo,
        volunteer_time_line: formData.volunteer_time_line,
      }

      if (editing) {
        await volunteerExperiencesAPI.updateVolunteerExperience(editing.inline.id, payload)
        setSuccess('Volunteer experience updated successfully')
      } else {
        await volunteerExperiencesAPI.createVolunteerExperience(payload)
        setSuccess('Volunteer experience created successfully')
      }

      setIsDialogOpen(false)
      setEditing(null)
      resetForm()
      fetch()
    } catch {
      setError('Failed to save')
    }
  }

  const handleEdit = (v: VolunteerExperience) => {
    setEditing(v)
    setSelectedTechnologies(v.technologies || [])
    setSelectedProjects(v.projects || [])
    setFormData({
      images: v.images.join(', '),
      projects: v.projects,
      created_by: v.created_by,
      description: v.description,
      technologies: v.technologies,
      organisation: v.organisation,
      organisation_logo: v.organisation_logo,
      volunteer_time_line: v.volunteer_time_line || [],
    })
    setIsDialogOpen(true)
  }

  const handleDelete = async (id: string) => {
    if (!confirm('Are you sure you want to delete this entry?')) return
    try {
      await volunteerExperiencesAPI.deleteVolunteerExperience(id)
      setSuccess('Deleted successfully')
      fetch()
      if ((page - 1) * limit >= items.length - 1 && page > 1) setPage(page - 1)
    } catch {
      setError('Failed to delete')
    }
  }

  const addTechnology = () => {
    if (newTechnology.trim() && !selectedTechnologies.includes(newTechnology.trim())) {
      const updated = [...selectedTechnologies, newTechnology.trim()]
      setSelectedTechnologies(updated)
      setNewTechnology('')
    }
  }

  const removeTechnology = (tech: string) => {
    setSelectedTechnologies((s) => s.filter((t) => t !== tech))
  }

  const toggleProject = (id: string) => {
    setSelectedProjects((prev) =>
      prev.includes(id) ? prev.filter((p) => p !== id) : [...prev, id]
    )
  }

  const totalPages = Math.ceil(items.length / limit)
  const currentData = items.slice((page - 1) * limit, page * limit)

  return (
    <div className="space-y-12 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="text-center mb-12 space-y-8">
        <h1 className="text-2xl md:text-3xl font-heading font-bold bg-gradient-to-r from-secondary via-primary to-accent bg-clip-text text-transparent leading-tight">
          Volunteer Experiences - Manage your volunteer work and contributions.
        </h1>
      </div>

      <div className="flex flex-col md:flex-row md:justify-between md:items-center gap-4 md:gap-0 pb-2 border-b border-border">
        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogTrigger>
            <Button onClick={() => resetForm()} className="flex items-center">
              <Plus className="mr-2 h-5 w-5" /> Add Volunteer
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-3xl max-h-[80vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle>{editing ? 'Edit Volunteer' : 'Add Volunteer'}</DialogTitle>
            </DialogHeader>
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="organisation">Organisation</Label>
                  <Input
                    id="organisation"
                    value={formData.organisation}
                    onInput={(e) =>
                      setFormData({
                        ...formData,
                        organisation: (e.target as HTMLInputElement).value,
                      })
                    }
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="position">Position</Label>
                  <Input
                    id="position"
                    value={formData.volunteer_time_line?.[0]?.position || ''}
                    onInput={(e) =>
                      setFormData({
                        ...formData,
                        volunteer_time_line: [
                          {
                            ...(formData.volunteer_time_line?.[0] || {}),
                            position: (e.target as HTMLInputElement).value,
                          },
                        ],
                      })
                    }
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="start_date">Start Date</Label>
                  <Input
                    id="start_date"
                    type="date"
                    value={formData.volunteer_time_line?.[0]?.start_date || ''}
                    onInput={(e) =>
                      setFormData({
                        ...formData,
                        volunteer_time_line: [
                          {
                            ...(formData.volunteer_time_line?.[0] || {}),
                            start_date: (e.target as HTMLInputElement).value,
                          },
                        ],
                      })
                    }
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="end_date">End Date</Label>
                  <Input
                    id="end_date"
                    type="date"
                    value={formData.volunteer_time_line?.[0]?.end_date || ''}
                    onInput={(e) =>
                      setFormData({
                        ...formData,
                        volunteer_time_line: [
                          {
                            ...(formData.volunteer_time_line?.[0] || {}),
                            end_date: (e.target as HTMLInputElement).value,
                          },
                        ],
                      })
                    }
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="organisation_logo">Organisation Logo URL</Label>
                  <Input
                    id="organisation_logo"
                    value={formData.organisation_logo}
                    onInput={(e) =>
                      setFormData({
                        ...formData,
                        organisation_logo: (e.target as HTMLInputElement).value,
                      })
                    }
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="images">Images (comma-separated URLs)</Label>
                  <Input
                    id="images"
                    value={formData.images}
                    onInput={(e) =>
                      setFormData({ ...formData, images: (e.target as HTMLInputElement).value })
                    }
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="description">Description</Label>
                <MarkdownEditor
                  content={formData.description}
                  onChange={(c) => setFormData({ ...formData, description: c })}
                />
              </div>

              <div className="space-y-2">
                <Label>Technologies</Label>
                <div className="flex gap-2">
                  <Input
                    value={newTechnology}
                    onInput={(e) => setNewTechnology((e.target as HTMLInputElement).value)}
                    placeholder="Add a technology"
                    onKeyPress={(e) => {
                      if ((e as KeyboardEvent).key === 'Enter') {
                        e.preventDefault()
                        addTechnology()
                      }
                    }}
                  />
                  <Button type="button" onClick={addTechnology} variant="outline">
                    Add
                  </Button>
                </div>
                <div className="flex flex-wrap gap-2">
                  {selectedTechnologies.map((tech) => (
                    <Badge key={tech} variant="secondary" className="flex items-center gap-1">
                      {tech}
                      <X
                        className="h-3 w-3 cursor-pointer hover:text-destructive"
                        onClick={() => removeTechnology(tech)}
                      />
                    </Badge>
                  ))}
                </div>
              </div>

              <div className="space-y-2">
                <Label>Projects</Label>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-2 max-h-40 overflow-y-auto">
                  {allProjects.map((p) => (
                    <div key={p.id} className="flex items-center space-x-2">
                      <input
                        type="checkbox"
                        id={p.id}
                        checked={selectedProjects.includes(p.id)}
                        onChange={() => toggleProject(p.id)}
                        className="rounded border-gray-300"
                      />
                      <Label htmlFor={p.id} className="text-sm">
                        {p.name}
                      </Label>
                    </div>
                  ))}
                </div>
              </div>

              <div className="flex justify-end gap-2">
                <Button type="button" variant="outline" onClick={() => setIsDialogOpen(false)}>
                  Cancel
                </Button>
                <Button type="submit">{editing ? 'Update' : 'Create'}</Button>
              </div>
            </form>
          </DialogContent>
        </Dialog>
      </div>

      {success && (
        <Alert className="animate-fade-in">
          <AlertDescription>{success}</AlertDescription>
        </Alert>
      )}

      {items.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-16 animate-fade-in">
          <Briefcase className="mx-auto h-16 w-16 text-foreground mb-4" />
          <h3 className="text-2xl font-semibold text-foreground mb-2">No volunteer entries</h3>
          <p className="text-lg text-foreground mb-6">
            Get started by adding your first volunteer experience.
          </p>
          <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
            <DialogTrigger>
              <Button onClick={() => resetForm()} className="flex items-center">
                <Plus className="mr-2 h-5 w-5" /> Add Volunteer
              </Button>
            </DialogTrigger>
          </Dialog>
        </div>
      ) : (
        <>
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {currentData.map((v) => (
              <Card
                key={v.inline?.id || v.inline.id}
                className="group relative overflow-hidden border-2 border-border/50 hover:border-secondary/50 transition-all duration-500 hover:shadow-2xl hover:shadow-secondary/10 hover:-translate-y-2 bg-gradient-to-br from-card/50 to-card backdrop-blur-sm rounded-2xl animate-fade-in flex flex-col"
              >
                <CardHeader className="bg-gradient-to-r from-secondary/10 to-card pb-2">
                  <CardTitle className="text-2xl font-semibold text-secondary flex items-center gap-2">
                    <Briefcase className="h-5 w-5 text-secondary" />
                    {v.volunteer_time_line?.[0]?.position ?? 'Position'}
                  </CardTitle>
                  <CardDescription className="text-foreground">
                    {v.organisation} &bull; {v.volunteer_time_line?.[0]?.start_date} to{' '}
                    {v.volunteer_time_line?.[0]?.end_date}
                  </CardDescription>
                </CardHeader>
                <CardContent className="flex-1 flex flex-col gap-2 p-2">
                  <p className="text-base text-foreground line-clamp-4">
                    {v.description.length > 180
                      ? `${v.description.substring(0, 180)}...`
                      : v.description}
                  </p>
                  <div className="flex flex-wrap gap-2 mb-2">
                    {v.technologies.map((t, idx) => (
                      <Badge
                        key={idx}
                        variant="secondary"
                        className="text-xs px-2 py-1 rounded-full bg-secondary/10 text-secondary border border-secondary/20"
                      >
                        {t}
                      </Badge>
                    ))}
                  </div>
                  <div className="flex gap-1 mt-auto">
                    <Button
                      size="sm"
                      variant="outline"
                      onClick={() => handleEdit(v)}
                      className="flex-1"
                    >
                      <Edit className="h-4 w-4 mr-1" /> Edit
                    </Button>
                    <Button
                      size="sm"
                      variant="destructive"
                      onClick={() => handleDelete(v.inline.id)}
                      className="flex-1"
                    >
                      <Trash2 className="h-4 w-4 mr-1" /> Delete
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          <div className="flex justify-center items-center gap-4 mt-8">
            <Button
              variant="outline"
              disabled={page === 1}
              onClick={() => setPage((p) => Math.max(1, p - 1))}
              className="flex items-center gap-1"
            >
              <ChevronLeft className="h-4 w-4" /> Prev
            </Button>
            <span className="text-foreground">
              Page {page} of {totalPages}
            </span>
            <Button
              variant="outline"
              disabled={page === totalPages}
              onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
              className="flex items-center gap-1"
            >
              Next <ChevronRight className="h-4 w-4" />
            </Button>
          </div>
        </>
      )}
    </div>
  )
}
