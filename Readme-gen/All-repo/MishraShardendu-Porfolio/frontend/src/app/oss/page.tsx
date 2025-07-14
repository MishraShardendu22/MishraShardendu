'use client';
import { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { apiGet } from '../../utils/api';

type OSS = {
  _id: string;
  repo: string;
  description: string;
};

type Achievement = {
  _id: string;
  title: string;
  description: string;
  images: string[];
};

export default function OSSPage() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const [oss, setOss] = useState<OSS[]>([]);
  const [achievements, setAchievements] = useState<Achievement[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    gsap.fromTo(sectionRef.current, { opacity: 0, y: 40 }, { opacity: 1, y: 0, duration: 1, ease: 'power3.out' });
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

  return (
    <div ref={sectionRef} className="max-w-4xl mx-auto py-16 px-4">
      <h1 className="text-4xl md:text-5xl font-extrabold mb-8 bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 bg-clip-text text-transparent drop-shadow-lg">
        OSS & Achievements
      </h1>
      {loading && <div className="text-lg">Loading...</div>}
      {error && <div className="text-red-600">{error}</div>}
      <div className="space-y-8">
        {/* OSS contributions */}
        <div className="bg-neutral-100 dark:bg-neutral-900 rounded-xl p-6 shadow-lg">
          <h2 className="text-2xl font-bold mb-4">Open Source Contributions</h2>
          <ul className="list-disc ml-6 text-neutral-700 dark:text-neutral-300">
            {oss.map((o) => (
              <li key={o._id}><span className="font-semibold">{o.repo}</span> - {o.description}</li>
            ))}
          </ul>
        </div>
        {/* Achievements */}
        <div className="bg-neutral-100 dark:bg-neutral-900 rounded-xl p-6 shadow-lg">
          <h2 className="text-2xl font-bold mb-4">Certifications & Badges</h2>
          <ul className="flex flex-wrap gap-4 justify-center">
            {achievements.map((a) => (
              <li key={a._id} className="bg-blue-200 text-blue-800 px-3 py-1 rounded text-sm">{a.title}</li>
            ))}
          </ul>
        </div>
        {/* Image Gallery */}
        <div className="bg-neutral-100 dark:bg-neutral-900 rounded-xl p-6 shadow-lg">
          <h2 className="text-2xl font-bold mb-4">Gallery</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {achievements.flatMap((a) => a.images.map((img, i) => (
              <img key={a._id + i} src={img} alt={a.title} className="aspect-square object-cover rounded-lg" />
            )))}
          </div>
        </div>
      </div>
    </div>
  );
} 