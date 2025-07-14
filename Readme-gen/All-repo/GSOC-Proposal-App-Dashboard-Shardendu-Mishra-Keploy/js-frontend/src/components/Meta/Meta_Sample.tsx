import React from 'react'
import { generateMetadata } from './Meta'

export const metadata = generateMetadata(
  'Dashboard - App Metrics',
  'View real-time test reports, PR insights, and interactive data visualizations.'
)

const Page = () => {
  return (
    <div>
      <h1>Dashboard</h1>
      <p>Welcome to the app dashboard.</p>
    </div>
  )
}

export default Page
