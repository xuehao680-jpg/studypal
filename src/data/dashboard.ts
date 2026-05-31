export interface Stat {
  label: string
  value: string
  icon: string
  change: string
}

export interface Goal {
  id: string
  text: string
  done: boolean
}

export interface DayData {
  day: string
  hours: number
}

export interface MonthData {
  week: string
  hours: number
}

export const stats: Stat[] = [
  { label: '学习天数', value: '42', icon: '📅', change: '+5 本周' },
  { label: '完成率', value: '76%', icon: '🎯', change: '+8%' },
  { label: '答题数', value: '156', icon: '📝', change: '+23' },
  { label: '连续天数', value: '7', icon: '🔥', change: '个人纪录' },
]

export const dailyGoals: Goal[] = [
  { id: '1', text: '完成 Python 基础练习', done: false },
  { id: '2', text: '阅读 AI 论文摘要', done: true },
  { id: '3', text: '复习 SQL 窗口函数', done: false },
  { id: '4', text: '写学习笔记', done: true },
]

export const weeklyData: DayData[] = [
  { day: '周一', hours: 2.5 },
  { day: '周二', hours: 3.0 },
  { day: '周三', hours: 1.5 },
  { day: '周四', hours: 4.0 },
  { day: '周五', hours: 2.0 },
  { day: '周六', hours: 3.5 },
  { day: '周日', hours: 1.0 },
]

export const monthlyData: MonthData[] = [
  { week: '第一周', hours: 12 },
  { week: '第二周', hours: 15 },
  { week: '第三周', hours: 10 },
  { week: '第四周', hours: 18 },
]

export const aiSuggestion =
  '基于你的学习进度，建议今天重点复习「数据清洗」章节。你最近在 SQL 窗口函数方面的练习完成率较高，'
  + '但在 Python Pandas 数据聚合部分还有提升空间。推荐花 30 分钟完成 Pandas groupby 相关的练习题。'
