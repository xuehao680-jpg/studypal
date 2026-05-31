import { useState } from 'react'
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from 'recharts'
import type { DayData, MonthData } from '../data/dashboard'

interface TrendChartProps {
  weeklyData: DayData[]
  monthlyData: MonthData[]
}

type ViewMode = 'week' | 'month'

export function TrendChart({ weeklyData, monthlyData }: TrendChartProps) {
  const [view, setView] = useState<ViewMode>('week')
  const data = view === 'week' ? weeklyData : monthlyData

  return (
    <div
      className="rounded-xl border p-5"
      style={{
        backgroundColor: 'var(--nav-bg)',
        color: 'var(--nav-text)',
        borderColor: 'color-mix(in srgb, var(--nav-text) 15%, transparent)',
      }}
    >
      <div className="mb-4 flex items-center justify-between">
        <h3 className="text-base font-semibold" style={{ color: 'var(--text-primary)' }}>
          📈 学习趋势
        </h3>
        <div className="flex gap-1 rounded-lg border p-0.5" style={{ borderColor: 'color-mix(in srgb, var(--nav-text) 20%, transparent)' }}>
          {(['week', 'month'] as const).map((mode) => (
            <button
              key={mode}
              className={`rounded-md px-3 py-1 text-xs font-medium transition-colors ${
                view === mode
                  ? 'bg-indigo-600 text-white'
                  : 'hover:bg-gray-100 dark:hover:bg-gray-700'
              }`}
              style={view !== mode ? { color: 'var(--nav-text)' } : {}}
              onClick={() => setView(mode)}
            >
              {mode === 'week' ? '周' : '月'}
            </button>
          ))}
        </div>
      </div>

      <ResponsiveContainer width="100%" height={220}>
        <BarChart data={data}>
          <CartesianGrid strokeDasharray="3 3" stroke="color-mix(in srgb, var(--nav-text) 15%, transparent)" />
          <XAxis
            dataKey={view === 'week' ? 'day' : 'week'}
            tick={{ fontSize: 12, fill: 'var(--text-secondary)' }}
          />
          <YAxis
            tick={{ fontSize: 12, fill: 'var(--text-secondary)' }}
            unit="h"
          />
          <Tooltip
            contentStyle={{
              backgroundColor: 'var(--nav-bg)',
              border: '1px solid color-mix(in srgb, var(--nav-text) 20%, transparent)',
              borderRadius: '8px',
              fontSize: '13px',
              color: 'var(--text-primary)',
            }}
          />
          <Bar dataKey="hours" fill="#6366f1" radius={[4, 4, 0, 0]} name="学习时长" unit="h" />
        </BarChart>
      </ResponsiveContainer>
    </div>
  )
}
