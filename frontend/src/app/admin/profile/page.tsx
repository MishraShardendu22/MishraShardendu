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

  if (loading) return <div>Loading...</div>
  if (error) return <div>{error}</div>

  const handleLogout = () => {
    logout()
  }

  return (
    <ProtectedRoute>
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Profile Settings</h1>
          <p className="text-foreground">
            Manage your account settings and preferences.
          </p>
        </div>

        <div className="grid gap-6 md:grid-cols-2">
          <Card>
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
                  <Mail className="h-4 w-4 text-gray-400" />
                  <Input
                    id="email"
                    value={profile?.email || ''}
                    disabled
                    className="bg-gray-50"
                  />
                </div>
                <p className="text-xs text-gray-500">
                  Email address cannot be changed
                </p>
              </div>

              <div className="space-y-2">
                <Label htmlFor="user-id">User ID</Label>
                <Input
                  id="user-id"
                  value={profile?.inline?.id || ''}
                  disabled
                  className="bg-gray-50"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="admin-status">Admin Status</Label>
                <div className="flex items-center space-x-2">
                  <Shield className="h-4 w-4 text-green-600" />
                  <Input
                    id="admin-status"
                    value="Administrator"
                    disabled
                    className="bg-gray-50"
                  />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Account Statistics</CardTitle>
              <CardDescription>
                Overview of your portfolio data
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="text-center p-4 bg-blue-50 rounded-lg">
                  <div className="text-2xl font-bold text-blue-600">
                    {profile?.skills?.length || 0}
                  </div>
                  <div className="text-sm text-gray-600">Skills</div>
                </div>
                <div className="text-center p-4 bg-green-50 rounded-lg">
                  <div className="text-2xl font-bold text-green-600">
                    {profile?.projects?.length || 0}
                  </div>
                  <div className="text-sm text-gray-600">Projects</div>
                </div>
                <div className="text-center p-4 bg-purple-50 rounded-lg">
                  <div className="text-2xl font-bold text-purple-600">
                    {profile?.experiences?.length || 0}
                  </div>
                  <div className="text-sm text-gray-600">Experiences</div>
                </div>
                <div className="text-center p-4 bg-orange-50 rounded-lg">
                  <div className="text-2xl font-bold text-orange-600">
                    Active
                  </div>
                  <div className="text-sm text-gray-600">Status</div>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Certifications</CardTitle>
              <CardDescription>
                Your professional certifications and achievements
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              {userCertifications.length === 0 ? (
                <div className="text-gray-500">No certifications yet.</div>
              ) : (
                <div className="space-y-2">
                  {userCertifications.map(cert => (
                    <div key={cert.inline.id} className="border rounded p-2">
                      <div className="font-semibold">{cert.title}</div>
                      <div className="text-xs text-gray-500">{cert.issuer} &mdash; {cert.issue_date} to {cert.expiry_date}</div>
                      <div className="text-sm text-gray-600 mt-1">{cert.description}</div>
                      <div className="flex flex-wrap gap-1 mt-1">
                        {cert.skills.map((skill, idx) => (
                          <span key={idx} className="bg-gray-200 text-xs rounded px-2 py-0.5 mr-1">{skill}</span>
                        ))}
                      </div>
                      {cert.certificate_url && (
                        <a href={cert.certificate_url} target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline text-xs mt-1 inline-block">View Certificate</a>
                      )}
                    </div>
                  ))}
                </div>
              )}
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Security</CardTitle>
              <CardDescription>
                Manage your account security
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label>Session Management</Label>
                <p className="text-sm text-gray-600">
                  You are currently logged in and have access to all admin features.
                </p>
              </div>
              <Button
                variant="outline"
                onClick={handleLogout}
                className="w-full"
              >
                Sign Out
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </ProtectedRoute>
  )
}
