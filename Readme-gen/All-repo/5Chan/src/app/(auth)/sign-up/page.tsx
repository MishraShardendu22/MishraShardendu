"use client"
/* eslint-disable @typescript-eslint/no-explicit-any */
import React from 'react';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import * as z from 'zod';
import { useRouter } from 'next/navigation';
import axios from 'axios';
import { zodResolver } from '@hookform/resolvers/zod';

import { Button } from '@/components/ui/button';
import {
  Form,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Card, CardHeader, CardContent, CardFooter } from '@/components/ui/card';
import { Skeleton } from '@/components/ui/skeleton';
import { 
  Loader2, 
  UserPlus, 
  Mail, 
  Lock, 
  CheckCircle2, 
  XCircle,
  User,
  ArrowRight
} from 'lucide-react';

import { signUpSchema } from '@/schema_zod/signUp.schema';

export default function SignUpForm() {
  const [username, setUsername] = useState('');
  const [usernameMessage, setUsernameMessage] = useState('');
  const [isCheckingUsername, setIsCheckingUsername] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  const router = useRouter();

  const form = useForm<z.infer<typeof signUpSchema>>({
    resolver: zodResolver(signUpSchema),
    defaultValues: {
      username: '',
      email: '',
      password: '',
    },
  });

  useEffect(() => {
    setTimeout(() => setIsLoading(false), 1000);
  }, []);

  useEffect(() => {
    const checkUsernameUnique = async () => {
      if (username) {
        setIsCheckingUsername(true);
        setUsernameMessage('');
        try {
          const response = await axios.get(
            `/api/check-username-unique?username=${username}`
          );
          setUsernameMessage(response.data.message);
        } catch (error: any) {
          setUsernameMessage(
            error.response?.data.message ?? 'Error checking username'
          );
        } finally {
          setIsCheckingUsername(false);
        }
      }
    };
    checkUsernameUnique();
  }, [username]);

  const onSubmit = async (data: z.infer<typeof signUpSchema>) => {
    setIsSubmitting(true);
    try {
      await axios.post('/api/sign-up', data);
      router.replace(`/verify/${username}`);
    } catch (error: any) {
      console.error('Error during sign-up:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  if (isLoading) {
    return (
      <div className="flex justify-center items-center min-h-screen bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-indigo-900 via-purple-900 to-slate-900">
        <Card className="w-full max-w-md p-8 space-y-8 bg-black/40 backdrop-blur-xl border-purple-500/20 shadow-2xl">
          <CardHeader>
            <Skeleton className="h-12 w-12 rounded-full mx-auto mb-6" />
            <Skeleton className="h-8 w-3/4 mx-auto mb-4" />
            <Skeleton className="h-4 w-1/2 mx-auto" />
          </CardHeader>
          <CardContent className="space-y-6">
            {[1, 2, 3].map((i) => (
              <div key={i} className="space-y-2">
                <Skeleton className="h-4 w-24" />
                <Skeleton className="h-12 w-full rounded-lg" />
              </div>
            ))}
            <Skeleton className="h-12 w-full rounded-lg mt-6" />
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="flex justify-center items-center min-h-screen bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-indigo-900 via-purple-900 to-slate-900 p-4">
      <Card className="w-full max-w-md p-8 space-y-8 bg-black/40 backdrop-blur-xl border-purple-500/20 shadow-2xl">
        <CardHeader className="text-center space-y-4">
          <div className="flex justify-center mb-6">
            <div className="p-4 bg-purple-500/10 rounded-full ring-2 ring-purple-500/20 hover:scale-105 transition-transform">
              <UserPlus className="h-12 w-12 text-purple-400" />
            </div>
          </div>
          <h1 className="text-4xl font-extrabold tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-purple-400 via-fuchsia-400 to-indigo-400">
            Join 5 Chan
          </h1>
          <p className="text-gray-400 text-lg">Begin your anonymous journey</p>
        </CardHeader>

        <CardContent>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
              <FormField
                name="username"
                control={form.control}
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-gray-200 font-medium">Username</FormLabel>
                    <div className="relative group">
                      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                        <User className="h-5 w-5 text-gray-400 group-hover:text-purple-400 transition-colors" />
                      </div>
                      <Input
                        {...field}
                        className="pl-10 h-12 bg-gray-800/50 border-gray-700 focus:border-purple-500 hover:border-purple-500/50 transition-colors"
                        onChange={(e) => {
                          field.onChange(e);
                          setUsername(e.target.value);
                        }}
                      />
                    </div>
                    {isCheckingUsername ? (
                      <div className="flex items-center gap-2 text-gray-400 mt-2">
                        <Loader2 className="h-4 w-4 animate-spin" />
                        <span className="text-sm">Checking availability...</span>
                      </div>
                    ) : usernameMessage && (
                      <div className="flex items-center gap-2 mt-2">
                        {usernameMessage === 'Username is unique' ? (
                          <>
                            <CheckCircle2 className="h-4 w-4 text-green-500" />
                            <span className="text-sm text-green-500">{usernameMessage}</span>
                          </>
                        ) : (
                          <>
                            <XCircle className="h-4 w-4 text-red-500" />
                            <span className="text-sm text-red-500">{usernameMessage}</span>
                          </>
                        )}
                      </div>
                    )}
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                name="email"
                control={form.control}
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-gray-200 font-medium">Email</FormLabel>
                    <div className="relative group">
                      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                        <Mail className="h-5 w-5 text-gray-400 group-hover:text-purple-400 transition-colors" />
                      </div>
                      <Input
                        {...field}
                        className="pl-10 h-12 bg-gray-800/50 border-gray-700 focus:border-purple-500 hover:border-purple-500/50 transition-colors"
                      />
                    </div>
                    <p className="text-sm text-gray-400 mt-2">
                      We&apos;ll send you a verification code
                    </p>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                name="password"
                control={form.control}
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-gray-200 font-medium">Password</FormLabel>
                    <div className="relative group">
                      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                        <Lock className="h-5 w-5 text-gray-400 group-hover:text-purple-400 transition-colors" />
                      </div>
                      <Input
                        type="password"
                        {...field}
                        className="pl-10 h-12 bg-gray-800/50 border-gray-700 focus:border-purple-500 hover:border-purple-500/50 transition-colors"
                      />
                    </div>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <Button
                type="submit"
                className="w-full h-12 bg-gradient-to-r from-purple-600 via-fuchsia-600 to-indigo-600 hover:from-purple-700 hover:via-fuchsia-700 hover:to-indigo-700 transition-all duration-300 shadow-lg hover:shadow-purple-500/20 text-base font-medium"
                disabled={isSubmitting}
              >
                {isSubmitting ? (
                  <>
                    <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                    Creating account...
                  </>
                ) : (
                  <>
                    Create Account
                    <ArrowRight className="ml-2 h-5 w-5" />
                  </>
                )}
              </Button>
            </form>
          </Form>
        </CardContent>

        <CardFooter className="text-center">
          <p className="text-gray-400 w-full text-base">
            Already a member?{' '}
            <Link
              href="/sign-in"
              className="text-purple-400 hover:text-purple-300 font-medium transition-colors inline-flex items-center gap-1 hover:gap-2"
            >
              Sign in
              <ArrowRight className="h-4 w-4" />
            </Link>
          </p>
        </CardFooter>
      </Card>
    </div>
  );
}