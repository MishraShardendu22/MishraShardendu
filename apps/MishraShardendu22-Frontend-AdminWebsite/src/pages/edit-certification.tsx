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
import type { Certification } from '../types/types.data'
import { certificationsAPI } from '../utils/apiResponse.util'

interface EditCertificationPageProps {
  id?: string
}

export default function EditCertificationPage({ id }: EditCertificationPageProps) {
  const [loading, setLoading] = useState(true)
  const [submitting, setSubmitting] = useState(false)
  const [certification, setCertification] = useState<Certification | null>(null)

  const [formData, setFormData] = useState({
    title: '',
    issuer: '',
    skills: '',
    issue_date: '',
    expiry_date: '',
    description: '',
    certificate_url: '',
  })

  useEffect(() => {
    if (id) {
      fetchCertification()
    } else {
      setLoading(false)
    }
  }, [id])

  const fetchCertification = async () => {
    try {
      const response = await certificationsAPI.getCertificationById(id!)
      const certData = response.data
      if (certData) {
        setCertification(certData)
        setFormData({
          title: certData.title || '',
          issuer: certData.issuer || '',
          skills: certData.skills?.join(', ') || '',
          issue_date: certData.issue_date || '',
          expiry_date: certData.expiry_date || '',
          description: certData.description || '',
          certificate_url: certData.certificate_url || '',
        })
      }
    } catch {
      toast.error('Failed to fetch certification')
      route('/admin/certifications')
    } finally {
      setLoading(false)
    }
  }

  const handleSubmit = async (e: Event) => {
    e.preventDefault()
    if (!formData.title || !formData.issuer || !formData.issue_date) {
      toast.error('Title, issuer, and issue date are required')
      return
    }

    setSubmitting(true)
    try {
      const skillsArray = formData.skills
        .split(',')
        .map((s) => s.trim())
        .filter((s) => s.length > 0)

      const payload = {
        title: formData.title,
        issuer: formData.issuer,
        skills: skillsArray,
        issue_date: formData.issue_date,
        expiry_date: formData.expiry_date || '',
        description: formData.description,
        certificate_url: formData.certificate_url,
        projects: [],
        images: [],
      }

      if (id && certification) {
        await certificationsAPI.updateCertification(id, payload)
        toast.success('Certification updated successfully!')
      } else {
        await certificationsAPI.createCertification(payload)
        toast.success('Certification created successfully!')
      }
      route('/admin/certifications')
    } catch {
      toast.error(id ? 'Failed to update certification' : 'Failed to create certification')
    } finally {
      setSubmitting(false)
    }
  }

  if (loading) {
    return <Loading title="Loading Certification" description="Fetching certification details..." />
  }

  return (
    <div className="w-full min-h-screen bg-background">
      <div className="w-[95%] mx-auto py-8">
        {/* Header */}
        <div className="flex items-center gap-4 mb-8">
          <Button variant="outline" size="sm" onClick={() => route('/admin/certifications')}>
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Certifications
          </Button>
          <h1 className="text-3xl font-bold bg-linear-to-r from-primary via-secondary to-accent bg-clip-text text-transparent">
            {id ? 'Edit Certification' : 'Add New Certification'}
          </h1>
        </div>

        {/* Form Card */}
        <Card className="w-full">
          <CardHeader>
            <CardTitle>
              {id ? 'Update Certification Details' : 'Create New Certification'}
            </CardTitle>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-8">
              {/* Basic Info Section */}
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <Label htmlFor="title" className="text-base font-medium">
                    Certification Title *
                  </Label>
                  <Input
                    id="title"
                    value={formData.title}
                    onInput={(e) =>
                      setFormData({ ...formData, title: (e.target as HTMLInputElement).value })
                    }
                    disabled={submitting}
                    required
                    className="h-12 text-base"
                    placeholder="Enter certification title"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="issuer" className="text-base font-medium">
                    Issuer / Organization *
                  </Label>
                  <Input
                    id="issuer"
                    value={formData.issuer}
                    onInput={(e) =>
                      setFormData({ ...formData, issuer: (e.target as HTMLInputElement).value })
                    }
                    disabled={submitting}
                    required
                    className="h-12 text-base"
                    placeholder="e.g., Udemy, Coursera, AWS"
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
                  placeholder="Describe what you learned or achieved with this certification..."
                  rows={6}
                  disabled={submitting}
                  className="text-base"
                />
              </div>

              {/* Dates Section */}
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <Label htmlFor="issue_date" className="text-base font-medium">
                    Issue Date *
                  </Label>
                  <Input
                    id="issue_date"
                    type="month"
                    value={formData.issue_date}
                    onInput={(e) =>
                      setFormData({ ...formData, issue_date: (e.target as HTMLInputElement).value })
                    }
                    disabled={submitting}
                    required
                    className="h-12 text-base"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="expiry_date" className="text-base font-medium">
                    Expiry Date (if applicable)
                  </Label>
                  <Input
                    id="expiry_date"
                    type="month"
                    value={formData.expiry_date}
                    onInput={(e) =>
                      setFormData({
                        ...formData,
                        expiry_date: (e.target as HTMLInputElement).value,
                      })
                    }
                    disabled={submitting}
                    className="h-12 text-base"
                  />
                </div>
              </div>

              {/* URL & Skills Section */}
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
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

                <div className="space-y-2">
                  <Label htmlFor="skills" className="text-base font-medium">
                    Skills (comma separated)
                  </Label>
                  <Input
                    id="skills"
                    placeholder="React, TypeScript, AWS, Docker"
                    value={formData.skills}
                    onInput={(e) =>
                      setFormData({ ...formData, skills: (e.target as HTMLInputElement).value })
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
                  onClick={() => route('/admin/certifications')}
                  disabled={submitting}
                  size="lg"
                >
                  Cancel
                </Button>
                <Button type="submit" disabled={submitting} size="lg">
                  {submitting && <Loader2 className="w-4 h-4 mr-2 animate-spin" />}
                  <Save className="w-4 h-4 mr-2" />
                  {id ? 'Update Certification' : 'Create Certification'}
                </Button>
              </div>
            </form>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
