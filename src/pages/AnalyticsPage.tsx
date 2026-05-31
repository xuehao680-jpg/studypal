import { useEffect, useState } from 'react'
import { StudyCalendar } from '../components/StudyCalendar'
import { AchievementList } from '../components/AchievementList'
import { apiFetch } from '../api/client'

interface DayData {
  date: string
  count: number
}

interface Achievement {
  id: string
  name: string
  description: string
  icon: string
  unlocked: boolean
  progress: number
  threshold: number
}

interface Summary {
  total_chat_messages: number
  consecutive_days: number
  level: number
}

export function AnalyticsPage() {
  const [calendarData, setCalendarData] = useState<DayData[]>([])
  const [achievements, setAchievements] = useState<Achievement[]>([])
  const [summary, setSummary] = useState<Summary | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    Promise.all([
      apiFetch<DayData[]>('/analytics/calendar?days=365'),
      apiFetch<Achievement[]>('/analytics/achievements'),
      apiFetch<Summary>('/analytics/summary'),
    ])
      .then(([cal, ach, sum]) => {
        setCalendarData(cal)
        setAchievements(ach)
        setSummary(sum)
      })
      .catch(() => {})
      .finally(() => setLoading(false))
  }, [])

  if (loading) {
    return (
      <div className="flex h-[calc(100vh-4rem)] items-center justify-center">
        <p style={{ color: 'var(--text-secondary)' }}>加载中...</p>
      </div>
    )
  }

  return (
    <div className="p-6 lg:p-8">
      <div className="mx-auto max-w-5xl">
        <h1 className="text-2xl font-bold" style={{ color: 'var(--text-primary)' }}>
          学习数据
        </h1>
        <p className="mb-8 mt-1 text-sm" style={{ color: 'var(--text-secondary)' }}>
          查看你的学习统计和成就
        </p>

        {/* Summary Cards */}
        <div className="mb-8 grid grid-cols-1 gap-4 sm:grid-cols-3">
          {[
            { label: '总消息数', value: summary?.total_chat_messages ?? 0, icon: '💬' },
            { label: '连续学习', value: `${summary?.consecutive_days ?? 0} 天`, icon: '🔥' },
            { label: '等级', value: `Lv.${summary?.level ?? 1}`, icon: '👑' },
          ].map((item) => (
            <div
              key={item.label}
              className="rounded-xl border p-5"
              style={{
                backgroundColor: 'var(--nav-bg)',
                borderColor: 'color-mix(in srgb, var(--nav-text) 15%, transparent)',
              }}
            >
              <div className="flex items-center gap-3">
                <span className="text-2xl">{item.icon}</span>
                <div>
                  <p className="text-2xl font-bold" style={{ color: 'var(--text-primary)' }}>
                    {item.value}
                  </p>
                  <p className="text-sm" style={{ color: 'var(--text-secondary)' }}>
                    {item.label}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Calendar */}
        <div
          className="mb-8 rounded-xl border p-5"
          style={{
            backgroundColor: 'var(--nav-bg)',
            borderColor: 'color-mix(in srgb, var(--nav-text) 15%, transparent)',
          }}
        >
          <h2 className="mb-4 text-base font-semibold" style={{ color: 'var(--text-primary)' }}>
            📅 学习日历
          </h2>
          <StudyCalendar data={calendarData} />
        </div>

        {/* Achievements */}
        <div
          className="rounded-xl border p-5"
          style={{
            backgroundColor: 'var(--nav-bg)',
            borderColor: 'color-mix(in srgb, var(--nav-text) 15%, transparent)',
          }}
        >
          <h2 className="mb-4 text-base font-semibold" style={{ color: 'var(--text-primary)' }}>
            🏆 成就
          </h2>
          <AchievementList achievements={achievements} />
        </div>
      </div>
    </div>
  )
}
