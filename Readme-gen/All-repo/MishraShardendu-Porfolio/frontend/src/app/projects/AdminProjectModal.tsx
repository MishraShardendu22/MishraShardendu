import { ReactNode } from 'react';
import AdminProjectForm from './AdminProjectForm';

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
  open: boolean;
  initial?: Project;
  onSave: (project: Project) => void;
  onClose: () => void;
};

export default function AdminProjectModal({ open, initial, onSave, onClose }: Props) {
  if (!open) return null;
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40">
      <div className="bg-white dark:bg-neutral-900 rounded-xl shadow-lg p-6 w-full max-w-2xl relative">
        <button onClick={onClose} className="absolute top-2 right-2 text-2xl">×</button>
        <AdminProjectForm initial={initial} onSave={onSave} onCancel={onClose} />
      </div>
    </div>
  );
} 