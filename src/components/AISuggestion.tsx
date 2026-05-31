interface AISuggestionProps {
  suggestion: string
}

export function AISuggestion({ suggestion }: AISuggestionProps) {
  return (
    <div
      className="rounded-xl border p-5"
      style={{
        backgroundColor: 'color-mix(in srgb, var(--text-secondary) 8%, transparent)',
        color: 'var(--text-primary)',
        borderColor: 'color-mix(in srgb, var(--text-secondary) 20%, transparent)',
      }}
    >
      <div className="flex items-center gap-2">
        <span className="text-xl">🤖</span>
        <h3 className="text-base font-semibold">AI 学习建议</h3>
        <span
          className="ml-auto rounded-full px-2 py-0.5 text-xs font-medium"
          style={{
            backgroundColor: 'color-mix(in srgb, var(--text-secondary) 15%, transparent)',
            color: 'var(--text-secondary)',
          }}
        >
          Mock
        </span>
      </div>
      <p className="mt-3 text-sm leading-relaxed opacity-80">{suggestion}</p>
    </div>
  )
}
