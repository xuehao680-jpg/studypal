## Why

学习面板缺少与 AI 互动的能力。AI 聊天助手让用户基于自己的学习数据获得个性化建议，提升学习效率。

## What Changes

- 后端新增 Chat 模型和 API（消息存储、流式响应）
- 后端通过 InferAI API 调用 DeepSeek 模型，基于用户学习数据生成个性化回复
- 前端新增聊天页面 `/dashboard/chat`
- Chat UI：消息气泡、自动滚动、Markdown 渲染
- Sidebar 新增"AI 助手"导航项
- API key 通过环境变量配置，不暴露在前端

## Capabilities

### New Capabilities
- `ai-chat`: AI 学习助手聊天功能，包含前后端完整交互

### Modified Capabilities
- `learning-dashboard`: Sidebar 新增"AI 助手"入口

## Impact

- 新增文件（后端）：`backend/app/models.py` ChatMessage/ChatSession、`backend/app/routers/chat.py`、`backend/app/ai.py`
- 新增文件（前端）：`src/pages/ChatPage.tsx`、`src/components/ChatMessage.tsx`、`src/components/ChatInput.tsx`
- 修改文件：`backend/app/main.py`（注册路由）、`src/components/Sidebar.tsx`（新增链接）、`src/App.tsx`（新增路由）
- 新增依赖（前端）：`react-markdown`
- 新增依赖（后端）：`httpx`、`anthropic`
