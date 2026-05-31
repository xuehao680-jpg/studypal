## Context

品牌站已完成，现需扩展学习管理功能。Dashboard 采用独立页面路由方案（方案 B），品牌站完整保留，学习面板在 `/dashboard` 路径下开发。两个站点共享主题体系和基础组件。

## Goals / Non-Goals

**Goals:**
- `/dashboard` 路径下独立的 Learning Dashboard
- 左侧固定侧边栏导航
- 4 张数据统计卡片（学习天数、完成率、答题数、连续天数）
- 每日目标清单（可勾选，Mock 数据）
- AI 学习建议卡片（Mock，纯静态UI）
- 周/月学习趋势图
- 品牌站导航栏添加"学习模式"入口

**Non-Goals:**
- 不做后端 API 调用
- 不做真实 AI 功能
- 不做用户认证
- 不做真实数据持久化
- 不做移动端侧边栏折叠（后续可加）

## Decisions

### 1. 路由方案：react-router-dom

```
/                  → <BrandSite />      品牌站
/dashboard         → <LearningDashboard />  学习面板
```

BrowserRouter 模式，base path 为 `/my-website/` 与 GitHub Pages 部署一致。

### 2. 页面结构

```
┌─────────────────────────────────────────────────┐
│ ┌─────────┐  ┌────────────────────────────────┐ │
│ │ Sidebar │  │ Main Content                    │ │
│ │ 固定     │  │                                │ │
│ │ left-0  │  │  Stat Cards (4x grid)           │ │
│ │ z-40    │  │  Daily Goals (清单)              │ │
│ │         │  │  AI Suggestion (卡片)            │ │
│ │ 🏠 首页  │  │  Trend Chart (周/月切换)         │ │
│ │ 📚 课程  │  │                                │ │
│ │ 📈 统计  │  │                                │ │
│ │ ⚙️ 设置  │  │                                │ │
│ └─────────┘  └────────────────────────────────┘ │
└─────────────────────────────────────────────────┘
```

### 3. 组件树

```
App (BrowserRouter)
├── Route "/" → BrandSite
│   ├── Navbar
│   └── sections...
└── Route "/dashboard" → LearningDashboard
    ├── Sidebar
    ├── StatCard × 4
    ├── DailyGoals
    ├── AISuggestion
    └── TrendChart
```

### 4. 共享资产

| 资产 | 复用方式 |
|------|---------|
| useTheme hook | import from hooks/ |
| CSS 变量体系 | 全局生效 |
| Tailwind v4 | 全局生效 |
| BackgroundCanvas | 可选导入，Dashboard 不使用以节省性能 |

### 5. Mock 数据

在 `src/data/dashboard.ts` 中定义，包含：
- `stats` — 4 张统计卡片数据
- `dailyGoals` — 今日目标清单（含完成状态）
- `weeklyData` — 周学习趋势数据
- `monthlyData` — 月学习趋势数据
- `aiSuggestion` — AI 建议文本

### 6. 图表库：recharts

选用 recharts 的原因：
- React 原生组件，与现有技术栈一致
- 轻量（gzip ~10KB）
- 支持柱状图、折线图，满足周/月趋势展示
- 类型友好，TypeScript 支持好

## Risks / Trade-offs

| 风险 | 缓解措施 |
|------|----------|
| react-router-dom 新增依赖 | 标准路由库，社区成熟，体积可控 |
| Dashboard 与品牌站样式脱节 | 共享同一套 CSS 变量和 Tailwind 配置 |
| 侧边栏在移动端遮挡内容 | 当前不做折叠，移动端用户使用品牌站入口 |
| recharts 学习成本 | 仅使用基础 BarChart/LineChart API |