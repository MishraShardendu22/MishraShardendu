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
      <div className="space-y-6">
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-bold tracking-tight">Skills</h1>
            <p className="text-muted-foreground">
              Manage your technical skills and competencies.
            </p>
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
          <Alert variant="destructive">
            <AlertDescription>{error}</AlertDescription>
          </Alert>
        )}

        {success && (
          <Alert>
            <AlertDescription>{success}</AlertDescription>
          </Alert>
        )}

        {skills.length === 0 ? (
          <SkillsEmptyState onAdd={openDialog} />
        ) : (
          <div className="space-y-6">
            <SkillsOverview skills={skills} />
            <SkillsManagement skills={skills} />
            {/* Skills Categories - can be extracted as another component if needed */}
          </div>
        )}
      </div>
    </ProtectedRoute>
  )
} 