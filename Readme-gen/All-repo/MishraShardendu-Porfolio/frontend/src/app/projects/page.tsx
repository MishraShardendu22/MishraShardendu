'use client';
import { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { apiGet } from '../../utils/api';
import { useUser } from '../../context/UserContext';
import AdminProjectModal from './AdminProjectModal';

type Project = {
  _id: string;
  title: string;
  description: string;
  githubUrl: string;
  techStack: string[];
  role: string;
  demoUrl: string;
  image: string;
};

export default function Projects() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const { user } = useUser();
  const [modalOpen, setModalOpen] = useState(false);
  const [editProject, setEditProject] = useState<Project | null>(null);

  useEffect(() => {
    gsap.fromTo(sectionRef.current, { opacity: 0, y: 40 }, { opacity: 1, y: 0, duration: 1, ease: 'power3.out' });
    setLoading(true);
    apiGet('/api/projects/featured')
      .then(setProjects)
      .catch((e) => setError(e.message))
      .finally(() => setLoading(false));
  }, []);

  function handleAdd() {
    setEditProject(null);
    setModalOpen(true);
  }
  function handleEdit(p: Project) {
    setEditProject(p);
    setModalOpen(true);
  }
  function handleSave(project: Project) {
    // Here you would call the API to save (create or update)
    setModalOpen(false);
  }
  function handleDelete(p: Project) {
    // Here you would call the API to delete
    alert('Delete: ' + p.title);
  }

  return (
    <div ref={sectionRef} className="max-w-5xl mx-auto py-16 px-4">
      <h1 className="text-4xl md:text-5xl font-extrabold mb-8 bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 bg-clip-text text-transparent drop-shadow-lg">
        Featured Projects
      </h1>
      {user?.role === 'admin' && (
        <div className="mb-6 text-right">
          <button onClick={handleAdd} className="px-4 py-2 rounded bg-blue-600 text-white font-bold shadow hover:bg-blue-700 transition">Add Project</button>
        </div>
      )}
      {loading && <div className="text-lg">Loading...</div>}
      {error && <div className="text-red-600">{error}</div>}
      <div className="grid md:grid-cols-2 gap-8">
        {projects.map((p) => (
          <div key={p._id} className="rounded-xl bg-neutral-100 dark:bg-neutral-900 p-6 shadow-lg relative">
            {user?.role === 'admin' && (
              <div className="absolute top-2 right-2 flex gap-2">
                <button onClick={() => handleEdit(p)} className="px-2 py-1 rounded bg-yellow-400 text-black font-bold">Edit</button>
                <button onClick={() => handleDelete(p)} className="px-2 py-1 rounded bg-red-600 text-white font-bold">Delete</button>
              </div>
            )}
            <div className="h-48 bg-gradient-to-br from-blue-400 to-pink-400 rounded-lg mb-4 overflow-hidden flex items-center justify-center">
              {p.image ? <img src={p.image} alt={p.title} className="object-cover w-full h-full" /> : <span className="text-4xl">📷</span>}
            </div>
            <h2 className="text-2xl font-bold mb-2">{p.title}</h2>
            <p className="text-neutral-600 dark:text-neutral-300 mb-2">{p.description}</p>
            <div className="flex gap-2 flex-wrap mb-2">
              {p.techStack.map((tech) => (
                <span key={tech} className="bg-blue-200 text-blue-800 px-2 py-1 rounded text-xs">{tech}</span>
              ))}
            </div>
            <div className="flex gap-4 mt-2">
              <a href={p.githubUrl} target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline font-medium">GitHub</a>
              {p.demoUrl && <a href={p.demoUrl} target="_blank" rel="noopener noreferrer" className="text-green-600 hover:underline font-medium">Live Demo</a>}
            </div>
          </div>
        ))}
      </div>
      <div className="flex justify-end mt-8">
        <a href="/projects/archive" className="text-blue-600 hover:underline font-semibold">View All Projects →</a>
      </div>
      <AdminProjectModal open={modalOpen} initial={editProject || undefined} onSave={handleSave} onClose={() => setModalOpen(false)} />
    </div>
  );
} 