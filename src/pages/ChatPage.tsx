import { useCallback, useEffect, useRef, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { ChatMessage } from '../components/ChatMessage'
import { ChatInput } from '../components/ChatInput'
import { getAccessToken } from '../api/client'

interface Message {
  id: string
  role: 'user' | 'assistant'
  content: string
}

export function ChatPage() {
  const navigate = useNavigate()
  const [messages, setMessages] = useState<Message[]>([])
  const [streaming, setStreaming] = useState(false)
  const [sessionId, setSessionId] = useState<number | null>(null)
  const [error, setError] = useState('')
  const bottomRef = useRef<HTMLDivElement>(null)

  // Auto-scroll to bottom
  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [messages, streaming])

  const handleSend = useCallback(async (content: string) => {
    const userMsg: Message = { id: `user-${Date.now()}`, role: 'user', content }
    setMessages((prev) => [...prev, userMsg])
    setStreaming(true)
    setError('')

    const aiMsg: Message = { id: `ai-${Date.now()}`, role: 'assistant', content: '' }
    setMessages((prev) => [...prev, aiMsg])

    try {
      const token = getAccessToken()
      const res = await fetch('/studypal/api/chat/send', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ session_id: sessionId, content }),
      })

      if (!res.ok) throw new Error(`HTTP ${res.status}`)

      const reader = res.body?.getReader()
      const decoder = new TextDecoder()
      let fullContent = ''
      let buffer = ''

      if (reader) {
        while (true) {
          const { done, value } = await reader.read()
          if (done) break

          buffer += decoder.decode(value, { stream: true })
          const lines = buffer.split('\n')
          buffer = lines.pop() || ''

          for (const line of lines) {
            if (!line.startsWith('data: ')) continue
            const data = JSON.parse(line.slice(6))

            if (data.done) {
              setSessionId(data.session_id)
              setStreaming(false)
              continue
            }

            if (data.token) {
              fullContent += data.token
              setMessages((prev) => {
                const updated = [...prev]
                const last = updated[updated.length - 1]
                if (last && last.role === 'assistant') {
                  updated[updated.length - 1] = { ...last, content: fullContent }
                }
                return updated
              })
            }
          }
        }
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : '发送失败')
      setStreaming(false)
    }
  }, [sessionId])

  return (
    <div className="flex h-[calc(100vh-4rem)] flex-col">
      {/* Header */}
      <div className="flex items-center justify-between border-b px-6 py-4" style={{ borderColor: 'color-mix(in srgb, var(--nav-text) 15%, transparent)' }}>
        <div className="flex items-center gap-3">
          <button
            onClick={() => navigate('/dashboard')}
            className="rounded-lg p-1.5 transition-colors hover:bg-gray-100 dark:hover:bg-gray-800"
          >
            <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
            </svg>
          </button>
          <h2 className="text-lg font-semibold" style={{ color: 'var(--text-primary)' }}>
            AI 学习助手
          </h2>
        </div>
        <button
          onClick={() => { setMessages([]); setSessionId(null); setError('') }}
          className="rounded-lg px-3 py-1.5 text-sm font-medium transition-colors hover:bg-gray-100 dark:hover:bg-gray-800"
          style={{ color: 'var(--text-secondary)' }}
        >
          新对话
        </button>
      </div>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto px-4 py-6 md:px-8">
        {messages.length === 0 && !streaming && (
          <div className="flex h-full items-center justify-center">
            <div className="max-w-md text-center">
              <p className="text-4xl">💬</p>
              <p className="mt-4 text-lg font-medium" style={{ color: 'var(--text-primary)' }}>
                你好！我是你的 AI 学习助手
              </p>
              <p className="mt-2 text-sm" style={{ color: 'var(--text-secondary)' }}>
                问我任何学习相关的问题，我会基于你的学习数据
                给出个性化建议。
              </p>
            </div>
          </div>
        )}

        <div className="mx-auto flex max-w-3xl flex-col gap-4">
          {messages.map((msg) => (
            <ChatMessage key={msg.id} role={msg.role} content={msg.content} />
          ))}

          {error && (
            <p className="rounded-lg bg-red-50 px-4 py-2 text-sm text-red-600 dark:bg-red-900/30 dark:text-red-400">
              {error}
            </p>
          )}

          <div ref={bottomRef} />
        </div>
      </div>

      {/* Input */}
      <div className="border-t px-4 py-4 md:px-8" style={{ borderColor: 'color-mix(in srgb, var(--nav-text) 15%, transparent)' }}>
        <div className="mx-auto max-w-3xl">
          <ChatInput onSend={handleSend} disabled={streaming} />
        </div>
      </div>
    </div>
  )
}
