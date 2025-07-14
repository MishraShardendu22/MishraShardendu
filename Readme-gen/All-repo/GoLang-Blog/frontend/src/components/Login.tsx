import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { useToast } from '@/hooks/use-toast';
import { Label } from '@/components/ui/label';
import { LockIcon as Lock, Mail  } from 'lucide-react';

const LoginPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const navigate = useNavigate();
  const { toast } = useToast();

  const handleLogin = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const response = await fetch('http://127.0.0.1:3000/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          data: email,
          pass: password,
        }),
      });

      const data = await response.json();

      if (response.ok) {
        toast({
          title: 'Welcome back!',
          description: 'Login successful.',
        });

        localStorage.setItem('user-data-username', `${data.info.username}`);
        localStorage.setItem('user-data-email', `${data.info.email}`);
        localStorage.setItem('user-data-id', `${data.info._id}`);
        localStorage.setItem('token', data.token);

        navigate('/home');
      } else {
        toast({
          variant: 'destructive',
          title: 'Login failed',
          description: data.message || 'Please check your credentials and try again.',
        });
      }
    } catch {
      toast({
        variant: 'destructive',
        title: 'Error',
        description: 'Something went wrong. Please try again.',
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-[#1B1F38] p-4">
      <div className="mb-8">
        <h1 className="text-4xl font-bold text-[#E0B0FF] tracking-tight">Blog It Up</h1>
      </div>

      <Card className="w-full max-w-md bg-[#16172B] border-[#3C3F51] shadow-xl shadow-[#6A0DAD]/10">
        <CardHeader className="space-y-1 pb-8">
          <CardTitle className="text-2xl text-center font-bold text-[#E0B0FF]">
            Welcome Back
          </CardTitle>
          <CardDescription className="text-center text-[#A6A6A6]">
            Sign in to your account to continue
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleLogin} className="space-y-6">
            <div className="space-y-2">
              <Label className="text-[#D9D9D9] font-medium">Email/UserName</Label>
              <div className="relative group">
                <Mail className="absolute left-3 top-3 h-4 w-4 text-[#A6A6A6] group-hover:text-[#E0B0FF] transition-colors" />
                <Input
                  id="email"
                  type="email"
                  placeholder="Enter your email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="pl-10 bg-[#3C3F51] border-[#3C3F51] text-[#D9D9D9] placeholder:text-[#A6A6A6] focus:border-[#6A0DAD] focus:ring-[#6A0DAD] transition-all"
                  required
                />
              </div>
            </div>

            <div className="space-y-2">
              <div className="flex justify-between items-center">
                <Label className="text-[#D9D9D9] font-medium" htmlFor="password">Password</Label>
                <Button
                  variant="link"
                  className="text-[#E0B0FF] hover:text-[#6A0DAD] p-0 text-sm"
                  onClick={() => navigate('/forgot-password')}
                >
                  Forgot password?
                </Button>
              </div>
              <div className="relative group">
                <Lock className="absolute left-3 top-3 h-4 w-4 text-[#A6A6A6] group-hover:text-[#E0B0FF] transition-colors" />
                <Input
                  id="password"
                  type="password"
                  placeholder="Enter your password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="pl-10 bg-[#3C3F51] border-[#3C3F51] text-[#D9D9D9] placeholder:text-[#A6A6A6] focus:border-[#6A0DAD] focus:ring-[#6A0DAD] transition-all"
                  required
                />
              </div>
            </div>

            <Button 
              className="w-full bg-[#6A0DAD] hover:bg-[#5B2C6F] text-[#D9D9D9] h-11 font-medium shadow-lg shadow-[#6A0DAD]/20 hover:shadow-[#6A0DAD]/30 transition-all"
              type="submit"
              disabled={isLoading}
            >
              {isLoading ? (
                <div className="flex items-center gap-2">
                  <div className="w-4 h-4 border-2 border-t-transparent border-white rounded-full animate-spin" />
                  <span>Signing in...</span>
                </div>
              ) : (
                'Sign In'
              )}
            </Button>

            <div className="text-center text-[#A6A6A6] text-sm">
              Don't have an account?{' '}
              <Button
                variant="link"
                className="text-[#E0B0FF] hover:text-[#6A0DAD] p-0 font-medium"
                onClick={() => navigate('/signup')}
              >
                Sign up
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
};

export default LoginPage;