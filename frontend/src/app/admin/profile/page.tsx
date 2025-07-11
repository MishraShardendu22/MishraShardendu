'use client'

import { useEffect, useState } from 'react'
import { ProtectedRoute } from '../../../components/auth/protected-route'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../../../components/ui/card'
import { Button } from '../../../components/ui/button'
import { Input } from '../../../components/ui/input'
import { Label } from '../../../components/ui/label'
import { useAuth } from '../../../hooks/use-auth'
import { User, Mail, Shield } from 'lucide-react'
import api from '../../../util/api'
import { certificationsAPI } from '../../../util/apiResponse.util';
import { Certification } from '../../../data/types.data';

interface ProfileData {
  inline: {
    id: string
    created_at: string
    updated_at: string
  }
  email: string
  password: string
  admin_pass: string
  skills: string[]
  projects: string[]
  experiences: string[]
  certifications?: string[] | null
}


export default function AdminProfilePage() {
  const [profile, setProfile] = useState<ProfileData | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')
  const { logout } = useAuth()
  const [userCertifications, setUserCertifications] = useState<Certification[]>([]);

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const response = await api.get('/admin/auth')
        setProfile(response.data.data)
        // Fetch user certifications if present
        if (response.data.data.certifications && response.data.data.certifications.length > 0) {
          // Fetch all certifications and filter by user's certification IDs
          const allCertsResp = await certificationsAPI.getAllCertifications();
          const allCerts = Array.isArray(allCertsResp.data) ? allCertsResp.data : [];
          const userCerts = allCerts.filter(cert => response.data.data.certifications.includes(cert.inline.id));
          setUserCertifications(userCerts);
        } else {
          setUserCertifications([]);
        }
      } catch {
        setError('Failed to load profile')
      } finally {
        setLoading(false)
      }
    }
    fetchProfile()
  }, [])

  if (loading) return (
    <div className="min-h-[40vh] flex items-center justify-center">
      <div className="animate-spin rounded-full h-12 w-12 border-t-4 border-primary border-solid"></div>
    </div>
  )
  if (error) return (
    <div className="min-h-[40vh] flex flex-col items-center justify-center gap-4">
      <div className="w-20 h-20 rounded-full bg-destructive/10 flex items-center justify-center">
        <span className="text-4xl">😢</span>
      </div>
      <div className="text-center space-y-2">
        <h2 className="text-2xl font-heading text-foreground">Oops! Something went wrong</h2>
        <p className="text-muted-foreground text-lg">{error}</p>
      </div>
    </div>
  )

  const handleLogout = () => {
    logout()
  }

  return (
    <ProtectedRoute>
      <div className="space-y-12">
        <div className="text-center mb-12 space-y-8">
          <div className="inline-flex items-center gap-3 px-6 py-3 rounded-full bg-primary/10 border border-primary/20 backdrop-blur-sm">
            <span className="text-base font-medium text-primary">Profile Settings</span>
          </div>
          <h1 className="text-5xl md:text-7xl font-heading font-bold bg-gradient-to-r from-primary via-secondary to-accent bg-clip-text text-transparent leading-tight">
            Admin Profile
          </h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto leading-relaxed">
            Manage your account settings and preferences.
          </p>
        </div>

        <div className="grid gap-8 md:grid-cols-2">
          <div className="group relative overflow-hidden border-2 border-border/50 hover:border-primary/50 transition-all duration-500 hover:shadow-2xl hover:shadow-primary/10 hover:-translate-y-2 bg-gradient-to-br from-card/50 to-card backdrop-blur-sm rounded-2xl animate-fade-in">
            <CardHeader>
              <CardTitle className="flex items-center">
                <User className="mr-2 h-5 w-5" />
                Profile Information
              </CardTitle>
              <CardDescription>
                Your basic account information
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="email">Email Address</Label>
                <div className="flex items-center space-x-2">
                  <Mail className="h-4 w-4 text-muted-foreground" />
                  <Input
                    id="email"
                    value={profile?.email || ''}
                    disabled
                    className="bg-muted"
                  />
                </div>
                <p className="text-xs text-muted-foreground">
                  Email address cannot be changed
                </p>
              </div>

              <div className="space-y-2">
                <Label htmlFor="user-id">User ID</Label>
                <Input
                  id="user-id"
                  value={profile?.inline?.id || ''}
                  disabled
                  className="bg-muted"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="admin-status">Admin Status</Label>
                <div className="flex items-center space-x-2">
                  <Shield className="h-4 w-4 text-primary" />
                  <Input
                    id="admin-status"
                    value="Administrator"
                    disabled
                    className="bg-muted"
                  />
                </div>
              </div>
            </CardContent>
          </div>

          <div className="group relative overflow-hidden border-2 border-border/50 hover:border-secondary/50 transition-all duration-500 hover:shadow-2xl hover:shadow-secondary/10 hover:-translate-y-2 bg-gradient-to-br from-card/50 to-card backdrop-blur-sm rounded-2xl animate-fade-in">
            <CardHeader>
              <CardTitle>Account Statistics</CardTitle>
              <CardDescription>
                Overview of your portfolio data
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="text-center p-4 bg-primary/10 rounded-lg">
                  <div className="text-2xl font-bold text-primary">
                    {profile?.skills?.length || 0}
                  </div>
                  <div className="text-sm text-muted-foreground">Skills</div>
                </div>
                <div className="text-center p-4 bg-secondary/10 rounded-lg">
                  <div className="text-2xl font-bold text-secondary">
                    {profile?.projects?.length || 0}
                  </div>
                  <div className="text-sm text-muted-foreground">Projects</div>
                </div>
                <div className="text-center p-4 bg-accent/10 rounded-lg">
                  <div className="text-2xl font-bold text-accent">
                    {profile?.experiences?.length || 0}
                  </div>
                  <div className="text-sm text-muted-foreground">Experiences</div>
                </div>
                <div className="text-center p-4 bg-green-100 dark:bg-green-900/20 rounded-lg">
                  <div className="text-2xl font-bold text-green-600 dark:text-green-400">
                    Active
                  </div>
                  <div className="text-sm text-muted-foreground">Status</div>
                </div>
              </div>
            </CardContent>
          </div>

          <div className="group relative overflow-hidden border-2 border-border/50 hover:border-accent/50 transition-all duration-500 hover:shadow-2xl hover:shadow-accent/10 hover:-translate-y-2 bg-gradient-to-br from-card/50 to-card backdrop-blur-sm rounded-2xl animate-fade-in">
            <CardHeader>
              <CardTitle>Certifications</CardTitle>
              <CardDescription>
                Your professional certifications and achievements
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              {userCertifications.length === 0 ? (
                <div className="text-muted-foreground">No certifications yet.</div>
              ) : (
                <div className="space-y-2">
                  {userCertifications.map(cert => (
                    <div key={cert.inline.id} className="border rounded p-2 bg-card/80">
                      <div className="font-semibold text-primary">{cert.title}</div>
                      <div className="text-xs text-muted-foreground">{cert.issuer} &mdash; {cert.issue_date} to {cert.expiry_date}</div>
                      <div className="text-sm text-foreground mt-1">{cert.description}</div>
                      <div className="flex flex-wrap gap-1 mt-1">
                        {cert.skills.map((skill, idx) => (
                          <span key={idx} className="bg-primary/10 text-primary text-xs rounded px-2 py-0.5 mr-1">{skill}</span>
                        ))}
                      </div>
                      {cert.certificate_url && (
                        <a href={cert.certificate_url} target="_blank" rel="noopener noreferrer" className="text-primary hover:underline text-xs mt-1 inline-block">View Certificate</a>
                      )}
                    </div>
                  ))}
                </div>
              )}
            </CardContent>
          </div>

          <div className="group relative overflow-hidden border-2 border-border/50 hover:border-destructive/50 transition-all duration-500 hover:shadow-2xl hover:shadow-destructive/10 hover:-translate-y-2 bg-gradient-to-br from-card/50 to-card backdrop-blur-sm rounded-2xl animate-fade-in">
            <CardHeader>
              <CardTitle>Security</CardTitle>
              <CardDescription>
                Manage your account security
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label>Session Management</Label>
                <p className="text-sm text-muted-foreground">
                  You are currently logged in and have access to all admin features.
                </p>
              </div>
              <Button
                variant="destructive"
                onClick={handleLogout}
                className="w-full"
              >
                Sign Out
              </Button>
            </CardContent>
          </div>
        </div>
      </div>
    </ProtectedRoute>
  )
}
