## Context

后端 API 已就绪（register/login/refresh/me），前端需要登录页、注册页和认证基础设施来接入。当前 Dashboard 使用 Mock 数据，需要切换到真实 API。

## Goals / Non-Goals

**Goals:**
- `/login` 和 `/register` 页面
- `AuthContext` 管理 JWT token（存储、刷新、清除）
- API 封装层（`src/api/client.ts`）
- `/dashboard` 路由受保护，未登录重定向到 `/login`
- Dashboard 从 `/api/users/me` 获取用户信息

**Non-Goals:**
- 不做密码找回
- 不做 OAuth
- 不做邮箱验证

## Decisions

### 1. 认证流程

```
未登录 → 访问 /dashboard → 重定向到 /login → 登录 → 重定向回 /dashboard
                                                    ↓
                                            access_token存 localStorage
                                            refresh_token存 localStorage
                                                    ↓
                                            AuthContext 提供全局认证状态
                                                    ↓
                                            api client (Bearer header)
```

### 2. API 封装

```
src/api/client.ts
  - baseFetch(url, options)       ← 自动附加 Bearer token
  - 401 时自动尝试 refresh_token
  - refresh 失败 → 清除 token → 跳转 login

src/api/auth.ts (可选的，或直接 inline)
  - login(email, password)
  - register(email, username, password)
  - refresh(token)
  - getProfile()
```

开发时 API base URL 通过 Vite proxy 解决 CORS：
```ts
// vite.config.ts
server: { proxy: { '/api': 'http://localhost:8000' } }
```

生产时后端部署后在同一个域名下或配置 CORS。

### 3. AuthContext

```tsx
interface AuthState {
  user: User | null
  isAuthenticated: boolean
  isLoading: boolean
}

interface AuthContextType extends AuthState {
  login: (email: string, password: string) => Promise<void>
  register: (email: string, username: string, password: string) => Promise<void>
  logout: () => void
}
```

Provider 包裹在 App 层，所有子页面可访问。

### 4. 路由保护

```tsx
<Route path="/dashboard" element={<ProtectedRoute><LearningDashboard /></ProtectedRoute>} />
<Route path="/login" element={<LoginPage />} />
<Route path="/register" element={<RegisterPage />} />
```

`ProtectedRoute` 组件检查 `isAuthenticated`，未登录时 `<Navigate to="/login" />`。

### 5. 页面设计

Login 和 Register 页面采用简洁居中卡片布局，与品牌站视觉风格一致（使用同一套 CSS 变量）。

## Risks / Trade-offs

| 风险 | 缓解措施 |
|------|----------|
| token 在 localStorage 可能被 XSS | 本阶段不做额外防护，token 时效短（30min） |
| refresh token 同时过期 | 用户跳回登录页重新登录 |
| 开发 CORS | Vite proxy 解决 |
