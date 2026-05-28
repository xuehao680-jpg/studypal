import avatar from '../assets/avatar.jpg'

export function AboutSection() {
  return (
    <section
      id="about"
      className="px-4 py-20"
      style={{ backgroundColor: 'var(--hero-bg-end)' }}
    >
      <div className="mx-auto flex max-w-5xl flex-col items-center gap-10 md:flex-row md:items-start md:gap-12">
        {/* Avatar */}
        <div className="shrink-0">
          <img
            src={avatar}
            alt="薛浩"
            loading="lazy"
            className="h-48 w-48 rounded-full border-4 border-gray-200 object-cover md:h-64 md:w-64 dark:border-gray-600"
          />
        </div>

        {/* Content */}
        <div className="flex flex-col gap-4">
          <h2
            className="text-center text-3xl font-bold md:text-left md:text-4xl"
            style={{ color: 'var(--text-primary)' }}
          >
            关于我
          </h2>

          <div
            className="space-y-4 text-base leading-relaxed md:text-lg"
            style={{ color: 'var(--text-primary)' }}
          >
            <p>
              你好！我是薛浩，一名 AI 数据分析师。我热衷于利用人工智能和数据科学技术，
              从复杂的数据中发现洞察、驱动决策。
            </p>
            <p>
              我的技术栈涵盖 Python、SQL 和前端开发。我擅长构建端到端的数据解决方案，
              从数据采集、清洗、分析到可视化呈现，帮助团队将数据转化为可执行的策略。
            </p>
            <p>
              工作之余，我喜欢探索新技术、开源项目和咖啡。我相信好的数据故事
              比复杂的模型更能打动人心。
            </p>
          </div>

          <div className="mt-2">
            <span
              className="inline-block rounded-full border px-4 py-1.5 text-sm font-medium"
              style={{
                color: 'var(--text-secondary)',
                borderColor: 'var(--text-secondary)',
              }}
            >
              浙江财经大学
            </span>
          </div>
        </div>
      </div>
    </section>
  )
}
