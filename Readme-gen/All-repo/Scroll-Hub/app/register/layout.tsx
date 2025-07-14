import Header from '@/components/Header'
import React from 'react'
import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'User Registration | Social Media Platform Made By Shardendu Mishra',
  description: 'Create your account to access a student-focused shorts platform—designed for entertainment and learning during study breaks.',
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
