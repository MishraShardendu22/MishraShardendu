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
import { experiencesAPI } from '../../../util/apiResponse.util'
import { Experience, CreateExperienceRequest } from '../../../data/types.data'
import { Plus, Edit, Trash2, ExternalLink, Calendar, Building2, GraduationCap } from 'lucide-react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import * as z from 'zod'
import Image from 'next/image'

const experienceSchema = z.object({
  company_name: z.string().min(1, 'Company name is required'),
  position: z.string().min(1, 'Position is required'),
  start_date: z.string().min(1, 'Start date is required'),
  end_date: z.string().min(1, 'End date is required'),
  description: z.string().min(1, 'Description is required'),
  technologies: z.string().min(1, 'Technologies are required'),
  company_logo: z.string().url('Must be a valid URL'),
  certificate_url: z.string().url('Must be a valid URL'),
  images: z.string().min(1, 'Images are required'),
})

type ExperienceFormData = z.infer<typeof experienceSchema>

export default function AdminExperiencesPage() {
  const [experiences, setExperiences] = useState<Experience[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')
  const [success, setSuccess] = useState('')
  const [isDialogOpen, setIsDialogOpen] = useState(false)
  const [editingExperience, setEditingExperience] = useState<Experience | null>(null)

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<ExperienceFormData>({
    resolver: zodResolver(experienceSchema),
  })

  const fetchData = async () => {
    try {
      const experiencesRes = await experiencesAPI.getAllExperiences()
      setExperiences(experiencesRes.data)
    } catch (error) {
      console.error('Error fetching data:', error)
      setError('Failed to fetch data')
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchData()
  }, [])

  const onSubmit = async (data: ExperienceFormData) => {
    try {
      const experienceData: CreateExperienceRequest = {
        ...data,
        technologies: data.technologies.split(',').map(tech => tech.trim()),
        images: data.images.split(',').map(img => img.trim()),
      }

      if (editingExperience) {
        await experiencesAPI.updateExperience(editingExperience._id, experienceData)
        setSuccess('Experience updated successfully')
      } else {
        await experiencesAPI.createExperience(experienceData)
        setSuccess('Experience created successfully')
      }

      setIsDialogOpen(false)
      setEditingExperience(null)
      reset()
      fetchData()
    } catch (error) {
      console.error('Error saving experience:', error)
      setError('Failed to save experience')
    }
  }

  const handleEdit = (experience: Experience) => {
    setEditingExperience(experience)
    reset({
      company_name: experience.company_name,
      position: experience.position,
      start_date: experience.start_date,
      end_date: experience.end_date,
      description: experience.description,
      technologies: experience.technologies.join(', '),
      company_logo: experience.company_logo,
      certificate_url: experience.certificate_url,
      images: experience.images.join(', '),
    })
    setIsDialogOpen(true)
  }

  const handleDelete = async (experienceId: string) => {
    if (confirm('Are you sure you want to delete this experience?')) {
      try {
        await experiencesAPI.deleteExperience(experienceId)
        setSuccess('Experience deleted successfully')
        fetchData()
      } catch (error) {
        console.error('Error deleting experience:', error)
        setError('Failed to delete experience')
      }
    }
  }

  const openDialog = () => {
    setEditingExperience(null)
    reset()
    setIsDialogOpen(true)
  }

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
    })
  }

  if (loading) {
    return (
      <ProtectedRoute>
        <div className="flex items-center justify-center h-64">
          <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-gray-900"></div>
        </div>
      </ProtectedRoute>
    )
  }

  return (
    <ProtectedRoute>
      <div className="space-y-6">
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-bold tracking-tight">Experiences</h1>
            <p className="text-muted-foreground">
              Manage your work experiences and professional background.
            </p>
          </div>
          <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
            <DialogTrigger asChild>
              <Button onClick={openDialog}>
                <Plus className="mr-2 h-4 w-4" />
                Add Experience
              </Button>
            </DialogTrigger>
            <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
              <DialogHeader>
                <DialogTitle>
                  {editingExperience ? 'Edit Experience' : 'Add New Experience'}
                </DialogTitle>
                <DialogDescription>
                  {editingExperience ? 'Update your experience details.' : 'Add a new work experience to your portfolio.'}
                </DialogDescription>
              </DialogHeader>
              <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="company_name">Company Name</Label>
                    <Input
                      id="company_name"
                      {...register('company_name')}
                      placeholder="Tech Company Inc."
                    />
                    {errors.company_name && (
                      <p className="text-sm text-red-500">{errors.company_name.message}</p>
                    )}
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="position">Position</Label>
                    <Input
                      id="position"
                      {...register('position')}
                      placeholder="Senior Developer"
                    />
                    {errors.position && (
                      <p className="text-sm text-red-500">{errors.position.message}</p>
                    )}
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="start_date">Start Date</Label>
                    <Input
                      id="start_date"
                      type="date"
                      {...register('start_date')}
                    />
                    {errors.start_date && (
                      <p className="text-sm text-red-500">{errors.start_date.message}</p>
                    )}
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="end_date">End Date</Label>
                    <Input
                      id="end_date"
                      type="date"
                      {...register('end_date')}
                    />
                    {errors.end_date && (
                      <p className="text-sm text-red-500">{errors.end_date.message}</p>
                    )}
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="description">Description</Label>
                  <Textarea
                    id="description"
                    {...register('description')}
                    placeholder="Describe your role and responsibilities"
                    rows={4}
                  />
                  {errors.description && (
                    <p className="text-sm text-red-500">{errors.description.message}</p>
                  )}
                </div>

                <div className="space-y-2">
                  <Label htmlFor="technologies">Technologies (comma-separated)</Label>
                  <Input
                    id="technologies"
                    {...register('technologies')}
                    placeholder="React, Node.js, MongoDB, Docker"
                  />
                  {errors.technologies && (
                    <p className="text-sm text-red-500">{errors.technologies.message}</p>
                  )}
                </div>

                <div className="space-y-2">
                  <Label htmlFor="company_logo">Company Logo URL</Label>
                  <Input
                    id="company_logo"
                    {...register('company_logo')}
                    placeholder="https://example.com/logo.png"
                  />
                  {errors.company_logo && (
                    <p className="text-sm text-red-500">{errors.company_logo.message}</p>
                  )}
                </div>

                <div className="space-y-2">
                  <Label htmlFor="certificate_url">Certificate URL</Label>
                  <Input
                    id="certificate_url"
                    {...register('certificate_url')}
                    placeholder="https://example.com/certificate.pdf"
                  />
                  {errors.certificate_url && (
                    <p className="text-sm text-red-500">{errors.certificate_url.message}</p>
                  )}
                </div>

                <div className="space-y-2">
                  <Label htmlFor="images">Image URLs (comma-separated)</Label>
                  <Input
                    id="images"
                    {...register('images')}
                    placeholder="https://example.com/image1.jpg, https://example.com/image2.jpg"
                  />
                  {errors.images && (
                    <p className="text-sm text-red-500">{errors.images.message}</p>
                  )}
                </div>

                <div className="flex justify-end space-x-2">
                  <Button type="button" variant="outline" onClick={() => setIsDialogOpen(false)}>
                    Cancel
                  </Button>
                  <Button type="submit">
                    {editingExperience ? 'Update Experience' : 'Create Experience'}
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

        {experiences.length === 0 ? (
          <Card>
            <CardContent className="text-center py-12">
              <GraduationCap className="mx-auto h-12 w-12 text-gray-400 mb-4" />
              <h3 className="text-lg font-medium text-gray-900 mb-2">No experiences yet</h3>
              <p className="text-gray-500 mb-4">
                Get started by adding your first work experience.
              </p>
              <Button onClick={openDialog}>
                <Plus className="mr-2 h-4 w-4" />
                Add Your First Experience
              </Button>
            </CardContent>
          </Card>
        ) : (
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {experiences.map((experience) => (
              <Card key={experience._id} className="overflow-hidden">
                <CardHeader>
                  <div className="flex justify-between items-start">
                    <div className="flex-1">
                      <CardTitle className="text-lg">{experience.position}</CardTitle>
                      <CardDescription className="mt-2 flex items-center">
                        <Building2 className="h-4 w-4 mr-1" />
                        {experience.company_name}
                      </CardDescription>
                    </div>
                    <div className="flex space-x-1">
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => handleEdit(experience)}
                      >
                        <Edit className="h-4 w-4" />
                      </Button>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => handleDelete(experience._id)}
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-center text-sm text-gray-500">
                    <Calendar className="h-4 w-4 mr-1" />
                    {formatDate(experience.start_date)} - {formatDate(experience.end_date)}
                  </div>
                  
                  <div className="flex flex-wrap gap-2">
                    {experience.technologies.map((tech, index) => (
                      <Badge key={index} variant="secondary">
                        {tech}
                      </Badge>
                    ))}
                  </div>
                  
                  <p className="text-sm text-gray-600 line-clamp-3">
                    {experience.description}
                  </p>

                  <div className="flex space-x-2">
                    {experience.certificate_url && (
                      <a
                        href={experience.certificate_url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-blue-600 hover:text-blue-800"
                      >
                        <ExternalLink className="h-4 w-4" />
                      </a>
                    )}
                    {experience.company_logo && (
                      <div className="relative h-8 w-8">
                        <Image
                          src={experience.company_logo}
                          alt={`${experience.company_name} logo`}
                          fill
                          className="object-contain"
                        />
                      </div>
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