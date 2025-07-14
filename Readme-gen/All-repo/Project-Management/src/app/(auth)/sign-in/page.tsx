/* eslint-disable @typescript-eslint/no-explicit-any */
'use client';
import Link from 'next/link';
import { useState } from 'react';
import { signIn } from 'next-auth/react';
import { useForm } from 'react-hook-form';
import { useRouter } from 'next/navigation';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { LogIn, Mail, Key, ArrowRight, Loader2 } from 'lucide-react';
import {
 Card,
 CardHeader,
 CardTitle,
 CardDescription,
 CardContent,
 CardFooter,
} from '@/components/ui/card';
import {
 Form,
 FormField,
 FormItem,
 FormLabel,
 FormMessage,
 FormControl,
} from '@/components/ui/form';

export default function SignInForm() {
 const router = useRouter();
 const [isLoading, setIsLoading] = useState(false);

 const form = useForm({
  defaultValues: {
   identifier: '',
   password: '',
  },
 });

 const onSubmit = async (data: any) => {
  setIsLoading(true);
  console.log('Form data:', data);

  try {
   const result = await signIn('credentials', {
    redirect: false,
    identifier: data.identifier,
    password: data.password,
   });

   console.log('Sign-in result:', result);

   if (result?.error) {
    alert('Login Failed: Incorrect username or password');
   }

   if (result?.url) {
    router.replace('/dashboard');
   }
  } finally {
   setIsLoading(false);
  }
 };

 return (
  <div className="min-h-screen w-full bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-primary/20 via-background to-background flex justify-center items-center px-4">
   <div className="w-full max-w-lg">
    <Card className="border-border/50 shadow-xl dark:shadow-primary/5 backdrop-blur-sm bg-background/95">
     <CardHeader className="space-y-6 text-center pb-6">
      <div className="flex justify-center">
       <div className="relative">
        <div className="absolute inset-0 bg-primary/20 blur-xl rounded-full" />
        <div className="relative bg-gradient-to-b from-primary/10 to-primary/5 p-4 rounded-full shadow-lg ring-1 ring-primary/20 hover:scale-110 transition-transform duration-300 hover:shadow-primary/20">
         <LogIn className="h-10 w-10 text-primary" />
        </div>
       </div>
      </div>
      <div className="space-y-2">
       <CardTitle className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
        Welcome Back
       </CardTitle>
       <CardDescription className="text-base md:text-lg text-muted-foreground">
        Sign in to ProjectZen
       </CardDescription>
      </div>
     </CardHeader>
     <CardContent className="px-6 md:px-8 pb-6">
      <Form {...form}>
       <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-5">
        <FormField
         name="identifier"
         control={form.control}
         render={({ field }) => (
          <FormItem>
           <FormLabel className="text-sm font-semibold">
            Email/Username
           </FormLabel>
           <FormControl>
            <div className="relative group">
             <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground transition-colors group-hover:text-primary" />
             <Input
              {...field}
              className="h-12 pl-10 bg-muted/30 border-muted/30 hover:border-primary focus:border-primary focus:ring-2 focus:ring-primary/20 transition-all duration-300"
              placeholder="Enter your email or username"
             />
            </div>
           </FormControl>
           <FormMessage />
          </FormItem>
         )}
        />
        <FormField
         name="password"
         control={form.control}
         render={({ field }) => (
          <FormItem>
           <FormLabel className="text-sm font-semibold">Password</FormLabel>
           <FormControl>
            <div className="relative group">
             <Key className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground transition-colors group-hover:text-primary" />
             <Input
              type="password"
              {...field}
              className="h-12 pl-10 bg-muted/30 border-muted/30 hover:border-primary focus:border-primary focus:ring-2 focus:ring-primary/20 transition-all duration-300"
              placeholder="Enter your password"
             />
            </div>
           </FormControl>
           <FormMessage />
          </FormItem>
         )}
        />
        <Button
         className="w-full h-12 text-base font-semibold shadow-lg hover:shadow-primary/20 transition-all duration-300 bg-gradient-to-r from-primary to-secondary hover:opacity-90 flex items-center justify-center"
         type="submit"
         disabled={isLoading}
        >
         {isLoading ? (
          <>
           <Loader2 className="mr-2 h-5 w-5 animate-spin" />
           Signing in...
          </>
         ) : (
          <>
           Sign In
           <ArrowRight className="ml-2 h-5 w-5 transition-transform group-hover:translate-x-1" />
          </>
         )}
        </Button>
       </form>
      </Form>
     </CardContent>
     <CardFooter className="flex flex-col space-y-6 pb-6 px-6 md:px-8">
      <div className="flex items-center w-full gap-4">
       <Separator className="flex-1 bg-muted/50" />
       <span className="text-sm text-muted-foreground font-medium px-2">
        or continue with
       </span>
       <Separator className="flex-1 bg-muted/50" />
      </div>
      <div className="text-center">
       <span className="text-muted-foreground text-sm">
        New to ProjectZen?{' '}
       </span>
       <Link
        href="/sign-up"
        className="text-primary hover:text-primary/80 font-semibold transition-all duration-300 inline-flex items-center gap-1 hover:gap-2"
       >
        Create an account
        <ArrowRight className="h-4 w-4" />
       </Link>
      </div>
     </CardFooter>
    </Card>
   </div>
  </div>
 );
}
