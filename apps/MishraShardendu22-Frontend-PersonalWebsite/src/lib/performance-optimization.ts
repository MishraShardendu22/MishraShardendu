/**
 * Code Splitting and Lazy Loading Configuration
 * Reduces initial bundle size by deferring non-critical components
 */

import dynamic from 'next/dynamic'
import React from 'react'

// Defer heavy components until after initial render
export const lazyLoadOptions = {
  loading: () =>
    React.createElement('div', {
      className: 'min-h-[200px] animate-pulse bg-muted/20',
    }),
  ssr: false,
}

// Critical components that should be loaded immediately
export const criticalComponents = {
  HeroSection: dynamic(() => import('@/components/main/hero'), {
    loading: () => React.createElement('div', { className: 'min-h-[500px] bg-background' }),
  }),
  Education: dynamic(() => import('@/components/main/education'), {
    loading: () => React.createElement('div', { className: 'min-h-[400px] bg-background' }),
  }),
}

// Non-critical components - load on interaction or scroll
export const deferredComponents = {
  // Heavy libraries - only load when scrolled into view
  ThreeJS: dynamic(() => import('@react-three/fiber').then((mod) => mod.Canvas), {
    ...lazyLoadOptions,
  }),

  Particles: dynamic(() => import('@tsparticles/react'), {
    ...lazyLoadOptions,
  }),

  Charts: dynamic(() => import('@nivo/line').then((mod) => mod.ResponsiveLine), {
    ...lazyLoadOptions,
  }),
}

// Intersection Observer for lazy loading sections
export const createLazySection = (importFn: () => Promise<any>, threshold = 0.1) => {
  return dynamic(importFn, {
    loading: () =>
      React.createElement('div', {
        className: 'min-h-[200px] animate-pulse bg-muted/10',
      }),
    ssr: false,
  })
}

// Preload critical resources
export const preloadCriticalResources = () => {
  if (typeof window === 'undefined') return

  // Preload fonts
  const fonts = ['/fonts/fredoka.woff2', '/fonts/poppins.woff2', '/fonts/inter.woff2']

  fonts.forEach((font) => {
    const link = document.createElement('link')
    link.rel = 'preload'
    link.as = 'font'
    link.type = 'font/woff2'
    link.href = font
    link.crossOrigin = 'anonymous'
    document.head.appendChild(link)
  })
}

// Defer non-critical scripts
export const deferNonCriticalScripts = () => {
  if (typeof window === 'undefined') return

  // Wait for page to be fully interactive
  if (document.readyState === 'complete') {
    loadNonCriticalScripts()
  } else {
    window.addEventListener('load', loadNonCriticalScripts)
  }
}

const loadNonCriticalScripts = () => {
  // Load analytics after interaction
  const events = ['scroll', 'mousemove', 'touchstart', 'click']

  const loadAnalytics = () => {
    events.forEach((event) => {
      document.removeEventListener(event, loadAnalytics)
    })

    // Load your analytics here
    console.log('Analytics loaded')
  }

  events.forEach((event) => {
    document.addEventListener(event, loadAnalytics, {
      once: true,
      passive: true,
    })
  })

  // Fallback: load after 5 seconds
  setTimeout(loadAnalytics, 5000)
}
