'use client';
import { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { apiGet } from '../../utils/api';

type TechStack = {
  _id: string;
  category: string;
  name: string;
  icon: string;
};

export default function TechStackPage() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const [stack, setStack] = useState<TechStack[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    gsap.fromTo(sectionRef.current, { opacity: 0, y: 40 }, { opacity: 1, y: 0, duration: 1, ease: 'power3.out' });
    setLoading(true);
    apiGet('/api/techstack')
      .then(setStack)
      .catch((e) => setError(e.message))
      .finally(() => setLoading(false));
  }, []);

  // Group by category
  const grouped = stack.reduce((acc, item) => {
    acc[item.category] = acc[item.category] || [];
    acc[item.category].push(item);
    return acc;
  }, {} as Record<string, TechStack[]>);

  return (
    <div ref={sectionRef} className="max-w-4xl mx-auto py-16 px-4">
      <h1 className="text-4xl md:text-5xl font-extrabold mb-8 bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 bg-clip-text text-transparent drop-shadow-lg">
        Tech Stack
      </h1>
      {loading && <div className="text-lg">Loading...</div>}
      {error && <div className="text-red-600">{error}</div>}
      <div className="grid md:grid-cols-2 gap-8">
        {Object.entries(grouped).map(([cat, items]) => (
          <div key={cat} className="bg-neutral-100 dark:bg-neutral-900 rounded-xl p-6 shadow-lg">
            <h2 className="text-2xl font-bold mb-4">{cat}</h2>
            <div className="flex flex-wrap gap-3">
              {items.map((item) => (
                <span key={item._id} className="inline-flex items-center gap-2 px-3 py-1 bg-blue-200 text-blue-800 rounded text-sm font-medium">
                  {/* Icon placeholder */}
                  <span className="w-4 h-4 bg-blue-400 rounded-full inline-block" />
                  {item.name}
                </span>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
} 