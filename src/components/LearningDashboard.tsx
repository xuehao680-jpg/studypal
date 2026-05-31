import { Sidebar } from './Sidebar'
import { StatCard } from './StatCard'
import { DailyGoals } from './DailyGoals'
import { AISuggestion } from './AISuggestion'
import { TrendChart } from './TrendChart'
import { stats, dailyGoals, weeklyData, monthlyData, aiSuggestion } from '../data/dashboard'
import { useAuth } from '../contexts/AuthContext'

export function LearningDashboard() {
  const { user, logout } = useAuth()

  return (
    <div className="min-h-screen" style={{ backgroundColor: 'var(--hero-bg-end)' }}>
      <Sidebar />

      <main className="ml-56 p-6 lg:p-8">
        <div className="mx-auto max-w-5xl">
          <div className="mb-6 flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-bold" style={{ color: 'var(--text-primary)' }}>
                学习面板
              </h1>
              <p className="mt-1 text-sm" style={{ color: 'var(--text-secondary)' }}>
                {user ? `${user.username}，继续你的学习之旅` : '追踪你的学习进度，完成每日目标'}
              </p>
            </div>
            <div className="flex items-center gap-3">
              {user && (
                <span className="text-sm" style={{ color: 'var(--text-secondary)' }}>
                  Lv.{user.level}
                </span>
              )}
              <button
                onClick={logout}
                className="rounded-lg px-3 py-1.5 text-sm font-medium transition-opacity hover:opacity-70"
                style={{ color: 'var(--text-secondary)' }}
              >
                退出登录
              </button>
            </div>
          </div>

          {/* Stat Cards */}
          <div className="mb-6 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {stats.map((stat) => (
              <StatCard key={stat.label} {...stat} />
            ))}
          </div>

          <div className="mb-6 grid grid-cols-1 gap-6 lg:grid-cols-2">
            <DailyGoals goals={dailyGoals} />
            <AISuggestion suggestion={aiSuggestion} />
          </div>

          <TrendChart weeklyData={weeklyData} monthlyData={monthlyData} />
        </div>
      </main>
    </div>
  )
}
