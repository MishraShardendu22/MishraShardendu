import { Eye, EyeOff, Shield } from 'lucide-react'
import { useState } from 'preact/hooks'
import { route } from 'preact-router'
import toast from 'react-hot-toast'
import { Alert, AlertDescription } from '../components/ui/alert'
import { Button } from '../components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../components/ui/card'
import { Input } from '../components/ui/input'
import { Label } from '../components/ui/label'
import { useAuth } from '../hooks/use-auth'

export default function LoginPage() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [adminPass, setAdminPass] = useState('')
  const [showPassword, setShowPassword] = useState(false)
  const [showAdminPass, setShowAdminPass] = useState(false)
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)
  const { login } = useAuth()

  const handleSubmit = async (e: Event) => {
    e.preventDefault()
    setError('')
    setLoading(true)

    try {
      const result = await login({ email, password, admin_pass: adminPass })

      if (result.success) {
        toast.success('Login successful!')
        setTimeout(() => route('/admin/dashboard'), 500)
      } else {
        setError(result.error || 'Login failed')
        toast.error(result.error || 'Login failed')
      }
    } catch {
      setError('An error occurred')
      toast.error('An error occurred')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen w-full flex items-center justify-center bg-linear-to-br from-background via-background/95 to-background p-4">
      <div className="space-y-8 max-w-md w-full">
        <div className="text-center space-y-4">
          <div className="flex justify-center mb-4">
            <div className="p-4 rounded-2xl bg-linear-to-br from-secondary/20 to-primary/20 border-2 border-secondary/30">
              <Shield className="h-12 w-12 text-secondary" />
            </div>
          </div>
          <h1 className="text-3xl md:text-4xl font-bold bg-linear-to-r from-secondary via-primary to-accent bg-clip-text text-transparent">
            Admin Access Portal
          </h1>
          <p className="text-base text-foreground/70">Secure authentication required</p>
        </div>

        <Card className="border-2 border-border/50 hover:border-secondary/50 transition-all duration-500 hover:shadow-2xl">
          <CardHeader>
            <CardTitle className="text-2xl font-bold text-secondary">Sign In</CardTitle>
            <CardDescription>Enter your credentials</CardDescription>
          </CardHeader>
          <CardContent>
            {error && (
              <Alert className="mb-4 border-destructive/50 bg-destructive/10">
                <AlertDescription className="text-destructive">{error}</AlertDescription>
              </Alert>
            )}

            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail((e.target as HTMLInputElement).value)}
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="password">Password</Label>
                <div className="relative">
                  <Input
                    id="password"
                    type={showPassword ? 'text' : 'password'}
                    value={password}
                    onChange={(e) => setPassword((e.target as HTMLInputElement).value)}
                    placeholder="Enter your password"
                    required
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 -translate-y-1/2"
                  >
                    {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                  </button>
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="adminPass">Admin Password</Label>
                <div className="relative">
                  <Input
                    id="adminPass"
                    type={showAdminPass ? 'text' : 'password'}
                    value={adminPass}
                    onChange={(e) => setAdminPass((e.target as HTMLInputElement).value)}
                    placeholder="Enter admin password"
                    required
                  />
                  <button
                    type="button"
                    onClick={() => setShowAdminPass(!showAdminPass)}
                    className="absolute right-3 top-1/2 -translate-y-1/2"
                  >
                    {showAdminPass ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                  </button>
                </div>
              </div>

              <Button type="submit" className="w-full" disabled={loading}>
                {loading ? 'Signing In...' : 'Sign In'}
              </Button>
            </form>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
