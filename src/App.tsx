import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { BrandSite } from './pages/BrandSite'
import { LoginPage } from './pages/LoginPage'
import { RegisterPage } from './pages/RegisterPage'
import { AnalyticsPage } from './pages/AnalyticsPage'
import { LearningDashboard } from './components/LearningDashboard'
import { ProtectedRoute } from './components/ProtectedRoute'
import { AuthProvider } from './contexts/AuthContext'
import { ChatPage } from './pages/ChatPage'
import { useTheme } from './hooks/useTheme'

const heroData = {
  name: '薛浩',
  title: 'AI 数据分析师',
  tagline: '用代码将复杂的想法变成优雅的产品。',
  ctaText: '查看我的项目',
}

function AppContent() {
  const { theme, toggleTheme } = useTheme()

  return (
    <Routes>
      <Route
        path="/"
        element={
          <BrandSite
            name={heroData.name}
            title={heroData.title}
            tagline={heroData.tagline}
            ctaText={heroData.ctaText}
            theme={theme}
            onToggleTheme={toggleTheme}
          />
        }
      />
      <Route path="/login" element={<LoginPage />} />
      <Route path="/register" element={<RegisterPage />} />
      <Route
        path="/dashboard"
        element={
          <ProtectedRoute>
            <LearningDashboard />
          </ProtectedRoute>
        }
      />
      <Route
        path="/dashboard/analytics"
        element={
          <ProtectedRoute>
            <AnalyticsPage />
          </ProtectedRoute>
        }
      />
      <Route
        path="/dashboard/chat"
        element={
          <ProtectedRoute>
            <ChatPage />
          </ProtectedRoute>
        }
      />
    </Routes>
  )
}

function App() {
  return (
    <BrowserRouter basename="/studypal">
      <AuthProvider>
        <AppContent />
      </AuthProvider>
    </BrowserRouter>
  )
}

export default App
