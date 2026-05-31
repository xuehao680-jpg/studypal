## Context

学习面板已支持聊天和基础 Dashboard，现需数据分析和成就系统来增强用户体验。

## Goals / Non-Goals

**Goals:**
- 学习日历（GitHub-style 贡献热力图）
- 成就系统（徽章 + 里程碑列表）
- 侧边栏导航：学习数据、AI 对话建议、学习目标
- 后端统计 API：日历数据、成就数据
- 项目部署上线

**Non-Goals:**
- 不做实时通知
- 不做数据导出
- 不做成就动画

## Decisions

### 1. 侧边栏导航重构

```
当前：首页 | AI 助手 | 课程 | 统计 | 设置
改为：学习数据 | AI 对话建议 | 学习目标
```

每个导航项对应独立页面：
- `/dashboard` → 学习数据（原首页升级）
- `/dashboard/chat` → AI 对话建议（已有）
- `/dashboard/goals` → 学习目标（新增）

### 2. 学习日历

GitHub-style 贡献日历，展示过去 365 天的学习活跃度：

```tsx
interface DayData {
  date: string  // "2026-01-01"
  count: number // 学习时长(分钟)或题目数
}
```

后端 API: `GET /api/analytics/calendar?days=365`
返回按天聚合的学习数据。

每个格子根据 count 分 5 级颜色（从浅到深），灰色为无数据。

### 3. 成就系统

```
GET /api/analytics/achievements
→ [{ id, name, description, icon, unlocked_at, progress }]

成就示例：
- "初来乍到" — 完成第一次学习
- "坚持一周" — 连续学习 7 天
- "知识达人" — 完成 50 道题
- "学习先锋" — 累计学习 100 小时
```

后端根据数据库数据计算成就状态，前端以徽章网格展示。

### 4. 后端统计 API

| API | 说明 |
|-----|------|
| `GET /api/analytics/calendar?days=365` | 日历热力图数据 |
| `GET /api/analytics/achievements` | 成就列表及解锁状态 |
| `GET /api/analytics/summary` | 学习总览（总时长、总题数、连续天数） |

### 5. 部署

- 前端：GitHub Pages（已有配置，确认 base）
- 后端：暂不部署（本地运行）
- 更新 `sitemap.xml` 和 `robots.txt` 完善 SEO

## Risks / Trade-offs

| 风险 | 缓解措施 |
|------|----------|
| 日历数据无真实数据 | Mock 数据填充 |
| 成就计算复杂度 | 后端聚合查询，简单规则 |
