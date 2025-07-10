'use client';

import { useEffect, useState } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { certificationsAPI } from '../../../util/apiResponse.util';
import { Certification } from '../../../data/types.data';
import dynamic from 'next/dynamic';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '../../../components/ui/card';
import { Badge } from '../../../components/ui/badge';
import { Button } from '../../../components/ui/button';
import { ExternalLink, Award } from 'lucide-react';
import Image from 'next/image';

const TiptapEditor = dynamic(() => import('../../../components/TipTap'), { ssr: false });

export default function CertificationDetailPage({ params }: { params: { id: string } }) {
  const [certification, setCertification] = useState<Certification | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchCertification = async () => {
      try {
        const response = await certificationsAPI.getCertificationById(params.id);
        setCertification(response.data);
      } catch (err) {
        setError('Failed to load certification');
      } finally {
        setLoading(false);
      }
    };
    fetchCertification();
  }, [params.id]);

  if (loading) return <div>Loading...</div>;
  if (error || !certification) return <div>{error || 'Certification not found'}</div>;

  return (
    <div className="max-w-3xl mx-auto py-10">
      <Card>
        <CardHeader>
          <CardTitle>{certification.title}</CardTitle>
          <CardDescription>
            {certification.issuer} • {certification.issue_date} to {certification.expiry_date}
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="mb-4 flex flex-wrap gap-2">
            {certification.skills.map((skill, index) => (
              <Badge key={index} variant="outline" className="text-xs">{skill}</Badge>
            ))}
          </div>
          <div className="mb-6">
            <TiptapEditor content={certification.description} readOnly />
          </div>
          <div className="flex space-x-2 pt-4">
            {certification.certificate_url && (
              <a href={certification.certificate_url} target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:text-blue-800">
                <ExternalLink className="h-5 w-5" />
              </a>
            )}
            {certification.images && certification.images.length > 0 && certification.images[0] && (
              <div className="relative h-8 w-8">
                <Image
                  src={certification.images[0]}
                  alt={certification.title + " certificate image"}
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