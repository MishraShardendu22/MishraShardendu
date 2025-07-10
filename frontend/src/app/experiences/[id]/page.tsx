'use client';

import { useEffect, useState } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { experiencesAPI } from '../../../util/apiResponse.util';
import { Experience } from '../../../data/types.data';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '../../../components/ui/card';
import { Badge } from '../../../components/ui/badge';
import { Button } from '../../../components/ui/button';
import { ExternalLink, Calendar, Building2, GraduationCap } from 'lucide-react';
import Image from 'next/image';
import ReactMarkdown from 'react-markdown';

export default function ExperienceDetailPage({ params }: { params: { id: string } }) {
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

  if (loading) return <div>Loading...</div>;
  if (error || !experience) return <div>{error || 'Experience not found'}</div>;

  return (
    <div className="max-w-3xl mx-auto py-10">
      <Card>
        <CardHeader>
          <CardTitle>{experience.position}</CardTitle>
          <CardDescription>
            {experience.company_name} • {new Date(experience.start_date).toLocaleDateString('en-US', { year: 'numeric', month: 'short' })} - {new Date(experience.end_date).toLocaleDateString('en-US', { year: 'numeric', month: 'short' })}
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="mb-4 flex flex-wrap gap-2">
            {experience.technologies.map((tech, index) => (
              <Badge key={index} variant="outline" className="text-xs">{tech}</Badge>
            ))}
          </div>
          <div className="mb-6 prose prose-sm max-w-none">
            <ReactMarkdown>{experience.description}</ReactMarkdown>
          </div>
          <div className="flex space-x-2 pt-4">
            {experience.certificate_url && (
              <a href={experience.certificate_url} target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:text-blue-800">
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