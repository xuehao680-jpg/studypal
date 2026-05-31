const API_BASE = '/api'

let accessToken: string | null = null
let refreshToken: string | null = null

export function setTokens(access: string, refresh?: string) {
  accessToken = access
  localStorage.setItem('access_token', access)
  if (refresh) {
    refreshToken = refresh
    localStorage.setItem('refresh_token', refresh)
  }
}

export function clearTokens() {
  accessToken = null
  refreshToken = null
  localStorage.removeItem('access_token')
  localStorage.removeItem('refresh_token')
}

export function loadTokens() {
  accessToken = localStorage.getItem('access_token')
  refreshToken = localStorage.getItem('refresh_token')
}

export function getAccessToken() {
  return accessToken
}

async function refreshAccessToken(): Promise<boolean> {
  const rt = refreshToken || localStorage.getItem('refresh_token')
  if (!rt) return false

  const res = await fetch(`${API_BASE}/auth/refresh`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ refresh_token: rt }),
  })

  if (!res.ok) {
    clearTokens()
    return false
  }

  const data = await res.json()
  accessToken = data.access_token
  localStorage.setItem('access_token', data.access_token)
  return true
}

export async function apiFetch<T>(
  path: string,
  options: RequestInit = {},
): Promise<T> {
  if (!accessToken) loadTokens()

  const headers: Record<string, string> = {
    'Content-Type': 'application/json',
    ...(options.headers as Record<string, string>),
  }

  if (accessToken) {
    headers['Authorization'] = `Bearer ${accessToken}`
  }

  let res = await fetch(`${API_BASE}${path}`, { ...options, headers })

  // Auto-refresh on 401
  if (res.status === 401 && accessToken) {
    const refreshed = await refreshAccessToken()
    if (refreshed) {
      headers['Authorization'] = `Bearer ${accessToken}`
      res = await fetch(`${API_BASE}${path}`, { ...options, headers })
    }
  }

  if (!res.ok) {
    const err = await res.json().catch(() => ({ detail: res.statusText }))
    throw new Error(err.detail || 'Request failed')
  }

  return res.json()
}

// -- Simple API calls --

export async function loginApi(email: string, password: string) {
  const res = await fetch(`${API_BASE}/auth/login`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ email, password }),
  })
  if (!res.ok) {
    const err = await res.json().catch(() => ({ detail: 'Login failed' }))
    throw new Error(err.detail)
  }
  return res.json()
}

export async function registerApi(email: string, username: string, password: string) {
  const res = await fetch(`${API_BASE}/auth/register`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ email, username, password }),
  })
  if (!res.ok) {
    const err = await res.json().catch(() => ({ detail: 'Registration failed' }))
    throw new Error(err.detail)
  }
  return res.json()
}
