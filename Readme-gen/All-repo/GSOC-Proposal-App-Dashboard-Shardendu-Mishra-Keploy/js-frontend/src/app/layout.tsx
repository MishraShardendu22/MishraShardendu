import './globals.css'
import { cn } from '@/lib/utils'
import type { Metadata } from 'next'
import { Poppins } from 'next/font/google'
import Header from '@/components/Body/Header'
import Footer from '@/components/Body/Footer'
import { SessionProvider } from 'next-auth/react'

const poppins = Poppins({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700'],
})

export const metadata: Metadata = {
  title: 'App Dashboard',
  description:
    'An interactive console for real-time visualizations, code merges, and test activities.',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body className={cn(poppins.className, "flex flex-col min-h-screen")}>
        <SessionProvider>
          <Header />

          <main className="flex-grow">
            {children}
          </main>

          <Footer />
        </SessionProvider>
      </body>
    </html>
  )
}