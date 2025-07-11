import { Project } from '@/data/types.data'
import { ExternalLink, Github, Star, ArrowRight, ChevronLeft, ChevronRight } from 'lucide-react'
import Link from 'next/link'
import { Badge } from '../ui/badge'
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card'
import { Button } from '../ui/button'
import { useState } from 'react'

interface ProjectsSectionProps {
  projects: Project[]
}

export default function ProjectsSection({ projects }: ProjectsSectionProps) {
  const [currentIndex, setCurrentIndex] = useState(0)
  const featuredProjects = projects.slice(0, 4)
  
  const nextProject = () => {
    setCurrentIndex((prev) => (prev + 1) % featuredProjects.length)
  }
  
  const prevProject = () => {
    setCurrentIndex((prev) => (prev - 1 + featuredProjects.length) % featuredProjects.length)
  }

  return (
    <section id="projects" className="py-24 sm:py-32 bg-gradient-to-br from-background via-background to-secondary/5 relative overflow-hidden">
      {/* Subtle background patterns */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_30%,theme(colors.primary/4),transparent_70%)]"></div>
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_80%_70%,theme(colors.accent/4),transparent_70%)]"></div>
      
      <div className="relative mx-auto max-w-7xl px-6 lg:px-8">
        {/* Header section */}
        <div className="mx-auto max-w-3xl text-center">
          <div className="flex justify-center mb-6">
            <Badge variant="outline" className="px-4 py-2 text-sm font-medium border-primary/30 bg-primary/5 hover:bg-primary/10 transition-colors">
              <Star className="mr-2 h-4 w-4 text-primary" />
              Featured Work
            </Badge>
          </div>
          
          <h2 className="text-3xl font-bold tracking-tight sm:text-5xl lg:text-6xl">
            <span className="bg-gradient-to-r from-foreground via-primary to-secondary bg-clip-text text-transparent">
              Best
            </span>
            <span className="text-foreground"> Projects</span>
          </h2>
          
          <div className="mt-4 mx-auto w-24 h-1 bg-gradient-to-r from-primary via-secondary to-accent rounded-full"></div>
          
          <p className="mt-8 text-lg leading-8 text-foreground max-w-2xl mx-auto">
            Showcasing my top 4 projects that demonstrate technical expertise and creative problem-solving
          </p>
        </div>

        {/* Desktop Grid View */}
        <div className="hidden lg:block mx-auto mt-20">
          <div className="grid grid-cols-2 gap-8 max-w-none">
            {featuredProjects.map((project, index) => (
              <ProjectCard key={project.inline?.id || project.inline.id} project={project} index={index} />
            ))}
          </div>
        </div>

        {/* Mobile/Tablet Carousel */}
        <div className="lg:hidden mt-20">
          <div className="relative">
            <div className="overflow-hidden">
              <div 
                className="flex transition-transform duration-300 ease-in-out"
                style={{ transform: `translateX(-${currentIndex * 100}%)` }}
              >
                {featuredProjects.map((project, index) => (
                  <div key={project.inline?.id || project.inline.id} className="w-full flex-shrink-0 px-4">
                    <ProjectCard project={project} index={index} />
                  </div>
                ))}
              </div>
            </div>
            
            {/* Carousel Controls */}
            <div className="flex justify-between items-center mt-8">
              <Button
                variant="outline"
                size="sm"
                onClick={prevProject}
                className="p-2 bg-background/80 backdrop-blur-sm border-primary/20 hover:bg-primary/5"
              >
                <ChevronLeft className="h-4 w-4" />
              </Button>
              
              <div className="flex space-x-2">
                {featuredProjects.map((_, index) => (
                  <button
                    key={index}
                    onClick={() => setCurrentIndex(index)}
                    className={`w-2 h-2 rounded-full transition-all duration-300 ${
                      index === currentIndex 
                        ? 'bg-primary w-6' 
                        : 'bg-primary/30 hover:bg-primary/50'
                    }`}
                  />
                ))}
              </div>
              
              <Button
                variant="outline"
                size="sm"
                onClick={nextProject}
                className="p-2 bg-background/80 backdrop-blur-sm border-primary/20 hover:bg-primary/5"
              >
                <ChevronRight className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </div>

        {/* View All Projects CTA */}
        {projects.length > 4 && (
          <div className="mt-20 text-center">
            <div className="inline-flex items-center gap-6 p-6 bg-gradient-to-r from-card via-card/90 to-card rounded-2xl border border-border/50 backdrop-blur-sm shadow-lg">
              <div className="text-left">
                <h3 className="text-lg font-semibold text-foreground">
                  More Projects
                </h3>
                <p className="text-sm text-foreground/70 mt-1">
                  Explore {projects.length - 4} additional projects
                </p>
              </div>
              <Link href="/projects">
                <Button 
                  variant="outline" 
                  size="lg" 
                  className="group bg-gradient-to-r from-primary/10 to-secondary/10 hover:from-primary/20 hover:to-secondary/20 border-primary/30 hover:border-primary/50 transition-all duration-300"
                >
                  View All
                  <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
                </Button>
              </Link>
            </div>
          </div>
        )}
      </div>
    </section>
  )
}

function ProjectCard({ project, index }: { project: Project; index: number }) {
  return (
    <Card className="group relative overflow-hidden border border-border/30 hover:border-primary/30 transition-all duration-500 hover:shadow-2xl hover:shadow-primary/5 bg-card/90 backdrop-blur-sm h-full min-h-[400px]">
      {/* Card number badge */}
      <div className="absolute top-6 right-6 w-10 h-10 rounded-full bg-gradient-to-br from-primary to-secondary flex items-center justify-center text-primary-foreground text-sm font-semibold shadow-lg">
        {index + 1}
      </div>
      
      <CardHeader className="pb-6 pt-8 px-8">
        <CardTitle className="text-2xl font-semibold group-hover:text-primary transition-colors duration-300 pr-16 leading-tight">
          {project.project_name}
        </CardTitle>
        <p className="text-foreground/70 mt-4 leading-relaxed text-base">
          {project.small_description}
        </p>
      </CardHeader>

      <CardContent className="space-y-8 px-8 pb-8">
        {/* Skills - Top 3 only */}
        <div className="flex flex-wrap gap-2">
          {project.skills.slice(0, 3).map((skill, skillIndex) => (
            <Badge 
              key={skillIndex} 
              variant="outline" 
              className="text-xs px-3 py-1.5 bg-primary/5 border-primary/20 hover:bg-primary/10 transition-colors font-medium"
            >
              {skill}
            </Badge>
          ))}
        </div>

        {/* Action buttons - always visible */}
        <div className="flex gap-3">
          {project.project_live_link && (
            <a
              href={project.project_live_link}
              target="_blank"
              rel="noopener noreferrer"
              className="flex-1"
            >
              <Button 
                size="default" 
                className="w-full bg-gradient-to-r from-primary to-secondary hover:from-primary/90 hover:to-secondary/90 text-primary-foreground border-0 shadow-lg hover:shadow-primary/25 transition-all duration-300 font-medium"
              >
                <ExternalLink className="mr-2 h-4 w-4" />
                Live Demo
              </Button>
            </a>
          )}
          
          {project.project_repository && (
            <a
              href={project.project_repository}
              target="_blank"
              rel="noopener noreferrer"
              className="flex-1"
            >
              <Button 
                variant="outline" 
                size="default" 
                className="w-full border border-primary/20 hover:border-primary/40 bg-background/50 backdrop-blur-sm hover:bg-primary/5 transition-all duration-300 font-medium"
              >
                <Github className="mr-2 h-4 w-4" />
                Code
              </Button>
            </a>
          )}
        </div>

        {/* View Details */}
        <Link href={`/projects/${project.inline?.id || project.inline.id}`}>
          <Button 
            variant="ghost" 
            size="default"
            className="w-full group/btn relative overflow-hidden hover:bg-secondary/10 transition-all duration-300 font-medium"
          >
            <span className="relative flex items-center justify-center text-foreground group-hover/btn:text-secondary">
              View Details
              <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover/btn:translate-x-1" />
            </span>
          </Button>
        </Link>
      </CardContent>
    </Card>
  )
}