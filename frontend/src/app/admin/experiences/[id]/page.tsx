'use client';

import { useEffect, useState } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { experiencesAPI } from '../../../../util/apiResponse.util';
import { Experience } from '../../../../data/types.data';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '../../../../components/ui/card';
import { Badge } from '../../../../components/ui/badge';
import { Button } from '../../../../components/ui/button';
import { ExternalLink, Calendar, Building2, GraduationCap } from 'lucide-react';
import Image from 'next/image';
import ReactMarkdown from 'react-markdown';

export default function AdminExperienceDetailPage({ params }: { params: { id: string } }) {
  const [experience, setExperience] = useState<Experience | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchExperience = async () => {
      try {
        const response = await experiencesAPI.getExperienceById(params.id);
        setExperience(response.data);
      } catch (err) {
        setError('Failed to load experience');
      } finally {
        setLoading(false);
      }
    };
    fetchExperience();
  }, [params.id]);

  if (loading) return (
    <div className="min-h-[40vh] flex items-center justify-center">
      <div className="animate-spin rounded-full h-12 w-12 border-t-4 border-primary border-solid"></div>
    </div>
  );
  if (error || !experience) return (
    <div className="min-h-[40vh] flex flex-col items-center justify-center gap-4">
      <div className="w-20 h-20 rounded-full bg-destructive/10 flex items-center justify-center">
        <span className="text-4xl">😢</span>
      </div>
      <div className="text-center space-y-2">
        <h2 className="text-2xl font-heading text-foreground">{error || 'Experience not found'}</h2>
      </div>
    </div>
  );

  return (
    <div className="max-w-3xl mx-auto py-10">
      <Card className="group relative overflow-hidden border-2 border-border/50 hover:border-secondary/50 transition-all duration-500 hover:shadow-2xl hover:shadow-secondary/10 bg-gradient-to-br from-card/50 to-card backdrop-blur-xl rounded-2xl animate-fade-in">
        <CardHeader className="bg-gradient-to-r from-secondary/10 to-card pb-2">
          <CardTitle className="text-3xl font-bold text-secondary flex items-center gap-2">
            {experience.position}
          </CardTitle>
          <CardDescription className="text-muted-foreground">
            {experience.company_name} • {new Date(experience.start_date).toLocaleDateString('en-US', { year: 'numeric', month: 'short' })} - {new Date(experience.end_date).toLocaleDateString('en-US', { year: 'numeric', month: 'short' })}
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="mb-4 flex flex-wrap gap-2">
            {experience.technologies.map((tech, index) => (
              <Badge key={index} variant="secondary" className="text-xs px-2 py-1 rounded-full bg-secondary/10 text-secondary border border-secondary/20">{tech}</Badge>
            ))}
          </div>
          <div className="mb-6 prose prose-sm max-w-none text-foreground">
            <ReactMarkdown>{experience.description}</ReactMarkdown>
          </div>
          <div className="flex space-x-2 pt-4">
            {experience.certificate_url && (
              <a href={experience.certificate_url} target="_blank" rel="noopener noreferrer" className="text-primary hover:text-accent">
                <ExternalLink className="h-5 w-5" />
              </a>
            )}
            {experience.company_logo && (
              <div className="relative h-8 w-8">
                <Image
                  src={experience.company_logo}
                  alt={`${experience.company_name} logo`}
                  fill
                  className="object-contain"
                />
              </div>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  );
} 