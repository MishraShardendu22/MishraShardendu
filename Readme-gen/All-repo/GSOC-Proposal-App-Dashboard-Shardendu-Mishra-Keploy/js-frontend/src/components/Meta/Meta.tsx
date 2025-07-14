import type { Metadata } from 'next'

export const generateMetadata = (
  title: string,
  description: string
): Metadata => ({
  title,
  description,
})

export const defaultMetadata: Metadata = {
  title: 'App Dashboard',
  description:
    'An interactive console for real-time visualizations, code merges, and test activities.',
}
