import { createContext, useContext, useEffect, useState, ReactNode } from 'react';
import { apiGet, apiPost } from '../utils/api';

type User = {
  sub: string;
  email: string;
  role: string;
};

type UserContextType = {
  user: User | null;
  loading: boolean;
  login: (email: string, password: string) => Promise<void>;
  register: (email: string, password: string, adminPass?: string) => Promise<void>;
  logout: () => Promise<void>;
};

const UserContext = createContext<UserContextType | undefined>(undefined);

export function UserProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    apiGet('/api/auth/me')
      .then(setUser)
      .catch(() => setUser(null))
      .finally(() => setLoading(false));
  }, []);

  async function login(email: string, password: string) {
    setLoading(true);
    try {
      const res = await apiPost('/api/auth/login', { email, password });
      setUser(res.user);
    } finally {
      setLoading(false);
    }
  }

  async function register(email: string, password: string, adminPass?: string) {
    setLoading(true);
    try {
      const res = await apiPost('/api/auth/register', adminPass ? { email, password, adminPass } : { email, password });
      setUser(res.user);
    } finally {
      setLoading(false);
    }
  }

  async function logout() {
    setLoading(true);
    try {
      await apiPost('/api/auth/logout', {});
    } catch {}
    setUser(null);
    setLoading(false);
  }

  return (
    <UserContext.Provider value={{ user, loading, login, register, logout }}>
      {children}
    </UserContext.Provider>
  );
}

export function useUser() {
  const ctx = useContext(UserContext);
  if (!ctx) throw new Error('useUser must be used within UserProvider');
  return ctx;
} 