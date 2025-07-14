'use client';
import { useEffect, useRef, useState } from 'react';
import { useRouter, useParams } from 'next/navigation';
import gsap from 'gsap';
import { apiGet, apiPut, apiDelete } from '../../../utils/api';
import { useUser } from '../../../context/UserContext';
import ReactMarkdown from 'react-markdown';

export default function BlogDetail() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const router = useRouter();
  const { id } = useParams<{ id: string }>();
  const [blog, setBlog] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [actionLoading, setActionLoading] = useState(false);
  const { user } = useUser();

  useEffect(() => {
    gsap.fromTo(sectionRef.current, { opacity: 0, y: 40 }, { opacity: 1, y: 0, duration: 1, ease: 'power3.out' });
  }, []);

  useEffect(() => {
    apiGet(`/api/blogs/${id}`)
      .then(setBlog)
      .catch((e) => setError(e.message))
      .finally(() => setLoading(false));
  }, [id]);

  async function handlePublish() {
    setActionLoading(true);
    try {
      await apiPut(`/api/blogs/${id}/publish`, {});
      setBlog({ ...blog, published: true });
    } catch (e: any) {
      setError(e.message || 'Failed to publish');
    } finally {
      setActionLoading(false);
    }
  }

  async function handleDelete() {
    setActionLoading(true);
    try {
      await apiDelete(`/api/blogs/${id}`);
      router.replace('/blog');
    } catch (e: any) {
      setError(e.message || 'Failed to delete');
    } finally {
      setActionLoading(false);
    }
  }

  if (loading) return <div className="text-lg">Loading...</div>;
  if (error) return <div className="text-red-600">{error}</div>;
  if (!blog) return <div className="text-lg">Not found</div>;

  return (
    <div ref={sectionRef} className="max-w-3xl mx-auto py-16 px-4">
      <h1 className="text-4xl font-extrabold mb-4">{blog.title}</h1>
      <div className="flex gap-2 text-sm text-neutral-500 dark:text-neutral-400 mb-2">
        <span>By {blog.author}</span>
        <span>·</span>
        <span>{blog.date}</span>
        {!blog.published && <span className="text-yellow-600">(Unpublished)</span>}
      </div>
      <ReactMarkdown className="prose dark:prose-invert max-w-none mb-8" >{blog.content}</ReactMarkdown>
      {user?.role === 'admin' && (
        <div className="flex gap-4 mt-6">
          {!blog.published && <button onClick={handlePublish} disabled={actionLoading} className="px-4 py-2 rounded bg-green-600 text-white font-bold shadow hover:bg-green-700 transition">{actionLoading ? 'Publishing...' : 'Publish'}</button>}
          <button onClick={handleDelete} disabled={actionLoading} className="px-4 py-2 rounded bg-red-600 text-white font-bold shadow hover:bg-red-700 transition">{actionLoading ? 'Deleting...' : 'Delete'}</button>
        </div>
      )}
    </div>
  );
} 