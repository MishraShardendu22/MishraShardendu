"use client"
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams, useRouter } from 'next/navigation';
import { Loader2, KeyRound, CheckCircle2, ShieldCheck, ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardHeader, CardContent } from '@/components/ui/card';
import { Skeleton } from '@/components/ui/skeleton';
import { Alert, AlertDescription } from '@/components/ui/alert';

const Page = () => {
  const router = useRouter();
  const params = useParams<{ username: string }>();
  const [code, setCode] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    setTimeout(() => setIsLoading(false), 1000);
  }, []);

  const handleSubmit = async () => {
    setLoading(true);
    setError('');

    try {
      await axios.post('/api/verify-code', {
        username: params.username,
        code: code,
      });
      router.replace('/sign-in');
    } catch (error) {
      console.log(error)
      setError('Invalid code. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  if (isLoading) {
    return (
      <div className="flex justify-center items-center min-h-screen bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-indigo-900 via-purple-900 to-slate-900 p-4">
        <Card className="w-full max-w-md p-8 space-y-8 bg-black/40 backdrop-blur-xl border-purple-500/20 shadow-2xl">
          <CardHeader className="space-y-6">
            <Skeleton className="h-12 w-12 rounded-full mx-auto" />
            <div className="space-y-4">
              <Skeleton className="h-8 w-3/4 mx-auto" />
              <Skeleton className="h-4 w-1/2 mx-auto" />
            </div>
          </CardHeader>
          <CardContent className="space-y-6">
            <Skeleton className="h-12 w-full rounded-lg" />
            <Skeleton className="h-12 w-full rounded-lg" />
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="flex justify-center items-center min-h-screen bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-indigo-900 via-purple-900 to-slate-900 p-4">
      <Card className="w-full max-w-md p-8 space-y-8 bg-black/40 backdrop-blur-xl border-purple-500/20 shadow-2xl">
        <CardHeader className="text-center space-y-6">
          <div className="flex justify-center">
            <div className="p-4 bg-purple-500/10 rounded-full ring-2 ring-purple-500/20 hover:scale-105 transition-transform">
              <ShieldCheck className="h-12 w-12 text-purple-400" />
            </div>
          </div>
          <div className="space-y-2">
            <h2 className="text-3xl font-bold tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-purple-400 via-fuchsia-400 to-indigo-400">
              Verify Your Account
            </h2>
            <p className="text-gray-400 text-lg">
              We sent a verification code to your email
            </p>
          </div>
        </CardHeader>

        <CardContent className="space-y-6">
          <div className="relative group">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <KeyRound className="h-5 w-5 text-gray-400 group-hover:text-purple-400 transition-colors" />
            </div>
            <Input
              type="text"
              value={code}
              onChange={(e) => setCode(e.target.value)}
              placeholder="Enter verification code"
              className="pl-10 h-12 bg-gray-800/50 border-gray-700 focus:border-purple-500 hover:border-purple-500/50 transition-colors text-lg tracking-wider text-center"
              maxLength={6}
            />
          </div>

          {error && (
            <Alert variant="destructive" className="bg-red-950/50 border-red-500/30 text-red-400">
              <AlertDescription className="flex items-center gap-2">
                <div className="h-1.5 w-1.5 rounded-full bg-red-500" />
                {error}
              </AlertDescription>
            </Alert>
          )}

          <Button
            onClick={handleSubmit}
            disabled={loading}
            className="w-full h-12 bg-gradient-to-r from-purple-600 via-fuchsia-600 to-indigo-600 hover:from-purple-700 hover:via-fuchsia-700 hover:to-indigo-700 transition-all duration-300 shadow-lg hover:shadow-purple-500/20 text-base font-medium"
          >
            {loading ? (
              <>
                <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                Verifying...
              </>
            ) : (
              <>
                <CheckCircle2 className="mr-2 h-5 w-5" />
                Verify Account
                <ArrowRight className="ml-2 h-5 w-5" />
              </>
            )}
          </Button>
        </CardContent>
      </Card>
    </div>
  );
};

export default Page;