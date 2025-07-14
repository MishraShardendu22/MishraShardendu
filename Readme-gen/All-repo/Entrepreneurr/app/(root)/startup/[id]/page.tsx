/* eslint-disable @typescript-eslint/no-explicit-any */
import React from 'react';
import markdownit from "markdown-it";
import { PLAYLIST_BY_SLUG_QUERY, STARTUP_BY_ID_QUERY } from '@/sanity/lib/queries';
import Image from 'next/image';
import { client } from '@/sanity/lib/client';
import Link from 'next/link';
import SCards from '@/components/Cards';
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Calendar } from "lucide-react";
import Navbar from '@/components/Navbar';

const md = markdownit();

const Page = async ({ params }: { params: { id: string } }) => {
  const id_post = (await params).id;
  const post = await client.fetch(STARTUP_BY_ID_QUERY, { id: id_post });
  const suggested_posts = await client.fetch(PLAYLIST_BY_SLUG_QUERY, { slug: "editor-picks-new" });
  const parsedContent = md.render(post?.pitch || '');

  return (
    <>
      <Navbar />
      <div className="max-w-4xl mx-auto px-4 py-8">
        <Card className="mb-8">
          <CardContent className="pt-6">
            <div className="flex items-center gap-2 text-muted-foreground mb-4">
              <Calendar className="w-4 h-4" />
              <p className="text-sm">{new Date(post?._createdAt || '').toLocaleString()}</p>
            </div>
            
            <h1 className="text-4xl font-bold mb-6">{post?.title}</h1>
            
            <div className="grid md:grid-cols-2 gap-6 mb-6">
              <div className="relative aspect-square rounded-lg overflow-hidden">
                <Image 
                  src={post?.image || '/icon.png'} 
                  alt={post?.title || 'Title'} 
                  fill
                  className="object-cover"
                />
              </div>
              <div className="flex flex-col justify-between">
                <p className="text-lg leading-relaxed">{post?.description}</p>
                
                <div className="flex items-center gap-4 mt-4">
                  <Link href={`/user/${post?.author?._id}`} className="flex items-center gap-3">
                    <div className="relative w-12 h-12 rounded-full overflow-hidden">
                      <Image 
                        src={post?.author?.image || '/icon.png'} 
                        alt={post?.author?.name || 'Name'} 
                        fill
                        className="object-cover"
                      />
                    </div>
                    <div>
                      <p className="font-medium">{post?.author?.name}</p>
                      <p className="text-sm text-muted-foreground">@{post?.author?.username}</p>
                    </div>
                  </Link>
                  
                  {post?.category && (
                    <Badge variant="secondary" className="ml-auto">
                      {post?.category}
                    </Badge>
                  )}
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="mb-8">
          <CardContent className="prose prose-lg max-w-none pt-6">
            {parsedContent ? (
              <div dangerouslySetInnerHTML={{ __html: parsedContent }} />
            ) : (
              <p className="text-muted-foreground text-center py-8">No content available</p>
            )}
          </CardContent>
        </Card>

        {suggested_posts?.select?.length && (
            <div className="max-w-4xl mx-auto">
              <p className="text-30-semibold">Editor Picks</p>

              <ul className="mt-7 card_grid-sm">
                {suggested_posts?.select?.map((post: any, i: number) => (
                  <SCards key={i} post={post} />
                ))}
              </ul>
            </div>
          )}
      </div>
    </>
  );
};

export default Page;