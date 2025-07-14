'use client';
import { useEffect, useRef } from 'react';
import gsap from 'gsap';

export default function About() {
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    gsap.fromTo(sectionRef.current, { opacity: 0, y: 40 }, { opacity: 1, y: 0, duration: 1, ease: 'power3.out' });
  }, []);

  return (
    <div ref={sectionRef} className="max-w-2xl mx-auto py-16 px-4 text-center">
      <h1 className="text-4xl md:text-5xl font-extrabold mb-8 bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 bg-clip-text text-transparent drop-shadow-lg">
        About
      </h1>
      <div className="flex flex-col items-center gap-6">
        <div className="w-32 h-32 rounded-full bg-gradient-to-br from-blue-400 to-pink-400 mb-4" />
        <p className="text-lg md:text-xl text-neutral-700 dark:text-neutral-300 mb-2">
          Hi, I'm Mishra Shardendu. I build impactful products with code. Experienced in full-stack web, cloud, and open source. Passionate about elegant solutions and developer experience.
        </p>
        <p className="text-base text-neutral-500 dark:text-neutral-400 mb-2">
          <strong>Current focus:</strong> Building modern, animated, and accessible web experiences.
        </p>
      </div>
    </div>
  );
} 