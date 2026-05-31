import { Navbar } from '../components/Navbar'
import { HeroSection } from '../components/HeroSection'
import { ProjectSection } from '../components/ProjectSection'
import { AboutSection } from '../components/AboutSection'

interface BrandSiteProps {
  name: string
  title: string
  tagline: string
  ctaText: string
  theme: 'light' | 'dark'
  onToggleTheme: () => void
}

export function BrandSite({ name, title, tagline, ctaText, theme, onToggleTheme }: BrandSiteProps) {
  return (
    <>
      <Navbar name={name} theme={theme} onToggleTheme={onToggleTheme} />
      <HeroSection
        name={name}
        title={title}
        tagline={tagline}
        ctaText={ctaText}
        theme={theme}
      />
      <ProjectSection />
      <AboutSection />
    </>
  )
}
