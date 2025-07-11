"use client";

import { useEffect, useState } from "react";
import { ProtectedRoute } from "../../../components/auth/protected-route";
import { Alert, AlertDescription } from "../../../components/ui/alert";
import { certificationsAPI } from "../../../util/apiResponse.util";
import {
  Certification,
  CreateCertificationRequest,
} from "../../../data/types.data";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { projectsAPI, skillsAPI } from '../../../util/apiResponse.util';
import { CertificationAddDialog, CertificationEmptyState } from '../../../components/admin/certifications';
import Link from 'next/link';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../../../components/ui/card";
import { Badge } from "../../../components/ui/badge";
import { Button } from "../../../components/ui/button";
import { Edit, Trash2, ExternalLink, Award } from 'lucide-react';
import Image from 'next/image';

const certificationSchema = z.object({
  title: z.string().min(1, 'Title is required'),
  description: z.string().min(1, 'Description is required'),
  issuer: z.string().min(1, 'Issuer is required'),
  skills: z.array(z.string()).min(1, 'At least one skill is required'),
  projects: z.array(z.string()),
  certificate_url: z.string().url('Must be a valid URL'),
  images: z.string().optional(),
  issue_date: z.string().min(1, 'Issue date is required'),
  expiry_date: z.string().min(1, 'Expiry date is required'),
});

type CertificationFormData = z.infer<typeof certificationSchema>;

export default function AdminCertificationsPage() {
  const [certifications, setCertifications] = useState<Certification[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [editingCertification, setEditingCertification] = useState<Certification | null>(null);
  const [allProjects, setAllProjects] = useState<{ id: string; name: string }[]>([]);
  const [allSkills, setAllSkills] = useState<string[]>([]);

  const {
    register,
    handleSubmit,
    reset,
    setValue,
    watch,
    formState: { errors },
  } = useForm<CertificationFormData>({
    resolver: zodResolver(certificationSchema),
    defaultValues: { skills: [], projects: [] },
  });

  const selectedSkills = watch('skills');
  const selectedProjects = watch('projects');

  const fetchCertifications = async () => {
    try {
      const response = await certificationsAPI.getAllCertifications();
      console.log("Fetched certifications:", response);

      setCertifications(Array.isArray(response.data) ? response.data : (response.data === null ? [] : []));
    } catch (error) {
      setError("Failed to fetch certifications");
      setCertifications([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCertifications();
    // Fetch all projects and skills for dropdowns
    const fetchProjectsAndSkills = async () => {
      const projectsRes = await projectsAPI.getAllProjects();
      setAllProjects(Array.isArray(projectsRes.data) ? projectsRes.data.map((p: any) => ({ id: p.inline.id, name: p.project_name })) : []);
      const skillsRes = await skillsAPI.getSkills();
      setAllSkills(Array.isArray(skillsRes.data) ? skillsRes.data : []);
    };
    fetchProjectsAndSkills();
  }, []);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>{error}</div>;

  const onSubmit = async (data: CertificationFormData) => {
    try {
      const certData: CreateCertificationRequest = {
        ...data,
        images: data.images ? data.images.split(',').map((img) => img.trim()) : [],
      };
      if (editingCertification) {
        await certificationsAPI.updateCertification(editingCertification.inline.id, certData);
        setSuccess('Certification updated successfully');
      } else {
        await certificationsAPI.createCertification(certData);
        setSuccess('Certification created successfully');
      }
      setIsDialogOpen(false);
      setEditingCertification(null);
      reset({ skills: [], projects: [] });
      fetchCertifications();
    } catch (error) {
      setError('Failed to save certification');
    }
  };

  const handleEdit = (cert: Certification) => {
    setEditingCertification(cert);
    reset({
      title: cert.title,
      description: cert.description,
      issuer: cert.issuer,
      skills: cert.skills,
      projects: cert.projects,
      certificate_url: cert.certificate_url,
      images: cert.images.join(', '),
      issue_date: cert.issue_date,
      expiry_date: cert.expiry_date,
    });
    setIsDialogOpen(true);
  };

  const handleDelete = async (certId: string) => {
    if (confirm("Are you sure you want to delete this certification?")) {
      try {
        await certificationsAPI.deleteCertification(certId);
        setSuccess("Certification deleted successfully");
        fetchCertifications();
      } catch (error) {
        setError("Failed to delete certification");
      }
    }
  };

  const openDialog = () => {
    setEditingCertification(null);
    reset();
    setIsDialogOpen(true);
  };

  return (
    <ProtectedRoute>
      <div className="space-y-8">
        <div className="flex flex-col md:flex-row md:justify-between md:items-center gap-4 md:gap-0 pb-2 border-b border-gray-200">
          <div>
            <h1 className="text-4xl font-extrabold tracking-tight text-primary mb-1">Certifications</h1>
            <p className="text-muted-foreground text-lg">Manage your certifications and professional achievements.</p>
          </div>
          <CertificationAddDialog
            open={isDialogOpen}
            setOpen={setIsDialogOpen}
            onSubmit={onSubmit}
            errors={errors}
            register={register}
            handleSubmit={handleSubmit}
            reset={reset}
            setValue={setValue}
            watch={watch}
            editingCertification={editingCertification}
            allSkills={allSkills}
            allProjects={allProjects}
            openDialog={openDialog}
          />
        </div>

        {error && (
          <Alert variant="destructive" className="animate-fade-in">
            <AlertDescription>{error}</AlertDescription>
          </Alert>
        )}

        {success && (
          <Alert className="animate-fade-in">
            <AlertDescription>{success}</AlertDescription>
          </Alert>
        )}

        {certifications.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-16 animate-fade-in">
            <CertificationEmptyState onAdd={openDialog} />
          </div>
        ) : (
          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
            {certifications.map((cert) => (
              <Card key={cert.inline?.id || cert.inline.id} className="flex flex-col overflow-hidden shadow-md hover:shadow-xl transition-shadow duration-200 border border-gray-200 bg-white animate-fade-in">
                <CardHeader className="bg-gradient-to-r from-blue-50 to-white pb-2">
                  <CardTitle className="text-2xl font-semibold text-primary flex items-center gap-2">
                    <Award className="h-5 w-5 text-blue-500" />
                    {cert.title}
                  </CardTitle>
                  <CardDescription className="text-gray-500">
                    {cert.issuer} &bull; {cert.issue_date} to {cert.expiry_date}
                  </CardDescription>
                </CardHeader>
                <CardContent className="flex-1 flex flex-col gap-4 p-5">
                  <p className="text-base text-gray-700 line-clamp-4">
                    {cert.description.length > 180 
                      ? `${cert.description.substring(0, 180)}...` 
                      : cert.description
                    }
                  </p>
                  <div className="flex flex-wrap gap-2">
                    {cert.skills.map((skill, index) => (
                      <Badge key={index} variant="secondary" className="text-xs px-2 py-1 rounded-full bg-blue-50 text-blue-700 border border-blue-200">
                        {skill}
                      </Badge>
                    ))}
                  </div>
                  <div className="flex items-center gap-3 pt-2">
                    {cert.certificate_url && (
                      <a
                        href={cert.certificate_url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-blue-600 hover:text-blue-800 transition-colors"
                        aria-label="Open certificate link"
                      >
                        <ExternalLink className="h-5 w-5" />
                      </a>
                    )}
                    {cert.images && cert.images.length > 0 && cert.images[0] && (
                      <div className="relative h-10 w-10 rounded overflow-hidden border border-gray-200">
                        <Image
                          src={cert.images[0]}
                          alt={cert.title + ' certificate image'}
                          fill
                          className="object-contain"
                        />
                      </div>
                    )}
                  </div>
                  <div className="flex gap-2 pt-2 mt-auto">
                    <Link href={`/admin/certifications/${cert.inline?.id || cert.inline.id}`}>
                      <Button variant="outline" size="sm" className="flex-1">
                        View Details
                      </Button>
                    </Link>
                    <Button 
                      variant="outline" 
                      size="sm" 
                      onClick={() => handleEdit(cert)}
                      className="flex-1"
                      aria-label="Edit certification"
                    >
                      <Edit className="h-4 w-4" />
                    </Button>
                    <Button 
                      variant="outline" 
                      size="sm" 
                      onClick={() => handleDelete(cert.inline?.id || cert.inline.id)}
                      className="text-red-600 hover:text-red-700"
                      aria-label="Delete certification"
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        )}
      </div>
    </ProtectedRoute>
  );
} 