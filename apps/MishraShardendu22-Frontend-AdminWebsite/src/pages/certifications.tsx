import { Pencil, Trash2 } from 'lucide-react'
import { useEffect, useState } from 'preact/hooks'
import { route } from 'preact-router'
import toast from 'react-hot-toast'
import { Loading } from '../components/shared'
import { Badge } from '../components/ui/badge'
import { Button } from '../components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../components/ui/card'
import type { Certification } from '../types/types.data'
import { certificationsAPI } from '../utils/apiResponse.util'

export default function CertificationsPage() {
  const [certifications, setCertifications] = useState<Certification[]>([])
  const [loading, setLoading] = useState(true)
  const [currentPage, setCurrentPage] = useState(0)
  const itemsPerPage = 8
  const totalPages = Math.ceil(certifications.length / itemsPerPage)
  const paginatedCertifications = certifications.slice(
    currentPage * itemsPerPage,
    (currentPage + 1) * itemsPerPage
  )

  const fetchCertifications = async () => {
    try {
      let allCertifications: Certification[] = []
      let page = 1
      let hasMore = true

      while (hasMore) {
        const response = await certificationsAPI.getAllCertifications(page, 100)
        const certificationsData = response.data?.certifications || []
        allCertifications = [...allCertifications, ...certificationsData]
        hasMore = response.data?.has_next || false
        page++
        if (page > 50) break
      }

      setCertifications(allCertifications)
    } catch {
      toast.error('Failed to fetch certifications')
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchCertifications()
  }, [])

  const handleDeleteCertification = async (id: string) => {
    if (!confirm('Are you sure you want to delete this certification?')) return

    try {
      await certificationsAPI.deleteCertification(id)
      toast.success('Certification deleted successfully!')
      fetchCertifications()
    } catch {
      toast.error('Failed to delete certification')
    }
  }

  if (loading) {
    return <Loading title="Loading Certifications" description="Fetching your certifications..." />
  }

  return (
    <div className="space-y-8 w-[90%] mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Header */}
      <header className="text-center space-y-4">
        <h1 className="text-3xl md:text-4xl lg:text-5xl font-heading font-extrabold bg-linear-to-r from-primary via-secondary to-accent bg-clip-text text-transparent">
          Certifications Management
        </h1>
        <p className="text-foreground/70 text-lg max-w-2xl mx-auto">
          Manage your professional certifications and credentials
        </p>
      </header>

      {/* Action Bar */}
      <div className="flex flex-col md:flex-row md:justify-between md:items-center gap-4 border-b border-border pb-4">
        <Button onClick={() => route('/admin/certifications/new')}>Add Certification</Button>
      </div>

      {/* Certifications Grid */}
      {certifications.length === 0 ? (
        <div className="text-center py-16">
          <div className="w-24 h-24 rounded-full bg-muted/50 flex items-center justify-center mx-auto mb-6">
            <span className="text-5xl">🏆</span>
          </div>
          <h3 className="text-2xl font-bold text-foreground mb-2">No Certifications Yet</h3>
          <p className="text-foreground/60 mb-6">Start by adding your first certification</p>
          <Button onClick={() => route('/admin/certifications/new')}>
            Add Your First Certification
          </Button>
        </div>
      ) : (
        <>
          <div className="grid gap-6 grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {paginatedCertifications.map((cert) => (
              <Card
                key={cert.inline.id}
                className="hover:shadow-lg transition-shadow h-62.5 w-full flex flex-col overflow-hidden border hover:border-secondary/50 rounded-xl"
              >
                <CardHeader className="p-4 pb-2">
                  <div className="flex items-start justify-between gap-2">
                    <CardTitle className="text-base font-semibold line-clamp-2 flex-1">
                      {cert.title}
                    </CardTitle>
                    <div className="flex gap-1 shrink-0">
                      <Button
                        size="sm"
                        variant="ghost"
                        className="h-8 w-8 p-0"
                        onClick={() => route(`/admin/certifications/edit/${cert.inline.id}`)}
                      >
                        <Pencil className="w-4 h-4" />
                      </Button>
                      <Button
                        size="sm"
                        variant="ghost"
                        className="h-8 w-8 p-0"
                        onClick={() => handleDeleteCertification(cert.inline.id)}
                      >
                        <Trash2 className="w-4 h-4 text-destructive" />
                      </Button>
                    </div>
                  </div>
                  <CardDescription className="text-sm text-muted-foreground">
                    {cert.issuer}
                  </CardDescription>
                </CardHeader>
                <CardContent className="flex-1 p-4 pt-2 overflow-hidden flex flex-col">
                  <p className="text-xs text-muted-foreground mb-3 line-clamp-2">
                    {cert.description}
                  </p>
                  {cert.skills && cert.skills.length > 0 && (
                    <div className="flex flex-wrap gap-1.5 mb-3">
                      {cert.skills.slice(0, 4).map((skill) => (
                        <Badge key={skill} variant="outline" className="text-xs px-2 py-0.5">
                          {skill}
                        </Badge>
                      ))}
                      {cert.skills.length > 4 && (
                        <Badge variant="secondary" className="text-xs px-2 py-0.5">
                          +{cert.skills.length - 4}
                        </Badge>
                      )}
                    </div>
                  )}
                  {cert.certificate_url && (
                    <a
                      href={cert.certificate_url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center text-sm text-primary hover:underline mt-auto"
                    >
                      View Certificate
                    </a>
                  )}
                </CardContent>
              </Card>
            ))}
          </div>
          {totalPages > 1 && (
            <div className="sticky bottom-4 flex justify-center items-center gap-4 mt-8 py-4 bg-background/80 backdrop-blur-sm rounded-xl border shadow-lg">
              <Button
                variant="outline"
                size="sm"
                onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 0))}
                disabled={currentPage === 0}
                className="min-w-25"
              >
                Previous
              </Button>
              <span className="text-sm font-medium min-w-30 text-center">
                Page {currentPage + 1} of {totalPages}
              </span>
              <Button
                variant="outline"
                size="sm"
                onClick={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages - 1))}
                disabled={currentPage === totalPages - 1}
                className="min-w-25"
              >
                Next
              </Button>
            </div>
          )}
        </>
      )}
    </div>
  )
}
