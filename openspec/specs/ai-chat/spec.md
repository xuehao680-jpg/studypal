## ADDED Requirements

### Requirement: 聊天消息发送

系统 SHALL 支持用户发送消息并接收 AI 流式回复。

- 发送 `POST /api/chat/send`，接收 SSE 流式响应
- 用户消息和 AI 回复均保存到数据库
- AI 回复基于用户的学习数据生成个性化建议

#### Scenario: 发送消息并接收流式回复

- **GIVEN** 用户已登录且有活跃会话
- **WHEN** 用户发送一条消息
- **THEN** 后端返回 SSE 流
- **AND** 前端逐 token 显示 AI 回复
- **AND** 完整消息保存到数据库

#### Scenario: 网络中断

- **GIVEN** AI 正在回复中
- **WHEN** 网络连接中断
- **THEN** 前端显示"连接中断"提示
- **AND** 已收到的内容保留在界面上

---

### Requirement: 对话管理

系统 SHALL 支持多轮对话管理。

- 用户可以有多个会话
- 每个会话包含多轮消息
- 用户可以查看历史会话

#### Scenario: 查看历史会话

- **GIVEN** 用户有多个历史会话
- **WHEN** 用户打开聊天页面
- **THEN** 显示最近的会话
- **AND** 点击会话可查看历史消息

#### Scenario: 新建会话

- **GIVEN** 用户在当前会话中
- **WHEN** 用户点击"新建对话"
- **THEN** 创建新会话
- **AND** 清空聊天区域

---

### Requirement: Markdown 渲染

AI 回复中 SHALL 支持 Markdown 格式渲染。

- 支持代码块、列表、标题、链接
- 代码块带语法高亮

#### Scenario: 代码块渲染

- **GIVEN** AI 回复包含代码块
- **WHEN** 消息渲染
- **THEN** 代码块正确显示
- **AND** 可复制代码内容
