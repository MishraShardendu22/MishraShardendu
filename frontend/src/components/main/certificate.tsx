import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../ui/card'
import { Button } from '../ui/button'
import { Badge } from '../ui/badge'
import { Award, Clock, Download, ArrowRight } from 'lucide-react'
import Link from 'next/link'
import Image from 'next/image'
import { Certification } from '@/data/types.data'

interface CertificationsSectionProps {
  certifications: Certification[]
}

export default function CertificationsSection({ certifications }: CertificationsSectionProps) {
  return (
    <section className="py-24 sm:py-32 bg-background">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="mx-auto max-w-2xl text-center">
          <Badge variant="outline" className="mb-4">
            <Award className="mr-2 h-4 w-4" />
            Credentials
          </Badge>
          <h2 className="text-3xl font-bold tracking-tight text-foreground sm:text-5xl">
            Certifications
          </h2>
          <p className="mt-6 text-lg leading-8 text-muted-foreground">
            Professional certifications and credentials
          </p>
        </div>
        <div className="mx-auto mt-16 grid max-w-2xl grid-cols-1 gap-8 lg:mx-0 lg:max-w-none lg:grid-cols-3">
          {certifications.length === 0 ? (
            <Card className="col-span-full bg-muted/30 border-dashed">
              <CardContent className="text-center py-16">
                <div className="w-16 h-16 bg-muted rounded-full flex items-center justify-center mx-auto mb-4">
                  <Award className="h-8 w-8 text-muted-foreground" />
                </div>
                <h3 className="text-lg font-medium text-foreground mb-2">No certifications yet</h3>
                <p className="text-muted-foreground mb-4">Certifications will appear here when added.</p>
                <Badge variant="secondary">Coming Soon</Badge>
              </CardContent>
            </Card>
          ) : (
            certifications.slice(0, 6).map((cert) => (
              <Card key={cert.inline?.id || cert.inline.id} className="group overflow-hidden hover:shadow-lg hover:shadow-primary/10 transition-all duration-300">
                <CardHeader className="pb-3">
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <CardTitle className="text-xl group-hover:text-primary transition-colors">
                        {cert.title}
                      </CardTitle>
                      <CardDescription className="mt-2">
                        {cert.issuer}
                      </CardDescription>
                      <div className="flex items-center mt-3 text-sm text-muted-foreground">
                        <Clock className="mr-2 h-4 w-4" />
                        {cert.issue_date} - {cert.expiry_date}
                      </div>
                    </div>
                    {cert.images && cert.images.length > 0 && cert.images[0] && (
                      <div className="relative h-12 w-12 rounded-lg overflow-hidden bg-background border">
                        <Image 
                          src={cert.images[0]} 
                          alt={cert.title + " certificate"} 
                          fill 
                          className="object-contain p-1" 
                        />
                      </div>
                    )}
                  </div>
                </CardHeader>
                <CardContent className="space-y-4">
                  <p className="text-sm text-muted-foreground line-clamp-3">
                    {cert.description.length > 150 
                      ? `${cert.description.substring(0, 150)}...` 
                      : cert.description
                    }
                  </p>
                  
                  <div className="flex flex-wrap gap-2">
                    {cert.skills.slice(0, 3).map((skill, idx) => (
                      <Badge key={idx} variant="outline" className="text-xs">
                        {skill}
                      </Badge>
                    ))}
                    {cert.skills.length > 3 && (
                      <Badge variant="outline" className="text-xs">
                        +{cert.skills.length - 3} more
                      </Badge>
                    )}
                  </div>

                  <div className="flex items-center justify-between pt-2">
                    <Link href={`/certifications/${cert.inline?.id || cert.inline.id}`}>
                      <Button variant="outline" className="group/btn">
                        View Details
                        <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover/btn:translate-x-1" />
                      </Button>
                    </Link>
                    
                    {cert.certificate_url && (
                      <a 
                        href={cert.certificate_url} 
                        target="_blank" 
                        rel="noopener noreferrer" 
                        className="inline-flex items-center text-sm text-primary hover:text-primary/80 transition-colors"
                      >
                        <Download className="mr-1 h-4 w-4" />
                        Download
                      </a>
                    )}
                  </div>
                </CardContent>
              </Card>
            ))
          )}
        </div>
        {certifications.length > 6 && (
          <div className="mt-16 text-center">
            <Link href="/certifications">
              <Button variant="outline" size="lg" className="group">
                View All Certifications
                <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
              </Button>
            </Link>
          </div>
        )}
      </div>
    </section>
  )
}