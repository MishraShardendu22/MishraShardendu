'use client'

import { useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../../../components/ui/card'
import { Button } from '../../../components/ui/button'
import { UserPlus, LogIn } from 'lucide-react'
import Link from 'next/link'

export default function AdminRegisterPage() {
  const router = useRouter()

  useEffect(() => {
    // Redirect to login since the API handles both registration and login
    router.push('/admin/login')
  }, [router])

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-50 to-slate-100 p-4">
      <Card className="w-full max-w-md">
        <CardHeader className="text-center">
          <UserPlus className="mx-auto h-12 w-12 text-gray-400 mb-4" />
          <CardTitle className="text-2xl font-bold">Admin Registration</CardTitle>
          <CardDescription>
            Registration and login are handled through the same endpoint.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <p className="text-sm text-gray-600 text-center">
            The admin authentication system uses a single endpoint for both registration and login.
            If you&apos;re a new admin, you can register by using the login form with your credentials.
          </p>
          <Link href="/admin/login" className="block">
            <Button className="w-full">
              <LogIn className="mr-2 h-4 w-4" />
              Go to Login
            </Button>
          </Link>
        </CardContent>
      </Card>
    </div>
  )
} 