import type { Goal } from '../data/dashboard'

interface DailyGoalsProps {
  goals: Goal[]
}

export function DailyGoals({ goals }: DailyGoalsProps) {
  return (
    <div
      className="rounded-xl border p-5"
      style={{
        backgroundColor: 'var(--nav-bg)',
        color: 'var(--nav-text)',
        borderColor: 'color-mix(in srgb, var(--nav-text) 15%, transparent)',
      }}
    >
      <h3 className="mb-4 text-base font-semibold" style={{ color: 'var(--text-primary)' }}>
        📋 每日目标清单
      </h3>

      <ul className="flex flex-col gap-3">
        {goals.map((goal) => (
          <li key={goal.id} className="flex items-center gap-3">
            <span
              className={`flex h-5 w-5 shrink-0 items-center justify-center rounded border text-xs ${
                goal.done
                  ? 'border-green-500 bg-green-500 text-white'
                  : ''
              }`}
              style={!goal.done ? { borderColor: 'var(--text-secondary)' } : {}}
            >
              {goal.done ? '✓' : ''}
            </span>
            <span
              className={`text-sm ${goal.done ? 'line-through opacity-50' : ''}`}
              style={{ color: 'var(--text-primary)' }}
            >
              {goal.text}
            </span>
            {!goal.done && (
              <span className="ml-auto text-xs" style={{ color: 'var(--text-secondary)' }}>
                待完成
              </span>
            )}
          </li>
        ))}
      </ul>
    </div>
  )
}
