## Why

学习面板已有基础功能，但缺少数据分析和成就系统来激励学习。统计面板让用户直观看到学习成果，成就系统增加持续学习的动力。同时需要将整个项目部署上线。

## What Changes

- 新增学习日历组件（GitHub-style contribution calendar）
- 新增成就系统（徽章、里程碑）
- 侧边栏导航重构为：学习数据、AI 对话建议、学习目标
- 后端新增统计 API（数据库聚合）
- 添加 `sitemap.xml`，更新 `robots.txt`
- 完成前端构建配置，部署到 GitHub Pages

## Capabilities

### New Capabilities
- `analytics`: 学习数据分析面板，含日历热力图和成就系统
- `deploy`: 项目部署上线配置

### Modified Capabilities
- `learning-dashboard`: 侧边栏导航重构

## Impact

- 新增文件（前端）：`src/components/StudyCalendar.tsx`、`src/components/AchievementBadge.tsx`、`src/components/AchievementList.tsx`、`src/pages/AnalyticsPage.tsx`
- 新增文件（后端）：`backend/app/routers/analytics.py`
- 修改文件：`src/components/Sidebar.tsx`（导航重构）、`backend/app/main.py`（注册路由）、`vite.config.ts`（部署 base）
- 新增依赖：无
