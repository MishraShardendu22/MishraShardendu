"use client";

import { useEffect, useState } from "react";
import { ProtectedRoute } from "../../../components/auth/protected-route";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "../../../components/ui/card";
import { Button } from "../../../components/ui/button";
import { Badge } from "../../../components/ui/badge";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "../../../components/ui/dialog";
import { Input } from "../../../components/ui/input";
import { Label } from "../../../components/ui/label";
import { Textarea } from "../../../components/ui/textarea";
import { Alert, AlertDescription } from "../../../components/ui/alert";
import { certificationsAPI } from "../../../util/apiResponse.util";
import {
  Certification,
  CreateCertificationRequest,
} from "../../../data/types.data";
import { Plus, Edit, Trash2, ExternalLink, Award } from "lucide-react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import Image from "next/image";

const certificationSchema = z.object({
  title: z.string().min(1, "Title is required"),
  description: z.string().min(1, "Description is required"),
  issuer: z.string().min(1, "Issuer is required"),
  skills: z.string().min(1, "Skills are required"),
  projects: z.string().optional(),
  certificate_url: z.string().url("Must be a valid URL"),
  images: z.string().optional(),
  issue_date: z.string().min(1, "Issue date is required"),
  expiry_date: z.string().min(1, "Expiry date is required"),
});

type CertificationFormData = z.infer<typeof certificationSchema>;

export default function AdminCertificationsPage() {
  const [certifications, setCertifications] = useState<Certification[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [editingCertification, setEditingCertification] = useState<Certification | null>(null);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<CertificationFormData>({
    resolver: zodResolver(certificationSchema),
  });

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
  }, []);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>{error}</div>;

  const onSubmit = async (data: CertificationFormData) => {
    try {
      const certData: CreateCertificationRequest = {
        ...data,
        skills: data.skills.split(",").map((s) => s.trim()),
        projects: data.projects ? data.projects.split(",").map((p) => p.trim()) : [],
        images: data.images ? data.images.split(",").map((img) => img.trim()) : [],
      };
      if (editingCertification) {
        console.log("Updating certification:", editingCertification.inline.id, certData);
        await certificationsAPI.updateCertification(editingCertification.inline.id, certData);
        setSuccess("Certification updated successfully");
      } else {
        await certificationsAPI.createCertification(certData);
        setSuccess("Certification created successfully");
      }
      setIsDialogOpen(false);
      setEditingCertification(null);
      reset();
      fetchCertifications();
    } catch (error) {
      setError("Failed to save certification");
    }
  };

  const handleEdit = (cert: Certification) => {
    setEditingCertification(cert);
    reset({
      title: cert.title,
      description: cert.description,
      issuer: cert.issuer,
      skills: cert.skills.join(", "),
      projects: cert.projects.join(", "),
      certificate_url: cert.certificate_url,
      images: cert.images.join(", "),
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
          <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
            <DialogTrigger asChild>
              <Button onClick={openDialog}>
                <Plus className="mr-2 h-4 w-4" />
                Add Certification
              </Button>
            </DialogTrigger>
            <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
              <DialogHeader>
                <DialogTitle>
                  {editingCertification ? "Edit Certification" : "Add New Certification"}
                </DialogTitle>
                <DialogDescription>
                  {editingCertification ? "Update your certification details." : "Add a new certification to your portfolio."}
                </DialogDescription>
              </DialogHeader>
              <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="title">Title</Label>
                    <Input id="title" {...register("title")} placeholder="Certification Title" />
                    {errors.title && <p className="text-sm text-red-500">{errors.title.message}</p>}
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="issuer">Issuer</Label>
                    <Input id="issuer" {...register("issuer")} placeholder="Google, AWS, etc." />
                    {errors.issuer && <p className="text-sm text-red-500">{errors.issuer.message}</p>}
                  </div>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="description">Description</Label>
                  <Textarea id="description" {...register("description")} placeholder="Certification description" rows={3} />
                  {errors.description && <p className="text-sm text-red-500">{errors.description.message}</p>}
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="skills">Skills (comma-separated)</Label>
                    <Input id="skills" {...register("skills")} placeholder="GCP, Kubernetes, Compute Engine" />
                    {errors.skills && <p className="text-sm text-red-500">{errors.skills.message}</p>}
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="projects">Projects (comma-separated, optional)</Label>
                    <Input id="projects" {...register("projects")} placeholder="Project1, Project2" />
                  </div>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="certificate_url">Certificate URL</Label>
                  <Input id="certificate_url" {...register("certificate_url")} placeholder="https://example.com/cert.pdf" />
                  {errors.certificate_url && <p className="text-sm text-red-500">{errors.certificate_url.message}</p>}
                </div>
                <div className="space-y-2">
                  <Label htmlFor="images">Image URLs (comma-separated, optional)</Label>
                  <Input id="images" {...register("images")} placeholder="https://example.com/img1.jpg, https://example.com/img2.jpg" />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="issue_date">Issue Date</Label>
                    <Input id="issue_date" type="date" {...register("issue_date")} />
                    {errors.issue_date && <p className="text-sm text-red-500">{errors.issue_date.message}</p>}
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="expiry_date">Expiry Date</Label>
                    <Input id="expiry_date" type="date" {...register("expiry_date")} />
                    {errors.expiry_date && <p className="text-sm text-red-500">{errors.expiry_date.message}</p>}
                  </div>
                </div>
                <div className="flex justify-end space-x-2">
                  <Button type="button" variant="outline" onClick={() => setIsDialogOpen(false)}>
                    Cancel
                  </Button>
                  <Button type="submit">
                    {editingCertification ? "Update Certification" : "Create Certification"}
                  </Button>
                </div>
              </form>
            </DialogContent>
          </Dialog>
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
          <Card>
            <CardContent className="text-center py-12">
              <Award className="mx-auto h-12 w-12 text-gray-400 mb-4" />
              <h3 className="text-lg font-medium text-gray-900 mb-2">No certifications yet</h3>
              <p className="text-gray-500 mb-4">
                Get started by adding your first certification.
              </p>
              <Button onClick={openDialog}>
                <Plus className="mr-2 h-4 w-4" />
                Add Your First Certification
              </Button>
            </CardContent>
          </Card>
        ) : (
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {certifications.map((cert) => (
              <Card key={cert.inline?.id || cert.inline.id} className="overflow-hidden">
                <CardHeader>
                  <div className="flex justify-between items-start">
                    <div className="flex-1">
                      <CardTitle className="text-lg">{cert.title}</CardTitle>
                      <CardDescription className="mt-2">
                        {cert.issuer} &mdash; {cert.issue_date} to {cert.expiry_date}
                      </CardDescription>
                    </div>
                    <div className="flex space-x-1">
                      <Button variant="ghost" size="sm" onClick={() => handleEdit(cert)}>
                        <Edit className="h-4 w-4" />
                      </Button>
                      <Button variant="ghost" size="sm" onClick={() => handleDelete(cert.inline.id)}>
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex flex-wrap gap-2">
                    {cert.skills.map((skill, idx) => (
                      <Badge key={idx} variant="secondary">
                        {skill}
                      </Badge>
                    ))}
                  </div>
                  <p className="text-sm text-gray-600 line-clamp-3">{cert.description}</p>
                  <div className="flex space-x-2">
                    {cert.certificate_url && (
                      <a
                        href={cert.certificate_url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-blue-600 hover:text-blue-800"
                      >
                        <ExternalLink className="h-4 w-4" />
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
                </CardContent>
              </Card>
            ))}
          </div>
        )}
      </div>
    </ProtectedRoute>
  );
} 