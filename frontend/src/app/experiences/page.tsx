'use client';

import { useEffect, useState } from 'react';
import { experiencesAPI } from '../../util/apiResponse.util';
import { Experience } from '../../data/types.data';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../../components/ui/card';
import { Badge } from '../../components/ui/badge';
import { Button } from '../../components/ui/button';
import { ExternalLink, Calendar, Building2, GraduationCap } from 'lucide-react';
import Image from 'next/image';
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
      <div className="mb-8">
        <h1 className="text-4xl font-bold mb-4">Work Experience</h1>
        <p className="text-gray-600">My professional journey and contributions</p>
      </div>
      
      {experiences.length === 0 ? (
        <Card>
          <CardContent className="text-center py-12">
            <span className="text-gray-400 mb-4 inline-block">
              <svg width="48" height="48" fill="none" viewBox="0 0 24 24"><path d="M12 17.75l-6.16 3.24 1.18-6.88L2 9.76l6.92-1.01L12 2.5l3.08 6.25L22 9.76l-5.02 4.35 1.18 6.88z" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round"/></svg>
            </span>
            <h3 className="text-lg font-medium text-gray-900 mb-2">No experiences yet</h3>
            <p className="text-gray-500 mb-4">Experiences will appear here when added.</p>
          </CardContent>
        </Card>
      ) : (
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {experiences.map((experience) => (
            <Card key={experience.inline?.id || experience.inline.id} className="flex flex-col overflow-hidden hover:shadow-lg transition-shadow">
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
              <CardContent className="flex-1 space-y-4">
                <p className="text-sm text-gray-600 line-clamp-3">
                  {experience.description.length > 150 
                    ? `${experience.description.substring(0, 150)}...` 
                    : experience.description
                  }
                </p>
                
                <div className="flex flex-wrap gap-2">
                  {experience.technologies.map((tech, index) => (
                    <Badge key={index} variant="outline" className="text-xs">
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

                <Link href={`/experiences/${experience.inline?.id || experience.inline.id}`}>
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