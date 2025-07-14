import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { ArrowRightIcon, Calendar } from 'lucide-react';
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Author, Startup } from '@/sanity/types';

export type SCardT = Omit<Startup, "author"> & { author?: Author };

const SCards = ({ post } : {post : SCardT}) => {
  const { _createdAt, author, title, category, _id, image, description } = post;

  return (
    <Card className="group w-full max-w-md overflow-hidden bg-gradient-to-br from-cyan-50 to-blue-50 dark:from-indigo-950 dark:to-violet-950 border border-blue-100 dark:border-indigo-800/30 hover:border-blue-200 dark:hover:border-indigo-700/50 shadow-lg hover:shadow-blue-200/50 dark:hover:shadow-indigo-500/20 transition-all duration-300">
      <CardHeader className="relative p-0">
        <Link href={`/startup/${_id}`} className="block overflow-hidden aspect-video relative">
          <Image 
            src={image || './icon.jpg'}
            alt={title || 'Default Alt Text'}
            fill
            className="object-cover transition-all duration-500 group-hover:scale-105"
          />
        </Link>
        <Badge 
          variant="secondary" 
          className="absolute top-4 right-4 bg-blue-500/90 dark:bg-indigo-500/90 text-white hover:bg-blue-600 dark:hover:bg-indigo-600 shadow-lg"
        >
          <Link href={`/?query=${category?.toLowerCase()}`}>
            {category}
          </Link>
        </Badge>
      </CardHeader>

      <CardContent className="p-6">
        <div className="flex items-center justify-between mb-4">
          <Link href={`/user/${author?.id}`} className="flex items-center gap-2 group/author">
            <Avatar className="h-8 w-8 ring-2 ring-blue-200 dark:ring-indigo-700 group-hover/author:ring-blue-400 dark:group-hover/author:ring-indigo-500 transition-colors">
              <AvatarImage src={author?.image} alt={author?.name} />
              <AvatarFallback className="bg-blue-100 dark:bg-indigo-900 text-blue-600 dark:text-indigo-200">
                {author?.name?.[0] || 'A'}
              </AvatarFallback>
            </Avatar>
            <span className="text-sm font-medium text-blue-800 dark:text-indigo-200 group-hover/author:text-blue-600 dark:group-hover/author:text-indigo-300 transition-colors">
              {author?.name}
            </span>
          </Link>
          <div className="flex items-center gap-4 text-xs text-blue-600/70 dark:text-indigo-300/70">
            <div className="flex items-center gap-1.5">
              <Calendar className="h-3.5 w-3.5" />
              <span>{new Date(_createdAt).toLocaleDateString()}</span>
            </div>
          </div>
        </div>

        <Link href={`/startup/${_id}`} className="block group/content">
          <h3 className="text-xl font-semibold mb-3 text-blue-900 dark:text-indigo-100 group-hover/content:text-blue-600 dark:group-hover/content:text-indigo-300 transition-colors">
            {title}
          </h3>
          <p className="text-blue-700 dark:text-indigo-200 text-sm leading-relaxed line-clamp-2">
            {description}
          </p>
        </Link>
      </CardContent>

      <CardFooter className="px-6 pb-6 pt-2">
        <Button 
          className="w-full bg-blue-500 hover:bg-blue-600 dark:bg-indigo-500 dark:hover:bg-indigo-600 text-white shadow-lg shadow-blue-200 dark:shadow-indigo-900/50 hover:shadow-blue-300 dark:hover:shadow-indigo-800/50 group/button border-0"
        >
          <Link href={`/startup/${_id}`} className="flex items-center justify-center gap-2 w-full">
            <span>View Details</span>
            <ArrowRightIcon className="h-4 w-4 group-hover/button:translate-x-1 transition-transform" />
          </Link>
        </Button>
      </CardFooter>
    </Card>
  );
};

export default SCards;