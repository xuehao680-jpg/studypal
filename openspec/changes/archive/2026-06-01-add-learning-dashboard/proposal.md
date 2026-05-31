## Why

品牌站已成型，但缺少学习管理功能。需要一个新的 Dashboard 面板，让用户在一个统一界面中跟踪学习进度、管理每日目标、查看统计数据，为后续的 AI 学习平台奠定 UI 基础。

## What Changes

- 新增 `react-router-dom` 实现路由
- 创建 `LearningDashboard` 页面：侧边栏 + 主内容区布局
- Dashboard 包含：数据统计卡片（4张）、每日目标清单、AI 学习建议卡片（Mock）、周/月趋势图
- 所有数据使用 mock 数据，定义在 `src/data/dashboard.ts`
- 品牌站 `/` 路径保留，Dashboard 在 `/dashboard` 路径
- 品牌站导航栏新增"学习模式"入口按钮

## Capabilities

### New Capabilities
- `learning-dashboard`: 个人学习管理面板，含侧边导航、统计卡片、每日目标、学习建议、趋势图表

### Modified Capabilities
- `navigation`: 品牌站 Navbar 新增"学习模式"跳转链接

## Impact

- 新增依赖：`react-router-dom`
- 新增文件：`src/components/Sidebar.tsx`、`src/components/StatCard.tsx`、`src/components/DailyGoals.tsx`、`src/components/AISuggestion.tsx`、`src/components/TrendChart.tsx`、`src/components/LearningDashboard.tsx`、`src/pages/BrandSite.tsx`、`src/data/dashboard.ts`
- 修改文件：`src/App.tsx`（改为路由结构）、`src/components/Navbar.tsx`（新增学习入口链接）
- 无 API 变更
