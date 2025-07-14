/* eslint-disable @typescript-eslint/no-explicit-any */
'use client';

import * as z from 'zod';
import React from 'react';
import axios from 'axios';
import Link from 'next/link';
import { useForm } from 'react-hook-form';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Skeleton } from '@/components/ui/skeleton';
import { zodResolver } from '@hookform/resolvers/zod';
import { signUpSchema } from '@/schema_zod/signUp.schema';
import {
 Form,
 FormField,
 FormItem,
 FormLabel,
 FormMessage,
} from '@/components/ui/form';
import {
 Card,
 CardHeader,
 CardContent,
 CardFooter,
} from '@/components/ui/card';
import {
 Loader2,
 UserPlus,
 Mail,
 Lock,
 CheckCircle2,
 XCircle,
 User,
 ArrowRight,
 Sparkles,
} from 'lucide-react';

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
   <div className="flex justify-center items-center min-h-screen bg-gradient-to-b from-background to-muted p-4">
    <Card className="w-full max-w-2xl p-8 space-y-8 shadow-2xl border-primary/10 dark:bg-card/50 backdrop-blur-xl">
     <CardHeader>
      <Skeleton className="h-16 w-16 rounded-full mx-auto mb-8" />
      <Skeleton className="h-8 w-3/4 mx-auto mb-4" />
      <Skeleton className="h-4 w-1/2 mx-auto" />
     </CardHeader>
     <CardContent className="space-y-8">
      {[1, 2, 3].map((i) => (
       <div key={i} className="space-y-2">
        <Skeleton className="h-4 w-24" />
        <Skeleton className="h-14 w-full rounded-lg" />
       </div>
      ))}
      <Skeleton className="h-14 w-full rounded-lg mt-8" />
     </CardContent>
    </Card>
   </div>
  );
 }

 return (
  <div className="flex justify-center items-center min-h-screen bg-gradient-to-b from-background to-muted p-4">
   <Card className="w-full max-w-2xl p-8 space-y-8 shadow-2xl border-primary/10 dark:bg-card/50 backdrop-blur-xl transition-all duration-300 hover:shadow-lg hover:shadow-primary/5">
    <CardHeader className="text-center space-y-6">
     <div className="flex justify-center">
      <div className="relative">
       <div className="absolute -inset-1 bg-gradient-to-r from-primary to-secondary rounded-full blur-md opacity-70 group-hover:opacity-100 transition-all duration-300" />
       <div className="relative p-6 bg-card dark:bg-card/80 rounded-full ring-2 ring-primary/20 transition-transform hover:scale-105 backdrop-blur-sm">
        <UserPlus className="h-14 w-14 text-primary" />
       </div>
      </div>
     </div>
     <div className="space-y-2">
      <div className="flex items-center justify-center gap-2">
       <h1 className="text-4xl font-bold tracking-tight bg-gradient-to-r from-primary via-secondary to-accent bg-clip-text text-transparent">
        Join ProjectZen
       </h1>
       <Sparkles className="h-6 w-6 text-accent animate-pulse" />
      </div>
      <p className="text-muted-foreground text-lg">
       Begin your Productivity journey
      </p>
     </div>
    </CardHeader>

    <CardContent className="max-w-xl mx-auto">
     <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
       <FormField
        name="username"
        control={form.control}
        render={({ field }) => (
         <FormItem>
          <FormLabel className="text-foreground font-medium text-lg">
           Username
          </FormLabel>
          <div className="relative group">
           <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
            <User className="h-5 w-5 text-muted-foreground group-hover:text-primary transition-colors duration-300" />
           </div>
           <Input
            {...field}
            className="pl-12 h-14 bg-background/50 border-2 border-muted hover:border-primary/50 focus:border-primary transition-all duration-300 text-lg"
            onChange={(e) => {
             field.onChange(e);
             setUsername(e.target.value);
            }}
           />
          </div>
          {isCheckingUsername ? (
           <div className="flex items-center gap-2 text-muted-foreground mt-2">
            <Loader2 className="h-4 w-4 animate-spin" />
            <span className="text-sm">Checking availability...</span>
           </div>
          ) : (
           usernameMessage && (
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
           )
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
          <FormLabel className="text-foreground font-medium text-lg">
           Email
          </FormLabel>
          <div className="relative group">
           <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
            <Mail className="h-5 w-5 text-muted-foreground group-hover:text-primary transition-colors duration-300" />
           </div>
           <Input
            {...field}
            className="pl-12 h-14 bg-background/50 border-2 border-muted hover:border-primary/50 focus:border-primary transition-all duration-300 text-lg"
           />
          </div>
          <p className="text-sm text-muted-foreground mt-2">
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
          <FormLabel className="text-foreground font-medium text-lg">
           Password
          </FormLabel>
          <div className="relative group">
           <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
            <Lock className="h-5 w-5 text-muted-foreground group-hover:text-primary transition-colors duration-300" />
           </div>
           <Input
            type="password"
            {...field}
            className="pl-12 h-14 bg-background/50 border-2 border-muted hover:border-primary/50 focus:border-primary transition-all duration-300 text-lg"
           />
          </div>
          <FormMessage />
         </FormItem>
        )}
       />

       <Button
        type="submit"
        className="w-full h-14 text-lg font-medium relative overflow-hidden group mt-8"
        disabled={isSubmitting}
       >
        <div className="absolute inset-0 bg-gradient-to-r from-primary via-secondary to-accent opacity-80 group-hover:opacity-100 transition-opacity duration-300" />
        <span className="relative flex items-center justify-center gap-2">
         {isSubmitting ? (
          <>
           <Loader2 className="h-6 w-6 animate-spin" />
           Creating account...
          </>
         ) : (
          <>
           Create Account
           <ArrowRight className="h-6 w-6 group-hover:translate-x-1 transition-transform duration-300" />
          </>
         )}
        </span>
       </Button>
      </form>
     </Form>
    </CardContent>

    <CardFooter className="text-center">
     <p className="text-muted-foreground w-full text-base">
      Already a member?{' '}
      <Link
       href="/sign-in"
       className="text-primary hover:text-primary/80 font-medium transition-colors inline-flex items-center gap-1 hover:gap-2"
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
