import { mount } from 'svelte'
import './app.css'
import App from './App.svelte'

// Lazy load analytics to not block initial render
const loadAnalytics = async () => {
  try {
    const [{ inject }, { injectSpeedInsights }] = await Promise.all([
      import('@vercel/analytics'),
      import('@vercel/speed-insights'),
    ])
    inject()
    injectSpeedInsights()
  } catch (e) {
    console.warn('[Blog Main] Failed to load analytics:', e)
  }
}

// Initialize analytics after page load
if (typeof window !== 'undefined') {
  if (document.readyState === 'complete') {
    loadAnalytics()
  } else {
    window.addEventListener('load', loadAnalytics, { once: true })
  }
}

function initTheme() {
  try {
    document.documentElement.classList.add('dark')
    document.documentElement.classList.remove('light')
    localStorage.setItem('portfolio-theme', 'dark')
  } catch (e) {
    console.error('[Blog Main] Failed to initialize theme:', e)
  }
}

// Initialize theme immediately
initTheme()

// Mount app with error handling
let app

try {
  const appElement = document.getElementById('app')
  if (!appElement) {
    throw new Error('App container element not found')
  }
  app = mount(App, {
    target: appElement,
  })
} catch (error) {
  console.error('[Blog Main] Failed to mount app:', error)
  // Show error message to user
  const appElement = document.getElementById('app')
  if (appElement) {
    appElement.innerHTML = `
      <div style="display: flex; align-items: center; justify-content: center; min-height: 100vh; padding: 20px; background: #000; color: #fff;">
        <div style="text-align: center; max-width: 600px;">
          <h1 style="font-size: 2rem; margin-bottom: 1rem;">Failed to load blog</h1>
          <p style="margin-bottom: 1rem;">An error occurred while loading the application.</p>
          <pre style="background: #111; padding: 1rem; border-radius: 8px; overflow: auto; text-align: left;">${error}</pre>
          <button onclick="window.location.reload()" style="margin-top: 1rem; padding: 0.5rem 1rem; background: #4CAF50; color: white; border: none; border-radius: 4px; cursor: pointer;">Reload Page</button>
        </div>
      </div>
    `
  }
}

export default app
