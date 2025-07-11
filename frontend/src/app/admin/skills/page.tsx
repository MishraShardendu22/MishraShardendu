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

  if (loading) return <div>Loading...</div>
  if (error) return <div>{error}</div>

  return (
    <ProtectedRoute>
      <div className="space-y-8">
        <div className="flex flex-col md:flex-row md:justify-between md:items-center gap-4 md:gap-0 pb-2 border-b border-gray-200">
          <div>
            <h1 className="text-4xl font-extrabold tracking-tight text-primary mb-1">Skills</h1>
            <p className="text-muted-foreground text-lg">Manage your technical skills and competencies.</p>
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

        {skills.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-16 animate-fade-in">
            <SkillsEmptyState onAdd={openDialog} />
          </div>
        ) : (
          <div className="space-y-8">
            <div className="shadow-md hover:shadow-xl transition-shadow duration-200 border border-gray-200 bg-white rounded-lg animate-fade-in">
              <SkillsOverview skills={skills} />
            </div>
            <div className="shadow-md hover:shadow-xl transition-shadow duration-200 border border-gray-200 bg-white rounded-lg animate-fade-in">
              <SkillsManagement skills={skills} />
            </div>
          </div>
        )}
      </div>
    </ProtectedRoute>
  )
} 