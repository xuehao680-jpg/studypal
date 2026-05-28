import { useLayoutEffect, useEffect, useRef } from 'react'

interface Particle {
  x: number
  y: number
  vx: number
  vy: number
  r: number
  opacity: number
  isStar: boolean
}

interface BackgroundCanvasProps {
  theme: 'light' | 'dark'
}

function createPRNG(seed: number) {
  let s = seed | 0
  return () => {
    s = (s + 0x6d2b79f5) | 0
    let t = Math.imul(s ^ (s >>> 15), 1 | s)
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296
  }
}

function getCssColor(variable: string): string {
  return getComputedStyle(document.documentElement).getPropertyValue(variable).trim()
}

function prefersReducedMotion(): boolean {
  return window.matchMedia('(prefers-reduced-motion: reduce)').matches
}

function initParticles(w: number, h: number): Particle[] {
  const seed = (w * 31 + h * 997) | 0
  const rand = createPRNG(seed)
  const count = Math.max(30, Math.min(150, Math.floor((w * h) / 3000)))
  const particles: Particle[] = []

  for (let i = 0; i < count; i++) {
    const angle = rand() * Math.PI * 2
    const speed = rand() * 0.3 + 0.1
    particles.push({
      x: rand() * w,
      y: rand() * h,
      vx: Math.cos(angle) * speed,
      vy: Math.sin(angle) * speed,
      r: rand() * 2 + 0.5,
      opacity: rand() * 0.5 + 0.15,
      isStar: rand() > 0.85,
    })
  }
  return particles
}

function drawFrame(
  ctx: CanvasRenderingContext2D,
  particles: Particle[],
  w: number,
  h: number,
  color: string,
) {
  ctx.clearRect(0, 0, w, h)
  const threshold = Math.min(w, h) * 0.15

  for (let i = 0; i < particles.length; i++) {
    for (let j = i + 1; j < particles.length; j++) {
      const dx = particles[i].x - particles[j].x
      const dy = particles[i].y - particles[j].y
      const dist = Math.sqrt(dx * dx + dy * dy)
      if (dist < threshold) {
        ctx.beginPath()
        ctx.moveTo(particles[i].x, particles[i].y)
        ctx.lineTo(particles[j].x, particles[j].y)
        ctx.strokeStyle = color
        ctx.globalAlpha = (1 - dist / threshold) * 0.3
        ctx.lineWidth = 0.5
        ctx.stroke()
      }
    }
  }

  ctx.globalAlpha = 1
  for (const p of particles) {
    ctx.beginPath()
    ctx.arc(p.x, p.y, p.isStar ? p.r * 2 : p.r, 0, Math.PI * 2)
    ctx.fillStyle = color
    ctx.globalAlpha = p.opacity
    ctx.fill()

    if (p.isStar) {
      ctx.beginPath()
      ctx.arc(p.x, p.y, p.r * 5, 0, Math.PI * 2)
      ctx.fillStyle = color
      ctx.globalAlpha = 0.08
      ctx.fill()
    }
  }

  ctx.globalAlpha = 1
}

function updateParticles(particles: Particle[], w: number, h: number) {
  for (const p of particles) {
    p.x += p.vx
    p.y += p.vy
    if (p.x < -10) p.x = w + 10
    if (p.x > w + 10) p.x = -10
    if (p.y < -10) p.y = h + 10
    if (p.y > h + 10) p.y = -10
  }
}

export function BackgroundCanvas({ theme }: BackgroundCanvasProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const colorRef = useRef('')

  // Pick up latest theme color BEFORE paint — prevents flash
  useLayoutEffect(() => {
    colorRef.current = getCssColor('--particle-color')
  }, [theme])

  // One-time canvas setup + animation loop
  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext('2d')
    if (!ctx) return

    const parent = canvas.parentElement
    if (!parent) return

    const reducedMotion = prefersReducedMotion()
    let animId: number
    let particles: Particle[] = []
    let w = 0
    let h = 0
    let debounceTimer: ReturnType<typeof setTimeout>
    let visible = true

    function resize() {
      const rect = parent.getBoundingClientRect()
      w = rect.width
      h = rect.height
      const dpr = window.devicePixelRatio || 1
      canvas.width = w * dpr
      canvas.height = h * dpr
      ctx.scale(dpr, dpr)
      colorRef.current = getCssColor('--particle-color')
      particles = initParticles(w, h)

      if (reducedMotion) {
        drawFrame(ctx, particles, w, h, colorRef.current)
      }
    }

    function frame() {
      if (!visible) {
        animId = requestAnimationFrame(frame)
        return
      }
      updateParticles(particles, w, h)
      drawFrame(ctx, particles, w, h, colorRef.current)
      animId = requestAnimationFrame(frame)
    }

    resize()

    if (!reducedMotion) {
      frame()
    }

    const observer = new ResizeObserver(() => {
      clearTimeout(debounceTimer)
      debounceTimer = setTimeout(resize, 200)
    })
    observer.observe(parent)

    function onVisibilityChange() {
      visible = !document.hidden
    }
    document.addEventListener('visibilitychange', onVisibilityChange)

    return () => {
      cancelAnimationFrame(animId)
      observer.disconnect()
      document.removeEventListener('visibilitychange', onVisibilityChange)
      clearTimeout(debounceTimer)
    }
  }, [])

  if (typeof HTMLCanvasElement === 'undefined') {
    return null
  }

  return (
    <canvas
      ref={canvasRef}
      className="pointer-events-none absolute inset-0 h-full w-full"
      aria-hidden="true"
    />
  )
}
