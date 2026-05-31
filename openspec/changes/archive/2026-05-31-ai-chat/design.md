## Context

学习面板已支持登录和基础功能。现需 AI 聊天助手，让用户与 AI 对话，获得基于其学习数据的个性化建议。API key 通过后端环境变量管理，不暴露前端。

## Goals / Non-Goals

**Goals:**
- 后端流式 AI 响应（SSE）
- 消息存储到 SQLite 数据库
- AI 基于用户学习数据回复
- 前端 ChatUI：消息气泡、Markdown、自动滚动
- Sidebar 新增"AI 助手"入口

**Non-Goals:**
- 不做语音输入
- 不做文件上传
- 不做模型切换
- 不做对话标题自动生成

## Decisions

### 1. 数据模型

```python
class ChatSession(Base):
    id: int PK
    user_id: int FK → users.id
    title: str (default "新对话")
    created_at: datetime
    updated_at: datetime

class ChatMessage(Base):
    id: int PK
    session_id: int FK → chat_sessions.id
    role: str ("user" | "assistant")
    content: text
    created_at: datetime
```

### 2. 后端流式响应

```
POST /api/chat/send
  Body: { session_id, content }
  Response: SSE stream (text/event-stream)
    data: {"token": "你好"}
    data: {"token": "，"}
    data: {"token": "我是"}
    data: {"token": "AI助手"}
    data: [DONE]

GET /api/chat/sessions
  → 用户的所有会话列表

GET /api/chat/sessions/{id}/messages
  → 某会话的消息历史
```

使用 `StreamingResponse` + `httpx` 流式转发 InferAI API 的响应。

### 3. AI Prompt 设计

每次 AI 回复时，将用户的学习数据作为系统提示上下文：

```
你是一个 AI 学习助手，帮助用户提升学习效率。
用户当前学习数据：
- 连续学习天数: {consecutive_days}
- 等级: {level}
- 答题数: {total_questions}
- 完成率: {completion_rate}

请基于以上数据给出个性化的学习建议。
```

### 4. 前端 ChatUI

```
┌─────────────────────────────────┐
│  AI 助手           ← 返回面板   │
├─────────────────────────────────┤
│  ┌────────────────────────┐     │
│  │  AI: 你好！今天想学    │     │
│  │  什么？               │     │  ← Markdown 渲染
│  └────────────────────────┘     │
│       ┌──────────────────┐      │
│       │  我想学 Python    │     │  ← 用户气泡（右对齐）
│       └──────────────────┘      │
│  ┌────────────────────────┐     │
│  │  AI: 好的！基于你的    │     │
│  │  进度，建议从...      │     │  ← 流式逐字显示
│  └────────────────────────┘     │
│  ─── 自动滚动 ───               │
├─────────────────────────────────┤
│  ┌──────────────────────┬─────┐ │
│  │ 输入消息...          │ 发送 │ │
│  └──────────────────────┴─────┘ │
└─────────────────────────────────┘
```

### 5. Markdown 渲染

使用 `react-markdown` + `remark-gfm` 渲染：
- 代码块（带语法高亮）
- 列表
- 粗体/斜体
- 链接

### 6. 流式显示

前端使用 `EventSource` 或 `fetch` + `ReadableStream` 读取 SSE 流，逐 token 追加到消息气泡中，实现打字机效果。

## Risks / Trade-offs

| 风险 | 缓解措施 |
|------|----------|
| API key 泄露 | 仅后端持有，通过环境变量读取 |
| 流式中断 | 前端显示"连接中断，请重试" |
| 长对话 Token 超限 | 限制上下文窗口为最近 20 条消息 |
| DeepSeek API 延迟 | 前端显示加载指示器，流式逐 token 输出降低感知延迟 |
