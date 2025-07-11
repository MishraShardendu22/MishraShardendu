'use client';

import { useEffect, useState } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { certificationsAPI } from '../../../../util/apiResponse.util';
import { Certification } from '../../../../data/types.data';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '../../../../components/ui/card';
import { Badge } from '../../../../components/ui/badge';
import { Button } from '../../../../components/ui/button';
import { ExternalLink, Award } from 'lucide-react';
import Image from 'next/image';
import ReactMarkdown from 'react-markdown';

export default function AdminCertificationDetailPage({ params }: { params: { id: string } }) {
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

  if (loading) return (
    <div className="min-h-[40vh] flex items-center justify-center">
      <div className="animate-spin rounded-full h-12 w-12 border-t-4 border-primary border-solid"></div>
    </div>
  );
  if (error || !certification) return (
    <div className="min-h-[40vh] flex flex-col items-center justify-center gap-4">
      <div className="w-20 h-20 rounded-full bg-destructive/10 flex items-center justify-center">
        <span className="text-4xl">😢</span>
      </div>
      <div className="text-center space-y-2">
        <h2 className="text-2xl font-heading text-foreground">{error || 'Certification not found'}</h2>
      </div>
    </div>
  );

  return (
    <div className="max-w-3xl mx-auto py-10">
      <Card className="group relative overflow-hidden border-2 border-border/50 hover:border-primary/50 transition-all duration-500 hover:shadow-2xl hover:shadow-primary/10 bg-gradient-to-br from-card/50 to-card backdrop-blur-xl rounded-2xl animate-fade-in">
        <CardHeader className="bg-gradient-to-r from-primary/10 to-card pb-2">
          <CardTitle className="text-3xl font-bold text-primary flex items-center gap-2">
            {certification.title}
          </CardTitle>
          <CardDescription className="text-muted-foreground">
            {certification.issuer} • {certification.issue_date} to {certification.expiry_date}
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="mb-4 flex flex-wrap gap-2">
            {certification.skills.map((skill, index) => (
              <Badge key={index} variant="secondary" className="text-xs px-2 py-1 rounded-full bg-primary/10 text-primary border border-primary/20">{skill}</Badge>
            ))}
          </div>
          <div className="mb-6 prose prose-sm max-w-none text-foreground">
            <ReactMarkdown>{certification.description}</ReactMarkdown>
          </div>
          <div className="flex space-x-2 pt-4">
            {certification.certificate_url && (
              <a href={certification.certificate_url} target="_blank" rel="noopener noreferrer" className="text-primary hover:text-accent">
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