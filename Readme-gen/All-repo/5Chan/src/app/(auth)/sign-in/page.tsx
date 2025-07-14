/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { useForm } from "react-hook-form";
import { signIn } from "next-auth/react";
import {
  Form,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
  FormControl,
} from "@/components/ui/form";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { LogIn, Mail, Key, ArrowRight, Loader2 } from "lucide-react";
import { useState } from "react";

export default function SignInForm() {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);

  const form = useForm({
    defaultValues: {
      identifier: "",
      password: "",
    },
  });

  const onSubmit = async (data: any) => {
    setIsLoading(true);
    console.log("Form data:", data);

    try {
      const result = await signIn("credentials", {
        redirect: false,
        identifier: data.identifier,
        password: data.password,
      });

      console.log("Sign-in result:", result);

      if (result?.error) {
        alert("Login Failed: Incorrect username or password");
      }

      if (result?.url) {
        router.replace("/dashboard");
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gradient-to-b from-background to-secondary/10 p-4">
      <div className="w-full max-w-md">
        <Card className="border-none shadow-2xl bg-background/95 backdrop-blur">
          <CardHeader className="space-y-6 text-center pb-8">
            <div className="flex justify-center">
              <div className="bg-primary/10 p-4 rounded-full shadow-inner ring-1 ring-primary/20 hover:scale-105 transition-transform">
                <LogIn className="h-8 w-8 text-primary" />
              </div>
            </div>
            <div className="space-y-2">
              <CardTitle className="text-3xl font-bold">Welcome Back</CardTitle>
              <CardDescription className="text-base">
                Sign in to 5Chan to continue your secret conversations
              </CardDescription>
            </div>
          </CardHeader>
          <CardContent className="pb-8">
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                <FormField
                  name="identifier"
                  control={form.control}
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-sm font-medium">Email/Username</FormLabel>
                      <FormControl>
                        <div className="relative group">
                          <Mail className="absolute left-3 top-2.5 h-5 w-5 text-muted-foreground transition-colors group-hover:text-primary" />
                          <Input
                            {...field}
                            className="pl-11 h-12 border-muted/30 hover:border-primary focus:ring-1 focus:ring-primary transition-all"
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
                      <FormLabel className="text-sm font-medium">Password</FormLabel>
                      <FormControl>
                        <div className="relative group">
                          <Key className="absolute left-3 top-2.5 h-5 w-5 text-muted-foreground transition-colors group-hover:text-primary" />
                          <Input
                            type="password"
                            {...field}
                            className="pl-11 h-12 border-muted/30 hover:border-primary focus:ring-1 focus:ring-primary transition-all"
                            placeholder="Enter your password"
                          />
                        </div>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <Button
                  className="w-full h-12 text-base font-medium shadow-lg hover:shadow-xl transition-all"
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
                      <ArrowRight className="ml-2 h-5 w-5" />
                    </>
                  )}
                </Button>
              </form>
            </Form>
          </CardContent>
          <CardFooter className="flex flex-col space-y-6 pb-8">
            <div className="flex items-center w-full">
              <Separator className="flex-1" />
              <span className="mx-4 text-sm text-muted-foreground font-medium">or</span>
              <Separator className="flex-1" />
            </div>
            <div className="text-center text-sm">
              <span className="text-muted-foreground">New to True Feedback? </span>
              <Link
                href="/sign-up"
                className="text-primary hover:text-primary/80 font-semibold transition-colors inline-flex items-center gap-1 hover:gap-2"
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
