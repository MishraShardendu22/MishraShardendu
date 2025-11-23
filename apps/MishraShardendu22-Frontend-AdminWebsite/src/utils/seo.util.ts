/**
 * SEO Utilities for Admin Dashboard
 * Ensures proper meta tags and favicons across all admin pages
 */

export interface SEOConfig {
  title?: string
  description?: string
  noIndex?: boolean
}

const DEFAULT_SEO: SEOConfig = {
  title: 'Admin Dashboard | Shardendu Mishra',
  description:
    'Secure administrative dashboard for managing portfolio content, technical projects, work experiences, professional certifications, and blog posts. Authorized access only.',
  noIndex: true,
}

/**
 * Ensure all favicon links are present in the document head
 */
function ensureFavicons(): void {
  const faviconLinks = [
    { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' },
    { rel: 'apple-touch-icon', sizes: '180x180', href: '/icons/icon-192.png' },
    { rel: 'icon', type: 'image/png', sizes: '192x192', href: '/icons/icon-192.png' },
    { rel: 'icon', type: 'image/png', sizes: '512x512', href: '/icons/icon-512.png' },
  ]

  faviconLinks.forEach((linkConfig) => {
    const selector = linkConfig.type
      ? `link[rel="${linkConfig.rel}"][type="${linkConfig.type}"]`
      : `link[rel="${linkConfig.rel}"][sizes="${linkConfig.sizes}"]`

    let link = document.querySelector(selector) as HTMLLinkElement

    if (!link) {
      link = document.createElement('link')
      link.rel = linkConfig.rel
      link.href = linkConfig.href
      if (linkConfig.type) link.type = linkConfig.type
      if (linkConfig.sizes) link.setAttribute('sizes', linkConfig.sizes)
      document.head.appendChild(link)
    }
  })

  // Ensure manifest link
  if (!document.querySelector('link[rel="manifest"]')) {
    const manifest = document.createElement('link')
    manifest.rel = 'manifest'
    manifest.href = '/manifest.json'
    document.head.appendChild(manifest)
  }

  // Ensure viewport meta tag
  if (!document.querySelector('meta[name="viewport"]')) {
    const viewport = document.createElement('meta')
    viewport.name = 'viewport'
    viewport.content = 'width=device-width, initial-scale=1.0'
    document.head.appendChild(viewport)
  }
}

/**
 * Update or create a meta tag
 */
function updateMetaTag(attributeName: string, attributeValue: string, content: string): void {
  if (!content) return

  let element = document.querySelector(`meta[${attributeName}="${attributeValue}"]`)

  if (element) {
    element.setAttribute('content', content)
  } else {
    element = document.createElement('meta')
    element.setAttribute(attributeName, attributeValue)
    element.setAttribute('content', content)
    document.head.appendChild(element)
  }
}

/**
 * Update page meta tags dynamically
 */
export function updateSEO(config: SEOConfig = {}): void {
  const seo = { ...DEFAULT_SEO, ...config }

  // Update document title
  if (seo.title) {
    document.title = seo.title
  }

  // Ensure favicons are present
  ensureFavicons()

  // Update meta tags
  updateMetaTag('name', 'description', seo.description || '')
  updateMetaTag('name', 'title', seo.title || '')

  // Robots meta tag - always noindex for admin
  if (seo.noIndex !== false) {
    updateMetaTag('name', 'robots', 'noindex, nofollow, noarchive, nosnippet')
    updateMetaTag('name', 'googlebot', 'noindex, nofollow, noarchive, nosnippet')
  }

  // Theme color
  const themeColorDark = document.querySelector(
    'meta[name="theme-color"][media="(prefers-color-scheme: dark)"]'
  )
  const themeColorLight = document.querySelector(
    'meta[name="theme-color"][media="(prefers-color-scheme: light)"]'
  )

  if (!themeColorDark) {
    const meta = document.createElement('meta')
    meta.name = 'theme-color'
    meta.content = '#10b981'
    meta.media = '(prefers-color-scheme: dark)'
    document.head.appendChild(meta)
  }

  if (!themeColorLight) {
    const meta = document.createElement('meta')
    meta.name = 'theme-color'
    meta.content = '#00c896'
    meta.media = '(prefers-color-scheme: light)'
    document.head.appendChild(meta)
  }

  // Open Graph tags
  updateMetaTag('property', 'og:title', seo.title || '')
  updateMetaTag('property', 'og:description', seo.description || '')
  updateMetaTag(
    'property',
    'og:url',
    `https://admin.mishrashardendu22.is-a.dev${window.location.pathname}`
  )
  updateMetaTag('property', 'og:type', 'website')
  updateMetaTag('property', 'og:site_name', 'Shardendu Mishra Admin Dashboard')

  // Twitter tags
  updateMetaTag('name', 'twitter:title', seo.title || '')
  updateMetaTag('name', 'twitter:description', seo.description || '')
  updateMetaTag('name', 'twitter:card', 'summary')
}

/**
 * Page-specific SEO configurations
 */
export const pageSEO = {
  login: {
    title: 'Login | Admin Dashboard - Shardendu Mishra',
    description:
      'Secure login to access the administrative dashboard. Portfolio management system for authorized users only.',
  },
  dashboard: {
    title: 'Dashboard | Admin - Shardendu Mishra',
    description:
      'Administrative dashboard overview. Manage all portfolio content from a centralized interface.',
  },
  profile: {
    title: 'Profile Management | Admin - Shardendu Mishra',
    description: 'Manage personal profile information, contact details, and professional bio.',
  },
  skills: {
    title: 'Skills Management | Admin - Shardendu Mishra',
    description: 'Manage technical skills, proficiency levels, and skill categories.',
  },
  projects: {
    title: 'Projects Management | Admin - Shardendu Mishra',
    description:
      'Create, edit, and manage technical project portfolios, including descriptions, technologies, and links.',
  },
  experiences: {
    title: 'Experience Management | Admin - Shardendu Mishra',
    description: 'Manage work experiences, internships, job positions, and professional timeline.',
  },
  volunteer: {
    title: 'Volunteer Work Management | Admin - Shardendu Mishra',
    description: 'Manage volunteer activities, community contributions, and social impact work.',
  },
  certifications: {
    title: 'Certifications Management | Admin - Shardendu Mishra',
    description: 'Manage professional certifications, course completions, and credentials.',
  },
  kanban: {
    title: 'Kanban Board | Admin - Shardendu Mishra',
    description: 'Task management and project tracking using Kanban methodology.',
  },
  blogReorder: {
    title: 'Blog Reorder | Admin - Shardendu Mishra',
    description: 'Reorder and organize blog posts for better content presentation.',
  },
}
