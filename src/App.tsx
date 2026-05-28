import { Navbar } from './components/Navbar'
import { HeroSection } from './components/HeroSection'
import { ProjectSection } from './components/ProjectSection'
import { AboutSection } from './components/AboutSection'
import { useTheme } from './hooks/useTheme'

const heroData = {
  name: '薛浩',
  title: 'AI 数据分析师',
  tagline: '用代码将复杂的想法变成优雅的产品。',
  ctaText: '查看我的项目',
}

function App() {
  const { theme, toggleTheme } = useTheme()

  return (
    <>
      <Navbar name={heroData.name} theme={theme} onToggleTheme={toggleTheme} />
      <HeroSection
        name={heroData.name}
        title={heroData.title}
        tagline={heroData.tagline}
        ctaText={heroData.ctaText}
        theme={theme}
      />
      <ProjectSection />
      <AboutSection />
    </>
  )
}

export default App
