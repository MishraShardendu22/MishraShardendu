'use client';
import { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { apiGet } from '../../utils/api';

type Experience = {
  _id: string;
  company: string;
  role: string;
  duration: string;
  bullets: string[];
  projects: string[];
};

export default function ExperiencePage() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const [experience, setExperience] = useState<Experience[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    gsap.fromTo(sectionRef.current, { opacity: 0, y: 40 }, { opacity: 1, y: 0, duration: 1, ease: 'power3.out' });
    setLoading(true);
    apiGet('/api/experience')
      .then(setExperience)
      .catch((e) => setError(e.message))
      .finally(() => setLoading(false));
  }, []);

  return (
    <div ref={sectionRef} className="max-w-3xl mx-auto py-16 px-4">
      <h1 className="text-4xl md:text-5xl font-extrabold mb-8 bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 bg-clip-text text-transparent drop-shadow-lg">
        Experience
      </h1>
      {loading && <div className="text-lg">Loading...</div>}
      {error && <div className="text-red-600">{error}</div>}
      <ol className="relative border-l border-blue-400 dark:border-blue-600">
        {experience.map((exp) => (
          <li key={exp._id} className="mb-10 ml-6">
            <span className="absolute flex items-center justify-center w-6 h-6 bg-blue-500 rounded-full -left-3 ring-8 ring-white dark:ring-black" />
            <h3 className="flex items-center mb-1 text-2xl font-semibold">{exp.company} <span className="bg-blue-100 text-blue-800 text-xs font-medium mr-2 px-2.5 py-0.5 rounded ml-2">{exp.role}</span></h3>
            <time className="block mb-2 text-sm font-normal leading-none text-neutral-400">{exp.duration}</time>
            <ul className="list-disc ml-6 text-neutral-700 dark:text-neutral-300">
              {exp.bullets.map((b, i) => <li key={i}>{b}</li>)}
            </ul>
          </li>
        ))}
      </ol>
    </div>
  );
} 