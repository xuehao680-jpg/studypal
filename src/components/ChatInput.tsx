import { useState } from 'react'

interface ChatInputProps {
  onSend: (content: string) => void
  disabled: boolean
}

export function ChatInput({ onSend, disabled }: ChatInputProps) {
  const [text, setText] = useState('')

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    const trimmed = text.trim()
    if (!trimmed || disabled) return
    onSend(trimmed)
    setText('')
  }

  return (
    <form onSubmit={handleSubmit} className="flex items-end gap-3">
      <div className="relative flex-1">
        <textarea
          value={text}
          onChange={(e) => setText(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === 'Enter' && !e.shiftKey) {
              e.preventDefault()
              handleSubmit(e)
            }
          }}
          placeholder="输入你的问题..."
          rows={1}
          className="w-full resize-none rounded-xl border px-4 py-3 text-sm outline-none transition-colors focus:ring-2 focus:ring-indigo-500"
          style={{
            color: 'var(--text-primary)',
            backgroundColor: 'var(--hero-bg-end)',
            borderColor: 'color-mix(in srgb, var(--nav-text) 20%, transparent)',
          }}
        />
      </div>
      <button
        type="submit"
        disabled={disabled || !text.trim()}
        className="rounded-xl px-5 py-3 text-sm font-medium text-white transition-opacity hover:opacity-90 disabled:opacity-40"
        style={{ backgroundColor: 'var(--cta-bg)' }}
      >
        发送
      </button>
    </form>
  )
}
