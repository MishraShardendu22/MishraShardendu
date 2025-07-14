'use client';

import { FileQuestion, Home, RefreshCcw, MoveRight } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import Link from 'next/link';

const NotFound = () => {
 return (
  <div className="min-h-screen w-full flex items-center justify-center bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 p-4">
   <Card className="max-w-md w-full border border-border/40 shadow-lg bg-background/60 backdrop-blur supports-[backdrop-filter]:bg-background/30">
    <CardContent className="pt-10 pb-8 px-8 text-center space-y-8">
     {/* Icon and Title Section */}
     <div className="space-y-6">
      <div className="relative flex justify-center">
       <FileQuestion className="h-24 w-24 text-primary animate-pulse" />
       <div className="absolute inset-0 h-24 w-24 blur-2xl bg-primary/20 animate-pulse rounded-full" />
      </div>
      <div className="space-y-2">
       <h1 className="text-6xl font-bold tracking-tighter bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
        404
       </h1>
       <p className="text-xl font-medium text-foreground/80">Page not found</p>
      </div>
     </div>

     {/* Description */}
     <p className="text-muted-foreground text-base max-w-sm mx-auto">
      The page you&apos;re looking for doesn&apos;t exist or has been moved to
      another URL.
     </p>

     {/* Buttons */}
     <div className="flex flex-col sm:flex-row gap-3 justify-center pt-2">
      <Button
       asChild
       variant="default"
       className="group hover:shadow-lg transition-all duration-300"
       size="lg"
      >
       <Link href="/">
        <Home className="mr-2 h-4 w-4" />
        Home
        <MoveRight className="ml-2 h-4 w-4 opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-300" />
       </Link>
      </Button>

      <Button
       variant="secondary"
       size="lg"
       onClick={() => window.location.reload()}
       className="hover:shadow-lg transition-all duration-300"
      >
       <RefreshCcw className="mr-2 h-4 w-4" />
       Refresh
      </Button>
     </div>
    </CardContent>
   </Card>
  </div>
 );
};

export default NotFound;
