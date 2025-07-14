/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { UserPlus, Mail, Lock, KeyRound } from 'lucide-react';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { useToast } from '@/hooks/use-toast';

const SignupPage = () => {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  
  const navigate = useNavigate();
  const { toast } = useToast();

  const handleSignup = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsLoading(true);

    if (password !== confirmPassword) {
      toast({
        variant: 'destructive',
        title: 'Password Error',
        description: 'Passwords do not match. Please try again.',
      });
      setIsLoading(false);
      return;
    }

    try {
      const response = await axios.post('http://127.0.0.1:3000/signup', {
        username: username.trim(),
        email: email.trim(),
        password,
      });

      if (response.status === 201) {
        toast({
          title: 'Success!',
          description: 'Account created successfully. Please verify your email.',
        });
        navigate('/otp');
      }
    } catch (error) {
      toast({
        variant: 'destructive',
        title: 'Error',
        description: (error as any).response?.data?.message || 'Signup failed. Please try again.',
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-[#1B1F38] p-4">

      {/* Logo or Brand Name */}
      <div className="mb-8">
        <h1 className="text-4xl font-bold text-[#E0B0FF] tracking-tight">Blog It Up</h1>
      </div>

      <Card className="w-full max-w-md bg-[#16172B] border-[#3C3F51] shadow-xl shadow-[#6A0DAD]/10">
        <CardHeader className="space-y-1 pb-8">
          <CardTitle className="text-2xl text-center font-bold text-[#E0B0FF]">
            Create an Account
          </CardTitle>
          <CardDescription className="text-center text-[#A6A6A6]">
            Enter your details below to create your account
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSignup} className="space-y-6">
            <div className="space-y-2">
              <Label className="text-[#D9D9D9] font-medium" htmlFor="username">Username</Label>
              <div className="relative group">
                <UserPlus className="absolute left-3 top-3 h-4 w-4 text-[#A6A6A6] group-hover:text-[#E0B0FF] transition-colors" />
                <Input
                  id="username"
                  placeholder="Enter username"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  className="pl-10 bg-[#3C3F51] border-[#3C3F51] text-[#D9D9D9] placeholder:text-[#A6A6A6] focus:border-[#6A0DAD] focus:ring-[#6A0DAD] transition-all"
                  required
                />
              </div>
            </div>
            
            <div className="space-y-2">
              <Label className="text-[#D9D9D9] font-medium" htmlFor="email">Email</Label>
              <div className="relative group">
                <Mail className="absolute left-3 top-3 h-4 w-4 text-[#A6A6A6] group-hover:text-[#E0B0FF] transition-colors" />
                <Input
                  id="email"
                  type="email"
                  placeholder="Enter email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="pl-10 bg-[#3C3F51] border-[#3C3F51] text-[#D9D9D9] placeholder:text-[#A6A6A6] focus:border-[#6A0DAD] focus:ring-[#6A0DAD] transition-all"
                  required
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label className="text-[#D9D9D9] font-medium" htmlFor="password">Password</Label>
              <div className="relative group">
                <Lock className="absolute left-3 top-3 h-4 w-4 text-[#A6A6A6] group-hover:text-[#E0B0FF] transition-colors" />
                <Input
                  id="password"
                  type="password"
                  placeholder="Enter password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="pl-10 bg-[#3C3F51] border-[#3C3F51] text-[#D9D9D9] placeholder:text-[#A6A6A6] focus:border-[#6A0DAD] focus:ring-[#6A0DAD] transition-all"
                  required
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label className="text-[#D9D9D9] font-medium" htmlFor="confirmPassword">Confirm Password</Label>
              <div className="relative group">
                <KeyRound className="absolute left-3 top-3 h-4 w-4 text-[#A6A6A6] group-hover:text-[#E0B0FF] transition-colors" />
                <Input
                  id="confirmPassword"
                  type="password"
                  placeholder="Confirm password"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
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
                  <span>Creating account...</span>
                </div>
              ) : (
                'Create Account'
              )}
            </Button>

            <div className="text-center text-[#A6A6A6] text-sm">
              Already have an account?{' '}
              <Button
                variant="link"
                className="text-[#E0B0FF] hover:text-[#6A0DAD] p-0 font-medium"
                onClick={() => navigate('/login')}
              >
                Sign in
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
};

export default SignupPage;