'use client';
import { useEffect, useState } from 'react';
import { useUser } from '../../../context/UserContext';
import { apiGet, apiPost, apiPut, apiDelete } from '../../../utils/api';

// TechStack type
type TechStack = {
  _id?: string;
  category: string;
  name: string;
  icon: string;
};

function TechStackForm({ initial, onSave, onCancel }: { initial?: TechStack; onSave: (item: TechStack) => void; onCancel: () => void }) {
  const [form, setForm] = useState<TechStack>(
    initial || { category: '', name: '', icon: '' }
  );
  const [error, setError] = useState<string | null>(null);

  function handleChange(e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) {
    const { name, value } = e.target;
    setForm((f) => ({ ...f, [name]: value }));
  }
  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!form.category || !form.name) {
      setError('Category and name are required.');
      return;
    }
    setError(null);
    onSave(form);
  }
  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-4 bg-neutral-100 dark:bg-neutral-900 p-6 rounded-xl shadow-lg max-w-xl mx-auto">
      <select name="category" value={form.category} onChange={handleChange} className="px-4 py-2 rounded border border-neutral-300 dark:border-neutral-700 bg-transparent" required>
        <option value="">Select category</option>
        <option value="Languages">Languages</option>
        <option value="Frameworks">Frameworks</option>
        <option value="DevOps">DevOps</option>
        <option value="Cloud">Cloud</option>
        <option value="Tools">Tools</option>
      </select>
      <input name="name" value={form.name} onChange={handleChange} placeholder="Name" className="px-4 py-2 rounded border border-neutral-300 dark:border-neutral-700 bg-transparent" required />
      <input name="icon" value={form.icon} onChange={handleChange} placeholder="Icon URL (optional)" className="px-4 py-2 rounded border border-neutral-300 dark:border-neutral-700 bg-transparent" />
      {error && <div className="text-red-600 text-sm">{error}</div>}
      <div className="flex gap-4 mt-2">
        <button type="submit" className="px-6 py-2 rounded bg-blue-600 text-white font-bold shadow hover:bg-blue-700 transition">Save</button>
        <button type="button" onClick={onCancel} className="px-6 py-2 rounded bg-neutral-300 dark:bg-neutral-700 text-black dark:text-white font-bold shadow hover:bg-neutral-400 dark:hover:bg-neutral-600 transition">Cancel</button>
      </div>
    </form>
  );
}

export default function AdminTechStack() {
  const { user } = useUser();
  const [stack, setStack] = useState<TechStack[]>([]);
  const [modalOpen, setModalOpen] = useState(false);
  const [editItem, setEditItem] = useState<TechStack | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    apiGet('/api/techstack')
      .then(setStack)
      .catch((e) => setError(e.message))
      .finally(() => setLoading(false));
  }, []);

  if (!user || user.role !== 'admin') {
    return <div className="max-w-xl mx-auto py-16 px-4 text-center text-red-600">Access denied. Admins only.</div>;
  }

  function handleAdd() {
    setEditItem(null);
    setModalOpen(true);
  }
  function handleEdit(item: TechStack) {
    setEditItem(item);
    setModalOpen(true);
  }
  async function handleSave(item: TechStack) {
    setLoading(true);
    try {
      if (item._id) {
        const updated = await apiPut(`/api/techstack/${item._id}`, item);
        setStack((prev) => prev.map((s) => (s._id === updated._id ? updated : s)));
      } else {
        const created = await apiPost('/api/techstack', item);
        setStack((prev) => [...prev, created]);
      }
      setModalOpen(false);
    } catch (e: any) {
      setError(e.message || 'Failed to save tech stack item');
    } finally {
      setLoading(false);
    }
  }
  async function handleDelete(item: TechStack) {
    if (window.confirm(`Delete tech stack item "${item.name}"?`)) {
      setLoading(true);
      try {
        await apiDelete(`/api/techstack/${item._id}`);
        setStack((prev) => prev.filter((s) => s._id !== item._id));
      } catch (e: any) {
        setError(e.message || 'Failed to delete tech stack item');
      } finally {
        setLoading(false);
      }
    }
  }

  return (
    <div className="max-w-5xl mx-auto py-16 px-4">
      <h1 className="text-4xl font-extrabold mb-8 bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 bg-clip-text text-transparent drop-shadow-lg text-center">
        Manage Tech Stack
      </h1>
      <div className="mb-6 text-right">
        <button onClick={handleAdd} className="px-4 py-2 rounded bg-blue-600 text-white font-bold shadow hover:bg-blue-700 transition">Add Tech Stack Item</button>
      </div>
      {loading && <div className="text-lg">Loading...</div>}
      {error && <div className="text-red-600">{error}</div>}
      <div className="overflow-x-auto">
        <table className="min-w-full bg-white dark:bg-neutral-900 rounded-xl shadow-lg">
          <thead>
            <tr>
              <th className="px-4 py-2 text-left">Category</th>
              <th className="px-4 py-2 text-left">Name</th>
              <th className="px-4 py-2 text-left">Icon</th>
              <th className="px-4 py-2 text-left">Actions</th>
            </tr>
          </thead>
          <tbody>
            {stack.map((item) => (
              <tr key={item._id} className="border-t border-neutral-200 dark:border-neutral-800">
                <td className="px-4 py-2 font-semibold">{item.category}</td>
                <td className="px-4 py-2">{item.name}</td>
                <td className="px-4 py-2">{item.icon ? <img src={item.icon} alt={item.name} className="w-8 h-8 inline-block" /> : '-'}</td>
                <td className="px-4 py-2 flex gap-2">
                  <button onClick={() => handleEdit(item)} className="px-2 py-1 rounded bg-yellow-400 text-black font-bold">Edit</button>
                  <button onClick={() => handleDelete(item)} className="px-2 py-1 rounded bg-red-600 text-white font-bold">Delete</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      {modalOpen && <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40">
        <div className="bg-white dark:bg-neutral-900 rounded-xl shadow-lg p-6 w-full max-w-2xl relative">
          <button onClick={() => setModalOpen(false)} className="absolute top-2 right-2 text-2xl">×</button>
          <TechStackForm initial={editItem || undefined} onSave={handleSave} onCancel={() => setModalOpen(false)} />
        </div>
      </div>}
    </div>
  );
} 