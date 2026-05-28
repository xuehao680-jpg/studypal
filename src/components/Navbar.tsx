import { useCallback } from 'react'

interface NavbarProps {
  name: string
  theme: 'light' | 'dark'
  onToggleTheme: () => void
}

const links = [
  { label: '首页', target: 'home' },
  { label: '关于', target: 'about' },
  { label: '项目', target: 'projects' },
  { label: '联系我', target: 'contact' },
]

export function Navbar({ name, theme, onToggleTheme }: NavbarProps) {
  const handleClick = useCallback((target: string) => {
    const el = document.getElementById(target)
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' })
    }
  }, [])

  return (
    <nav
      className="fixed inset-x-0 top-0 z-50 backdrop-blur-md"
      style={{ backgroundColor: 'var(--nav-bg)', color: 'var(--nav-text)' }}
    >
      <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-3">
        <span className="text-lg font-semibold tracking-tight">{name}</span>

        <div className="flex items-center gap-6">
          <ul className="flex items-center gap-6">
            {links.map((link) => (
              <li key={link.target}>
                <button
                  className="text-sm font-medium transition-opacity hover:opacity-70"
                  onClick={() => handleClick(link.target)}
                >
                  {link.label}
                </button>
              </li>
            ))}
          </ul>

          {/* Theme toggle */}
          <button
            className="rounded-full p-1.5 transition-opacity hover:opacity-70"
            onClick={onToggleTheme}
            aria-label={theme === 'dark' ? '切换到亮色模式' : '切换到暗黑模式'}
          >
            {theme === 'dark' ? (
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <circle cx="12" cy="12" r="5" />
                <line x1="12" y1="1" x2="12" y2="3" />
                <line x1="12" y1="21" x2="12" y2="23" />
                <line x1="4.22" y1="4.22" x2="5.64" y2="5.64" />
                <line x1="18.36" y1="18.36" x2="19.78" y2="19.78" />
                <line x1="1" y1="12" x2="3" y2="12" />
                <line x1="21" y1="12" x2="23" y2="12" />
                <line x1="4.22" y1="19.78" x2="5.64" y2="18.36" />
                <line x1="18.36" y1="5.64" x2="19.78" y2="4.22" />
              </svg>
            ) : (
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" />
              </svg>
            )}
          </button>
        </div>
      </div>
    </nav>
  )
}
