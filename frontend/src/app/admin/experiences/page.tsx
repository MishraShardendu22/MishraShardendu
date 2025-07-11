'use client'

import dynamic from 'next/dynamic'
const TiptapModalEditor = dynamic(() => import('../../../components/TipTap').then(mod => ({ default: mod.TiptapModalEditor })), { ssr: false })

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
import { Plus, Edit, Trash2, ExternalLink, Calendar, Building2, GraduationCap, Briefcase } from 'lucide-react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import * as z from 'zod'
import Image from 'next/image'
import { Checkbox } from '../../../components/ui/checkbox';
import { projectsAPI } from '../../../util/apiResponse.util';
import { skillsAPI } from '../../../util/apiResponse.util';
import { Popover, PopoverTrigger, PopoverContent } from '../../../components/ui/popover';
import Link from 'next/link';
import { ExperienceAddDialog, ExperienceEmptyState } from '../../../components/admin/experiences';

const experienceSchema = z.object({
  company_name: z.string().min(1, 'Company name is required'),
  position: z.string().min(1, 'Position is required'),
  start_date: z.string().min(1, 'Start date is required'),
  end_date: z.string().min(1, 'End date is required'),
  description: z.string().min(1, 'Description is required'),
  technologies: z.array(z.string()).min(1, 'At least one technology is required'),
  company_logo: z.string().url('Must be a valid URL'),
  certificate_url: z.string().url('Must be a valid URL'),
  projects: z.array(z.string()),
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
  const [allProjects, setAllProjects] = useState<{ id: string; name: string }[]>([]);
  const [allSkills, setAllSkills] = useState<string[]>([]);

  const {
    register,
    handleSubmit,
    reset,
    setValue,
    watch,
    formState: { errors },
  } = useForm<ExperienceFormData>({
    resolver: zodResolver(experienceSchema),
    defaultValues: { projects: [], technologies: [] },
  })

  const selectedProjects = watch('projects') || [];
  const selectedTechnologies = watch('technologies') || [];

  const fetchExperiences = async () => {
    try {
      const response = await experiencesAPI.getAllExperiences()
      setExperiences(Array.isArray(response.data) ? response.data : (response.data === null ? [] : []))
    } catch (error) {
      setError('Failed to fetch experiences')
      setExperiences([])
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchExperiences()
    // Fetch all projects for dropdown
    const fetchProjects = async () => {
      const projectsRes = await projectsAPI.getAllProjects();
      setAllProjects(Array.isArray(projectsRes.data) ? projectsRes.data.map((p: any) => ({ id: p.inline.id, name: p.project_name })) : []);
    };
    fetchProjects();
    // Fetch all skills for technologies
    const fetchSkills = async () => {
      const skillsRes = await skillsAPI.getSkills();
      setAllSkills(Array.isArray(skillsRes.data) ? skillsRes.data : []);
    };
    fetchSkills();
  }, [])

  if (loading) return (
    <div className="min-h-[40vh] flex items-center justify-center">
      <div className="animate-spin rounded-full h-12 w-12 border-t-4 border-primary border-solid"></div>
    </div>
  )
  if (error) return (
    <div className="min-h-[40vh] flex flex-col items-center justify-center gap-4">
      <div className="w-20 h-20 rounded-full bg-destructive/10 flex items-center justify-center">
        <span className="text-4xl">😢</span>
      </div>
      <div className="text-center space-y-2">
        <h2 className="text-2xl font-heading text-foreground">Oops! Something went wrong</h2>
        <p className="text-muted-foreground text-lg">{error}</p>
      </div>
    </div>
  )

  const onSubmit = async (data: ExperienceFormData) => {
    try {
      const experienceData: CreateExperienceRequest = {
        ...data,
        technologies: data.technologies,
        projects: data.projects,
        images: data.images.split(',').map(img => img.trim()),
      }

      if (editingExperience) {
        await experiencesAPI.updateExperience(editingExperience.inline.id, experienceData)
        setSuccess('Experience updated successfully')
      } else {
        await experiencesAPI.createExperience(experienceData)
        setSuccess('Experience created successfully')
      }

      setIsDialogOpen(false)
      setEditingExperience(null)
      reset({ projects: [], technologies: [] })
      fetchExperiences()
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
      technologies: experience.technologies,
      company_logo: experience.company_logo,
      certificate_url: experience.certificate_url,
      projects: experience.projects,
      images: experience.images.join(', '),
    })
    setIsDialogOpen(true)
  }

  const handleDelete = async (experienceId: string) => {
    if (confirm('Are you sure you want to delete this experience?')) {
      try {
        await experiencesAPI.deleteExperience(experienceId)
        setSuccess('Experience deleted successfully')
        fetchExperiences()
      } catch (error) {
        console.error('Error deleting experience:', error)
        setError('Failed to delete experience')
      }
    }
  }

  const openDialog = () => {
    setEditingExperience(null)
    reset({ projects: [], technologies: [] })
    setIsDialogOpen(true)
  }

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
    })
  }

  return (
    <ProtectedRoute>
      <div className="space-y-12">
        <div className="text-center mb-12 space-y-8">
          <div className="inline-flex items-center gap-3 px-6 py-3 rounded-full bg-secondary/10 border border-secondary/20 backdrop-blur-sm">
            <span className="text-base font-medium text-secondary">Experience Management</span>
          </div>
          <h1 className="text-5xl md:text-7xl font-heading font-bold bg-gradient-to-r from-secondary via-primary to-accent bg-clip-text text-transparent leading-tight">
            Experiences
          </h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto leading-relaxed">
            Manage your professional experiences and work history.
          </p>
        </div>

        <div className="flex flex-col md:flex-row md:justify-between md:items-center gap-4 md:gap-0 pb-2 border-b border-border">
          <div>
            <h2 className="text-3xl font-bold text-secondary mb-1">Your Experiences</h2>
            <p className="text-muted-foreground text-lg">Add, edit, or remove your professional experiences below.</p>
          </div>
          <ExperienceAddDialog
            open={isDialogOpen}
            setOpen={setIsDialogOpen}
            onSubmit={onSubmit}
            errors={errors}
            register={register}
            handleSubmit={handleSubmit}
            reset={reset}
            setValue={setValue}
            watch={watch}
            editingExperience={editingExperience}
            allSkills={allSkills}
            allProjects={allProjects}
            openDialog={openDialog}
          />
        </div>

        {success && (
          <Alert className="animate-fade-in">
            <AlertDescription>{success}</AlertDescription>
          </Alert>
        )}
        {error && (
          <Alert variant="destructive" className="animate-fade-in">
            <AlertDescription>{error}</AlertDescription>
          </Alert>
        )}

        {experiences.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-16 animate-fade-in">
            <GraduationCap className="mx-auto h-16 w-16 text-muted-foreground mb-4" />
            <h3 className="text-2xl font-semibold text-foreground mb-2">No experiences yet</h3>
            <p className="text-lg text-muted-foreground mb-6">Get started by adding your first experience.</p>
            <Button onClick={openDialog} className="shadow-md hover:shadow-xl transition-all duration-200">
              <Plus className="mr-2 h-5 w-5" />
              Add Experience
            </Button>
          </div>
        ) : (
          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
            {experiences.map((experience, index) => (
              <Card key={experience.inline?.id || experience.inline.id} className="group relative overflow-hidden border-2 border-border/50 hover:border-secondary/50 transition-all duration-500 hover:shadow-2xl hover:shadow-secondary/10 hover:-translate-y-2 bg-gradient-to-br from-card/50 to-card backdrop-blur-sm rounded-2xl animate-fade-in flex flex-col">
                <CardHeader className="bg-gradient-to-r from-secondary/10 to-card pb-2">
                  <CardTitle className="text-2xl font-semibold text-secondary flex items-center gap-2">
                    <Briefcase className="h-5 w-5 text-secondary" />
                    {experience.position}
                  </CardTitle>
                  <CardDescription className="text-muted-foreground">
                    {experience.company_name} &bull; {formatDate(experience.start_date)} to {formatDate(experience.end_date)}
                  </CardDescription>
                </CardHeader>
                <CardContent className="flex-1 flex flex-col gap-4 p-5">
                  <p className="text-base text-foreground line-clamp-4">
                    {experience.description.length > 180 
                      ? `${experience.description.substring(0, 180)}...` 
                      : experience.description
                    }
                  </p>
                  <div className="flex flex-wrap gap-2 mb-2">
                    {experience.technologies.map((tech, idx) => (
                      <Badge key={idx} variant="secondary" className="text-xs px-2 py-1 rounded-full bg-secondary/10 text-secondary border border-secondary/20">
                        {tech}
                      </Badge>
                    ))}
                  </div>
                  <div className="flex gap-2 mt-auto">
                    <Button size="sm" variant="outline" onClick={() => handleEdit(experience)} className="flex-1">
                      <Edit className="h-4 w-4 mr-1" /> Edit
                    </Button>
                    <Button size="sm" variant="destructive" onClick={() => handleDelete(experience.inline.id)} className="flex-1">
                      <Trash2 className="h-4 w-4 mr-1" /> Delete
                    </Button>
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