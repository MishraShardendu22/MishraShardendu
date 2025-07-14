'use client';
import { useEffect, useState } from 'react';
import { useUser } from '../../context/UserContext';
import { apiGet, apiPost, apiPut, apiDelete } from '../../utils/api';

// OSS type
interface OSS {
  _id?: string;
  repo: string;
  description: string;
}
// Achievement type
interface Achievement {
  _id?: string;
  title: string;
  description: string;
  images: string[];
}

function OssForm({ initial, onSave, onCancel }: { initial?: OSS; onSave: (oss: OSS) => void; onCancel: () => void }) {
  const [form, setForm] = useState<OSS>(initial || { repo: '', description: '' });
  const [error, setError] = useState<string | null>(null);
  function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
    const { name, value } = e.target;
    setForm((f) => ({ ...f, [name]: value }));
  }
  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!form.repo || !form.description) {
      setError('Repo and description are required.');
      return;
    }
    setError(null);
    onSave(form);
  }
  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-4 bg-neutral-100 dark:bg-neutral-900 p-6 rounded-xl shadow-lg max-w-xl mx-auto">
      <input name="repo" value={form.repo} onChange={handleChange} placeholder="Repo (e.g. vercel/next.js)" className="px-4 py-2 rounded border border-neutral-300 dark:border-neutral-700 bg-transparent" required />
      <input name="description" value={form.description} onChange={handleChange} placeholder="Description" className="px-4 py-2 rounded border border-neutral-300 dark:border-neutral-700 bg-transparent" required />
      {error && <div className="text-red-600 text-sm">{error}</div>}
      <div className="flex gap-4 mt-2">
        <button type="submit" className="px-6 py-2 rounded bg-blue-600 text-white font-bold shadow hover:bg-blue-700 transition">Save</button>
        <button type="button" onClick={onCancel} className="px-6 py-2 rounded bg-neutral-300 dark:bg-neutral-700 text-black dark:text-white font-bold shadow hover:bg-neutral-400 dark:hover:bg-neutral-600 transition">Cancel</button>
      </div>
    </form>
  );
}

function AchievementForm({ initial, onSave, onCancel }: { initial?: Achievement; onSave: (a: Achievement) => void; onCancel: () => void }) {
  const [form, setForm] = useState<Achievement>(initial || { title: '', description: '', images: [] });
  const [error, setError] = useState<string | null>(null);
  function handleChange(e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) {
    const { name, value } = e.target;
    setForm((f) => ({ ...f, [name]: value }));
  }
  function handleImagesChange(e: React.ChangeEvent<HTMLInputElement>) {
    setForm((f) => ({ ...f, images: e.target.value.split(',').map((s) => s.trim()) }));
  }
  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!form.title || !form.description) {
      setError('Title and description are required.');
      return;
    }
    setError(null);
    onSave(form);
  }
  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-4 bg-neutral-100 dark:bg-neutral-900 p-6 rounded-xl shadow-lg max-w-xl mx-auto">
      <input name="title" value={form.title} onChange={handleChange} placeholder="Title" className="px-4 py-2 rounded border border-neutral-300 dark:border-neutral-700 bg-transparent" required />
      <textarea name="description" value={form.description} onChange={handleChange} placeholder="Description" className="px-4 py-2 rounded border border-neutral-300 dark:border-neutral-700 bg-transparent" required />
      <input name="images" value={form.images.join(', ')} onChange={handleImagesChange} placeholder="Image URLs (comma separated)" className="px-4 py-2 rounded border border-neutral-300 dark:border-neutral-700 bg-transparent" />
      {error && <div className="text-red-600 text-sm">{error}</div>}
      <div className="flex gap-4 mt-2">
        <button type="submit" className="px-6 py-2 rounded bg-blue-600 text-white font-bold shadow hover:bg-blue-700 transition">Save</button>
        <button type="button" onClick={onCancel} className="px-6 py-2 rounded bg-neutral-300 dark:bg-neutral-700 text-black dark:text-white font-bold shadow hover:bg-neutral-400 dark:hover:bg-neutral-600 transition">Cancel</button>
      </div>
    </form>
  );
}

export default function AdminOssAchievements() {
  const { user } = useUser();
  const [oss, setOss] = useState<OSS[]>([]);
  const [achievements, setAchievements] = useState<Achievement[]>([]);
  const [modalOpen, setModalOpen] = useState<'oss' | 'achievement' | null>(null);
  const [editOss, setEditOss] = useState<OSS | null>(null);
  const [editAchievement, setEditAchievement] = useState<Achievement | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    setLoading(true);
    Promise.all([
      apiGet('/api/oss'),
      apiGet('/api/achievements')
    ])
      .then(([ossData, achData]) => {
        setOss(ossData);
        setAchievements(achData);
      })
      .catch((e) => setError(e.message))
      .finally(() => setLoading(false));
  }, []);

  if (!user || user.role !== 'admin') {
    return <div className="max-w-xl mx-auto py-16 px-4 text-center text-red-600">Access denied. Admins only.</div>;
  }

  // OSS handlers
  function handleAddOss() {
    setEditOss(null);
    setModalOpen('oss');
  }
  function handleEditOss(o: OSS) {
    setEditOss(o);
    setModalOpen('oss');
  }
  async function handleSaveOss(o: OSS) {
    setLoading(true);
    try {
      if (o._id) {
        const updated = await apiPut(`/api/oss/${o._id}`, o);
        setOss((prev) => prev.map((oss) => (oss._id === updated._id ? updated : oss)));
      } else {
        const created = await apiPost('/api/oss', o);
        setOss((prev) => [...prev, created]);
      }
      setModalOpen(null);
    } catch (e: any) {
      setError(e.message || 'Failed to save OSS');
    } finally {
      setLoading(false);
    }
  }
  async function handleDeleteOss(o: OSS) {
    if (window.confirm(`Delete OSS contribution "${o.repo}"?`)) {
      setLoading(true);
      try {
        await apiDelete(`/api/oss/${o._id}`);
        setOss((prev) => prev.filter((oss) => oss._id !== o._id));
      } catch (e: any) {
        setError(e.message || 'Failed to delete OSS');
      } finally {
        setLoading(false);
      }
    }
  }

  // Achievement handlers
  function handleAddAchievement() {
    setEditAchievement(null);
    setModalOpen('achievement');
  }
  function handleEditAchievement(a: Achievement) {
    setEditAchievement(a);
    setModalOpen('achievement');
  }
  async function handleSaveAchievement(a: Achievement) {
    setLoading(true);
    try {
      if (a._id) {
        const updated = await apiPut(`/api/achievements/${a._id}`, a);
        setAchievements((prev) => prev.map((ach) => (ach._id === updated._id ? updated : ach)));
      } else {
        const created = await apiPost('/api/achievements', a);
        setAchievements((prev) => [...prev, created]);
      }
      setModalOpen(null);
    } catch (e: any) {
      setError(e.message || 'Failed to save achievement');
    } finally {
      setLoading(false);
    }
  }
  async function handleDeleteAchievement(a: Achievement) {
    if (window.confirm(`Delete achievement "${a.title}"?`)) {
      setLoading(true);
      try {
        await apiDelete(`/api/achievements/${a._id}`);
        setAchievements((prev) => prev.filter((ach) => ach._id !== a._id));
      } catch (e: any) {
        setError(e.message || 'Failed to delete achievement');
      } finally {
        setLoading(false);
      }
    }
  }

  return (
    <div className="max-w-5xl mx-auto py-16 px-4">
      <h1 className="text-4xl font-extrabold mb-8 bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 bg-clip-text text-transparent drop-shadow-lg text-center">
        Manage OSS & Achievements
      </h1>
      <div className="mb-6 flex gap-4 justify-end">
        <button onClick={handleAddOss} className="px-4 py-2 rounded bg-blue-600 text-white font-bold shadow hover:bg-blue-700 transition">Add OSS</button>
        <button onClick={handleAddAchievement} className="px-4 py-2 rounded bg-green-600 text-white font-bold shadow hover:bg-green-700 transition">Add Achievement</button>
      </div>
      {loading && <div className="text-lg">Loading...</div>}
      {error && <div className="text-red-600">{error}</div>}
      <div className="grid md:grid-cols-2 gap-8">
        <div>
          <h2 className="text-2xl font-bold mb-4">OSS Contributions</h2>
          <ul className="space-y-4">
            {oss.map((o) => (
              <li key={o._id} className="bg-neutral-100 dark:bg-neutral-900 rounded-xl p-4 shadow-lg flex justify-between items-center">
                <div>
                  <span className="font-semibold">{o.repo}</span> - {o.description}
                </div>
                <div className="flex gap-2">
                  <button onClick={() => handleEditOss(o)} className="px-2 py-1 rounded bg-yellow-400 text-black font-bold">Edit</button>
                  <button onClick={() => handleDeleteOss(o)} className="px-2 py-1 rounded bg-red-600 text-white font-bold">Delete</button>
                </div>
              </li>
            ))}
          </ul>
        </div>
        <div>
          <h2 className="text-2xl font-bold mb-4">Achievements</h2>
          <ul className="space-y-4">
            {achievements.map((a) => (
              <li key={a._id} className="bg-neutral-100 dark:bg-neutral-900 rounded-xl p-4 shadow-lg flex justify-between items-center">
                <div>
                  <span className="font-semibold">{a.title}</span> - {a.description}
                  {a.images.length > 0 && (
                    <div className="flex gap-2 mt-2">
                      {a.images.map((img, i) => (
                        <img key={i} src={img} alt={a.title} className="w-12 h-12 object-cover rounded" />
                      ))}
                    </div>
                  )}
                </div>
                <div className="flex gap-2">
                  <button onClick={() => handleEditAchievement(a)} className="px-2 py-1 rounded bg-yellow-400 text-black font-bold">Edit</button>
                  <button onClick={() => handleDeleteAchievement(a)} className="px-2 py-1 rounded bg-red-600 text-white font-bold">Delete</button>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </div>
      {modalOpen === 'oss' && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40">
          <div className="bg-white dark:bg-neutral-900 rounded-xl shadow-lg p-6 w-full max-w-2xl relative">
            <button onClick={() => setModalOpen(null)} className="absolute top-2 right-2 text-2xl">×</button>
            <OssForm initial={editOss || undefined} onSave={handleSaveOss} onCancel={() => setModalOpen(null)} />
          </div>
        </div>
      )}
      {modalOpen === 'achievement' && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40">
          <div className="bg-white dark:bg-neutral-900 rounded-xl shadow-lg p-6 w-full max-w-2xl relative">
            <button onClick={() => setModalOpen(null)} className="absolute top-2 right-2 text-2xl">×</button>
            <AchievementForm initial={editAchievement || undefined} onSave={handleSaveAchievement} onCancel={() => setModalOpen(null)} />
          </div>
        </div>
      )}
    </div>
  );
} 