import type { AxiosError, AxiosRequestConfig, InternalAxiosRequestConfig } from 'axios'
import axios from 'axios'

declare module 'axios' {
  interface InternalAxiosRequestConfig {
    metadata?: {
      startTime: number
    }
  }
}

const normalizedPortfolioBackend = import.meta.env.VITE_BACKEND_1.replace(/\/+$/, '')

const baseURL = import.meta.env.VITE_BACKEND_1
  ? `${normalizedPortfolioBackend}/api`
  : import.meta.env.DEV
    ? '/api'
    : `${normalizedPortfolioBackend}/api`

const normalizedBlogBackend = import.meta.env.VITE_BLOG_BACKEND.replace(/\/+$/, '')
const blogBaseURL = `${normalizedBlogBackend}/api`

const api = axios.create({
  baseURL,
  timeout: 60000,
  headers: {
    'Content-Type': 'application/json',
  },
  maxRedirects: 5,
})

const blogApi = axios.create({
  baseURL: blogBaseURL,
  timeout: 60000,
  headers: {
    'Content-Type': 'application/json',
  },
  maxRedirects: 5,
})

const MAX_RETRIES = 3
const RETRY_DELAY = 1000

const _retryRequest = async (config: AxiosRequestConfig, retryCount = 0): Promise<unknown> => {
  try {
    return await api.request(config)
  } catch (error: unknown) {
    const axiosError = error as AxiosError
    const shouldRetry =
      retryCount < MAX_RETRIES &&
      (axiosError.code === 'ECONNABORTED' ||
        axiosError.code === 'ECONNRESET' ||
        axiosError.code === 'ENOTFOUND' ||
        axiosError.code === 'ERR_NETWORK' ||
        (axiosError.response?.status && axiosError.response.status >= 500))

    if (shouldRetry) {
      const delay = RETRY_DELAY * 2 ** retryCount

      await new Promise((resolve) => setTimeout(resolve, delay))
      return _retryRequest(config, retryCount + 1)
    }

    throw error
  }
}

const requestInterceptor = (config: InternalAxiosRequestConfig) => {
  const token = typeof window !== 'undefined' ? localStorage.getItem('jwt_token') : null
  if (token) {
    config.headers.Authorization = `Bearer ${token}`
  }

  config.metadata = { startTime: Date.now() }

  return config
}

const requestInterceptorBlogs = (config: InternalAxiosRequestConfig) => {
  const token = typeof window !== 'undefined' ? localStorage.getItem('authToken') : null
  if (token) {
    config.headers.Authorization = `Bearer ${token}`
  }

  config.metadata = { startTime: Date.now() }

  return config
}

const responseInterceptor = async (error: AxiosError) => {
  if (error.response?.status === 401) {
    if (typeof window !== 'undefined') {
      localStorage.removeItem('jwt_token')
      const isAdminPage =
        window.location.pathname.startsWith('/admin') && window.location.pathname !== '/admin/login'
      if (isAdminPage) {
        window.location.href = '/'
      }
    }
  }

  return Promise.reject(error)
}

api.interceptors.request.use(requestInterceptor, (error) => Promise.reject(error))
api.interceptors.response.use((response) => response, responseInterceptor)

blogApi.interceptors.request.use(requestInterceptorBlogs, (error) => Promise.reject(error))
blogApi.interceptors.response.use((response) => response, responseInterceptor)

export default api
export { blogApi }
