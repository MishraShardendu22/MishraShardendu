import { Card, CardContent, CardHeader, CardTitle } from '../ui/card'
import { Button } from '../ui/button'
import { Badge } from '../ui/badge'
import { Mail, Linkedin, Github, ArrowRight } from 'lucide-react'

export default function ContactSection() {
  return (
    <section id="contact" className="py-24 sm:py-32 bg-card">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="mx-auto max-w-2xl text-center">
          <Badge variant="outline" className="mb-4">
            <Mail className="mr-2 h-4 w-4" />
            Let's Connect
          </Badge>
          <h2 className="text-3xl font-bold tracking-tight text-foreground sm:text-5xl">
            Get in Touch
          </h2>
          <p className="mt-6 text-lg leading-8 text-muted-foreground">
            Let's discuss your next project or opportunity
          </p>
        </div>
        <div className="mx-auto mt-16 max-w-4xl">
          <div className="grid gap-8 lg:grid-cols-3">
            <Card className="group hover:shadow-lg hover:shadow-primary/10 transition-all duration-300 hover:border-primary/50">
              <CardHeader className="text-center">
                <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:bg-primary group-hover:text-primary-foreground transition-colors">
                  <Mail className="h-6 w-6" />
                </div>
                <CardTitle>Email</CardTitle>
              </CardHeader>
              <CardContent className="text-center">
                <p className="text-muted-foreground mb-4">
                  mishrashardendu22@gmail.com
                </p>
                <Button variant="outline" size="sm" className="group/btn">
                  Send Message
                  <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover/btn:translate-x-1" />
                </Button>
              </CardContent>
            </Card>

            <Card className="group hover:shadow-lg hover:shadow-primary/10 transition-all duration-300 hover:border-primary/50">
              <CardHeader className="text-center">
                <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:bg-primary group-hover:text-primary-foreground transition-colors">
                  <Linkedin className="h-6 w-6" />
                </div>
                <CardTitle>LinkedIn</CardTitle>
              </CardHeader>
              <CardContent className="text-center">
                <p className="text-muted-foreground mb-4">
                  Connect professionally
                </p>
                <a
                  href="https://linkedin.com/in/shardendumishra22/"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <Button variant="outline" size="sm" className="group/btn">
                    Connect
                    <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover/btn:translate-x-1" />
                  </Button>
                </a>
              </CardContent>
            </Card>

            <Card className="group hover:shadow-lg hover:shadow-primary/10 transition-all duration-300 hover:border-primary/50">
              <CardHeader className="text-center">
                <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:bg-primary group-hover:text-primary-foreground transition-colors">
                  <Github className="h-6 w-6" />
                </div>
                <CardTitle>GitHub</CardTitle>
              </CardHeader>
              <CardContent className="text-center">
                <p className="text-muted-foreground mb-4">
                  Explore my code
                </p>
                <a
                  href="https://github.com/ShardenduMishra22"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <Button variant="outline" size="sm" className="group/btn">
                    Follow
                    <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover/btn:translate-x-1" />
                  </Button>
                </a>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </section>
  )
}