'use client';

import { useEffect, useState } from 'react';
import { certificationsAPI } from '../../util/apiResponse.util';
import { Certification } from '../../data/types.data';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '../../components/ui/card';
import { Badge } from '../../components/ui/badge';
import { Button } from '../../components/ui/button';
import { ExternalLink, Award } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';

export default function CertificationsPage() {
  const [certifications, setCertifications] = useState<Certification[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchCertifications = async () => {
      try {
        const response = await certificationsAPI.getAllCertifications();
        setCertifications(Array.isArray(response.data) ? response.data : []);
      } catch (err) {
        setError('Failed to load certifications');
      } finally {
        setLoading(false);
      }
    };
    fetchCertifications();
  }, []);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>{error}</div>;

  return (
    <div className="container mx-auto p-4">
      <div className="mb-8">
        <h1 className="text-4xl font-bold mb-4">Certifications</h1>
        <p className="text-gray-600">Professional certifications and credentials</p>
      </div>
      
      {certifications.length === 0 ? (
        <Card>
          <CardContent className="text-center py-12">
            <span className="text-gray-400 mb-4 inline-block">
              <svg width="48" height="48" fill="none" viewBox="0 0 24 24"><path d="M12 17.75l-6.16 3.24 1.18-6.88L2 9.76l6.92-1.01L12 2.5l3.08 6.25L22 9.76l-5.02 4.35 1.18 6.88z" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round"/></svg>
            </span>
            <h3 className="text-lg font-medium text-gray-900 mb-2">No certifications yet</h3>
            <p className="text-gray-500 mb-4">Certifications will appear here when added.</p>
          </CardContent>
        </Card>
      ) : (
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {certifications.map((cert) => (
            <Card key={cert.inline?.id || cert.inline.id} className="flex flex-col overflow-hidden hover:shadow-lg transition-shadow">
              <CardHeader>
                <CardTitle className="text-xl">{cert.title}</CardTitle>
                <CardDescription>
                  {cert.issuer} • {cert.issue_date} to {cert.expiry_date}
                </CardDescription>
              </CardHeader>
              <CardContent className="flex-1 space-y-4">
                <p className="text-sm text-gray-600 line-clamp-3">
                  {cert.description.length > 150 
                    ? `${cert.description.substring(0, 150)}...` 
                    : cert.description
                  }
                </p>
                
                <div className="flex flex-wrap gap-2">
                  {cert.skills.map((skill, index) => (
                    <Badge key={index} variant="outline" className="text-xs">
                      {skill}
                    </Badge>
                  ))}
                </div>

                <div className="flex space-x-2 pt-4">
                  {cert.certificate_url && (
                    <a
                      href={cert.certificate_url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-blue-600 hover:text-blue-800"
                    >
                      <ExternalLink className="h-5 w-5" />
                    </a>
                  )}
                  {cert.images && cert.images.length > 0 && cert.images[0] && (
                    <div className="relative h-8 w-8">
                      <Image
                        src={cert.images[0]}
                        alt={cert.title + " certificate image"}
                        fill
                        className="object-contain"
                      />
                    </div>
                  )}
                </div>

                <Link href={`/certifications/${cert.inline?.id || cert.inline.id}`}>
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