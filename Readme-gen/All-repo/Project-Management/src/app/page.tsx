'use client';
import React from 'react';
import Link from 'next/link';
import { toast } from 'react-hot-toast';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { CheckCircle, Calendar, Layout, ArrowRight } from 'lucide-react';

const LandingPage = () => {
 const handleGetStarted = () => {
  toast.success('Redirecting to Sign Up...');
 };

 const features = [
  {
   title: 'Task Management',
   description:
    'Create, update, and delete tasks easily. Stay organized and efficient.',
   icon: CheckCircle,
  },
  {
   title: 'Project Organization',
   description:
    'Categorize tasks into projects and track progress effortlessly.',
   icon: Layout,
  },
  {
   title: 'Calendar Integration',
   description: 'Visualize your tasks with an interactive calendar view.',
   icon: Calendar,
  },
 ];

 return (
  <div className="min-h-screen flex flex-col">
   {/* Hero Section */}
   <section className="relative flex-1 overflow-hidden bg-gradient-to-b from-primary/10 via-primary/5 to-background dark:from-primary/5 dark:via-primary/2 dark:to-background pt-32 pb-20">
    <div className="container px-4 mx-auto relative z-10">
     <div className="max-w-3xl mx-auto text-center">
      <h1 className="text-5xl font-bold tracking-tight mb-6 bg-gradient-to-r from-primary to-primary/80 bg-clip-text text-transparent">
       Manage Your Tasks, Master Your Life
      </h1>
      <p className="text-xl text-muted-foreground mb-8">
       Organize, prioritize, and achieve more with ProjectZen – your personal
       task management system.
      </p>
      <Link href="/sign-up">
       <Button
        size="lg"
        className="px-8 rounded-full"
        onClick={handleGetStarted}
       >
        Get Started
        <ArrowRight className="ml-2 h-4 w-4" />
       </Button>
      </Link>
     </div>
    </div>
    <div className="absolute inset-0 bg-grid-primary/5 [mask-image:radial-gradient(ellipse_at_center,transparent_20%,black)]" />
   </section>

   {/* Features Section */}
   <section id="features" className="py-24 bg-muted/30">
    <div className="container px-4 mx-auto">
     <h2 className="text-3xl font-bold text-center mb-16 bg-gradient-to-r from-primary to-primary/80 bg-clip-text text-transparent">
      Powerful Features for Your Workflow
     </h2>
     <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
      {features.map((feature, index) => (
       <Card
        key={index}
        className="border-none shadow-lg bg-card/50 backdrop-blur-sm"
       >
        <CardHeader>
         <feature.icon className="h-12 w-12 text-primary mb-4" />
         <CardTitle className="text-xl">{feature.title}</CardTitle>
        </CardHeader>
        <CardContent>
         <p className="text-muted-foreground">{feature.description}</p>
        </CardContent>
       </Card>
      ))}
     </div>
    </div>
   </section>

   {/* CTA Section */}
   <section className="py-24 bg-primary text-primary-foreground">
    <div className="container px-4 mx-auto text-center">
     <div className="max-w-2xl mx-auto">
      <h2 className="text-4xl font-bold mb-6">
       Ready to take control of your tasks?
      </h2>
      <p className="text-xl opacity-90 mb-8">
       Join ProjectZen today and streamline your productivity.
      </p>
      <Link href="/sign-up">
       <Button
        variant="secondary"
        size="lg"
        className="px-8 rounded-full"
        onClick={handleGetStarted}
       >
        Sign Up Now
        <ArrowRight className="ml-2 h-4 w-4" />
       </Button>
      </Link>
     </div>
    </div>
   </section>
  </div>
 );
};

export default LandingPage;
