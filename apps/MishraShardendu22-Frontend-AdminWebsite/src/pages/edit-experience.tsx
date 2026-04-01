import { ArrowLeft, Loader2, X } from 'lucide-react'
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
import type { Experience, Project } from '../types/types.data'
import { experiencesAPI, projectsAPI } from '../utils/apiResponse.util'

interface EditExperiencePageProps {
  id?: string
}

export default function EditExperiencePage({ id }: EditExperiencePageProps) {
  const [loading, setLoading] = useState(true)
  const [submitting, setSubmitting] = useState(false)
  const [experience, setExperience] = useState<Experience | null>(null)
  const [allProjects, setAllProjects] = useState<{ id: string; name: string }[]>([])
  const [selectedTechnologies, setSelectedTechnologies] = useState<string[]>([])
  const [selectedProjects, setSelectedProjects] = useState<string[]>([])
  const [newTechnology, setNewTechnology] = useState('')

  const [formData, setFormData] = useState({
    company_name: '',
    position: '',
    start_date: '',
    end_date: '',
    description: '',
    company_logo: '',
    certificate_url: '',
    images: '',
  })

  useEffect(() => {
    fetchProjects()
    if (id) {
      fetchExperience()
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

  const fetchExperience = async () => {
    try {
      const response = await experiencesAPI.getExperienceById(id!)
      const expData = response.data
      if (expData) {
        setExperience(expData)
        setSelectedTechnologies(expData.technologies || [])
        setSelectedProjects(expData.projects || [])
        setFormData({
          company_name: expData.company_name || '',
          position: expData.experience_time_line?.[0]?.position || '',
          start_date: expData.experience_time_line?.[0]?.start_date || '',
          end_date: expData.experience_time_line?.[0]?.end_date || '',
          description: expData.description || '',
          company_logo: expData.company_logo || '',
          certificate_url: expData.certificate_url || '',
          images: expData.images?.join(', ') || '',
        })
      }
    } catch {
      toast.error('Failed to fetch experience')
      route('/admin/experiences')
    } finally {
      setLoading(false)
    }
  }

  const handleSubmit = async (e: Event) => {
    e.preventDefault()
    if (!formData.company_name || !formData.position) {
      toast.error('Company name and position are required')
      return
    }

    setSubmitting(true)
    try {
      const payload = {
        company_name: formData.company_name,
        description: formData.description,
        technologies: selectedTechnologies,
        company_logo: formData.company_logo,
        certificate_url: formData.certificate_url,
        projects: selectedProjects,
        images: formData.images
          .split(',')
          .map((s) => s.trim())
          .filter((s) => s.length > 0),
        created_by: 'admin',
        experience_time_line: [
          {
            position: formData.position,
            start_date: formData.start_date,
            end_date: formData.end_date,
          },
        ],
      }

      if (id && experience) {
        await experiencesAPI.updateExperience(id, payload)
        toast.success('Experience updated successfully!')
      } else {
        await experiencesAPI.createExperience(payload)
        toast.success('Experience created successfully!')
      }
      route('/admin/experiences')
    } catch {
      toast.error(id ? 'Failed to update experience' : 'Failed to create experience')
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
    return <Loading title="Loading Experience" description="Fetching experience details..." />
  }

  return (
    <div className="w-full min-h-screen bg-background">
      <div className="w-[95%] mx-auto py-8">
        {/* Header */}
        <div className="flex items-center gap-4 mb-8">
          <Button variant="outline" size="sm" onClick={() => route('/admin/experiences')}>
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Experiences
          </Button>
          <h1 className="text-3xl font-bold bg-linear-to-r from-primary via-secondary to-accent bg-clip-text text-transparent">
            {id ? 'Edit Experience' : 'Add New Experience'}
          </h1>
        </div>

        {/* Form Card */}
        <Card className="w-full">
          <CardHeader>
            <CardTitle>{id ? 'Update Experience Details' : 'Create New Experience'}</CardTitle>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-8">
              {/* Basic Info Section */}
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <Label htmlFor="company_name" className="text-base font-medium">
                    Company Name *
                  </Label>
                  <Input
                    id="company_name"
                    value={formData.company_name}
                    onInput={(e) =>
                      setFormData({
                        ...formData,
                        company_name: (e.target as HTMLInputElement).value,
                      })
                    }
                    disabled={submitting}
                    required
                    className="h-12 text-base"
                    placeholder="Enter company name"
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
                    placeholder="e.g., Software Engineer"
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
                  placeholder="Describe your responsibilities and achievements..."
                  rows={6}
                  disabled={submitting}
                  className="text-base"
                />
              </div>

              {/* URLs Section */}
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <Label htmlFor="company_logo" className="text-base font-medium">
                    Company Logo URL
                  </Label>
                  <Input
                    id="company_logo"
                    type="url"
                    value={formData.company_logo}
                    onInput={(e) =>
                      setFormData({
                        ...formData,
                        company_logo: (e.target as HTMLInputElement).value,
                      })
                    }
                    disabled={submitting}
                    className="h-12 text-base"
                    placeholder="https://company.com/logo.png"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="certificate_url" className="text-base font-medium">
                    Certificate URL
                  </Label>
                  <Input
                    id="certificate_url"
                    type="url"
                    value={formData.certificate_url}
                    onInput={(e) =>
                      setFormData({
                        ...formData,
                        certificate_url: (e.target as HTMLInputElement).value,
                      })
                    }
                    disabled={submitting}
                    className="h-12 text-base"
                    placeholder="https://certificate-url.com"
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
                    Add
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
                  onClick={() => route('/admin/experiences')}
                  disabled={submitting}
                  size="lg"
                >
                  Cancel
                </Button>
                <Button type="submit" disabled={submitting} size="lg">
                  {submitting && <Loader2 className="w-4 h-4 mr-2 animate-spin" />}
                  {id ? 'Update Experience' : 'Create Experience'}
                </Button>
              </div>
            </form>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
