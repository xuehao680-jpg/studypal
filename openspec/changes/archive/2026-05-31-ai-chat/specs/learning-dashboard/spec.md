## MODIFIED Requirements

### Requirement: 侧边栏导航项

Dashboard 侧边栏新增"AI 助手"导航项。

- "AI 助手"链接到 `/dashboard/chat`
- 图标为 💬
- 点击后跳转到聊天页面

#### Scenario: 点击 AI 助手

- **GIVEN** Dashboard 侧边栏已加载
- **WHEN** 用户点击"AI 助手"
- **THEN** 跳转到 `/dashboard/chat`
- **AND** 当前页面切换为聊天界面
