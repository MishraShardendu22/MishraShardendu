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
          <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
            <DialogTrigger asChild>
              <Button onClick={openDialog}>
                <Plus className="mr-2 h-4 w-4" />
                Add Skills
              </Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Add New Skills</DialogTitle>
                <DialogDescription>
                  Add new skills to your portfolio. Separate multiple skills with commas.
                </DialogDescription>
              </DialogHeader>
              <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="skills">Skills (comma-separated)</Label>
                  <Input
                    id="skills"
                    {...register('skills')}
                    placeholder="JavaScript, React, Node.js, MongoDB"
                  />
                  {errors.skills && (
                    <p className="text-sm text-red-500">{errors.skills.message}</p>
                  )}
                </div>

                <div className="flex justify-end space-x-2">
                  <Button type="button" variant="outline" onClick={() => setIsDialogOpen(false)}>
                    Cancel
                  </Button>
                  <Button type="submit">
                    Add Skills
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

        {skills.length === 0 ? (
          <Card>
            <CardContent className="text-center py-12">
              <Settings className="mx-auto h-12 w-12 text-gray-400 mb-4" />
              <h3 className="text-lg font-medium text-gray-900 mb-2">No skills yet</h3>
              <p className="text-gray-500 mb-4">
                Get started by adding your technical skills and competencies.
              </p>
              <Button onClick={openDialog}>
                <Plus className="mr-2 h-4 w-4" />
                Add Your First Skills
              </Button>
            </CardContent>
          </Card>
        ) : (
          <div className="space-y-6">
            {/* Skills Overview */}
            <Card>
              <CardHeader>
                <CardTitle>Skills Overview</CardTitle>
                <CardDescription>
                  You have {skills.length} skill{skills.length !== 1 ? 's' : ''} in your portfolio
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex flex-wrap gap-2">
                  {skills.map((skill, index) => (
                    <Badge key={index} variant="secondary" className="text-sm">
                      {skill}
                    </Badge>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Skills Management */}
            <Card>
              <CardHeader>
                <CardTitle>Manage Skills</CardTitle>
                <CardDescription>
                  Add new skills or remove existing ones from your portfolio
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                  {skills.map((skill, index) => (
                    <div
                      key={index}
                      className="flex items-center justify-between p-3 border rounded-lg"
                    >
                      <span className="font-medium">{skill}</span>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Skills Categories */}
            <Card>
              <CardHeader>
                <CardTitle>Skills by Category</CardTitle>
                <CardDescription>
                  Your skills organized by common categories
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                  {/* Programming Languages */}
                  <div>
                    <h4 className="font-semibold mb-2">Programming Languages</h4>
                    <div className="flex flex-wrap gap-1">
                      {skills
                        .filter(skill => 
                          ['JavaScript', 'TypeScript', 'Python', 'Go', 'Java', 'C++', 'C#', 'PHP', 'Ruby', 'Swift', 'Kotlin', 'Rust'].includes(skill)
                        )
                        .map((skill, index) => (
                          <Badge key={index} variant="outline" className="text-xs">
                            {skill}
                          </Badge>
                        ))}
                    </div>
                  </div>

                  {/* Frameworks & Libraries */}
                  <div>
                    <h4 className="font-semibold mb-2">Frameworks & Libraries</h4>
                    <div className="flex flex-wrap gap-1">
                      {skills
                        .filter(skill => 
                          ['React', 'Vue', 'Angular', 'Node.js', 'Express', 'Django', 'Flask', 'Spring', 'Laravel', 'Next.js', 'Nuxt.js'].includes(skill)
                        )
                        .map((skill, index) => (
                          <Badge key={index} variant="outline" className="text-xs">
                            {skill}
                          </Badge>
                        ))}
                    </div>
                  </div>

                  {/* Databases */}
                  <div>
                    <h4 className="font-semibold mb-2">Databases</h4>
                    <div className="flex flex-wrap gap-1">
                      {skills
                        .filter(skill => 
                          ['MongoDB', 'PostgreSQL', 'MySQL', 'Redis', 'SQLite', 'Oracle', 'SQL Server', 'DynamoDB'].includes(skill)
                        )
                        .map((skill, index) => (
                          <Badge key={index} variant="outline" className="text-xs">
                            {skill}
                          </Badge>
                        ))}
                    </div>
                  </div>

                  {/* DevOps & Tools */}
                  <div>
                    <h4 className="font-semibold mb-2">DevOps & Tools</h4>
                    <div className="flex flex-wrap gap-1">
                      {skills
                        .filter(skill => 
                          ['Docker', 'Kubernetes', 'AWS', 'Azure', 'GCP', 'Git', 'Jenkins', 'CI/CD', 'Terraform', 'Ansible'].includes(skill)
                        )
                        .map((skill, index) => (
                          <Badge key={index} variant="outline" className="text-xs">
                            {skill}
                          </Badge>
                        ))}
                    </div>
                  </div>

                  {/* Other Skills */}
                  <div>
                    <h4 className="font-semibold mb-2">Other Skills</h4>
                    <div className="flex flex-wrap gap-1">
                      {skills
                        .filter(skill => 
                          !['JavaScript', 'TypeScript', 'Python', 'Go', 'Java', 'C++', 'C#', 'PHP', 'Ruby', 'Swift', 'Kotlin', 'Rust', 'React', 'Vue', 'Angular', 'Node.js', 'Express', 'Django', 'Flask', 'Spring', 'Laravel', 'Next.js', 'Nuxt.js', 'MongoDB', 'PostgreSQL', 'MySQL', 'Redis', 'SQLite', 'Oracle', 'SQL Server', 'DynamoDB', 'Docker', 'Kubernetes', 'AWS', 'Azure', 'GCP', 'Git', 'Jenkins', 'CI/CD', 'Terraform', 'Ansible'].includes(skill)
                        )
                        .map((skill, index) => (
                          <Badge key={index} variant="outline" className="text-xs">
                            {skill}
                          </Badge>
                        ))}
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        )}
      </div>
    </ProtectedRoute>
  )
} 