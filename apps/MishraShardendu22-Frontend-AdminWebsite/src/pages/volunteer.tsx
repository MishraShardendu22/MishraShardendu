import { ChevronLeft, ChevronRight, Edit, Trash2 } from 'lucide-react'
import { useEffect, useState } from 'preact/hooks'
import { route } from 'preact-router'
import toast from 'react-hot-toast'
import { Loading } from '../components/shared'
import { Badge } from '../components/ui/badge'
import { Button } from '../components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../components/ui/card'
import type { VolunteerExperience } from '../types/types.data'
import { volunteerExperiencesAPI } from '../utils/apiResponse.util'

export default function VolunteerPage() {
  const [items, setItems] = useState<VolunteerExperience[]>([])
  const [loading, setLoading] = useState(true)
  const [page, setPage] = useState(1)
  const limit = 8

  const fetch = async () => {
    try {
      let allVolunteer: VolunteerExperience[] = []
      let currentPage = 1
      let hasMore = true

      while (hasMore) {
        const res = await volunteerExperiencesAPI.getAllVolunteerExperiences(currentPage, 100)
        // Backend may use 'experiences' or 'volunteer_experiences' key
        const volunteerData = res.data?.experiences || res.data?.volunteer_experiences || []
        allVolunteer = [...allVolunteer, ...volunteerData]
        hasMore = res.data?.has_next || false
        currentPage++
        if (currentPage > 50) break
      }

      setItems(allVolunteer)
    } catch {
      toast.error('Failed to fetch volunteer experiences')
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetch()
  }, [])

  const handleDelete = async (id: string) => {
    if (!confirm('Are you sure you want to delete this entry?')) return
    try {
      await volunteerExperiencesAPI.deleteVolunteerExperience(id)
      toast.success('Deleted successfully')
      fetch()
      if ((page - 1) * limit >= items.length - 1 && page > 1) setPage(page - 1)
    } catch {
      toast.error('Failed to delete')
    }
  }

  const totalPages = Math.ceil(items.length / limit)
  const currentData = items.slice((page - 1) * limit, page * limit)

  if (loading) {
    return (
      <Loading
        title="Loading Volunteer Experiences"
        description="Fetching your volunteer data..."
      />
    )
  }

  return (
    <div className="space-y-10">
      <div className="text-center mb-12 space-y-8">
        <h1 className="text-2xl md:text-3xl font-heading font-bold bg-linear-to-r from-secondary via-primary to-accent bg-clip-text text-transparent leading-tight">
          Volunteer Experiences - Manage your volunteer work and contributions.
        </h1>
      </div>

      <div className="flex flex-col md:flex-row md:justify-between md:items-center gap-4 md:gap-0 pb-2 border-b border-border">
        <Button onClick={() => route('/admin/volunteer/new')} className="flex items-center">
          Add Volunteer
        </Button>
      </div>

      {items.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-16 animate-fade-in">
          <h3 className="text-2xl font-semibold text-foreground mb-2">No volunteer entries</h3>
          <p className="text-lg text-foreground mb-6">
            Get started by adding your first volunteer experience.
          </p>
          <Button onClick={() => route('/admin/volunteer/new')} className="flex items-center">
            Add Volunteer
          </Button>
        </div>
      ) : (
        <>
          <div className="grid gap-6 grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {currentData.map((v) => (
              <Card
                key={v.inline?.id || v.inline.id}
                className="group relative overflow-hidden border hover:border-secondary/50 transition-all duration-200 hover:shadow-lg bg-card rounded-xl h-[300px] w-full flex flex-col"
              >
                <CardHeader className="p-4 pb-2">
                  <CardTitle className="text-base font-semibold text-secondary line-clamp-2">
                    {v.volunteer_time_line?.[0]?.position ?? 'Position'}
                  </CardTitle>
                  <CardDescription className="text-sm text-muted-foreground">
                    {v.organisation}
                  </CardDescription>
                </CardHeader>
                <CardContent className="flex-1 flex flex-col p-4 pt-2 overflow-hidden">
                  <p className="text-xs text-muted-foreground mb-3 line-clamp-2">{v.description}</p>
                  <div className="flex flex-wrap gap-1.5 mb-3">
                    {v.technologies.slice(0, 4).map((t, idx) => (
                      <Badge key={idx} variant="secondary" className="text-xs px-2 py-0.5">
                        {t}
                      </Badge>
                    ))}
                    {v.technologies.length > 4 && (
                      <Badge variant="outline" className="text-xs px-2 py-0.5">
                        +{v.technologies.length - 4}
                      </Badge>
                    )}
                  </div>
                  <div className="flex gap-2 mt-auto">
                    <Button
                      size="sm"
                      variant="outline"
                      onClick={() => route(`/admin/volunteer/edit/${v.inline.id}`)}
                      className="flex-1 h-9"
                    >
                      <Edit className="h-4 w-4 mr-1" /> Edit
                    </Button>
                    <Button
                      size="sm"
                      variant="destructive"
                      onClick={() => handleDelete(v.inline.id)}
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
