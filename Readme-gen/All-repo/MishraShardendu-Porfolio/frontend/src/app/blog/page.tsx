'use client';
import { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { useUser } from '../../context/UserContext';
import Link from 'next/link';
import ReactMarkdown from 'react-markdown';
import { apiGet } from '../../utils/api';

type Blog = {
  _id: string;
  title: string;
  excerpt: string;
  content: string;
  author: string;
  date: string;
  published: boolean;
};

export default function Blog() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const [blogs, setBlogs] = useState<Blog[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const { user } = useUser();

  useEffect(() => {
    gsap.fromTo(sectionRef.current, { opacity: 0, y: 40 }, { opacity: 1, y: 0, duration: 1, ease: 'power3.out' });
    setLoading(true);
    apiGet('/api/blogs')
      .then(setBlogs)
      .catch((e) => setError(e.message))
      .finally(() => setLoading(false));
  }, []);

  return (
    <div ref={sectionRef} className="max-w-4xl mx-auto py-16 px-4">
      <h1 className="text-4xl md:text-5xl font-extrabold mb-8 bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 bg-clip-text text-transparent drop-shadow-lg">
        Blog
      </h1>
      {user?.role === 'admin' && (
        <div className="mb-6 text-right">
          <Link href="/blog/new" className="px-4 py-2 rounded bg-blue-600 text-white font-bold shadow hover:bg-blue-700 transition">New Post</Link>
        </div>
      )}
      {loading && <div className="text-lg">Loading...</div>}
      {error && <div className="text-red-600">{error}</div>}
      <div className="space-y-8">
        {blogs.map((b) => (
          <div key={b._id} className="rounded-xl bg-neutral-100 dark:bg-neutral-900 p-6 shadow-lg">
            <h2 className="text-2xl font-bold mb-2">{b.title}</h2>
            <div className="flex gap-2 text-sm text-neutral-500 dark:text-neutral-400 mb-2">
              <span>By {b.author}</span>
              <span>·</span>
              <span>{b.date}</span>
            </div>
            <ReactMarkdown className="prose dark:prose-invert max-w-none mb-2" >{b.excerpt}</ReactMarkdown>
            <Link href={`/blog/${b._id}`} className="text-blue-600 hover:underline font-medium">Read More</Link>
          </div>
        ))}
      </div>
    </div>
  );
} 