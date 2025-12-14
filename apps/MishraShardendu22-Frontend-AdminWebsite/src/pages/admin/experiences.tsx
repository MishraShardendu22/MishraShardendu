import { Briefcase, ChevronLeft, ChevronRight, Edit, Plus, Trash2 } from 'lucide-react'
import { useEffect, useState } from 'preact/hooks'
import { route } from 'preact-router'
import toast from 'react-hot-toast'
import { Loading } from '../../components/shared'
import { Badge } from '../../components/ui/badge'
import { Button } from '../../components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../../components/ui/card'
import type { Experience } from '../../types/types.data'
import { experiencesAPI } from '../../utils/apiResponse.util'

export default function ExperiencesPage() {
  const [experiences, setExperiences] = useState<Experience[]>([])
  const [loading, setLoading] = useState(true)
  const [page, setPage] = useState(1)
  const limit = 8

  const fetchExperiences = async () => {
    try {
      let allExperiences: Experience[] = []
      let currentPage = 1
      let hasMore = true

      while (hasMore) {
        const response = await experiencesAPI.getAllExperiences(currentPage, 100)
        const experiencesData = response.data?.experiences || []
        allExperiences = [...allExperiences, ...experiencesData]
        hasMore = response.data?.has_next || false
        currentPage++
        if (currentPage > 50) break
      }

      setExperiences(allExperiences)
    } catch {
      toast.error('Failed to fetch experiences')
      setExperiences([])
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchExperiences()
  }, [])

  const handleDelete = async (id: string) => {
    if (!confirm('Are you sure you want to delete this experience?')) return

    try {
      await experiencesAPI.deleteExperience(id)
      toast.success('Experience deleted successfully!')
      fetchExperiences()
      if ((page - 1) * limit >= experiences.length - 1 && page > 1) setPage(page - 1)
    } catch {
      toast.error('Failed to delete experience')
    }
  }

  const totalPages = Math.ceil(experiences.length / limit)
  const currentData = experiences.slice((page - 1) * limit, page * limit)

  if (loading) {
    return <Loading title="Loading Experiences" description="Fetching your experience data..." />
  }

  return (
    <div className="space-y-12 w-[90%] mx-auto px-4 sm:px-6 lg:px-8">
      <div className="text-center mb-12 space-y-8">
        <h1 className="text-2xl md:text-3xl font-heading font-bold bg-linear-to-r from-secondary via-primary to-accent bg-clip-text text-transparent leading-tight">
          Experiences - Manage your professional experiences and work history.
        </h1>
      </div>

      <div className="flex flex-col md:flex-row md:justify-between md:items-center gap-4 md:gap-0 pb-2 border-b border-border">
        <Button
          onClick={() => route('/admin/experiences/new')}
          className="shadow-md hover:shadow-xl transition-all duration-200 flex items-center"
        >
          <Plus className="mr-2 h-5 w-5" /> Add Experience
        </Button>
      </div>

      {experiences.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-16 animate-fade-in">
          <Briefcase className="mx-auto h-16 w-16 text-foreground mb-4" />
          <h3 className="text-2xl font-semibold text-foreground mb-2">No experiences yet</h3>
          <p className="text-lg text-foreground mb-6">
            Get started by adding your first experience.
          </p>
          <Button onClick={() => route('/admin/experiences/new')} className="flex items-center">
            <Plus className="mr-2 h-5 w-5" /> Add Experience
          </Button>
        </div>
      ) : (
        <>
          <div className="grid gap-6 grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {currentData.map((exp) => (
              <Card
                key={exp.inline?.id || exp.inline.id}
                className="group relative overflow-hidden border hover:border-secondary/50 transition-all duration-200 hover:shadow-lg bg-card rounded-xl h-62.5 w-full flex flex-col"
              >
                <CardHeader className="p-4 pb-2">
                  <CardTitle className="text-base font-semibold text-secondary line-clamp-2">
                    {exp.experience_time_line?.[0]?.position ?? 'Position'}
                  </CardTitle>
                  <CardDescription className="text-sm text-muted-foreground">
                    {exp.company_name}
                  </CardDescription>
                </CardHeader>
                <CardContent className="flex-1 flex flex-col p-4 pt-2 overflow-hidden">
                  <p className="text-xs text-muted-foreground mb-3 line-clamp-2">
                    {exp.description}
                  </p>
                  <div className="flex flex-wrap gap-1.5 mb-3">
                    {exp.technologies.slice(0, 4).map((tech, idx) => (
                      <Badge key={idx} variant="secondary" className="text-xs px-2 py-0.5">
                        {tech}
                      </Badge>
                    ))}
                    {exp.technologies.length > 4 && (
                      <Badge variant="outline" className="text-xs px-2 py-0.5">
                        +{exp.technologies.length - 4}
                      </Badge>
                    )}
                  </div>
                  <div className="flex gap-2 mt-auto">
                    <Button
                      size="sm"
                      variant="outline"
                      onClick={() => route(`/admin/experiences/edit/${exp.inline.id}`)}
                      className="flex-1 h-9"
                    >
                      <Edit className="h-4 w-4 mr-1" /> Edit
                    </Button>
                    <Button
                      size="sm"
                      variant="destructive"
                      onClick={() => handleDelete(exp.inline.id)}
                      className="flex-1 h-9"
                    >
                      <Trash2 className="h-4 w-4 mr-1" /> Delete
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Fixed pagination at bottom */}
          <div className="sticky bottom-4 flex justify-center items-center gap-4 mt-8 py-4 bg-background/80 backdrop-blur-sm rounded-xl border shadow-lg">
            <Button
              variant="outline"
              disabled={page === 1}
              onClick={() => setPage((p) => Math.max(1, p - 1))}
              className="flex items-center gap-1 min-w-25"
            >
              <ChevronLeft className="h-4 w-4" /> Prev
            </Button>
            <span className="text-foreground font-medium min-w-30 text-center">
              Page {page} of {totalPages || 1}
            </span>
            <Button
              variant="outline"
              disabled={page === totalPages || totalPages === 0}
              onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
              className="flex items-center gap-1 min-w-25"
            >
              Next <ChevronRight className="h-4 w-4" />
            </Button>
          </div>
        </>
      )}
    </div>
  )
}
