'use client';

import axios from 'axios';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import React, { useState, useEffect } from 'react';
import { Skeleton } from '@/components/ui/skeleton';
import { useParams, useRouter } from 'next/navigation';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Card, CardHeader, CardContent } from '@/components/ui/card';
import {
 Loader2,
 KeyRound,
 CheckCircle2,
 ShieldCheck,
 ArrowRight,
 Mail,
} from 'lucide-react';

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
   console.log(error);
   setError('Invalid code. Please try again.');
  } finally {
   setLoading(false);
  }
 };

 if (isLoading) {
  return (
   <div className="flex justify-center items-center min-h-screen bg-gradient-to-b from-background to-muted p-4">
    <Card className="w-full max-w-lg p-8 space-y-8 shadow-2xl border-primary/10 dark:bg-card/50 backdrop-blur-xl">
     <CardHeader className="space-y-6">
      <Skeleton className="h-16 w-16 rounded-full mx-auto" />
      <div className="space-y-4">
       <Skeleton className="h-8 w-3/4 mx-auto" />
       <Skeleton className="h-4 w-1/2 mx-auto" />
      </div>
     </CardHeader>
     <CardContent className="space-y-6">
      <Skeleton className="h-14 w-full rounded-lg" />
      <Skeleton className="h-14 w-full rounded-lg" />
     </CardContent>
    </Card>
   </div>
  );
 }

 return (
  <div className="flex justify-center items-center min-h-screen bg-gradient-to-b from-background to-muted p-4">
   <Card className="w-full max-w-lg p-8 space-y-8 shadow-2xl border-primary/10 dark:bg-card/50 backdrop-blur-xl transition-all duration-300 hover:shadow-lg hover:shadow-primary/5">
    <CardHeader className="text-center space-y-8">
     <div className="flex justify-center">
      <div className="relative">
       <div className="absolute -inset-1 bg-gradient-to-r from-primary to-secondary rounded-full blur-md opacity-70 group-hover:opacity-100 transition-all duration-300" />
       <div className="relative p-6 bg-card dark:bg-card/80 rounded-full ring-2 ring-primary/20 transition-transform hover:scale-105 backdrop-blur-sm">
        <ShieldCheck className="h-14 w-14 text-primary" />
       </div>
      </div>
     </div>
     <div className="space-y-3">
      <h2 className="text-4xl font-bold tracking-tight bg-gradient-to-r from-primary via-secondary to-accent bg-clip-text text-transparent">
       Verify Your Account
      </h2>
      <div className="flex items-center justify-center gap-2 text-muted-foreground text-lg">
       <Mail className="h-5 w-5" />
       <p>We sent a verification code to your email</p>
      </div>
     </div>
    </CardHeader>

    <CardContent className="space-y-8">
     <div className="relative group">
      <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
       <KeyRound className="h-6 w-6 text-muted-foreground group-hover:text-primary transition-colors duration-300" />
      </div>
      <Input
       type="text"
       value={code}
       onChange={(e) => setCode(e.target.value)}
       placeholder="Enter verification code"
       className="pl-12 h-14 text-lg tracking-widest text-center bg-background/50 border-2 border-muted hover:border-primary/50 focus:border-primary transition-all duration-300"
       maxLength={6}
      />
     </div>

     {error && (
      <Alert variant="destructive" className="border-2 bg-destructive/10">
       <AlertDescription className="flex items-center gap-2 text-destructive">
        <div className="h-2 w-2 rounded-full bg-destructive animate-pulse" />
        {error}
       </AlertDescription>
      </Alert>
     )}

     <Button
      onClick={handleSubmit}
      disabled={loading}
      className="w-full h-14 text-lg font-medium relative overflow-hidden group"
     >
      <div className="absolute inset-0 bg-gradient-to-r from-primary via-secondary to-accent opacity-80 group-hover:opacity-100 transition-opacity duration-300" />
      <span className="relative flex items-center justify-center gap-2">
       {loading ? (
        <>
         <Loader2 className="h-6 w-6 animate-spin" />
         Verifying...
        </>
       ) : (
        <>
         <CheckCircle2 className="h-6 w-6" />
         Verify Account
         <ArrowRight className="h-6 w-6 group-hover:translate-x-1 transition-transform duration-300" />
        </>
       )}
      </span>
     </Button>
    </CardContent>
   </Card>
  </div>
 );
};

export default Page;
