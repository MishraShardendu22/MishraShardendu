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
import { certificationsAPI } from '../../utils/apiResponse.util'
import { Plus, ExternalLink, Loader2, Pencil, Trash2, Award } from 'lucide-react'
import toast from 'react-hot-toast'
import type { Certification } from '../../types/types.data'
import MarkdownEditor from '../../components/extra/MarkdownEditor'

export default function CertificationsPage() {
  const [certifications, setCertifications] = useState<Certification[]>([])
  const [loading, setLoading] = useState(true)
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false)
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false)
  const [submitting, setSubmitting] = useState(false)
  const [editingCertification, setEditingCertification] = useState<Certification | null>(null)
  const [currentPage, setCurrentPage] = useState(0)
  const itemsPerPage = 6
  const totalPages = Math.ceil(certifications.length / itemsPerPage)
  const paginatedCertifications = certifications.slice(
    currentPage * itemsPerPage,
    (currentPage + 1) * itemsPerPage
  )

  // Form state
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    issuer: '',
    issue_date: '',
    expiry_date: '',
    certificate_url: '',
    skills: '',
  })

  const fetchCertifications = async () => {
    try {
      const response = await certificationsAPI.getAllCertifications()
      // Backend returns { data: [...], message: "...", status: 200 }
      const certificationsData = response.data || []
      setCertifications(Array.isArray(certificationsData) ? certificationsData : [])
    } catch {
      toast.error('Failed to fetch certifications')
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchCertifications()
  }, [])

  const resetForm = () => {
    setFormData({
      title: '',
      description: '',
      issuer: '',
      issue_date: '',
      expiry_date: '',
      certificate_url: '',
      skills: '',
    })
  }

  const handleAddCertification = async (e: Event) => {
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

      await certificationsAPI.createCertification({
        title: formData.title,
        description: formData.description,
        issuer: formData.issuer,
        issue_date: formData.issue_date,
        expiry_date: formData.expiry_date,
        certificate_url: formData.certificate_url,
        skills: skillsArray,
        projects: [],
        images: [],
      })

      toast.success('Certification added successfully!')
      setIsAddDialogOpen(false)
      resetForm()
      fetchCertifications()
    } catch {
      toast.error('Failed to add certification')
    } finally {
      setSubmitting(false)
    }
  }

  const handleEditCertification = async (e: Event) => {
    e.preventDefault()
    if (!editingCertification || !formData.title || !formData.issuer || !formData.issue_date) {
      toast.error('Title, issuer, and issue date are required')
      return
    }

    setSubmitting(true)
    try {
      const skillsArray = formData.skills
        .split(',')
        .map((s) => s.trim())
        .filter((s) => s.length > 0)

      await certificationsAPI.updateCertification(editingCertification.inline.id, {
        title: formData.title,
        description: formData.description,
        issuer: formData.issuer,
        issue_date: formData.issue_date,
        expiry_date: formData.expiry_date,
        certificate_url: formData.certificate_url,
        skills: skillsArray,
        projects: [],
        images: [],
      })

      toast.success('Certification updated successfully!')
      setIsEditDialogOpen(false)
      setEditingCertification(null)
      resetForm()
      fetchCertifications()
    } catch {
      toast.error('Failed to update certification')
    } finally {
      setSubmitting(false)
    }
  }

  const handleDeleteCertification = async (id: string) => {
    if (!confirm('Are you sure you want to delete this certification?')) return

    try {
      await certificationsAPI.deleteCertification(id)
      toast.success('Certification deleted successfully!')
      fetchCertifications()
    } catch {
      toast.error('Failed to delete certification')
    }
  }

  const openEditDialog = (certification: Certification) => {
    setEditingCertification(certification)
    setFormData({
      title: certification.title,
      description: certification.description,
      issuer: certification.issuer,
      issue_date: certification.issue_date,
      expiry_date: certification.expiry_date,
      certificate_url: certification.certificate_url,
      skills: certification.skills?.join(', ') || '',
    })
    setIsEditDialogOpen(true)
  }

  if (loading)
    return <Loading title="Loading Certifications" description="Fetching your certifications..." />

  return (
    <div className="space-y-8 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Header */}
      <header className="text-center space-y-4">
        <h1 className="text-3xl md:text-4xl lg:text-5xl font-heading font-extrabold bg-gradient-to-r from-primary via-secondary to-accent bg-clip-text text-transparent">
          Certifications Management
        </h1>
        <p className="text-foreground/70 text-lg max-w-2xl mx-auto">
          Manage your professional certifications and credentials
        </p>
      </header>

      {/* Action Bar */}
      <div className="flex flex-col md:flex-row md:justify-between md:items-center gap-4 border-b border-border pb-4">
        <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
          <DialogTrigger>
            <Button onClick={() => resetForm()}>
              <Plus className="w-4 h-4 mr-2" />
              Add Certification
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[600px] max-h-[90vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle>Add New Certification</DialogTitle>
              <DialogDescription>Fill in the certification details</DialogDescription>
            </DialogHeader>
            <form onSubmit={handleAddCertification} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="title">Title *</Label>
                <Input
                  id="title"
                  value={formData.title}
                  onInput={(e) =>
                    setFormData({ ...formData, title: (e.target as HTMLInputElement).value })
                  }
                  disabled={submitting}
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="description">Description</Label>
                <MarkdownEditor
                  content={formData.description}
                  onChange={(content) => setFormData({ ...formData, description: content })}
                  placeholder="Write a description of your certification..."
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="issuer">Issuer *</Label>
                <Input
                  id="issuer"
                  value={formData.issuer}
                  onInput={(e) =>
                    setFormData({ ...formData, issuer: (e.target as HTMLInputElement).value })
                  }
                  disabled={submitting}
                  required
                />
              </div>
              <div className="grid md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="issue_date">Issue Date *</Label>
                  <Input
                    id="issue_date"
                    type="month"
                    value={formData.issue_date}
                    onInput={(e) =>
                      setFormData({ ...formData, issue_date: (e.target as HTMLInputElement).value })
                    }
                    disabled={submitting}
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="expiry_date">Expiry Date</Label>
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
                  />
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="certificate_url">Certificate URL</Label>
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
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="skills">Related Skills (comma separated)</Label>
                <Input
                  id="skills"
                  placeholder="React, TypeScript, AWS"
                  value={formData.skills}
                  onInput={(e) =>
                    setFormData({ ...formData, skills: (e.target as HTMLInputElement).value })
                  }
                  disabled={submitting}
                />
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
                  Add Certification
                </Button>
              </div>
            </form>
          </DialogContent>
        </Dialog>
      </div>

      {/* Certifications Grid */}
      {certifications.length === 0 ? (
        <div className="text-center py-16">
          <div className="w-24 h-24 rounded-full bg-muted/50 flex items-center justify-center mx-auto mb-6">
            <span className="text-5xl">🏆</span>
          </div>
          <h3 className="text-2xl font-bold text-foreground mb-2">No Certifications Yet</h3>
          <p className="text-foreground/60 mb-6">Start by adding your first certification</p>
          <Button onClick={() => setIsAddDialogOpen(true)}>
            <Plus className="w-4 h-4 mr-2" />
            Add Your First Certification
          </Button>
        </div>
      ) : (
        <>
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {paginatedCertifications.map((cert) => (
              <Card key={cert.inline.id} className="hover:shadow-lg transition-shadow">
                <CardHeader>
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-2">
                        <Award className="w-5 h-5 text-primary" />
                        <CardTitle className="text-lg">{cert.title}</CardTitle>
                      </div>
                      <CardDescription>
                        <div className="space-y-1">
                          <p className="font-medium">{cert.issuer}</p>
                          <p className="text-sm">
                            {new Date(cert.issue_date).toLocaleDateString('en-US', {
                              year: 'numeric',
                              month: 'long',
                            })}
                          </p>
                        </div>
                      </CardDescription>
                    </div>
                    <div className="flex gap-2">
                      <Button size="sm" variant="ghost" onClick={() => openEditDialog(cert)}>
                        <Pencil className="w-4 h-4" />
                      </Button>
                      <Button
                        size="sm"
                        variant="ghost"
                        onClick={() => handleDeleteCertification(cert.inline.id)}
                      >
                        <Trash2 className="w-4 h-4 text-destructive" />
                      </Button>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    {cert.description && (
                      <p className="text-sm text-foreground/80">{cert.description}</p>
                    )}
                    {cert.skills && cert.skills.length > 0 && (
                      <div className="flex flex-wrap gap-2">
                        {cert.skills.map((skill) => (
                          <Badge key={skill} variant="outline">
                            {skill}
                          </Badge>
                        ))}
                      </div>
                    )}
                    {cert.certificate_url && (
                      <a
                        href={cert.certificate_url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-1 text-sm text-primary hover:underline w-full"
                      >
                        <ExternalLink className="w-3 h-3" />
                        View Certificate
                      </a>
                    )}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
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
            <DialogTitle>Edit Certification</DialogTitle>
            <DialogDescription>Update the certification details</DialogDescription>
          </DialogHeader>
          <form onSubmit={handleEditCertification} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="edit-title">Title *</Label>
              <Input
                id="edit-title"
                value={formData.title}
                onInput={(e) =>
                  setFormData({ ...formData, title: (e.target as HTMLInputElement).value })
                }
                disabled={submitting}
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="edit-description">Description</Label>
              <MarkdownEditor
                content={formData.description}
                onChange={(content) => setFormData({ ...formData, description: content })}
                placeholder="Write a description of your certification..."
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="edit-issuer">Issuer *</Label>
              <Input
                id="edit-issuer"
                value={formData.issuer}
                onInput={(e) =>
                  setFormData({ ...formData, issuer: (e.target as HTMLInputElement).value })
                }
                disabled={submitting}
                required
              />
            </div>
            <div className="grid md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="edit-issue_date">Issue Date *</Label>
                <Input
                  id="edit-issue_date"
                  type="month"
                  value={formData.issue_date}
                  onInput={(e) =>
                    setFormData({ ...formData, issue_date: (e.target as HTMLInputElement).value })
                  }
                  disabled={submitting}
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="edit-expiry_date">Expiry Date</Label>
                <Input
                  id="edit-expiry_date"
                  type="month"
                  value={formData.expiry_date}
                  onInput={(e) =>
                    setFormData({ ...formData, expiry_date: (e.target as HTMLInputElement).value })
                  }
                  disabled={submitting}
                />
              </div>
            </div>
            <div className="space-y-2">
              <Label htmlFor="edit-certificate_url">Certificate URL</Label>
              <Input
                id="edit-certificate_url"
                type="url"
                value={formData.certificate_url}
                onInput={(e) =>
                  setFormData({
                    ...formData,
                    certificate_url: (e.target as HTMLInputElement).value,
                  })
                }
                disabled={submitting}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="edit-skills">Related Skills (comma separated)</Label>
              <Input
                id="edit-skills"
                placeholder="React, TypeScript, AWS"
                value={formData.skills}
                onInput={(e) =>
                  setFormData({ ...formData, skills: (e.target as HTMLInputElement).value })
                }
                disabled={submitting}
              />
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
                Update Certification
              </Button>
            </div>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  )
}
