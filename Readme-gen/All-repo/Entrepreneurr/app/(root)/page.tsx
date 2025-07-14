/* eslint-disable @typescript-eslint/no-explicit-any */
import React from 'react';
// import { auth } from '@/auth';
import Heading from '../../components/Heading';
import Search from '../../components/Search';
import Navbar from '../../components/Navbar';
import { CardContent, CardHeader, Card } from "@/components/ui/card";
import { sanityFetch, SanityLive } from '@/sanity/lib/live';
import { STARTUPS_QUERY } from '@/sanity/lib/queries';
import SCards from '@/components/Cards';
import { Sparkles } from 'lucide-react';

interface SearchParams {
  query: string | null;
}

export default async function Home({ searchParams }: { searchParams: SearchParams }) {
  const query = (await searchParams).query ?? null;
  const params = { search: query || null };
  const { data: posts } = await sanityFetch({ query: STARTUPS_QUERY, params })
  // const session = await auth();

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-950 via-indigo-950 to-slate-950">
      <Navbar />
      <div className="relative">
        <div className="absolute inset-0 bg-[url(/grid.svg)] bg-center [mask-image:linear-gradient(180deg,white,rgba(255,255,255,0))]" />
        <Heading />
      </div>

      <div className="container mx-auto px-4 py-12 relative space-y-8">
        {/* Search Section */}
        <Card className="bg-white/5 backdrop-blur-lg border-white/10 shadow-2xl">
          <CardHeader className="space-y-2">
            <div className="flex items-center justify-center gap-2 text-center">
              <Sparkles className="w-5 h-5 text-blue-400" />
              <h3 className="text-2xl font-bold bg-gradient-to-r from-blue-400 to-indigo-400 text-transparent bg-clip-text">
                Discover the Perfect Startup to Ignite Your Journey
              </h3>
              <Sparkles className="w-5 h-5 text-indigo-400" />
            </div>
          </CardHeader>

          <CardContent>
            <div className="max-w-2xl mx-auto">
              <Search query={query} />
            </div>
          </CardContent>
        </Card>

        {/* Startups Listing Section */}
        <Card className="bg-white/5 backdrop-blur-lg border-white/10 shadow-2xl">
          <CardHeader>
            <h2 className="text-2xl font-semibold bg-gradient-to-r from-blue-100 to-blue-50 text-transparent bg-clip-text">
              {query ? `Search results for "${query}"` : "All Startups"}
            </h2>
          </CardHeader>

          <CardContent>
            <ul className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {posts?.length > 0 ? (
                posts.map((post: any) => (
                  <SCards key={post?._id} post={post} />
                ))
              ) : (
                <div className="col-span-full flex items-center justify-center p-12">
                  <p className="text-lg text-blue-200/80">
                    No startups found. Try a different search term.
                  </p>
                </div>
              )}
            </ul>
          </CardContent>
        </Card>
      </div>
      <SanityLive />
    </div>
  );
}