import { writable } from 'svelte/store'
import type { User } from './api'
import { authApi } from './api'

interface AuthState {
  user: User | null
  token: string | null
  isLoading: boolean
  isAuthenticated: boolean
  error: string | null
}

const initialState: AuthState = {
  user: null,
  token: null,
  isLoading: true,
  isAuthenticated: false,
  error: null,
}

// Token expiry check (optional enhancement)
function isTokenExpired(token: string): boolean {
  try {
    const payload = JSON.parse(atob(token.split('.')[1]))
    const exp = payload.exp * 1000 // Convert to milliseconds
    return Date.now() >= exp
  } catch {
    return true // If we can't parse, consider it expired
  }
}

function createAuthStore() {
  const { subscribe, set, update } = writable<AuthState>(initialState)

  return {
    subscribe,

    // Initialize auth state from localStorage
    init: async () => {
      const token = localStorage.getItem('authToken')
      const userStr = localStorage.getItem('user')

      if (!token || !userStr) {
        update((state) => ({ ...state, isLoading: false }))
        return
      }

      if (isTokenExpired(token)) {
        console.warn('[Auth] Token expired, clearing auth state')
        localStorage.removeItem('authToken')
        localStorage.removeItem('user')
        update((state) => ({ ...state, isLoading: false, error: 'Session expired' }))
        return
      }

      try {
        const user = JSON.parse(userStr)
        update((state) => ({
          ...state,
          token,
          user,
          isAuthenticated: true,
          isLoading: false,
          error: null,
        }))

        const timeoutPromise = new Promise<never>((_, reject) =>
          setTimeout(() => reject(new Error('Verification timeout')), 5000)
        )

        Promise.race([authApi.getCurrentUser(), timeoutPromise])
          .then((res) => {
            if (res.success && res.data) {
              update((state) => ({ ...state, user: res.data!.user, error: null }))
            }
          })
          .catch((err: unknown) => {
            console.warn('[Auth] Token verification failed (non-blocking):', (err as Error).message)
          })
      } catch (error) {
        console.error('[Auth] Failed to parse stored user:', error)
        localStorage.removeItem('authToken')
        localStorage.removeItem('user')
        update((state) => ({ ...state, isLoading: false, error: 'Invalid stored session' }))
      }
    },

    // Login
    login: async (email: string, password: string) => {
      try {
        const response = await authApi.login(email, password)

        if (response.success && response.data) {
          const { token, user } = response.data

          localStorage.setItem('authToken', token)
          localStorage.setItem('user', JSON.stringify(user))

          update((state) => ({
            ...state,
            token,
            user,
            isAuthenticated: true,
            isLoading: false,
          }))

          return { success: true, user }
        }

        return { success: false, error: response.error || 'Login failed' }
      } catch (error: unknown) {
        console.error('Login error:', error)
        return { success: false, error: (error as Error).message || 'Login failed' }
      }
    },

    // Register
    register: async (email: string, password: string, name: string, profileImage?: string) => {
      try {
        const response = await authApi.register(email, password, name, profileImage)

        if (response.success && response.data) {
          const { token, user } = response.data

          localStorage.setItem('authToken', token)
          localStorage.setItem('user', JSON.stringify(user))

          update((state) => ({
            ...state,
            token,
            user,
            isAuthenticated: true,
            isLoading: false,
          }))

          return { success: true, user, message: response.message }
        }

        return { success: false, error: response.error || 'Registration failed' }
      } catch (error: unknown) {
        console.error('Registration error:', error)
        return { success: false, error: (error as Error).message || 'Registration failed' }
      }
    },

    // Verify OTP
    verifyOTP: async (email: string, otp: string) => {
      try {
        const response = await authApi.verifyOTP(email, otp)

        if (response.success && response.data) {
          const { user } = response.data

          localStorage.setItem('user', JSON.stringify(user))

          update((state) => ({
            ...state,
            user,
          }))

          return { success: true }
        }

        return { success: false, error: response.error || 'OTP verification failed' }
      } catch (error: unknown) {
        console.error('OTP verification error:', error)
        return { success: false, error: (error as Error).message || 'OTP verification failed' }
      }
    },

    // Logout
    logout: () => {
      localStorage.removeItem('authToken')
      localStorage.removeItem('user')

      set({
        user: null,
        token: null,
        isLoading: false,
        isAuthenticated: false,
        error: null,
      })

      // Redirect to login
      window.location.href = '/login'
    },

    // Update user
    updateUser: (user: User) => {
      localStorage.setItem('user', JSON.stringify(user))
      update((state) => ({ ...state, user }))
    },
  }
}

export const authStore = createAuthStore()
