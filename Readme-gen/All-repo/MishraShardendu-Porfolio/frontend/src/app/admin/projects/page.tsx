'use client';
import { useEffect, useState } from 'react';
import { useUser } from '../../../context/UserContext';
import { apiGet, apiPost, apiPut, apiDelete } from '../../../utils/api';
import AdminProjectModal from '../../projects/AdminProjectModal';

type Project = {
  _id?: string;
  title: string;
  description: string;
  githubUrl: string;
  techStack: string[];
  role: string;
  demoUrl: string;
  image: string;
  featured: boolean;
  category: string;
};

export default function AdminProjects() {
  const { user } = useUser();
  const [projects, setProjects] = useState<Project[]>([]);
  const [modalOpen, setModalOpen] = useState(false);
  const [editProject, setEditProject] = useState<Project | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    apiGet('/api/projects')
      .then(setProjects)
      .catch((e) => setError(e.message))
      .finally(() => setLoading(false));
  }, []);

  if (!user || user.role !== 'admin') {
    return <div className="max-w-xl mx-auto py-16 px-4 text-center text-red-600">Access denied. Admins only.</div>;
  }

  function handleAdd() {
    setEditProject(null);
    setModalOpen(true);
  }
  function handleEdit(p: Project) {
    setEditProject(p);
    setModalOpen(true);
  }
  async function handleSave(project: Project) {
    setLoading(true);
    try {
      if (project._id) {
        const updated = await apiPut(`/api/projects/${project._id}`, project);
        setProjects((prev) => prev.map((p) => (p._id === updated._id ? updated : p)));
      } else {
        const created = await apiPost('/api/projects', project);
        setProjects((prev) => [...prev, created]);
      }
      setModalOpen(false);
    } catch (e: any) {
      setError(e.message || 'Failed to save project');
    } finally {
      setLoading(false);
    }
  }
  async function handleDelete(p: Project) {
    if (window.confirm(`Delete project "${p.title}"?`)) {
      setLoading(true);
      try {
        await apiDelete(`/api/projects/${p._id}`);
        setProjects((prev) => prev.filter((proj) => proj._id !== p._id));
      } catch (e: any) {
        setError(e.message || 'Failed to delete project');
      } finally {
        setLoading(false);
      }
    }
  }

  return (
    <div className="max-w-5xl mx-auto py-16 px-4">
      <h1 className="text-4xl font-extrabold mb-8 bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 bg-clip-text text-transparent drop-shadow-lg text-center">
        Manage Projects
      </h1>
      <div className="mb-6 text-right">
        <button onClick={handleAdd} className="px-4 py-2 rounded bg-blue-600 text-white font-bold shadow hover:bg-blue-700 transition">Add Project</button>
      </div>
      {loading && <div className="text-lg">Loading...</div>}
      {error && <div className="text-red-600">{error}</div>}
      <div className="overflow-x-auto">
        <table className="min-w-full bg-white dark:bg-neutral-900 rounded-xl shadow-lg">
          <thead>
            <tr>
              <th className="px-4 py-2 text-left">Title</th>
              <th className="px-4 py-2 text-left">Category</th>
              <th className="px-4 py-2 text-left">Featured</th>
              <th className="px-4 py-2 text-left">Actions</th>
            </tr>
          </thead>
          <tbody>
            {projects.map((p) => (
              <tr key={p._id} className="border-t border-neutral-200 dark:border-neutral-800">
                <td className="px-4 py-2 font-semibold">{p.title}</td>
                <td className="px-4 py-2">{p.category}</td>
                <td className="px-4 py-2">{p.featured ? 'Yes' : 'No'}</td>
                <td className="px-4 py-2 flex gap-2">
                  <button onClick={() => handleEdit(p)} className="px-2 py-1 rounded bg-yellow-400 text-black font-bold">Edit</button>
                  <button onClick={() => handleDelete(p)} className="px-2 py-1 rounded bg-red-600 text-white font-bold">Delete</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <AdminProjectModal open={modalOpen} initial={editProject || undefined} onSave={handleSave} onClose={() => setModalOpen(false)} />
    </div>
  );
} 