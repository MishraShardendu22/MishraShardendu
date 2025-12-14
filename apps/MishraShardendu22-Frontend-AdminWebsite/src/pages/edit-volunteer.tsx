import { ArrowLeft, Loader2, Plus, Save, X } from 'lucide-react'
import { useEffect, useState } from 'preact/hooks'
import { route } from 'preact-router'
import toast from 'react-hot-toast'
import { Loading } from '../components/shared'
import { Badge } from '../components/ui/badge'
import { Button } from '../components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '../components/ui/card'
import { Input } from '../components/ui/input'
import { Label } from '../components/ui/label'
import { Textarea } from '../components/ui/textarea'
import type { Project, VolunteerExperience } from '../types/types.data'
import { projectsAPI, volunteerExperiencesAPI } from '../utils/apiResponse.util'

interface EditVolunteerPageProps {
  id?: string
}

export default function EditVolunteerPage({ id }: EditVolunteerPageProps) {
  const [loading, setLoading] = useState(true)
  const [submitting, setSubmitting] = useState(false)
  const [volunteer, setVolunteer] = useState<VolunteerExperience | null>(null)
  const [allProjects, setAllProjects] = useState<{ id: string; name: string }[]>([])
  const [selectedTechnologies, setSelectedTechnologies] = useState<string[]>([])
  const [selectedProjects, setSelectedProjects] = useState<string[]>([])
  const [newTechnology, setNewTechnology] = useState('')

  const [formData, setFormData] = useState({
    organisation: '',
    position: '',
    start_date: '',
    end_date: '',
    description: '',
    organisation_logo: '',
    images: '',
    created_by: '',
  })

  useEffect(() => {
    fetchProjects()
    if (id) {
      fetchVolunteer()
    } else {
      setLoading(false)
    }
  }, [id])

  const fetchProjects = async () => {
    try {
      let allProjectsList: { id: string; name: string }[] = []
      let page = 1
      let hasMore = true

      while (hasMore) {
        const res = await projectsAPI.getAllProjects(page, 100)
        const projectsData = res.data?.projects || []
        const mapped = projectsData.map((p: Project) => ({
          id: p.inline.id,
          name: p.project_name,
        }))
        allProjectsList = [...allProjectsList, ...mapped]
        hasMore = res.data?.has_next || false
        page++
        if (page > 50) break
      }

      setAllProjects(allProjectsList)
    } catch {
      // Failed to fetch projects
    }
  }

  const fetchVolunteer = async () => {
    try {
      const response = await volunteerExperiencesAPI.getVolunteerExperienceById(id!)
      const volData = response.data
      if (volData) {
        setVolunteer(volData)
        setSelectedTechnologies(volData.technologies || [])
        setSelectedProjects(volData.projects || [])
        setFormData({
          organisation: volData.organisation || '',
          position: volData.volunteer_time_line?.[0]?.position || '',
          start_date: volData.volunteer_time_line?.[0]?.start_date || '',
          end_date: volData.volunteer_time_line?.[0]?.end_date || '',
          description: volData.description || '',
          organisation_logo: volData.organisation_logo || '',
          images: volData.images?.join(', ') || '',
          created_by: volData.created_by || '',
        })
      }
    } catch {
      toast.error('Failed to fetch volunteer experience')
      route('/admin/volunteer')
    } finally {
      setLoading(false)
    }
  }

  const handleSubmit = async (e: Event) => {
    e.preventDefault()
    if (!formData.organisation || !formData.position) {
      toast.error('Organisation and position are required')
      return
    }

    setSubmitting(true)
    try {
      const payload = {
        organisation: formData.organisation,
        description: formData.description,
        technologies: selectedTechnologies,
        organisation_logo: formData.organisation_logo,
        projects: selectedProjects,
        images: formData.images
          .split(',')
          .map((s) => s.trim())
          .filter((s) => s.length > 0),
        created_by: formData.created_by,
        volunteer_time_line: [
          {
            position: formData.position,
            start_date: formData.start_date,
            end_date: formData.end_date,
          },
        ],
      }

      if (id && volunteer) {
        await volunteerExperiencesAPI.updateVolunteerExperience(id, payload)
        toast.success('Volunteer experience updated successfully!')
      } else {
        await volunteerExperiencesAPI.createVolunteerExperience(payload)
        toast.success('Volunteer experience created successfully!')
      }
      route('/admin/volunteer')
    } catch {
      toast.error(
        id ? 'Failed to update volunteer experience' : 'Failed to create volunteer experience'
      )
    } finally {
      setSubmitting(false)
    }
  }

  const addTechnology = () => {
    if (newTechnology.trim() && !selectedTechnologies.includes(newTechnology.trim())) {
      setSelectedTechnologies([...selectedTechnologies, newTechnology.trim()])
      setNewTechnology('')
    }
  }

  const removeTechnology = (tech: string) => {
    setSelectedTechnologies(selectedTechnologies.filter((t) => t !== tech))
  }

  const toggleProject = (projectId: string) => {
    setSelectedProjects((prev) =>
      prev.includes(projectId) ? prev.filter((p) => p !== projectId) : [...prev, projectId]
    )
  }

  if (loading) {
    return <Loading title="Loading Volunteer Experience" description="Fetching details..." />
  }

  return (
    <div className="w-full min-h-screen bg-background">
      <div className="w-[95%] mx-auto py-8">
        {/* Header */}
        <div className="flex items-center gap-4 mb-8">
          <Button variant="outline" size="sm" onClick={() => route('/admin/volunteer')}>
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Volunteer
          </Button>
          <h1 className="text-3xl font-bold bg-linear-to-r from-primary via-secondary to-accent bg-clip-text text-transparent">
            {id ? 'Edit Volunteer Experience' : 'Add New Volunteer Experience'}
          </h1>
        </div>

        {/* Form Card */}
        <Card className="w-full">
          <CardHeader>
            <CardTitle>
              {id ? 'Update Volunteer Details' : 'Create New Volunteer Experience'}
            </CardTitle>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-8">
              {/* Basic Info Section */}
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <Label htmlFor="organisation" className="text-base font-medium">
                    Organisation *
                  </Label>
                  <Input
                    id="organisation"
                    value={formData.organisation}
                    onInput={(e) =>
                      setFormData({
                        ...formData,
                        organisation: (e.target as HTMLInputElement).value,
                      })
                    }
                    disabled={submitting}
                    required
                    className="h-12 text-base"
                    placeholder="Enter organisation name"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="position" className="text-base font-medium">
                    Position / Role *
                  </Label>
                  <Input
                    id="position"
                    value={formData.position}
                    onInput={(e) =>
                      setFormData({ ...formData, position: (e.target as HTMLInputElement).value })
                    }
                    disabled={submitting}
                    required
                    className="h-12 text-base"
                    placeholder="e.g., Tech Lead, Core Member"
                  />
                </div>
              </div>

              {/* Dates Section */}
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <Label htmlFor="start_date" className="text-base font-medium">
                    Start Date
                  </Label>
                  <Input
                    id="start_date"
                    type="date"
                    value={formData.start_date}
                    onInput={(e) =>
                      setFormData({ ...formData, start_date: (e.target as HTMLInputElement).value })
                    }
                    disabled={submitting}
                    className="h-12 text-base"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="end_date" className="text-base font-medium">
                    End Date
                  </Label>
                  <Input
                    id="end_date"
                    type="date"
                    value={formData.end_date}
                    onInput={(e) =>
                      setFormData({ ...formData, end_date: (e.target as HTMLInputElement).value })
                    }
                    disabled={submitting}
                    className="h-12 text-base"
                  />
                </div>
              </div>

              {/* Description Section */}
              <div className="space-y-2">
                <Label htmlFor="description" className="text-base font-medium">
                  Description
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
                  placeholder="Describe your contributions and responsibilities..."
                  rows={6}
                  disabled={submitting}
                  className="text-base"
                />
              </div>

              {/* URLs Section */}
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <Label htmlFor="organisation_logo" className="text-base font-medium">
                    Organisation Logo URL
                  </Label>
                  <Input
                    id="organisation_logo"
                    type="url"
                    value={formData.organisation_logo}
                    onInput={(e) =>
                      setFormData({
                        ...formData,
                        organisation_logo: (e.target as HTMLInputElement).value,
                      })
                    }
                    disabled={submitting}
                    className="h-12 text-base"
                    placeholder="https://org.com/logo.png"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="created_by" className="text-base font-medium">
                    Created By
                  </Label>
                  <Input
                    id="created_by"
                    value={formData.created_by}
                    onInput={(e) =>
                      setFormData({ ...formData, created_by: (e.target as HTMLInputElement).value })
                    }
                    disabled={submitting}
                    className="h-12 text-base"
                    placeholder="Your name"
                  />
                </div>
              </div>

              {/* Images Section */}
              <div className="space-y-2">
                <Label htmlFor="images" className="text-base font-medium">
                  Images (comma-separated URLs)
                </Label>
                <Input
                  id="images"
                  value={formData.images}
                  onInput={(e) =>
                    setFormData({ ...formData, images: (e.target as HTMLInputElement).value })
                  }
                  disabled={submitting}
                  className="h-12 text-base"
                  placeholder="https://image1.com, https://image2.com"
                />
              </div>

              {/* Technologies Section */}
              <div className="space-y-4">
                <Label className="text-base font-medium">Technologies</Label>
                <div className="flex gap-2">
                  <Input
                    value={newTechnology}
                    onInput={(e) => setNewTechnology((e.target as HTMLInputElement).value)}
                    placeholder="Add a technology"
                    className="h-12 text-base"
                    onKeyPress={(e) => {
                      if ((e as KeyboardEvent).key === 'Enter') {
                        e.preventDefault()
                        addTechnology()
                      }
                    }}
                  />
                  <Button type="button" onClick={addTechnology} variant="outline" size="lg">
                    <Plus className="w-4 h-4 mr-1" /> Add
                  </Button>
                </div>
                <div className="flex flex-wrap gap-2">
                  {selectedTechnologies.map((tech) => (
                    <Badge
                      key={tech}
                      variant="secondary"
                      className="text-sm px-3 py-1 flex items-center gap-1"
                    >
                      {tech}
                      <X
                        className="h-4 w-4 cursor-pointer hover:text-destructive"
                        onClick={() => removeTechnology(tech)}
                      />
                    </Badge>
                  ))}
                </div>
              </div>

              {/* Projects Section */}
              <div className="space-y-4">
                <Label className="text-base font-medium">Related Projects</Label>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3 max-h-60 overflow-y-auto p-4 border rounded-lg">
                  {allProjects.map((p) => (
                    <div key={p.id} className="flex items-center space-x-2">
                      <input
                        type="checkbox"
                        id={p.id}
                        checked={selectedProjects.includes(p.id)}
                        onChange={() => toggleProject(p.id)}
                        className="rounded border-gray-300 h-5 w-5"
                      />
                      <Label htmlFor={p.id} className="text-sm cursor-pointer">
                        {p.name}
                      </Label>
                    </div>
                  ))}
                </div>
              </div>

              {/* Actions */}
              <div className="flex justify-end gap-4 pt-6 border-t">
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => route('/admin/volunteer')}
                  disabled={submitting}
                  size="lg"
                >
                  Cancel
                </Button>
                <Button type="submit" disabled={submitting} size="lg">
                  {submitting && <Loader2 className="w-4 h-4 mr-2 animate-spin" />}
                  <Save className="w-4 h-4 mr-2" />
                  {id ? 'Update Volunteer' : 'Create Volunteer'}
                </Button>
              </div>
            </form>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
