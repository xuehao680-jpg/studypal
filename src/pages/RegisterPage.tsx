import { useState } from 'react'
import { Link, Navigate, useNavigate } from 'react-router-dom'
import { useAuth } from '../contexts/AuthContext'

export function RegisterPage() {
  const { register, isAuthenticated } = useAuth()
  const navigate = useNavigate()
  const [email, setEmail] = useState('')
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)

  if (isAuthenticated) {
    return <Navigate to="/dashboard" replace />
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError('')
    if (password.length < 6) {
      setError('密码至少 6 位')
      return
    }
    setLoading(true)
    try {
      await register(email, username, password)
      navigate('/dashboard', { replace: true })
    } catch (err) {
      setError(err instanceof Error ? err.message : '注册失败')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div
      className="flex min-h-screen items-center justify-center px-4"
      style={{ backgroundColor: 'var(--hero-bg-end)' }}
    >
      <div
        className="w-full max-w-sm rounded-xl border p-8 shadow-sm"
        style={{
          backgroundColor: 'var(--nav-bg)',
          borderColor: 'color-mix(in srgb, var(--nav-text) 15%, transparent)',
        }}
      >
        <h1 className="mb-1 text-2xl font-bold" style={{ color: 'var(--text-primary)' }}>
          注册
        </h1>
        <p className="mb-6 text-sm" style={{ color: 'var(--text-secondary)' }}>
          创建账号，开始你的学习之旅
        </p>

        {error && (
          <p className="mb-4 rounded-lg bg-red-50 px-3 py-2 text-sm text-red-600 dark:bg-red-900/30 dark:text-red-400">
            {error}
          </p>
        )}

        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <div>
            <label className="mb-1 block text-sm font-medium" style={{ color: 'var(--text-primary)' }}>
              Email
            </label>
            <input
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full rounded-lg border px-3 py-2 text-sm outline-none transition-colors focus:ring-2 focus:ring-indigo-500"
              style={{
                color: 'var(--text-primary)',
                backgroundColor: 'var(--hero-bg-end)',
                borderColor: 'color-mix(in srgb, var(--nav-text) 20%, transparent)',
              }}
              placeholder="your@email.com"
            />
          </div>

          <div>
            <label className="mb-1 block text-sm font-medium" style={{ color: 'var(--text-primary)' }}>
              用户名
            </label>
            <input
              type="text"
              required
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="w-full rounded-lg border px-3 py-2 text-sm outline-none transition-colors focus:ring-2 focus:ring-indigo-500"
              style={{
                color: 'var(--text-primary)',
                backgroundColor: 'var(--hero-bg-end)',
                borderColor: 'color-mix(in srgb, var(--nav-text) 20%, transparent)',
              }}
              placeholder="your_username"
            />
          </div>

          <div>
            <label className="mb-1 block text-sm font-medium" style={{ color: 'var(--text-primary)' }}>
              密码
            </label>
            <input
              type="password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full rounded-lg border px-3 py-2 text-sm outline-none transition-colors focus:ring-2 focus:ring-indigo-500"
              style={{
                color: 'var(--text-primary)',
                backgroundColor: 'var(--hero-bg-end)',
                borderColor: 'color-mix(in srgb, var(--nav-text) 20%, transparent)',
              }}
              placeholder="至少 6 位"
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="mt-2 rounded-lg py-2.5 text-sm font-medium text-white transition-opacity hover:opacity-90 disabled:opacity-50"
            style={{ backgroundColor: 'var(--cta-bg)' }}
          >
            {loading ? '注册中...' : '注册'}
          </button>
        </form>

        <p className="mt-6 text-center text-sm" style={{ color: 'var(--text-secondary)' }}>
          已有账号？
          <Link to="/login" className="ml-1 font-medium" style={{ color: 'var(--text-secondary)' }}>
            登录
          </Link>
        </p>
      </div>
    </div>
  )
}
