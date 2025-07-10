'use client'

import { useEffect, useState } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../components/ui/card'
import { Button } from '../components/ui/button'
import { Badge } from '../components/ui/badge'
import { projectsAPI, experiencesAPI, skillsAPI } from '../util/apiResponse.util'
import { Project, Experience } from '../data/types.data'
import { Briefcase, ExternalLink, Github, Play, Mail, Linkedin } from 'lucide-react'
import Link from 'next/link'
import Image from 'next/image'

export default function HomePage() {
  const [projects, setProjects] = useState<Project[]>([])
  const [experiences, setExperiences] = useState<Experience[]>([])
  const [skills, setSkills] = useState<string[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [projectsRes, experiencesRes, skillsRes] = await Promise.all([
          projectsAPI.getAllProjects(),
          experiencesAPI.getAllExperiences(),
          skillsAPI.getSkills(),
        ])
        setProjects(Array.isArray(projectsRes.data) ? projectsRes.data : (projectsRes.data === null ? [] : []))
        setExperiences(Array.isArray(experiencesRes.data) ? experiencesRes.data : (experiencesRes.data === null ? [] : []))
        setSkills(Array.isArray(skillsRes.data) ? skillsRes.data : (skillsRes.data === null ? [] : []))
      } catch (err) {
        setError('Failed to load homepage data')
        setProjects([])
        setExperiences([])
        setSkills([])
      } finally {
        setLoading(false)
      }
    }
    fetchData()
  }, [])

  if (loading) return <div>Loading...</div>
  if (error) return <div>{error}</div>

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100">
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-white py-24 sm:py-32">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="mx-auto max-w-2xl text-center">
            <h1 className="text-4xl font-bold tracking-tight text-gray-900 sm:text-6xl">
              Shardendu Mishra
            </h1>
            <p className="mt-6 text-lg leading-8 text-gray-600">
              Full Stack Developer passionate about building impactful applications with modern technologies.
              Specializing in Go, React, and cloud-native solutions.
            </p>
            <div className="mt-10 flex items-center justify-center gap-x-6">
              <Link href="#projects">
                <Button size="lg">
                  <Briefcase className="mr-2 h-5 w-5" />
                  View Projects
                </Button>
              </Link>
              <Link href="#contact">
                <Button variant="outline" size="lg">
                  <Mail className="mr-2 h-5 w-5" />
                  Get in Touch
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Skills Section */}
{/* Skills Section */}
<section className="py-24 sm:py-32">
  <div className="mx-auto max-w-7xl px-6 lg:px-8">
    <div className="mx-auto max-w-2xl text-center">
      <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
        Technical Skills
      </h2>
      <p className="mt-4 text-lg leading-8 text-gray-600">
        Technologies and tools I work with
      </p>
    </div>
    <div className="mx-auto mt-12 max-w-4xl text-center">
      <div className="flex flex-wrap justify-center gap-3">
        {skills.map((skill, index) => (
          <Badge key={index} variant="secondary" className="text-sm">
            {skill}
          </Badge>
        ))}
      </div>
    </div>
  </div>
</section>


      {/* Projects Section */}
      <section id="projects" className="py-24 sm:py-32 bg-white">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="mx-auto max-w-2xl text-center">
            <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
              Featured Projects
            </h2>
            <p className="mt-4 text-lg leading-8 text-gray-600">
              A showcase of my recent work and contributions
            </p>
          </div>
          <div className="mx-auto mt-16 grid max-w-2xl grid-cols-1 gap-x-8 gap-y-20 lg:mx-0 lg:max-w-none lg:grid-cols-3">
            {projects.map((project) => (
              <Card key={project.inline?.id || project.inline.id} className="flex flex-col overflow-hidden">
                <CardHeader>
                  <CardTitle className="text-xl">{project.project_name}</CardTitle>
                  <CardDescription>{project.small_description}</CardDescription>
                </CardHeader>
                <CardContent className="flex-1 space-y-4">
                  <p className="text-sm text-gray-600 line-clamp-3">
                    {project.description}
                  </p>
                  
                  <div className="flex flex-wrap gap-2">
                    {project.skills.map((skill, index) => (
                      <Badge key={index} variant="outline" className="text-xs">
                        {skill}
                      </Badge>
                    ))}
                  </div>

                  <div className="flex space-x-2 pt-4">
                    {project.project_repository && (
                      <a
                        href={project.project_repository}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-blue-600 hover:text-blue-800"
                      >
                        <Github className="h-5 w-5" />
                      </a>
                    )}
                    {project.project_live_link && (
                      <a
                        href={project.project_live_link}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-green-600 hover:text-green-800"
                      >
                        <ExternalLink className="h-5 w-5" />
                      </a>
                    )}
                    {project.project_video && (
                      <a
                        href={project.project_video}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-red-600 hover:text-red-800"
                      >
                        <Play className="h-5 w-5" />
                      </a>
                    )}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Experience Section */}
      <section className="py-24 sm:py-32">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="mx-auto max-w-2xl text-center">
            <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
              Work Experience
            </h2>
            <p className="mt-4 text-lg leading-8 text-gray-600">
              My professional journey and contributions
            </p>
          </div>
          <div className="mx-auto mt-16 max-w-2xl lg:max-w-none">
            <div className="grid gap-8 lg:grid-cols-2">
              {experiences.map((experience) => (
                <Card key={experience.inline?.id || experience.inline.id}>
                  <CardHeader>
                    <div className="flex items-start justify-between">
                      <div>
                        <CardTitle className="text-xl">{experience.position}</CardTitle>
                        <CardDescription className="mt-2">
                          {experience.company_name}
                        </CardDescription>
                        <p className="text-sm text-gray-500 mt-1">
                          {new Date(experience.start_date).toLocaleDateString('en-US', {
                            year: 'numeric',
                            month: 'short',
                          })} - {new Date(experience.end_date).toLocaleDateString('en-US', {
                            year: 'numeric',
                            month: 'short',
                          })}
                        </p>
                      </div>
                      {experience.company_logo && (
                        <div className="relative h-12 w-12">
                          <Image
                            src={experience.company_logo}
                            alt={`${experience.company_name} logo`}
                            fill
                            className="object-contain"
                          />
                        </div>
                      )}
                    </div>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <p className="text-sm text-gray-600">
                      {experience.description}
                    </p>
                    
                    <div className="flex flex-wrap gap-2">
                      {experience.technologies.map((tech, index) => (
                        <Badge key={index} variant="secondary" className="text-xs">
                          {tech}
                        </Badge>
                      ))}
                    </div>

                    {experience.certificate_url && (
                      <a
                        href={experience.certificate_url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center text-sm text-blue-600 hover:text-blue-800"
                      >
                        <ExternalLink className="mr-1 h-4 w-4" />
                        View Certificate
                      </a>
                    )}
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="py-24 sm:py-32 bg-white">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="mx-auto max-w-2xl text-center">
            <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
              Get in Touch
            </h2>
            <p className="mt-4 text-lg leading-8 text-gray-600">
              Let&apos;s discuss your next project or opportunity
            </p>
          </div>
          <div className="mx-auto mt-16 max-w-2xl lg:max-w-none">
            <div className="grid gap-8 lg:grid-cols-3">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <Mail className="mr-2 h-5 w-5" />
                    Email
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-gray-600">
                    mishrashardendu22@gmail.com
                  </p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <Linkedin className="mr-2 h-5 w-5" />
                    LinkedIn
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <a
                    href="https://linkedin.com/in/shardendumishra22/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-sm text-blue-600 hover:text-blue-800"
                  >
                    linkedin.com/in/shardendumishra22/
                  </a>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <Github className="mr-2 h-5 w-5" />
                    GitHub
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <a
                    href="https://github.com/ShardenduMishra22"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-sm text-gray-600 hover:text-gray-800"
                  >
                    github.com/ShardenduMishra22
                  </a>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900">
        <div className="mx-auto max-w-7xl px-6 py-12 md:flex md:items-center md:justify-between lg:px-8">
          <div className="flex justify-center space-x-6 md:order-2">
            <Link href="/admin/login" className="text-gray-400 hover:text-gray-300">
              Admin
            </Link>
          </div>
          <div className="mt-8 md:order-1 md:mt-0">
            <p className="text-center text-xs leading-5 text-gray-400">
              &copy; 2024 Shardendu Mishra. All rights reserved.
            </p>
          </div>
        </div>
      </footer>
    </div>
  )
}
