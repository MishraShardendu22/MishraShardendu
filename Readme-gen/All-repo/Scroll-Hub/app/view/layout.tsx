import Header from '@/components/Header'
import React from 'react'
import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Watch Videos | Social Media Platform Made By Shardendu Mishra',
  description: 'Explore and enjoy engaging short videos on our student-focused platform—designed for entertainment and learning during study breaks.',
}

const Layout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  return (
    <div>
      <Header />
      {children}
    </div>
  )
}

export default Layout
