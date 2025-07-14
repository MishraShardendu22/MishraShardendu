"use client"
import React from 'react';
import { FileQuestion, Home, RefreshCcw } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import Link from "next/link";

const NotFound = () => {
  return (
    <div className="min-h-screen w-full flex items-center justify-center bg-background p-4">
      <Card className="max-w-md w-full">
        <CardContent className="pt-6 text-center space-y-6">
          <div className="space-y-2">
            <div className="flex justify-center">
              <FileQuestion className="h-20 w-20 text-muted-foreground animate-pulse" />
            </div>
            <h1 className="text-4xl font-bold tracking-tight">404</h1>
            <p className="text-xl text-muted-foreground">Page not found</p>
          </div>

          <p className="text-muted-foreground">
            The page you&apos;re looking for doesn&apos;t exist or has been moved to another URL.
          </p>

          <div className="flex flex-col sm:flex-row gap-2 justify-center">
            <Button asChild variant="default">
              <Link href="/">
                <Home className="mr-2 h-4 w-4" />
                Back to Home
              </Link>
            </Button>
            
            <Button
              variant="outline"
              onClick={() => window.location.reload()}
            >
              <RefreshCcw className="mr-2 h-4 w-4" />
              Refresh Page
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default NotFound;