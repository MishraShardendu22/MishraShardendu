import './globals.css'
import type { Metadata } from 'next'
import { Fredoka, Poppins, Inter } from 'next/font/google'
import { ThemeProvider } from 'next-themes'
import ThemeToggleClient from '@/components/ThemeToggleClient'

// Playful rounded heading font
const fredoka = Fredoka({
  variable: '--font-heading',
  subsets: ['latin'],
  weight: ['600', '700'],
  display: 'swap',
})

// Clean subheading font
const poppins = Poppins({
  variable: '--font-subheading',
  subsets: ['latin'],
  weight: ['400', '500'],
  display: 'swap',
})

// Clean body font
const inter = Inter({
  variable: '--font-body',
  subsets: ['latin'],
  weight: ['400'],
  display: 'swap',
})

export const metadata: Metadata = {
  title: {
    template: '%s | Shardendu Mishra',
    default: 'Shardendu Mishra - Full Stack Developer',
  },
  description: 'Full Stack Developer passionate about building impactful applications with modern technologies. Specializing in Go, React, and cloud-native solutions.',
  keywords: ['Shardendu Mishra', 'Full Stack Developer', 'Go', 'React', 'Portfolio', 'Software Engineer'],
  authors: [{ name: 'Shardendu Mishra' }],
  creator: 'Shardendu Mishra',
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: 'https://mishrashardendu.com',
    title: 'Shardendu Mishra - Full Stack Developer',
    description: 'Full Stack Developer passionate about building impactful applications with modern technologies.',
    siteName: 'Shardendu Mishra Portfolio',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Shardendu Mishra - Full Stack Developer',
    description: 'Full Stack Developer passionate about building impactful applications with modern technologies.',
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${fredoka.variable} ${poppins.variable} ${inter.variable} antialiased`}>
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          {children}
          <ThemeToggleClient />
        </ThemeProvider>
      </body>
    </html>
  )
}
