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

  if (loading) return <div>Loading...</div>;
  if (error || !project) return <div>{error || 'Project not found'}</div>;

  return (
    <div className="max-w-3xl mx-auto py-10">
      <Card>
        <CardHeader>
          <CardTitle>{project.project_name}</CardTitle>
          <CardDescription>{project.small_description}</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="mb-4 flex flex-wrap gap-2">
            {project.skills.map((skill, index) => (
              <Badge key={index} variant="outline" className="text-xs">{skill}</Badge>
            ))}
          </div>
          <div className="mb-6 prose prose-sm max-w-none">
            <ReactMarkdown>{project.description}</ReactMarkdown>
          </div>
          <div className="flex space-x-2 pt-4">
            {project.project_repository && (
              <a href={project.project_repository} target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:text-blue-800">
                <Github className="h-5 w-5" />
              </a>
            )}
            {project.project_live_link && (
              <a href={project.project_live_link} target="_blank" rel="noopener noreferrer" className="text-green-600 hover:text-green-800">
                <ExternalLink className="h-5 w-5" />
              </a>
            )}
            {project.project_video && (
              <a href={project.project_video} target="_blank" rel="noopener noreferrer" className="text-red-600 hover:text-red-800">
                <Play className="h-5 w-5" />
              </a>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  );
} 