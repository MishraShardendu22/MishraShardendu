import { Project } from '@/data/types.data'
import { ExternalLink, Github, Star, ArrowRight } from 'lucide-react'
import Link from 'next/link'
import { Badge } from '../ui/badge'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../ui/card'
import { Button } from '../ui/button'

interface ProjectsSectionProps {
  projects: Project[]
}

export default function ProjectsSection({ projects }: ProjectsSectionProps) {
  return (
    <section id="projects" className="py-24 sm:py-32 bg-background">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="mx-auto max-w-2xl text-center">
          <Badge variant="outline" className="mb-4">
            <Star className="mr-2 h-4 w-4" />
            Portfolio
          </Badge>
          <h2 className="text-3xl font-bold tracking-tight text-foreground sm:text-5xl">
            Featured Projects
          </h2>
          <p className="mt-6 text-lg leading-8 text-muted-foreground">
            A showcase of my recent work and contributions
          </p>
        </div>
        <div className="mx-auto mt-16 grid max-w-2xl grid-cols-1 gap-8 lg:mx-0 lg:max-w-none lg:grid-cols-3">
          {projects.slice(0, 6).map((project) => (
            <Card key={project.inline?.id || project.inline.id} className="group overflow-hidden border-2 hover:border-primary/50 transition-all duration-300 hover:shadow-lg hover:shadow-primary/10">
              <CardHeader className="pb-3">
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <CardTitle className="text-xl group-hover:text-primary transition-colors">
                      {project.project_name}
                    </CardTitle>
                    <CardDescription className="mt-2">
                      {project.small_description}
                    </CardDescription>
                  </div>
                  <div className="flex space-x-2 opacity-0 group-hover:opacity-100 transition-opacity">
                    {project.project_repository && (
                      <a
                        href={project.project_repository}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="p-2 rounded-full bg-muted hover:bg-primary hover:text-primary-foreground transition-colors"
                      >
                        <Github className="h-4 w-4" />
                      </a>
                    )}
                    {project.project_live_link && (
                      <a
                        href={project.project_live_link}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="p-2 rounded-full bg-muted hover:bg-secondary hover:text-secondary-foreground transition-colors"
                      >
                        <ExternalLink className="h-4 w-4" />
                      </a>
                    )}
                  </div>
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                <p className="text-sm text-muted-foreground line-clamp-3">
                  {project.description.length > 150 
                    ? `${project.description.substring(0, 150)}...` 
                    : project.description
                  }
                </p>
                
                <div className="flex flex-wrap gap-2">
                  {project.skills.slice(0, 3).map((skill, index) => (
                    <Badge key={index} variant="outline" className="text-xs">
                      {skill}
                    </Badge>
                  ))}
                  {project.skills.length > 3 && (
                    <Badge variant="outline" className="text-xs">
                      +{project.skills.length - 3} more
                    </Badge>
                  )}
                </div>

                <Link href={`/projects/${project.inline?.id || project.inline.id}`}>
                  <Button variant="outline" className="w-full group/btn">
                    View Details
                    <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover/btn:translate-x-1" />
                  </Button>
                </Link>
              </CardContent>
            </Card>
          ))}
        </div>
        {projects.length > 6 && (
          <div className="mt-16 text-center">
            <Link href="/projects">
              <Button variant="outline" size="lg" className="group">
                View All Projects
                <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
              </Button>
            </Link>
          </div>
        )}
      </div>
    </section>
  )
}