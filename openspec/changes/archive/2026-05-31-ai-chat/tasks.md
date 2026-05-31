## 1. 后端 AI 与 Chat 模块

- [x] 1.1 在 `backend/app/models.py` 中添加 ChatMessage 和 ChatSession 模型，生成 Alembic 迁移
- [x] 1.2 创建 `backend/app/ai.py`：调用 InferAI API（DeepSeek），流式转发
- [x] 1.3 创建 `backend/app/routers/chat.py`：会话管理 + SSE 流式响应
- [x] 1.4 注册路由到 `backend/app/main.py`，配置 API key 环境变量

## 2. 前端聊天页面

- [x] 2.1 安装 `react-markdown` 和 `remark-gfm`
- [x] 2.2 创建 `src/pages/ChatPage.tsx`：聊天布局 + 流式接收 + 自动滚动
- [x] 2.3 创建 `src/components/ChatMessage.tsx`：Markdown 气泡组件
- [x] 2.4 创建 `src/components/ChatInput.tsx`：输入框 + 发送按钮

## 3. 集成

- [x] 3.1 更新 `Sidebar` 新增"AI 助手"链接，更新 `App.tsx` 添加路由
- [ ] 3.2 验证 AI 对话流程、流式显示、消息持久化（待用户确认）
