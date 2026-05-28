import { useCallback } from 'react'
import { BackgroundCanvas } from './BackgroundCanvas'

interface HeroSectionProps {
  name: string
  title: string
  tagline: string
  ctaText: string
  theme: 'light' | 'dark'
}

export function HeroSection({ name, title, tagline, ctaText, theme }: HeroSectionProps) {
  const handleCtaClick = useCallback(() => {
    const el = document.getElementById('projects')
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' })
    }
  }, [])

  return (
    <section
      id="home"
      className="relative flex min-h-screen min-h-[100dvh] flex-col items-center justify-center overflow-hidden px-4 pt-16"
      style={{
        background: `linear-gradient(to bottom, var(--hero-bg-start), var(--hero-bg-end))`,
      }}
    >
      <BackgroundCanvas theme={theme} />

      <div className="relative z-10 flex flex-col items-center text-center">
        <h1
          className="text-4xl font-bold tracking-tight md:text-6xl lg:text-7xl"
          style={{ color: 'var(--text-primary)' }}
        >
          {name}
        </h1>

        <p
          className="mt-4 text-xl font-medium md:text-2xl"
          style={{ color: 'var(--text-secondary)' }}
        >
          {title}
        </p>

        <p
          className="mt-3 max-w-lg text-base md:text-lg"
          style={{ color: 'var(--text-primary)' }}
        >
          {tagline}
        </p>

        <button
          className="mt-10 rounded-lg px-8 py-3 text-lg font-medium transition-colors hover:opacity-90"
          style={{
            backgroundColor: 'var(--cta-bg)',
            color: 'var(--cta-text)',
          }}
          onClick={handleCtaClick}
        >
          {ctaText}
        </button>
      </div>
    </section>
  )
}
