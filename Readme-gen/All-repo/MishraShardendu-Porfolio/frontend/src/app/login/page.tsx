'use client';
import { useState, useEffect } from 'react';
import { useUser } from '../../context/UserContext';
import { useRouter } from 'next/navigation';

const ADMIN_EMAIL = process.env.NEXT_PUBLIC_ADMIN_EMAIL || '';

export default function Login() {
  const { user, loading, login, register } = useUser();
  const router = useRouter();
  const [isRegister, setIsRegister] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [adminPass, setAdminPass] = useState('');
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!loading && user) {
      router.replace('/about');
    }
  }, [user, loading, router]);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError(null);
    try {
      if (isRegister) {
        if (email === ADMIN_EMAIL) {
          await register(email, password, adminPass);
        } else {
          await register(email, password);
        }
      } else {
        await login(email, password);
      }
      router.replace('/about');
    } catch (e: any) {
      setError(e.message || 'Auth failed');
    }
  }

  return (
    <div className="max-w-md mx-auto py-16 px-4">
      <h1 className="text-3xl font-bold mb-6 text-center">{isRegister ? 'Register' : 'Login'}</h1>
      <form onSubmit={handleSubmit} className="flex flex-col gap-4 bg-neutral-100 dark:bg-neutral-900 p-6 rounded-xl shadow-lg">
        <input
          type="email"
          placeholder="Email"
          className="px-4 py-2 rounded border border-neutral-300 dark:border-neutral-700 bg-transparent"
          value={email}
          onChange={e => setEmail(e.target.value)}
          required
        />
        <input
          type="password"
          placeholder="Password"
          className="px-4 py-2 rounded border border-neutral-300 dark:border-neutral-700 bg-transparent"
          value={password}
          onChange={e => setPassword(e.target.value)}
          required
        />
        {isRegister && (
          <div className="flex flex-col gap-1">
            <input
              type="password"
              placeholder="Admin Pass (only required for admin email)"
              className="px-4 py-2 rounded border border-neutral-300 dark:border-neutral-700 bg-transparent"
              value={adminPass}
              onChange={e => setAdminPass(e.target.value)}
            />
            {email === ADMIN_EMAIL && (
              <span className="text-xs text-blue-600">Admin pass required for admin registration</span>
            )}
          </div>
        )}
        {error && <div className="text-red-600 text-sm">{error}</div>}
        <button type="submit" className="px-6 py-2 rounded bg-blue-600 text-white font-bold shadow hover:bg-blue-700 transition">
          {isRegister ? 'Register' : 'Login'}
        </button>
      </form>
      <div className="text-center mt-4">
        <button onClick={() => setIsRegister(r => !r)} className="text-blue-600 hover:underline">
          {isRegister ? 'Already have an account? Login' : 'No account? Register'}
        </button>
      </div>
    </div>
  );
} 