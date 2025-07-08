import './globals.css'
import type { Metadata } from 'next'

import { Fredoka, Poppins, Inter } from 'next/font/google'

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
    default: 'Shardendu Mishra',
  },
  description: 'Creating Greatness one commit at a time.',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={`${fredoka.variable} ${poppins.variable} ${inter.variable} antialiased`}>
        {children}
      </body>
    </html>
  )
}
