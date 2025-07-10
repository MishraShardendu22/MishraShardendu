'use client';

import { useEffect, useState } from 'react';
import { experiencesAPI } from '../../util/apiResponse.util';
import { Experience } from '../../data/types.data';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../../components/ui/card';
import { Badge } from '../../components/ui/badge';
import Link from 'next/link';

export default function ExperiencesPage() {
  const [experiences, setExperiences] = useState<Experience[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchExperiences = async () => {
      try {
        const response = await experiencesAPI.getAllExperiences();
        setExperiences(Array.isArray(response.data) ? response.data : []);
      } catch (err) {
        setError('Failed to load experiences');
      } finally {
        setLoading(false);
      }
    };
    fetchExperiences();
  }, []);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>{error}</div>;

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-4xl font-bold mb-4">Work Experience</h1>
      <p className="text-lg mb-6">
        My professional journey and contributions across various companies and projects.
      </p>
      <div className="grid gap-6">
        {experiences.map((experience) => (
          <Link key={experience.inline?.id || experience.inline.id} href={`/experiences/${experience.inline?.id || experience.inline.id}`} className="block">
            <Card className="flex flex-col overflow-hidden hover:shadow-lg transition-shadow">
              <CardHeader>
                <CardTitle className="text-xl">{experience.position}</CardTitle>
                <CardDescription>
                  {experience.company_name} • {new Date(experience.start_date).toLocaleDateString('en-US', { year: 'numeric', month: 'short' })} - {new Date(experience.end_date).toLocaleDateString('en-US', { year: 'numeric', month: 'short' })}
                </CardDescription>
              </CardHeader>
              <CardContent className="flex-1 space-y-4">
                <div className="flex flex-wrap gap-2">
                  {experience.technologies.map((tech, index) => (
                    <Badge key={index} variant="outline" className="text-xs">
                      {tech}
                    </Badge>
                  ))}
                </div>
                <p className="text-sm text-gray-600 line-clamp-3">
                  {experience.description.slice(0, 150) + (experience.description.length > 150 ? '...' : '')}
                </p>
              </CardContent>
            </Card>
          </Link>
        ))}
      </div>
    </div>
  );
} 