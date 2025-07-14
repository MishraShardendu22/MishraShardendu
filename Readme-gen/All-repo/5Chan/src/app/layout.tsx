import { Geist, Geist_Mono } from 'next/font/google';
import { Toaster } from 'react-hot-toast';
import type { Metadata } from 'next';
import './globals.css';
import AuthProvider from '@/components/authProvider';

const geistSans = Geist({
 variable: '--font-geist-sans',
 subsets: ['latin'],
});

const geistMono = Geist_Mono({
 variable: '--font-geist-mono',
 subsets: ['latin'],
});

export const metadata: Metadata = {
 title: {
  template: '%s | 5Chan',
  default: '5Chan - Made By Shardendu Mishra',
 },
 description:
  'Anonymous Messaging | Sometimes Roasting, Sometimes Toasting - Made With Love By Shardendu Mishra Using Next.js 15',
};

export default function RootLayout({ children, }: Readonly<{ children: React.ReactNode; }>) {
  return (
    <html lang="en" className="dark">
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
        <AuthProvider>
          {children}
        </AuthProvider>
        <Toaster position="top-right" reverseOrder={false} />
      </body>
    </html>
  );
}
