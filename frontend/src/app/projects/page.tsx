'use client';

import { useEffect, useState } from 'react';
import { projectsAPI } from '../../util/apiResponse.util';
import { Project } from '../../data/types.data';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '../../components/ui/card';
import { Badge } from '../../components/ui/badge';
import { Button } from '../../components/ui/button';
import { Github, ExternalLink, Play } from 'lucide-react';
import Link from 'next/link';

export default function ProjectsPage() {
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const response = await projectsAPI.getAllProjects();
        setProjects(Array.isArray(response.data) ? response.data : []);
      } catch (err) {
        setError('Failed to load projects');
      } finally {
        setLoading(false);
      }
    };
    fetchProjects();
  }, []);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>{error}</div>;

  return (
    <div className="container mx-auto p-4">
      <div className="mb-8">
        <h1 className="text-4xl font-bold mb-4">Projects</h1>
        <p className="text-gray-600">A showcase of my recent work and contributions</p>
      </div>
      
      {projects.length === 0 ? (
        <Card>
          <CardContent className="text-center py-12">
            <span className="text-gray-400 mb-4 inline-block">
              <svg width="48" height="48" fill="none" viewBox="0 0 24 24"><path d="M12 17.75l-6.16 3.24 1.18-6.88L2 9.76l6.92-1.01L12 2.5l3.08 6.25L22 9.76l-5.02 4.35 1.18 6.88z" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round"/></svg>
            </span>
            <h3 className="text-lg font-medium text-gray-900 mb-2">No projects yet</h3>
            <p className="text-gray-500 mb-4">Projects will appear here when added.</p>
          </CardContent>
        </Card>
      ) : (
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {projects.map((project) => (
            <Card key={project.inline?.id || project.inline.id} className="flex flex-col overflow-hidden hover:shadow-lg transition-shadow">
              <CardHeader>
                <CardTitle className="text-xl">{project.project_name}</CardTitle>
                <CardDescription>{project.small_description}</CardDescription>
              </CardHeader>
              <CardContent className="flex-1 space-y-4">
                <p className="text-sm text-gray-600 line-clamp-3">
                  {project.description.length > 150 
                    ? `${project.description.substring(0, 150)}...` 
                    : project.description
                  }
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

                <Link href={`/projects/${project.inline?.id || project.inline.id}`}>
                  <Button variant="outline" className="w-full">
                    View Details
                  </Button>
                </Link>
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
} 