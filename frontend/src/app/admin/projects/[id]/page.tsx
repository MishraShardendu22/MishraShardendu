'use client';

import { useEffect, useState } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { projectsAPI } from '../../../../util/apiResponse.util';
import { Project } from '../../../../data/types.data';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '../../../../components/ui/card';
import { Badge } from '../../../../components/ui/badge';
import { Button } from '../../../../components/ui/button';
import { Github, ExternalLink, Play } from 'lucide-react';
import ReactMarkdown from 'react-markdown';

export default function AdminProjectDetailPage({ params }: { params: { id: string } }) {
  const [project, setProject] = useState<Project | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchProject = async () => {
      try {
        const response = await projectsAPI.getProjectById(params.id);
        setProject(response.data);
      } catch (err) {
        setError('Failed to load project');
      } finally {
        setLoading(false);
      }
    };
    fetchProject();
  }, [params.id]);

  if (loading) return (
    <div className="min-h-[40vh] flex items-center justify-center">
      <div className="animate-spin rounded-full h-12 w-12 border-t-4 border-primary border-solid"></div>
    </div>
  );
  if (error || !project) return (
    <div className="min-h-[40vh] flex flex-col items-center justify-center gap-4">
      <div className="w-20 h-20 rounded-full bg-destructive/10 flex items-center justify-center">
        <span className="text-4xl">😢</span>
      </div>
      <div className="text-center space-y-2">
        <h2 className="text-2xl font-heading text-foreground">{error || 'Project not found'}</h2>
      </div>
    </div>
  );

  return (
    <div className="max-w-3xl mx-auto py-10">
      <Card className="group relative overflow-hidden border-2 border-border/50 hover:border-primary/50 transition-all duration-500 hover:shadow-2xl hover:shadow-primary/10 bg-gradient-to-br from-card/50 to-card backdrop-blur-xl rounded-2xl animate-fade-in">
        <CardHeader className="bg-gradient-to-r from-primary/10 to-card pb-2">
          <CardTitle className="text-3xl font-bold text-primary flex items-center gap-2">
            {project.project_name}
          </CardTitle>
          <CardDescription className="text-muted-foreground">
            {project.small_description}
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="mb-4 flex flex-wrap gap-2">
            {project.skills.map((skill, index) => (
              <Badge key={index} variant="secondary" className="text-xs px-2 py-1 rounded-full bg-primary/10 text-primary border border-primary/20">{skill}</Badge>
            ))}
          </div>
          <div className="mb-6 prose prose-sm max-w-none text-foreground">
            <ReactMarkdown>{project.description}</ReactMarkdown>
          </div>
          <div className="flex space-x-2 pt-4">
            {project.project_repository && (
              <a href={project.project_repository} target="_blank" rel="noopener noreferrer" className="text-foreground hover:text-primary">
                <Github className="h-5 w-5" />
              </a>
            )}
            {project.project_live_link && (
              <a href={project.project_live_link} target="_blank" rel="noopener noreferrer" className="text-primary hover:text-accent">
                <ExternalLink className="h-5 w-5" />
              </a>
            )}
            {project.project_video && (
              <a href={project.project_video} target="_blank" rel="noopener noreferrer" className="text-accent hover:text-primary">
                <Play className="h-5 w-5" />
              </a>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  );
} 