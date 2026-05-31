import Markdown from 'react-markdown'
import remarkGfm from 'remark-gfm'

interface ChatMessageProps {
  role: 'user' | 'assistant'
  content: string
}

export function ChatMessage({ role, content }: ChatMessageProps) {
  const isUser = role === 'user'

  return (
    <div className={`flex ${isUser ? 'justify-end' : 'justify-start'}`}>
      <div
        className={`max-w-[80%] rounded-2xl px-4 py-3 ${
          isUser
            ? 'rounded-br-md'
            : 'rounded-bl-md'
        }`}
        style={{
          backgroundColor: isUser
            ? 'var(--cta-bg)'
            : 'var(--nav-bg)',
          color: isUser ? '#fff' : 'var(--text-primary)',
        }}
      >
        {isUser ? (
          <p className="whitespace-pre-wrap text-sm leading-relaxed">{content}</p>
        ) : (
          <div className="prose prose-sm max-w-none leading-relaxed dark:prose-invert">
            <Markdown remarkPlugins={[remarkGfm]}>{content}</Markdown>
          </div>
        )}
      </div>
    </div>
  )
}
