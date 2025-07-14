import { Geist, Geist_Mono } from 'next/font/google';
import Providers from './component/Providers';
import { Toaster } from 'react-hot-toast';
import type { Metadata } from 'next';
import './globals.css';
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
    template: '%s | ScrollHub ',
    default: 'ScrollHub | Made By Shardendu Mishra',
  },
  description:
    'A Shorts Platform Designed For Students, To keep Them Entartained And Sometimes Informed Between Those Long Study Sessions.',
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className="dark">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <Providers>
          <Toaster
            position="top-left"
            reverseOrder={false}
            toastOptions={{
              duration: 3000,
            }}
          />
          {children}
        </Providers>
      </body>
    </html>
  );
}
