## MODIFIED Requirements

### Requirement: 侧边栏导航

Dashboard 侧边栏导航项重新组织为三类。

- "学习数据" → `/dashboard`
- "AI 对话建议" → `/dashboard/chat`
- "学习目标" → `/dashboard/goals`

#### Scenario: 导航重构

- **GIVEN** Dashboard 侧边栏已加载
- **WHEN** 用户查看导航项
- **THEN** 显示"学习数据"、"AI 对话建议"、"学习目标"
- **AND** 点击可跳转到对应页面
