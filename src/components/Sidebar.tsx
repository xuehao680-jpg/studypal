import { useNavigate, useLocation } from 'react-router-dom'

const navItems = [
  { label: '首页', icon: '🏠', path: '/dashboard' },
  { label: '学习数据', icon: '📊', path: '/dashboard/analytics' },
  { label: 'AI 对话建议', icon: '💬', path: '/dashboard/chat' },
  { label: '学习目标', icon: '🎯', path: undefined },
]

export function Sidebar() {
  const navigate = useNavigate()
  const location = useLocation()

  return (
    <aside
      className="fixed left-0 top-0 z-40 flex h-screen w-56 flex-col border-r py-6"
      style={{
        backgroundColor: 'var(--nav-bg)',
        color: 'var(--nav-text)',
        borderColor: 'color-mix(in srgb, var(--nav-text) 15%, transparent)',
      }}
    >
      <div className="mb-8 px-5">
        <h2 className="text-lg font-bold tracking-tight">学习面板</h2>
      </div>

      <nav className="flex-1">
        <ul className="flex flex-col gap-1 px-3">
          {navItems.map((item) => {
            const active = item.path && location.pathname.endsWith(item.path)
            return (
              <li key={item.label}>
                <button
                  onClick={() => item.path && navigate(item.path)}
                  className={`flex w-full items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition-colors ${
                    active
                      ? 'bg-indigo-100 text-indigo-700 dark:bg-indigo-900/40 dark:text-indigo-300'
                      : 'hover:bg-gray-100 dark:hover:bg-gray-800'
                  }`}
                  style={{ color: active ? undefined : 'var(--nav-text)' }}
                >
                  <span className="text-lg">{item.icon}</span>
                  {item.label}
                </button>
              </li>
            )
          })}
        </ul>
      </nav>
    </aside>
  )
}
