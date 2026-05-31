## 1. API 层与认证 Context

- [x] 1.1 创建 `src/api/client.ts`：封装 fetch + Bearer token + 自动 refresh
- [x] 1.2 创建 `src/contexts/AuthContext.tsx`：全局认证状态管理
- [x] 1.3 在 `App.tsx` 中用 AuthProvider 包裹路由

## 2. 登录与注册页面

- [x] 2.1 创建 `LoginPage`：表单 + 验证 + 跳转
- [x] 2.2 创建 `RegisterPage`：表单 + 验证 + 跳转
- [x] 2.3 创建 `ProtectedRoute` 组件

## 3. Dashboard 接入真实 API

- [x] 3.1 修改 `LearningDashboard`：从 `/api/users/me` 获取用户信息替换 Mock
- [x] 3.2 配置 Vite proxy 代理 `/api` 到 `localhost:8000`

## 4. 验证

- [ ] 4.1 验证注册/登录流程、页面保护、token 持久化（待用户确认）
