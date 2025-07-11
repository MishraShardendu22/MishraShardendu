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
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-background via-background to-muted/20 p-4">
      <Card className="w-full max-w-md group relative overflow-hidden border-2 border-border/50 hover:border-primary/50 transition-all duration-500 hover:shadow-2xl hover:shadow-primary/10 bg-gradient-to-br from-card/50 to-card backdrop-blur-xl rounded-2xl animate-fade-in">
        <CardHeader className="text-center">
          <UserPlus className="mx-auto h-12 w-12 text-primary mb-4 animate-fade-in" />
          <CardTitle className="text-3xl font-bold bg-gradient-to-r from-primary via-secondary to-accent bg-clip-text text-transparent">Admin Registration</CardTitle>
          <CardDescription className="text-muted-foreground">
            Registration and login are handled through the same endpoint.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <p className="text-base text-muted-foreground text-center">
            The admin authentication system uses a single endpoint for both registration and login.<br />
            If you&apos;re a new admin, you can register by using the login form with your credentials.
          </p>
          <Link href="/admin/login" className="block">
            <Button className="w-full mt-2 shadow-md hover:shadow-xl transition-all duration-200">
              <LogIn className="mr-2 h-5 w-5" />
              Go to Login
            </Button>
          </Link>
        </CardContent>
      </Card>
    </div>
  )
} 