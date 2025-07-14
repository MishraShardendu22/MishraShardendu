import Header from '@/components/Header'
import React from 'react'
import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Upload Videos | Social Media Platform Made By Shardendu Mishra',
  description: 'Easily upload and share short videos on our student-focused platform—designed for entertainment and learning during study breaks.',
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
