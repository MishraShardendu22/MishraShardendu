import Header from '@/components/Header'
import React from 'react'
import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'User Login | Social Media Platform Made By Shardendu Mishra',
  description: 'Securely log in to access a personalized experience on our student-focused shorts platform—designed for entertainment and learning between study sessions.',
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
