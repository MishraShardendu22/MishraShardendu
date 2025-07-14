import React from 'react';
import { Github, Linkedin, Mail, Heart } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';

const Footer = () => {
 return (
  <footer className="w-full border-t bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
   <div className="container mx-auto py-8 flex flex-col items-center justify-center space-y-6">
    {/* Social Links */}
    <div className="flex items-center justify-center space-x-4">
     <Button
      variant="ghost"
      size="icon"
      className="h-10 w-10 rounded-full hover:bg-primary hover:text-primary-foreground transition-colors"
      asChild
     >
      <a
       href="https://github.com/MishraShardendu22"
       target="_blank"
       rel="noopener noreferrer"
       aria-label="GitHub Profile"
      >
       <Github className="h-5 w-5" />
      </a>
     </Button>

     <Button
      variant="ghost"
      size="icon"
      className="h-10 w-10 rounded-full hover:bg-primary hover:text-primary-foreground transition-colors"
      asChild
     >
      <a
       href="https://www.linkedin.com/in/shardendumishra22/"
       target="_blank"
       rel="noopener noreferrer"
       aria-label="LinkedIn Profile"
      >
       <Linkedin className="h-5 w-5" />
      </a>
     </Button>

     <Button
      variant="ghost"
      size="icon"
      className="h-10 w-10 rounded-full hover:bg-primary hover:text-primary-foreground transition-colors"
      asChild
     >
      <a href="mailto:mishrashardendu22@gmail.com" aria-label="Email Contact">
       <Mail className="h-5 w-5" />
      </a>
     </Button>
    </div>

    <Separator className="w-[80%] max-w-[400px]" />

    {/* Copyright */}
    <div className="flex flex-col items-center justify-center space-y-2 text-center">
     <p className="text-sm text-muted-foreground">
      Made with{' '}
      <Heart className="inline-block h-4 w-4 text-red-500 animate-pulse" /> by
      Shardendu Mishra
     </p>
     <p className="text-xs text-muted-foreground">
      © {new Date().getFullYear()} All rights reserved
     </p>
    </div>
   </div>
  </footer>
 );
};

export default Footer;
