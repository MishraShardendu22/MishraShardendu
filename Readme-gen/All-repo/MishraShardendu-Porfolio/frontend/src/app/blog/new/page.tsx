'use client';
import { useState } from 'react';
import { useUser } from '../../../context/UserContext';
import { useRouter } from 'next/navigation';
import { apiPost } from '../../../utils/api';

export default function NewBlog() {
  const { user } = useUser();
  const router = useRouter();
  const [title, setTitle] = useState('');
  const [excerpt, setExcerpt] = useState('');
  const [content, setContent] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  if (!user || user.role !== 'admin') {
    router.replace('/blog');
    return null;
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError(null);
    setLoading(true);
    try {
      await apiPost('/api/blogs', { title, excerpt, content });
      router.replace('/blog');
    } catch (e: any) {
      setError(e.message || 'Failed to create post');
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="max-w-2xl mx-auto py-16 px-4">
      <h1 className="text-3xl font-bold mb-6 text-center">New Blog Post</h1>
      <form onSubmit={handleSubmit} className="flex flex-col gap-4 bg-neutral-100 dark:bg-neutral-900 p-6 rounded-xl shadow-lg">
        <input
          type="text"
          placeholder="Title"
          className="px-4 py-2 rounded border border-neutral-300 dark:border-neutral-700 bg-transparent"
          value={title}
          onChange={e => setTitle(e.target.value)}
          required
        />
        <textarea
          placeholder="Excerpt (short summary)"
          className="px-4 py-2 rounded border border-neutral-300 dark:border-neutral-700 bg-transparent"
          rows={2}
          value={excerpt}
          onChange={e => setExcerpt(e.target.value)}
          required
        />
        <textarea
          placeholder="Content (MDX supported)"
          className="px-4 py-2 rounded border border-neutral-300 dark:border-neutral-700 bg-transparent"
          rows={10}
          value={content}
          onChange={e => setContent(e.target.value)}
          required
        />
        {error && <div className="text-red-600 text-sm">{error}</div>}
        <button type="submit" className="px-6 py-2 rounded bg-blue-600 text-white font-bold shadow hover:bg-blue-700 transition" disabled={loading}>
          {loading ? 'Creating...' : 'Create Post'}
        </button>
      </form>
    </div>
  );
} 