import { Metadata } from 'next'
import React from 'react'

export const metadata: Metadata = {
  title: 'Ask AI | Social Media Platform Made By Shardendu Mishra',
  description: 'An AI-powered shorts platform designed to keep students engaged, entertained, and informed during study breaks.',
}

const Layout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  return (
    <div>
      {children}
    </div>
  )
}

export default Layout
