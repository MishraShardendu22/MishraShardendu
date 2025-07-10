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
import { CertificationAddDialog, CertificationCard, CertificationEmptyState } from '../../../components/admin/certifications';
import Link from 'next/link';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../../../components/ui/card";
import { Badge } from "../../../components/ui/badge";

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
      <div className="space-y-6">
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-bold tracking-tight">Certifications</h1>
            <p className="text-muted-foreground">
              Manage your certifications and professional achievements.
            </p>
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
          <Alert variant="destructive">
            <AlertDescription>{error}</AlertDescription>
          </Alert>
        )}

        {success && (
          <Alert>
            <AlertDescription>{success}</AlertDescription>
          </Alert>
        )}

        {certifications.length === 0 ? (
          <CertificationEmptyState onAdd={openDialog} />
        ) : (
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {certifications.map((cert) => (
              <Link key={cert.inline?.id || cert.inline.id} href={`/admin/certifications/${cert.inline?.id || cert.inline.id}`} className="block">
                <Card className="flex flex-col overflow-hidden hover:shadow-lg transition-shadow">
                  <CardHeader>
                    <CardTitle className="text-xl">{cert.title}</CardTitle>
                    <CardDescription>{cert.description.slice(0, 100) + (cert.description.length > 100 ? '...' : '')}</CardDescription>
                  </CardHeader>
                  <CardContent className="flex-1 space-y-4">
                    <div className="flex flex-wrap gap-2">
                      {cert.skills.map((skill, index) => (
                        <Badge key={index} variant="outline" className="text-xs">
                          {skill}
                        </Badge>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </Link>
            ))}
          </div>
        )}
      </div>
    </ProtectedRoute>
  );
} 