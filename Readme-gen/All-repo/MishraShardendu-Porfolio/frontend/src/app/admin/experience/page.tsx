'use client';
import { useEffect, useState } from 'react';
import { useUser } from '../../../context/UserContext';
import { apiGet, apiPost, apiPut, apiDelete } from '../../../utils/api';

// Experience type
type Experience = {
  _id?: string;
  company: string;
  role: string;
  duration: string;
  bullets: string[];
  projects: string[];
};

function ExperienceForm({ initial, onSave, onCancel }: { initial?: Experience; onSave: (exp: Experience) => void; onCancel: () => void }) {
  const [form, setForm] = useState<Experience>(
    initial || { company: '', role: '', duration: '', bullets: [''], projects: [] }
  );
  const [error, setError] = useState<string | null>(null);

  function handleChange(e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) {
    const { name, value } = e.target;
    setForm((f) => ({ ...f, [name]: value }));
  }
  function handleBulletsChange(i: number, value: string) {
    setForm((f) => ({ ...f, bullets: f.bullets.map((b, idx) => (idx === i ? value : b)) }));
  }
  function addBullet() {
    setForm((f) => ({ ...f, bullets: [...f.bullets, ''] }));
  }
  function removeBullet(i: number) {
    setForm((f) => ({ ...f, bullets: f.bullets.filter((_, idx) => idx !== i) }));
  }
  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!form.company || !form.role || !form.duration) {
      setError('Company, role, and duration are required.');
      return;
    }
    setError(null);
    onSave(form);
  }
  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-4 bg-neutral-100 dark:bg-neutral-900 p-6 rounded-xl shadow-lg max-w-xl mx-auto">
      <input name="company" value={form.company} onChange={handleChange} placeholder="Company" className="px-4 py-2 rounded border border-neutral-300 dark:border-neutral-700 bg-transparent" required />
      <input name="role" value={form.role} onChange={handleChange} placeholder="Role" className="px-4 py-2 rounded border border-neutral-300 dark:border-neutral-700 bg-transparent" required />
      <input name="duration" value={form.duration} onChange={handleChange} placeholder="Duration" className="px-4 py-2 rounded border border-neutral-300 dark:border-neutral-700 bg-transparent" required />
      <div>
        <label className="block mb-1 font-medium">Bullets</label>
        {form.bullets.map((b, i) => (
          <div key={i} className="flex gap-2 mb-2">
            <input value={b} onChange={e => handleBulletsChange(i, e.target.value)} className="flex-1 px-4 py-2 rounded border border-neutral-300 dark:border-neutral-700 bg-transparent" />
            <button type="button" onClick={() => removeBullet(i)} className="px-2 py-1 rounded bg-red-600 text-white">×</button>
          </div>
        ))}
        <button type="button" onClick={addBullet} className="px-3 py-1 rounded bg-blue-600 text-white">Add Bullet</button>
      </div>
      {error && <div className="text-red-600 text-sm">{error}</div>}
      <div className="flex gap-4 mt-2">
        <button type="submit" className="px-6 py-2 rounded bg-blue-600 text-white font-bold shadow hover:bg-blue-700 transition">Save</button>
        <button type="button" onClick={onCancel} className="px-6 py-2 rounded bg-neutral-300 dark:bg-neutral-700 text-black dark:text-white font-bold shadow hover:bg-neutral-400 dark:hover:bg-neutral-600 transition">Cancel</button>
      </div>
    </form>
  );
}

export default function AdminExperience() {
  const { user } = useUser();
  const [experience, setExperience] = useState<Experience[]>([]);
  const [modalOpen, setModalOpen] = useState(false);
  const [editExp, setEditExp] = useState<Experience | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    apiGet('/api/experience')
      .then(setExperience)
      .catch((e) => setError(e.message))
      .finally(() => setLoading(false));
  }, []);

  if (!user || user.role !== 'admin') {
    return <div className="max-w-xl mx-auto py-16 px-4 text-center text-red-600">Access denied. Admins only.</div>;
  }

  function handleAdd() {
    setEditExp(null);
    setModalOpen(true);
  }
  function handleEdit(exp: Experience) {
    setEditExp(exp);
    setModalOpen(true);
  }
  async function handleSave(exp: Experience) {
    setLoading(true);
    try {
      if (exp._id) {
        const updated = await apiPut(`/api/experience/${exp._id}`, exp);
        setExperience((prev) => prev.map((e) => (e._id === updated._id ? updated : e)));
      } else {
        const created = await apiPost('/api/experience', exp);
        setExperience((prev) => [...prev, created]);
      }
      setModalOpen(false);
    } catch (e: any) {
      setError(e.message || 'Failed to save experience');
    } finally {
      setLoading(false);
    }
  }
  async function handleDelete(exp: Experience) {
    if (window.confirm(`Delete experience at "${exp.company}"?`)) {
      setLoading(true);
      try {
        await apiDelete(`/api/experience/${exp._id}`);
        setExperience((prev) => prev.filter((e) => e._id !== exp._id));
      } catch (e: any) {
        setError(e.message || 'Failed to delete experience');
      } finally {
        setLoading(false);
      }
    }
  }

  return (
    <div className="max-w-5xl mx-auto py-16 px-4">
      <h1 className="text-4xl font-extrabold mb-8 bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 bg-clip-text text-transparent drop-shadow-lg text-center">
        Manage Experience
      </h1>
      <div className="mb-6 text-right">
        <button onClick={handleAdd} className="px-4 py-2 rounded bg-blue-600 text-white font-bold shadow hover:bg-blue-700 transition">Add Experience</button>
      </div>
      {loading && <div className="text-lg">Loading...</div>}
      {error && <div className="text-red-600">{error}</div>}
      <div className="overflow-x-auto">
        <table className="min-w-full bg-white dark:bg-neutral-900 rounded-xl shadow-lg">
          <thead>
            <tr>
              <th className="px-4 py-2 text-left">Company</th>
              <th className="px-4 py-2 text-left">Role</th>
              <th className="px-4 py-2 text-left">Duration</th>
              <th className="px-4 py-2 text-left">Actions</th>
            </tr>
          </thead>
          <tbody>
            {experience.map((exp) => (
              <tr key={exp._id} className="border-t border-neutral-200 dark:border-neutral-800">
                <td className="px-4 py-2 font-semibold">{exp.company}</td>
                <td className="px-4 py-2">{exp.role}</td>
                <td className="px-4 py-2">{exp.duration}</td>
                <td className="px-4 py-2 flex gap-2">
                  <button onClick={() => handleEdit(exp)} className="px-2 py-1 rounded bg-yellow-400 text-black font-bold">Edit</button>
                  <button onClick={() => handleDelete(exp)} className="px-2 py-1 rounded bg-red-600 text-white font-bold">Delete</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      {modalOpen && <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40">
        <div className="bg-white dark:bg-neutral-900 rounded-xl shadow-lg p-6 w-full max-w-2xl relative">
          <button onClick={() => setModalOpen(false)} className="absolute top-2 right-2 text-2xl">×</button>
          <ExperienceForm initial={editExp || undefined} onSave={handleSave} onCancel={() => setModalOpen(false)} />
        </div>
      </div>}
    </div>
  );
} 