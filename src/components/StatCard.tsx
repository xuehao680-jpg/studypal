interface StatCardProps {
  label: string
  value: string
  icon: string
  change: string
}

export function StatCard({ label, value, icon, change }: StatCardProps) {
  return (
    <div
      className="rounded-xl border p-5 shadow-sm transition-shadow hover:shadow-md"
      style={{
        backgroundColor: 'var(--nav-bg)',
        color: 'var(--nav-text)',
        borderColor: 'color-mix(in srgb, var(--nav-text) 15%, transparent)',
      }}
    >
      <div className="flex items-start justify-between">
        <span className="text-2xl">{icon}</span>
        <span
          className="rounded-full px-2 py-0.5 text-xs font-medium"
          style={{
            backgroundColor: 'color-mix(in srgb, var(--text-secondary) 15%, transparent)',
            color: 'var(--text-secondary)',
          }}
        >
          {change}
        </span>
      </div>
      <p className="mt-3 text-3xl font-bold" style={{ color: 'var(--text-primary)' }}>
        {value}
      </p>
      <p className="mt-1 text-sm" style={{ color: 'var(--text-secondary)' }}>
        {label}
      </p>
    </div>
  )
}
