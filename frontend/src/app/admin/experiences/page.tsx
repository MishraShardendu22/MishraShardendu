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

  if (loading) return <div>Loading...</div>
  if (error) return <div>{error}</div>

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
      <div className="space-y-8">
        <div className="flex flex-col md:flex-row md:justify-between md:items-center gap-4 md:gap-0 pb-2 border-b border-gray-200">
          <div>
            <h1 className="text-4xl font-extrabold tracking-tight text-primary mb-1">Experiences</h1>
            <p className="text-muted-foreground text-lg">Manage your professional experiences and work history.</p>
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

        {error && (
          <Alert variant="destructive" className="animate-fade-in">
            <AlertDescription>{error}</AlertDescription>
          </Alert>
        )}

        {success && (
          <Alert className="animate-fade-in">
            <AlertDescription>{success}</AlertDescription>
          </Alert>
        )}

        {experiences.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-16 animate-fade-in">
            <ExperienceEmptyState onAdd={openDialog} />
          </div>
        ) : (
          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
            {experiences.map((experience) => (
              <Card key={experience.inline?.id || experience.inline.id} className="flex flex-col overflow-hidden shadow-md hover:shadow-xl transition-shadow duration-200 border border-gray-200 bg-white animate-fade-in">
                <CardHeader className="bg-gradient-to-r from-yellow-50 to-white pb-2">
                  <CardTitle className="text-2xl font-semibold text-primary flex items-center gap-2">
                    <Briefcase className="h-5 w-5 text-yellow-500" />
                    {experience.position}
                  </CardTitle>
                  <CardDescription className="text-gray-500">
                    {experience.company_name} &bull; {experience.start_date} to {experience.end_date}
                  </CardDescription>
                </CardHeader>
                <CardContent className="flex-1 flex flex-col gap-4 p-5">
                  <p className="text-base text-gray-700 line-clamp-4">
                    {experience.description.length > 180 
                      ? `${experience.description.substring(0, 180)}...` 
                      : experience.description
                    }
                  </p>
                  <div className="flex flex-wrap gap-2">
                    {experience.technologies.map((tech, index) => (
                      <Badge key={index} variant="secondary" className="text-xs px-2 py-1 rounded-full bg-yellow-50 text-yellow-700 border border-yellow-200">
                        {tech}
                      </Badge>
                    ))}
                  </div>
                  <div className="flex gap-2 pt-2 mt-auto">
                    <Link href={`/admin/experiences/${experience.inline?.id || experience.inline.id}`}>
                      <Button variant="outline" size="sm" className="flex-1">
                        View Details
                      </Button>
                    </Link>
                    <Button 
                      variant="outline" 
                      size="sm" 
                      onClick={() => handleEdit(experience)}
                      className="flex-1"
                      aria-label="Edit experience"
                    >
                      <Edit className="h-4 w-4" />
                    </Button>
                    <Button 
                      variant="outline" 
                      size="sm" 
                      onClick={() => handleDelete(experience.inline?.id || experience.inline.id)}
                      className="text-red-600 hover:text-red-700"
                      aria-label="Delete experience"
                    >
                      <Trash2 className="h-4 w-4" />
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