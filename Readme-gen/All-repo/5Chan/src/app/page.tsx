import React from 'react';
import { messages } from "@/TemporaryPrepPages/Messages";
import {
  MessageCircle,
  Clock,
} from "lucide-react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle
} from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Badge } from "@/components/ui/badge";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { features } from '@/TemporaryPrepPages/Features';
import Link from 'next/link';

interface FeatureCardProps {
  icon: React.ComponentType<{ className?: string }>;
  title: string;
  description: string;
}

const FeatureCard: React.FC<FeatureCardProps> = ({ icon: Icon, title, description }) => (
  <Card className="hover:shadow-lg transition-shadow">
    <CardHeader className="space-y-1">
      <div className="flex items-center space-x-2">
        <Icon className="w-5 h-5 text-primary" />
        <CardTitle className="text-lg">{title}</CardTitle>
      </div>
      <CardDescription>{description}</CardDescription>
    </CardHeader>
  </Card>
);

interface Message {
  id: number;
  content: string;
  createdAt: string;
}

const MessageCard: React.FC<{ message: Message }> = ({ message }) => (
  <Card className="hover:shadow-md transition-all h-full">
    <CardContent className="pt-6">
      <div className="space-y-4">
        <div className="flex items-start space-x-4">
          <div className="bg-primary/10 p-2 rounded-full">
            <MessageCircle className="w-4 h-4 text-primary" />
          </div>
          <div className="flex-1 space-y-1">
            <p className="text-sm text-muted-foreground leading-relaxed">
              {message.content}
            </p>
            <div className="flex items-center justify-between">
              <Badge variant="secondary" className="text-xs">
                <Clock className="w-3 h-3 mr-1" />
                {new Date(message.createdAt).toLocaleString()}
              </Badge>
            </div>
          </div>
        </div>
      </div>
    </CardContent>
  </Card>
);

const Page = () => {
  const year = new Date().getFullYear();

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <main className="flex-1">
        {/* Hero Section */}
        <section className="container mx-auto py-12 px-4 md:py-24 text-center space-y-6">
          <h1 className="text-4xl md:text-6xl font-bold tracking-tight">
            Welcome to <span className="text-primary">5Chan</span>
          </h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Anonymous Messaging | Profile Image Review | Sometimes Roasting, Sometimes Toasting
          </p>
        </section>

        {/* Features Grid */}
        <section className="container mx-auto px-4 py-12">
          <h2 className="text-2xl font-bold text-center mb-8">Why Choose 5Chan?</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {features.map((feature, index) => (
              <FeatureCard key={index} {...feature} />
            ))}
          </div>
        </section>

        <div className="space-x-4"></div>
        <div className="flex justify-center space-x-4 mt-8">
  <Link href="/sign-in">
    <Button
      variant="default"  // Use ShadCN's default button variant
      className="px-6 py-2 rounded-md shadow-md hover:bg-primary/80 transition-all"
    >
      Sign In
    </Button>
  </Link>
  <Link href="/sign-up">
    <Button
      variant="secondary"  // Use ShadCN's secondary button variant
      className="px-6 py-2 rounded-md shadow-md hover:bg-secondary/80 transition-all"
    >
      Sign Up
    </Button>
  </Link>
</div>


        <Separator className="my-8" />

        {/* Messages Carousel Section */}
        <section className="container mx-auto px-4 py-12">
          <h2 className="text-2xl font-bold mb-8">Recent Messages</h2>
          <Carousel className="w-full">
            <CarouselContent className="-ml-1">
              {messages.map((message) => (
                <CarouselItem key={message.id} className="pl-1 md:basis-1/2 lg:basis-1/3">
                  <div className="p-1">
                    <MessageCard message={message} />
                  </div>
                </CarouselItem>
              ))}
            </CarouselContent>
            <CarouselPrevious />
            <CarouselNext />
          </Carousel>
        </section>
      </main>

      <footer className="bg-primary/5 py-8 px-4">
        <div className="container mx-auto text-center">
          <p className="text-sm text-muted-foreground">
            © {year} 5Chan. All rights reserved.
          </p>
        </div>
      </footer>
    </div>
  );
};

export default Page;

import type { Metadata } from 'next';
import { Button } from '@/components/ui/button';

export const metadata: Metadata = {
  title: "About Page 📝",
  description: '5Chan | What is this 5Chan all about ?',
};