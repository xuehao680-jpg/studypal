interface AchievementBadgeProps {
  icon: string
  name: string
  unlocked: boolean
  progress: number
  threshold: number
}

export function AchievementBadge({ icon, name, unlocked, progress, threshold }: AchievementBadgeProps) {
  const pct = Math.round((progress / threshold) * 100)

  return (
    <div
      className={`flex flex-col items-center rounded-xl border p-4 text-center ${
        unlocked ? '' : 'opacity-50'
      }`}
      style={{
        backgroundColor: 'var(--nav-bg)',
        borderColor: 'color-mix(in srgb, var(--nav-text) 15%, transparent)',
      }}
    >
      <span className="text-3xl">{icon}</span>
      <p className="mt-2 text-sm font-medium" style={{ color: 'var(--text-primary)' }}>
        {name}
      </p>
      {unlocked ? (
        <span className="mt-1 text-xs" style={{ color: 'var(--text-secondary)' }}>已解锁</span>
      ) : (
        <div className="mt-2 w-full">
          <div
            className="h-1.5 w-full overflow-hidden rounded-full"
            style={{ backgroundColor: 'color-mix(in srgb, var(--nav-text) 15%, transparent)' }}
          >
            <div
              className="h-full rounded-full bg-indigo-500"
              style={{ width: `${pct}%` }}
            />
          </div>
          <p className="mt-1 text-xs" style={{ color: 'var(--text-secondary)' }}>
            {progress}/{threshold}
          </p>
        </div>
      )}
    </div>
  )
}
