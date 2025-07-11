'use client'

import { useEffect, useState } from 'react'
import { ProtectedRoute } from '../../../components/auth/protected-route'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../../../components/ui/card'
import { Button } from '../../../components/ui/button'
import { Badge } from '../../../components/ui/badge'
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '../../../components/ui/dialog'
import { Input } from '../../../components/ui/input'
import { Label } from '../../../components/ui/label'
import { Alert, AlertDescription } from '../../../components/ui/alert'
import { skillsAPI } from '../../../util/apiResponse.util'
import { Plus, Settings, X } from 'lucide-react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import * as z from 'zod'
import { SkillsAddDialog, SkillsOverview, SkillsManagement, SkillsEmptyState } from '../../../components/admin/skills';

const skillsSchema = z.object({
  skills: z.string().min(1, 'Skills are required'),
})

type SkillsFormData = z.infer<typeof skillsSchema>

export default function AdminSkillsPage() {
  const [skills, setSkills] = useState<string[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')
  const [success, setSuccess] = useState('')
  const [isDialogOpen, setIsDialogOpen] = useState(false)

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<SkillsFormData>({
    resolver: zodResolver(skillsSchema),
  })

  const fetchSkills = async () => {
    try {
      const response = await skillsAPI.getSkills()
      console.log('Fetched skills:', response.data)

      setSkills(Array.isArray(response.data) ? response.data : [])
    } catch (error) {
      setError('Failed to fetch skills')
      setSkills([])
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchSkills()
  }, [])

  const onSubmit = async (data: SkillsFormData) => {
    try {
      const skillsArray = data.skills.split(',').map(skill => skill.trim()).filter(skill => skill.length > 0)
      
      await skillsAPI.addSkills({ skills: skillsArray })
      setSuccess('Skills added successfully')
      setIsDialogOpen(false)
      reset()
      fetchSkills()
    } catch (error) {
      console.error('Error adding skills:', error)
      setError('Failed to add skills')
    }
  }

  const openDialog = () => {
    reset()
    setIsDialogOpen(true)
  }

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

  return (
    <ProtectedRoute>
      <div className="space-y-12">
        <div className="text-center mb-12 space-y-8">
          <div className="inline-flex items-center gap-3 px-6 py-3 rounded-full bg-accent/10 border border-accent/20 backdrop-blur-sm">
            <span className="text-base font-medium text-accent">Skills Management</span>
          </div>
          <h1 className="text-5xl md:text-7xl font-heading font-bold bg-gradient-to-r from-accent via-primary to-secondary bg-clip-text text-transparent leading-tight">
            Skills
          </h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto leading-relaxed">
            Manage your technical skills and competencies.
          </p>
        </div>

        <div className="flex flex-col md:flex-row md:justify-between md:items-center gap-4 md:gap-0 pb-2 border-b border-border">
          <div>
            <h2 className="text-3xl font-bold text-accent mb-1">Your Skills</h2>
            <p className="text-muted-foreground text-lg">Add, edit, or remove your skills below.</p>
          </div>
          <SkillsAddDialog
            open={isDialogOpen}
            setOpen={setIsDialogOpen}
            onSubmit={onSubmit}
            errors={errors}
            register={register}
            handleSubmit={handleSubmit}
            reset={reset}
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

        {skills.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-16 animate-fade-in">
            <Settings className="mx-auto h-16 w-16 text-muted-foreground mb-4" />
            <h3 className="text-2xl font-semibold text-foreground mb-2">No skills yet</h3>
            <p className="text-lg text-muted-foreground mb-6">Get started by adding your first skill.</p>
            <Button onClick={openDialog} className="shadow-md hover:shadow-xl transition-all duration-200">
              <Plus className="mr-2 h-5 w-5" />
              Add Skill
            </Button>
          </div>
        ) : (
          <div className="space-y-8">
            <div className="group relative overflow-hidden border-2 border-border/50 hover:border-accent/50 transition-all duration-500 hover:shadow-2xl hover:shadow-accent/10 hover:-translate-y-2 bg-gradient-to-br from-card/50 to-card backdrop-blur-sm rounded-2xl animate-fade-in">
              <SkillsOverview skills={skills} />
            </div>
            <div className="group relative overflow-hidden border-2 border-border/50 hover:border-accent/50 transition-all duration-500 hover:shadow-2xl hover:shadow-accent/10 hover:-translate-y-2 bg-gradient-to-br from-card/50 to-card backdrop-blur-sm rounded-2xl animate-fade-in">
              <SkillsManagement skills={skills} />
            </div>
          </div>
        )}
      </div>
    </ProtectedRoute>
  )
} 