'use client';
import './globals.css';
import { ReactNode, useEffect, useState, useRef } from 'react';
import { Inter } from 'next/font/google';
import { usePathname } from 'next/navigation';
import gsap from 'gsap';
import { UserProvider, useUser } from '../context/UserContext';

const inter = Inter({ subsets: ['latin'] });

const navLinks = [
  { href: '/projects', label: 'Projects' },
  { href: '/blog', label: 'Blog' },
  { href: '/experience', label: 'Experience' },
  { href: '/techstack', label: 'Tech Stack' },
  { href: '/oss', label: 'OSS & Achievements' },
  { href: '/contact', label: 'Contact' },
];

function UserNav() {
  const { user, logout } = useUser();
  if (!user) return null;
  return (
    <div className="flex items-center gap-3 ml-6">
      <span className="text-sm text-neutral-600 dark:text-neutral-300">{user.email}</span>
      {user.role === 'admin' && (
        <a href="/admin" className="px-3 py-1 rounded bg-blue-600 text-white text-sm ml-2">Admin</a>
      )}
      <button onClick={logout} className="px-3 py-1 rounded bg-neutral-200 dark:bg-neutral-800 text-sm">Logout</button>
    </div>
  );
}

export default function RootLayout({ children }: { children: ReactNode }) {
  const [dark, setDark] = useState(false);
  const pathname = usePathname();
  const navRef = useRef<HTMLUListElement>(null);

  useEffect(() => {
    gsap.fromTo(
      '#page-transition',
      { opacity: 0, y: 40 },
      { opacity: 1, y: 0, duration: 1, ease: 'power3.out' }
    );
  }, [pathname]);

  useEffect(() => {
    if (navRef.current) {
      gsap.fromTo(
        navRef.current.children,
        { opacity: 0, y: -20 },
        { opacity: 1, y: 0, duration: 0.7, stagger: 0.08, ease: 'power2.out' }
      );
    }
  }, []);

  return (
    <UserProvider>
      <LayoutContent dark={dark} setDark={setDark} pathname={pathname} navRef={navRef}>
        {children}
      </LayoutContent>
    </UserProvider>
  );
}

function LayoutContent({ dark, setDark, pathname, navRef, children }: { dark: boolean; setDark: (d: boolean) => void; pathname: string; navRef: React.RefObject<HTMLUListElement | null>; children: ReactNode }) {
  const { user } = useUser();
  return (
    <html lang="en" className={dark ? 'dark' : ''}>
      <body className={`min-h-screen bg-white dark:bg-black text-black dark:text-white ${inter.className}`}>
        <nav className="flex justify-between items-center px-8 py-4 border-b border-neutral-200 dark:border-neutral-800">
          <span className="font-bold text-xl">Mishra Shardendu</span>
          <ul ref={navRef} className="flex gap-6 text-lg font-medium">
            {user && navLinks.map((link) => (
              <li key={link.href}>
                <a href={link.href} className={pathname === link.href ? 'text-blue-600 dark:text-blue-400 underline' : 'hover:text-blue-500 dark:hover:text-blue-300 transition'}>
                  {link.label}
                </a>
              </li>
            ))}
          </ul>
          <UserNav />
          <button
            aria-label="Toggle dark mode"
            className="rounded px-3 py-1 border border-neutral-300 dark:border-neutral-700 ml-6"
            onClick={() => setDark(!dark)}
          >
            {dark ? '🌙' : '☀️'}
          </button>
        </nav>
        <main id="page-transition" className="transition-all duration-700">
          {children}
        </main>
      </body>
    </html>
  );
}
