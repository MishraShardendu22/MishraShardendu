'use client'

import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import { authAPI } from '../util/apiResponse.util'
import { AuthRequest, User } from '../data/types.data'

interface AuthState {
  user: User | null
  token: string | null
  isAuthenticated: boolean
  isLoading: boolean
  login: (credentials: AuthRequest) => Promise<boolean>
  logout: () => void
  setLoading: (loading: boolean) => void
}

export const useAuth = create<AuthState>()(
  persist(
    (set) => ({
      user: null,
      token: null,
      isAuthenticated: false,
      isLoading: false,

      login: async (credentials: AuthRequest) => {
        set({ isLoading: true })
        try {
          const response = await authAPI.login(credentials)
          const { token, data } = response.data
          
          // Store token in localStorage
          if (typeof window !== 'undefined') {
            localStorage.setItem('jwt_token', token)
          }

          set({
            user: data,
            token,
            isAuthenticated: true,
            isLoading: false,
          })
          return true
        } catch (error) {
          console.error('Login error:', error)
          set({ isLoading: false })
          return false
        }
      },

      logout: () => {
        if (typeof window !== 'undefined') {
          localStorage.removeItem('jwt_token')
        }
        set({
          user: null,
          token: null,
          isAuthenticated: false,
          isLoading: false,
        })
      },

      setLoading: (loading: boolean) => {
        set({ isLoading: loading })
      },
    }),
    {
      name: 'auth-storage',
      partialize: (state) => ({
        user: state.user,
        token: state.token,
        isAuthenticated: state.isAuthenticated,
      }),
    }
  )
) 