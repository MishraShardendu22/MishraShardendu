import { useState } from 'react';

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

type Props = {
  initial?: Project;
  onSave: (project: Project) => void;
  onCancel: () => void;
};

const techOptions = ['Next.js', 'Tailwind', 'GSAP', 'Go', 'Fiber', 'MongoDB', 'React', 'Node.js'];
const categoryOptions = ['Web', 'Dashboard', 'Mobile', 'Other'];

export default function AdminProjectForm({ initial, onSave, onCancel }: Props) {
  const [form, setForm] = useState<Project>(
    initial || {
      title: '',
      description: '',
      githubUrl: '',
      techStack: [],
      role: '',
      demoUrl: '',
      image: '',
      featured: false,
      category: '',
    }
  );
  const [error, setError] = useState<string | null>(null);

  function handleChange(e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) {
    const { name, value, type, checked } = e.target;
    setForm((f) => ({
      ...f,
      [name]: type === 'checkbox' ? checked : value,
    }));
  }

  function handleTechChange(tech: string) {
    setForm((f) => ({
      ...f,
      techStack: f.techStack.includes(tech)
        ? f.techStack.filter((t) => t !== tech)
        : [...f.techStack, tech],
    }));
  }

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!form.title || !form.description || !form.githubUrl) {
      setError('Title, description, and GitHub URL are required.');
      return;
    }
    setError(null);
    onSave(form);
  }

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-4 bg-neutral-100 dark:bg-neutral-900 p-6 rounded-xl shadow-lg max-w-xl mx-auto">
      <input name="title" value={form.title} onChange={handleChange} placeholder="Title" className="px-4 py-2 rounded border border-neutral-300 dark:border-neutral-700 bg-transparent" required />
      <textarea name="description" value={form.description} onChange={handleChange} placeholder="Description" className="px-4 py-2 rounded border border-neutral-300 dark:border-neutral-700 bg-transparent" rows={3} required />
      <input name="githubUrl" value={form.githubUrl} onChange={handleChange} placeholder="GitHub URL" className="px-4 py-2 rounded border border-neutral-300 dark:border-neutral-700 bg-transparent" required />
      <input name="demoUrl" value={form.demoUrl} onChange={handleChange} placeholder="Live Demo URL" className="px-4 py-2 rounded border border-neutral-300 dark:border-neutral-700 bg-transparent" />
      <input name="image" value={form.image} onChange={handleChange} placeholder="Image URL" className="px-4 py-2 rounded border border-neutral-300 dark:border-neutral-700 bg-transparent" />
      <input name="role" value={form.role} onChange={handleChange} placeholder="Your Role" className="px-4 py-2 rounded border border-neutral-300 dark:border-neutral-700 bg-transparent" />
      <div>
        <label className="block mb-1 font-medium">Tech Stack</label>
        <div className="flex flex-wrap gap-2">
          {techOptions.map((tech) => (
            <label key={tech} className="flex items-center gap-1">
              <input type="checkbox" checked={form.techStack.includes(tech)} onChange={() => handleTechChange(tech)} />
              {tech}
            </label>
          ))}
        </div>
      </div>
      <div>
        <label className="block mb-1 font-medium">Category</label>
        <select name="category" value={form.category} onChange={handleChange} className="px-4 py-2 rounded border border-neutral-300 dark:border-neutral-700 bg-transparent">
          <option value="">Select category</option>
          {categoryOptions.map((cat) => (
            <option key={cat} value={cat}>{cat}</option>
          ))}
        </select>
      </div>
      <label className="flex items-center gap-2">
        <input type="checkbox" name="featured" checked={form.featured} onChange={handleChange} />
        Featured
      </label>
      {error && <div className="text-red-600 text-sm">{error}</div>}
      <div className="flex gap-4 mt-2">
        <button type="submit" className="px-6 py-2 rounded bg-blue-600 text-white font-bold shadow hover:bg-blue-700 transition">Save</button>
        <button type="button" onClick={onCancel} className="px-6 py-2 rounded bg-neutral-300 dark:bg-neutral-700 text-black dark:text-white font-bold shadow hover:bg-neutral-400 dark:hover:bg-neutral-600 transition">Cancel</button>
      </div>
    </form>
  );
} 