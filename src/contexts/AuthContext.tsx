import { createContext, useCallback, useContext, useEffect, useState } from 'react'
import type { ReactNode } from 'react'
import { apiFetch, clearTokens, loadTokens, loginApi, registerApi, setTokens } from '../api/client'

interface User {
  id: number
  email: string
  username: string
  avatar_url: string | null
  consecutive_days: number
  level: number
}

interface AuthContextType {
  user: User | null
  isAuthenticated: boolean
  isLoading: boolean
  login: (email: string, password: string) => Promise<void>
  register: (email: string, username: string, password: string) => Promise<void>
  logout: () => void
}

const AuthContext = createContext<AuthContextType | null>(null)

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    loadTokens()
    const token = localStorage.getItem('access_token')
    if (token) {
      apiFetch<{ user: User }>('/users/me')
        .then((data) => setUser({ ...data } as User))
        .catch(() => clearTokens())
        .finally(() => setIsLoading(false))
    } else {
      setIsLoading(false)
    }
  }, [])

  const login = useCallback(async (email: string, password: string) => {
    const data = await loginApi(email, password)
    setTokens(data.access_token, data.refresh_token)
    // Fetch profile after login
    const profile = await apiFetch<User>('/users/me')
    setUser(profile)
  }, [])

  const register = useCallback(async (email: string, username: string, password: string) => {
    await registerApi(email, username, password)
    // Auto-login after register
    await login(email, password)
  }, [login])

  const logout = useCallback(() => {
    setUser(null)
    clearTokens()
  }, [])

  return (
    <AuthContext.Provider
      value={{
        user,
        isAuthenticated: !!localStorage.getItem('access_token'),
        isLoading,
        login,
        register,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth() {
  const ctx = useContext(AuthContext)
  if (!ctx) throw new Error('useAuth must be used within AuthProvider')
  return ctx
}
