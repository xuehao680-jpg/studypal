export interface Project {
  title: string
  description: string
  image: string
  github: string
}

export const projects: Project[] = [
  {
    title: '数据分析平台',
    description: '基于 Python 和 Streamlit 构建的交互式数据分析仪表盘，支持 CSV 上传、自动可视化生成和报告导出。',
    image: 'https://placehold.co/600x338/6366f1/ffffff?text=Data+Analytics',
    github: 'https://github.com',
  },
  {
    title: '智能客服机器人',
    description: '基于 LLM 的智能对话系统，集成企业知识库，支持多轮对话、意图识别和工单自动创建。',
    image: 'https://placehold.co/600x338/818cf8/ffffff?text=AI+Chatbot',
    github: 'https://github.com',
  },
  {
    title: '实时数据管道',
    description: '基于 Kafka + Flink 的实时数据处理管道，处理每日百万级事件，延迟低于 100ms。',
    image: 'https://placehold.co/600x338/4f46e5/ffffff?text=Data+Pipeline',
    github: 'https://github.com',
  },
  {
    title: '个人品牌站',
    description: '基于 React 19 + TypeScript + Tailwind CSS v4 构建的个人网站，包含粒子动画背景和暗黑模式。',
    image: 'https://placehold.co/600x338/a5b4fc/ffffff?text=Portfolio',
    github: 'https://github.com',
  },
]
