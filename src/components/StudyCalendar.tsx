import { useMemo } from 'react'

interface DayData {
  date: string
  count: number
}

interface StudyCalendarProps {
  data: DayData[]
}

function getColor(count: number, max: number): string {
  if (count === 0) return 'bg-gray-100 dark:bg-gray-700'
  const ratio = max > 0 ? count / max : 0
  if (ratio < 0.25) return 'bg-indigo-200 dark:bg-indigo-900'
  if (ratio < 0.5) return 'bg-indigo-300 dark:bg-indigo-700'
  if (ratio < 0.75) return 'bg-indigo-400 dark:bg-indigo-500'
  return 'bg-indigo-500 dark:bg-indigo-400'
}

export function StudyCalendar({ data }: StudyCalendarProps) {
  const weeks = useMemo(() => {
    if (data.length === 0) return []
    const max = Math.max(...data.map((d) => d.count), 1)
    const result: DayData[][] = []
    let week: DayData[] = []

    // Pad first week with empty cells
    const firstDate = new Date(data[0].date)
    const dayOfWeek = firstDate.getDay()
    for (let i = 0; i < dayOfWeek; i++) {
      week.push({ date: '', count: -1 })
    }

    for (const day of data) {
      week.push(day)
      if (week.length === 7) {
        result.push(week)
        week = []
      }
    }
    if (week.length > 0) result.push(week)

    return { weeks: result, max }
  }, [data])

  if (data.length === 0) {
    return (
      <div className="rounded-xl border p-5 text-center text-sm" style={{ color: 'var(--text-secondary)' }}>
        暂无学习数据
      </div>
    )
  }

  return (
    <div>
      <div className="flex flex-wrap gap-1">
        {weeks.weeks.map((week, wi) => (
          <div key={wi} className="flex flex-col gap-1">
            {week.map((day, di) => (
              <div
                key={di}
                className={`h-3 w-3 rounded-sm ${
                  day.count >= 0 ? getColor(day.count, weeks.max) : 'bg-transparent'
                }`}
                title={day.date ? `${day.date}: ${day.count} 条消息` : ''}
              />
            ))}
          </div>
        ))}
      </div>
      <div className="mt-3 flex items-center gap-2 text-xs" style={{ color: 'var(--text-secondary)' }}>
        <span>少</span>
        <div className="h-3 w-3 rounded-sm bg-gray-100 dark:bg-gray-700" />
        <div className="h-3 w-3 rounded-sm bg-indigo-200 dark:bg-indigo-900" />
        <div className="h-3 w-3 rounded-sm bg-indigo-300 dark:bg-indigo-700" />
        <div className="h-3 w-3 rounded-sm bg-indigo-400 dark:bg-indigo-500" />
        <div className="h-3 w-3 rounded-sm bg-indigo-500 dark:bg-indigo-400" />
        <span>多</span>
      </div>
    </div>
  )
}
