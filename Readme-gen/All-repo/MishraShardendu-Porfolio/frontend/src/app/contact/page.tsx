'use client';
import { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { apiPost } from '../../utils/api';

export default function Contact() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);

  useEffect(() => {
    gsap.fromTo(sectionRef.current, { opacity: 0, y: 40 }, { opacity: 1, y: 0, duration: 1, ease: 'power3.out' });
  }, []);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError(null);
    setSuccess(false);
    setLoading(true);
    try {
      await apiPost('/api/contact', { name, email, message });
      setSuccess(true);
      setName('');
      setEmail('');
      setMessage('');
    } catch (e: any) {
      setError(e.message || 'Failed to send message');
    } finally {
      setLoading(false);
    }
  }

  return (
    <div ref={sectionRef} className="max-w-xl mx-auto py-16 px-4">
      <h1 className="text-4xl md:text-5xl font-extrabold mb-8 bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 bg-clip-text text-transparent drop-shadow-lg">
        Contact
      </h1>
      <div className="flex flex-col gap-6">
        <a href="mailto:mishrashardendu22@gmail.com" className="text-blue-600 hover:underline font-medium text-lg">mishrashardendu22@gmail.com</a>
        <form className="bg-neutral-100 dark:bg-neutral-900 rounded-xl p-6 shadow-lg flex flex-col gap-4" onSubmit={handleSubmit}>
          <input type="text" placeholder="Your Name" className="px-4 py-2 rounded border border-neutral-300 dark:border-neutral-700 bg-transparent" value={name} onChange={e => setName(e.target.value)} required />
          <input type="email" placeholder="Your Email" className="px-4 py-2 rounded border border-neutral-300 dark:border-neutral-700 bg-transparent" value={email} onChange={e => setEmail(e.target.value)} required />
          <textarea placeholder="Your Message" className="px-4 py-2 rounded border border-neutral-300 dark:border-neutral-700 bg-transparent" rows={5} value={message} onChange={e => setMessage(e.target.value)} required />
          {error && <div className="text-red-600 text-sm">{error}</div>}
          {success && <div className="text-green-600 text-sm">Message sent successfully!</div>}
          <button type="submit" className="px-6 py-2 rounded bg-blue-600 text-white font-bold shadow hover:bg-blue-700 transition" disabled={loading}>
            {loading ? 'Sending...' : 'Send Message'}
          </button>
        </form>
        <div className="flex gap-6 justify-center mt-4">
          <a href="https://github.com/MishraShardendu" target="_blank" rel="noopener noreferrer" className="text-neutral-600 dark:text-neutral-300 hover:text-blue-600 text-2xl">GitHub</a>
          <a href="https://linkedin.com/in/mishrashardendu" target="_blank" rel="noopener noreferrer" className="text-neutral-600 dark:text-neutral-300 hover:text-blue-600 text-2xl">LinkedIn</a>
          <a href="https://twitter.com/MishraShardendu" target="_blank" rel="noopener noreferrer" className="text-neutral-600 dark:text-neutral-300 hover:text-blue-600 text-2xl">Twitter</a>
        </div>
      </div>
    </div>
  );
} 