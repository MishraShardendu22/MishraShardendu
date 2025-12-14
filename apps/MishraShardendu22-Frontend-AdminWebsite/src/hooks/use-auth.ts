import { useCallback, useEffect, useState } from 'preact/hooks'
import type { AuthRequest } from '../types/types.data'
import { authAPI } from '../utils/apiResponse.util'

export function useAuth() {
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [isLoading, setIsLoading] = useState(true)

  const initializeAuth = useCallback(() => {
    const token = localStorage.getItem('jwt_token')
    setIsAuthenticated(!!token)
    setIsLoading(false)
  }, [])

  useEffect(() => {
    initializeAuth()
  }, [initializeAuth])

  const login = async (credentials: AuthRequest) => {
    try {
      const response = (await authAPI.login(credentials)) as { token?: string; message?: string }

      if (response.token) {
        localStorage.setItem('jwt_token', response.token)
        setIsAuthenticated(true)
        return { success: true, data: response }
      }

      return { success: false, error: response.message || 'Login failed' }
    } catch (error) {
      return {
        success: false,
        error: error instanceof Error ? error.message : 'An error occurred during login',
      }
    }
  }

  const logout = useCallback(() => {
    localStorage.removeItem('jwt_token')
    setIsAuthenticated(false)
    window.location.href = '/admin/login'
  }, [])

  return {
    isAuthenticated,
    isLoading,
    login,
    logout,
    initializeAuth,
  }
}
