import './globals.css'
import { BASE_URL } from '@/constants/url'
import { ThemeProvider } from 'next-themes'
import type { Metadata, Viewport } from 'next'
import { Fredoka, Poppins, Inter } from 'next/font/google'
import ResourceHints from '@/components/extra/ResourceHints'
import ToasterClient from '@/components/extra/ToasterClient'
import ThemeToggleClient from '@/components/extra/ThemeToggleClient'
import { DeferredAnalytics } from '@/components/extra/DeferredAnalytics'
import { ServiceWorkerRegistration } from '@/components/extra/ServiceWorkerRegistration'

const fredoka = Fredoka({
  variable: '--font-heading',
  subsets: ['latin'],
  weight: ['600', '700'],
  display: 'swap',
  fallback: ['system-ui', 'Arial', 'sans-serif'],
  preload: true,
  adjustFontFallback: true,
})

const poppins = Poppins({
  variable: '--font-subheading',
  subsets: ['latin'],
  weight: ['400', '500'],
  display: 'swap',
  fallback: ['system-ui', 'Arial', 'sans-serif'],
  preload: true,
  adjustFontFallback: true,
})

const inter = Inter({
  variable: '--font-body',
  subsets: ['latin'],
  weight: ['400', '500'],
  display: 'swap',
  fallback: ['system-ui', 'Arial', 'sans-serif'],
  preload: true,
  adjustFontFallback: true,
})

export const metadata: Metadata = {
  metadataBase: new URL(BASE_URL),
  title: {
    template: '%s | Shardendu Mishra',
    default: 'Shardendu Mishra | Software Developer and Engineer',
  },
  description:
    'Software Developer and Engineer passionate about building impactful applications with modern technologies. Specializing in Go, React, and cloud-native solutions.',
  keywords: [
    'Shardendu Mishra',
    'Software Developer',
    'Software Engineer',
    'Go Developer',
    'Golang Expert',
    'React Developer',
    'Next.js Developer',
    'TypeScript Developer',
    'JavaScript Developer',
    'Full Stack Developer',
    'IIIT Dharwad',
    'Indian Institute of Information Technology',
    'Portfolio',
    'Web Development',
    'Software Engineering',
    'Cloud Native Development',
    'Open Source Contributor',
    'LeetCode',
    'Competitive Programming',
    'Developer Portfolio',
    'Software Projects',
    'Programming Projects',
    'MongoDB',
    'PostgreSQL',
    'Docker',
    'Kubernetes',
    'Linux',
    'Git',
    'GitHub',
    'System Design',
    'Data Structures',
    'Algorithms',
    'Backend Development',
    'Frontend Development',
    'API Development',
    'Database Design',
    'ShardenduMishra22',
    'MishraShardendu22',
    'Code',
    'Programming',
    'Technology',
    'Innovation',
    'Student Developer',
    'India',
    'Bangalore',
    'Software Architecture',
    'Microservices',
    'RESTful APIs',
    'GraphQL',
    'DevOps',
    'CI/CD',
    'Version Control',
    'Agile Development',
  ],
  authors: [{ name: 'Shardendu Mishra', url: BASE_URL }],
  creator: 'Shardendu Mishra',
  publisher: 'Shardendu Mishra',
  manifest: '/manifest.json',
  icons: {
    icon: [
      { url: '/favicon.ico', sizes: 'any' },
      { url: '/icons/icon-192.png', sizes: '192x192', type: 'image/png' },
      { url: '/icons/icon-512.png', sizes: '512x512', type: 'image/png' },
    ],
    shortcut: '/favicon.ico',
    apple: [
      { url: '/icons/icon-192.png', sizes: '192x192', type: 'image/png' },
      { url: '/icons/icon-512.png', sizes: '512x512', type: 'image/png' },
    ],
    other: [
      {
        rel: 'icon',
        type: 'image/x-icon',
        sizes: '48x48',
        url: '/favicon.ico',
      },
      {
        rel: 'apple-touch-icon',
        sizes: '180x180',
        url: '/icons/icon-192.png',
      },
    ],
  },
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: BASE_URL,
    title: 'Shardendu Mishra - Software Developer and Engineer',
    description:
      'Software Developer and Engineer passionate about building impactful applications with modern technologies. Specializing in Go, React, and cloud-native solutions.',
    siteName: 'Shardendu Mishra Portfolio',
    images: [
      {
        url: '/og-image.png',
        width: 1200,
        height: 630,
        alt: 'Shardendu Mishra - Software Developer Portfolio',
      },
      {
        url: '/Professional.avif',
        width: 512,
        height: 512,
        alt: 'Shardendu Mishra Professional Photo',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Shardendu Mishra - Software Developer and Engineer',
    description:
      'Software Developer and Engineer passionate about building impactful applications with modern technologies. Specializing in Go, React, and cloud-native solutions.',
    site: '@Shardendu_M',
    creator: '@Shardendu_M',
    images: [
      {
        url: '/og-image.png',
        width: 1200,
        height: 630,
        alt: 'Shardendu Mishra - Software Developer Portfolio',
      },
    ],
  },
  robots: {
    index: true,
    follow: true,
    nocache: false,
    googleBot: {
      index: true,
      follow: true,
      noimageindex: false,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  verification: {},
  category: 'technology',
  classification: 'Portfolio Website',
  appleWebApp: {
    capable: true,
    statusBarStyle: 'default',
    title: 'Shardendu Portfolio',
    startupImage: '/icons/icon-512.png',
  },
  formatDetection: {
    telephone: false,
  },
  alternates: {
    canonical: BASE_URL,
    languages: {
      'en-US': BASE_URL,
    },
  },
  other: {
    'mobile-web-app-capable': 'yes',
    'apple-mobile-web-app-capable': 'yes',
    'apple-mobile-web-app-status-bar-style': 'default',
    'apple-mobile-web-app-title': 'Shardendu Portfolio',
    'application-name': 'Shardendu Portfolio',
    'msapplication-TileColor': '#000000',
    'msapplication-config': '/browserconfig.xml',
    'google-site-verification': 'pending',
  },
}

export const viewport: Viewport = {
  themeColor: [
    { media: '(prefers-color-scheme: light)', color: '#ffffff' },
    { media: '(prefers-color-scheme: dark)', color: '#000000' },
  ],
  width: 'device-width',
  initialScale: 1,
  maximumScale: 5,
  userScalable: true,
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <link rel="icon" type="image/x-icon" href="/favicon.ico" sizes="48x48" />
        <link rel="icon" type="image/png" sizes="192x192" href="/icons/icon-192.png" />
        <link rel="icon" type="image/png" sizes="512x512" href="/icons/icon-512.png" />
        <link rel="apple-touch-icon" sizes="180x180" href="/icons/icon-192.png" />
        <link rel="apple-touch-icon" sizes="192x192" href="/icons/icon-192.png" />
        <link rel="apple-touch-icon" sizes="512x512" href="/icons/icon-512.png" />
        <ResourceHints />
        <script
          dangerouslySetInnerHTML={{
            __html: `
              // Apply reduced motion immediately to prevent layout shift
              (function() {
                const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
                const isLowEndDevice = ('deviceMemory' in navigator && navigator.deviceMemory < 4) || 
                                      ('hardwareConcurrency' in navigator && navigator.hardwareConcurrency < 4);
                if (prefersReducedMotion || isLowEndDevice) {
                  document.documentElement.classList.add('reduce-motion');
                }
              })();
            `,
          }}
        />
      </head>
      <body className={`${fredoka.variable} ${poppins.variable} ${inter.variable} antialiased `}>
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
          storageKey="portfolio-theme"
        >
          <div className="min-h-screen bg-background text-foreground">
            {children}
            <ThemeToggleClient />
            <DeferredAnalytics />
            <ServiceWorkerRegistration />
          </div>
        </ThemeProvider>
      </body>
    </html>
  )
}
