import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../ui/card'
import { Button } from '../ui/button'
import { Badge } from '../ui/badge'
import { Users, Calendar, Award, ArrowRight } from 'lucide-react'
import Link from 'next/link'
import Image from 'next/image'
import { Experience } from '@/data/types.data'

interface ExperienceSectionProps {
  experiences: Experience[]
}

export default function ExperienceSection({ experiences }: ExperienceSectionProps) {
  return (
    <section className="py-24 sm:py-32 bg-card">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="mx-auto max-w-2xl text-center">
          <Badge variant="outline" className="mb-4">
            <Users className="mr-2 h-4 w-4" />
            Professional Journey
          </Badge>
          <h2 className="text-3xl font-bold tracking-tight text-foreground sm:text-5xl">
            Work Experience
          </h2>
          <p className="mt-6 text-lg leading-8 text-muted-foreground">
            My professional journey and contributions
          </p>
        </div>
        <div className="mx-auto mt-16 max-w-4xl">
          <div className="grid gap-8 lg:grid-cols-2">
            {experiences.slice(0, 4).map((experience) => (
              <Card key={experience.inline?.id || experience.inline.id} className="group hover:shadow-lg hover:shadow-primary/10 transition-all duration-300">
                <CardHeader>
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <CardTitle className="text-xl group-hover:text-primary transition-colors">
                        {experience.position}
                      </CardTitle>
                      <CardDescription className="mt-2 font-medium">
                        {experience.company_name}
                      </CardDescription>
                      <div className="flex items-center mt-3 text-sm text-muted-foreground">
                        <Calendar className="mr-2 h-4 w-4" />
                        {new Date(experience.start_date).toLocaleDateString('en-US', {
                          year: 'numeric',
                          month: 'short',
                        })} - {new Date(experience.end_date).toLocaleDateString('en-US', {
                          year: 'numeric',
                          month: 'short',
                        })}
                      </div>
                    </div>
                    {experience.company_logo && (
                      <div className="relative h-12 w-12 rounded-lg overflow-hidden bg-background border">
                        <Image
                          src={experience.company_logo}
                          alt={`${experience.company_name} logo`}
                          fill
                          className="object-contain p-1"
                        />
                      </div>
                    )}
                  </div>
                </CardHeader>
                <CardContent className="space-y-4">
                  <p className="text-sm text-muted-foreground line-clamp-3">
                    {experience.description.length > 150 
                      ? `${experience.description.substring(0, 150)}...` 
                      : experience.description
                    }
                  </p>
                  
                  <div className="flex flex-wrap gap-2">
                    {experience.technologies.slice(0, 3).map((tech, index) => (
                      <Badge key={index} variant="secondary" className="text-xs">
                        {tech}
                      </Badge>
                    ))}
                    {experience.technologies.length > 3 && (
                      <Badge variant="secondary" className="text-xs">
                        +{experience.technologies.length - 3} more
                      </Badge>
                    )}
                  </div>

                  <div className="flex items-center justify-between pt-2">
                    <Link href={`/experiences/${experience.inline?.id || experience.inline.id}`}>
                      <Button variant="outline" className="group/btn">
                        View Details
                        <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover/btn:translate-x-1" />
                      </Button>
                    </Link>
                    
                    {experience.certificate_url && (
                      <a
                        href={experience.certificate_url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center text-sm text-primary hover:text-primary/80 transition-colors"
                      >
                        <Award className="mr-1 h-4 w-4" />
                        Certificate
                      </a>
                    )}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
          {experiences.length > 4 && (
            <div className="mt-16 text-center">
              <Link href="/experiences">
                <Button variant="outline" size="lg" className="group">
                  View All Experiences
                  <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
                </Button>
              </Link>
            </div>
          )}
        </div>
      </div>
    </section>
  )
}