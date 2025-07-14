'use client';
import { useUser } from '../../context/UserContext';
import Link from 'next/link';

export default function AdminDashboard() {
  const { user } = useUser();
  if (!user || user.role !== 'admin') {
    return <div className="max-w-xl mx-auto py-16 px-4 text-center text-red-600">Access denied. Admins only.</div>;
  }
  return (
    <div className="max-w-2xl mx-auto py-16 px-4">
      <h1 className="text-4xl font-extrabold mb-8 bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 bg-clip-text text-transparent drop-shadow-lg text-center">
        Admin Dashboard
      </h1>
      <div className="flex flex-col gap-6">
        <Link href="/admin/projects" className="px-6 py-4 rounded bg-blue-600 text-white font-bold shadow hover:bg-blue-700 transition text-center">Manage Projects</Link>
        <Link href="/admin/experience" className="px-6 py-4 rounded bg-purple-600 text-white font-bold shadow hover:bg-purple-700 transition text-center">Manage Experience</Link>
        <Link href="/admin/techstack" className="px-6 py-4 rounded bg-green-600 text-white font-bold shadow hover:bg-green-700 transition text-center">Manage Tech Stack</Link>
        <Link href="/admin/oss" className="px-6 py-4 rounded bg-pink-600 text-white font-bold shadow hover:bg-pink-700 transition text-center">Manage OSS & Achievements</Link>
        <Link href="/admin/blog" className="px-6 py-4 rounded bg-neutral-800 text-white font-bold shadow hover:bg-neutral-900 transition text-center">Manage Blog</Link>
      </div>
    </div>
  );
} 