/**
 * SEO Utilities for dynamic meta tag management
 */

export interface SEOConfig {
  title?: string
  description?: string
  keywords?: string
  image?: string
  url?: string
  type?: string
  author?: string
  publishedTime?: string
  modifiedTime?: string
  section?: string
  tags?: string[]
}

const DEFAULT_SEO: SEOConfig = {
  title: 'Blogs By Shardendu Mishra | Tech Articles & Programming Insights',
  description:
    'Explore in-depth technical articles about web development, software engineering, programming best practices, and modern tech stack insights by Shardendu Mishra, a passionate software engineer and IIIT Dharwad student.',
  keywords:
    'Shardendu Mishra blog, technical blog, web development articles, programming tutorials, software engineering, Go programming, React tutorials, TypeScript guides, tech insights, developer blog, coding tips, IIIT Dharwad, full stack development, system design',
  image: 'https://blogs.mishrashardendu22.is-a.dev/blogog-image.png',
  url: 'https://blogs.mishrashardendu22.is-a.dev',
  type: 'website',
  author: 'Shardendu Mishra',
}

/**
 * Ensure all favicon links are present in the document head
 */
function ensureFavicons(): void {
  const faviconLinks = [
    { rel: 'icon', href: '/favicon.ico', sizes: 'any' },
    { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' },
    { rel: 'icon', type: 'image/png', sizes: '16x16', href: '/icons/icon-16.png' },
    { rel: 'icon', type: 'image/png', sizes: '32x32', href: '/icons/icon-32.png' },
    { rel: 'icon', type: 'image/png', sizes: '192x192', href: '/icons/icon-192.png' },
    { rel: 'icon', type: 'image/png', sizes: '512x512', href: '/icons/icon-512.png' },
    { rel: 'apple-touch-icon', href: '/icons/icon-192.png' },
    { rel: 'apple-touch-icon', sizes: '192x192', href: '/icons/icon-192.png' },
    { rel: 'apple-touch-icon', sizes: '512x512', href: '/icons/icon-512.png' },
  ]

  faviconLinks.forEach((linkConfig) => {
    const selector = linkConfig.type
      ? `link[rel="${linkConfig.rel}"][type="${linkConfig.type}"]${linkConfig.sizes ? `[sizes="${linkConfig.sizes}"]` : ''}`
      : `link[rel="${linkConfig.rel}"]${linkConfig.sizes ? `[sizes="${linkConfig.sizes}"]` : ''}[href="${linkConfig.href}"]`

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

  // Update or create meta tags
  updateMetaTag('name', 'description', seo.description || '')
  updateMetaTag('name', 'keywords', seo.keywords || '')
  updateMetaTag('name', 'author', seo.author || '')

  // Update theme-color and color-scheme
  updateMetaTag('name', 'theme-color', '#000000')
  updateMetaTag('name', 'color-scheme', 'light dark')

  // Open Graph tags
  updateMetaTag('property', 'og:title', seo.title || '')
  updateMetaTag('property', 'og:description', seo.description || '')
  updateMetaTag('property', 'og:image', seo.image || '')
  updateMetaTag('property', 'og:url', seo.url || '')
  updateMetaTag('property', 'og:type', seo.type || 'website')
  updateMetaTag('property', 'og:site_name', 'Shardendu Mishra Blog')
  updateMetaTag('property', 'og:locale', 'en_US')

  // Twitter tags
  updateMetaTag('name', 'twitter:card', 'summary_large_image')
  updateMetaTag('name', 'twitter:title', seo.title || '')
  updateMetaTag('name', 'twitter:description', seo.description || '')
  updateMetaTag('name', 'twitter:image', seo.image || '')
  updateMetaTag('name', 'twitter:creator', '@Shardendu_M')

  // Article specific tags
  if (seo.type === 'article') {
    updateMetaTag('property', 'og:type', 'article')
    if (seo.publishedTime) {
      updateMetaTag('property', 'article:published_time', seo.publishedTime)
    }
    if (seo.modifiedTime) {
      updateMetaTag('property', 'article:modified_time', seo.modifiedTime)
    }
    if (seo.author) {
      updateMetaTag('property', 'article:author', seo.author)
    }
    if (seo.section) {
      updateMetaTag('property', 'article:section', seo.section)
    }
    if (seo.tags && seo.tags.length > 0) {
      // Remove existing tag meta tags
      const existingTags = document.querySelectorAll('meta[property="article:tag"]')
      existingTags.forEach((tag) => tag.remove())

      // Add new tags
      seo.tags.forEach((tag) => {
        const meta = document.createElement('meta')
        meta.setAttribute('property', 'article:tag')
        meta.setAttribute('content', tag)
        document.head.appendChild(meta)
      })
    }
  }

  // Update canonical URL
  updateCanonicalLink(seo.url || '')
}

/**
 * Helper function to update or create a meta tag
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
 * Update canonical link
 */
function updateCanonicalLink(url: string): void {
  if (!url) return

  let canonical = document.querySelector('link[rel="canonical"]')

  if (canonical) {
    canonical.setAttribute('href', url)
  } else {
    canonical = document.createElement('link')
    canonical.setAttribute('rel', 'canonical')
    canonical.setAttribute('href', url)
    document.head.appendChild(canonical)
  }
}

/**
 * Generate SEO-friendly slug from title
 */
export function generateSlug(title: string): string {
  return title
    .toLowerCase()
    .trim()
    .replace(/[^\w\s-]/g, '')
    .replace(/[\s_-]+/g, '-')
    .replace(/^-+|-+$/g, '')
}

/**
 * Truncate text for meta descriptions
 */
export function truncateDescription(text: string, maxLength: number = 160): string {
  if (text.length <= maxLength) return text
  return `${text.substring(0, maxLength - 3).trim()}...`
}

/**
 * Generate structured data for blog post
 */
export function generateBlogPostStructuredData(data: {
  title: string
  description: string
  author: string
  datePublished: string
  dateModified?: string
  image?: string
  url: string
}): string {
  const structuredData = {
    '@context': 'https://schema.org',
    '@type': 'BlogPosting',
    headline: data.title,
    description: data.description,
    author: {
      '@type': 'Person',
      name: data.author,
      url: 'https://mishrashardendu22.is-a.dev',
    },
    datePublished: data.datePublished,
    dateModified: data.dateModified || data.datePublished,
    image: data.image || 'https://blogs.mishrashardendu22.is-a.dev/blogog-image.png',
    url: data.url,
    publisher: {
      '@type': 'Person',
      name: 'Shardendu Mishra',
      logo: {
        '@type': 'ImageObject',
        url: 'https://blogs.mishrashardendu22.is-a.dev/icons/icon-512.png',
      },
    },
    mainEntityOfPage: {
      '@type': 'WebPage',
      '@id': data.url,
    },
  }

  return JSON.stringify(structuredData)
}

/**
 * Insert structured data into page
 */
export function insertStructuredData(jsonLD: string): void {
  // Remove existing structured data
  const existing = document.querySelector('script[type="application/ld+json"]')
  if (existing) {
    existing.remove()
  }

  // Insert new structured data
  const script = document.createElement('script')
  script.type = 'application/ld+json'
  script.textContent = jsonLD
  document.head.appendChild(script)
}
