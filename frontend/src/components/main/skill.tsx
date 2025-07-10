import { Badge } from '../ui/badge'
import { Code } from 'lucide-react'

interface SkillsSectionProps {
  skills: string[]
}

export default function SkillsSection({ skills }: SkillsSectionProps) {
  return (
    <section className="py-24 sm:py-32 bg-card">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="mx-auto max-w-2xl text-center">
          <Badge variant="outline" className="mb-4">
            <Code className="mr-2 h-4 w-4" />
            Technical Expertise
          </Badge>
          <h2 className="text-3xl font-bold tracking-tight text-foreground sm:text-5xl">
            Technical Skills
          </h2>
          <p className="mt-6 text-lg leading-8 text-muted-foreground">
            Technologies and tools I work with to bring ideas to life
          </p>
        </div>
        <div className="mx-auto mt-16 max-w-5xl">
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
            {skills.map((skill, index) => (
              <div key={index} className="group">
                <Badge 
                  variant="secondary" 
                  className="w-full justify-center py-3 text-sm font-medium transition-all duration-200 hover:scale-105 hover:shadow-md hover:bg-primary hover:text-primary-foreground cursor-default"
                >
                  {skill}
                </Badge>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}