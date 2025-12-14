import { ChevronLeft, ChevronRight, Loader2, Plus } from 'lucide-react'
import { useEffect, useState } from 'preact/hooks'
import toast from 'react-hot-toast'
import { ErrorState, Loading } from '../../components/shared'
import { Alert, AlertDescription } from '../../components/ui/alert'
import { Button } from '../../components/ui/button'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '../../components/ui/dialog'
import { Input } from '../../components/ui/input'
import { Label } from '../../components/ui/label'
import { skillsAPI } from '../../utils/apiResponse.util'

export default function SkillsPage() {
  const [skills, setSkills] = useState<string[]>([])
  const [totalSkills, setTotalSkills] = useState(0)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false)
  const [newSkills, setNewSkills] = useState('')
  const [submitting, setSubmitting] = useState(false)
  const [currentPage, setCurrentPage] = useState(0)
  const itemsPerPage = 50 // 6 rows x 7 columns
  const totalPages = Math.ceil(skills.length / itemsPerPage)

  const fetchAllSkills = async () => {
    try {
      let allSkills: string[] = []
      let page = 1
      let hasMore = true
      const limit = 100 // Fetch 100 at a time

      while (hasMore) {
        const response = await skillsAPI.getSkills(page, limit)

        const skillsData = response.data?.skills || []
        allSkills = [...allSkills, ...skillsData]

        hasMore = response.data?.has_next || false
        page++

        // Safety limit
        if (page > 50) break
      }

      setSkills(allSkills)
      setTotalSkills(allSkills.length)
      setError('')
    } catch {
      setError('Failed to fetch skills')
      setSkills([])
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchAllSkills()
  }, [])

  const handleAddSkills = async (e: Event) => {
    e.preventDefault()
    if (!newSkills.trim()) {
      toast.error('Please enter at least one skill')
      return
    }

    setSubmitting(true)
    try {
      const skillsArray = newSkills
        .split(',')
        .map((s) => s.trim())
        .filter((s) => s.length > 0)

      await skillsAPI.addSkills({ skills: skillsArray })
      toast.success('Skills added successfully')
      setIsAddDialogOpen(false)
      setNewSkills('')
      // Refetch all skills
      await fetchAllSkills()
    } catch {
      toast.error('Failed to add skills')
    } finally {
      setSubmitting(false)
    }
  }

  // Note: Backend doesn't support delete skill operation
  // Skills are derived from projects, so manage them through projects

  const paginatedSkills = skills.slice(currentPage * itemsPerPage, (currentPage + 1) * itemsPerPage)

  if (loading) {
    return <Loading title="Loading Skills" description="Fetching your skills..." />
  }

  if (error && !skills.length) {
    return <ErrorState title="Failed to Load Skills" message={error} onRetry={fetchAllSkills} />
  }

  return (
    <div class="space-y-8 p-6">
      <header class="text-center space-y-6">
        <h1 class="text-2xl md:text-3xl font-heading font-extrabold bg-linear-to-r from-blue-500 via-teal-500 to-green-500 bg-clip-text text-transparent leading-tight">
          Skills - Manage your technical skills and competencies
        </h1>
        <p class="text-sm text-muted-foreground">Total Skills: {skills.length}</p>
        <Alert>
          <AlertDescription class="text-sm text-muted-foreground text-center">
            💡 Skills are automatically extracted from your projects. Add skills here to include
            them in your profile.
          </AlertDescription>
        </Alert>
      </header>

      <div class="flex flex-col md:flex-row md:justify-between md:items-center gap-4 md:gap-0 border-b pb-4">
        <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
          <DialogTrigger>
            <Button class="bg-teal-600 hover:bg-teal-700 text-white font-semibold">
              <Plus class="w-4 h-4 mr-2" />
              Add Skills
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Add Skills</DialogTitle>
              <DialogDescription>
                Enter skills separated by commas (e.g., React, TypeScript, Node.js)
              </DialogDescription>
            </DialogHeader>
            <form onSubmit={handleAddSkills} class="space-y-4">
              <div>
                <Label htmlFor="skills">Skills</Label>
                <Input
                  id="skills"
                  value={newSkills}
                  onInput={(e) => setNewSkills((e.target as HTMLInputElement).value)}
                  placeholder="React, TypeScript, Node.js"
                  required
                />
              </div>
              <div class="flex justify-end gap-2">
                <Button type="button" variant="outline" onClick={() => setIsAddDialogOpen(false)}>
                  Cancel
                </Button>
                <Button type="submit" disabled={submitting} class="bg-teal-600 hover:bg-teal-700">
                  {submitting && <Loader2 class="w-4 h-4 mr-2 animate-spin" />}
                  {submitting ? 'Adding...' : 'Add Skills'}
                </Button>
              </div>
            </form>
          </DialogContent>
        </Dialog>
      </div>

      {error && skills.length > 0 && (
        <Alert variant="destructive">
          <AlertDescription>{error}</AlertDescription>
        </Alert>
      )}

      {skills.length === 0 ? (
        <div class="flex flex-col items-center justify-center py-20 space-y-6 bg-gray-50 dark:bg-gray-900/50 rounded-xl border shadow-lg">
          <div class="w-20 h-20 rounded-full bg-teal-500/20 flex items-center justify-center">
            <Plus class="w-10 h-10 text-teal-500" />
          </div>
          <h3 class="text-3xl font-semibold">No skills yet</h3>
          <p class="text-lg text-gray-600 dark:text-gray-400 max-w-md text-center">
            Get started by adding your first skill.
          </p>
          <Button
            onClick={() => setIsAddDialogOpen(true)}
            class="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-linear-to-r from-teal-500 to-green-500 text-white shadow-lg hover:from-teal-600 hover:to-green-600 font-semibold"
          >
            <Plus class="w-5 h-5" />
            Add Skill
          </Button>
        </div>
      ) : (
        <>
          <div class="grid grid-cols-4 sm:grid-cols-5 md:grid-cols-6 lg:grid-cols-7 xl:grid-cols-8 2xl:grid-cols-10 gap-2 min-h-80">
            {paginatedSkills.map((skill) => (
              <div
                key={skill}
                class="group relative bg-secondary/10 hover:bg-secondary/20 p-2 rounded border border-border hover:border-secondary/50 transition-all duration-150 h-12.5 flex items-center justify-center"
              >
                <p class="text-center font-medium text-xs text-foreground line-clamp-2">{skill}</p>
              </div>
            ))}
          </div>

          {totalPages > 1 && (
            <div class="flex justify-center items-center gap-4 mt-4 py-3 bg-background/90 backdrop-blur-sm rounded-lg border">
              <Button
                onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 0))}
                variant="outline"
                disabled={currentPage === 0}
                class="flex items-center gap-1 h-8 text-sm"
              >
                <ChevronLeft class="w-4 h-4" />
                Prev
              </Button>

              <span class="text-sm font-medium min-w-35 text-center">
                Page {currentPage + 1} of {totalPages} ({totalSkills})
              </span>

              <Button
                onClick={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages - 1))}
                variant="outline"
                disabled={currentPage === totalPages - 1}
                class="flex items-center gap-1 h-8 text-sm"
              >
                Next
                <ChevronRight class="w-4 h-4" />
              </Button>
            </div>
          )}
        </>
      )}
    </div>
  )
}
