'use client';

import { Mail, Lock, ArrowRight, UserPlus } from 'lucide-react';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Button } from '@/components/ui/button';
import CosmicLoader from '@/components/Loader';
import { Input } from '@/components/ui/input';
import { useRouter } from 'next/navigation';
import apiRequest from '@/util/apiRequest';
import { useState } from 'react';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import Link from 'next/link';


const Page = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    if (password !== confirmPassword) {
      setError('Passwords do not match');
      setLoading(false);
      return;
    }

    try {
      const res = await apiRequest.post('/auth/register', {
        email,
        password,
      });

      if (res.status === 200) {
        router.push('/login');
      } else {
        setError('Failed to register');
      }
    } catch (error) {
      console.error(error);
      setError('Failed to register');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <div className="min-h-screen bg-gradient-to-br from-black to-indigo-950">
        <main className="container mx-auto px-4 py-8">
          <section className="mb-8 text-center">
            <h1 className="mb-4 text-4xl font-bold tracking-tight text-purple-200 md:text-5xl lg:text-6xl">
              Join Our Community
            </h1>
            <p className="mx-auto max-w-2xl text-lg text-purple-300">
              Create an account to start sharing and discovering amazing videos
            </p>
          </section>

          <div className="mx-auto max-w-md">
            {loading ? (
              <div className="flex min-h-[400px] items-center justify-center">
                <CosmicLoader />
              </div>
            ) : (
              <Card className="bg-black/40 backdrop-blur-sm border border-purple-900/30">
                <CardHeader className="space-y-1">
                  <div className="flex items-center justify-center space-x-2">
                    <UserPlus className="h-8 w-8 text-purple-300" />
                    <CardTitle className="text-2xl text-purple-200">
                      Create Account
                    </CardTitle>
                  </div>
                  <CardDescription className="text-purple-300">
                    Enter your details to register for an account
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <form onSubmit={handleRegister} className="space-y-4">
                    <div className="space-y-2">
                      <div className="relative">
                        <Mail className="absolute left-3 top-3 h-5 w-5 text-purple-300" />
                        <Input
                          type="email"
                          placeholder="Email"
                          value={email}
                          onChange={(e) => setEmail(e.target.value)}
                          className="pl-10 bg-black/40 border-purple-900/30 text-purple-200 placeholder:text-purple-400"
                          required
                        />
                      </div>
                    </div>
                    <div className="space-y-2">
                      <div className="relative">
                        <Lock className="absolute left-3 top-3 h-5 w-5 text-purple-300" />
                        <Input
                          type="password"
                          placeholder="Password"
                          value={password}
                          onChange={(e) => setPassword(e.target.value)}
                          className="pl-10 bg-black/40 border-purple-900/30 text-purple-200 placeholder:text-purple-400"
                          required
                        />
                      </div>
                    </div>
                    <div className="space-y-2">
                      <div className="relative">
                        <Lock className="absolute left-3 top-3 h-5 w-5 text-purple-300" />
                        <Input
                          type="password"
                          placeholder="Confirm Password"
                          value={confirmPassword}
                          onChange={(e) => setConfirmPassword(e.target.value)}
                          className="pl-10 bg-black/40 border-purple-900/30 text-purple-200 placeholder:text-purple-400"
                          required
                        />
                      </div>
                    </div>

                    {error && (
                      <Alert
                        variant="destructive"
                        className="bg-red-900/20 border-red-700/50"
                      >
                        <AlertDescription className="text-red-200">
                          {error}
                        </AlertDescription>
                      </Alert>
                    )}

                    <Button
                      type="submit"
                      className="w-full bg-purple-900/60 hover:bg-purple-800 text-purple-200 border border-purple-700/50"
                    >
                      Register
                      <ArrowRight className="ml-2 h-4 w-4" />
                    </Button>

                    <div className="text-center text-purple-300">
                      Already have an account?{' '}
                      <Link
                        href="/login"
                        className="text-purple-200 hover:text-purple-100 underline"
                      >
                        Login
                      </Link>
                    </div>
                  </form>
                </CardContent>
              </Card>
            )}
          </div>
        </main>
      </div>
    </div>
  );
};

export default Page;