'use client';
/* eslint-disable @next/next/no-img-element */
import React from 'react';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent } from '@/components/ui/card';
import {
 Users,
 Target,
 BookOpen,
 Github,
 Code2,
 Building2,
} from 'lucide-react';

const AboutPage = () => {
 return (
  <div className="min-h-screen flex flex-col">
   {/* Hero Section */}
   <section className="relative pt-20 pb-16 overflow-hidden bg-gradient-to-b from-primary/10 via-primary/5 to-background dark:from-primary/5 dark:via-primary/2 dark:to-background">
    <div className="container px-4 mx-auto text-center relative z-10">
     <Users className="w-16 h-16 mx-auto mb-6 text-primary" />
     <h1 className="text-4xl md:text-5xl font-bold mb-6 bg-gradient-to-r from-primary to-primary/80 bg-clip-text text-transparent">
      About ProjectZen
     </h1>
     <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
      At ProjectZen, we empower individuals to manage their tasks and projects
      effortlessly.
     </p>
    </div>
    <div className="absolute inset-0 bg-grid-primary/5 [mask-image:radial-gradient(ellipse_at_center,transparent_20%,black)]" />
   </section>

   {/* Mission Section */}
   <section className="py-16">
    <div className="container px-4 mx-auto">
     <Card className="max-w-3xl mx-auto border-none bg-card/50 backdrop-blur-sm shadow-lg">
      <CardContent className="pt-6">
       <div className="text-center">
        <Target className="w-12 h-12 mx-auto mb-4 text-primary" />
        <h2 className="text-3xl font-bold mb-4">Our Mission</h2>
        <p className="text-muted-foreground">
         Our mission is to simplify task management and boost productivity by
         providing an intuitive and seamless platform that adapts to your unique
         workflow.
        </p>
       </div>
      </CardContent>
     </Card>
    </div>
   </section>

   {/* Story Section */}
   <section className="py-16 bg-muted/30">
    <div className="container px-4 mx-auto">
     <Card className="max-w-3xl mx-auto border-none bg-card/50 backdrop-blur-sm shadow-lg">
      <CardContent className="pt-6">
       <div className="text-center">
        <BookOpen className="w-12 h-12 mx-auto mb-4 text-primary" />
        <h2 className="text-3xl font-bold mb-4">Our Story</h2>
        <p className="text-muted-foreground">
         Born from a passion for organization and innovation, ProjectZen was
         created by a team of dedicated individuals aiming to transform the way
         you handle daily tasks. Our journey is fueled by continuous improvement
         and user-centric design.
        </p>
       </div>
      </CardContent>
     </Card>
    </div>
   </section>

   {/* Developer Section */}
   <section className="py-16">
    <div className="container px-4 mx-auto">
     <Card className="max-w-4xl mx-auto border-none bg-card/50 backdrop-blur-sm shadow-lg">
      <CardContent className="pt-6">
       <div className="flex flex-col md:flex-row items-center md:items-start gap-8">
        <div className="flex-shrink-0">
         <div className="relative">
          <img
           src="https://avatars.githubusercontent.com/u/175409658?v=4"
           alt="Shardendu Mishra"
           className="w-48 h-48 rounded-full object-cover ring-4 ring-primary/20"
          />
          <div className="absolute inset-0 rounded-full bg-gradient-to-tr from-primary/20 to-transparent" />
         </div>
        </div>

        <div className="flex-1">
         <h2 className="text-2xl font-bold mb-4 text-center md:text-left">
          Shardendu Mishra
          <span className="block text-lg font-normal text-muted-foreground mt-1">
           Full-Stack Developer & Tech Enthusiast
          </span>
         </h2>

         <div className="space-y-4">
          <p className="text-muted-foreground">
           Computer Science Engineering student at IIIT Dharwad with a strong
           passion for technology, innovation, and problem-solving.
          </p>

          <div className="flex flex-wrap gap-2">
           <Badge variant="secondary" className="px-3 py-1">
            GoLang
           </Badge>
           <Badge variant="secondary" className="px-3 py-1">
            TypeScript
           </Badge>
           <Badge variant="secondary" className="px-3 py-1">
            React
           </Badge>
           <Badge variant="secondary" className="px-3 py-1">
            Next.js
           </Badge>
           <Badge variant="secondary" className="px-3 py-1">
            C++
           </Badge>
          </div>

          <div className="space-y-2">
           <div className="flex items-center gap-2">
            <Github className="w-5 h-5 text-primary" />
            <a
             href="https://github.com/MishraShardendu22"
             target="_blank"
             rel="noopener noreferrer"
             className="text-primary hover:underline"
            >
             MishraShardendu22
            </a>
           </div>
           <div className="flex items-center gap-2">
            <Code2 className="w-5 h-5 text-primary" />
            <span>Full-stack Development</span>
           </div>
           <div className="flex items-center gap-2">
            <Building2 className="w-5 h-5 text-primary" />
            <span>
             Vice President of Velocity (IIIT Dharwad&apos;s Dev Club)
            </span>
           </div>
          </div>
         </div>
        </div>
       </div>
      </CardContent>
     </Card>
    </div>
   </section>
  </div>
 );
};

export default AboutPage;
