## 1. 基础设施

- [x] 1.1 安装 `react-router-dom`，在 `vite.config.ts` 中添加路由 base 配置
- [x] 1.2 创建 Mock 数据文件 `src/data/dashboard.ts`
- [x] 1.3 从 `App.tsx` 中提取品牌站代码到 `src/pages/BrandSite.tsx`

## 2. Dashboard 组件

- [x] 2.1 创建 `Sidebar` 组件：固定左侧导航
- [x] 2.2 创建 `StatCard` 组件：统计卡片（图标 + 数值 + 标签）
- [x] 2.3 创建 `DailyGoals` 组件：目标清单（勾选状态）
- [x] 2.4 创建 `AISuggestion` 组件：AI 建议（Mock 卡片）
- [x] 2.5 创建 `TrendChart` 组件：周/月趋势图（recharts）

## 3. 集成与验证

- [x] 3.1 创建 `LearningDashboard` 布局组件，组装所有 Dashboard 子组件
- [x] 3.2 在 `App.tsx` 中配置 BrowserRouter 路由，品牌站 `/`，Dashboard `/dashboard`
- [x] 3.3 在 `Navbar` 中添加"学习模式"链接
- [ ] 3.4 验证路由切换、Mock 数据显示、主题适配（待用户确认）