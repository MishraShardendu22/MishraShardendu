'use client';
import { useEffect, useState } from 'react';
import { useUser } from '../../context/UserContext';
import { apiGet, apiPost, apiPut, apiDelete } from '../../utils/api';
import ReactMarkdown from 'react-markdown';

interface Blog {
  _id?: string;
  title: string;
  excerpt: string;
  content: string;
  author: string;
  date: string;
  published: boolean;
}

function BlogForm({ initial, onSave, onCancel }: { initial?: Blog; onSave: (b: Blog) => void; onCancel: () => void }) {
  const [form, setForm] = useState<Blog>(initial || { title: '', excerpt: '', content: '', author: '', date: '', published: false });
  const [error, setError] = useState<string | null>(null);
  function handleChange(e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) {
    const { name, value } = e.target;
    setForm((f) => ({ ...f, [name]: value }));
  }
  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!form.title || !form.excerpt || !form.content) {
      setError('Title, excerpt, and content are required.');
      return;
    }
    setError(null);
    onSave(form);
  }
  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-4 bg-neutral-100 dark:bg-neutral-900 p-6 rounded-xl shadow-lg max-w-xl mx-auto">
      <input name="title" value={form.title} onChange={handleChange} placeholder="Title" className="px-4 py-2 rounded border border-neutral-300 dark:border-neutral-700 bg-transparent" required />
      <input name="excerpt" value={form.excerpt} onChange={handleChange} placeholder="Excerpt" className="px-4 py-2 rounded border border-neutral-300 dark:border-neutral-700 bg-transparent" required />
      <textarea name="content" value={form.content} onChange={handleChange} placeholder="Content (Markdown)" className="px-4 py-2 rounded border border-neutral-300 dark:border-neutral-700 bg-transparent" required rows={8} />
      {error && <div className="text-red-600 text-sm">{error}</div>}
      <div className="flex gap-4 mt-2">
        <button type="submit" className="px-6 py-2 rounded bg-blue-600 text-white font-bold shadow hover:bg-blue-700 transition">Save</button>
        <button type="button" onClick={onCancel} className="px-6 py-2 rounded bg-neutral-300 dark:bg-neutral-700 text-black dark:text-white font-bold shadow hover:bg-neutral-400 dark:hover:bg-neutral-600 transition">Cancel</button>
      </div>
    </form>
  );
}

export default function AdminBlog() {
  const { user } = useUser();
  const [blogs, setBlogs] = useState<Blog[]>([]);
  const [modalOpen, setModalOpen] = useState(false);
  const [editBlog, setEditBlog] = useState<Blog | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    setLoading(true);
    apiGet('/api/blogs')
      .then(setBlogs)
      .catch((e) => setError(e.message))
      .finally(() => setLoading(false));
  }, []);

  if (!user || user.role !== 'admin') {
    return <div className="max-w-xl mx-auto py-16 px-4 text-center text-red-600">Access denied. Admins only.</div>;
  }

  function handleAdd() {
    setEditBlog(null);
    setModalOpen(true);
  }
  function handleEdit(b: Blog) {
    setEditBlog(b);
    setModalOpen(true);
  }
  async function handleSave(blog: Blog) {
    setLoading(true);
    try {
      if (blog._id) {
        const updated = await apiPut(`/api/blogs/${blog._id}`, blog);
        setBlogs((prev) => prev.map((b) => (b._id === updated._id ? updated : b)));
      } else {
        const created = await apiPost('/api/blogs', blog);
        setBlogs((prev) => [...prev, created]);
      }
      setModalOpen(false);
    } catch (e: any) {
      setError(e.message || 'Failed to save blog post');
    } finally {
      setLoading(false);
    }
  }
  async function handleDelete(b: Blog) {
    if (window.confirm(`Delete blog post "${b.title}"?`)) {
      setLoading(true);
      try {
        await apiDelete(`/api/blogs/${b._id}`);
        setBlogs((prev) => prev.filter((blog) => blog._id !== b._id));
      } catch (e: any) {
        setError(e.message || 'Failed to delete blog post');
      } finally {
        setLoading(false);
      }
    }
  }
  async function handlePublish(b: Blog) {
    setLoading(true);
    try {
      await apiPut(`/api/blogs/${b._id}/publish`, {});
      setBlogs((prev) => prev.map((blog) => (blog._id === b._id ? { ...blog, published: true } : blog)));
    } catch (e: any) {
      setError(e.message || 'Failed to publish blog post');
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="max-w-5xl mx-auto py-16 px-4">
      <h1 className="text-4xl font-extrabold mb-8 bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 bg-clip-text text-transparent drop-shadow-lg text-center">
        Manage Blog
      </h1>
      <div className="mb-6 text-right">
        <button onClick={handleAdd} className="px-4 py-2 rounded bg-blue-600 text-white font-bold shadow hover:bg-blue-700 transition">Add Blog Post</button>
      </div>
      {loading && <div className="text-lg">Loading...</div>}
      {error && <div className="text-red-600">{error}</div>}
      <div className="overflow-x-auto">
        <table className="min-w-full bg-white dark:bg-neutral-900 rounded-xl shadow-lg">
          <thead>
            <tr>
              <th className="px-4 py-2 text-left">Title</th>
              <th className="px-4 py-2 text-left">Author</th>
              <th className="px-4 py-2 text-left">Date</th>
              <th className="px-4 py-2 text-left">Published</th>
              <th className="px-4 py-2 text-left">Actions</th>
            </tr>
          </thead>
          <tbody>
            {blogs.map((b) => (
              <tr key={b._id} className="border-t border-neutral-200 dark:border-neutral-800">
                <td className="px-4 py-2 font-semibold">{b.title}</td>
                <td className="px-4 py-2">{b.author}</td>
                <td className="px-4 py-2">{b.date}</td>
                <td className="px-4 py-2">{b.published ? 'Yes' : 'No'}</td>
                <td className="px-4 py-2 flex gap-2">
                  <button onClick={() => handleEdit(b)} className="px-2 py-1 rounded bg-yellow-400 text-black font-bold">Edit</button>
                  <button onClick={() => handleDelete(b)} className="px-2 py-1 rounded bg-red-600 text-white font-bold">Delete</button>
                  {!b.published && <button onClick={() => handlePublish(b)} className="px-2 py-1 rounded bg-green-600 text-white font-bold">Publish</button>}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      {modalOpen && <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40">
        <div className="bg-white dark:bg-neutral-900 rounded-xl shadow-lg p-6 w-full max-w-2xl relative">
          <button onClick={() => setModalOpen(false)} className="absolute top-2 right-2 text-2xl">×</button>
          <BlogForm initial={editBlog || undefined} onSave={handleSave} onCancel={() => setModalOpen(false)} />
        </div>
      </div>}
    </div>
  );
} 