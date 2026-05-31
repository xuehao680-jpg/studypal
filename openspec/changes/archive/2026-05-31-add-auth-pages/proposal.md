## Why

后端用户认证 API 已完成，但前端无法登录。需要登录/注册页面和认证状态管理，让用户能进入学习面板而不是停留在品牌站。

## What Changes

- 创建登录页面 `/login` 和注册页面 `/register`
- 创建 `AuthContext` 管理登录状态（token 存储、自动刷新、登出）
- 创建 `api` 层封装后端请求
- `/dashboard` 路由添加登录保护，未登录自动跳转到 `/login`
- 登录成功后重定向回 `/dashboard`
- Dashboard 数据从 Mock 切换为调用 `GET /api/users/me`

## Capabilities

### New Capabilities
- `auth-pages`: 前端登录和注册页面，包含表单、验证、跳转逻辑

### Modified Capabilities
- `learning-dashboard`: Dashboard 路由添加登录保护，用户信息改为从 `/api/users/me` 获取

## Impact

- 新增文件：`src/pages/LoginPage.tsx`、`src/pages/RegisterPage.tsx`、`src/contexts/AuthContext.tsx`、`src/api/client.ts`
- 修改文件：`src/App.tsx`（添加路由）、`src/components/LearningDashboard.tsx`（接入真实 API）
- 无新增外部依赖
