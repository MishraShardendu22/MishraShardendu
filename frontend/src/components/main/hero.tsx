import { Briefcase, Mail, Sparkles, ArrowRight } from 'lucide-react'
import Link from 'next/link'
import { Button } from '../ui/button'
import Image from 'next/image'

export default function HeroSection() {
  return (
    <section className="relative overflow-hidden bg-gradient-to-br from-background via-background to-primary/5 py-24 sm:py-32">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,theme(colors.primary/10),transparent_50%)]"></div>
      <div className="relative mx-auto max-w-7xl px-6 lg:px-8">
<Image
  src="/Professional.webp"
  alt="Professional"
  width={500}
  height={500}
  priority
  className="mx-auto rounded-xl shadow-lg object-cover"
/>

        <div className="mx-auto max-w-3xl text-center">
          <h1 className="text-4xl font-bold tracking-tight sm:text-7xl bg-gradient-to-r from-foreground to-primary bg-clip-text text-transparent">
            Shardendu Mishra
          </h1>
          <p className="mt-8 text-xl leading-8 text-muted-foreground max-w-2xl mx-auto">
            Full Stack Developer passionate about building impactful applications with modern technologies.
            Specializing in Go, React, and cloud-native solutions.
          </p>
          <div className="mt-12 flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link href="#projects">
              <Button size="lg" className="group">
                <Briefcase className="mr-2 h-5 w-5 transition-transform group-hover:scale-110" />
                View Projects
                <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
              </Button>
            </Link>
            <Link href="#contact">
              <Button variant="outline" size="lg" className="group">
                <Mail className="mr-2 h-5 w-5 transition-transform group-hover:scale-110" />
                Get in Touch
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </section>
  )
}